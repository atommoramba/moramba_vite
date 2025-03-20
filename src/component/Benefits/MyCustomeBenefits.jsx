import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import dayjs from "dayjs";

import { CgCloseO } from "react-icons/cg";
import ReactFlagsSelect from "react-flags-select";
import { Divider } from "@mui/material";
import DatePicker from "react-datepicker";
import { GlobalConstants, countriesList } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getOrgSelectedBenefits } from "../../redux/OrgSelectedBenefits";
import { CountryCodewithEmoji, Currency } from "../../utils/data";
import Cookie from "js-cookie";

function MyCustomeBenefits() {
  const dispatch = useDispatch();
  const OrgSelectedbenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );

  //language variable
  const [text_End_Date, setText_End_Date] = useState("End Date");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [text_edit, setText_edit] = useState("Edit");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  const [text_currency, setText_currency] = useState("Select Currency");
  const [text_update, setText_update] = useState("Update");
  const [text_description, setText_description] = useState("Description");
  const [text_updatebenefits, setText_updatebenefits] =
    useState("Update Benefit");

  //New variable for language
  const [text_add_new_benefits, setText_add_new_benefts] =
    useState("Add New Benefits");
  const [text_addben_prov, setext_addben_prov] = useState(
    "Enter Benefit Provider"
  );
  // const[text_add_benefit_provider, setText_add_new_benefit_provider] = useState("Enter Benefit Provider")
  const [text_benefitName, setText_benefitName] = useState("Benefit Name");
  const [text_price, setext_Price] = useState("Price");
  const [text_empcontribution, setText_empcontribution] = useState(
    "Employee Contribution"
  );
  const [text_cmpcontribution, setText_cmpcontribution] = useState(
    "Company Contribution"
  );
  const [text_selCountry, setText_selCountry] = useState("Select Country");
  const [text_enter_benefit_name, setText_enter_benefit_name] =
    useState("Enter Benefit Name");
  const [text_enter_cmpcontribution, settext_enter_cmpcontribution] = useState(
    "Enter Company Contribution"
  );
  const [text_enter_empcontribution, settext_enter_empcontribution] = useState(
    "Enter Employee Contribution"
  );
  const [text_enter_price, settext_enter_price] = useState("Enter Price");
  const [text_BenefitProvider, settext_BenefitProvider] =
    useState("Benefit Provider");

  const [text_Benefitname, settext_Benefitname] = useState(
    "Please Add Benefit Name"
  );
  const [text_BenefitProvider1, settext_BenefitProvider1] = useState(
    "Please Add Benefit Provider"
  );
  const [text_addprice, settext_addprice] = useState("Please Add Price");
  const [text_description1, setText_description1] = useState(
    "Please Add Description"
  );
  const [invoice_errcurrency, setInvoice_errcurrency] = useState(
    "Please Select Currency"
  );
  const [text_cmpcontro, settext_cmpcontro] = useState(
    "Please Add Company Contribution"
  );
  const [text_Empcontro, settext_Empcontro] = useState(
    "Please Add Employee Contribution"
  );

  // popup const
  const [text_benefit_name, setText_benefit_name] =
    useState("Enter Benefit Name");
  const [text_benefit_provider, setText_benefit_provider] = useState(
    "Enter Benefit Provider"
  );
  const [text_cmp_contribution, setText_comp_contribution] = useState(
    "Enter Company Contribtion"
  );
  const [text_emp_contribution, setText_emp_contribution] = useState(
    "Enter Employee Contribution"
  );
  const [text_price1, setText_price1] = useState("Enter Price");
  const [text_description_ph, setText_description_ph] =
    useState("Enter Description");
  const [text_Ph_selCountry, setText_Ph_selCountry] =
    useState("Select a Country");

  //variable
  const [popup, setPopup] = useState(false);
  const [benefitName, setBenefitName] = useState("");
  const [CountryCode, setCountryCode] = useState("");

  const [Country, setCountry] = useState("");
  const [Price, setPrice] = useState(0);
  const [cmpContribution, setcmpContribution] = useState("");
  const [empContribution, setempContribution] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [benefitdiscription, setBenefitDescription] = useState("");
  const [benefitProvider, setBenefitProvider] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [update, setUpdate] = useState(false);
  const [benefitId, setBenefitId] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);

  //validation variable
  const [errBenefitsname, setErrBenefitsName] = useState("");
  const [errBenefitsProvider, setErrBenefitsProvider] = useState("");
  const [errPrice, setErrPrice] = useState("");
  const [errDescription, setErrDescription] = useState("");
  const [errCurrency, setErrCurrency] = useState("");
  const [errCmpContribution, setErrCmpContribution] = useState("");
  const [errEmpContribution, setErrEmpContribution] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [err_selCountry, setErr_selCountry] = useState("Please Select Country");

  //country handle
  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
  };
  console.log(CountryCode);
  //DataTable Columns data
  const columns = [
    { name: <>{text_benefitName}</>, selector: (row) => row.benefit_name },
    { name: <>{text_BenefitProvider}</>, selector: (row) => row.provider },

    {
      name: <>{text_start_date}</>,
      selector: (row) => dayjs(row.startdate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_End_Date}</>,
      selector: (row) => dayjs(row.enddate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_cmpcontribution}</>,
      selector: (row, index) => row.comp_contribution,
    },
    {
      name: <>{text_empcontribution}</>,
      selector: (row, index) => row.emp_contribution,
    },
    { name: <>{text_price}</>, selector: (row) => row.price },
    {
      name: <>{text_edit}</>,
      selector: (row) => (
        <button
          className="EditBtn"
          onClick={() => [setPopup(true), handleEditBenefits(row)]}
        >
          {text_edit}
        </button>
      ),
    },
  ];

  const BenefitsValidation = () => {
    let benefitsDataValid = true;
    if (benefitName === "") {
      benefitsDataValid = false;
      setErrBenefitsName(<>{text_Benefitname}</>);
    }
    if (benefitProvider === "") {
      benefitsDataValid = false;
      setErrBenefitsProvider(<>{text_BenefitProvider1}</>);
    }
    // if (Price === 0 || Price === "") {
    //   benefitsDataValid = false;
    //   setErrPrice(<>{text_addprice}</>);
    // }
    if (benefitdiscription === "") {
      benefitsDataValid = false;
      setErrDescription(<>{text_description1}</>);
    }
    if (currencySymbol === "") {
      benefitsDataValid = false;
      setErrCurrency(<>{invoice_errcurrency}</>);
    }
    if (cmpContribution === "") {
      benefitsDataValid = false;
      setErrCmpContribution(<>{text_cmpcontro}</>);
    }
    if (empContribution === "") {
      benefitsDataValid = false;
      setErrEmpContribution(<>{text_Empcontro}</>);
    }
    if (CountryCode === "" || CountryCode === null) {
      benefitsDataValid = false;
      setErrCountry(err_selCountry);
    }
    return benefitsDataValid;
  };
  const rowPreExpanded = ({ data }) => (
    <ul className="m-3">
      <li>
        {text_start_date}: {dayjs(data?.startdate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_End_Date}: {dayjs(data?.enddate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_description}: {data?.description}
      </li>
    </ul>
  );

  const handleEditBenefits = (value) => {
    console.log(value);
    setBenefitName(value?.benefit_name);
    setBenefitProvider(value?.provider);
    setPrice(value?.price);
    setStartDate(new Date(value?.startdate));
    setEndDate(new Date(value?.enddate));
    setBenefitDescription(value?.description);
    setcmpContribution(value?.comp_contribution);
    setempContribution(value?.emp_contribution);
    setBenefitId(value?.benefit_p_id);
    setUpdate(true);
    setCurrencySymbol(value?.currency);
    setCountryCode(value?.Country);
  };

  //Benefits add API
  const handleBenefits = () => {
    var orgID = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    if (BenefitsValidation()) {
      setSaveDisable(true);
      var API_URL =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/companybenefit/addcustombenefit?type=insert";
      var Data = {
        _orgId: orgID,
        benefit_name: benefitName,
        description: benefitdiscription,
        provider: benefitProvider,
        price: Number(empContribution) + Number(cmpContribution),
        startdate: startDate,
        enddate: endDate,
        comp_contribution: cmpContribution,
        emp_contribution: empContribution,
        currency: currencySymbol,
        Country: CountryCode,
      };
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(API_URL, Data, headerConfig)
        .then(function (response) {
          successToast(response.data.message);
          setSaveDisable(false);
          closePopup();
          dispatch(getOrgSelectedBenefits());
        })
        .catch(function (error) {
          setSaveDisable(false);
          errorToast("opps something went wrong!");
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
    }
  };

  const handleUpdateBenefits = () => {
    var orgID = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    if (BenefitsValidation()) {
      setSaveDisable(true);
      var type = "update";
      var API_URL =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/companybenefit/addcustombenefit?type=" +
        type;
      var Data = {
        _orgId: orgID,
        benefit_name: benefitName,
        description: benefitdiscription,
        provider: benefitProvider,
        price: Number(empContribution) + Number(cmpContribution),
        startdate: startDate,
        enddate: endDate,
        comp_contribution: cmpContribution,
        emp_contribution: empContribution,
        currency: currencySymbol,
        Country: CountryCode,
        benefit_p_id: benefitId,
      };
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(API_URL, Data, headerConfig)
        .then(function (response) {
          successToast("Benefit Updated successfully!");
          closePopup();
          setSaveDisable(false);
          dispatch(getOrgSelectedBenefits());
          setUpdate(false);
        })
        .catch(function (error) {
          setUpdate(false);
          setSaveDisable(true);
          errorToast("opps something went wrong!");
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
    }
  };

  const closePopup = () => {
    setPopup(false);
    setBenefitName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setPrice(0);
    setcmpContribution("");
    setempContribution("");
    setBenefitProvider("");
    setBenefitDescription("");
    setCountryCode("");
    setCurrencySymbol("");
    setErrCurrency("");
    setErrCmpContribution("");
    setErrBenefitsName("");
    setErrDescription("");
    setErrEmpContribution("");
    setErrBenefitsProvider("");
    setErrPrice("");
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_benefitName(
      doc.querySelector("string[name='text_benefitName']")?.textContent ||
        "Benefit Name"
    );
    setext_Price(
      doc.querySelector("string[name='text_price']")?.textContent || "Price"
    );
    setText_benefit_name(
      doc.querySelector("string[name='text_benefit_name']")?.textContent ||
        "Enter Benefit Name"
    );
    setText_add_new_benefts(
      doc.querySelector("string[name='text_add_new_benefits']")?.textContent ||
        "Add New Benefits"
    );
    setText_End_Date(
      doc.querySelector("string[name='text_End_Date']")?.textContent ||
        "End Date"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent ||
        "Start Date"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
    );
    setText_currency(
      doc.querySelector("string[name='text_currency']")?.textContent ||
        "Select Currency"
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent || "Update"
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent ||
        "Description"
    );
    setText_empcontribution(
      doc.querySelector("string[name='text_empcontribution']")?.textContent ||
        "Employee Contribution"
    );
    setText_cmpcontribution(
      doc.querySelector("string[name='text_cmpcontribution']")?.textContent ||
        "Company Contribution"
    );
    setText_selCountry(
      doc.querySelector("string[name='text_selCountry']")?.textContent ||
        "Select Country"
    );
    settext_BenefitProvider(
      doc.querySelector("string[name='text_BenefitProvider']")?.textContent ||
        "Benefit Provider"
    );
    setText_description_ph(
      doc.querySelector("string[name='text_description_ph']")?.textContent ||
        "Enter Description"
    );
    settext_Benefitname(
      doc.querySelector("string[name='text_Benefitname']")?.textContent ||
        "Please Add Benefit Name"
    );
    settext_BenefitProvider1(
      doc.querySelector("string[name='text_BenefitProvider1']")?.textContent ||
        "Please Add Benefit Provider"
    );
    settext_addprice(
      doc.querySelector("string[name='text_addprice']")?.textContent ||
        "Please Add Price"
    );
    setText_description1(
      doc.querySelector("string[name='text_description1']")?.textContent ||
        "Please Add Description"
    );
    setInvoice_errcurrency(
      doc.querySelector("string[name='invoice_errcurrency']")?.textContent ||
        "Please Select Currency"
    );
    settext_cmpcontro(
      doc.querySelector("string[name='text_cmpcontro']")?.textContent ||
        "Please Add Company Contribution"
    );
    settext_Empcontro(
      doc.querySelector("string[name='text_Empcontro']")?.textContent ||
        "Please Add Employee Contribution"
    );

    setText_benefit_provider(
      doc.querySelector("string[name='text_benefit_provider']")?.textContent ||
        "Enter Benefit Provider"
    );
    setText_comp_contribution(
      doc.querySelector("string[name='text_cmp_contribution']")?.textContent ||
        "Enter Company Contribtion"
    );
    setText_emp_contribution(
      doc.querySelector("string[name='text_emp_contribution']")?.textContent ||
        "Enter Employee Contribution"
    );
    setText_price1(
      doc.querySelector("string[name='text_price1']")?.textContent ||
        "Enter Price"
    );
    // setText_updatebenefits(
    //   doc.querySelector("string[name='text_updatebenefits']")
    //     ?.textContent
    // );
    setErr_selCountry(
      doc.querySelector("string[name='err_selCountry']")?.textContent ||
        "Please Select Country"
    );
    setText_Ph_selCountry(
      doc.querySelector("string[name='text_Ph_selCountry']")?.textContent ||
        "Select a Country"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const FilteredCurrency = CountryCodewithEmoji.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(Country.toLowerCase()) !== -1
  );

  //Filter custome Benefits
  const FilterCustomBenefits = OrgSelectedbenefitsList?.filter((data) => {
    return data?.b_type === "custom";
  });
  console.log(FilterCustomBenefits);
  return (
    <>
      <div className={popup ? "bgblur1" : ""}>
        <div className="text-end mt-4 mx-5 w-60">
          <div className="text-end mx-5">
            <button
              className="CreateBtn dashboard-createbtn"
              onClick={() => [setPopup(!popup), setUpdate(false)]}
            >
              + {text_add_new_benefits}
            </button>
          </div>
        </div>
        <div className="m-5">
          <DataTable
            columns={columns}
            data={FilterCustomBenefits}
            expandableRows
            expandableRowsComponent={rowPreExpanded}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            customStyles={customTableStyles}
          />
        </div>
      </div>
      {popup ? (
        <>
          <div className="position-absolute top-50 start-50 translate-middle SalaryPopup sal-slip-popup w-20 ">
            <div className="text-end close">
              <CgCloseO className="closeIconSty" onClick={closePopup} />
            </div>
            <h2 className="text-center">
              {update ? text_updatebenefits : text_add_new_benefits}
            </h2>
            <hr />
            <div className="scroll_history">
              <div className="row ">
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_benefitName} <span className="Star">*</span>
                  </h5>
                  <input
                    type="text"
                    placeholder={text_benefit_name}
                    onChange={(e) => [
                      setBenefitName(e.target.value),
                      setErrBenefitsName(""),
                    ]}
                    value={benefitName}
                    className="create-exp-popup-input mobinputpopup"
                  />
                  <p className="error_sty">{errBenefitsname}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_BenefitProvider} <span className="Star">*</span>{" "}
                  </h5>
                  <input
                    type="text"
                    placeholder={text_benefit_provider}
                    onChange={(e) => [
                      setBenefitProvider(e.target.value),
                      setErrBenefitsProvider(""),
                    ]}
                    value={benefitProvider}
                    className="create-exp-popup-input mobinputpopup"
                  />
                  <p className="error_sty">{errBenefitsProvider}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h5 className="mt-2">{text_start_date} </h5>
                  <DatePicker
                    selected={startDate}
                    dateFormat="MMM dd,yyyy"
                    showMonthDropdown
                    showYearDropdown
                    onChange={(date) => setStartDate(date)}
                    className="benefitsdate"
                    dropdownMode="select"
                  />
                </div>
                <div className="col-md-6">
                  <h5 className="mt-2">{text_End_Date} </h5>
                  <DatePicker
                    selected={endDate}
                    dateFormat="MMM dd,yyyy"
                    showMonthDropdown
                    showYearDropdown
                    onChange={(date) => setEndDate(date)}
                    className="benefitsdate"
                    dropdownMode="select"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_cmpcontribution} <span className="Star">*</span>
                  </h5>

                  <input
                    type="number"
                    onKeyDown={(evt) =>
                      evt.which !== 8 &&
                      evt.which !== 0 &&
                      (evt.which < 48 || evt.which > 57) &&
                      evt.preventDefault()
                    }
                    min={0}
                    placeholder={text_cmp_contribution}
                    onChange={(e) => [
                      setcmpContribution(e.target.value),
                      setErrCmpContribution(""),
                    ]}
                    value={cmpContribution}
                    className="create-exp-popup-input mobinputpopup"
                  />
                  <p className="error_sty">{errCmpContribution}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_empcontribution} <span className="Star">*</span>
                  </h5>
                  <input
                    type="number"
                    onKeyDown={(evt) =>
                      evt.which !== 8 &&
                      evt.which !== 0 &&
                      (evt.which < 48 || evt.which > 57) &&
                      evt.preventDefault()
                    }
                    min={0}
                    placeholder={text_emp_contribution}
                    onChange={(e) => [
                      setempContribution(e.target.value),
                      setErrEmpContribution(""),
                    ]}
                    value={empContribution}
                    className="create-exp-popup-input mobinputpopup"
                  />
                  <p className="error_sty">{errEmpContribution}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_price} <span className="Star">*</span>
                  </h5>
                  <input
                    disabled
                    type="number"
                    onKeyDown={(evt) =>
                      evt.which !== 8 &&
                      evt.which !== 0 &&
                      (evt.which < 48 || evt.which > 57) &&
                      evt.preventDefault()
                    }
                    min={0}
                    placeholder={text_price1}
                    onChange={(e) => setPrice(e.target.value)}
                    value={Number(empContribution) + Number(cmpContribution)}
                    className="create-exp-popup-input mobinputpopup"
                  />
                </div>
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_selCountry} <span className="Star">*</span>
                  </h5>
                  <ReactFlagsSelect
                    id="EmpCountry"
                    className="CountryInputboxbenefit t-addstaff-country"
                    selected={CountryCode}
                    onSelect={(code) => setCountyData(code)}
                    placeholder={text_Ph_selCountry}
                    searchable={true}
                    inputStyle={{
                      background: "#ffffff",
                      width: "60%",
                      height: "43px",
                      borderBottom: "3px solid #6d9886",
                    }}
                  />
                  <p className="error_sty">{errCountry}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mt-2">
                    {text_description} <span className="Star">*</span>
                  </h5>
                  <input
                    type="text"
                    placeholder={text_description_ph}
                    onChange={(e) => [
                      setBenefitDescription(e.target.value),
                      setErrDescription(""),
                    ]}
                    value={benefitdiscription}
                    className="create-exp-popup-input mobinputpopup"
                  />
                  <p className="error_sty">{errDescription}</p>
                </div>
                <div className="col-md-6">
                  <h4 className="mt-2">
                    {text_currency} <span className="Star">*</span>
                  </h4>

                  <select
                    id="currency"
                    className="CountryInputbox1 addstaff-dropdowns"
                    value={currencySymbol}
                    onChange={(e) => [
                      setCurrencySymbol(e.target.value),
                      setErrCurrency(""),
                    ]}
                  >
                    <option selected>{text_currency}</option>
                    {FilteredCurrency.map((e, i) => (
                      <>
                        <option key={i} value={e.symbol}>
                          {e.currency}
                          &nbsp;&nbsp;
                          {"(" + e.symbol + ")"}
                        </option>
                      </>
                    ))}
                    {FilteredCurrency.length === 0 ? (
                      <>
                        {" "}
                        <option value={"$"}>
                          United States Dollar &nbsp;($)
                        </option>
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                  <p className="error_sty">{errCurrency}</p>
                </div>
              </div>
            </div>
            <br />
            <Divider />
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btncancel" onClick={closePopup}>
                {button_cancel}
              </button>{" "}
              {update ? (
                <button
                  className="btnsave"
                  onClick={handleUpdateBenefits}
                  disabled={saveDisable}
                >
                  {text_update}
                </button>
              ) : (
                <button
                  className="btnsave"
                  onClick={handleBenefits}
                  disabled={saveDisable}
                >
                  {button_save}
                </button>
              )}
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

export default MyCustomeBenefits;
