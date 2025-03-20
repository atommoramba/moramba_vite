import { Divider } from "@mui/material";
import dayjs from "dayjs";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import Header from "../Header/Header";
import { CgCloseO } from "react-icons/cg";
import "./SalaryDetails.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmpSalaryData } from "../../redux/EmpSalaryDetailsSlice";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { errorToast } from "../../utils/Helper";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function SalaryDetails() {
  const SelectedEmpSalaryData = useSelector((state) => state.empSalaryData);
  const SelectedEmpData = useSelector((state) => state.empData);
  const empSalaryType = SelectedEmpData[0].empSalaryPayType;
  console.log(SelectedEmpData[0].empSalaryPayType);
  const [Popup, setPopup] = useState(false);
  const [SelectedData, setSelectedData] = useState([]);
  const [SalarySlipPopup, setSalarySlipPopup] = useState(false);
  const [selectYear, setSelectYear] = useState(new Date());
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());
  const [salarymonth, setsalarymonth] = useState("Month");
  const [selectYearsalary, setSelectYearsalary] = useState(new Date());

  //language Variables start
  const [text_netsalary, setText_netsalary] = useState("Net Salary");
  const [text_earning, setText_earning] = useState("Earning");
  const [text_totaldeduction, setText_totaldeduction] =
    useState("Total deduction");
  const [text_Amount, setText_Amount] = useState("Amount");
  const [text_salary_detail, setText_salary_detail] =
    useState("Salary Details");
  const [btn_view, setbtn_view] = useState("View");
  const [text_select_month, setText_select_month] = useState("Select Month");
  const [text_selectdate, setText_selectdate] = useState("Select Date");
  const [text_select_year, setText_select_year] = useState("Select Year");
  const [text_download, setText_download] = useState("Download");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_year, setText_year] = useState("Year");
  const [monthText, setMonthText] = useState("Month");
  const [text_salary, settext_salary] = useState("Salary");
  const [text_present, setText_present] = useState("Present");
  const [title_deduction, setTitle_deduction] = useState("Deduction");
  const [title_allowance, setTitle_allowance] = useState("Allowance");
  const [text_loanpaid, setText_loanpaid] = useState("Loan Paid");
  const [text_present_days, setText_present_days] = useState("Present Days");
  const [text_down_salaryslip, setText_down_salaryslip] = useState(
    "Download Salary Slip"
  );
  const [text_payable_amount, setText_payable_amount] =
    useState("Payable Amount");
  const [text_payable_salary, setText_payable_salary] =
    useState("Payable Salary");
  const [text_tax, setText_tax] = useState("Tax");
  const [text_grosssalary, setText_grosssalary] = useState("Gross Salary");
  const [text_salary_type, setText_salary_type] = useState("Salary Type");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [text_End_Date, setText_End_Date] = useState("End Date");

  //language Variables end
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (SelectedEmpSalaryData.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getEmpSalaryData())]).then(() =>
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
      name: <>{text_salary_type}</>,
      sortable: true,
      selector: (row) => row.paytype,
    },
    {
      // name: <>{text_year}</>,
      name: <>{text_start_date}</>,
      sortable: true,
      selector: (row) => dayjs(row.paytypestartdate).format("LL"),
    },
    {
      // name: <>{monthText}</>,
      name: <>{text_End_Date}</>,
      sortable: false,
      selector: (row) => dayjs(row.paytypeenddate).format("LL"),
    },
    {
      name: <>{text_salary}</>,
      sortable: true,
      selector: (row) => [
        sessionStorage.getItem("session_current_emp_currency_val") === null
          ? ""
          : sessionStorage.getItem("session_current_emp_currency_val"),
        Number(row.actualAmountToPay)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      ],
    },
    {
      name: <>{text_present}</>,
      sortable: false,
      selector: (row) =>
        row.emp_present <= "1"
          ? row.emp_present + " Day"
          : row.emp_present + " Days",
    },
    {
      name: <>{text_payable_amount}</>,
      sortable: false,
      selector: (row) => [
        sessionStorage.getItem("session_current_emp_currency_val") === null
          ? ""
          : sessionStorage.getItem("session_current_emp_currency_val"),
        Number(row.actualAmountToPay)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      ],
    },
    {
      name: <>{btn_view}</>,
      sortable: false,
      selector: (row) => (
        <button
          className="ViewBtn"
          onClick={() => [setSelectedData(row), setPopup(true)]}
        >
          {btn_view}
        </button>
      ),
      width: "170px",
    },
  ];

  //SalarySlips Download API

  const SalaryslipHandler = () => {
    console.log(selectDate);
    var d = dayjs(selectDate);
    var dy = dayjs(selectYear);
    d.month(); // 1
    var date = d.format("YYYY-MM-DD");
    var y = dy.format("YYYY");
    console.log(date);
    console.log(y);
    var currentempid = sessionStorage.getItem("currentempid");
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/EMPMonthlySalaryDetails/getsalaryslipmonthly?_orgId=" +
      _compId +
      "&employeeId=" +
      currentempid +
      "&paytype=" +
      empSalaryType +
      "&date=" +
      date;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      responseType: "arraybuffer",
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var res = response.data;
        let blob = new Blob([response.data], { type: "application/pdf" }),
          url = window.URL.createObjectURL(blob);
        window.open(url);
      })
      .catch(function (error) {
        console.log(error.message);
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
  };
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

  const [newMonth, setnewMonth] = useState([]);
  console.log("Selected Year=>>", dayjs(selectYearsalary).format("YYYY"));
  console.log("Selected Month==>", salarymonth);
  const date = new Date();
  const year = date.getFullYear(); //get year
  const month = date.getMonth(); //get month
  useEffect(() => {
    var temperr = [];
    var selectedYear = dayjs(selectYearsalary).format("YYYY");
    if (Number(selectedYear) === Number(year)) {
      Months.forEach((v, index) => {
        if (index <= month - 1) {
          temperr.push(v);
        }
        setnewMonth(temperr);
      });
    } else {
      setnewMonth(Months);
    }
  }, [selectYearsalary, month, year]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_salary_detail(
      doc.querySelector("string[name='text_salary_detail']")?.textContent ||
        "Salary Details"
    );
    setText_select_month(
      doc.querySelector("string[name='text_select_month']")?.textContent ||
        "Select Month"
    );
    setText_select_year(
      doc.querySelector("string[name='text_select_year']")?.textContent ||
        "Select Year"
    );
    setText_download(
      doc.querySelector("string[name='text_download']")?.textContent ||
        "Download"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_year(
      doc.querySelector("string[name='text_year']")?.textContent || "Year"
    );
    setMonthText(
      doc.querySelector("string[name='monthText']")?.textContent || "Month"
    );
    settext_salary(
      doc.querySelector("string[name='text_salary']")?.textContent || "Salary"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setTitle_deduction(
      doc.querySelector("string[name='title_deduction']")?.textContent ||
        "Deduction"
    );
    setTitle_allowance(
      doc.querySelector("string[name='title_allowance']")?.textContent ||
        "Allowance"
    );
    setText_loanpaid(
      doc.querySelector("string[name='text_loanpaid']")?.textContent ||
        "Loan Paid"
    );
    setText_down_salaryslip(
      doc.querySelector("string[name='text_down_salaryslip']")?.textContent ||
        "Download Salary Slip"
    );
    setText_payable_amount(
      doc.querySelector("string[name='text_payable_amount']")?.textContent ||
        "Payable Amount"
    );
    setText_payable_salary(
      doc.querySelector("string[name='text_payable_salary']")?.textContent ||
        "Payable Salary"
    );
    setText_tax(
      doc.querySelector("string[name='text_tax']")?.textContent || "Tax"
    );
    setText_grosssalary(
      doc.querySelector("string[name='text_grosssalary']")?.textContent ||
        "Gross Salary"
    );
    setText_present(
      doc.querySelector("string[name='text_present']")?.textContent || "Present"
    );
    setText_present_days(
      doc.querySelector("string[name='text_present_days']")?.textContent ||
        "Present Days"
    );
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent || "Amount"
    );
    setText_earning(
      doc.querySelector("string[name='text_earning']")?.textContent || "Earning"
    );
    setText_netsalary(
      doc.querySelector("string[name='text_netsalary']")?.textContent ||
        "Net Salary"
    );
    setText_grosssalary(
      doc.querySelector("string[name='text_grosssalary']")?.textContent ||
        "Gross Salary"
    );
    setText_totaldeduction(
      doc.querySelector("string[name='text_totaldeduction']")?.textContent ||
        "Total deduction"
    );
    setText_selectdate(
      doc.querySelector("string[name='text_selectdate']")?.textContent ||
        "Select Date"
    );
    setText_salary_type(
      doc.querySelector("string[name='text_salary_type']")?.textContent ||
        "Salary Type"
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent ||
        "Start Date"
    );
    setText_End_Date(
      doc.querySelector("string[name='text_End_Date']")?.textContent ||
        "End Date"
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
      <h3 className="mt-4 text-center HeadingText">{text_salary_detail}</h3>

      <div className={Popup || SalarySlipPopup ? "bgblur1 p-3" : "p-3"}>
        <div className="d-flex justify-content-between flex-wrap mb-2">
          <h4>{sessionStorage.getItem("employee_name")}</h4>
          <div className="d-flex align-items-center flex-wrap gap-3">
            {/* <select
              className="CountryInputbox1"
              onChange={(e) => setsalarymonth(e.target.value)}
              value={salarymonth}
            >
              <option value="Month" selected disabled>
                Month
              </option>

              {newMonth.length > 0 &&
                newMonth.map((MonthName) => {
                  return (
                    <>
                      <option value={MonthName}>{MonthName}</option>
                    </>
                  );
                })}
            </select> */}
            {/* <div>
              <div style={{ position: "sticky", zIndex: "9999" }}>
                <DatePicker
                  className="w-25"
                  selected={selectYearsalary}
                  onChange={(date) => setSelectYearsalary(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  maxDate={new Date()}
                  popperPlacement="bottom"
                />
              </div>
            </div> */}

            <button
              className="ReverseButton"
              onClick={(e) => setSalarySlipPopup(true)}
            >
              {text_down_salaryslip}
            </button>
          </div>
        </div>
        <Divider />
        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={SelectedEmpSalaryData}
                // pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          </>
        )}
      </div>
      {Popup ? (
        <>
          <div
            className="SalaryPopup salarypopupsty text-black sal-popup"
            id="salarydetailpopup"
          >
            <div className="text-end">
              <h3 className="close" id="closeMob">
                <CgCloseO
                  onClick={() => setPopup(false)}
                  className="sal-det-pop-close"
                />
              </h3>
              <h3 className="text-center text-black">
                {dayjs(SelectedData?.paytypestartdate).format("MMM")}
                {text_salary_detail}
              </h3>
              <Divider />
            </div>
            <div className="mt-2 scrollsalarydetail">
              <h5 className="text-center">
                {text_salary_type} : {SelectedData?.paytype}
              </h5>
              <h5 className="text-center mt-2 mb-3">
                {text_present_days} : {SelectedData?.emp_present}
              </h5>
              <table className="DashboardTable">
                <thead>
                  <tr>
                    <th align="center">{text_earning}</th>
                    <th align="right" style={{ width: "230px" }}>
                      {text_Amount}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SelectedData?.salaryinfo[0]?.mandetorylist?.map(
                    (MendetoryData, idx) => {
                      return (
                        <>
                          <tr key={idx}>
                            <td>{MendetoryData?.name}</td>
                            <td align="right">
                              {sessionStorage.getItem(
                                "session_current_emp_currency_val"
                              )}
                              {Number(MendetoryData?.valdata).toFixed(2)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                  {SelectedData?.salaryinfo[0]?.allowancelist?.map(
                    (Allowancedata, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{Allowancedata?.name}</td>
                            <td align="right">
                              {sessionStorage.getItem(
                                "session_current_emp_currency_val"
                              )}
                              {Number(Allowancedata?.valdata).toFixed(2)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                  <tr>
                    <td>
                      <b>{text_grosssalary}</b>
                    </td>
                    <td align="right">
                      <b>
                        {sessionStorage.getItem(
                          "session_current_emp_currency_val"
                        )}
                        {Number(
                          Number(SelectedData?.salaryinfo[0]?.allowancetotal) +
                            Number(SelectedData?.salaryinfo[0]?.mandetorytotal)
                        ).toFixed(2)}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="DashboardTable">
                <thead>
                  <tr>
                    <th align="center">{title_deduction}</th>
                    <th align="right" style={{ width: "230px" }}>
                      {text_Amount}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SelectedData?.salaryinfo[0]?.deductionlist?.map(
                    (DeductionData, idx) => {
                      return (
                        <>
                          <tr key={idx}>
                            <td>{DeductionData?.name}</td>
                            <td align="right">
                              {sessionStorage.getItem(
                                "session_current_emp_currency_val"
                              )}
                              {Number(DeductionData?.valdata).toFixed(2)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                  {SelectedData?.salaryinfo[0]?.taxlist?.map(
                    (Taxdata, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{Taxdata?.name}</td>
                            <td align="right">
                              {sessionStorage.getItem(
                                "session_current_emp_currency_val"
                              )}
                              {Number(Taxdata?.valdata).toFixed(2)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                  <tr>
                    <td>
                      <b>{text_totaldeduction}</b>
                    </td>
                    <td align="right">
                      <b>
                        {sessionStorage.getItem(
                          "session_current_emp_currency_val"
                        )}
                        {Number(
                          Number(SelectedData?.salaryinfo[0]?.deductiontotal) +
                            Number(SelectedData?.salaryinfo[0]?.taxtotal)
                        ).toFixed(2)}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <h5>{text_netsalary}</h5>
                      </b>
                    </td>
                    <td align="right">
                      <b>
                        <h5>
                          {sessionStorage.getItem(
                            "session_current_emp_currency_val"
                          )}
                          {Number(
                            SelectedData?.salaryinfo[0]?.salaryafterdeduction
                          ).toFixed(2)}
                        </h5>
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {SalarySlipPopup ? (
        <>
          <div className="SalaryPopup text-black sal-slip-popup">
            <div className="text-end">
              <h3 className="close">
                <CgCloseO onClick={() => setSalarySlipPopup(false)} />
              </h3>
              <h3 className="text-center text-black">{text_down_salaryslip}</h3>
              <Divider />
            </div>
            <div className="InvoiceBox justify-content-center">
              <div>
                <h5>{text_selectdate}</h5>
                <DatePicker
                  className="select_box"
                  selected={selectDate}
                  onChange={(date) => setSelectDate(date)}
                  popperPlacement="auto"
                />
              </div>
              <div>
                <h5>{text_salary_type}</h5>
                <input className="select_box" value={empSalaryType} disabled />
              </div>
              {/* <div>
                <h5 className="sal-det-popup-sel-year">{text_select_year}</h5>
                <DatePicker
                  className="select_box"
                  selected={selectYear}
                  onChange={(date) => setSelectYear(date)}
                  showYearPicker
                  popperPlacement="auto"
                  dateFormat="yyyy"
                />
              </div> */}
            </div>
            <div className="InvoiceBox sal-det-popup-btns">
              <button
                className="EditBtn"
                onClick={() => setSalarySlipPopup(false)}
              >
                {button_cancel}
              </button>
              <button className="CreateBtn" onClick={SalaryslipHandler}>
                {text_download}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default SalaryDetails;
