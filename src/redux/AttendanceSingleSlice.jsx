import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const AttendanceSingleSlice = createSlice({
  name: "Selected Company",
  initialState: [],
  reducers: {
    setEmpAttendance(state, action) {
      return (state = action.payload);
    },
    setResetEmpAttendanceSingle(state, action) {
      return (state = action.payload);
    },
  },
});

const { setEmpAttendance, setResetEmpAttendanceSingle } =
  AttendanceSingleSlice.actions;
export default AttendanceSingleSlice.reducer;

export function getEmpAttendanceSingle() {
  return async function getEmpAttendanceSingleThunk(dispatch, getState) {
    try {
      const dataToBeSent = {
        collection_name: "attendance",
        search_key: "employeeId",
        search_value: sessionStorage.getItem("currentempid"),
      };
      const request_start_at = performance.now();

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
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          // console.log(response.data);
          var res = response.data;
          var list = JSON.parse(res.data);
          if (response.status === 200) {
            dispatch(setEmpAttendance(list));
            console.log(
              "ID:04002=> " +
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

export function resetEmpAttendanceSingle() {
  return async function resetEmpAttendanceSingleThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetEmpAttendanceSingle(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
