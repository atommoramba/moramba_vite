import React, { useState, useEffect } from "react";
import "../CreateSalaryBreakup/CreateSalaryBreakup.css";
import Checkbox from "@mui/material/Checkbox";
import Header from "../Header/Header";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import { useDispatch } from "react-redux";
import { getSalaryBreakupList } from "../../redux/SalaryBreakupListSlice";
import Cookie from "js-cookie";

function CreateSalaryBreakup() {
  const navigate = useNavigate();
  // validation var
  const [temperr, setTemperr] = useState("");
  const [countryerr, setCountryerr] = useState("");
  const [stateerr, setStateerr] = useState("");
  // Language Variables start
  //old Language Variables
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [title_allowance, setTitle_allowance] = useState("Allowance");
  const [title_deduction, setTitle_deduction] = useState("Deduction");
  const [text_tax, setText_tax] = useState("Tax");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_Enter_template, setText_enter_template] = useState(
    "Enter Template Name"
  );
  const [saveDisable, setSaveDisable] = useState(false);
  const [text_selCountry, setText_selCountry] = useState("Select Country");
  const [text_createsalarybreakup, setText_createsalarybreakup] = useState(
    "Create Salary Breakup Template"
  );
  const [text_Selstate, setText_Selstate] = useState("Select State");
  const [text_mandatorysalary, setText_mandatorysalary] = useState("Mandatory");
  const [text_statev3, setText_statev3] = useState("Select a State");
  const [text_Ph_selCountry, setText_Ph_selCountry] =
    useState("Select a Country");
  const [text_err_enter_state, setText_err_enter_state] = useState(
    "Please Select State"
  );
  const [err_selCountry, setErr_selCountry] = useState("Please Select Country");
  const [text_err_template, setText_err_template] = useState(
    "Please Enter Template Name"
  );
  // Language Variables End
  //data var
  const [CountryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [TempateName, setTempateName] = useState("");

  const GoBack = () => {
    navigate("salarybreakup/list");
  };
  var EffDate = new Date();
  var dd = String(EffDate.getDate()).padStart(2, "0");
  var mm = String(EffDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = EffDate.getFullYear();

  EffDate = mm + "/" + dd + "/" + yyyy;

  const NewSalaryBreakupValidation = () => {
    let isValid = true;
    if (
      CountryCode === "" ||
      state === "" ||
      CountryCode === undefined ||
      state === undefined
    ) {
      isValid = false;
    }
    setSaveDisable(false);
    return isValid;
  };
  const [salarybreakupData, setsalarybreakupData] = useState([]);
  const [SalaryBreakupTemplateCountry, setSalaryBreakupTemplateCountry] =
    useState([]);
  const [MendetoryList, setMendetoryList] = useState([]);
  const [AllowanceList, setAllowanceList] = useState([]);
  const [DeductionList, setDeductionList] = useState([]);
  const [TaxList, setTaxList] = useState([]);
  useEffect(() => {
    if (NewSalaryBreakupValidation()) {
      var type = "select";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/salarybreakuptemplate?type=" +
        type;
      var body = {
        isActive: true,
        effectiveDate: "NA",
        _partition: GlobalConstants._partition,
        _empId: "NA",
        _orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
        level: "global",
        country:
          CountryCode.toLowerCase() === ""
            ? "india"
            : CountryCode.toLowerCase(),
        state: "all",
        mandetorylist: "NA",
        allowancelist: "NA",
        deductionlist: "NA",
        taxlist: "NA",
        templatename: "NA",
      };

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      axios
        .post(apiUrl, body, headerConfig)
        .then(function (response) {
          var res = response.data;
          setsalarybreakupData(res.data);
          setSalaryBreakupTemplateCountry(res.data.country);
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
        })
        .then(function () {
          // always executed
        });
    }
  }, [CountryCode, state]);
  const orgLvlSalaryBreakupPOST = () => {
    if (NewSalaryBreakupValidation()) {
      setSaveDisable(true);
      var type = "insert";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/salarybreakuptemplate?type=" +
        type;
      var body = {
        isActive: true,
        effectiveDate: EffDate,
        _partition: "azr123",
        _empId: "636fd3f760ffb9709ec829e0",
        _orgId: sessionStorage.getItem(
          GlobalConstants.session_current_company_id
        ),
        level: "org",
        country:
          CountryCode.toLowerCase() === ""
            ? "india"
            : CountryCode.toLowerCase(),
        state: state.toLowerCase() === "" ? "all" : state.toLowerCase(),
        mandetorylist: MendetoryList.map((d) => d.value),
        allowancelist: AllowanceList.map((d) => d.value),
        deductionlist: DeductionList.map((d) => d.value),
        taxlist: TaxList.map((d) => d.value),
        templatename: TempateName,
      };

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      axios
        .post(apiUrl, body, headerConfig)
        .then(function (response) {
          var res = response.data;
          dispatch(getSalaryBreakupList());
          successToast("Salary Breakup Created!");
          setSaveDisable(false);
          setTimeout(() => {
            navigate("/salarybreakup/list");
          }, 1000);
        })
        .catch(function (error) {
          setSaveDisable(false);
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
  const MendetoryDataHandleClick = (e, x, key) => {
    const value = x;
    const checked = e.target.checked;
    var temp = MendetoryList;
    // console.log(key, checked);
    if (checked) {
      temp.push({ key: key, value });
      temp.sort(mySorting);
      setMendetoryList(temp);
    } else {
      temp = temp.filter((e) => e.key !== key);
      temp.sort(mySorting);
      setMendetoryList(temp);
    }
    console.log("mandate");
    console.log(temp);
  };
  const mySorting = (a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  };
  const AllowanceDataHandleClick = (checkAllowance, AllowanceData, key) => {
    const value = AllowanceData;
    const checked = checkAllowance.target.checked;
    // console.log(key, checked);
    var temp = AllowanceList;
    if (checked) {
      temp.push({ key: key, value });
      temp.sort(mySorting);
      setAllowanceList(temp);
    } else {
      temp = temp.filter((e) => e.key !== key);
      temp.sort(mySorting);
      setAllowanceList(temp);
    }
    console.log("allowance");
    console.log(temp);
  };
  const DeductionDataHandleClick = (CheckDeduction, DeductionData, key) => {
    const value = DeductionData;
    const checked = CheckDeduction.target.checked;
    // console.log(key, checked);
    var temp = DeductionList;
    if (checked) {
      temp.push({ key: key, value });
      temp.sort(mySorting);
      setDeductionList(temp);
    } else {
      temp = temp.filter((e) => e.key !== key);
      temp.sort(mySorting);
      setDeductionList(temp);
    }
    console.log("deduction");
    console.log(temp);
  };
  const TaxDataHandleClick = (CheckTax, TaxData, key) => {
    const value = TaxData;
    const checked = CheckTax.target.checked;
    var temp = TaxList;
    if (checked) {
      temp.push({ key: key, value });
      temp.sort(mySorting);
      setTaxList(temp);
    } else {
      temp = temp.filter((e) => e.key !== key);
      temp.sort(mySorting);
      setTaxList(temp);
    }
    console.log("tax");
    console.log(temp);
  };
  const CreateSalaryBreakup = () => {
    let createsalaryValidation = true;
    if (TempateName === "") {
      createsalaryValidation = false;
      setTemperr(<>*{text_err_template}!</>);
    }
    if (CountryCode === "") {
      createsalaryValidation = false;
      setCountryerr(<>*{err_selCountry}!</>);
    }
    if (state === "") {
      createsalaryValidation = false;
      setStateerr(<>*{text_err_enter_state}!</>);
    }
    return createsalaryValidation;
  };

  const dispatch = useDispatch();
  const onSubmitNewSalary = () => {
    if (CreateSalaryBreakup()) {
      setMendetoryList(MendetoryList);
      setAllowanceList(AllowanceList);
      setDeductionList(DeductionList);
      setTaxList(TaxList);
      orgLvlSalaryBreakupPOST();
    }
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent ||
        "Template Name"
    );
    setTitle_allowance(
      doc.querySelector("string[name='title_allowance']")?.textContent ||
        "Allowance"
    );
    setTitle_deduction(
      doc.querySelector("string[name='title_deduction']")?.textContent ||
        "Deduction"
    );
    setText_tax(
      doc.querySelector("string[name='text_tax']")?.textContent || "Tax"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_enter_template(
      doc.querySelector("string[name='text_Enter_template']")?.textContent ||
        "Enter Template Name"
    );
    setText_selCountry(
      doc.querySelector("string[name='text_selCountry']")?.textContent ||
        "Select Country"
    );
    setText_createsalarybreakup(
      doc.querySelector("string[name='text_createsalarybreakup']")
        ?.textContent || "Create Salary Breakup Template"
    );
    setText_Selstate(
      doc.querySelector("string[name='text_Selstate']")?.textContent ||
        "Select State"
    );
    setText_mandatorysalary(
      doc.querySelector("string[name='text_mandatorysalary']")?.textContent ||
        "Mandatory"
    );
    setText_Ph_selCountry(
      doc.querySelector("string[name='text_Ph_selCountry']")?.textContent ||
        "Select a Country"
    );
    setText_statev3(
      doc.querySelector("string[name='text_statev3']")?.textContent ||
        "Select a State"
    );
    setText_err_enter_state(
      doc.querySelector("string[name='text_err_enter_state']")?.textContent ||
        "Please Select State"
    );
    setErr_selCountry(
      doc.querySelector("string[name='err_selCountry']")?.textContent ||
        "Please Select Country"
    );
    setText_err_template(
      doc.querySelector("string[name='text_err_template']")?.textContent ||
        "Please Enter Template Name"
    );
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      <h3 className="mt-5 text-center HeadingText">
        {text_createsalarybreakup}
      </h3>
      <div className="container salarytital">
        <div className="row mt-5 p-3 create-sal-inputs-parent-div">
          <div className="col-md-4 mt-4">
            <h5>
              {text_temp_name}
              <span className="Star">*</span>
            </h5>
            <input
              type="text"
              value={TempateName}
              className="createinput"
              PlaceHolder={text_Enter_template}
              onChange={(e) => [setTempateName(e.target.value), setTemperr("")]}
            />
            <br />
            <span className="Star">{temperr}</span>
          </div>
          <div className="col-md-4 mt-4">
            <h5>
              {text_selCountry}
              <span className="Star">*</span>
            </h5>
            <CountryDropdown
              defaultOptionLabel={text_Ph_selCountry}
              className="CountryInputbox1 vactionbox create-sal-breakdown-dropdowns"
              value={CountryCode}
              onChange={(code) => [setCountryCode(code), setCountryerr("")]}
            />
            <br />
            <span className="Star">{countryerr}</span>
          </div>
          <div className="col-md-4 mt-4">
            <h5>
              {text_Selstate}
              <span className="Star">*</span>
            </h5>
            <RegionDropdown
              className="CountryInputbox1 vactionbox create-sal-breakdown-dropdowns"
              blankOptionLabel={text_Selstate}
              defaultOptionLabel={text_statev3}
              country={CountryCode}
              onChange={(e) => [setState(e), setStateerr("")]}
              value={state}
              customOptions={["All"]}
            />
            <br />
            <span className="Star">{stateerr}</span>
          </div>
        </div>
        {salarybreakupData?.map((value) => {
          return (
            <div className="csb">
              <div className="csb-1">
                <h5>{text_mandatorysalary}</h5>
                {value?.mandetorylist?.map((Data, index) => {
                  return (
                    <div className="csb-11">
                      <Checkbox
                        key={index}
                        value={Data.key}
                        onChange={(e) =>
                          MendetoryDataHandleClick(e, Data, index)
                        }
                      />
                      <div className="csb-111">{Data.name}</div>
                    </div>
                  );
                })}
              </div>
              <div className="csb-1">
                <h5>{title_allowance}</h5>
                {value?.allowancelist?.map((AllowanceData, index) => {
                  return (
                    <div className="csb-11">
                      <Checkbox
                        key={index}
                        value={AllowanceData.key}
                        onChange={(checkAllowance) =>
                          AllowanceDataHandleClick(
                            checkAllowance,
                            AllowanceData,
                            index
                          )
                        }
                      />
                      <div className="csb-111">{AllowanceData.name}</div>
                    </div>
                  );
                })}
              </div>
              <div className="csb-1">
                <h5>{title_deduction}</h5>
                {value.deductionlist.map((DeductionData, index) => {
                  return (
                    <div className="csb-11">
                      <Checkbox
                        key={index}
                        value={DeductionData.key}
                        onChange={(CheckDeduction) =>
                          DeductionDataHandleClick(
                            CheckDeduction,
                            DeductionData,
                            index
                          )
                        }
                      />
                      <div className="csb-111">{DeductionData.name}</div>
                    </div>
                  );
                })}
              </div>
              <div className="csb-1">
                <h5>{text_tax}</h5>
                {value.taxlist.map((TaxData, index) => {
                  return (
                    <div className="csb-11">
                      <Checkbox
                        key={index}
                        value={TaxData.key}
                        onChange={(CheckTax) =>
                          TaxDataHandleClick(CheckTax, TaxData, index)
                        }
                      />
                      <div className="csb-111">{TaxData.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {/* {salarybreakupData?.map((value) => {
          return (
            <>
              <div className="row p-3">
                <div className="col-md-3 ">
                  <h5 className="mt-5">{text_mandatorysalary}</h5>
                  {value?.mandetorylist.map((Data, index) => {
                    return (
                      <>
                        <Checkbox
                          key={index}
                          value={Data.key}
                          onChange={(e) =>
                            MendetoryDataHandleClick(e, Data, index)
                          }
                        />
                        <lable>{Data.name}</lable>
                        <br />
                      </>
                    );
                  })}
                </div>
                <div className="col-md-3">
                  <h5 className="mt-5">{title_allowance}</h5>
                  {value.allowancelist.map((AllowanceData, index) => {
                    return (
                      <>
                        <Checkbox
                          key={index}
                          value={AllowanceData.key}
                          onChange={(checkAllowance) =>
                            AllowanceDataHandleClick(
                              checkAllowance,
                              AllowanceData,
                              index
                            )
                          }
                        />
                        <lable>{AllowanceData.name}</lable>
                        <br />
                      </>
                    );
                  })}
                </div>
                <div className="col-md-3">
                  <h5 className="mt-5">{title_deduction}</h5>
                  {value.deductionlist.map((DeductionData, index) => {
                    return (
                      <>
                        <Checkbox
                          key={index}
                          value={DeductionData.key}
                          onChange={(CheckDeduction) =>
                            DeductionDataHandleClick(
                              CheckDeduction,
                              DeductionData,
                              index
                            )
                          }
                        />
                        <lable>{DeductionData.name}</lable>
                        <br />
                      </>
                    );
                  })}
                </div>
                <div className="col-md-3">
                  <h5 className="mt-5">{text_tax}</h5>
                  {value.taxlist.map((TaxData, index) => {
                    return (
                      <>
                        <Checkbox
                          key={index}
                          value={TaxData.key}
                          onChange={(CheckTax) =>
                            TaxDataHandleClick(CheckTax, TaxData, index)
                          }
                        />
                        <lable>{TaxData.name}</lable>
                        <br />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })} */}
        <div className="row mt-5">
          <center>
            <button className="btncancel" onClick={() => navigate(-1)}>
              {button_cancel}
            </button>
            &nbsp; &nbsp;
            <button
              className="btnsave"
              onClick={onSubmitNewSalary}
              disabled={saveDisable}
            >
              {button_save}
            </button>
          </center>
        </div>
        <br />
      </div>
    </>
  );
}

export default CreateSalaryBreakup;
