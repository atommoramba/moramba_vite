import axios from "axios";
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import Header from "../Header/Header";
import "./BillTemplate.css";
import { useDispatch } from "react-redux";
import { getBillTemplate } from "../../redux/BillTemplateSlice";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import companyProfile from "../../assets/img/Comany-img.jpg";
import { Divider } from "@mui/material";
import Cookie from "js-cookie";

function CreateBillTemplate() {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const companyData = useSelector((state) => state.selectedCompany);
  const Company_Name = sessionStorage.getItem("comp_name");
  const [startDate, setStartDate] = useState(new Date());
  const [addcategory, setAddcategory] = useState(false);
  const [TemplateName, setTemplateName] = useState("");
  const [categoryinput, setCategoryinput] = useState("");
  const [ErrcateInput, setErrcateInput] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [errTemplate, setErrTemplate] = useState("");
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(128);
  const companyLogo = sessionStorage.getItem("companyLogoImg");
  //Language Variables Start
  //old language variable
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable, setSaveDisable] = useState(false);
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_Enter_template, setText_enter_template] = useState(
    "Enter Template Name"
  );
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_defualt_fields, setText_defualt_fields] =
    useState("Default Fields");
  const [text_enter_category, setText_enter_category] =
    useState("Enter category");
  const [text_add_new_category, setText_add_new_category] =
    useState("Add New Category");
  //new language variable
  const [text_err_template, setText_err_template] = useState(
    "Please Enter Template Name"
  );
  const [title_BillTemplate, setTitle_BillTemplate] = useState(
    "Create Bill Template"
  );
  const [text_customField, setText_customField] = useState("Custom Fields");
  const [inventoryvalcate, setInventoryvalcate] = useState(
    "Please Enter Category!"
  );
  //Language Variables End

  const savecategoryData = () => {
    if (categoryinput !== "") {
      setAddcategory(false);
      setCategoryinput("");
      dataHandleClick();
    } else {
      setErrcateInput(<>*{inventoryvalcate}!</>);
    }
  };
  const dataHandleClick = () => {
    setCategoryData((current) => [
      ...current,
      {
        category: categoryinput,
        description: "NA",
        active: true,
      },
    ]);
  };

  //valiadtion
  const billValidation = () => {
    var addValidation = true;
    if (categoryData?.length === 0) {
      addValidation = false;
      infoToast("Please add new category!");
    }
    if (TemplateName === "") {
      addValidation = false;
      setErrTemplate(<>*{text_err_template}</>);
    }
    setSaveDisable(false);
    return addValidation;
  };

  const saveBillTemplate = () => {
    if (billValidation()) {
      setSaveDisable(true);
      var _orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      var compid = sessionStorage.getItem("_compId");
      var type = "insert";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/billtamplate/addbilltamplate?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const d = {
        effectiveDate: dayjs(startDate).format("YYYY-MM-DD"),
        _partition: GlobalConstants._partition,
        _orgId: _orgId,
        orgId: compid,
        country: sessionStorage.getItem("cmp_country"),
        breakuplist: categoryData,
        templatename: TemplateName,
      };

      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var res = response.data;
          successToast("Template Added successfully");
          setSaveDisable(false);
          Dispatch(getBillTemplate());
          setTimeout(() => {
            navigate(`/managetemplate`, { state: { data: 3 } });
          }, 1500);
        })
        .catch(function (error) {
          setSaveDisable(false);
          var err = error.response.data;
          errorToast(err);
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

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent ||
        "Template Name"
    );
    setText_enter_template(
      doc.querySelector("string[name='text_Enter_template']")?.textContent ||
        "Enter Template Name"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_defualt_fields(
      doc.querySelector("string[name='text_defualt_fields']")?.textContent ||
        "Default Fields"
    );
    setText_enter_category(
      doc.querySelector("string[name='text_enter_category']")?.textContent ||
        "Enter category"
    );
    setText_add_new_category(
      doc.querySelector("string[name='text_add_new_category']")?.textContent ||
        "Add New Category"
    );
    setText_err_template(
      doc.querySelector("string[name='text_err_template']")?.textContent ||
        "Please Enter Template Name"
    );
    setTitle_BillTemplate(
      doc.querySelector("string[name='title_BillTemplate']")?.textContent ||
        "Create Bill Template"
    );
    setText_customField(
      doc.querySelector("string[name='text_customField']")?.textContent ||
        "Custom Fields"
    );
    setInventoryvalcate(
      doc.querySelector("string[name='inventoryvalcate']")?.textContent ||
        "Please Enter Category!"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <h3 className="HeadingText mt-1 mb-4 text-center p-2">
          {title_BillTemplate}
        </h3>
        <div className="row create-bill-temp-main">
          <div className="col-md-6 containerBox mt-5 create-bill-temp-left">
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
                          setErrcateInput(""),
                        ]}
                      />
                      &nbsp;
                      <button
                        className="CreateBtn mt-2"
                        onClick={savecategoryData}
                        disabled={saveDisable}
                      >
                        {button_save}
                      </button>
                      <button
                        className="btncancel mx-2 mt-2"
                        onClick={() => [
                          setAddcategory(false),
                          setErrcateInput(""),
                          setCategoryinput(""),
                        ]}
                      >
                        {button_cancel}
                      </button>
                    </div>
                    <div className="text-start">
                      <p className="errInvoice createbilltemp-addcat-err">
                        {ErrcateInput}
                      </p>
                    </div>
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
                    onChange={(e) => [
                      setTemplateName(e.target.value),
                      setErrTemplate(""),
                    ]}
                    className="billinput"
                  />
                  <p className="sperrtext">{errTemplate}</p>
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
                      state={{ data: 3 }}
                      onClick={() => navigate(-1)}
                    >
                      <button className="btncancel">{button_cancel}</button>
                    </Link>
                    &nbsp; &nbsp;
                    <button
                      className="btnsave"
                      onClick={saveBillTemplate}
                      disabled={saveDisable}
                    >
                      {button_save}
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 justify-content-center sampleTemplateSTyinvoice create-invoice-temp-right">
            <div className="  Paybilltopclr mx-4 ">&nbsp;</div>
            <div className="row text-center">
              <h1 className="tital_billcolor billtext mt-2">Bill</h1>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={companyLogo === null ? companyProfile : companyLogo}
                  className="invoicePhoto"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-7 text-end">
                    <b>Bill No:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span className="">#000</span>
                  </div>
                  <div className="col-md-7 text-end">
                    <b>Bill Date:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span>MM/DD/YYYY</span>
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
            <div className="space-y-10"></div>
            <div className="row">
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <h5 className="head_clr_bill">
                    <b>Vendor Name</b>{" "}
                  </h5>
                </div>
              </div>
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
                  <br />
                  <div className="col-md-6">
                    <span>Country</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                {companyData.map((v) => {
                  return (
                    <>
                      <span>To,</span>
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
            <table className="table_invoice mt-1">
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
                  <th>QTY</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="tablebodyData"></tbody>
            </table>
            <br />
            <br />
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
                  <span> $0.00</span>
                </b>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-md-7">
                <b>Amount In Words:</b> Zero Only
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
                <b>Account Number:</b>
                <span>NA</span>
                <br />
                <b>IFSC Code: </b>
                <span>NA</span>
                <br />
                <b>SWIFT Code: </b>
                <span>NA</span>
                <br />
                <b>IBAN Code: </b>
                <span>NA</span>
                <br />
                <b>ABA Code:</b>
                <span> NA</span>
                <br />
                <b>UPI Id : </b>
                <span>NA</span>
                <br />
                <b>Wallet Address: </b>
                <span>NA</span>
                <br />
              </div>
              <div className="col-md-6 text-end">
                <h5 className="mt-5">Scan to Pay</h5>
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

export default CreateBillTemplate;
