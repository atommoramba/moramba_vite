import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const InvoiceTemplateSlice = createSlice({
  name: "InvoiceTemplate",
  initialState: [],
  reducers: {
    setInvoiceTemplate(state, action) {
      return (state = action.payload);
    },
    setResetInvoiceTemplate(state, action) {
      return (state = action.payload);
    },
  },
});

const { setInvoiceTemplate, setResetInvoiceTemplate } =
  InvoiceTemplateSlice.actions;
export default InvoiceTemplateSlice.reducer;

export function getInvoiceTemplate() {
  return async function getInvoiceTemplateThunk(dispatch, getState) {
    try {
      var _compId = sessionStorage.getItem("_compId");
      const request_start_at = performance.now();

      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/invoicetemplate?_orgId=" +
        _compId ;

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
            console.log(
              "ID:02501=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
            dispatch(setInvoiceTemplate(list));
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
export function resetInvoiceTemplate() {
  return async function resetInvoiceTemplateThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetInvoiceTemplate(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
