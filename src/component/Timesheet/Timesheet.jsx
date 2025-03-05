import { AppBar, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import Header from "../Header/Header";
import "../Timesheet/Timesheet.css";
import DailyTimesheet from "./DailyTimesheet";
import WeeklyTimesheet from "./WeeklyTimesheet";

function Timesheet() {
  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);
  //language variable
  const [text_sheet, setText_sheet] = useState("Time Sheet");
  const [text_radio_daily, setText_radio_daily] = useState("Daily");
  const [text_radio_weekly, setText_radio_weekly] = useState("Weekly");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_sheet(doc.querySelector("string[name='text_sheet']")?.textContent);
    setText_radio_daily(
      doc.querySelector("string[name='text_radio_daily']")?.textContent
    );
    setText_radio_weekly(
      doc.querySelector("string[name='text_radio_weekly']")?.textContent
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
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">{text_sheet}</h3>
      <div className="containerBox_timesheet container">
        <AppBar position="static" className="tab_bar mt-5 tabBG" id="mobBoxtab">
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label={text_radio_daily} className="Login_text" />
            <Tab label={text_radio_weekly} className="Login_text" />
          </Tabs>
        </AppBar>

        {selectedTab === 0 && <DailyTimesheet />}
        {selectedTab === 1 && <WeeklyTimesheet />}
      </div>
    </>
  );
}

export default Timesheet;
