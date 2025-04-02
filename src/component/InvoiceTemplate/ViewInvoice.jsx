import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../Header/Header";
import "../BillTemplate/BillTemplate.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from "dayjs";

import companyProfile from "../../assets/img/Comany-img.jpg";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import * as BsIcons from "react-icons/bs";
import {
  Currency,
  Cryptocurrency,
  CountryCodewithEmoji,
} from "../../utils/data";
import nacl from "tweetnacl";
import { Buffer } from "buffer";
function ViewInvoice() {
  //language variable
  const [text_view_invoice, setText_view_invoice] = useState("View Invoice");
  const [text_download, setText_download] = useState("Download");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [capValue, setCapValue] = useState("");
  const companyLogo = sessionStorage.getItem("companyLogoImg");
  const companyData = useSelector((state) => state.selectedCompany);

  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(128);
  const navigate = useNavigate();

  let data = useLocation();
  const NewData = data.state != null ? data.state.Data : "";
  console.log("new data***", NewData);
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_view_invoice(
      doc.querySelector("string[name='text_view_invoice']")?.textContent ||
        "View Invoice"
    );
    setText_download(
      doc.querySelector("string[name='text_download']")?.textContent ||
        "Download"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  // useEffect(() => {
  //   var words = NewData?.AmountInWords?.split(" ");
  //   for (let i = 0; i < words?.length; i++) {
  //     words[i] = words[i][0]?.toUpperCase() + words[i].substr(1);
  //   }
  //   setCapValue(words?.join(" "));
  // }, [NewData]);
  // currency in words
  useEffect(() => {
    var string = CountryCodewithEmoji;
    console.log(string);
    var oneObj =
      string.find(
        (cur) => cur.abbreviation == NewData?.currency.substring(2)
      ) ||
      string.find(
        (cur) => cur.abbreviation == NewData?.currency.substring(3)
      ) ||
      string.find(
        (cur) => cur.abbreviation == NewData?.currency.substring(4)
      ) ||
      string.find(
        (cur) => cur.abbreviation == NewData?.currency.substring(5)
      ) ||
      string.find((cur) => cur.abbreviation == NewData?.currency.substring(6));
    NewData.currencyInWords = oneObj?.currency.substring(0, 100);
    console.log("oneObj", oneObj);
    var twoobj = Cryptocurrency.find(
      (cryoto) => cryoto.currency === NewData?.currency
    );
    NewData.CryWord = twoobj?.currency;
  }, []);
  useEffect(() => {
    // var words = NewData?.AmountInWords?.split(" ");
    // console.log("first", words);
    // for (let i = 0; i < words?.length; i++) {
    //   words[i] = words[i][0]?.toUpperCase() + words[i].substr(1);
    //   console.log("Second", words[i]);
    // }
    setCapValue(NewData?.AmountInWords + " " + "Only");
  }, [NewData]);

  const DownloadPDFHandler = () => {
    const input = document.getElementById("Paybill");
    html2canvas(input).then(() => {
      const options = {
        margin: 10,
        filename: "Invoice.pdf",
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
  const thead = Object.keys(NewData?.invoiceDataList[0]);
  const tdata = Object.values(NewData?.invoiceDataList[0]);
  const [FinalData, setFinalData] = useState([]);
  const dummyarr = [];
  Object.keys(FinalData).forEach(function (key, index) {
    dummyarr.push(FinalData[key]);
  });

  useEffect(() => {
    var dummydata = [];
    for (let i = 0; i < NewData?.invoiceDataList.length; i++) {
      const tdata = Object.values(NewData?.invoiceDataList[i]);
      dummydata.push(tdata);
    }
    setFinalData(dummydata);
  }, [NewData?.invoiceDataList]);

  const [datashow, setDatashow] = useState(false);
  const [loopInvoices, setLoopInvoices] = useState([]);
  const [merchantID, setMerchantID] = useState("");
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": "0960b2cf-fa44-4949-a716-9055ce9563c2",
            "entity-id": "f3dcbffd-f5e9-4475-8d38-00f297863adc",
          },
          body: JSON.stringify({ merchantName: "dawn inc" }),
        };
        const response = await fetch(
          "https://demo.api.loopcrypto.xyz/api/v2/merchant",
          options
        );
        const data = await response.json();
        setMerchantID(data.merchantId);
        setLoopInvoices(data.payoutDestinations || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const authMessage = "I accept Loop Crypto Inc's Terms of Service";
  const generateAuthToken = async () => {
    try {
      setLoading(true);
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error("Phantom wallet is not installed");
      }

      const resp = await window.solana.connect();
      const walletAddress = resp.publicKey.toString();
      setAddress(walletAddress);

      const encodedMessage = new TextEncoder().encode(authMessage);
      const { signature: signatureBytes } = await window.solana.request({
        method: "signMessage",
        params: {
          message: encodedMessage,
          display: "utf8",
        },
      });

      const signature = Buffer.from(signatureBytes).toString("base64");
      setToken(signature);
      setStatus("Signature generated successfully!");

      console.log("Wallet Address:", walletAddress);
      console.log("Signature:", signature);

      // Verify the signature
      const verified = nacl.sign.detached.verify(
        encodedMessage,
        Buffer.from(signature, "base64"),
        resp.publicKey.toBytes()
      );

      console.log("Signature Verified:", verified);
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const styles = {
    container: {
      maxWidth: "800px",
      marginInlineStart: "20px",
      fontFamily: "Arial, sans-serif",
    },
    button: {
      padding: "10px 20px",
      margin: "20px 0",
      cursor: "pointer",
      backgroundColor: "#0066cc",
      color: "white",
      border: "none",
      borderRadius: "4px",
    },
    pre: {
      backgroundColor: "#f5f5f5",
      padding: "15px",
      borderRadius: "4px",
      overflowX: "auto",
      wordWrap: "break-word",
      whiteSpace: "pre-wrap",
    },
    section: {
      marginTop: "20px",
    },
  };

  return (
    <>
      <Header />
      {datashow === false ? (
        <>
          <div className="p-4">
            <h3 className="HeadingText mt-3 mb-2 text-center p-2">
              {text_view_invoice}
            </h3>
            <div className="d-flex justify-content-center gap-4 mb-3">
              <Link to="/invoice/allinvoice">
                <button className="btncancel">{button_cancel}</button>
              </Link>
              <button className="CreateBtn" onClick={DownloadPDFHandler}>
                <BsIcons.BsDownload /> {text_download}
              </button>
            </div>
            <div className="d-flex  justify-content-center" id="Paybill">
              <div className="px-2 mt-4 sampleTemplateSTyinvoice">
                <div className="  Paybilltopclr ">&nbsp;</div>
                <div className="row text-center ">
                  <h1 className="tital_billcolor billtext mt-1">Invoice</h1>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={companyLogo === null ? companyProfile : companyLogo}
                      className="invoicePhoto"
                      alt=""
                    />
                  </div>
                  <div className="col-md-8 text-end">
                    <div className="row">
                      <div className="col-md-7 text-end">
                        <b>Invoice No:</b>
                      </div>
                      <div className="col-md-5 text-end">
                        <span>#{NewData?.invoiceID}</span>
                      </div>
                      <div className="col-md-7 text-end">
                        <b>Invoice Date:</b>
                      </div>
                      <div className="col-md-5 text-end">
                        <span>
                          &nbsp;
                          {dayjs(NewData?.createdDate).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="col-md-7 text-end">
                        <b>Due Date:</b>
                      </div>
                      <div className="col-md-5 text-end">
                        <p>
                          &nbsp;{dayjs(NewData?.dueDate).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row titalbill">
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
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <span>To,</span>
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
                <div className="scrollTableviewbill">
                  <table className="table_invoice mt-2">
                    <thead className="billtableheader">
                      <tr className="paybill_style_clr">
                        <th>Sr No</th>
                        {thead?.map((value, index0) => {
                          return (
                            <>
                              <th>
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
                                        v.length === index1 + 3
                                          ? "text-end billrow px-1"
                                          : "billrow" && v.length === index1 + 4
                                          ? "text-start billrow"
                                          : "billrow"
                                      }
                                      key={index1}
                                    >
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
                    <span className="bill_amount">
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
                    <span className="bill_amount">
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
                    <b className="bill_gtotal ">
                      {NewData?.currency.split(" ")[0]}{" "}
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
                    <span>
                      ({NewData?.currencyInWords || NewData?.CryWord}):
                    </span>
                    &nbsp;
                    <span className="capitalize">{capValue}</span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="row">
                    <div className="col-md-6">
                      <b>Bank Details / Wallet Address</b>
                      <Divider />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {NewData?.paymentmethod === "Bank" ? (
                      <p>
                        <b>Bank Name: </b>
                        <span>{NewData?.bank}</span>
                        <br />
                        <b>Account Number: </b>
                        <span>{NewData?.walletAddress}</span>
                        <br />
                        <b>IFSC Code: </b>
                        <span>{NewData?.ifsc}</span>
                        <br />
                        <b>SWIFT Code: </b>
                        <span>{NewData?.swiftcode}</span>
                        <br />
                        <b>IBAN Code: </b>
                        <span>{NewData?.ibancode}</span>
                        <br />
                        <b>ABA Code: </b>
                        <span>{NewData?.abacode}</span>
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
                        <span className="wall_address">
                          {NewData?.walletAddress}
                        </span>
                      </p>
                    )}
                    <div>
                      <button
                        className="btnsave"
                        onClick={() => setDatashow(true)}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 text-end ">
                    {NewData?.paymentmethod === "Crypto" ? (
                      <p>
                        <h5>Scan to Pay</h5>
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
      ) : (
        <>
          <div className="invoice-list p-4">
            <h4 className="fw-bold">
              api-key : 0960b2cf-fa44-4949-a716-9055ce9563c2
            </h4>
            <h4 className="fw-bold">
              Entity-id: f3dcbffd-f5e9-4475-8d38-00f297863adc,
            </h4>
            <h4 className="fw-bold">Merchant-id:{merchantID}</h4>
            {/* {loopInvoices.length > 0 ? (
              loopInvoices.map((invoice, index) => (
                <div key={index} className="invoice-item card-invoice mt-5">
                  <h4 className="fw-bold">
                    Payout Destination ID: {invoice.payoutDestinationId}
                  </h4>
                  <p>
                    <b>Network ID:</b> {invoice.networkId}
                  </p>
                  <p>
                    <b>Wallet Address:</b> {invoice.walletAddress}
                  </p>
                  <p>
                    <b>Date Created:</b>{" "}
                    {new Date(invoice.dateCreated * 1000).toLocaleString()}
                  </p>
                  <p>
                    <b>Default:</b> {invoice.isDefault ? "Yes" : "No"}
                  </p>
                </div>
              ))
            ) : (
              <p>No invoices available.</p>
            )} */}
          </div>
          <div style={styles.container}>
            <h1>API Authentication Token Generator</h1>
            <p>
              Generate a token to authenticate with the API using your wallet.
            </p>

            <button
              onClick={generateAuthToken}
              disabled={loading}
              style={styles.button}
            >
              {loading ? "Connecting..." : "Connect Wallet & Generate Token"}
            </button>

            {address && (
              <div style={styles.section}>
                <h3>Connected Address</h3>
                <pre style={styles.pre}>{address}</pre>
              </div>
            )}

            {status && (
              <div style={styles.section}>
                <h3>Status</h3>
                <div
                  style={{
                    color: status.includes("Error") ? "#dc3545" : "#198754",
                  }}
                >
                  {status}
                </div>
              </div>
            )}

            {token && (
              <>
                <div style={styles.section}>
                  <h3>Generated Token</h3>
                  <pre style={styles.pre}>{token}</pre>
                </div>
                <div style={styles.section}>Create payment method</div>
              </>
            )}
          </div>
          <center>
            <div className="mt-5">
              <button className="btnsave" onClick={() => setDatashow(false)}>
                Back
              </button>
            </div>
          </center>
        </>
      )}
    </>
  );
}

export default ViewInvoice;
