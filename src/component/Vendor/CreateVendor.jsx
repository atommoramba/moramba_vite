import axios from "axios";
import React, { useState, useEffect } from "react";
import { RegionDropdown } from "react-country-region-selector";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getVendorList } from "../../redux/VendorListSlice";
import { countriesList, GlobalConstants } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import Header from "../Header/Header";
import Cookie from "js-cookie";
import { EMAIL_REGEX } from "../../utils/Validation";
import "./Vendor.css";

function CreateVendor() {
  const dispatch = useDispatch();
  let data = useLocation();
  const SelectedVendorId = data.state != null ? data.state.VendorData : "";
  console.log(SelectedVendorId);
  const [SelectedVendorData, setSelectedVendorData] = useState([]);
  const [text_update, setText_update] = useState("Update");

  const navigate = useNavigate();
  const [VendorName, setVendorName] = useState("");
  const [VendorEmail, setVendorEmail] = useState("");
  const [VendorAddress1, setVendorAddress1] = useState("");
  const [VendorAddress2, setVendorAddress2] = useState("");
  const [VendorState, setVendorState] = useState("");
  const [VendorZipCode, setVendorZipCode] = useState("");
  const [VendorBankName, setVendorBankName] = useState("");
  const [VendorAccountNumber, setVendorAccountNumber] = useState("");
  const [VendorWalletAdd, setVendorWalletAdd] = useState("");
  const [Country, setCountry] = useState("India");
  const [CountryCode, setCountryCode] = useState("IN");
  const [errvendorname, setErrvendorname] = useState("");
  const [errvendoradd1, setErrvendoradd1] = useState("");
  const [errvendoremail, setErrvendoremail] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);

  // language variable
  const [text_vendor_name, setText_vendor_name] = useState("Vendor Name");
  const [text_country, setText_country] = useState("Country");
  const [text_state, setText_state] = useState("State");
  const [text_zip_code, setText_zip_code] = useState("Zip Code");
  const [text_hint_zip_code, setText_hint_zip_code] =
    useState("Enter Zip Code");
  const [text_bank_name, setText_bank_name] = useState("Bank Name");
  const [text_bankaccount_number, setText_bankaccount_number] = useState(
    "Bank Account Number"
  );
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_create_vendor, setText_create_vendor] =
    useState("Create New Vendor");
  const [text_edit_vendor, setText_edit_vendor] = useState("Edit Vendor");
  const [text_ph_crypto_wallet_add, setText_ph_crypto_wallet_add] = useState(
    "Enter Crypto Wallet Address"
  );
  const [text_crypto_wallet_add, setText_crypto_wallet_add] = useState(
    "Crypto Wallet Address"
  );
  const [hint_vendor_name, setHint_vendor_name] = useState("Enter Vendor Name");
  const [text_vendor_email, setText_vendor_email] = useState("Vendor Email");
  const [text_Ph_enter_add_v3, setText_Ph_enter_add_v3] = useState(
    "Enter Vendor Address"
  );
  const [text_hint_bankacc_number, setText_hint_bankacc_number] = useState(
    "Enter Bank Account Number"
  );
  const [text_hint_bank_name, setText_hint_bank_name] =
    useState("Enter Bank Name");
  const [text_hint_email_vendor, setText_hint_email_vendor] =
    useState("Enter Vendor Email");
  const [text_address_vendor1, seTtext_address_vendor1] =
    useState("Vendor Address 1");
  const [text_address_vendor2, seTtext_address_vendor2] =
    useState("Vendor Address 2");
  const [vendor_errname, setVendor_errname] = useState(
    "Please Enter Vendor Name"
  );
  const [vendor_erremail, setVendor_erremail] = useState(
    "Please Enter Vendor Email"
  );
  const [enter_valid_email, setEnter_valid_email] = useState(
    "Please Enter Valid Email"
  );
  const [vendor_erraddress, setVendor_erraddress] = useState(
    "Please Enter Vendor Address 1"
  );
  const [vendor_erraddtwo, setVendor_erraddtwo] = useState(
    "Please Enter Vendor Address 2"
  );
  const [text_err_bankname, setText_err_bankname] = useState(
    "Please Enter Bank Name"
  );
  const [text_err_accnov3, setText_err_accnov3] = useState(
    "Please Enter Bank Account Number"
  );
  const [vendor_errcryptowall, setVendor_errcryptowall] = useState(
    "Please Enter Crypto Wallet Address"
  );
  const [vendor_errzipcode, setVendor_errzipcode] = useState(
    "Please Enter Zip Code"
  );
  const [text_err_enter_state, setText_err_enter_state] = useState(
    "Please Select State"
  );
  const [text_statev3, setText_statev3] = useState("Select a State");
  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
  };
  const CreateVendor = () => {
    let CreateVendorValidation = true;
    if (VendorName === "") {
      CreateVendorValidation = false;
      setErrvendorname(<>*{vendor_errname}!</>);
    }
    if (!EMAIL_REGEX.test(VendorEmail) === true) {
      CreateVendorValidation = false;
      if (VendorEmail === "") {
        CreateVendorValidation = false;
        setErrvendoremail(<>*{vendor_erremail}!</>);
      } else {
        setErrvendoremail(<>*{enter_valid_email}!</>);
      }
    }
    if (VendorAddress1 === "") {
      CreateVendorValidation = false;
      setErrvendoradd1(<>*{vendor_erraddress}!</>);
    }
    setSaveDisable(false);
    return CreateVendorValidation;
  };

  const SaveVendor = () => {
    if (CreateVendor()) {
      setSaveDisable(true);
      var type = "insert";
      var data = {
        vendorname: VendorName === "" ? "Dummy Vendor" : VendorName,
        email: VendorEmail === "" ? "Dummy Vendor Email" : VendorEmail,
        address1: VendorAddress1 === "" ? "Add1" : VendorAddress1,
        address2: VendorAddress2,
        country: Country === "" ? "India" : Country,
        state: VendorState,
        zipcode: VendorZipCode,
        bankname: VendorBankName,
        bankaccountno: VendorAccountNumber,
        cryptoaddress: VendorWalletAdd,
        _orgId: sessionStorage.getItem("_compId"),
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/vendor?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          var res = response.data;
          successToast("Vendor Created Successfully!");
          setSaveDisable(false);
          setTimeout(() => {
            dispatch(getVendorList());
            navigate(`/vendorlist`);
          }, 1000);
        })
        .catch(function (error) {
          errorToast(error.message);
          setSaveDisable(false);
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_vendor_name(
      doc.querySelector("string[name='text_vendor_name']")?.textContent
    );
    setText_country(
      doc.querySelector("string[name='text_country']")?.textContent
    );
    setText_state(doc.querySelector("string[name='text_state']")?.textContent);
    setText_zip_code(
      doc.querySelector("string[name='text_zip_code']")?.textContent
    );
    setText_hint_zip_code(
      doc.querySelector("string[name='text_hint_zip_code']")?.textContent
    );
    setText_bank_name(
      doc.querySelector("string[name='text_bank_name']")?.textContent
    );
    setText_bankaccount_number(
      doc.querySelector("string[name='text_bankaccount_number']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_create_vendor(
      doc.querySelector("string[name='text_create_vendor']")?.textContent
    );
    setText_crypto_wallet_add(
      doc.querySelector("string[name='text_crypto_wallet_add']")?.textContent
    );
    setText_ph_crypto_wallet_add(
      doc.querySelector("string[name='text_ph_crypto_wallet_add']")?.textContent
    );
    setHint_vendor_name(
      doc.querySelector("string[name='hint_vendor_name']")?.textContent
    );
    setText_vendor_email(
      doc.querySelector("string[name='text_vendor_email']")?.textContent
    );
    setText_Ph_enter_add_v3(
      doc.querySelector("string[name='text_Ph_enter_add_v3']")?.textContent
    );
    setText_hint_bankacc_number(
      doc.querySelector("string[name='text_hint_bankacc_number']")?.textContent
    );
    setText_hint_bank_name(
      doc.querySelector("string[name='text_hint_bank_name']")?.textContent
    );
    setText_hint_email_vendor(
      doc.querySelector("string[name='text_hint_email_vendor']")?.textContent
    );
    seTtext_address_vendor1(
      doc.querySelector("string[name='text_address_vendor1']")?.textContent
    );
    seTtext_address_vendor2(
      doc.querySelector("string[name='text_address_vendor2']")?.textContent
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent
    );
    setVendor_errname(
      doc.querySelector("string[name='vendor_errname']")?.textContent
    );
    setVendor_erremail(
      doc.querySelector("string[name='vendor_erremail']")?.textContent
    );
    setVendor_erraddress(
      doc.querySelector("string[name='vendor_erraddress']")?.textContent
    );
    setVendor_erraddtwo(
      doc.querySelector("string[name='vendor_erraddtwo']")?.textContent
    );
    setText_err_bankname(
      doc.querySelector("string[name='text_err_bankname']")?.textContent
    );
    setText_err_accnov3(
      doc.querySelector("string[name='text_err_accnov3']")?.textContent
    );
    setVendor_errcryptowall(
      doc.querySelector("string[name='vendor_errcryptowall']")?.textContent
    );
    setVendor_errzipcode(
      doc.querySelector("string[name='vendor_errzipcode']")?.textContent
    );
    setText_err_enter_state(
      doc.querySelector("string[name='text_err_enter_state']")?.textContent
    );
    setText_statev3(
      doc.querySelector("string[name='text_statev3']")?.textContent
    );
    setEnter_valid_email(
      doc.querySelector("string[name='enter_valid_email']")?.textContent
    );
    setText_edit_vendor(
      doc.querySelector("string[name='text_edit_vendor']")?.textContent
    );
  };

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/vendor/edit") {
      var type = "select";
      var data = {
        vendoruniqueid: SelectedVendorId,
        _orgId: sessionStorage.getItem("_compId"),
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/vendor?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          var res = response.data;
          setSelectedVendorData(res.data);

          console.log(res.data);
          var EditData = res.data;
          setVendorName(EditData?.vendorname);
          setVendorEmail(EditData?.email);
          setVendorAddress1(EditData?.address1);
          setVendorAddress2(EditData?.address2);
          var EditCountry = EditData?.country;
          var key = Object.keys(countriesList).find(
            (key) => countriesList[key] === EditCountry
          );
          setCountry(EditCountry);
          setCountryCode(key);
          setVendorState(EditData?.state);
          setVendorZipCode(EditData?.zipcode);
          setVendorBankName(EditData?.bankname);
          setVendorAccountNumber(EditData?.bankaccountno);
          setVendorWalletAdd(EditData?.cryptoaddress);
        })
        .catch(function (error) {
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
    }
  }, []);

  const UpadteVendor = (id) => {
    if (CreateVendor()) {
      var type = "update";
      setSaveDisable(true);
      var data = {
        vendoruniqueid: id,
        vendorname: VendorName === "" ? "NA" : VendorName,
        email: VendorEmail === "" ? "NA" : VendorEmail,
        address1: VendorAddress1 === "" ? "NA" : VendorAddress1,
        address2: VendorAddress2 === "" ? "NA" : VendorAddress2,
        country: Country === "" ? "India" : Country,
        state: VendorState === "" ? "all" : VendorState,
        zipcode: VendorZipCode === "" ? "NA" : VendorZipCode,
        bankname: VendorBankName === "" ? "NA" : VendorBankName,
        bankaccountno: VendorAccountNumber === "" ? "NA" : VendorAccountNumber,
        cryptoaddress: VendorWalletAdd === "" ? "NA" : VendorWalletAdd,
        _orgId: sessionStorage.getItem("_compId"),
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/vendor?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          var res = response.data;
          console.log(res);
          successToast("Vendor Updated Successfully!");
          setSaveDisable(false);
          setTimeout(() => {
            dispatch(getVendorList());
            navigate("/vendorlist");
          }, 1000);
        })
        .catch(function (error) {
          errorToast(error.response.data.message);
          setSaveDisable(false);
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
      <h3 className="HeadingText mt-4 mb-2 text-center p-2">
        {window.location.pathname === "/vendor/edit" ? (
          <>{text_edit_vendor}</>
        ) : (
          <>{text_create_vendor}</>
        )}
      </h3>
      <div className="container containerBox">
        <div className="row p-4">
          <div className="col-md-6">
            <h4>
              {text_vendor_name}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              value={VendorName}
              placeholder={hint_vendor_name}
              onChange={(e) => [
                setVendorName(e.target.value),
                setErrvendorname(""),
              ]}
            />
            <p className="error_sty">{errvendorname}</p>
            <h4 className="mt-4">
              {text_vendor_email}
              <span className="Star">*</span>
            </h4>
            <input
              type="email"
              value={VendorEmail}
              placeholder={text_hint_email_vendor}
              onChange={(e) => [
                setVendorEmail(e.target.value),
                setErrvendoremail(""),
              ]}
            />
            <p className="error_sty">{errvendoremail}</p>
            <h4 className="mt-4">
              {text_address_vendor1}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              value={VendorAddress1}
              placeholder={text_Ph_enter_add_v3}
              onChange={(e) => [
                setVendorAddress1(e.target.value),
                setErrvendoradd1(""),
              ]}
            />
            <p className="error_sty">{errvendoradd1}</p>
            <h4 className="mt-4">{text_address_vendor2}</h4>
            <input
              type="text"
              value={VendorAddress2}
              placeholder={text_Ph_enter_add_v3}
              onChange={(e) => [setVendorAddress2(e.target.value)]}
            />
            <h4 className="mt-3">{text_country}</h4>
            {console.log(CountryCode)}
            <ReactFlagsSelect
              className="Countryinputvendor "
              selected={CountryCode}
              onSelect={(code) => setCountyData(code)}
              searchable={true}
              inputStyle={{
                background: "#ffffff",
                height: "40px",
                borderBottom: "3px solid #6d9886",
              }}
            />

            <h4 className="mt-3">{text_state}</h4>
            <RegionDropdown
              className="CountryInputbox1 vactionbox createvendor-state-field"
              blankOptionLabel="Please Select Country."
              defaultOptionLabel={text_statev3}
              country={Country}
              onChange={(e) => [setVendorState(e)]}
              value={VendorState}
              customOptions={["All"]}
            />
            <h4 className="mt-3">{text_zip_code}</h4>
            <input
              type="number"
              onKeyDown={(evt) =>
                evt.which !== 8 &&
                evt.which !== 0 &&
                (evt.which < 48 || evt.which > 57) &&
                evt.preventDefault()
              }
              min={0}
              value={VendorZipCode}
              placeholder={text_hint_zip_code}
              onChange={(e) => [setVendorZipCode(e.target.value)]}
            />
          </div>
          <div className="col-md-6 createvendor-fields-1">
            <h4>{text_bank_name}</h4>
            <input
              type="text"
              value={VendorBankName}
              placeholder={text_hint_bank_name}
              onChange={(e) => [setVendorBankName(e.target.value)]}
            />
            <h4 className="mt-4">{text_bankaccount_number}</h4>
            <input
              type="number"
              onKeyDown={(evt) =>
                evt.which !== 8 &&
                evt.which !== 0 &&
                (evt.which < 48 || evt.which > 57) &&
                evt.preventDefault()
              }
              min={0}
              value={VendorAccountNumber}
              placeholder={text_hint_bankacc_number}
              onChange={(e) => [setVendorAccountNumber(e.target.value)]}
            />
            <h4 className="mt-4">{text_crypto_wallet_add}</h4>
            <input
              type="text"
              value={VendorWalletAdd}
              placeholder={text_ph_crypto_wallet_add}
              onChange={(e) => [setVendorWalletAdd(e.target.value)]}
            />
            {/* <h4 className="mt-4">
              {text_crypto_wallet_add}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              value={VendorWalletAdd}
              placeholder={text_ph_crypto_wallet_add}
              onChange={(e) => [
                setVendorWalletAdd(e.target.value),
                setErrcrywalletadd(""),
              ]}
            />
            <p className="error_sty">{errcrywalletadd}</p> */}
          </div>
        </div>
        <div className="row mb-2">
          <center>
            <Link to="/vendorlist">
              <button className="btncancel">{button_cancel}</button>
            </Link>
            &nbsp;&nbsp;
            {window.location.pathname === "/vendor/edit" ? (
              <>
                <>
                  <button
                    className="btnsave"
                    onClick={() =>
                      UpadteVendor(SelectedVendorData?.vendoruniqueid)
                    }
                    disabled={saveDisable}
                  >
                    {text_update}
                  </button>
                </>
              </>
            ) : (
              <>
                <button
                  className="btnsave"
                  onClick={SaveVendor}
                  disabled={saveDisable}
                >
                  {button_save}
                </button>
              </>
            )}
          </center>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreateVendor;
