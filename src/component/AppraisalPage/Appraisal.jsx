import React, { useState, useEffect } from "react";
import "../AppraisalPage/AppraisalPage.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errorToast, successToast } from "../../utils/Helper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
import { ToastContainer } from "react-toastify";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getDesignationDoc } from "../../redux/DesignationDoc";
import { getAppraisaltypeDoc } from "../../redux/AppraisalTypeSlice";
import { getEmpData } from "../../redux/EmpDataSlice";
import { CgCloseO } from "react-icons/cg";
import axios from "axios";
import { getDashboard } from "../../redux/DashboardSlice";
import { Rating } from "react-simple-star-rating";
import { getRequestsList } from "../../redux/RequestsListSlice";
import Cookie from "js-cookie";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaRegThumbsUp } from "react-icons/fa";

function Appraisal() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //Redux code
  const dispatch = useDispatch();
  const EmployeeData = useSelector((state) => state.empData);
  const AppraisaltypeData = useSelector((state) => state.AppraisalType);
  const DesignationDocData = useSelector((state) => state.DesignationDocList);
  const DashboardData = useSelector((state) => state.dashboard);
  const AllEmpListOfSelectedCmp = useSelector((state) => state.allEmpList);
  const EmpList = AllEmpListOfSelectedCmp?.filter((e) => {
    return EmployeeData[0].firstName !== e.firstName;
  });

  // language Variable starts here
  const [text_appraisal, setText_appraisal] = useState("Appraisal");
  const [text_promote_to, setText_promote_to] = useState("Promote To");
  const [text_increment_salary, setText_increment_salary] =
    useState("Increment Salary");
  const [text_dateHeader, setText_dateHeader] = useState("Date");
  const [text_appraisal_category_rating, setText_appraisal_category_rating] =
    useState("Appraisal Category & Rating");
  const [text_Remarks_Optional, setText_Remark_Optional] =
    useState("Remarks(optional)");
  const [text_overall_rating, setText_overall_rating] =
    useState("Overall Rating");
  const [text_done_by, setText_done_by] = useState("Appraisal Done By");
  const [appraisal_ratingtext, setAppraisal_ratingtext] = useState(
    "Please Add Atleast One Rating"
  );
  const [appraisal_category, setAppraisal_category] = useState(
    "Please Add Appraisal Category First"
  );
  const [appraisalGivenTo_text, setAppraisalGivenTo_text] =
    useState("Appraisal Given To");
  const [appraisalmember, setappraisalmember] = useState(
    "Appraisal Of Team Member"
  );
  const [selectmember, setselectmember] = useState("Select Team Member");
  // popup lang variable
  const [popupHead, setPopupHead] = useState("Appraisal Category");
  const [cancleBtn, setCancleBtn] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable, setSaveDisable] = useState(false);
  const [selectOption, setSelectOption] = useState("Select");
  const [validationForPromotTo, setvalidationForPromotTo] = useState(
    "Please Select Promote To"
  );
  const [hiint_Amount, sethiint_Amount] = useState("Enter Your Amount");
  const [remark_ph, setRemark_ph] = useState("Enter Rating Remark");
  const [text_err_select_one_category, setText_err_select_one_category] =
    useState("Please Select At least one Category");
  const [text_selfappraisal, setText_selfappraisal] =
    useState("Self Appraisal");
  const [text_other_appraisal, settext_other_appraisal] =
    useState("Other Appraisal");
  const [addBtn, setAddBtn] = useState("Add");
  const [text_edit, setText_edit] = useState("Edit");
  const [please_enter_amount, setPlease_enter_amount] = useState(
    "Please Enter Amount"
  );
  const [select_employee, setSelect_employee] = useState(
    "Please Select Employee"
  );
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  //  Variable for data //
  const [startDate, setStartDate] = useState(new Date());
  const [givenAppraisalTo, setGivenAppraisalTo] = useState("");
  const [selectto, setselectto] = useState("");
  const [incresalary, setIncresalary] = useState("");
  const [ratingrem, setRatingrem] = useState("");
  const [rcSelfAsses, setRcSelfAsses] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [incresalaryErr, setIncresalaryErr] = useState("");
  const [ratingErr, setRatingErr] = useState("");
  const [promotErr, setPromotErr] = useState("");
  const [ratingopen, setRatingOpen] = useState(false);
  const [selectedStar, setSelecedtStar] = useState([]);
  const [StarError, setStarError] = useState("");
  const [ratingpopup, setRatingpopup] = useState([]);
  const [rating, setRating] = useState(0);
  const [rateState, setRateState] = useState(0);
  const [indexState, setIndexState] = useState(0);
  const [tempData, setTempData] = useState([]);
  const [noRatingErr, setNoRatingErr] = useState("");
  const [noAppCatErr, setNoAppCatErr] = useState("");
  const [mulRating, setMulRating] = useState([{ index: 0, rating: 0 }]);
  const [selfRating, setSelfRating] = useState(0);
  const [overallRatingData, setOverallRatingData] = useState({});
  const [selfRemarks, setSelfRemarks] = useState("");
  const [ErrAppraisalGivento, setErrAppraisalGivento] = useState("");
  const [appraisalToList, setAppraisalToList] = useState([]);
  const [tempCount, seTempCount] = useState(0);
  const [appraiserSelect, setAppraiserSelect] = useState("");
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openSaveMessage, setOpenSaveMessage] = useState([]);

  // popup
  const [popup, setPopup] = useState(false);

  const AppraisalListData = AppraisaltypeData.filter((s) => {
    return s.active === true;
  });

  const handleClose = () => {
    setOpenSavePopup(false);
  };
  useEffect(() => {
    setTempData(AppraisalListData);
  }, [AppraisalListData?.length, tempCount]);

  const DesignationListData = DesignationDocData.filter((s) => {
    return s.active === true;
  });

  const handleRating = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    if (DesignationDocData?.length === 0) {
      dispatch(getDesignationDoc());
    } else {
      console.log("DesignationDoc call");
    }
  }, [DesignationDocData?.length]);

  useEffect(() => {
    if (AppraisaltypeData?.length === 0) {
      dispatch(getAppraisaltypeDoc());
    } else {
      console.log("Appraisaltype Doc");
    }
  }, [AppraisaltypeData?.length]);

  useEffect(() => {
    if (DashboardData?.length === 0) {
      dispatch(getDashboard());
    } else {
      console.log("Dashbord Data");
    }
  }, [DashboardData?.length]);

  // open popup
  const handleClickOpen = () => {
    if (tempData?.length !== 0) {
      setPopup(true);
      setNoRatingErr("");
    }
  };

  // close popup
  const closePopup = () => {
    setPopup(false);
    setStarError("");
    setRcSelfAsses([]);
  };

  //Validation

  let count = 0;
  const appraisalValidation = () => {
    let appformvalid = true;
    if (selectto === "") {
      appformvalid = false;
      setPromotErr(<>*{validationForPromotTo}!</>);
    }
    if (selectedStar === 0) {
      appformvalid = false;
      setStarError(<>*{text_err_select_one_category}!</>);
    }
    if (incresalary === "") {
      appformvalid = false;
      setIncresalaryErr(<>*{please_enter_amount}!</>);
    }
    if (tempData?.length === 0) {
      appformvalid = false;
      setNoAppCatErr(<>*{appraisal_category}!</>);
    }
    if (tempData?.length !== 0 && count === 0) {
      appformvalid = false;
      setNoRatingErr(<>*{appraisal_ratingtext}!</>);
    }
    if (givenAppraisalTo === "") {
      appformvalid = false;
      setErrAppraisalGivento(<>*{select_employee}!</>);
    }
    setSaveDisable(false);
    return appformvalid;
  };

  // Rating star validation
  const startValidation = () => {
    var starValid = true;
    if (selectedStar === 0) {
      starValid = false;
      setStarError(<>*{text_err_select_one_category}</>);
    }
    return starValid;
  };

  const stardataHandler = () => {
    setRatingpopup([]);
    setRatingpopup((current) => [
      ...current,
      { rating: rcSelfAsses, category: selectedCat },
    ]);
    setPopup(false);
  };

  const handleRatingSave = () => {
    if (startValidation()) {
      stardataHandler();
      setRatingOpen(true);
      setPopup(false);
      setRatingErr("");
      setNoAppCatErr("");
    }
  };

  const submitHandler = () => {
    if (appraisalValidation()) {
      setSaveDisable(true);
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/appraisal?type=insert";
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var username = sessionStorage.getItem("employee_name");
      var currentempid = sessionStorage.getItem("currentempid");
      let year = startDate.getFullYear();
      let month = startDate.getMonth() + 1;
      let day = startDate.getDate();
      let time = dayjs.utc(startDate).local().format("HH:mm a");
      var NewDate = new Date(year + "-" + month + "-" + day);
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
      var messageDate = dayjs.utc(
        dayjs(
          projectDate + " " + GlobalConstants.empDefaultShiftStartTime,
          "YYYY-MM-DD HH:mm:ss"
        )
      );

      var data = {
        _id: "", //
        _orgId: sessionStorage.getItem("_compId"), //
        employeeId: givenAppraisalTo, //
        _partition: GlobalConstants._partition, //
        msgDate:
          messageDate.format("YYYY-MM-DD") === ""
            ? "2022-01-01"
            : messageDate.format("YYYY-MM-DD"),
        appraisalDate: NewDate === "" ? "2022-01-01" : NewDate, //new Date()
        appraisalDoneBy: username,
        appraisalDoneById: currentempid, //session employee_name
        createdby: sessionStorage.getItem("username"), //
        createdon: time === "" ? "00:00:00" : time, //current time
        designationFrom: EmployeeData[0]?.designation, //UPDATE THIS
        designationTo: selectto === "" ? "NA" : selectto, //
        fromSalary:
          EmployeeData[0]?.empSalaryAmount === "" //
            ? "0"
            : EmployeeData[0]?.empSalaryAmount,
        projectId: "6127fa5bb7d3a8aa847a2e22", //
        remark: ratingrem === "" ? "NA" : ratingrem,
        toSalary: incresalary === "" ? "0" : incresalary,
        appraisalPerformance: tempData === "" ? "NA" : tempData,
        appraisaltype: appraiserSelect,
      };

      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          setSaveDisable(false);
          var value = response.data.approvalDetails;
          // successToast("Appraisal Added Successfully");
          setOpenSavePopup(true);
          setOpenSaveMessage(value);
          dispatch(getEmpData());
          setIncresalary("");
          setRatingpopup([]);
          setRatingrem("");
          setGivenAppraisalTo("");
          setselectto("");
          setTempData([]);
          seTempCount(tempCount + 1);
          setMulRating([]);
          dispatch(getRequestsList());
        })
        .catch(function (error) {
          setSaveDisable(false);
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
          console.log(error.message);
        });
    }
  };

  const submitHandlerSelf = () => {
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/appraisal?type=insert";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var currentempid = sessionStorage.getItem("currentempid");
    var username = sessionStorage.getItem("employee_name");
    var orgID = sessionStorage.getItem("_compId");
    var data = {
      _id: "", //
      _orgId: orgID, //
      employeeId: currentempid, //
      _partition: GlobalConstants._partition, //
      msgDate: "Jan 01, 2022",
      appraisalDate: new Date(), //new Date()
      appraisalDoneBy: username,
      appraisalDoneById: currentempid, //session employee_name
      createdby: sessionStorage.getItem("username"), //
      createdon: new Date(), //current time
      designationFrom: EmployeeData[0]?.designation, //UPDATE THIS
      designationTo: EmployeeData[0]?.designation, //
      fromSalary: EmployeeData[0]?.empSalaryAmount,
      toSalary: EmployeeData[0]?.empSalaryAmount,
      projectId: "6127fa5bb7d3a8aa847a2e22", //
      remark: selfRemarks === "" ? "NA" : selfRemarks,
      appraisalPerformance:
        overallRatingData.length === 0 ? "NA" : overallRatingData,
      appraisaltype: appraiserSelect,
    };

    axios
      .post(apiUrl, data, headerConfig)
      .then(function (response) {
        var res = response.data;
        successToast(response.data.message);
        dispatch(getEmpData());
        setIncresalary("");
        setRatingpopup([]);
        setRatingrem("");
        setGivenAppraisalTo("");
        setselectto("");
        dispatch(getRequestsList());
        setSelfRating("");
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
        console.log(error.message);
      });
  };
  useEffect(() => {
    var empID = sessionStorage.getItem("currentempid");
    var _orgId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/appraisal/appraisalApproverdetails?employeeId=" +
      empID +
      "&_orgId=" +
      _orgId;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var Value = response.data.data;
        setAppraisalToList(Value);
        if (Value === null) {
          setAppraiserSelect("Self");
        } else {
          setAppraiserSelect("Appraiser");
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
  }, []);

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
    // settext_other_appraisal(
    //   doc.querySelector("string[name='text_other_appraisal']")
    //     ?.textContent
    // );
    setText_appraisal(
      doc.querySelector("string[name='text_appraisal']")?.textContent ||
        "Appraisal"
    );
    setText_promote_to(
      doc.querySelector("string[name='text_promote_to']")?.textContent ||
        "Promote To"
    );
    setText_increment_salary(
      doc.querySelector("string[name='text_increment_salary']")?.textContent ||
        "Increment Salary"
    );
    setText_dateHeader(
      doc.querySelector("string[name='text_dateHeader']")?.textContent || "Date"
    );
    setText_appraisal_category_rating(
      doc.querySelector("string[name='text_appraisal_category_rating']")
        ?.textContent || "Appraisal Category & Rating"
    );
    setText_Remark_Optional(
      doc.querySelector("string[name='text_Remarks_Optional']")?.textContent ||
        "Remarks(optional)"
    );
    setText_overall_rating(
      doc.querySelector("string[name='text_overall_rating']")?.textContent ||
        "Overall Rating"
    );
    setText_done_by(
      doc.querySelector("string[name='text_done_by']")?.textContent ||
        "Appraisal Done By"
    );
    setPopupHead(
      doc.querySelector("string[name='popupHead']")?.textContent ||
        "Appraisal Category"
    );
    setCancleBtn(
      doc.querySelector("string[name='cancleBtn']")?.textContent || "Cancel"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setSelectOption(
      doc.querySelector("string[name='selectOption']")?.textContent || "Select"
    );
    setvalidationForPromotTo(
      doc.querySelector("string[name='validationForPromotTo']")?.textContent ||
        "Please Select Promote To"
    );
    sethiint_Amount(
      doc.querySelector("string[name='hiint_Amount']")?.textContent ||
        "Enter Your Amount"
    );
    setRemark_ph(
      doc.querySelector("string[name='remark_ph']")?.textContent ||
        "Enter Rating Remark"
    );
    setText_err_select_one_category(
      doc.querySelector("string[name='text_err_select_one_category']")
        ?.textContent || "Please Select At least one Category"
    );

    setAddBtn(doc.querySelector("string[name='addBtn']")?.textContent || "Add");
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
    );
    setText_selfappraisal(
      doc.querySelector("string[name='text_selfappraisal']")?.textContent ||
        "Self Appraisal"
    );
    setPlease_enter_amount(
      doc.querySelector("string[name='please_enter_amount']")?.textContent ||
        "Please Enter Amount"
    );
    setAppraisal_ratingtext(
      doc.querySelector("string[name='appraisal_ratingtext']")?.textContent ||
        "Please Add Atleast One Rating"
    );
    setAppraisal_category(
      doc.querySelector("string[name='appraisal_category']")?.textContent ||
        "Please Add Appraisal Category First"
    );
    setappraisalmember(
      doc.querySelector("string[name='appraisalmember']")?.textContent ||
        "Appraisal Of Team Member"
    );
    setselectmember(
      doc.querySelector("string[name='selectmember']")?.textContent ||
        "Select Team Member"
    );
    setSelect_employee(
      doc.querySelector("string[name='select_employee']")?.textContent ||
        "Please Select Employee"
    );
    setText_request(
      doc.querySelector("string[name='text_request']")?.textContent ||
        "Thanks! Your Request Generated Successfully. PleaseContact"
    );
    setText_approval(
      doc.querySelector("string[name='text_approval']")?.textContent ||
        "For Approval Status"
    );
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = (rate, index) => {
    setRateState(rate);
    setIndexState(index);

    // multi starts
    var countTwo = 0;
    const newArr = [...mulRating];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].index === index) {
        newArr[i].rating = rate;
        countTwo++;
      }
    }
    if (countTwo === 0) {
      newArr.push({ index: index, rating: rate });
    }
    setMulRating(newArr);
    // multi ends
  };

  const btnSaveFunc = () => {
    let newArr = JSON.parse(JSON.stringify(tempData));
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < mulRating.length; j++) {
        if (i === mulRating[j].index) {
          newArr[i].rating_count = mulRating[j].rating;
        }
      }
    }
    setTempData(newArr);
    // multi ends
  };

  const handleSelfRating = (rate) => {
    setSelfRating(rate);
    setOverallRatingData({
      Category: "Overall Rating",
      Rating: rate,
    });
  };

  return (
    <>
      <div className="appraisalpage-main">
        <Dialog
          fullScreen={fullScreen}
          open={openSavePopup}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="text-center">
            <FaRegThumbsUp className="text-center thumb-sty text-success" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {openSaveMessage.map((e) => {
                return (
                  <>
                    <h3 className="text-center">
                      {text_request}
                      Contact{" "}
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
        <div
          className={
            popup === true
              ? "container contentap bgblur1"
              : "container contentap appraisalpage-content"
          }
          style={{ padding: "40px" }}
        >
          <div>
            <br />
            <div className="row">
              <div className="col-md-6 appraiser-left">
                <h4 className="appraisal-header-text">{text_appraisal} </h4>
                <select
                  name="Select Appraiser"
                  className="appraiserinput appraisalPageInput"
                  onChange={(e) => setAppraiserSelect(e.target.value)}
                  defaultValue={"Appraiser"}
                >
                  <option disabled>{selectOption}</option>
                  <option value="Self">{text_selfappraisal}</option>
                  {appraisalToList !== null && (
                    <option value="Appraiser">
                      {/* {text_other_appraisal} */}
                      <>{appraisalmember}</>
                    </option>
                  )}
                </select>
                {appraiserSelect === "Appraiser" ? (
                  <>
                    <h4 className="appraiser-left-promptto mt-4">
                      {/* {appraisalGivenTo_text} */}
                      {selectmember}
                      <span className="Star">*</span>
                    </h4>
                    <select
                      name=""
                      className="appraiserinput appraisalPageInput"
                      onChange={(e) => [
                        setGivenAppraisalTo(e.target.value),
                        setErrAppraisalGivento(""),
                      ]}
                      value={givenAppraisalTo}
                    >
                      <option value="select" selected>
                        {selectOption}
                      </option>
                      {appraisalToList !== null &&
                        appraisalToList
                          ?.filter((value) => {
                            return (
                              value._id !==
                              sessionStorage.getItem("currentempid")
                            );
                          })
                          .map((data) => {
                            return (
                              <>
                                <option value={data?._id}>
                                  {data?.firstName}&nbsp;{data?.lastName}
                                </option>
                              </>
                            );
                          })}
                    </select>
                    <p className="error_sty">{ErrAppraisalGivento}</p>
                    <br />
                    <br />
                    <br />
                    <h4 className="appraiser-left-promptto appraisal-promptto">
                      {text_promote_to} <span className="Star">*</span>
                    </h4>
                    <select
                      name="Select"
                      className="CountryInputbox1 appraisalPageInput"
                      onChange={(e) => [
                        setselectto(e.target.value),
                        setPromotErr(""),
                      ]}
                      value={selectto}
                    >
                      <option selected value="select">
                        {selectOption}
                      </option>
                      {DesignationListData?.length > 0 &&
                        DesignationListData?.map((data, index) => {
                          return (
                            <>
                              <option key={index} value={data?.category}>
                                {data?.category}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    <p className="error_sty">{promotErr}</p>
                    <br />
                    <h4 className="appraiser-left-incsal">
                      {text_increment_salary} <span className="Star">*</span>
                    </h4>
                    <div className="d-flex">
                      {givenAppraisalTo !== "" ? (
                        DashboardData.filter(
                          (e) => e._id === givenAppraisalTo
                        ).map((val) => {
                          return (
                            <>
                              <input
                                type="text"
                                className="Inputboxcurrency"
                                Value={val?.empCurrency}
                                disabled
                              />
                            </>
                          );
                        })
                      ) : (
                        <>
                          <input
                            type="text"
                            className="Inputboxcurrency"
                            Value={EmployeeData[0]?.empCurrency}
                            disabled
                          />
                        </>
                      )}

                      <input
                        type="number"
                        onKeyDown={(evt) =>
                          evt.which !== 8 &&
                          evt.which !== 0 &&
                          (evt.which < 48 || evt.which > 57) &&
                          evt.preventDefault()
                        }
                        min={0}
                        className="CountryInputbox1"
                        placeholder={hiint_Amount}
                        onChange={(e) => [
                          setIncresalary(e.target.value),
                          setIncresalaryErr(""),
                        ]}
                        value={incresalary}
                      />
                      <br />
                    </div>
                    <p className="sperrtext ml-3">{incresalaryErr}</p>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* right part */}
              {appraiserSelect === "Appraiser" ? (
                <>
                  <div className="col-md-6 appraiser-right">
                    <h4>{text_dateHeader}</h4>
                    <DatePicker
                      dateFormat="MMM dd,yyyy"
                      placeholder="Select Date"
                      selected={startDate}
                      id="CountryInputbox1"
                      onChange={(date) => setStartDate(date)}
                    />
                    <br />
                    <br />
                    <h4 className="appraiser-right-catrat">
                      {text_appraisal_category_rating}{" "}
                      <span className="Star">*</span>
                    </h4>

                    <button className="btnsave" onClick={handleClickOpen}>
                      {" "}
                      {ratingpopup?.length === 0 ? addBtn : text_edit}
                    </button>

                    <p className="error_sty">{StarError}</p>
                    <p className="sperrtext ml-3 ratingErr">{noRatingErr}</p>
                    <p className="sperrtext ml-3 ratingErr">{noAppCatErr}</p>
                    {tempData.map((v, i) => (
                      <div key={i} className="app-rating-main">
                        {v.rating_count !== 0 && (
                          <div>
                            <div className="app-rating-main-count">
                              {(count = count + 1)}
                            </div>
                            <div>
                              <h5>{v.category}</h5>
                            </div>
                            <div className="app-rating-main-rating">
                              <Rating
                                iconsCount={10}
                                initialValue={v.rating_count}
                                readonly={true}
                              />
                            </div>
                            <div className="app-rating-main-lh">
                              <div className="app-rating-main-l">Lowest</div>
                              <div className="app-rating-main-h">Highest</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <p className="sperrtext">{ratingErr}</p>
                    <br />
                    <h4 className="appraiser-right-remark">
                      {text_Remarks_Optional}
                    </h4>
                    <input
                      type="inputbox"
                      placeholder={remark_ph}
                      className=" CountryInputbox1"
                      onChange={(e) => setRatingrem(e.target.value)}
                      value={ratingrem}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <br />
            {appraiserSelect === "Self" ? (
              <>
                <h4>{text_overall_rating}</h4>

                <Rating
                  className="appraisal-rating"
                  onClick={handleSelfRating}
                  // disableFillHover
                  initialValue={selfRating}
                  iconsCount={10}
                />
                <div className="d-flex">
                  <label className="appraisal-rating-lowest">Lowest</label>
                  <label className="label_highest appraisal-rating-highest">
                    Highest
                  </label>
                </div>
                <br />
                <br />
                <h4>{text_Remarks_Optional}</h4>
                <input
                  type="inputbox"
                  placeholder={remark_ph}
                  className=" appraiserinput"
                  onChange={(e) => setSelfRemarks(e.target.value)}
                  value={selfRemarks}
                />
              </>
            ) : (
              <></>
            )}
            {/* bottom section */}
            <div className="bottompart">
              <br />
              <div className="appraisalpage-appraiser-btns">
                <Link to="/employeedetail">
                  <button className="btncancel">{cancleBtn}</button>
                </Link>
                &nbsp;
                <button
                  className="btnsave"
                  onClick={() => {
                    appraiserSelect === "Appraiser"
                      ? submitHandler()
                      : submitHandlerSelf();
                  }}
                  disabled={saveDisable}
                >
                  {button_save}
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* popup start */}
      {popup ? (
        <div className="main ">
          <div className="popupappraisal  cssanimation sequence fadeInBottom appraiser-popup">
            <div className="row text-end">
              <h3 className="close" id="closeMob">
                <CgCloseO onClick={closePopup} className="sal-det-pop-close" />
              </h3>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <center>
                  <h4>{popupHead}</h4>
                </center>
              </div>
            </div>
            <hr />

            <div className="row m-3 scrollbarAppraisal" id="style-1">
              <div className=" col-md-12  force-overflow text-black">
                {tempData?.map((data, i) => {
                  return (
                    <>
                      <label for="temp" className="mt-1 label_sty">
                        {data?.category}
                      </label>
                      <br />
                      <Rating
                        className="appraisal-rating"
                        key={i}
                        onClick={(rate) => handleClick(rate, i)}
                        iconsCount={10}
                        showTooltip={false}
                        initialValue={
                          data.rating_count !== 0
                            ? data.rating_count
                            : selectedCat === data?.category
                            ? rcSelfAsses
                            : ""
                        }
                      />
                      <div className="d-flex">
                        <label key={i} className="appraisal-rating-lowest">
                          Lowest
                        </label>
                        <label className="label_highest appraisal-rating-highest">
                          Highest
                        </label>
                      </div>

                      <br />
                    </>
                  );
                })}
              </div>
            </div>
            <hr />

            <div className="row popup-header">
              <div className="col-md-12 appraiser-popup-btns">
                <button
                  className="btncancel"
                  onClick={closePopup}
                  style={{ marginRight: "10px" }}
                >
                  {cancleBtn}
                </button>
                <button
                  className=" btnsave"
                  onClick={() => [handleRatingSave(), btnSaveFunc()]}
                >
                  {button_save}
                </button>
              </div>
              <center>
                <p className="sperrtext">{StarError}</p>
              </center>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default Appraisal;
