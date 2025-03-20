import React, { useEffect, useState } from "react";
import "../AppraisalList/AppraisalList.css";
import { customTableStyles } from "../../utils/CommanTableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAppraisalDetailList } from "../../redux/AppraisalDetailListSlice";
import dayjs from "dayjs";

import { CgCloseO } from "react-icons/cg";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { Rating } from "react-simple-star-rating";
import { getEmpData } from "../../redux/EmpDataSlice";
import Loader from "../../utils/Loader";
import axios from "axios";
import { errorToast } from "../../utils/Helper";
import Cookie from "js-cookie";

function AppraisalList() {
  const dispatch = useDispatch();
  const EmployeeData = useSelector((state) => state.empData);
  const EmployeeList = useSelector((state) => state.allEmpList);
  const [IsLoading, setIsLoading] = useState(true);
  const [appraisalListData, setappraisalListData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [popup, setPopup] = useState(false);
  const [TableDatapopup, setTableDatapopup] = useState([]);
  console.log(TableDatapopup);
  //language start
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
  //new language variable
  const [text_appraisalview, setText_appraisalview] = useState(
    "Appraisal Detail View"
  );
  const [text_appraisal_givento, setText_appraisal_givento] =
    useState("Appraisal To");
  //language end

  useEffect(() => {
    if (EmployeeData?.length === 0) {
      dispatch(getEmpData());
    }
  }, [EmployeeData?.length]);

  useEffect(() => {
    var _id = sessionStorage.getItem(GlobalConstants.getItem);
    if (appraisalListData?.length === 0 || appraisalListData?._id !== _id) {
      setIsLoading(true);

      Promise.all([dispatch(getAppraisalDetailList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, [appraisalListData?.length]);

  useEffect(() => {
    var empId = sessionStorage.getItem("currentempid");
    if (
      appraisalListData?.length === 0 ||
      appraisalListData[0]?.employeeId !== empId
    ) {
      dispatch(getAppraisalDetailList());
    }
  }, [appraisalListData?.length]);

  const appraiserhandle = (data) => {
    var value = appraisalListData?.filter((val) => val._id === data);
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
      selector: (row) => dayjs(row.appraisalDate).format("MMM DD, YYYY"),
    },
    {
      name: <>{newSalaryText}</>,
      sortable: true,
      selector: (row) => [EmployeeData[0]?.empCurrency + row.toSalary],
    },
    {
      name: <>{btn_view}</>,
      sortable: true,
      selector: (row) => (
        <button
          className="ViewBtn"
          onClick={() => {
            setPopup(true);
            appraiserhandle(row._id);
          }}
        >
          {btn_view}
        </button>
      ),
    },
  ];

  const filteredItems = appraisalListData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  //appraisal detail data
  const filteredItemspopup = TableDatapopup.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const columnstable = [
    {
      name: <>{text_appraisal_givento}</>,
      sortable: true,
      selector: (row, val) =>
        EmployeeList.map((EmpName, i) => {
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

  useEffect(() => {
    var empID = sessionStorage.getItem("currentempid");
    var cmpID = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/appraisal/appraisallistcurrentemp?_orgId=" +
      cmpID +
      "&appraisalDoneById=" +
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
        if (Value !== null) {
          setappraisalListData(Value);
        }
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
    setText_appraisal_givento(
      doc.querySelector("string[name='text_appraisal_givento']")?.textContent ||
        "Appraisal To"
    );
    setText_appraisalview(
      doc.querySelector("string[name='text_appraisalview']")?.textContent ||
        "Appraisal Detail View"
    );
  };

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

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
                data={filteredItems}
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
              <h4 className="text-center HeadingText">{text_appraisalview}</h4>
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
                              <div className="text-center">
                                <h6>{v?.category}</h6>
                                <Rating
                                  initialValue={v?.rating_count || v?.Rating}
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
                  {TableDatapopup.length > 0 &&
                    TableDatapopup[0]?.appraisalPerformanceself?.map((v, i) => {
                      return (
                        <>
                          {v.rating_count !== 0 && (
                            <>
                              <div className="text-center">
                                <h6>{v?.category}</h6>
                                <Rating
                                  initialValue={v?.rating_count || v?.Rating}
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
export default AppraisalList;
