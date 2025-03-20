import React, { useState, useEffect, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import FilterComponent from "../../utils/FilterComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import dayjs from "dayjs";

import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function ExpenseList() {
  const currentstaffid = sessionStorage.getItem(
    GlobalConstants.session_current_emp_id
  );
  const _orgId = sessionStorage.getItem(
    GlobalConstants.session_current_company_id
  );
  const [TableData, setTableData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [approvedtext, setApprovedtext] = useState("Approved");
  const [rejecttext, setRejecttext] = useState("Rejected");
  const [timesheetpen_text, setTimesheetpen_text] = useState("Pending");
  const [IsLoading, setIsLoading] = useState(true);

  //labguage variable
  //old language
  const [text_btn_addexpense, setText_btn_addexpense] = useState(
    "Create Expense Report"
  );
  const [text_expenser, setText_expenser] = useState("Expense Report");
  const [btn_view, setbtn_view] = useState("View");
  const [text_fileName, setText_fileName] = useState("File Name");
  const [text_srno, setText_srno] = useState("Sr no");
  const [text_fileId, setText_fileId] = useState("File ID");
  const [text_createdon, setText_createdon] = useState("Created on");
  const [text_status, settext_status] = useState("Status");

  // new
  const [text_search_template_here, setText_search_template_here] = useState(
    "Search Template Here..."
  );
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    var dataToBeSent = { _orgId: _orgId, employeeId: currentstaffid };
    var type = "selectall";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/expensedata/addexpensedata?type=" +
      type;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(apiUrl, dataToBeSent, headerConfig)
      .then(function (response) {
        var res = response.data.data;
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        if (res != undefined && res.length != 0) {
          var data = [];
          res?.map((item, index) => {
            var d = {
              ExpName: item.TempleteName,
              ExpId: item.TempleteId,
              Status: item.active + "",
              EffDate: "Jan 01,2023",
              approval_status: item.approval_status,
              list: item.expenseDataList,
            };
            data.push(d);
          });
          setTableData(data);

          console.log(data);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
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
      });
  }, []);
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      name: <>{text_srno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
    },
    {
      name: <>{text_fileName}</>,
      sortable: true,
      selector: (row) => row.ExpName,
    },
    {
      name: <>{text_fileId}</>,
      sortable: false,

      selector: (row) => row.ExpId,
    },
    {
      name: <>{text_createdon}</>,
      sortable: true,
      selector: (row) => dayjs(row.list[0].createdDate).format("MMM DD,YYYY"),
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
    {
      name: <>{btn_view}</>,
      selector: (row) => (
        <Link
          to="/expense/view"
          state={{
            list: row.list,
            FileName: row.ExpName,
          }}
        >
          <button className="ViewBtn">{btn_view}</button>
        </Link>
      ),
    },
  ];
  const filteredItems = TableData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };

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
        PlaceHolder={text_search_template_here}
      />
    );
  }, [filterText, resetPaginationToggle, text_search_template_here]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_expenser(
      doc.querySelector("string[name='text_expenser']")?.textContent ||
        "Expense Report"
    );
    setText_fileName(
      doc.querySelector("string[name='text_fileName']")?.textContent ||
        "File Name"
    );
    setText_fileId(
      doc.querySelector("string[name='text_fileId']")?.textContent || "File ID"
    );
    setText_createdon(
      doc.querySelector("string[name='text_createdon']")?.textContent ||
        "Created on"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setText_btn_addexpense(
      doc.querySelector("string[name='text_btn_addexpense']")?.textContent ||
        "Create Expense Report"
    );
    setText_srno(
      doc.querySelector("string[name='text_srno']")?.textContent || "Sr no"
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent || "Status"
    );
    setTimesheetpen_text(
      doc.querySelector("string[name='timesheetpen_text']")?.textContent ||
        "Pending"
    );
    setRejecttext(
      doc.querySelector("string[name='rejecttext']")?.textContent || "Rejected"
    );
    setApprovedtext(
      doc.querySelector("string[name='approvedtext']")?.textContent ||
        "Approved"
    );
    setText_search_template_here(
      doc.querySelector("string[name='text_search_template_here']")
        ?.textContent || "Search Template Here..."
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
      <h3 className="HeadingText mt-2 mb-2 text-center p-2">{text_expenser}</h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end sub-list-searchbar-btn">
          <div className="d-flex flex-row Searchbar sub-list-searchbar">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/expense/create">
            <button className=" CreateBtn sub-list-btn">
              + {text_btn_addexpense}
            </button>
          </Link>
        </div>
        <div className="mt-3">
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
              onChangePage={TablePaginationActions}
              customStyles={customTableStyles}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ExpenseList;
