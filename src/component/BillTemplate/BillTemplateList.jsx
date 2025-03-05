import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { customTableStyles } from "../../utils/CommanTableStyle";
import FilterComponent from "../../utils/FilterComponent";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { errorToast, successToast } from "../../utils/Helper";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { getBillTemplate } from "../../redux/BillTemplateSlice";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function BillTemplateList() {
  const dispatch = useDispatch();
  const BillTemplateData = useSelector((state) => state.BillTemplate);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  //Language Variables Start
  // old language variable
  const [text_search_template_here, setText_search_template_here] = useState(
    "Search Template Here..."
  );
  const [text_create, setText_create] = useState("Create");

  const [text_temp_name, setText_temp_name] = useState("Template Name");

  const [btn_view, setbtn_view] = useState("View");
  const [text_active, setText_active] = useState("Active");
  const [text_deactive, setText_deactive] = useState("Deactive");
  const [IsLoading, setIsLoading] = useState(true);
  const [text_bill_template, setText_bill_template] =
    useState("Bill Templates");
  const [
    salaryBreakupTypeEffectiveDateHead,
    setSalaryBreakupTypeEffectiveDateHead,
  ] = useState("Effective Date");
  const [text_status, settext_status] = useState("Status");

  //New Variables
  const [text_Sno, setText_Sno] = useState("Sr No");

  //Language Variables Ends

  useEffect(() => {
    var tempcmpId = sessionStorage.getItem("_compId");
    if (
      BillTemplateData[0]?.orgId !== tempcmpId ||
      BillTemplateData?.length === 0
    ) {
      setIsLoading(true);

      Promise.all([dispatch(getBillTemplate())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const setDefaultProfileActive = (type, _id) => {
    var _orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var apiUrl =
      "https://us-east-1.aws.data.mongodb-api.com/app/application-payroll-menis/endpoint/moramba/addBillTamplate?secret=azr123&type=" +
      type;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    var data = { _id: _id, _orgId: _orgId, template_id: _id, isActive: true };
    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        var res = response.data;
        successToast(res.massage);
        dispatch(getBillTemplate());
      })
      .catch(function (error) {
        errorToast(error.massage);
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

      selector: (row) =>
        row.isActive === true ? (
          <button
            className="ActiveBtn"
            disabled
            onClick={() => [setDefaultProfileActive("deactive", row?._id)]}
          >
            {text_active}
          </button>
        ) : (
          <button
            className="DeactiveBtn"
            disabled
            onClick={() => [setDefaultProfileActive("active", row?._id)]}
          >
            {text_deactive}
          </button>
        ),
    },
    {
      name: <>{salaryBreakupTypeEffectiveDateHead}</>,
      sortable: true,
      selector: (row) => dayjs(row.effectiveDate).format("MMM DD,YYYY"),
    },
    {
      name: <>{btn_view}</>,
      selector: (row) => (
        <Link
          to="/bill/template/view"
          state={{
            SelectedBillView: row,
          }}
        >
          <button className="ViewBtn">{btn_view}</button>
        </Link>
      ),
    },
  ];
  const filteredItems = BillTemplateData.filter(
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

    setText_search_template_here(
      doc.querySelector("string[name='text_search_template_here']")?.textContent
    );
    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );
    setSalaryBreakupTypeEffectiveDateHead(
      doc.querySelector("string[name='salaryBreakupTypeEffectiveDateHead']")
        ?.textContent
    );
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
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
    );
    setText_bill_template(
      doc.querySelector("string[name='text_bill_template']")?.textContent
    );
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
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
      {/* <Header /> */}
      <h3 className="HeadingText mt-1 mb-2 text-center p-2">
        {text_bill_template}
      </h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row Searchbar search_temp">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/bill/template/create">
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
    </>
  );
}

export default BillTemplateList;
