import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterComponent from "../../utils/FilterComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getExpenseTemplate } from "../../redux/ExpenseTemplateSlice";
import dayjs from "dayjs";

import { errorToast, successToast } from "../../utils/Helper";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import Cookie from "js-cookie";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";

function ExpenseTemplateList() {
  //Redux code from ExpenseTemplateSlice
  const dispatch = useDispatch();
  const ExpenseData = useSelector((state) => state.ExpenseTemplate);
  //Language Variables Start
  // old language variable
  const [text_create, setText_create] = useState("Create");
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [
    salaryBreakupTypeEffectiveDateHead,
    setSalaryBreakupTypeEffectiveDateHead,
  ] = useState("Effective Date");
  const [text_edit, setText_edit] = useState("Edit");
  const [btn_view, setbtn_view] = useState("View");
  const [text_active, setText_active] = useState("Active");
  const [text_deactive, setText_deactive] = useState("Deactive");
  const [text_status, settext_status] = useState("Status");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [title_ExpTemp, setTitle_ExpTemp] = useState("Expense Templates");
  const [text_search_template_here, setText_search_template_here] = useState(
    "Search Template Here..."
  );
  //Language Variables Ends

  //variable
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ExpenseData?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getExpenseTemplate())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, [ExpenseData?.length]);

  //active deactive API
  const setDefaultProfileActive = (type, _id, isActive) => {
    var _orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/mexpense/insertmexpenseprofile?type=" +
      type;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    var data = {
      _id: _id,
      orgId: _orgId,
      isActive: isActive === true ? false : true,
    };

    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        dispatch(getExpenseTemplate());
        var res = response.data;
        successToast(res.message);
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
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
    },
    {
      name: <>{text_temp_name}</>,
      sortable: true,
      selector: (row) => row.templatename,
    },
    {
      name: <>{text_status}</>,
      sortable: false,

      selector: (row) => (
        <button
          className={row.isActive === true ? "ActiveBtn" : "DeactiveBtn"}
          disabled
          onClick={(event) => [
            setDefaultProfileActive("active", row._id, row.isActive),
          ]}
        >
          {row.isActive === true ? <>{text_active}</> : <>{text_deactive}</>}
        </button>
      ),
    },
    {
      name: <>{salaryBreakupTypeEffectiveDateHead}</>,
      sortable: true,
      selector: (row) => dayjs(row.effectiveDate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_edit}</>,
      selector: (row) => (
        <Link
          to="/expense/template/create"
          state={{
            data: row,
          }}
        >
          <button className="EditBtn">{text_edit}</button>
        </Link>
      ),
    },
    {
      name: <>{btn_view}</>,
      selector: (row) => (
        <Link to="/expense/template/view" state={{ data: row }}>
          <button className="ViewBtn">{btn_view}</button>
        </Link>
      ),
    },
  ];

  const filteredItems = ExpenseData.filter(
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
        PlaceHolder={text_search_template_here}
      />
    );
  }, [filterText, resetPaginationToggle, text_search_template_here]);
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_search_template_here(
      doc.querySelector("string[name='text_search_template_here']")?.textContent
    );
    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
    );
    setSalaryBreakupTypeEffectiveDateHead(
      doc.querySelector("string[name='salaryBreakupTypeEffectiveDateHead']")
        ?.textContent
    );
    setText_edit(doc.querySelector("string[name='text_edit']")?.textContent);
    setText_active(
      doc.querySelector("string[name='text_active']")?.textContent
    );
    setbtn_view(doc.querySelector("string[name='btn_view']")?.textContent);
    setText_deactive(
      doc.querySelector("string[name='text_deactive']")?.textContent
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent
    );
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
    setTitle_ExpTemp(
      doc.querySelector("string[name='title_ExpTemp']")?.textContent
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
      <h3 className="HeadingText mt-1 mb-2 text-center p-2">{title_ExpTemp}</h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row Searchbar search_temp">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/expense/template/create">
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
              onChangePage={TablePaginationActions}
              customStyles={customTableStyles}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default ExpenseTemplateList;
