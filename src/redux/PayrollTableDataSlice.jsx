import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from 'dayjs'

import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"

const payRollTableDataSlice = createSlice({
  name: "Payroll Page",
  initialState: [],
  reducers: {
    setPayrollTableData(state, action) {
      return (state = [...state, action.payload]);
    },
    setResetPayrollData(state, action) {
      return (state = action.payload);
    },
    setUpdatePayrollData(state, action) {
      var temp = [...state];
      temp[action.payload.index].salarydetails = [action.payload.data];
      return void (state = temp);
    },
  },
});

const { setPayrollTableData, setResetPayrollData, setUpdatePayrollData } =
  payRollTableDataSlice.actions;
export default payRollTableDataSlice.reducer;

export function getPayrollTableData(
  newToken,
  Selectedmonth,
  Selectedyear,
  Country,
  SelectedDate,
  SelectedType
) {
  return async function getPayrollTableDataThunk(dispatch, getState) {
    try {
      var orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      const month = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];

      const date = new Date();
      var Currentmonth = Selectedmonth.toLowerCase();

      var CurrentYear =
        Selectedyear === null ? date.getFullYear() : Selectedyear;
      const FinalToken =
        newToken === undefined || newToken === null || newToken === ""
          ? null
          : newToken;
      // var apiUrl =
      //   GlobalConstants.Cdomain +
      //   "/API/moramba/v3/get/all/emp/monthly/salary?orgId=" +
      //   orgId +
      //   "&month=" +
      //   Currentmonth +
      //   "&year=" +
      //   CurrentYear +
      //   "&limit=" +
      //   10 +
      //   "&nextToken=" +
      //   newToken +
      //   "&empCountry=" +
      //   Country;
      var Finaldate = dayjs(SelectedDate).format("YYYY-MM-DD");
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/get/all/emp/monthly/salary?orgId=" +
        orgId +
        "&limit=10&empSalaryPayType=" +
        SelectedType +
        "&date=" +
        Finaldate +
        "&empCountry=" +
        Country +
        "&nextToken=" +
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
          var AllEmpData = res.empall; //array of all emp in response
          var empcount = res.empAllCount;
          sessionStorage.setItem("TotalEmpinPayroll", empcount);
          sessionStorage.setItem("PayrollToken", nextToken);
          sessionStorage.setItem("hasMoreEmp", hasMoreEmp);
          var temparr = res.empall.map((v) => {
            return <>{dispatch(setPayrollTableData(v))};</>;
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
         
          // setLoading(false);
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetPayroll() {
  return async function resetPayrollThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetPayrollData(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}

export function UpdatePayroll(newToken, index, d, refresh = false) {
  var da = d;
  localStorage.setItem("refreshdata", JSON.stringify(da));
  localStorage.setItem("isrefresh", refresh);
  localStorage.setItem("refreshindex", index);
  return async function UpdatePayrollThunk(dispatch, getState) {
    try {
      var refresh = localStorage.getItem("isrefresh");
      if (refresh === "true") {
        var da = JSON.parse(localStorage.getItem("refreshdata"));
        localStorage.setItem("isrefresh", "false");
        var newda = { index: index, data: da[0] || da };
        console.log(typeof newda.data);
        console.log(newda.data);
        dispatch(setUpdatePayrollData(newda));
      }
    } catch (err) {
      console.log(err);
    }
  };
}
