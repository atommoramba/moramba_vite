import React, { useState, useEffect } from "react";
import "../CompanyProfile/CompanyProfile.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedCompany } from "../../redux/SelectedCompanySlice";
import { getDashboard } from "../../redux/DashboardSlice";
import { GlobalConstants } from "../../utils/GlobalConstants";
import DummyProfile from "../../assets/img/Comany-img.jpg";
import { Divider } from "@mui/material";

function CompanyProfile() {
  const role = sessionStorage.getItem("role");
  const companyLogo = sessionStorage.getItem("companyLogoImg");
  const navigate = useNavigate();

  //old language variable
  const [text_company_profile, setText_company_profile] =
    useState("Company Profile");
  const [text_admin_name, setText_admin_name] = useState("Contact Admin");
  const [text_current_plan, setText_current_plan] = useState("Current Plan");
  const [text_company_documents, setText_company_documents] =
    useState("Company Documents");
  const [btn_view, setbtn_view] = useState("View");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_upgrade_plan, setText_upgrade_plan] = useState("Upgrade Plan");
  const [text_employee, setText_employee] = useState("Employee");
  const [text_profile, setText_profile] = useState("Profile");
  const totalempcount = sessionStorage.getItem("empcount");

  //new language
  const [text_one_year_plan, setText_one_year_plan] =
    useState("1 Year Free Plan");

  const Company_Name = sessionStorage.getItem("comp_name");
  const [file, setFile] = useState();

  //redux code
  const dispatch = useDispatch();
  const SelectedCmpID = useSelector((state) => state.selectedCompany);
  const DashboardData = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (SelectedCmpID?.length === 0) {
      console.log(SelectedCmpID);
      dispatch(getSelectedCompany());
      dispatch(getDashboard());
    } else {
      console.log("");
    }
  }, [SelectedCmpID?.length]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_company_profile(
      doc.querySelector("string[name='text_company_profile']")?.textContent ||
        "Company Profile"
    );
    setText_admin_name(
      doc.querySelector("string[name='text_admin_name']")?.textContent ||
        "Contact Admin"
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
    );
    setText_upgrade_plan(
      doc.querySelector("string[name='text_upgrade_plan']")?.textContent ||
        "Upgrade Plan"
    );
    setText_employee(
      doc.querySelector("string[name='text_employee']")?.textContent ||
        "Employee"
    );
    setText_current_plan(
      doc.querySelector("string[name='text_current_plan']")?.textContent ||
        "Current Plan"
    );
    setText_company_documents(
      doc.querySelector("string[name='text_company_documents']")?.textContent ||
        "Company Documents"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setText_profile(
      doc.querySelector("string[name='text_profile']")?.textContent || "Profile"
    );
    setText_one_year_plan(
      doc.querySelector("string[name='text_one_year_plan']")?.textContent ||
        "1 Year Free Plan"
    );
  };

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Header />
      <h3 className="mt-5 text-center HeadingText">
        {sessionStorage.getItem(GlobalConstants.session_current_comp_name)}{" "}
        {text_profile}
      </h3>
      <div className="container containerBox mt-4 p-2">
        <div className="row">
          <div className="col-md-2 p-5">
            <img
              // src={cmpLogoImage}
              src={companyLogo === null ? DummyProfile : companyLogo}
              className="CompanyLogoProfile mb-3"
              alt=""
            />
          </div>
          {SelectedCmpID.map((value, i) => {
            return (
              <>
                <div className="col-md-4 p-4" id="profiledetail">
                  <h4 className="mt-3">{Company_Name}</h4>
                  {role !== "employee" && (
                    <p>
                      {totalempcount} {text_employee}
                    </p>
                  )}
                  <h5 className="company-profile-address">
                    {value.city},{value.street},{value.country},
                    {value.postalCode}
                  </h5>
                  {role === "employee" ? (
                    ""
                  ) : (
                    <>
                      <br />
                      <Link to="/registercompany/edit">
                        <button className="CreateBtn">{text_edit}</button>
                      </Link>{" "}
                      &nbsp;&nbsp;
                      <button
                        className="upgradeBtn "
                        id="btnmobcss"
                        onClick={() => navigate("/upgradplan")}
                      >
                        {text_upgrade_plan}
                      </button>
                    </>
                  )}
                </div>
              </>
            );
          })}
          <div className="p-4">
            <Divider className="mb-3" />
            <div className="d-flex">
              <h5 className="plantext">{text_admin_name} : </h5> &nbsp; &nbsp;
              <p>{SelectedCmpID[0]?.createdBy}</p>
            </div>
            {role === "employee" ? (
              ""
            ) : (
              <>
                <div className="d-flex ">
                  <h5 className="plantext">{text_current_plan} :</h5> &nbsp;
                  &nbsp;
                  <p className="goldtext">
                    GOLD{" "}
                    <span className="freetext"> ({text_one_year_plan})</span>
                  </p>
                </div>

                <div className="d-flex ">
                  <h5 className="plantext">{text_company_documents} :</h5>{" "}
                  &nbsp; &nbsp;
                  <Link to="/documentpage">
                    <button className="clickBtn">{btn_view}</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default CompanyProfile;
