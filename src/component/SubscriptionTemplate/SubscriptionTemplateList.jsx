import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterComponent from "../../utils/FilterComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionTemplate } from "../../redux/SubscriptionTemplate";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import Cookie from "js-cookie";
import { errorToast, successToast } from "../../utils/Helper";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";

function SubscriptionTemplateList() {
  //Redux code from SubscriptionTemplateSlice
  const dispatch = useDispatch();
  const SubscriptionData = useSelector((state) => state.SubscriptionTemplate);
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
  const [title_SubTemp, setTitle_SubTemp] = useState("Subscription Templates");
  const [text_search_template_here, setText_search_template_here] = useState(
    "Search Template Here..."
  );
  const [text_Sno, setText_Sno] = useState("Sr No");

  //Language Variables Ends

  //variable
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (SubscriptionData?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getSubscriptionTemplate())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, [SubscriptionData?.length]);

  //active deactive API
  const setDefaultProfileActive = (type, _id, isActive) => {
    var _orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/msubscription/insertmsubscriptionprofile?type=" +
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
        dispatch(getSubscriptionTemplate());
        var res = response.data;
        successToast(res.message);
      })
      .catch(function (error) {
        console.log(error);
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
          to="/subscription/template/create"
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
        <Link to="/subscription/template/view" state={{ data: row }}>
          <button className="ViewBtn">{btn_view}</button>
        </Link>
      ),
    },
  ];
  const filteredItems = SubscriptionData.filter(
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_search_template_here(
      doc.querySelector("string[name='text_search_template_here']")
        ?.textContent || "Search Template Here..."
    );

    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent || "Create"
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent ||
        "Template Name"
    );
    setSalaryBreakupTypeEffectiveDateHead(
      doc.querySelector("string[name='salaryBreakupTypeEffectiveDateHead']")
        ?.textContent || "Effective Date"
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
    );
    setText_active(
      doc.querySelector("string[name='text_active']")?.textContent || "Active"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setText_deactive(
      doc.querySelector("string[name='text_deactive']")?.textContent ||
        "Deactive"
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent || "Status"
    );
    setTitle_SubTemp(
      doc.querySelector("string[name='title_SubTemp']")?.textContent ||
        "Subscription Templates"
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
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
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
  return (
    <>
      <h3 className="HeadingText mt-1 mb-2 text-center p-2">{title_SubTemp}</h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row Searchbar search_temp">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/subscription/template/create">
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

export default SubscriptionTemplateList;
