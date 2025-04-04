import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { Link, useNavigate } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import axios from "axios";
import "../Expense/Expense.css";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import {
  errorToast,
  infoToast,
  successToast,
  warnToast,
} from "../../utils/Helper";
import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaRegThumbsUp } from "react-icons/fa";
import Cookie from "js-cookie";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import RandomeText from "../../utils/RandomeText";
import { CountryCodewithEmoji, Currency } from "../../utils/data";

function ExpenseCreate() {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // old language variable
  const [button_save, setButton_save] = useState("Save");
  const [saveDisable, setSaveDisable] = useState(false);
  const [savepopoupDisable, setSavePopoupDisable] = useState(false);
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [AddExpenseHead, setAddExpenseHead] = useState("Add Expense Data");
  const [expenseFileNameText, setexpenseFileNameText] =
    useState("Expense File Name");
  const [text_addnewdata, setText_addnewdata] = useState("Add New Data");
  const [expenseFileIDText, setexpenseFileIDText] = useState("Expense File ID");
  const [text_err_file_name, setText_err_file_name] = useState(
    "Enter Expense File Name"
  );
  const [text_err_file_id, setText_err_file_id] = useState(
    "Enter Expense File ID"
  );
  const [text_expen_report, setText_expen_report] = useState(
    "Expense Report Template"
  );
  const [viewtempv3, setViewtempv3] = useState("View Template");
  const [AddExpenseItemV3, setAddExpenseItemV3] = useState("Add Expense Item");
  const [ExpenseReportDateTextV3, setExpenseReportDateTextV3] = useState(
    "Expense Report Date"
  );
  const [DeptIDTextV3, setDeptIDTextV3] = useState("Department ID");
  const [ProjectIDTextv3, setProjectIDTextv3] = useState("Project ID");
  const [CustomerIDTextv3, setCustomerIDTextv3] = useState("Customer ID");
  const [preparedby_text, setPreparedby_text] = useState("Prepared By");
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [deptid_textph, setDeptid_textph] = useState("Enter Department ID");
  const [projectid_textph, setProjectid_textph] = useState("Enter Project ID");
  const [customerid_text, setCustomerid_text] = useState("Enter Customer ID");
  const [view_expense_text, setview_expense_text] = useState(
    "View Expense Template"
  );
  const [expense_seltemplate, setExpense_seltemplate] = useState(
    "Select Expense Template"
  );
  //new lang var
  const [err_expensefile_name, setErr_expensefile_name] = useState(
    "Please Enter Expense File Name"
  );
  const [invoice_errcurrency, setInvoice_errcurrency] = useState(
    "Please Select Currency"
  );
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  //variable
  const [filterText, setFilterText] = useState("");
  const [ExpenseFileDate, setExpenseFileDate] = useState(new Date());
  const [popup, setPopup] = useState(false);
  const [submitData, setsubmitData] = useState([]);
  const [columndata, setcolumndata] = useState([]);
  const [report, setReport] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [updateRecID, setupdateRecID] = useState();
  const [popupEdit, setPopupEdit] = useState(false);
  const [ExpenseFileName, setExpenseFileName] = useState("");
  const [ExpenseFileId, setExpenseFileNameId] = useState(RandomeText(7));
  const [expenseProfileId, setexpenseProfileId] = useState();
  const [errexpensefile, setErrexpensefile] = useState("");
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openSaveMessage, setOpenSaveMessage] = useState([]);

  const handleClose = () => {
    setOpenSavePopup(false);
    setSaveDisable(false);
    navigate(`/report`, {
      state: { data: 0 },
    });
  };

  const [CustomerID, setCustomerID] = useState("");
  const [DepartmentID, setDepartmentID] = useState("");
  const [ProjectID, setProjectID] = useState("");

  const _orgId = sessionStorage.getItem(
    GlobalConstants.session_current_company_id
  );
  const closePopup = () => {
    setPopup(false);
  };
  const closePopupEdit = () => {
    setPopupEdit(false);
    setsubmitData([]);
  };

  const columns = [
    {
      name: "Action",
      sortable: true,
      selector: (row) => row.ExpName,
    },
    {
      name: "Document",
      sortable: true,
      selector: (row) => row.ExpName,
    },
  ];
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

  //open popup
  const handleopenPopup = () => {
    if (columndata.length === 0) {
      infoToast("Please Select Template First");
      setPopup(false);
    } else {
      setPopup(true);
    }
  };
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
      expenseProfileId: expenseProfileId,
      expenselist: submitData,
      expenseRecordId: updateRecID,
    };
    const type = "update";
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/expense/addupdateexpense?type=" +
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
        ExpenseDataTableView();
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
  const ExpenseCreate = () => {
    let ExpenseCreateValidation = true;
    if (ExpenseFileName === "") {
      ExpenseCreateValidation = false;
      setErrexpensefile(<>*{err_expensefile_name}!</>);
    }
    setSaveDisable(false);
    return ExpenseCreateValidation;
  };
  const handleaddExpenseData = () => {
    if (ExpenseCreate()) {
      if (report.length === 0) {
        return warnToast("Please Add Data First!");
      }
      setSaveDisable(true);
      var NewExpensenData = filteredItems.map((value) => {
        return value.rec_id;
      });
      var data = {
        CustomerId: CustomerID,
        DepartmentId: DepartmentID,
        ProjectId: ProjectID,
        employeeId: sessionStorage.getItem(
          GlobalConstants.session_current_emp_id
        ),
        _orgId: _orgId,
        templeteName: ExpenseFileName,
        templeteId: ExpenseFileId,
        createdBy: sessionStorage.getItem("username"),
        createdDate: dayjs(ExpenseFileDate).format("MMM DD,YYYY"),
        _partition: GlobalConstants._partition,
        updatedBy: sessionStorage.getItem("username"),
        updatedDate: dayjs(ExpenseFileDate).format("MMM DD,YYYY"),
        expenseRecordIdList: NewExpensenData,
      };
      const type = "insert";
      const apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/expensedata/addexpensedata?type=" +
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
          var value = response.data.approvalDetails;
          setOpenSavePopup(true);
          setOpenSaveMessage(value);
          // successToast("Expense Report Created Successfully!");
          setPopup(false);
          getColumnData(_orgId);
          // setTimeout(() => {
          //   setSaveDisable(false);
          //   navigate(`/report`, {
          //     state: {
          //       data: 0,
          //     },
          //   });
          // }, 1500);
        })
        .catch(function (error) {
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
    // }
  };

  const actionRecord = (row, op) => {
    if (op === "delete") {
      if (window.confirm("Delete the item?")) {
        var d = {
          _partition: GlobalConstants._partition,
          createdby: sessionStorage.getItem("username"),
          _orgId: _orgId,
          empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
          expenseProfileId: row.expenseProfileId,
          expenselist: [],
          expenseRecordId: row.rec_id,
        };
        const type = "delete";
        const apiUrl =
          GlobalConstants.Cdomain +
          "/API/moramba/v3/crud/collection/expense/addupdateexpense?type=" +
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
            ExpenseDataTableView();
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
      var arr = [row.item];

      console.log(arr);
      var list = [];
      for (var key in row) {
        if (
          key !== "expenseProfileId" &&
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
          if (key === "expenseProfileId") {
          }
          if (key === "rec_id") {
            setupdateRecID(row[key]);
          }
        }
      }
      setInputFields(list);
    }
  };

  const [SelectedTemplateName, setSelectedTemplateName] = useState("");
  const [SelectedTempView, setSelectedTempView] = useState([]);
  const [ViewPopup, setViewPopup] = useState(false);

  const [NewAllExpenseTemplateList, setNewAllExpenseTemplateList] = useState(
    []
  );
  const [SelectedTemplateID, setSelectedTemplateID] = useState("");
  const getColumnData = (_orgId) => {
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/mexpense/insertmexpenseprofile?type=select";
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
        setNewAllExpenseTemplateList(res);
        if (res.length === 0) {
          infoToast("Set Expense profile");
          return;
        }
      })
      .catch(function (error) {
        errorToast("Error!");
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
  const ExpenseDataTableView = () => {
    if (SelectedTemplateID === "") {
      return;
    }
    var SelectedTemp = NewAllExpenseTemplateList?.filter(
      (val) => val._id === SelectedTemplateID
    );
    var list = SelectedTemp[0]?.breakuplist;
    setSelectedTempView(list);
    setexpenseProfileId(SelectedTemplateID);

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
    list?.map((item, i) => {
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
    setcolumndata(col);
    setDynamicDataFromServer(col, SelectedTemplateID);
  };
  useEffect(() => {
    ExpenseDataTableView();
  }, [SelectedTemplateID]);

  useEffect(() => {
    if (columns.lenght > 0) {
      return;
    }
    getColumnData(_orgId);
  }, []);
  //submit Popup data

  const ValidationPopup = () => {
    setPopup(true);

    infoToast("Please Fill All the Values Before Saving!");
  };
  const handleSubmit = () => {
    if (columndata.length !== submitData.length + 2) {
      setSavePopoupDisable(false);

      return ValidationPopup();
    }
    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      expenseProfileId: expenseProfileId,
      expenselist: submitData,
      expenseRecordId: "na",
    };

    const type = "insert";
    setSavePopoupDisable(true);
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/expense/addupdateexpense?type=" +
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
        ExpenseDataTableView();
        successToast("Item Added Successfully!");
      })
      .catch(function (error) {
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

  const setDynamicDataFromServer = (col, expenseProfileId) => {
    var type = "select";
    const apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/expense/addupdateexpense?type=" +
      type;
    var d = {
      _partition: GlobalConstants._partition,
      createdby: sessionStorage.getItem("username"),
      _orgId: _orgId,
      empId: sessionStorage.getItem(GlobalConstants.session_current_emp_id),
      expenseProfileId: expenseProfileId,
      expenselist: [],
      expenseRecordId: "na",
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
          var l = item.expenselist;
          var rec_id = item.expenseRecordId;
          var expenseProfileId = item.expenseProfileId;
          var cd = {};
          l.map((it, i) => {
            var id = it.categoryId;
            var categoryName = it.categoryName;
            cd[id] =
              it.datatype === "file" ? (
                <span className="create-expense-view">View</span>
              ) : (
                it.categoryValue
              );
            cd["rec_id"] = rec_id;
            cd["expenseProfileId"] = expenseProfileId;
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
      });
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setAddExpenseHead(
      doc.querySelector("string[name='AddExpenseHead']")?.textContent ||
        "Add Expense Data"
    );
    setexpenseFileNameText(
      doc.querySelector("string[name='expenseFileNameText']")?.textContent ||
        "Expense File Name"
    );
    setexpenseFileIDText(
      doc.querySelector("string[name='expenseFileIDText']")?.textContent ||
        "Expense File ID"
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
    setText_err_file_name(
      doc.querySelector("string[name='text_err_file_name']")?.textContent ||
        "Enter Expense File Name"
    );
    setAddExpenseItemV3(
      doc.querySelector("string[name='AddExpenseItemV3']")?.textContent ||
        "Add Expense Item"
    );
    setExpenseReportDateTextV3(
      doc.querySelector("string[name='ExpenseReportDateTextV3']")
        ?.textContent || "Expense Report Date"
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
    setview_expense_text(
      doc.querySelector("string[name='view_expense_text']")?.textContent ||
        "View Expense Template"
    );
    setErr_expensefile_name(
      doc.querySelector("string[name='err_expensefile_name']")?.textContent ||
        "Please Enter Expense File Name"
    );
    setPreparedby_text(
      doc.querySelector("string[name='preparedby_text']")?.textContent ||
        "Prepared By"
    );
    setExpense_seltemplate(
      doc.querySelector("string[name='expense_seltemplate']")?.textContent ||
        "Select Expense Template"
    );
    setText_expen_report(
      doc.querySelector("string[name='text_expen_report']")?.textContent ||
        "Expense Report Template"
    );
    setInvoice_errcurrency(
      doc.querySelector("string[name='invoice_errcurrency']")?.textContent ||
        "Please Select Currency"
    );
    setText_request(
      doc.querySelector("string[name='text_request']")?.textContent ||
        "Thanks! Your Request Generated Successfully. PleaseContact"
    );
    setText_approval(
      doc.querySelector("string[name='text_approval']")?.textContent ||
        "For Approval Status"
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
        {AddExpenseHead}
      </h3>
      <Dialog
        fullScreen={fullScreen}
        open={openSavePopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="text-center">
          <FaRegThumbsUp className="text-center thumb-sty text-success" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {openSaveMessage.map((e) => {
              return (
                <>
                  <h3 className="text-center">
                    {text_request}{" "}
                    <span className="font-weight-bold">
                      <b>
                        {e.firstName} {e.lastName} (
                        {e.email === "" ? e.telephoneNumber : e.email})
                      </b>
                    </span>{" "}
                    {text_approval}
                  </h3>
                </>
              );
            })}
          </DialogContentText>
          <Divider />
        </DialogContent>
        <DialogActions>
          <button className="btncancel mx-4" onClick={handleClose}>
            Ok
          </button>
        </DialogActions>
      </Dialog>
      <div
        className={
          popup === true || popupEdit === true || ViewPopup === true
            ? "container containerBox mt-4 p-2 bgblur1 exp-create-container"
            : "container containerBox mt-4 p-2 exp-create-container"
        }
      >
        <div className="text-center">
          <h4>
            {text_expen_report}
            <span className="Star">*</span>:
          </h4>
          <select
            className="CountryInputbox1 me-3"
            onChange={(e) => setSelectedTemplateID(e.target.value)}
          >
            <option selected disabled>
              {expense_seltemplate}
            </option>
            {NewAllExpenseTemplateList.map((List) => {
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
        <div className="row p-3 exp-create-inputfields-1">
          <div className="col-md-3">
            <h4>
              {expenseFileNameText}
              <span className="Star">*</span>
            </h4>
            <input
              value={ExpenseFileName}
              type="text"
              placeholder={text_err_file_name}
              onChange={(e) => [
                setExpenseFileName(e.target.value),
                setErrexpensefile(""),
              ]}
            />
            <p className="error_sty">{errexpensefile}</p>
          </div>
          <div className="col-md-3 exp-create-inputfields">
            <h4>{expenseFileIDText}</h4>
            <input
              disabled
              value={RandomeText(7)}
              placeholder={text_err_file_id}
            />
          </div>
          <div className="col-md-3 exp-create-inputfields">
            <h4>
              {ExpenseReportDateTextV3}
              <span className="Star">*</span>
            </h4>
            <DatePicker
              selected={ExpenseFileDate}
              dateFormat="MMM DD,YYYY"
              showMonthDropdown
              showYearDropdown
              onChange={(date) => setExpenseFileDate(date)}
              className="Inputbox"
              dropdownMode="select"
            />
          </div>
          <div className="col-md-3 exp-create-inputfields">
            <h4>{preparedby_text}</h4>
            <input
              value={sessionStorage.getItem("username").split("@")[0]}
              disabled
            />
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-3 exp-create-inputfields-2">
            <h4>{DeptIDTextV3}</h4>
            <input
              type={"text"}
              placeholder={deptid_textph}
              onChange={(e) => setDepartmentID(e.target.value)}
            />
          </div>
          <div className="col-md-3 exp-create-inputfields">
            {" "}
            <h4>{ProjectIDTextv3}</h4>
            <input
              type={"text"}
              placeholder={projectid_textph}
              onChange={(e) => setProjectID(e.target.value)}
            />
          </div>
          <div className="col-md-3 exp-create-inputfields">
            <h4>{CustomerIDTextv3}</h4>
            <input
              type={"text"}
              placeholder={customerid_text}
              onChange={(e) => setCustomerID(e.target.value)}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="text-end">
          <button className="CreateBtn mt-4" onClick={handleopenPopup}>
            + {AddExpenseItemV3}
          </button>
        </div>
        <div className="mt-3">
          <DataTable
            columns={columndata}
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
              onClick={handleaddExpenseData}
              disabled={saveDisable}
            >
              {button_save}
            </button>
          </div>
        </div>
      </div>
      {ViewPopup ? (
        <>
          <div className="inventorypopup exp-create-view-popup">
            <div className="row text-end text-black mt-3 exp-create-view-popup-content">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setViewPopup(false)} />
              </h3>
            </div>
            <div className="text-center">
              <h4>{view_expense_text}</h4>
              <Divider />
              <h5 className="mt-3">
                {text_temp_name} : {SelectedTemplateName}
              </h5>
            </div>
            <div className="scrollTable">
              <div className="mt-4">
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
                <button
                  className="btncancel"
                  onClick={() => setViewPopup(false)}
                >
                  {button_cancel}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {popup === true ? (
        <div className="main">
          <div
            className="popup-daily expense-addnewdata-popup"
            id="popupmobile_expense"
          >
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
              <div className="scrollpopupinventory p-2 expense-adddata-popup-content">
                {columndata.length > 0 &&
                  columndata.map(
                    (item, i) =>
                      i !== 0 &&
                      i !== 1 && (
                        <>
                          <div className="row expense-adddata-popup-content-1">
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
                                  className="inputbox PopupInput expense-adddata-popup-date"
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
            <center className="expense-adddata-popup-btns">
              <button className="btncancel" onClick={closePopup}>
                {button_cancel}
              </button>{" "}
              <button
                className="btnsave mt-2"
                onClick={handleSubmit}
                disabled={savepopoupDisable}
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
                          <>
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
                          </>
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
              <button className="btnsave mt-2" onClick={handleSubmitEdit}>
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

export default ExpenseCreate;
