import React, { useEffect, useMemo, useState } from "react";
import "../ViewSalaryBreakup/ViewSalaryBreakup.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterComponent from "../../utils/FilterComponent";
import DataTable from "react-data-table-component";
import Header from "../Header/Header";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryBreakupList } from "../../redux/SalaryBreakupListSlice";
import dayjs from "dayjs";

import { GlobalConstants } from "../../utils/GlobalConstants";
import Loader from "../../utils/Loader";

function SalaryBreakupList() {
  const SalaryBreakupList = useSelector((state) => state.SalaryBreakupList); //SELECT CMP API DATA
  const dispatch = useDispatch();
  console.log(SalaryBreakupList);

  // Language Variables start
  const [text_create, setText_create] = useState("Create");
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_status, settext_status] = useState("Status");
  const [
    salaryBreakupTypeEffectiveDateHead,
    setSalaryBreakupTypeEffectiveDateHead,
  ] = useState("Effective Date");
  const [text_active, setText_active] = useState("Active");
  const [text_deactive, setText_deactive] = useState("Deactive");
  const [title_salary_breakup, setTitle_salary_breakup] =
    useState("Salary Breakup");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [text_search_template_here, setText_search_template_here] = useState(
    "Search Template Here..."
  );
  // Language Variables End
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (getSalaryBreakupList?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getSalaryBreakupList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
    },
    {
      name: <>{text_temp_name}</>,
      sortable: true,
      selector: (row) => row.templatename,
    },
    {
      name: <>{text_status}</>,

      selector: (row) =>
        row.isActive === true ? (
          <button disabled className="ActiveBtn">
            {text_active}
          </button>
        ) : (
          <button disabled className="DeactiveBtn">
            {text_deactive}
          </button>
        ),
    },
    {
      name: <>{salaryBreakupTypeEffectiveDateHead}</>,
      sortable: true,
      selector: (row) => dayjs(row.effectiveDate).format("DD MMM,YYYY"),
    },
  ];

  const filteredItems = SalaryBreakupList.filter(
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

    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
    );
    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent
    );
    setSalaryBreakupTypeEffectiveDateHead(
      doc.querySelector("string[name='salaryBreakupTypeEffectiveDateHead']")
        ?.textContent
    );
    setText_active(
      doc.querySelector("string[name='text_active']")?.textContent
    );
    setText_deactive(
      doc.querySelector("string[name='text_deactive']")?.textContent
    );
    setTitle_salary_breakup(
      doc.querySelector("string[name='title_salary_breakup']")?.textContent
    );
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
    setText_search_template_here(
      doc.querySelector("string[name='text_search_template_here']")?.textContent
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
      <h5 className="mt-5 text-center HeadingText">{title_salary_breakup}</h5>
      <div className="container containerBox mt-5">
        <div className="row  mt-5">
          <div className="d-flex justify-content-end">
            <div className="d-flex flex-row align-items-center Searchbar me-3 sal-breakup-searchbox">
              <SearchIcon />
              {subHeaderComponent}
            </div>
            <Link to="/salarybreakup/create">
              <button className="CreateBtn">+ {text_create}</button>
              <br />
            </Link>
          </div>
        </div>
        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <div className="mt-5">
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
export default SalaryBreakupList;
