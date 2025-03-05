import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const selectCompanySlice = createSlice({
  name: "SelectCompany",
  initialState: [],
  reducers: {
    setCompanies(state, action) {
      return (state = action.payload);
    },
    setUserLogout(state, action) {
      return (state = action.payload);
    },
    setResetCompanies(state, action) {
      return (state = action.payload);
    },
  },
});

const { setCompanies, setUserLogout, setResetCompanies } =
  selectCompanySlice.actions;
export default selectCompanySlice.reducer;

export function getCompany() {
  return async function getCompanyThunk(dispatch, getState) {
    try {
      dispatch(APILoader(true));
      const request_start_at = performance.now();
      const dataToBeSent = {
        collection_name: "UserRelation",
        search_key: "_userId",
        search_value: sessionStorage.getItem("user_id"),
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
          if (response.status === 200) {
            dispatch(APILoader(false));
            console.log(
              "ID:00601=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
            var res = response.data;
            var CmpnayData = JSON.parse(res.data);
            dispatch(setCompanies(CmpnayData));
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
          dispatch(APILoader(false));
          errorToast(error);
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserLogout() {
  return async function getUserLogoutThunk(dispatch, getState) {
    try {
      sessionStorage.clear();
      localStorage.clear();
      var tempLogout = [];
      dispatch(setUserLogout(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
export function resetCompanies() {
  return async function resetCompaniesThunk(dispatch, getState) {
    try {
      var ClearComp = [];
      dispatch(setResetCompanies(ClearComp));
    } catch (err) {
      console.log(err);
    }
  };
}
