import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const SelectedCompanySlice = createSlice({
  name: "Selected Company",
  initialState: [],
  reducers: {
    setSelectedComp(state, action) {
      return (state = action.payload);
    },
  },
});

const { setSelectedComp } = SelectedCompanySlice.actions;
export default SelectedCompanySlice.reducer;

export function getSelectedCompany() {
  return async function getSelectedCompanyThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");
      var collecton_name = "company";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/getdata/collectiondata?collection_name=" +
        collecton_name +
        "&search_key=_id&search_value=" +
        _compId +
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
            dispatch(setSelectedComp(list));
            sessionStorage.setItem(
              "currentorgvacationdays",
              list[0].vacationDays
            );
            sessionStorage.setItem("cmp_country", list[0].country);
            sessionStorage.setItem("fiscalYear", list[0].fiscalYear);
            sessionStorage.setItem("companyImage", list[0].imageKey);
            console.log(
              "ID:00702=> " +
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
