import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { Link, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { CgCloseO } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { Divider } from "@mui/material";
import dayjs from "dayjs";

import RandomeText from "../../utils/RandomeText";
import { infoToast, successToast, warnToast } from "../../utils/Helper";
import { CountryCodewithEmoji, Currency } from "../../utils/data";
import Cookie from "js-cookie";
import FileSaver from "file-saver";
function SubscribtionCreate() {
  const navigate = useNavigate();
  const _orgId = sessionStorage.getItem(
    GlobalConstants.session_current_company_id
  );
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const [filterText, setFilterText] = useState("");
  const [SubscribtionFileDate, setSubscribtionFileDate] = useState(new Date());
  const [subFileName, setsubFileName] = useState("");
  const [subFileID, setsubFileID] = useState(RandomeText(7));
  const [errsubscfile, setErrsubscfile] = useState("");
  //language variable
  //old language
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable, setSaveDisable] = useState(false);
  const [savepopoupDisable, setSavePopoupDisable] = useState(false);
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_btn_addSubscription, setText_btn_addSubscription] = useState(
    "Create Subscription"
  );
  const [text_addsubscription, setText_addsubscription] = useState(
    "Add Subscription Data"
  );
  const [text_subscriptionfile, setText_subscriptionfile] = useState(
    "Subscription File Name"
  );
  const [text_subscriptionid, setText_subscriptionid] = useState(
    "Subscription File ID"
  );
  const [viewtempv3, setViewtempv3] = useState("View Template");
  const [text_ph_fileID, setText_ph_fileID] = useState("Enter File ID");
  const [preparedby_text, setPreparedby_text] = useState("Prepared By");
  const [DeptIDTextV3, setDeptIDTextV3] = useState("Department ID");
  const [ProjectIDTextv3, setProjectIDTextv3] = useState("Project ID");
  const [CustomerIDTextv3, setCustomerIDTextv3] = useState("Customer ID");
  const [update_data, setUpdate_data] = useState("Update Data");
  const [text_update, setText_update] = useState("Update");
  const [text_addnewdata, setText_addnewdata] = useState("Add New Data");
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [subacription_reportv3, setSubacription_reportv3] = useState(
    "Subscription Report Template"
  );
  const [subscription_viewv3, setSubscription_viewv3] = useState(
    "View Subscription Template"
  );
  const [deptid_textph, setDeptid_textph] = useState("Enter Department ID");
  const [projectid_textph, setProjectid_textph] = useState("Enter Project ID");
  const [customerid_text, setCustomerid_text] = useState("Enter Customer ID");
  //new
  const [text_subscription_filename, setText_subscription_filename] = useState(
    "Enter Subscription File Name"
  );
  const [text_date_subscription, setText_date_subscription] =
    useState("Subscription Date");
  const [text_errsubscfile, setText_errsubscfile] = useState(
    "Please Enter Subscription File Name"
  );
  const [subscription_seltemp, setSubscription_seltemp] = useState(
    "Select Subscription Template"
  );
  const [invoice_errcurrency, setInvoice_errcurrency] = useState(
    "Please Select Currency"
  );

  //variable
  const [subscriptionProfileId, setsubscriptionProfileId] = useState();
  const [columns, setcolumns] = useState([]);
  const [popupEdit, setPopupEdit] = useState(false);
  console.log(popupEdit);
  const [updateRecID, setupdateRecID] = useState();
  const [subscriptiondata, setSubscriptionData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [ViewPopup, setViewPopup] = useState(false);
  const [SelectedTemplateName, setSelectedTemplateName] = useState("");
  const [SelectedTempView, setSelectedTempView] = useState([]);

  const [NewAllSubscriptionTemplateList, setNewAllSubscriptionTemplateList] =
    useState([]);

  const [SelectedTemplateID, setSelectedTemplateID] = useState("");

  const filteredItems = subscriptiondata.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_addsubscription(
      doc.querySelector("string[name='text_addsubscription']")?.textContent
    );
    setText_subscriptionfile(
      doc.querySelector("string[name='text_subscriptionfile']")?.textContent
    );
    setText_subscriptionid(
      doc.querySelector("string[name='text_subscriptionid']")?.textContent
    );
    setText_btn_addSubscription(
      doc.querySelector("string[name='text_btn_addSubscription']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_ph_fileID(
      doc.querySelector("string[name='text_ph_fileID']")?.textContent
    );
    setDeptIDTextV3(
      doc.querySelector("string[name='DeptIDTextV3']")?.textContent
    );
    setProjectIDTextv3(
      doc.querySelector("string[name='ProjectIDTextv3']")?.textContent
    );
    setCustomerIDTextv3(
      doc.querySelector("string[name='CustomerIDTextv3']")?.textContent
    );
    setUpdate_data(
      doc.querySelector("string[name='update_data']")?.textContent
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent
    );

    setText_addnewdata(
      doc.querySelector("string[name='text_addnewdata']")?.textContent
    );
    setViewtempv3(doc.querySelector("string[name='viewtempv3']")?.textContent);
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
    );
    setText_subscription_filename(
      doc.querySelector("string[name='text_subscription_filename']")
        ?.textContent
    );
    setText_date_subscription(
      doc.querySelector("string[name='text_date_subscription']")?.textContent
    );
    setText_errsubscfile(
      doc.querySelector("string[name='text_errsubscfile']")?.textContent
    );
    setSubscription_viewv3(
      doc.querySelector("string[name='subscription_viewv3']")?.textContent
    );
    setDeptid_textph(
      doc.querySelector("string[name='deptid_textph']")?.textContent
    );
    setProjectid_textph(
      doc.querySelector("string[name='projectid_textph']")?.textContent
    );
    setCustomerid_text(
      doc.querySelector("string[name='customerid_text']")?.textContent
    );
    setSubacription_reportv3(
      doc.querySelector("string[name='subacription_reportv3']")?.textContent
    );
    setPreparedby_text(
      doc.querySelector("string[name='preparedby_text']")?.textContent
    );
    setSubscription_seltemp(
      doc.querySelector("string[name='subscription_seltemp']")?.textContent
    );
    setInvoice_errcurrency(
      doc.querySelector("string[name='invoice_errcurrency']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getColumnData = (_orgId) => {
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/msubscription/insertmsubscriptionprofile?type=select";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const d = { _orgId: _orgId };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data.data;
        setNewAllSubscriptionTemplateList(res);
        if (res.length === 0) {
          infoToast("Set Subscription profile");
          return;
        }
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
      });
  };

  const SubscriptionTableData = () => {
    if (SelectedTemplateID === "") {
      return;
    }
    var SelectedTemp = NewAllSubscriptionTemplateList?.filter(
      (val) => val._id === SelectedTemplateID
    );
    var list = SelectedTemp[0].breakuplist;
    setSelectedTempView(list);
    setsubscriptionProfileId(SelectedTemplateID);

    var col = [
      {
        name: "action",
        width: "140px",
        selector: (row) => (
          <div className="d-flex">
            <FaRegEdit
              className="btn-edit"
              onClick={() => actionRecord(row, "edit")}
            />

            <RiDeleteBin5Fill
              className="btn-edit"
              onClick={() => actionRecord(row, "delete")}
            />
          </div>
        ),
      },
      {
        name: "Sr No.",
        width: "100px",
        selector: (row, index) => index + 1,
      },
    ];
    list.map((item, i) => {
      var id = item._id;
      var c = {
        name: item.category,
        selector: (row) => row[id],
        id: item._id,
        datatype:
          item.datatype === undefined || item.datatype === ""
            ? "text"
            : item.datatype,
        cell: (row) => (
          <div
            style={{ color: item.datatype === "file" ? "blue" : "" }}
            onClick={() =>
              downloadFile(
                row[id + ".filekey"],
                row[id + ".filepath"],
                item.datatype
              )
            }
          >
            {row[id]}
          </div>
        ),
      };
      col.push(c);
    });
    setcolumns(col);
    setDynamicDataFromServer(col, SelectedTemplateID);
  };
  useEffect(() => {
    SubscriptionTableData();
  }, [SelectedTemplateID]);
  const exportdata = (subscriptionProfileId) => {
    var type = "typeexportsubscription";

    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/subscription/addupdatesubscription?type=" +
      type;

    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      subscriptionProfileId: subscriptionProfileId,
      subscriptionlist: [],
      subscriptionRecordId: "na",
    };

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data.data;
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
      });
  };
  useEffect(() => {
    if (columns.lenght > 0) {
      return;
    }
    getColumnData(_orgId);
  }, [_orgId]);
  const saveToFileSystem = (response, filekey) => {
    const filename = filekey;
    FileSaver.saveAs(response, filename);
  };
  const downloadFile = (filekey, filepath, datatype) => {
    if (datatype === "file") {
      var filekey = filekey;

      var employeeId = sessionStorage.getItem(
        GlobalConstants.session_current_emp_id
      );

      var apiUrl =
        GlobalConstants.Cdomain +
        `/API/moramba/v3/download/file?filekey=${filekey}&employeeId=${employeeId}`;
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
          saveToFileSystem(response.data, filekey);
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
  };
  const actionRecord = (row, op) => {
    console.log("IN CLICK||MODE:" + op);
    if (op === "delete") {
      if (window.confirm("Delete the item?")) {
        var d = {
          _partition: GlobalConstants._partition,
          createdby: sessionStorage.getItem("username"),
          _orgId: _orgId,
          empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
          subscriptionProfileId: row.subscriptionProfileId,
          subscriptionlist: [],
          subscriptionRecordId: row.rec_id,
        };
        const type = "delete";
        const apiUrl =
          GlobalConstants.Cdomain +
          "/API/moramba/v3/crud/collection/subscription/addupdatesubscription?type=" +
          type;

        let headerConfig = {
          headers: {
            accept: "application/json",
            authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        axios
          .post(apiUrl, d, headerConfig)
          .then(function (response) {
            var res = response.data.data;
            getColumnData(_orgId);
            SubscriptionTableData();
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
          });
      }
    }
    if (op === "edit") {
      setPopupEdit(true);
      var arr = [row.item];

      console.log(arr);
      var list = [];
      for (var key in row) {
        if (
          key !== "subscriptionProfileId" &&
          key !== "rec_id" &&
          key !== "item" &&
          key.search("filekey") < 0 &&
          key.search("filepath") < 0
        ) {
          var AR = arr[0];
          let obj = AR.filter((o) => o.categoryId === key);

          list.push({
            categoryId: key,
            categoryValue: row[key],
            categoryName: obj[0].categoryName,
            datatype: obj[0].datatype,
          });
        } else {
          if (key === "subscriptionProfileId") {
          }
          if (key === "rec_id") {
            setupdateRecID(row[key]);
          }
        }
      }
      setInputFields(list);
      setsubmitData([]);
    }
  };
  const setDynamicDataFromServer = (col, subscriptionProfileId) => {
    var type = "select";

    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/subscription/addupdatesubscription?type=" +
      type;

    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      subscriptionProfileId: subscriptionProfileId,
      subscriptionlist: [],
      subscriptionRecordId: "na",
    };

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data.data;
        // console.log(response);

        var cdArr = [];
        res.map((item, i) => {
          var l = item.subscriptionlist;
          var rec_id = item.subscriptionRecordId;
          var subscriptionProfileId = item.subscriptionProfileId;
          var cd = {};
          l.map((it, i) => {
            var id = it.categoryId;
            var categoryName = it.categoryName;
            cd[id] = it.datatype === "file" ? "View" : it.categoryValue;
            cd["rec_id"] = rec_id;
            cd["subscriptionProfileId"] = subscriptionProfileId;
            cd["item"] = l;
            cd[id + ".filekey"] = it.filekey;
            cd[id + ".filepath"] = it.filepath;
          });
          cdArr.push(cd);
        });
        setSubscriptionData(cdArr);
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
      });
  };
  const [submitData, setsubmitData] = useState([]);
  const ValidationPopup = () => {
    setPopup(true);
    infoToast("Please Fill All the Values Before Saving!");
  };
  const handleSubmit = () => {
    if (columns.length !== submitData.length + 2) {
      setSavePopoupDisable(false);
      return ValidationPopup();
    }
    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      subscriptionProfileId: subscriptionProfileId,
      subscriptionlist: submitData,
      subscriptionRecordId: "na",
    };

    const type = "insert";
    setSavePopoupDisable(true);
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/subscription/addupdatesubscription?type=" +
      type;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        setSavePopoupDisable(false);
        setsubmitData([]);
        setPopup(false);
        getColumnData(_orgId);
        SubscriptionTableData();
        successToast("Item Added Successfully!");
      })
      .catch(function (error) {
        console.log(error);
        setSavePopoupDisable(false);
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

  const [inputFields, setInputFields] = useState([]);

  const handleSubmitEdit = () => {
    if (submitData.length === 0) {
      infoToast("You Had made no Changes!");
      setTimeout(() => {
        setPopupEdit(false);
      }, 1500);
      return;
    }
    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      subscriptionProfileId: subscriptionProfileId,
      subscriptionlist: submitData,
      subscriptionRecordId: updateRecID,
    };

    const type = "update";

    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/subscription/addupdatesubscription?type=" +
      type;

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        getColumnData(_orgId);
        SubscriptionTableData();
        setPopupEdit(false);
        successToast("Item Edited Successfully!");
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
      });
  };

  const handleFormChange = (index, event, datatype) => {
    let data = [...inputFields];
    data[index]["categoryValue"] =
      datatype === "file" ? event.target.files[0] : event.target.value;
    setInputFields(data);
  };
  const setDynamicData = (breakup_id, name, val, datatype) => {
    var filestatus = "na";
    var filekey = "na";
    var filepath = "na";
    if (datatype === "file") {
      var fileToUpload = val;
      if (fileToUpload === undefined || fileToUpload === null) {
        return;
      }
      //uploading file on server
      var apiUrl = GlobalConstants.Cdomain + "/API/moramba/v3/upload/file";

      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const formData = new FormData();
      formData.append("document", fileToUpload);
      axios
        .post(apiUrl, formData, headerConfig)
        .then(function (response) {
          var res = response.data.data;
          if (res.path !== "") {
            filestatus = "Drafted";
            filekey = res.filekey;
            filepath = res.path;
            var list = submitData.filter(removeExistId);
            function removeExistId(item) {
              return item.categoryId !== breakup_id;
            }
            list.push({
              categoryId: breakup_id,
              categoryValue: filepath,
              categoryName: name,
              datatype: datatype,
              filestatus: datatype === "file" ? filestatus : "na",
              filekey: datatype === "file" ? filekey : "na",
              filepath: datatype === "file" ? filepath : "na",
            });
            setsubmitData(list);
            // console.log(list);
          }
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
    } else {
      var list = submitData.filter(removeExistId);
      function removeExistId(item) {
        return item.categoryId !== breakup_id;
      }
      list.push({
        categoryId: breakup_id,
        categoryValue: val,
        categoryName: name,
        datatype: datatype,
        filestatus: datatype === "file" ? filestatus : "na",
        filekey: datatype === "file" ? filekey : "na",
        filepath: datatype === "file" ? filepath : "na",
      });
      setsubmitData(list);
    }
  };

  const SaveValidation = () => {
    let saveValidationform = true;
    if (subFileName === "") {
      saveValidationform = false;
      setErrsubscfile(<>*{text_errsubscfile}!</>);
    }
    setSaveDisable(false);
    return saveValidationform;
  };
  const [CustomerID, setCustomerID] = useState("");
  const [DepartmentID, setDepartmentID] = useState("");
  const [ProjectID, setProjectID] = useState("");
  const handleaddSubscriptionData = () => {
    if (SaveValidation()) {
      if (subscriptiondata.length === 0) {
        return warnToast("Please Add Data First!");
      }
      // console.log("Done");
      setSaveDisable(true);
      var NewSubscriptionData = filteredItems.map((value) => {
        return value.rec_id;
      });
      console.log(NewSubscriptionData);
      var data = {
        CustomerId: CustomerID,
        DepartmentId: DepartmentID,
        ProjectId: ProjectID,
        employeeId: sessionStorage.getItem(
          GlobalConstants.session_current_emp_id
        ),
        _orgId: _orgId,
        templeteName: subFileName,
        templeteId: subFileID,
        createdBy: sessionStorage.getItem("username"),
        createdDate: dayjs(SubscribtionFileDate).format("MMM DD,YYYY"),
        _partition: GlobalConstants._partition,
        updatedBy: sessionStorage.getItem("username"),
        updatedDate: dayjs(SubscribtionFileDate).format("MMM DD,YYYY"),
        subscriptionRecordIdList: NewSubscriptionData,
      };
      const type = "insert";
      const apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/subscriptiondata/addsubscriptiondata?type=" +
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
          successToast("Subscription Report Created Successfully!");
          setPopup(false);
          getColumnData(_orgId);
          setTimeout(() => {
            setSaveDisable(false);
            navigate(`/report`, {
              state: {
                data: 2,
              },
            });
          }, 1500);
        })
        .catch(function (error) {
          console.log(error);
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
  const handleopenPopup = () => {
    console.log(columns.length);
    if (columns.length === 0) {
      infoToast("Please Select Template First");
      setPopup(false);
    } else {
      setPopup(true);
    }
  };
  return (
    <>
      <Header />
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">
        {text_addsubscription}
      </h3>
      <div
        className={
          popupEdit === true || popup === true || ViewPopup === true
            ? "bgblur1 container containerBox mt-4 p-2"
            : "container containerBox mt-4 p-2"
        }
      >
        <div className="text-center">
          <h4>
            {subacription_reportv3}
            <span className="Star">*</span>:
          </h4>
          <select
            className="CountryInputbox1 me-3"
            onChange={(e) => setSelectedTemplateID(e.target.value)}
          >
            <option selected disabled>
              {subscription_seltemp}
            </option>
            {NewAllSubscriptionTemplateList.map((List) => {
              return <option value={List._id}>{List.templatename}</option>;
            })}
          </select>
          {SelectedTemplateID !== "" && (
            <button
              className="ViewBtn p-2 exp-create-view-btn"
              onClick={() => setViewPopup(true)}
            >
              {viewtempv3}
            </button>
          )}
        </div>
        <div className="row p-5">
          <div className="col-md-3">
            <h4>
              {text_subscriptionfile}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              value={subFileName}
              placeholder={text_subscription_filename}
              onChange={(e) => [
                setsubFileName(e.target.value),
                setErrsubscfile(""),
              ]}
              className="salarytypeInput"
            />
            <p className="error_sty">{errsubscfile}</p>
          </div>
          <div className="col-md-3 sub-create-fields">
            <h4>{text_subscriptionid}</h4>
            <input
              type="text"
              placeholder={text_ph_fileID}
              value={subFileID}
              className="salarytypeInput"
            />
          </div>
          <div className="col-md-3 sub-create-fields">
            <h4>
              {text_date_subscription}
              <span className="Star">*</span>
            </h4>
            <DatePicker
              selected={SubscribtionFileDate}
              dateFormat="MMM dd,yyyy"
              showMonthDropdown
              showYearDropdown
              onChange={(date) => setSubscribtionFileDate(date)}
              className="Inputbox salarytypeInput"
              dropdownMode="select"
            />
          </div>
          <div className="col-md-3 exp-create-inputfields">
            <h4>{preparedby_text}</h4>
            <input
              value={sessionStorage.getItem("username").split("@")[0]}
              disabled
              className="salarytypeInput"
            />
          </div>
          <div className="row p-3">
            <div className="col-md-3 exp-create-inputfields-2">
              <h4>{DeptIDTextV3}</h4>
              <input
                type={"text"}
                placeholder={deptid_textph}
                onChange={(e) => setDepartmentID(e.target.value)}
                className="salarytypeInput"
              />
            </div>
            <div className="col-md-3 exp-create-inputfields">
              {" "}
              <h4>{ProjectIDTextv3}</h4>
              <input
                type={"text"}
                placeholder={projectid_textph}
                onChange={(e) => setProjectID(e.target.value)}
                className="salarytypeInput"
              />
            </div>
            <div className="col-md-3 exp-create-inputfields">
              <h4>{CustomerIDTextv3}</h4>
              <input
                type={"text"}
                placeholder={customerid_text}
                onChange={(e) => setCustomerID(e.target.value)}
                className="salarytypeInput"
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="text-end">
          <button className="CreateBtn mt-4" onClick={handleopenPopup}>
            + {text_btn_addSubscription}
          </button>
        </div>

        <div className="mt-3">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            customStyles={customTableStyles}
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <div className="d-flex justify-content-center align-self-end">
            <Link to="/report">
              <button className="me-3 btncancel">{button_cancel}</button>
            </Link>{" "}
            <button
              className="btnsave"
              onClick={handleaddSubscriptionData}
              disabled={saveDisable}
            >
              {button_save}
            </button>
          </div>
        </div>
      </div>
      {ViewPopup ? (
        <>
          <div className="inventorypopup  exp-create-view-popup">
            <div className="row text-end text-black mt-3 exp-create-view-popup-content">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setViewPopup(false)} />
              </h3>
            </div>
            <div className="text-center">
              <h4>{subscription_viewv3}</h4>
              <Divider />
              <h5 className="mt-3">
                {text_temp_name}: {SelectedTemplateName}
              </h5>
            </div>
            <div className="mt-4 scrollTable">
              <table className="tableSty zClass">
                <thead>
                  <tr>
                    <td className="tableHeadSty">Sr No.</td>
                    {SelectedTempView?.map((v) => {
                      return (
                        <>
                          <td className="tableHeadSty">{v?.category}</td>
                        </>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tableDataSty">-</td>
                    {SelectedTempView?.map((v) => {
                      return (
                        <>
                          <td className="tableDataSty">-</td>
                        </>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center exp-create-view-popup-btn mb-2 mt-2">
              <button className="btncancel" onClick={() => setViewPopup(false)}>
                {button_cancel}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {popup === true ? (
        <>
          <div className="inventorypopup exp-create-view-popup sub-create-popup">
            <div className="row text-end text-black mt-3">
              <h3 className="close mb-3 p-0 text-black ">
                <CgCloseO onClick={() => setPopup(false)} />
              </h3>
            </div>
            <center>
              <h4 className="categorytext">{text_addnewdata}</h4>
            </center>
            <Divider />
            <div
              className="row m-3 scrollbarAppraisal force-overflow"
              id="style-1"
            >
              <div className="scrollpopupinventory p-2">
                {columns?.length > 0 &&
                  columns?.map(
                    (item, i) =>
                      i !== 0 &&
                      i !== 1 && (
                        <>
                          <div className="row inve-create-popup-content">
                            <div className="col-md-6">
                              <div className="tooltip1">
                                {truncate(item.name, 32)} :
                                <br />
                              </div>
                            </div>
                            <div className="col-md-6">
                              {item.datatype === "currency" ? (
                                <select
                                  className="CountryInputbox1 w-75"
                                  onChange={(e) =>
                                    setDynamicData(
                                      item.id,
                                      item.name,
                                      item.datatype === "file"
                                        ? e.target.files[0]
                                        : e.target.value,
                                      item.datatype
                                    )
                                  }
                                >
                                  <option selected disabled>
                                    {invoice_errcurrency}
                                  </option>
                                  {CountryCodewithEmoji.map((e, index) => (
                                    <>
                                      <option
                                        key={index}
                                        value={
                                          e.symbol + "(" + e.abbreviation + ")"
                                        }
                                      >
                                        {"(" + e.symbol + ")"} {e.abbreviation}
                                      </option>
                                    </>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  className="inputbox sub-create-popup-price"
                                  type={item.datatype}
                                  onChange={(e) =>
                                    setDynamicData(
                                      item.id,
                                      item.name,
                                      item.datatype === "file"
                                        ? e.target.files[0]
                                        : e.target.value,
                                      item.datatype
                                    )
                                  }
                                />
                              )}
                            </div>
                          </div>
                          <br />
                        </>
                      )
                  )}
              </div>
            </div>
            <div className="text-center sub-create-popup-btns">
              <button className="btncancel" onClick={() => setPopup(false)}>
                {button_cancel}
              </button>{" "}
              <button
                className="btnsave mt-2"
                onClick={handleSubmit}
                disabled={savepopoupDisable}
              >
                {button_save}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {popupEdit === true ? (
        <div
          className="addstaffpopupsubsc sub-create-popup"
          id="#popupinvetory"
        >
          <div className="row text-end">
            <h3 className="close m-2 ">
              <CgCloseO onClick={() => setPopupEdit(false)} />
            </h3>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <center>
                <h4>{update_data}</h4>
              </center>
            </div>
          </div>

          <hr />
          <div className="scrollpopupinventory p-2">
            {inputFields?.length > 0 &&
              inputFields?.map((input, index) => (
                <>
                  <div className="row" key={index}>
                    <div className="col-md-6">
                      <div className="tooltip1">
                        {" "}
                        {truncate(input.categoryName, 32)} :
                        <br />
                      </div>{" "}
                    </div>

                    <div className="col-md-6">
                      {input.datatype === "currency" ? (
                        <select
                          className="CountryInputbox1 w-75"
                          value={
                            input.datatype === "file" ? "" : input.categoryValue
                          }
                          onChange={(e) => [
                            setDynamicData(
                              input.categoryId,
                              input.categoryName,
                              input.datatype === "file"
                                ? e.target.files[0]
                                : e.target.value,
                              input.datatype
                            ),
                            handleFormChange(index, e, input.datatype),
                          ]}
                        >
                          {CountryCodewithEmoji.map((e, index) => (
                            <>
                              <option
                                key={index}
                                value={e.symbol + "(" + e.abbreviation + ")"}
                              >
                                {"(" + e.symbol + ")"} {e.abbreviation}
                              </option>
                            </>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="inputbox"
                          type={input.datatype}
                          value={
                            input.datatype === "file" ? "" : input.categoryValue
                          }
                          onChange={(e) => {
                            setDynamicData(
                              input.categoryId,
                              input.categoryName,
                              input.datatype === "file"
                                ? e.target.files[0]
                                : e.target.value,
                              input.datatype
                            );
                            handleFormChange(index, e, input.datatype);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <br />
                </>
              ))}
          </div>
          <hr />
          <div className="text-center sub-create-popup-btns">
            <button className="btncancel" onClick={() => setPopupEdit(false)}>
              {button_cancel}
            </button>{" "}
            <button className="btnsave mt-2" onClick={handleSubmitEdit}>
              {text_update}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SubscribtionCreate;
