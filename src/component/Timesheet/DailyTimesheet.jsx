import React, { useEffect, useState, useMemo } from "react";
import "../Timesheet/Timesheet.css";
import FilterComponent from "../../utils/FilterComponent";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getTimesheetProject } from "../../redux/TimesheetProjectSlice";
import { getDailyTimesheet } from "../../redux/DailyTimesheetSlice";
import dayjs from "dayjs";

import Loader from "../../utils/Loader";

function DailyTimesheet() {
  //redux data
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.TimesheetProject);
  const dailySheetData = useSelector((state) => state.DailyTimesheet);

  //language variable
  const [text_create, setText_create] = useState("Create");
  const [text_search_ph, setText_search_ph] = useState("Search Here...");
  const [text_customer_name, setText_customer_name] = useState("Customer Name");
  const [text_project_name, setText_project_name] = useState("Project Name");
  const [text_description, setText_description] = useState("Description");
  const [text_status, setText_status] = useState("Status");
  const [text_date, setText_date] = useState("Date");
  const [text_start_end_time, setText_start_end_time] =
    useState("Start-End Time");
  const [text_hrs, setText_hrs] = useState("Hours");
  const [rejecttext, setRejecttext] = useState("Rejected");
  const [approvedtext, setApprovedtext] = useState("Approved");
  const [timesheetpen_text, setTimesheetpen_text] = useState("Pending");
  //language variable end

  //variable
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (projectData?.length === 0) {
      dispatch(getTimesheetProject());
    }
  }, [projectData?.length]);

  useEffect(() => {
    var empId = sessionStorage.getItem(GlobalConstants.session_current_emp_id);
    if (dailySheetData?.length === 0 || empId !== dailySheetData?.employeeId) {
      setIsLoading(true);
      Promise.all([dispatch(getDailyTimesheet())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const columns = [
    {
      name: <>{text_date}</>,
      sortable: true,
      selector: (row) => dayjs(row.date).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_hrs}</>,
      sortable: true,
      selector: (row) => row.hours,
    },
    {
      name: <>{text_customer_name}</>,
      sortable: true,
      selector: (row) =>
        projectData
          .filter((value) => value._id === row.projectId)
          .map((e) => e.clientName),
    },
    {
      name: <>{text_project_name}</>,
      sortable: true,
      selector: (row) =>
        projectData
          .filter((value) => value._id === row.projectId)
          .map((e) => e.name),
    },
    {
      name: <>{text_description}</>,
      sortable: true,
      selector: (row) => row.description,
    },
    {
      name: <>{text_status}</>,

      selector: (row) => (
        <div
          className={
            row?.approval_status === "approved"
              ? "text_green "
              : row?.approval_status === "rejected"
              ? "text_red"
              : "text_yellow"
          }
        >
          {row?.approval_status === "approved"
            ? `${approvedtext}`
            : row?.approval_status === "rejected"
            ? `${rejecttext}`
            : `${timesheetpen_text}`}
        </div>
      ),
    },
  ];

  const filteredItems = dailySheetData.filter(
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
        PlaceHolder={text_search_ph}
      />
    );
  }, [filterText, resetPaginationToggle, text_search_ph]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent || "Create"
    );
    setText_customer_name(
      doc.querySelector("string[name='text_customer_name']")?.textContent ||
        "Customer Name"
    );
    setText_project_name(
      doc.querySelector("string[name='text_project_name']")?.textContent ||
        "Project Name"
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent ||
        "Description"
    );
    setText_start_end_time(
      doc.querySelector("string[name='text_start_end_time']")?.textContent ||
        "Start-End Time"
    );
    setText_hrs(
      doc.querySelector("string[name='text_hrs']")?.textContent || "Hours"
    );
    setRejecttext(
      doc.querySelector("string[name='rejecttext']")?.textContent || "Rejected"
    );
    setApprovedtext(
      doc.querySelector("string[name='approvedtext']")?.textContent ||
        "Approved"
    );
    setTimesheetpen_text(
      doc.querySelector("string[name='timesheetpen_text']")?.textContent ||
        "Pending"
    );
    setText_status(
      doc.querySelector("string[name='text_status']")?.textContent || "Status"
    );
    setText_search_ph(
      doc.querySelector("string[name='text_search_ph']")?.textContent ||
        "Search Here..."
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
      <div className="container mt-4">
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row Searchbar" id="searchmob">
            <SearchIcon className="iconTS" />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/addtimesheet" state={{ data: 0 }}>
            <button className=" CreateBtn">+ {text_create}</button>
          </Link>
        </div>
        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={customTableStyles}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DailyTimesheet;
