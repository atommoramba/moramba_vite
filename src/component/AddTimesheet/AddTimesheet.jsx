import React, { useState, useEffect } from "react";
import "../AddTimesheet/AddTimesheet.css";
import AddDailyTimesheet from "./AddDailyTimesheet";
import AddWeeklyTimesheet from "./AddWeeklyTimesheet";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";


function AddTimesheet() {
  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);
  const navigate = useNavigate();

  //languge Variable
  //old language
  const [text_radio_daily, setText_radio_daily] = useState("Daily");
  const [text_radio_weekly, setText_radio_weekly] = useState("Weekly");
  //new language
  const [text_add_timesheet, setText_add_timesheet] =
    useState("Add Time Sheet");

  const handleChange = (event, newValue) => {
    if (dataValue !== null) {
      setSelectedTab(newValue);
    } else {
      setSelectedTab(dataValue);
    }
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
     const parser = new DOMParser();
     const doc = parser.parseFromString(xml, "text/xml");

    setText_radio_daily(
      doc.querySelector("string[name='text_radio_daily']")
        ?.textContent
    );
    setText_radio_weekly(
      doc.querySelector("string[name='text_radio_weekly']")
        ?.textContent
    );
    setText_add_timesheet(
      doc.querySelector("string[name='text_add_timesheet']")
        ?.textContent
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
  },[]);

  return (
    <>
      <Header />
      <div className="p-4">
        <h3 className="HeadingText mb-2 text-center p-2">
          {text_add_timesheet}
        </h3>
        <div className="row">
          <div className="col-md-1 col-lg-3"></div>
          <div className="col-md-10 col-lg-6 addtimesheetcontent">
            {/* <div className="p-4"> */}
            <AppBar position="static" className="tab_bar mt-3 " id="mobBoxtab">
              <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label={text_radio_daily} className="Login_text" />
                <Tab label={text_radio_weekly} className="Login_text" />
              </Tabs>
            </AppBar>

            {selectedTab === 0 && <AddDailyTimesheet />}
            {selectedTab === 1 && <AddWeeklyTimesheet />}
          </div>
          <div className="col-md-1 col-lg-3"></div>
        </div>
      </div>
    </>
  );
}

export default AddTimesheet;
