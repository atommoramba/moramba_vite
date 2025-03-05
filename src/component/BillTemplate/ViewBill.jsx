import { Divider } from "@mui/material";
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import Header from "../Header/Header";
import companyProfile from "../../assets/img/Comany-img.jpg";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

import * as BsIcons from "react-icons/bs";
import {
  Currency,
  Cryptocurrency,
  CountryCodewithEmoji,
} from "../../utils/data";

function ViewBill() {
  //lang variable
  const [text_view_bill, setText_view_bill] = useState("View Bill");
  const [text_download, setText_download] = useState("Download");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [capValue, setCapValue] = useState("");
  const companyLogo = sessionStorage.getItem("companyLogoImg");
  let data = useLocation();
  const NewData = data.state != null ? data.state.billdata : "";
  const companyData = useSelector((state) => state.selectedCompany);
  const navigate = useNavigate();
  console.log(NewData);
  //ADD DOWNLOAD BTN HERE
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(128);
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_view_bill(
      doc.querySelector("string[name='text_view_bill']")?.textContent
    );
    setText_download(
      doc.querySelector("string[name='text_download']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log("newdata***", NewData);
  useEffect(() => {
    // var words = NewData?.AmountInWords?.split(" ");
    // for (let i = 0; i < words?.length; i++) {
    //   words[i] = words[i][0]?.toUpperCase() + words[i].substr(1);
    // }
    setCapValue(NewData?.AmountInWords + " " + "Only");
  }, [NewData]);

  // currency in words
  useEffect(() => {
    var string = CountryCodewithEmoji;
    var oneObj =
      string.find(
        (cur) => cur.abbreviation === NewData?.currency.substring(2)
      ) ||
      string.find(
        (cur) => cur.abbreviation === NewData?.currency.substring(3)
      ) ||
      string.find(
        (cur) => cur.abbreviation === NewData?.currency.substring(4)
      ) ||
      string.find(
        (cur) => cur.abbreviation === NewData?.currency.substring(5)
      ) ||
      string.find((cur) => cur.abbreviation === NewData?.currency.substring(6));

    NewData.currencyInWords = oneObj?.currency.substring(0, 100);

    console.log(NewData?.currency.substring(5));
    console.log("oneObj", oneObj);
    var twoobj = Cryptocurrency.find(
      (cryoto) => cryoto.currency == NewData?.currency
    );
    NewData.CryWord = twoobj?.currency;
  }, []);

  const DownloadPDFHandler = () => {
    const input = document.getElementById("Paybill");
    html2canvas(input).then(() => {
      const options = {
        margin: 10,
        filename: "Bill.pdf",
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(options).from(input).save();
    });
  };

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  const thead = Object.keys(NewData?.billDataList[0]);
  console.log(NewData?.billDataList[0]);
  const tdata = Object.values(NewData?.billDataList[0]);
  const [FinalData, setFinalData] = useState([]);
  const dummyarr = [];
  Object.keys(FinalData).forEach(function (key, index) {
    dummyarr.push(FinalData[key]);
  });
  useEffect(() => {
    var dummydata = [];
    for (let i = 0; i < NewData?.billDataList.length; i++) {
      const tdata = Object.values(NewData?.billDataList[i]);
      dummydata.push(tdata);
    }
    setFinalData(dummydata);
  }, [NewData?.billDataList]);
  return (
    <>
      <Header />
      <div className="p-4">
        <h3 className="HeadingText mt-3 mb-2 text-center p-2">
          {text_view_bill}
        </h3>
        <div className="d-flex justify-content-center gap-4">
          <Link to="/bill/allbill">
            <button className="btncancel">{button_cancel}</button>
          </Link>
          <button className="CreateBtn" onClick={DownloadPDFHandler}>
            <BsIcons.BsDownload /> {text_download}
          </button>
        </div>
        <div className=" d-flex justify-content-center" id="Paybill">
          <div className="px-2 mt-4 sampleTemplateSTy">
            <div className="Paybilltopclr mx-4 ">&nbsp;</div>
            <div className="row text-center ">
              <h1 className="tital_billcolor billtext mt-1">Bill</h1>
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
                    <span className="">#{NewData?.billID}</span>
                  </div>
                  <div className="col-md-7 text-end">
                    <b>Bill Date:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span>
                      {dayjs(NewData?.createdDate).format("MMM DD, YYYY")}
                    </span>
                  </div>
                  <div className="col-md-7 text-end">
                    <b>Due Date:</b>
                  </div>
                  <div className="col-md-5 text-end">
                    <span>
                      &nbsp;{dayjs(NewData?.dueDate).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <br /> */}
            <div className="space-y-10"></div>
            <div className="row">
              <div className="col-md-6">
                {" "}
                <h5 className="head_clr_bill">
                  <b>{NewData?.Customer}</b>{" "}
                </h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <p className="inaddress">
                    {NewData?.vendorAddress?.replaceAll(",", ", ")}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <span>To,</span>
                {companyData.map((v) => {
                  return (
                    <>
                      <h5 className="head_clr_bill">
                        <b>{v.companyName}</b>
                      </h5>
                      <p className="inaddress">
                        {v.city},<br />
                        {v.street},<br />
                        {v.country},&nbsp;{v.postalCode}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="scrollTableviewbill">
              <table className="table_invoice mt-2">
                <thead className="billtableheader">
                  <tr className="paybill_style_clr">
                    <th className="abc">Sr No</th>
                    {thead?.map((value, index0) => {
                      return (
                        <>
                          <th>
                            {console.log("value index***", value, index0)}
                            {value}
                            {value === "Price" || value === "Amount"
                              ? `(${NewData?.currency.substring(0, 1)})`
                              : ""}
                          </th>
                        </>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="tablebodyData text-center">
                  {dummyarr.map((v, index) => {
                    return (
                      <>
                        <tr key={index + 1}>
                          <td className="billrow">{index + 1}</td>
                          {v.map((e, index1) => {
                            return (
                              <>
                                <td
                                  className={
                                    v.length === index1 + 1 ||
                                    v.length === index1 + 2 ||
                                    v.length === index1 + 2 ||
                                    v.length === index1 + 3
                                      ? "text-end billrow px-1"
                                      : "billrow" && v.length === index1 + 4
                                      ? "text-start billrow"
                                      : "billrow"
                                  }
                                  key={index1}
                                >
                                  {/* {e} */}
                                  {v.length === index1 + 1 ||
                                  v.length === index1 + 2
                                    ? [NewData?.currency.split(" ")[0], e]
                                    : e}
                                </td>
                              </>
                            );
                          })}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-md-9 text-end">
                <b>Total Amount:</b>
              </div>
              <div className="col-md-3 text-end px-3">
                <span>
                  {NewData?.currency.split(" ")[0]}
                  {Number(NewData?.SubTotal)}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9 text-end">
                <b>Tax ({NewData?.tax}%):</b>
              </div>
              <div className="col-md-3 text-end px-3">
                <span>
                  {NewData?.currency.split(" ")[0]}
                  {Number(NewData?.grandTotal) - Number(NewData?.SubTotal)}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9 text-end">
                <b>Grand Total:</b>
              </div>
              <div className="col-md-3 text-end px-3">
                <b>
                  {NewData?.currency.split(" ")[0]}
                  {Number(NewData?.grandTotal)}
                </b>
              </div>
              <div className="dividerline">
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <b>Amount In Words</b>
                <span>({NewData?.currencyInWords || NewData?.CryWord}):</span>
                &nbsp;&nbsp;
                <span className="capitalize">{capValue}</span>
                {}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <br />
                <b>Bank Details / Wallet Address:</b>
                <Divider />
                {NewData?.paymentmethod === "Bank" ? (
                  <p>
                    <b>Bank Name: </b> <span>{NewData?.bank}</span>
                    <br />
                    <b>Account Number:</b> <span>{NewData?.walletAddress}</span>
                    <br />
                    <b>IFSC Code: </b> <span>{NewData?.ifsc}</span>
                    <br />
                    <b>SWIFT Code: </b> <span>{NewData?.swiftcode}</span>
                    <br />
                    <b>IBAN Code: </b> <span>{NewData?.ibancode}</span>
                    <br />
                    <b>ABA Code: </b> <span>{NewData?.abacode}</span>
                    <br />
                    <b>UPI Id: </b>
                    <span>{NewData?.upi}</span>
                    <br />
                    <br />
                    <b>Wallet Address: </b>
                    <span>NA</span>
                  </p>
                ) : (
                  <p>
                    <b className="mt-4">Account Number: </b>
                    <span>NA</span>
                    <br />
                    <b>Wallet Address: </b>{" "}
                    <span>{NewData?.walletAddress}</span>
                  </p>
                )}
                <br />
              </div>
              <div className="col-md-6 text-end">
                {NewData?.paymentmethod === "Crypto" ? (
                  <p>
                    <h5 className="mt-5">Scan to Pay</h5>
                    {/* QR code HERE */}
                    <QRCode
                      value={NewData?.walletAddress}
                      bgColor={back}
                      fgColor={fore}
                      size={size === "" ? 0 : size}
                    />
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBill;
