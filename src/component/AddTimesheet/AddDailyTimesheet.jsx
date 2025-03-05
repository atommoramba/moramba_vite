import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import DatePicker from "react-datepicker";
import { CgCloseO } from "react-icons/cg";
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
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import Cookie from "js-cookie";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getTimesheetProject } from "../../redux/TimesheetProjectSlice";
import { Link, useNavigate } from "react-router-dom";
import { getDailyTimesheet } from "../../redux/DailyTimesheetSlice";
import { FaRegThumbsUp } from "react-icons/fa";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function AddDailyTimesheet() {
  const navigate = useNavigate();

  //redux data from TimesheetProject
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.TimesheetProject);

  //Language Variabe
  const [text_select_a_project, setText_select_a_project] =
    useState("Select a Project");
  const [text_time_in, setText_time_in] = useState("Time In");
  const [text_time_out, setText_time_out] = useState("Time Out");
  const [text_description, setText_description] = useState("Description");
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable1, setSaveDisable1] = useState(false);
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_addproject, setText_addproject] = useState("Add Project");
  const [text_description_ph, setText_description_ph] =
    useState("Enter Description");
  const [text_err_projname, setText_err_projname] = useState(
    "Please Enter Project Name"
  );
  const [text_selectdate, setText_selectdate] = useState("Select Date");
  const [text_project_name, setText_project_name] = useState("Project Name");
  const [text_projectname_ph, setText_projectname_ph] =
    useState("Enter Project Name");
  const [text_clientname, setText_clientname] = useState("Client Name");
  const [text_clientname_ph, setText_clientname_ph] =
    useState("Enter Client Name");
  const [text_err_client_name, setText_err_client_name] = useState(
    "Please Enter Client Name"
  );
  const [addproject_err, setAddproject_err] = useState("Please Select Project");
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  const [text_err_hrs, setText_err_hrs] = useState(
    "Working hours should be between 0 to 24"
  );
  const [text_hrs, setText_hrs] = useState("Hours");
  const [text_hours, setText_hours] = useState("Enter Hours");
  const [text_err_hours, setText_err_hours] = useState("Please Enter Hours");
  //language end

  //variable
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const todayDate = new Date();
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectProject, setSelectProject] = useState("selected");
  const [timeIn, setTimeIn] = useState(new Date());
  const [timeOut, setTimeOut] = useState(new Date());
  const [errProject, setErrproject] = useState("");
  const [description, setDescription] = useState("");
  const [errDescription, setErrDescription] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupDate, setPopupDate] = useState(new Date());
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectname] = useState("");
  const [desPopup, setDesPopup] = useState("");
  const [dailyClick, setDailyClick] = useState(false);
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openSaveMessage, setOpenSaveMessage] = useState([]);
  const [Hrs, setHrs] = useState("");
  const [HrsErr, setHrsErr] = useState("");
  const handleClose = () => {
    setOpenSavePopup(false);
    navigate("/timesheet", { state: { data: 0 } });
  };
  //popup validation variable
  const [errprojectname, setErrprojectname] = useState("");
  const [errClientName, setErrClientname] = useState("");

  //dailyTimesheet Validation
  const timesheetValidation = () => {
    var dailyTimeValidation = true;
    if (selectProject === "selected" || selectProject === "addProject") {
      dailyTimeValidation = false;
      setErrproject(<>*{addproject_err}</>);
    }
    if (Hrs === "") {
      dailyTimeValidation = false;
      setHrsErr(<>*{text_err_hours} !</>);
    } else if (Hrs >= 25 || Hrs < 0) {
      dailyTimeValidation = false;
      setHrsErr(<>*{text_err_hrs} !</>);
    }
    setDailyClick(false);
    return dailyTimeValidation;
  };

  const closePopup = () => {
    setPopup(false);
    setErrClientname("");
    setErrprojectname("");
    setClientName("");
    setProjectname("");
    setDesPopup("");
    setPopupDate(new Date());
  };

  useEffect(() => {
    var empID = sessionStorage.getItem(GlobalConstants.session_current_emp_id);
    if (projectData?.length === 0 || projectData?._id !== empID) {
      dispatch(getTimesheetProject());
    }
  }, []);

  //Popup Validation
  const dailyTimesheetValidation = () => {
    var dailyValidation = true;
    if (projectName === "") {
      dailyValidation = false;
      setErrprojectname(<>{text_err_projname}</>);
    }
    if (clientName === "") {
      dailyValidation = false;
      setErrClientname(<>*{text_err_client_name}!</>);
    }
    setSaveDisable1(false);
    return dailyValidation;
  };

  //ADD Project API
  const addnewprojecthandler = () => {
    if (dailyTimesheetValidation()) {
      setSaveDisable1(true);
      const request_start_at = performance.now();
      var type = "insert";
      var currentempid = sessionStorage.getItem("currentempid");
      var _compId = sessionStorage.getItem("_compId");
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
        _orgId: _compId,
        _partition: GlobalConstants._partition,
        name: projectName === "" ? "NA" : projectName,
        clientName: clientName === "" ? "NA" : clientName,
        employeeId: currentempid,
        status: "InProgress",
        date: popupDate === "" ? "2022-01-01" : popupDate,
        description: desPopup === "" ? "NA" : desPopup,
        createdon: new Date(),
        createdby: sessionStorage.getItem("username"),
      };

      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          setSelectProject("");
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          var list = res.data;
          setSaveDisable1(false);
          dispatch(getTimesheetProject());
          setSelectProject(list?._id);
          console.log(list);
          successToast("Project Added Successfully");
          console.log(
            "ID:05902=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
          setTimeOut(() => {
            closePopup();
          }, 1000);
        })
        .catch(function (error) {
          setSaveDisable1(false);
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

  //time in and timeout difference
  var timediff = dayjs
    .utc(
      dayjs(timeOut, "DD/MM/YYYY HH:mm:ss").diff(
        dayjs(timeIn, "DD/MM/YYYY HH:mm:ss")
      )
    )
    .format("HH:mm:ss");

  //Daily Data API Post data
  const AddtimesheetDaily = () => {
    setDailyClick(true);
    if (timesheetValidation()) {
      setDailyClick(true);
      const request_start_at = performance.now();
      var type = "insert";
      const apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/timesheetdaily?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
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
      var currentempid = sessionStorage.getItem("currentempid");
      const d = {
        _id: "",
        _partition: GlobalConstants._partition,
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: currentempid,
        projectId: selectProject === "" ? "NA" : selectProject,
        date: dayjs(selectDate).format("YYYY-MM-DD"),
        timeIn:
          dayjs(timeIn).format("hh:mm a") === ""
            ? "00:00"
            : dayjs(timeIn).format("hh:mm a"),
        timeOut:
          dayjs(timeOut).format("hh:mm a") === ""
            ? "08:00"
            : dayjs(timeOut).format("hh:mm a"),
        hours: Hrs,
        description: description === "" ? "NA" : description,
        createdon:
          projectDateUTC.format("YYYY-MM-DD") === ""
            ? "2022-01-01"
            : projectDateUTC.format("YYYY-MM-DD"),
        createdby: sessionStorage.getItem("username"),
        workStatus: "Start",
        sheetType: "Daily",
      };

      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data.approvalDetails;
          setOpenSavePopup(true);
          setOpenSaveMessage(res);
          if (response.status === 200) {
            dispatch(getDailyTimesheet());
            console.log(
              "ID:05903=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
            // successToast("TimeSheet Added Successfully");
          }
        })
        .catch(function (error) {
          setDailyClick(false);
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

  const filterPassedTime1 = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return timeIn < selectedDate.getTime();
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_selectdate(
      doc.querySelector("string[name='text_selectdate']")?.textContent
    );
    setText_time_in(
      doc.querySelector("string[name='text_time_in']")?.textContent
    );
    setText_time_out(
      doc.querySelector("string[name='text_time_out']")?.textContent
    );
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
    setText_project_name(
      doc.querySelector("string[name='text_project_name']")?.textContent
    );
    setText_projectname_ph(
      doc.querySelector("string[name='text_projectname_ph']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_err_projname(
      doc.querySelector("string[name='text_err_projname']")?.textContent
    );
    setText_clientname(
      doc.querySelector("string[name='text_clientname']")?.textContent
    );
    setText_clientname_ph(
      doc.querySelector("string[name='text_clientname_ph']")?.textContent
    );
    setText_err_client_name(
      doc.querySelector("string[name='text_err_client_name']")?.textContent
    );
    setAddproject_err(
      doc.querySelector("string[name='addproject_err']")?.textContent
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
          <div className="col-md-6 ">
            <h4>{sessionStorage.getItem("employee_name")}</h4>
          </div>
          <div className="col-md-6 text-end" id="dateWeekly">
            <h4> {dayjs(todayDate).format("MMM DD, yyyy")}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 mt-4">
            <h5>
              {text_selectdate}
              <span className="Star">*</span>
            </h5>
            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              dateFormat="MMM dd, yyyy"
              className="timesheetinput"
            />

            <h5 className="mt-4">
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
              onChange={(e) => [setHrs(e.target.value), setHrsErr("")]}
              value={Hrs}
              className="weeklyinputs timesheetinput"
            />
            <p className="sperrtext">{HrsErr}</p>
            {/* <div className="row adddailytimesheet-time">
              <div className="col-md-6">
                <h5 className="mt-4">{text_time_in}</h5>
                <DatePicker
                  selected={timeIn}
                  onChange={(date) => setTimeIn(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="timesheetinput"
                />
              </div>
              <div className="col-md-6 timeoutdiv">
                <h5 className="timesty mt-4" id="timeout">
                  {text_time_out}
                </h5>
                <DatePicker
                  selected={timeOut}
                  onChange={(date) => setTimeOut(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  filterTime={filterPassedTime1}
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="timesheetinput"
                />
              </div>
            </div> */}

            <h5 className="mt-4">
              {text_select_a_project}
              <span className="Star">*</span>
            </h5>
            <select
              className="CountryInputbox1 walletinput adddailytimesheet-dropdown"
              value={selectProject}
              onChange={(e) => [
                setSelectProject(e.target.value),
                setErrproject(""),
              ]}
            >
              <option selected disabled value="selected">
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
            {selectProject === "addProject" ? (
              <>
                <button
                  className="CreateBtn mx-2 adddailytimesheet-addproject-btn"
                  id="btnmob"
                  onClick={() => [setPopup(!popup), setSelectProject("")]}
                >
                  + {text_addproject}
                </button>
              </>
            ) : (
              ""
            )}
            <p className="sperrtext">{errProject}</p>
            <h5 className="mt-4">{text_description}</h5>
            <textarea
              className="des_time"
              placeholder={text_description_ph}
              onChange={(e) => [
                setDescription(e.target.value),
                setErrDescription(""),
              ]}
              value={description}
            />
          </div>
        </div>
        <div className="mt-5">
          <Link to="/timesheet" state={{ data: 0 }}>
            <button className="btncancel me-3">{button_cancel}</button>
          </Link>
          <button
            className="btnsave mt-2"
            disabled={dailyClick}
            onClick={AddtimesheetDaily}
          >
            {button_save}
          </button>
        </div>
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
                <div className="col-md-5 add">
                  <h5>
                    {text_selectdate}
                    <span className="Star">*</span>
                  </h5>
                  <DatePicker
                    dateFormat="MMM dd, yyyy"
                    onChange={(date) => setPopupDate(date)}
                    selected={popupDate}
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
                <div className="col-md-5 adddailytimesheetpopuppname">
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
                    className="des_time adddailytimesheet-popup-desc"
                    placeholder={text_description_ph}
                  />
                </div>
              </div>
              <Divider className="mt-4 mb-3" />
              <center className="adddailytspopupbtn">
                <button className="btncancel" onClick={closePopup}>
                  {button_cancel}
                </button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btnsave mt-2"
                  onClick={addnewprojecthandler}
                  disabled={saveDisable1}
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
    </>
  );
}

export default AddDailyTimesheet;
