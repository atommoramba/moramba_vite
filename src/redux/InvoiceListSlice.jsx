import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import Cookie from "js-cookie"

const InovoiceListSlice = createSlice({
  name: "Invoice List",
  initialState: [],
  reducers: {
    setInvoiceList(state, action) {
      return (state = action.payload);
    },
    setResetInvoiceList(state, action) {
      return (state = action.payload);
    },
  },
});

const { setInvoiceList, setResetInvoiceList } = InovoiceListSlice.actions;
export default InovoiceListSlice.reducer;

export function getInvoiceList() {
  return async function getInvoiceListThunk(dispatch, getState) {
    try {
      const dataToBeSent = {
        collection_name: "invoiceDataV2",
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
          dispatch(setInvoiceList(list));
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
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetInvoiceList() {
  return async function resetInovoiceListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetInvoiceList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
