import React, { useState } from "react";
import "./AdminPanel.css";
import Logo from "../../assets/img/MorambaLogo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const AdminLogin = () => {
  const [addEmail, setAddEmail] = useState("");
  const [enterEmail, setEnterEmail] = useState("*Please Enter Email!");
  const [addpassword, setAddPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [enterPass, setEnterPass] = useState("*Please Enter Password!");

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="adminlogin container">
      <div className="login_logo adminloginlogo">
        <img src={Logo} alt="" />
      </div>

      <div className="login_title_info adminlogintitle">
        <h3 className="welcome_text adminlogint">Admin Login!</h3>
        <h5 className="para">Welcome Back! Please Enter Your Details.</h5>
      </div>

      <div className="adminloginbelow">
        <div>
          <div className="login_input">
            <p className="title">
              Email
              <span className="Star">*</span>
            </p>
            <input
              className="input_box_sty adminloginemailinput"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => [setAddEmail(e.target.value), setEnterEmail("")]}
            />
            <p className="ErrorColor adminerr">{enterEmail}</p>
          </div>
        </div>
        <div className="login_input">
          <p className="title">
            Password
            <span className="Star">*</span>{" "}
          </p>
          <div
            className="d-flex flex-row align-items-center passbar me-3"
            id="eye"
          >
            <input
              className="input_box_sty"
              placeholder="Enter Password"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => [
                setAddPassword(e.target.value),
                setEnterPass(""),
              ]}
              value={addpassword}
            />
            <button className="eyebtn" onClick={togglePassword}>
              {passwordShown === true ? (
                <FaEye className="" />
              ) : (
                <FaEyeSlash className="" />
              )}
            </button>
          </div>
          <p className="ErrorColor adminerr">{enterPass}</p>
        </div>
      </div>

      <div className="btn_login d-flex justify-content-center">
        <button className="adminloginBtn">Log In</button>
      </div>
    </div>
  );
};

export default AdminLogin;
