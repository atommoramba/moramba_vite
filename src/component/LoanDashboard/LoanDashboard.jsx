import React, { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header";
import "./LoanDashboard.css";
import DatePicker from "react-datepicker";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import FilterComponent from "../../utils/FilterComponent";
import dayjs from "dayjs";

import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { getempLoanData } from "../../redux/EmpLoanDataSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { successToast, errorToast } from "../../utils/Helper";
import Cookie from "js-cookie";
import { FaRegThumbsUp } from "react-icons/fa";
import Loader from "../../utils/Loader";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function LoanDashboard() {
  //language variable
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [LoanToEmptxt, setLoanToEmptxt] = useState("Loan to Employee");
  const [text_receive_emp, setText_receive_emp] = useState(
    "Received from Employee"
  );
  const [text_date, setText_date] = useState("Date");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  const [savegiveDisable, setSaveGiveDisable] = useState(false);
  const [savegetDisable, setSaveGetDisable] = useState(false);
  const [text_Amount, setText_Amount] = useState("Amount");
  const [History, setHistory] = useState("History");
  const [PHLoanAmount, setPHLoanAmount] = useState("Enter Loan Amount");
  const [PHLoanDesc, setPHLoanDesc] = useState("Enter Loan Description");
  const [PaymentMethodTxt, setPaymentMethodTxt] = useState("Payment Method");
  const [Cashtxt, setCashtxt] = useState("Cash");
  const [Chequetxt, setChequetxt] = useState("Cheque");
  const [Cryptotxt, setCryptotxt] = useState("Crypto");
  const [PaymentIDtxt, setPaymentIDtxt] = useState("Payment ID");
  const [PHPaymentID, setPHPaymentID] = useState("Enter Payment ID");
  const [TotalLoantxt, setTotalLoantxt] = useState("Total Loan");
  const [RepaidTxt, setRepaidTxt] = useState("Loan Re-Paid");
  const [LoanBalTxt, setLoanBalTxt] = useState("Loan Balance");
  const [text_search_ph, setText_search_ph] = useState("Search Here...");
  const [text_loan_dashboard, setText_loan_dashboard] =
    useState("Loan Dashboard");
  const [text_err_paymentID, setText_err_paymentID] = useState(
    "Please Enter Payment ID"
  );
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [inventoryvalamount_v3, setInventoryvalamount_v3] = useState(
    "Please Enter Loan Amount"
  );
  const [loanamountval_v3, setLoanamountval_v3] = useState(
    "Amount should be more than 0"
  );
  const [loanamountval_v4, setLoanamountval_v4] = useState(
    "Repay amount cannot be greater than loan amount"
  );
  const [text_description, setText_description] = useState("Description");
  const [valpaymentmethod, setvalpaymentmethod] = useState(
    "Select Payment Method"
  );
  const [text_netsalary, setText_netsalary] = useState("Net Salary");
  const [text_anymethodv3, setText_anymethodv3] = useState("Select Any Method");
  const [description_optional, setDescription_optional] = useState(
    "Description (Optional)"
  );
  const [RepayAmount, setRepayAmount] = useState("Enter Re-Payment Amount");
  const [text_repaymentAmt, setText_repaymentAmt] = useState(
    "Re-Payment Amount(Monthly)"
  );
  const [textDisbursementDate, setTextDisbursementDate] =
    useState("Disbursement Date");
  const [text_balance, setText_balance] = useState("Balance");
  const [text_laonamount, setText_laonamount] = useState("Loan Amount");
  //New
  const [text_loanGiven, setText_loanGiven] = useState("Loan Given");
  const [text_loanRepayment, setText_loanRepayment] =
    useState("Loan Repayment");
  const [text_status, settext_status] = useState("Status");
  const [button_submit, setButton_submit] = useState("Submit");
  const [pending_request_text, setPending_request_text] =
    useState("My Pending Request");
  const [text_loan_provider, setText_loan_provider] =
    useState("Loan Provided By");
  const [text_loan_approver, settext_loan_approver] = useState(
    "Contact LoanApprover:"
  );
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  //GIVE LOAN MODULE
  const [GiveAmount, setGiveAmount] = useState("");
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [GiveDesc, setGiveDesc] = useState("");
  const [monthdeduction, setMonthdeduction] = useState("");
  const [GivePaymentID, setGivePaymentID] = useState("");
  const [GivePaymentMethod, setGivePaymentMethod] = useState("Select");
  const [loanProvider, setLoanProvider] = useState("");

  //FROM EMP LOAN MODULE
  const [FromEmpAmount, setFromEmpAmount] = useState("");
  const [FromEmpDesc, setFromEmpDesc] = useState("");
  const [FromEmpPaymentMethod, setFromEmpPaymentMethod] = useState("Select");
  const [FromEmpPaymentID, setFromEmpPaymentID] = useState("");

  //validation variable
  const [giveAmountError, setGiveAmountError] = useState("");
  const [givePaymentIdError, setGivePaymentIdError] = useState("");
  const [FromEmpAmountError, setFromEmpAmountError] = useState("");
  const [FromEmpPaymentIdError, setFromEmpPaymentIdError] = useState("");
  const [errpaymentmethod, setErrpaymentmethod] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [disbursementDate, setDisbursementDate] = useState(new Date());
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [errRepaymentAmt, setErrRepatymentAmt] = useState("");
  const [openSavePopuploanto, setOpenSavePopupLoanTo] = useState(false);
  const [openSaveMessageloanto, setOpenSaveMessageLoanTo] = useState([]);
  const [openSavePopuploanreceive, setOpenSavePopupLoanReceive] =
    useState(false);
  const [openSaveMessageloanreceive, setOpenSaveMessageLoanReceive] = useState(
    []
  );

  const handleClose = () => {
    setOpenSavePopupLoanTo(false);
  };
  const handleCloseloanReceive = () => {
    setOpenSavePopupLoanReceive(false);
  };
  const empLoanData = useSelector((state) => state.empLoanData);
  const AllEmpList = useSelector((state) => state.allEmpList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  function tabActive() {
    $(".list_tabs_n:first-child").addClass("active");
    $(".menu_tabs_row_n:first-child").addClass("active");
    function moveMarker() {
      var activeNav = $(".active a");
      var activewidth = $(activeNav).width() + 30;
      var totalWidth = activewidth;
      var precedingAnchorWidth = anchorWidthCounter();
      var activeMarker = $(".active-marker");
      $(activeMarker).css("display", "block");
      $(activeMarker).css("width", totalWidth);
      $(activeMarker).css("left", precedingAnchorWidth);
    }
    moveMarker();

    function anchorWidthCounter() {
      var anchorWidths = 0;
      var a;
      var aWidth;
      var aPadRight;
      var aTotalWidth;
      $(".list_tabs_n").each(function (index, elem) {
        var activeTest = $(elem).hasClass("active");
        if (activeTest) {
          return false;
        }
        a = $(elem).find("a");
        aWidth = a.width();
        aPadRight = parseFloat(a.css("margin-right"));
        aTotalWidth = aWidth + aPadRight;
        anchorWidths = anchorWidths + aTotalWidth;
      });

      return anchorWidths;
    }

    $(".list_tabs_n a").on("click", function (e) {
      var i = $(this).attr("href");
      $(this).parent().addClass("active").siblings().removeClass("active");
      $(i).addClass("active info").siblings().removeClass("active info");
      e.preventDefault();
      moveMarker();
    });
  }
  useEffect(() => {
    if (empLoanData.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getempLoanData())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  // giveLoan validation
  const giveLoanValidation = () => {
    let loanValidation = true;
    if (GiveAmount === "") {
      loanValidation = false;
      setGiveAmountError(<>*{inventoryvalamount_v3}!</>);
    }
    if (GiveAmount <= "0") {
      loanValidation = false;
      setGiveAmountError(<>{loanamountval_v3}!</>);
    }
    if (GivePaymentID === "") {
      loanValidation = false;
      setGivePaymentIdError(<>*{text_err_paymentID}!</>);
    }
    if (GivePaymentMethod === "Select") {
      loanValidation = false;
      setErrpaymentmethod(<>*{valpaymentmethod}!</>);
    }
    if (repaymentAmount === "") {
      loanValidation = false;
      setErrRepatymentAmt(<>*{RepayAmount}!</>);
    }
    if (Number(repaymentAmount) > Number(GiveAmount)) {
      loanValidation = false;
      setErrRepatymentAmt(<>*{loanamountval_v4}!</>);
    }
    setSaveGiveDisable(false);
    return loanValidation;
  };
  const getEmiDeatils = () => {
    var type = "select";
    var currentempid = sessionStorage.getItem("currentempid");
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/emi/details?type=" +
      type +
      "&_orgId=" +
      _compId +
      "&employeeId=" +
      currentempid;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var rs = response.data.data;
        if (rs != undefined && rs != null && rs != {})
          setRepaymentAmount(
            rs.emi_amount == undefined
              ? 0
              : rs.emi_amount == ""
              ? 0
              : rs.emi_amount
          );
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
  const giveloan = (loanstatus = "out") => {
    const request_start_at = performance.now();
    if (giveLoanValidation()) {
      setSaveGiveDisable(true);
      var type = "insert";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/loan?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var currentempid = sessionStorage.getItem("currentempid");
      var _compId = sessionStorage.getItem("_compId");
      var newdate = dayjs(selectDate).format("YYYY-MM-DD");
      var d = {
        _orgId: _compId,
        employeeId: currentempid,
        amount: GiveAmount === "" ? "0" : GiveAmount,
        date: newdate === "" ? "2022-01-01" : newdate,
        loanstatus: loanstatus,
        paymentmethod: GivePaymentMethod === "" ? "NA" : GivePaymentMethod,
        paymentid: GivePaymentID === "" ? "NA" : GivePaymentID,
        description: GiveDesc === "" ? "NA" : GiveDesc,
        new_emi_req: true,
        new_emi_amount: repaymentAmount,
        disburse_date: disbursementDate,
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var value = response.data.approvalDetails;
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          setGiveAmount("");
          setGiveDesc("");
          setGivePaymentMethod("");
          setGivePaymentID("");
          setRepaymentAmount(0);
          setSelectDate(new Date());
          if (response.status === 200) {
            dispatch(getempLoanData());
            console.log(
              "ID:04902=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
          }
          setOpenSavePopupLoanTo(true);
          setOpenSaveMessageLoanTo(value);
          // successToast(response.data.message);

          setSaveGiveDisable(false);
        })
        .catch(function (error) {
          setSaveGiveDisable(false);
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
    }
  };
  // FromEmpLoan validation
  const fromEmpLoanValidation = () => {
    let fromLoanValidation = true;
    if (FromEmpAmount === "") {
      fromLoanValidation = false;
      setFromEmpAmountError(<>*{inventoryvalamount_v3}!</>);
    }
    if (FromEmpAmount <= "0") {
      fromLoanValidation = false;
      setFromEmpAmountError(<>*{loanamountval_v3}!</>);
    }
    if (Number(FromEmpAmount) > Number(empLoanData?.loanTotal)) {
      fromLoanValidation = false;
      setFromEmpAmountError(<>*{loanamountval_v4}!</>);
    }
    if (FromEmpPaymentID === "") {
      fromLoanValidation = false;
      setFromEmpPaymentIdError(<>*{text_err_paymentID}!</>);
    }
    if (FromEmpPaymentMethod === "Select") {
      fromLoanValidation = false;
      setErrpaymentmethod(<>*{valpaymentmethod}!</>);
    }
    setSaveGetDisable(false);
    return fromLoanValidation;
  };

  const receiveloan = (loanstatus = "in") => {
    if (fromEmpLoanValidation()) {
      setSaveGetDisable(true);
      var type = "insert";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/loan?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var currentempid = sessionStorage.getItem("currentempid");
      var _compId = sessionStorage.getItem("_compId");
      let newdate = dayjs(selectDate).format("YYYY-MM-DD");
      var d = {
        _orgId: _compId,
        employeeId: currentempid,
        amount: FromEmpAmount === "" ? "0" : FromEmpAmount,
        date: newdate === "" ? "2022-01-01" : newdate,
        loanstatus: loanstatus,
        paymentmethod:
          FromEmpPaymentMethod === "" ? "NA" : FromEmpPaymentMethod,
        paymentid: FromEmpPaymentID === "" ? "NA" : FromEmpPaymentID,
        description: FromEmpDesc === "" ? "NA" : FromEmpDesc,
      };

      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var value = response.data.approvalDetails;
          setFromEmpAmount("");
          setFromEmpDesc("");
          setFromEmpPaymentID("");
          setSelectDate(new Date());
          setFromEmpPaymentMethod("");
          dispatch(getempLoanData());
          if (response.status === 200) {
            // successToast(response.data.message);
            setOpenSaveMessageLoanReceive(value);
            setOpenSavePopupLoanReceive(true);
            setSaveGetDisable(false);
          }
        })
        .catch(function (error) {
          setSaveGetDisable(false);
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
    }
  };
  useEffect(() => {
    tabActive();
    getEmiDeatils();
  }, []);

  //Redux code from EmployeeDocSlice
  const EmployeeData = useSelector((state) => state.empData);

  const filteredItems = empLoanData.datas?.filter((item) => {
    return (
      (item.approval_status === "approved" && item.loanstatus === "in") ||
      (item.disburse_status === "approved" && item.loanstatus === "out")
    );
  });
  const filterRequestedData = empLoanData?.datas?.filter((item) => {
    return (
      (item.approval_status === "pending" && item.loanstatus === "in") ||
      (item.approval_status === "rejected"
        ? ""
        : item.disburse_status === "pending" && item.loanstatus === "out")
    );
  });
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        PlaceHolder={text_search_ph}
      />
    );
  }, [filterText, resetPaginationToggle, text_search_ph]);

  const conditionalRowStyles = [
    {
      when: (row) => row.loanstatus === "in",
      style: {
        backgroundColor: "white",
        color: "black",
        border: "1px solid white",
      },
    },
    {
      when: (row) => row.loanstatus === "out",
      style: {
        backgroundColor: "#e3a3",
        color: "black",
        border: "1px solid white",
      },
    },
  ];

  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
    },
    {
      name: <>{text_description}</>,
      selector: (row) => row.loanstatus,
      sortable: true,
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.disburse_date).format("DD MMM, YYYY"),
      sortable: true,
      width: "13%",
    },
    {
      name: <>{PaymentIDtxt}</>,
      selector: (row) => row.paymentid,
      sortable: true,
    },
    {
      name: <>{PaymentMethodTxt}</>,
      selector: (row) => row.paymentmethod,
      sortable: true,
    },
    {
      name: <>{text_loanGiven}</>,
      selector: (row) =>
        row.loanstatus === "out"
          ? [
              `${EmployeeData[0]?.empCurrency}` +
                `${" "}` +
                Number(row.amount)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
            ]
          : "-",
      sortable: true,
    },
    {
      name: <>{text_loanRepayment}</>,
      selector: (row) =>
        row.loanstatus === "in"
          ? [
              `${EmployeeData[0]?.empCurrency}` +
                `${" "}` +
                Number(row.amount)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
            ]
          : "-",
      sortable: true,
    },
    {
      name: <>{text_balance}</>,
      selector: (row) => [
        `${EmployeeData[0]?.empCurrency}` +
          `${" "}` +
          Number(row.currentloan)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      ],
      sortable: true,
    },
  ];

  const pendingRequestcolumns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
    },
    {
      name: <>{text_description}</>,
      selector: (row) => row.loanstatus,
      sortable: true,
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.disburse_date).format("DD MMM, YYYY"),
      sortable: true,
      width: "13%",
    },
    {
      name: <>{PaymentIDtxt}</>,
      selector: (row) => row.paymentid,
      sortable: true,
    },
    {
      name: <>{PaymentMethodTxt}</>,
      selector: (row) => row.paymentmethod,
      sortable: true,
    },
    {
      name: <>{text_loanGiven}</>,
      selector: (row) =>
        row.loanstatus === "out"
          ? [
              `${EmployeeData[0]?.empCurrency}` +
                `${" "}` +
                Number(row.amount)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
            ]
          : "-",
      sortable: true,
    },
    {
      name: <>{text_loanRepayment}</>,
      selector: (row) =>
        row.loanstatus === "in"
          ? [
              `${EmployeeData[0]?.empCurrency}` +
                `${" "}` +
                Number(row.amount)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
            ]
          : "-",
      sortable: true,
    },
    {
      name: <>{text_balance}</>,
      selector: (row) => [
        `${EmployeeData[0]?.empCurrency}` +
          `${" "}` +
          Number(row.currentloan)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      ],
      sortable: true,
    },
    {
      name: <>{text_status}</>,
      selector: (row) =>
        row.loanstatus === "out" ? (
          <span className="text-danger">{row.disburse_status}</span>
        ) : (
          <span className="text-danger">{row.approval_status}</span>
        ),
      sortable: true,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    if (newValue === 2) {
      dispatch(getempLoanData());
    }
    setSelectedTab(newValue);
    setFromEmpAmount("");
    setFromEmpDesc("");
    setFromEmpPaymentID("");
    setSelectDate(new Date());
    setFromEmpPaymentMethod("");
    setGiveAmount("");
    setGiveDesc("");
    setGivePaymentMethod("");
    setGivePaymentID("");
    setSelectDate(new Date());
    setRepayAmount("");
    setMonthdeduction("");
    setDisbursementDate(new Date());
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_search_ph(
      doc.querySelector("string[name='text_search_ph']")?.textContent
    );
    setLoanToEmptxt(
      doc.querySelector("string[name='LoanToEmptxt']")?.textContent
    );
    setText_receive_emp(
      doc.querySelector("string[name='text_receive_emp']")?.textContent
    );
    setHistory(doc.querySelector("string[name='History']")?.textContent);
    setText_date(doc.querySelector("string[name='text_date']")?.textContent);
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent
    );
    setPHLoanAmount(
      doc.querySelector("string[name='PHLoanAmount']")?.textContent
    );
    setPHLoanDesc(doc.querySelector("string[name='PHLoanDesc']")?.textContent);
    setPaymentMethodTxt(
      doc.querySelector("string[name='PaymentMethodTxt']")?.textContent
    );
    setCashtxt(doc.querySelector("string[name='Cashtxt']")?.textContent);
    setChequetxt(doc.querySelector("string[name='Chequetxt']")?.textContent);
    setCryptotxt(doc.querySelector("string[name='Cryptotxt']")?.textContent);
    setPaymentIDtxt(
      doc.querySelector("string[name='PaymentIDtxt']")?.textContent
    );
    setPHPaymentID(
      doc.querySelector("string[name='PHPaymentID']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setTotalLoantxt(
      doc.querySelector("string[name='TotalLoantxt']")?.textContent
    );
    setRepaidTxt(doc.querySelector("string[name='RepaidTxt']")?.textContent);
    setLoanBalTxt(doc.querySelector("string[name='LoanBalTxt']")?.textContent);
    setText_err_paymentID(
      doc.querySelector("string[name='text_err_paymentID']")?.textContent
    );
    setText_loan_dashboard(
      doc.querySelector("string[name='text_loan_dashboard']")?.textContent
    );
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
    setInventoryvalamount_v3(
      doc.querySelector("string[name='inventoryvalamount_v3']")?.textContent
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent
    );
    setvalpaymentmethod(
      doc.querySelector("string[name='valpaymentmethod']")?.textContent
    );
    setText_anymethodv3(
      doc.querySelector("string[name='text_anymethodv3']")?.textContent
    );
    setDescription_optional(
      doc.querySelector("string[name='description_optional']")?.textContent
    );
    setText_balance(
      doc.querySelector("string[name='text_balance']")?.textContent
    );
    setText_repaymentAmt(
      doc.querySelector("string[name='text_repaymentAmt']")?.textContent
    );
    setTextDisbursementDate(
      doc.querySelector("string[name='textDisbursementDate']")?.textContent
    );
    setText_laonamount(
      doc.querySelector("string[name='text_laonamount']")?.textContent
    );
    setLoanamountval_v3(
      doc.querySelector("string[name='loanamountval_v3']")?.textContent
    );

    setText_netsalary(
      doc.querySelector("string[name='text_netsalary']")?.textContent
    );
    setText_loanGiven(
      doc.querySelector("string[name='text_loanGiven']")?.textContent
    );
    setText_loanRepayment(
      doc.querySelector("string[name='text_loanRepayment']")?.textContent
    );
    setRepayAmount(
      doc.querySelector("string[name='RepayAmount']")?.textContent
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent
    );
    setText_loan_provider(
      doc.querySelector("string[name='text_loan_provider']")?.textContent
    );
    setPending_request_text(
      doc.querySelector("string[name='pending_request_text']")?.textContent
    );
    settext_loan_approver(
      doc.querySelector("string[name='text_loan_approver']")?.textContent
    );
    setButton_submit(
      doc.querySelector("string[name='button_submit']")?.textContent
    );
    setText_request(
      doc.querySelector("string[name='text_request']")?.textContent
    );
    setText_approval(
      doc.querySelector("string[name='text_approval']")?.textContent
    );
    setLoanamountval_v4(
      doc.querySelector("string[name='loanamountval_v4']")?.textContent
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

      <h3 className="mt-4 text-center HeadingText loan-heading">
        {text_loan_dashboard}
      </h3>
      <div className="container containerBox mt-5  p-2">
        <div className="p-4">
          <div className="row">
            <div className="col-md-5 mt-5">
              <h2>
                {EmployeeData[0]?.firstName + " " + EmployeeData[0]?.lastName}
              </h2>
              <ul>
                <li>{EmployeeData[0]?.designation}</li>
                <li>
                  {text_netsalary}: {EmployeeData[0]?.empCurrency}&nbsp;
                  {Number(EmployeeData[0]?.empSalaryAmount)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </li>
                <li>
                  {TotalLoantxt}: {EmployeeData[0]?.empCurrency}{" "}
                  {Number(empLoanData?.loanTotalTaken)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </li>
                <li>
                  {RepaidTxt}: {EmployeeData[0]?.empCurrency}{" "}
                  {Number(empLoanData?.loanTotalPaid)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </li>
                <li>
                  {LoanBalTxt}: {EmployeeData[0]?.empCurrency}{" "}
                  {Number(empLoanData?.loanTotal)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </li>
                <li>
                  {text_loan_approver}{" "}
                  <span>
                    {AllEmpList.map((EmpName, i) => {
                      return EmpName._id === EmployeeData[0]?.loanApprovar
                        ? EmpName?.firstName + " " + EmpName?.lastName
                        : "";
                    })}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <AppBar position="static" className="tab_bar mt-3" id="mobBoxtab">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              variant="scrollable"
            >
              <Tab label={LoanToEmptxt} className="loan_text" id="#navtab1" />

              <Tab
                label={text_receive_emp}
                className="loan_text"
                id="#navtab2"
                disabled={Number(empLoanData?.loanTotal) === 0}
              />

              <Tab label={History} className="loan_text" id="#navtab3" />
              <Tab
                label={pending_request_text}
                className="loan_text"
                id="#navtab4"
              />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && (
            <div className="" id="navtab1">
              <Dialog
                fullScreen={fullScreen}
                open={openSavePopuploanto}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle
                  id="responsive-dialog-title"
                  className="text-center"
                >
                  <FaRegThumbsUp className="text-center thumb-sty text-success" />
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {openSaveMessageloanto.map((e) => {
                      return (
                        <>
                          <h3 className="text-center">
                            {text_request}{" "}
                            <span className="font-weight-bold">
                              <b>
                                {e.firstName} {e.lastName} (
                                {e.email === "" ? e.telephoneNumber : e.email})
                              </b>
                            </span>{" "}
                            {text_approval}
                          </h3>
                        </>
                      );
                    })}
                  </DialogContentText>
                  <Divider />
                </DialogContent>
                <DialogActions>
                  <button className="btncancel mx-4" onClick={handleClose}>
                    Ok
                  </button>
                </DialogActions>
              </Dialog>
              <div className="row t-input-fields-1">
                <div className="col-md-3 t-input-fields-1-date">
                  <h4 className="SubHeadingtext">
                    {text_date}
                    <span className="Star">*</span>
                  </h4>
                  <DatePicker
                    selected={selectDate}
                    dateFormat="MMM dd,yyyy"
                    showMonthDropdown
                    showYearDropdown
                    onChange={(date) => [setSelectDate(date)]}
                    className="Inputbox t-input-fields-1-field"
                    disabled
                  />
                </div>
                <div className="col-md-3 t-input-fields-1-amount">
                  <h4 className="SubHeadingtext loan-date-amount-field">
                    {text_laonamount}
                    <span className="Star">*</span>
                  </h4>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="Inputboxcurrency"
                      Value={EmployeeData[0]?.empCurrency}
                      disabled
                    />
                    <input
                      className="Inputbox t-input-fields-1-field"
                      type={"number"}
                      value={GiveAmount}
                      placeholder={PHLoanAmount}
                      onChange={(e) => [
                        setGiveAmount(e.target.value),
                        setGiveAmountError(""),
                        setErrRepatymentAmt(""),
                      ]}
                    />
                  </div>
                  <p className="sperrtext">{giveAmountError}</p>
                </div>
                <div className="col-md-3 t-input-fields-1-desc">
                  <h4 className="SubHeadingtext">{description_optional}</h4>
                  <input
                    className="Inputbox t-input-fields-1-fields"
                    type={"text"}
                    value={GiveDesc}
                    placeholder={PHLoanDesc}
                    onChange={(e) => setGiveDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4 className="SubHeadingtext mt-3">
                    {PaymentMethodTxt}
                    <span className="Star">*</span>
                  </h4>
                  <select
                    className="CountryInputbox1 loan-paymentmethod-field"
                    value={GivePaymentMethod}
                    onChange={(e) => [
                      setGivePaymentMethod(e.target.value),
                      setErrpaymentmethod(""),
                    ]}
                  >
                    <option selected>{text_anymethodv3}</option>
                    <option value={"cash"}>{Cashtxt}</option>
                    <option value={"Cheque"}>{Chequetxt}</option>
                    <option value={"Crypto"}>{Cryptotxt}</option>
                  </select>
                  <p className="sperrtext">{errpaymentmethod}</p>
                </div>
                <div className="col-md-3">
                  <h4 className="SubHeadingtext mt-3">
                    {PaymentIDtxt}
                    <span className="Star">*</span>
                  </h4>
                  <input
                    className="Inputbox t-input-fields-1-field"
                    type={"text"}
                    value={GivePaymentID}
                    placeholder={PHPaymentID}
                    onChange={(e) => [
                      setGivePaymentID(e.target.value),
                      setGivePaymentIdError(""),
                    ]}
                  />
                  <p className="sperrtext">{givePaymentIdError}</p>
                </div>
                <div className="col-md-3">
                  <h4 className="SubHeadingtext mt-3">{text_loan_provider}</h4>
                  <select
                    className="CountryInputbox1 loan-paymentmethod-field"
                    value={loanProvider}
                    onChange={(e) => [setLoanProvider(e.target.value)]}
                  >
                    <option value={"company"}>Company</option>
                  </select>
                </div>
              </div>
              <div className="row t-input-fields-1-date mt-4">
                <div className="col-md-3 t-input-fields-1-date">
                  <h4 className="SubHeadingtext">
                    {textDisbursementDate}
                    <span className="Star">*</span>
                  </h4>
                  <DatePicker
                    selected={disbursementDate}
                    dateFormat="MMM dd,yyyy"
                    showMonthDropdown
                    showYearDropdown
                    onChange={(date) => [setDisbursementDate(date)]}
                    className="Inputbox t-input-fields-1-field"
                    dropdownMode="select"
                  />
                </div>
                <div className="col-md-3 t-input-fields-1-amount">
                  <h4 className="SubHeadingtext loan-date-amount-field">
                    {text_repaymentAmt}
                    <span className="Star">*</span>
                  </h4>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="Inputboxcurrency"
                      Value={EmployeeData[0]?.empCurrency}
                      disabled
                    />
                    <input
                      min="0"
                      className="Inputbox t-input-fields-1-field"
                      type={"number"}
                      value={repaymentAmount}
                      placeholder={RepayAmount}
                      onChange={(e) => [
                        setRepaymentAmount(e.target.value),
                        setErrRepatymentAmt(""),
                      ]}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                  <p className="sperrtext">{errRepaymentAmt}</p>
                </div>
              </div>
              <div className="row mt-5">
                <center>
                  <Link to="/employeedetail">
                    <button className="btncancel ">{button_cancel}</button>
                  </Link>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btnsave"
                    onClick={() => giveloan("out")}
                    disabled={savegiveDisable}
                  >
                    {button_submit}
                  </button>
                </center>
              </div>
            </div>
          )}
          {selectedTab === 1 && (
            <div className="" id="navtab1">
              <Dialog
                fullScreen={fullScreen}
                open={openSavePopuploanreceive}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle
                  id="responsive-dialog-title"
                  className="text-center"
                >
                  <FaRegThumbsUp className="text-center thumb-sty text-success" />
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {openSaveMessageloanreceive.map((e) => {
                      return (
                        <>
                          <h3 className="text-center">
                            {text_request}{" "}
                            <span className="font-weight-bold">
                              <b>
                                {e.firstName} {e.lastName} (
                                {e.email === "" ? e.telephoneNumber : e.email})
                              </b>
                            </span>{" "}
                            {text_approval}
                          </h3>
                        </>
                      );
                    })}
                  </DialogContentText>
                  <Divider />
                </DialogContent>
                <DialogActions>
                  <button
                    className="btncancel mx-4"
                    onClick={handleCloseloanReceive}
                  >
                    Ok
                  </button>
                </DialogActions>
              </Dialog>
              <div className="row t-input-fields-1">
                <div className="col-md-3 t-input-fields-1-date">
                  <h4 className="SubHeadingtext">
                    {text_date}
                    <span className="Star">*</span>
                  </h4>
                  <DatePicker
                    selected={selectDate}
                    dateFormat="MMM dd,yyyy"
                    showMonthDropdown
                    showYearDropdown
                    onChange={(date) => [setSelectDate(date)]}
                    className="Inputbox t-input-fields-1-field"
                    dropdownMode="select"
                  />
                </div>
                <div className="col-md-3 t-input-fields-1-amount">
                  <h4 className="SubHeadingtext loan-date-amount-field">
                    {text_Amount}
                    <span className="Star">*</span>
                  </h4>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="Inputboxcurrency"
                      Value={EmployeeData[0]?.empCurrency}
                      disabled
                    />
                    <input
                      className="Inputbox t-input-fields-1-field"
                      type={"number"}
                      value={FromEmpAmount}
                      placeholder={PHLoanAmount}
                      onChange={(e) => [
                        setFromEmpAmount(e.target.value),
                        setFromEmpAmountError(""),
                      ]}
                    />
                  </div>
                  <p className="sperrtext">{FromEmpAmountError}</p>
                </div>
                <div className="col-md-3 t-input-fields-1-desc">
                  <h4 className="SubHeadingtext">{description_optional}</h4>
                  <input
                    className="Inputbox t-input-fields-1-fields"
                    type={"text"}
                    value={FromEmpDesc}
                    placeholder={PHLoanDesc}
                    onChange={(e) => setFromEmpDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4 className="SubHeadingtext mt-3">
                    {PaymentMethodTxt}
                    <span className="Star">*</span>
                  </h4>
                  <select
                    className="CountryInputbox1 loan-paymentmethod-field"
                    value={FromEmpPaymentMethod}
                    onChange={(e) => [
                      setFromEmpPaymentMethod(e.target.value),
                      setErrpaymentmethod(""),
                    ]}
                  >
                    <option selected>{text_anymethodv3}</option>

                    <option value={"cash"}>{Cashtxt}</option>
                    <option value={"Cheque"}>{Chequetxt}</option>
                    <option value={"Crypto"}>{Cryptotxt}</option>
                  </select>
                  <p className="sperrtext">{errpaymentmethod}</p>
                </div>
                <div className="col-md-3">
                  <h4 className="SubHeadingtext mt-3">
                    {PaymentIDtxt}
                    <span className="Star">*</span>
                  </h4>
                  <input
                    className="Inputbox t-input-fields-1-field"
                    type={"text"}
                    value={FromEmpPaymentID}
                    placeholder={PHPaymentID}
                    onChange={(e) => [
                      setFromEmpPaymentID(e.target.value),
                      setFromEmpPaymentIdError(""),
                    ]}
                  />
                  <p className="sperrtext">{FromEmpPaymentIdError}</p>
                </div>
              </div>

              <div className="row mt-5">
                <center>
                  <Link to="/employeedetail">
                    <button className="btncancel ">{button_cancel}</button>
                  </Link>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btnsave"
                    onClick={() => receiveloan("in")}
                    disabled={savegetDisable}
                  >
                    {button_submit}
                  </button>
                </center>
              </div>
            </div>
          )}
          {selectedTab === 2 && (
            <div className="mt-3" id="">
              <div className="row mb-3 loan-history-fields">
                <div className="col-md-4">
                  <h4 className="SubHeadingtext">{TotalLoantxt}</h4>
                  <input
                    className="Inputbox"
                    value={
                      `${EmployeeData[0]?.empCurrency}` +
                      `${" "}` +
                      Number(empLoanData?.loanTotalTaken)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    }
                    disabled
                  />
                </div>
                <div className="col-md-4 loan-history-repaid-field">
                  <h4 className="SubHeadingtext">{RepaidTxt}</h4>
                  <input
                    className="Inputbox"
                    value={
                      `${EmployeeData[0]?.empCurrency}` +
                      `${" "}` +
                      Number(empLoanData?.loanTotalPaid)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    }
                    disabled
                  />
                </div>
                <div className="col-md-4 loan-history-repaid-field">
                  {" "}
                  <h4 className="SubHeadingtext">{LoanBalTxt}</h4>
                  <input
                    className="Inputbox"
                    value={
                      `${EmployeeData[0]?.empCurrency}` +
                      `${" "}` +
                      Number(empLoanData?.loanTotal)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    }
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex flex-row align-items-left Searchbar me-3 loan-searchbox">
                    <SearchIcon />
                    {subHeaderComponent}
                  </div>
                </div>
                {IsLoading ? (
                  <div className="mt-5 mb-5 d-flex justify-content-center">
                    <Loader />
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    fixedHeader
                    selectableRowsHighlight
                    highlightOnHover
                    customStyles={customTableStyles}
                    subHeader
                    conditionalRowStyles={conditionalRowStyles}
                  />
                )}
              </div>
            </div>
          )}
          {selectedTab === 3 && (
            <div className="mt-3" id="">
              <div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex flex-row align-items-left Searchbar me-3 loan-searchbox">
                    <SearchIcon />
                    {subHeaderComponent}
                  </div>
                </div>
                {IsLoading ? (
                  <div className="mt-5 mb-5 d-flex justify-content-center">
                    <Loader />
                  </div>
                ) : (
                  <DataTable
                    columns={pendingRequestcolumns}
                    data={filterRequestedData}
                    pagination
                    fixedHeader
                    selectableRowsHighlight
                    highlightOnHover
                    customStyles={customTableStyles}
                    subHeader
                    conditionalRowStyles={conditionalRowStyles}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoanDashboard;
