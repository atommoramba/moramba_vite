import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const SubscriptionTemplateSlice = createSlice({
  name: "SubscriptionTemplate",
  initialState: [],
  reducers: {
    setSubscriptionTemplate(state, action) {
      return (state = action.payload);
    },
    setResetSubscriptionTemplate(state, action) {
      return (state = action.payload);
    },
  },
});

const { setSubscriptionTemplate, setResetSubscriptionTemplate } =
  SubscriptionTemplateSlice.actions;
export default SubscriptionTemplateSlice.reducer;

export function getSubscriptionTemplate() {
  return async function getSubscriptionTemplateThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/subscriptiontemplate?_orgId=" +
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
          var select = res.data[0].breakuplist;
          if (response.status === 200) {
            dispatch(setSubscriptionTemplate(list));
            console.log(
              "ID:02101=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
          }
        })
        .catch(function (error) {
          console.log(error);
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
export function resetSubscriptionTemplate() {
  return async function resetSubscriptionTemplateThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetSubscriptionTemplate(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
