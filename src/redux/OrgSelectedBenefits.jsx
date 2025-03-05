import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";

const OrgSelectedBenefits = createSlice({
  name: "Org Selected Benefits",
  initialState: [],
  reducers: {
    setOrgSelectedBenefitsData(state, action) {
      return (state = action.payload);
    },
    setResetOrgSelectedBenefits(state, action) {
      return (state = action.payload);
    },
  },
});
const { setOrgSelectedBenefitsData, setResetOrgSelectedBenefits } =
  OrgSelectedBenefits.actions;
export default OrgSelectedBenefits.reducer;

export function getOrgSelectedBenefits() {
  return async function getOrgSelectedBenefitsThunk(dispatch, getState) {
    try {
      var orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/all/org/benefits?orgId=" +
        orgId;

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
          dispatch(setOrgSelectedBenefitsData(FinalData));
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
export function resetOrgSelectedBenefits() {
  return async function resetOrgSelectedBenefitsThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetOrgSelectedBenefits(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
