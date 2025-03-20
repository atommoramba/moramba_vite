import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { customTableStyles } from "../../utils/CommanTableStyle";
import dayjs from "dayjs";

import DatePicker from "react-datepicker";
import { CgCloseO } from "react-icons/cg";
import axios from "axios";
import { Divider } from "@mui/material";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function HistoryPage() {
  //variable
  const [IsLoading, setIsLoading] = useState(true);
  const [historydata, setHistoryData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [viewdata, setViewData] = useState("");
  const [selectYear, setSelectYear] = useState(new Date());
  const [salarymonth, setsalarymonth] = useState("Month");

  //language variable
  const [monthText, setMonthText] = useState("Month");
  const [text_year, setText_year] = useState("Year");
  const [btn_view, setbtn_view] = useState("View");
  const [text_grosssalary, setText_grosssalary] = useState("Gross Salary");
  const [text_earning, setText_earning] = useState("Earning");
  const [text_totaldeduction, setText_totaldeduction] =
    useState("Total deduction");
  const [text_totalearning, setText_totalearning] = useState("Total Earning");
  const [title_deduction, setTitle_deduction] = useState("Deduction");

  //new language variable
  const [text_netsalary, setText_netsalary] = useState("Net Salary");

  const columns = [
    {
      name: <>{monthText}</>,
      sortable: true,
      selector: (row) => dayjs(row.effectiveDate).format("MMM"),
    },
    {
      name: <>{text_year}</>,
      sortable: true,
      selector: (row) => dayjs(row.effectiveDate).format("YYYY"),
    },
    {
      name: <>{btn_view}</>,
      sortable: true,
      selector: (row) => (
        <button
          className="ViewBtn viewbtnmob"
          onClick={() => {
            setPopup(true);
            setViewData(row._id);
          }}
        >
          {btn_view}
        </button>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    var apiUrl =
      GlobalConstants.Cdomain + "/API/moramba/v3/get/salaryinfo/history";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    var orgid = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var empid = sessionStorage.getItem(GlobalConstants.session_current_emp_id);
    var data = {
      orgId: orgid,
      empId: empid,
    };
    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        console.log(response.data.data);
        setHistoryData(response.data.data);
        setIsLoading(false);
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
        // errorToast(error.message);
        console.log(error.message);
      });
  }, []);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setMonthText(
      doc.querySelector("string[name='monthText']")?.textContent || "Month"
    );
    setText_year(
      doc.querySelector("string[name='text_year']")?.textContent || "Year"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setText_grosssalary(
      doc.querySelector("string[name='text_grosssalary']")?.textContent ||
        "Gross Salary"
    );
    setText_earning(
      doc.querySelector("string[name='text_earning']")?.textContent || "Earning"
    );
    setText_totaldeduction(
      doc.querySelector("string[name='text_totaldeduction']")?.textContent ||
        "Total deduction"
    );
    setTitle_deduction(
      doc.querySelector("string[name='title_deduction']")?.textContent ||
        "Deduction"
    );
    // setText_totalearning(
    //   doc.querySelector("string[name='text_totalearning']")
    //     ?.textContent
    // );
    setText_netsalary(
      doc.querySelector("string[name='text_netsalary']")?.textContent ||
        "Net Salary"
    );
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const FilterData = historydata.filter((val) => {
    if (salarymonth === "Month") {
      return (
        dayjs(val.effectiveDate).format("YYYY") ===
        dayjs(selectYear).format("YYYY")
      );
    } else {
      return (
        dayjs(val.effectiveDate).format("MMM") +
          "," +
          dayjs(val.effectiveDate).format("YYYY") ===
        salarymonth + "," + dayjs(selectYear).format("YYYY")
      );
    }
  });

  return (
    <>
      <div
        className={
          popup === true
            ? "appraisaltable bgblur1  mt-4 p-2"
            : "appraisaltable  mt-4 p-2"
        }
      >
        <div className="d-flex align-items-center gap-3">
          <select
            className="CountryInputbox1"
            onChange={(e) => setsalarymonth(e.target.value)}
            value={salarymonth}
          >
            <option value="Month" selected disabled>
              {monthText}
            </option>

            {Months.length > 0 &&
              Months.map((MonthName) => {
                return (
                  <>
                    <option value={MonthName}>{MonthName}</option>
                  </>
                );
              })}
          </select>
          <div>
            <div style={{ position: "sticky" }}>
              <DatePicker
                className="w-25"
                selected={selectYear}
                onChange={(date) => setSelectYear(date)}
                showYearPicker
                dateFormat="yyyy"
                maxDate={new Date()}
                popperPlacement="bottom"
              />
            </div>
          </div>
        </div>
        <div className="appraisaltable mt-3">
          <div
            className="row m-3 scrollbarAppraisal force-overflow"
            id="style-1"
          >
            {IsLoading ? (
              <div className="mt-5 mb-5 d-flex justify-content-center">
                <Loader />
              </div>
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={FilterData}
                  pagination
                  fixedHeader
                  selectableRowsHighlight
                  highlightOnHover
                  customStyles={customTableStyles}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {popup ? (
        <>
          <div className="row mt-3">
            <div className="historypopup p-3">
              <div className="row text-end">
                <h3 className="close" id="closeMob">
                  <CgCloseO
                    onClick={() => setPopup(false)}
                    className="sal-det-pop-close"
                  />
                </h3>
                <h3 className="text-center">
                  {" "}
                  {historydata
                    .filter((e) => e._id === viewdata)
                    .map((val) => (
                      <>
                        {dayjs(val.effectiveDate).format("MMM")},{" "}
                        {dayjs(val.effectiveDate).format("yyyy")}
                      </>
                    ))}
                </h3>
              </div>
              <Divider />
              <div className="row p-2 scroll_history">
                <table className="addstafftable mx-1">
                  <tr className="addstaffhead p-1">
                    <th className="p-1">{text_earning}</th>

                    <th className="p-1 text-end">{text_grosssalary}</th>
                  </tr>
                  {historydata
                    .filter((e) => e._id === viewdata)
                    .map((val) => (
                      <>
                        {val.mandetorylist.length > 0 &&
                          val.mandetorylist.map((item, i) => (
                            <tr>
                              <td className="p-1">{item.name}</td>
                              <td className="tfoot text-end">
                                {sessionStorage.getItem(
                                  GlobalConstants.session_current_emp_currency_val
                                )}
                                {Number(item.valdata)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              </td>
                            </tr>
                          ))}
                        {val.allowancelist.length > 0 &&
                          val.allowancelist.map((item, i) => (
                            <tr>
                              <td className="p-1">{item.name}</td>
                              <td className="tfoot text-end">
                                {sessionStorage.getItem(
                                  GlobalConstants.session_current_emp_currency_val
                                )}
                                {Number(item.valdata)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td>
                            <b>{text_totalearning}</b>
                          </td>
                          <td className="tfoot text-end">
                            <b>
                              {sessionStorage.getItem(
                                GlobalConstants.session_current_emp_currency_val
                              )}
                              {Number(val.mandetorytotal) +
                                Number(val.allowancetotal)}
                            </b>
                          </td>
                        </tr>
                      </>
                    ))}

                  <tr className="addstaffhead p-1">
                    <th className="p-1">{title_deduction}</th>
                    <th className="p-1 text-end">{text_grosssalary}</th>
                  </tr>
                  {historydata
                    .filter((e) => e._id === viewdata)
                    .map((value) => (
                      <>
                        {value.deductionlist.length > 0 &&
                          value.deductionlist.map((item, i) => (
                            <tr>
                              <td className="p-1">{item.name}</td>
                              <td className="tfoot text-end">
                                {sessionStorage.getItem(
                                  GlobalConstants.session_current_emp_currency_val
                                )}
                                {Number(item.valdata)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              </td>
                            </tr>
                          ))}
                        {value.taxlist.length > 0 &&
                          value.taxlist.map((item, i) => (
                            <tr>
                              <td className="p-1">{item.name}</td>
                              <td className="tfoot text-end">
                                {sessionStorage.getItem(
                                  GlobalConstants.session_current_emp_currency_val
                                )}
                                {Number(item.valdata)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td>
                            <b>{text_totaldeduction}</b>
                          </td>
                          <td className="tfoot text-end">
                            <b>
                              {sessionStorage.getItem(
                                GlobalConstants.session_current_emp_currency_val
                              )}
                              {Number(value.deductiontotal) +
                                Number(value.taxtotal)}
                            </b>
                          </td>
                        </tr>
                      </>
                    ))}
                </table>
              </div>
              <div className="row mt-1 amount_sty mx-1 text-white amount_position">
                <h5 className="col-md-6 mt-2">{text_netsalary} : </h5>
                {historydata
                  .filter((e) => e._id === viewdata)
                  .map((val) => (
                    <>
                      <b
                        className="col-md-6 text-end mt-2 px-1"
                        id="mob_amount"
                      >
                        {sessionStorage.getItem(
                          GlobalConstants.session_current_emp_currency_val
                        )}
                        {val.salaryafterdeduction}
                      </b>
                    </>
                  ))}
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

export default HistoryPage;
