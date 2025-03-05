import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const SalaryBreakupTemplateSlice = createSlice({
  name: "Salary Breakup Template",
  initialState: [],
  reducers: {
    setSalaryBreakupList(state, action) {
      return (state = action.payload);
    },
    setResetSalaryBreakupList(state, action) {
      return (state = action.payload);
    },
  },
});

const { setSalaryBreakupList, setResetSalaryBreakupList } =
  SalaryBreakupTemplateSlice.actions;
export default SalaryBreakupTemplateSlice.reducer;

export function getSalaryBreakupList() {
  return async function getSalaryBreakupListThunk(dispatch, getState) {
    try {
      dispatch(APILoader(true));
      const request_start_at = performance.now();
      var type = "selectall"; //active
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/salarybreakuptemplate?type=" +
        type;
      var body = {
        isActive: true.toString(),
        effectiveDate: "10-01-2022",
        _partition: GlobalConstants._partition,
        _empId: "NA",
        _orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
        level: "org",
        country: "NA",
        state: "NA",
        mandetorylist: "NA",
        allowancelist: "NA",
        deductionlist: "NA",
        taxlist: "NA",
        templatename: "NA",
        // _empId:,
      };

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      axios
        .post(apiUrl, body, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          if (response.status === 200) {
            dispatch(APILoader(false));
            console.log(
              "ID:01501=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
          }
          var res = response.data;
          dispatch(setSalaryBreakupList(res.data));
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
          dispatch(APILoader(false));
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

export function resetSalaryBreakupList() {
  return async function resetSalaryBreakupListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetSalaryBreakupList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
