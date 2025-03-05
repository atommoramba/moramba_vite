import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import Cookie from "js-cookie"

const RequestsListSlice = createSlice({
  name: "Requests List",
  initialState: [],
  reducers: {
    setRequestsList(state, action) {
      return (state = action.payload);
    },
    setResetRequestsList(state, action) {
      return (state = action.payload);
    },
  },
});

const { setRequestsList, setResetRequestsList } = RequestsListSlice.actions;
export default RequestsListSlice.reducer;

export function getRequestsList() {
  return async function getRequestsListThunk(dispatch, getState) {
    try {
      const dataToBeSent = {
        collection_name: "approvalrequeststatus",
        search_key: "approver_id",
        search_value: sessionStorage.getItem(
          GlobalConstants.session_current_emp_id
        ),
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
          const list = JSON.parse(res.data);
          dispatch(setRequestsList(list));
          console.log(list);
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

export function resetRequestsList() {
  return async function resetRequestsListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetRequestsList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
