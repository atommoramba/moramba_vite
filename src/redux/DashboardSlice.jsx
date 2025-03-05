import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie";

const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState: [],
  reducers: {
    setDashboard(state, action) {
      return (state = [...state, action.payload]);
    },
    setResetDashboardEmpList(state, action) {
      return (state = action.payload);
    },
    setSingleEmp(state, action) {
      return (state = action.payload);
    },
  },
});

const { setDashboard, setResetDashboardEmpList, setSingleEmp } =
  DashboardSlice.actions;
export default DashboardSlice.reducer;

export function getDashboard(newToken) {
  return async function getDashboardThunk(dispatch, getState) {
    try {
      var _compId = sessionStorage.getItem("_compId");
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/all/emp?orgId=" +
        _compId +
        "&limit=10&nextToken=" +
        newToken;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .get(apiUrl, headerConfig)
        .then(function (response) {
          var res = response.data.data;

          var hasMoreEmp = res.hasMoreEmps;
          var nextToken = res.nextToken;
          var empcount = res.empAllCount;
          sessionStorage.setItem("empcount", empcount);
          sessionStorage.setItem("DashboardToken", nextToken);
          sessionStorage.setItem("HasMoreEmpDashboard", hasMoreEmp);
          sessionStorage.setItem("TotalEmp", res.empAllCount);
          var temparr = res.empall.map((v) => {
            return <>{dispatch(setDashboard(v))};</>;
          });
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

export function getSingleEmp() {
  return async function getSingleEmpThunk(dispatch, getState) {
    try {
      var _compId = sessionStorage.getItem("_compId");
      var User_id = sessionStorage.getItem("user_id");
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/single/employee?orgId=" +
        _compId +
        "&user_id=" +
        User_id;

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .get(apiUrl, headerConfig)
        .then(function (response) {
          dispatch(setSingleEmp([response.data.data])); //ADD RES.DATA HERE
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

export function resetDashboardEmpList() {
  return async function resetDashboardEmpListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetDashboardEmpList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
