import React, { useEffect, useMemo, useState } from "react";
import Header from "../Header/Header";
import GoodMorning from "../../assets/img/Good morning.svg";
import GoodEvening from "../../assets/img/good evening.svg";
import GoodNight from "../../assets/img/good night.svg";
import DummyProfile from "../../assets/img/Comany-img.jpg";
import SearchIcon from "@mui/icons-material/Search";
import "./Dashboard.css";
import { CgCloseO } from "react-icons/cg";
import FilterComponent from "../../utils/FilterComponent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, getSingleEmp } from "../../redux/DashboardSlice";
import { getOrgSalaryData } from "../../redux/orgSalaryDataSlice";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { getEmpData } from "../../redux/EmpDataSlice";
import { resetEmpLoanData } from "../../redux/EmpLoanDataSlice";
import axios from "axios";
import { resetEmpSalaryDetail } from "../../redux/EmpSalaryDetailsSlice";
import { resetEmpAttendanceSingle } from "../../redux/AttendanceSingleSlice";
import { resetEmpAttendanceSingleTable } from "../../redux/AttendanceSingleTableDataSlice";
import Cookie from "js-cookie";
import { resetAppraisalDetailList } from "../../redux/AppraisalDetailListSlice";
import { resetPayroll } from "../../redux/PayrollTableDataSlice";
import { resetWeeklyTimesheet } from "../../redux/WeeklyTimesheetSlice";
import { resetRequestsList } from "../../redux/RequestsListSlice";
import $ from "jquery";
import Loader from "../../utils/Loader";
import { getAllEmp } from "../../redux/AllEmpListSlice";
import { resetEmpSelectedBenefitsData } from "../../redux/EmpSelectedBenefits";
import { ToastContainer } from "react-toastify";
import { successToast } from "../../utils/Helper";
import { FcFeedback } from "react-icons/fc";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function Dashboard() {
  const role = sessionStorage.getItem("role");

  const dispatch = useDispatch();
  const Company_Name = sessionStorage.getItem("comp_name");
  const SelectedCmpID = useSelector((state) => state.selectedCompany);
  const DashboardData = useSelector((state) => state.dashboard);
  console.log("redux DashboardData*****", DashboardData, DashboardData.length);
  const orgSalary = useSelector((state) => state.orgSalaryData);
  const SelectedEmpData = useSelector((state) => state.empData);
  const [RoleEmpData, setRoleEmpData] = useState([]);
  const [pendingEmployeeData, setPendingEmployeeData] = useState([]);
  //Language Variables starts
  //Old Variables
  const [GoodMorningText, setGoodMoraningText] = useState("Good Morning");
  const [GoodAfterNoonText, setGoodAfterNoonText] = useState("Good Afternoon");
  const [GoodEveningText, setGoodEveningText] = useState("Good Evening");
  const [WalletText, setWalletText] = useState("Wallet");
  const [IDText, setIDText] = useState("ID");
  const [JoiningDateText, setJoiningDate] = useState("Joining Date");
  const [ViewProfile, setViewProfile] = useState("View Profile");
  const [SearchPHTextDashboard, setSearchPHTextDashboard] = useState(
    "Search Employee Here..."
  );
  const [text_employee, setText_employee] = useState("Employee");
  const [text_profile, setText_profile] = useState("Profile");
  const [text_monthly_remaining, setText_monthly_remaining] = useState(
    "Monthly Payment Remaining "
  );
  const [TxtPayrollHeading, setTxtPayrollHeading] = useState("Payroll Sheet");
  const [txtbonus, settextbonus] = useState("Bonus");
  const [title_attendance, setTitle_attendance] = useState("Attendance");
  const [text_tab_invoice, setText_tab_invoice] = useState("Invoice");
  const [text_tab_paybill, setText_tab_paybill] = useState("Pay Bill");
  const [title_ddd_employee, setTitle_ddd_employee] = useState("Add Employee");
  const [text_emp_name, setText_emp_name] = useState("Employee Name");
  const [text_salary, settext_salary] = useState("Salary");
  const [salaryType, setSalaryType] = useState("monthly");
  const [text_radio_monthly, setText_radio_monthly] = useState("Monthly");

  const [text_status, settext_status] = useState("Status");
  const [text_active, setText_active] = useState("Active");
  const [text_deactive, setText_deactive] = useState("Deactive");
  const [btn_view, setbtn_view] = useState("View");
  const [button_next, setButton_next] = useState("Next");
  const [button_previous, setButton_previous] = useState("Previous");
  const [text_calculating, setText_calculating] = useState("Calculating");
  const [text_hint_email, setText_hint_email] = useState("Email");
  const [dashbord_pay_text, setDashbord_pay_text] =
    useState("No payment pending");
  const [textpendingemp, setText_pending] = useState(
    "Pending Employee Request"
  );
  const [button_save, setButton_save] = useState("Save");
  const [text_currentemp, setText_currentemp] = useState("Current Employee");
  const [text_resendver, setText_resendver] = useState(
    "Resend Invitation Link"
  );
  const [text_verstatus, setText_verstatus] = useState("Verification Status");
  const [text_resendemail, setText_resendemail] = useState("Resend Email");
  const [timesheetpen_text, setTimesheetpen_text] = useState("Pending");
  const [text_accept, setText_accept] = useState("Accept");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_dashpopup, setText_dashpopup] = useState("Resend Email On");
  const [text_dashsuccess, setText_dashsuccess] = useState("Successfully");
  const [button_close, setButton_close] = useState("Close");

  //Language Variables Ends
  const [GreetingMsg, setGreetingMsg] = useState("");
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pendingEmployee, setPendingEmployee] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [EditEmailData, setEditEmailData] = useState("");
  const [rowID, setRowID] = useState("");
  const [errEditEmail, setErrEditEmail] = useState("");
  const [errResendEmail, setErrResendemail] = useState("");
  const [IdforResendEmail, setIDforResendEmail] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [Openmessage, setOpenMessage] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CurrentDate = new Date();
  const navigate = useNavigate();

  const [file, setFile] = useState(DummyProfile);
  const [IsLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("useEffect 1 at 94***");
    let luid = sessionStorage.getItem(
      GlobalConstants.session_currentlogin_emp_id
    );
    sessionStorage.setItem(GlobalConstants.session_current_emp_id, luid);

    var tempcmpId = sessionStorage.getItem("_compId");
    if (role === "employee") {
      if (DashboardData?.length === 0 || SelectedCmpID[0]?._id !== tempcmpId) {
        console.log(
          "useeffect if DashboardData*****",
          DashboardData,
          DashboardData.length
        );
        dispatch(getAllEmp());
        setIsLoading(true);
        Promise.all([dispatch(getSingleEmp())]).then(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        );
      } else {
        setIsLoading(false);
      }
    } else {
      if (DashboardData?.length === 0 || SelectedCmpID[0]?._id !== tempcmpId) {
        console.log(
          "useeffect else DashboardData*****",
          DashboardData,
          DashboardData.length
        );
        dispatch(getAllEmp());
        setIsLoading(true);
        Promise.all([dispatch(getDashboard(null))]).then(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [role]);

  useEffect(() => {
    console.log("useEffect 2 at 126***");
    if (role !== "employee") {
      var tempcmpId = sessionStorage.getItem("_compId");
      if (orgSalary.length === 0 || SelectedCmpID[0]?._id !== tempcmpId) {
        dispatch(getOrgSalaryData());
      }
    }
  }, [role]);
  useEffect(() => {
    console.log("useEffect 3 at 135***");
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/trigger/updatedefault/employee?type=update&_orgId=" +
      _compId;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {})
      .catch(function (error) {
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
        console.log(error.message);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const handlePendingEmployee = (newToken) => {
    // console.log("useEffect 3 at 135***");
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      `/API/moramba/v3/get/pending/emp?limit=10&cursor=${newToken}&orgId=${_compId}`;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var finalData = response.data.data;
        var hasMoreEmp = finalData.hasMoreEmps;
        var nextToken = finalData.nextToken;
        var empcount = finalData.empAllCount;
        sessionStorage.setItem("empcountpending", empcount);
        sessionStorage.setItem("DashboardTokenpending", nextToken);
        sessionStorage.setItem("HasMoreEmpDashboardpending", hasMoreEmp);
        sessionStorage.setItem("TotalEmppending", finalData.empAllCount);
        console.log(finalData);
        setPendingEmployeeData(finalData.empall);
      })
      .catch(function (error) {
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
        console.log(error.message);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    handlePendingEmployee("NA");
  }, []);
  useEffect(() => {
    console.log("useEffect 4 at 169***");
    const hour = new Date().getHours();
    const welcomeMsg = [GoodMorningText, GoodAfterNoonText, GoodEveningText];
    if (hour < 12) {
      setGreetingMsg(welcomeMsg[0]);
    } else if (hour < 18) {
      setGreetingMsg(welcomeMsg[1]);
    } else setGreetingMsg(welcomeMsg[2]);
  });

  const filekey = sessionStorage.getItem("companyImage");

  useEffect(() => {
    console.log("useEffect 5 at 182***");
    if (SelectedCmpID.length !== 0) {
      if (filekey !== undefined || filekey !== null || filekey !== "") {
        downloadCompanyLogo(filekey);
      } else {
        console.log("FILE KEY NOT FOUND");
      }
    } else {
      console.log("SELECT CMP FIRST");
    }
  }, [filekey, SelectedCmpID.length]);
  const downloadCompanyLogo = (filekey) => {
    const request_start_at = performance.now();

    var apiUrl =
      GlobalConstants.Cdomain +
      `/API/moramba/v3/download/file?filekey=${filekey}`;
    let headerConfig = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      responseType: "blob",
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        if (response.status === 200) {
          console.log(
            "ID:00705=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
        const mimeType = response.headers;
        //var d  = response.data.slice();
        let blob = new Blob([response.data], { type: mimeType });
        var url = window.URL.createObjectURL(blob);
        setFile(url);
        sessionStorage.setItem("companyLogoImg", url);
        //FileSaver.saveAs(blob, filekey);
        //const url = URL.createObjectURL( blob );

        //img = document.getElementById( imageformat + '_img' );
        //img.src = url;
      })
      .catch(function (error) {
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
        // errorToast(error.message);
        console.log(error.message);
      })
      .then(function () {
        // always executed
      });
  };
  const selectEmployee = (row) => {
    console.log(row?.requestdetails);
    sessionStorage.setItem("employee_name", row?.firstName);
    sessionStorage.setItem(
      GlobalConstants.session_current_emp_currency_val,
      row?.empCurrency
    );
    sessionStorage.setItem(GlobalConstants.session_current_emp_id, row?._id);
    sessionStorage.setItem(
      GlobalConstants.session_current_emp_name,
      row?.fullName
    );
    sessionStorage.setItem(
      GlobalConstants.session_current_emp_vacationDays,
      row?.vacationDays
    );
    sessionStorage.setItem("EmpProfileKey", row?.imageKey);

    if (role === "superadmin" || SelectedEmpData?.length === 0) {
      dispatch(getEmpData());
      // dispatch(getEmpSalaryData());
      dispatch(resetEmpAttendanceSingle());
      dispatch(resetEmpAttendanceSingleTable());
      dispatch(resetAppraisalDetailList());
      dispatch(resetEmpSalaryDetail());
      dispatch(resetEmpLoanData());
      dispatch(resetRequestsList());
      dispatch(resetWeeklyTimesheet());
      // dispatch(resetEmpDocument());
      dispatch(resetPayroll());
      dispatch(resetEmpSelectedBenefitsData());
      navigate("/employeedetail");
      if (row?.requestdetails === undefined || row?.requestdetails === null) {
        sessionStorage.removeItem("EmployeeStatus");
      } else {
        sessionStorage.setItem(
          "EmployeeStatus",
          row?.requestdetails[0]?.userActiveForCompany
        );
      }
    } else {
      dispatch(getEmpData());
      dispatch(resetEmpAttendanceSingle());
      dispatch(resetEmpAttendanceSingleTable());
      dispatch(resetRequestsList());
      dispatch(resetAppraisalDetailList());
      dispatch(resetEmpSalaryDetail());
      dispatch(resetEmpLoanData());
      dispatch(resetWeeklyTimesheet());
      dispatch(resetPayroll());
      dispatch(resetEmpSelectedBenefitsData());
      console.log("NOT SUPER ADMIN");
      navigate("/employeedetail");
    }
  };

  useEffect(() => {
    console.log("useEffect 6 at 298***");
    if (role === "employee") {
      console.log("H");
      const empData = DashboardData.filter(function (e) {
        return e.user_id === sessionStorage.getItem("user_id");
      });
      console.log("I");
      setRoleEmpData(empData);
    }
  }, [role, DashboardData]);

  // language change handler
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
     const parser = new DOMParser();
     const doc = parser.parseFromString(xml, "text/xml");

    setText_employee(
      doc.querySelector("string[name='text_employee']")?.textContent
        
    );
    setText_profile(
      doc.querySelector("string[name='text_profile']")?.textContent
        
    );
    setText_monthly_remaining(
      doc.querySelector("string[name='text_monthly_remaining']")
        ?.textContent
    );
    setTxtPayrollHeading(
      doc.querySelector("string[name='TxtPayrollHeading']")
        ?.textContent
    );
    setTitle_attendance(
      doc.querySelector("string[name='title_attendance']")
        ?.textContent
    );

    setText_tab_invoice(
      doc.querySelector("string[name='text_tab_invoice']")
        ?.textContent
    );
    setText_tab_paybill(
      doc.querySelector("string[name='text_tab_paybill']")
        ?.textContent
    );
    setTitle_ddd_employee(
      doc.querySelector("string[name='title_ddd_employee']")
        ?.textContent
    );
    setText_emp_name(
      doc.querySelector("string[name='text_emp_name']")?.textContent
        
    );
    settext_salary(
      doc.querySelector("string[name='text_salary']")?.textContent
        
    );
    setText_radio_monthly(
      doc.querySelector("string[name='text_radio_monthly']")
        ?.textContent
    );

    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent
        
    );
    setText_active(
      doc.querySelector("string[name='text_active']")?.textContent
        
    );
    setText_deactive(
      doc.querySelector("string[name='text_deactive']")?.textContent
        
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent
    );
    setWalletText(
      doc.querySelector("string[name='WalletText']")?.textContent
        
    );
    setIDText(
      doc.querySelector("string[name='IDText']")?.textContent
    );
    setJoiningDate(
      doc.querySelector("string[name='JoiningDateText']")
        ?.textContent
    );
    setViewProfile(
      doc.querySelector("string[name='ViewProfile']")?.textContent
        
    );
    setGoodAfterNoonText(
      doc.querySelector("string[name='GoodAfterNoonText']")
        ?.textContent
    );
    setGoodEveningText(
      doc.querySelector("string[name='GoodEveningText']")
        ?.textContent
    );
    setGoodMoraningText(
      doc.querySelector("string[name='GoodMorningText']")
        ?.textContent
    );
    setSearchPHTextDashboard(
      doc.querySelector("string[name='SearchPHTextDashboard']")
        ?.textContent
    );
    // setDashbord_pay_text(
    //   doc.querySelector("string[name='dashbord_pay_text']")
    //     ?.textContent
    // );
    setButton_next(
      doc.querySelector("string[name='button_next']")?.textContent
        
    );
    setButton_previous(
      doc.querySelector("string[name='button_previous']")
        ?.textContent
    );
    setText_calculating(
      doc.querySelector("string[name='text_calculating']")
        ?.textContent
    );
    settextbonus(
      doc.querySelector("string[name='txtbonus']")?.textContent
    );
    setText_hint_email(
      doc.querySelector("string[name='text_hint_email']")
        ?.textContent
    );
    setTimesheetpen_text(
      doc.querySelector("string[name='timesheetpen_text']")
        ?.textContent
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent
    );
    setText_pending(
      doc.querySelector("string[name='textpendingemp']")?.textContent
        
    );
    setText_currentemp(
      doc.querySelector("string[name='text_currentemp']")
        ?.textContent
    );
    setText_resendver(
      doc.querySelector("string[name='text_resendver']")?.textContent
        
    );
    setText_verstatus(
      doc.querySelector("string[name='text_verstatus']")?.textContent
        
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
        
    );
    setText_resendemail(
      doc.querySelector("string[name='text_resendemail']")
        ?.textContent
    );
    setText_accept(
      doc.querySelector("string[name='text_accept']")?.textContent
        
    );
    setText_dashpopup(
      doc.querySelector("string[name='text_dashpopup']")?.textContent
        
    );
    setText_dashsuccess(
      doc.querySelector("string[name='text_dashsuccess']")
        ?.textContent
    );
    setButton_close(
      doc.querySelector("string[name='button_close']")?.textContent
        
    );
  };
  useEffect(() => {
    console.log("useEffect 7 at 427***");
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

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const [pagepending, setPagePending] = useState(0);
  const [IsNextDisablePending, setIsNextDisablePending] = useState();
  const PendingFinalData = useMemo(() => {
    return pendingEmployeeData.slice(pagepending * 10, pagepending * 10 + 10);
  }, [pagepending, pendingEmployeeData]);
  const hasMoreEmpPending = sessionStorage.getItem(
    "HasMoreEmpDashboardpending"
  );

  const FinalEmpData = role === "employee" ? RoleEmpData : DashboardData;

  useEffect(() => {
    console.log("useEffect 8 at 455***", pendingEmployeeData.length);
    if (PendingFinalData.length < 10) {
      console.log(
        "useEffect if DahsboardFinalData*****",
        PendingFinalData,
        PendingFinalData.length
      );
      setIsNextDisablePending(false);
    } else {
      setIsNextDisablePending(true);
      console.log(
        "useEffect else DahsboardFinalData*****",
        PendingFinalData,
        PendingFinalData.length
      );
    }
  }, [pendingEmployeeData.length]);

  const [page, setPage] = useState(0);
  const [IsNextDisable, setIsNextDisable] = useState();
  const DashboardFinalData = useMemo(() => {
    return FinalEmpData.slice(page * 10, page * 10 + 10);
  }, [page, FinalEmpData]);
  const hasMoreEmp = sessionStorage.getItem("HasMoreEmpDashboard");

  useEffect(() => {
    console.log("useEffect 8 at 455***", DashboardData.length);
    if (DashboardFinalData.length < 10) {
      console.log(
        "useEffect if DahsboardFinalData*****",
        DashboardFinalData,
        DashboardFinalData.length
      );
      setIsNextDisable(false);
    } else {
      setIsNextDisable(true);
      console.log(
        "useEffect else DahsboardFinalData*****",
        DashboardFinalData,
        DashboardFinalData.length
      );
    }
  }, [DashboardData.length]);
  const nextPage = () => {
    setIsLoading(true);
    var DashboardToken = sessionStorage.getItem("DashboardToken");
    if (hasMoreEmp === "true") {
      Promise.all([dispatch(getDashboard(DashboardToken))]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
      if (FinalEmpData.length >= (page * 10, page * 10 + 10)) {
        setPage((prev) => prev + 1);
      }
    } else {
      setIsLoading(false);
      setPage((prev) => prev + 1);
    }
  };
  const prevPagePending = () => {
    setIsNextDisablePending(true);
    setPagePending((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextPagePending = () => {
    setIsLoading(true);
    var DashboardTokenpending = sessionStorage.getItem("DashboardTokenpending");
    if (hasMoreEmpPending === "true") {
      Promise.all([handlePendingEmployee(DashboardTokenpending)]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
      if (
        pendingEmployeeData.length >= (pagepending * 10, pagepending * 10 + 10)
      ) {
        setPagePending((prev) => prev + 1);
      }
    } else {
      setIsLoading(false);
      setPagePending((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    setIsNextDisable(true);
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const filteredItems = DashboardFinalData?.filter(
    (item) =>
      JSON.stringify(item.firstName)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const filterItemPending = pendingEmployeeData?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  console.log(filterItemPending);
  const pendingEmployeeCount = DashboardFinalData.filter(
    (e) =>
      e.requestdetails !== undefined &&
      e.requestdetails[0]?.userActiveForCompany === false
  );
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
        PlaceHolder={SearchPHTextDashboard}
        className="hiii"
      />
    );
  }, [filterText, resetPaginationToggle, SearchPHTextDashboard]);

  const handleResend = (sendData, i) => {
    console.log(sendData);
    var firstName = sendData[0]?.firstName;
    var lastName = sendData[0]?.lastName;
    var email = sendData[0]?.email2;
    var orgName =
      sendData?.requestdetails === null ||
      sendData?.requestdetails === undefined
        ? sendData[0]?.comp_name
        : sendData?.requestdetails[0]?.displayName;
    var apiUrl =
      GlobalConstants.Cdomain + "/API/moramba/v4/user/emailverification";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      orgname: orgName,
    };
    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        var res = response.data;
        console.log(res.message);
        if (res.data.length > 0) {
        }
        setOpen(true);
        setOpenMessage(email);
        // successToast(res.message)
      })
      .catch(function (error) {
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
        console.log(error.response.data.message);
        setIDforResendEmail(i);
        setErrResendemail(error.response.data.message);
      })
      .then(function () {
        // always executed
      });
  };

  const handleUpdateEmail = (sendData) => {
    // var firstName = sendData?.firstName;
    var employeeID = sendData?.requestdetails[0]?._id;
    // var email = sendData?.email2;
    var orgID = sendData?.requestdetails[0]?._orgId;
    console.log(sendData);
    var apiUrl =
      GlobalConstants.Cdomain + "/API/moramba/v3/employee/update/email";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var data = {
      orgId: orgID,
      employeeId: employeeID,
      email: EditEmailData,
    };
    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        var res = response.data;
        if (response.status === 200) {
          setEditEmail(false);
          setErrEditEmail("");
        }
        if (res.data.length > 0) {
        }
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("username");
          Cookie.remove("user_id");
          Cookie.remove("AdminFName");
          Cookie.remove("AdminLName");
          Cookie.remove("token");
          window.location.replace("/");
        } else {
          setErrEditEmail(<>*{error.response.data.message}!</>);
        }
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleEditEmail = (e, i) => {
    setRowID(e?.requestdetails[0]._id);
    setEditEmail(true);
    setEditEmailData(e?.requestdetails[0]?.email2);
  };
  const totalempcount = sessionStorage.getItem("empcount");
  return (
    <>
      <Header />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CgCloseO />
        </IconButton>
        <br />
        <DialogTitle id="responsive-dialog-title" className="text-center">
          <FcFeedback className="Email-icon" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h5 className="text-center mt-2">
              {text_dashpopup}{" "}
              <span className="text-primary">{Openmessage} </span>
              {text_dashsuccess}.
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btncancel mx-4" onClick={handleClose}>
            {button_close}
          </button>
        </DialogActions>
      </Dialog>
      <div className="p-4">
        <div className="d-flex flex-row align-items-center justify-content-between break-word	">
          <div className="d-flex flex-row align-items-center break-word	">
            <h4 viewport={{ once: true }}>{GreetingMsg}</h4>
            {GreetingMsg === GoodMorningText && (
              <img
                className="GreetingImages"
                src={GoodMorning}
                alt="Greeting_Images"
              />
            )}
            {GreetingMsg === GoodAfterNoonText && (
              <img
                className="GreetingImages"
                src={GoodEvening}
                alt="Greeting_Images"
              />
            )}
            {GreetingMsg === GoodEveningText && (
              <img
                className="GreetingImages"
                src={GoodNight}
                alt="Greeting_Images"
              />
            )}
          </div>
          <h4>{dayjs(CurrentDate).format("MMM DD,YYYY")}</h4>
        </div>
        <div className="row mt-3">
          <div className="col-md-3">
            <div className="DashboardCmpBox text-center">
              <img
                src={file === undefined ? DummyProfile : file}
                alt=""
                className="CompanyLogo"
              />
              <h4 className="mt-3 cmpname">{Company_Name}</h4>
              {totalempcount === 0 || role === "employee" ? (
                ""
              ) : (
                <>
                  <p>
                    ({totalempcount} {text_employee})
                  </p>
                  {sessionStorage.getItem("TotalEmppending") !== "0" && (
                    <>
                      {" "}
                      {pendingEmployee === false ? (
                        <>
                          <button
                            className={
                              pendingEmployee
                                ? "mb-3 active-employee mx-2"
                                : "mb-3 pending-btn mx-2"
                            }
                            onClick={() => [
                              setPendingEmployee(!pendingEmployee),
                              handlePendingEmployee("NA"),
                            ]}
                          >
                            <>{textpendingemp}</>
                            <span className="pending-count">
                              {sessionStorage.getItem("TotalEmppending")}
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={
                              pendingEmployee
                                ? "mb-3 active-employee mx-2"
                                : "mb-3 pending-btn mx-2"
                            }
                            onClick={() => [
                              setPendingEmployee(!pendingEmployee),
                              setErrEditEmail(""),
                              setEditEmail(false),
                            ]}
                          >
                            <>{text_currentemp}</>
                            {/* <span className="pending-count">
                      {sessionStorage.getItem("TotalEmppending")}
                    </span> */}
                          </button>
                        </>
                      )}
                    </>
                  )}

                  <br />
                </>
              )}
              <Link to={"/companyprofile"}>
                <button className="CreateBtn me-3">{text_profile}</button>
              </Link>
              {role === "employee" ? (
                ""
              ) : (
                <Link to={"/walletportal"}>
                  <button className="WalletButton">{WalletText}</button>
                </Link>
              )}
            </div>
            {role === "employee" ? (
              ""
            ) : (
              <>
                <div className="MonthlyPaymentBox mt-5 mb-4">
                  <h4>{text_monthly_remaining}...</h4>
                  {orgSalary?.length === 0 ? (
                    <>
                      <p>{text_calculating}...</p>
                    </>
                  ) : (
                    <>
                      <ul>
                        {orgSalary?.map((salaryData, index) => {
                          return (
                            <>
                              <li key={index}>
                                {salaryData?.empCurrency}&nbsp;
                                {Number(salaryData?.salary)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="col-md-9">
            <div className="TableContainer p-2">
              <div className="TableButtonsHolder">
                {role === "employee" ? (
                  ""
                ) : (
                  <>
                    <div className="AllButton w-100">
                      <Link to={"/payrollsheet"}>
                        <button className="ReverseButton">
                          {TxtPayrollHeading}
                        </button>
                      </Link>
                      <Link to={"/bonus"}>
                        <button className="ReverseButton">{txtbonus}</button>
                      </Link>
                      <Link to={"/attendance"}>
                        <button className="ReverseButton">
                          {title_attendance}
                        </button>
                      </Link>

                      <Link to={"/invoice/allinvoice"}>
                        <button className="ReverseButton">
                          {text_tab_invoice}
                        </button>
                      </Link>
                      <Link to={"/bill/allbill"}>
                        <button className="ReverseButton">
                          {text_tab_paybill}
                        </button>
                      </Link>
                      <Link to={"/receive-transactions"}>
                        <button className="ReverseButton">
                          View Transactions
                        </button>
                      </Link>
                    </div>
                  </>
                )}

                {role === "employee" ? (
                  ""
                ) : (
                  <>
                    <div className="d-flex flex-row align-items-center Searchbar me-3 searchbarbox">
                      <SearchIcon />
                      {subHeaderComponent}
                    </div>
                    <Link to="/addstaff">
                      <button className="CreateBtn dashboard-createbtn">
                        + {title_ddd_employee}
                      </button>
                    </Link>
                  </>
                )}
              </div>
              {IsLoading ? (
                <div className="mt-5 mb-5 d-flex justify-content-center">
                  <Loader />
                </div>
              ) : (
                <>
                  {pendingEmployee ? (
                    <>
                      <div className="scrollTableDashbaord mt-4">
                        <table className="DashboardTable">
                          <thead>
                            <tr>
                              <th>{text_emp_name}</th>
                              <th>{text_resendver}</th>
                              <th>{text_verstatus}</th>
                              <th>{text_hint_email}</th>
                              <th>{IDText}</th>
                              <th>{text_status}</th>
                              <th>
                                {text_radio_monthly} {text_salary}
                              </th>
                              <th>{text_edit}</th>
                              <th>{ViewProfile}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterItemPending.length > 0 &&
                              filterItemPending.map((v, i) => {
                                return (
                                  <>
                                    <tr key={v?._id}>
                                      <td>
                                        {v?.requestdetails[0]?.firstName +
                                          " " +
                                          (v?.requestdetails[0]?.fullName === ""
                                            ? ""
                                            : v?.requestdetails[0]?.fullName) +
                                          " " +
                                          (v?.requestdetails[0]?.lastName === ""
                                            ? ""
                                            : v?.requestdetails[0]?.lastName)}
                                      </td>
                                      <td>
                                        <button
                                          className="ActiveBtn"
                                          onClick={() => [
                                            handleResend(v?.requestdetails, i),
                                            setErrResendemail(""),
                                          ]}
                                          id={i}
                                        >
                                          {text_resendemail}
                                        </button>
                                        <br />
                                        {IdforResendEmail === i ? (
                                          <span className="error_sty">
                                            {errResendEmail}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                      <td>
                                        {v?.requestdetails[0]
                                          ?.userActiveForCompany === true ? (
                                          <>
                                            <p className="text-approved">
                                              {text_accept}
                                            </p>
                                          </>
                                        ) : (
                                          <>
                                            <p className="text-pending">
                                              {timesheetpen_text}
                                            </p>
                                          </>
                                        )}
                                      </td>
                                      <td key={i}>
                                        {editEmail ? (
                                          <>
                                            {v?.requestdetails[0]?._id ===
                                            rowID ? (
                                              <>
                                                <input
                                                  value={EditEmailData}
                                                  onChange={(e) => [
                                                    setEditEmailData(
                                                      e.target.value
                                                    ),
                                                    setErrEditEmail(""),
                                                  ]}
                                                />
                                                <br />
                                                <span className="error_sty">
                                                  {errEditEmail}
                                                </span>
                                              </>
                                            ) : (
                                              v?.requestdetails[0]?.email2
                                            )}
                                          </>
                                        ) : v?.requestdetails[0]?.email2 ===
                                          "" ? (
                                          "-"
                                        ) : (
                                          v?.requestdetails[0]?.email2
                                        )}
                                      </td>
                                      <td>
                                        {truncate(
                                          v?.requestdetails[0]
                                            ?.employeeIdNumber,
                                          16
                                        )}
                                      </td>
                                      <td>
                                        {v?.requestdetails[0]?.empStatusid ===
                                        "1" ? (
                                          <button
                                            disabled
                                            className="ActiveBtn"
                                          >
                                            {text_active}
                                          </button>
                                        ) : (
                                          <button
                                            disabled
                                            className="DeactiveBtn"
                                          >
                                            {text_deactive}
                                          </button>
                                        )}
                                      </td>
                                      <td>
                                        {v?.requestdetails[0]?.empCurrency +
                                          " " +
                                          Number(
                                            v?.requestdetails[0]
                                              ?.empSalaryAmount
                                          )
                                            .toFixed(2)
                                            .replace(
                                              /\d(?=(\d{3})+\.)/g,
                                              "$&,"
                                            )}
                                      </td>
                                      <td>
                                        {editEmail ? (
                                          <>
                                            {v?.requestdetails[0]?._id ===
                                            rowID ? (
                                              <button
                                                className="btnsave-dashboard"
                                                onClick={() =>
                                                  handleUpdateEmail(v, i)
                                                }
                                                id={"editEmail" + i}
                                              >
                                                {button_save}
                                              </button>
                                            ) : (
                                              <button
                                                className="ViewBtn"
                                                onClick={() => [
                                                  handleEditEmail(v, i),
                                                  setErrEditEmail(""),
                                                ]}
                                                id={"editEmail" + i}
                                              >
                                                {text_edit}
                                              </button>
                                            )}
                                          </>
                                        ) : (
                                          <button
                                            className="ViewBtn"
                                            onClick={() => [
                                              handleEditEmail(v, i),
                                              setErrEditEmail(""),
                                            ]}
                                            id={"editEmail" + i}
                                          >
                                            {text_edit}
                                          </button>
                                        )}
                                      </td>

                                      <td>
                                        {
                                          <button
                                            className="ViewBtn"
                                            onClick={() =>
                                              selectEmployee(
                                                v?.requestdetails[0]
                                              )
                                            }
                                          >
                                            {btn_view}
                                          </button>
                                        }
                                      </td>
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
                          onClick={prevPagePending}
                          className={
                            pagepending === 0 ? "d-none" : "btncancel me-3"
                          }
                        >
                          {button_previous}
                        </button>
                        <button
                          onClick={nextPagePending}
                          className={
                            IsNextDisablePending === false
                              ? "d-none"
                              : "CreateBtn"
                          }
                        >
                          {button_next}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="scrollTableDashbaord mt-4">
                        <table className="DashboardTable">
                          <thead>
                            <tr>
                              <th>{text_emp_name}</th>
                              {/* <th>Resend Invitation Link</th>
                          <th>Verification Status</th> */}
                              <th>{text_hint_email}</th>
                              <th>{IDText}</th>
                              <th>{text_status}</th>
                              <th>
                                {text_radio_monthly} {text_salary}
                              </th>
                              <th>{JoiningDateText}</th>
                              <th>{ViewProfile}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredItems.filter(
                              (e) => e.requestdetails === undefined
                            ).length > 0 &&
                              filteredItems.map((v) => {
                                return (
                                  <>
                                    <tr key={v?._id}>
                                      <td>
                                        {v?.firstName +
                                          " " +
                                          (v?.fullName === ""
                                            ? ""
                                            : v?.fullName) +
                                          " " +
                                          (v?.lastName === ""
                                            ? ""
                                            : v?.lastName)}
                                      </td>

                                      <td>
                                        {v?.email2 === "" ? "-" : v?.email2}
                                      </td>
                                      <td>
                                        {truncate(v?.employeeIdNumber, 16)}
                                      </td>
                                      <td>
                                        {v?.empStatusid === "1" ? (
                                          <button
                                            disabled
                                            className="ActiveBtn"
                                          >
                                            {text_active}
                                          </button>
                                        ) : (
                                          <button
                                            disabled
                                            className="DeactiveBtn"
                                          >
                                            {text_deactive}
                                          </button>
                                        )}
                                      </td>
                                      <td>
                                        {v?.empCurrency +
                                          " " +
                                          Number(v?.empSalaryAmount)
                                            .toFixed(2)
                                            .replace(
                                              /\d(?=(\d{3})+\.)/g,
                                              "$&,"
                                            )}
                                      </td>
                                      <td>
                                        {dayjs(v?.joinDate).format(
                                          "DD MMM,YYYY"
                                        )}
                                      </td>

                                      <td>
                                        {
                                          <button
                                            className="ViewBtn"
                                            onClick={() => selectEmployee(v)}
                                          >
                                            {btn_view}
                                          </button>
                                        }
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            {filteredItems.filter(
                              (e) =>
                                e.requestdetails !== undefined &&
                                e.requestdetails[0]?.userActiveForCompany ===
                                  true
                            ).length > 0 &&
                              filteredItems
                                .filter(
                                  (e) =>
                                    e.requestdetails !== undefined &&
                                    e.requestdetails[0]
                                      ?.userActiveForCompany === true
                                )
                                .map((v) => {
                                  return (
                                    <>
                                      <tr key={v?._id}>
                                        <td>
                                          {v?.firstName +
                                            " " +
                                            (v?.fullName === ""
                                              ? ""
                                              : v?.fullName) +
                                            " " +
                                            (v?.lastName === ""
                                              ? ""
                                              : v?.lastName)}
                                        </td>

                                        <td>
                                          {v?.email2 === "" ? "-" : v?.email2}
                                        </td>
                                        <td>
                                          {truncate(v?.employeeIdNumber, 16)}
                                        </td>
                                        <td>
                                          {v?.empStatusid === "1" ? (
                                            <button
                                              disabled
                                              className="ActiveBtn"
                                            >
                                              {text_active}
                                            </button>
                                          ) : (
                                            <button
                                              disabled
                                              className="DeactiveBtn"
                                            >
                                              {text_deactive}
                                            </button>
                                          )}
                                        </td>
                                        <td>
                                          {v?.empCurrency +
                                            " " +
                                            Number(v?.empSalaryAmount)
                                              .toFixed(2)
                                              .replace(
                                                /\d(?=(\d{3})+\.)/g,
                                                "$&,"
                                              )}
                                        </td>
                                        <td>
                                          {dayjs(v?.joinDate).format(
                                            "DD MMM,YYYY"
                                          )}
                                        </td>

                                        <td>
                                          {
                                            <button
                                              className="ViewBtn"
                                              onClick={() => selectEmployee(v)}
                                            >
                                              {btn_view}
                                            </button>
                                          }
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                            {/* {filteredItems?.map((v) => {
                          return (
                            
                            <>
                            
                              <tr key={v?._id}>
                                <td>
                                  {v?.firstName +
                                    " " +
                                    (v?.fullName === "" ? "" : v?.fullName) +
                                    " " +
                                    (v?.lastName === "" ? "" : v?.lastName)}
                                </td>
                                <td><button className="ActiveBtn" onClick={()=>handleResend(v)}>Resend Email</button></td>
                                <td>{v?.requestdetails[0]?.userActiveForCompany===true?(<><p className="text-approved">Accept</p></>):(<><p className="text-pending">Pending</p></>)}</td>
                                <td>
                                  {v?.email2===""?"-":v?.email2}
                                </td>
                                <td>{truncate(v?.employeeIdNumber, 16)}</td>
                                <td>
                                  {v?.empStatusid === "1" ? (
                                    <button disabled className="ActiveBtn">
                                      {text_active}
                                    </button>
                                  ) : (
                                    <button disabled className="DeactiveBtn">
                                      {text_deactive}
                                    </button>
                                  )}
                                </td>
                                <td>
                                  {v?.empCurrency +
                                    " " +
                                    Number(v?.empSalaryAmount)
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                                </td>
                                <td>
                                  {dayjs(v?.joinDate).format("DD MMM,YYYY")}
                                </td>
                               
                                <td>
                                  {
                                    <button
                                      className="ViewBtn"
                                      onClick={() => selectEmployee(v)}
                                    >
                                      {btn_view}
                                    </button>
                                  }
                                </td>
                              </tr>
                            </>
                          );
                        })} */}
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
                          {button_previous}
                        </button>
                        <button
                          onClick={nextPage}
                          className={
                            IsNextDisable === false ? "d-none" : "CreateBtn"
                          }
                        >
                          {button_next}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
