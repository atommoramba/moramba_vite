import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import { APILoader } from "./LoadingSlice";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const CompanyBankDetailSlice = createSlice({
  name: "companyBankDetail",
  initialState: [],
  reducers: {
    setCompanyBankDetail(state, action) {
      console.log("CBDS", action.payload);
      return (state = action.payload);
    },
    setResetCompanyBankDetail(state, action) {
      console.log("CBDS", action.payload);
      return (state = action.payload);
    },
  },
});

const { setCompanyBankDetail, setResetCompanyBankDetail } =
  CompanyBankDetailSlice.actions;
export default CompanyBankDetailSlice.reducer;

export function getCompanyBankDetail() {
  return async function getCompanyBankDetailThunk(dispatch, getState) {
    try {
      dispatch(APILoader(true));
      // =============================================================================================
      var type = "selectall";
      const request_start_at = performance.now();
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/bankdetails?type=" +
        type;
      var d = {
        _id: "NA",
        _orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
        banknickname: "NA",
        bankname: "NA",
        bankaccountno: "NA",
        country: "NA",
        bankaddress: "NA",
        ifsccode: "NA",
        swiftcode: "NA",
        abacode: "NA",
        ibancode: "NA",
        upi: "NA",
        createdBy: "NA",
        updateBy: "NA",
      };
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          var res = response.data;
          var tempdata = res.data;
          console.log(res.data);
          if (response.status === 200) {
            dispatch(APILoader(false));
            dispatch(setCompanyBankDetail(tempdata));
            console.log(
              "ID:03102=> " +
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
          console.log(error);
          errorToast(error.message);
        })
        .then(function () {
          // always executed
        });
      // =============================================================================================
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetCompanyBankDetail() {
  return async function resetCompanyBankDetailThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetCompanyBankDetail(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
