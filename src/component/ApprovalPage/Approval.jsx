import { AppBar, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { GlobalConstants } from "../../utils/GlobalConstants";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import ApprovedPage from "./ApprovedPage";
import PendingPage from "./PendingPage";
import RejectedPage from "./RejectedPage";

function Approval() {
  // new language variable
  const [requests_approve, setRequests_approve] = useState(
    "Requests & Approvals"
  );
  const [new_request, setNew_request] = useState("New Request");
  const [approvedtext, setApprovedtext] = useState("Approved");
  const [rejecttext, setRejecttext] = useState("Rejected");
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setRequests_approve(
      doc.querySelector("string[name='requests_approve']")?.textContent ||
        "Requests & Approvals"
    );
    setNew_request(
      doc.querySelector("string[name='new_request']")?.textContent ||
        "New Request"
    );
    setApprovedtext(
      doc.querySelector("string[name='approvedtext']")?.textContent ||
        "Approved"
    );
    setRejecttext(
      doc.querySelector("string[name='rejecttext']")?.textContent || "Rejected"
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
      <h3 className="mt-4 text-center HeadingText">{requests_approve}</h3>
      <div className="px-4">
        <AppBar position="static" className="tab_bar mt-3" id="mobBoxtab">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
          >
            <Tab label={new_request} className="Login_text" />
            <Tab label={approvedtext} className="Login_text" />
            <Tab label={rejecttext} className="Login_text" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && <PendingPage />}
        {selectedTab === 1 && <ApprovedPage />}
        {selectedTab === 2 && <RejectedPage />}
      </div>
    </>
  );
}

export default Approval;
