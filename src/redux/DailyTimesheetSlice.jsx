// Get Daily Timesheet Data [ dailyTimeSheet page ]

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const DailyTimesheetSlice = createSlice({
  name: "DailyTimesheet",
  initialState: [],
  reducers: {
    setDailyTimesheet(state, action) {
      return (state = action.payload);
    },
    setresetDailyTimesheet(state, action) {
      return (state = action.payload);
    },
  },
});

const { setDailyTimesheet, setresetDailyTimesheet } =
  DailyTimesheetSlice.actions;
export default DailyTimesheetSlice.reducer;

export function getDailyTimesheet() {
  return async function getDailyTimesheetThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      const todaySend = new Date();
      var dateToBe = dayjs.utc(dayjs(todaySend, "YYYY-MM-DD HH:mm:ss"));
      var currEmpId = sessionStorage.getItem("currentempid")?.toString();
      var _compId = sessionStorage.getItem("_compId");
      const d = {
        employeeId: currEmpId,
        date: dateToBe.format("YYYY-MM-DD"),
        sheetType: "Daily",
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/getdata/collection/timesheetdaily?employeeId=" +
        d.employeeId +
        "&date=" +
        d.date +
        "&sheetType=" +
        d.sheetType+"&_orgId="+_compId;
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
          var res = response.data;
          var DailySheetData = res.data;
          var DailyData = [];
          for (let i = 0; i < DailySheetData.length; i++) {
            var timeIn = DailySheetData[i].timeIn;
            var hours = DailySheetData[i].hours;
            var Desc = DailySheetData[i].description;
            DailyData.push({
              description: Desc,
              timeIn: timeIn,
              hours: hours,
            });
          }
          if (response.status === 200) {
            dispatch(setDailyTimesheet(DailySheetData));
            console.log(
              "ID:05905=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
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
    } catch (err) {
      console.log(err);
    }
  };
}
export function resetDailyTimesheet() {
  return async function resetDailyTimesheetThunk(dispatch, getState) {
    try {
      var reset = [];
      dispatch(setresetDailyTimesheet(reset));
    } catch (err) {
      console.log(err);
    }
  };
}
