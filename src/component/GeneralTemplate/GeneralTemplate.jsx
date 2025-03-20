import { AppBar } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ExpenseTemplateList from "../ExpenseTemplate/ExpenseTemplateList";
import Header from "../Header/Header";
import InventoryTemplateList from "../InventoryTemplate/InventoryTemplateList";
import { useLocation } from "react-router-dom";
import SubscriptionTemplateList from "../SubscriptionTemplate/SubscriptionTemplateList";
import BillTemplateList from "../BillTemplate/BillTemplateList";
import InvoiceTemplateList from "../InvoiceTemplate/InvoiceTemplateList";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useNavigate } from "react-router-dom";

function GeneralTemplate() {
  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);
  //Language Variables Start
  //Old Variables
  const [text_bill_template, setText_bill_template] = useState("Bill Template");
  const [text_invoice_template, setText_invoice_template] =
    useState("Invoice Template");
  //New Variables
  const [title_ExpTemp, setTitle_ExpTemp] = useState("Expense Template");
  const [title_InvenTemp, setTitle_InvenTemp] = useState("Inventory Template");
  const [title_SubTemp, setTitle_SubTemp] = useState("Subscription Template");
  //Language Variables Ends
  const navigate = useNavigate();
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

    setText_invoice_template(
      doc.querySelector("string[name='text_invoice_template']")?.textContent ||
        "Invoice Template"
    );
    setText_bill_template(
      doc.querySelector("string[name='text_bill_template']")?.textContent ||
        "Bill Template"
    );
    setTitle_ExpTemp(
      doc.querySelector("string[name='title_ExpTemp']")?.textContent ||
        "Expense Template"
    );
    setTitle_InvenTemp(
      doc.querySelector("string[name='title_InvenTemp']")?.textContent ||
        "Inventory Template"
    );
    setTitle_SubTemp(
      doc.querySelector("string[name='title_SubTemp']")?.textContent ||
        "Subscription Template"
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
        <AppBar
          position="static"
          className="tab_bar mt-5 appscroll"
          id="mobBoxtab"
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
          >
            <Tab label={title_ExpTemp} className="Login_text" />
            <Tab label={title_InvenTemp} className="Login_text" />
            <Tab label={title_SubTemp} className="Login_text" />
            <Tab label={text_bill_template} className="Login_text" />
            <Tab label={text_invoice_template} className="Login_text" />
          </Tabs>
        </AppBar>

        {selectedTab === 0 && <ExpenseTemplateList />}
        {selectedTab === 1 && <InventoryTemplateList />}
        {selectedTab === 2 && <SubscriptionTemplateList />}
        {selectedTab === 3 && <BillTemplateList />}
        {selectedTab === 4 && <InvoiceTemplateList />}
      </div>
    </>
  );
}
export default GeneralTemplate;
