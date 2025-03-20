import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { Divider } from "@mui/material";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import { infoToast, successToast, warnToast } from "../../utils/Helper";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import RandomeText from "../../utils/RandomeText";
import "../Expense/Expense.css";
import { CountryCodewithEmoji, Currency } from "../../utils/data";
import Cookie from "js-cookie";

function InventoryCreate() {
  const navigate = useNavigate();

  //language variable
  //old language
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_addInventory, setText_addInventory] =
    useState("Add Inventory Data");
  const [text_btn_addInvent, setText_btn_addInvent] =
    useState("Create Inventory");
  const [text_addnewdata, setText_addnewdata] = useState("Add New Data");
  const [text_errfilenamev3, setText_errfilenamev3] = useState(
    "Please Enter Inventory File Name"
  );
  const [preparedby_text, setPreparedby_text] = useState("Prepared By");
  const [DeptIDTextV3, setDeptIDTextV3] = useState("Department ID");
  const [ProjectIDTextv3, setProjectIDTextv3] = useState("Project ID");
  const [CustomerIDTextv3, setCustomerIDTextv3] = useState("Customer ID");
  const [viewtempv3, setViewtempv3] = useState("View Template");
  const [title_Invenreport, setTitle_Invenreport] = useState(
    "Inventory Report Template"
  );
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_inventory_file_name, setText_inventory_file_name] = useState(
    "Inventory File Name"
  );
  const [text_date_inventory, setText_date_inventory] =
    useState("Inventory Date");
  const [text_ph_inventory_filename, setText_ph_inventory_filename] = useState(
    "Enter Inventory File Name"
  );
  const [text_inventory_file_ID, setText_inventory_file_ID] =
    useState("Inventory File ID");
  const [deptid_textph, setDeptid_textph] = useState("Enter Department ID");
  const [projectid_textph, setProjectid_textph] = useState("Enter Project ID");
  const [customerid_text, setCustomerid_text] = useState("Enter Customer ID");
  const [view_inventory_text, setView_inventory_text] = useState(
    "View Inventory Template"
  );
  //new
  const [inventory_seltemplate, setInventory_seltemplate] = useState(
    "Select Inventory Template"
  );
  const [invoice_errcurrency, setInvoice_errcurrency] = useState(
    "Please Select Currency"
  );
  //variable
  const [saveDisable, setSaveDisable] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [report, setReport] = useState([]);
  const [InventoryFileDate, setInventoryFileDate] = useState(new Date());
  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const [inventoryProfileId, setinventoryProfileId] = useState();
  const [columns, setcolumns] = useState([]);
  const [submitData, setsubmitData] = useState([]);
  const [updateRecID, setupdateRecID] = useState();
  const [ViewPopup, setViewPopup] = useState(false);
  const [SelectedTemplateName, setSelectedTemplateName] = useState("");
  const [SelectedTempView, setSelectedTempView] = useState([]);
  const [errfile, setErrfile] = useState("");
  const [inventFileID, setInventFileID] = useState(RandomeText(7));
  const [InventoryTemplateName, setInventoryTemplateName] = useState("");
  const [errid, setErrid] = useState("");
  const _orgId = sessionStorage.getItem(
    GlobalConstants.session_current_company_id
  );
  const [NewAllInventoryTemplateList, setNewAllInventoryTemplateList] =
    useState([]);
  const [SelectedTemplateID, setSelectedTemplateID] = useState("");
  const [PopupSaveDisable, setPopupSaveDisable] = useState(false);
  //popup close
  const closePopup = () => {
    setPopup(false);
  };
  const closePopupEdit = () => {
    setPopupEdit(false);
    setsubmitData([]);
  };

  const SaveValidation = () => {
    let saveValidationform = true;
    if (InventoryTemplateName === "") {
      saveValidationform = false;
      setErrfile(<>*{text_errfilenamev3}!</>);
    }
    setSaveDisable(false);
    return saveValidationform;
  };

  const filteredItems = report.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const setDynamicData = (breakup_id, name, val, datatype) => {
    var filestatus = "na";
    var filekey = "na";
    var filepath = "na";
    if (datatype === "file") {
      var fileToUpload = val;
      if (fileToUpload === undefined || fileToUpload === null) {
        // alert("Select file first");
        return;
      }
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
            //alert("upload success");
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
  const getColumnData = (_orgId) => {
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/minventory/insertminventoryprofile?type=select";

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
        setNewAllInventoryTemplateList(res);
        if (res.length === 0) {
          infoToast("Set Inventory profile");
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

  const InventoryDataTableView = () => {
    if (SelectedTemplateID === "") {
      return;
    }
    var SelectedTemp = NewAllInventoryTemplateList?.filter(
      (val) => val._id === SelectedTemplateID
    );
    var list = SelectedTemp[0].breakuplist;
    setinventoryProfileId(SelectedTemplateID);
    setSelectedTempView(list);

    var col = [
      {
        name: "action",
        width: "140px",
        selector: (row) => (
          <div className="d-flex">
            <FaRegEdit
              className="btn-edit mx-2"
              onClick={() => actionRecord(row, "edit")}
            />

            <RiDeleteBin5Fill
              className="btn-edit mx-2"
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
    InventoryDataTableView();
  }, [SelectedTemplateID]);
  const ValidationPopup = () => {
    setPopup(true);
    infoToast("Please Fill All the Values Before Saving!");
  };
  const actionRecord = (row, op) => {
    if (op === "delete") {
      if (window.confirm("Delete the item?")) {
        var d = {
          _partition: GlobalConstants._partition,
          createdby: sessionStorage.getItem("username"),
          _orgId: _orgId,
          empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
          inventoryProfileId: row.inventoryProfileId,
          inventorylist: [],
          inventoryRecordId: row.rec_id,
        };

        const type = "delete";
        const apiUrl =
          GlobalConstants.Cdomain +
          "/API/moramba/v3/crud/collection/inventory/addupdateinventory?type=" +
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
            var res = response.data;
            getColumnData(_orgId);
            InventoryDataTableView();
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
          });
      }
    }
    if (op === "edit") {
      setPopupEdit(true);

      //alert(JSON.stringify(row));
      var arr = [row.item];
      var list = [];
      for (var key in row) {
        if (
          key !== "inventoryProfileId" &&
          key !== "rec_id" &&
          key !== "item" &&
          key.search("filekey") < 0 &&
          key.search("filepath") < 0
        ) {
          var AR = arr[0];
          let obj = AR.filter((o) => o.categoryId == key);

          list.push({
            categoryId: key,
            categoryValue: row[key],
            categoryName: obj[0].categoryName,
            datatype: obj[0].datatype,
          });
        } else {
          if (key === "inventoryProfileId") {
          }
          if (key === "rec_id") {
            setupdateRecID(row[key]);
          }
        }
      }
      setInputFields(list);
    }
  };

  const setDynamicDataFromServer = (col, inventoryProfileId) => {
    var type = "select";

    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/inventory/addupdateinventory?type=" +
      type;

    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      inventoryProfileId: inventoryProfileId,
      inventorylist: [],
      inventoryRecordId: "na",
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

        var cdArr = [];
        res.map((item, i) => {
          var l = item.inventorylist;
          var rec_id = item.inventoryRecordId;
          var inventoryProfileId = item.inventoryProfileId;
          var cd = {};
          l.map((it, i) => {
            var id = it.categoryId;
            var categoryName = it.categoryName;
            cd[id] = it.datatype === "file" ? "View" : it.categoryValue;
            cd["rec_id"] = rec_id;
            cd["inventoryProfileId"] = inventoryProfileId;
            cd["item"] = l;
            cd[id + ".filekey"] = it.filekey;
            cd[id + ".filepath"] = it.filepath;
          });
          cdArr.push(cd);
        });
        setReport(cdArr);
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
  const [CustomerID, setCustomerID] = useState("");
  const [DepartmentID, setDepartmentID] = useState("");
  const [ProjectID, setProjectID] = useState("");
  const handleaddInventoryData = () => {
    if (SaveValidation()) {
      if (report.length === 0) {
        return warnToast("Please Add Data First!");
      }
      setSaveDisable(true);
      var NewData = filteredItems.map((val) => {
        return val.rec_id;
      });
      var d = {
        CustomerId: CustomerID,
        DepartmentId: DepartmentID,
        ProjectId: ProjectID,
        employeeId: sessionStorage.getItem(
          GlobalConstants.session_current_emp_id
        ),
        _orgId: _orgId,
        templeteName: InventoryTemplateName,
        templeteId: inventFileID,
        createdBy: sessionStorage.getItem("username"),
        createdDate: dayjs(InventoryFileDate).format("MMM DD,YYYY"),
        _partition: GlobalConstants._partition,
        updatedBy: sessionStorage.getItem("username"),
        updatedDate: dayjs(InventoryFileDate).format("MMM DD,YYYY"),
        inventoryRecordIdList: NewData,
      };

      const type = "insert";
      const apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/inventorydata/addinventorydata?type=" +
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
          console.log(res);
          successToast("Inventory Report Created Successfully!");
          setPopup(false);
          getColumnData(_orgId);
          setTimeout(() => {
            setSaveDisable(false);
            navigate("/report", {
              state: {
                data: 1,
              },
            });
          }, 1500);
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
  };

  const handleFormChange = (index, event, datatype) => {
    let data = [...inputFields];
    data[index]["categoryValue"] =
      datatype === "file" ? event.target.files[0] : event.target.value;
    setInputFields(data);
  };
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

  useEffect(() => {
    if (columns.lenght > 0) {
      return;
    }
    getColumnData(_orgId);
  }, []);

  const handleSubmitEdit = () => {
    if (submitData.length === 0) {
      infoToast("You Had made no Changes!");
      setTimeout(() => {
        setPopupEdit(false);
      }, 1500);
      setPopupSaveDisable(false);
      return;
    }
    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      inventoryProfileId: inventoryProfileId,
      inventorylist: submitData,
      inventoryRecordId: updateRecID,
    };

    const type = "update";
    setPopupSaveDisable(true);
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/inventory/addupdateinventory?type=" +
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
        var res = response.data;
        InventoryDataTableView();
        getColumnData(_orgId);
        setPopupEdit(false);
        setPopupSaveDisable(false);
        successToast("Item Edited Successfully!");
      })
      .catch(function (error) {
        setPopupSaveDisable(false);
        console.log(error);
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
  const handleopenPopup = () => {
    if (columns.length === 0) {
      infoToast("Please Select Template First");
      setPopup(false);
    } else {
      setPopup(true);
    }
  };
  const handleSubmit = () => {
    console.log(columns, submitData);
    if (columns.length !== submitData.length + 2) {
      setPopupSaveDisable(false);
      return ValidationPopup();
    }
    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      inventoryProfileId: inventoryProfileId,
      inventorylist: submitData,
      inventoryRecordId: "na",
    };
    const type = "insert";
    setPopupSaveDisable(true);
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/inventory/addupdateinventory?type=" +
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
        setsubmitData([]);
        setPopup(false);
        setPopupSaveDisable(false);
        getColumnData(_orgId);
        InventoryDataTableView();
        successToast("Item Added Successfully!");
      })
      .catch(function (error) {
        console.log(error);
        setPopupSaveDisable(false);
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_addInventory(
      doc.querySelector("string[name='text_addInventory']")?.textContent ||
        "Add Inventory Data"
    );
    setText_btn_addInvent(
      doc.querySelector("string[name='text_btn_addInvent']")?.textContent ||
        "Create Inventory"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_addnewdata(
      doc.querySelector("string[name='text_addnewdata']")?.textContent ||
        "Add New Data"
    );
    setDeptIDTextV3(
      doc.querySelector("string[name='DeptIDTextV3']")?.textContent ||
        "Department ID"
    );
    setProjectIDTextv3(
      doc.querySelector("string[name='ProjectIDTextv3']")?.textContent ||
        "Project ID"
    );
    setCustomerIDTextv3(
      doc.querySelector("string[name='CustomerIDTextv3']")?.textContent ||
        "Customer ID"
    );
    setViewtempv3(
      doc.querySelector("string[name='viewtempv3']")?.textContent ||
        "View Template"
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent ||
        "Template Name"
    );
    setText_inventory_file_name(
      doc.querySelector("string[name='text_inventory_file_name']")
        ?.textContent || "Inventory File Name"
    );
    setText_date_inventory(
      doc.querySelector("string[name='text_date_inventory']")?.textContent ||
        "Inventory Date"
    );
    setText_ph_inventory_filename(
      doc.querySelector("string[name='text_ph_inventory_filename']")
        ?.textContent || "Enter Inventory File Name"
    );
    setText_inventory_file_ID(
      doc.querySelector("string[name='text_inventory_file_ID']")?.textContent ||
        "Inventory File ID"
    );
    setDeptid_textph(
      doc.querySelector("string[name='deptid_textph']")?.textContent ||
        "Enter Department ID"
    );
    setProjectid_textph(
      doc.querySelector("string[name='projectid_textph']")?.textContent ||
        "Enter Project ID"
    );
    setCustomerid_text(
      doc.querySelector("string[name='customerid_text']")?.textContent ||
        "Enter Customer ID"
    );
    setView_inventory_text(
      doc.querySelector("string[name='view_inventory_text']")?.textContent ||
        "View Inventory Template"
    );
    setText_errfilenamev3(
      doc.querySelector("string[name='text_errfilenamev3']")?.textContent ||
        "Please Enter Inventory File Name"
    );
    setTitle_Invenreport(
      doc.querySelector("string[name='title_Invenreport']")?.textContent ||
        "Inventory Report Template"
    );
    setPreparedby_text(
      doc.querySelector("string[name='preparedby_text']")?.textContent ||
        "Prepared By"
    );
    setInventory_seltemplate(
      doc.querySelector("string[name='inventory_seltemplate']")?.textContent ||
        "Select Inventory Template"
    );
    setInvoice_errcurrency(
      doc.querySelector("string[name='invoice_errcurrency']")?.textContent ||
        "Please Select Currency"
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
        {text_addInventory}
      </h3>
      <div
        className={
          popup === true || popupEdit === true || ViewPopup === true
            ? "container containerBox mt-4 p-2 bgblur1"
            : "container containerBox mt-4 p-2"
        }
      >
        <div className="text-center">
          <h4>
            {title_Invenreport}
            <span className="Star">*</span>:
          </h4>
          <select
            className="CountryInputbox1 me-3"
            onChange={(e) => setSelectedTemplateID(e.target.value)}
          >
            <option selected disabled>
              {inventory_seltemplate}
            </option>
            {NewAllInventoryTemplateList?.map((List) => {
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
              {text_inventory_file_name}
              <span className="Star">*</span>
            </h4>
            <input
              type="text"
              placeholder={text_ph_inventory_filename}
              value={InventoryTemplateName}
              onChange={(e) => [
                setInventoryTemplateName(e.target.value),
                setErrfile(""),
              ]}
              className="salarytypeInput"
            />

            <p className="ErrorColor">{errfile}</p>
          </div>
          <div className="col-md-3">
            <h4>{text_inventory_file_ID}</h4>
            <input
              type="text"
              value={inventFileID}
              className="salarytypeInput"
            />
            <p className="ErrorColor">{errid}</p>
          </div>
          <div className="col-md-3">
            <h4>
              {text_date_inventory}
              <span className="Star">*</span>
            </h4>
            <DatePicker
              selected={InventoryFileDate}
              dateFormat="MMM dd,yyyy"
              showMonthDropdown
              showYearDropdown
              onChange={(date) => setInventoryFileDate(date)}
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
          <button className="CreateBtn mt-4" onClick={() => handleopenPopup()}>
            + {text_btn_addInvent}
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
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center align-self-end mt-3">
            <Link to="/report">
              <button className="mx-3 btncancel">{button_cancel}</button>{" "}
            </Link>
            <button
              className="btnsave"
              onClick={handleaddInventoryData}
              disabled={saveDisable}
            >
              {button_save}
            </button>
          </div>
        </div>
      </div>
      {ViewPopup ? (
        <>
          <div className=" inventorypopup exp-create-view-popup">
            <div className="row text-end text-black mt-3 exp-create-view-popup-content">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setViewPopup(false)} />
              </h3>
            </div>
            <div className="text-center">
              <h4>{view_inventory_text}</h4>
              <Divider />
              <h5 className="mt-3">
                {text_temp_name} : {SelectedTemplateName}
              </h5>
            </div>
            <div className="mt-4 scrollTable">
              <table className="tableSty zClass">
                <thead>
                  <tr>
                    <td className="tableHeadSty">Sr No</td>
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
        <div className="main">
          <div className="popup-daily" id="popupmobile_expense">
            <div className="text-end">
              <h3 className="close mb-3 p-0" id="closeMob">
                <CgCloseO onClick={closePopup} />
              </h3>
            </div>
            <center>
              <h4 className="categorytext">{text_addnewdata}</h4>
            </center>
            <Divider />
            <div
              className="row m-2 scrollbarexpense force-overflow"
              id="style-1"
            >
              <div className="scrollpopupinventory p-2">
                {columns.length > 0 &&
                  columns.map(
                    (item, i) =>
                      i !== 0 &&
                      i !== 1 && (
                        <>
                          <div className="row inve-create-popup-content">
                            <div className="col-md-6">
                              <div className="tooltip1">
                                {" "}
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
                                  className="inputbox PopupInput"
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
            <Divider className="mt-4 mb-3" />
            <center>
              <button className="btncancel" onClick={closePopup}>
                {button_cancel}
              </button>{" "}
              <button
                className="btnsave mt-2"
                onClick={handleSubmit}
                disabled={PopupSaveDisable}
              >
                {button_save}
              </button>
            </center>
          </div>
        </div>
      ) : (
        ""
      )}
      {popupEdit === true ? (
        <div className="main">
          <div className="popup-daily" id="popupmobile_expense">
            <div className="text-end">
              <h3 className="close mb-3 p-0" id="closeMob">
                <CgCloseO onClick={closePopupEdit} />
              </h3>
            </div>
            <center>
              <h4 className="categorytext">{text_addnewdata}</h4>
            </center>
            <Divider />
            <div className="scrollpopupinventory p-2">
              {inputFields.length > 0 &&
                inputFields.map((input, index) => (
                  <>
                    <div className="row" key={index}>
                      <div className="col-md-6">
                        <div className="tooltip1">
                          {" "}
                          {truncate(input.categoryName, 32)} :
                          <br />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {input.datatype === "currency" ? (
                          <select
                            className="CountryInputbox1 w-75"
                            value={
                              input.datatype === "file"
                                ? ""
                                : input.categoryValue
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
                            className="inputbox PopupInput"
                            type={input.datatype}
                            value={
                              input.datatype === "file"
                                ? ""
                                : input.categoryValue
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
            <Divider className="mt-4 mb-3" />
            <center>
              <button className="btncancel" onClick={closePopupEdit}>
                {button_cancel}
              </button>{" "}
              <button
                className="btnsave mt-2"
                onClick={handleSubmitEdit}
                disabled={PopupSaveDisable}
              >
                {button_save}
              </button>
            </center>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default InventoryCreate;
