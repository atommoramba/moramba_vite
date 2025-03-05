import React, { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header";
import "../PayrollSheet/PayrollSheet.css";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../../utils/FilterComponent";
import dayjs from 'dayjs'

import "react-big-calendar/lib/css/react-big-calendar.css";
import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import {
  UpdatePayroll,
  getPayrollTableData,
  resetPayroll,
} from "../../redux/PayrollTableDataSlice";
import axios from "axios";
import { GlobalConstants, countriesList } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";
import { CgCloseO } from "react-icons/cg";
import { Divider } from "@mui/material";
import ReactFlagsSelect from "react-flags-select";
import { CountryCodewithEmoji, Currency } from "../../utils/data";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function PayrollSheet() {
  const dispatch = useDispatch();
  const Company_Name = sessionStorage.getItem("comp_name");
  const payrollTableData = useSelector((state) => state.PayrollTableData);
  const testDate = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const CurrentYear = testDate.getFullYear();
  const CurrentMonth = month[testDate.getMonth()];
  const [Country, setCountry] = useState("India");
  const [CountryCode, setCountryCode] = useState("IN");
  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
    // changeSalaryTemplate(countryName);
  };
  const [dateselect, setDateselect] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  //validation var
  const [attendance, setAttendance] = useState("");

  //Language Variables Start
  //old Language Const
  const [text_selCountry, setText_selCountry] = useState("Select Country");
  const [text_download, setText_download] = useState("Download");
  const [TxtPayrollHeading, setTxtPayrollHeading] = useState("Payroll Sheet");
  const [text_emp_name, setText_emp_name] = useState("Employee Name");
  const [text_grosssalary, setText_grosssalary] = useState("Gross Salary");
  const [text_status, settext_status] = useState("Status");
  const [text_paybledays, setText_paybledays] = useState("Payable Days");
  const [title_deduction, setTitle_deduction] = useState("Deduction");
  const [text_tax, setText_tax] = useState("Tax");
  //New Language Const
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [SearchPHText, setSearchPHText] = useState("Search Employee Here...");
  const [errattendance_text, setErrattendance_text] = useState(
    "Please Select Attendance Type"
  );
  const [text_radio_monthly, setText_radio_monthly] = useState("Monthly");
  const [text_bi_weekly2, setText_bi_weekly2] = useState(
    "Bi Weekly(Total Pay Check Every Week)"
  );
  const [settext_clitoref, setText_clitoref] = useState("Click Refresh");
  const [text_radio_weekly, setText_radio_weekly] = useState("Weekly");
  const [settext_bi_monthly2, setText_bi_monthly2] = useState(
    "Bi Monthly(Pay Check Twice a Month)"
  );
  const [text_pay, settext_pay] = useState("Pay");
  const [text_refresh, setText_refresh] = useState("Refresh");
  const [text_edit, setText_edit] = useState("Edit");
  const [button_next, setButton_next] = useState("Next");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [button_previous, setButton_previous] = useState("Previous");
  const [outstanding_loan, setOutstanding_loan] = useState("Outstanding Loan");
  const [text_netsalary, setText_netsalary] = useState("Net Salary");
  const [text_fetchpayroll, setText_fetchpayroll] = useState("Fetch Payroll");
  const [payroll_paid, setPayroll_paid] = useState("Paid");
  const [text_unpaid, setText_unpaid] = useState("Unpaid");
  const [text_pf, setText_pf] = useState("pf");
  const [text_esic, setText_esic] = useState("ESIC");
  const [text_pt, setText_pt] = useState("PT");
  const [text_tds, setText_tds] = useState("TDS");
  const [text_loan, setText_loan] = useState("LOAN");
  const [text_totaldeduction, setText_totaldeduction] =
    useState("TOTAL DEDUCTION	");
  const [text_Currency, setText_Currency] = useState("Currency");

  const [text_editDeductionof, settext_editDeductionof] =
    useState("Edit Deduction of ");
    const [text_update_salary_info,setText_update_salary_info] = useState ("Please update SalaryInfo");
const [text_enternewvalue,setText_enternewvalue] = useState("Enter New Value");
const [text_enterloan,setText_enterloan] = useState("Enter Loan");
  //Language Variables End

  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [DeductionEditPopup, setDeductionEditPopup] = useState(false);
  const [Index, setIndex] = useState(0);
  const [present, setPresent] = useState("");
  const [events, setevents] = useState([]);
  const [allEmpAttendance, setallEmpAttendance] = useState([]);
  const [EmpReportData, setEmpReportData] = useState([]);
  const [EmpReportSalaryData, setEmpReportSalaryData] = useState([]);
  const [FullDayAbsent, setFullDayAbsent] = useState("");
  const [HalfDayAbsent, setHalfDayAbsent] = useState("");
  const [HalfLeaveApplied, setHalfLeaveApplied] = useState("");
  const [FullLeaveApplied, setFullLeaveApplied] = useState([]);

  const [MendatoryTotal, setMendatoryTotal] = useState("");
  const [TaxTotal, setTaxTotal] = useState("");
  const [AllowanceTotal, setAllowanceTotal] = useState("");
  const [DeductionTotal, setDeductionTotal] = useState("");
  const [FinalSalary, setFinalSalary] = useState("");
  const [confirmBox, setConfirmBox] = useState(false);
  const [statusbox, setStatusbox] = useState("");
  const [IsLoading, setIsLoading] = useState(true);

  const [SelectedYear, setSelectedYear] = useState(new Date());
  const [SelectedMonth, setSelectedMonth] = useState(new Date());
  const [SelectedDate, setSelectedDate] = useState(new Date());
  const [SelectedType, setSelectedType] = useState("monthly");
  var FormatedMonth = dayjs(SelectedMonth).format("MMM");
  var FormatedYear = dayjs(SelectedYear).format("YYYY");
  const [EditedLoan, SetEditedLoan] = useState("");
  const [paidButton, setPaidButton] = useState("");
  const navigate = useNavigate();
  const PayrollToken = sessionStorage.getItem("PayrollToken");
  useEffect(() => {
    if (payrollTableData?.length === 0) {
      setIsLoading(true);

      console.log("payroll Table Data API CALLED");
      Promise.all([
        dispatch(
          getPayrollTableData(
            null,
            FormatedMonth,
            FormatedYear,
            Country,
            SelectedDate,
            SelectedType
          )
        ),
      ]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
    } else {
      setIsLoading(false);

      console.log("PAYROLL TABLE API NOT CALLLED");
      // dispatch(getPayrollTableData());
    }
  }, []);

  const viewSalaryThisMonth = (_orgId, _empId, monthname, year) => {
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/EMPMonthlySalaryDetails?type=select";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    let d = {
      _orgId: _orgId,
      absentHalfCount: 0,
      leaveHalfApplied: 0,
      employeeId: _empId,
      month: monthname,
      year: year,
      absentCount: 1,
      leaveApplied: 1,
      actualAmountToPay: 30000,
      loanAmount: 500,
      allowanceAmount: 100,
      deductionAmount: 100,
      salaryAmountPaid: 31000,
      salaryinfo: [],
      taxAmount: "NA",
      mandatoryAmount: "NA",
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data;
        setEmpReportData(res.data.datas);
        setEmpReportSalaryData(res.data.monthlysalaryinfo);
        setHalfLeaveApplied(res.data.datas[0].leaveHalfApplied);
        setFullLeaveApplied(res.data.datas[0].leaveApplied);
        setHalfDayAbsent(res.data.datas[0].absentHalfCount);
        setFullDayAbsent(res.data.datas[0].absentCount);

        setMendatoryTotal(res.data.monthlysalaryinfo[0].mandetorytotal);
        setAllowanceTotal(res.data.monthlysalaryinfo[0].allowancetotal);
        setDeductionTotal(res.data.monthlysalaryinfo[0].deductiontotal);
        setTaxTotal(res.data.monthlysalaryinfo[0].taxtotal);
        setFinalSalary(res.data.monthlysalaryinfo[0].salaryafterdeduction);
        // var list = res.data;
        // setEmpList(list);
      })
      .catch(function (error) {
        console.log(error.message);
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
  const updatingEmpSalary = (_empId, _orgId) => {
    const request_start_at = performance.now();

    const d = new Date();
    let name = GlobalConstants.monthList[d.getMonth()];
    var year = d.getFullYear();

    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/update/trigger/EMPMonthlySalaryDetails?_orgId=" +
      _orgId +
      "&employeeId=" +
      _empId +
      "&month=" +
      name +
      "&year=" +
      year +
      "";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        if (response.status === 200) {
          console.log(
            "ID:00903=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
        var res = response.data;
        if (res.status) {
          //update salary here in redux

          viewSalaryThisMonth(_orgId, _empId, name, year);
        } else {
          console.log(res.message);
        }

        // setData(status);
      })
      .catch(function (error) {
        console.log(error.message);
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
  const getEmpAttendance = (_empId) => {
    console.log("INNNNN");
    const request_start_at = performance.now();

    setPopup(true);
    updatingEmpSalary(_empId, sessionStorage.getItem("_compId"));
    sessionStorage.setItem("TempEmpID", _empId);
    const dataToBeSent = {
      collection_name: "attendance",
      search_key: "employeeId",
      search_value: _empId,
    };

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/collectiondata?collection_name=" +
      dataToBeSent.collection_name +
      "&search_key=" +
      dataToBeSent.search_key +
      "&search_value=" +
      dataToBeSent.search_value +
      "&isbson_id=true";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        if (response.status === 200) {
          console.log(
            "ID:00904=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
        var res = response.data;

        var allEmpAttendanceTemp = JSON.parse(res.data);
        var attendanceData = [];
        var eventData = [];
        for (let i = 0; i < allEmpAttendanceTemp.length; i++) {
          var employeeId = allEmpAttendanceTemp[i].employeeId + "";
          var attendanceDayUTC = allEmpAttendanceTemp[i].attendanceDayUTC + "";
          var status = allEmpAttendanceTemp[i].status + "";
          var statustype = allEmpAttendanceTemp[i].statustype + "";
          var hours = allEmpAttendanceTemp[i].hours + "";
          var HalfDayType =
            allEmpAttendanceTemp[i].HalfDayType === undefined
              ? "NA"
              : allEmpAttendanceTemp[i].HalfDayType + "";
          var approval_status =
            allEmpAttendanceTemp[i].approval_status === undefined
              ? "approved"
              : allEmpAttendanceTemp[i].approval_status;
          attendanceData.push({
            employeeId: employeeId,
            attendanceDayUTC: attendanceDayUTC,
            status: present,
            statustype: statustype,
            hours: hours,
            HalfDayType: HalfDayType,
          });
          var dt = attendanceDayUTC.split("-");
          //present-status/absent-status
          var className = "";
          if (status === "Present") {
            className = "present-status";
          } else if (status === "Absent") {
            className = "absent-status";
            if (statustype === "Vacation") {
              className = "vacation-status";
            }
          } else if (status === "HalfDay") {
            className = "halfday-status";
          } else if (status === "vacation") {
            className = "vacation-status";
          }
          eventData.push({
            title:
              status === "Absent"
                ? statustype === "Vacation"
                  ? "Vacation(" + approval_status + ")"
                  : status
                : status,
            date: new Date(dt[0], dt[1] - 1, dt[2]),
            className: className,
          });
        }
        setallEmpAttendance(JSON.parse(res.data));
        setevents(eventData);
      })
      .catch(function (error) {
        console.log(error.message);
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

        // setLoading(false);
      })
      .then(function () {
        // always executed
      });
  };
  const EmpReport = (_empId) => {
    const request_start_at = performance.now();

    const dNow = new Date();
    let monthname = GlobalConstants.monthList[dNow.getMonth()];
    var year = dNow.getFullYear();
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/EMPMonthlySalaryDetails?type=select";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    let d = {
      _orgId: sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      ),
      absentHalfCount: 0,
      leaveHalfApplied: 0,
      employeeId: _empId,
      month: monthname,
      year: year,
      absentCount: 1,
      leaveApplied: 1,
      actualAmountToPay: 30000,
      loanAmount: 500,
      allowanceAmount: 100,
      deductionAmount: 100,
      salaryAmountPaid: 31000,
      salaryinfo: [],
      taxAmount: "NA",
      mandatoryAmount: "NA",
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        if (response.status === 200) {
          console.log(
            "ID:00905=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
        var res = response.data;
        setEmpReportData(res.data.datas);
        // var list = res.data;
        // setEmpList(list);
      })
      .catch(function (error) {
        console.log(error.message);
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

  const UpdateEmpReport = () => {
    const request_start_at = performance.now();

    const dNow = new Date();
    let monthname = GlobalConstants.monthList[dNow.getMonth()];
    var year = dNow.getFullYear();
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/EMPMonthlySalaryDetails?type=update";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    let d = {
      _orgId: sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      ),
      absentHalfCount: HalfDayAbsent,
      absentCount: FullDayAbsent,
      leaveHalfApplied: HalfLeaveApplied,
      employeeId: sessionStorage.getItem("TempEmpID"),
      month: monthname,
      year: year,
      leaveApplied: FullLeaveApplied,
      actualAmountToPay: FinalSalary,
      loanAmount: 500,
      allowanceAmount: AllowanceTotal,
      deductionAmount: DeductionTotal,
      salaryAmountPaid: 31000,
      salaryinfo: [],
      taxAmount: TaxTotal,
      mandatoryAmount: MendatoryTotal,
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        if (response.status === 200) {
          console.log(
            "ID:00906=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
        var res = response.data;
        setPopup(false);
        setPopup2(false);
        setConfirmBox(false);
        successToast("Details Updated!!");
      })
      .catch(function (error) {
        console.log(error.message);
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
  const popupValidation = () => {
    let radioValid = true;
    if (present === "") {
      radioValid = false;
      setAttendance(<>*{errattendance_text}!</>);
    }
    return radioValid;
  };
  const AttendanceSingleHandler = () => {
    const request_start_at = performance.now();
    if (popupValidation()) {
      // const attendencedate = new Date();
      var utcDay = dayjs(dateselect.dateStr).format("YYYY-MM-DD");
      var shiftStartTimeUTC = dayjs(
        dateselect.dateStr + " " + GlobalConstants.empDefaultShiftStartTime
      ).format("HH:mm:ss");
      var shiftEndTimeUTC = dayjs(
        dateselect.dateStr + " " + GlobalConstants.empDefaultShiftEndTime
      ).format("HH:mm:ss");
      var dataToBSent = {
        _id: "",
        _orgid: sessionStorage.getItem("_compId"),
        createdby: sessionStorage.getItem("username"),
        _partition: GlobalConstants._partition,
        employeeId: sessionStorage.getItem("TempEmpID"),
        attendanceDay: utcDay === "" ? "2022-01-01" : utcDay,
        attendanceDayUTC: utcDay === "" ? "2022-01-01" : utcDay,
        shiftStartTimeUTC: shiftStartTimeUTC,
        shiftEndTimeUTC: shiftEndTimeUTC,
        statustype: statusbox === "" ? "Day" : statusbox,
        description: "NA",
        hours: "0",
        status: present === "" ? "Present" : present,
      };
      var type = "update";

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/update/collection/updateselectattendance?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      axios
        .post(apiUrl, dataToBSent, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          if (response.status === 200) {
            console.log(
              "ID:00907=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
          }
          successToast("Attendance Updated!");
          setPopup2(false);
          getEmpAttendance(sessionStorage.getItem("TempEmpID"));
        })
        .catch(function (error) {
          console.log(error.message);
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
  const handleClickOpen = () => {
    setPopup(!popup);
  };
  const closePopup = () => {
    setPopup(false);
  };

  const closePopup2 = () => {
    setPopup2(false);
    setPresent("");
  };
  const handlefirstClickOpen = () => {
    console.log("dasd");
    setPopup2(!popup2);
  };

  const salaryTrigger = (empid, index, selectedType) => {
    var orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    const month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    const date = new Date();
    var Currentmonth = month[date.getMonth()];
    var CurrentYear = date.getFullYear();

    // var api_url =
    //   GlobalConstants.Cdomain +
    //   "/API/moramba/v3/update/trigger/EMPMonthlySalaryDetails?_orgId=" +
    //   orgId +
    //   "&employeeId=" +
    //   empid +
    //   "&month=" +
    //   FormatedMonth.toLowerCase() +
    //   "&year=" +
    //   FormatedYear;
    var Finaldate = dayjs(SelectedDate).format("YYYY-MM-DD");

    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/salarycalcgeneric?paytype=" +
      selectedType +
      "&date=" +
      Finaldate +
      "&employeeId=" +
      empid +
      "&_orgId=" +
      orgId;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(api_url, headerConfig)
      .then(function (response) {
        successToast("Salary Fetched Successfully!");
        var d = response.data.data;
        dispatch(UpdatePayroll(null, index, d, true));
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
  useEffect(() => {
    PaidUnpaidHandle(SelectedYear);
  }, []);

  const PaidUnpaidHandle = (date) => {
    var orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var SelectedMonth = dayjs(date).format("MMM");
    var SelectedYear = dayjs(date).format("YYYY");
    var api_url =
      GlobalConstants.Cdomain +
      `/API/moramba/v3/get_update/salarylockupdate?year=${dayjs(date).format(
        "YYYY"
      )}&month=${dayjs(date)
        .format("MMM")
        .toLowerCase()}&type=select&_orgId=${orgId}&islock=`;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(api_url, headerConfig)
      .then(function (response) {
        var data = response.data.data;
        setPaidButton(data);
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
  const SalaryLockTrigger = (lockType) => {
    console.log(lockType);
    var orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var api_url =
      GlobalConstants.Cdomain +
      `/API/moramba/v3/get_update/salarylockupdate?year=${FormatedYear}&month=${FormatedMonth.toLowerCase()}&type=update&_orgId=${orgId}&islock=${lockType}`;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(api_url, headerConfig)
      .then(function (response) {
        PaidUnpaidHandle(SelectedYear);
        successToast(
          lockType === "true"
            ? "Salary Locked Successfully"
            : " Salary Unlocked Successfully!"
        );
      })
      .catch(function (error) {
        errorToast(error.message);
        console.log(error.message);
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
  const isFutureDate = (date) => {
    var selectedDate = dayjs(date, "MM-DD-YYYY");
    var todayDate = dayjs(dayjs().format("MM-DD-YYYY"), "MM-DD-YYYY");

    var dDiff = todayDate.diff(selectedDate);
    if (dDiff < 0) {
      return true;
    } else {
      return false;
    }
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");

    setText_selCountry(
      doc.querySelector("string[name='text_selCountry']")
        ?.textContent
    );
    setText_download(
      doc.querySelector("string[name='text_download']")?.textContent
        
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent
    );
    setTxtPayrollHeading(
      doc.querySelector("string[name='TxtPayrollHeading']")
        ?.textContent
    );
    setText_emp_name(
      doc.querySelector("string[name='text_emp_name']")?.textContent
        
    );
    setText_grosssalary(
      doc.querySelector("string[name='text_grosssalary']")
        ?.textContent
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent
        
    );
    setTitle_deduction(
      doc.querySelector("string[name='title_deduction']")
        ?.textContent
    );
    setText_pf(
      doc.querySelector("string[name='text_pf']")?.textContent
    );
    setText_esic(
      doc.querySelector("string[name='text_esic']")?.textContent
    );
    setText_pt(
      doc.querySelector("string[name='text_pt']")?.textContent
    );
    setText_tds(
      doc.querySelector("string[name='text_tds']")?.textContent
    );
    setText_loan(
      doc.querySelector("string[name='text_loan']")?.textContent
    );
    setText_totaldeduction(
      doc.querySelector("string[name='text_totaldeduction']")
        ?.textContent
    );

    setText_netsalary(
      doc.querySelector("string[name='text_netsalary']")?.textContent
        
    );
    setPayroll_paid(
      doc.querySelector("string[name='payroll_paid']")?.textContent
        
    );

    setText_unpaid(
      doc.querySelector("string[name='text_unpaid']")?.textContent
        
    );

    setText_tax(
      doc.querySelector("string[name='text_tax']")?.textContent
    );
    setText_refresh(
      doc.querySelector("string[name='text_refresh']")?.textContent
        
    );
    settext_pay(
      doc.querySelector("string[name='text_pay']")?.textContent
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent
    );
    setSearchPHText(
      doc.querySelector("string[name='SearchPHText']")?.textContent
        
    );
    setErrattendance_text(
      doc.querySelector("string[name='errattendance_text']")
        ?.textContent
    );
    setButton_next(
      doc.querySelector("string[name='button_next']")?.textContent
        
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
        
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
        
    );
    setButton_previous(
      doc.querySelector("string[name='button_previous']")
        ?.textContent
    );
    // setSalaryType(
    //   doc.querySelector("string[name='salaryType']")?.textContent
    //     
    // );
    setOutstanding_loan(
      doc.querySelector("string[name='outstanding_loan']")
        ?.textContent
    );
    setText_fetchpayroll(
      doc.querySelector("string[name='text_fetchpayroll']")
        ?.textContent
    );
    setText_paybledays(
      doc.querySelector("string[name='text_paybledays']")
        ?.textContent
    );
    setText_Currency(
      doc.querySelector("string[name='text_Currency']")?.textContent
        
    );
    settext_editDeductionof(
      doc.querySelector("string[name='text_editDeductionof']")
        ?.textContent
    );
    setText_radio_monthly(
      doc.querySelector("string[name='text_radio_monthly']")
        ?.textContent
    );
    setText_bi_weekly2(
      doc.querySelector("string[name='settext_bi_monthly2']")
        ?.textContent
    );
    setText_radio_weekly(
      doc.querySelector("string[name='text_radio_weekly']")
        ?.textContent
    );
    setText_bi_monthly2(
      doc.querySelector("string[name='settext_bi_monthly2']")
        ?.textContent
    );
    setText_clitoref(
      doc.querySelector("string[name='settext_clitoref']")
        ?.textContent
    );
    setText_update_salary_info(
      doc.querySelector("string[name='text_update_salary_info']")
        ?.textContent
    );
    setText_enternewvalue(
      doc.querySelector("string[name='text_enternewvalue']")
        ?.textContent
    );
    setText_enterloan(
      doc.querySelector("string[name='text_enterloan']")
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

  const Empcount = sessionStorage.getItem("TotalEmpinPayroll");
  const [page, setPage] = useState(0);
  const [IsNextDisable, setIsNextDisable] = useState(false);
  const pageData = useMemo(() => {
    return payrollTableData?.slice(page * 10, page * 10 + 10);
  }, [page, payrollTableData]);
  useEffect(() => {
    if (pageData.length < 10) {
      setIsNextDisable(true);
    } else {
      setIsNextDisable(false);
    }
  }, [pageData.length]);
  const nextPage = () => {
    setIsLoading(true);
    var hasMoreEmp = sessionStorage.getItem("hasMoreEmp");
    var PayrollNextToken = sessionStorage.getItem("PayrollToken");
    if (hasMoreEmp === "true") {
      Promise.all([
        dispatch(
          getPayrollTableData(
            PayrollNextToken,
            FormatedMonth,
            FormatedYear,
            Country,
            SelectedDate,
            SelectedType
          )
        ),
      ]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
      if (pageData.length >= (page * 10, page * 10 + 10)) {
        setPage((prev) => prev + 1);
      }
    } else {
      setIsLoading(false);
      setPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    setIsNextDisable(false);
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const filteredItems = pageData?.filter(
    (item) =>
      JSON.stringify(item.firstName)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );
  console.log(filteredItems);
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          PlaceHolder={SearchPHText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, SearchPHText]);

  const exportTableToExcel = (tableID, filename = "") => {
    // var downloadLink;
    // var dataType = "application/vnd.ms-excel";
    // var tableSelect = document.getElementById(tableID);
    // var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
    // filename = filename ? filename + ".xls" : "Payroll_data.xls";
    // downloadLink = document.createElement("a");
    // document.body.appendChild(downloadLink);
    // if (navigator.msSaveOrOpenBlob) {
    //   var blob = new Blob(["\ufeff", tableHTML], {
    //     type: dataType,
    //   });
    //   navigator.msSaveOrOpenBlob(blob, filename);
    // } else {
    //   downloadLink.href = "data:" + dataType + ", " + tableHTML;
    //   downloadLink.download = filename;
    //   downloadLink.click();
    // }

    var csvFile;
    var downloadLink;

    csvFile = new Blob([tableID], { type: "text/csv" });

    downloadLink = document.createElement("a");

    downloadLink.download = filename;

    downloadLink.href = window.URL.createObjectURL(csvFile);

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
  };
  const exportTableToCSV = (filename) => {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");
      console.log(cols);
      for (var j = 0; j < cols.length - 2; j++) row.push(cols[j].innerText);

      csv.push(row.join(","));
      console.log(csv);
    }
    exportTableToExcel(csv.join("\n"), filename);
  };
  const SaveEditedDeduction = () => {
    console.log(filteredItems[Index]?.firstName);
    var temp = [{ loan: EditedLoan }];
    for (
      let i = 0;
      i < filteredItems[Index]?.salaryinfo[0]?.deductionlist.length;
      i++
    ) {
      var obj = {};
      obj[filteredItems[Index]?.salaryinfo[0]?.deductionlist[i].key] =
        document.getElementById("deductionval" + i).value === ""
          ? 0
          : Number(document.getElementById("deductionval" + i).value);
      temp.push(obj);
    }
    for (
      let idx = 0;
      idx < filteredItems[Index]?.salaryinfo[0]?.taxlist.length;
      idx++
    ) {
      var obj2 = {};
      obj2[filteredItems[Index]?.salaryinfo[0]?.taxlist[idx].key] =
        document.getElementById("taxval" + idx).value === ""
          ? 0
          : Number(document.getElementById("taxval" + idx).value);
      temp.push(obj2);
    }
    console.log(temp);

    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/update/collection/EMPMonthlysalary/byadmin";

    var data = {
      _orgId: sessionStorage.getItem("_compId"),
      employeeId: filteredItems[Index]?._id,
      year: FormatedYear,
      month: FormatedMonth.toLowerCase(),
      changedVal: temp,
    };
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(api_url, data, headerConfig)
      .then(() => {
        successToast("Deduction Edited Successfully!");
        setDeductionEditPopup(false);
      })
      .catch((err) => {
        errorToast("Error While Editing!");
        setDeductionEditPopup(false);
      });
  };

  const SymbolToText = (symbol, idx) => {
    var currencySymbol = symbol;
    setTimeout(() => {
      var test = CountryCodewithEmoji.filter((e) => e?.abbreviation === currencySymbol);
      document.getElementById("currency" + idx).innerText =
        test[0]?.abbreviation;
    }, 500);
  };
  return (
    <>
      <Header />
      <h3 className="mt-5 text-center HeadingText">
        {TxtPayrollHeading} of {FormatedMonth},{CurrentYear}
      </h3>
      <div
        className={
          DeductionEditPopup === true
            ? "d-flex flex-wrap gap-2 justify-content-center my-3 bgblur1 align-items-end"
            : "d-flex flex-wrap gap-2 justify-content-center my-3 align-items-end"
        }
      >
        <div>
          <ReactFlagsSelect
            className="CountryInputbox1"
            selected={CountryCode}
            onSelect={(code) => [setCountyData(code)]}
            searchable={true}
            inputStyle={{
              background: "#ffffff",
              width: "60%",
              // height: "43px",
              borderBottom: "3px solid #6d9886",
            }}
          />
        </div>
        <div>
          <DatePicker
            className="PayrollDate"
            selected={SelectedDate}
            onChange={(date) => [setSelectedDate(date), PaidUnpaidHandle(date)]}
            popperPlacement="bottom"
          />
        </div>
        {/* <div>
          <DatePicker
            className="PayrollDate"
            selected={SelectedMonth}
            onChange={(date) => [
              setSelectedMonth(date),
              PaidUnpaidHandle(date),
            ]}
            showMonthYearPicker
            maxDate={new Date()}
            dateFormat="MMM"
            popperPlacement="bottom"
          />
        </div>
        <div>
          <DatePicker
            className="PayrollDate"
            selected={SelectedYear}
            onChange={(date) => [setSelectedYear(date), PaidUnpaidHandle(date)]}
            showYearPicker
            dateFormat="yyyy"
            maxDate={new Date()}
            popperPlacement="bottom"
          />
        </div> */}
        <div>
          <select
            className="CountryInputbox1"
            defaultValue={"monthly"}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="monthly">{text_radio_monthly}</option>
            <option value="weekly">{text_radio_weekly}</option>
            <option value="biweekly">{text_bi_weekly2}</option>
            <option value="bimonthly">{settext_bi_monthly2}</option>
          </select>
        </div>
      </div>
      <div
        className={
          DeductionEditPopup === true
            ? "d-flex flex-wrap gap-2 justify-content-center bgblur1"
            : "d-flex flex-wrap gap-2 justify-content-center"
        }
      >
        <button
          className="CreateBtn"
          onClick={() => [
            dispatch(resetPayroll()),
            dispatch(
              getPayrollTableData(
                null,
                FormatedMonth,
                FormatedYear,
                Country,
                SelectedDate,
                SelectedType
              )
            ),
          ]}
        >
          {text_fetchpayroll}
        </button>
        <button
          className="ViewBtn p-2"
          onClick={() =>
            exportTableToCSV(
              `${Company_Name}-Payroll-${FormatedMonth}-${FormatedYear}`
            )
          }
        >
          {text_download}
        </button>
        <button className="btncancel" onClick={() => SalaryLockTrigger("true")}>
          {paidButton !== null ? payroll_paid : text_pay}
        </button>
      </div>
      <div
        className={
          popup === true || popup2 === true || DeductionEditPopup === true
            ? " PayrollBox bgblur1"
            : " PayrollBox "
        }
      >
        <div className="d-flex flex-wrap justify-content-between mb-4">
          <div>
            <h3 className="HeadingText">{Company_Name}</h3>
          </div>

          <div className="justify-content-between">
            <div className="d-flex text-end Searchbar search_temp">
              <SearchIcon />
              {subHeaderComponent}
            </div>
          </div>
        </div>

        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <>
            {" "}
            <div className="scrollTableDashbaord mt-4">
              <table className="DashboardTable" id="PayrollMainTable">
                <thead>
                  <tr>
                    <th>{text_Sno}</th>
                    <th>{text_emp_name}</th>
                    <th>{text_paybledays}</th>
                    <th>{text_Currency}</th>
                    <th>{text_grosssalary}</th>
                    {Country === "India" ? (
                      <>
                        <th>{text_pf}</th>
                        <th>{text_esic}</th>
                        <th>{text_pt}</th>
                        <th>{text_tds}</th>
                        <th>{text_loan}</th>
                      </>
                    ) : (
                      ""
                    )}

                    <th>{text_totaldeduction}</th>
                    <th>{text_netsalary}</th>
                    <th>{text_refresh}</th>
                    {Country === "India" ? <th>{text_edit}</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems?.map((v, index) => {
                    return (
                      <>
                        <tr>
                          <td>{page * 10 + index + 1}</td>
                          <td>
                            {v?.firstName} {v?.lastName}
                          </td>
                          <td align="center">
                            {v?.salarydetails?.length === 0 ? (
                              <>{settext_clitoref}</>
                            ) : (
                              v?.salarydetails[0]?.emp_present
                            )}
                          </td>
                          <td align="center" id={"currency" + index}>
                            {v?.empCurrency}
                          </td>
                          <td align="right">
                            {v?.empSalaryPayType === "weekly"
                              ? (
                                  (Number(v?.empGrossSalaryAmount) * 12) /
                                  52
                                ).toFixed(2)
                              : v?.empSalaryPayType === "biweekly"
                              ? (
                                  (Number(v?.empGrossSalaryAmount) * 12) /
                                  26
                                ).toFixed(2)
                              : v?.empSalaryPayType === "monthly"
                              ? Number(v?.empGrossSalaryAmount).toFixed(2)
                              : v?.empSalaryPayType === "bimonthly"
                              ? (Number(v?.empGrossSalaryAmount) / 2).toFixed(2)
                              : ""}
                          </td>
                          {Country === "India" ? (
                            <>
                              <td align="right">
                                {v?.salarydetails[0]?.isPF_ChangeByAdmin ===
                                true ? (
                                  Number(
                                    v?.salarydetails[0]?.PF_ChangeByAdmin
                                  ).toFixed(2)
                                ) : (
                                  <>
                                    {v?.salaryinfo.length === 0
                                      ? "0.00"
                                      : v?.salaryinfo[v?.salaryinfo.length - 1]
                                          .deductionlist === undefined
                                      ? "0.00"
                                      : v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].deductionlist.some(
                                          (item) => item.key === "pf"
                                        )
                                      ? v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].deductionlist.map((item, i) => (
                                          <>
                                            {item.key === "pf"
                                              ? v?.empSalaryPayType === "weekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    52
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "biweekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    26
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "monthly"
                                                ? Number(item.valdata).toFixed(
                                                    2
                                                  )
                                                : v?.empSalaryPayType ===
                                                  "bimonthly"
                                                ? (
                                                    Number(
                                                      item.valdata
                                                    ).toFixed(2) / 2
                                                  ).toFixed(2)
                                                : ""
                                              : ""}
                                          </>
                                        ))
                                      : "0.00"}
                                  </>
                                )}
                              </td>

                              <td align="right">
                                {v?.salarydetails[0]?.isESIC_ChangeByAdmin ===
                                true ? (
                                  Number(
                                    v?.salarydetails[0]?.ESIC_ChangeByAdmin
                                  ).toFixed(2)
                                ) : (
                                  <>
                                    {v?.salaryinfo.length === 0
                                      ? "0.00"
                                      : v?.salaryinfo[v?.salaryinfo.length - 1]
                                          .deductionlist === undefined
                                      ? "0.00"
                                      : v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].deductionlist.some(
                                          (item) => item.key === "esic"
                                        )
                                      ? v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].deductionlist.map((item, i) => (
                                          <>
                                            {item.key === "esic"
                                              ? v?.empSalaryPayType === "weekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    52
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "biweekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    26
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "monthly"
                                                ? Number(item.valdata).toFixed(
                                                    2
                                                  )
                                                : v?.empSalaryPayType ===
                                                  "bimonthly"
                                                ? (
                                                    Number(
                                                      item.valdata
                                                    ).toFixed(2) / 2
                                                  ).toFixed(2)
                                                : ""
                                              : ""}
                                          </>
                                        ))
                                      : "0.00"}
                                  </>
                                )}
                              </td>

                              <td align="right">
                                {v?.salarydetails[0]?.isPT_ChangeByAdmin ===
                                true ? (
                                  Number(
                                    v?.salarydetails[0]?.PT_ChangeByAdmin
                                  ).toFixed(2)
                                ) : (
                                  <>
                                    {v?.salaryinfo.length === 0
                                      ? "0.00"
                                      : v?.salaryinfo[v?.salaryinfo.length - 1]
                                          .taxlist === undefined
                                      ? "0.00"
                                      : v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].taxlist.some(
                                          (item) => item.key === "pt"
                                        )
                                      ? v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].taxlist.map((item, i) => (
                                          <>
                                            {item.key === "pt"
                                              ? v?.empSalaryPayType === "weekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    52
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "biweekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    26
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "monthly"
                                                ? Number(item.valdata).toFixed(
                                                    2
                                                  )
                                                : v?.empSalaryPayType ===
                                                  "bimonthly"
                                                ? (
                                                    Number(
                                                      item.valdata
                                                    ).toFixed(2) / 2
                                                  ).toFixed(2)
                                                : ""
                                              : ""}
                                          </>
                                        ))
                                      : "0.00"}
                                  </>
                                )}
                              </td>

                              <td align="right">
                                {v?.salarydetails[0]
                                  ?.isTDSDeduct_ChangeByAdmin === true ? (
                                  Number(
                                    v?.salarydetails[0]?.TDSDeduct_ChangeByAdmin
                                  ).toFixed(2)
                                ) : (
                                  <>
                                    {v?.salaryinfo.length === 0
                                      ? "0.00"
                                      : v?.salaryinfo[v?.salaryinfo.length - 1]
                                          .taxlist === undefined
                                      ? "0.00"
                                      : v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].taxlist.some(
                                          (item) => item.key === "tds"
                                        )
                                      ? v?.salaryinfo[
                                          v?.salaryinfo.length - 1
                                        ].taxlist.map((item, i) => (
                                          <>
                                            {item.key === "tds"
                                              ? v?.empSalaryPayType === "weekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    52
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "biweekly"
                                                ? (
                                                    (Number(
                                                      item.valdata
                                                    ).toFixed(2) *
                                                      12) /
                                                    26
                                                  ).toFixed(2)
                                                : v?.empSalaryPayType ===
                                                  "monthly"
                                                ? Number(item.valdata).toFixed(
                                                    2
                                                  )
                                                : v?.empSalaryPayType ===
                                                  "bimonthly"
                                                ? (
                                                    Number(
                                                      item.valdata
                                                    ).toFixed(2) / 2
                                                  ).toFixed(2)
                                                : ""
                                              : ""}
                                          </>
                                        ))
                                      : "0.00"}
                                  </>
                                )}
                              </td>
                              <td align="right">
                                {v?.salarydetails[0]
                                  ?.isLoanDeduct_ChangeByAdmin === true ? (
                                  Number(
                                    v?.salarydetails[0]
                                      ?.LoanDeduct_ChangeByAdmin
                                  ).toFixed(2)
                                ) : (
                                  <>
                                    {v?.salarydetails?.length === 0 ? (
                                      <>{settext_clitoref}</>
                                    ) : (
                                      Number(
                                        v?.salarydetails[0]?.loandeduct ===
                                          undefined
                                          ? "0.00"
                                          : v?.salarydetails[0]?.loandeduct
                                      ).toFixed(2)
                                    )}
                                  </>
                                )}
                              </td>
                            </>
                          ) : (
                            ""
                          )}
                          <td align="right">
                            {v?.salarydetails?.length === 0 ? (
                              <>{settext_clitoref}</>
                            ) : (
                              [
                                v?.empSalaryPayType === "weekly"
                                  ? (
                                      ((Number(
                                        v?.salarydetails[0]?.loandeduct ===
                                          undefined
                                          ? 0
                                          : v?.salarydetails[0]?.loandeduct
                                      ) +
                                        Number(
                                          v?.salaryinfo[
                                            v?.salaryinfo.length - 1
                                          ]?.deductiontotal === undefined
                                            ? 0
                                            : v?.salaryinfo[
                                                v?.salaryinfo.length - 1
                                              ]?.deductiontotal
                                        ) +
                                        Number(
                                          v?.salaryinfo[
                                            v?.salaryinfo.length - 1
                                          ]?.taxtotal === undefined
                                            ? 0
                                            : v?.salaryinfo[
                                                v?.salaryinfo.length - 1
                                              ]?.taxtotal
                                        )) *
                                        12) /
                                      52
                                    ).toFixed(2)
                                  : v?.empSalaryPayType === "biweekly"
                                  ? (
                                      ((Number(
                                        v?.salarydetails[0]?.loandeduct ===
                                          undefined
                                          ? 0
                                          : v?.salarydetails[0]?.loandeduct
                                      ) +
                                        Number(
                                          v?.salaryinfo[
                                            v?.salaryinfo.length - 1
                                          ]?.deductiontotal === undefined
                                            ? 0
                                            : v?.salaryinfo[
                                                v?.salaryinfo.length - 1
                                              ]?.deductiontotal
                                        ) +
                                        Number(
                                          v?.salaryinfo[
                                            v?.salaryinfo.length - 1
                                          ]?.taxtotal === undefined
                                            ? 0
                                            : v?.salaryinfo[
                                                v?.salaryinfo.length - 1
                                              ]?.taxtotal
                                        )) *
                                        12) /
                                      26
                                    ).toFixed(2)
                                  : v?.empSalaryPayType === "monthly"
                                  ? (
                                      Number(
                                        v?.salarydetails[0]?.loandeduct ===
                                          undefined
                                          ? 0
                                          : v?.salarydetails[0]?.loandeduct
                                      ) +
                                      Number(
                                        v?.salaryinfo[v?.salaryinfo.length - 1]
                                          ?.deductiontotal === undefined
                                          ? 0
                                          : v?.salaryinfo[
                                              v?.salaryinfo.length - 1
                                            ]?.deductiontotal
                                      ) +
                                      Number(
                                        v?.salaryinfo[v?.salaryinfo.length - 1]
                                          ?.taxtotal === undefined
                                          ? 0
                                          : v?.salaryinfo[
                                              v?.salaryinfo.length - 1
                                            ]?.taxtotal
                                      )
                                    ).toFixed(2)
                                  : v?.empSalaryPayType === "bimonthly"
                                  ? (
                                      (Number(
                                        v?.salarydetails[0]?.loandeduct ===
                                          undefined
                                          ? 0
                                          : v?.salarydetails[0]?.loandeduct
                                      ) +
                                        Number(
                                          v?.salaryinfo[
                                            v?.salaryinfo.length - 1
                                          ]?.deductiontotal === undefined
                                            ? 0
                                            : v?.salaryinfo[
                                                v?.salaryinfo.length - 1
                                              ]?.deductiontotal
                                        ) +
                                        Number(
                                          v?.salaryinfo[
                                            v?.salaryinfo.length - 1
                                          ]?.taxtotal === undefined
                                            ? 0
                                            : v?.salaryinfo[
                                                v?.salaryinfo.length - 1
                                              ]?.taxtotal
                                        )) /
                                      2
                                    ).toFixed(2)
                                  : "",
                              ]
                            )}
                          </td>
                          <td align="right">
                            {v?.salarydetails?.length === 0 ? (
                              <>{settext_clitoref}</>
                            ) : (
                              <>
                                {Number(
                                  v?.salarydetails[0]?.actualAmountToPay
                                ).toFixed(2)}
                              </>
                            )}
                          </td>
                          {/* <td align="right">
                            {v?.salarydetails?.length === 0
                              ? "Click Refresh"
                              : [
                                  v?.empCurrency,

                                  Number(
                                    v?.salarydetails[0]?.loanAmount ===
                                      undefined
                                      ? 0
                                      : v?.salarydetails[0]?.loanAmount -
                                          (v?.salarydetails[0]?.loandeduct ===
                                          undefined
                                            ? 0
                                            : v?.salarydetails[0]?.loandeduct)
                                  )
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                                ]}{" "}
                          </td> */}
                          <td>
                            <button
                              className="CreateBtn"
                              onClick={() =>
                                salaryTrigger(v?._id, index, SelectedType)
                              }
                            >
                              {text_refresh}
                            </button>
                          </td>
                          {Country === "India" ? (
                            <td>
                              <button
                                className="ViewBtn"
                                onClick={() => [
                                  setDeductionEditPopup(true),
                                  setIndex(index),
                                ]}
                              >
                                {text_edit}
                              </button>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className={
                page === 0
                  ? "text-end mt-2"
                  : "d-flex justify-content-between mt-2"
              }
            >
              <button
                onClick={prevPage}
                className={page === 0 ? "d-none" : "btncancel me-3"}
              >
                <>{button_previous}</>
              </button>
              <button
                onClick={nextPage}
                className={IsNextDisable ? "d-none" : "CreateBtn"}
              >
                <>{button_next}</>
              </button>
            </div>
          </>
        )}
      </div>
      {DeductionEditPopup ? (
        filteredItems[Index]?.salaryinfo[0] === undefined ? (
          <>
            <div
              className={
                filteredItems[Index]?.salaryinfo[0] === undefined
                  ? "popupqrpayroll"
                  : "popupPayRoll"
              }
            >
              <div className="me-3 text-end">
                <h3 className="close mt-1">
                  <CgCloseO onClick={() => setDeductionEditPopup(false)} />
                </h3>
              </div>
              <h4 className="text-center">{text_update_salary_info}</h4>
              {console.log(text_update_salary_info)}
            </div>
          </>
        ) : (
          <>
            <div className="popupPayRoll">
              <div className="row text-end">
                <h3 className="close mt-1">
                  <CgCloseO onClick={() => setDeductionEditPopup(false)} />
                </h3>
              </div>
              <h3 className="text-center">
                {text_editDeductionof}
                {filteredItems[Index]?.firstName}{" "}
                {filteredItems[Index]?.lastName}
              </h3>
              <Divider />
              <div className="payrollScroll">
                {filteredItems[Index]?.salaryinfo[0]?.deductionlist.map(
                  (v, idxx) => (
                    <div
                      key={idxx}
                      className="d-flex justify-content-between flex-wrap align-items-center p-3"
                    >
                      <h6 className="w-25" id={"dedcutionLabel" + idxx}>
                        {v.name}:{" "}
                      </h6>
                      <input value={v.valdata} disabled />
                      <input
                        id={"deductionval" + idxx}
                        defaultValue={v.valdata}
                        placeholder={text_enternewvalue}
                      />
                    </div>
                  )
                )}
                {filteredItems[Index]?.salaryinfo[0]?.taxlist.map((v, idxx) => (
                  <div
                    key={idxx}
                    className="d-flex justify-content-between flex-wrap align-items-center p-3"
                  >
                    <h6 className="w-25" id={"taxlabel" + idxx}>
                      {v.name}:{" "}
                    </h6>
                    <input value={v.valdata} disabled />
                    <input
                      id={"taxval" + idxx}
                      defaultValue={v.valdata}
                      placeholder={text_enternewvalue}
                    />
                  </div>
                ))}
                <div className="d-flex justify-content-between flex-wrap align-items-center p-3">
                  <h6 className="w-25">Loan</h6>
                  <input
                    placeholder={text_enterloan}
                    onChange={(e) => SetEditedLoan(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">
                <button
                  className="btncancel"
                  onClick={() => setDeductionEditPopup(false)}
                >
                  {button_cancel}
                </button>
                <button
                  className="btnsave"
                  onClick={() => SaveEditedDeduction()}
                >
                  {button_save}
                </button>
              </div>
            </div>
          </>
        )
      ) : (
        <></>
      )}
      <ToastContainer />
    </>
  );
}

export default PayrollSheet;
