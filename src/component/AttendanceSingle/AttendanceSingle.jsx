import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "../AttendanceSingle/AttendanceSingle.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";

import { CgCloseO } from "react-icons/cg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmpSalaryData } from "../../redux/EmpSalaryDetailsSlice";
import { getEmpAttendanceSingle } from "../../redux/AttendanceSingleSlice";
import { getEmpAttendanceTableData } from "../../redux/AttendanceSingleTableDataSlice";
import momentPlugin from "@fullcalendar/moment";
import { ToastContainer } from "react-toastify";
import { getRequestsList } from "../../redux/RequestsListSlice";
import Cookie from "js-cookie";
import $ from "jquery";
import {
  useMediaQuery,
  useTheme,
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { FaRegThumbsUp } from "react-icons/fa";
import { getEmpData } from "../../redux/EmpDataSlice";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function AttendanceSingle() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEmpAttendanceData = useSelector(
    (state) => state.EmpAttendacnceSingleData
  );
  const AttendanceTaleData = useSelector(
    (state) => state.EmpAttendacnceSingleTableData
  );

  const [ChangedData, setChangedData] = useState(new Date());
  const SelectedEmpData = useSelector((state) => state.empData);
  const [dateselect, setDateselect] = useState([]);
  const [popup, setPopup] = useState(false);
  const [present, setPresent] = useState("");
  const [popup2, setPopup2] = useState(false);
  //validation var
  const [attendance, setAttendance] = useState("");
  const [errfromdate, setErrfromdate] = useState("");
  const [errtodate, setErrtodate] = useState("");
  const [vacationday, setvacatinday] = useState("");

  //Language Variables Start
  //old Language Const
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [text_End_Date, setText_End_Date] = useState("End Date");
  const [text_other, setText_other] = useState("Other");
  const [text_Personal_Timeoff, setText_Personal_Timeoff] =
    useState("Personal Timeoff");
  const [text_half_day, setText_half_day] = useState("Half Day");
  const [text_over_time, setText_over_time] = useState("OverTime");
  const [text_vacation, setText_vacation] = useState("Vacation");
  const [text_description, setText_description] = useState("Description");
  const [descPH, setDescPH] = useState("Enter Description");
  const [text_Leave_note, setText_Leave_note] = useState("Leave Note");
  const [text_Enter_Leave, setText_Enter_Leave] = useState("Enter Leave Note");
  const [text_heading, setTextHeading] = useState("Available Vacation");
  const [text_status_type, setText_status_type] = useState("Status Type");
  const [text_remark, setText_remark] = useState("Remark");
  const [text_absent, setText_absent] = useState("Absent");
  const [text_present, setText_present] = useState("Present");
  const [title_attendance, setTitle_attendance] = useState("Attendance");
  const [text_day, setText_day] = useState("Day");
  const [text_mark_vacation, setText_mark_vacation] = useState("Mark Vacation");
  const [text_mark_attendance, setText_mark_attendance] =
    useState("Mark Attendance");
  const [text_Full_Day, setText_Full_Day] = useState("Full Day");
  const [title_attendanceSingle, setTitle_attendanceSingle] =
    useState("Attendance for");
  const [halfDaysText, setHalfDaysText] = useState("Half Days");
  const [fullDaysText, setFullDaysText] = useState("Full Days");
  const [text_attendance_type, settext_attendance_type] = useState(
    "Select Attendance Type"
  );
  const [firstHalf_text, setFirstHalf_text] = useState("First Half");
  const [secondHalf_text, setSecondHalf_text] = useState("Second Half");
  const [text_SelHalfDay, setText_SelHalfDay] = useState("Select Half Day");
  const [text_statusHday, setText_statusHday] = useState("Status Halfday");
  const [text_SelAttStatus, setText_SelAttStatus] = useState(
    "Select Attendance Status"
  );
  const [lateMark_Text, setLateMark_Text] = useState("Late Mark");
  const [errattendance_text, setErrattendance_text] = useState(
    "Please Select Attendance Type"
  );
  const [text_val_date, settext_val_date] = useState("Please Select Date");
  const [text_errstatus, setText_errstatus] = useState(
    "Please Select Status Type"
  );
  const [text_status, settext_status] = useState("Status");
  const [text_select_status_type, setText_select_status_type] =
    useState("Select Status Type");
  const [leave_text, setLeave_text] = useState("Leave");
  const [unpaidvac_text, setUnpaidvac_text] = useState("Unpaid Leave");
  const [marriagevac_text, setMarriagevac_text] = useState("Marriage Leave");
  const [paternity_text, setPaternity_text] = useState("Paternity Leave");
  const [maternity_text, setMaternity_text] = useState("Maternity Leave");
  const [privilege_text, setPrivilege_text] = useState("Privilege Leave");
  const [medicalleave_text, setMedicalleave_text] = useState("Medical Leave");
  const [atten_medical, setAtten_medical] = useState("Medical");
  const [atten_personal, setAtten_personal] = useState("Personal");
  const [text_holiday, setText_holiday] = useState("Holiday");
  const [text_monthlyView, setText_monthlyView] = useState("Monthly View");
  const [text_yearlyView, setText_yearlyView] = useState("Yearly View");
  const [text_public_hol, settext_public_hol] = useState("Public Holiday");
  const [text_days_taken, settext_days_taken] = useState("Days Taken");
  const [text_days_left, settext_days_left] = useState("Days Left");
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  //Language Variables End

  // vacation popup conditions
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startDated, setMeetingStartTime] = useState();
  const [endDated, setMeetingEndTime] = useState();
  const [statusbox, setStatusbox] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [events, setevents] = useState([]);
  const [colorchange, setColorChange] = useState("");
  const [leavenote, setLeavenote] = useState("");
  const [VacationStatus, setVacationStatus] = useState("Vacation/Leave");
  const [VacationStatusTypemulti, setVacationStatusTypemulti] = useState("");
  const [VacationStatusType, setVacationStatusType] = useState("");
  const [save_disable, setSave_disable] = useState(false);
  const [statuserr, setStatuserr] = useState("");
  const [buttondisable, setButtondisable] = useState(false);
  const [montlyYearlyCount, setMonthlyYearlyCount] = useState(false);
  const [YearlyData, setYearlyData] = useState([]);
  const [openVacationPopup, setOpenVacationPopup] = useState(false);
  const [openVacationMessage, setOpenVacationMessage] = useState([]);

  const handleClose = () => {
    setOpenVacationPopup(false);
  };

  const dateHandler = async (e, date_type) => {
    if (date_type === "startdate") {
      setStartDate(e.getTime());
    }
    if (date_type === "enddate") {
      setEndDate(e.getTime());
    }
    let year = e.getFullYear();
    let month = e.getMonth() + 1;
    let date = e.getDate();
    let hour = e.getHours();
    let minutes = e.getMinutes();
    let seconds = e.getSeconds();
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = parseInt(seconds);
      seconds = seconds.toFixed(3);
    }
    if (seconds === "0.000") {
      seconds = "00.000";
    }
    if (date_type === "startdate") {
      let selected_time = year + "-" + month + "-" + date;
      setMeetingStartTime(selected_time);
    }
    if (date_type === "enddate") {
      let selected_end_time = year + "-" + month + "-" + date;
      setMeetingEndTime(selected_end_time);
    }
  };
  // end
  const handlefirstClickOpen = (selectedDate) => {
    var SelectedDate = selectedDate.dateStr;
    var cmpFiscal = dayjs(sessionStorage.getItem("fiscalYear")).format(
      "YYYY-MM-DD"
    );
    if (SelectedDate >= cmpFiscal) {
      setPopup(!popup);
    } else {
      infoToast("You are not Allowed to Add Attendance On this Date!");
      setDateselect(SelectedDate);
    }
  };
  const handlesecondClickOpen = () => {
    setPopup2(!popup2);
  };
  const closePopup = () => {
    // setVacation("");
    // setLeavenote("");
    setDateselect([]);
    setEndDate("");
    setStartDate("");
    setDescription("");
    setPresent("");
    setStatusbox("");
    setCount(0);
    setPopup(false);
    setPopup2(false);
    setVacationStatusType("");
    setStatuserr("");
    setvacatinday("");
    setErrfromdate("");
    setVacationStatusTypemulti("");
    setAttendance("");
  };
  const isFutureDate = (date) => {
    var selectedDate = dayjs(date, "MM-DD-YYYY");
    var todayDate = dayjs(dayjs().format("MM-DD-YYYY"), "MM-DD-YYYY");

    var dDiff = todayDate.diff(selectedDate);
    if (dDiff < 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (getEmpAttendanceData?.length === 0) {
      console.log("ATTEDANCE API CALLED");
      dispatch(getEmpAttendanceSingle());
      getEmpAttendance();
    } else {
      console.log("ATTEDANCE API NOT CALLED");
      getEmpAttendance();
    }
  }, [getEmpAttendanceData?.length]);

  useEffect(() => {
    if (AttendanceTaleData?.length === 0) {
      dispatch(getEmpAttendanceTableData(new Date()));
    } else {
      console.log("TABLE API NOT CALLED");
    }
  }, [ChangedData]);
  useEffect(() => {
    dispatch(getEmpAttendanceTableData(ChangedData));
  }, [ChangedData]);
  useEffect(() => {
    if (montlyYearlyCount) {
      handleYearlyListData();
    }
  }, [montlyYearlyCount]);
  const getEmpAttendance = () => {
    console.log("IN", getEmpAttendanceData?.length);
    var allEmpAttendanceTemp = getEmpAttendanceData;
    var attendanceData = [];
    var eventData = [];
    for (let i = 0; i < allEmpAttendanceTemp.length; i++) {
      var employeeId = allEmpAttendanceTemp[i].employeeId + "";
      var attendanceDayUTC = allEmpAttendanceTemp[i].attendanceDayUTC + "";
      var status = allEmpAttendanceTemp[i].status + "";
      var statustype = allEmpAttendanceTemp[i].statustype + "";
      var hours = allEmpAttendanceTemp[i].hours + "";
      var HalfDayType =
        allEmpAttendanceTemp[i].HalfDayType === undefined
          ? "NA"
          : allEmpAttendanceTemp[i].HalfDayType + "";
      var approval_status =
        allEmpAttendanceTemp[i].approval_status === undefined
          ? "approved"
          : allEmpAttendanceTemp[i].approval_status;
      attendanceData.push({
        employeeId: employeeId,
        attendanceDayUTC: attendanceDayUTC,
        status: status,
        statustype: statustype,
        hours: hours,
        HalfDayType: HalfDayType,
      });
      var dt = attendanceDayUTC.split("-");
      //present-status/absent-status
      var className = "";
      if (status === "Present") {
        className = "present-statusa";
      } else if (status === "Absent") {
        className = "absent-status";
      } else if (status === "Vacation/Leave") {
        className = "vacation-status";
      }
      if (statustype === "HalfDay") {
        className = "halfday-status";
      }
      eventData.push({
        title:
          status === "Present"
            ? statustype === "HOLIDAY"
              ? "HOLIDAY"
              : "Present(" + statustype + ")"
            : status === "Absent"
            ? "Absent(" + statustype + ")"
            : status === "Vacation/Leave"
            ? "Vacation(" + approval_status + ")"
            : "Vacation(" + approval_status + ")",

        date: new Date(dt[0], dt[1] - 1, dt[2]),
        className: className,
      });
    }
    setevents(eventData);
    setColorChange(attendanceData);
  };
  const popupValidation = () => {
    let radioValid = true;
    if (present === "") {
      radioValid = false;
      setAttendance(<>*{errattendance_text}!</>);
    }
    if (statusbox === "" && present !== "") {
      radioValid = false;
      setStatuserr(<>*{text_errstatus}</>);
    }
    setButtondisable(false);
    return radioValid;
  };

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  const AttendanceSingleHandler = () => {
    const request_start_at = performance.now();
    if (popupValidation()) {
      setButtondisable(true);
      var utcDay = dayjs(dateselect.dateStr).format("YYYY-MM-DD");
      var shiftStartTimeUTC = dayjs(
        dateselect.dateStr + " " + GlobalConstants.empDefaultShiftStartTime
      ).format("HH:mm:ss");
      var shiftEndTimeUTC = dayjs(
        dateselect.dateStr + " " + GlobalConstants.empDefaultShiftEndTime
      ).format("HH:mm:ss");
      var dataToBSent = {
        _id: "",
        _orgid: sessionStorage.getItem("_compId"),
        createdby: sessionStorage.getItem("username"),
        _partition: GlobalConstants._partition,
        employeeId: sessionStorage.getItem("currentempid"),
        attendanceDay: utcDay === "" ? "2022-01-01" : utcDay,
        attendanceDayUTC: utcDay === "" ? "2022-01-01" : utcDay,
        shiftStartTimeUTC: shiftStartTimeUTC,
        shiftEndTimeUTC: shiftEndTimeUTC,
        statustype: statusbox === "" ? "FullDay" : statusbox,
        description: description === "" ? "NA" : description,
        hours: count === "" ? "8" : count,
        status: present === "" ? "Present" : present,
      };
      var type = "update";

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/update/new/attendance?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, dataToBSent, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          successToast("Attendance Marked Successfully");
          console.log("attendace single dhrumil***");
          if (response.status === 200) {
            setButtondisable(false);
            closePopup();
            dispatch(getEmpAttendanceSingle());
            dispatch(getEmpAttendanceTableData(utcDay));
            getEmpAttendance();
            dispatch(getEmpSalaryData());
            dispatch(getEmpData());
          }
        })
        .catch(function (error) {
          setButtondisable(false);
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
        })
        .then(function () {
          // always executed
        });
    }
    // }
  };
  const vacationvalidation = (single) => {
    let vacationvalidationform = true;

    if (single === true) {
      if (VacationStatusType === "") {
        vacationvalidationform = false;
        setvacatinday(<>*{text_errstatus}!</>);
      }
    } else {
      if (startDate === "") {
        vacationvalidationform = false;
        setErrfromdate(<>{text_val_date}</>);
      }
      if (endDate === "" && startDate !== "") {
        vacationvalidationform = false;
        setErrtodate(<>{text_val_date}</>);
      }
      if (VacationStatusTypemulti === "") {
        vacationvalidationform = false;
        setvacatinday(<>*{text_errstatus}!</>);
      }
    }
    setSave_disable(false);
    return vacationvalidationform;
  };

  const vacationHandle = (single) => {
    setSave_disable(true);
    if (vacationvalidation(single)) {
      setSave_disable(true);
      var fromDateUTC = dayjs.utc(
        dayjs(
          startDated + " " + GlobalConstants.empDefaultShiftStartTime,
          "YYYY-MM-DD HH:mm:ss"
        )
      );
      var toDateUTC = dayjs.utc(
        dayjs(
          endDated + " " + GlobalConstants.empDefaultShiftStartTime,
          "YYYY-MM-DD HH:mm:ss"
        )
      );
      var dayssDiff = toDateUTC.diff(fromDateUTC, "days");
      var vacations = [];
      if (dayssDiff == 0) {
        vacations.push({ day: fromDateUTC.format("YYYY-MM-DD") });
      } else if (dayssDiff > 0) {
        vacations.push({ day: fromDateUTC.format("YYYY-MM-DD") });
        for (let i = 1; i <= dayssDiff; i++) {
          var m = fromDateUTC.add(1, "days");
          vacations.push({ day: m.format("YYYY-MM-DD") });
        }
      }
      if (single) {
        vacations = [];
        var utcDay = dayjs(dateselect.dateStr).format("YYYY-MM-DD");
        vacations.push({ day: utcDay });
      }
      //Object ID Issue in Vaction POST API
      var dataToBSent = {
        _id: "",
        _orgid: sessionStorage.getItem("_compId"),
        createdby: sessionStorage.getItem("username"),
        _partition: GlobalConstants._partition,
        employeeId: sessionStorage.getItem(
          GlobalConstants.session_current_emp_id
        ),
        attendanceDay: "",
        attendanceDayUTC: "",
        shiftStartTimeUTC: GlobalConstants.empDefaultShiftStartTime,
        shiftEndTimeUTC: GlobalConstants.empDefaultShiftEndTime,
        statustype:
          single === false
            ? VacationStatusTypemulti
            : VacationStatusType === ""
            ? "Unpaid"
            : VacationStatusType,
        description: leavenote === "" ? "NA" : leavenote,
        hours: 0,
        status: "Vacation/Leave",
        vacation: vacations,
        HalfDayType: "NA",
      };
      var type = "update";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/addvacation?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      setSave_disable(true);
      axios
        .post(apiUrl, dataToBSent, headerConfig)
        .then(function (response) {
          var res = response.data.approvalDetails;
          // successToast("Vacation Marked Successfully");
          setOpenVacationMessage(res);
          setOpenVacationPopup(true);
          closePopup();
          setSave_disable(false);
          dispatch(getEmpAttendanceTableData());
          dispatch(getRequestsList());
          dispatch(getEmpAttendanceSingle());
          getEmpAttendance();
        })
        .catch(function (error) {
          setSave_disable(false);
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
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    } else {
      console.log("IN SIGLE DAY VALDIATION FASLE ");
    }
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    settext_val_date(
      doc.querySelector("string[name='text_val_date']")?.textContent ||
        "Please Select Date"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_End_Date(
      doc.querySelector("string[name='text_End_Date']")?.textContent ||
        "End Date"
    );
    setText_other(
      doc.querySelector("string[name='text_other']")?.textContent || "Other"
    );
    setText_half_day(
      doc.querySelector("string[name='text_half_day']")?.textContent ||
        "Half Day"
    );

    setText_over_time(
      doc.querySelector("string[name='text_over_time']")?.textContent ||
        "OverTime"
    );
    setText_vacation(
      doc.querySelector("string[name='text_vacation']")?.textContent ||
        "Vacation"
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent ||
        "Description"
    );
    setDescPH(
      doc.querySelector("string[name='descPH']")?.textContent ||
        "Enter Description"
    );
    setText_Leave_note(
      doc.querySelector("string[name='text_Leave_note']")?.textContent ||
        "Leave Note"
    );
    setText_Enter_Leave(
      doc.querySelector("string[name='text_Enter_Leave']")?.textContent ||
        "Enter Leave Note"
    );
    setText_Full_Day(
      doc.querySelector("string[name='text_Full_Day']")?.textContent ||
        "Full Day"
    );
    setTextHeading(
      doc.querySelector("string[name='text_heading']")?.textContent ||
        "Available Vacation"
    );
    setText_status_type(
      doc.querySelector("string[name='text_status_type']")?.textContent ||
        "Status Type"
    );
    setText_absent(
      doc.querySelector("string[name='text_absent']")?.textContent || "Absent"
    );
    setText_present(
      doc.querySelector("string[name='text_present']")?.textContent || "Present"
    );
    setTitle_attendance(
      doc.querySelector("string[name='title_attendance']")?.textContent ||
        "Attendance"
    );
    setText_day(
      doc.querySelector("string[name='text_day']")?.textContent || "Day"
    );
    setText_mark_attendance(
      doc.querySelector("string[name='text_mark_attendance']")?.textContent ||
        "Mark Attendance"
    );

    setText_mark_vacation(
      doc.querySelector("string[name='text_mark_vacation']")?.textContent ||
        "Mark Vacation"
    );
    setTitle_attendanceSingle(
      doc.querySelector("string[name='title_attendanceSingle']")?.textContent ||
        "Attendance for"
    );
    setHalfDaysText(
      doc.querySelector("string[name='halfDaysText']")?.textContent ||
        "Half Days"
    );
    setFullDaysText(
      doc.querySelector("string[name='fullDaysText']")?.textContent ||
        "Full Days"
    );
    settext_attendance_type(
      doc.querySelector("string[name='text_attendance_type']")?.textContent ||
        "Select Attendance Type"
    );
    setFirstHalf_text(
      doc.querySelector("string[name='firstHalf_text']")?.textContent ||
        "First Half"
    );
    setSecondHalf_text(
      doc.querySelector("string[name='secondHalf_text']")?.textContent ||
        "Second Half"
    );
    setText_SelHalfDay(
      doc.querySelector("string[name='text_SelHalfDay']")?.textContent ||
        "Select Half Day"
    );
    setText_statusHday(
      doc.querySelector("string[name='text_statusHday']")?.textContent ||
        "Status Halfday"
    );
    setText_SelAttStatus(
      doc.querySelector("string[name='text_SelAttStatus']")?.textContent ||
        "Select Attendance Status"
    );
    setLateMark_Text(
      doc.querySelector("string[name='lateMark_Text']")?.textContent ||
        "Late Mark"
    );
    setErrattendance_text(
      doc.querySelector("string[name='errattendance_text']")?.textContent ||
        "Please Select Attendance Type"
    );

    settext_status(
      doc.querySelector("string[name='text_status']")?.textContent || "Status"
    );
    setLeave_text(
      doc.querySelector("string[name='leave_text']")?.textContent || "Leave"
    );
    setUnpaidvac_text(
      doc.querySelector("string[name='unpaidvac_text']")?.textContent ||
        "Unpaid Leave"
    );
    setMarriagevac_text(
      doc.querySelector("string[name='marriagevac_text']")?.textContent ||
        "Marriage Leave"
    );
    setPaternity_text(
      doc.querySelector("string[name='paternity_text']")?.textContent ||
        "Paternity Leave"
    );
    setMaternity_text(
      doc.querySelector("string[name='maternity_text']")?.textContent ||
        "Maternity Leave"
    );
    setPrivilege_text(
      doc.querySelector("string[name='privilege_text']")?.textContent ||
        "Privilege Leave"
    );
    setMedicalleave_text(
      doc.querySelector("string[name='medicalleave_text']")?.textContent ||
        "Medical Leave"
    );
    setText_select_status_type(
      doc.querySelector("string[name='text_select_status_type']")
        ?.textContent || "Select Status Type"
    );
    setText_errstatus(
      doc.querySelector("string[name='text_errstatus']")?.textContent ||
        "Please Select Status Type"
    );

    setAtten_medical(
      doc.querySelector("string[name='atten_medical']")?.textContent ||
        "Medical"
    );
    setAtten_personal(
      doc.querySelector("string[name='atten_personal']")?.textContent ||
        "Personal"
    );
    setText_holiday(
      doc.querySelector("string[name='text_holiday']")?.textContent || "Holiday"
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent ||
        "Start Date"
    );
    settext_public_hol(
      doc.querySelector("string[name='text_public_hol']")?.textContent ||
        "Public Holiday"
    );
    setText_monthlyView(
      doc.querySelector("string[name='text_monthlyView']")?.textContent ||
        "Monthly View"
    );
    setText_yearlyView(
      doc.querySelector("string[name='text_yearlyView']")?.textContent ||
        "Yearly View"
    );
    settext_days_taken(
      doc.querySelector("string[name='text_days_taken']")?.textContent ||
        "Days Taken"
    );
    settext_days_left(
      doc.querySelector("string[name='text_days_left']")?.textContent ||
        "Days Left"
    );
    setText_Personal_Timeoff(
      doc.querySelector("string[name='text_Personal_Timeoff']")?.textContent ||
        "Personal Timeoff"
    );
    setText_request(
      doc.querySelector("string[name='text_request']")?.textContent ||
        "Thanks! Your Request Generated Successfully. PleaseContact"
    );
    setText_approval(
      doc.querySelector("string[name='text_approval']")?.textContent ||
        "For Approval Status"
    );
    setText_remark(
      doc.querySelector("string[name='text_remark']")?.textContent || "Remark"
    );
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleYearlyListData = () => {
    // var fiscaldate = dayjs(sessionStorage.getItem("fiscalYear")).format(
    //   "MMM DD,YYYY"
    // );
    var fiscaldate = "Feb 20,2025";
    var employeeId = sessionStorage.getItem(
      GlobalConstants.session_current_emp_id
    );
    const _orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/attendance/attendancealldaycount?employeeId=" +
      employeeId +
      "&fiscaldate=" +
      fiscaldate +
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
        var res = response.data;
        var list = res.data.data;
        if (response.status === 200) {
          setYearlyData(list);
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
      })
      .then(function () {
        // always executed
      });
  };
  return (
    <>
      <Header />
      <Dialog
        fullScreen={fullScreen}
        open={openVacationPopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="text-center">
          <FaRegThumbsUp className="text-center thumb-sty text-success" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {openVacationMessage.map((e) => {
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
      <h3 className="text-center HeadingText mt-5">
        {title_attendanceSingle} {sessionStorage.getItem("employee_name")}{" "}
      </h3>
      <div
        className={
          popup || popup2 === true
            ? "InvoiceBox bgblur1 att-single-below-title"
            : "InvoiceBox  py-2 att-single-below-title"
        }
      >
        <div className="attSingleBox att-single-fullcalender">
          <FullCalendar
            showNonCurrentDates={false}
            events={events}
            height={500}
            backgroundColor={"red"}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin, momentPlugin]}
            dateClick={[
              (args) => setDateselect(args),
              (arg) => handlefirstClickOpen(arg),
            ]}
            titleFormat={"MMM, YYYY"}
            datesSet={(dateInfo) => {
              setChangedData(dateInfo.start);
            }}
          />
        </div>

        <div className="p-2">
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center ">
            <button
              className="publicbtn attendanceBTN-new w-25 px-3 py-2"
              onClick={() => setPopup(!popup)}
            >
              {text_mark_attendance}
            </button>
            <button
              className="vacationBtn w-25 px-3 py-2"
              onClick={handlesecondClickOpen}
            >
              {text_mark_vacation}
            </button>
            <button
              className="publicbtn w-25 px-3 py-2"
              onClick={() =>
                navigate("/publicholiday", {
                  state: {
                    IsFromEmployee: true,
                  },
                })
              }
            >
              {text_public_hol}
            </button>
          </div>
          <center>
            <input
              className="check checkbox_show mt-4"
              type="checkbox"
              id="checkbox_toggle"
              value={montlyYearlyCount}
              onChange={(e) => setMonthlyYearlyCount(!montlyYearlyCount)}
            />

            <div className="checkbox1 mt-4">
              <label for="checkbox_toggle" className="slide">
                <label for="checkbox_toggle" className="toggle"></label>
                <label for="checkbox_toggle" className="text">
                  {text_monthlyView}
                </label>
                <label for="checkbox_toggle" className="text">
                  {text_yearlyView}
                </label>
              </label>
            </div>
          </center>
          {montlyYearlyCount === false ? (
            <>
              {AttendanceTaleData?.map((Data, index) => {
                return (
                  <>
                    <div className="sidebox d-flex flex-nowrap  presentBorder">
                      <h6 className="headingAS">{text_present}</h6>
                      <div className="row sideRowSty">
                        <div className="col-md-4">
                          <h5>{text_day}</h5>
                          <br className="br_remove" />
                          <span className="presentText">{Data?.Present}</span>
                        </div>
                        <div className="col-md-4">
                          <h5>{lateMark_Text}</h5>
                          <span className="lateMarkText">{Data?.LateMark}</span>
                        </div>
                        <div className="col-md-4">
                          <h5>{halfDaysText}</h5>
                          <span className="halfDayText">
                            {Data?.AbsentHalfDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebox  d-flex flex-nowrap absentBorder">
                      <h6 className="headingAS">{text_absent}</h6>
                      <div className="row sideRowSty">
                        <div className="col-md-6">
                          <h5>{fullDaysText}</h5>
                          <span className="absentText">
                            {Data?.AbsentFullDay}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <h5>{halfDaysText}</h5>
                          <span className="absentText">
                            {Data?.AbsentHalfDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebox   d-flex flex-nowrap vacationBorder">
                      <h6 className="headingAS">{text_vacation}</h6>
                      <div className="row sideRowSty">
                        <div className="col-md-6">
                          <h5>{text_days_taken}</h5>
                          <span className="VactionText">
                            {Data?.VacationFull}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <h5>{text_days_left}</h5>
                          <span className="VactionText">
                            {SelectedEmpData[0]?.vacationDays}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {YearlyData?.map((Data, index) => {
                return (
                  <>
                    <div className="sidebox d-flex flex-nowrap  presentBorder">
                      <h6 className="headingAS">{text_present}</h6>
                      <div className="row sideRowSty">
                        <div className="col-md-4">
                          <h5>{text_day}</h5>
                          <br className="br_remove" />
                          <span className="presentText">{Data?.Present}</span>
                        </div>
                        <div className="col-md-4">
                          <h5>{lateMark_Text}</h5>
                          <span className="lateMarkText">{Data?.LateMark}</span>
                        </div>
                        <div className="col-md-4">
                          <h5>{halfDaysText}</h5>
                          <span className="halfDayText">
                            {Data?.AbsentHalfDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebox  d-flex flex-nowrap absentBorder">
                      <h6 className="headingAS">{text_absent}</h6>
                      <div className="row sideRowSty">
                        <div className="col-md-6">
                          <h5>{fullDaysText}</h5>
                          <span className="absentText">
                            {Data?.AbsentFullDay}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <h5>{halfDaysText}</h5>
                          <span className="absentText">
                            {Data?.AbsentHalfDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebox   d-flex flex-nowrap vacationBorder">
                      <h6 className="headingAS">{text_vacation}</h6>
                      <div className="row sideRowSty">
                        <div className="col-md-6">
                          <h5>{text_days_taken}</h5>
                          <span className="VactionText">
                            {Data?.VacationFull}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <h5>{text_days_left}</h5>
                          <span className="VactionText">
                            {SelectedEmpData[0]?.vacationDays}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}

          <div className="listBox">
            <ul className="ulListAs">
              <li className="listAS">{text_absent}</li>
              <li className="listAS">{text_half_day}</li>
              <li className="listAS">{text_present}</li>
              <li className="listAS">{text_vacation}</li>
            </ul>
          </div>
        </div>
      </div>

      {popup ? (
        <>
          <div className="main">
            <div className="popupAttenSingle">
              <div>
                <div className="text-end close">
                  <CgCloseO className="closeIconSty" onClick={closePopup} />
                </div>
                <h2 className="text-center">{title_attendance}</h2>
              </div>
              <hr />
              <div className="container attendacnePopBox">
                <h5 className="text-center">
                  {dayjs(dateselect.dateStr).format("MMM DD, YYYY")}
                </h5>
                <h5 className="mt-4">{title_attendance}</h5>
                <select
                  name=""
                  id=""
                  className={
                    present === "Absent"
                      ? "selectInputAsSty absentborder selectAttpop"
                      : "selectInputAsSty selectAttpop"
                  }
                  onChange={(e) => [
                    setPresent(e.target.value),
                    setAttendance(""),
                  ]}
                >
                  <option value="" selected disabled>
                    {text_attendance_type}
                  </option>

                  <option
                    value="Present"
                    disabled={isFutureDate(
                      dayjs(dateselect.dateStr).format("MM-DD-YYYY")
                    )}
                  >
                    {text_present}
                  </option>

                  <option value="Absent">{text_absent}</option>
                  <option value="Vacation/Leave">
                    {text_vacation}/{leave_text}
                  </option>
                </select>
                <span className="Star">*</span>
                <p className="error_sty">{attendance}</p>
                {present === "HalfDay" && (
                  <>
                    <div className="mt-4">
                      <h5>{text_statusHday}</h5>
                      <select
                        name=""
                        id=""
                        className="selectInputAsSty statusType att-si-select-half"
                      >
                        <option value="" disabled selected>
                          {text_SelHalfDay}
                        </option>
                        <option value="firsthalf">{firstHalf_text}</option>
                        <option value="secondhalf">{secondHalf_text}</option>
                        <option value="other">{text_other}</option>
                      </select>
                    </div>
                  </>
                )}
                {present === "Present" && (
                  <>
                    <div className="mt-4">
                      <h5>
                        {text_remark}
                        <span className="Star">*</span> : &nbsp;
                      </h5>
                      <select
                        name=""
                        id=""
                        className="selectInputAsSty statusType att-si-present"
                        onChange={(e) => [
                          setStatusbox(e.target.value),
                          setStatuserr(""),
                        ]}
                      >
                        <option value="" disabled selected>
                          {text_SelAttStatus}
                        </option>
                        <option value="LateMark">{lateMark_Text}</option>
                        <option value="Overtime">{text_over_time}</option>{" "}
                        <option value="FullDay">{text_Full_Day}</option>
                        <option value="HalfDay">{text_half_day}</option>
                        <option value="HOLIDAY">{text_holiday}</option>
                      </select>
                      <p className="error_sty">{statuserr}</p>
                    </div>
                  </>
                )}
                {present === "Absent" && (
                  <>
                    <div className="mt-4">
                      <h5>
                        {text_remark}
                        <span className="Star">*</span> : &nbsp;
                      </h5>
                      <select
                        name=""
                        id=""
                        className="selectInputAsSty statusType att-si-present"
                        onChange={(e) => [
                          setStatusbox(e.target.value),
                          setStatuserr(""),
                        ]}
                      >
                        <option value="" disabled selected>
                          {text_SelAttStatus}
                        </option>
                        <option value="MED_A">{atten_medical}</option>
                        <option value="CAS_A">{atten_personal}</option>{" "}
                        <option value="Other">{text_other}</option>
                      </select>
                      <p className="error_sty">{statuserr}</p>
                    </div>
                  </>
                )}
                {present === "Vacation/Leave" && (
                  <>
                    <div className="mt-4">
                      <h5>
                        {text_remark}
                        <span className="Star">*</span> : &nbsp;
                      </h5>
                      <select
                        name=""
                        id=""
                        className="selectInputAsSty selVacation selVacation-2"
                        onChange={(e) => [
                          setVacationStatusType(e.target.value),
                          setvacatinday(""),
                          setStatuserr(""),
                        ]}
                      >
                        <option selected disabled>
                          {text_select_status_type}
                        </option>
                        <option value="MED_L">{medicalleave_text}</option>
                        <option value="PRE_L">{privilege_text}</option>
                        <option value="MAT_L">{maternity_text}</option>
                        <option value="PAT_L">{paternity_text}</option>
                        <option value="MAG_L">{marriagevac_text}</option>
                        <option value="Unpaid">{unpaidvac_text}</option>
                        <option value="PER_L">{text_Personal_Timeoff}</option>
                        <option value="other">{text_other}</option>
                      </select>
                      <p className="error_sty">{vacationday}</p>
                    </div>
                  </>
                )}
                <h5 className="mt-4">{text_description}</h5>
                <input
                  type="text"
                  className="att-si-present-pop"
                  placeholder={descPH}
                  onChange={(e) => [setLeavenote(e.target.value)]}
                />
              </div>

              <hr />
              <div className="d-flex justify-content-center align-self-end">
                <button className="me-3 btncancel" onClick={closePopup}>
                  {button_cancel}
                </button>{" "}
                {present === "Vacation/Leave" ? (
                  <button
                    className="btnsave"
                    onClick={() => vacationHandle(true)}
                    disabled={save_disable}
                  >
                    {button_save}
                  </button>
                ) : (
                  <button
                    className="btnsave"
                    onClick={() => AttendanceSingleHandler(false)}
                    disabled={buttondisable}
                  >
                    {button_save}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {popup2 ? (
        <>
          <div className="main">
            <div className="popuptwoAttenSingle">
              <div>
                <div className="text-end close" id="closeMob">
                  <CgCloseO
                    className="closeIconSty popup-2-close"
                    onClick={closePopup}
                  />
                </div>
                <h2 className="text-center">
                  {text_heading}: {SelectedEmpData[0]?.vacationDays}
                </h2>
                <h5 className="text-center">
                  {sessionStorage.getItem("employee_name")}
                </h5>
              </div>
              <hr />
              <div className="">
                <div className="row">
                  <div className="col-md-6 parent-of-dp">
                    <h5 className="mt-3">
                      {text_start_date} <span className="Star">*</span>
                    </h5>
                    <DatePicker
                      popperPlacement="auto"
                      selected={startDate}
                      minDate={new Date()}
                      maxDate={endDate !== null ? endDate : null}
                      onChange={(date) => [
                        dateHandler(date, "startdate"),
                        setErrfromdate(""),
                      ]}
                      dateFormat="MMM d, yyyy"
                      placeholderText={text_start_date}
                      className="popup-2-start-date"
                    />
                    <p className="error_sty">{errfromdate}</p>
                  </div>
                  {startDate !== "" ? (
                    <>
                      <div className="col-md-6">
                        <h5 className="mt-3">
                          {text_End_Date} <span className="Star">*</span>
                        </h5>
                        <DatePicker
                          popperPlacement="auto"
                          selected={endDate}
                          minDate={startDate != null ? startDate : new Date()}
                          onChange={(date) => [
                            dateHandler(date, "enddate"),
                            setErrtodate(""),
                          ]}
                          dateFormat="MMM d, yyyy"
                          placeholderText={text_End_Date}
                          className="popup-2-end-date"
                        />
                        <p className="error_sty">{errtodate}</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mt-3">{text_Leave_note}</h5>
                    <input
                      type="text"
                      placeholder={text_Enter_Leave}
                      className="popup-2-leave-note"
                      onChange={(e) => setLeavenote(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="mt-3">
                      {text_status}
                      <span className="Star">*</span>
                    </h5>
                    <select
                      name=""
                      id=""
                      className="selectInputAsSty selVacation selVacation-2"
                      onChange={(e) => [setVacationStatus(e.target.value)]}
                    >
                      <option value="Vacation/Leave">
                        {text_vacation}/{leave_text}
                      </option>
                    </select>
                    <h5 className="mt-3">
                      {text_remark} <span className="Star">*</span>
                    </h5>
                    <select
                      name=""
                      id=""
                      className="selectInputAsSty selVacation selVacation-2"
                      value={VacationStatusTypemulti}
                      onChange={(e) => [
                        setVacationStatusTypemulti(e.target.value),
                        setvacatinday(""),
                      ]}
                    >
                      <option selected>{text_select_status_type}</option>
                      <option value="MED_L">{medicalleave_text}</option>
                      <option value="PRE_L">{privilege_text}</option>
                      <option value="MAT_L">{maternity_text}</option>
                      <option value="PAT_L">{paternity_text}</option>
                      <option value="MAG_L">{marriagevac_text}</option>
                      <option value="Unpaid">{unpaidvac_text}</option>
                      <option value="PER_L">{text_Personal_Timeoff}</option>
                      <option value="other">{text_other}</option>
                    </select>
                    <p className="error_sty">{vacationday}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-center align-self-end">
                <button className="me-3 btncancel" onClick={closePopup}>
                  {button_cancel}
                </button>{" "}
                <button
                  className="btnsave"
                  onClick={() => vacationHandle(false)}
                  disabled={save_disable}
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
    </>
  );
}

export default AttendanceSingle;
