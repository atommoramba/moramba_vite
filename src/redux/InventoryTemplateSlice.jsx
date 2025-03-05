import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const InventoryTemplateSlice = createSlice({
  name: "InventoryTemplate",
  initialState: [],
  reducers: {
    setInventoryTemplate(state, action) {
      return (state = action.payload);
    },
    setResetInventoryTemplate(state, action) {
      return (state = action.payload);
    },
  },
});

const { setInventoryTemplate, setResetInventoryTemplate } =
  InventoryTemplateSlice.actions;
export default InventoryTemplateSlice.reducer;

export function getInventoryTemplate() {
  return async function getInventoryTemplateThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();

      var _compId = sessionStorage.getItem("_compId");
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/inventorytemplate?_orgId=" +
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
            dispatch(setInventoryTemplate(list));
            console.log(
              "ID:01801=> " +
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
export function resetInventoryTemplate() {
  return async function resetInventoryTemplateThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetInventoryTemplate(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
