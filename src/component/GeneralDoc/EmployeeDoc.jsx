import React, { useEffect, useState } from "react";
import "../GeneralDoc/GeneralDoc.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDoc } from "../../redux/EmployeeDocSlice";
import axios from "axios";
import dayjs from "dayjs";

import { GlobalConstants } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function EmployeeDoc() {
  //Redux code from EmployeeDocSlice
  const Company_Name = sessionStorage.getItem("comp_name");

  const dispatch = useDispatch();
  const EmployeeDocData = useSelector((state) => state.EmployeeDoc);

  //language variable
  //Old Variables
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_create, setText_create] = useState("Create");
  const [text_mark_all, setText_mark_all] = useState("Mark all");
  const [com_enter_category, setCom_enter_category] = useState(
    "Please Enter category"
  );
  const [inventoryvalcate, setInventoryvalcate] = useState(
    "Please Enter Category!"
  );
  const [text_employee_doc, setText_employee_doc] =
    useState("Employee Document");
  const [text_enter_category, setText_enter_category] =
    useState("Enter category");
  //Language Variables Ends

  //variable
  const [empdoclist, setEmpDocList] = useState([]);
  const [addData, setAddData] = useState(false);
  const [textinputenter, setTextinputenter] = useState("");
  const [errcategory, setErrCategory] = useState("");
  const [templateid, setTemplateId] = useState("");
  const [mark_all, setMark_all] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (EmployeeDocData?.length === 0) {
      dispatch(getEmployeeDoc());
      fetchAllEmpDoc();
    } else {
      fetchAllEmpDoc();
    }
  }, [EmployeeDocData?.length]);

  const fetchAllEmpDoc = () => {
    setIsLoading(true);
    var employeedoclist = [];
    for (var i = 0; i < EmployeeDocData.length; i++) {
      setTemplateId(EmployeeDocData[0].templateid);

      employeedoclist.push({
        _id: EmployeeDocData[i]._id,
        category: EmployeeDocData[i].category,
        active: EmployeeDocData[i].active.toString(),
        t_id: EmployeeDocData[i].t_id,
      });
    }

    Promise.all([setEmpDocList(employeedoclist)]).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  };

  const employeedocHandler = () => {
    if (textinputenter !== "") {
      const o = {
        _id: "new",
        category: textinputenter,
        active: false.toString(),
      };
      var listTemp = empdoclist;
      setEmpDocList([...listTemp, o]);
      setTextinputenter("");
      setAddData(false);
    } else {
      setErrCategory(<>*{inventoryvalcate}!</>);
    }
  };

  //API Call
  const saveData = () => {
    const request_start_at = performance.now();

    var body = {
      templatename: "na",
      employeedoclist: empdoclist,
      _orgId: sessionStorage.getItem("_compId"),
      templateid: templateid,
      templateactive: "true",
    };
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/memployeedoccategorylist?type=update";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(apiUrl, body, headerConfig)
      .then(function (response) {
        const request_end_at = performance.now();
        const request_duration = request_end_at - request_start_at;

        if (response.status === 200) {
          fetchAllEmpDoc();
          dispatch(getEmployeeDoc());
          console.log(
            "ID:01302=> " +
              dayjs.utc(request_duration).format("ss.ms") +
              " Seconds"
          );
        }
        successToast(response.data.message);
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

  const onFilterChange = (type, newDoc, event = null, index) => {
    if (type === "update") {
      let data = [...empdoclist];
      data[index]["active"] = event.target.checked.toString();

      setEmpDocList(data);
    }
  };

  //Mark all
  const markAllDoc = (r) => {
    setMark_all(r);
    if (r) {
      onFilterChange("markall", null);
    }
  };

  useEffect(() => {
    let checkAll = document.getElementById("check-all");
    let otherCheckboxes = document.querySelectorAll(
      "input[type=checkbox]:not(#check-all)"
    );

    checkAll.addEventListener("change", onCheckAllChange);
    otherCheckboxes.forEach((input) =>
      input.addEventListener("change", onOtherCheckboxChange)
    );

    function onCheckAllChange() {
      otherCheckboxes.forEach((input) => (input.checked = checkAll.checked));
    }

    function onOtherCheckboxChange() {
      let allChecked = Array.from(otherCheckboxes).every(
        (input) => input.checked
      );
      checkAll.checked = allChecked;
    }
    if (checkAll.checked === true) {
    }
  });

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    // setText_employee_documents(
    //   doc.querySelector("string[name='text_employee_documents']")
    //     ?.textContent
    // );
    setText_employee_doc(
      doc.querySelector("string[name='text_employee_doc']")?.textContent
    );

    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );
    // setText_mark_all(
    //   doc.querySelector("string[name='text_mark_all']")?.textContent
    //
    // );
    setInventoryvalcate(
      doc.querySelector("string[name='inventoryvalcate']")?.textContent
    );

    setText_enter_category(
      doc.querySelector("string[name='text_enter_category']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="containerBox  company_data mt-1" id="mob_company">
        <h3 className="mt-3 mb-4 HeadingText text-center">
          {text_employee_doc}
        </h3>
        <div className="row sty_cmpdoc">
          <div className="col-md-6">
            <h4 className="mt-4">{Company_Name}</h4>
          </div>
          <div className="col-md-6 text-end cmpdocright">
            {addData === true ? (
              <>
                <div className="cmpdoc-main">
                  <input
                    type="text"
                    className="mx-2 companydoc-input"
                    value={textinputenter}
                    placeholder={text_enter_category}
                    onChange={(e) => [
                      setTextinputenter(e.target.value),
                      setErrCategory(""),
                    ]}
                  />
                  <button
                    className="CreateBtn mt-3 cmpdoc-main-savebtn"
                    onClick={employeedocHandler}
                  >
                    {button_save}
                  </button>
                  <button
                    className="btncancel mx-2 cmpdoc-main-cancelbtn"
                    onClick={() => [
                      setAddData(false),
                      setErrCategory(""),
                      setTextinputenter(""),
                    ]}
                  >
                    {button_cancel}
                  </button>
                  <p className="errtext err_doc" id="err_mobile">
                    {errcategory}
                  </p>
                </div>
              </>
            ) : (
              <>
                {" "}
                <button
                  className="CreateBtn mt-3"
                  onClick={() => setAddData(!addData)}
                >
                  + {text_create}
                </button>
              </>
            )}
          </div>
          <hr className="mt-3 hr_sty" id="hrMob" />
        </div>
        <input
          type="checkbox"
          className="CheckboxDoc mx-5"
          id="check-all"
          value="Mark All"
          onChange={(e) => markAllDoc(e.target.value)}
        />{" "}
        {text_mark_all}
        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="doc_data_scroll" id="scroll_mobile">
              <div className="d-flex flex-wrap justify-content-start ">
                {empdoclist.map((item, i) => {
                  return (
                    <>
                      <div className="mainboxcheckboxsty" id="mobcheck">
                        <input
                          type="checkbox"
                          className="CheckboxDoc mx-5"
                          value={item?.category}
                          defaultChecked={item?.active === "true"}
                          onChange={(e) => onFilterChange("update", item, e, i)}
                          name={item?.category}
                        />{" "}
                        <span className="categ_mob">{item?.category}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="row mt-5 mb-3">
              <center>
                <Link to="/dashboard">
                  <button className="btncancel">{button_cancel}</button>
                </Link>{" "}
                &nbsp; &nbsp;
                <button className="btnsave" onClick={saveData}>
                  {button_save}
                </button>
              </center>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default EmployeeDoc;
