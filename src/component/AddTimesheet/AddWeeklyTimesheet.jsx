import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import DatePicker from "react-datepicker";
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
import { CgCloseO } from "react-icons/cg";
import { addDays } from "@fullcalendar/core/internal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { getTimesheetProject } from "../../redux/TimesheetProjectSlice";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { getWeeklyTimesheet } from "../../redux/WeeklyTimesheetSlice";
import Cookie from "js-cookie";
import { FaRegThumbsUp } from "react-icons/fa";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function AddWeeklyTimesheet() {
  const navigate = useNavigate();

  //redux data from TimesheetProject
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.TimesheetProject);

  // language old variable start
  const [button_save, setButton_save] = useState("Save");
  const [text_select_a_project, setText_select_a_project] =
    useState("Select a Project");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_addproject, setText_addproject] = useState("Add Project");
  const [text_description_ph, setText_description_ph] =
    useState("Enter Description");
  const [addproject_err, setAddproject_err] = useState("Please Select Project");
  const [text_err_projname, setText_err_projname] = useState(
    "Please Enter Project Name"
  );
  const [text_err_hrs, setText_err_hrs] = useState(
    "Working hours should be between 0 to 24"
  );
  const [text_description, setText_description] = useState("Description");
  const [week_start_text, setWeek_start_text] = useState("Week Start");
  const [week_end_text, setWeek_end_text] = useState("Week End");
  const [text_selectdate, setText_selectdate] = useState("Select Date");
  const [text_project_name, setText_project_name] = useState("Project Name");
  const [text_projectname_ph, setText_projectname_ph] =
    useState("Enter Project Name");
  const [text_clientname, setText_clientname] = useState("Client Name");
  const [text_clientname_ph, setText_clientname_ph] =
    useState("Enter Client Name");
  const [text_hrs, setText_hrs] = useState("Hours");
  const [text_hours, setText_hours] = useState("Enter Hours");
  const [text_err_hours, setText_err_hours] = useState("Please Enter Hours");
  const [text_err_client_name, setText_err_client_name] = useState(
    "Please Enter Client Name"
  );
  const [addweekly_textv2, setAddweekly_textv2] = useState("Select Project");
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  // language variable end

  //variable
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const todayDate = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(startDate, 6));
  const [errProject, setErrproject] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupDate, setPopupDate] = useState(new Date());
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectname] = useState("");
  const [desPopup, setDesPopup] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);
  const [ProjectsaveDisable, setProjectSaveDisable] = useState(false);
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openSaveMessage, setOpenSaveMessage] = useState([]);

  const [monHrs, setMonHrs] = useState("");
  const [tueHrs, settueHrs] = useState("");
  const [wedHrs, setWedHrs] = useState("");
  const [thusHrs, setThusHrs] = useState("");
  const [friHrs, setFriHrs] = useState("");
  const [satHrs, setSatHrs] = useState("");
  const [sunHrs, setSunHrs] = useState("");

  const [monDes, setMonDes] = useState("");
  const [tueDes, setTueDes] = useState("");
  const [wedDes, setWedDes] = useState("");
  const [thusDes, setThusDes] = useState("");
  const [friDes, setFriDes] = useState("");
  const [satDes, setSatDes] = useState("");
  const [sunDes, setSunDes] = useState("");

  const [selectMonProject, setSelectMonProject] = useState("");
  const [selectTueProject, setselectTueProject] = useState("");
  const [selectWedProject, setSelectWedProject] = useState("");
  const [selectThusProject, setSelectThusProject] = useState("");
  const [selectFriProject, setSelectFriProject] = useState("");
  const [selectSatProject, setSelectSatProject] = useState("");
  const [selectSunProject, setSelectSunProject] = useState("");

  //popup validation variable
  const [errprojectname, setErrprojectname] = useState("");
  const [errClientName, setErrClientname] = useState("");

  //weekly validation
  const [errHourSUN, setErrHourSUN] = useState("");
  const [errHourMON, setErrHourMON] = useState("");
  const [errHourTUE, setErrHourTUE] = useState("");
  const [errHourWED, setErrHourWED] = useState("");
  const [errHourTHUS, setErrHourTHUS] = useState("");
  const [errHourFRI, setErrHourFRI] = useState("");
  const [errHourSAT, setErrHourSAT] = useState("");

  const [errselectProMon, seterrselectProMon] = useState("");
  const [errselectProTue, seterrselectProTue] = useState("");
  const [errselectProWed, seterrselectProWed] = useState("");
  const [errselectProThus, seterrselectProThus] = useState("");
  const [errselectProFri, seterrselectProFri] = useState("");
  const [errselectProSat, seterrselectProSat] = useState("");
  const [errselectProSun, seterrselectProSun] = useState("");

  const closePopup = () => {
    setPopup(false);
    setErrClientname("");
    setErrprojectname("");
    setClientName("");
    setProjectname("");
    setDesPopup("");
    setPopupDate(new Date());
  };

  const handleClose = () => {
    setOpenSavePopup(false);
    navigate("/timesheet", { state: { data: 1 } });
    var sentdate = dayjs(startDate).format("YYYY-MM-DD");
    sessionStorage.setItem("startDate", sentdate);
    dispatch(getWeeklyTimesheet());
  };
  useEffect(() => {
    var empID = sessionStorage.getItem(GlobalConstants.session_current_emp_id);
    if (projectData?.length === 0 || projectData?._id !== empID) {
      dispatch(getTimesheetProject());
    }
  }, []);

  //Popup Validation
  const weeklyTimesheetValidation = () => {
    var weeklyValidation = true;
    if (projectName === "") {
      weeklyValidation = false;
      setErrprojectname(<>{text_err_projname}</>);
    }
    if (clientName === "") {
      weeklyValidation = false;
      setErrClientname(<>*{text_err_client_name}!</>);
    }
    setProjectSaveDisable(false);
    return weeklyValidation;
  };

  //ADD Project API
  const addnewprojecthandler = () => {
    if (weeklyTimesheetValidation()) {
      setProjectSaveDisable(true);
      const request_start_at = performance.now();
      var type = "insert";
      var currentempid = sessionStorage.getItem("currentempid");
      const apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/project?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      const d = {
        _id: "",
        _orgId: sessionStorage.getItem("_compId"),
        _partition: GlobalConstants._partition,
        name: projectName === "" ? "NA" : projectName,
        clientName: clientName === "" ? "NA" : clientName,
        employeeId: currentempid,
        status: "InProgress",
        date: popupDate === "" ? "Jan 01,2022" : popupDate,
        description: desPopup === "" ? "NA" : desPopup,
        createdon: "2021-06-14",
        createdby: sessionStorage.getItem("username"),
      };

      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          var list = res.data;
          setProjectSaveDisable(false);
          dispatch(getTimesheetProject());
          successToast("Project Added Successfully");
          console.log(
            "ID:05902=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
          closePopup();
        })
        .catch(function (error) {
          setProjectSaveDisable(false);
          errorToast(error.response.data.message);
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

  const onChangeHandle = (dates) => {
    sessionStorage.setItem("startDate", dates);
    setStartDate(dates);
    setEndDate(dayjs(dates).add(6, "days"));
  };
  //week selected date
  var tempSun = dayjs(startDate).add(0, "d");
  var workingsun = tempSun.format("YYYY-MM-DD");
  var tempMon = dayjs(startDate).add(1, "d");
  var workingmon = tempMon.format("YYYY-MM-DD");
  var tempTue = dayjs(startDate).add(2, "d");
  var workingtue = tempTue.format("YYYY-MM-DD");
  var tempWed = dayjs(startDate).add(3, "d");
  var workingwed = tempWed.format("YYYY-MM-DD");
  var tempThus = dayjs(startDate).add(4, "d");
  var workingthus = tempThus.format("YYYY-MM-DD");
  var tempFri = dayjs(startDate).add(5, "d");
  var workingfri = tempFri.format("YYYY-MM-DD");
  var tempSat = dayjs(startDate).add(6, "d");
  var workingsat = tempSat.format("YYYY-MM-DD");

  //weeklyTimesheet Validation
  const timesheetValidation = () => {
    var weeklyTimeValidation = true;
    if (sunHrs === "") {
      weeklyTimeValidation = false;
      setErrHourSUN(<>*{text_err_hours} !</>);
    } else if (sunHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourSUN(<>*{text_err_hrs} !</>);
    }
    if (monHrs === "") {
      weeklyTimeValidation = false;
      setErrHourMON(<>*{text_err_hours} !</>);
    } else if (monHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourMON(<>*{text_err_hrs} !</>);
    }
    if (tueHrs === "") {
      weeklyTimeValidation = false;
      setErrHourTUE(<>*{text_err_hours} !</>);
    } else if (tueHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourTUE(<>*{text_err_hrs} !</>);
    }
    if (wedHrs === "") {
      weeklyTimeValidation = false;
      setErrHourWED(<>*{text_err_hours} !</>);
    } else if (wedHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourWED(<>*{text_err_hrs} !</>);
    }
    if (thusHrs === "") {
      weeklyTimeValidation = false;
      setErrHourTHUS(<>*{text_err_hours} !</>);
    } else if (thusHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourTHUS(<>*{text_err_hrs} !</>);
    }
    if (friHrs === "") {
      weeklyTimeValidation = false;
      setErrHourFRI(<>*{text_err_hours} !</>);
    } else if (friHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourFRI(<>*{text_err_hrs} !</>);
    }
    if (satHrs === "") {
      weeklyTimeValidation = false;
      setErrHourSAT(<>*{text_err_hours} !</>);
    } else if (satHrs >= 25 || sunHrs < 0) {
      weeklyTimeValidation = false;
      setErrHourSAT(<>*{text_err_hrs} !</>);
    }
    if (selectMonProject === "" || selectMonProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProMon(<>*{addproject_err}!</>);
    }
    if (selectTueProject === "" || selectTueProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProTue(<>*{addproject_err}!</>);
    }
    if (selectWedProject === "" || selectWedProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProWed(<>*{addproject_err}!</>);
    }
    if (selectThusProject === "" || selectThusProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProThus(<>*{addproject_err}!</>);
    }
    if (selectFriProject === "" || selectFriProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProFri(<>*{addproject_err}!</>);
    }
    if (selectSatProject === "" || selectSatProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProSat(<>*{addproject_err}!</>);
    }
    if (selectSunProject === "" || selectSunProject === "addProject") {
      weeklyTimeValidation = false;
      seterrselectProSun(<>*{addproject_err}!</>);
    }
    setSaveDisable(false);
    return weeklyTimeValidation;
  };

  //add data API
  const AddtimesheetWeekly = () => {
    if (timesheetValidation(true)) {
      setSaveDisable(true);
      var type = "insert";
      const apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/timesheetweekly?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var currentempid = sessionStorage.getItem("currentempid");
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

      var sun = {
        _orgId: sessionStorage.getItem("_compId"),
        _id: "",
        _partition: GlobalConstants._partition,
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingsun === ""
            ? "2022-01-01"
            : dayjs(workingsun).format("YYYY-MM-DD"),
        hours: sunHrs === "" ? "NA" : sunHrs,
        description: sunDes === "" ? "NA" : sunDes,
        projectId: selectSunProject === "" ? "NA" : selectSunProject,
      };
      var mon = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingmon === ""
            ? "2022-01-02"
            : dayjs(workingmon).format("YYYY-MM-DD"),
        hours: monHrs === "" ? "NA" : monHrs,
        description: monDes === "" ? "NA" : monDes,
        projectId: selectMonProject === "" ? "NA" : selectMonProject,
      };

      var workingSheetTuesday = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingtue === ""
            ? "2022-01-03"
            : dayjs(workingtue).format("YYYY-MM-DD"),
        hours: tueHrs === "" ? "NA" : tueHrs,
        description: tueDes === "" ? "NA" : tueDes,
        projectId: selectTueProject === "" ? "NA" : selectTueProject,
      };
      var workingSheetWednesday = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingwed === ""
            ? "2022-01-04"
            : dayjs(workingwed).format("YYYY-MM-DD"),
        hours: wedHrs === "" ? "NA" : wedHrs,
        description: wedDes === "" ? "NA" : wedDes,
        projectId: selectWedProject === "" ? "NA" : selectWedProject,
      };

      var workingSheetThursday = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingthus === ""
            ? "2022-01-05"
            : dayjs(workingthus).format("YYYY-MM-DD"),
        hours: thusHrs === "" ? "NA" : thusHrs,
        description: thusDes === "" ? "NA" : thusDes,
        projectId: selectThusProject === "" ? "NA" : selectThusProject,
      };

      var workingSheetFriday = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingfri === ""
            ? "2022-01-06"
            : dayjs(workingfri).format("YYYY-MM-DD"),
        hours: friHrs === "" ? "NA" : friHrs,
        description: friDes === "" ? "NA" : friDes,
        projectId: selectFriProject === "" ? "NA" : selectFriProject,
      };

      var workingSheetSaturday = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        timeIn: "NA",
        timeOut: "NA",
        date:
          workingsat === ""
            ? "2022-01-07"
            : dayjs(workingsat).format("YYYY-MM-DD"),
        hours: satHrs === "" ? "NA" : satHrs,
        description: satDes === "" ? "NA" : satDes,
        projectId: selectSatProject === "" ? "NA" : selectSatProject,
      };

      var weeklist = [];
      weeklist.push(sun);
      weeklist.push(mon);
      weeklist.push(workingSheetTuesday);
      weeklist.push(workingSheetWednesday);
      weeklist.push(workingSheetThursday);
      weeklist.push(workingSheetFriday);
      weeklist.push(workingSheetSaturday);

      const d = {
        weeklist: weeklist,
        _orgId: sessionStorage.getItem("_compId"),
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var res = response.data.approvalDetails;
          // successToast("TimeSheet Added Successfully");
          setSaveDisable(false);
          setOpenSaveMessage(res);
          setOpenSavePopup(true);
        })
        .catch(function (error) {
          setSaveDisable(false);
          errorToast(error.response.data.message);
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_select_a_project(
      doc.querySelector("string[name='text_select_a_project']")?.textContent
    );
    setText_addproject(
      doc.querySelector("string[name='text_addproject']")?.textContent
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent
    );
    setText_description_ph(
      doc.querySelector("string[name='text_description_ph']")?.textContent
    );

    setText_err_hrs(
      doc.querySelector("string[name='text_err_hrs']")?.textContent
    );
    setAddproject_err(
      doc.querySelector("string[name='addproject_err']")?.textContent
    );
    setWeek_start_text(
      doc.querySelector("string[name='week_start_text']")?.textContent
    );
    setWeek_end_text(
      doc.querySelector("string[name='week_end_text']")?.textContent
    );
    setText_err_projname(
      doc.querySelector("string[name='text_err_projname']")?.textContent
    );
    setText_selectdate(
      doc.querySelector("string[name='text_selectdate']")?.textContent
    );
    setText_project_name(
      doc.querySelector("string[name='text_project_name']")?.textContent
    );
    setText_projectname_ph(
      doc.querySelector("string[name='text_projectname_ph']")?.textContent
    );
    setText_clientname(
      doc.querySelector("string[name='text_clientname']")?.textContent
    );
    setText_clientname_ph(
      doc.querySelector("string[name='text_clientname_ph']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_hrs(doc.querySelector("string[name='text_hrs']")?.textContent);
    setText_hours(doc.querySelector("string[name='text_hours']")?.textContent);
    setText_err_hours(
      doc.querySelector("string[name='text_err_hours']")?.textContent
    );
    setText_err_client_name(
      doc.querySelector("string[name='text_err_client_name']")?.textContent
    );
    setAddweekly_textv2(
      doc.querySelector("string[name='addweekly_textv2']")?.textContent
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

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });
  return (
    <>
      <div
        className={popup === true ? "p-4 contentbg bgblur1" : "p-4 contentbg"}
      >
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
        <div className="row">
          <div className="col-md-6">
            <h4>{sessionStorage.getItem("employee_name")}</h4>
          </div>
          <div className="col-md-6 text-end" id="dateWeekly">
            <h4> {dayjs(todayDate).format("MMM DD, yyyy")}</h4>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4" id="weeklyMob">
            <h5>{week_start_text}</h5>
            <DatePicker
              dateFormat="MMM dd,yyyy"
              onChange={onChangeHandle}
              selected={startDate}
              className="weeklyinputs timesheetinput"
            />
          </div>
          <div className="col-md-4">
            <h5>{week_end_text}</h5>
            <DatePicker
              value={dayjs(endDate).format("MMM DD,YYYY")}
              disabled
              className="weeklyinputs timesheetinput"
            />
          </div>
          <div className="col-md-4">
            {selectMonProject === "addProject" ||
            selectTueProject === "addProject" ||
            selectWedProject === "addProject" ||
            selectThusProject === "addProject" ||
            selectFriProject === "addProject" ||
            selectSatProject === "addProject" ||
            selectSunProject === "addProject" ? (
              <>
                <button
                  className="CreateBtn btn_top"
                  id="btnmob"
                  onClick={() => setPopup(!popup)}
                >
                  + {text_addproject}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <Divider className="mt-2" />
        <div id="scroll_wallet" className="scrollMob scroll_weekly">
          <div className="mt-3" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingsun).format("MMM DD,YYYY")}
            </h5>
            <div className="row mt-3 mx-2">
              <div className="col-md-4 ">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  onChange={(e) => [
                    setSelectSunProject(e.target.value),
                    seterrselectProSun(""),
                  ]}
                  value={selectSunProject}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProSun}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    setSunHrs(e.target.value),
                    setErrHourSUN(""),
                  ]}
                  value={sunHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourSUN}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setSunDes(e.target.value)}
                  value={sunDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
          <Divider className="mt-2" />
          <div className="mt-2" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingmon).format("MMM DD,YYYY")}
            </h5>

            <div className="row mt-3 mx-2">
              <div className="col-md-4">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  onChange={(e) => [
                    setSelectMonProject(e.target.value),
                    seterrselectProMon(""),
                  ]}
                  value={selectMonProject}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProMon}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    setMonHrs(e.target.value),
                    setErrHourMON(""),
                  ]}
                  value={monHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourMON}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setMonDes(e.target.value)}
                  value={monDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
          <Divider className="mt-2" />
          <div className="mt-3" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingtue).format("MMM DD,YYYY")}
            </h5>
            <div className="row mt-2 mx-2">
              <div className="col-md-4 ">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  onChange={(e) => [
                    setselectTueProject(e.target.value),
                    seterrselectProTue(""),
                  ]}
                  value={selectTueProject}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProTue}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    settueHrs(e.target.value),
                    setErrHourTUE(""),
                  ]}
                  value={tueHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourTUE}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setTueDes(e.target.value)}
                  value={tueDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
          <Divider className="mt-2" />
          <div className="mt-3" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingwed).format("MMM DD,YYYY")}
            </h5>
            <div className="row mt-3 mx-2">
              <div className="col-md-4 ">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  onChange={(e) => [
                    setSelectWedProject(e.target.value),
                    seterrselectProWed(""),
                  ]}
                  value={selectWedProject}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProWed}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    setWedHrs(e.target.value),
                    setErrHourWED(""),
                  ]}
                  value={wedHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourWED}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setWedDes(e.target.value)}
                  value={wedDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
          <Divider className="mt-2" />
          <div className="mt-3" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingthus).format("MMM DD,YYYY")}
            </h5>
            <div className="row mt-3 mx-2">
              <div className="col-md-4">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  value={selectThusProject}
                  onChange={(e) => [
                    setSelectThusProject(e.target.value),
                    seterrselectProThus(""),
                  ]}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProThus}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    setThusHrs(e.target.value),
                    setErrHourTHUS(""),
                  ]}
                  value={thusHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourTHUS}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setThusDes(e.target.value)}
                  value={thusDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
          <Divider className="mt-2" />
          <div className="mt-3" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingfri).format("MMM DD,YYYY")}
            </h5>
            <div className="row mt-3 mx-2">
              <div className="col-md-4">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  onChange={(e) => [
                    setSelectFriProject(e.target.value),
                    seterrselectProFri(""),
                  ]}
                  value={selectFriProject}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProFri}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    setFriHrs(e.target.value),
                    setErrHourFRI(""),
                  ]}
                  value={friHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourFRI}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setFriDes(e.target.value)}
                  value={friDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
          <Divider className="mt-2" />
          <div className="mt-3" id="mobweekly">
            <h5 className="text-center">
              {dayjs(workingsat).format("MMM DD,YYYY")}
            </h5>
            <div className="row mt-3 mx-2">
              <div className="col-md-4">
                <h5>
                  {addweekly_textv2}
                  <span className="Star">*</span>
                </h5>
                <select
                  className="CountryInputbox1 walletinput weeklyselect"
                  onChange={(e) => [
                    setSelectSatProject(e.target.value),
                    seterrselectProSat(""),
                  ]}
                  value={selectSatProject}
                >
                  <option selected value="selected">
                    {text_select_a_project}
                  </option>
                  <option value="addProject">{text_addproject}</option>
                  {projectData.map((value) => {
                    return (
                      <>
                        <option value={value?._id}>{value.name}</option>
                      </>
                    );
                  })}
                </select>
                <p className="sperrtext">{errselectProSat}</p>
              </div>
              <div className="col-md-4">
                <h5>
                  {text_hrs}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  placeholder={text_hours}
                  onChange={(e) => [
                    setSatHrs(e.target.value),
                    setErrHourSAT(""),
                  ]}
                  value={satHrs}
                  className="weeklyinputs timesheetinput"
                />
                <p className="sperrtext">{errHourSAT}</p>
              </div>
              <div className="col-md-4">
                <h5>{text_description}</h5>
                <input
                  placeholder={text_description_ph}
                  onChange={(e) => setSatDes(e.target.value)}
                  value={satDes}
                  className="weeklyinputs timesheetinput"
                />
              </div>
            </div>
          </div>
        </div>
        <Divider className="mt-3" />
        <center>
          <Link to="/timesheet" state={{ data: 1 }}>
            <button className="btncancel mt-3">{button_cancel}</button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btnsave mt-2"
            onClick={AddtimesheetWeekly}
            disabled={saveDisable}
          >
            {button_save}
          </button>
        </center>
      </div>
      {popup === true ? (
        <>
          <div className="main">
            <div className="popup-daily" id="popupmobile_timesheet">
              <div className="text-end">
                <h3 className="close mb-3 p-0" id="closeMob">
                  <CgCloseO onClick={closePopup} />
                </h3>
              </div>
              <center>
                <h4 className="categorytext">{text_addproject}</h4>
              </center>
              <hr />
              <div className="row mx-5" id="scroll_wallet">
                <div className="col-md-5">
                  <h5>
                    {text_selectdate}
                    <span className="Star">*</span>
                  </h5>
                  <DatePicker
                    dateFormat="MMM dd, yyyy"
                    onChange={(date) => setPopupDate(date)}
                    selected={popupDate}
                    popperPlacement="auto"
                  />
                  <h5 className="mt-4">
                    {text_clientname}
                    <span className="Star">*</span>
                  </h5>
                  <input
                    type="text"
                    onChange={(e) => [
                      setClientName(e.target.value),
                      setErrClientname(""),
                    ]}
                    value={clientName}
                    placeholder={text_clientname_ph}
                  />
                  <p className="sperrtext">{errClientName}</p>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-5 weeklypopuppname">
                  <h5>
                    {text_project_name}
                    <span className="Star">*</span>
                  </h5>
                  <input
                    type="text"
                    onChange={(e) => [
                      setProjectname(e.target.value),
                      setErrprojectname(""),
                    ]}
                    value={projectName}
                    placeholder={text_projectname_ph}
                  />
                  <p className="sperrtext">{errprojectname}</p>
                  <h5 className="mt-4">{text_description}</h5>
                  <textarea
                    onChange={(e) => setDesPopup(e.target.value)}
                    value={desPopup}
                    className="des_time"
                    placeholder={text_description_ph}
                  />
                </div>
              </div>
              <Divider className="mt-4 mb-3" />
              <center>
                <button className="btncancel" onClick={closePopup}>
                  {button_cancel}
                </button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btnsave mt-2"
                  onClick={addnewprojecthandler}
                  disabled={ProjectsaveDisable}
                >
                  {button_save}
                </button>
              </center>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default AddWeeklyTimesheet;
