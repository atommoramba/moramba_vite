import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import companyProfile from "../../assets/img/Comany-img.jpg";
import { Divider } from "@mui/material";

function ViewBillTemplate() {
  //language variable
  const [textbill_temp, setTextbill_temp] = useState("View Bill Template");
  const companyLogo = sessionStorage.getItem("companyLogoImg");
  let data = useLocation();
  const NewData = data.state != null ? data.state.billdata : "";
  console.log("///", NewData);
  const SelectedBill = data.state != null ? data.state.SelectedBillView : "";
  console.log(SelectedBill);
  const companyData = useSelector((state) => state.selectedCompany);

  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(128);
  const navigate = useNavigate();
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setTextbill_temp(
      doc.querySelector("string[name='textbill_temp']")?.textContent ||
        "View Bill Template"
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
          {textbill_temp}
        </h3>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-1"></div>
          <div className="col-md-6 mt-4 sampleTemplateSTy">
            <div className="  Paybilltopclr mx-4 ">&nbsp;</div>
            <div className="row">
              <div className="row text-center">
                <h1 className="tital_billcolor billtext mt-2">Bill</h1>
              </div>
              <div className="col-md-6">
                <img
                  src={companyLogo === null ? companyProfile : companyLogo}
                  className="invoicePhoto"
                  alt=""
                />
              </div>
              <br />
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
            <br />
            &nbsp;
            <div className="row viewbilltital">
              <div className="col-md-6">
                {companyData.map((v) => {
                  return (
                    <>
                      <span>To,</span>
                      <h5 className="head_clr_bill">
                        <b>{v.companyName}</b>
                      </h5>
                      <p className="inaddress">
                        {v.city},{v.street},<br />
                        {v.country},{v.postalCode}
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
                  {SelectedBill.breakuplist?.map((value) => {
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
                  <b> $0.00</b>
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
                <p>
                  <b>Bank Name: </b>
                  <span>NA</span>
                  <br />
                  <b>Account Number: </b>
                  <span> NA</span>
                  <br />
                  <b>IFSC Code: </b>
                  <span> NA</span>
                  <br />
                  <b>SWIFT Code: </b>
                  <span> NA</span>
                  <br />
                  <b>IBAN Code: </b>
                  <span> NA</span>
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
                </p>
                <br />
              </div>
              <div className="col-md-6 text-end">
                <h5 className="mt-5">Scan to Pay</h5>
                {/* QR code HERE */}
                <QRCode
                  value="www.moramba.com"
                  bgColor={back}
                  fgColor={fore}
                  size={size === "" ? 0 : size}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBillTemplate;
