import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar } from "@mui/material";
import PersonalInsurance from "./PersonalInsurance";
import BussinessInsurance from "./BussinessInsurance";
import FoodBenefits from "./FoodBenefits";
import Header from "../Header/Header";
import TravelBenefits from "./TravelBenefits";
import { useDispatch, useSelector } from "react-redux";
import { getOrgSelectedBenefits } from "../../redux/OrgSelectedBenefits";
import MyCustomeBenefits from "./MyCustomeBenefits";
import { ToastContainer } from "react-toastify";
import { GlobalConstants } from "../../utils/GlobalConstants";

function CmpSelectedBenefits() {
  const dispatch = useDispatch();
  const OrgBeneiftsList = useSelector((state) => state.OrgSelectedBenefits);

  // language variable
  const [text_personalins, setText_personalins] =
    useState("Personal Insurance");
  const [text_businessins, setText_businessins] =
    useState("Business Insurance");
  const [text_foodins, setText_foodins] = useState("Food Benefits");
  const [text_TravelBenefits, settext_TravelBenefits] =
    useState("Travel Benefits");
  const [text_Custombenefits, settext_Custombenefits] =
    useState("My Custom Benefits");
  const [text_Combenefits, settext_Combenefits] = useState(
    "Company Selected Benefits"
  );

  //variable
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (OrgBeneiftsList?.length === 0) {
      dispatch(getOrgSelectedBenefits());
    }
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
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
    settext_Combenefits(
      doc.querySelector("string[name='text_Combenefits']")?.textContent ||
        "Company Selected Benefits"
    );
    settext_Custombenefits(
      doc.querySelector("string[name='text_Custombenefits']")?.textContent ||
        "My Custom Benefits"
    );
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
      <Header />
      <h2 className="text-center mt-5">
        <u>{text_Combenefits}</u>
      </h2>
      <AppBar position="static" className="tab_bar" id="mobBoxtab">
        <Tabs value={selectedTab} onChange={handleChange} variant="scrollable">
          <Tab label={text_personalins} className="Login_text" />
          <Tab label={text_businessins} className="Login_text" />
          <Tab label={text_foodins} className="Login_text" />
          <Tab label={text_TravelBenefits} className="Login_text" />
          <Tab label={text_Custombenefits} className="Login_text" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <PersonalInsurance />}
      {selectedTab === 1 && <BussinessInsurance />}
      {selectedTab === 2 && <FoodBenefits />}
      {selectedTab === 3 && <TravelBenefits />}
      {selectedTab === 4 && <MyCustomeBenefits />}
      <ToastContainer />
    </>
  );
}

export default CmpSelectedBenefits;
