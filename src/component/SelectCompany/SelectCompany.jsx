import React, { useState, useEffect, useMemo } from "react";
import FilterComponent from "../../utils/FilterComponent";
import "../SelectCompany/SelectCompany.css";
import SearchIcon from "@mui/icons-material/Search";
import CompLogo from "../../assets/img/Comany-img.jpg";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { getCompany } from "../../redux/selectCompanySlice";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetDashboardEmpList } from "../../redux/DashboardSlice";
import { resetCompanyDocList } from "../../redux/CompanyDocSlice";
import { resetAppraisalList } from "../../redux/AppraisalTypeSlice";
import { resetEmpDocList } from "../../redux/EmployeeDocSlice";
import { resetDesignationList } from "../../redux/DesignationDoc";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { resetCompanyBankDetail } from "../../redux/CompanyBankDetailSlice";
import { resetInventoryTemplate } from "../../redux/InventoryTemplateSlice";
import { resetSubscriptionTemplate } from "../../redux/SubscriptionTemplate";
import { resetExpenseTemplate } from "../../redux/ExpenseTemplateSlice";
import { resetInvoiceTemplate } from "../../redux/InvoiceTemplateSlice";
import { resetBillTemplate } from "../../redux/BillTemplateSlice";
import { resetBillList } from "../../redux/BillListSlice";
import { resetDailyTimesheet } from "../../redux/DailyTimesheetSlice";
import { resetWeeklyTimesheet } from "../../redux/WeeklyTimesheetSlice";
import { resetPayroll } from "../../redux/PayrollTableDataSlice";
import { getSelectedCompany } from "../../redux/SelectedCompanySlice";
import { resetSalaryBreakupList } from "../../redux/SalaryBreakupListSlice";
import { resetCheckBalance } from "../../redux/CheckBalanceSlice";
import { resetCustomerList } from "../../redux/CustomerListSlice";
import { asRoughMs } from "@fullcalendar/core/internal";
import { resetVendorList } from "../../redux/VendorListSlice";
import { resetRequestsList } from "../../redux/RequestsListSlice";
import { resetOrgSalary } from "../../redux/orgSalaryDataSlice";
import { resetInvoiceList } from "../../redux/InvoiceListSlice";
import { ToastContainer } from "react-toastify";
import { resetGlobalBenefits } from "../../redux/GlobalBenefitsSlice";
import { resetOrgSelectedBenefits } from "../../redux/OrgSelectedBenefits";

function SelectCompany() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = useLocation();
  const NewData = data?.state;
  console.log(NewData);
  const Companies = useSelector((state) => state.selectCompany); //SELECT CMP API DATA
  //New Variables
  const [HeyText, setHeyText] = useState("Hey");
  const [WelcomeBackText, setWelcomeBack] = useState("Welcome Back");
  const [SelectCmpLine, setSelectCmpLine] = useState(
    "Please Select The Company And Start Your Day!"
  );
  const [CreateCmpLine, setCreateCmpLine] = useState(
    "Please Create Company And Start Your Day!"
  );
  const [SearchPHTextSelectCmp, setSearchPHTextSelectCmp] = useState(
    "Search Company Here..."
  );
  //Old Variables
  const [text_create, setText_create] = useState("Create");
  const [textDashboard, setTextDashboard] = useState("Dashboard");
  //new
  const [text_invitedby, setText_invitedby] = useState("Invited By");
  const [text_acceptrequest, setText_acceptrequest] =
    useState("Accept Request");
  //Language Variables Ends

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  //SELECT COMPANY API CALL
  useEffect(() => {
    if (Companies.length === 0) {
      dispatch(getCompany());
      if (
        sessionStorage.getItem("token") === undefined ||
        sessionStorage.getItem("token") === null ||
        sessionStorage.getItem("token") === ""
      ) {
        sessionStorage.setItem("username", NewData?.usernameInCookie);
        sessionStorage.setItem("user_id", NewData?.user_idInCookie);
        sessionStorage.setItem("AdminFName", NewData?.AdminFNameInCookie);
        sessionStorage.setItem("AdminLName", NewData?.AdminLNameInCookie);
        sessionStorage.setItem("token", NewData?.tokenInCookie);
      }
    } else {
      if (
        sessionStorage.getItem("token") === undefined ||
        sessionStorage.getItem("token") === null ||
        sessionStorage.getItem("token") === ""
      ) {
        // sessionStorage.setItem("username", NewData?.usernameInCookie);
        // sessionStorage.setItem("user_id", NewData?.user_idInCookie);
        // sessionStorage.setItem("AdminFName", NewData?.AdminFNameInCookie);
        // sessionStorage.setItem("AdminLName", NewData?.AdminLNameInCookie);
        // sessionStorage.setItem("token", NewData?.tokenInCookie);
        navigate("/");
        sessionStorage.clear();
        localStorage.clear();
      }

      console.log("SELECT COMPANY API NOT CALLED");
    }
  }, []);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  const selectCompany = (comp_id, comp_name, role, cmpList, emp_id) => {
    sessionStorage.setItem("empcount", "0");
    sessionStorage.setItem("_compId", comp_id);
    sessionStorage.setItem("comp_name", comp_name);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem(GlobalConstants.session_current_emp_id, emp_id);
    sessionStorage.setItem(GlobalConstants.session_currentlogin_emp_id, emp_id);
    sessionStorage.setItem(
      "plancode",
      cmpList?.plancode === undefined ? "GL" : cmpList?.plancode
    );
    navigate("/dashboard");
    dispatch(getSelectedCompany());
    dispatch(resetOrgSalary());
    dispatch(resetDashboardEmpList());
    dispatch(resetCompanyDocList());
    dispatch(resetEmpDocList());
    dispatch(resetAppraisalList());
    dispatch(resetSalaryBreakupList());
    dispatch(resetDesignationList());
    dispatch(resetRequestsList());
    dispatch(resetInvoiceList());
    dispatch(resetGlobalBenefits());
    dispatch(resetOrgSelectedBenefits());
    dispatch(resetCompanyBankDetail());
    dispatch(resetBillTemplate());
    dispatch(resetBillList());
    dispatch(resetWeeklyTimesheet());
    dispatch(resetDailyTimesheet());
    dispatch(resetExpenseTemplate());
    dispatch(resetInventoryTemplate());
    dispatch(resetInvoiceTemplate());
    dispatch(resetSubscriptionTemplate());
    dispatch(resetPayroll());
    dispatch(resetCheckBalance());
    dispatch(resetCustomerList());
    dispatch(resetVendorList());
  };
  const filteredItems = Companies?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        PlaceHolder={SearchPHTextSelectCmp}
      />
    );
  }, [filterText, resetPaginationToggle, SearchPHTextSelectCmp]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent || "Create"
    );
    setTextDashboard(
      doc.querySelector("string[name='textDashboard']")?.textContent ||
        "Dashboard"
    );
    setHeyText(
      doc.querySelector("string[name='HeyText']")?.textContent || "Hey"
    );
    setWelcomeBack(
      doc.querySelector("string[name='WelcomeBackText']")?.textContent ||
        "Welcome Back"
    );
    setSelectCmpLine(
      doc.querySelector("string[name='SelectCmpLine']")?.textContent ||
        "Please Select The Company And Start Your Day!"
    );
    setSearchPHTextSelectCmp(
      doc.querySelector("string[name='SearchPHTextSelectCmp']")?.textContent ||
        "Search Company Here..."
    );
    setText_invitedby(
      doc.querySelector("string[name='text_invitedby']")?.textContent ||
        "Invited By"
    );
    setText_acceptrequest(
      doc.querySelector("string[name='text_acceptrequest']")?.textContent ||
        "Accept Request"
    );
    setCreateCmpLine(
      doc.querySelector("string[name='CreateCmpLine']")?.textContent ||
        "Please Create Company And Start Your Day!"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const AcceptRequest = (_id, reqStatus) => {
    console.log(_id + "-----" + reqStatus);
    const dataToBeSent = {
      _id: _id,
      reqStatus: reqStatus,
    };
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/userrelation/acceptrequest";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .post(apiUrl, dataToBeSent, headerConfig)
      .then(function (response) {
        var res = response.data;
        if (res.success) {
          dispatch(getCompany());
        }
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          Cookie.remove("username");
          Cookie.remove("user_id");
          Cookie.remove("AdminFName");
          Cookie.remove("AdminLName");
          Cookie.remove("token");
          window.location.replace("/");
        }
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  return (
    <>
      <Header />
      <div className="MainTxt mt-5 mb-4 text-center p-2">
        <motion.h4
          initial={{
            x: -200,
            opacity: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="fw-bold"
        >
          {HeyText}👋! {WelcomeBackText}.
        </motion.h4>
        <motion.p
          initial={{
            x: 200,
            opacity: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          className="mt-3 fs-5"
        >
          {filteredItems.length === 0 ? CreateCmpLine : SelectCmpLine}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="d-flex flex-row justify-content-center mt-5"
        >
          <div
            className="d-flex flex-row align-items-center Searchbar me-3"
            id="mobilesearch"
          >
            <SearchIcon />
            {subHeaderComponent}
          </div>
          <Link to={"/registercompany"}>
            <button className="CreateBtn">+ {text_create}</button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.7 }}
        className="container mt-5"
      >
        <div className="mainBox">
          <div
            className="example"
            style={{
              paddingTop: "50px",
              overflowX: "scroll",
              overflow: "hidden",
            }}
          >
            <div className="scroll_comp ">
              {filteredItems?.map((cmpList, index) => {
                return (
                  <div className="CompanyBox text-center me-4" key={index}>
                    <img
                      src={CompLogo}
                      alt="Company_Image"
                      className="CompanyLogo mt-2"
                    />
                    <h5 className="mt-3">
                      {truncate(cmpList?.displayName, 20)}
                    </h5>
                    {cmpList?.userActiveForCompany === false ? (
                      <>
                        <div className="row text-center mt-2">
                          <div className="col-md-12">
                            ({text_invitedby}:<b> {cmpList?.invitedBy}</b>)
                            <br />
                            <button
                              className="ViewBtn mt-2 p-1"
                              onClick={(e) => AcceptRequest(cmpList?._id, true)}
                            >
                              {text_acceptrequest}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to={"/dashboard"}>
                          <button
                            className="CreateBtn mt-2 mb-2"
                            style={{ height: "30px", padding: "3px" }}
                            onClick={(event) =>
                              selectCompany(
                                cmpList?._compId,
                                cmpList?.displayName,
                                cmpList?.role,
                                cmpList,
                                cmpList?._empId
                              )
                            }
                          >
                            {textDashboard}
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                );
              })}
              {/* </ScrollMenu> */}
            </div>
            <p className="text-center swipecss ">
              Swipe to See More
              <HiOutlineChevronDoubleRight />
            </p>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </>
  );
}

export default SelectCompany;
