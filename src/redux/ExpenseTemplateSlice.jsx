import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const ExpenseTemplateSlice = createSlice({
  name: "ExpenseTemplate",
  initialState: [],
  reducers: {
    setExpenseTemplate(state, action) {
      // console.log("Expense------", action.payload);
      return (state = action.payload);
    },
    setResetExpenseTemplate(state, action) {
      // console.log("Expense------", action.payload);
      return (state = action.payload);
    },
  },
});

const { setExpenseTemplate, setResetExpenseTemplate } =
  ExpenseTemplateSlice.actions;
export default ExpenseTemplateSlice.reducer;

export function getExpenseTemplate() {
  return async function getExpenseTemplateThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/expensetemplate?_orgId=" +
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
            dispatch(setExpenseTemplate(list));
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
export function resetExpenseTemplate() {
  return async function resetExpenseTemplateThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetExpenseTemplate(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
