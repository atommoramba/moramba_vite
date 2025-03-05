import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppraisalList from "../AppraisalList/AppraisalList";
import HistoryPage from "./HistoryPage";
import { AppBar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getEmpData } from "../../redux/EmpDataSlice";
import Appraisal from "./Appraisal";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import EmpAppraisalHistory from "./EmpAppraisalHistory";

function AppraisalPage() {
  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);
  const role = sessionStorage.getItem(GlobalConstants.session_current_role);

  //Redux code from EmployeeDocSlice
  const dispatch = useDispatch();
  const EmployeeData = useSelector((state) => state.empData);

  //language variable
  const [text_appraisal, setText_appraisal] = useState("Appraisal");
  const [appraisalListHeading, setAppraisalListHeading] =
    useState("Appraisal List");
  const [Salaryhistory, setSalaryhistory] = useState("Salary History");
  const [appraisalHistory, setAppraisalHistory] = useState("Appraisal History");
  const [text_my_history, setText_my_history] = useState("My History");

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    if (dataValue !== null) {
      setSelectedTab(newValue);
    } else {
      setSelectedTab(dataValue);
    }
  };

  useEffect(() => {
    if (EmployeeData?.length === 0) {
      dispatch(getEmpData());
    }
  }, [EmployeeData?.length]);

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_appraisal(
      doc.querySelector("string[name='text_appraisal']")?.textContent
    );
    setAppraisalListHeading(
      doc.querySelector("string[name='appraisalListHeading']")?.textContent
    );
    setSalaryhistory(
      doc.querySelector("string[name='Salaryhistory']")?.textContent
    );
    setText_my_history(
      doc.querySelector("string[name='text_my_history']")?.textContent
    );
    setAppraisalHistory(
      doc.querySelector("string[name='appraisalHistory']")?.textContent
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
      <h3 className="mt-3 text-center HeadingText appraisal-heading">
        {text_appraisal}
      </h3>
      <div className="p-3">
        <div className="d-flex appraisalpagetab">
          <div className="w-100">
            <div className="MainProfileBox appraisalpagetab-imgbelowtitle">
              <div className="appraisalpage">
                <h2>
                  {EmployeeData[0]?.firstName + " " + EmployeeData[0]?.lastName}
                </h2>
                <ul className="text-start">
                  <li>{EmployeeData[0]?.designation}</li>
                  <li>
                    {EmployeeData[0]?.empCurrency}&nbsp;
                    {Number(EmployeeData[0]?.empSalaryAmount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-1 ">
              <AppBar
                position="static"
                className="tab_bar mt-2 "
                id="mobBoxtab"
              >
                <Tabs
                  value={selectedTab}
                  onChange={handleChange}
                  variant="scrollable"
                >
                  <Tab label={text_appraisal} className="Login_text" />
                  <Tab label={appraisalHistory} className="Login_text" />
                  <Tab label={text_my_history} className="Login_text" />
                  <Tab label={Salaryhistory} className="Login_text" />
                </Tabs>
              </AppBar>
              {selectedTab === 0 && <Appraisal />}
              {selectedTab === 1 && <AppraisalList />}
              {selectedTab === 2 && <EmpAppraisalHistory />}
              {role === "Admin" || role === "superadmin" ? (
                <>{selectedTab === 3 && <HistoryPage />}</>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AppraisalPage;
