import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "../BillTemplate/BillTemplate.css";
import axios from "axios";
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from 'dayjs'

import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getInvoiceTemplate } from "../../redux/InvoiceTemplateSlice";
import { useSelector } from "react-redux";
import companyProfile from "../../assets/img/Comany-img.jpg";
import Cookie from "js-cookie";
import { Divider } from "@mui/material";


function CreateInvoiceTemplate() {
  const navigate = useNavigate();
  const companyData = useSelector((state) => state.selectedCompany);
  const companyLogo = sessionStorage.getItem("companyLogoImg");

  //old language variable
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable, setSaveDisable] = useState(false);
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_Enter_template, setText_enter_template] = useState(
    "Enter Template Name"
  );
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [inventoryvalcate, setInventoryvalcate] = useState(
    "Please Enter Category!"
  );
  const [text_enter_category, setText_enter_category] =
    useState("Enter category");
  const [text_defualt_fields, setText_defualt_fields] =
    useState("Default Fields");
  const [text_add_new_category, setText_add_new_category] =
    useState("Add New Category");
  //new language variable
  const [text_err_template, setText_err_template] = useState(
    "Please Enter Template Name"
  );
  const [title_InvoiceTemplate, setTitle_InvoiceTemplate] = useState(
    "Create Invoice Template"
  );
  const [text_customField, setText_customField] = useState("Custom Fields");

  //variable
  const [addcategory, setAddcategory] = useState(false);
  const [categoryinput, setCategoryinput] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(128);
  const [selectDate, setSelectDate] = useState(new Date());
  const [template, setTemplate] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errTemplate, setErrTemplate] = useState("");
  const Company_Name = sessionStorage.getItem("comp_name");
  const dispatch = useDispatch();
  //valiadtion
  const invoiceValidation = () => {
    var addValidation = true;
    if (categoryData?.length === 0) {
      addValidation = false;
      infoToast("Please add new category!");
    }
    if (template === "") {
      addValidation = false;
      setErrTemplate(<>*{text_err_template}</>);
    }
    setSaveDisable(false);
    return addValidation;
  };

  //Insert API Call
  const handleAdd = () => {
    if (invoiceValidation()) {
      setSaveDisable(true);
      var _orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      var compid = sessionStorage.getItem("_compId");
      var type = "insert";

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/invoicetamplate/addinvoicetamplate?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const d = {
        effectiveDate: dayjs(selectDate).format("YYYY-MM-DD"),
        _orgId: _orgId,
        orgId: compid,
        isActive: true,
        _partition: GlobalConstants._partition,
        country: "india",
        breakuplist: categoryData,
        templatename: template,
      };

      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var res = response.data;
          successToast("Template Added successfully");
          setSaveDisable(false);
          dispatch(getInvoiceTemplate());
          setTimeout(() => {
            navigate(`/managetemplate`, { state: { data: 4 } });
          }, 1000);
        })
        .catch(function (error) {
          setSaveDisable(false);
          var err = error.response.data;
          errorToast(err);
          console.log(err);
          if (error.response.status === 427) {
            sessionStorage.clear();
            localStorage.clear();
            Cookie.remove("username");
            Cookie.remove("user_id");
            Cookie.remove("AdminFName");
            Cookie.remove("AdminLName");
            Cookie.remove("token");
            window.location.replace("/");
          }
        });
    }
  };

  const savecategoryData = () => {
    if (categoryinput !== "") {
      setCategoryData((current) => [
        ...current,
        {
          category: categoryinput,
          description: "NA",
          active: true,
        },
      ]);
      setAddcategory(false);
      setCategoryinput("");
    } else {
      setErrorCategory(<>*{inventoryvalcate}</>);
    }
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']", doc)?.textContent
        
    );
    setButton_save(
      doc.querySelector("string[name='button_save']", doc)?.textContent
        
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']", doc)?.textContent
        
    );
    setText_enter_category(
      doc.querySelector("string[name='text_enter_category']", doc)
        ?.textContent
    );
    setText_enter_template(
      doc.querySelector("string[name='text_Enter_template']", doc)
        ?.textContent
    );
    setText_defualt_fields(
      doc.querySelector("string[name='text_defualt_fields']", doc)
        ?.textContent
    );
    setInventoryvalcate(
      doc.querySelector("string[name='inventoryvalcate']", doc)
        ?.textContent
    );
    setText_add_new_category(
      doc.querySelector("string[name='text_add_new_category']", doc)
        ?.textContent
    );
    setText_err_template(
      doc.querySelector("string[name='text_err_template']", doc)
        ?.textContent
    );
    setTitle_InvoiceTemplate(
      doc.querySelector("string[name='title_InvoiceTemplate']", doc)
        ?.textContent
    );
    setText_customField(
      doc.querySelector("string[name='text_customField']", doc)
        ?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });
  return (
    <>
      <Header />
      <div className="p-4">
        <h3 className="HeadingText mt-3 mb-2 text-center p-2">
          {title_InvoiceTemplate}
        </h3>
        <div className="row">
          <div className=" p-4 col-md-6 containerBox mt-5 create-invoice-temp-left">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mt-4">{Company_Name}</h4>
              </div>
              <div className="col-md-6 text-end">
                {addcategory === true ? (
                  <>
                    <div className="create-invoice-temp-addcat">
                      <input
                        type="text"
                        className="input_position createbilltemp-catinput"
                        value={categoryinput}
                        placeholder={text_enter_category}
                        onChange={(e) => [
                          setCategoryinput(e.target.value),
                          setErrorCategory(""),
                        ]}
                      />
                      &nbsp;
                      <button
                        className="CreateBtn mt-3 create-invoice-btn-save"
                        onClick={savecategoryData}
                      >
                        {button_save}
                      </button>
                      <button
                        className="btncancel mx-1 create-invoice-btn-cancel"
                        onClick={() => [
                          setAddcategory(false),
                          setErrorCategory(""),
                          setCategoryinput(""),
                        ]}
                      >
                        {button_cancel}
                      </button>
                    </div>
                    <p className="text-start errInvoice" id="err_Invoice1">
                      {errorCategory}
                    </p>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      className="CreateBtn mt-3"
                      onClick={() => setAddcategory(!addcategory)}
                    >
                      + {text_add_new_category}
                    </button>
                  </>
                )}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <hr />
                  <h4>
                    {text_temp_name}
                    <span className="Star">*</span>
                  </h4>
                  <input
                    type="text"
                    placeholder={text_Enter_template}
                    value={template}
                    onChange={(e) => [
                      setTemplate(e.target.value),
                      setErrTemplate(""),
                    ]}
                    className="billinput"
                  />
                  <p className="sperrtext">{errTemplate}</p>
                  <br />
                  <h4 className="mt-4">{text_defualt_fields}</h4>
                  <ul>
                    <li>QTY</li>
                    <li>Price</li>
                    <li>total</li>
                  </ul>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mt-3">{text_customField}</h4>
                      {categoryData?.map((element, index) => {
                        return (
                          <>
                            <ul key={index}>
                              <li>{element.category}</li>
                            </ul>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <br />
                  <center>
                    <Link
                      to="/managetemplate"
                      state={{ data: 4 }}
                      onClick={() => navigate(-1)}
                    >
                      <button className="btncancel">{button_cancel}</button>
                    </Link>
                    &nbsp; &nbsp;
                    <button
                      className="btnsave"
                      onClick={handleAdd}
                      disabled={saveDisable}
                    >
                      {button_save}
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-md-6 justify-content-center sampleTemplateSTyinvoice create-invoice-temp-right">
            <div className="  Paybilltopclr ">&nbsp;</div>
            <div className="row text-center ">
              <h1 className="tital_billcolor billtext mt-2">Invoice</h1>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={companyLogo === null ? companyProfile : companyLogo}
                  className="invoicePhoto"
                  alt=""
                />
              </div>
              <div className="col-md-6  mt-3text-end">
                <div className="row">
                  <div className="col-md-7 text-end">
                    <b>Invoice No:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span>#000</span>
                  </div>
                  <div className="col-md-7 text-end">
                    <b>Invoice Date:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span>&nbsp;MM/DD/YYYY</span>
                  </div>
                  <div className="col-md-7 text-end">
                    <b>Due Date:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span>MM/DD/YYYY</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-6">
                {companyData.map((v) => {
                  return (
                    <>
                      <h5 className="head_clr_bill">
                        <b>{v.companyName}</b>
                      </h5>
                      <p className="inaddress">
                        {v.city},&nbsp;{v.street},<br />
                        {v.country},&nbsp;{v.postalCode}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="row">
              <span>To,</span>
              <h5 className="head_clr_bill">
                <b>Customer Name</b>{" "}
              </h5>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <span>Street</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <span>City,State,Zipcode</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <span>Country</span>
                  </div>
                </div>
              </div>
            </div>
            <table className="table_invoice mt-2">
              <thead className="billtableheader">
                {" "}
                <tr className="paybill_style_clr">
                  {categoryData?.map((value) => {
                    return (
                      <>
                        <th>{value.category}</th>
                      </>
                    );
                  })}
                  <th className="table_bill">QTY</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="tablebodyData">
                <br />
                <br />
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-9 text-end">
                <b>Total Amount:</b>
              </div>
              <div className="col-md-3 text-end">
                <span>$0.00</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9 text-end">
                <b>Tax(%):</b>
              </div>
              <div className="col-md-3 text-end">
                <span>0.00</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9 text-end">
                <b>Grand Total:</b>
              </div>
              <div className="col-md-3 text-end">
                <b>
                  <b> $0.00</b>
                </b>
              </div>
              <Divider />
            </div>
            <br />
            <div className="row ">
              <div className="col-md-7">
                <b>Amount In Words: </b> Zero Only
              </div>
            </div>
            <br />
            <div className="row">
              <div className="row">
                <div className="col-md-6">
                  <b>Bank Details / Wallet Address</b>
                  <Divider />
                </div>
              </div>
              <div className="col-md-6">
                <b>Bank Name: </b>
                <span>NA</span>
                <br />
                <b>Account Number: </b>
                <span>NA</span>
                <br />
                <b>IFSC Code:</b>
                <span> NA</span>
                <br />
                <b>SWIFT Code: </b>
                <span>NA</span>
                <br />
                <b>IBAN Code: </b>
                <span>NA</span>
                <br />
                <b>ABA Code: </b>
                <span>NA</span>
                <br />
                <b>UPI Id: </b>
                <span>NA</span>
                <br />
                <b>Wallet Address: </b>
                <span>NA</span>
                <br />
                <br />
              </div>
              <div className="col-md-6 text-end ">
                <br />
                <h5>Scan to Pay</h5>
                {/* QR code HERE */}
                <QRCode
                  value="www.moramba.com"
                  bgColor={back}
                  fgColor={fore}
                  size={size === "" ? 0 : size}
                />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreateInvoiceTemplate;
