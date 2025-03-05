// Project get In AddTimesheet

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const TimesheetProjectSlice = createSlice({
  name: "TimesheetProject",
  initialState: [],
  reducers: {
    setTimesheetProject(state, action) {
      return (state = action.payload);
    },
    setResetTimeSheetProject(state, action) {
      return (state = action.payload);
    },
  },
});

const { setTimesheetProject, setResetTimeSheetProject } =
  TimesheetProjectSlice.actions;
export default TimesheetProjectSlice.reducer;

export function getTimesheetProject() {
  return async function getTimesheetProjectThunk(dispatch, getState) {
    try {
      var empId = sessionStorage.getItem("currentempid");
      const request_start_at = performance.now();
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/getdata/collectiondata?collection_name=project&search_key=employeeId&search_value=" +
        empId +
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
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          var res1 = JSON.parse(res.data);
          if (response.status === 200) {
            dispatch(setTimesheetProject(res1));
            console.log(
              "ID:05901=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
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
    } catch (err) {
      console.log(err);
    }
  };
}
export function resetTimeSheetProject() {
  return async function resetTimeSheetProjectThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetTimeSheetProject(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
