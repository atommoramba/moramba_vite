import React, { useEffect } from "react";
import { Divider } from "@mui/material";
import dayjs from "dayjs";

import RandomeText from "../../utils/RandomeText";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../InvoiceTemplate/Invoice.css";
import {
  CountryCodewithEmoji,
  Cryptocurrency,
  Currency,
} from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { getBillTemplate } from "../../redux/BillTemplateSlice";
import {
  errorToast,
  infoToast,
  successToast,
  warnToast,
} from "../../utils/Helper";
import Cookie from "js-cookie";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { getCompanyBankDetail } from "../../redux/CompanyBankDetailSlice";
import { getCheckbalance } from "../../redux/CheckBalanceSlice";
import { getVendorList } from "../../redux/VendorListSlice";
import { getCustomerList } from "../../redux/CustomerListSlice";
import { getBillList } from "../../redux/BillListSlice";
import { ToastContainer } from "react-toastify";
import toWords from "../../utils/ToNumber";

function TableRows({
  rowsData,
  deleteTableRows,
  handleChange,
  DynamicColData,
}) {
  const BillTemplateData = useSelector((state) => state.BillTemplate);
  const DynamicCol = BillTemplateData[0]?.breakuplist;

  return rowsData.map((data, index) => {
    const { Qty, Price } = data;
    return (
      <tr key={index}>
        {DynamicColData?.map((col, indexCol) => {
          return (
            <>
              <td className="tableDataSty p-2" id={index}>
                <input
                  className="w-75"
                  name={col?.category}
                  placeholder={"Enter " + col?.category}
                  onChange={(evnt) => handleChange(index, evnt)}
                />
              </td>
            </>
          );
        })}

        <td className="tableDataSty p-2">
          <input
            name="Qty"
            type={"number"}
            className="w-75"
            placeholder="Enter Qty"
            onChange={(evnt) => handleChange(index, evnt)}
          />
        </td>
        <td className="tableDataSty p-2">
          <input
            name="Price"
            type={"number"}
            className="w-75"
            placeholder="Enter Price"
            onChange={(evnt) => handleChange(index, evnt)}
          />
        </td>
        <td className="tableDataSty p-2">
          <input
            name="Amount"
            type={"number"}
            className="w-75"
            disabled
            value={Qty * Price}
            onChange={(evnt) => handleChange(index, evnt)}
          />
        </td>
        <td className="tableDataSty p-2">
          <button className="EditBtn" onClick={() => deleteTableRows(index)}>
            delete
          </button>
        </td>
      </tr>
    );
  });
}
function CreateBill() {
  const bankDetailsData = useSelector((state) => state.companyBankDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BillTemplateData = useSelector((state) => state.BillTemplate);
  const checkbalanceData = useSelector((state) => state.CheckBalanceData);
  const [saveDisable, setSaveDisable] = useState(false);
  const [DynamicColData, setDynamicColData] = useState([]);
  useEffect(() => {
    if (checkbalanceData?.length === 0) {
      console.log("CHECK BAL CALLED");
      dispatch(getCheckbalance());
    } else {
      console.log("CHECK BAL NOT CALLED");
    }
  }, []);

  useEffect(() => {
    var tempcmpId = sessionStorage.getItem("_compId");
    if (
      BillTemplateData?.length === 0 ||
      BillTemplateData[0]?.orgId !== tempcmpId
    ) {
      dispatch(getBillTemplate());
    }
  }, []);
  const CurrentDate = new Date();
  const [IssueDate, setIssueDate] = useState(new Date());
  const [DueDate, setDueDate] = useState(new Date());
  const [Country, setCountry] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("Bank");
  const [Bank, setBank] = useState("");

  const [rowsData, setRowsData] = useState([]);
  //Language Variables Start
  //old Lang Const
  const [text_currency, setText_currency] = useState("Select Currency");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_bill_id, setText_bill_id] = useState("Bill ID");

  const [text_issued, setText_issued] = useState("Issue Date");
  const [text_duedate, setText_duedate] = useState("Due Date");
  const [text_account_holdername, setText_account_holdername] =
    useState("Created By");
  const [invoice_errtemplate, setInvoice_errtemplate] = useState(
    "Please Select Template"
  );
  const [text_select_temp, setText_select_temp] = useState(" Select Template");
  const [text_grand_total, setText_grand_total] = useState("Grand Total");
  const [text_additem, setText_additem] = useState("Add Item");
  const [text_account_address, setText_account_address] =
    useState("Wallet Address");
  const [hint_account_address_ph, setHint_account_address_ph] = useState(
    "Select Wallet Address"
  );
  const [text_ifsc_code, setText_ifsc_code] = useState("IFSC Code");
  const [text_account_number, setText_account_number] =
    useState("Account Number");
  const [PaymentMethodTxt, setPaymentMethodTxt] = useState("Payment Method");
  const [text_select_bank, setText_select_bank] = useState("Select Bank");
  const [CreateBilltext, setCreateBilltext] = useState("Create Bill");
  const [text_bankab, setText_bankab] = useState("Bank");
  const [Cryptotxt, setCryptotxt] = useState("Crypto");
  const [PhVendor, setPhVendor] = useState("Select Vendor");
  const [text_vendor, setText_vendor] = useState("Vendor");
  const [VendorAddress, setVendorAddress] = useState("Vendor Address");
  const [invoice_errvendor, setInvoice_errvendor] = useState(
    "Please Select Vendor"
  );
  const [invoice_errbank, setInvoice_errbank] = useState("Please Select Bank");
  const [invoice_errcurrency, setInvoice_errcurrency] = useState(
    "Please Select Currency"
  );

  const [invoice_errwalletadd, setinvoice_errwalletadd] = useState(
    "Please Select Wallet Address"
  );
  const [billtemp_text, setBilltemp_text] = useState("Create Template");
  const [text_tax, setText_tax] = useState("Tax");
  //new
  const [text_subtotal, setText_subtotal] = useState("Sub-Total");
  const [text_amountin_word, setText_amountin_word] =
    useState("Amount In Words");
  const [text_upi_id, setText_upi_id] = useState("UPI ID");
  const [text_ibancode, setText_ibancode] = useState("IBAN Code");
  const [text_abacode, setText_abacode] = useState("ABA Code");
  const [bill_swiftcode, setBill_swiftcode] = useState("SWIFT Code");
  const [text_ifscnum, setText_ifscnum] = useState("IFSC Number");
  //Language Variables End
  useEffect(() => {
    if (bankDetailsData?.length === 0) {
      dispatch(getCompanyBankDetail());
    }
  }, []);

  //Lang COnst END
  const VendorData = useSelector((state) => state.vendorList);
  // const CustomerData = useSelector((state) => state.customerList);
  const dispacth = useDispatch();
  useEffect(() => {
    if (VendorData?.length === 0) {
      dispacth(getVendorList());
    }
  }, []);

  const FilteredCurrency = CountryCodewithEmoji.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(Country.toLowerCase()) !== -1
  );

  const TempChanged = (d) => {
    setDynamicColData([]);
    setRowsData([]);
    function selectedTemplate(item) {
      return item._id === d;
    }
    const l = BillTemplateData.filter(selectedTemplate);
    setDynamicColData(l[0].breakuplist);
    changeGrandTotal([]);
  };

  const addTableRows = () => {
    if (templeteId === "na") {
      infoToast("Please Select Template First!");
      return;
    }
    var rowsInput = {};
    DynamicColData.forEach((d) => {
      rowsInput[d.category] = "";
    });
    rowsInput["Qty"] = "";
    rowsInput["Price"] = "";
    rowsInput["Amount"] = "";
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    changeGrandTotal(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    var total = rowsInput[index]["Qty"] * rowsInput[index]["Price"];
    rowsInput[index]["Amount"] = total;
    setRowsData(rowsInput);
    changeGrandTotal(rowsInput);
  };
  const changeGrandTotal = (rowsInput) => {
    let total = rowsInput.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.Amount;
    }, 0);
    setAutoGrandTotal(total);
  };
  const [autoGrandTotal, setAutoGrandTotal] = useState("");
  const [TaxValue, setTaxValue] = useState(0);
  const [GrandTotal, setGrandTotal] = useState(0);
  const [AmountInWord, setAmountInWord] = useState("zero");
  const [BillID, setBillID] = useState(RandomeText(4));
  const [clientname, setClientname] = useState("");
  const [street, setStreet] = useState("");
  const [templeteId, setTempleteId] = useState("na");
  const [vendorAccAdress, setVendorAccAdress] = useState(""); //New

  const [BankIFSC, setBankIFSC] = useState("");
  const [BankSwift, setBankSwift] = useState("");
  const [BankIbancode, setBankIbancode] = useState("");
  const [BankAbacode, setBankAbacode] = useState("");
  const [BankAccountNum, setBankAccountNum] = useState("");
  const [BankUpi, setBankUpi] = useState("");
  const [BankCurrency, setBankCurrency] = useState("");
  //validation var
  const [errcustomer, setErrcustomer] = useState("");
  const [errbank, setErrbank] = useState("");
  const [errcurrency, setErrcurrency] = useState("");
  const [errselecttemp, setErrselecttemp] = useState("");
  const [errpaymethod, setErrpaymethod] = useState("");
  const [errwalletaddr, setErrwalletaddr] = useState("");

  const CreateBillValidation = () => {
    let Createbill = true;
    if (clientname === "") {
      Createbill = false;
      setErrcustomer(<>*{invoice_errvendor}!</>);
    }
    if (Bank === "") {
      Createbill = false;
      setErrbank(<>*{invoice_errbank}!</>);
    }
    if (BankCurrency === "") {
      Createbill = false;
      setErrcurrency(<>*{invoice_errcurrency}!</>);
    }
    if (templeteId === "na") {
      Createbill = false;
      setErrselecttemp(<>*{invoice_errtemplate}!</>);
    }
    if (Bank === "") {
      Createbill = false;
      setErrwalletaddr(<>*{invoice_errwalletadd}!</>);
    }
    setSaveDisable(false);
    return Createbill;
  };
  const selectedBank = bankDetailsData.filter((e) => {
    return e._id === Bank;
  });

  const saveBill = () => {
    var RowValidation = rowsData.map((val) => {
      return val.Price || val.Amount || val.Qty;
    });
    if (rowsData?.length === 0) {
      infoToast("Please Add Atleast One Item!");
      return;
    }
    if (CreateBillValidation() && RowValidation[0] !== "") {
      setSaveDisable(true);
      var emp_id = sessionStorage.getItem("user_id");
      var createdBy = sessionStorage.getItem("username");
      var _compId = sessionStorage.getItem("_compId");
      var data = {
        _id: "",
        _orgId: _compId,
        billID: BillID === "" ? RandomeText(4) : BillID,
        clientName: clientname === "" ? "clientname" : clientname,
        Customer: clientname === "" ? "clientname" : clientname,
        vendorAddress: street === "" ? "NA" : street,
        issueDate: IssueDate,
        createdBy: createdBy,
        updatedBy: createdBy,
        templeteId: templeteId,
        employeeId: emp_id,
        _partition: GlobalConstants._partition,
        billRecordList: rowsData,
        SubTotal: autoGrandTotal,
        tax: TaxValue,
        grandTotal: GrandTotal,
        finalTotal: autoGrandTotal,
        AmountInWords: AmountInWord,
        walletAddress:
          vendorAccAdress === "" ? BankAccountNum : vendorAccAdress,
        ifsc: BankIFSC,
        swiftcode: BankSwift,
        abacode: BankAbacode,
        ibancode: BankIbancode,
        upi: BankUpi,
        accountnumber: BankAccountNum,
        bank: selectedBank[0]?.bankname,
        paymentmethod: PaymentMethod === "" ? "bank" : PaymentMethod,
        dueDate: DueDate,
        updatedDate:
          dayjs(IssueDate).format("YYYY-MM-DD") === ""
            ? "Jan 01,2022"
            : dayjs(IssueDate).format("YYYY-MM-DD"),
        currency: BankCurrency,
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/billdata/addbilldata?type=insert";
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          var res = response.data;
          console.log(res);
          dispatch(getBillList());
          if (res.status) {
            var bill = res.data._id;
            sessionStorage.setItem("BillId", bill);
            successToast("Bill Created successfully!");
            setSaveDisable(false);
            navigate("/bill/allbill");
          } else {
            console.log(res.message);
          }
        })
        .catch(function (error) {
          setSaveDisable(false);
          errorToast(error.message);
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
    } else {
      warnToast("Please Fill The Details First");
    }
  };

  const filteredBank = bankDetailsData.filter((employee) => {
    return employee._id === Bank;
  });

  useEffect(() => {
    if (filteredBank?.length > 0) {
      setBankAccountNum(filteredBank[0]?.bankaccountno);
      setBankIFSC(filteredBank[0]?.ifsccode);
      setBankSwift(filteredBank[0]?.swiftcode);
      setBankIbancode(filteredBank[0]?.ibancode);
      setBankAbacode(filteredBank[0]?.abacode);
      setBankUpi(filteredBank[0]?.upi);
    }
  }, [filteredBank]);
  console.log(VendorData);
  const Customer = VendorData?.filter((employee) => {
    return employee.vendorname === clientname;
  });
  useEffect(() => {
    if (Customer?.length > 0) {
      setStreet(
        Customer[0]?.address1 +
          "," +
          Customer[0]?.address2 +
          "," +
          Customer[0]?.state +
          "," +
          Customer[0]?.country +
          "," +
          Customer[0]?.zipcode
      );
    }
  }, [Customer]);
  const SetLanguageText = () => {
    try {
      var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");

      setText_currency(
        doc.querySelector("string[name='text_currency']")?.textContent
      );
      setButton_save(
        doc.querySelector("string[name='button_save']")?.textContent
      );
      setButton_cancel(
        doc.querySelector("string[name='button_cancel']")?.textContent
      );
      setText_bill_id(
        doc.querySelector("string[name='text_bill_id']")?.textContent
      );
      setText_issued(
        doc.querySelector("string[name='text_issued']")?.textContent
      );
      setText_duedate(
        doc.querySelector("string[name='text_duedate']")?.textContent
      );
      setText_account_holdername(
        doc.querySelector("string[name='text_account_holdername']")?.textContent
      );

      setText_grand_total(
        doc.querySelector("string[name='text_grand_total']")?.textContent
      );
      setText_additem(
        doc.querySelector("string[name='text_additem']")?.textContent
      );
      setText_account_address(
        doc.querySelector("string[name='text_account_address']")?.textContent
      );
      setHint_account_address_ph(
        doc.querySelector("string[name='hint_account_address_ph']")?.textContent
      );
      setText_ifsc_code(
        doc.querySelector("string[name='text_ifsc_code']")?.textContent
      );
      setText_account_number(
        doc.querySelector("string[name='text_account_number']")?.textContent
      );
      setPaymentMethodTxt(
        doc.querySelector("string[name='PaymentMethodTxt']")?.textContent
      );
      setText_select_bank(
        doc.querySelector("string[name='text_select_bank']")?.textContent
      );
      setText_select_temp(
        doc.querySelector("string[name='text_select_temp']")?.textContent
      );
      setCreateBilltext(
        doc.querySelector("string[name='CreateBilltext']")?.textContent
      );
      setText_bankab(
        doc.querySelector("string[name='text_bankab']")?.textContent
      );
      setCryptotxt(doc.querySelector("string[name='Cryptotxt']")?.textContent);
      setText_vendor(
        doc.querySelector("string[name='text_vendor']")?.textContent
      );
      setPhVendor(doc.querySelector("string[name='PhVendor']")?.textContent);
      setInvoice_errvendor(
        doc.querySelector("string[name='invoice_errvendor']")?.textContent
      );
      setInvoice_errcurrency(
        doc.querySelector("string[name='invoice_errcurrency']")?.textContent
      );
      setInvoice_errtemplate(
        doc.querySelector("string[name='invoice_errtemplate']")?.textContent
      );
      setVendorAddress(
        doc.querySelector("string[name='VendorAddress']")?.textContent
      );
      setBilltemp_text(
        doc.querySelector("string[name='billtemp_text']")?.textContent
      );
      setInvoice_errbank(
        doc.querySelector("string[name='invoice_errbank']")?.textContent
      );
      setText_tax(doc.querySelector("string[name='text_tax']")?.textContent);
      setText_subtotal(
        doc.querySelector("string[name='text_subtotal']")?.textContent
      );
      setText_amountin_word(
        doc.querySelector("string[name='text_amountin_word']")?.textContent
      );
      setText_upi_id(
        doc.querySelector("string[name='text_upi_id']")?.textContent
      );
      setText_ibancode(
        doc.querySelector("string[name='text_ibancode']")?.textContent
      );
      setText_abacode(
        doc.querySelector("string[name='text_abacode']")?.textContent
      );
      setBill_swiftcode(
        doc.querySelector("string[name='bill_swiftcode']")?.textContent
      );
      setText_ifscnum(
        doc.querySelector("string[name='text_ifscnum']")?.textContent
      );
    } catch (errr) {}
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

  useEffect(() => {
    // calculate Tax here

    var Tax = TaxValue;
    var SubTotal = autoGrandTotal;

    var TaxAmount = SubTotal * (Tax / 100);
    var FinalTotalWithTax = Number(SubTotal) + Number(TaxAmount);
    var roundoffGrandTotal = Math.round(FinalTotalWithTax);
    setGrandTotal(roundoffGrandTotal);
  }, [TaxValue, autoGrandTotal]);

  useEffect(() => {
    var roundoffGrandTotal = Math.round(GrandTotal);
    var numberInWords = toWords(roundoffGrandTotal);

    setAmountInWord(numberInWords);
  }, [GrandTotal]);
  return (
    <>
      <Header />
      <h3 className="mt-4 text-center HeadingText">{CreateBilltext}</h3>
      <div className="p-4">
        <div className="d-flex justify-content-between">
          <h4>{sessionStorage.getItem("comp_name")}</h4>
          <h4>{dayjs(CurrentDate).format("MMM DD,YYYY")}</h4>
        </div>
        <Divider />
        <div className="mt-4">
          <div className="row mb-4">
            <div className="col-md-3">
              <h5>
                {text_select_temp} <span className="Star">*</span>
              </h5>
              <select
                className="CountryInputbox1 me-3"
                onChange={(e) => [
                  setTempleteId(e.target.value),
                  setErrselecttemp(""),
                  TempChanged(e.target.value),
                ]}
              >
                <option disabled selected>
                  {text_select_temp}
                </option>
                {BillTemplateData.map((List, index) => {
                  return (
                    <>
                      <option key={index} value={List?._id}>
                        {List?.templatename}
                      </option>
                      ;
                    </>
                  );
                })}
              </select>
              <p className="error_sty">{errselecttemp}</p>
              <Link to={"/bill/template/create"}>
                <button className="CreateBtn">+ {billtemp_text}</button>
              </Link>
            </div>
            <div className="col-md-3">
              <h5 className="billmobileinput">{text_bill_id}</h5>
              <input
                value={BillID}
                // disabled
                onChange={(e) => setBillID(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <h5 className="billmobileinput">{text_account_holdername}</h5>
              <input value={sessionStorage.getItem("username")} disabled />
            </div>
            <div className="col-md-3">
              <h5 className="billmobileinput">
                {PaymentMethodTxt}
                <span className="Star"></span>
              </h5>
              <select
                className="CountryInputbox1"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value={"Bank"} selected>
                  {text_bankab}
                </option>
                <option value={"Crypto"}>{Cryptotxt}</option>
              </select>
            </div>
          </div>
          <Divider />
          <div className="InvoiceBox">
            <div className="DateDiv">
              <h4 className="SubHeadingtext">
                {text_issued} <span className="Star">*</span>
              </h4>
              <DatePicker
                selected={IssueDate}
                dateFormat="MMM dd,yyyy"
                showMonthDropdown
                showYearDropdown
                onChange={(date) => [setIssueDate(date)]}
                className="Inputbox"
                dropdownMode="select"
              />
            </div>
            <div>
              <h4 className="SubHeadingtext">
                {text_duedate} <span className="Star">*</span>
              </h4>
              <DatePicker
                selected={DueDate}
                dateFormat="MMM dd,yyyy"
                showMonthDropdown
                showYearDropdown
                onChange={(date) => [setDueDate(date)]}
                className="Inputbox"
                dropdownMode="select"
              />
            </div>
            <div>
              <h5>
                {text_vendor}
                <span className="Star">*</span>
              </h5>
              <select
                className="CountryInputbox1 me-3"
                onChange={(e) => [
                  setClientname(e.target.value),
                  setErrcustomer(""),
                ]}
              >
                <option disabled selected>
                  {PhVendor}
                </option>
                {VendorData?.map((List, index) => {
                  return (
                    <>
                      <option key={index} value={List?.vendorname}>
                        {List?.vendorname}
                      </option>
                      ;
                    </>
                  );
                })}
              </select>
              <p className="error_sty">{errcustomer}</p>
            </div>
            {Customer?.map((val, index) => {
              return (
                <>
                  <div>
                    <h5>{VendorAddress}</h5>
                    <textarea
                      className="textAreaField"
                      value={
                        val?.address1 +
                        "," +
                        val?.address2 +
                        "," +
                        val?.state +
                        "," +
                        val?.country +
                        "," +
                        val?.zipcode
                      }
                      disabled
                    />
                  </div>
                </>
              );
            })}
          </div>
          <Divider />
          <div>
            {PaymentMethod === "Bank" ? (
              <>
                <div className="InvoiceBox">
                  <div>
                    <h5>
                      {text_bankab}
                      <span className="Star">*</span>
                    </h5>
                    <select
                      className="CountryInputbox1 me-3"
                      onChange={(e) => [
                        setBank(e.target.value),
                        setErrbank(""),
                      ]}
                    >
                      <option disabled selected>
                        {text_select_bank}
                      </option>
                      {bankDetailsData.map((List, index) => {
                        return (
                          <>
                            <option key={index} value={List._id}>
                              {List.bankname}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    <p className="error_sty">{errbank}</p>
                  </div>
                  {filteredBank.map((value, index) => {
                    return (
                      <>
                        <div>
                          <h5>{text_account_number}</h5>
                          <input
                            disabled
                            className="vactionbox1"
                            value={value?.bankaccountno}
                          />
                        </div>
                        {value?.ifsccode !== "" && (
                          <div>
                            <h5>{text_ifscnum}</h5>

                            <input
                              disabled
                              className="vactionbox1"
                              value={value?.ifsccode}
                            />
                          </div>
                        )}
                        {value?.swiftcode !== "" && (
                          <div>
                            <h5>{bill_swiftcode}</h5>
                            <input
                              disabled
                              className="vactionbox1"
                              value={value?.swiftcode}
                            />
                          </div>
                        )}
                        {value?.abacode !== "" && (
                          <div>
                            <h5>{text_abacode}</h5>
                            <input
                              disabled
                              className="vactionbox1"
                              value={value?.abacode}
                            />
                          </div>
                        )}
                        {value?.ibancode !== "" && (
                          <div>
                            <h5>{text_ibancode}</h5>
                            <input
                              disabled
                              className="vactionbox1"
                              value={value?.ibancode}
                            />
                          </div>
                        )}
                        {value?.upi !== "" && (
                          <div>
                            <h5>{text_upi_id}</h5>
                            <input
                              disabled
                              className="vactionbox1"
                              value={value?.upi}
                            />
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="d-flex gap-4 mt-3 mb-3">
                  <div>
                    <h5>
                      {text_account_address}
                      <span className="Star">*</span>
                    </h5>
                    <select
                      className="CountryInputbox1 me-3"
                      onChange={(e) => [
                        setVendorAccAdress(e.target.value),
                        setBank(e.target.value),
                        setErrwalletaddr(""),
                      ]}
                    >
                      <option disabled selected>
                        {hint_account_address_ph}
                      </option>
                      {checkbalanceData?.map((List, i) => {
                        return (
                          <>
                            <option key={i} value={List.address}>
                              {List.address}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    <p className="error_sty">{errwalletaddr}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <Divider />
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {PaymentMethod === "Bank" ? (
                  <>
                    <div>
                      <h5>
                        {text_currency}
                        <span className="Star">*</span>
                      </h5>
                      <select
                        className="CountryInputbox1 billinput"
                        onChange={(e) => [
                          setBankCurrency(e.target.value),
                          setErrcurrency(""),
                        ]}
                      >
                        <option selected disabled value={""}>
                          {text_currency}
                        </option>

                        {FilteredCurrency.map((e, index) => (
                          <>
                            <option
                              key={index}
                              value={e.symbol + " " + e.abbreviation}
                            >
                              {e.currency}
                              &nbsp;&nbsp;
                              {/* {"(" + e.symbol + ")"}{" "} */}
                              {"(" + e.abbreviation + ")"}
                            </option>
                          </>
                        ))}
                        {FilteredCurrency.length === 0 ? (
                          <>
                            {" "}
                            <option value={"$"}>
                              United States Dollar &nbsp;($)
                            </option>
                          </>
                        ) : (
                          ""
                        )}
                      </select>
                      <p className="error_sty">{errcurrency}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h5>
                        {text_currency}
                        <span className="Star">*</span>
                      </h5>
                      <select
                        className="CountryInputbox1"
                        onChange={(e) => [
                          setBankCurrency(e.target.value),
                          setErrcurrency(""),
                        ]}
                      >
                        <option selected disabled>
                          {text_currency}
                        </option>
                        {Cryptocurrency.map((e, i) => (
                          <>
                            <option key={i} value={e.currency}>
                              {e.name}
                              &nbsp;&nbsp;
                              {"(" + e.currency + ")"}
                            </option>
                          </>
                        ))}
                      </select>
                      <p className="error_sty">{errcurrency}</p>
                    </div>
                  </>
                )}
              </div>
              <button className="CreateBtn" onClick={addTableRows}>
                {text_additem}
              </button>
            </div>
            {templeteId !== "na" && (
              <div style={{ overflowX: "scroll" }}>
                <table className="tableSty">
                  <thead>
                    <tr>
                      {DynamicColData?.map((headerData, index) => {
                        return (
                          <>
                            <th className="tableHeadSty" id={index}>
                              {headerData?.category}
                            </th>
                          </>
                        );
                      })}
                      <th className="tableHeadSty">Qty</th>
                      <th className="tableHeadSty">Price</th>
                      <th className="tableHeadSty">Amount</th>
                      <th className="tableHeadSty">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRows
                      rowsData={rowsData}
                      deleteTableRows={deleteTableRows}
                      handleChange={handleChange}
                      DynamicColData={DynamicColData}
                    />
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="InvoiceBox">
            <div>
              <h5>{text_subtotal}</h5>
              <input disabled value={autoGrandTotal} />
            </div>
            <div>
              <h5>{text_tax}(%)</h5>
              <input
                type="number"
                onKeyDown={(evt) =>
                  evt.which !== 8 &&
                  evt.which !== 0 &&
                  (evt.which < 48 || evt.which > 57) &&
                  evt.preventDefault()
                }
                min={0}
                onChange={(e) => setTaxValue(e.target.value)}
              />
            </div>
            <div>
              <h5>{text_grand_total}</h5>
              <input disabled value={GrandTotal} />
            </div>
            <div>
              <h5>{text_amountin_word}</h5>
              <input
                disabled
                value={AmountInWord + " " + "Only"}
                className="amountword"
              />
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-5">
          <Link to="/bill/allbill">
            <button className="btncancel">{button_cancel}</button>
          </Link>
          <button className="btnsave" onClick={saveBill} disabled={saveDisable}>
            {button_save}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreateBill;
