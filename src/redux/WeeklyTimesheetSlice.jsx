// Get weekly Timesheet Data [ weeklyTimeSheet page ]

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

import { GlobalConstants } from "../utils/GlobalConstants";
import Cookie from "js-cookie";

const WeeklyTimesheetSlice = createSlice({
  name: "WeeklyTimesheet",
  initialState: [],
  reducers: {
    setWeeklyTimesheet(state, action) {
      console.log(action.payload);
      return (state = action.payload);
    },
    setresetWeeklyTimesheet(state, action) {
      return (state = action.payload);
    },
  },
});

const { setWeeklyTimesheet, setresetWeeklyTimesheet } =
  WeeklyTimesheetSlice.actions;
export default WeeklyTimesheetSlice.reducer;

export function getWeeklyTimesheet() {
  return async function getWeeklyTimesheetThunk(dispatch, getState) {
    try {
      if (sessionStorage.getItem("startDate") === null) {
        var sendStartDate = new Date();
        var dateAdd = dayjs(sendStartDate).format("YYYY-MM-DD");
      } else {
        sendStartDate = sessionStorage.getItem("startDate");
        dateAdd = dayjs(sendStartDate).format("YYYY-MM-DD");
      }
      var currEmpId = sessionStorage.getItem("currentempid");
      var orgID = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      const WeeklyData = [];

      const d = { employeeId: currEmpId, orgID: orgID, fromDate: dateAdd };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/getdata/collection/timesheetweekly?employeeId=" +
        d.employeeId +
        "&_orgId=" +
        d.orgID +
        "&fromDate=" +
        d.fromDate;
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
          var list = res.data;
          for (let i = 0; i < list.length; i++) {
            var approval_status =
              list[i].approval_status === undefined
                ? "approved"
                : list[i].approval_status;
          }

          if (response.status === 200 && res.data.length > 0) {
            dispatch(setWeeklyTimesheet(list));
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.message);
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
    } catch (err) {
      console.log(err);
    }
  };
}
export function resetWeeklyTimesheet() {
  return async function resetWeeklyTimesheetThunk(dispatch, getState) {
    try {
      var reset = [];
      dispatch(setresetWeeklyTimesheet(reset));
    } catch (err) {
      console.log(err);
    }
  };
}
