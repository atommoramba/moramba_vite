import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast, successToast } from "../utils/Helper";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const CheckBalanceSlice = createSlice({
  name: "Check Balance",
  initialState: [],
  reducers: {
    setCheckBalance(state, action) {
      console.log("*------------------------", action.payload);
      return action.payload;
    },
    setResetCheckBalance(state, action) {
      console.log("*------------------------", action.payload);
      return action.payload;
    },
  },
});
const { setCheckBalance, setResetCheckBalance } = CheckBalanceSlice.actions;
export default CheckBalanceSlice.reducer;

export function getCheckbalance() {
  return async function getCheckbalanceThunk(dispatch, getState) {
    try {
      dispatch(APILoader(true));
      const request_start_at = performance.now();
      var _compId = sessionStorage.getItem("_compId");
      const dataToBeSent = {
        collection_name: "PaymentModuleDetails",
        search_key: "orgId",
        search_value: _compId,
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
          var list = JSON.parse(res.data);
          // setCheckbalemplist(JSON.parse(res.data));
          successToast(res);
          if (response.status === 200) {
            dispatch(APILoader(false));
            console.log(list);
            dispatch(setCheckBalance(list));
            console.log(
              "ID:03203=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
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
          errorToast(error.message);
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };
}
export function resetCheckBalance() {
  return async function resetCheckBalanceThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetCheckBalance(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
