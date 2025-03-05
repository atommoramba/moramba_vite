import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { AppBar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";
import ExpenseList from "../Expense/ExpenseList";
import InventoryList from "../Inventory/InventoryList";
import SubscribtionList from "../Subscribtion/SubscribtionList";
import { GlobalConstants } from "../../utils/GlobalConstants";

function Report() {
  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);
  const navigate = useNavigate();

  //language variable
  //old language
  const [text_inventoryData, setText_inventoryData] =
    useState("Inventory Data");
  const [text_subscriptionData, setText_subscriptionData] =
    useState("Subscription Data");
  const [text_expenser, setText_expenser] = useState("Expense Report");

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

    setText_expenser(
      doc.querySelector("string[name='text_expenser']")?.textContent
    );
    setText_inventoryData(
      doc.querySelector("string[name='text_inventoryData']")?.textContent
    );
    setText_subscriptionData(
      doc.querySelector("string[name='text_subscriptionData']")?.textContent
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
      <div className="container login_background">
        <AppBar position="static" className="tab_bar mt-5" id="mobBoxtab">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            <Tab label={text_expenser} className="Login_text" />
            <Tab label={text_inventoryData} className="Login_text" />
            <Tab label={text_subscriptionData} className="Login_text" />
          </Tabs>
        </AppBar>

        {selectedTab === 0 && <ExpenseList />}
        {selectedTab === 1 && <InventoryList />}
        {selectedTab === 2 && <SubscribtionList />}
      </div>
    </>
  );
}

export default Report;
