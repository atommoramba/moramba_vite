import React, { useState } from "react";
import "./LoginV3.css";
import Bg from "../../assets/img/LoginV3-Bg.png";
import { FaEyeSlash, FaEye, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/MorambaLogo.png";
import { errorToast, successToast } from "../../utils/Helper";
import APITimer from "../../utils/APITimer";
import { resetCompanies } from "../../redux/selectCompanySlice";
import dayjs from "dayjs";

import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Button } from "bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { FcFeedback } from "react-icons/fc";

function LoginV3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginClick, setloginClick] = useState(false);
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPass, setEnterPass] = useState("");
  const [addemailorPhone, setAddEmailorPhone] = useState("");
  const [addpassword, setAddPassword] = useState("");
  const [errlogin, setErrlogin] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    var value = e.target.value;
    var NumberRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (NumberRegex.test(value) === true) {
      setAddEmailorPhone("+" + e.target.value);
    } else {
      setAddEmailorPhone(e.target.value);
    }
  };
  const setDataToSessionFromCookie = async () => {
    var usernameInCookie = Cookie.get("username");
    var user_idInCookie = Cookie.get("user_id");
    var AdminFNameInCookie = Cookie.get("AdminFName");
    var AdminLNameInCookie = Cookie.get("AdminLName");
    var tokenInCookie = Cookie.get("token");

    sessionStorage.setItem("username", usernameInCookie);
    sessionStorage.setItem("user_id", user_idInCookie);
    sessionStorage.setItem("AdminFName", AdminFNameInCookie);
    sessionStorage.setItem("AdminLName", AdminLNameInCookie);
    sessionStorage.setItem("token", tokenInCookie);
  };
  //redirect http->https

  // useEffect(() => {
  //   if (
  //     window.location.hostname === "localhost" ||
  //     window.location.hostname === "127.0.0.1" ||
  //     window.location.hostname === ""
  //   ) {
  //   } else {
  //     if (window.location.protocol === "https:") {
  //       console.log(window.location.protocol);
  //     } else {
  //       console.log(
  //         "you are accessing us via " +
  //           "an insecure protocol (HTTP). " +
  //           "Redirecting you to HTTPS."
  //       );

  //       window.location.href = window.location.href.replace("http:", "https:");
  //     }
  //   }
  // }, []);
  // Checking for cookie
  useEffect(() => {
    var tokenInCookie = Cookie.get("token");

    if (tokenInCookie) {
      var usernameInCookie = Cookie.get("username");
      var user_idInCookie = Cookie.get("user_id");
      var AdminFNameInCookie = Cookie.get("AdminFName");
      var AdminLNameInCookie = Cookie.get("AdminLName");

      setDataToSessionFromCookie().then(() => {
        navigate("/selectcompany", {
          state: {
            usernameInCookie,
            user_idInCookie,
            AdminFNameInCookie,
            AdminLNameInCookie,
            tokenInCookie,
          },
        });
      });
    }
  }, []);
  //Enter Keypress
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      if (loginClick) {
        return;
      }
      loginHandler();
      setloginClick(true);
    }
  };
  //Validation
  const loginValidation = () => {
    let formIsValid = true;
    if (addemailorPhone === "") {
      formIsValid = false;
      setEnterEmail("*Please Enter Email or Phone Number!");
    }
    if (addpassword === "") {
      formIsValid = false;
      setEnterPass("*Please Enter Password!");
    }

    return formIsValid;
  };
  //Language API
  const languageHandle = (e) => {
    console.log("LAN CALLED");
    const request_start_at = new Date();
    const languageCode = "en";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/defaultlanguages/selectdefaultlanguage?languageCode=" +
      languageCode;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        const request_end_at = new Date();
        const request_duration = dayjs(
          request_end_at - request_start_at
        ).format("ss.ms");
        if (response.status === 200) {
          APITimer(
            "00102",
            addemailorPhone,
            request_start_at,
            request_end_at,
            request_duration
          );
        }
        var res = response.data.data[0].defaultlanguagescreenlist;

        // Efficient way to build XML
        let xmlArray = ["<resources>"];
        const escapeXml = (unsafe) =>
          unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

        const sanitizeKey = (key) =>
          key.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

        for (let i = 0; i < res.length; i++) {
          let d = res[i];
          for (let j = 0; j < d.defaultscreenfieldslist.length; j++) {
            var kv = d.defaultscreenfieldslist[j];
            xmlArray.push(
              `<string name="${sanitizeKey(kv.fieldKey)}">${escapeXml(
                kv.fieldValue
              )}</string>`
            );
          }
        }
        xmlArray.push("</resources>");
        let xml = xmlArray.join("");
        GlobalConstants.appXml = xml;
        localStorage.setItem(GlobalConstants.session_lang_xml, xml);
        localStorage.setItem(GlobalConstants.session_default_language, "en");
      })
      .catch(function (error) {
        console.log(error);
        errorToast(error.massage);
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
  };
  const loginHandler = () => {
    setloginClick(true);
    console.log("test");
    if (loginValidation()) {
      const today = new Date();
      const currentDay = today.getDate();
      sessionStorage.setItem("lastVisitedDay", currentDay.toString());
      const request_start_at = new Date();
      var API_URL = GlobalConstants.Cdomain + "/API/moramba/v4/user/login";
      var DATA = {
        username: addemailorPhone.toLowerCase(),
        password: addpassword,
      };
      axios
        .post(API_URL, DATA)
        .then(function (response) {
          console.log(response);
          const request_end_at = new Date();
          const request_duration = dayjs(
            request_end_at - request_start_at
          ).format("ss.ms");
          if (response.status === 200) {
            dispatch(resetCompanies());
            APITimer(
              "00101",
              addemailorPhone,
              request_start_at,
              request_end_at,
              request_duration
            );
            var res = response.data;
            // successToast(response.data.message);
            sessionStorage.setItem(
              "username",
              res.data.firstname + res.data.lastname
            );
            console.log(response.data);
            sessionStorage.setItem("user_id", res.data.user_id);
            sessionStorage.setItem("AdminFName", res.data.firstname);
            sessionStorage.setItem("AdminLName", res.data.lastname);
            sessionStorage.setItem("token", res.data.token);
            // ----------------------
            if (rememberMe) {
              Cookie.set("username", res.data.firstname + res.data.lastname);
              Cookie.set("user_id", res.data.user_id);
              Cookie.set("AdminFName", res.data.firstname);
              Cookie.set("AdminLName", res.data.lastname);
              Cookie.set("token", res.data.token);
            }
            // ----------------------
            languageHandle();
            setTimeout(() => {
              navigate(`/selectcompany`);
            }, 1000);
          }
        })
        .catch(function (error) {
          console.log("login error***", error);
          setloginClick(false);
          if (
            error.response.data.message === "Account inactive" ||
            error.response.data.message === "mobile number not verified" ||
            error.response.data.message === "email not verified"
          ) {
            setOpen(true);
          } else {
            // errorToast(error.response.data.message);
            setErrlogin(error.response.data.message);
          }

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
    } else {
      setloginClick(false);
    }
  };

  return (
    <>
      <main className="login-main" onKeyPress={keyHandler}>
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" className="text-center">
              <FcFeedback className="Email-icon" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <h3 className="text-center">Please Verify Your Account</h3>
                <h5 className="text-center">
                  We have sent you a link on your registered email or phone no.
                  to verify your Account.
                </h5>
                <h5 className="text-center">
                  Please check your Spam or Junk folder.
                </h5>
                <br />
                <p className="text-center">
                  <Link to="/support" className="text_account">
                    <u>Resend verification link</u>
                  </Link>
                </p>
              </DialogContentText>
              <Divider />
            </DialogContent>
            <DialogActions>
              <button className="btncancel mx-4" onClick={handleClose}>
                Close
              </button>
            </DialogActions>
          </Dialog>
        </div>
        <nav className="d-flex justify-content-between align-items-center w-full mb-5 p-3">
          <div>
            <img className="logoimg" src={Logo} alt="" />
          </div>
        </nav>
        <div className="d-flex justify-content-evenly align-items-center w-full">
          <img src={Bg} alt="Login_Background" id="login-bg" />
          <div className="login-main-box text-center p-4">
            <h3 className="logo_text">Sign In</h3>
            <h6 className="text-muted">
              Welcome Back!
              <br />
              Please Enter Your Details.
            </h6>
            <div className="login-form">
              <div>
                <input
                  placeholder="Enter Email or Phone Number"
                  // type="email"
                  className="Login-input"
                  onChange={(e) => [
                    handleChange(e),
                    setEnterEmail(""),
                    setErrlogin(""),
                  ]}
                  value={addemailorPhone}
                />
                <p className="error_sty text-start px-3 mt-1">{enterEmail}</p>
              </div>
              <div className="d-flex err_login mx-3">
                {/* <img className="tooltipSty" src={Tooltip} /> */}
                <FaInfoCircle />
                {/* &nbsp;{" "} */}&nbsp;
                <span className="tooltipinfo">
                  Enter Phone number add country code. For example, +1xxxxxxxxx{" "}
                </span>
              </div>
              <div
                className="d-flex flex-row align-items-baseline me-3"
                id="eye"
              >
                <input
                  placeholder="Enter Password"
                  type={passwordShown ? "text" : "password"}
                  className="Login-input mt-4"
                  onChange={(e) => [
                    setAddPassword(e.target.value),
                    setEnterPass(""),
                    setErrlogin(""),
                  ]}
                />
                <button
                  className="eyebtn"
                  onClick={() => setPasswordShown(!passwordShown)}
                >
                  {passwordShown === true ? (
                    <FaEye className="" />
                  ) : (
                    <FaEyeSlash className="" />
                  )}
                </button>
              </div>
              <p className="error_sty text-start px-3 mt-1">{enterPass}</p>
              <div className="RememberForgotBox  mt-1 p-3">
                <div className="d-flex align-items-baseline">
                  <input
                    type="checkbox"
                    name="remeber-me"
                    className="me-1"
                    onClick={(e) => setRememberMe(e.target.checked)}
                  />
                  <p className="text-remembar">Remember me</p>
                </div>
                <Link to="/forgotpassword" className="forgot_text">
                  <h6 className="text-muted text-remembar">Forgot Password?</h6>
                </Link>
              </div>
              <div className="p-3">
                <p className="regErr-p  mb-4">{errlogin}</p>
                <button
                  className="sign-up-btn w-100 "
                  disabled={loginClick}
                  onClick={loginHandler}
                >
                  Sign In
                </button>
                <div className="mt-3">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="text_account">
                      <b>Sign Up</b>
                    </Link>
                  </p>
                </div>
                <div className="mt-1">
                  <p>
                    {" "}
                    <Link to="/support">
                      <u> Having Trouble sign in?</u>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center loginPromotext text-muted">
          Digital Expeditions Inc Delaware, USA
          {/* Product of Atom, A Delaware Corporation. */}
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default LoginV3;
