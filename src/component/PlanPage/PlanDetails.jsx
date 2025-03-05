import React, { useEffect, useState } from "react";
import "./PlanDetails.css";
import Header from "../Header/Header";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import Cookie from "js-cookie";
import axios from "axios";

function PlanDetails() {
  const navigate = useNavigate();
  //variable
  const [isValidPlan, setIsvalidPlan] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [planModuleData, setPlanModuleData] = useState([]);

  const [text_upgradeToUse, setText_upgradeToUse] = useState("Upgrade to Use");
  const [text_upPlan_msg, setText_upPlan_msg] = useState(
    "This Feature is not available in your current Plan. To access this feature purchase the other plan!"
  );
  const [text_notNow, setText_notNow] = useState("Not now");
  const [text_viewPlan, setText_viewPlan] = useState("View Plan");
  const [text_upPlan, setText_upPlan] = useState("Upgrade Your Plan");
  const [text_valueForMoney, setText_valueForMoney] =
    useState("Value For Money");
  const [text_createAccount, setText_createAccount] =
    useState("Create account");
  const [text_planComparison, setText_planComparison] = useState(
    "Full Plan Comparison"
  );
  const [text_moduleName, setText_moduleName] = useState("Module Name");
  const [text_freePlan, setText_freePlan] = useState("Free Plan");
  const [text_silverPlan, setText_silverPlan] = useState("Silver Plan");
  const [text_goldPlan, setText_goldPlan] = useState("Gold Plan");


  var currentPath = window.location.pathname;
  // useEffect(() => {
  //   if (currentPath !== "/noAccess") {
  //     setIsvalidPlan(true);
  //     setTimeout(() => {
  //       document.getElementById("PlanUpgradePage").style.pointerEvents = "none";
  //     }, 300);
  //   } else {
  //     setIsvalidPlan(false);
  //     document.getElementById("PlanUpgradePage").style.pointerEvents = "all";
  //   }
  //   if (currentPath === "/upgradplan") {
  //     setIsvalidPlan(false);
  //     document.getElementById("PlanUpgradePage").style.pointerEvents = "all";
  //   }
  // }, [currentPath]);

  const PlanUpgraded = (planId, planPrice, planTitle) => {
    console.log(planId, planPrice);
    successToast(`${planTitle} Plan Subscribed!`);
  };

  useEffect(() => {
    var API_URL = GlobalConstants.Cdomain + "/API/moramba/v4/plan/all/plan";
    axios
      .get(API_URL)
      .then(function (response) {
        console.log(response.data.data);
        var PlanDataList = response.data.data;
        setPlanData(PlanDataList);
      })
      .catch(function (error) {
        const ermsg = error.response.data.message;
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
  }, [1000]);

  useEffect(() => {
    var API_URL = GlobalConstants.Cdomain + "/API/moramba/v4/plan/all/module";
    axios
      .get(API_URL)
      .then(function (response) {
        console.log(response.data.data);
        var ModuleList = response.data.data;
        setPlanModuleData(ModuleList);
      })
      .catch(function (error) {
        const ermsg = error.response.data.message;
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
  }, []);
  return (
    <>
      <Header />
      {isValidPlan && (
        <div className="NoAccess">
          {" "}
          <h3 className="text-center">{text_upgradeToUse}</h3>
          <Divider />
          <div className="mt-3 text-center">
            <h5>{text_upPlan_msg}</h5>
          </div>
          <div className="mt-3 d-flex justify-content-center gap-3">
            <button className="btncancel" onClick={() => navigate(-1)}>
              {text_notNow}
            </button>
            <button
              className="CreateBtn"
              onClick={() => navigate("/upgradplan")}
            >
              {text_viewPlan}
            </button>
          </div>
        </div>
      )}
      <main
        className={isValidPlan ? "bgblur1 plan_main" : " plan_main"}
        id="PlanUpgradePage"
      >
        <div id="homepage">
          <h4 className="text-center mb-5 pt-5 text-decoration-underline">
            {text_upPlan}
          </h4>
          <div className="plancard-main d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap p-2">
            {planData.map((v, idx) => {
              return (
                <>
                  <div
                    className={
                      v.sr_no === 3
                        ? "currentplan-box text-center plancard-box"
                        : "plancard-box text-center"
                    }
                    id={idx}
                  >
                    {v.plan === "gold" && (
                      <div className={v.sr_no === 3 ? "ribbon-2" : ""}>
                        {text_valueForMoney}
                      </div>
                    )}
                    <h2 className={v.sr_no === 3 ? "mb-4" : ""}>
                      {v.plan.charAt(0).toUpperCase() + v.plan.slice(1)}
                    </h2>

                    <div className="d-flex align-items-end gap-2 justify-content-center">
                      <h2>
                        <span className="fs-5">$</span>

                        {v.price}
                        <span className="fs-5">
                          .00{" "}
                          {v.plan !== "free"
                            ? "(" +
                              `${
                                (v.plan === "silver" ? 164.61 : 411.52) +
                                " " +
                                "₹"
                              }` +
                              ")"
                            : ""}
                        </span>
                      </h2>
                    </div>

                    <p className="text-muted fs-6">{v.desc}</p>
                    {sessionStorage.getItem("username") === null ||
                    sessionStorage.getItem("token") === null ||
                    sessionStorage.getItem("token") === undefined ||
                    sessionStorage.getItem("token") === "" ? (
                      <>
                        <Link to="/register">
                          <button className="plan_btn">
                            {text_createAccount}
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          className={
                            v.sr_no === 3 ? "currentPlanBtn" : "plan_btn"
                          }
                          onClick={() => PlanUpgraded(v._id, v.price, v.plan)}
                          disabled={v.plan === "free" ? true : false}
                        >
                          {v.sr_no == 3 ? "Current Plan" : "Choose Plan"}
                        </button>
                      </>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <h3 className="text-center mt-5">
            <u>{text_planComparison}</u>
          </h3>
          <div className="plancard-main d-flex justify-content-center align-items-center gap-3 flex-wrap p-2">
            <table className="tableStyPlan w-75 ">
              <tr>
                <th className="tableHeadStyplan">{text_moduleName}</th>
                <th className="tableHeadStyplan">{text_freePlan}</th>
                <th className="tableHeadStyplan">{text_silverPlan}</th>
                <th className="tableHeadStyplan">{text_goldPlan}</th>
              </tr>
              <tbody>
                {console.log(planModuleData)}
                {planModuleData.map((v, idx) => {
                  return (
                    <>
                      <tr>
                        <td className="tableHeadSty2plan" key={idx}>
                          {v.module_name}
                        </td>

                        <td className="tableHeadSty2plan">
                          {v.plan[0] === "free" &&
                          v.plan[1] === "silver" &&
                          v.plan[2] === "gold"
                            ? "✅"
                            : "❌"}
                        </td>
                        <td className="tableHeadSty2plan">
                          {" "}
                          {(v.plan[0] === "free" &&
                            v.plan[1] === "silver" &&
                            v.plan[2] === "gold") ||
                          (v.plan[0] === "silver" && v.plan[1] === "gold")
                            ? "✅"
                            : "❌"}
                        </td>
                        <td className="tableHeadSty2plan">
                          {" "}
                          {(v.plan[0] === "free" &&
                            v.plan[1] === "silver" &&
                            v.plan[2] === "gold") ||
                          (v.plan[0] === "silver" && v.plan[1] === "gold") ||
                          v.plan[0] === "gold"
                            ? "✅"
                            : "❌"}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ToastContainer />
    </>
  );
}

export default PlanDetails;
