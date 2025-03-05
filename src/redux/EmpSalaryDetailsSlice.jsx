import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const empSalaryDataSlice = createSlice({
  name: "EMP salary",
  initialState: [],
  reducers: {
    setEmpSalaryData(state, action) {
      console.log("*********************EMP SALARY DATA", action.payload);
      return (state = action.payload);
    },
    setResetEmpSalaryDetail(state, action) {
      console.log("*********************EMP SALARY DATA", action.payload);
      return (state = action.payload);
    },
  },
});
const { setEmpSalaryData, setResetEmpSalaryDetail } =
  empSalaryDataSlice.actions;
export default empSalaryDataSlice.reducer;

export function getEmpSalaryData() {
  return async function getEmpSalaryDataThunk(dispatch, getState) {
    try {
      const dataToBeSent = {
        collection_name: "SalaryCalculationGeneric",
        search_key: "employeeId",
        search_value: sessionStorage.getItem(
          GlobalConstants.session_current_emp_id
        ),
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
          var res = response.data;
          var list = JSON.parse(res.data);
          if (response.status === 200) {
            dispatch(setEmpSalaryData(list));
            console.log(
              "ID:03911=> " +
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
export function resetEmpSalaryDetail() {
  return async function resetEmpSalaryDetailThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetEmpSalaryDetail(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
