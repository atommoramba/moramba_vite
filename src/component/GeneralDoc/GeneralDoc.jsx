import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab, tabClasses } from "@mui/base/Tab";
import CompanyDoc from "./CompanyDoc";
import EmployeeDoc from "./EmployeeDoc";
import DesignationDoc from "./DesignationDoc";
import "../GeneralDoc/GeneralDoc.css";
import Header from "../Header/Header";
import Appraisaltype from "./Appraisaltype";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useNavigate } from "react-router-dom";

const StyledTab = styled(Tab)`
  color: black;
  cursor: pointer;
  font-size: 20px;
  background-color: transparent;
  width: 90%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #bdbdbd;
  }

  &:focus {
    color: black;
    outline: 3px solid #393e46;
  }

  &.${tabClasses.selected} {
    background-color: #6d9886;
    color: #fff;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
   width: 90%;
   margin-left:75px;
   padding: 20px 12px;
   border: 1px solid ${theme.palette.mode === "dark" ? "black" : "black"};
 border: none;
   `
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 250px;
       width: 90%;
       margin-left:75px;
       color: black;
       border: 3px solid #6D9886;
       border-radius: 12px;
       margin-bottom: 16px;
       display: flex;
       align-items: center;
       justify-content: center;
       align-content: space-between;
  `
);
export default function GeneralDoc() {
  const navigate = useNavigate();
  //Language Variables Start
  const [text_company_doc, setText_company_doc] = useState("Company Document");
  const [text_employee_doc, setText_employee_doc] =
    useState("Employee Document");
  const [text_appraisal_v3, setText_appraisal_v3] =
    useState("Appraisal Category");
  const [text_Designationtype_v3, setText_Designationtype_v3] =
    useState("Designation Type");
  //Language Variables Ends
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_company_doc(
      doc.querySelector("string[name='text_company_doc']")?.textContent
    );
    setText_employee_doc(
      doc.querySelector("string[name='text_employee_doc']")?.textContent
    );
    setText_appraisal_v3(
      doc.querySelector("string[name='text_appraisal_v3']")?.textContent
    );
    setText_Designationtype_v3(
      doc.querySelector("string[name='text_Designationtype_v3']")?.textContent
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
      <Tabs defaultValue={0} className="mt-3">
        <StyledTabsList id="tab_mobile" className="tablist_document">
          <StyledTab value={0} id="active_tab">
            {text_company_doc}
          </StyledTab>
          <StyledTab value={1} id="active_tab">
            {text_employee_doc}
          </StyledTab>
          <StyledTab value={2} id="active_tab">
            {text_Designationtype_v3}
          </StyledTab>
          <StyledTab value={3} id="active_tab">
            {text_appraisal_v3}
          </StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={0} id="tabpanel_mob">
          <CompanyDoc />
        </StyledTabPanel>
        <StyledTabPanel value={1} id="tabpanel_mob">
          <EmployeeDoc />
        </StyledTabPanel>
        <StyledTabPanel value={2} id="tabpanel_mob">
          <DesignationDoc />
        </StyledTabPanel>
        <StyledTabPanel value={3} id="tabpanel_mob">
          <Appraisaltype />
        </StyledTabPanel>
      </Tabs>
    </>
  );
}
