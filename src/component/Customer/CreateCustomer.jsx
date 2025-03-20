import axios from "axios";
import React, { useState, useEffect } from "react";
import { RegionDropdown } from "react-country-region-selector";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCustomerList } from "../../redux/CustomerListSlice";
import { countriesList, GlobalConstants } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import Header from "../Header/Header";
import "../Vendor/Vendor.css";
import Cookie from "js-cookie";
import { EMAIL_REGEX } from "../../utils/Validation";
import { FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

function CreateCustomer() {
  let data = useLocation();
  const SelectedCustomerId = data.state != null ? data.state.CustomerId : "";
  console.log(SelectedCustomerId);
  const dispatch = useDispatch();
  const [SelectedCustomerData, setSelectedCustomerData] = useState([]);
  const navigate = useNavigate();
  const [CustomerState, setCustomerState] = useState("");
  const [Country, setCountry] = useState("India");
  const [CountryCode, setCountryCode] = useState("IN");
  const [text_update, setText_update] = useState("Update");
  const [CostomerName, setCostomerName] = useState("");
  const [CostomerEmail, setCostomerEmail] = useState("");
  const [CostomerAdd1, setCostomerAdd1] = useState("");
  const [CostomerAdd2, setCostomerAdd2] = useState("");
  const [CostomerZip, setCostomerZip] = useState("");
  const [CostomerBankName, setCostomerBankName] = useState("");
  const [CostomerAccNumber, setCostomerAccNumber] = useState("");
  const [CostomerWalletAdd, setCostomerWalletAdd] = useState("");
  const location = useLocation();
  //validation var
  const [errcustomername, setErrcustomername] = useState("");
  const [errCustomeremail, setErrCustomeremail] = useState("");
  const [errCustomeradd1, setErrCustomeradd1] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);

  //language variable
  const [text_customer_name, setText_customer_name] = useState("Customer Name");
  const [hint_customer_name, setHint_customer_name] = useState(
    "Enter Customer Name"
  );
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
  const [text_create_customer, setText_create_customer] = useState(
    "Create New Customer"
  );
  const [text_edit_customer, sertext_edit_customer] = useState("Edit Customer");
  const [text_customer_enter_add, setText_customer_enter_add] = useState(
    "Enter Customer Address"
  );
  const [text_crypto_wallet_add, setText_crypto_wallet_add] = useState(
    "Crypto Wallet Address"
  );
  const [text_ph_crypto_wallet_add, setText_ph_crypto_wallet_add] = useState(
    "Enter Crypto Wallet Address"
  );
  const [text_hint_bankacc_number, setText_hint_bankacc_number] = useState(
    "Enter Bank Account Number"
  );
  const [text_hint_bank_name, setText_hint_bank_name] =
    useState("Enter Bank Name");
  const [text_address_customer1, seTtext_address_customer1] =
    useState("Customer Address 1");
  const [text_address_customer2, seTtext_address_customer2] =
    useState("Customer Address 2");
  const [text_hint_email_customer, setText_hint_email_customer] = useState(
    "Enter Customer Email"
  );
  const [text_customer_email, setText_customer_email] =
    useState("Customer Email");
  const [customer_errname, setCustomer_errname] = useState(
    "Please Enter Customer Name"
  );
  const [customer_erremail, setCustomer_erremail] = useState(
    "Please Enter Customer Email"
  );
  const [enter_valid_email, setEnter_valid_email] = useState(
    "Please Enter Valid Email"
  );
  const [customer_erraddress, setCustomer_erraddress] = useState(
    "Please Enter Customer Address 1"
  );
  const [customer_erraddtwo, setCustomer_erraddtwo] = useState(
    "Please Enter Customer Address 2!"
  );
  const [text_err_bankname, setText_err_bankname] = useState(
    "Please Enter Bank Name"
  );
  const [vendor_errcryptowall, setVendor_errcryptowall] = useState(
    "Please Enter Crypto Wallet Address"
  );
  const [text_err_accnov3, setText_err_accnov3] = useState(
    "Please Enter Bank Account Number"
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
  const CreateCustomer = () => {
    let CreateCustomerValidation = true;
    if (CostomerName === "") {
      CreateCustomerValidation = false;
      setErrcustomername(<>*{customer_errname}!</>);
    }
    if (!EMAIL_REGEX.test(CostomerEmail) === true) {
      CreateCustomerValidation = false;
      if (CostomerEmail === "") {
        CreateCustomerValidation = false;
        setErrCustomeremail(<>*{customer_erremail}!</>);
      } else {
        setErrCustomeremail(<>*{enter_valid_email}!</>);
      }
    }
    if (CostomerAdd1 === "") {
      CreateCustomerValidation = false;
      setErrCustomeradd1(<>*{customer_erraddress}!</>);
    }
    setSaveDisable(false);
    return CreateCustomerValidation;
  };

  const Savecustomer = () => {
    if (CreateCustomer()) {
      setSaveDisable(true);
      var type = "insert";
      var data = {
        _orgId: sessionStorage.getItem("_compId"),
        customername: CostomerName === "" ? "customername" : CostomerName,
        email: CostomerEmail === "" ? "email" : CostomerEmail,
        address1: CostomerAdd1 === "" ? "address1" : CostomerAdd1,
        address2: CostomerAdd2,
        country: Country === "" ? "country" : Country,
        state: CustomerState,
        zipcode: CostomerZip,
        bankname: CostomerBankName,
        bankaccountno: CostomerAccNumber,
        cryptoaddress: CostomerWalletAdd,
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/customer?type=" +
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
          successToast("Customer Created Successfully!");
          setSaveDisable(false);
          setTimeout(() => {
            dispatch(getCustomerList());
            navigate(`/customerlist`);
          }, 1000);
        })
        .catch(function (error) {
          setSaveDisable(false);
          errorToast(error.message);
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
    setText_customer_name(
      doc.querySelector("string[name='text_customer_name']")?.textContent ||
        "Customer Name"
    );
    setHint_customer_name(
      doc.querySelector("string[name='hint_customer_name']")?.textContent ||
        "Enter Customer Name"
    );
    setText_country(
      doc.querySelector("string[name='text_country']")?.textContent || "Country"
    );
    setText_state(
      doc.querySelector("string[name='text_state']")?.textContent || "State"
    );
    setText_zip_code(
      doc.querySelector("string[name='text_zip_code']")?.textContent ||
        "Zip Code"
    );
    setText_hint_zip_code(
      doc.querySelector("string[name='text_hint_zip_code']")?.textContent ||
        "Enter Zip Code"
    );
    setText_bank_name(
      doc.querySelector("string[name='text_bank_name']")?.textContent ||
        "Bank Name"
    );
    setText_bankaccount_number(
      doc.querySelector("string[name='text_bankaccount_number']")
        ?.textContent || "Bank Account Number"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_crypto_wallet_add(
      doc.querySelector("string[name='text_crypto_wallet_add']")?.textContent ||
        "Crypto Wallet Address"
    );
    setText_ph_crypto_wallet_add(
      doc.querySelector("string[name='text_ph_crypto_wallet_add']")
        ?.textContent || "Enter Crypto Wallet Address"
    );
    setText_create_customer(
      doc.querySelector("string[name='text_create_customer']")?.textContent ||
        "Create New Customer"
    );
    setText_customer_enter_add(
      doc.querySelector("string[name='text_customer_enter_add']")
        ?.textContent || "Enter Customer Address"
    );
    setText_hint_bankacc_number(
      doc.querySelector("string[name='text_hint_bankacc_number']")
        ?.textContent || "Enter Bank Account Number"
    );
    setText_hint_bank_name(
      doc.querySelector("string[name='text_hint_bank_name']")?.textContent ||
        "Enter Bank Name"
    );
    seTtext_address_customer1(
      doc.querySelector("string[name='text_address_customer1']")?.textContent ||
        "Customer Address 1"
    );
    seTtext_address_customer2(
      doc.querySelector("string[name='text_address_customer2']")?.textContent ||
        "Customer Address 2"
    );
    setText_hint_email_customer(
      doc.querySelector("string[name='text_hint_email_customer']")
        ?.textContent || "Enter Customer Email"
    );
    setText_customer_email(
      doc.querySelector("string[name='text_customer_email']")?.textContent ||
        "Customer Email"
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent || "Update"
    );
    setCustomer_errname(
      doc.querySelector("string[name='customer_errname']")?.textContent ||
        "Please Enter Customer Name"
    );
    setCustomer_erremail(
      doc.querySelector("string[name='customer_erremail']")?.textContent ||
        "Please Enter Customer Email"
    );
    setCustomer_erraddress(
      doc.querySelector("string[name='customer_erraddress']")?.textContent ||
        "Please Enter Customer Address 1"
    );
    setCustomer_erraddtwo(
      doc.querySelector("string[name='customer_erraddtwo']")?.textContent ||
        "Please Enter Customer Address 2!"
    );
    setText_err_bankname(
      doc.querySelector("string[name='text_err_bankname']")?.textContent ||
        "Please Enter Bank Name"
    );
    setText_err_accnov3(
      doc.querySelector("string[name='text_err_accnov3']")?.textContent ||
        "Please Enter Bank Account Number"
    );
    setVendor_errcryptowall(
      doc.querySelector("string[name='vendor_errcryptowall']")?.textContent ||
        "Please Enter Crypto Wallet Address"
    );
    setVendor_errzipcode(
      doc.querySelector("string[name='vendor_errzipcode']")?.textContent ||
        "Please Enter Zip Code"
    );
    setText_err_enter_state(
      doc.querySelector("string[name='text_err_enter_state']")?.textContent ||
        "Please Select State"
    );
    setText_statev3(
      doc.querySelector("string[name='text_statev3']")?.textContent ||
        "Select a State"
    );
    setEnter_valid_email(
      doc.querySelector("string[name='enter_valid_email']")?.textContent ||
        "Please Enter Valid Email"
    );
    sertext_edit_customer(
      doc.querySelector("string[name='text_edit_customer']")?.textContent ||
        "Edit Customer"
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
    if (window.location.pathname === "/customer/edit") {
      var type = "select";
      var data = {
        customeruniqueid: SelectedCustomerId,
        _orgId: sessionStorage.getItem("_compId"),
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/customer?type=" +
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
          setSelectedCustomerData(res.data);
          var EditData = res.data;
          setCostomerName(EditData?.customername);
          setCostomerEmail(EditData?.email);
          setCostomerAdd1(EditData?.address1);
          setCostomerAdd2(EditData?.address2);
          var EditCountry = EditData?.country;
          var key = Object.keys(countriesList).find(
            (key) => countriesList[key] === EditCountry
          );
          setCountry(EditCountry);
          setCountryCode(key);
          setCustomerState(EditData?.state);
          setCostomerZip(EditData?.zipcode);
          setCostomerBankName(EditData?.bankname);
          setCostomerAccNumber(EditData?.bankaccountno);
          setCostomerWalletAdd(EditData?.cryptoaddress);
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

  const UpdateCustomer = (id) => {
    if (CreateCustomer()) {
      setSaveDisable(true);
      var type = "update";
      var data = {
        customeruniqueid: id,
        _orgId: sessionStorage.getItem("_compId"),
        customername: CostomerName === "" ? "NA" : CostomerName,
        email: CostomerEmail === "" ? "NA" : CostomerEmail,
        address1: CostomerAdd1 === "" ? "NA" : CostomerAdd1,
        address2: CostomerAdd2 === "" ? "NA" : CostomerAdd2,
        country: Country === "" ? "india" : Country,
        state: CustomerState === "" ? "all" : CustomerState,
        zipcode: CostomerZip === "" ? "NA" : CostomerZip,
        bankname: CostomerBankName === "" ? "NA" : CostomerBankName,
        bankaccountno: CostomerAccNumber === "" ? "NA" : CostomerAccNumber,
        cryptoaddress: CostomerWalletAdd === "" ? "NA" : CostomerWalletAdd,
      };
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/customer?type=" +
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
          successToast("Customer Updated Successfully!");
          setTimeout(() => {
            dispatch(getCustomerList());
            navigate(`/customerlist`);
          }, 1000);
          setSaveDisable(false);
        })
        .catch(function (error) {
          setSaveDisable(false);
          errorToast(error.message);
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
  const [addaccounts, setAddaccounts] = useState([
    {
      bankid: uuidv4(),
      bankname: "",
      bankaccount: "",
    },
  ]);
  console.log(addaccounts);
  const addAccountHandle = () => {
    setAddaccounts([
      ...addaccounts,
      {
        bankid: uuidv4(),
        bankname: "",
        bankaccount: "",
      },
    ]);
  };
  const handleChangeInput = (_id, bank) => {
    const newInputFields = addaccounts.map((i) => {
      if (_id === i.bankid) {
        i[bank.target.name] = bank.target.value;
      }
      return i;
    });

    setAddaccounts(newInputFields);
  };
  const [addcryptowallet, setAddcryptowallet] = useState([
    {
      cryptoid: uuidv4(),
      cryptowalletadd: "",
    },
  ]);
  console.log(addcryptowallet);
  const addcryptowalletHandle = () => {
    setAddcryptowallet([
      ...addcryptowallet,
      {
        cryptoid: uuidv4(),
        cryptowalletadd: "",
      },
    ]);
  };
  const handleChangeInputcrypto = (_id, wallet) => {
    const newInputFieldscrypto = addcryptowallet.map((i) => {
      if (_id === i.cryptoid) {
        i[wallet.target.name] = wallet.target.value;
      }
      return i;
    });

    setAddcryptowallet(newInputFieldscrypto);
  };
  return (
    <>
      <Header />
      <h3 className="HeadingText mt-4 mb-2 text-center p-2">
        {window.location.pathname === "/customer/edit" ? (
          <>{text_edit_customer}</>
        ) : (
          <>{text_create_customer}</>
        )}
      </h3>
      <div className="container containerBox">
        <div className="row p-4">
          <div className="col-md-6">
            <h4>
              {text_customer_name}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              value={CostomerName}
              placeholder={hint_customer_name}
              onChange={(e) => [
                setCostomerName(e.target.value),
                setErrcustomername(""),
              ]}
            />
            <p className="error_sty">{errcustomername}</p>
            <h4 className="mt-4">
              {text_customer_email}
              <span className="Star">*</span>
            </h4>
            <input
              type="email"
              value={CostomerEmail}
              placeholder={text_hint_email_customer}
              onChange={(e) => [
                setCostomerEmail(e.target.value),
                setErrCustomeremail(""),
              ]}
            />
            <p className="error_sty">{errCustomeremail}</p>
            <h4 className="mt-4">
              {text_address_customer1}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              value={CostomerAdd1}
              placeholder={text_customer_enter_add}
              onChange={(e) => [
                setCostomerAdd1(e.target.value),
                setErrCustomeradd1(""),
              ]}
            />
            <p className="error_sty">{errCustomeradd1}</p>
            <h4 className="mt-4">{text_address_customer2}</h4>
            <input
              type="text"
              value={CostomerAdd2}
              placeholder={text_customer_enter_add}
              onChange={(e) => [setCostomerAdd2(e.target.value)]}
            />
            <h4 className="mt-3">{text_country}</h4>
            <ReactFlagsSelect
              className="Countryinputvendor "
              selected={CountryCode}
              onSelect={(code) => setCountyData(code)}
              searchable={true}
              inputStyle={{
                background: "#ffffff",
                width: "60%",
                height: "40px",
                borderBottom: "3px solid #6d9886",
              }}
            />
            <h4 className="mt-3">{text_state}</h4>
            <RegionDropdown
              className="CountryInputbox1 vactionbox create-customer-state-dropdown"
              blankOptionLabel="Please Select Country."
              defaultOptionLabel={text_statev3}
              country={Country}
              onChange={(e) => [setCustomerState(e)]}
              value={CustomerState}
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
              value={CostomerZip}
              placeholder={text_hint_zip_code}
              onChange={(e) => [setCostomerZip(e.target.value)]}
            />
          </div>
          <div className="col-md-6 create-customer-bankname">
            {/* <h4>{text_bank_name}</h4> */}
            <div className="d-flex gap-5 items-center mb-2">
              <h4 className="block font-medium mt-1">Bank Accounts</h4>
              <button
                // onClick={addBankAccount}
                onClick={addAccountHandle}
                className="btnsave add-btn-customer"
                variant="outline"
              >
                <FiPlus className="w-4 h-4" />
                Add
              </button>
            </div>
            {addaccounts.map((add) => {
              return (
                <>
                  <div className="d-flex gap-2 flex-warp">
                    <input
                      type="text"
                      value={add.bankname}
                      // value={CostomerBankName}
                      // placeholder={text_hint_bank_name}
                      name="bankname"
                      placeholder="Bank Name"
                      className="mb-2"
                      // onChange={(e) => [setCostomerBankName(e.target.value)]}
                      onChange={(bank) => [
                        handleChangeInput(add.bankid, bank),
                        console.log(bank.target.value),
                      ]}
                    />
                    {/* <h4 className="mt-4">{text_bankaccount_number}</h4> */}
                    <input
                      className="col-md-6 mb-2"
                      type="number"
                      onKeyDown={(evt) =>
                        evt.which !== 8 &&
                        evt.which !== 0 &&
                        (evt.which < 48 || evt.which > 57) &&
                        evt.preventDefault()
                      }
                      min={0}
                      name="bankaccount"
                      value={add.bankaccount}
                      // value={CostomerAccNumber}
                      // placeholder={text_hint_bankacc_number}
                      placeholder="Account Number"
                      onChange={(bank) => [
                        handleChangeInput(add.bankid, bank),
                        console.log(bank.target.value),
                      ]}
                      // onChange={(e) => [setCostomerAccNumber(e.target.value)]}
                    />
                  </div>
                </>
              );
            })}

            <div className="d-flex gap-5 items-center mb-2 mt-4">
              <h4 className="block font-medium ">{text_crypto_wallet_add}</h4>
              <button
                // onClick={addBankAccount}
                onClick={addcryptowalletHandle}
                className="btnsave add-btn-customer"
                variant="outline"
              >
                <FiPlus className="w-4 h-4" />
                Add
              </button>
            </div>
            {addcryptowallet.map((wallet) => {
              return (
                <>
                  <input
                    className="col-md-10 mb-2"
                    type="text"
                    // value={CostomerWalletAdd}
                    name="cryptowalletadd"
                    value={wallet.cryptowalletadd}
                    placeholder={text_ph_crypto_wallet_add}
                    onChange={(crypto) => [
                      handleChangeInputcrypto(wallet.cryptoid, crypto),
                      console.log(crypto.target.value),
                    ]}
                    // onChange={(e) => [setCostomerWalletAdd(e.target.value)]}
                  />
                </>
              );
            })}
          </div>
        </div>
        <div className="row mb-2">
          <center>
            <Link to="/customerlist">
              <button className="btncancel">{button_cancel}</button>
            </Link>{" "}
            &nbsp;&nbsp;
            {window.location.pathname === "/customer/edit" ? (
              <>
                {" "}
                <button
                  className="btnsave"
                  onClick={() =>
                    UpdateCustomer(SelectedCustomerData?.customeruniqueid)
                  }
                  disabled={saveDisable}
                >
                  {text_update}
                </button>
              </>
            ) : (
              <>
                <button
                  className="btnsave"
                  onClick={Savecustomer}
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

export default CreateCustomer;
