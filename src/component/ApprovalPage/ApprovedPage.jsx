import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { ApprovedTableStyles } from "../../utils/CommanTableStyle";
import SearchIcon from "@mui/icons-material/Search";
import FilterComponent from "../../utils/FilterComponent";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsList } from "../../redux/RequestsListSlice";
import dayjs from "dayjs";

import Loader from "../../utils/Loader";
import { errorToast } from "../../utils/Helper";
import axios from "axios";
import Cookie from "js-cookie";

function ApprovedPage() {
  //language variable
  const [text_date, setText_date] = useState("Date");
  const [text_status, settext_status] = useState("Status");
  const [approve_name, setApprove_name] = useState("Name");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [SearchPHText, setSearchPHText] = useState("Search Here...");
  const [approved_req, setApproved_req] = useState("Request For");
  const [IsLoading, setIsLoading] = useState("true");

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [TDSRequest, setTDSRequest] = useState([]);
  const ReqList = useSelector((state) => state.RequestsList);
  const DashboardData = useSelector((state) => state.allEmpList);
  const dispatch = useDispatch();
  useEffect(() => {
    if (ReqList?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getRequestsList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const [pageCount, setPageCount] = useState(1);
  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
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
      selector: (row) => dayjs(row.createdDate).format("DD MMM,YYYY"),
    },

    {
      name: <>{approved_req}</>,
      selector: (row) =>
        row.type === "EmpProfileUpdate"
          ? "Profile Update Request"
          : row.type === "TimeSheetDaily"
          ? "Daily Timesheet Request"
          : row.type === "TimeSheetWeekly"
          ? "Weekly Timesheet Request"
          : row.type === "Vacation"
          ? "Leave Request"
          : row.type === "Appraisal"
          ? "Appraisal Request"
          : row.type === "Loan"
          ? "Loan Request"
          : row.type === "Expense"
          ? "Expense Request"
          : "-",
    },
    {
      name: <>{text_status}</>,
      selector: (row) => (
        <>
          <span className="text-approved">
            {row.approval_status.charAt(0).toUpperCase() +
              row.approval_status.slice(1)}
          </span>
        </>
      ),
    },
  ];

  //TDScolumn
  const TDScolumn = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
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
      selector: (row) => dayjs(row.createdDate).format("DD MMM,YYYY"),
    },

    {
      name: <>{approved_req}</>,
      selector: (row) => <p>TDS Documnet Request</p>,
    },
    {
      name: <>{text_status}</>,
      selector: (row) => (
        <>
          <span className="text-approved">
            {row.approval_status.charAt(0).toUpperCase() +
              row.approval_status.slice(1)}
          </span>
        </>
      ),
    },
  ];
  var ApprovedList = ReqList.filter(function (e) {
    return e.approval_status === "approved";
  });
  const filteredItems = ApprovedList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  //TDS Approved request
  const filterTDSRequest = TDSRequest?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
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
        PlaceHolder={SearchPHText}
      />
    );
  }, [filterText, resetPaginationToggle, SearchPHText]);

  useEffect(() => {
    var currentempid = sessionStorage.getItem("currentempid");
    var _compId = sessionStorage.getItem("_compId");
    var addedDate = new Date();
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/collection/emp_tds/status?type=approved&admin=true";

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
        setTDSRequest(rs);
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
    setText_date(
      doc.querySelector("string[name='text_date']")?.textContent || "Date"
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent || "Status"
    );
    setApprove_name(
      doc.querySelector("string[name='approve_name']")?.textContent || "Name"
    );
    setApproved_req(
      doc.querySelector("string[name='approved_req']")?.textContent ||
        "Request For"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <div className="d-flex flex-row align-items-center Searchbar searchbarbox">
          <SearchIcon />
          {subHeaderComponent}
        </div>
      </div>
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          {TDSRequest?.length !== 0 ? (
            <>
              <div className="mt-1">
                <DataTable
                  columns={columns}
                  data={filteredItems}
                  pagination
                  fixedHeader
                  highlightOnHover
                  customStyles={ApprovedTableStyles}
                  onChangePage={TablePaginationActions}
                />
              </div>
              <h3>
                <u>TDS Approved Request</u>
              </h3>
              <div className="mt-1">
                <DataTable
                  columns={TDScolumn}
                  data={filterTDSRequest}
                  pagination
                  fixedHeader
                  highlightOnHover
                  customStyles={ApprovedTableStyles}
                  onChangePage={TablePaginationActions}
                />
              </div>
            </>
          ) : (
            <div className="mt-1">
              {" "}
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                fixedHeader
                highlightOnHover
                customStyles={ApprovedTableStyles}
                onChangePage={TablePaginationActions}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ApprovedPage;
