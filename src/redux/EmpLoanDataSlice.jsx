import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const empLoanDataSlice = createSlice({
  name: "Emp LoanDashboard",
  initialState: [],
  reducers: {
    setEmpLoanData(state, action) {
      console.log("EMP LOAN DATA", action.payload);
      return (state = action.payload);
    },
    setResetEmpLoanData(state, action) {
      return (state = action.payload);
    },
  },
});

const { setEmpLoanData, setResetEmpLoanData } = empLoanDataSlice.actions;
export default empLoanDataSlice.reducer;

export function getempLoanData() {
  return async function getempLoanDataThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var type = "selectall";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/loan?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var currentempid = sessionStorage.getItem("currentempid");
      var _compId = sessionStorage.getItem("_compId");
      var d = {
        _orgId: _compId,
        employeeId: currentempid,
        amount: "0",
        date: "2022-01-01",
        loanstatus: "na",
        paymentmethod: "na",
        paymentid: "paymentid",
        description: "description",
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          var list = res.data;
          if (response.status === 200) {
            dispatch(setEmpLoanData(list));
            console.log(
              "ID:04901=> " +
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
          console.log(error.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
}
export function resetEmpLoanData() {
  return async function resetEmpLoanDataThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetEmpLoanData(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
