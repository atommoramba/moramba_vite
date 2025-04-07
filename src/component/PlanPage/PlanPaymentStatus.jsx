import React, { useEffect, useState } from "react";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { errorToast } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import "./PlanDetails.css";
import Loader from "../../utils/Loader";
function PlanPaymentStatus() {
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const PaymentCompleteHandle = () => {
    const paymentid = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );
    var API_URL =
      GlobalConstants.Cdomain +
      "/API/moramba/v4/plan/update/planpayment/ownerdetails";

    let headerConfig = {
      headers: {
        authorization: "bearer " + sessionStorage.getItem("token"),
      },
    };

    var data = {
      paymentid: paymentid,
      _orgId: sessionStorage.getItem("_compId"),
    };
    axios
      .patch(API_URL, data, headerConfig)
      .then(function (response) {
        console.log(response);
        if (response.data.message === "plan payment done") {
          setPaymentSuccess(true);
        }
      })
      .catch(function (error) {
        if (error.response.status === 427) {
          sessionStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          errorToast(error.response.data.message);
        }
      })
      .then(function () {});
  };
  useEffect(() => {
    PaymentCompleteHandle();
  });
  return (
    <>
      {paymentSuccess === true ? (
        <>
          <main className=" plan_main" id="PlanUpgradePage">
            <div id="homepage">
              <div className="container text-center mb-5 pt-5 ">
                <div className="success-checkmark">
                  <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>

                    <div className="icon-fix"></div>
                  </div>
                </div>
                  <h4>Plan Purchased Successfully</h4>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <div className="container mb-5 pt-5 ">
            <Loader />
          </div>
        </>
      )}
    </>
  );
}

export default PlanPaymentStatus;
