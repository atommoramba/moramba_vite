import React, { useState } from "react";
import "./VerifyPage.css";
import Bg from "../../assets/img/LoginV3-Bg.png";
import Logo from "../../assets/img/MorambaLogo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useEffect } from "react";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { Divider } from "@mui/material";
import { PASSWORD_REGEX } from "../../utils/Validation";

function VerifyPage() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [visPasswordreset, setVisPasswordreset] = useState(false);
  const [notVerifiedmsg, setNotVerifiedmsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successPass, setSuccessPass] = useState(false);
  const [errPassword, setErrPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  //Password Validation
  const newPasswordValidation = () => {
    let formValid = true;
    if (!PASSWORD_REGEX.test(newPassword) === true) {
      formValid = false;
      if (newPassword === "") {
        formValid = false;
        setErrPassword("*Please Enter Password!");
      } else {
        setErrPassword("*Please Enter Strong Password!");
      }
    }
    return formValid;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("key");
    var apiUrl =
      GlobalConstants.Cdomain + "/API/moramba/v4/user/verifylink?key=" + key;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        let res = response.data;
        if (res.status) {
          // infoToast(res.message);
          console.log(response);
          if (res.message === "please send new password to reset") {
            //visiable password reste page
            setVisPasswordreset(true);
            setNotVerifiedmsg(false);
          } else {
            setVerified(true);
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setVerified(false);
        if (
          error.response.data.message === "Your verification link has expired"
        ) {
          setNotVerifiedmsg(error.response.data.message);
        } else if (error.response.data.message === "key missing") {
          errorToast(error.response.data.message);
          setNotVerifiedmsg(error.response.data.message);
        } else {
          errorToast(error.response.data.message);
        }

        //todo toaster for link exoire please re-verify yourself by resending verification process.
      })
      .then(function () {
        // always executed
      });
  }, []);

  const handleResetPassword = (password) => {
    if (newPasswordValidation()) {
      const urlParams = new URLSearchParams(window.location.search);
      const key = urlParams.get("key");
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v4/user/verifylink?key=" +
        key +
        "&password=" +
        password;

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .get(apiUrl, headerConfig)
        .then(function (response) {
          let res = response.data;
          if (res.status) {
            successToast(res.message);
            console.log(response);
            if (res.message === "please send new password to reset") {
              //visiable password reste page
              setVisPasswordreset(true);
            } else {
              setSuccessPass(true);
              setVisPasswordreset(false);
              setVerified(false);
              //
            }
          }
        })
        .catch(function (error) {
          console.log(error);

          if (
            error.response.data.message === "Your verification link has expired"
          ) {
            // errorToast(error.response.data.message);
          } else if (error.response.data.message === "key missing") {
            errorToast(error.response.data.message);
          } else {
            // errorToast(error.response.data.message);
          }

          //todo toaster for link exoire please re-verify yourself by resending verification process.
        })
        .then(function () {
          // always executed
        });
    }
  };
  return (
    <div>
      <main className="login-main">
        <nav className="d-flex justify-content-between align-items-center w-full mb-5 p-3">
          <div>
            <img className="logoimg" src={Logo} alt="" />
          </div>
        </nav>
        <div className="d-flex justify-content-evenly align-items-center w-full">
          <img src={Bg} alt="Login_Background" id="login-bg" />
          <div className="login-main-box text-center p-4">
            {verified ? (
              <>
                <div className="thumb-icon-sty">
                  <FaRegThumbsUp className="text-center thumb-sty" />
                </div>
                <h4 className="mt-3">Account Verified</h4>
                <p>
                  Your account was successfully verified. Please proceed to the
                  sign in page.
                </p>
                <button
                  className="CreateBtn mt-3"
                  onClick={() => navigate("/login")}
                >
                  Go back to sign in
                </button>
              </>
            ) : (
              <>
                {visPasswordreset ? (
                  <>
                    <h4>Reset Your Password</h4>
                    <Divider />
                    <div>
                      <div>
                        <input
                          placeholder="Enter New Password"
                          type={passwordShown ? "text" : "password"}
                          className="Login-input mt-4"
                          onChange={(e) => [
                            setNewPassword(e.target.value),
                            setErrPassword(""),
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
                        <p className="error_sty text-start px-3 mx-3">
                          {errPassword}
                        </p>
                      </div>
                      <button
                        className="btncancel mt-3 me-3"
                        onClick={() => navigate("/login")}
                      >
                        cancel
                      </button>
                      <button
                        className="CreateBtn mt-3"
                        onClick={() => handleResetPassword(newPassword)}
                      >
                        Reset Password
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {successPass === true && (
                      <>
                        <div className="thumb-icon-reset">
                          <FcApproval className="text-center thumb-sty resetpassword" />
                        </div>
                        <h4 className="mt-3">
                          Your password has been successfully reset!
                        </h4>
                        <button
                          className="CreateBtn mt-3"
                          onClick={() => navigate("/login")}
                        >
                          Back to Sign in
                        </button>
                      </>
                    )}{" "}
                    {successPass === false && (
                      <>
                        <div className="thumb-icon-sty-notverified">
                          <FaRegThumbsDown className="text-center thumb-notverified" />
                        </div>
                        <h4 className="mt-3">{notVerifiedmsg}</h4>
                        <p>Click below to request a new verification link.</p>
                        <button
                          className="CreateBtn mt-3"
                          onClick={() => navigate("/support")}
                        >
                          Back to Resend
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default VerifyPage;
