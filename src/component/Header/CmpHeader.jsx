import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function CmpHeader() {
  return (
    <>
      <div className="mt-3 p-1 BtnBoxemp mb-3">
        <Link to={"/attendancesingle"}>
          <button className="ReverseButtonHeader">Custom Document</button>
        </Link>
        <Link to={"/salary/details"}>
          <button className="ReverseButtonHeader">Manage Template</button>
        </Link>
        <Link to={"/approval-request"}>
          <button className="ReverseButtonHeader">Salary Template</button>
        </Link>

        <Link to={"/appraisalpage"}>
          <button className="ReverseButtonHeader">Manage Vendor</button>
        </Link>
        <Link to={"/employeedocument"}>
          <button className="ReverseButtonHeader">Manage Customer</button>
        </Link>
        <Link to={"/timesheet"}>
          <button className="ReverseButtonHeader">Project Module</button>
        </Link>
      </div>
      <Divider />;
    </>
  );
}

export default CmpHeader;
