import { AppBar, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import "./AdminPanel.css";
import { useLocation } from "react-router-dom";

import AdminPanelAll from "./AdminPanelAll";
import AdminPanelMonthly from "./AdminPanelMonthly";
import AdminPanelWeekly from "./AdminPanelWeekly";
import AdminPanelYearly from "./AdminPanelYearly";

const AdminDashboard = () => {
  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);

  const handleChange = (event, newValue) => {
    if (dataValue !== null) {
      setSelectedTab(newValue);
    } else {
      setSelectedTab(dataValue);
    }
  };
  return (
    <div className="admindashboardmain">
      <h3 className="welcome_text adminlogint admindashboarduser">USERS</h3>

      <AppBar position="static" className="tab_bar mt-2" id="mobBoxtab">
        <Tabs value={selectedTab} onChange={handleChange} variant="scrollable">
          <Tab label="All" className="Login_text" />
          <Tab label="Weekly" className="Login_text" />
          <Tab label="Monthly" className="Login_text" />
          <Tab label="Yearly" className="Login_text" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <AdminPanelAll />}
      {selectedTab === 1 && <AdminPanelWeekly />}
      {selectedTab === 2 && <AdminPanelMonthly />}
      {selectedTab === 3 && <AdminPanelYearly />}
    </div>
  );
};

export default AdminDashboard;
