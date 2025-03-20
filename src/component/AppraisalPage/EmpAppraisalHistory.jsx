import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import DataTable from "react-data-table-component";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { customTableStyles } from "../../utils/CommanTableStyle";
import axios from "axios";
import { errorToast } from "../../utils/Helper";
import { Rating } from "react-simple-star-rating";
import { CgCloseO } from "react-icons/cg";
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import Cookie from "js-cookie";

function EmpAppraisalHistory() {
  //variable
  const [IsLoading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [empAppraisalHistoryList, setempAppraisalHistoryList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [TableDatapopup, setTableDatapopup] = useState([]);
  const EmployeeData = useSelector((state) => state.empData);

  //language variable
  const [text_appraisal, setText_appraisal] = useState("Appraisal");
  const [newSalaryText, setNewSalaryText] = useState("New Salary ");
  const [btn_view, setbtn_view] = useState("View");
  const [text_date, setText_date] = useState("Date");
  const [text_time, setText_time] = useState("Time");
  const [text_promote_to, setText_promote_to] = useState("Promote To");
  const [text_amount_value, setText_amount_value] = useState("Amount value");
  const [text_heading_title, setText_heading_title] = useState(
    "Appraiser Detail View"
  );
  const [text_Remarks_Optional, setText_Remark_Optional] =
    useState("Remarks(optional)");
  const [text_appraisal_category, setText_appraisal_category] = useState(
    "Appraisal Category & Rating"
  );
  const [text_done_by, setText_done_by] = useState(" New Appraisal Done By");
  //new language variable
  const [text_Appraisal_Detail, setText_Appraisal_Detail] = useState(
    "Appraisal Detail View"
  );
  //language Variable End

  const appraiserhandle = (data) => {
    var value = empAppraisalHistoryList?.filter((val) => val._id === data);
    setTableDatapopup(value);
  };

  const columns = [
    {
      name: <>{text_appraisal}</>,
      sortable: true,
      selector: (row) => [row.designationTo],
    },

    {
      name: <>{text_date}</>,
      sortable: true,
      selector: (row) => dayjs(row.appraisalDate).format("MMM DD, yyyy"),
    },
    {
      name: <>{newSalaryText}</>,
      sortable: true,
      selector: (row) => [
        EmployeeData[0]?.empCurrency +
          (Number(row.toSalary) + Number(row.fromSalary)),
      ],
    },
    {
      name: <>{btn_view}</>,
      sortable: true,
      selector: (row) => (
        <button
          className="ViewBtn"
          onClick={() => [setPopup(!popup), appraiserhandle(row._id)]}
        >
          {btn_view}
        </button>
      ),
    },
  ];

  useEffect(() => {
    var empID = sessionStorage.getItem("currentempid");
    var cmpID = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/appraisal/appraisallistotheremp?_orgId=" +
      cmpID +
      "&employeeId=" +
      empID;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var Value = response.data.data;
        setempAppraisalHistoryList(Value);
        setIsLoading(false);
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
      })
      .then(function () {
        // always executed
      });
  }, []);

  const columnstable = [
    {
      name: <>{text_done_by}</>,
      sortable: true,
      selector: (row, val) => row.appraisalDoneBy,
    },
    {
      name: <>{text_date}</>,

      sortable: true,
      selector: (row) => dayjs(row.appraisalDate).format("MMM DD, YYYY"),
    },
    {
      name: <>{text_time}</>,
      sortable: true,
      selector: (row) => dayjs(row.createdon).format(" HH:mm a"),
    },
    {
      name: <>{text_promote_to}</>,
      sortable: true,
      selector: (row) => row.designationTo,
    },
    {
      name: <>{text_amount_value}</>,
      sortable: true,
      selector: (row) => EmployeeData[0]?.empCurrency + row.toSalary,
    },
    {
      name: <>{text_Remarks_Optional}</>,
      sortable: true,
      selector: (row) => row.remark,
    },
  ];

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_appraisal(
      doc.querySelector("string[name='text_appraisal']")?.textContent ||
        "Appraisal"
    );
    setNewSalaryText(
      doc.querySelector("string[name='newSalaryText']")?.textContent ||
        "New Salary "
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setText_date(
      doc.querySelector("string[name='text_date']")?.textContent || "Date"
    );
    setText_time(
      doc.querySelector("string[name='text_time']")?.textContent || "Time"
    );
    setText_promote_to(
      doc.querySelector("string[name='text_promote_to']")?.textContent ||
        "Promote To"
    );
    setText_amount_value(
      doc.querySelector("string[name='text_amount_value']")?.textContent ||
        "Amount value"
    );
    setText_heading_title(
      doc.querySelector("string[name='text_heading_title']")?.textContent ||
        "Appraiser Detail View"
    );
    setText_Remark_Optional(
      doc.querySelector("string[name='text_Remarks_Optional']")?.textContent ||
        "Remarks(optional)"
    );
    setText_appraisal_category(
      doc.querySelector("string[name='text_appraisal_category']")
        ?.textContent || "Appraisal Category & Rating"
    );
    setText_done_by(
      doc.querySelector("string[name='text_done_by']")?.textContent ||
        " New Appraisal Done By"
    );
  };

  const filterItem = empAppraisalHistoryList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  //table appraiser detail data
  const filteredItemspopup = TableDatapopup.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div
        className={
          popup === true
            ? "appraisaltable bgblur1  mt-4 p-2"
            : "appraisaltable  mt-4 p-2"
        }
      >
        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <div className="appraisaltable mt-3">
            <div
              className="row m-3 scrollbarAppraisal force-overflow"
              id="style-1"
            >
              <DataTable
                columns={columns}
                data={filterItem}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          </div>
        )}
      </div>
      {popup ? (
        <>
          <div className="row mt-3">
            <div className="appraisaldetailpopup">
              <div className="row text-end">
                <h3 className="close" id="closeMob">
                  <CgCloseO
                    onClick={() => setPopup(false)}
                    className="sal-det-pop-close"
                  />
                </h3>
              </div>
              <h4 className="text-center HeadingText">
                {text_Appraisal_Detail}
              </h4>
              <div className="popuptable mt-5 appraisal-list-popup">
                <DataTable
                  columns={columnstable}
                  data={filteredItemspopup}
                  fixedHeader
                  selectableRowsHighlight
                  highlightOnHover
                  customStyles={customTableStyles}
                />
              </div>

              <div className="mt-3">
                <div className="rating_cat">
                  <h4 className="text-center mt-3">
                    {text_appraisal_category}
                  </h4>
                </div>
                <div className="appListCatRating">
                  {TableDatapopup.length > 0 &&
                    TableDatapopup[0]?.appraisalPerformance?.map((v, i) => {
                      return (
                        <>
                          {v.rating_count !== 0 && (
                            <>
                              <div className="text-center" key={i}>
                                <h6>{v?.category}</h6>
                                <Rating
                                  initialValue={
                                    Number(v?.rating_count) || Number(v?.Rating)
                                  }
                                  iconsCount={10}
                                  readonly
                                  size={35}
                                  className="app-list-popup-rating"
                                />
                                <div className="d-flex justify-content-center">
                                  <label className="appraisal-rating-lowest">
                                    Lowest
                                  </label>
                                  <label className="label_highest appraisal-rating-highest mx-6">
                                    Highest
                                  </label>
                                </div>
                                <br />
                              </div>
                            </>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default EmpAppraisalHistory;
