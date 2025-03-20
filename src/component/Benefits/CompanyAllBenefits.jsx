import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar } from "@mui/material";
import PersonalInsurance from "./PersonalInsurance";
import BussinessInsurance from "./BussinessInsurance";
import FoodBenefits from "./FoodBenefits";
import Header from "../Header/Header";
import { CountryDropdown } from "react-country-region-selector";
import TravelBenefits from "./TravelBenefits";
import { useEffect } from "react";
import { getGlobalBenefits } from "../../redux/GlobalBenefitsSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GlobalConstants } from "../../utils/GlobalConstants";
import ITServices from "./ITServices";

function CompanyAllBenefits() {
  const dispatch = useDispatch();
  const CmpCountry = sessionStorage.getItem("cmp_country");

  // language variable
  const [text_personalins, setText_personalins] =
    useState("Personal Insurance");
  const [text_businessins, setText_businessins] =
    useState("Business Insurance");
  const [text_foodins, setText_foodins] = useState("Food Benefits");
  const [text_TravelBenefits, settext_TravelBenefits] =
    useState("Travel Benefits");
  const [text_Companybenefits, settext_Companybenefits] = useState(
    "Company All Benefits"
  );

  //variable
  const [selectedTab, setSelectedTab] = useState(0);
  const [CountryCode1, setCountryCode1] = useState(CmpCountry);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  useEffect(() => {
    if (CountryCode1 === "") {
      return;
    }
    dispatch(getGlobalBenefits(CountryCode1));
  }, [CountryCode1]);

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
        "Company All Benefits"
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
        <u>{text_Companybenefits}</u>
      </h2>
      <div className="d-flex justify-content-center mx-5 mt-4 ">
        <CountryDropdown
          whitelist={["IN", "TR", "AE", "NG"]}
          className="CountryInputbox1 vactionbox create-sal-breakdown-dropdowns"
          value={CountryCode1}
          onChange={(code) => [setCountryCode1(code)]}
        />
      </div>
      {CountryCode1 === "India" ||
      CountryCode1 === "Nigeria" ||
      CountryCode1 === "Turkey" ||
      CountryCode1 === "United Arab Emirates" ? (
        <>
          <AppBar position="static" className="tab_bar" id="mobBoxtab">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              variant="scrollable"
            >
              <Tab label={text_personalins} className="Login_text" />
              <Tab label={text_businessins} className="Login_text" />
              <Tab label={text_foodins} className="Login_text" />
              <Tab label={text_TravelBenefits} className="Login_text" />
              <Tab label="IT Services" className="Login_text" />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && <PersonalInsurance />}
          {selectedTab === 1 && <BussinessInsurance />}
          {selectedTab === 2 && <FoodBenefits />}
          {selectedTab === 3 && <TravelBenefits />}
          {selectedTab === 4 && <ITServices />}
        </>
      ) : (
        <>
          <h3 className="ErrorTextEmpdetails text-center mt-5">
            Please Select Country First!
          </h3>
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default CompanyAllBenefits;
