import React, { useState } from "react";
import "./EmployeeDetail.css";
import Header from "../Header/Header";
import EmployeeImg from "../../assets/img/Employee.png";
import { Divider } from "@mui/material";
import StartShift from "../ShiftBreak/StartShift";
import StartBreak from "../ShiftBreak/StartBreak";
import { FcBriefcase, FcCellPhone, FcGlobe } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEmpData } from "../../redux/EmpDataSlice";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { resetDashboardEmpList } from "../../redux/DashboardSlice";
import { ToastContainer } from "react-toastify";
import { CgCloseO } from "react-icons/cg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Loader from "../../utils/Loader";
import { getAllEmp } from "../../redux/AllEmpListSlice";
import Cookie from "js-cookie";

dayjs.extend(utc);

function EmployeeDetail() {
  const DashboardData = useSelector((state) => state.dashboard);
  const AllData = useSelector((state) => state.allEmpList);
  const dispatch = useDispatch();
  const SelectedEmpData = useSelector((state) => state.empData);
  var role = sessionStorage.getItem("role");
  //Language Variables Start
  const [VactionLeftText, setVactionLeftText] = useState("Vacation Days Left ");
  const [TootTipTitle, setToolTipTitle] = useState(
    "Employee is Currently Active.Click to Deactive"
  );
  const [text_active, setText_active] = useState("Active");
  const [text_deactive, setText_deactive] = useState("Deactive");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_Shift, setText_Shift] = useState("Shift");
  const [text_Break, setText_Break] = useState("Break");
  const [text_please_active_first, setText_please_active_first] = useState(
    "Please Active Employee First"
  );
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  //new var
  const [select_employee, setSelect_employee] = useState(
    "Please Select Employee"
  );
  const [text_employee_respon, setText_employee_respon] = useState(
    "Transfer responsibilities"
  );
  const [text_emptransfer, setText_emptransfer] = useState(
    "Select Employee to Transfer"
  );
  const [text_transfer, setText_transfer] = useState("Transfer");
  const [text_responsible, setText_responsible] = useState(
    "'s Responsibilities To"
  );
  //Language Variables End
  const [file, setFile] = useState(EmployeeImg);

  const [selectedTab, setSelectedTab] = useState(0);
  const [TransferPopup, setTransferPopup] = useState(false);
  const EmpStatusNow = sessionStorage.getItem("EmpStatus");
  const [TranferTo, setTranferTo] = useState("");
  const [errTranferTo, setErrTranferTo] = useState("");
  const [IsLoading, setIsLoading] = useState(true);

  const TransferValidation = () => {
    let isValid = true;
    if (TranferTo === "") {
      isValid = false;
      setErrTranferTo(<>*{select_employee}!</>);
    }
    return isValid;
  };
  const navigate = useNavigate();

  const TranferResponsiblites = () => {
    if (TransferValidation()) {
      const dataToBeSent = {
        fromemp: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
        toemp: TranferTo,
        orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
      };

      var apiUrl =
        GlobalConstants.Cdomain + "/API/moramba/v3/update/work/transfer";

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      axios
        .post(apiUrl, dataToBeSent, headerConfig)
        .then(function (response) {
          setTransferPopup(false);
          successToast("All Responsibilities Transfered!");
        })
        .catch(function (error) {
          errorToast(error);
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
        })
        .then(function () {
          // always executed
        });
    }
  };
  const UserActiveDeactiveHandeler = () => {
    const dataToBeSent = {
      _partition: GlobalConstants._partition,
      _orgId: sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      ),
      status: EmpStatusNow === "0" ? 1 : 0,
      emp_id: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
    };

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/employee/activedeactiveempstatus";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(apiUrl, dataToBeSent, headerConfig)
      .then(function (response) {
        var res = response.data;
        successToast("successfully Updated!");
        dispatch(getEmpData());
        dispatch(resetDashboardEmpList());
        if (EmpStatusNow === "0") {
          sessionStorage.setItem("EmpStatus", 0);
          setTransferPopup(false);
        } else {
          sessionStorage.setItem("EmpStatus", 1);
          setTransferPopup(true);
          dispatch(getAllEmp());
        }
      })
      .catch(function (error) {
        errorToast(error);
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
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    if (SelectedEmpData?.length === 0) {
      setIsLoading(true);
      Promise.all([dispatch(getEmpData())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_employee_respon(
      doc.querySelector("string[name='text_employee_respon']")?.textContent ||
        "Transfer responsibilities"
    );
    setText_active(
      doc.querySelector("string[name='text_active']")?.textContent || "Active"
    );
    setText_deactive(
      doc.querySelector("string[name='text_deactive']")?.textContent ||
        "Deactive"
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
    );
    setText_Shift(
      doc.querySelector("string[name='text_Shift']")?.textContent || "Shift"
    );
    setToolTipTitle(
      doc.querySelector("string[name='TootTipTitle']")?.textContent ||
        "Employee is Currently Active.Click to Deactive"
    );
    setText_please_active_first(
      doc.querySelector("string[name='text_please_active_first']")
        ?.textContent || "Please Active Employee First"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setSelect_employee(
      doc.querySelector("string[name='select_employee']")?.textContent ||
        "Please Select Employee"
    );

    setText_emptransfer(
      doc.querySelector("string[name='text_emptransfer']")?.textContent ||
        "Select Employee to Transfer"
    );
    setText_Break(
      doc.querySelector("string[name='text_break']")?.textContent || "Break"
    );
    setVactionLeftText(
      doc.querySelector("string[name='VactionLeftText']")?.textContent ||
        "Vacation Days Left "
    );
    setText_transfer(
      doc.querySelector("string[name='text_transfer']")?.textContent ||
        "Transfer"
    );
    setText_responsible(
      doc.querySelector("string[name='text_responsible']")?.textContent ||
        "'s Responsibilities To"
    );
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const filekey = sessionStorage.getItem("EmpProfileKey");

  useEffect(() => {
    if (SelectedEmpData.length !== 0) {
      if (filekey.length !== 0) {
        downloadEmpLogo(filekey);
      } else {
        console.log("Profile Image Key Not Found!");
      }
    } else {
      console.log("Select Employee First!");
    }
  }, [filekey, SelectedEmpData.length]);

  const downloadEmpLogo = (filekey) => {
    const request_start_at = performance.now();
    if (filekey !== "" || filekey !== undefined) {
      var apiUrl =
        GlobalConstants.Cdomain +
        `/API/moramba/v3/download/file?filekey=${filekey}`;
      let headerConfig = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        responseType: "blob",
      };

      axios
        .get(apiUrl, headerConfig)
        .then(function (response) {
          const request_end_at = performance.now();
          const request_duration = request_end_at - request_start_at;
          if (response.status === 200) {
            console.log(
              "ID:00705=> " +
                dayjs.utc(request_duration).format("ss.ms") +
                " Seconds"
            );
          }
          const mimeType = response.headers;
          let blob = new Blob([response.data], { type: mimeType });
          var url = window.URL.createObjectURL(blob);
          setFile(url);
        })
        .catch(function (error) {
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
          console.log(error);
          // errorToast(error.message);
        })
        .then(function () {
          // always executed
        });
    }
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
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <div className={TransferPopup ? "bgblur1 mt-3 p-5" : "mt-3 p-5"}>
          <div className="d-flex">
            <div className="w-100">
              <div className="MainProfileBox mb-4">
                <img
                  src={file === undefined ? EmployeeImg : file}
                  alt="Employee_Profile_Photo"
                  className="EmployeeProfilePhoto"
                />
                <div className="EmployeeDetails">
                  <h4>
                    {SelectedEmpData[0]?.firstName} &nbsp;
                    {SelectedEmpData[0]?.lastName}
                  </h4>
                  <p>
                    <FcBriefcase />{" "}
                    {SelectedEmpData[0]?.role.charAt(0).toUpperCase() +
                      SelectedEmpData[0]?.role.slice(1)}
                    &nbsp;
                    <b>|</b>&nbsp;
                    {SelectedEmpData[0]?.designation.charAt(0).toUpperCase() +
                      SelectedEmpData[0]?.designation.slice(1)}
                  </p>
                  {SelectedEmpData[0]?.phoneNo === "0" ||
                  SelectedEmpData[0]?.phoneNo === "NA" ? (
                    ""
                  ) : (
                    <>
                      <p>
                        <FcCellPhone />
                        {"+" + SelectedEmpData[0]?.phoneNo}
                      </p>
                    </>
                  )}
                  <p>
                    <FcGlobe /> {VactionLeftText}:{" "}
                    {SelectedEmpData[0]?.vacationDays}
                  </p>
                  {role === "employee" ? (
                    ""
                  ) : (
                    <>
                      <button
                        type="button"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={TootTipTitle}
                        className={
                          SelectedEmpData[0]?.empStatusid === "1"
                            ? "EmpActiveBtn me-3 "
                            : "EmpDeactiveBtn me-3"
                        }
                        onClick={() => UserActiveDeactiveHandeler()}
                      >
                        {SelectedEmpData[0]?.empStatusid === "1" ? (
                          <>{text_active}</>
                        ) : (
                          <>{text_deactive}</>
                        )}
                      </button>
                    </>
                  )}
                  {EmpStatusNow === "0" ? (
                    <>
                      <button
                        className="EmpEditBtn"
                        onClick={() => setTransferPopup(true)}
                      >
                        {text_employee_respon}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={"/addstaff/edit"}
                        state={{
                          empId: sessionStorage.getItem(
                            GlobalConstants.session_current_emp_id
                          ),
                        }}
                      >
                        <button className="EmpEditBtn">{text_edit}</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {SelectedEmpData[0]?.empStatusid === "1" ? (
                <>
                  <div className="row " style={{ marginTop: "70px" }}>
                    <div className="col-md-6">
                      <StartShift />
                    </div>
                    <div className="col-md-6">
                      <StartBreak />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="ErrorTextEmpdetails text-center errtext">
                    {text_please_active_first}!
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      ;
      {TransferPopup ? (
        <>
          <div className="addstaffpopup" style={{ marginBottom: "10%" }}>
            <div className="row text-end">
              <h3 className="close">
                <CgCloseO onClick={() => setTransferPopup(false)} />
              </h3>
            </div>
            <h4 className="text-center">
              {text_transfer} {SelectedEmpData[0]?.firstName}&nbsp;
              {SelectedEmpData[0]?.lastName}
              {text_responsible}
            </h4>
            <Divider />
            <div className="text-center">
              <select
                className="mt-4 CountryInputbox1"
                onChange={(e) => [
                  setTranferTo(e.target.value),
                  setErrTranferTo(""),
                ]}
              >
                <option selected value={""}>
                  {text_emptransfer}
                </option>
                {AllData?.map((emplist) => {
                  return (
                    <>
                      <option key={emplist?._id} value={emplist?._id}>
                        {emplist?.firstName}&nbsp;{emplist?.lastName}
                      </option>
                    </>
                  );
                })}
              </select>
              <br />
              <span className="error_sty">{errTranferTo}</span>
              <div className="d-flex gap-3 mt-3 justify-content-center">
                <button
                  className="btncancel"
                  onClick={() => setTransferPopup(false)}
                >
                  {button_cancel}
                </button>
                <button className="btnsave" onClick={TranferResponsiblites}>
                  {button_save}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default EmployeeDetail;
