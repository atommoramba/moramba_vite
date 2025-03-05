import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";
import Bg from "../../assets/img/LoginV3-Bg.png";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import Logo from "../../assets/img/MorambaLogo.png";
import { GlobalConstants } from "../../utils/GlobalConstants";
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

function ForgotPassword() {
  const [EmailORPhoneForgot, setEmailORPhoneForgot] = useState("");
  const [ErrForgotpass, setErrForgotpass] = useState("");
  const [forgotClick, setforgotClick] = useState(false);
  const [forgoterr, setForgoterr] = useState("");
  const [forgotsuccess, setForgotsuccess] = useState("");
  const [openforgot, setOpenforgot] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCloseforgot = () => {
    setOpenforgot(false);
    navigate("/login");
  };

  const NewPasswordHandler = () => {
    if (EmailORPhoneForgot !== "") {
      setforgotClick(true);
      var apiUrl =
        GlobalConstants.Cdomain + "/API/moramba/v4/user/sendforgotpasswordlink";
      var data = {
        username: EmailORPhoneForgot,
      };
      axios
        .post(apiUrl, data)
        .then(function (response) {
          if (response.status === 200) {
            setforgotClick(false);
            setOpenforgot(true);
            setForgotsuccess(response.data.message);
            // setTimeout(() => {
            //   navigate("/login");
            // }, 3000);
            setEmailORPhoneForgot("");
          }
        })
        .catch(function (error) {
          setforgotClick(false);
          setForgoterr(error.response.data.message);
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
      setErrForgotpass("*Please Enter Registered Email or Phone no!");
    }
  };

  const handleCancle = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <main className="login-main">
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={openforgot}
            onClose={handleCloseforgot}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" className="text-center">
              <FcFeedback className="Email-icon" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* <h3 className="text-center">Please Verify Your Account</h3> */}
                {/* <h5 className="text-center"> */}
                  <p className="forgotsuccess  mb-4">{forgotsuccess}</p>

                  {/* We have sent you a link on your registered email or phone no.
                  to verify your Account. */}
                {/* </h5> */}
                {/* <h5 className="text-center">
                  Please check your Spam or Junk folder.
                </h5>
                <br />
                <p className="text-center">
                </p> */}
              </DialogContentText>
              <Divider />
            </DialogContent>
            <DialogActions>
              <button className="btncancel mx-4" onClick={handleCloseforgot}>
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
          <img src={Bg} alt="Login_Background" id="login-bg" />
          <div className="login-main-box text-center p-4">
            <h3 className="logo_text">Forgot Password</h3>
            <h6 className="text-muted">
              Enter your Registered Email or Phone number
            </h6>
            <div className="login-form">
              <input
                placeholder="Enter Email or Phone Number"
                type="email"
                className="Login-input"
                onChange={(e) => [
                  setEmailORPhoneForgot(e.target.value),
                  setErrForgotpass(""),
                  setForgoterr(""),
                ]}
                value={EmailORPhoneForgot}
              />
              <p className="error_sty">{ErrForgotpass}</p>
              <p className="regErr-p  mb-4">{forgoterr}</p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                <button className="btncancel mt-3 me-3" onClick={handleCancle}>
                  Cancel
                </button>
                <button
                  disabled={forgotClick}
                  className="CreateBtn mt-3"
                  onClick={NewPasswordHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
