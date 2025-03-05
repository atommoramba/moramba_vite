import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const empDataSlice = createSlice({
  name: "Employee Data",
  initialState: [],
  reducers: {
    setEmpData(state, action) {
      console.log("*********************EMP DATA", action.payload);
      return (state = action.payload);
    },
  },
});
const { setEmpData } = empDataSlice.actions;
export default empDataSlice.reducer;

export function getEmpData() {
  return async function getEmpDataThunk(dispatch, getState) {
    try {
      const currentstaffid = sessionStorage.getItem("currentempid");

      const dataToBeSent = {
        collection_name: "employee",
        search_key: "_id",
        search_value: currentstaffid,
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
          console.log("**********************", list);
          if (response.status === 200) {
            var empvacationday = list[0].vacationDays;
            sessionStorage.setItem("empvacationdays", empvacationday);
            sessionStorage.setItem("EmpStatus", list[0]?.empStatusid);

            dispatch(setEmpData(list));
            console.log(
              "ID:03903=> " +
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
