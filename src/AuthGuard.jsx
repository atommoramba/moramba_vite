import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlanDetails from "./component/PlanPage/PlanDetails";

const GuardedRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const isValidPlan = sessionStorage.getItem("plancode");
  const currentPath = window.location.pathname;
  const invalidPaths = {
    BA: ["/noAccess"],
    SILVER: [],
    GOLD: [],
  };
  useEffect(() => {
    var isValidUser = sessionStorage.getItem("token");

    if (
      isValidUser === "undefined" ||
      isValidUser === null ||
      isValidUser === ""
    ) {
      navigate("/");
      sessionStorage.clear();
      localStorage.clear();
    }
    // if (
    //   isValidPlan === "BA" &&
    //   (invalidPaths.SILVER.includes(currentPath) ||
    //     invalidPaths.GOLD.includes(currentPath))
    // ) {
    //   return navigate("/noAccess");
    // }
    // if (isValidPlan === "SILVER" && invalidPaths.GOLD.includes(currentPath)) {
    //   return navigate("/noAccess");
    // }
  });
  return (isValidPlan === "BA" && invalidPaths.SILVER.includes(currentPath)) ||
    invalidPaths.GOLD.includes(currentPath) ? (
    <div>
      <PlanDetails />
    </div>
  ) : isValidPlan === "SL" && invalidPaths.GOLD.includes(currentPath) ? (
    <div>
      <PlanDetails />
    </div>
  ) : (
    <div>
      <Component />
    </div>
  );
};

export default GuardedRoutes;
