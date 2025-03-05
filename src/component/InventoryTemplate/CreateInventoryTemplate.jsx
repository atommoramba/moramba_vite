import React, { useState, useEffect } from "react";
import "./InventoryTemplateList.css";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from 'dayjs'

import axios from "axios";
import { useDispatch } from "react-redux";
import { getInventoryTemplate } from "../../redux/InventoryTemplateSlice";
import Cookie from "js-cookie";



function CreateInventoryTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let data = useLocation();
  const updateInventorydata = data.state != null ? data.state.data : "";
  const Company_Name = sessionStorage.getItem("comp_name");
  // old language variable
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_Enter_template, setText_enter_template] = useState(
    "Enter Template Name"
  );
  const [
    salaryBreakupTypeEffectiveDateHead,
    setSalaryBreakupTypeEffectiveDateHead,
  ] = useState("Effective Date");
  const [text_add_new_category, setText_add_new_category] =
    useState("Add New Category");
  const [text_enter_category, setText_enter_category] =
    useState("Enter category");
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable, setSaveDisable] = useState(false);
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [inventoryvalcate, setInventoryvalcate] = useState(
    "Please Enter Category!"
  );
  const [text_date, setText_date] = useState("Date");
  const [typetext, setTypetext] = useState("text");
  const [typenumber, setTypenumber] = useState("number");
  const [typefile, setTypefile] = useState("file");
  const [categoryText, setCategoryText] = useState("Category");
  const [addBtn, setAddBtn] = useState("Add");

  // new language variable
  const [text_err_template, setText_err_template] = useState(
    "Please Enter Template Name"
  );
  const [text_create_inventoryTemp, setText_create_inventoryTemp] = useState(
    "Create Inventory Template"
  );
  const [text_DataType, setText_DataType] = useState("Data Type");
  const [text_defualt_fields, setText_defualt_fields] =
  useState("Default Fields");
  const [text_customField, setText_customField] = useState("Custom Fields");
  //variable
  const [popupData, setPopupData] = useState([]);
  const [category, setCategory] = useState("");
  const [DTSelected, setDTSelected] = useState("text");
  const [template, setTemplate] = useState("");
  const [selectdate, setSelectDate] = useState(new Date());
  const [popup, setPopup] = useState(false);
  const [errTemplate, setErrTemplate] = useState("");
  const [DefaultVar, setDefaultVar] = useState([]);

  //Error variable
  const [errorCategory, setErrorCategory] = useState("");

  const getDefaultVar = () => {
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/collection/default_template_variable";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var res = response.data;
        console.log(res);
        var g = res.data?.filter(function (j) {
          return j.templatename === "inventory_template";
        });
        setDefaultVar(g?.[0].variablelist);
      })
      .catch(function (error) {
        var err = error.response.data;
        console.log(err);
        errorToast(err);
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
    getDefaultVar();
  }, []);

  const changeDefaultVar = (d, e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setPopupData((current) => [
        ...current,
        {
          active: false,
          amount: "2000",
          category: d.var_value,
          datatype: d.var_value_type,
          description: "NA",
          ord: 1,
        },
      ]);
    } else {
      const newVar = popupData.filter(checkExisting);
      setPopupData(newVar);
    }

    function checkExisting(g) {
      return g.category !== d.var_value;
    }
  };

  const handleClickOpen = () => {
    setPopup(!popup);
  };
  const closePopup = () => {
    setPopup(false);
    setErrorCategory("");
    setCategory("");
  };

  //Validation
  const popupValidation = () => {
    let addValidation = true;
    if (category === "") {
      addValidation = false;
      setErrorCategory(<>*{inventoryvalcate}!</>);
    }
    return addValidation;
  };

  //popup Data Submit
  const dataHandleClick = () => {
    if (popupValidation() === true) {
      setPopupData((current) => [
        ...current,
        {
          active: true,
          amount: "2000",
          category: category,
          datatype: DTSelected,
          description: "NA",
        },
      ]);
      closePopup();
    }
  };

  //valiadtion
  const inventoryValidation = () => {
    var addValidation = true;
    if (popupData?.length === 0) {
      addValidation = false;
      infoToast("Please add new category!");
    }
    if (template === "") {
      addValidation = false;
      setErrTemplate(<>*{text_err_template}</>);
    }
    setSaveDisable(false);
    return addValidation;
  };

  const handleAdd = () => {
    if (inventoryValidation()) {
      setSaveDisable(true);
      var _orgId = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      var compid = sessionStorage.getItem("_compId");
      var type = "insert";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/minventory/insertminventoryprofile?type=" +
        type;

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const d = {
        effectiveDate: dayjs(selectdate).format("MMM DD,YYYY"),
        _partition: GlobalConstants._partition,
        _orgId: _orgId,
        orgId: compid,
        country: "india",
        breakuplist: popupData,
        templatename: template,
        isActive: true,
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var res = response.data;
          successToast("Template Added successfully");
          dispatch(getInventoryTemplate());
          setTimeout(() => {
            navigate(`/managetemplate`, {
              state: {
                data: 1,
              },
            });
          }, 1000);
        })
        .catch(function (error) {
          var err = error.response.data;
          errorToast(err);
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

  useEffect(() => {
    if (updateInventorydata !== "") {
      if (popupData.length !== 0) {
        return;
      }
      var list = updateInventorydata.breakuplist;
      list.map((v, i) => {
        if (popupData.length !== 0) {
          return;
        }
        setPopupData((current) => [
          ...current,
          {
            active: true,
            amount: "2000",
            category: v.category,
            datatype: v.datatype === undefined ? "text" : v.datatype,
            description: "NA",
          },
        ]);
      });
      setTemplate(updateInventorydata.templatename);
      var EffectiveDateEdit = updateInventorydata.effectiveDate;
      setSelectDate(new Date(EffectiveDateEdit));
    }
  }, []);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
        
    );
    setText_add_new_category(
      doc.querySelector("string[name='text_add_new_category']")
        ?.textContent
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
        
    );
    setSalaryBreakupTypeEffectiveDateHead(
      doc.querySelector(
        "string[name='salaryBreakupTypeEffectiveDateHead']",
        doc
      )?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
        
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
        
    );
    setInventoryvalcate(
      doc.querySelector("string[name='inventoryvalcate']")
        ?.textContent
    );
    setText_date(
      doc.querySelector("string[name='text_date']")?.textContent
    );
    setTypetext(
      doc.querySelector("string[name='typetext']")?.textContent
    );
    setTypenumber(
      doc.querySelector("string[name='typenumber']")?.textContent
        
    );
    setTypefile(
      doc.querySelector("string[name='typefile']")?.textContent
    );
    setText_enter_category(
      doc.querySelector("string[name='text_enter_category']")
        ?.textContent
    );
    setText_enter_template(
      doc.querySelector("string[name='text_Enter_template']")
        ?.textContent
    );
    setCategoryText(
      doc.querySelector("string[name='categoryText']")?.textContent
        
    );
    setAddBtn(
      doc.querySelector("string[name='addBtn']")?.textContent
    );
    setText_err_template(
      doc.querySelector("string[name='text_err_template']")
        ?.textContent
    );
    setText_create_inventoryTemp(
      doc.querySelector("string[name='text_create_inventoryTemp']")
        ?.textContent
    );
    setText_DataType(
      doc.querySelector("string[name='text_DataType']")?.textContent
        
    );
    setText_defualt_fields(
      doc.querySelector("string[name='text_defualt_fields']")?.textContent
        
    );
    setText_customField(
      doc.querySelector("string[name='text_customField']")?.textContent
        
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
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">
        {text_create_inventoryTemp}
      </h3>
      <div
        className={
          popup === true
            ? "container bgblur1 containerBox mt-4 p-2"
            : "container containerBox mt-4 p-2"
        }
      >
        <div className="row">
          <div className="col-md-6">
            <h3 className="mt-5 p-2">{Company_Name}</h3>
          </div>
          <div className="col-md-6 text-end">
            <button className="mt-5 p-1 addnewBtn" onClick={handleClickOpen}>
              +{text_add_new_category}{" "}
            </button>
          </div>
        </div>
        <hr />
        <div className="row p-2">
          <div className="col-md-4">
            <h4>
              {text_temp_name}
              <span className="Star">*</span> :
            </h4>
            <input
              type="text"
              placeholder={text_Enter_template}
              onChange={(e) => [
                setTemplate(e.target.value),
                setErrTemplate(""),
              ]}
              value={template}
            />
            <p className="sperrtext">{errTemplate}</p>
          </div>
          <div className="col-md-4 inv-temp-date-input-div">
            <h4>
              {salaryBreakupTypeEffectiveDateHead}
              <span className="Star">*</span> :
            </h4>
            <DatePicker
              selected={selectdate}
              dateFormat="MMM dd,yyyy"
              onChange={(date) => setSelectDate(date)}
            />
          </div>
        </div>
        <hr />
        <h4>{text_defualt_fields}:</h4>
        <div className="d-flex flex-wrap justify-content-start px-2 gap-5 my-3">
          {DefaultVar.map((value) => {
            return (
              <>
                <div className="defaultVariableSection">
                  <input
                    type="checkbox"
                    id={value?.var_key}
                    name="dynamic_name"
                    value="dynamic_name"
                    className="me-2"
                    onChange={(e) => changeDefaultVar(value, e)}
                  />
                  <label>{value?.var_value}</label>
                </div>
              </>
            );
          })}
        </div>
        {popupData.length > 0 && <h4>{text_customField}:</h4>}
        <div className="row px-2">
          <h5>
            {popupData.map((value) => {
              return (
                <>
                  <ul>
                    <li>{value.category}</li>
                  </ul>
                </>
              );
            })}
          </h5>
        </div>
        <div className="row">
          <center>
            <Link to="/managetemplate" state={{ data: 1 }}>
              <button className="btncancel">{button_cancel}</button>
            </Link>
            &nbsp; &nbsp;
            <button
              className="btnsave"
              onClick={handleAdd}
              disabled={saveDisable}
            >
              {button_save}
            </button>
          </center>
        </div>
      </div>

      {popup ? (
        <div className="main">
          <div className="popup create-inventory-temp-popup">
            <div className="text-end">
              <h3 className="close mb-3 p-0" id="closeMob">
                <CgCloseO onClick={closePopup} />
              </h3>
            </div>
            <center>
              <h4 className="categorytext">{text_add_new_category}</h4>
            </center>
            <hr />
            <div className="row popup-cat-adj">
              <div className="col-md-6">
                <h5>
                  {categoryText}
                  <span className="Star">*</span> :
                </h5>
                <input
                  type="text"
                  placeholder={text_enter_category}
                  onChange={(e) => [
                    setCategory(e.target.value),
                    setErrorCategory(""),
                  ]}
                  className="create-exp-popup-input"
                />
                <p className="sperrtext">{errorCategory}</p>
              </div>

              <div className="col-md-4">
                <h5>{text_DataType} :</h5>
                <select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={DTSelected}
                  onChange={(e) => setDTSelected(e.target.value)}
                  className="CountryInputbox1 create-iv-popup-select"
                >
                  <option value="text">{typetext}</option>
                  <option value="number">{typenumber}</option>
                  <option value="file">{typefile}</option>
                  <option value="date">{text_date}</option>
                </select>
                <br />
                <br />
              </div>

              <hr />
              <div className="row">
                <center>
                  <button className="btncancel" onClick={closePopup}>
                    {button_cancel}
                  </button>{" "}
                  &nbsp; &nbsp;
                  <button className="btnsave" onClick={dataHandleClick}>
                    {addBtn}
                  </button>
                </center>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default CreateInventoryTemplate;
