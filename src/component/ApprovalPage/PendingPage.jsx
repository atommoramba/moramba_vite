import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  ApprisalTableStyles,
  ProfileTableStyles,
  TimeSheetTableStyles,
  VactionTableStyles,
} from "../../utils/CommanTableStyle";
import SearchIcon from "@mui/icons-material/Search";
import FilterComponent from "../../utils/FilterComponent";
import { Divider } from "@mui/material";
import { CgCloseO } from "react-icons/cg";
import { useEffect } from "react";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../../utils/Helper";
import "./Approval.css";
import { getRequestsList } from "../../redux/RequestsListSlice";
import { resetEmpAttendanceSingle } from "../../redux/AttendanceSingleSlice";
import { resetDailyTimesheet } from "../../redux/DailyTimesheetSlice";
import { resetWeeklyTimesheet } from "../../redux/WeeklyTimesheetSlice";
import { resetDashboardEmpList } from "../../redux/DashboardSlice";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";
import { getSelectedCompany } from "../../redux/SelectedCompanySlice";
import Cookie from "js-cookie";
import { getEmpData } from "../../redux/EmpDataSlice";

function PendingPage() {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [ViewReqData, setViewReqData] = useState([]);
  const [ReqPopup, setReqPopup] = useState(false);
  const [disbursmentTableData, setDisbursmentTableData] = useState([]);
  const [TDSPending, setTDSPending] = useState([]);
  const [disbursmentPopup, setDisbursementPopup] = useState(false);
  const [TDSPopup, setTDSPopup] = useState(false);
  const DashboardData = useSelector((state) => state.allEmpList);
  const ReqList = useSelector((state) => state.RequestsList);
  const SelectedEmpData = useSelector((state) => state.empData);
  const [IsLoading, setIsLoading] = useState(true);
  const [isDisabled, setisDisabled] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    var temEmpId = sessionStorage.getItem("currentempid");
    if (temEmpId !== SelectedEmpData[0]?._id || ReqList?.length === 0) {
      setIsLoading(true);
      Promise.all([dispatch(getRequestsList())]);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, []);
  //language variable
  const [text_date, setText_date] = useState("Date");
  const [text_status, settext_status] = useState("Status");
  const [btn_view, setbtn_view] = useState("View");
  const [vactionreq_text, setVactionreq_text] = useState("Vacation Requests");
  const [timesheetreq_text, setTimesheetreq_text] = useState(
    "Time Sheet Requests"
  );
  const [appraisalreq_text, setAppraisalreq_text] =
    useState("Appraisal Requests");
  const [profileupdate_text, setProfileupdate_text] = useState(
    "Profile Update Requests"
  );
  const [approve_name, setApprove_name] = useState("Name");
  const [approvereq_text, setApprovereq_text] = useState("View Request");
  const [approve_rejtext, setApprove_rejtext] = useState("Reject");
  const [approvepen_text, setApprovepen_text] = useState("Approve");
  const [approve_note, setApprove_note] = useState("Note");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [SearchPHText, setSearchPHText] = useState("Search Here...");
  const [approved_req, setApproved_req] = useState("Request For");
  const [text_description, setText_description] = useState("Description");
  const [text_hours_of_working, setText_hours_of_working] =
    useState("Hours of Working");
  const [text_btnclickhere, setText_btnclickhere] = useState("Click here");
  const [newSalaryText, setNewSalaryText] = useState("New Salary");
  const [text_pro_details, setText_pro_details] = useState("Project Details");
  const [text_expensereq, setText_expensereq] = useState("Expense Requests");
  const [text_loanrequest, setText_loanrequest] = useState("Loan Requests");
  const [text_requestpen, setText_requestpen] = useState("Request");
  const [text_reportgenerated, setText_reportgenerated] = useState(
    "New Expense Report Generated"
  );
  const [text_tds_req, setText_tds_req] = useState("TDS Request");
  const [text_promoted, setText_promoted] = useState("Promoted To");
  const [textDisbursementDate, setTextDisbursementDate] =
    useState("Disbursement Date");
  const [text_Amount, setText_Amount] = useState("Amount");
  const [text_disbursment, setText_disbursment] = useState("Disbursement");
  const [disbursement_req, setDisbursement_req] = useState(
    "Disbursement Requests"
  );

  //vacation request
  //FOR SELECTED DATA🧠
  const [selectedVacationRows, setSelectedVacationRows] = useState(false);
  const handleChangeVacation = ({ selectedVacationRows }) => {
    setSelectedVacationRows(selectedVacationRows);
  };
  //TimeSheet request
  const [selectedTimesheetRows, setSelectedTimesheetRows] = useState(false);
  const handleChangeTimesheet = ({ selectedTimesheetRows }) => {
    setSelectedTimesheetRows(selectedTimesheetRows);
  };
  //Appraisal request
  const [selectedAppraisalRows, setSelectedAppraisalRows] = useState(false);
  const handleChangeAppraisal = ({ selectedAppraisalRows }) => {
    setSelectedAppraisalRows(selectedAppraisalRows);
  };
  //ProfileUpdate request
  const [selectedProfileRows, setSelectedProfileRows] = useState(false);
  const handleChangeProfile = ({ selectedProfileRows }) => {
    setSelectedProfileRows(selectedProfileRows);
  };

  const Timesheetcolumns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
    },

    {
      name: <>{approve_name}</>,
      selector: (row) =>
        DashboardData.map((EmpName, i) => {
          return (
            <>
              {EmpName._id === row.requester_id
                ? EmpName?.firstName + " " + EmpName?.lastName
                : ""}
            </>
          );
        }),
      //   ? DashboardData.fullName.charAt(0).toUpperCase()
    },
    {
      name: <>{approved_req}</>,
      selector: (row) =>
        row.type === "TimeSheetDaily"
          ? "Daily Timesheet Request"
          : "Weekly Timesheet Request",
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.msgDate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_status}</>,
      selector: (row) => (
        <>
          <span className="text-pending">
            {row.approval_status.charAt(0).toUpperCase() +
              row.approval_status.slice(1)}
          </span>
        </>
      ),
    },
    {
      name: <>{approvereq_text}</>,
      selector: (row) => (
        <>
          <button
            className="ViewBtn"
            onClick={() => [setReqPopup(true), setViewReqData(row)]}
          >
            {btn_view}
          </button>
        </>
      ),
    },
  ];

  //disbursment data
  const DisbursmentColumn = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
      width: "90px",
    },
    {
      name: <>{approve_name}</>,
      selector: (row) =>
        DashboardData.map((EmpName, i) => {
          return (
            <>
              {EmpName._id === row.employeeId
                ? EmpName?.firstName + " " + EmpName?.lastName
                : ""}
            </>
          );
        }),
    },
    {
      name: <>{textDisbursementDate}</>,
      selector: (row) => dayjs(row.disburse_date).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_status}</>,
      selector: (row) => (
        <>
          <span className="text-pending">
            {row.disburse_status.charAt(0).toUpperCase() +
              row.disburse_status.slice(1)}
          </span>
        </>
      ),
    },
    {
      name: <>{approvereq_text}</>,
      selector: (row) => (
        <>
          <button
            className="ViewBtn"
            onClick={() => [setDisbursementPopup(true), setViewReqData(row)]}
          >
            {btn_view}
          </button>
        </>
      ),
    },
  ];

  //TDS data column
  const TDSColumn = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
      width: "90px",
    },
    {
      name: <>{approve_name}</>,
      selector: (row) =>
        DashboardData.map((EmpName, i) => {
          return (
            <>
              {EmpName._id === row.employeeId
                ? EmpName?.firstName + " " + EmpName?.lastName
                : ""}
            </>
          );
        }),
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.disburse_date).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_status}</>,
      selector: (row) => (
        <>
          <span className="text-pending">
            {row.approval_status.charAt(0).toUpperCase() +
              row.approval_status.slice(1)}
          </span>
        </>
      ),
    },
    {
      name: <>{approvereq_text}</>,
      selector: (row) => (
        <>
          <button
            className="ViewBtn"
            onClick={() => [
              setTDSPopup(true),
              setViewReqData(row),
              console.log(row),
            ]}
          >
            {btn_view}
          </button>
        </>
      ),
    },
  ];
  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
      width: "90px",
    },

    {
      name: <>{approve_name}</>,
      selector: (row) =>
        DashboardData.map((EmpName, i) => {
          return (
            <>
              {EmpName._id === row.requester_id
                ? EmpName?.firstName + " " + EmpName?.lastName
                : ""}
            </>
          );
        }),
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.msgDate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_status}</>,
      selector: (row) => (
        <>
          {" "}
          <span className="text-pending">
            {row.approval_status.charAt(0).toUpperCase() +
              row.approval_status.slice(1)}
          </span>
        </>
      ),
    },
    {
      name: <>{approvereq_text}</>,
      selector: (row) => (
        <>
          <button
            className="ViewBtn"
            onClick={() => [setReqPopup(true), setViewReqData(row)]}
          >
            {btn_view}
          </button>
        </>
      ),
    },
  ];
  console.log(ReqList);
  //Vaction Data Start
  var VactionReq = ReqList.filter(function (e) {
    return e.type === "Vacation";
  });
  console.log(VactionReq);
  const VactionPendingList = VactionReq?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf("pending".toLowerCase()) !== -1
  );
  const VactionfilteredItems = VactionPendingList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  //Vaction Data End
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
        PlaceHolder={SearchPHText}
      />
    );
  }, [filterText, resetPaginationToggle, SearchPHText]);

  //TDS Request Data
  const GetTDSRequst = () => {
    var currentempid = sessionStorage.getItem("currentempid");
    var _compId = sessionStorage.getItem("_compId");
    var addedDate = new Date();
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/collection/emp_tds/status?type=pending&admin=true";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var d = {
      _orgId: _compId,
      employeeId: currentempid,
      year: addedDate.getFullYear(),
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var rs = response.data.data;
        setTDSPending(rs);
        console.log(rs);
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

  useEffect(() => {
    GetTDSRequst();
  }, []);

  //TimeSheet Data Start
  var TimeReq = ReqList.filter(function (e) {
    return e.type === "TimeSheetDaily";
  });
  var WeeklyTimeReq = ReqList.filter(function (e) {
    return e.type === "TimeSheetWeekly";
  });

  const TimeSheetData = [...TimeReq, ...WeeklyTimeReq];
  console.log(TimeSheetData);

  const TimeSheetPendingList = TimeSheetData?.filter(
    (item) =>
      JSON.stringify(item.approval_status)
        .toLowerCase()
        .indexOf("pending".toLowerCase()) !== -1
  );
  const TimeSheetfilteredItems = TimeSheetPendingList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  console.log(TimeSheetfilteredItems);
  //TimeSheet Data End

  //Appraisal Data Start
  var AppraisalReq = ReqList.filter(function (e) {
    return e.type === "Appraisal";
  });

  const AppraisalPendingList = AppraisalReq?.filter(
    (item) =>
      JSON.stringify(item.approval_status)
        .toLowerCase()
        .indexOf("pending".toLowerCase()) !== -1
  );
  const AppraisalfilteredItems = AppraisalPendingList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  //Appraisal Data End

  //Profile Update Data Start
  var ProfileReq = ReqList.filter(function (e) {
    return e.type === "EmpProfileUpdate";
  });

  const ProfilePendingList = ProfileReq?.filter(
    (item) =>
      JSON.stringify(item.approval_status)
        .toLowerCase()
        .indexOf("pending".toLowerCase()) !== -1
  );
  const ProfilefilteredItems = ProfilePendingList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  //Profile Update Data End

  //Loan Req Data Start
  var LoanReq = ReqList.filter(function (e) {
    return e.type === "Loan";
  });
  const LoanPendingList = LoanReq?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf("pending".toLowerCase()) !== -1
  );
  const LoanfilteredItems = LoanPendingList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  //Loan Req End

  //Disbursment Data Req
  const DisbursmentfilteredItems = disbursmentTableData?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  console.log(DisbursmentfilteredItems);
  // TDS Request
  const TDSfilteredItems = TDSPending?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  console.log(TDSfilteredItems);
  //Expense Req Start
  var ExpenseReq = ReqList.filter(function (e) {
    return e.type === "Expense";
  });

  const ExpsnePendingList = ExpenseReq?.filter(
    (item) =>
      JSON.stringify(item.approval_status)
        .toLowerCase()
        .indexOf("pending".toLowerCase()) !== -1
  );
  const ExpsnefilteredItems = ExpsnePendingList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  //Expense Req End
  const [ProjectName, setProjectName] = useState("");

  const FetchProject = (ProjectID) => {
    const OrgID = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/project/details?project_id=" +
      ProjectID +
      "&_orgId=" +
      OrgID;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios.get(api_url, headerConfig).then(function (response) {
      var res = response.data.data;
      setProjectName(res.name);
    });
  };
  const ViewReqCol = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
      width: "90px",
    },

    {
      name: <>{approve_name}</>,
      selector: (row) =>
        DashboardData.map((EmpName, i) => {
          return (
            <>
              {console.log(row)}
              {EmpName._id === row.employeeId
                ? EmpName?.firstName + " " + EmpName?.lastName
                : ""}
            </>
          );
        }),
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.date).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_hours_of_working}</>,
      selector: (row) => row.hours,
    },
    {
      name: <>{text_description}</>,
      selector: (row) => row.description,
    },
    {
      name: <>{text_pro_details}</>,
      selector: (row) => (
        <>
          {ProjectName === "" ? (
            <button
              className="CreateBtn"
              onClick={() => FetchProject(row.projectId)}
            >
              {text_btnclickhere}
            </button>
          ) : (
            <>{ProjectName}</>
          )}
        </>
      ),
    },
  ];

  //TDS reqest accept or reject API
  const TDSApproveReqhandle = (item, approval_status) => {
    console.log(item);
    const url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/update/collection/emp_tds/status";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const dataTobeSend = {
      _orgId: item._orgId,
      requester_id: item.requester_id,
      approver_id: item.approver_id,
      year: 2023,
      approval_status: approval_status,
      tds_id: item.tds_id,
    };
    axios
      .post(url, dataTobeSend, headerConfig)
      .then(function (response) {
        var res = response.data;
        if (approval_status === "approved") {
          successToast("Successfully " + approval_status);
        } else {
          errorToast("Successfully " + approval_status);
        }
        setTDSPopup(false);
        GetTDSRequst();
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
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const DisbursmentApproveReq = (item, approval_status) => {
    setisDisabled(true);
    const url =
      GlobalConstants.Cdomain + "/API/moramba/v3/update/loandisburse/status";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const dataTobeSend = {
      _orgId: sessionStorage.getItem("_compId"),
      loan_id: item.loan_id,
      approver_id: item.approver_id,
      approval_status: approval_status,
    };
    axios
      .post(url, dataTobeSend, headerConfig)
      .then(function (response) {
        setDisbursementPopup(false);

        setisDisabled(false);

        var res = response.data;
        if (approval_status === "approved") {
          successToast("Successfully " + approval_status);
        } else {
          errorToast("Successfully " + approval_status);
        }
        disbursmentReqHandle();
      })
      .catch(function (error) {
        setisDisabled(false);

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

        console.log(error);
      })
      .then(function () {
        setisDisabled(false);

        // always executed
      });
  };

  const approveRequest = (item, approval_status) => {
    setisDisabled(true);
    var _orgId = sessionStorage.getItem("_compId");
    const url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/inbox/updateapprovalrequeststatus";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const dataTobeSend = {
      item: item,
      approval_status: approval_status,
      _orgId: _orgId,
    };
    axios
      .post(url, dataTobeSend, headerConfig)
      .then(function (response) {
        setReqPopup(false);
        setisDisabled(false);
        if (approval_status === "approved") {
          successToast("Successfully " + approval_status);
          dispatch(getEmpData());
          disbursmentReqHandle();
        } else {
          errorToast("Successfully " + approval_status);
        }
        // getApprovalRequestList();
        setProjectName("");
        dispatch(getRequestsList());
        dispatch(resetEmpAttendanceSingle());
        dispatch(resetDailyTimesheet());
        dispatch(resetWeeklyTimesheet());
        dispatch(resetDashboardEmpList());
        // dispatch(getDashboard());
        resetDashboardEmpList();
      })
      .catch(function (error) {
        setisDisabled(false);
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

        console.log(error);
      })
      .then(function () {
        setisDisabled(false);
        // always executed
      });
  };

  const disbursmentReqHandle = () => {
    var currentempid = sessionStorage.getItem("currentempid");
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/pending/loandisbursement?employeeId=" +
      currentempid +
      "&orgId=" +
      _compId;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        console.log(response);
        var rs = response.data.data;
        setDisbursmentTableData(rs.disburseLoanAll);
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

  useEffect(() => {
    disbursmentReqHandle();
  }, []);
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setSearchPHText(
      doc.querySelector("string[name='SearchPHText']")?.textContent ||
        "Search Here..."
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
    );
    setApprove_name(
      doc.querySelector("string[name='approve_name']")?.textContent || "Name"
    );
    setText_date(
      doc.querySelector("string[name='text_date']")?.textContent || "Date"
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent || "Status"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setVactionreq_text(
      doc.querySelector("string[name='vactionreq_text']")?.textContent ||
        "Vacation Requests"
    );
    setTimesheetreq_text(
      doc.querySelector("string[name='timesheetreq_text']")?.textContent ||
        "Time Sheet Requests"
    );
    setAppraisalreq_text(
      doc.querySelector("string[name='appraisalreq_text']")?.textContent ||
        "Appraisal Requests"
    );
    setProfileupdate_text(
      doc.querySelector("string[name='profileupdate_text']")?.textContent ||
        "Profile Update Requests"
    );
    setApprove_rejtext(
      doc.querySelector("string[name='approve_rejtext']")?.textContent ||
        "Reject"
    );
    setApprovepen_text(
      doc.querySelector("string[name='approvepen_text']")?.textContent ||
        "Approve"
    );
    setApprove_note(
      doc.querySelector("string[name='approve_note']")?.textContent || "Note"
    );
    setApprovereq_text(
      doc.querySelector("string[name='approvereq_text']")?.textContent ||
        "View Request"
    );
    setApproved_req(
      doc.querySelector("string[name='approved_req']")?.textContent ||
        "Request For"
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent ||
        "Description"
    );
    setText_hours_of_working(
      doc.querySelector("string[name='text_hours_of_working']")?.textContent ||
        "Hours of Working"
    );
    setText_btnclickhere(
      doc.querySelector("string[name='text_btnclickhere']")?.textContent ||
        "Click here"
    );
    setText_pro_details(
      doc.querySelector("string[name='text_pro_details']")?.textContent ||
        "Project Details"
    );
    setText_expensereq(
      doc.querySelector("string[name='text_expensereq']")?.textContent ||
        "Expense Requests"
    );
    setText_loanrequest(
      doc.querySelector("string[name='text_loanrequest']")?.textContent ||
        "Loan Requests"
    );
    setText_requestpen(
      doc.querySelector("string[name='text_requestpen']")?.textContent ||
        "Request"
    );
    setText_reportgenerated(
      doc.querySelector("string[name='text_reportgenerated']")?.textContent ||
        "New Expense Report Generated"
    );
    setText_promoted(
      doc.querySelector("string[name='text_promoted']")?.textContent ||
        "Promoted To"
    );

    setNewSalaryText(
      doc.querySelector("string[name='newSalaryText']")?.textContent ||
        "New Salary"
    );
    setTextDisbursementDate(
      doc.querySelector("string[name='textDisbursementDate']")?.textContent ||
        "Disbursement Date"
    );
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent || "Amount"
    );
    setText_disbursment(
      doc.querySelector("string[name='text_disbursment']")?.textContent ||
        "Disbursement"
    );
    setDisbursement_req(
      doc.querySelector("string[name='disbursement_req']")?.textContent ||
        "Disbursement Requests"
    );
    setText_tds_req(
      doc.querySelector("string[name='text_tds_req']")?.textContent ||
        "TDS Request"
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
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          <div
            className={
              ReqPopup || disbursmentPopup || TDSPopup ? "bgblur1" : ""
            }
          >
            <div className="d-flex justify-content-between mb-3 mt-3">
              <div></div>
              <div className="d-flex flex-row align-items-center Searchbar searchbarbox">
                <SearchIcon />
                {subHeaderComponent}
              </div>
            </div>
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{vactionreq_text}</h4>
            </div>
            <div className="DataTableClass">
              <DataTable
                columns={columns}
                data={VactionfilteredItems}
                pagination
                fixedHeader
                highlightOnHover
                customStyles={VactionTableStyles}
                onSelectedRowsChange={handleChangeVacation}
              />
            </div>
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{timesheetreq_text}</h4>
            </div>
            <DataTable
              columns={Timesheetcolumns}
              data={TimeSheetfilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={TimeSheetTableStyles}
              onSelectedRowsChange={handleChangeTimesheet}
            />
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{appraisalreq_text}</h4>
            </div>
            <DataTable
              columns={columns}
              data={AppraisalfilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={ApprisalTableStyles}
              onSelectedRowsChange={handleChangeAppraisal}
            />
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{profileupdate_text}</h4>
            </div>
            <DataTable
              columns={columns}
              data={ProfilefilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={ProfileTableStyles}
              onSelectedRowsChange={handleChangeProfile}
            />
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{text_expensereq}</h4>
            </div>

            <DataTable
              columns={columns}
              data={ExpsnefilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={TimeSheetTableStyles}
              onSelectedRowsChange={handleChangeProfile}
            />
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{text_loanrequest}</h4>
            </div>
            <DataTable
              columns={columns}
              data={LoanfilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={VactionTableStyles}
              onSelectedRowsChange={handleChangeProfile}
            />
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{disbursement_req}</h4>
            </div>
            <DataTable
              columns={DisbursmentColumn}
              data={DisbursmentfilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={VactionTableStyles}
              onSelectedRowsChange={handleChangeProfile}
            />
            <Divider />
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h4 className="">{text_tds_req}</h4>
            </div>
            <DataTable
              columns={TDSColumn}
              data={TDSfilteredItems}
              pagination
              fixedHeader
              highlightOnHover
              customStyles={VactionTableStyles}
              onSelectedRowsChange={handleChangeProfile}
            />
          </div>
        </>
      )}
      {ReqPopup ? (
        <>
          <div
            className={
              ViewReqData.type === "TimeSheetDaily" ||
              ViewReqData.type === "TimeSheetWeekly"
                ? "position-fix top-50 start-50 translate-middle SalaryPopup sal-slip-popup w-75"
                : "SalaryPopup  sal-slip-popup"
            }
          >
            <div className="text-end">
              <h3 className="close">
                <CgCloseO
                  onClick={() => [setReqPopup(false), setProjectName("")]}
                />
              </h3>
            </div>
            <div className="text-center mb-4">
              <h4>
                {ViewReqData.type === "EmpProfileUpdate"
                  ? "Employee Profile Update"
                  : ViewReqData.type}{" "}
                {text_requestpen}
              </h4>
              <Divider />
            </div>
            <h6>
              {text_date} : {dayjs(ViewReqData.msgDate).format("MMM DD,YYYY")}
            </h6>
            {ViewReqData.type === "Loan" && (
              <h6>
                {approve_note} :{" "}
                {ViewReqData.msg + " " + ViewReqData.changelog.currency}
              </h6>
            )}
            {(ViewReqData.type === "Vacation" ||
              ViewReqData.type === "EmpProfileUpdate") && (
              <h6>
                {approve_note} : {ViewReqData.msg}
              </h6>
            )}
            {(ViewReqData.type === "TimeSheetDaily" ||
              ViewReqData.type === "TimeSheetWeekly") && (
              <h6>
                <DataTable
                  columns={ViewReqCol}
                  data={[ViewReqData.changedata]}
                  fixedHeader
                  selectableRowsHighlight
                  highlightOnHover
                  customStyles={VactionTableStyles}
                />
              </h6>
            )}
            {ViewReqData.type === "Expense" && (
              <h6>
                {approve_note} : {text_reportgenerated}
              </h6>
            )}
            {ViewReqData.type === "Appraisal" && (
              <>
                <h6>
                  <b>{text_promoted} : </b>
                  {ViewReqData.changelog.designation}
                </h6>
                <h6>
                  <b>{newSalaryText} : </b>
                  {DashboardData.map((EmpName, i) => {
                    return (
                      <>
                        {EmpName._id === ViewReqData.changelog.empid
                          ? EmpName?.empCurrency
                          : ""}
                      </>
                    );
                  })}
                  {ViewReqData.changelog.empSalaryAmount}
                </h6>
              </>
            )}
            <Divider />
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btncancel"
                disabled={isDisabled ? true : false}
                onClick={() => approveRequest(ViewReqData, "rejected")}
              >
                {approve_rejtext}
              </button>
              <button
                className="btnsave"
                disabled={isDisabled ? true : false}
                onClick={() => approveRequest(ViewReqData, "approved")}
              >
                {approvepen_text}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {disbursmentPopup ? (
        <>
          <div className="SalaryPopup  sal-slip-popup">
            <div className="text-end">
              <h3 className="close">
                <CgCloseO onClick={() => setDisbursementPopup(false)} />
              </h3>
            </div>
            <div className="text-center mb-4">
              <h4>
                {text_disbursment} {text_requestpen}
              </h4>
              <Divider />
            </div>
            <h6>
              {textDisbursementDate} :{" "}
              {dayjs(ViewReqData.disburse_date).format("MMM DD,YYYY")}
            </h6>
            <h6>
              {text_Amount} : {ViewReqData.amount + " " + ViewReqData.currency}
            </h6>
            <h6>
              {text_description} : {ViewReqData.description}
            </h6>
            <Divider />

            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btncancel"
                disabled={isDisabled ? true : false}
                onClick={() => DisbursmentApproveReq(ViewReqData, "rejected")}
              >
                {approve_rejtext}
              </button>
              <button
                className="btnsave"
                disabled={isDisabled ? true : false}
                onClick={() => DisbursmentApproveReq(ViewReqData, "approved")}
              >
                {approvepen_text}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {TDSPopup ? (
        <>
          <div className="SalaryPopup  sal-slip-popup">
            <div className="text-end">
              <h3 className="close">
                <CgCloseO onClick={() => setTDSPopup(false)} />
              </h3>
            </div>
            <div className="text-center mb-4">
              <h4>{text_tds_req}</h4>
              <Divider />
            </div>
            <h6>
              {text_date} :{" "}
              {dayjs(ViewReqData.createddate).format("MMM DD,YYYY")}
            </h6>
            <h6>{approve_note} : TDS Document Request</h6>
            <Divider />

            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btncancel"
                onClick={() => TDSApproveReqhandle(ViewReqData, "rejected")}
              >
                {approve_rejtext}
              </button>
              <button
                className="btnsave"
                onClick={() => TDSApproveReqhandle(ViewReqData, "approved")}
              >
                {approvepen_text}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default PendingPage;
