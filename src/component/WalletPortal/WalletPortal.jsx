import React, { useState, useEffect } from "react";
import "./WalletPortal.css";
import Header from "../Header/Header";
import logoBank from "../../assets/img/Bank.png";
import { CgCloseO } from "react-icons/cg";
import QRCode from "react-qr-code";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import CopyToClipboard from "react-copy-to-clipboard";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyBankDetail } from "../../redux/CompanyBankDetailSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import ReactFlagsSelect from "react-flags-select";
import { countriesList, GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getCheckbalance } from "../../redux/CheckBalanceSlice";
import { Divider, Tooltip } from "@mui/material";
import { Ethereum_REGEX, UPIID_REGEX } from "../../utils/Validation";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import { IoCopy } from "react-icons/io5";

const WalletPortal = () => {
  //Redux code
  const dispatch = useDispatch();
  const bankDetailsData = useSelector((state) => state.companyBankDetailData);
  const checkbalanceData = useSelector((state) => state.CheckBalanceData);

  // Language Const start
  // Old Const
  const [text_create, setText_create] = useState("Create");
  const [text_account_number, setText_account_number] =
    useState("Account Number");
  const [text_country, setText_country] = useState("Country");
  const [text_qr_code, setText_qr_code] = useState("QR Code");
  const [text_balance, setText_balance] = useState("Balance");
  const [text_cryptoaddbill, setText_cryptoaddbill] = useState("Crypto Wallet");
  const [text_account_address, setText_account_address] =
    useState("Wallet Address");
  const [text_bank_name, setText_bank_name] = useState("Bank Name");
  const [hint_bank_name, setHint_bank_name] = useState("Enter Your Bank Name");
  const [text_ifsc_code, setText_ifsc_code] = useState("IFSC Code");
  const [hint_ifsc_code, setHint_ifsc_code] = useState("Enter Your IFSC Code");
  const [text_swift_code, setText_swift_code] = useState("Swift Code");
  const [hint_swift_code, setHint_swift_code] = useState(
    "Enter Your Swift Code"
  );
  const [saveDisable, setSaveDisable] = useState(false);
  const [text_aba_code, setText_aba_code] = useState("ABA Code(USA)");
  const [hint_aba_code, setHint_aba_code] = useState("Enter Your ABA Code");
  const [text_iban_code, setText_iban_code] = useState("IBAN Code(Europe)");
  const [hint_iban_code, setHint_iban_code] = useState("Enter Your IBAN Code");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  const [text_update, setText_update] = useState("Update");
  const [text_delete, setText_delete] = useState("Delete");
  const [text_err_bankname, setText_err_bankname] = useState(
    "Please Enter Bank Name"
  );
  const [text_bankaccount_number, setText_bankaccount_number] = useState(
    "Bank Account Number"
  );
  const [hint_bankaccount_number, setHint_bankaccount_number] = useState(
    "Enter Your Bank Account Number"
  );
  const [text_nick_name, setText_nick_name] = useState("Bank Nick Name");
  const [text_bank_add, setText_bank_add] = useState("Bank Address");
  const [text_upi_id, setText_upi_id] = useState("UPI ID");
  const [text_checkbaldeposit, setText_checkbaldeposit] = useState("Deposit");
  const [text_drop_eth, setText_drop_eth] = useState("Eth");
  const [text_network, setText_network] = useState("Network");
  const [text_download, setText_download] = useState("Download");
  const [text_wallet_name, setText_wallet_name] = useState("Wallet Name");
  const [text_ph_wallet_name, setText_ph_wallet_name] =
    useState("Enter Wallet Name");
  const [text_select_token, settext_select_token] = useState("Select Token");
  const [text_select_network, setText_select_network] =
    useState("Select Network");
  const [text_BankAcc, setText_BankAcc] = useState("Bank Accounts");
  const [text_manage, setText_manage] = useState("Manage");
  const [title_BankDetail, setTitle_BankDetail] = useState(
    "Company Bank Details"
  );
  const [text_Token, setText_Token] = useState("Token");
  const [text_Coin, setText_Coin] = useState("Coin");
  const [hint_WP_bank_add, setHint_WP_bank_add] = useState(
    "Enter Your Bank Address"
  );
  const [hint_WP_upi_id, setHint_WP_upi_id] = useState("Enter Your UPI ID");
  const [hint_WP_nick_name, setHint_WP_nick_name] = useState(
    "Enter Your Bank Nick Name"
  );

  const [hint_address_wallerportal, setHint_address_wallerportal] = useState(
    "Enter Wallet Address"
  );
  const [wallet_text_delete, setWallet_text_delete] = useState(
    "Are you sure to permanently delete this details"
  );
  const [wallet_seemore, setWallet_seemore] = useState("Swipe to See More");
  //new lang var
  const [text_err_walletname, setText_err_walletname] = useState(
    "Please Enter Wallet Name"
  );
  const [text_err_walletaddress, setText_err_walletaddress] = useState(
    "Please Enter Wallet Address"
  );
  const [text_err_accnov3, setText_err_accnov3] = useState(
    "Please Enter Bank Account Number"
  );
  const [text_err_upiid, setText_err_upiid] = useState("Please Enter Upi ID");
  const [text_valid_upiid, settext_valid_upiid] = useState(
    "Please Enter Valid Upi ID"
  );
  const [walleterr_text, setWalleterr_text] = useState("Enter Valid Address");
  // Language Const End

  //variable
  const [bankpopup, setBankPopup] = useState(false);
  const [walletpopup, setWalletPopup] = useState(false);
  const [qrpopup, setQrpopup] = useState(false);
  const [copytext, setCopytext] = useState(false);
  const [value, setValue] = useState("");
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);
  //validation variable
  const [errbankName, setErrBankName] = useState("");
  const [erraccNumber, setErrAccNumber] = useState("");
  const [Errupiid, setErrupiid] = useState("");
  const [errwalletname, setErrwalletname] = useState("");
  const [errwalletaddress, setErrwalletaddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifscCode, setIFSCcode] = useState("");
  const [banksddress, setbanksddress] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [abaCode, setABAcode] = useState("");
  const [ibanCode, setIBANcode] = useState("");
  const [upiid, setupiid] = useState("");
  const [banknikname, setbanknikname] = useState("");

  const [Country, setCountry] = useState("India");
  const [CountryCode, setCountryCode] = useState("IN");
  const [id, setID] = useState("");
  const [update, setUpdate] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const [IsLoading1, setIsLoading1] = useState(true);

  // Create HD Wallet
  const [iscreatehdwallet, setIscreatehdwallet] = useState(false);
  const [showhdwallet, setShowhdwallet] = useState(false);
  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
    // changeSalaryTemplate(countryName);
  };
  const bankValidation = () => {
    let bankdetailFromValid = true;
    if (bankName === "") {
      bankdetailFromValid = false;
      setErrBankName(<>*{text_err_bankname}!</>);
    }
    if (accNumber === "") {
      bankdetailFromValid = false;
      setErrAccNumber(<>*{text_err_accnov3}!</>);
    }
    if (upiid !== "") {
      if (!UPIID_REGEX.test(upiid) === true) {
        bankdetailFromValid = false;
        setErrupiid(<>*{text_valid_upiid}!</>);
      }
    }
    setSaveDisable(false);
    return bankdetailFromValid;
  };
  const closeBankPopup = () => {
    setupiid("");
    setIBANcode("");
    setABAcode("");
    setSwiftCode("");
    setIFSCcode("");
    setbanksddress("");
    setAccNumber("");
    setBankName("");
    setbanknikname("");
    setUpdate(false);
    setBankPopup(false);
    setErrBankName("");
    setErrAccNumber("");
    setErrupiid("");
  };
  const closeWalletPopup = () => {
    setWalletPopup(false);
    setcustomernameb("");
    setselectnetw("");
    settokenbal("");
    setAddress("");
    setErrwalletaddress("");
    setErrwalletname("");
  };
  const pdfdownload = () => {
    const input = document.getElementById("qrCode");

    html2canvas(input, {
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("Wallet Address.pdf");
      // successToast("Download successfully done!");
    });
  };

  const closeQRPopup = () => {
    setQrpopup(false);
    setCopytext(false);
  };

  useEffect(() => {
    if (bankDetailsData?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getCompanyBankDetail())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (checkbalanceData?.length === 0) {
      setIsLoading1(true);

      Promise.all([dispatch(getCheckbalance())]).then(() =>
        setTimeout(() => {
          setIsLoading1(false);
        }, 1500)
      );
    } else {
      setIsLoading1(false);
    }
  }, []);

  const BankdetailHandler = () => {
    if (bankValidation()) {
      setSaveDisable(true);
      var compid = sessionStorage.getItem("_compId");
      var UserName = sessionStorage.getItem("username");
      var type = "insert";
      const request_start_at = performance.now();
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/bankdetails?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var d = {
        _id: compid,
        _orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
        banknickname: banknikname,
        bankname: bankName,
        bankaccountno: accNumber,
        country: Country,
        bankaddress: banksddress,
        ifsccode: ifscCode,
        swiftcode: swiftCode,
        abacode: abaCode,
        ibancode: ibanCode,
        upi: upiid,
        createdBy: UserName,
        updateBy: UserName,
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          console.log(res);
          successToast("Bank Details Added Successfully");
          setSaveDisable(false);
          if (res.message === "success") {
            setbanknikname("");
            setBankName("");
            setAccNumber("");
            setCountry("India");
            setbanksddress("");
            setIFSCcode("");
            setSwiftCode("");
            setABAcode("");
            setIBANcode("");
            setupiid("");
          }
          if (response.status === 200) {
            setBankPopup(false);
            dispatch(getCompanyBankDetail());
            console.log(
              "ID:03101=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
          }
        })
        .catch(function (error) {
          errorToast(error.message);
          setSaveDisable(false);
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
        })
        .then(function () {
          // always executed
        });
    }
  };
  const [IsLoading3, setIsLoading3] = useState(false);
  const DataofCompbankALl = (_id) => {
    setIsLoading3(true);
    var type = "select";
    setID(_id);
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/bankdetails?type=" +
      type;
    var d = {
      _id: _id,
      _orgId: sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      ),
      banknickname: "NA",
      bankname: "NA",
      bankaccountno: "NA",
      country: "NA",
      bankaddress: "NA",
      ifsccode: "NA",
      swiftcode: "NA",
      abacode: "NA",
      ibancode: "NA",
      upi: "NA",
      createdBy: "NA",
      updateBy: "NA",
    };

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data;
        var nickname = res.data[0].banknickname;
        setbanknikname(nickname);
        var name = res.data[0].bankname;
        setBankName(name);
        var accno = res.data[0].bankaccountno;
        setAccNumber(accno);
        var country = res.data[0].country;
        setCountry(country);
        var address = res.data[0].bankaddress;
        setbanksddress(address);
        var ifsc = res.data[0].ifsccode;
        setIFSCcode(ifsc);
        var swift = res.data[0].swiftcode;
        setSwiftCode(swift);
        var aba = res.data[0].abacode;
        setABAcode(aba);
        var iban = res.data[0].ibancode;
        setIBANcode(iban);
        var upi = res.data[0].upi;
        setupiid(upi);
        setUpdate(true);
        setTimeout(() => {
          setIsLoading3(false);
        }, 1500);
      })
      .catch(function (error) {
        errorToast(error.message);
        setIsLoading3(false);
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
      })
      .then(function () {
        // always executed
      });
  };
  const EditBankdetails = (_id) => {
    if (bankValidation()) {
      var type = "update";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/bankdetails?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var d = {
        _id: id,
        _orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
        banknickname: banknikname,
        bankname: bankName,
        bankaccountno: accNumber,
        country: Country,
        bankaddress: banksddress,
        ifsccode: ifscCode,
        swiftcode: swiftCode,
        abacode: abaCode,
        ibancode: ibanCode,
        upi: upiid,
        createdBy: sessionStorage.getItem("username"),
        updateBy: sessionStorage.getItem("username"),
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var res = response.data;
          if (res.message === "success") {
            setbanknikname("");
            setBankName("");
            setAccNumber("");
            setCountry("Afghanistan");
            setbanksddress("");
            setIFSCcode("");
            setSwiftCode("");
            setABAcode("");
            setIBANcode("");
            setupiid("");
            setBankPopup(false);
          }
          setUpdate(false);
          setBankPopup(false);
          dispatch(getCompanyBankDetail());
        })
        .catch(function (error) {
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
        })
        .then(function () {
          // always executed
        });
    }
  };

  const handleDelete = (_id) => {
    setDeletePopup(!deletePopup);
    setID(_id);
  };

  const DeleteBank = () => {
    var type = "delete";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/bankdetails?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var d = {
      _id: id,
      _orgId: sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      ),
      banknickname: "NA",
      bankname: "NA",
      bankaccountno: "NA",
      country: "NA",
      bankaddress: "NA",
      ifsccode: "NA",
      swiftcode: "NA",
      abacode: "NA",
      ibancode: "NA",
      upi: "NA",
      createdBy: "NA",
      updateBy: "NA",
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data;
        setBankPopup(false);
        setDeletePopup(false);
        successToast("Bank Details Deleted Successfully");
        dispatch(getCompanyBankDetail());
        setBankPopup(false);
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
  };

  //Crypto Wallet
  const [customernameb, setcustomernameb] = useState("");
  const [selectnetw, setselectnetw] = useState("");
  const [tokenbal, settokenbal] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const insertUpdateBalanceCheck = (
    address,
    balance,
    type,
    orgId,
    employeeId = "NA",
    cusName,
    body
  ) => {
    // post method insertupdatecheckbalance
    //var type = "update";
    var compid = sessionStorage.getItem("_compId");
    var u_id = sessionStorage.getItem("user_id");
    var orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    const request_start_at = performance.now();
    const body1 = { orgId: compid };

    var data = {
      _id: compid,
      _orgId: orgId,
      _partition: GlobalConstants._partition,
      address: address,
      cusName: cusName,
    };
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/PaymentModuleDetails/insertupdatecheckbalance?type=" +
      type +
      "&address=" +
      data.address +
      "&_partition=" +
      data._partition +
      "&balance=" +
      balance +
      "&orgId=" +
      orgId +
      "&employeeId=" +
      u_id +
      "&cusName=" +
      data.cusName;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .post(apiUrl, body1, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        var res = response.data;

        // window.location.reload();
        // getData();

        if (response.status === 200) {
          dispatch(getCheckbalance());
          successToast(response.data.message);
          console.log(
            "ID:03202=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
      })
      .catch(function (error) {
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
  };
  const DeleteBalance = (_id) => {
    console.log(value);
    insertUpdateBalanceCheck(value, "NA", "delete", "NA", "NA", "NA", {
      _id: _id,
    });
    dispatch(getCheckbalance());
    setQrpopup(false);
  };
  const CryptoWalletValidation = () => {
    let bankdetailCryptoFromValid = true;
    if (customernameb === "") {
      bankdetailCryptoFromValid = false;
      setErrwalletname(<>*{text_err_walletname}!</>);
    }
    if (!Ethereum_REGEX.test(address) === true) {
      bankdetailCryptoFromValid = false;
      if (address === "") {
        bankdetailCryptoFromValid = false;
        setErrwalletaddress(<>*{text_err_walletaddress}!</>);
      } else {
        setErrwalletaddress(<>*{walleterr_text}!</>);
      }
    }
    return bankdetailCryptoFromValid;
  };

  const submitHandler = () => {
    if (checkbalanceData.some((element) => element.address === address)) {
      infoToast("Wallet Address is Already Exist!");
      return;
    }
    if (CryptoWalletValidation()) {
      var _compId = sessionStorage.getItem("_compId");
      const request_start_at = performance.now();
      const employeeId = sessionStorage.getItem("_compId");
      const orgID = "NA";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/checkbalance?address=" +
        address +
        "&employeeId=" +
        employeeId;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios.get(apiUrl, headerConfig).then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        setcustomernameb("");
        setselectnetw("");
        settokenbal("");
        setAddress("");
        setErrwalletaddress("");
        var res = response.data;
        var s = res.data;
        if (s.status === "1") {
          const balance = s.result[0].balance;
          var employeeId = sessionStorage.getItem(
            GlobalConstants.session_current_emp_id
          );
          insertUpdateBalanceCheck(
            address,
            balance,
            "update",
            sessionStorage.getItem("_compId"),
            employeeId,
            customernameb,
            {}
          );
        }
        if (response.status === 200) {
          setWalletPopup(false);
          console.log(
            "ID:03201=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
      });
    }
  };
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );
    setText_account_number(
      doc.querySelector("string[name='text_account_number']")?.textContent
    );
    setText_country(
      doc.querySelector("string[name='text_country']")?.textContent
    );
    setText_qr_code(
      doc.querySelector("string[name='text_qr_code']")?.textContent
    );
    setText_balance(
      doc.querySelector("string[name='text_balance']")?.textContent
    );
    setText_cryptoaddbill(
      doc.querySelector("string[name='text_cryptoaddbill']")?.textContent
    );
    setText_account_address(
      doc.querySelector("string[name='text_account_address']")?.textContent
    );
    setText_bank_name(
      doc.querySelector("string[name='text_bank_name']")?.textContent
    );
    setHint_bank_name(
      doc.querySelector("string[name='hint_bank_name']")?.textContent
    );
    setText_ifsc_code(
      doc.querySelector("string[name='text_ifsc_code']")?.textContent
    );
    setHint_ifsc_code(
      doc.querySelector("string[name='hint_ifsc_code']")?.textContent
    );
    setText_swift_code(
      doc.querySelector("string[name='text_swift_code']")?.textContent
    );
    setHint_swift_code(
      doc.querySelector("string[name='hint_swift_code']")?.textContent
    );
    setText_aba_code(
      doc.querySelector("string[name='text_aba_code']")?.textContent
    );
    setHint_aba_code(
      doc.querySelector("string[name='hint_aba_code']")?.textContent
    );
    setText_iban_code(
      doc.querySelector("string[name='text_iban_code']")?.textContent
    );
    setHint_iban_code(
      doc.querySelector("string[name='hint_iban_code']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent
    );
    setText_delete(
      doc.querySelector("string[name='text_delete']")?.textContent
    );
    setText_err_bankname(
      doc.querySelector("string[name='text_err_bankname']")?.textContent
    );
    setText_bankaccount_number(
      doc.querySelector("string[name='text_bankaccount_number']")?.textContent
    );
    setHint_bankaccount_number(
      doc.querySelector("string[name='hint_bankaccount_number']")?.textContent
    );
    setText_nick_name(
      doc.querySelector("string[name='text_nick_name']")?.textContent
    );
    setText_bank_add(
      doc.querySelector("string[name='text_bank_add']")?.textContent
    );
    setText_upi_id(
      doc.querySelector("string[name='text_upi_id']")?.textContent
    );
    setText_checkbaldeposit(
      doc.querySelector("string[name='text_checkbaldeposit']")?.textContent
    );
    setText_drop_eth(
      doc.querySelector("string[name='text_drop_eth']")?.textContent
    );
    setText_network(
      doc.querySelector("string[name='text_network']")?.textContent
    );
    setText_download(
      doc.querySelector("string[name='text_download']")?.textContent
    );
    setText_wallet_name(
      doc.querySelector("string[name='text_wallet_name']")?.textContent
    );
    setText_ph_wallet_name(
      doc.querySelector("string[name='text_ph_wallet_name']")?.textContent
    );
    settext_select_token(
      doc.querySelector("string[name='text_select_token']")?.textContent
    );
    setText_select_network(
      doc.querySelector("string[name='text_select_network']")?.textContent
    );
    setText_BankAcc(
      doc.querySelector("string[name='text_BankAcc']")?.textContent
    );
    setText_manage(
      doc.querySelector("string[name='text_manage']")?.textContent
    );
    setTitle_BankDetail(
      doc.querySelector("string[name='title_BankDetail']")?.textContent
    );
    setText_Token(doc.querySelector("string[name='text_Token']")?.textContent);
    setText_Coin(doc.querySelector("string[name='text_Coin']")?.textContent);
    setHint_WP_bank_add(
      doc.querySelector("string[name='hint_WP_bank_add']")?.textContent
    );
    setHint_WP_upi_id(
      doc.querySelector("string[name='hint_WP_upi_id']")?.textContent
    );
    setHint_WP_nick_name(
      doc.querySelector("string[name='hint_WP_nick_name']")?.textContent
    );
    setHint_address_wallerportal(
      doc.querySelector("string[name='hint_address_wallerportal']")?.textContent
    );
    setWallet_text_delete(
      doc.querySelector("string[name='wallet_text_delete']")?.textContent
    );
    setWallet_seemore(
      doc.querySelector("string[name='wallet_seemore']")?.textContent
    );
    setText_err_walletname(
      doc.querySelector("string[name='text_err_walletname']")?.textContent
    );
    setText_err_walletaddress(
      doc.querySelector("string[name='text_err_walletaddress']")?.textContent
    );
    setText_err_accnov3(
      doc.querySelector("string[name='text_err_accnov3']")?.textContent
    );
    setWalleterr_text(
      doc.querySelector("string[name='walleterr_text']")?.textContent
    );
    setText_err_upiid(
      doc.querySelector("string[name='text_err_upiid']")?.textContent
    );
    settext_valid_upiid(
      doc.querySelector("string[name='text_valid_upiid']")?.textContent
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
  const [openeventcopiedtooltip, setOpeneventcopiedtooltip] = useState(false);
  const [privatekey, setprivatekey] = useState("");
  const [importWallet, setimportWallet] = useState(false);
  const [keys, setKeys] = useState([]);
  const [mnemonic, setMnemonic] = useState([]);
  const [masterPrivateKey, setMasterPrivateKey] = useState("");
  const [masterPublicKey, setMasterPublicKey] = useState("");
  const [masterAddress, setMasterAddress] = useState("");
  const [walletdetails, setWalletdetails] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [openprivatekey, setOpenprivatekey] = useState(false);
  const [getAllData, setgetAllData] = useState([]);

  const generateKeys = async () => {
    setIscreatehdwallet(true);
    setimportWallet(false);
    try {
      const bip39 = await import("bip39");
      const newMnemonic = bip39.generateMnemonic();
      // setMnemonic(newMnemonic);
      const seed = bip39.mnemonicToSeedSync(newMnemonic);
      const masterWallet = ethers.HDNodeWallet.fromSeed(seed);

      const masterPrivateKey = masterWallet.privateKey;
      const masterPublicKey = masterWallet.publicKey;
      const masterAddress = masterWallet.address;

      let walletData = [];

      let globalDebitIndex = 0;
      let globalCreditIndex = 0;

      let debitWallets = [];
      let creditWallets = [];

      // for (let d = 0; d < 1; d++) {
      const debitWallet = masterWallet.derivePath(
        `m/44'/60'/0'/0/${globalDebitIndex}`
      );
      debitWallets.push({
        index: globalDebitIndex,
        privateKey: debitWallet.privateKey,
        publicKey: debitWallet.publicKey,
        address: debitWallet.address,
      });
      //   globalDebitIndex++;
      // }

      // for (let c = 0; c < 1; c++) {
      const creditWallet = masterWallet.derivePath(
        `m/44'/60'/0'/1/${globalCreditIndex}`
      );
      creditWallets.push({
        index: globalCreditIndex,
        privateKey: creditWallet.privateKey,
        publicKey: creditWallet.publicKey,
        address: creditWallet.address,
      });
      //   globalCreditIndex++;
      // }

      walletData.push({ debitWallets, creditWallets });
      console.log(walletData);
      setWalletData(walletData);

      const firstRequestBody = {
        Email_ID: sessionStorage.getItem("Email"), // Add email if applicable
        userid: sessionStorage.getItem("user_id"), // Add user ID if applicable
        Master_public_key: masterPublicKey,
        mnemonic: newMnemonic,
        _orgId: sessionStorage.getItem("_compId"),
        // Seed_phrase: seed,
      };
      console.log(firstRequestBody);

      const firstApiResponse = await fetch(
        GlobalConstants.Cdomain + "/API/moramba/v3/mnemonic/create",
        {
          method: "POST",
          headers: {
            authorization: "bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(firstRequestBody),
        }
      );

      const firstApiResult = await firstApiResponse.json();
      console.log("First API Response (Mnemonic Store):", firstApiResult);
      setMnemonic([firstApiResult.data.mnemonic]);

      const secondRequestBody = {
        _orgId: sessionStorage.getItem("_compId"),
        Email_ID: sessionStorage.getItem("Email"),
        userid: sessionStorage.getItem("user_id"),
        Master_Account: "Master Account",
        Master_private_key: masterPrivateKey,
        Master_public_key: masterPublicKey,
        Master_Public_address: masterAddress,
        Checking_Account: "Check In Account",
        Checking_private_key: debitWallets[0].privateKey,
        Checking_public_key: debitWallets[0].publicKey,
        Checking_Public_address: debitWallets[0].address,
        Saving_Account: "Saving Account",
        Saving_private_key: creditWallets[0].privateKey,
        Saving_public_key: creditWallets[0].publicKey,
        Saving_Public_address: creditWallets[0].address,
        isHDwallet: true,
        isautoaccept: true,
      };
      console.log(secondRequestBody);

      const secondApiResponse = await fetch(
        GlobalConstants.Cdomain + "/API/moramba/v3/wallet/create",
        {
          method: "POST",
          headers: {
            authorization: "bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(secondRequestBody),
        }
      );
      console.log(secondApiResponse);

      const secondApiResult = await secondApiResponse.json();
      console.log("Second API Response (Wallet Creation):", secondApiResult);
      setprivatekey(secondApiResult.data);

      if (!secondApiResponse.ok) throw new Error("Second API call failed!");
      // setMnemonic(newMnemonic);
      const thirdApiResponse = await fetch(
        GlobalConstants.Cdomain +
          `/API/moramba/v3/wallet/get/byuserid?_orgId=${sessionStorage.getItem(
            "_compId"
          )}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: "bearer " + sessionStorage.getItem("token"), // Replace <token> with actual API token
          },
        }
      );
      const thirdApiResult = await thirdApiResponse.json();
      console.log("Third API Response (Fetch Wallet Data):", thirdApiResult);

      if (!thirdApiResponse.ok) throw new Error("Third API call failed!");

      // Update state with fetched wallet data (if needed)
      setgetAllData([thirdApiResult.data]);
      setOpenprivatekey(false);
      // return {
      //   mnemonic: newMnemonic,
      //   masterPrivateKey,
      //   masterPublicKey,
      //   masterAddress,
      //   wallets: walletData,
      // };
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };
  const openHandle = async () => {
    setOpenprivatekey(true);
    const thirdApiResponse = await fetch(
      GlobalConstants.Cdomain +
        `/API/moramba/v3/wallet/get/byuserid?_orgId=${sessionStorage.getItem(
          "_compId"
        )}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: "bearer " + sessionStorage.getItem("token"), // Replace <token> with actual API token
        },
      }
    );
    const thirdApiResult = await thirdApiResponse.json();
    console.log("Third API Response (Fetch Wallet Data):", thirdApiResult);

    if (!thirdApiResponse.ok) throw new Error("Third API call failed!");

    // Update state with fetched wallet data (if needed)
    setgetAllData([thirdApiResult.data]);
    // setShowhdwallet(true)
    setIscreatehdwallet(false);

    // requestFaucetFunds(thirdApiResult.data[0].Debit_Public_address);
  };
  useEffect(() => {
    openHandle();
  }, []);

  const importwalletHandle = () => {
    setimportWallet(!importWallet);
    setIscreatehdwallet(false);
  };
  const closecreatehdPopup = () => {
    setIscreatehdwallet(false);
    setWalletPopup(false);
  };
  return (
    <>
      <Header />
      <div
        className={
          bankpopup ||
          qrpopup ||
          walletpopup === true ||
          deletePopup === true ||
          showhdwallet === true ||
          iscreatehdwallet === true
            ? "bgblur1 p-4"
            : "p-4"
        }
      >
        {IsLoading && IsLoading1 ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between mt-3 ">
              <h3>{text_BankAcc}</h3>
              <button
                className="CreateBtn"
                onClick={() => [
                  setBankPopup(true),
                  setbanknikname(""),
                  setBankName(""),
                  setAccNumber(""),
                  setbanksddress(""),
                  setIFSCcode(""),
                  setSwiftCode(""),
                  setABAcode(""),
                  setIBANcode(""),
                  setupiid(""),
                ]}
              >
                + {text_create}
              </button>
            </div>
            <hr />

            {bankDetailsData.length === 0 && (
              <p className="text-center mt-3">
                There are no records to display
              </p>
            )}
            <div className="bank-account-cards scroll_comp">
              {bankDetailsData?.map((v) => {
                return (
                  <>
                    <div className="bank-account-card">
                      <center>
                        {" "}
                        <img
                          className="bank-account-card-img"
                          src={logoBank}
                          alt="not available"
                        />
                      </center>
                      <h4 className="bank-account-card-title">{v.bankname}</h4>
                      <div className="bank-account-card-acc-no">
                        {text_account_number}: {v.bankaccountno}
                      </div>
                      <div className="bank-account-card-country">
                        {text_country}: {v.country}
                      </div>
                      <div className="d-flex justify-content-center gap-4">
                        <button
                          className="CreateBtn WalletBtn mt-3 "
                          onClick={() => [
                            setBankPopup(true),
                            DataofCompbankALl(v._id),
                          ]}
                        >
                          {text_manage}
                        </button>
                        <button
                          className="DeleteBtn CreateBtn WalletBtn mt-3 "
                          onClick={() => handleDelete(v._id)}
                        >
                          {text_delete}
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <p className="text-center swipecss ">
              {wallet_seemore}
              <HiOutlineChevronDoubleRight />
            </p>
            <div className="d-flex justify-content-between mt-5">
              <div className="d-flex gap-3">
                <h3>{text_cryptoaddbill} /</h3>
                <h3>HD Wallet</h3>
              </div>
              <button
                className="CreateBtn"
                onClick={() => setWalletPopup(!walletpopup)}
              >
                + {text_create}
              </button>
            </div>
            <hr />

            {checkbalanceData.length === 0 && (
              <p className="text-center mt-3">
                There are no records to display
              </p>
            )}
            <div className="bank-details-crypto-wallets scroll_comp">
              {checkbalanceData?.map((v) => {
                return (
                  <>
                    <div className="bank-details-crypto-wallet">
                      <h6 className="text-center fw-bold">Import Wallet</h6>
                      <center>
                        <img
                          className="Crypto-account-card-img"
                          src={logoBank}
                          alt="not available"
                        />
                      </center>
                      <h4 className="bank-account-card-title">{v.cusName}</h4>
                      <div className="bank-account-card-acc-no">
                        {text_account_address}:{truncate(v.address, 15)}
                      </div>
                      {/* <div className="bank-account-card-country">
                        {text_balance}: {v.balance}
                      </div> */}
                      <button
                        className="CreateBtn mt-3"
                        onClick={(e) => [
                          setValue(v?.address),
                          setQrpopup(!qrpopup),
                        ]}
                      >
                        {text_qr_code}
                      </button>
                    </div>
                  </>
                );
              })}
              {getAllData && getAllData.length > 0 ? (
                <div className="bank-details-crypto-wallet">
                  <h6 className="text-center fw-bold">HD Wallet</h6>
                  <center>
                    <button
                      className="CreateBtn mt-5"
                      onClick={() => setShowhdwallet(!showhdwallet)}
                    >
                      Show HD Wallet Details
                    </button>
                  </center>
                </div>
              ) : null}
            </div>

            <p className="text-center swipecss ">
              {wallet_seemore}
              <HiOutlineChevronDoubleRight />
            </p>
          </>
        )}
      </div>
      {IsLoading3 ? (
        <div className="fixed-top mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          {bankpopup === true ? (
            <>
              <div className="main">
                <div className="popup_bank bank-popup" id="popupmobile">
                  <div className="text-end">
                    <h3 className="close mb-3 p-0" id="closeMob_wallet">
                      <CgCloseO
                        onClick={closeBankPopup}
                        className="closeIconSty"
                      />
                    </h3>
                  </div>
                  <center>
                    <h4 className="categorytext">{title_BankDetail}</h4>
                  </center>

                  <hr />
                  <div className="row bank-popup-scroll" id="">
                    <div className="col-md-5">
                      <h5 className="mt-2 title_bank">{text_nick_name}</h5>
                      <input
                        placeholder={hint_WP_nick_name}
                        onChange={(e) => setbanknikname(e.target.value)}
                        value={banknikname}
                        className="bank-popup-inputs salarytypeInput"
                      />
                      <h5 className="mt-4 title_bank">
                        {text_bank_name}
                        <span className="Star">*</span>
                      </h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_bank_name}
                        value={bankName}
                        onChange={(e) => [
                          setBankName(e.target.value),
                          setErrBankName(""),
                        ]}
                      />{" "}
                      <p className="error_sty">{errbankName}</p>
                      <h5 className="mt-4 title_bank">
                        {text_bankaccount_number}
                        <span className="Star">*</span>
                      </h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_bankaccount_number}
                        value={accNumber}
                        onChange={(e) => [
                          setAccNumber(e.target.value),
                          setErrAccNumber(""),
                        ]}
                      />{" "}
                      <p className="error_sty">{erraccNumber}</p>
                      <h5 className="mt-4 title_bank">{text_country}</h5>
                      <ReactFlagsSelect
                        className="CountryInputbox1 salarytypeInput"
                        selected={CountryCode}
                        onSelect={(code) => setCountyData(code)}
                        searchable={true}
                      />
                      <h5 className="mt-4 title_bank">{text_bank_add}</h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_WP_bank_add}
                        value={banksddress}
                        onChange={(e) => setbanksddress(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                      <h5 className="mt-2 title_bank bank-popup-inputs-labels">
                        {text_ifsc_code}
                      </h5>
                      <input
                        placeholder={hint_ifsc_code}
                        value={ifscCode}
                        onChange={(e) => setIFSCcode(e.target.value)}
                        className="bank-popup-input-columns hi salarytypeInput"
                      />
                      <h5 className="mt-4 title_bank">{text_swift_code}</h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_swift_code}
                        value={swiftCode}
                        onChange={(e) => setSwiftCode(e.target.value)}
                      />{" "}
                      <h5 className="mt-4 title_bank">{text_aba_code}</h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_aba_code}
                        value={abaCode}
                        onChange={(e) => setABAcode(e.target.value)}
                      />{" "}
                      <h5 className="mt-4 title_bank">{text_iban_code}</h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_iban_code}
                        value={ibanCode}
                        onChange={(e) => setIBANcode(e.target.value)}
                      />{" "}
                      <h5 className="mt-4 title_bank">{text_upi_id}</h5>
                      <input
                        className="salarytypeInput"
                        placeholder={hint_WP_upi_id}
                        onChange={(e) => [
                          setupiid(e.target.value),
                          setErrupiid(""),
                        ]}
                        value={upiid}
                      />
                      <span className="error_sty">{Errupiid}</span>
                    </div>
                  </div>

                  <hr />
                  <div className="row bank-popup-btns">
                    <center>
                      <button
                        className="btncancel mx-3 mb-4 me-3"
                        onClick={closeBankPopup}
                      >
                        {button_cancel}
                      </button>
                      {update ? (
                        <>
                          <button
                            className="btnsave me-3"
                            onClick={EditBankdetails}
                          >
                            {text_update}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btnsave"
                            onClick={BankdetailHandler}
                            disabled={saveDisable}
                          >
                            {button_save}
                          </button>
                        </>
                      )}
                    </center>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {deletePopup === true ? (
        <>
          <div className="popup_bank delete-popup" id="popupmobile">
            <div className="text-end">
              <h3 className="close mb-3 p-0" id="closeMob_wallet">
                <CgCloseO
                  onClick={() => setDeletePopup(!deletePopup)}
                  className="closeIconSty"
                />
              </h3>
            </div>
            <h4 className="mb-2"> {wallet_text_delete}?</h4>
            <Divider className="mt-3" />
            <center className="mt-4">
              <button
                className="btncancel mx-3 mb-2 me-3"
                onClick={() => setDeletePopup(!deletePopup)}
              >
                {button_cancel}
              </button>
              <button className="ViewBtn p-2" onClick={DeleteBank}>
                {text_delete}
              </button>
            </center>
          </div>
        </>
      ) : (
        ""
      )}
      {walletpopup === true ? (
        <>
          <div className="main">
            <div className="popup_wallet crypto-popup" id="popupmobile">
              <div className="text-end">
                <h3 className="close mb-3  p-0" id="closeMob_wallet">
                  <CgCloseO
                    onClick={closeWalletPopup}
                    className="closeIconSty"
                  />
                </h3>
              </div>
              <center>
                <h4 className="categorytext">{text_cryptoaddbill}</h4>
              </center>
              <hr />

              <div className="row mx-4" id="scroll_wallet">
                <div className="col-md-12 mb-4 text-end">
                  {/* {importWallet === false ? (
                    <>
                      <button
                        className="btnsave"
                        onClick={() => importwalletHandle()}
                      >
                        + Import Wallet
                      </button>{" "}
                    </>
                  ) : (
                    <></>
                  )}{" "} */}
                  {/* &nbsp;&nbsp;&nbsp; */}
                  {/* {getAllData && getAllData.length > 0 ? null : (
                    <> */}
                  <button className="btnsave" onClick={() => generateKeys()}>
                    + Create HD Wallet
                  </button>
                  {/* </>
                  )} */}
                </div>
                <>
                  <div className="row">
                    <h5 className="text-decoration-underline">Import Wallet</h5>
                    <div className="col-md-6 crypto-popup-first-column mt-1">
                      <h5 className="mt-4 title_bank">
                        {text_wallet_name}
                        <span className="Star">*</span>
                      </h5>
                      <input
                        placeholder={text_ph_wallet_name}
                        className="crypto-popup-input-wallet"
                        value={customernameb}
                        onChange={(e) => [
                          setcustomernameb(e.target.value),
                          setErrwalletname(""),
                        ]}
                      />
                      <p className="error_sty">{errwalletname}</p>
                      {/* <h5 className="mt-4 title_bank">
                    {text_Token}/{text_Coin}
                  </h5>
                  <select
                    className="CountryInputbox1 walletinput crypto-popup-token"
                    value={selectnetw}
                    onChange={(e) => setselectnetw(e.target.value)}
                  >
                    <option selected disabled>
                      {text_select_token}
                    </option>
                    <option value="Eth">Eth</option>
                  </select> */}
                    </div>
                    {/* <div className="col-md-2"></div> */}
                    <div className="col-md-6 crypto-popup-second-column">
                      <h5 className="mt-4 title_bank">{text_network}</h5>
                      <select
                        className="CountryInputbox1 walletinput crypto-popup-network"
                        value={tokenbal}
                        onChange={(e) => settokenbal(e.target.value)}
                      >
                        <option selected disabled>
                          {text_select_network}
                        </option>
                        <option value="Eth">Ethereum</option>
                      </select>
                      {/* <h5 className="mt-4 title_bank">
                    {text_account_address}
                    <span className="Star">*</span>
                  </h5>
                  <input
                    value={address}
                    placeholder={hint_address_wallerportal}
                    onChange={(e) => [
                      setAddress(e.target.value),
                      setErrwalletaddress(""),
                    ]}
                    className="crypto-popup-input-wall-address"
                  />
                  <p className="error_sty">{errwalletaddress}</p> */}
                    </div>
                    <div className="col-md-12 crypto-popup-second-column">
                      <h5 className="mt-4 title_bank">
                        {text_account_address}
                        <span className="Star">*</span>
                      </h5>
                      <input
                        value={address}
                        placeholder={hint_address_wallerportal}
                        onChange={(e) => [
                          setAddress(e.target.value),
                          setErrwalletaddress(""),
                        ]}
                        className="crypto-popup-input-wall-address w-100"
                      />
                      <p className="error_sty">{errwalletaddress}</p>
                    </div>
                    <hr />
                    <center className="crypto-popup-btns mb-2">
                      <button
                        className="btncancel mx-3 mb-2"
                        onClick={closeWalletPopup}
                      >
                        {button_cancel}
                      </button>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <button className="btnsave" onClick={submitHandler}>
                        {button_save}
                      </button>
                    </center>
                  </div>
                </>
                {/* {walletdetails === true ? <>{walletData}</> : <></>} */}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {iscreatehdwallet === true ? (
        <>
          <div className="main">
            <div
              className="popup_wallet popup_wallet-hd crypto-popup"
              id="popupmobile"
            >
              <div className="text-end">
                <h3 className="close mb-3  p-0" id="closeMob_wallet">
                  <CgCloseO
                    onClick={closecreatehdPopup}
                    className="closeIconSty"
                  />
                </h3>
              </div>
              <center>
                <h4 className="categorytext">HD Wallet</h4>
              </center>
              <hr />

              <div className="row mx-4" id="scroll_wallet">
                <>
                  <div className="text-center gap-3">
                    <h4 className=" text-black">
                      Write down your Secret <br /> Recovery Phrase
                    </h4>
                  </div>
                  <p className="mt-4 main-copy-text text-center">
                    Write down this 12-word Secret Recovery Phrase and save it
                    in a place that you trust and only you can access.
                  </p>
                  <ul className="list-secret-key">
                    <li>Save in a password manager </li>
                    <li>Store in a safe deposit box</li>
                    <li>Write down and store in multiple secret places</li>
                  </ul>
                  <div className="word-list">
                    {mnemonic.map((v, index) => {
                      let words = v.split(" "); // Splits by space (" ") or use another separator
                      return (
                        <>
                          <div key={index} className="word-item">
                            {words.map((word, wordIndex) => (
                              <div key={wordIndex} className="word-item">
                                <div className="mt-2" style={{ width: "23px" }}>
                                  {wordIndex + 1}.
                                </div>{" "}
                                <button className="word-button">{word}</button>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow
                      open={openeventcopiedtooltip}
                      onClose={() => setOpeneventcopiedtooltip(false)}
                      title="Copied!"
                    >
                      <button
                        className="text-black mnemonic-copy"
                        style={{ width: "max-content" }}
                        onClick={() => [
                          navigator.clipboard.writeText(mnemonic),
                          setOpeneventcopiedtooltip(true),
                        ]}
                      >
                        Copy all to clipboard <IoCopy />
                      </button>
                    </Tooltip>
                  </div>
                  <br />
                  <br />
                  <button
                    className="btnsave"
                    onClick={() => [
                      setShowhdwallet(!showhdwallet),
                      setIscreatehdwallet(false),
                    ]}
                  >
                    Next
                  </button>
                </>

                {/* {walletdetails === true ? <>{walletData}</> : <></>} */}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {qrpopup ? (
        <div className="main">
          <div
            className="popupqr  cssanimationdian sequence fadeInBottomdian qr-popup"
            id="popupmobcheck"
          >
            <div className="row text-end">
              <h3 className="close text-black ">
                <CgCloseO onClick={closeQRPopup} />
              </h3>
            </div>
            <h4 className="text-center text-black">
              {text_checkbaldeposit} {text_drop_eth}
            </h4>
            <br />
            &nbsp;
            <div className="row qr-popup-qrcode" id="qrCode">
              <center>
                <QRCode
                  className="qrsize"
                  title="Moramba"
                  value={value}
                  bgColor={back}
                  fgColor={fore}
                  size={size === "" ? 0 : size}
                />
              </center>
            </div>
            <hr className="text-black" />
            <h5 className=" text-black">{text_account_address}</h5>
            <div className="row">
              <div className="col-md-10">
                <p className="text-black" id="qraddress">
                  {value}
                </p>
              </div>
              <div className="col-md-2">
                {/* <CopyToClipboard
                  text={value}
                  onCopy={() => setCopytext({ copytext: true })}
                >
                  <ContentCopyIcon className="text-black copysize" />
                </CopyToClipboard> */}
                <p className="text-black ">{copytext ? "copied!" : ""}</p>
              </div>
            </div>
            {/* <br /> */}
            {/* <br /> */}
            <h6 className="text-black">{text_network}</h6>
            <h5 className="text-black">Ethereum</h5>
            <hr className="text-black" />
            <br />
            <center className="qr-popup-btns mb-4">
              <button className="btnsave me-3" onClick={pdfdownload}>
                <DownloadIcon /> {text_download}
              </button>
              <button
                className="btncancel p-2"
                onClick={(event) => DeleteBalance(event?._id)}
              >
                {text_delete}
              </button>
            </center>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* {getAllData.length === 0 ? <></> : <>  */}
      {showhdwallet ? (
        <>
          <div className="main">
            <div
              className="popupqr popupqr-hd  cssanimationdian sequence fadeInBottomdian qr-popup qr-popup-hd"
              id="popupmobcheck"
            >
              <div className="row text-end">
                <h3 className="close text-black ">
                  <CgCloseO onClick={() => setShowhdwallet(false)} />
                </h3>
              </div>
              <h4 className="text-center text-black">HD Wallet Details</h4>
              {getAllData.map((v) => {
                return (
                  <>
                    <div className="container card-create-wallet-master text-black">
                      <div className="d-flex justify-content-between">
                        <h4 className="d-flex justify-content-start mb-4 fw-bold">
                          Master Account
                        </h4>
                      </div>
                      <div className=" ">
                        {openprivatekey === true ? (
                          <></>
                        ) : (
                          <>
                            <div className="mb-2 d-flex gap-3 text-black">
                              <strong className="key-size-wallet-master">
                                Private Key:
                              </strong>{" "}
                              {privatekey.Master_private_key}
                            </div>
                          </>
                        )}

                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Public Key:
                          </strong>{" "}
                          {v[0].Master_public_key}
                        </div>
                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Address:
                          </strong>{" "}
                          {v[0].Master_Public_address}
                        </div>
                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Balance:
                          </strong>{" "}
                          0
                        </div>
                      </div>
                    </div>
                    <div className="container card-create-wallet-master mt-1 text-black">
                      <div className="d-flex justify-content-between">
                        <h4 className="d-flex justify-content-start mb-4 fw-bold">
                          Checking Account
                        </h4>
                      </div>
                      <div className=" ">
                        {openprivatekey === true ? (
                          <></>
                        ) : (
                          <>
                            <div className="mb-2 d-flex gap-3 text-black">
                              <strong className="key-size-wallet-master">
                                Private Key:
                              </strong>{" "}
                              {privatekey.Master_private_key}
                            </div>
                          </>
                        )}

                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Public Key:
                          </strong>{" "}
                          {v[0].Checking_public_key}
                        </div>
                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Address:
                          </strong>{" "}
                          {v[0].Checking_Public_address}
                        </div>
                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Balance:
                          </strong>{" "}
                          0
                        </div>
                      </div>
                    </div>
                    <div className="container card-create-wallet-master mt-1 text-black">
                      <div className="d-flex justify-content-between">
                        <h4 className="d-flex justify-content-start mb-4 fw-bold">
                          Saving Account
                        </h4>
                      </div>
                      <div className=" ">
                        {openprivatekey === true ? (
                          <></>
                        ) : (
                          <>
                            <div className="mb-2 d-flex gap-3 text-black">
                              <strong className="key-size-wallet-master">
                                Private Key:
                              </strong>{" "}
                              {privatekey.Master_private_key}
                            </div>
                          </>
                        )}

                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Public Key:
                          </strong>{" "}
                          {v[0].Saving_public_key}
                        </div>
                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Address:
                          </strong>{" "}
                          {v[0].Saving_Public_address}
                        </div>
                        <div className="mb-2 d-flex gap-3">
                          <strong className="key-size-wallet-master">
                            Balance:
                          </strong>{" "}
                          0
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="mt-3 d-flex justify-content-center">
                <button
                  className="btnsave"
                  onClick={() => [
                    setShowhdwallet(false),
                    setWalletPopup(false),
                  ]}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* </>} */}

      <ToastContainer />
    </>
  );
};

export default WalletPortal;
