import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { CountryCodewithEmoji, Currency } from "../../utils/data";
import "./Bonus.css";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function Bonus() {
  const navigate = useNavigate();
  const AllEmpListOfSelectedCmp = useSelector((state) => state.allEmpList);

  //language variable
  const [IsLoading, setIsLoading] = useState(true);
  const [text_Amount, setText_Amount] = useState("Amount");
  const [text_date, setText_date] = useState("Date");
  const [text_description, setText_description] = useState("Description");
  const [cancleBtn, setCancleBtn] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  const [text_update, setText_update] = useState("Update");
  const [text_delete, setText_delete] = useState("Delete");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [text_Currency, setText_Currency] = useState("Currency");
  const [text_currency, setText_currency] = useState("Select Currency");
  const [text_emp_name, setText_emp_name] = useState("Employee Name");
  const [please_enter_amount, setPlease_enter_amount] = useState(
    "Please Enter Amount"
  );
  const [txtbonus, settextbonus] = useState("Bonus");
  const [select_employee, setSelect_employee] = useState(
    "Please Select Employee"
  );
  const [text_description_ph, setText_description_ph] =
    useState("Enter Description");
  const [text_selectEmployee, setText_SelectEmployee] =
    useState("Select Employee");
  const [text_enter_amount, setText_enter_amount] = useState("Enter Amount");

  //variable
  const [startDate, setStartDate] = useState(new Date());
  const [Description, setDescription] = useState("");
  const [Amount, setAmount] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [BonusList, setBonusList] = useState([]);
  const [updateData, setupdateData] = useState(false);
  const [BonusID, setBonusID] = useState("");
  const [Country, setCountry] = useState("");
  const [DisableSave, setDisableSave] = useState(false);
  const [Disableupadte, setDisableupadte] = useState(false);
  const [selectEmployee, setSelectEmployee] = useState("Select");

  //validation
  const [errAmount, setErrAmount] = useState("");
  const [errSelectEmployee, setErrSelectEmployee] = useState("");

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent
    );
    setText_date(doc.querySelector("string[name='text_date']")?.textContent);
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent
    );
    setCancleBtn(doc.querySelector("string[name='cancleBtn']")?.textContent);
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent
    );
    setText_delete(
      doc.querySelector("string[name='text_delete']")?.textContent
    );
    setText_edit(doc.querySelector("string[name='text_edit']")?.textContent);
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);

    setText_emp_name(
      doc.querySelector("string[name='text_emp_name']")?.textContent
    );
    setPlease_enter_amount(
      doc.querySelector("string[name='please_enter_amount']")?.textContent
    );
    setSelect_employee(
      doc.querySelector("string[name='select_employee']")?.textContent
    );
    setText_description_ph(
      doc.querySelector("string[name='text_description_ph']")?.textContent
    );
    setText_Currency(
      doc.querySelector("string[name='text_Currency']")?.textContent
    );
    setText_SelectEmployee(
      doc.querySelector("string[name='text_selectEmployee']")?.textContent
    );
    setText_currency(
      doc.querySelector("string[name='text_currency']")?.textContent
    );
    settextbonus(doc.querySelector("string[name='txtbonus']")?.textContent);
    setText_enter_amount(
      doc.querySelector("string[name='text_enter_amount']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  //validation
  const bonusValidation = () => {
    let Bonusvalidationform = true;
    if (Amount === "") {
      Bonusvalidationform = false;
      setErrAmount(<>*{please_enter_amount}!</>);
    }
    if (selectEmployee === "Select") {
      Bonusvalidationform = false;
      setErrSelectEmployee(<>*{select_employee}!</>);
    }
    setDisableSave(false);
    return Bonusvalidationform;
  };
  //Add Bonus Data
  const handleBonus = () => {
    if (bonusValidation()) {
      setIsLoading(true);
      var type = "insert";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/bonus/bonus?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var _compId = sessionStorage.getItem("_compId");
      var d = {
        _id: "",
        _orgId: _compId,
        employeeId: selectEmployee,
        amount: Amount,
        date: startDate,
        description: Description === "" ? "NA" : Description,
        currency: currencySymbol === "" ? "$" : currencySymbol,
      };
      axios
        .post(apiUrl, d, headerConfig)

        .then(function (response) {
          successToast("Bonus Added Successfully!");

          getBonusData(response.data.data._id);
          setIsLoading(false);
          setAmount("");
          setCurrencySymbol("");
          setDescription("");
          setStartDate(new Date());
          setDisableSave(false);
          setSelectEmployee("Select");
        })
        .catch(function (error) {
          setDisableSave(false);
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

  const getBonusData = (id) => {
    setIsLoading(true);
    var type = "selectall";
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/bonus/bonus?type=" +
      type +
      "&_orgId=" +
      _compId;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        setIsLoading(false);
        var data = response.data.data;
        setBonusList(data);
        setupdateData(false);
        setAmount("");
        setStartDate(new Date());
        setDescription("");
        setCurrencySymbol("");
        setSelectEmployee("Select");
      })
      .catch(function (error) {
        setIsLoading(false);
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
  };

  useEffect(() => {
    getBonusData();
  }, []);

  //delete data
  const deleteBonus = (id) => {
    var type = "delete";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/bonus/bonus?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var _compId = sessionStorage.getItem("_compId");

    var d = {
      _orgId: _compId,
      _id: id,
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        getBonusData();
        successToast("Bonus Deleted Successfully!!");
      })
      .catch(function (error) {
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
  };

  //edit data
  const EditBonus = (value) => {
    var editamount = value.amount === "" ? 0 : value.amount;
    setAmount(editamount);
    var editDate =
      dayjs(value.date).format("DD MMM,YYYY") === ""
        ? 0
        : dayjs(value.date).format("DD MMM,YYYY");
    setStartDate(new Date(editDate));
    var editcurrency = value.currency === "" ? 0 : value.currency;
    setCurrencySymbol(editcurrency);
    var editdescription = value.description === "" ? 0 : value.description;
    setDescription(editdescription);
    var editSelectEmployee = value.employeeId === "" ? 0 : value.employeeId;
    setSelectEmployee(editSelectEmployee);
    setBonusID(value._id);
  };

  //edit Handle
  const handleEditBonus = () => {
    setDisableupadte(true);
    var type = "update";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/bonus/bonus?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var _compId = sessionStorage.getItem("_compId");
    var d = {
      _id: BonusID,
      _orgId: _compId,
      employeeId: selectEmployee,
      amount: Amount,
      date: startDate,
      description: Description,
      currency: currencySymbol === "" ? "$" : currencySymbol,
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        successToast("Bonus Updated Successfully!");
        getBonusData(response.data.data._id);
        setupdateData(false);
        setAmount("");
        setStartDate(new Date());
        setDescription("");
        setCurrencySymbol("");
        setDisableupadte(false);
        setSelectEmployee("Select");
      })
      .catch(function (error) {
        setDisableupadte(false);
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
  };
  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: <>{text_emp_name}</>,
      selector: (row) =>
        AllEmpListOfSelectedCmp.map((EmpName, i) => {
          return (
            <>
              {EmpName._id === row.employeeId
                ? EmpName?.firstName + " " + EmpName?.lastName
                : ""}
            </>
          );
        }),
      sortable: true,
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.date).format("DD MMM,YYYY"),
      sortable: true,
    },
    {
      name: <>{text_Amount}</>,
      selector: (row) => row.currency + " " + row.amount,
      sortable: true,
    },
    {
      name: <>{text_description}</>,
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: <>{text_edit}</>,
      selector: (row) => (
        <button
          className="EditBtn"
          onClick={() => [EditBonus(row), setupdateData(!updateData)]}
        >
          {" "}
          {text_edit}
        </button>
      ),
      sortable: true,
      width: "170px",
    },
    {
      name: <>{text_delete}</>,
      selector: (row) => (
        <button className="ViewBtn" onClick={() => deleteBonus(row._id)}>
          {" "}
          {text_delete}
        </button>
      ),
      sortable: true,
      width: "170px",
    },
  ];
  const FilteredCurrency = CountryCodewithEmoji.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(Country.toLowerCase()) !== -1
  );

  const filteredItems = BonusList?.filter((item) => JSON.stringify(item));

  return (
    <>
      <Header />
      <div className="p-4  ">
        <h2 className="text-center">
          <u>{txtbonus}</u>
        </h2>
        <div className="row mx-3">
          <div className="col-md-2 mt-5">
            <h4 className="appraisal-header-text">
              {text_selectEmployee}
              <span className="Star">*</span>
            </h4>
            <select
              id="currency"
              className="appraiserinput appraisalPageInput w-75"
              value={selectEmployee}
              onChange={(e) => [
                setSelectEmployee(e.target.value),
                setErrSelectEmployee(""),
              ]}
            >
              <option disabled value={"Select"}>
                {text_selectEmployee}
              </option>
              {AllEmpListOfSelectedCmp?.map((val) => {
                return (
                  <option
                    value={val?._id}
                    disabled={updateData === true ? true : false}
                  >
                    {val?.firstName + val?.lastName}
                  </option>
                );
              })}
            </select>
            <p className="error_sty">{errSelectEmployee}</p>
          </div>
          <div className="col-md-2 mt-5">
            <h4 className="appraisal-header-text">
              <>{text_Currency}</>
            </h4>
            <select
              id="currency"
              className="appraiserinput appraisalPageInput w-75"
              value={currencySymbol}
              onChange={(e) => [setCurrencySymbol(e.target.value)]}
            >
              <option selected>{text_currency}</option>
              {FilteredCurrency.map((e, index) => (
                <>
                  <option key={index} value={e.symbol}>
                    {e.currency}
                    &nbsp;&nbsp;
                    {"(" + e.symbol + ")"} {"(" + e.abbreviation + ")"}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="col-md-2 mt-5">
            <h4 className="appraisal-header-text">
              {text_Amount}
              <span className="Star">*</span>
            </h4>
            <input
              type="number"
              onKeyDown={(evt) =>
                evt.which !== 8 &&
                evt.which !== 0 &&
                (evt.which < 48 || evt.which > 57) &&
                evt.preventDefault()
              }
              min={0}
              className="appraiserinput appraisalPageInput w-75"
              placeholder={please_enter_amount}
              onChange={(e) => [setAmount(e.target.value), setErrAmount("")]}
              value={Amount}
            />
            <p className="error_sty">{errAmount}</p>
          </div>
          <div className="col-md-2  mt-5">
            <h4>{text_date}</h4>
            <DatePicker
              popperPlacement="bottom"
              dateFormat="MMM dd,yyyy"
              placeholder="Select Date"
              selected={startDate}
              id="CountryInputbox1"
              className="appraisal-header-text appraiserinput appraisalPageInput w-75"
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="col-md-2  mt-5">
            <h4 className="appraisal-header-text">{text_description}</h4>
            <input
              type="text"
              className="appraiserinput appraisalPageInput w-75"
              placeholder={text_description_ph}
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
            />
          </div>
        </div>
        <div className="d-flex mt-2 justify-content-center gap-2">
          <button className="btncancel" onClick={() => navigate(-1)}>
            {cancleBtn}
          </button>
          &nbsp;
          {updateData === true ? (
            <button
              className="btnsave"
              onClick={handleEditBonus}
              disabled={Disableupadte}
            >
              {text_update}
            </button>
          ) : (
            <button
              className="btnsave"
              onClick={handleBonus}
              disabled={DisableSave}
            >
              {button_save}
            </button>
          )}
        </div>
        <center>
          <div className="datatable_size">
            {IsLoading ? (
              <div className="mt-5 mb-5 d-flex justify-content-center">
                <Loader />
              </div>
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={filteredItems}
                  pagination
                  fixedHeader
                  selectableRowsHighlight
                  highlightOnHover
                  customStyles={customTableStyles}
                  subHeader
                />
              </>
            )}
          </div>
        </center>
      </div>
      <ToastContainer />
    </>
  );
}

export default Bonus;
