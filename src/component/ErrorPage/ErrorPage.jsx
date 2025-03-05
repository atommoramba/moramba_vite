import React, { useEffect } from "react";
import ErrorImg from "../../assets/img/404img.png";
import { IoMdArrowBack } from "react-icons/io";
import "./ErrorPage.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  let history = useNavigate();
  const navigate = useNavigate();
  const goBack = () => {
    history(-1);
  };

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  return (
    <>
      <Header />
      <div className="errorpage">
        <div className="container p-1" style={{ marginTop: "7%" }}>
          <div className="row d-flex align-items-baseline">
            <div className="col-md-6 ">
              <h1 className="headingTxt">Oops....</h1>
              <h3 className="subtext">Page Not Found!</h3>
              <p className="errorpera">
                This Page doesn`t exist or was removed! We suggest you back to
                home.
              </p>
              <button className="errorbtn" onClick={goBack}>
                <IoMdArrowBack />
                Back to Home
              </button>
            </div>
            <div className="col-md-6 text-center">
              <img src={ErrorImg} alt="404 Page not Found" id="mobimg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
