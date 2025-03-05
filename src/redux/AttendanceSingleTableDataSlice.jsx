import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";

const AttendanceSingleTableSlice = createSlice({
  name: "Selected Company",
  initialState: [],
  reducers: {
    setEmpAttendanceTableData(state, action) {
      return (state = action.payload);
    },
    setResetEmpAttendanceSingleTable(state, action) {
      return (state = action.payload);
    },
  },
});

const { setEmpAttendanceTableData, setResetEmpAttendanceSingleTable } =
  AttendanceSingleTableSlice.actions;
export default AttendanceSingleTableSlice.reducer;

export function getEmpAttendanceTableData(year) {
  return async function getEmpAttendanceTableDataThunk(dispatch, getState) {
    try {
      var employeeId = sessionStorage.getItem(
        GlobalConstants.session_current_emp_id
      );
      const _orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      const SelectMonth = dayjs(year).format("MMM").toLocaleLowerCase();
      const SelectYear = dayjs(year).format("YYYY").toLocaleLowerCase();
      console.log(SelectMonth);

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/getdata/attendance/attendancealldaycount?employeeId=" +
        employeeId +
        "&_orgId=" +
        _orgId +
        "&type=monthly" +
        "&month=" +
        SelectMonth +
        "&year=" +
        SelectYear;

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
          var list = res.data.data;
          if (response.status === 200) {
            dispatch(setEmpAttendanceTableData(list));
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
export function resetEmpAttendanceSingleTable() {
  return async function resetEmpAttendanceSingleTableThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetEmpAttendanceSingleTable(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
