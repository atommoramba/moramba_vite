import dayjs from "dayjs";

import React from "react";
import { useState, useEffect } from "react";
import {
  errorToast,
  warnToast,
  successToast,
  infoToast,
} from "../../utils/Helper";
import {
  GetUTCNow,
  GlobalConstants,
  isValidJson,
} from "../../utils/GlobalConstants";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function StartBreak() {
  const d = new Date();
  const date = dayjs(d).format("MMM Do, YYYY");
  const navigate = useNavigate();

  const currentstaffid = sessionStorage.getItem(
    GlobalConstants.session_current_emp_id
  );
  const _orgId = sessionStorage.getItem(
    GlobalConstants.session_current_company_id
  );
  const [shiftStatus, setShiftStatus] = useState(false);
  const [shiftEndStatus, setShiftEndStatus] = useState(false);
  const [displayForShift, setdisplayForShift] = useState("00:00:00");
  const [shiftStartedDateTime, setshiftStartedDateTime] = useState("00:00:00");
  const [shiftEndDateTime, setshiftEndDateTime] = useState("00:00:00");
  const [timeForBreak, settimeForBreak] = useState(0);
  const [displayForBreak, setdisplayForBreak] = useState("00:00:00");
  const [BreakBtnClick, setBreakBtnClick] = useState(false);
  const [breakTotalCount, setbreakTotalCount] = useState(0);
  const [timeForShift, settimeForShift] = useState(0);
  const [allBreaks, setallBreaks] = useState([]);
  const [BreakTypeForView, setBreakTypeForView] = useState("Start 1st Break");
  const [Breakstartbtn, setBreakStartbtn] = useState("Break 1 start time");
  const [Breakendbtn, setBreakendbtn] = useState("Break 1 end time");
  const [breakId, setbreakId] = useState("NA");
  const [breakType, setbreakType] = useState("Start");
  const [breakStartedDateTime, setbreakStartedDateTime] = useState(
    "Break Not Start Yet"
  );
  const [breakEndDateTime, setbreakEndDateTime] = useState("Break Not End Yet");

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  var intervalBreak;
  //Language Variables Start

  //old Lang Variables
  const [text_Break, setText_Break] = useState("Break");
  const [text_start_time, setText_start_time] = useState("Start Time");
  const [text_end_time, setText_end_time] = useState("End Time");
  const [text_toal_break_taken, setText_toal_break_taken] =
    useState("Total break taken");

  //New Lang Variables
  const [BreakStartText, setBreakStartText] = useState("Break Start");
  const [BreakEndText, setBreakEndText] = useState("Break End");
  const [BreakNoText, setBreakNoText] = useState("Break No.");
  //Language Variables End

  useEffect(() => {
    //this.currentstaffid = sessionStorage.getItem("currentempid");
    GetShiftToday();
  }, []);

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });
  const GetShiftToday = () => {
    const dateUTC = GetUTCNow();
    //console.log(""+utcDateTime);
    // console.log(""+activationDate);
    //console.log(dayjs(utcDateTime).format('YYYY-MM-DD, HH:mm:ss'));
    //const gmtFinalDate = dayjs(utcDateTime).format('YYYY-MM-DD, HH:mm:ss');
    const gmtDay = dayjs(dateUTC).format("YYYY-MM-DD");
    //console.log(new Date(gmtFinalDate));
    const timeStamp = dayjs(dateUTC).format("x");
    // console.log(timeStamp);

    //console.log(new Date(gmtFinalDate).getTime())
    //this.loader=true;
    //return;
    const dataToBeSent = {
      _partition: "azr123",
      breakFlag: false,
      createdby: "createdby",
      employeeId: currentstaffid === "" ? "EmpTempID123" : currentstaffid,
      _orgId: _orgId,
      endLat: 0,
      endLong: 0,
      endTime: 0,
      hours: 0,
      projectId: currentstaffid === "" ? "EmpProjectTempID123" : currentstaffid,
      remark: "remark",
      shiftDay: gmtDay === "" ? "Jan 01,2022" : gmtDay,
      shiftStatus: "Start",
      startLat: 0,
      startLong: 0,
      startTime: Number(timeStamp) === "" ? "00:00:00" : Number(timeStamp),
      timerFlag: true,
      breaks: ["break"],
    };

    var type = "getshift";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/addupdatepunching?type=" +
      type;

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
        var b = isValidJson(res.data);
        if (b) {
          var shiftStatus = res.data[0].shiftStatus;
          if (shiftStatus === "Start") {
            setShiftStatus(true);
            //this.isShiftStart=false;
            //this.isShiftStop=true;
            //var startTime = res.data[0].startTime.$numberDouble;
            var startTimeUTC = res.data[0].startTimeUTC;
            //var utcTime = dayjs(Number(startTime)).format("YYYY-MM-DD HH:mm:ss");
            var local_date = dayjs
              .utc(startTimeUTC)
              .local()
              .format("MMM Do YYYY, hh:mm:ss a");
            var shiftStartedDateTime = local_date;

            var startTimeUTCDate = dayjs(
              startTimeUTC,
              GlobalConstants.morambaUTCDateFormat
            );
            var currentTimeUTCDate = dayjs(
              GetUTCNow(),
              GlobalConstants.morambaUTCDateFormat
            );
            var secondsDiff = currentTimeUTCDate.diff(
              startTimeUTCDate,
              "seconds"
            );
            //var sec = (getCurrentGMTDateTimeToTimeStamp() - Number(startTime))/1000;
            OurTimerStartStopShift(true, secondsDiff);
            GetBreakToday();
          }
          if (shiftStatus === "Stop") {
            setShiftEndStatus(true);
            //var hours = res.data[0].hours.$numberDouble;
            var startTimeUTC = res.data[0].startTimeUTC;
            var endTimeUTC = res.data[0].endTimeUTC;
            var startTimeUTCDate = dayjs(
              startTimeUTC,
              GlobalConstants.morambaUTCDateFormat
            );
            var endTimeUTCDate = dayjs(
              endTimeUTC,
              GlobalConstants.morambaUTCDateFormat
            );
            var hoursDiff = endTimeUTCDate.diff(startTimeUTCDate, "hours");
            var minutessDiff = endTimeUTCDate.diff(startTimeUTCDate, "minutes");
            var secondsDiff = endTimeUTCDate.diff(startTimeUTCDate, "seconds");
            var minutes = Math.floor(secondsDiff / 60);

            //var hr = (hours + "").split(".")[0];
            //var min = Number("0."+(hours + "").split(".")[1])*60;
            //this.displayForShift=hoursDiff+" hrs "+minutessDiff+" min";
            setdisplayForShift(hoursDiff + " hrs " + (minutes % 60) + " min");
            // var startTime = res.data[0].startTime.$numberDouble;
            //var utcTime = dayjs(Number(startTime)).format("YYYY-MM-DD HH:mm:ss");
            var local_date = dayjs
              .utc(startTimeUTC)
              .local()
              .format("MMM Do YYYY, hh:mm:ss a");
            var shiftStartedDateTime = local_date;
            setshiftStartedDateTime(shiftStartedDateTime);

            //var endTime = res.data[0].endTime.$numberDouble;
            //var utcTime = dayjs(Number(endTime)).format("YYYY-MM-DD HH:mm:ss");
            var local_date = dayjs
              .utc(endTimeUTC)
              .local()
              .format("MMM Do YYYY hh:mm:ss a");
            var shiftEndDateTime = local_date;
            setshiftEndDateTime(shiftEndDateTime);

            OurTimerStartStopShift(false, 0);
            GetBreakToday();
          }
        } else {
          // alert(res.data);
          // alert("Moramba", res.data);
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
        console.log(error.message);

        //errorToast(error.message);
      });
  };

  const ShiftStart = (type) => {
    const dateUTC = GetUTCNow();
    const gmtDay = dayjs(dateUTC).format("YYYY-MM-DD");
    const timeStamp = dayjs(dateUTC).format("x");
    //const nml=new Date(utcDateTime).getTime();
    //var datum = Date.parse(date)
    //const utcMl = dayjs.utc().format("x")
    // alert("UTC:->"+date+" ml:->"+utcMl);
    //return;
    // console.log(dateUTC);
    // console.log(new Date(utcDateTime).getTime())
    //this.loader=true;
    //return;
    var hrs = 0;
    var shiftStatus = "Start";
    var timerFlag = true;
    var endTime = 0;
    var endTimeUTC = "NA";
    var startTime = Number(timeStamp);

    if (type === "endshift") {
      hrs = timeForShift / 3600; // converted to hr
      shiftStatus = "Stop";
      timerFlag = false;
      endTime = Number(timeStamp);
      endTimeUTC = dateUTC;
    } else {
    }
    const dataToBeSent = {
      _partition: "azr123",
      breakFlag: false,
      createdby: "createdby",
      employeeId: currentstaffid === "" ? "EmpTempID123" : currentstaffid,
      _orgId: _orgId,
      endLat: type === "endshift" ? lat : 0,
      endLong: type === "endshift" ? lng : 0,
      endTime: endTime === "" ? "00:00:00" : endTime,
      endTimeUTC: endTimeUTC === "" ? "00:00:00" : endTimeUTC,
      hours: hrs === "" ? "0" : hrs,
      projectId: currentstaffid === "" ? "EmpProjectTempID123" : currentstaffid,
      remark: "remark",
      shiftDay: gmtDay === "" ? "Jan 01,2022" : gmtDay,
      shiftStatus: shiftStatus,
      startLat: shiftStatus === "Start" ? lat : 0,
      startLong: shiftStatus === "Start" ? lng : 0,
      startTime: startTime === "" ? "00:00:00" : startTime,
      startTimeUTC: dateUTC === "" ? "Jan 01,2022" : dateUTC,
      timerFlag: timerFlag === "" ? "true" : timerFlag,
      breaks: ["break"],
    };

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/addupdatepunching?type=" +
      type;

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
        // aler(res.message);

        // alert("shift start");
        var b = isValidJson(res.data);
        if (type === "endshift") {
          errorToast("Shift is ended");
        } else {
          // successToast("Shift is Started");
          errorToast(res.data);
        }

        if (b) {
          GetShiftToday();
          GetBreakToday();
          // successToast(res.data);
          if (type === "endshift") {
          }
        } else {
          console.log(res.data);

          // setShiftStatus(res.data)
          // errorToast("ok")
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
        console.log(error.message);

        //errorToast(error.message);
      });

    //   this.addUpdatePunching.addupdatepunching(dataToBeSent,type).subscribe((res:any) =>{
    //     console.log(res);
    //     //this.loader=false;
    //     if(res.status)
    //     {

    //       this.loader=false;

    //       var b = isValidJson(res.data);
    //       if(b)
    //       {
    //         //alert(type+" successful");
    //         //location.reload();
    //         this.GetShiftToday();
    //         this.GetBreakToday();
    //       }else
    //       {
    //         alert(res.data);
    //       }

    //       //alert(JSON.stringify(allstaff[0].fullName));

    //     }else
    //     {
    //       alert(res.message);
    //       this.loader=false;
    //     }

    //   },(error) => {
    //     console.log(error);
    //     this.loader=false;
    //     alert(error);
    // });
  };
  const OurTimerStartStopShift = (isStart, sec) => {
    var intervalShift;
    var dSec = sec;
    if (isStart) {
      //settimeForShift(sec);
      intervalShift = setInterval(() => {
        var displayForShiftRaw = transform(dSec++);
        settimeForShift(displayForShiftRaw);
        setdisplayForShift(displayForShiftRaw);
        // console.log(displayForShiftRaw);
      }, 1000);
    } else {
      clearInterval(intervalShift);
    }
  };
  const transform = (value) => {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    var strHours, strMinutes, strSeconds;
    if (hours < 10) {
      strHours = "0" + hours;
    } else {
      strHours = hours;
    }
    if (minutes < 10) {
      strMinutes = "0" + minutes;
    } else {
      strMinutes = minutes;
    }
    if (seconds < 10) {
      strSeconds = "0" + seconds;
    } else {
      strSeconds = seconds;
    }
    return strHours + ":" + strMinutes + ":" + strSeconds;
  };
  const GetBreakToday = () => {
    //console.log(""+utcDateTime);
    // console.log(""+activationDate);
    //console.log(dayjs(utcDateTime).format('YYYY-MM-DD, HH:mm:ss'));
    //const gmtFinalDate = dayjs(utcDateTime).format('YYYY-MM-DD, HH:mm:ss');
    const dateUTC = GetUTCNow();

    const gmtDay = dayjs(dateUTC).format("YYYY-MM-DD");
    //console.log(new Date(gmtFinalDate));
    const timeStamp = dayjs(dateUTC).format("x");
    // console.log(timeStamp);
    //console.log(new Date(gmtFinalDate).getTime())
    //this.loader = true;
    //return;
    const dataToBeSent = {
      _partition: "azr123",
      breakFlag: false,
      createdby: "createdby",
      _orgId: _orgId,
      employeeId: currentstaffid === "" ? "EmpTempID123" : currentstaffid,
      endLat: 10000,
      endLong: 20000,
      endTime: 0,
      hours: 0,
      projectId: currentstaffid === "" ? "EmpProjectTempID123" : currentstaffid,
      remark: "remark",
      shiftDay: gmtDay === "" ? "Jan 01,2022" : gmtDay,
      shiftStatus: "Start",
      startLat: lat === "" ? "0.00000" : lat,
      startLong: lng === "" ? "0.00000" : lng,
      startTime: Number(timeStamp) === "" ? "00:00:00" : Number(timeStamp),
      timerFlag: true,
      breaks: ["break"],
    };

    var type = "getshift";

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/addupdatepunching?type=" +
      type;

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
        var b = isValidJson(res.data);
        var allBreaks = res.data[0].breaks;
        setallBreaks(allBreaks);
        setbreakTotalCount(allBreaks.length);
        var b = isValidJson(res.data);
        if (b) {
          var shiftStatus = res.data[0].shiftStatus;

          if (shiftStatus === "Start") {
            var breaks = res.data[0].breaks;
            let currentBreak = breaks[breaks.length - 1];
            if (breaks.length > 0) {
              setbreakTotalCount(breaks.length);
            }

            var breakId = currentBreak.breakId;
            setbreakId(breakId);
            var breakStatus = currentBreak.breakStatus;
            if (breakStatus === "Start") {
              var breakType = "stop";
              setbreakType(breakType);
              var BreakTypeForView = "End Break No : " + breaks.length;
              setBreakTypeForView(BreakTypeForView);
              var BreakStartBtn = "Break " + breaks.length + " start time";
              setBreakStartbtn(BreakStartBtn);
              var BreakEndBtn = "Break " + breaks.length + " end time";
              setBreakendbtn(BreakEndBtn);
              var breakStartUTC = currentBreak.breakStartUTC;
              var local_date = dayjs
                .utc(breakStartUTC)
                .local()
                .format("hh:mm:ss a,MMM Do YYYY");
              var breakStartedDateTime = local_date;
              setbreakStartedDateTime(breakStartedDateTime);
              var breakSTimeUTCDate = dayjs(
                breakStartUTC,
                GlobalConstants.morambaUTCDateFormat
              );
              var currentTimeUTCDate = dayjs(
                GetUTCNow(),
                GlobalConstants.morambaUTCDateFormat
              );
              var secondsDiff = currentTimeUTCDate.diff(
                breakSTimeUTCDate,
                "seconds"
              );
              //var sec = (getCurrentGMTDateTimeToTimeStamp() - Number(startTime))/1000;
              var breakEndDateTime = "Break End";
              setbreakEndDateTime(breakEndDateTime);
              OurTimerStartStopBreak(true, secondsDiff);
            } else {
              var breakType = "Start";
              setbreakType(breakType);
              var BreakTypeForView =
                " Start Break No : " + (allBreaks.length + 1);
              setBreakTypeForView(BreakTypeForView);
              var breakStartUTC = currentBreak.breakStartUTC;
              var breakEndUTC = currentBreak.breakEndUTC;
              var breakStartTimeUTCDate = dayjs(
                breakStartUTC,
                GlobalConstants.morambaUTCDateFormat
              );
              var breakEndTimeUTCDate = dayjs(
                breakEndUTC,
                GlobalConstants.morambaUTCDateFormat
              );
              var hoursDiff = breakEndTimeUTCDate.diff(
                breakStartTimeUTCDate,
                "hours"
              );
              var minutessDiff = breakEndTimeUTCDate.diff(
                breakStartTimeUTCDate,
                "minutes"
              );
              //var hr = (hours + "").split(".")[0];
              //var min = Number("0."+(hours + "").split(".")[1])*60;
              var displayForBreak = hoursDiff + " hrs " + minutessDiff + " min";
              setdisplayForBreak(displayForBreak);
              // var startTime = res.data[0].startTime.$numberDouble;
              //var utcTime = dayjs(Number(startTime)).format("YYYY-MM-DD HH:mm:ss");
              var local_date = dayjs
                .utc(breakStartUTC)
                .local()
                .format("hh:mm:ss a,MMM Do YYYY");
              var breakStartedDateTime = local_date;
              setbreakStartedDateTime(breakStartedDateTime);

              //var endTime = res.data[0].endTime.$numberDouble;
              //var utcTime = dayjs(Number(endTime)).format("YYYY-MM-DD HH:mm:ss");
              var local_date = dayjs
                .utc(breakEndUTC)
                .local()
                .format("hh:mm:ss a,MMM Do YYYY");
              var breakEndDateTime = local_date;
              setbreakEndDateTime(breakEndDateTime);
              var breakType = "Start";
              setbreakType(breakType);
              var breakId = "NA";
              setbreakId(breakId);
              OurTimerStartStopBreak(false, 0, "stop_break");
            }
          }
          if (shiftStatus === "Stop") {
            //var hours = res.data[0].hours.$numberDouble;
            //clearInterval(this.intervalShift);
            var startTimeUTC = res.data[0].startTimeUTC;
            var endTimeUTC = res.data[0].endTimeUTC;
            var startTimeUTCDate = dayjs(
              startTimeUTC,
              GlobalConstants.morambaUTCDateFormat
            );
            var endTimeUTCDate = dayjs(
              endTimeUTC,
              GlobalConstants.morambaUTCDateFormat
            );
            var hoursDiff = endTimeUTCDate.diff(startTimeUTCDate, "hours");
            var minutessDiff = endTimeUTCDate.diff(startTimeUTCDate, "minutes");
            //var hr = (hours + "").split(".")[0];
            //var min = Number("0."+(hours + "").split(".")[1])*60;
            var displayForShift = hoursDiff + " hrs " + minutessDiff + " min";
            // var startTime = res.data[0].startTime.$numberDouble;
            //var utcTime = dayjs(Number(startTime)).format("YYYY-MM-DD HH:mm:ss");
            var local_date = dayjs
              .utc(startTimeUTC)
              .local()
              .format("MMM Do YYYY, hh:mm:ss a");
            var shiftStartedDateTime = local_date;

            //var endTime = res.data[0].endTime.$numberDouble;
            //var utcTime = dayjs(Number(endTime)).format("YYYY-MM-DD HH:mm:ss");
            var local_date = dayjs
              .utc(endTimeUTC)
              .local()
              .format("MMM Do YYYY, hh:mm:ss a");
            var shiftEndDateTime = local_date;

            //check break time still running

            var breaks = res.data[0].breaks;
            let currentBreak = breaks[breaks.length - 1];
            if (breaks.length > 0) {
              setbreakTotalCount(breaks.length);
            }

            this.breakId = currentBreak.breakId;
            var breakStatus = currentBreak.breakStatus;
            if (breakStatus === "Start") {
              //stop break forcely
              addBreaks("Stop", breakId, endTimeUTC);
              var BreakTypeForView = "Shift Ended";
              setBreakTypeForView(BreakTypeForView);
            } else if (breakStatus === "Stop") {
              clearInterval(intervalBreak);
              var breakStartUTC = currentBreak.breakStartUTC;
              var breakEndUTC = currentBreak.breakEndUTC;
              var breakStartTimeUTCDate = dayjs(
                breakStartUTC,
                GlobalConstants.morambaUTCDateFormat
              );
              var breakEndTimeUTCDate = dayjs(
                breakEndUTC,
                GlobalConstants.morambaUTCDateFormat
              );
              var hoursDiff = breakEndTimeUTCDate.diff(
                breakStartTimeUTCDate,
                "hours"
              );
              var minutessDiff = breakEndTimeUTCDate.diff(
                breakStartTimeUTCDate,
                "minutes"
              );
              ////var hr = (hours + "").split(".")[0];
              //   //var min = Number("0."+(hours + "").split(".")[1])*60;
              var displayForBreak = hoursDiff + " hrs " + minutessDiff + " min";
              setdisplayForBreak(displayForBreak);
              //  // var startTime = res.data[0].startTime.$numberDouble;
              //   //var utcTime = dayjs(Number(startTime)).format("YYYY-MM-DD HH:mm:ss");
              var local_date = dayjs
                .utc(breakStartUTC)
                .local()
                .format("hh:mm:ss a,MMM Do YYYY");
              var breakStartedDateTime = local_date;
              setbreakStartedDateTime(breakStartedDateTime);
              //   //var endTime = res.data[0].endTime.$numberDouble;
              //   //var utcTime = dayjs(Number(endTime)).format("YYYY-MM-DD HH:mm:ss");
              var local_date = dayjs
                .utc(breakEndUTC)
                .local()
                .format("hh:mm:ss a,MMM Do YYYY");
              var breakEndDateTime = local_date;
              setbreakEndDateTime(breakEndDateTime);
            }
            var BreakTypeForView = "Shift Ended";
            setBreakTypeForView(BreakTypeForView);

            var breakId = "NA";
            setbreakId(breakId);
            var breakType = "NA";
            setbreakType(breakType);
          }
        } else {
          // alert(res.data);
          // alert("Moramba", res.data);
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
        console.log(error.message);

        //errorToast(error.message);
      });
  };
  const OurTimerStartStopBreak = (isStart, sec, flag = null) => {
    var dSec = sec;
    if (flag === "stop_break") {
      //window.location.reload();
      clearInterval(intervalBreak);
    }
    if (isStart) {
      //this.timeForBreak=sec;
      intervalBreak = setInterval(() => {
        // if (this.timeForBreak === 0) {
        //   this.timeForBreak++;
        // } else {
        //   this.timeForBreak++;
        // }

        var displayForBreak = transform(dSec++);
        //setdisplayForBreak(displayForBreak);
        settimeForBreak(displayForBreak);
        setdisplayForBreak(displayForBreak);
      }, 1000);
    } else {
      clearInterval(intervalBreak);
      //window.location.reload();
    }
  };
  const addBreaks = (type, breakId, forcedUTC) => {
    var data = "";
    const timeStamp = dayjs(GetUTCNow()).format("x");
    var breakType;
    const gmtDay = dayjs(GetUTCNow()).format("YYYY-MM-DD");
    if (
      shiftStatus === true &&
      type.toLowerCase() === "start" &&
      breakId === "NA"
    ) {
      successToast("Break " + (breakTotalCount + 1) + " is Started");
      breakType = "addbreak";
      data = {
        employeeId: currentstaffid,
        _orgId: _orgId,
        shiftDay: gmtDay,
        breaks: [
          {
            breakId: uuid(),
            breakStart: Number(timeStamp),
            breakEnd: 0,
            breakStartUTC: GetUTCNow(),
            breakEndUTC: "NA",
            startLat: lat,
            startLong: lng,
            endLat: 0,
            endLong: 0,
            breakStatus: "Start",
          },
        ],
      };

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (shiftStatus === true && type.toLowerCase() === "stop") {
      //end
      infoToast("Break " + breakTotalCount + " is Ended");
      breakType = "endBreak";
      var breakEndUTC = GetUTCNow();
      if (forcedUTC != null) {
        breakEndUTC = forcedUTC;
      }
      data = {
        employeeId: currentstaffid === "" ? "EmpTempID123" : currentstaffid,
        _orgId: _orgId,
        shiftDay: gmtDay === "" ? "Jan 01,2022" : gmtDay,
        breaks: [
          {
            breakId: breakId,
            breakStart: 0,
            breakEnd: Number(timeStamp) === "" ? "00:00:00" : Number(timeStamp),
            breakStartUTC: "NA",
            breakEndUTC: breakEndUTC,
            startLat: 0,
            startLong: 0,
            endLat: lat === "" ? "0.00000" : lat,
            endLong: lng === "" ? "0.00000" : lng,
            breakStatus: "Stop",
          },
        ],
      };
    } else {
      return errorToast("Shift is Not Started Yet!");
    }
    //this.loader=true;

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/addupdatepunching?type=" +
      breakType;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(apiUrl, data, headerConfig)

      .then(function (response) {
        var res = response.data;
        var b = isValidJson(res.data);
        if (b) {
          //alert(breakType+" successful");
          //location.reload();
          //this.GetShiftToday();
          GetBreakToday();
          if (type.toLowerCase() === "stop") {
            window.location.reload();
          }
        } else {
          // alert(res.data);
          // alert("Moramba", res.data);
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_start_time(
      doc.querySelector("string[name='text_start_time']")?.textContent
    );
    setText_end_time(
      doc.querySelector("string[name='text_end_time']")?.textContent
    );
    setText_toal_break_taken(
      doc.querySelector("string[name='text_toal_break_taken']")?.textContent
    );
    setBreakStartText(
      doc.querySelector("string[name='BreakStartText']")?.textContent
    );
    setBreakEndText(
      doc.querySelector("string[name='BreakEndText']")?.textContent
    );
    setBreakNoText(
      doc.querySelector("string[name='BreakNoText']")?.textContent
    );
    // setText_Break(
    //   doc.querySelector("string[name='text_break']")?.textContent
    //
    // );
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
      <div>
        {/* <div className="text-center">
          <b>{date}</b>
        </div> */}
        <div className="ShiftBox mt-3 text-center">
          <h4>{displayForBreak}</h4>
          <h5 className="mb-3">
            {text_toal_break_taken} : {allBreaks.length}
          </h5>
          <button
            className="me-3 CreateBtn"
            onClick={() => addBreaks(breakType, breakId, null)}
          >
            {BreakStartText}
          </button>
          <button
            className="ShiftEndBtn"
            onClick={() => addBreaks("Stop", breakId, null)}
          >
            {BreakEndText}
          </button>
          <div className="mt-4">
            <table className="tableSty ">
              <thead>
                <tr>
                  <th className="tableHeadSty">{BreakNoText}</th>
                  <th className="tableHeadSty">{text_start_time}</th>
                  <th className="tableHeadSty">{text_end_time}</th>
                </tr>
              </thead>
              <tbody>
                {allBreaks.length === 0 && (
                  <tr>
                    <td className="tableDataSty">-</td>
                    <td className="tableDataSty">-</td>
                    <td className="tableDataSty">-</td>
                  </tr>
                )}
              </tbody>
              <tbody>
                {allBreaks.length > 0 &&
                  allBreaks.map((d, i) => {
                    return (
                      <tr>
                        <td className="tableDataSty">
                          {text_Break} {i + 1}
                        </td>

                        <td className="tableDataSty">
                          {dayjs
                            .utc(d.breakStartUTC)
                            .local()
                            .format("hh:mm:ss a,MMM Do YYYY")}
                        </td>

                        <td className="tableDataSty">
                          {d.breakEndUTC == "NA"
                            ? displayForBreak
                            : dayjs
                                .utc(d.breakEndUTC)
                                .local()
                                .format("hh:mm:ss a,MMM Do YYYY")}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartBreak;
