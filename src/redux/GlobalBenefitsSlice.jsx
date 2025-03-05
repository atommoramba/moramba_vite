import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";

const GlobalBenefits = createSlice({
  name: "Global Benefits",
  initialState: [],
  reducers: {
    setGlobalBenefitsData(state, action) {
      return (state = action.payload);
    },
    setResetGlobalBenefits(state, action) {
      return (state = action.payload);
    },
  },
});
const { setGlobalBenefitsData, setResetGlobalBenefits } =
  GlobalBenefits.actions;
export default GlobalBenefits.reducer;

export function getGlobalBenefits(country) {
  return async function getGlobalBenefitsThunk(dispatch, getState) {
    try {
      var _compId = sessionStorage.getItem("_compId");
      var apiUrl =
        GlobalConstants.Cdomain + "/API/moramba/v3/get/all/global/benefits?_orgId="+ _compId;

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
          var FilteredCountryBenefites = res.data.filter(function (e) {
            return (
              e.country ===
              (country === "United Arab Emirates" ? "UAE" : country)
            );
          });
          dispatch(setGlobalBenefitsData(FilteredCountryBenefites));
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
export function resetGlobalBenefits() {
  return async function resetGlobalBenefitsThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetGlobalBenefits(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
