import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../Header/Header";
import "../BillTemplate/BillTemplate.css";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useSelector } from "react-redux";
import companyProfile from "../../assets/img/Comany-img.jpg";
import { Divider } from "@mui/material";

function ViewInvoiceTemplate() {
  //language variable
  const [invoicetemp_text, setInvoicetemp_text] = useState(
    " View Invoice Template"
  );
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(128);
  const companyLogo = sessionStorage.getItem("companyLogoImg");
  const navigate = useNavigate();
  const companyData = useSelector((state) => state.selectedCompany);

  let data = useLocation();
  const viewInvoicedata = data.state != null ? data.state.data : "";
  const tableData = viewInvoicedata.breakuplist;

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setInvoicetemp_text(
      doc.querySelector("string[name='invoicetemp_text']")?.textContent ||
        " View Invoice Template"
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
          {invoicetemp_text}
        </h3>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-1"></div>
          <div className="col-md-6 sampleTemplateSTyinvoice">
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
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-7 text-end">
                    <b>Invoice No.</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span className="">#000</span>
                  </div>
                  <div className="col-md-7 text-end">
                    <b>Invoice Date:</b>
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
            <div className="row">
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
            <table className="table_invoice mt-3">
              <thead className="billtableheader">
                {" "}
                <tr className="paybill_style_clr">
                  {tableData?.map((value) => {
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
              <tbody className="tablebodyData">
                <br />
              </tbody>
            </table>
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
                  <b> $0.00</b>
                </b>
              </div>
              <hr />
            </div>
            <div className="row ">
              <div className="col-md-7">
                <b>Amount In Words:</b> Zero Only
              </div>
            </div>
            <br />
            <div className="row ">
              <div className="row">
                <div className="col-md-6">
                  <b>Bank Details / Wallet Address</b>
                  <Divider />
                </div>
              </div>
              <div className="col-md-6">
                <p>
                  <b>Bank Name: </b>
                  <span>NA</span>
                  <br />
                  <b>Account Number:</b>
                  <span> NA</span>
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
                  <b>ABA Code: </b>
                  <span>NA</span>
                  <br />
                  <b>UPI Id: </b>
                  <span>NA</span>
                  <br />
                  <b>Wallet Address: </b>
                  <span>NA</span>
                </p>
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
    </>
  );
}

export default ViewInvoiceTemplate;
