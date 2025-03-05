import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";
import { errorToast } from "../utils/Helper";
import Cookie from "js-cookie"

const VendorListSlice = createSlice({
  name: "Vendor List",
  initialState: [],
  reducers: {
    setVendorList(state, action) {
      console.log(action.payload);
      return (state = action.payload);
    },
    setResetVendorList(state, action) {
      console.log(action.payload);
      return (state = action.payload);
    },
  },
});

const { setVendorList, setResetVendorList } = VendorListSlice.actions;
export default VendorListSlice.reducer;

export function getVendorList() {
  return async function getVendorListThunk(dispatch, getState) {
    try {
      var type = "selectall";
      var data = {
        _orgId: sessionStorage.getItem("_compId"),
        vendorname: "vendorname",
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
        "/API/moramba/v3/crud/collection/vendor?type=" +
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
          dispatch(setVendorList(list));
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
export function resetVendorList() {
  return async function resetVendorListThunk(dispatch, getState) {
    try {
      var tempLogout = [];
      dispatch(setResetVendorList(tempLogout));
    } catch (err) {
      console.log(err);
    }
  };
}
