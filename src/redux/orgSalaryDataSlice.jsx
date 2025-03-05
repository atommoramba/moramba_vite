import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"

const orgSalaryDataSlice = createSlice({
  name: "Org salary",
  initialState: [],
  reducers: {
    setOrgSalary(state, action) {
      return (state = action.payload);
    },
    setresetOrgSalary(state, action) {
      return (state = action.payload);
    },
  },
});

const { setOrgSalary, setresetOrgSalary } = orgSalaryDataSlice.actions;
export default orgSalaryDataSlice.reducer;

export function getOrgSalaryData() {
  return async function getOrgSalaryDataThunk(dispatch, getState) {
    try {
      const request_start_at = performance.now();
      var orgID = sessionStorage.getItem("_compId");
      const data = {
        _orgId: sessionStorage.getItem("_compId"),
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        `/API/moramba/v3/get/salarytilldateorg?_orgId=${orgID}`;

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

          var res = response.data.data;
          var FilteredSalaryData = res?.filter((val) => val.salary !== "NA");

          const finalData = Array.from(
            FilteredSalaryData.reduce(
              (m, { empCurrency, salary }) =>
                m.set(empCurrency, (m.get(empCurrency) || 0) + salary),
              new Map()
            ),
            ([empCurrency, salary]) => ({ empCurrency, salary })
          );
          dispatch(setOrgSalary(finalData));
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

export function resetOrgSalary() {
  return async function resetresetOrgSalaryThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setresetOrgSalary(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}

