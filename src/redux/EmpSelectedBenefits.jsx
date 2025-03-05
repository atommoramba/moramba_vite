import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";

const EmpSelectedBenefits = createSlice({
  name: "Emp Selected Benefits",
  initialState: [],
  reducers: {
    setEmpSelectedBenefitsData(state, action) {
      return (state = action.payload);
    },
    setResetEmpSelectedBenefits(state, action) {
      return (state = action.payload);
    },
  },
});
const { setEmpSelectedBenefitsData, setResetEmpSelectedBenefits } =
  EmpSelectedBenefits.actions;
export default EmpSelectedBenefits.reducer;

export function getEmpSelectedBenefitsData() {
  return async function getEmpSelectedBenefitsDataThunk(dispatch, getState) {
    try {
      var orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      var empId = sessionStorage.getItem(
        GlobalConstants.session_current_emp_id
      );
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/all/emp/benefits?orgId=" +
        orgId +
        "&empId=" +
        empId;

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
          var FinalData = res.data.benefitall;
          dispatch(setEmpSelectedBenefitsData(FinalData));
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
export function resetEmpSelectedBenefitsData() {
  return async function resetEmpSelectedBenefitsDataThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetEmpSelectedBenefits(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
