import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";

const AllEmployeeList = createSlice({
  name: "All Employee List",
  initialState: [],
  reducers: {
    setAllEmp(state, action) {
      return (state = action.payload);
    },
    setResetAllEmp(state, action) {
      return (state = action.payload);
    },
  },
});
const { setAllEmp, setResetAllEmp } = AllEmployeeList.actions;
export default AllEmployeeList.reducer;

export function getAllEmp() {
  return async function getAllEmpThunk(dispatch, getState) {
    try {
      var _compId = sessionStorage.getItem("_compId");
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/allemp/1?_orgId=" +
        _compId;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .get(apiUrl, headerConfig)
        .then(function (response) {
          dispatch(setAllEmp(response.data.data));
        })
        .catch(function (error) {
          errorToast(error.message);
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

export function resetAllEmpList() {
  return async function resetAllEmpListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetAllEmp(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
