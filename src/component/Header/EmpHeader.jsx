import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import "./EmpHeader.css";

function EmpHeader() {
  //lang variable
  const [title_attendance, setTitle_attendance] = useState("Attendance");
  const [text_salary_detail, setText_salary_detail] =
    useState("Salary Details");
  const [textTimeSheet, setTextTimeSheet] = useState("Timesheet");
  const [approval_text, setApproval_text] = useState("Approval Request");
  const [text_appraisal, setText_appraisal] = useState("Appraisal");
  const [text_employee_documents, setText_employee_documents] =
    useState("Employee Document");
  const [text_loan, setText_loan] = useState("Loan");
  const [text_report, setText_report] = useState("Report");

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setTitle_attendance(
      doc.querySelector("string[name='title_attendance']")?.textContent ||
        "Attendance"
    );
    setText_salary_detail(
      doc.querySelector("string[name='text_salary_detail']")?.textContent ||
        "Salary Details"
    );
    setTextTimeSheet(
      doc.querySelector("string[name='textTimeSheet']")?.textContent ||
        "Timesheet"
    );
    setApproval_text(
      doc.querySelector("string[name='approval_text']")?.textContent ||
        "Approval Request"
    );
    setText_appraisal(
      doc.querySelector("string[name='text_appraisal']")?.textContent ||
        "Appraisal"
    );
    setText_employee_documents(
      doc.querySelector("string[name='text_employee_documents']")
        ?.textContent || "Employee Document"
    );
    setText_loan(
      doc.querySelector("string[name='text_loan']")?.textContent || "Loan"
    );
    setText_report(
      doc.querySelector("string[name='text_report']")?.textContent || "Report"
    );
  };
  return (
    <>
      <div className="mt-3 p-1 BtnBoxemp mb-3">
        <Link to={"/attendancesingle"}>
          <button className="ReverseButtonHeader">{title_attendance}</button>
        </Link>
        <Link to={"/salary/details"}>
          <button className="ReverseButtonHeader">{text_salary_detail}</button>
        </Link>
        <Link to={"/timesheet"}>
          <button className="ReverseButtonHeader">{textTimeSheet}</button>
        </Link>
        <Link to={"/approval-request"}>
          <button className="ReverseButtonHeader">{approval_text}</button>
        </Link>
        <Link to={"/appraisalpage"}>
          <button className="ReverseButtonHeader">{text_appraisal}</button>
        </Link>
        <Link to={"/employeedocument"}>
          <button className="ReverseButtonHeader">
            {text_employee_documents}
          </button>
        </Link>
        <Link to={"/loandashboard"}>
          <button className="ReverseButtonHeader">{text_loan}</button>
        </Link>
        <Link to={"/report"}>
          <button className="ReverseButtonHeader">{text_report}</button>
        </Link>
      </div>
      <Divider />
    </>
  );
}

export default EmpHeader;
