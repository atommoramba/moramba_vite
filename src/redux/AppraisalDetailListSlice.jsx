// Get Appraisal List [ AppraisalList  ]

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const AppraisalDetailListSlice = createSlice({
  name: "AppraisalDetailList",
  initialState: [],
  reducers: {
    setAppraisalDetailList(state, action) {
      return (state = action.payload);
    },
    setResetAppraisalDetailList(state, action) {
      return (state = action.payload);
    },
  },
});

const { setAppraisalDetailList, setResetAppraisalDetailList } =
  AppraisalDetailListSlice.actions;
export default AppraisalDetailListSlice.reducer;

export function getAppraisalDetailList() {
  return async function getAppraisalDetailListThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();

      var _compId = sessionStorage.getItem("_compId");
      const dataToBeSent = {
        collection_name: "appraisal",
        search_key: "employeeId",
        search_value: sessionStorage.getItem("currentempid"),
      };
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
          var x = JSON.parse(res.data);
          if (response.status === 200) {
            dispatch(setAppraisalDetailList(x));
            console.log(
              "ID:04701=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
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
export function resetAppraisalDetailList() {
  return async function resetAppraisalDetailListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetAppraisalDetailList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
