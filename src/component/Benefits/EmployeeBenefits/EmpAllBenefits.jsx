import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar } from "@mui/material";
import EmpPersonalInsurance from "./EmpPersonalInsurance";
import EmpBussinessInsurance from "./EmpBussinessInsurance";
import EmpFoodBenefits from "./EmpFoodBenefits";
import EmpTravelBenefits from "./EmpTravelBenefits";
import Header from "../../Header/Header";
import { getOrgSelectedBenefits } from "../../../redux/OrgSelectedBenefits";
import { useDispatch } from "react-redux";
import EmpCustomeBenefits from "./EmpCustomeBenefits";
import { GlobalConstants } from "../../../utils/GlobalConstants";

function EmpAllBenefits() {
  const dispatch = useDispatch();

  // language variable
  const [text_personalins, setText_personalins] =
    useState("Personal Insurance");
  const [text_businessins, setText_businessins] =
    useState("Business Insurance");
  const [text_foodins, setText_foodins] = useState("Food Benefits");
  const [text_TravelBenefits, settext_TravelBenefits] =
    useState("Travel Benefits");
  const [text_Companybenefits, settext_Companybenefits] =
    useState("Company Benefits");
  const [text_Employeeallbenefits, settext_Employeeallbenefits] = useState(
    "Employee All Benefits"
  );

  //variable
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    dispatch(getOrgSelectedBenefits());
  }, []);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_personalins(
      doc.querySelector("string[name='text_personalins']")?.textContent ||
        "Personal Insurance"
    );
    setText_businessins(
      doc.querySelector("string[name='text_businessins']")?.textContent ||
        "Business Insurance"
    );
    setText_foodins(
      doc.querySelector("string[name='text_foodins']")?.textContent ||
        "Food Benefits"
    );
    settext_TravelBenefits(
      doc.querySelector("string[name='text_TravelBenefits']")?.textContent ||
        "Travel Benefits"
    );
    settext_Companybenefits(
      doc.querySelector("string[name='text_Companybenefits']")?.textContent ||
        "Company Benefits"
    );
    settext_Employeeallbenefits(
      doc.querySelector("string[name='text_Employeeallbenefits']")
        ?.textContent || "Employee All Benefits"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <>
      <Header />
      <h2 className="text-center mt-5">
        <u>{text_Employeeallbenefits}</u>
      </h2>
      <AppBar position="static" className="tab_bar" id="mobBoxtab">
        <Tabs value={selectedTab} onChange={handleChange} variant="scrollable">
          <Tab label={text_personalins} className="Login_text" />
          <Tab label={text_businessins} className="Login_text" />
          <Tab label={text_foodins} className="Login_text" />
          <Tab label={text_TravelBenefits} className="Login_text" />
          <Tab label={text_Companybenefits} className="Login_text" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <EmpPersonalInsurance />}
      {selectedTab === 1 && <EmpBussinessInsurance />}
      {selectedTab === 2 && <EmpFoodBenefits />}
      {selectedTab === 3 && <EmpTravelBenefits />}
      {selectedTab === 4 && <EmpCustomeBenefits />}
    </>
  );
}

export default EmpAllBenefits;
