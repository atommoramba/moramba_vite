import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie";

const CustomerListSlice = createSlice({
  name: "Customer List",
  initialState: [],
  reducers: {
    setCustomerList(state, action) {
      console.log(action.payload);
      return (state = action.payload);
    },
    setResetCustomerList(state, action) {
      console.log(action.payload);
      return (state = action.payload);
    },
  },
});

const { setCustomerList, setResetCustomerList } = CustomerListSlice.actions;
export default CustomerListSlice.reducer;

export function getCustomerList() {
  return async function getCustomerListThunk(dispatch, getState) {
    try {
      var type = "selectall";
      var data = {
        _orgId: sessionStorage.getItem("_compId"),
        customername: "customername",
        email: "email",
        address1: "address1",
        address2: "address2",
        country: "country",
        state: "state",
        zipcode: "zipcode",
        bankname: "bankname",
        bankaccountno: "bankaccountno",
        cryptoaddress: "cryptoaddress",
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/customer?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          var res = response.data;
          var list = res.data;
          dispatch(setCustomerList(list));
          //   setData(res.data);
          console.log(res);
        })
        .catch(function (error) {
          errorToast(error.response.data.message);
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
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetCustomerList() {
  return async function resetCustomerListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetCustomerList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
