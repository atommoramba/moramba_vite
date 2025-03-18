import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Addstaff.css";
import { CgCloseO } from "react-icons/cg";
import EmpImg from "../../assets/img/Employee.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillInfoCircle } from "react-icons/ai";
import $ from "jquery";
import {
  GetUTCNow,
  GlobalConstants,
  countriesList,
} from "../../utils/GlobalConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CountryCodewithEmoji, Currency } from "../../utils/data";
import { RegionDropdown } from "react-country-region-selector";
import { Divider } from "@mui/material";
import { EMAIL_REGEX } from "../../utils/Validation";
import RandomeText from "../../utils/RandomeText";
import dayjs from "dayjs";

import axios from "axios";
import {
  errorToast,
  infoToast,
  successToast,
  warnToast,
} from "../../utils/Helper";
import { FcApproval } from "react-icons/fc";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  getDashboard,
  resetDashboardEmpList,
} from "../../redux/DashboardSlice";
import { getDesignationDoc } from "../../redux/DesignationDoc";
import { getSalaryBreakupList } from "../../redux/SalaryBreakupListSlice";
import { ToastContainer } from "react-toastify";
import { getRequestsList } from "../../redux/RequestsListSlice";
import { getOrgSalaryData } from "../../redux/orgSalaryDataSlice";
import Cookie from "js-cookie";
import { FaRegThumbsUp } from "react-icons/fa";
import { Verified } from "@mui/icons-material";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const salaryData = {
  templatename: "india_all",
  isActive: true,
  effectiveDate: "01 Jan,2023",
  _partition: GlobalConstants._partition,
  _empId: "636fd3f760ffb9709ec829e0",
  _orgId: "636fd3f760ffb9709ec829e0",
  level: "global",
  country: "india",
  state: "all",
  mandetorylist: [
    { key: "basic", name: "Basic", istax: true, desc: "PF" },
    { key: "dearness", name: "Dearness", istax: true, desc: "PF" },
  ],
  allowancelist: [
    {
      key: "HRA",
      name: "House Rent Allowance",
      istax: true,
      auto: true,
      calc: { op: "%", amount: "+20", key: "basic" },
      desc: "40% of Salary (50%, if house situated in Mumbai, Calcutta, Delhi or Madras)",
    },
    {
      key: "CEA",
      name: "Children Education Allowance",
      istax: true,
      calc: { op: "%", amount: "+20", key: "basic" },
      desc: "Up to Rs. 100 per month per child up to a maximum of 2 children is exempt",
    },
    {
      key: "HEA",
      name: "Hostel Expenditure Allowance",
      istax: true,
      calc: { op: "%", amount: "+20", key: "basic" },
      desc: "Up to Rs. 300 per month per child up to a maximum of 2 children is exempt",
    },
    {
      key: "TA",
      name: "Transport Allowance",
      istax: true,
      calc: { op: "%", amount: "+20", key: "basic" },
      desc: "Rs. 3,200 per month granted to an employee, who is blind or deaf and dumb or orthopedically handicapped with disability of lower extremities",
    },
  ],

  deductionlist: [
    { key: "pf", name: "PF", istax: true, auto: true, desc: "PF" },
  ],
  taxlist: [
    { key: "pt", name: "PT", istax: true, auto: true, desc: "PF" },
    { key: "tds", name: "TDS", istax: true, desc: "TDS" },
  ],
};
function AddstaffWIP() {
  const [popup, setPopup] = useState(false);
  const [isSalaryChange, setIsSalaryChange] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const empIdForUpdate = sessionStorage.getItem("currentempid");
  const comp_name = sessionStorage.getItem("comp_name");

  const AllEmpList = useSelector((state) => state.allEmpList);
  var ActiveOnlyEmp = AllEmpList?.filter((val) => val.empStatusid === "1");
  var SuperAdminID = AllEmpList?.filter((val) => val.role === "superadmin");
  const AllDesignationList = useSelector((state) => state.DesignationDocList);
  const SalaryBreakupTemplate = useSelector((state) => state.SalaryBreakupList);
  const [selectedSalaryTemp, setselectedSalaryTemp] = useState("");
  const [selectedSalaryTempID, SelectetedSalaryTempID] = useState("");
  const [openeditpopup, setOpeneditpopup] = useState(false);
  const [openeditmessage, setopeneditmessage] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpeneditpopup(false);
    navigate("/dashboard");
  };

  const setSelectetedSalaryTempID = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    SelectetedSalaryTempID(event.nativeEvent.target[index].text);
  };
  const [allSalaryTemplateFromServer, setAllSalaryTemplateFromServer] =
    useState([]);

  useEffect(() => {
    if (SalaryBreakupTemplate?.length === 0) {
      dispatch(getSalaryBreakupList());
      // console.log("hi");
    } else {
      console.log("Salary Breakup Template List Not Called");
    }
  }, [SalaryBreakupTemplate?.length]);

  useEffect(() => {
    if (allSalaryTemplateFromServer?.length === 0) {
      getSalaryInfoFromServer();
    }
  }, [allSalaryTemplateFromServer]);
  const getSalaryInfoFromServer = async () => {
    var type = "selectall"; //active
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/salarybreakuptemplate?type=" +
      type;
    var body = {
      isActive: true.toString(),
      effectiveDate: "10-01-2022",
      _partition: GlobalConstants._partition,
      _empId: "NA",
      _orgId: sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      ),
      level: "org",
      country: "NA",
      state: "NA",
      mandetorylist: "NA",
      allowancelist: "NA",
      deductionlist: "NA",
      taxlist: "NA",
      templatename: "NA",
      // _empId:,
    };

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    try {
      var response = await axios.post(apiUrl, body, headerConfig);
      if (response.status === 200) {
        var res = response.data;
        if (res.status) {
          setAllSalaryTemplateFromServer(res.data);
        }
      } else {
      }
    } catch (Err) {}
  };

  useEffect(() => {
    if (AllDesignationList?.length === 0) {
      dispatch(getDesignationDoc());
    } else {
    }
  }, [AllDesignationList?.length]);
  const role = sessionStorage.getItem("role");
  const [salaryDataMain, setSalaryDataMain] = useState(salaryData);
  useEffect(() => {
    var FinalSalaryTemp = allSalaryTemplateFromServer?.filter(
      (val) => val._id === selectedSalaryTemp
    );
    setSalaryDataMain(FinalSalaryTemp[0]);

    setSelectedAllowanceList(FinalSalaryTemp[0]?.allowancelist);
    setSelectedDeductionList(FinalSalaryTemp[0]?.deductionlist);
    setSelectedMandateList(FinalSalaryTemp[0]?.mandetorylist);
    setSelectedTaxList(FinalSalaryTemp[0]?.taxlist);
  }, [selectedSalaryTemp, allSalaryTemplateFromServer]);
  const [selectedAllowanceList, setSelectedAllowanceList] = useState(
    salaryDataMain?.allowancelist
  );
  const [selectedDeductionList, setSelectedDeductionList] = useState(
    salaryDataMain?.deductionlist
  );
  const [selectedMandateList, setSelectedMandateList] = useState(
    salaryDataMain?.mandetorylist
  );
  const [selectedTaxList, setSelectedTaxList] = useState(
    salaryDataMain?.taxlist
  );

  const [selectedAllowanceS, setSelectedAllowanceS] = useState([]);
  const [selectedDeductionS, setSelectedDeductionS] = useState([]);
  const [selectedTaxS, setSelectedTaxS] = useState([]);
  const [selectedMandetS, setSelectedMandetS] = useState([]);

  const [grossTotal, setGrossTotal] = useState("");
  const [netTotal, setNetTotal] = useState(0);
  const [sumAllowane, setSumAllowane] = useState(0);
  const [sumDeduction, setSumDeduction] = useState(0);
  const [sumTax, setSumTax] = useState(0);
  const [sumMandate, setSumMandate] = useState(0);
  const [saveFlag, setSaveFlag] = useState(0);
  const OrginalGrossSalary = sumMandate + sumAllowane;
  const [SelectedgrossTotal, setSelectedGrossTotal] = useState("");
  const [SelectednetTotal, setSelectedNetTotal] = useState(0);

  const [SelectedsumAllowane, setSelectedSumAllowane] = useState(0);
  const [SelectedsumDeduction, setSelectedSumDeduction] = useState(0);
  const [SelectedsumTax, setSelectedSumTax] = useState(0);
  const [SelectedsumMandate, setSelectedSumMandate] = useState(0);
  const [ManageSalaryPopup, setManageSalaryPopup] = useState(false);

  const [popupprofile, setPopupprofile] = useState(false); /*popup variable*/
  const [fileToUpload, setFileToUpload] = useState();
  const [fileNameUpload, setfileNameUpload] = useState();
  const [fileSizeUpload, setfileSizeUpload] = useState();
  const [fileTypeUpload, setfileTypeUpload] = useState();
  const [imageUrl, setimageUrl] = useState("");
  const [imageKey, setimageKey] = useState("");
  const [isNewimageUrl, setisNewimageUrl] = useState(false);
  const [isNewimageKey, setisNewimageKey] = useState(false);
  const [file, setFile] = useState();
  const [docId, setDocId] = useState();

  //Language Variables Start

  //old Language Variables
  const [text_role_type, seText_role_type] = useState("Role Type");
  const [text_designation, seText_designation] = useState("Designation");
  const [text_radio_full_time, seText_radio_full_time] = useState("Full Time");
  const [text_radio_part_time, setText_radio_part_time] = useState("Part Time");
  const [text_radio_salaried, setText_radio_salaried] = useState("Salaried");
  const [text_radio_non_salaried, setText_radio_non_salaried] =
    useState("Non Salaried");
  const [text_radio_weekly, setText_radio_weekly] = useState("Weekly");
  const [text_radio_monthly, setText_radio_monthly] = useState("Monthly");
  const [text_hint_join_date, setText_hint_join_date] = useState("Join Date");
  const [text_hint_tax_id, setText_hint_tax_id] = useState("Employee Tax ID");
  const [title_ddd_employee, setTitle_ddd_employee] = useState("Add Employee");
  const [title_eee_employee, setTitle_eee_employee] = useState("Edit Employee");
  const [text_f_name, setText_f_name] = useState("First Name");
  const [text_enter_first_name, setText_enter_first_name] =
    useState("Enter First Name");
  const [text_M_name, setText_M_name] = useState("Middle Name");
  const [text_hint_M_name, setText_hint_M_name] = useState("Enter Middle Name");
  const [text_L_name, setText_L_name] = useState("Last Name");
  const [text_hint_L_name, setText_hint_L_name] = useState("Enter Last Name");
  const [text_address_1, seTtext_address_1] = useState("Address 1");
  const [text_address_2, seTtext_address_2] = useState("Address 2");
  const [text_hint_address_1, seTtext_hint_address_1] =
    useState("Enter Street 1");
  const [text_hint_address_2, seTtext_hint_address_2] =
    useState("Enter Street 2");
  const [text_country, setText_country] = useState("Country");
  const [text_state, setText_state] = useState("State");
  const [text_zip_code, setText_zip_code] = useState("Zip Code");
  const [text_hint_zip_code, setText_hint_zip_code] =
    useState("Enter Zip Code");

  const [text_bank_name, setText_bank_name] = useState("Bank Name");
  const [hint_bank_name, setHint_bank_name] = useState("Enter Your Bank Name");
  const [text_account_number, setText_account_number] =
    useState("Account Number");
  const [hint_account_number, setHint_account_number] = useState(
    "Enter Your Account Number"
  );
  const [text_ifsc_code, setText_ifsc_code] = useState("IFSC Code");
  const [hint_ifsc_code, setHint_ifsc_code] = useState("Enter Your IFSC Code");
  const [text_swift_code, setText_swift_code] = useState("Swift Code");
  const [hint_swift_code, setHint_swift_code] = useState(
    "Enter Your Swift Code"
  );
  const [text_aba_code, setText_aba_code] = useState("ABA Code(USA)");
  const [hint_aba_code, setHint_aba_code] = useState("Enter Your ABA Code");
  const [text_iban_code, setText_iban_code] = useState("IBAN Code(Europe)");
  const [hint_iban_code, setHint_iban_code] = useState("Enter Your IBAN Code");
  const [text_id_number, setText_id_number] = useState("Employee ID Number");
  const [text_hint_taxid_number, setText_hint_taxid_number] =
    useState("Enter Your Tax ID");
  const [text_dob, setText_dob] = useState("Date Of Birth");
  const [text_merital_status, setText_merital_status] =
    useState("Marital Status");
  const [text_status_maried, setText_status_maried] = useState("Married");
  const [text_status_single, setText_status_single] = useState("Single");
  const [text_reportingTo, setText_ReportingTo] = useState("Reporting To");
  const [text_ExpenseApprove, setText_ExpenseApprove] =
    useState("Expense Approver");
  const [text_TimesheetApprove, setText_TimesheetApprove] =
    useState("TimeSheet Approver");
  const [text_VacationApprove, setText_VacationApprove] =
    useState("Vacation Approver");
  const [text_PurchaseApprove, setText_PurchaseApprove] =
    useState("Purchase Approver");
  const [text_performanceAppraiser, setText_PerformanceAppraiser] = useState(
    "Performance Appraiser"
  );
  const [text_currency, setText_currency] = useState("Select Currency");
  const [text_Amount, setText_Amount] = useState("Amount");
  const [text_employee, setText_employee] = useState("Employee");
  const [text_role_admin, setText_role_admin] = useState("Admin");
  const [text_role_superadmin, setText_role_superadmin] =
    useState("Super Admin");
  const [text_salary_type, setText_salary_type] = useState("Salary Type");
  const [title_salary_breakup, setTitle_salary_breakup] =
    useState("Salary Breakup");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_personal_email, setText_personal_email] =
    useState("Personal Email");
  const [text_company_email, setText_company_email] = useState("Company Email");
  const [addpro_picture, setAddpro_picture] = useState(
    "Upload Profile Picture"
  );
  const [text_upload, settext_upload] = useState("Upload");
  const [text_fileName, settext_fileName] = useState("File Name");
  const [text_customizemonthsalary, setText_customizemonthsalary] = useState(
    "Customize Monthly Salary"
  );
  const [text_earning, setText_earning] = useState("Earning");
  const [text_grosssalary, setText_grosssalary] = useState("Gross Salary");
  const [text_totaldeduction, setText_totaldeduction] =
    useState("Total deduction");
  const [text_salarybreakuptemp, setText_salarybreakuptemp] = useState(
    "Select Salary Breakup Template"
  );
  const [text_createtemp, setText_createtemp] = useState("Create New Template");
  const [title_allowance, setTitle_allowance] = useState("Allowance");
  const [title_deduction, setTitle_deduction] = useState("Deduction");
  const [text_tax, setText_tax] = useState("Tax");
  const [text_addchoosefile, settext_addchoosefile] = useState("choose file");
  const [appraisal_duedate, setAppraisal_duedate] =
    useState("Appraisal Due Date");
  const [text_telephone, setText_telephone] = useState(
    "Company Telephone Number"
  );
  const [text_Emerangecy_no, setText_Emerangecy_no] = useState(
    "Emergency Contact Number"
  );
  const [text_phone, setText_phone] = useState("Personal Phone Number");
  const [text_bi_weekly2, setText_bi_weekly2] = useState(
    "Bi Weekly(Total Pay Check Every Week)"
  );
  const [settext_bi_monthly2, setText_bi_monthly2] = useState(
    "Bi Monthly(Pay Check Twice a Month)"
  );
  const [text_salarystatus, setText_salarystatus] = useState("Salary Status");
  const [text_select, setText_select] = useState("Select");
  const [text_JobStatus, setText_JobStatus] = useState("Job Status");
  const [comp_text_telephone, setComp_text_telephone] = useState(
    "Enter Company Telephone Number"
  );
  const [persnalphoneph_text, setPersnalphoneph_text] = useState(
    "Enter Personal Phone Number"
  );
  const [emergencycontctph_text, setEmergencycontctph_text] = useState(
    "Enter Emergency Contact Number"
  );
  const [text_err_roletype, setText_err_roletype] = useState(
    "Please Select Role Type"
  );
  const [text_err_designation, setText_err_designation] = useState(
    "Please Select Designation"
  );
  const [text_err_salarytype, setText_err_salarytype] = useState(
    "Please Select Salary Type"
  );
  const [profileapprove_text, setProfileapprove_text] = useState(
    "Please Select Profile Approver"
  );
  const [text_err_crypto_currency, setText_err_crypto_currency] = useState(
    "Please Select Currency"
  );
  const [text_err_firstnamev3, setText_err_firstnamev3] = useState(
    "Please Enter First Name"
  );
  const [text_err_lastnamev3, setText_err_lastnamev3] = useState(
    "Please Enter Last Name"
  );
  const [addprofile_approvetext, setAddprofile_approvetext] =
    useState("Profile Approver");
  const [addtds_approvertext, settds_approvertext] = useState("TDS Approver");
  const [addany_test, setAddany_test] = useState("Select Any");
  const [text_statev3, setText_statev3] = useState("Select a State");
  const [text_netsalary, setText_netsalary] = useState("Net Salary");
  const [text_addperemail, setText_addperemail] = useState(
    "Enter Your Personal Email"
  );
  const [text_addcompemail, setText_addcompemail] = useState(
    "Enter Your Company Email"
  );
  const [text_provided_Annualday, setText_provided_Annualday] = useState(
    "Provided Annual Vacation Days"
  );
  const [text_loanapprover, setText_loanapprover] = useState("Loan Approver");
  const [text_effectiveform, setText_effectiveform] = useState(
    "Salary Effective From"
  );
  const [companyemail_val, setCompanyemail_val] = useState(
    "Please Enter Company Email"
  );
  const [enter_valid_email, setEnter_valid_email] = useState(
    "Please Enter Valid Email"
  );
  const [personalemail_val, setPersonalemail_val] = useState(
    "Please Enter Personal Email"
  );
  //new
  const [text_female, setText_female] = useState("Female");
  const [text_male, setText_male] = useState("Male");
  const [text_gender, setText_Gender] = useState("Gender");
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  const [text_pendingver, setText_pendingver] = useState(
    "Pending Verification"
  );
  const [text_resendemail, setText_resendemail] = useState("Resend Email");

  //Language Variables End
  //validation start
  const [errfirstName, setErrFirstName] = useState("");
  const [errlastName, setErrLastName] = useState("");
  const [errEmpEmail, seterrEmpEmail] = useState("");
  const [errCompEmail, seterrCompEmail] = useState("");
  const [errEmpPhone, seterrEmpPhone] = useState("");
  const [telerr, setTelerr] = useState("");
  const [errroletype, setErrroletype] = useState("");
  const [errdesi, setErrdesi] = useState("");
  const [errsalary, setErrSalary] = useState("");
  const [errapprov, setErrapprov] = useState("");
  const [Errcurrency, SetErrcurrency] = useState("");

  const [reportingTo, setReportingTo] = useState("Select");
  console.log("==>>", reportingTo);
  const [reportingTo2, setReportingTo2] = useState("Select");
  const [ShowReportingTwo, setShowReportingTwo] = useState(false);
  const [ExpenseApprove, setExpenseApprove] = useState("Select");
  const [TimesheetApprove, setTimesheetApprove] = useState("Select");
  const [VacationApprove, setVacationApprove] = useState("Select");
  const [PurchaseApprove, setPurchaseApprove] = useState("Select");
  const [performanceAppraiser, setPerformanceAppraiser] = useState("Select");
  const [profileupdateApprovar, setProfileupdateApprovar] = useState("Select");
  const [TDSApprovar, setTDSApprovar] = useState("Select");
  const [loanApprover, setLoanApprover] = useState("Select");
  const [meritalstatus, setMeritalstatus] = useState("Select");
  const [gender, setGender] = useState("Select");
  const [TeleNo, setTeleNo] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [EmrNo, setEmrNo] = useState("");
  let [vacation, setvacation] = useState(
    sessionStorage.getItem(GlobalConstants.session_current_org_vacationDays)
  );
  const CountryFromCompany = sessionStorage.getItem("cmp_country");
  let [op_mode, setOp_mode] = useState("insert");
  //Emp Details👇
  const [empName, setEmpName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [empAddress1, setEmpAddress1] = useState("");
  const [empAddress2, setEmpAddress2] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPersonalEmail, setempPersonalEmail] = useState("");
  //Emp Office Details👇
  const [Emp2IdNum, setEmp2IdNum] = useState("");
  const [roleType, setRoleType] = useState("employee");
  const [empDesignation, setEmpDesignation] = useState("Select");
  const [empJobTime, setEmpJobTime] = useState("fulltime");
  const [empSalaryStatus, setEmpSalarySatus] = useState("salaried");
  const [salaryType, setSalaryType] = useState("monthly");
  const [emptaxid, setEmptaxid] = useState("");
  //Emp Bank Details👇
  const [bankName, setBankName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifscCode, setIFSCcode] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [abaCode, setABAcode] = useState("");
  const [ibanCode, setIBANcode] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [Selectedappraisalduedate, setSelectedappraisalduedate] = useState(
    new Date()
  );
  const [dob, setdob] = useState(new Date());
  const [Country, setCountry] = useState("India");
  const [CountryCode, setCountryCode] = useState("IN");
  const [currencySymbol, setCurrencySymbol] = useState("INR");
  // console.log(currencySymbol);
  const [empsalary, setEmpsalary] = useState("");
  const [empGrossSalary, setEmpGrossSalary] = useState(0);
  const [empstate, setEmpState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [sendmorambaplanlist, setsendmorambaplanlist] = useState([]);
  const [salarybreakuplist, setSalarybreakuplist] = useState([]);

  const location = useLocation();
  const getEMPSalaryBreakupValue = (org_id, emp_id) => {
    var empid = sessionStorage.getItem("currentempid");
    var apiUrl =
      GlobalConstants.Cdomain +
      "0/API/moramba/v3/getdata/collectiondata?collection_name=salarydetails&search_key=employeeId&search_value=" +
      empid +
      "&isbson_id=true";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var res = response.data;
        var list = res.data[0].breakuplist;
        var tempList = [];
        list.map((itm, i) => {
          var d = {
            breakup_id: itm.breakup_id.$oid,
            category: itm.category,
            amount: itm.val.$numberInt,
          };
          tempList.push(d);
        });
        setSalarybreakuplist(tempList);
        setBreakuplist(tempList);
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
  useEffect(() => {
    if (location.pathname === "/addstaff/edit") {
      setTitle_ddd_employee("Edit Employee");
    }
  }, [location, location?.pathname]);

  useEffect(() => {
    if (location.pathname === "/addstaff/edit") {
      //type="update";
      setOp_mode("update");

      var empid = localStorage.getItem("editEmpId");
      var org_id = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      getEMPSalaryBreakupValue(org_id, empid);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/addstaff/edit") {
      setOp_mode("update");

      var empid = sessionStorage.getItem("currentempid");
      setEmpData(empid);
    } else {
      setOp_mode("insert");
    }
  }, []);
  const setEmpData = (empid) => {
    const dataToBeSent = {
      collection_name: "employee",
      search_key: "_id",
      search_value: empid,
    };

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/collectiondata?collection_name=" +
      dataToBeSent.collection_name +
      "&search_key=" +
      dataToBeSent.search_key +
      "&search_value=" +
      dataToBeSent.search_value +
      "&isbson_id=true";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var res = response.data;
        var FinalEditData = JSON.parse(res.data);
        // console.log(FinalEditData[0]);
        var nam =
          FinalEditData[0].fullName === undefined
            ? ""
            : FinalEditData[0].fullName; //middlename
        setEmpName(nam);
        // new added in list
        var Fnam =
          FinalEditData[0].firstName === undefined
            ? ""
            : FinalEditData[0].firstName;
        setFirstName(Fnam);
        var Lnam =
          FinalEditData[0].lastName === undefined
            ? ""
            : FinalEditData[0].lastName;
        setLastName(Lnam);
        var Etnum =
          FinalEditData[0].emargencyNumber === undefined
            ? ""
            : FinalEditData[0].emargencyNumber;
        setEmrNo(Etnum);
        var state1 =
          FinalEditData[0].state === undefined ? "" : FinalEditData[0].state;
        setEmpState(state1);
        var zipcd =
          FinalEditData[0].zipCode === undefined
            ? ""
            : FinalEditData[0].zipCode;
        setZipCode(zipcd);
        var empidnum =
          FinalEditData[0].employeeIdNumber === undefined
            ? ""
            : FinalEditData[0].employeeIdNumber;
        setEmp2IdNum(empidnum);
        var tnum =
          FinalEditData[0].telephoneNumber === undefined
            ? ""
            : FinalEditData[0].telephoneNumber;
        setTeleNo(tnum);
        var empadr2 =
          FinalEditData[0].empAddress2 === undefined
            ? ""
            : FinalEditData[0].empAddress2;
        setEmpAddress2(empadr2);
        var reportingto =
          FinalEditData[0].reportingTo1 === undefined
            ? ""
            : FinalEditData[0].reportingTo1;
        setReportingTo(reportingto);
        var reporting2 =
          FinalEditData[0].reportingTo2 === undefined
            ? ""
            : FinalEditData[0].reportingTo2;
        setReportingTo2(reporting2);
        var expApprover =
          FinalEditData[0].expenseApprover === undefined
            ? ""
            : FinalEditData[0].expenseApprover;
        setExpenseApprove(expApprover);
        var tmsheet =
          FinalEditData[0].timesheetApprover === undefined
            ? ""
            : FinalEditData[0].timesheetApprover;
        setTimesheetApprove(tmsheet);
        var vcAprove =
          FinalEditData[0].vacationApprover === undefined
            ? ""
            : FinalEditData[0].vacationApprover;
        setVacationApprove(vcAprove);
        var purApprive =
          FinalEditData[0].purchaseApprover === undefined
            ? ""
            : FinalEditData[0].purchaseApprover;
        setPurchaseApprove(purApprive);
        var perAppver =
          FinalEditData[0].performanceAppraiser === undefined
            ? ""
            : FinalEditData[0].performanceAppraiser;
        setPerformanceAppraiser(perAppver);

        var profileApprover =
          FinalEditData[0].profileupdateApprovar === undefined
            ? ""
            : FinalEditData[0].profileupdateApprovar;
        setProfileupdateApprovar(profileApprover);
        var loanApprovar =
          FinalEditData[0].loanApprovar === undefined
            ? ""
            : FinalEditData[0].loanApprovar;
        setLoanApprover(loanApprovar);
        var mrtstatus =
          FinalEditData[0].meritalStatus === undefined
            ? ""
            : FinalEditData[0].meritalStatus;
        setMeritalstatus(mrtstatus);
        var DOB =
          FinalEditData[0].empdob === undefined
            ? "Jan 01,2022"
            : FinalEditData[0].empdob;

        var NewDob = dayjs(DOB).format("MM DD,YYYY");
        setdob(new Date(NewDob));
        var join =
          FinalEditData[0].joinDate === undefined
            ? "Jan 01,20222"
            : FinalEditData[0].joinDate;
        var NewJoin = dayjs(join).format("MM DD,YYYY");

        setSelectDate(new Date(NewJoin));

        //end
        var countrysel =
          FinalEditData[0].empCountry === undefined
            ? ""
            : FinalEditData[0].empCountry;
        setCountry(countrysel);
        var key = Object.keys(countriesList).find(
          (key) => countriesList[key] === countrysel
        );
        setCountryCode(key);
        var crcy =
          FinalEditData[0].empCurrency === undefined
            ? ""
            : FinalEditData[0].empCurrency;
        setCurrencySymbol(crcy);
        var saltype =
          FinalEditData[0].empSalaryPayType === undefined
            ? ""
            : FinalEditData[0].empSalaryPayType;
        setSalaryType(saltype);
        var SalaryTempID =
          FinalEditData[0].salaryTemplateid === undefined
            ? ""
            : FinalEditData[0].salaryTemplateid;
        setselectedSalaryTemp(SalaryTempID);
        var empsalst =
          FinalEditData[0].emptype === undefined
            ? ""
            : FinalEditData[0].emptype;
        setEmpSalarySatus(empsalst);
        var worktype =
          FinalEditData[0].empWorkType === undefined
            ? ""
            : FinalEditData[0].empWorkType;
        setEmpJobTime(worktype);
        var tdsApprover =
          FinalEditData[0].tdsApprover === undefined
            ? ""
            : FinalEditData[0].tdsApprover;
        setTDSApprovar(tdsApprover);
        var add =
          FinalEditData[0].empAddress === undefined
            ? ""
            : FinalEditData[0].empAddress;
        setEmpAddress1(add);
        var email =
          FinalEditData[0].email === undefined ? "" : FinalEditData[0].email;
        setEmpEmail(email);
        var email2 =
          FinalEditData[0].email2 === undefined ? "" : FinalEditData[0].email2;
        setempPersonalEmail(email2);
        var phone =
          FinalEditData[0].phoneNo === undefined
            ? ""
            : FinalEditData[0].phoneNo;
        setPhoneNo(phone);
        var bank =
          FinalEditData[0].bankName === undefined
            ? ""
            : FinalEditData[0].bankName;
        setBankName(bank);
        var acc =
          FinalEditData[0].accountNumber === undefined
            ? ""
            : FinalEditData[0].accountNumber;
        setAccNumber(acc);
        var ifsc =
          FinalEditData[0].IFSCNumber === undefined
            ? ""
            : FinalEditData[0].IFSCNumber;
        setIFSCcode(ifsc);
        var swift =
          FinalEditData[0].swiftCode === undefined
            ? ""
            : FinalEditData[0].swiftCode;
        setSwiftCode(swift);
        var aba =
          FinalEditData[0].ABANNumber === undefined
            ? ""
            : FinalEditData[0].ABANNumber;
        setABAcode(aba);
        var iban =
          FinalEditData[0].IBANNumber === undefined
            ? ""
            : FinalEditData[0].IBANNumber;
        setIBANcode(iban);
        var taxid =
          FinalEditData[0].emptaxid === undefined
            ? ""
            : FinalEditData[0].emptaxid;
        setEmptaxid(taxid);
        var role =
          FinalEditData[0].role === undefined ? "" : FinalEditData[0].role;
        setRoleType(role);
        var des =
          FinalEditData[0].designation === undefined ||
          FinalEditData[0].designation === "Employee"
            ? "Employee"
            : FinalEditData[0].designation;
        setEmpDesignation(des);
        var vac =
          FinalEditData[0].vacationDays === undefined
            ? ""
            : FinalEditData[0].vacationDays;
        setvacation(vac);
        var sal =
          FinalEditData[0].empSalaryAmount === undefined
            ? ""
            : FinalEditData[0].empSalaryAmount;
        setNetTotal(sal);
        setGrossTotal(salGross);
        setEmpsalary(sal);
        var salGross =
          FinalEditData[0].empGrossSalaryAmount === undefined
            ? 0
            : FinalEditData[0].empGrossSalaryAmount;
        setEmpGrossSalary(salGross);

        //SalaryBreakupTemplate
        var salaryArray = FinalEditData[0].salaryinfo;

        editSalaryInfo(salaryArray);
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

  const editSalaryInfo = (salary) => {
    if (salary !== undefined && salary.length !== 0) {
      var current_salary = salary[salary.length - 1];
      setSalaryDataMain(current_salary);

      setSelectedAllowanceList(current_salary.allowancelist);
      setSelectedDeductionList(current_salary.deductionlist);
      setSelectedMandateList(current_salary.mandetorylist);
      setSelectedTaxList(current_salary.taxlist);
      setTimeout(function () {
        mainCalculation(
          current_salary.mandetorylist,
          current_salary.allowancelist,
          current_salary.deductionlist,
          current_salary.taxlist
        );
      }, 500);

      setTimeout(function () {
        saveSalaryData(
          current_salary.mandetorylist,
          current_salary.allowancelist,
          current_salary.deductionlist,
          current_salary.taxlist,
          true
        );
      }, 1000);
      setTimeout(function () {
        console.log(getSalarySavedData());
      }, 2000);
    }
  };

  const handleClickOpenimage = () => {
    setPopupprofile(!popupprofile);
  };
  const handleManageSalary = () => {
    //set value here
    //refreshview();
    setManageSalaryPopup(!ManageSalaryPopup);
  };
  const closeManageSalaryPopup = () => {
    setManageSalaryPopup(false);
  };
  const handleFileInput = ($event) => {
    var file = $event.target.files[0];
    if (file.size <= 81920) {
      var fileToUpload = file;
      var fileName = file.name;
      var fileSize = file.size / 1000 + " KB";
      var fileType = file.type;

      setFileToUpload(fileToUpload);
      setfileNameUpload(fileName);
      setfileSizeUpload(fileSize);
      setfileTypeUpload(fileType);
      setFile(URL.createObjectURL($event.target.files[0]));
    } else {
      alert("MAX FILE SIZE ALLOWED IS 80Kb");
      setFileToUpload("");
      setfileNameUpload("");
      setfileSizeUpload("");
      setfileTypeUpload("");
      setFile("");
    }
  };
  const uploadFileToServer = () => {
    if (
      fileToUpload === undefined ||
      fileToUpload === null ||
      fileToUpload === ""
    ) {
      warnToast("Please Select File First");
      return;
    }
    var apiUrl = GlobalConstants.Cdomain + "/API/moramba/v3/upload/file";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const formData = new FormData();
    formData.append("document", fileToUpload);
    axios
      .post(apiUrl, formData, headerConfig)
      .then(function (response) {
        var res = response.data.data;
        console.log(res);

        setimageUrl(res.path);
        setimageKey(res.filekey);
        setisNewimageUrl(true);
        setisNewimageKey(true);
        if (res.path !== "") {
          const dateUTC = GetUTCNow();
          const gmtDay = dayjs(dateUTC).format("YYYY-MM-DD");
          const ImageDetails = {
            docId: docId,
            filekey: res.filekey,
            employeeId: sessionStorage.getItem(
              GlobalConstants.session_current_emp_id
            ),
            _orgId: sessionStorage.getItem(
              GlobalConstants.session_current_company_id
            ),
            orgId: sessionStorage.getItem(
              GlobalConstants.session_current_company_id
            ),
            _partition: GlobalConstants._partition,
            image: fileNameUpload,
            imagesize: fileSizeUpload,
            status: "status",
            imagepath: res.path, /// clear
            imagename: fileNameUpload,
            imageoriginalname: fileNameUpload,
            active: true,
            imageformat: fileTypeUpload,
            date: gmtDay,
            latitude: 0,
            longitude: 0,
            createdby: "createdby",
            remark: "remark",
          };
          setPopupprofile(false);
          successToast("Photo Upload Successfully");
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

  const cancelSalaryData = () => {
    if (saveFlag === 1) {
      var MLS = [];
      for (var i = 0; i < selectedMandetS.length; i++) {
        var d = {
          key: selectedMandetS[i].key,
          name: selectedMandetS[i].name,
          desc: selectedMandetS[i].desc,
          valdata: selectedMandetS[i].valdataS,
          save: true,
        };
        MLS.push(d);
      }

      var ALS = [];
      for (var i = 0; i < selectedAllowanceS.length; i++) {
        var d = {
          key: selectedAllowanceS[i].key,
          name: selectedAllowanceS[i].name,
          desc: selectedAllowanceS[i].desc,
          isDisable:
            selectedAllowanceS[i].isDisable === undefined
              ? true
              : selectedAllowanceS[i].isDisable,
          valdata:
            selectedAllowanceS[i].valdataS === undefined
              ? ""
              : selectedAllowanceS[i].valdataS,
          save: true,
        };
        ALS.push(d);
      }
      var DLS = [];
      for (var i = 0; i < selectedDeductionS.length; i++) {
        var d = {
          key: selectedDeductionS[i].key,
          name: selectedDeductionS[i].name,
          desc: selectedDeductionS[i].desc,
          isDisable:
            selectedDeductionS[i].isDisable === undefined
              ? true
              : selectedDeductionS[i].isDisable,
          valdata:
            selectedDeductionS[i].valdataS === undefined
              ? ""
              : selectedDeductionS[i].valdataS,
          save: true,
        };
        DLS.push(d);
      }
      var TLS = [];
      for (var i = 0; i < selectedTaxS.length; i++) {
        var d = {
          key: selectedTaxS[i].key,
          name: selectedTaxS[i].name,
          desc: selectedTaxS[i].desc,
          isDisable:
            selectedTaxS[i].isDisable === undefined
              ? true
              : selectedTaxS[i].isDisable,
          valdata:
            selectedTaxS[i].valdataS === undefined
              ? ""
              : selectedTaxS[i].valdataS,
          save: true,
        };
        TLS.push(d);
      }

      setSelectedAllowanceList(ALS);
      setSelectedDeductionList(DLS);
      setSelectedTaxList(TLS);
      setSelectedMandateList(MLS);
      setTimeout(function () {
        mainCalculation(MLS, ALS, DLS, TLS);
      }, 1000);
      setManageSalaryPopup(false);
    }
    closeManageSalaryPopup();
  };
  const refreshview = () => {
    if (saveFlag === 1) {
      var MLS = [];
      for (var i = 0; i < selectedMandetS.length; i++) {
        var d = {
          key: selectedMandetS[i].key,
          name: selectedMandetS[i].name,
          desc: selectedMandetS[i].desc,
          valdata: selectedMandetS[i].valdataS,
          save: true,
        };
        MLS.push(d);
      }

      var ALS = [];
      for (var i = 0; i < selectedAllowanceS.length; i++) {
        var d = {
          key: selectedAllowanceS[i].key,
          name: selectedAllowanceS[i].name,
          desc: selectedAllowanceS[i].desc,
          isDisable:
            selectedAllowanceS[i].isDisable === undefined
              ? true
              : selectedAllowanceS[i].isDisable,
          valdata:
            selectedAllowanceS[i].valdataS === undefined
              ? ""
              : selectedAllowanceS[i].valdataS,
          save: true,
        };
        ALS.push(d);
      }
      var DLS = [];
      for (var i = 0; i < selectedDeductionS.length; i++) {
        var d = {
          key: selectedDeductionS[i].key,
          name: selectedDeductionS[i].name,
          desc: selectedDeductionS[i].desc,
          isDisable:
            selectedDeductionS[i].isDisable === undefined
              ? true
              : selectedDeductionS[i].isDisable,
          valdata:
            selectedDeductionS[i].valdataS === undefined
              ? ""
              : selectedDeductionS[i].valdataS,
          save: true,
        };
        DLS.push(d);
      }
      var TLS = [];
      for (var i = 0; i < selectedTaxS.length; i++) {
        var d = {
          key: selectedTaxS[i].key,
          name: selectedTaxS[i].name,
          desc: selectedTaxS[i].desc,
          isDisable:
            selectedTaxS[i].isDisable === undefined
              ? true
              : selectedTaxS[i].isDisable,
          valdata:
            selectedTaxS[i].valdataS === undefined
              ? ""
              : selectedTaxS[i].valdataS,
          save: true,
        };
        TLS.push(d);
      }

      setSelectedAllowanceList(ALS);
      setSelectedDeductionList(DLS);
      setSelectedTaxList(TLS);
      setSelectedMandateList(MLS);
      setTimeout(function () {
        mainCalculation(MLS, ALS, DLS, TLS);
      }, 1000);
      //setManageSalaryPopup(false);
    }
  };

  const saveSalaryData = (mlA, alA, dlA, tlA, edit = false) => {
    var MLS = [];
    for (var i = 0; i < mlA.length; i++) {
      var d = {
        key: mlA[i].key,
        name: mlA[i].name,
        desc: mlA[i].desc,
        valdataS: mlA[i].valdata,
        save: true,
        auto: true,
      };
      MLS.push(d);
    }

    var ALS = [];
    for (var i = 0; i < alA.length; i++) {
      var d = {
        key: alA[i].key,
        name: alA[i].name,
        desc: alA[i].desc,
        isDisable: alA[i].isDisable === undefined ? true : alA[i].isDisable,
        valdataS: alA[i].valdata === undefined ? "" : alA[i].valdata,
        save: true,
        auto: alA[i].auto === undefined ? false : alA[i].auto,
      };
      ALS.push(d);
    }
    var DLS = [];
    for (var i = 0; i < dlA.length; i++) {
      var d = {
        key: dlA[i].key,
        name: dlA[i].name,
        desc: dlA[i].desc,
        isDisable: dlA[i].isDisable === undefined ? true : dlA[i].isDisable,
        valdataS: dlA[i].valdata === undefined ? "" : dlA[i].valdata,
        save: true,
        auto: dlA[i].auto === undefined ? false : dlA[i].auto,
      };
      DLS.push(d);
    }
    var TLS = [];
    for (var i = 0; i < tlA.length; i++) {
      var d = {
        key: tlA[i].key,
        name: tlA[i].name,
        desc: tlA[i].desc,
        isDisable: tlA[i].isDisable === undefined ? true : tlA[i].isDisable,
        valdataS: tlA[i].valdata === undefined ? "" : tlA[i].valdata,
        save: true,
        auto: tlA[i].auto === undefined ? false : tlA[i].auto,
      };
      TLS.push(d);
    }
    console.log(MLS + ALS + DLS + TLS);

    setSelectedMandetS(MLS);

    setSelectedAllowanceS(ALS);
    setSelectedDeductionS(DLS);
    setSelectedTaxS(TLS);
    if (edit) {
    } else {
      setEmpGrossSalary(grossTotal);
      setEmpsalary(netTotal);
    }
    setSelectedNetTotal(netTotal);

    setSelectedGrossTotal(grossTotal);
    setSelectedSumMandate(sumMandate);
    setSelectedSumAllowane(sumAllowane);
    setSelectedSumDeduction(sumDeduction);
    setSelectedSumTax(sumTax);
    setSaveFlag(1);
    setManageSalaryPopup(false);
  };

  const deductionFormChange = (index, event) => {
    let data = [...selectedDeductionList];
    data[index]["valdata"] = event.target.value;
    setSelectedDeductionList(data);
    //setSelectedTaxList([]);
    setTimeout(function () {
      mainCalculation();
    }, 1000);
  };
  const getPT = async (apiUrl, body) => {
    let valData = 0;
    const response = await axios.post(apiUrl, body);
    if (response.status == 200) {
      let resData = response.data;
      if (resData.status) {
        let pt = resData.data.pt;
        valData = pt;
      } else {
        valData = 0;
      }
    }
    return valData;
  };
  const taxCheckChange = (index, event, tax) => {
    var isChecked = event.target.checked;
    var valData = "";
    var isDisable = !isChecked;

    if (isChecked) {
      if (tax.toString().toLowerCase() === "uaetax") {
        var grosssalary = parseFloat(
          $("#uaegrosssalary").val() === undefined
            ? 0
            : isNaN($("#uaegrosssalary").val())
            ? 0
            : $("#uaegrosssalary").val()
        );
        if (isNaN(grosssalary)) {
          // alertify.
          alert("Enter grosssalary value");
          return;
        }
        valData = grosssalary * 0.05;
      }
      if (tax.toString().toLowerCase() === "pt") {
        var basic = parseFloat(
          $("#basic").val() === undefined
            ? 0
            : isNaN($("#basic").val())
            ? 0
            : $("#basic").val()
        );
        var dearness = parseFloat(
          $("#dearness").val() === undefined
            ? 0
            : isNaN($("#dearness").val())
            ? 0
            : $("#dearness").val()
        );
        console.log(basic);
        console.log(dearness);
        if (isNaN(basic)) {
          // alertify.
          alert("Enter Basic value");
          return;
        }
        if (isNaN(dearness)) {
          // alertify.
          alert("Enter dearness value");
          return;
        }

        //d = {key:"hra",valdata:hra,isDisable:true,desc:vDesc,name:vName};

        valData = 0;
        // if(netTotal>10000 && empstate=="Maharashtra")
        // {
        //   valData = 200;
        // }
        // if(netTotal>=7501 && netTotal<=10000 && empstate=="Maharashtra")
        // {
        //   valData = 175;
        // }

        // if(netTotal>15000 &&  empstate=="Karnataka")
        // {
        //   valData = 200;
        // }
        // if(netTotal>12000 &&  empstate=="Gujarat")
        // {
        //   valData = 200;
        // }
        let b = { country: "IND", state: empstate, netsalary: netTotal };
        var apiUrl =
          GlobalConstants.Cdomain +
          "/API/moramba/v4/calculator/calculate?type=pt";
        getPT(apiUrl, b).then((r) => {
          valData = r;
          let data = [...selectedTaxList];
          data[index]["valdata"] = valData;

          data[index]["isDisable"] = isDisable;
          setSelectedTaxList(data);
          setTimeout(function () {
            mainCalculation();
          }, 1000);
        });
      }
    }
    let data = [...selectedTaxList];
    data[index]["valdata"] = valData;

    data[index]["isDisable"] = isDisable;
    setSelectedTaxList(data);
    setTimeout(function () {
      mainCalculation();
    }, 1000);
  };

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  const allowanceFormChange = (index, event) => {
    let data = [...selectedAllowanceList];
    data[index]["valdata"] = event.target.value;
    setSelectedAllowanceList(data);
    setTimeout(function () {
      mainCalculation();
    }, 1000);
  };
  const allowanceCheckChange = (index, event, allowance) => {
    var isChecked = event.target.checked;
    var valData = "";
    var isDisable = !isChecked;
    if (isChecked) {
      if (allowance.toString().toLowerCase() === "hra") {
        var basic = parseFloat(
          $("#basic").val() === undefined
            ? 0
            : isNaN($("#basic").val())
            ? 0
            : $("#basic").val()
        );
        var dearness = parseFloat(
          $("#dearness").val() === undefined
            ? 0
            : isNaN($("#dearness").val())
            ? 0
            : $("#dearness").val()
        );
        console.log(basic);
        console.log(dearness);
        if (isNaN(basic)) {
          alert("Enter Basic value");
          return;
        }
        if (isNaN(dearness)) {
          alert("Enter dearness value");
          return;
        }
        var hra = (basic + dearness) * 0.4;
        console.log(hra);
        valData = hra;
      }
    }
    let data = [...selectedAllowanceList];
    data[index]["valdata"] = valData;

    data[index]["isDisable"] = isDisable;

    setSelectedAllowanceList(data);
    setTimeout(function () {
      mainCalculation(null, data, null, null);
    }, 1000);
  };

  const deductionCheckChange = (index, event, deduction) => {
    var isChecked = event.target.checked;
    var valData = "";
    var isDisable = !isChecked;

    if (isChecked) {
      if (deduction.toString().toLowerCase() === "pf") {
        if (empstate == "Maharashtra") {
          var basic = parseFloat(
            $("#basic").val() === undefined
              ? 0
              : isNaN($("#basic").val())
              ? 0
              : $("#basic").val()
          );
          var dearness = parseFloat(
            $("#dearness").val() === undefined
              ? 0
              : isNaN($("#dearness").val())
              ? 0
              : $("#dearness").val()
          );
          console.log(basic);
          console.log(dearness);
          if (isNaN(basic)) {
            // alertify.
            alert("Enter Basic value");
            return;
          }
          if (isNaN(dearness)) {
            alert("Enter dearness value");
            return;
          }
          valData = basic * 0.12;
        } else if (empstate == "Gujrat") {
          var basic = parseFloat(
            $("#basic").val() === undefined
              ? 0
              : isNaN($("#basic").val())
              ? 0
              : $("#basic").val()
          );
          var dearness = parseFloat(
            $("#dearness").val() === undefined
              ? 0
              : isNaN($("#dearness").val())
              ? 0
              : $("#dearness").val()
          );
          console.log(basic);
          console.log(dearness);
          if (isNaN(basic)) {
            // alertify.
            alert("Enter Basic value");
            return;
          }
          if (isNaN(dearness)) {
            alert("Enter dearness value");
            return;
          }
          valData = basic * 0.12;
        } else if (empstate == "Karnakta") {
          var basic = parseFloat(
            $("#basic").val() === undefined
              ? 0
              : isNaN($("#basic").val())
              ? 0
              : $("#basic").val()
          );
          var dearness = parseFloat(
            $("#dearness").val() === undefined
              ? 0
              : isNaN($("#dearness").val())
              ? 0
              : $("#dearness").val()
          );
          console.log(basic);
          console.log(dearness);
          if (isNaN(basic)) {
            // alertify.
            alert("Enter Basic value");
            return;
          }
          if (isNaN(dearness)) {
            alert("Enter dearness value");
            return;
          }
          valData = basic * 0.12;
        }
      }
    }
    let data = [...selectedDeductionList];
    data[index]["valdata"] = valData;

    data[index]["isDisable"] = isDisable;
    setSelectedDeductionList(data);
    setTimeout(function () {
      mainCalculation();
    }, 1000);
  };

  const mainCalculation = (
    MandateList = null,
    AllowanceList = null,
    DeductionList = null,
    TaxList = null
  ) => {
    var mandateTotal = 0;
    var allowanceTotal = 0;
    var deductionTotal = 0;
    var taxTotal = 0;
    MandateList = MandateList === null ? selectedMandateList : MandateList;
    AllowanceList =
      AllowanceList === null ? selectedAllowanceList : AllowanceList;
    DeductionList =
      DeductionList === null ? selectedDeductionList : DeductionList;
    TaxList = TaxList === null ? selectedTaxList : TaxList;
    mandateTotal = MandateList.reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata === undefined || valdata === "" || valdata === null
            ? "0"
            : valdata
        ),
      0
    );
    allowanceTotal = AllowanceList.reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata === undefined || valdata === "" || valdata === null
            ? "0"
            : valdata
        ),
      0
    );
    deductionTotal = DeductionList.reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata === undefined || valdata === "" || valdata === null
            ? "0"
            : valdata
        ),
      0
    );
    taxTotal = TaxList.reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata === undefined || valdata === "" || valdata === null
            ? "0"
            : valdata
        ),
      0
    );
    console.log(
      mandateTotal +
        "=" +
        allowanceTotal +
        "=" +
        deductionTotal +
        "=" +
        taxTotal
    );
    var GrossTotal = mandateTotal + allowanceTotal;
    var NetTotal = mandateTotal + allowanceTotal - deductionTotal - taxTotal;
    setGrossTotal(GrossTotal);
    setNetTotal(NetTotal);
    setSumMandate(mandateTotal);
    setSumAllowane(allowanceTotal);
    setSumDeduction(deductionTotal);
    setSumTax(taxTotal);
  };
  const mandateFormChange = (index, event) => {
    let data = [...selectedMandateList];
    data[index]["valdata"] = event.target.value;
    setSelectedMandateList(data);
    setTimeout(function () {
      mainCalculation(data, null, null, null);
    }, 1000);
  };
  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
  };
  const changeSalaryTemplate = (countryName, state) => {
    //alert(countryName);
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/salarybreakuptemplate?type=select";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var b = {
      _id: "",
      templatename: "NA",
      isActive: true,
      effectiveDate: "NA",
      _partition: GlobalConstants._partition,
      _empId: "NA",
      _orgId: sessionStorage.getItem("_compId"),
      level: "org",
      country: countryName.toLowerCase(),
      state: state.toLowerCase(),
      mandetorylist: ["NA"],
      allowancelist: ["NA"],
      deductionlist: ["NA"],
      taxlist: ["NA"],
    };

    axios
      .post(apiUrl, b, headerConfig)
      .then(function (response) {
        var res = response.data;
        if (res.data.length > 0) {
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
  const taxFormChange = (index, event) => {
    let data = [...selectedTaxList];
    data[index]["valdata"] = event.target.value;
    setSelectedTaxList(data);
    setTimeout(function () {
      mainCalculation();
    }, 1000);
  };

  const FilteredCurrency = CountryCodewithEmoji.filter(
    (item) =>
      JSON.stringify(item.abbreviation)
        .toLowerCase()
        .indexOf(CountryCode.toLowerCase()) !== -1
  );

  const [arraySalaryDetails, setArraySalaryDetails] = useState([]);
  const [breakuplist, setBreakuplist] = useState([]);
  const [basicSalary, setBasicSalary] = useState("");

  const addSalaryBreakupVal = (val, item) => {
    var list = arraySalaryDetails.filter(d);
    var list2 = breakuplist.filter(d);
    function d(it) {
      return it.breakup_id !== item.breakup_id;
    }
    list.push({
      breakup_id: item.breakup_id,
      category: item.category,
      val: val,
    });
    list2.push({
      breakup_id: item.breakup_id,
      category: item.category,
      val: val,
      amount: val,
    });
    setArraySalaryDetails(list);
    setBreakuplist(list2);
  };
  //validation
  const AddStaffHandler = () => {
    let AddStaffValidation = true;

    if (firstName === "") {
      AddStaffValidation = false;
      setErrFirstName(<>*{text_err_firstnamev3}!</>);
    }
    if (lastName === "") {
      AddStaffValidation = false;
      setErrLastName(<>*{text_err_lastnamev3}!</>);
    }
    if (!EMAIL_REGEX.test(empPersonalEmail) === true) {
      AddStaffValidation = false;
      if (empPersonalEmail === "") {
        AddStaffValidation = false;
        seterrEmpEmail(<>*{personalemail_val}!</>);
      } else {
        seterrEmpEmail(<>*{enter_valid_email}!</>);
      }
    }
    if (!EMAIL_REGEX.test(empEmail) === true) {
      AddStaffValidation = false;
      if (empEmail === "") {
        AddStaffValidation = false;
        seterrCompEmail(<>*{companyemail_val}!</>);
      } else {
        seterrCompEmail(<>*{enter_valid_email}!</>);
      }
    }
    if (roleType === "") {
      AddStaffValidation = false;
      setErrroletype(<>*{text_err_roletype}!</>);
    }
    // if (empDesignation === "Select") {
    //   AddStaffValidation = false;
    //   setErrdesi(<>*{text_err_designation}!</>);
    // }
    if (salaryType === "") {
      AddStaffValidation = false;
      setErrSalary(<>*{text_err_salarytype}!</>);
    }
    // if (profileupdateApprovar === "Select") {
    //   AddStaffValidation = false;
    //   setErrapprov(<>*{profileapprove_text}!</>);
    // }
    if (currencySymbol === "") {
      AddStaffValidation = false;
      SetErrcurrency(<>*{text_err_crypto_currency}!</>);
    }
    return AddStaffValidation;
  };
  const AddEmployeeDetails = () => {
    if (AddStaffHandler()) {
      console.log(gender);
      var type = op_mode;
      var _compId = sessionStorage.getItem("_compId");

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/employee?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      var _id = "";
      if (type === "insert") {
        _id = "";
      } else {
        _id = empIdForUpdate;
        // console.log(_id);
      }
      var ProjectDateTemp = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      };
      var projectDate = new Date().toISOString().substring(0, 10);
      projectDate =
        ProjectDateTemp.year +
        "-" +
        ProjectDateTemp.month +
        "-" +
        ProjectDateTemp.day;
      var projectDateUTC = dayjs.utc(
        dayjs(
          projectDate + " " + GlobalConstants.empDefaultShiftStartTime,
          "YYYY-MM-DD HH:mm:ss"
        )
      );

      const body = {
        _id: _id,
        _orgId: sessionStorage.getItem("_compId"),
        orgId: sessionStorage.getItem("_compId"),
        _partition: GlobalConstants._partition,
        authenticateUser: sessionStorage.getItem("username"),
        createdby: sessionStorage.getItem("username"),
        createdon: projectDateUTC.format("YYYY-MM-DD"),
        designation: empDesignation === "Select" ? "Employee" : empDesignation,
        email: empEmail === "" ? "test@gmail.com" : empEmail,
        email2: empPersonalEmail === "" ? "NA" : empPersonalEmail,
        empAddress: empAddress1 === "" ? "NA" : empAddress1,
        empCountry: Country === "" ? "United States" : Country,
        empCurrency: currencySymbol === "" ? "NA" : currencySymbol,
        empSalaryAmount:
          Number(empsalary) === "" ? "Non-salaried" : Number(empsalary),
        empGrossSalaryAmount: empGrossSalary,
        empSalaryPayType: salaryType === "" ? "Monthly" : salaryType,
        empSalaryType: salaryType,
        empStatusid: "1",
        empWorkType: empJobTime === "" ? "fulltime" : empJobTime,
        empdob: dob === "" ? "Jan 01,2022" : dob,
        emptaxid: emptaxid === "" ? "NA" : emptaxid,
        emptype: empSalaryStatus === "" ? "salaried" : empSalaryStatus,
        fullName: empName === "" ? " " : empName,
        firstName: firstName === "" ? " " : firstName,
        lastName: lastName === "" ? " " : lastName,
        telephoneNumber: TeleNo === "" ? "NA" : TeleNo,
        state: empstate === "" ? "NA" : empstate,
        zipCode: zipcode === "" ? "NA" : zipcode,
        reportingTo1:
          reportingTo.toString() === "Select"
            ? SuperAdminID[0]._id
            : reportingTo.toString(),
        reportingTo2:
          reportingTo2.toString() === "Select"
            ? SuperAdminID[0]._id
            : reportingTo2.toString(),
        expenseApprover:
          ExpenseApprove.toString() === "Select"
            ? SuperAdminID[0]._id
            : ExpenseApprove.toString(),
        timesheetApprover:
          TimesheetApprove.toString() === "Select"
            ? SuperAdminID[0]._id
            : TimesheetApprove.toString(),
        vacationApprover:
          VacationApprove.toString() === "Select"
            ? SuperAdminID[0]._id
            : VacationApprove.toString(),
        purchaseApprover:
          PurchaseApprove.toString() === "Select"
            ? SuperAdminID[0]._id
            : PurchaseApprove.toString(),
        performanceAppraiser:
          performanceAppraiser.toString() === "Select"
            ? SuperAdminID[0]._id
            : performanceAppraiser.toString(),
        profileupdateApprovar:
          profileupdateApprovar.toString() === "Select"
            ? SuperAdminID[0]._id
            : profileupdateApprovar.toString(),
        tdsApprover:
          TDSApprovar.toString() === "Select"
            ? SuperAdminID[0]._id
            : TDSApprovar.toString(),

        loanApprovar:
          loanApprover.toString() === "Select"
            ? SuperAdminID[0]._id
            : loanApprover.toString(),
        meritalStatus: meritalstatus === "" ? "single" : meritalstatus,
        employeeIdNumber: Emp2IdNum === "" ? RandomeText(7) : Emp2IdNum,
        empAddress2: empAddress2 === "" ? "NA" : empAddress2,
        emargencyNumber: EmrNo === "" ? "NA" : EmrNo,
        ABANNumber: abaCode === "" ? "NA" : abaCode,
        IBANNumber: ibanCode === "" ? "NA" : ibanCode,
        IFSCNumber: ifscCode === "" ? "NA" : ifscCode,
        accountNumber: accNumber === "" ? "NA" : accNumber,
        // authenticateUser: "abc@abc.abc",
        bankName: bankName === "" ? "NA" : bankName,
        swiftCode: swiftCode === "" ? "NA" : swiftCode,
        imageUrl: imageUrl,
        imageKey: imageKey,
        joinDate: selectDate === "" ? "Jan 01,2022" : selectDate,
        phoneNo: PhoneNo === "" ? "NA" : PhoneNo,
        role: roleType === "" ? "employee" : roleType,
        vacationDays: Number(vacation) === "" ? Number(0) : Number(vacation),
        comp_name: comp_name,
        comp_nameCreatedBy: comp_name,
        invitedBy: sessionStorage.getItem("username"),
        modules: sendmorambaplanlist,
        salaryTemplateid: selectedSalaryTemp,
        salaryinfo: [getSalarySavedData()],
        isSalaryChange: isSalaryChange,
        appraisalduedate:
          Selectedappraisalduedate === ""
            ? "Jan 01,2022"
            : Selectedappraisalduedate,
      };
      axios
        .post(apiUrl, body, headerConfig)
        .then(function (response) {
          var res = response.data.data.approverDetails;
          dispatch(getOrgSalaryData());
          dispatch(resetDashboardEmpList());
          if (op_mode === "update") {
            setopeneditmessage(res);
            setOpeneditpopup(true);
            // dispatch(getDashboard(null));
            // setTimeout(() => {
            //   navigate("/dashboard");
            // }, 1000);
            dispatch(getRequestsList());
            dispatch(resetDashboardEmpList());
          } else {
            successToast("Employee Created Successfully!");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          }
        })
        .catch(function (error) {
          errorToast(error.message);
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
          // console.log(error.message);
        })
        .then(function () {
          // always executed
        });
      // }
    }
  };
  console.log(SuperAdminID[0]._id);
  const getSalarySavedData = () => {
    var MLS = [];
    var sendSalaryData = {};
    for (var i = 0; i < selectedMandetS.length; i++) {
      var d = {
        key: selectedMandetS[i].key,
        name: selectedMandetS[i].name,
        desc: selectedMandetS[i].desc,
        valdata: selectedMandetS[i].valdataS,
        save: true,
      };
      MLS.push(d);
    }

    var ALS = [];
    for (var i = 0; i < selectedAllowanceS.length; i++) {
      var d = {
        key: selectedAllowanceS[i].key,
        name: selectedAllowanceS[i].name,
        desc: selectedAllowanceS[i].desc,
        isDisable:
          selectedAllowanceS[i].isDisable == undefined
            ? true
            : selectedAllowanceS[i].isDisable,
        valdata:
          selectedAllowanceS[i].valdataS == undefined
            ? ""
            : selectedAllowanceS[i].valdataS,
        save: true,
      };
      ALS.push(d);
    }
    var DLS = [];
    for (var i = 0; i < selectedDeductionS.length; i++) {
      var d = {
        key: selectedDeductionS[i].key,
        name: selectedDeductionS[i].name,
        desc: selectedDeductionS[i].desc,
        isDisable:
          selectedDeductionS[i].isDisable == undefined
            ? true
            : selectedDeductionS[i].isDisable,
        valdata:
          selectedDeductionS[i].valdataS == undefined
            ? ""
            : selectedDeductionS[i].valdataS,
        save: true,
      };
      DLS.push(d);
    }
    var TLS = [];
    for (var i = 0; i < selectedTaxS.length; i++) {
      var d = {
        key: selectedTaxS[i].key,
        name: selectedTaxS[i].name,
        desc: selectedTaxS[i].desc,
        isDisable:
          selectedTaxS[i].isDisable == undefined
            ? true
            : selectedTaxS[i].isDisable,
        valdata:
          selectedTaxS[i].valdataS == undefined ? "" : selectedTaxS[i].valdataS,
        save: true,
      };
      TLS.push(d);
    }
    var dateString = GetUTCNow();
    sendSalaryData["isActive"] = true;
    sendSalaryData["templateid"] = selectedSalaryTemp;
    sendSalaryData["templatename"] = selectedSalaryTempID; //todo chnage variable swip
    sendSalaryData["_empId"] = "new";
    sendSalaryData["_orgId"] = sessionStorage.getItem("_compId");

    sendSalaryData["effectiveDate"] = dateString; // format 2022-MM-03 time
    sendSalaryData["mandetorylist"] = MLS;
    sendSalaryData["allowancelist"] = ALS.filter(
      (item) => item.isDisable == false
    );
    sendSalaryData["deductionlist"] = DLS.filter(
      (item) => item.isDisable == false
    );
    sendSalaryData["taxlist"] = TLS.filter((item) => item.isDisable == false);
    sendSalaryData["salaryafterdeduction"] = SelectednetTotal;

    sendSalaryData["mandetorytotal"] = MLS.reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata == undefined || valdata == "" || valdata == null
            ? "0"
            : valdata
        ),
      0
    );
    sendSalaryData["allowancetotal"] = ALS.filter(
      (item) => item.isDisable == false
    ).reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata == undefined || valdata == "" || valdata == null
            ? "0"
            : valdata
        ),
      0
    );
    sendSalaryData["deductiontotal"] = DLS.filter(
      (item) => item.isDisable == false
    ).reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata == undefined || valdata == "" || valdata == null
            ? "0"
            : valdata
        ),
      0
    );
    sendSalaryData["taxtotal"] = TLS.filter(
      (item) => item.isDisable == false
    ).reduce(
      (n, { valdata }) =>
        n +
        parseFloat(
          valdata == undefined || valdata == "" || valdata == null
            ? "0"
            : valdata
        ),
      0
    );

    console.log(sendSalaryData);
    return sendSalaryData;
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_hint_join_date(
      doc.querySelector("string[name='text_hint_join_date']")?.textContent
    );
    seText_designation(
      doc.querySelector("string[name='text_designation']")?.textContent
    );
    seText_role_type(
      doc.querySelector("string[name='text_role_type']")?.textContent
    );
    seText_radio_full_time(
      doc.querySelector("string[name='text_radio_full_time']")?.textContent
    );
    setText_radio_part_time(
      doc.querySelector("string[name='text_radio_part_time']")?.textContent
    );
    setText_radio_salaried(
      doc.querySelector("string[name='text_radio_salaried']")?.textContent
    );
    setText_radio_non_salaried(
      doc.querySelector("string[name='text_radio_non_salaried']")?.textContent
    );
    setText_bi_weekly2(
      doc.querySelector("string[name='text_bi_weekly2']")?.textContent
    );
    setText_bi_monthly2(
      doc.querySelector("string[name='settext_bi_monthly2']")?.textContent
    );
    setText_radio_monthly(
      doc.querySelector("string[name='text_radio_monthly']")?.textContent
    );
    setText_radio_weekly(
      doc.querySelector("string[name='text_radio_weekly']")?.textContent
    );
    setText_hint_tax_id(
      doc.querySelector("string[name='text_hint_tax_id']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );

    setText_salary_type(
      doc.querySelector("string[name='text_salary_type']")?.textContent
    );
    setTitle_ddd_employee(
      doc.querySelector("string[name='title_ddd_employee']")?.textContent
    );
    setText_f_name(
      doc.querySelector("string[name='text_f_name']")?.textContent
    );
    setText_enter_first_name(
      doc.querySelector("string[name='text_enter_first_name']")?.textContent
    );
    setText_M_name(
      doc.querySelector("string[name='text_M_name']")?.textContent
    );
    setText_hint_M_name(
      doc.querySelector("string[name='text_hint_M_name']")?.textContent
    );
    setText_L_name(
      doc.querySelector("string[name='text_L_name']")?.textContent
    );
    setText_hint_L_name(
      doc.querySelector("string[name='text_hint_L_name']")?.textContent
    );
    seTtext_address_1(
      doc.querySelector("string[name='text_address_1']")?.textContent
    );
    seTtext_address_2(
      doc.querySelector("string[name='text_address_2']")?.textContent
    );
    seTtext_hint_address_1(
      doc.querySelector("string[name='text_hint_address_1']")?.textContent
    );
    seTtext_hint_address_2(
      doc.querySelector("string[name='text_hint_address_2']")?.textContent
    );
    setText_country(
      doc.querySelector("string[name='text_country']")?.textContent
    );
    setText_state(doc.querySelector("string[name='text_state']")?.textContent);

    setText_zip_code(
      doc.querySelector("string[name='text_zip_code']")?.textContent
    );
    setText_hint_zip_code(
      doc.querySelector("string[name='text_hint_zip_code']")?.textContent
    );

    setText_phone(doc.querySelector("string[name='text_phone']")?.textContent);
    setText_telephone(
      doc.querySelector("string[name='text_telephone']")?.textContent
    );
    setText_Emerangecy_no(
      doc.querySelector("string[name='text_Emerangecy_no']")?.textContent
    );
    setText_bank_name(
      doc.querySelector("string[name='text_bank_name']")?.textContent
    );
    setHint_bank_name(
      doc.querySelector("string[name='hint_bank_name']")?.textContent
    );
    setText_account_number(
      doc.querySelector("string[name='text_account_number']")?.textContent
    );
    setHint_account_number(
      doc.querySelector("string[name='hint_account_number']")?.textContent
    );
    setText_ifsc_code(
      doc.querySelector("string[name='text_ifsc_code']")?.textContent
    );
    setHint_ifsc_code(
      doc.querySelector("string[name='hint_ifsc_code']")?.textContent
    );
    setText_swift_code(
      doc.querySelector("string[name='text_swift_code']")?.textContent
    );
    setHint_swift_code(
      doc.querySelector("string[name='hint_swift_code']")?.textContent
    );
    setText_aba_code(
      doc.querySelector("string[name='text_aba_code']")?.textContent
    );
    setHint_aba_code(
      doc.querySelector("string[name='hint_aba_code']")?.textContent
    );
    setText_iban_code(
      doc.querySelector("string[name='text_iban_code']")?.textContent
    );
    setHint_iban_code(
      doc.querySelector("string[name='hint_iban_code']")?.textContent
    );
    setText_id_number(
      doc.querySelector("string[name='text_id_number']")?.textContent
    );
    setText_hint_taxid_number(
      doc.querySelector("string[name='text_hint_taxid_number']")?.textContent
    );
    setText_dob(doc.querySelector("string[name='text_dob']")?.textContent);
    setText_merital_status(
      doc.querySelector("string[name='text_merital_status']")?.textContent
    );
    setText_status_maried(
      doc.querySelector("string[name='text_status_maried']")?.textContent
    );
    setText_status_single(
      doc.querySelector("string[name='text_status_single']")?.textContent
    );
    setText_ReportingTo(
      doc.querySelector("string[name='text_reportingTo']")?.textContent
    );
    setText_ExpenseApprove(
      doc.querySelector("string[name='text_ExpenseApprove']")?.textContent
    );
    setText_TimesheetApprove(
      doc.querySelector("string[name='text_TimesheetApprove']")?.textContent
    );
    setText_VacationApprove(
      doc.querySelector("string[name='text_VacationApprove']")?.textContent
    );
    setText_PurchaseApprove(
      doc.querySelector("string[name='text_PurchaseApprove']")?.textContent
    );
    setText_PerformanceAppraiser(
      doc.querySelector("string[name='text_performanceAppraiser']")?.textContent
    );
    setText_currency(
      doc.querySelector("string[name='text_currency']")?.textContent
    );
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent
    );

    setText_employee(
      doc.querySelector("string[name='text_employee']")?.textContent
    );
    setText_role_admin(
      doc.querySelector("string[name='text_role_admin']")?.textContent
    );
    setText_role_superadmin(
      doc.querySelector("string[name='text_role_superadmin']")?.textContent
    );
    setTitle_salary_breakup(
      doc.querySelector("string[name='title_salary_breakup']")?.textContent
    );

    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_resendemail(
      doc.querySelector("string[name='text_resendemail']")?.textContent
    );
    setText_pendingver(
      doc.querySelector("string[name='text_pendingver']")?.textContent
    );
    setText_company_email(
      doc.querySelector("string[name='text_company_email']")?.textContent
    );
    setText_customizemonthsalary(
      doc.querySelector("string[name='text_customizemonthsalary']")?.textContent
    );
    settext_fileName(
      doc.querySelector("string[name='text_fileName']")?.textContent
    );
    settext_upload(
      doc.querySelector("string[name='text_upload']")?.textContent
    );
    setText_earning(
      doc.querySelector("string[name='text_earning']")?.textContent
    );
    setText_grosssalary(
      doc.querySelector("string[name='text_grosssalary']")?.textContent
    );
    setText_totaldeduction(
      doc.querySelector("string[name='text_totaldeduction']")?.textContent
    );
    setText_salarybreakuptemp(
      doc.querySelector("string[name='text_salarybreakuptemp']")?.textContent
    );
    setText_createtemp(
      doc.querySelector("string[name='text_createtemp']")?.textContent
    );
    setTitle_allowance(
      doc.querySelector("string[name='title_allowance']")?.textContent
    );
    setTitle_deduction(
      doc.querySelector("string[name='title_deduction']")?.textContent
    );
    setText_tax(doc.querySelector("string[name='text_tax']")?.textContent);
    setText_personal_email(
      doc.querySelector("string[name='text_personal_email']")?.textContent
    );
    settext_addchoosefile(
      doc.querySelector("string[name='text_addchoosefile']")?.textContent
    );
    setText_salarystatus(
      doc.querySelector("string[name='text_salarystatus']")?.textContent
    );
    setText_select(
      doc.querySelector("string[name='text_select']")?.textContent
    );
    setText_JobStatus(
      doc.querySelector("string[name='text_JobStatus']")?.textContent
    );
    setComp_text_telephone(
      doc.querySelector("string[name='comp_text_telephone']")?.textContent
    );
    setPersnalphoneph_text(
      doc.querySelector("string[name='persnalphoneph_text']")?.textContent
    );
    setEmergencycontctph_text(
      doc.querySelector("string[name='emergencycontctph_text']")?.textContent
    );
    setText_err_roletype(
      doc.querySelector("string[name='text_err_roletype']")?.textContent
    );
    setText_err_designation(
      doc.querySelector("string[name='text_err_designation']")?.textContent
    );
    setText_err_salarytype(
      doc.querySelector("string[name='text_err_salarytype']")?.textContent
    );
    setProfileapprove_text(
      doc.querySelector("string[name='profileapprove_text']")?.textContent
    );
    setText_err_crypto_currency(
      doc.querySelector("string[name='text_err_crypto_currency']")?.textContent
    );
    setText_err_firstnamev3(
      doc.querySelector("string[name='text_err_firstnamev3']")?.textContent
    );
    setText_err_lastnamev3(
      doc.querySelector("string[name='text_err_lastnamev3']")?.textContent
    );
    setAddprofile_approvetext(
      doc.querySelector("string[name='addprofile_approvetext']")?.textContent
    );
    settds_approvertext(
      doc.querySelector("string[name='addtds_approvertext']")?.textContent
    );
    setAddany_test(
      doc.querySelector("string[name='addany_test']")?.textContent
    );
    setText_statev3(
      doc.querySelector("string[name='text_statev3']")?.textContent
    );
    setAddpro_picture(
      doc.querySelector("string[name='addpro_picture']")?.textContent
    );
    setText_netsalary(
      doc.querySelector("string[name='text_netsalary']")?.textContent
    );
    setText_addperemail(
      doc.querySelector("string[name='text_addperemail']")?.textContent
    );
    setText_addcompemail(
      doc.querySelector("string[name='text_addcompemail']")?.textContent
    );
    setText_loanapprover(
      doc.querySelector("string[name='text_loanapprover']")?.textContent
    );
    setEnter_valid_email(
      doc.querySelector("string[name='enter_valid_email']")?.textContent
    );
    setText_effectiveform(
      doc.querySelector("string[name='text_effectiveform']")?.textContent
    );
    setAppraisal_duedate(
      doc.querySelector("string[name='appraisal_duedate']")?.textContent
    );
    setText_provided_Annualday(
      doc.querySelector("string[name='text_provided_Annualday']")?.textContent
    );
    setCompanyemail_val(
      doc.querySelector("string[name='companyemail_val']")?.textContent
    );
    setPersonalemail_val(
      doc.querySelector("string[name='personalemail_val']")?.textContent
    );
    setTitle_eee_employee(
      doc.querySelector("string[name='title_eee_employee']")?.textContent
    );
    setText_Gender(
      doc.querySelector("string[name='text_gender']")?.textContent || "Gender"
    );
    setText_male(
      doc.querySelector("string[name='text_male']")?.textContent || "Male"
    );
    setText_female(
      doc.querySelector("string[name='text_female']")?.textContent || "Female"
    );
    setText_request(
      doc.querySelector("string[name='text_request']")?.textContent
    );
    setText_approval(
      doc.querySelector("string[name='text_approval']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const [ValidEmail, setValidEmail] = useState(false);
  const isValidEmail = () => {
    if (window.location.pathname === "/addstaff/edit") {
      setValidEmail(true);
    } else {
      if (AddStaffHandler()) {
        var orgID = sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        );
        var api_url =
          GlobalConstants.Cdomain +
          `/API/moramba/v3/check/emailexist?email=${empPersonalEmail}&_orgId=${orgID}`;

        var body = {
          email: empEmail,
          _orgId: sessionStorage.getItem(
            GlobalConstants.session_current_company_id
          ),
        };
        let headerConfig = {
          headers: {
            accept: "application/json",
            authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };

        axios
          .post(api_url, body, headerConfig)
          .then(function (response) {
            var res = response.data;
            console.log(res);
            if (res.data.email === false) {
              setValidEmail(true);
              AddEmployeeDetails();
            } else {
              setValidEmail(false);
              infoToast("Email is Already Used!");
            }
          })
          .catch(function (error) {
            errorToast(error.message);
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
          });
      }
    }
  };

  useEffect(() => {
    $("#currency").prop("selectedIndex", 1).val();
    setCurrencySymbol($("#currency").prop("selectedIndex", 1).val());
  }, [Country]);

  useEffect(() => {
    const disabledFields = [
      "PersonalEmail",
      "idnum",
      "roletype",
      "desigantion",
      "reportingto1",
      "toAbleReportingto2",
      // "reportingto2",
      "expenseApprover",
      "timesheetApprove",
      "VactionApprove",
      "PurchaseApprove",
      "LoanApprove",
      "performaceAppraiser",
      "ProfileApprovar",
      "TDSApprover",
      "JobStatus",
      "SalaryStatus",
      "salaryType",
      "currency",
      "SalaryBreakupTemplateList",
    ];

    if (role === "employee") {
      disabledFields.forEach((field) => {
        try {
          document.getElementById(field).disabled = true;
        } catch (err) {
          console.log("getting error while disable " + err);
        }
      });
    } else {
      console.log("ADMIN IS HERE");
    }
  }, [role]);

  const handleResend = () => {
    var orgName = sessionStorage.getItem("comp_name");
    var apiUrl =
      GlobalConstants.Cdomain + "/API/moramba/v4/user/emailverification";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var data = {
      firstname: firstName,
      lastname: lastName,
      email: empPersonalEmail,
      orgname: orgName,
    };
    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        var res = response.data;
        if (res.data.length > 0) {
        }
        console.log(res);
        successToast(res.message);
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
  const EmployeeStatus = sessionStorage.getItem("EmployeeStatus");
  return (
    <>
      <Header />
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openeditpopup}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="text-center">
            <FaRegThumbsUp className="text-center thumb-sty text-success" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {openeditmessage.map((e) => {
                return (
                  <>
                    <h3 className="text-center">
                      {text_request}{" "}
                      <span className="font-weight-bold">
                        <b>
                          {e.firstName} {e.lastName} (
                          {e.email === "" ? e.telephoneNumber : e.email})
                        </b>
                      </span>{" "}
                      {text_approval}
                    </h3>
                  </>
                );
              })}
            </DialogContentText>
            <Divider />
          </DialogContent>
          <DialogActions>
            <button className="btncancel mx-4" onClick={handleClose}>
              Ok
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">
        {window.location.pathname === "/addstaff/edit" ? (
          <>{title_eee_employee}</>
        ) : (
          <>{title_ddd_employee}</>
        )}
      </h3>
      <div
        className={
          popupprofile || popup === true || ManageSalaryPopup === true
            ? "container bgblur1 containerBox p-4  footer_margin"
            : "container containerBox p-4  footer_margin"
        }
      >
        <div className="d-flex justify-content-start gap-4 align-items-center mb-1">
          <img
            src={file === undefined ? EmpImg : file}
            alt="profile_pic"
            className="viewProfileImage"
          />
          <div>
            <h5>{addpro_picture}</h5>
            <button
              className="uploadclick"
              onClick={() => handleClickOpenimage()}
            >
              {text_upload}
            </button>
            {file === undefined ? (
              ""
            ) : (
              <p className="text-muted">
                {text_fileName} : {fileNameUpload}
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12 mt-3">
                <h4>
                  {text_f_name}
                  <span className="Star">*</span>
                </h4>
                <input
                  id="firstname"
                  type={"text"}
                  value={firstName}
                  placeholder={text_enter_first_name}
                  maxLength="20"
                  onChange={(e) => [
                    setFirstName(e.target.value),
                    setErrFirstName(""),
                  ]}
                />
                <br />
                <span className="error_sty">{errfirstName}</span>
              </div>
            </div>
            <div className="row addstaff-mname t-addstaff-mname">
              <div className="col-md-12 mt-4">
                <h4>{text_M_name}</h4>
                <input
                  id="middleName"
                  className="Inputbox"
                  type={"text"}
                  value={empName}
                  maxLength="30"
                  placeholder={text_hint_M_name}
                  onChange={(e) => setEmpName(e.target.value)}
                />
                <br />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <h4>
                  {text_L_name}
                  <span className="Star">*</span>
                </h4>
                <input
                  id="lastName"
                  className="Inputbox"
                  type={"text"}
                  value={lastName}
                  placeholder={text_hint_L_name}
                  maxLength="20"
                  onChange={(e) => [
                    setLastName(e.target.value),
                    setErrLastName(""),
                  ]}
                />
                <br />
                <span className="error_sty">{errlastName}</span>
              </div>
            </div>

            <h4 className="mt-4 addstaff-pemail t-addstaff-pemail">
              {text_personal_email}
              <span className="Star mb-3">*</span>
              {location.pathname === "/addstaff/edit" && (
                <>
                  {EmployeeStatus === "true" && (
                    <span className="verified-text">(Verified)</span>
                  )}
                </>
              )}
            </h4>
            <div className="d-flex">
              <div>
                <input
                  id="PersonalEmail"
                  className="Inputbox"
                  type={"email"}
                  value={empPersonalEmail}
                  placeholder={text_addperemail}
                  onChange={(e) => [
                    setempPersonalEmail(e.target.value),
                    seterrEmpEmail(""),
                  ]}
                />{" "}
              </div>
              <div>
                {window.location.pathname === "/addstaff/edit" && (
                  <>
                    {(role === "superadmin" || role === "admin") && (
                      <>
                        {" "}
                        {EmployeeStatus === "true" ? (
                          <>
                            <div>
                              <FcApproval className="approval-email mx-2" />
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              className="mx-2 resend-email-btn"
                              onClick={handleResend}
                            >
                              <span class="icon">ℹ️</span>{" "}
                              <span className="text">
                                {text_pendingver}
                                <br /> {text_resendemail}
                              </span>
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                <br />
              </div>
            </div>
            <span className="error_sty"> {errEmpEmail}</span>
            <h4 className="mt-3">
              {" "}
              {text_company_email}
              <span className="Star">*</span>
            </h4>
            <input
              id="compEmail"
              className="Inputbox"
              type={"email"}
              value={empEmail}
              placeholder={text_addcompemail}
              onChange={(e) => [
                setEmpEmail(e.target.value),
                seterrCompEmail(""),
              ]}
            />
            <br />
            <span className="error_sty"> {errCompEmail}</span>
            <h4 className="mt-3">{text_address_1}</h4>
            <input
              className="InputAddressbox"
              value={empAddress1}
              maxLength="50"
              placeholder={text_hint_address_1}
              onChange={(e) => setEmpAddress1(e.target.value)}
            />
            <br />
            <h4 className=" mt-3">{text_address_2} </h4>
            <input
              className="InputAddressbox"
              placeholder={text_hint_address_2}
              value={empAddress2}
              maxLength="50"
              onChange={(e) => setEmpAddress2(e.target.value)}
            />
            <br />
            <div className="row mt-3">
              <div className="col-md-6">
                {" "}
                <h4>{text_country}</h4>
                <ReactFlagsSelect
                  id="EmpCountry"
                  className="CountryInputbox1 t-addstaff-country"
                  selected={CountryCode}
                  onSelect={(code) => setCountyData(code)}
                  searchable={true}
                  inputStyle={{
                    background: "#ffffff",
                    width: "60%",
                    height: "43px",
                    borderBottom: "3px solid #6d9886",
                  }}
                  disabled={role === "employee" ? true : false}
                />
                <br />
              </div>
            </div>
            <br />
            <div className="row addstaff-state">
              <div className="col-md-6">
                <h4>{text_state}</h4>
                <RegionDropdown
                  className="CountryInputbox1 vactionbox1 addstaff-dropdowns"
                  blankOptionLabel="Please Select Country."
                  defaultOptionLabel={text_statev3}
                  country={Country}
                  onChange={(e) => setEmpState(e)}
                  value={empstate}
                  customOptions={["All"]}
                />
              </div>
              <div className="col-md-6 addstaff-pemail t-zip">
                <h4>{text_zip_code}</h4>
                <input
                  className="CountryInputbox1 vactionbox1"
                  value={zipcode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder={text_hint_zip_code}
                  type={"number"}
                />
              </div>
            </div>
            <h4 className="mt-3">{text_telephone}</h4>
            <PhoneInput
              country={CountryCode.toLowerCase()}
              onChange={setTeleNo}
              inputStyle={{
                background: "#ffffff",
                width: "60%",
                height: "43px",
                borderBottom: "3px solid #6d9886",
              }}
              id="CmpTelNo"
              placeholder={comp_text_telephone}
              value={TeleNo}
              disabled={role === "employee" ? true : false}
            />
            <p className="error_sty">{telerr}</p>
            <h4>{text_phone}</h4>
            <PhoneInput
              onChange={setPhoneNo}
              country={CountryCode.toLowerCase()}
              inputStyle={{
                background: "#ffffff",
                width: "60%",
                height: "43px",
                borderBottom: "3px solid #6d9886",
              }}
              placeholder={persnalphoneph_text}
              value={PhoneNo}
            />
            <p className="error_sty">{errEmpPhone}</p>
            <h4>{text_Emerangecy_no}</h4>
            <PhoneInput
              value={EmrNo}
              country={CountryCode.toLowerCase()}
              placeholder={emergencycontctph_text}
              onChange={setEmrNo}
              inputStyle={{
                background: "#ffffff",
                width: "60%",
                height: "43px",
                borderBottom: "3px solid #6d9886",
              }}
            />
          </div>
          <br />
          <br />
          <div className="col-md-6">
            <h4 className="addstaff-pemail t-zip">{text_id_number}</h4>
            <input
              id="idnum"
              className="Inputbox"
              type={"text"}
              maxLength="25"
              value={Emp2IdNum}
              placeholder={text_id_number}
              onChange={(e) => setEmp2IdNum(e.target.value)}
            />
            <br />
            <br />
            <h4 className="addstaff-emp-taxid t-addstaff-emptaxid">
              {text_hint_tax_id}
            </h4>
            <input
              className="Inputbox"
              type={"text"}
              value={emptaxid}
              placeholder={text_hint_taxid_number}
              onChange={(e) => setEmptaxid(e.target.value)}
            />
            <div className="row mt-2 t-addstaff-pemail">
              <div className="col-md-6 addstaff-joindate">
                <h4>{text_hint_join_date}</h4>
                <DatePicker
                  id="JoiningDate"
                  selected={selectDate}
                  dateFormat="MMM dd,yyyy"
                  showMonthDropdown
                  showYearDropdown
                  onChange={(date) => setSelectDate(date)}
                  className="vactionbox1"
                  dropdownMode="select"
                  disabled={role === "employee" ? true : false}
                />
              </div>
              <div className="col-md-6 addstaff-pemail t-zip">
                <h4>{text_dob}</h4>
                <DatePicker
                  selected={dob}
                  dateFormat="MMM dd,yyyy"
                  showMonthDropdown
                  showYearDropdown
                  onChange={(date) => setdob(date)}
                  className="vactionbox1"
                  dropdownMode="select"
                />
              </div>
            </div>
            <br />
            <div className="row mt-2 t-addstaff-pemail">
              <div className="col-md-6 addstaff-joindate">
                <h4 className="addstaff-emp-taxid t-addstaff-emptaxid">
                  {text_merital_status}
                </h4>
                <select
                  name="Role"
                  value={meritalstatus}
                  className="CountryInputbox1 addstaff-dropdowns"
                  onChange={(e) => setMeritalstatus(e.target.value)}
                >
                  <option selected disabled>
                    {text_select}
                  </option>
                  <option value="maried">{text_status_maried}</option>
                  <option value="single">{text_status_single}</option>
                </select>
              </div>
              <div className="col-md-6 addstaff-joindate">
                {" "}
                <h4 className="addstaff-emp-taxid t-addstaff-emptaxid">
                  {text_gender}
                </h4>
                <select
                  name="Role"
                  value={gender}
                  className="CountryInputbox1 addstaff-dropdowns"
                  onChange={(e) => [setGender(e.target.value)]}
                >
                  <option selected disabled>
                    {text_select}
                  </option>
                  <option value="female">{text_female}</option>
                  <option value="male">{text_male}</option>
                </select>
              </div>
            </div>
            <br />
            <br />

            <div className="row addstaff-emp-taxid t-addstaff-emptaxid">
              <div className="col-md-6">
                <h4>{text_role_type}</h4>

                <select
                  id="roletype"
                  name="Role"
                  value={roleType}
                  className="CountryInputbox1 addstaff-dropdowns"
                  onChange={(e) => [
                    setRoleType(e.target.value),
                    setErrroletype(""),
                  ]}
                >
                  <option value="employee" selected>
                    {text_employee}
                  </option>
                  <option value="admin">{text_role_admin}</option>
                  <option value="superadmin">{text_role_superadmin}</option>
                </select>
                <p className="error_sty">{errroletype}</p>
              </div>
              <div className="col-md-6 addstaff-pemail t-zip">
                <h4>{text_designation}</h4>
                <select
                  id="desigantion"
                  name="Role"
                  value={empDesignation}
                  className="CountryInputbox1 addstaff-dropdowns t-addstaff-desg-dropdown"
                  onChange={(e) => setEmpDesignation(e.target.value)}
                >
                  <option selected disabled>
                    {text_select}
                  </option>
                  {AllDesignationList?.map((item) => {
                    return (
                      <>
                        {console.log(item)}
                        <option value={item?.category}>{item?.category}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row mt-4 t-addstaff-reportingto-expenseapprover">
              <div className="col-md-6 addstaff-emp-taxid">
                <h4>{text_reportingTo}</h4>
                <select
                  id="reportingto1"
                  name="Role"
                  className="CountryInputbox1 addstaff-dropdowns"
                  value={reportingTo}
                  onChange={(e) => setReportingTo(e.target.value)}
                >
                  {ActiveOnlyEmp?.length > 0 &&
                    ActiveOnlyEmp?.map((d, key) => {
                      return (
                        <>
                          <option
                            key={key}
                            value={d._id}
                            selected={
                              op_mode === "insert"
                                ? d.role === "superadmin"
                                  ? true
                                  : false
                                : false
                            }
                          >
                            {d.firstName}&nbsp;
                            {d.lastName}
                          </option>
                        </>
                      );
                    })}
                </select>
                <button
                  className="addReportingto2"
                  id="toAbleReportingto2"
                  onClick={() => setShowReportingTwo(!ShowReportingTwo)}
                >
                  {ShowReportingTwo ? "-" : "+"}
                </button>
                <br />
                {ShowReportingTwo && (
                  <select
                    id="reportingto2"
                    name="Role"
                    className="CountryInputbox1 mt-1 addstaff-dropdowns t-addstaff-reporting-dropdown"
                    value={reportingTo2}
                    onChange={(e) => setReportingTo2(e.target.value)}
                  >
                    {ActiveOnlyEmp?.length > 0 &&
                      ActiveOnlyEmp?.map((d, key) => {
                        return (
                          <>
                            <option
                              key={key}
                              value={d._id}
                              selected={
                                op_mode === "insert"
                                  ? d.role === "superadmin"
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {d.firstName}&nbsp;
                              {d.lastName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                )}
              </div>
              <div className="col-md-6 addstaff-pemail">
                <h4>{text_performanceAppraiser}</h4>
                <select
                  name="Role"
                  id="performaceAppraiser"
                  value={performanceAppraiser}
                  className="CountryInputbox1 addstaff-dropdowns"
                  onChange={(e) => setPerformanceAppraiser(e.target.value)}
                >
                  {ActiveOnlyEmp?.length > 0 &&
                    ActiveOnlyEmp?.map((d, key) => {
                      return (
                        <>
                          <option
                            key={key}
                            value={d._id}
                            selected={
                              op_mode === "insert"
                                ? d.role === "superadmin"
                                  ? true
                                  : false
                                : false
                            }
                          >
                            {d.firstName}&nbsp;
                            {d.lastName}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 addstaff-emp-taxid">
                  <h4>{text_TimesheetApprove}</h4>
                  <select
                    id="timesheetApprove"
                    name="Role"
                    value={TimesheetApprove}
                    className="CountryInputbox1 addstaff-dropdowns"
                    onChange={(e) => setTimesheetApprove(e.target.value)}
                  >
                    {ActiveOnlyEmp?.length > 0 &&
                      ActiveOnlyEmp?.map((d, key) => {
                        return (
                          <>
                            <option
                              key={key}
                              value={d._id}
                              selected={
                                op_mode === "insert"
                                  ? d.role === "superadmin"
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {d.firstName}&nbsp;
                              {d.lastName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-6 addstaff-pemail t-zip">
                  <h4>{text_VacationApprove}</h4>
                  <select
                    id="VactionApprove"
                    name="Role"
                    value={VacationApprove}
                    className="CountryInputbox1 addstaff-dropdowns"
                    onChange={(e) => setVacationApprove(e.target.value)}
                  >
                    {/* <option selected disabled>
                    {text_select}
                  </option> */}
                    {ActiveOnlyEmp?.length > 0 &&
                      ActiveOnlyEmp?.map((d, key) => {
                        return (
                          <>
                            <option
                              key={key}
                              value={d._id}
                              selected={
                                op_mode === "insert"
                                  ? d.role === "superadmin"
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {d.firstName}&nbsp;
                              {d.lastName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 addstaff-emp-taxid">
                  <h4>{text_PurchaseApprove}</h4>
                  <select
                    id="PurchaseApprove"
                    name="Role"
                    value={PurchaseApprove}
                    className="CountryInputbox1 addstaff-dropdowns"
                    onChange={(e) => setPurchaseApprove(e.target.value)}
                  >
                    {ActiveOnlyEmp?.length > 0 &&
                      ActiveOnlyEmp?.map((d, key) => {
                        return (
                          <>
                            <option
                              key={key}
                              value={d._id}
                              selected={
                                op_mode === "insert"
                                  ? d.role === "superadmin"
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {d.firstName}&nbsp;
                              {d.lastName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-6  addstaff-pemail">
                  <h4>{text_loanapprover}</h4>
                  <select
                    id="LoanApprove"
                    name="Role"
                    value={loanApprover}
                    className="CountryInputbox1 addstaff-dropdowns"
                    onChange={(e) => setLoanApprover(e.target.value)}
                  >
                    {ActiveOnlyEmp?.length > 0 &&
                      ActiveOnlyEmp?.map((d, key) => {
                        return (
                          <>
                            <option
                              key={key}
                              value={d._id}
                              selected={
                                op_mode === "insert"
                                  ? d.role === "superadmin"
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {d.firstName}&nbsp;
                              {d.lastName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 addstaff-emp-taxid">
                  <h4>{text_ExpenseApprove}</h4>
                  <select
                    id="expenseApprover"
                    name="Role"
                    value={ExpenseApprove}
                    className="CountryInputbox1 addstaff-dropdowns"
                    onChange={(e) => setExpenseApprove(e.target.value)}
                  >
                    {ActiveOnlyEmp?.length > 0 &&
                      ActiveOnlyEmp?.map((d, key) => {
                        return (
                          <>
                            <option
                              key={key}
                              value={d._id}
                              selected={
                                op_mode === "insert"
                                  ? d.role === "superadmin"
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {d.firstName}&nbsp;
                              {d.lastName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="col-md-6  addstaff-pemail">
                <h4>{addprofile_approvetext}</h4>
                <select
                  name="Role"
                  id="ProfileApprovar"
                  value={profileupdateApprovar}
                  className="CountryInputbox1 addstaff-dropdowns"
                  onChange={(e) => setProfileupdateApprovar(e.target.value)}
                >
                  {ActiveOnlyEmp?.length > 0 &&
                    ActiveOnlyEmp?.map((d, key) => {
                      return (
                        <>
                          <option
                            key={key}
                            value={d._id}
                            selected={
                              op_mode === "insert"
                                ? d.role === "superadmin"
                                  ? true
                                  : false
                                : false
                            }
                          >
                            {d.firstName}&nbsp;
                            {d.lastName}
                          </option>
                        </>
                      );
                    })}
                </select>
                {/* <p className="error_sty">{errapprov}</p> */}
              </div>
              {CountryFromCompany === "India" ? (
                <>
                  <div className="col-md-6  addstaff-pemail">
                    <h4>
                      {addtds_approvertext} <span className="Star">*</span>
                    </h4>
                    <select
                      name="Role"
                      id="TDSApprover"
                      value={TDSApprovar}
                      className="CountryInputbox1 addstaff-dropdowns"
                      onChange={(e) => setTDSApprovar(e.target.value)}
                    >
                      {ActiveOnlyEmp?.length > 0 &&
                        ActiveOnlyEmp?.map((d, key) => {
                          return (
                            <>
                              <option
                                key={key}
                                value={d._id}
                                selected={
                                  d.role === "superadmin" ? true : false
                                }
                              >
                                {d.firstName}&nbsp;
                                {d.lastName}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="col-md-6 dueDate addstaff-pemail t-zip">
                <h4>{appraisal_duedate}</h4>
                <DatePicker
                  selected={Selectedappraisalduedate}
                  dateFormat="MMM dd,yyyy"
                  showMonthDropdown
                  showYearDropdown
                  onChange={(date) => setSelectedappraisalduedate(date)}
                  className="vactionbox1"
                  dropdownMode="select"
                  id="AppraisalDueDate"
                  disabled={role === "employee" ? true : false}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6 addstaff-emp-taxid">
                <h4>{text_JobStatus}</h4>
                <select
                  onChange={(e) => setEmpJobTime(e.target.value)}
                  className="CountryInputbox1 addstaff-dropdowns"
                  value={empJobTime}
                  id="JobStatus"
                >
                  <option value={"fulltime"} selected>
                    {text_radio_full_time}
                  </option>
                  <option value={"parttime"}>{text_radio_part_time}</option>
                </select>
              </div>
              <div className="col-md-6 addstaff-pemail t-zip">
                <h4>{text_salarystatus}</h4>
                <select
                  onChange={(e) => setEmpSalarySatus(e.target.value)}
                  className="CountryInputbox1 addstaff-dropdowns"
                  value={empSalaryStatus}
                  id="SalaryStatus"
                >
                  <option value={"salaried"} selected>
                    {text_radio_salaried}
                  </option>
                  <option value={"non-salaried"}>
                    {text_radio_non_salaried}
                  </option>
                </select>
              </div>
            </div>
            <h4 className="SubHeadingtext mt-3">{text_salary_type}</h4>
            <select
              className="CountryInputbox1 salarytypeInput"
              value={salaryType}
              id="salaryType"
              name="Role"
              onChange={(e) => [
                setSalaryType(e.target.value),
                setErrSalary(""),
              ]}
            >
              <option value="monthly" selected>
                {text_radio_monthly}
              </option>
              <option value="bimonthly">{settext_bi_monthly2}</option>
              <option value="biweekly">{text_bi_weekly2}</option>
              <option value="weekly">{text_radio_weekly}</option>
            </select>
            <br />
            <p className="error_sty">{errsalary}</p>
            <h4 className=" mt-2 addstaff-pemail t-addstaff-amount">
              {text_provided_Annualday}
            </h4>
            <input
              type="number"
              onKeyDown={(evt) =>
                evt.which !== 8 &&
                evt.which !== 0 &&
                (evt.which < 48 || evt.which > 57) &&
                evt.preventDefault()
              }
              min={0}
              value={vacation}
              onChange={(e) => setvacation(e.target.value)}
              className="w-25 text-center"
            />
            <br />
            <br />
            <div className="row t-addstaff-selectcurrency-amount">
              <div className="col-md-6 addstaff-pemail">
                <h4 className="SubHeadingtext">{text_effectiveform}</h4>
                <DatePicker
                  selected={selectDate}
                  onChange={(date) => setSelectDate(date)}
                  dateFormat="MMM dd,yyyy"
                  showMonthDropdown
                  showYearDropdown
                  className="vactionbox1"
                  dropdownMode="select"
                  disabled={role === "employee" ? true : false}
                />
                <h4 className="mt-3">{text_currency}</h4>

                <select
                  id="currency"
                  className="CountryInputbox1 addstaff-dropdowns"
                  value={currencySymbol}
                  onChange={(e) => [
                    setCurrencySymbol(e.target.value),
                    SetErrcurrency(""),
                  ]}
                >
                  <option disabled>{text_currency}</option>
                  {FilteredCurrency.map((e, index) => (
                    <>
                      <option key={index} value={e.abbreviation}>
                        {e.currency}
                        &nbsp;&nbsp;
                        {"(" + e.symbol + ")"}
                      </option>
                    </>
                  ))}
                  {FilteredCurrency.length === 0 ? (
                    <>
                      {" "}
                      <option value={"$"} selected>
                        United States Dollar &nbsp;($)
                      </option>
                    </>
                  ) : (
                    ""
                  )}
                </select>
                <br />
                <span className="error_sty">{Errcurrency}</span>
              </div>
              {/* <div className="col-md-6 addstaff-pemail t-zip">
                <h4 className="t-addstaff-pemail">{text_Amount}</h4>
                <input
                  id="salary"
                  className="vactionbox1"
                  value={
                    empGrossSalary === ""
                      ? OrginalGrossSalary
                      : OrginalGrossSalary
                  }
                  type={"number"}
                  disabled
                />
              </div> */}
            </div>

            <br />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6" id="navtab1">
            <h4>{text_bank_name}</h4>
            <input
              className="Inputbox"
              value={bankName}
              type={"text"}
              placeholder={hint_bank_name}
              maxLength="30"
              onChange={(e) => setBankName(e.target.value)}
            />
            <br />
            <h4 className=" mt-3">{text_account_number}</h4>
            <input
              className="Inputbox"
              type={"number"}
              value={accNumber}
              placeholder={hint_account_number}
              onChange={(e) => setAccNumber(e.target.value)}
            />
            <br />
            <h4 className=" mt-3">{text_ifsc_code}</h4>
            <input
              className="Inputbox"
              type={"text"}
              value={ifscCode}
              placeholder={hint_ifsc_code}
              maxLength="11"
              onChange={(e) => setIFSCcode(e.target.value)}
            />
            <br />
            <h4 className=" mt-3">{text_swift_code}</h4>
            <input
              className="Inputbox"
              type={"text"}
              value={swiftCode}
              placeholder={hint_swift_code}
              minLength="8"
              maxLength="11"
              onChange={(e) => setSwiftCode(e.target.value)}
            />
            <br /> <h4 className=" mt-3">{text_aba_code}</h4>
            {/* changes */}
            <input
              className="Inputbox"
              type={"text"}
              value={abaCode}
              placeholder={hint_aba_code}
              onChange={(e) => setABAcode(e.target.value)}
            />
            <br />
            <h4 className=" mt-3">{text_iban_code}</h4>
            <input
              className="Inputbox"
              type={"text"}
              value={ibanCode}
              placeholder={hint_iban_code}
              maxLength="35"
              onChange={(e) => setIBANcode(e.target.value)}
            />
            <br />
          </div>

          <div className="col-md-6 salary_size">
            <h4 className=" mt-3">{text_salarybreakuptemp}</h4>
            <select
              className="CountryInputbox1 addstaff-dropdowns"
              id="SalaryBreakupTemplateList"
              onChange={(e) => {
                setselectedSalaryTemp(e.target.value);
                setSelectetedSalaryTempID(e);
              }}
              value={selectedSalaryTemp}
            >
              <option value="">{addany_test}</option>
              {SalaryBreakupTemplate?.map((SalaryTemp, index) => {
                return (
                  <>
                    <option key={index} value={SalaryTemp._id}>
                      {SalaryTemp.templatename}
                    </option>
                  </>
                );
              })}
            </select>
            &nbsp;
            <Link to="/salarybreakup/list">
              <button
                className={
                  role === "employee"
                    ? "d-none"
                    : " selecttempBtn addstaff-create-new-temp-btn t-addstaff-create-new-temp-btn"
                }
                id="CreateSalaryTempBtn"
              >
                {text_createtemp}
              </button>
            </Link>
            <br />
            {selectedSalaryTemp === "" ? (
              ""
            ) : (
              <>
                <button
                  className={role === "employee" ? "d-none" : "customizeBtn"}
                  id="empSalarycustomizeBtn"
                  onClick={handleManageSalary}
                >
                  {text_customizemonthsalary}
                </button>
              </>
            )}
            <br />
            <br />
            <h4 className="addstaff-emp-taxid">{title_salary_breakup}:</h4>
            {breakuplist.map((item, i) => {
              return (
                <>
                  <h4 className="SubHeadingtext">{item?.category}</h4>
                  <input
                    key={i}
                    className="Inputbox"
                    type={"number"}
                    placeholder={item?.category}
                    value={item?.amount}
                    onChange={(e) => [
                      setBasicSalary(e.target.value),
                      addSalaryBreakupVal(e.target.value, item),
                    ]}
                  />
                  <br />
                  <br />
                  {/* <span className="error_sty">{errBasicSalary}</span> */}
                </>
              );
            })}
            <div className="row p-2">
              <table className="addstafftable">
                <tr className="addstaffhead p-1">
                  <th className="p-1">{text_earning}</th>
                  {/* <th className="p-1">{text_Amount}</th> */}
                  {/* <th className="p-1 text-end">{text_grosssalary}</th> */}
                  <th className="p-1 text-end">{text_Amount}</th>
                </tr>
                {selectedMandetS.length > 0 &&
                  selectedMandetS.map((item, i) => (
                    <tr>
                      <td className="p-1">{item.name}</td>
                      {/* <td>-</td> */}
                      <td className="tfoot text-end">
                        {currencySymbol}
                        {Number(item.valdataS)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </td>
                    </tr>
                  ))}
                {selectedAllowanceS.length > 0 &&
                  selectedAllowanceS
                    .filter((item) => item.isDisable === false)
                    .map((item, i) => (
                      <tr>
                        <td className="p-1">{item.name}</td>
                        {/* <td>-</td> */}
                        <td className="tfoot text-end">
                          {currencySymbol}
                          {Number(item.valdataS)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </td>
                      </tr>
                    ))}

                <tr>
                  <th className="p-1">{text_grosssalary}</th>
                  {/* <td>-</td> */}
                  <th className="tfoot p-1 text-end">
                    {/* {SelectedsumMandate + SelectedsumAllowane} */}
                    {currencySymbol}{" "}
                    {Number(sumMandate + sumAllowane)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </th>
                </tr>
              </table>
              <table className="addstafftable">
                <tr className="addstaffhead">
                  <th className="p-1">{title_deduction}</th>
                  {/* <th className="p-1">{text_Amount}</th> */}
                  <th className="p-1 text-end">{text_Amount}</th>
                </tr>

                {selectedDeductionS.length > 0 &&
                  selectedDeductionS
                    .filter((item) => item.isDisable === false)
                    .map((item, i) => (
                      <tr>
                        <td className="p-1">{item.name}</td>
                        {/* <td>-</td> */}
                        <td className="tfoot text-end">
                          {currencySymbol}
                          {Number(item.valdataS)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </td>
                      </tr>
                    ))}
                {selectedTaxS.length > 0 &&
                  selectedTaxS
                    .filter((item) => item.isDisable === false)
                    .map((item, i) => (
                      <tr>
                        <td className="p-1">{item.name}</td>
                        <td className="tfoot text-end">
                          {currencySymbol}
                          {Number(item.valdataS)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </td>
                      </tr>
                    ))}

                <tr>
                  <th className="p-1">{text_totaldeduction}</th>
                  <th className="tfoot text-end p-1">
                    {currencySymbol}{" "}
                    {Number(sumTax + sumDeduction)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </th>
                </tr>
                <tr>
                  <th className="p-1">
                    <h5>{text_netsalary} </h5>
                  </th>
                  <th className="tfoot text-end p-1">
                    <h5>
                      {`${currencySymbol}` +
                        Number(
                          netTotal === ""
                            ? SelectednetTotal === undefined || null || ""
                              ? netTotal
                              : netTotal
                            : netTotal
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </h5>
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div className="row nextBtn1 mt-4 text-center">
          <center>
            <Link to="/dashboard">
              <button className="btncancel">{button_cancel}</button>
            </Link>{" "}
            &nbsp;&nbsp;
            {window.location.pathname === "/addstaff/edit" ? (
              <>
                <button
                  className="m-2  btnsave"
                  type={"submit"}
                  onClick={AddEmployeeDetails}
                >
                  {button_save}
                </button>
              </>
            ) : (
              <>
                <button
                  className="m-2  btnsave"
                  type={"submit"}
                  onClick={isValidEmail}
                >
                  {button_save}
                </button>
              </>
            )}
          </center>
        </div>
      </div>

      {ManageSalaryPopup ? (
        <>
          <div
            className="addstaffsalarypopup cssanimationdian sequence fadeInBottomdian text-black addstaffwippopup"
            id="popupmobadd"
          >
            <div className="row text-end">
              <h3 className="close">
                <CgCloseO onClick={closeManageSalaryPopup} />
              </h3>
            </div>
            <center>
              <h3>{text_customizemonthsalary}</h3>
            </center>

            <Divider />
            <div className="scrolladdstaff addstaffwippopupm2">
              <div className="mt-3 d-flex gap-3 justify-content-center text-center addstaffwippopupm1">
                {selectedMandateList !== undefined &&
                  selectedMandateList.length > 0 &&
                  selectedMandateList.map((item, i) => (
                    <>
                      <div>
                        <h4>{item.name}</h4>
                        <div className="d-flex align-items-baseline gap-2">
                          <p className="currencySymbolHolder">
                            {currencySymbol}
                          </p>
                          <input
                            key={i}
                            id={item.key}
                            value={item.valdata}
                            type={"number"}
                            onChange={(event) => mandateFormChange(i, event)}
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              {/* <!-------------------currentdesign--------------------------------------------------------------------!> */}
              <Divider className="mt-3" />
              <h4 className="text-center mt-3">{title_allowance}</h4>
              {selectedAllowanceList !== undefined &&
                selectedAllowanceList.length > 0 &&
                selectedAllowanceList.map((item, i) => (
                  <div className="">
                    <div className="d-flex gap-3 justify-content-between mt-3 addstaffwippopupm3">
                      <div className="d-flex gap-3 align-items-center">
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            allowanceCheckChange(i, event, item.key)
                          }
                          checked={
                            item.isDisable === undefined
                              ? false
                              : !item.isDisable
                          }
                        />
                        <div className="popupinp">
                          <span>
                            <h5>{item.name}</h5>
                          </span>
                          <span>
                            <label
                              className="TooltipAddstaff"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="right"
                              title={item.desc}
                            >
                              <AiFillInfoCircle />
                            </label>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-baseline gap-2">
                        <p className="currencySymbolHolder">{currencySymbol}</p>
                        <input
                          className="popupinp2"
                          key={i}
                          id={item.key}
                          type={"number"}
                          value={item.valdata}
                          // disabled={
                          //   item.auto === undefined
                          //     ? item.isDisable === undefined
                          //       ? true
                          //       : item.isDisable
                          //     : item.auto
                          // }
                          onChange={(event) => allowanceFormChange(i, event)}
                          placeholder={
                            item.isDisable === undefined
                              ? ""
                              : !item.isDisable
                              ? "Enter value Here"
                              : ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

              <Divider className="mt-3" />
              <h4 className="text-center mt-3">{title_deduction}</h4>
              <div>
                {selectedDeductionList !== undefined &&
                  selectedDeductionList.map((item, i) => (
                    <>
                      <div className="d-flex gap-3 justify-content-between mt-3 addstaffwippopupm3">
                        <div className="d-flex gap-3 align-items-center">
                          <input
                            type="checkbox"
                            onChange={(event) =>
                              deductionCheckChange(i, event, item.key)
                            }
                            checked={
                              item.isDisable === undefined
                                ? false
                                : !item.isDisable
                            }
                          />
                          <div className="popupinp">
                            <span>
                              <h5>{item.name}</h5>
                            </span>
                            <span>
                              <label
                                className="TooltipAddstaff"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="right"
                                title={item.desc}
                              >
                                <AiFillInfoCircle />
                              </label>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-baseline gap-2">
                          <p className="currencySymbolHolder">
                            {currencySymbol}
                          </p>
                          <input
                            className="popupinp2"
                            type="number"
                            onKeyDown={(evt) =>
                              evt.which !== 8 &&
                              evt.which !== 0 &&
                              (evt.which < 48 || evt.which > 57) &&
                              evt.preventDefault()
                            }
                            min={0}
                            key={i}
                            id={item.key}
                            value={item.valdata}
                            // disabled={
                            //   item.auto === undefined
                            //     ? item.isDisable === undefined
                            //       ? true
                            //       : item.isDisable
                            //     : item.auto
                            // }
                            onChange={(event) => deductionFormChange(i, event)}
                            placeholder={
                              item.isDisable === undefined
                                ? ""
                                : !item.isDisable
                                ? "Enter value Here"
                                : ""
                            }
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>

              <Divider className="mt-3" />
              <h4 className="text-center mt-3">{text_tax}</h4>
              <div>
                {selectedTaxList !== undefined &&
                  selectedTaxList.length > 0 &&
                  selectedTaxList.map((item, i) => (
                    <>
                      <div className="d-flex gap-5 justify-content-between mt-3 addstaffwippopupm3">
                        <div className="d-flex gap-3 align-items-center">
                          <input
                            type="checkbox"
                            onChange={(event) =>
                              taxCheckChange(i, event, item.key)
                            }
                            checked={
                              item.isDisable === undefined
                                ? false
                                : !item.isDisable
                            }
                          />
                          <div className="popupinp">
                            <span>
                              <h5>{item.name}</h5>
                            </span>
                            <span>
                              <label
                                className="TooltipAddstaff"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="right"
                                title={item.desc}
                              >
                                <AiFillInfoCircle />
                              </label>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-baseline gap-2">
                          <p className="currencySymbolHolder">
                            {currencySymbol}
                          </p>
                          <input
                            className="popupinp2"
                            key={i}
                            id={item.key}
                            type={"number"}
                            value={item.valdata}
                            // disabled={
                            //   item.auto === undefined
                            //     ? item.isDisable === undefined
                            //       ? true
                            //       : item.isDisable
                            //     : item.auto
                            // }
                            onChange={(event) => taxFormChange(i, event)}
                            placeholder={
                              item.isDisable === undefined
                                ? ""
                                : !item.isDisable
                                ? "Enter value Here"
                                : ""
                            }
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <Divider className="mt-3" />
              <div className="row p-2">
                <table className="tablecssaddstaff">
                  <thead>
                    <tr className="tableheadaddstaff">
                      <th>{text_earning}</th>
                      <th className="text-end">{text_Amount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMandateList?.length > 0 &&
                      selectedMandateList?.map((item, i) => (
                        <tr className="p-1">
                          <td className="p-1">{item.name}</td>
                          <td align="right" className="p-1">
                            {currencySymbol}
                            {Number(item.valdata)
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                          </td>
                        </tr>
                      ))}
                    {selectedAllowanceList?.length > 0 &&
                      selectedAllowanceList
                        .filter((item) => item.isDisable === false)
                        .map((item, i) => (
                          <tr>
                            <td className="tabledata p-1">{item.name}</td>
                            <td align="right" className="p-1">
                              {currencySymbol}
                              {Number(item.valdata)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                  <tfoot>
                    <tr className="fw-bold">
                      <td className="p-1">{text_grosssalary}</td>
                      <td align="right" className="p-1">
                        {currencySymbol}
                        {Number(sumMandate + sumAllowane)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <table className="tablecssaddstaff">
                  <thead>
                    <tr className="tableheadaddstaff">
                      <th>{title_deduction}</th>
                      <th className="text-end">{text_Amount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDeductionList?.length > 0 &&
                      selectedDeductionList
                        .filter((item) => item.isDisable === false)
                        .map((item, i) => (
                          <tr className="p-1">
                            <td className="p-1">{item.name}</td>
                            <td className="p-1" align="right">
                              {currencySymbol}
                              {Number(item.valdata)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </td>
                          </tr>
                        ))}
                    {selectedTaxList?.length > 0 &&
                      selectedTaxList
                        .filter((item) => item.isDisable === false)
                        .map((item, i) => (
                          <tr>
                            <td className="p-1">{item.name}</td>
                            {/* <td className="text-center">-</td> */}
                            <td className="p-1" align="right">
                              {currencySymbol}
                              {Number(item.valdata)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="p-1 fw-bold">{text_totaldeduction}</td>
                      <td align="right" className="p-1 fw-bold">
                        {currencySymbol}{" "}
                        {Number(sumTax + sumDeduction)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-1 fw-bold">
                        <h5>{text_netsalary}</h5>
                      </td>
                      <td align="right" className="p-1 fw-bold">
                        <h5>
                          {`${currencySymbol}` +
                            Number(netTotal)
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </h5>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-5">
                <button
                  className="btncancel"
                  onClick={() => cancelSalaryData()}
                >
                  {button_cancel}
                </button>{" "}
                <button
                  className="btnsave"
                  onClick={() => {
                    saveSalaryData(
                      selectedMandateList,
                      selectedAllowanceList,
                      selectedDeductionList,
                      selectedTaxList
                    );
                    setIsSalaryChange(true);
                  }}
                >
                  {button_save}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {popupprofile ? (
        <div className="main">
          <div className="addstaffpopup">
            <div className="row text-end text-black">
              <h3 className="close text-black ">
                <CgCloseO
                  onClick={() => [
                    setPopupprofile(false),
                    setFile(),
                    setfileNameUpload(),
                  ]}
                />
              </h3>
            </div>
            <h3 className="text-center text-black">{text_addchoosefile}</h3>

            <hr />
            <div className="row">
              <div className="col-md-12 text-center text-black">
                {" "}
                <input
                  type="file"
                  className="documentchoose"
                  onChange={handleFileInput}
                />
                <br />
                <br />
                <img
                  src={file === undefined ? EmpImg : file}
                  className="previewImg"
                  alt=""
                />
              </div>
            </div>

            <div className="row text-center mt-4">
              <div className="col-md-12 mb-2">
                <button
                  className="btncancel"
                  style={{ marginRight: "10px" }}
                  onClick={(e) => [
                    setPopupprofile(false),
                    setFile(undefined),
                    setfileNameUpload(),
                  ]}
                >
                  {button_cancel}
                </button>
                <button
                  className="btnsave"
                  onClick={() => uploadFileToServer()}
                >
                  {button_save}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {popup ? (
        <>
          <div className="addstaffpopup">
            <h2>POPUP PENDING</h2>
            <button className="btncancel" onClick={() => setPopup(false)}>
              {button_cancel}
            </button>
            &nbsp;&nbsp;
            <button className="btnsave" onClick={() => setPopup(false)}>
              {button_save}
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default AddstaffWIP;
