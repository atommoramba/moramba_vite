import { createSlice } from "@reduxjs/toolkit";
import { GlobalConstants } from "../utils/GlobalConstants";
import axios from "axios";
import dayjs from 'dayjs'

import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const EmployeeDocSlice = createSlice({
  name: "Employee Doc",
  initialState: [],
  reducers: {
    setEmployeeDoc(state, action) {
      return (state = action.payload);
    },
    setResetEmpDocList(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setEmployeeDoc, setResetEmpDocList } = EmployeeDocSlice.actions;
export default EmployeeDocSlice.reducer;

export function getEmployeeDoc() {
  return async function getEmployeeDocThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/employeedoctemplate?_orgId=" +
        _compId;

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      axios
        .get(apiUrl, headerConfig)
        .then(function (response, id) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          var list = JSON.parse(res.data);
          if (response.status === 200) {
            console.log(
              "ID:01901=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
            dispatch(setEmployeeDoc(list));
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
    }catch (err) {
      console.log(err);
    }
  };
}
export function resetEmpDocList() {
  return async function resetEmpDocListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetEmpDocList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
