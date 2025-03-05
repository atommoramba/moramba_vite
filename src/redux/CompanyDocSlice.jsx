import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const ComapnyDocSlice = createSlice({
  name: "company Doc",
  initialState: [],
  reducers: {
    setCompanyDoc(state, action) {
      console.log("-----------------", action.payload);
      return (state = action.payload);
    },
    setresetCompanyDocList(state, action) {
      return (state = action.payload);
    },
  },
});
export const { setCompanyDoc, setresetCompanyDocList } =
  ComapnyDocSlice.actions;
export default ComapnyDocSlice.reducer;
export function getCompanyDoc() {
  return async function getCompanyDocThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/companydoctemplate?_orgId=" +
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
            dispatch(setCompanyDoc(list));
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
    } catch (err) {
      console.log(err);
    }
  };
}
// export function resetCompanyList
export function resetCompanyDocList() {
  return async function resetCompanyDocListThunk(dispatch, getState) {
    try {
      var reset = [];
      dispatch(setresetCompanyDocList(reset));
    } catch (err) {
      console.log(err);
    }
  };
}
