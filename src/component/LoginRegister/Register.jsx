import React, { useState } from "react";
import "./RegisterV3.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Bg from "../../assets/img/LoginV3-Bg.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Logo from "../../assets/img/MorambaLogo.png";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/Validation";
import { GlobalConstants, countriesList } from "../../utils/GlobalConstants";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";

import { successToast, errorToast, warnToast } from "../../utils/Helper";
import PhoneInput from "react-phone-input-2";
import Cookie from "js-cookie";
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
import { FcFeedback } from "react-icons/fc";
import PasswordChecklist from "react-password-checklist";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);
function RegisterV3() {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [passwordShown, setPasswordShown] = useState(false);
  const [cPassShown, setCPassShown] = useState(false);

  const [CountryCode, setCountryCode] = useState("IN");
  const [Country, setCountry] = useState("India");
  const [PhoneNo, setPhoneNo] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [errfirstname, setErrFirstName] = useState("");
  const [errlastname, setErrLastName] = useState("");
  const [enterPass, setEnterPass] = useState("");
  const [enteremail, setEnteremail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [enterconfirmpass, setEnterConfirmPass] = useState("");
  const [btnClick, setBtnClick] = useState(false);
  const [email, setEmail] = useState("");
  const [enterPhone, setEnterPhone] = useState("");
  const [ResellerID, setResellerID] = useState("");
  const [showPartnerId, setShowPartnerId] = useState(false);
  const [open, setOpen] = useState(false);
  const [regErr, setRegErr] = useState("");
  const [showPassInfo, setShowPassInfo] = useState(false);

  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
  };
  //enter Key
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      if (btnClick) {
        return;
      }
      registerHandler();
      setBtnClick(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Validation
  const registerValidation = () => {
    let formValid = true;
    if (firstname === "") {
      formValid = false;
      setErrFirstName("*Please Enter First Name!");
    }
    if (lastname === "") {
      formValid = false;
      setErrLastName("*Please Enter Last Name!");
    }
    if (email === "" && PhoneNo === "") {
      formValid = false;
      setEnterPhone("*Please Enter Phone Number!");
      setEnteremail("*Please Enter Email!");
    }
    if (PhoneNo !== "") {
      formValid = true;
      setEnteremail("");
    }
    if (email !== "" && EMAIL_REGEX.test(email) === false) {
      formValid = false;
      setEnteremail("*Please Enter Valid Email!");
      setEnterPhone("");
    }
    if (EMAIL_REGEX.test(email) === true) {
      formValid = true;
      setEnteremail("");
      setEnterPhone("");
    }
    if (!PASSWORD_REGEX.test(password) === true) {
      formValid = false;
      if (password === "") {
        formValid = false;
        setEnterPass("*Please Enter Password!");
      } else {
        setEnterPass("*Please Enter Strong Password!");
      }
    }
    if (confirmpass !== password) {
      formValid = false;
      if (confirmpass === "") {
        formValid = false;
        setEnterConfirmPass("*Please Enter Confirm password!");
      } else {
        setEnterConfirmPass("*Confirm Password Does Not Match With Password!");
      }
    }
    return formValid;
  };

  //Register API
  const registerHandler = () => {
    const request_start_at = performance.now();
    if (registerValidation()) {
      var API_URL = GlobalConstants.Cdomain + "/API/moramba/v4/user/createuser";
      var DATA = {
        email: email,
        password: password,
        role: "role",
        firstname: firstname,
        lastname: lastname,
        mobile: PhoneNo === "" ? "" : "+" + PhoneNo,
        country: Country,
        partnerid: ResellerID,
      };
      axios
        .post(API_URL, DATA)
        .then(function (response) {
          //API PERFORMACE CHECKUP
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          if (response.status === 200) {
            console.log(
              "ID:00101=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
            // successToast(response.data.message);
            setOpen(true);

            // setTimeout(() => { ̰
            //   navigate("/login");
            // }, 1000);
          }
        })
        .catch(function (error) {
          const ermsg = error.response.data.message;
          if (ermsg === "name already in use") {
            // errorToast("email already in use");
            setRegErr("email already in use");
          } else if (ermsg === "No internet connection") {
            // warnToast("No internet connection");
            setRegErr("No internet connection");
          } else {
            setRegErr(error?.response?.data?.message);
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
    }
  };
  return (
    <>
      <main className="register-main" onKeyPress={keyHandler}>
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
                {/* <p className="text-center">
                  <Link to="/support" className="text_account">
                    <u>Resend verification link</u>
                  </Link>
                </p> */}
              </DialogContentText>
              <Divider />
            </DialogContent>
            <DialogActions>
              <button
                className="btncancel mx-4"
                onClick={() => navigate("/login")}
              >
                Ok
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
          <div className="Register-main-box p-4">
            <div className="text-center">
              <h3 className="logo_text">Sign Up</h3>
              <h6 className="text-muted">Join Us Now!</h6>
            </div>
            <div className="register-form">
              <div className="d-flex flex-wrap gap-4">
                <div className="  mt-2">
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    className="Register-input"
                    onChange={(e) => [
                      setFirstName(e.target.value),
                      setErrFirstName(""),
                      setRegErr(""),
                    ]}
                  />
                  <p className="error_sty">{errfirstname}</p>
                </div>
                <div className="  mt-2">
                  <input
                    placeholder="Enter Last Name"
                    type="text"
                    className="Register-input"
                    onChange={(e) => [
                      setLastName(e.target.value),
                      setErrLastName(""),
                      setRegErr(""),
                    ]}
                  />
                  <p className="error_sty">{errlastname}</p>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="Enter Email"
                    type="email"
                    className="Register-input"
                    onChange={(e) => [
                      setEmail(e.target.value),
                      setEnteremail(""),
                      setEnterPhone(""),
                      setRegErr(""),
                    ]}
                  />
                  <p className="error_sty">{enteremail}</p>
                </div>
                <div className="mt-2">
                  <>
                    <PhoneInput
                      onChange={(e) => [
                        setPhoneNo(e),
                        setEnterPhone(""),
                        setEnteremail(""),
                        setRegErr(""),
                      ]}
                      inputStyle={{
                        background: "#ffffff",
                        height: "50px",
                        width: "30px",
                      }}
                      inputClass="Register-input"
                      placeholder={"Enter Phone Number"}
                      value={PhoneNo}
                    />
                    <p className="error_sty">{enterPhone}</p>
                  </>
                </div>
                <div className="  mt-2">
                  <input
                    placeholder="Enter Password"
                    type={passwordShown ? "text" : "password"}
                    className="Register-input reg-pass-inputs"
                    onChange={(e) => [
                      setPassword(e.target.value),
                      setEnterPass(),
                      setRegErr(""),
                    ]}
                    value={password}
                  />
                  <button
                    className="eyebtnReg"
                    onClick={() => setPasswordShown(!passwordShown)}
                  >
                    {passwordShown === true ? (
                      <FaEye className="" />
                    ) : (
                      <FaEyeSlash className="" />
                    )}
                  </button>
                  <p className="error_sty errconfirmPass">{enterPass}</p>

                  <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital"]}
                    minLength={8}
                    value={password}
                    messages={{
                      minLength: "Password has at least 8 characters.",
                      specialChar: "Password has special characters.",
                      number: "Password has a number.",
                      capital: "Password has a capital letter.",
                    }}
                    // style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                    iconComponents={{
                      ValidIcon: (
                        <FaCheck
                          style={{
                            color: "green",
                            marginRight: "7px",
                          }}
                        />
                      ),
                      InvalidIcon: <GoDotFill style={{ marginRight: "7px" }} />,
                    }}
                    iconSize={30}
                  />
                </div>
                <div className="mt-2">
                  <div
                    className="d-flex flex-row align-items-baseline me-3"
                    id="eye"
                  >
                    <input
                      placeholder="Enter Confirm Password"
                      type={cPassShown ? "text" : "password"}
                      className="Register-input reg-pass-inputs"
                      onChange={(e) => [
                        setConfirmPass(e.target.value),
                        setEnterConfirmPass(""),
                        setRegErr(""),
                      ]}
                      value={confirmpass}
                    />
                    <button
                      className="eyebtnReg"
                      onClick={() => setCPassShown(!cPassShown)}
                    >
                      {cPassShown === true ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  <p className="error_sty errconfirmPass">{enterconfirmpass}</p>
                </div>
                <div className="  mt-2">
                  <ReactFlagsSelect
                    className="countryInputRegister"
                    selected={CountryCode}
                    onSelect={(code) => [setCountyData(code), setRegErr("")]}
                    searchable={true}
                    inputStyle={{
                      background: "#ffffff",
                      width: "30%",
                      height: "43px",
                      border: "3px solid #6d9886",
                    }}
                  />
                </div>
                <div className="mt-2">
                  {showPartnerId === true ? (
                    <>
                      {" "}
                      <input
                        placeholder="Enter Partner-ID"
                        type="text"
                        className="Register-input"
                        onChange={(e) => [
                          setResellerID(e.target.value),
                          setRegErr(""),
                        ]}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="p-3 text-center mt-3 partneridtext">
                <p className="regErr-p mb-2">{regErr}</p>
                <span
                  onClick={() => setShowPartnerId(!showPartnerId)}
                  className="mb-1 "
                >
                  <p className="textPartnerID">Do You Have Partner ID?</p>
                </span>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text_account">
                    <b>Sign In</b>
                  </Link>
                </p>
                <p className="creatingtextresponsive">
                  By creating an account, you agree to the <br />
                  <Link to={"/termsofservice"}>
                    <u className="text_account">Terms of Services</u>
                  </Link>{" "}
                  and{" "}
                  <Link to={"/privacypolicy"}>
                    <u className="text_account">Privacy Policy</u>
                  </Link>
                </p>
                <button className="sign-up-btn w-50" onClick={registerHandler}>
                  Sign Up
                </button>{" "}
              </div>
            </div>
          </div>
          <img src={Bg} alt="Register_Background" id="login-bg" />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default RegisterV3;
