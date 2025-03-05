import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie"

const BillListSlice = createSlice({
  name: "Bill List",
  initialState: [],
  reducers: {
    setBillList(state, action) {
      return (state = action.payload);
    },
    setResetBillList(state, action) {
      return (state = action.payload);
    },
  },
});

const { setBillList, setResetBillList } = BillListSlice.actions;
export default BillListSlice.reducer;

export function getBillList() {
  return async function getBillListThunk(dispatch, getState) {
    try {
      dispatch(APILoader(true));
      const dataToBeSent = {
        collection_name: "paybillDataV2",
        search_key: "_orgId",
        search_value: sessionStorage.getItem("_compId"),
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
          var res = response.data;
          var list = JSON.parse(res.data);
          dispatch(setBillList(list));
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
          console.log(error);
          dispatch(APILoader(false));
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetBillList() {
  return async function resetBillListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetBillList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
