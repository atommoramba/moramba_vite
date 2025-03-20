import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HeaderLogo from "../../assets/img/MorambaLogo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { HiTemplate } from "react-icons/hi";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { errorToast, successToast } from "../../utils/Helper";
import dayjs from "dayjs";

import { useEffect } from "react";
import { EMAIL_REGEX } from "../../utils/Validation";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { AiFillMessage } from "react-icons/ai";
import {
  FcViewDetails,
  FcPlanner,
  FcMoneyTransfer,
  FcAbout,
  FcFinePrint,
  FcDebt,
  FcDataSheet,
  FcTemplate,
  FcDocument,
  FcPaid,
  FcConferenceCall,
} from "react-icons/fc";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import setTheme from "../../utils/setTheme";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogout } from "../../redux/selectCompanySlice";
import { resetDashboardEmpList } from "../../redux/DashboardSlice";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import { Message } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { FaRegThumbsUp } from "react-icons/fa";
import { getRequestsList } from "../../redux/RequestsListSlice";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function Header({ url }) {
  // Logic for Clearing the Session on Token Exprier
  // useEffect(() => {
  //   const today = new Date();
  //   const currentDay = today.getDate();
  //   const storedDay = sessionStorage.getItem("lastVisitedDay");
  //   if (storedDay !== currentDay.toString()) {
  //     sessionStorage.clear();
  //     localStorage.clear();
  //   }
  //   sessionStorage.setItem("lastVisitedDay", currentDay.toString());
  // }, []);
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     // console.log("no token")
  //     navigate("/");
  //   }
  // }, []);

  const navigate = useNavigate();
  const empStatus = sessionStorage.getItem("EmpStatus");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [Empmenu, setEmpmenu] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const role = sessionStorage.getItem("role");
  const [headerback, setHeaderBack] = useState("Back");
  const [text_language, settext_language] = useState("Language");
  const [headerLogOut, setheaderLogOut] = useState("Logout");
  const [text_document, setText_document] = useState("Documents");
  const [title_loan, settitle_loan] = useState("Loan");
  const [text_report, setText_report] = useState("Report");
  const [text_salary_detail, setText_salary_detail] =
    useState("Salary Details");
  const [text_appraisal, setText_appraisal] = useState("Appraisal");
  const [text_custom_doc, setText_custom_doc] = useState("Custom Document");
  const [text_create_temp, setText_create_temp] = useState("Manage Template");
  const [textHome, setTextHome] = useState("Home");
  const [textDashboard, setTextDashboard] = useState("Dashboard");
  const [textTimeSheet, setTextTimeSheet] = useState("Timesheet");
  const [text_empfeatures, setText_empfeatures] = useState("Employee Features");
  const [text_attend_single, setText_attend_single] =
    useState("Attendance Single");
  const [approval_text, setApproval_text] = useState("Approval Request");
  //new language variable
  const [text_vendor, setText_vendor] = useState("Vendor");
  const [text_customer, setText_customer] = useState("Customer");
  const [salarybreakup_header, setSalarybreakup_header] = useState(
    "Salary Breakup Template"
  );
  const [text_company_documents, setText_company_documents] = useState(
    "Upload Company Documents"
  );
  const [cpmapny_featuretext, setCpmapny_featuretext] =
    useState("Company Features");
  const [text_selecttheme, setText_selecttheme] = useState("Select Theme");
  const [text_light, setText_light] = useState("Light");
  const [text_dark, setText_dark] = useState("Dark");
  const [text_f_name, setText_f_name] = useState("First Name");
  const [text_L_name, setText_L_name] = useState("Last Name");
  const [text_hint_email, setText_hint_email] = useState("Email");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_edit_admin, setText_edit_admin] = useState("Admin Profile");
  //new
  const [text_Avilablebenefits, setText_Avilablebenefits] =
    useState("Available Benefits");
  const [text_testmodule, setText_testmodule] = useState("Test Module");
  const [my_benifit, setMy_benifit] = useState("My Benefits");
  const [my_emp_benifits, setMy_emp_benifits] = useState(
    "Employee Selected Benefits"
  );
  const [my_emp_avilble_benifits, setMy_emp_avilble_benifits] = useState(
    "Employee Available Benefits"
  );
  const [cmp_availale_benefits, setCmp_available_benefits] = useState(
    "Company Available Benefits"
  );
  const [cmp_selected_benefits, setCmp_selected_benefits] = useState(
    "Company Selected Benefits"
  );
  const [Tds_salary, setTds_salary] = useState("TDS on Salary");
  const [text_holiday, settext_holiday] = useState("Holidays");
  const [text_eng, setText_eng] = useState("English");
  const [text_hin, setText_hin] = useState("Hindi");
  const [text_ar, setText_ar] = useState("Arabic");
  const [text_por, setText_por] = useState("Portuguese");
  const [text_spa, setText_spa] = useState("Spanish");
  const [text_tur, setText_tur] = useState("Turkish");
  const [text_ger, setText_ger] = useState("German");
  const [text_fr, setText_fr] = useState("French");
  const [text_guj, setText_guj] = useState("Gujarati");
  const [text_ru, setText_ru] = useState("Russian");
  const [text_ukr, setText_ukr] = useState("Ukrainian");
  const [text_mar, setText_mar] = useState("Marathi");
  const [text_kor, setText_kor] = useState("Korean");
  const [text_rom, setText_rom] = useState("Romanian");
  const [text_inbox, setText_inbox] = useState("Inbox");
  //
  const [EditPopup, setEditPopup] = useState(false);
  const [Fnbtn, setFnbtn] = useState(false);
  const [Lnbtn, setLnbtn] = useState(false);
  const [supportPopup, setSupportPopup] = useState(false);
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [emailerr, setEmailErr] = useState("");
  const [helpyouerr, setHelpyouErr] = useState("");
  const [supportsuccessmsg, setSupportsuccessmsg] = useState("");
  const [openSupport, setOpenSupport] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClosesupportpopup = () => {
    setOpenSupport(false);
    setSupportPopup(false);
    // navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    // navigate("/");
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const dispatch = useDispatch();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const LogoutClick = () => {
    Cookie.remove("username");
    Cookie.remove("user_id");
    Cookie.remove("AdminFName");
    Cookie.remove("AdminLName");
    Cookie.remove("token");
    navigate("/");
    dispatch(getUserLogout());
    dispatch(resetDashboardEmpList());
  };

  const redirect = (pathname) => {
    navigate("/" + pathname);
  };
  const MobRedirect = (path) => {
    navigate("/" + path);
    handleCloseNavMenu();
  };
  const [MenuList, setMenuList] = useState([]);
  const ReqList = useSelector((state) => state.RequestsList);
  const messageCount = ReqList.filter((e) => e.approval_status === "pending");

  useEffect(() => {
    if (window.location.pathname === "/employeedetail") {
      dispatch(getRequestsList());
    }
  }, [window.location.pathname === "/employeedetail", MenuList]);
  useEffect(() => {
    if (!Empmenu) {
      const Dashboardpages = [
        {
          link: "dashboard",
          text: <>{textDashboard}</>,
          logo: <FcViewDetails />,
        },
        // {
        //   link: "approval-request",
        //   text:  "Inbox",
        //   logo: <FcViewDetails />,
        // },
        {
          link: "documentpage",
          text: <>{text_company_documents}</>,
          logo: <FcDocument />,
        },
        {
          link: "generaldoc",
          text: <>{text_custom_doc}</>,
          logo: <FcPlanner />,
        },
        {
          link: "managetemplate",
          text: <>{text_create_temp}</>,
          logo: <FcTemplate />,
        },
        {
          link: "company/all/benefits",
          text: <>{cmp_availale_benefits}</>,
          logo: <FcPaid />,
        },
        {
          link: "org/selected/benefits",
          text: <>{cmp_selected_benefits}</>,
          logo: <FcPaid />,
        },
        // {
        //   link: "addprojectmodule",
        //   text: <>{text_testmodule}</>,
        //   logo: <FcAbout />,
        // },
        {
          link: "salarybreakup/list",
          text: <>{salarybreakup_header}</>,
          logo: <FcAbout />,
        },
        {
          link: "vendorlist",
          text: <>{text_vendor}</>,
          logo: <FcDocument />,
        },
        {
          link: "customerlist",
          text: <>{text_customer}</>,
          logo: <FcConferenceCall />,
        },
        {
          link: "publicholiday",
          text: "Public Holidays",
          logo: <FcConferenceCall />,
        },
      ];
      setMenuList(Dashboardpages);
    } else {
      const EmpMenu = [
        {
          link: "dashboard",
          text: <>{textDashboard}</>,
          logo: <FcViewDetails />,
        },
        {
          link: "documentpage",
          text: <>{text_company_documents}</>,
          logo: <FcDocument />,
        },
        {
          link: "generaldoc",
          text: <>{text_custom_doc}</>,
          logo: <FcPlanner />,
        },
        {
          link: "managetemplate",
          text: <>{text_create_temp}</>,
          logo: <FcTemplate />,
        },
        {
          link: "publicholiday",
          text: "Public Holidays",
          logo: <FcConferenceCall />,
        },
        // {
        //   link: "addprojectmodule",
        //   // text: <>{text_bill_module}</>,
        //   text: <>{text_testmodule}</>,
        //   logo: <FcAbout />,
        // },
        {
          link: "company/all/benefits",
          text: <>{cmp_availale_benefits}</>,
          logo: <FcPaid />,
        },
        {
          link: "org/selected/benefits",
          text: <>{cmp_selected_benefits}</>,
          logo: <FcPaid />,
        },
        {
          link: "salarybreakup/list",
          text: <>{salarybreakup_header}</>,
          logo: <FcAbout />,
        },
        {
          link: "vendorlist",
          text: <>{text_vendor}</>,
          logo: <FcDocument />,
        },
        {
          link: "customerlist",
          text: <>{text_customer}</>,
          logo: <FcConferenceCall />,
        },
        {
          link: "attendancesingle",
          text: <>{text_attend_single}</>,
          logo: <FcPlanner />,
        },
        {
          link: "salary/details",
          text: <>{text_salary_detail}</>,
          logo: <FcMoneyTransfer />,
        },
        {
          link: "approval-request",
          text: (
            <>
              {" "}
              {text_inbox} &nbsp;
              <span className="badgenotificationresponsiv">
                {messageCount.length > 0 ? messageCount.length : ""}
              </span>
            </>
          ),
          logo: <FcMoneyTransfer />,
        },
        // {
        //   link: "approval-request",
        //   text: <>{approval_text}</>,
        //   logo: <FcAbout />,
        // },
        {
          link: "employeedocument",
          text: <>{text_document}</>,
          logo: <FcDocument />,
        },
        {
          link: "loandashboard",
          text: <>{title_loan}</>,
          logo: <FcDebt />,
        },
        {
          link: "report",
          text: <>{text_report}</>,
          logo: <FcFinePrint />,
        },
        {
          link: "employee/tds",
          text: <>{Tds_salary}</>,
          logo: <FcFinePrint />,
        },
        {
          link: "timesheet",
          text: <>{textTimeSheet}</>,
          logo: <FcDataSheet />,
        },
        {
          link: "appraisalpage",
          text: <>{text_appraisal}</>,
          logo: <FcFinePrint />,
        },
        {
          link: "employee/all/benefits",
          text: <>{my_emp_avilble_benifits}</>,
          logo: <FcPaid />,
        },
        {
          link: "employee/selected/benefits",
          text: <>{my_emp_benifits}</>,
          logo: <FcPaid />,
        },
      ];
      setMenuList(EmpMenu);
    }
  }, [Empmenu]);

  const [homepagelist, setHomepagelist] = useState([]);
  const [Homepage, setHomepage] = useState(false);
  useEffect(() => {
    if (!Empmenu) {
      const Homepage = [
        {
          link: "",
          text: "Why Moramba?",
        },
        {
          link: "upgradplan",
          text: "Plan & Pricing",
        },
        // {
        //   link: "#",
        //   text: "Support",
        // },
        {
          link: "faq",
          text: "FAQs",
        },
      ];
      setHomepagelist(Homepage);
    }
  }, [Homepage]);
  const settings = [
    {
      lableText: <>{headerLogOut}</>,
      Link: "/",
    },
  ];
  const languageHandle = (e) => {
    const languageCode = e;
    console.log(languageCode);
    const request_start_at = performance.now();

    console.log("first");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/defaultlanguages/selectdefaultlanguage?languageCode=" +
      languageCode;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;
        var res = response.data.data[0].defaultlanguagescreenlist;

        // Efficient way to build XML
        let xmlArray = ["<resources>"];
        const escapeXml = (unsafe) =>
          unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

        const sanitizeKey = (key) =>
          key.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

        for (let i = 0; i < res.length; i++) {
          let d = res[i];
          for (let j = 0; j < d.defaultscreenfieldslist.length; j++) {
            var kv = d.defaultscreenfieldslist[j];
            xmlArray.push(
              `<string name="${sanitizeKey(kv.fieldKey)}">${escapeXml(
                kv.fieldValue
              )}</string>`
            );
          }
        }
        xmlArray.push("</resources>");
        let xml = xmlArray.join("");
        GlobalConstants.appXml = xml;
        localStorage.setItem(GlobalConstants.session_lang_xml, xml);
        localStorage.setItem(
          GlobalConstants.session_default_language,
          languageCode
        );
        console.log(languageCode, "-----------");
        try {
          SetLanguageText();
        } catch (err) {
          errorToast(err);
        }
        if (response.status === 200) {
          console.log(
            "ID:06101=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
          window.location.reload();
        }
      })
      .catch(function (error) {
        errorToast(error.massage);
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
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log("" + err);
    }
  }, []);
  const SetLanguageText = () => {
    try {
      var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");

      setHeaderBack(
        doc.querySelector("string[name='headerback']")?.textContent || "Back"
      );
      setheaderLogOut(
        doc.querySelector("string[name='headerLogOut']")?.textContent ||
          "Logout"
      );
      settext_language(
        doc.querySelector("string[name='text_language']")?.textContent ||
          "Language"
      );
      setText_document(
        doc.querySelector("string[name='text_document']")?.textContent ||
          "Documents"
      );
      settitle_loan(
        doc.querySelector("string[name='title_loan']")?.textContent || "Loan"
      );
      setText_report(
        doc.querySelector("string[name='text_report']")?.textContent || "Report"
      );
      setText_salary_detail(
        doc.querySelector("string[name='text_salary_detail']")?.textContent ||
          "Salary Details"
      );
      setText_appraisal(
        doc.querySelector("string[name='text_appraisal']")?.textContent ||
          "Appraisal"
      );
      setText_custom_doc(
        doc.querySelector("string[name='text_custom_doc']")?.textContent ||
          "Custom Document"
      );
      setText_create_temp(
        doc.querySelector("string[name='text_create_temp']")?.textContent ||
          "Manage Template"
      );
      setTextHome(
        doc.querySelector("string[name='textHome']")?.textContent || "Home"
      );
      setTextDashboard(
        doc.querySelector("string[name='textDashboard']")?.textContent ||
          "Dashboard"
      );
      setTextTimeSheet(
        doc.querySelector("string[name='textTimeSheet']")?.textContent ||
          "Timesheet"
      );
      setText_attend_single(
        doc.querySelector("string[name='text_attend_single']")?.textContent ||
          "Attendance Single"
      );
      setApproval_text(
        doc.querySelector("string[name='approval_text']")?.textContent ||
          "Approval Request"
      );
      setText_vendor(
        doc.querySelector("string[name='text_vendor']")?.textContent || "Vendor"
      );
      setText_customer(
        doc.querySelector("string[name='text_customer']")?.textContent ||
          "Customer"
      );
      setCpmapny_featuretext(
        doc.querySelector("string[name='cpmapny_featuretext']")?.textContent ||
          "Company Features"
      );
      setText_selecttheme(
        doc.querySelector("string[name='text_selecttheme']")?.textContent ||
          "Select Theme"
      );
      setText_light(
        doc.querySelector("string[name='text_light']")?.textContent || "Light"
      );
      setText_dark(
        doc.querySelector("string[name='text_dark']")?.textContent || "Dark"
      );
      setText_f_name(
        doc.querySelector("string[name='text_f_name']")?.textContent ||
          "First Name"
      );
      setText_L_name(
        doc.querySelector("string[name='text_L_name']")?.textContent ||
          "Last Name"
      );
      setText_hint_email(
        doc.querySelector("string[name='text_hint_email']")?.textContent ||
          "Email"
      );
      setText_edit(
        doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
      );
      setText_edit_admin(
        doc.querySelector("string[name='text_edit_admin']")?.textContent ||
          "Admin Profile"
      );
      setText_Avilablebenefits(
        doc.querySelector("string[name='text_Avilablebenefits']")
          ?.textContent || "Available Benefits"
      );
      setText_testmodule(
        doc.querySelector("string[name='text_testmodule']")?.textContent ||
          "Test Module"
      );
      setText_empfeatures(
        doc.querySelector("string[name='text_empfeatures']")?.textContent ||
          "Employee Features"
      );
      setSalarybreakup_header(
        doc.querySelector("string[name='salarybreakup_header']")?.textContent ||
          "Salary Breakup Template"
      );
      setMy_benifit(
        doc.querySelector("string[name='my_benifit']")?.textContent ||
          "My Benefits"
      );
      setTds_salary(
        doc.querySelector("string[name='Tds_salary']")?.textContent ||
          "TDS on Salary"
      );
      settext_holiday(
        doc.querySelector("string[name='text_holiday']")?.textContent ||
          "Holidays"
      );
      // setText_eng(
      //   doc.querySelector("string[name='text_eng']").firstChild
      //     .data
      // );
      // setText_hin(
      //   doc.querySelector("string[name='text_hin']").firstChild
      //     .data
      // );
      // setText_ar(
      //   doc.querySelector("string[name='text_ar']")?.textContent
      // );
      // setText_por(
      //   doc.querySelector("string[name='text_por']").firstChild
      //     .data
      // );
      // setText_spa(
      //   doc.querySelector("string[name='text_spa']").firstChild
      //     .data
      // );
      // setText_tur(
      //   doc.querySelector("string[name='text_tur']").firstChild
      //     .data
      // );
      // setText_ger(
      //   doc.querySelector("string[name='text_ger']").firstChild
      //     .data
      // );
      // setText_fr(
      //   doc.querySelector("string[name='text_fr']")?.textContent
      // );
      // setText_guj(
      //   doc.querySelector("string[name='text_guj']").firstChild
      //     .data
      // );
      // setText_ru(
      //   doc.querySelector("string[name='text_ru']")?.textContent
      // );
      // setText_ukr(
      //   doc.querySelector("string[name='text_ukr']").firstChild
      //     .data
      // );
      // setText_mar(
      //   doc.querySelector("string[name='text_mar']").firstChild
      //     .data
      // );
      // setText_kor(
      //   doc.querySelector("string[name='text_kor']").firstChild
      //     .data
      // );
      // setText_rom(
      //   doc.querySelector("string[name='text_rom']").firstChild
      //     .data
      // );
      setText_inbox(
        doc.querySelector("string[name='text_inbox']")?.textContent || "Inbox"
      );
      setText_company_documents(
        doc.querySelector("string[name='text_company_documents']")
          ?.textContent || "Upload Company Documents"
      );
    } catch (ert) {}
  };
  const [anchorEldoc, setAnchorEldoc] = useState(null);
  const openDocument = Boolean(anchorEldoc);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClosedoc = () => {
    setAnchorEldoc(null);
  };
  const handleClickDoc = (event) => {
    setAnchorEldoc(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const pathnames = [
      "/dashboard",
      "/walletportal",
      "/companyprofile",
      "/payrollsheet",
      "/attendance",
      "/invoice/allinvoice",
      "/bill/allbill",
      "/generaldoc",
      "/managetemplate",
      "/salarybreakup/list",
      "/vendorlist",
      "/customerlist",
      "/company/all/benefits",
      "/addprojectmodule",
      "/documentpage",
      "/addstaff",
      "/invoice/create",
      "/bill/create",
      "/expense/template/create",
      "/inventory/template/create",
      "/subscription/template/create",
      "/bill/template/create",
      "/invoice/template/create",
      "/salarybreakup/create",
      "/createvendor",
      "/createcustomer",
      "/addprojectplan",
      "/expense/template/view",
      "/inventory/template/view",
      "/subscription/template/view",
      "/bill/template/view",
      "/invoice/template/view",
      "/invoice/allinvoice/view",
      "/bill/allbill/view",
      "/full-attendance",
      "/bonus",
      "/publicholiday",
      "/view/holidays",
      url,
      "/org/selected/benefits",
      "/customer/edit",
      "/vendor/edit",
    ];

    if (pathnames.includes(window.location.pathname)) {
      setEmpmenu(false);
      setHomepage(true);
    } else {
      setHomepage(false);
      setEmpmenu(true);
    }
  }, []);

  const handleFileInput = ($event) => {
    var file = $event.target.files[0];
    console.log(file);
    var fileToupload = file;
    setUploadFile(fileToupload);
  };

  const supportValidation = () => {
    let supportValid = true;
    if (!EMAIL_REGEX.test(emailId) === true) {
      supportValid = false;
      if (emailId === "") {
        supportValid = false;
        setEmailErr("*Enter Email Address!");
      } else {
        setEmailErr("*Enter Valid Email Address!");
      }
    }
    if (message === "") {
      supportValid = false;
      setHelpyouErr("*Enter a Value!");
    }
    return supportValid;
  };

  console.log(ReqList.filter((e) => e.approval_status === "pending"));
  const handleSupport = () => {
    if (supportValidation()) {
      var apiUrl =
        GlobalConstants.Cdomain + "/API/moramba/v4/support/supportrequest";
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "NA",
        },
      };

      const formData = new FormData();
      formData.append("att_file", uploadFile);
      formData.append("fullname", name);
      formData.append("email", emailId);
      formData.append("msg", message);

      axios
        .post(apiUrl, formData, headerConfig)
        .then(function (response) {
          var res = response.data;
          setSupportsuccessmsg(res.message);
          setName("");
          setUploadFile();
          setEmailId("");
          setMessage("");
          setOpenSupport(true);
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
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("username") === null) {
      if (supportPopup) {
        document.getElementById("MainDiv").style.pointerEvents = "none";
        document.getElementById("homepage").style.filter = "blur(3px)";
        document.getElementById("homepage").style.filter = "blur(3px)";
        document.getElementById("homepage").style.pointerEvents = "none";
        document.getElementById("homepage").style.pointerEvents = "none";
      } else {
        document.getElementById("homepage").style.filter = "blur(0px)";
        document.getElementById("homepage").style.filter = "blur(0px)";
        document.getElementById("MainDiv").style.pointerEvents = "all";
        document.getElementById("homepage").style.pointerEvents = "all";
        document.getElementById("homepage").style.pointerEvents = "all";
      }
    }
  }, [supportPopup]);

  const logoredirectionHandler = () => {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("token") === undefined ||
      sessionStorage.getItem("token") === ""
    ) {
      navigate("/");
    } else {
      navigate("/selectcompany");
    }
  };
  return (
    <>
      <div className={supportPopup ? "blurBg" : ""} id="MainDiv">
        <AppBar
          position="static"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <Toolbar disableGutters>
            <IconButton
              disableelevation="true"
              disableRipple
              sx={{
                mr: 2,
                ml: 2,
                display: { xs: "none", md: "flex" },
              }}
              onClick={logoredirectionHandler}
            >
              <img src={HeaderLogo} alt="" className="headerImage" />
            </IconButton>
            {window.location.pathname === "/" ||
            window.location.pathname === "/faq" ||
            sessionStorage.getItem("username") === null ||
            sessionStorage.getItem("token") === null ||
            sessionStorage.getItem("token") === undefined ||
            sessionStorage.getItem("token") === "" ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {homepagelist?.map((page, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => MobRedirect(page.link)}
                        style={{ textTransform: "capitalize" }}
                      >
                        <Typography textAlign="center">{page.text}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem
                      // key={index}
                      onClick={() => setSupportPopup(!supportPopup)}
                      style={{ textTransform: "capitalize" }}
                    >
                      <Typography textAlign="center">Support</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                {window.location.pathname === "/selectcompany" ? (
                  ""
                ) : (
                  <>
                    <Box
                      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: "block", md: "none" },
                        }}
                      >
                        {MenuList?.map((page, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => MobRedirect(page.link)}
                          >
                            <Typography textAlign="center">
                              {page.logo}
                              {page.text}
                            </Typography>
                          </MenuItem>
                        ))}
                        {/* <select
                    onChange={(e) => setTheme({ Theme: e.target.value })}
                    className="CountryInputbox1 me-3"
                  >
                    <option disabled>{text_selecttheme}</option>
                    <option value={"Light"} defaultValue>
                      {text_light}
                    </option>
                    <option value={"Dark"}>{text_dark}</option>
                  </select> */}
                        <select
                          className="CountryInputbox1"
                          onChange={(e) => languageHandle(e.target.value)}
                          defaultValue={localStorage.getItem(
                            "default_language"
                          )}
                        >
                          <option disabled>{text_language}</option>
                          <option value="en" defaultValue>
                            {text_eng}
                          </option>
                          <option value="hi">{text_hin}</option>
                          <option value="ar">{text_ar}</option>
                          <option value="pt">{text_por}</option>
                          <option value="es">{text_spa}</option>
                          <option value="tr">{text_tur}</option>
                          <option value="de">{text_ger}</option>
                          <option value="fr">{text_fr}</option>
                          <option value="guj">{text_guj}</option>
                          <option value="ru">{text_ru}</option>
                          <option value="uk">{text_ukr}</option>
                          <option value="mar">{text_mar}</option>
                          <option value="kor">{text_kor}</option>
                          <option value="rom">{text_rom}</option>
                        </select>
                      </Menu>
                    </Box>
                  </>
                )}
              </>
            )}

            <Typography
              variant="h5"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
              onClick={() => redirect("selectcompany")}
            >
              <img src={HeaderLogo} alt="" className="headerImage" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {window.location.pathname === "/" ||
              window.location.pathname === "/faq" ||
              sessionStorage.getItem("username") === null ||
              sessionStorage.getItem("token") === null ||
              sessionStorage.getItem("token") === undefined ||
              sessionStorage.getItem("token") === "" ? (
                <>
                  {/* {homepagelist?.map((page, index) => {
                  return (
                    <> */}

                  <Button
                    className="headerBtn"
                    onClick={() => redirect("")}
                    style={{ marginInlineStart: 50 }}
                  >
                    Why Moramba?
                  </Button>
                  <Button
                    className="headerBtn"
                    onClick={() => redirect("upgradplan")}
                  >
                    Plan & Pricing
                  </Button>
                  <Button
                    className="headerBtn"
                    onClick={() => setSupportPopup(!supportPopup)}
                  >
                    Support
                  </Button>
                  <Button
                    className="headerBtn"
                    onClick={() => redirect("faq")}
                    style={{ textTransform: "capitalize" }}
                  >
                    FAQs
                  </Button>
                  {/* </>
                  );
                })} */}
                </>
              ) : (
                <>
                  {" "}
                  {window.location.pathname === "/selectcompany" ? (
                    ""
                  ) : (
                    <>
                      <Button
                        className="headerBtn"
                        onClick={() => redirect("selectcompany")}
                      >
                        {textHome}
                      </Button>
                      <Button
                        className="headerBtn"
                        onClick={() => redirect("dashboard")}
                      >
                        {textDashboard}
                      </Button>
                      {role === "employee" ? (
                        ""
                      ) : (
                        <>
                          <Button
                            id="basic-button"
                            className="menu_button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            {cpmapny_featuretext} &nbsp;
                            <ArrowDropDownIcon className="" />
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/documentpage">
                                    <FcDocument />
                                    &nbsp;{text_company_documents}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/generaldoc">
                                    <FcPlanner />
                                    &nbsp;{text_custom_doc}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/managetemplate">
                                    <FcTemplate /> &nbsp;{text_create_temp}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/salarybreakup/list">
                                    <HiTemplate /> &nbsp;{salarybreakup_header}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/vendorlist">
                                    <FcDocument /> &nbsp;{text_vendor}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/customerlist">
                                    <FcConferenceCall /> &nbsp;{text_customer}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/company/all/benefits">
                                    <FcPaid /> &nbsp;{text_Avilablebenefits}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/org/selected/benefits">
                                    <FcPaid /> &nbsp;{my_benifit}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleClosedoc}
                                  className="item_list"
                                >
                                  <Link to="/publicholiday">
                                    <FcPaid /> &nbsp;{text_holiday}
                                  </Link>
                                </MenuItem>
                                {/* <MenuItem
                              onClick={handleClosedoc}
                              className="item_list"
                            >
                              <Link to="/addprojectmodule">
                                <FcAbout /> {text_testmodule}
                              </Link>
                            </MenuItem> */}
                              </div>
                            </div>
                          </Menu>
                        </>
                      )}
                      {!Empmenu ? (
                        ""
                      ) : (
                        <>
                          {empStatus === "0" ? (
                            ""
                          ) : (
                            <>
                              <Button
                                id="basic-button"
                                className="menu_button"
                                aria-controls={
                                  openDocument ? "basic-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={
                                  openDocument ? "true" : undefined
                                }
                                onClick={handleClickDoc}
                              >
                                {text_empfeatures}&nbsp;
                                <ArrowDropDownIcon />
                              </Button>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEldoc}
                                open={openDocument}
                                onClose={handleClosedoc}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <div className="row">
                                  <div className="col-md-5">
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/attendancesingle">
                                        <FcPlanner /> &nbsp;{text_attend_single}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/salary/details">
                                        <FcMoneyTransfer /> &nbsp;
                                        {text_salary_detail}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/employee/all/benefits">
                                        <FcPaid /> &nbsp;
                                        {text_Avilablebenefits}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/employee/selected/benefits">
                                        <FcPaid /> &nbsp;
                                        {my_benifit}
                                      </Link>
                                    </MenuItem>
                                    {/* <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/approval-request">
                                        <FcAbout />
                                        &nbsp;{approval_text}
                                      </Link>
                                    </MenuItem> */}
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/employee/tds">
                                        <FcAbout />
                                        &nbsp;{Tds_salary}
                                      </Link>
                                    </MenuItem>
                                  </div>
                                  <div className="col-md-2"></div>
                                  <div className="col-md-5">
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/employeedocument">
                                        <FcDocument />
                                        &nbsp;{text_document}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/loandashboard">
                                        <FcDebt />
                                        &nbsp;{title_loan}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/report">
                                        <FcFinePrint />
                                        &nbsp;{text_report}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/timesheet">
                                        <FcDataSheet />
                                        &nbsp;{textTimeSheet}
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      className="item_list"
                                    >
                                      <Link to="/appraisalpage">
                                        <FcFinePrint />
                                        &nbsp;{text_appraisal}
                                      </Link>
                                    </MenuItem>
                                  </div>
                                </div>
                              </Menu>
                              <Button
                                className="headerBtn"
                                onClick={() => redirect("approval-request")}
                              >
                                {text_inbox} &nbsp;
                                <span className="badgenotification">
                                  {messageCount.length > 0
                                    ? messageCount.length
                                    : ""}
                                </span>
                              </Button>
                            </>
                          )}
                        </>
                      )}
                      {/* <Button
                        className="headerBtn"
                        onClick={() => redirect("approval-request")}
                      >
                        Inbox &nbsp;
                        <span className="badgenotification">

                        {messageCount.length>0?(messageCount.length):("")}
                        </span>
                      </Button> */}
                    </>
                  )}
                </>
              )}
            </Box>

            <Box
              sx={{
                flexGrow: { sx: 0, md: 0, xl: 0.06 },
                display: { md: "flex" },
              }}
            >
              {window.location.pathname === "/" ||
              window.location.pathname === "/faq" ||
              sessionStorage.getItem("username") === null ||
              sessionStorage.getItem("token") === null ||
              sessionStorage.getItem("token") === undefined ||
              sessionStorage.getItem("token") === "" ? (
                <>
                  <Button
                    className="homesignupbtn"
                    id="homesignupmob"
                    onClick={() => redirect("register")}
                    // style={{ marginInlineEnd: 20 }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    className="homesigninbtn"
                    id="homesigninmob"
                    onClick={() => redirect("login")}
                    // style={{ marginInlineEnd: 120 }}
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    className="headerBtn"
                    onClick={() => navigate(-1)}
                    style={{ marginInlineEnd: 5 }}
                  >
                    <KeyboardBackspaceIcon
                      sx={{
                        display: { xs: "none", md: "flex" },
                        mr: 1,
                      }}
                    />
                    {headerback}
                  </Button>
                  {/* <select
            onChange={(e) => setTheme({ Theme: e.target.value })}
            className="CountryInputbox1 me-3 LangBox"
          >
            <option disabled value={""}>
              {text_selecttheme}
            </option>
            <option value={"Light"} defaultValue>
              {text_light}
            </option>
            <option value={"Dark"}>{text_dark}</option>
          </select> */}
                  <select
                    className="CountryInputbox1 me-3 LangBox"
                    onChange={(e) => languageHandle(e.target.value)}
                    defaultValue={localStorage.getItem("default_language")}
                  >
                    <option disabled>{text_language}</option>
                    <option value="en" defaultValue>
                      {text_eng}
                    </option>
                    <option value="hi">{text_hin}</option>
                    <option value="ar">{text_ar}</option>
                    <option value="pt">{text_por}</option>
                    <option value="es">{text_spa}</option>
                    <option value="tr">{text_tur}</option>
                    <option value="de">{text_ger}</option>
                    <option value="fr">{text_fr}</option>
                    <option value="guj">{text_guj}</option>
                    <option value="ru">{text_ru}</option>
                    <option value="uk">{text_ukr}</option>
                    <option value="mar">{text_mar}</option>
                    <option value="kor">{text_kor}</option>
                    <option value="rom">{text_rom}</option>
                  </select>
                  <Tooltip title={sessionStorage.getItem("username")}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, marginInlineEnd: 2 }}
                    >
                      <Avatar
                        alt={
                          sessionStorage.getItem("AdminFName") === null
                            ? ""
                            : sessionStorage.getItem("AdminFName").toUpperCase()
                        }
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={sessionStorage.getItem("username")}>
                    <Typography
                      noWrap
                      sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        flexGrow: 1,
                        textDecoration: "none",
                        mt: 0.5,
                      }}
                      onClick={handleOpenUserMenu}
                      className="headerText"
                    >
                      {sessionStorage.getItem("AdminFName")}
                    </Typography>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    // keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={anchorElUser}
                    onClose={handleCloseUserMenu}
                  >
                    {window.location.pathname === "/selectcompany" ? (
                      <MenuItem onClick={() => setEditPopup(true)}>
                        <Typography textAlign="center">{text_edit}</Typography>
                      </MenuItem>
                    ) : (
                      ""
                    )}

                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={LogoutClick}>
                        <Typography textAlign="center">
                          {setting.lableText}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      {EditPopup ? (
        <>
          <div className="editpopupheader ">
            <div className="row text-end">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setEditPopup(false)} />
              </h3>
            </div>
            <div className="text-center">
              <h4>{text_edit_admin}</h4>
            </div>
            <Divider />
            <div className="d-flex gap-5 mt-3">
              <div>
                <h6>{text_f_name}</h6>
                <input
                  className="me-2"
                  readOnly={Fnbtn ? false : true}
                  value={sessionStorage.getItem("AdminFName")}
                />
              </div>
              <div>
                <h6>{text_L_name}</h6>
                <input
                  className="me-2"
                  readOnly={Lnbtn ? false : true}
                  value={sessionStorage.getItem("AdminLName")}
                />
              </div>
            </div>
            <h6 className="mt-2">{text_hint_email}</h6>
            <input value={sessionStorage.getItem("username")} readOnly />
          </div>
        </>
      ) : (
        ""
      )}
      {supportPopup ? (
        <>
          <div className="main" id="MainDiv">
            <div className="supportpopup" id="popupmobile_timesheet">
              <div className="text-end">
                <h3 className="close mb-3 p-0" id="closeMob">
                  <CgCloseO onClick={() => setSupportPopup(false)} />
                </h3>
              </div>
              <center>
                <h4 className="categorytext">How Can We Help You?</h4>
              </center>

              <div className="p-3 mx-4">
                <Divider />
                <h5 className="mt-2 text-start">Your Name(Optional)</h5>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="mt-1 w-75"
                  placeholder="Enter Your Name"
                />
                <h5 className="mt-3 text-start">
                  Email <span className="Star">*</span>
                </h5>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => [
                    setEmailId(e.target.value),
                    setEmailErr(""),
                  ]}
                  className="mt-1 text-start w-75"
                  placeholder="Enter Email "
                />
                <br />
                <span className="Star">{emailerr}</span>
                <h5 className="mt-3 text-start">
                  How can we help you?<span className="Star">*</span>
                </h5>
                <textarea
                  type="text"
                  value={message}
                  onChange={(e) => [
                    setMessage(e.target.value),
                    setHelpyouErr(""),
                  ]}
                  className="mt-1 text-start w-75 h-100"
                  placeholder=""
                />
                <br />
                <span className="Star">{helpyouerr}</span>
                <h5 className="mt-3 text-start">Attachments</h5>
                <input
                  type="file"
                  // value={file}
                  onChange={handleFileInput}
                  className="mt-1 text-start w-75 h-100"
                  // placeholder=""
                />
                <Divider className="mt-3" />
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btncancel mt-3 me-3"
                    onClick={() => setSupportPopup(false)}
                  >
                    cancel
                  </button>
                  <button className="CreateBtn mt-3" onClick={handleSupport}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openSupport}
          onClose={handleClosesupportpopup}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="text-center">
            <FaRegThumbsUp className="text-center text-success thumb-sty" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p className="supportsuccess  mb-4">{supportsuccessmsg}</p>
            </DialogContentText>
            <Divider />
          </DialogContent>
          <DialogActions>
            <button
              className="btncancel mx-4"
              onClick={handleClosesupportpopup}
            >
              Ok
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </>
  );
}

export default Header;
