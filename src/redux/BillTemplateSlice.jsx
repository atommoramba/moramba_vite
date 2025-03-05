import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const BillTemplateSlice = createSlice({
  name: "BillTemplate",
  initialState: [],
  reducers: {
    setBillTemplate(state, action) {
      // console.log("Bill------", action.payload);
      return (state = action.payload);
    },
    setResetBillTemplate(state, action) {
      // console.log("Bill------", action.payload);
      return (state = action.payload);
    },
  },
});

const { setBillTemplate, setResetBillTemplate } = BillTemplateSlice.actions;
export default BillTemplateSlice.reducer;

export function getBillTemplate() {
  return async function getBillTemplateThunk(dispatch, getState) {
    try {
      dispatch(APILoader(true));
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");
      // var _Id = sessionStorage.getItem("_Id");

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/billtemplate?_orgId=" +
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
            dispatch(APILoader(false));
            console.log(
              "ID:02401=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
            dispatch(setBillTemplate(list));
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
          errorToast(error.massage);
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetBillTemplate() {
  return async function resetBillTemplateThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetBillTemplate(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
