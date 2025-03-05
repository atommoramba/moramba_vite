import React, { useEffect, useState } from "react";
import "../DocumentPage/DocumentPage.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { MdDocumentScanner } from "react-icons/md";
import { GlobalConstants, GetUTCNow } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDoc } from "../../redux/CompanyDocSlice";
import dayjs from "dayjs";

import axios from "axios";
import { getEmployeeDoc } from "../../redux/EmployeeDocSlice";
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";
import FileSaver from "file-saver";
function EmployeeDocument() {
  var cmpName = sessionStorage.getItem(
    GlobalConstants.session_current_comp_name
  );
  var empName = sessionStorage.getItem("employee_name");

  //Redux code from Employeedoc & Companydoc
  const dispatch = useDispatch();
  const companyDocData = useSelector((state) => state.CompanyDoc);
  const employeeDocData = useSelector((state) => state.EmployeeDoc);
  const SelectedEmpData = useSelector((state) => state.empData);

  //Language Variable
  const [button_save, setButton_save] = useState("Save");
  const [text_document, setText_document] = useState("Documents");
  const [text_download, setText_download] = useState("Download");
  const [popUP_description, SetpopUP_description] = useState(
    "Your file is already uploaded on"
  );
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [popUp_desc_second, SetpopUp_desc_second] = useState("and name is");

  //new Language variable start
  const [text_upload, setText_upload] = useState("Upload");
  const [text_uploaded, setText_uploaded] = useState("Uploaded");
  const [text_errUpload_file, setText_errUpload_file] = useState(
    "Please Select File First"
  );
  //new Language variable end

  //variable
  const [cmpOpen, setCmpOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);
  const [note, setNote] = useState();
  const [isDownloadable, setIsDownloadable] = useState(true);
  const [isNotUpload, setIsNotUpload] = useState();
  const [docId, setDocId] = useState();
  const [imageformat, setImageformat] = useState();
  const [filekey, setFilekey] = useState();
  const [fileToUpload, setFileToUpload] = useState();
  const [fileNameUpload, setfileNameUpload] = useState();
  const [fileSizeUpload, setfileSizeUpload] = useState();
  const [fileTypeUpload, setfileTypeUpload] = useState();
  const [docDetailsListServer, setDocDetailsListServer] = useState([]);
  const [docDetailsListServercmp, setDocDetailsListServercmp] = useState([]);
  const [errFileSelect, setErrFileSelect] = useState("");
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const [IsLoading1, setIsLoading1] = useState(true);

  const handleCmpOpen = (compId, docId, orgID, btndownload) => {
    openFileUploadDialog(compId, docId, orgID, btndownload);
  };

  const handleEmpOpen = (empId, docId, isDownload = false, empbtndownload) => {
    EmpopenFileUploadDialog(empId, docId, isDownload, empbtndownload);
  };

  //company document data
  useEffect(() => {
    if (companyDocData?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getCompanyDoc())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
      );
    } else {
      setIsLoading(false);
    }
  }, [companyDocData?.length]);

  const cmplist = companyDocData.filter((s) => {
    return s.active === true;
  });

  //employee document data
  useEffect(() => {
    if (employeeDocData?.length === 0) {
      setIsLoading1(true);

      Promise.all([dispatch(getEmployeeDoc())]).then(() =>
        setTimeout(() => {
          setIsLoading1(false);
        }, 1500)
      );
    } else {
      setIsLoading1(false);
    }
  }, [employeeDocData?.length]);

  const emplist = employeeDocData.filter((s) => {
    return s.active === true;
  });

  useEffect(() => {
    const dataToBeSent = {
      collection_name: "Images",
      search_key: "employeeId",
      search_value: sessionStorage.getItem("currentloginempid"),
    };

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/collectiondata?collection_name=" +
      dataToBeSent.collection_name +
      "&search_key=" +
      dataToBeSent.search_key +
      "&search_value=" +
      dataToBeSent.search_value +
      "&isbson_id=true";

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
        const DetailsList = JSON.parse(res.data);
        console.log(DetailsList);
        var docDetailsArray = [];

        for (let i = 0; i < DetailsList.length; i++) {
          var employeeId = DetailsList[i].employeeId + "";
          var docId1 = DetailsList[i].docId + "";
          var uploadedOn = DetailsList[i].date + "";
          var status = DetailsList[i].status + "";
          var imageName = DetailsList[i].imagename + "";
          docDetailsArray.push({
            employeeId: employeeId,
            docId: docId1,
            uploadedOn: uploadedOn,
            status: status,
            imageName: imageName,
          });
        }
        setDocDetailsListServercmp(docDetailsArray);
        console.log(docDetailsArray);
        dispatch(getCompanyDoc());
        // dispatch(getEmployeeDoc());
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
  }, []);
  const getDocDetailsList = () => {
    const dataToBeSent = {
      collection_name: "Images",
      search_key: "employeeId",
      search_value: sessionStorage.getItem(
        GlobalConstants.session_current_emp_id
      ),
    };

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/collectiondata?collection_name=" +
      dataToBeSent.collection_name +
      "&search_key=" +
      dataToBeSent.search_key +
      "&search_value=" +
      dataToBeSent.search_value +
      "&isbson_id=true";

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
        const DetailsList = JSON.parse(res.data);
        console.log(DetailsList);
        var docDetailsArray = [];

        for (let i = 0; i < DetailsList.length; i++) {
          var employeeId = DetailsList[i].employeeId + "";
          var docId1 = DetailsList[i].docId + "";
          var uploadedOn = DetailsList[i].date + "";
          var status = DetailsList[i].status + "";
          var imageName = DetailsList[i].imagename + "";
          docDetailsArray.push({
            employeeId: employeeId,
            docId: docId1,
            uploadedOn: uploadedOn,
            status: status,
            imageName: imageName,
          });
        }
        setDocDetailsListServer(docDetailsArray);
        console.log(docDetailsArray);
        dispatch(getCompanyDoc());
        dispatch(getEmployeeDoc());
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    getDocDetailsList();
  }, []);

  //get document
  const openFileUploadDialog = (compId, docId, isDownload, btndownload) => {
    setDocId(docId);
    var role = SelectedEmpData[0]?.role;
    var orgID = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var employeeId = sessionStorage.getItem(
      GlobalConstants.session_current_emp_id
    );

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/images/getdocuploadeddetails?employeeId=" +
      employeeId +
      "&docId=" +
      docId +
      "&_orgId=" +
      orgID +
      "&isOrg=true";
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
        setIsDownloadable(false);
        if ((res.data.length === 0 && role === "admin") || role === "Admin") {
          setCmpOpen(true);
        } else {
          if (btndownload === "upload" && res.data.length === 0)
            infoToast("Only Admin can able to Upload");
        }
        if (res.data.length > 0) {
          const data = res.data[0];
          setCmpOpen(false);
          var fileStatus = data.status;
          setImageformat(data.imageformat);
          setNote("");
          if (data.filekey != undefined && data.filekey != "" && isDownload) {
            downloadFile(data.filekey);
          }
          if (fileStatus === "Drafted") {
            setIsNotUpload(true);
            setNote(
              "Your file is " +
                fileStatus +
                ", You can not upload again, contact Admin"
            );
          } else if (fileStatus === "Saved") {
            setIsNotUpload(true);

            setIsDownloadable(true);
            setFilekey(data.filekey);

            setNote(
              <>
                {popUP_description}`${dayjs(data.date).format("MMM Do YYYY")}{" "}
                {popUp_desc_second} ${data.imagename}.`
              </>
            );
          } else {
            setNote("");
          }
          if (btndownload === "upload") {
            infoToast("Already Uploaded File");
          }
        } else {
          setIsNotUpload(false);
          setIsDownloadable(false);

          if (btndownload === "download") {
            infoToast("Upload File First");
          }
        }
      })
      .catch(function (error) {
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
  };

  const EmpopenFileUploadDialog = (
    empId,
    docId,
    isDownload,
    empbtndownload
  ) => {
    setDocId(docId);
    var orgID = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var employeeId = sessionStorage.getItem(
      GlobalConstants.session_current_emp_id
    );

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/images/getdocuploadeddetails?employeeId=" +
      employeeId +
      "&docId=" +
      docId +
      "&_orgId=" +
      orgID +
      "&isOrg=false";
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
        setIsDownloadable(false);
        if (res.data.length === 0) {
          setEmpOpen(true);
        }
        if (res.data.length > 0) {
          const data = res.data[0];
          setEmpOpen(false);
          var fileStatus = data.status;
          setImageformat(data.imageformat);
          setNote("");
          if (data.filekey !== undefined && data.filekey != "" && isDownload) {
            downloadFile(data.filekey);
          }
          if (fileStatus === "Drafted") {
            setIsNotUpload(true);
            setNote(
              "Your file is " +
                fileStatus +
                ", You can not upload again, contact Admin"
            );
          } else if (fileStatus === "Saved") {
            setIsNotUpload(true);

            setIsDownloadable(true);
            setFilekey(data.filekey);

            setNote(
              <>
                {popUP_description}`${dayjs(data.date).format("MMM Do YYYY")}{" "}
                {popUp_desc_second} ${data.imagename}.`
              </>
            );
          } else {
            setNote("");
          }
          if (empbtndownload === "upload") {
            infoToast("Already Uploaded File");
          }
        } else {
          setIsNotUpload(false);
          setIsDownloadable(false);
          if (empbtndownload === "download") {
            infoToast("Upload File First");
          }
        }
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
    // });
  };

  const handleFileInput = ($event) => {
    const file = $event.target.files[0];
    var fileToUpload = file;
    var fileName = file.name;
    var fileSize = file.size / 1000 + " KB";
    var fileType = file.type;
    setFileToUpload(fileToUpload);
    setfileNameUpload(fileName);
    setfileSizeUpload(fileSize);
    setfileTypeUpload(fileType);
    setErrFileSelect("");
  };

  const saveToFileSystem = (response) => {
    const filename = filekey;
    FileSaver.saveAs(response, filename);
  };

  const downloadFile = (fileKey) => {
    setErrFileSelect("");
    var employeeId = sessionStorage.getItem(
      GlobalConstants.session_current_emp_id
    );
    var apiUrl =
      GlobalConstants.Cdomain +
      `/API/moramba/v3/download/file?filekey=${fileKey}&employeeId=${employeeId}`;
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
        saveToFileSystem(response.data);
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
  };

  //upload document
  const saveImageDetails = (data) => {
    var _compId = sessionStorage.getItem("_compId");

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/image?type=insert";

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
        if (res.status) {
          setEmpOpen(false);
          getDocDetailsList();
        }
        successToast(res.message);
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
  };

  const uploadFileToServer = () => {
    if (fileToUpload === undefined || fileToUpload === null) {
      setErrFileSelect(<>*{text_errUpload_file}!</>);
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
        if (res.path !== undefined && res.path !== "") {
          const dateUTC = GetUTCNow();
          const gmtDay = dayjs(dateUTC).format("YYYY-MM-DD");
          const ImageDetails = {
            docId: docId,
            filekey: res.filekey,
            employeeId: sessionStorage.getItem(
              GlobalConstants.session_current_emp_id
            ),
            _orgId: sessionStorage.getItem(
              GlobalConstants.session_current_company_id
            ),
            orgId: sessionStorage.getItem(
              GlobalConstants.session_current_company_id
            ),
            _partition: GlobalConstants._partition,
            image: fileNameUpload,
            imagesize: fileSizeUpload,
            status: "status",
            imagepath: res.path,
            imagename: fileNameUpload,
            imageoriginalname: fileNameUpload,
            active: true,
            imageformat: fileTypeUpload,
            date: gmtDay,
            latitude: 0,
            longitude: 0,
            createdby: "createdby",
            remark: "remark",
          };
          saveImageDetails(ImageDetails);
          setCmpOpen(false);
          setFileToUpload();
          setfileNameUpload();
          setfileSizeUpload();
          setfileTypeUpload();
          setErrFileSelect("");
        } else {
          alert("Path not found");
        }
      })
      .catch(function (error) {
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
      })
      .then(function () {
        // always executed
      });
  };

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setButton_save(
      doc.querySelector("string[name='button_save']", doc)?.textContent
    );
    setText_download(
      doc.querySelector("string[name='text_download']", doc)?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']", doc)?.textContent
    );
    setText_document(
      doc.querySelector("string[name='text_document']", doc)?.textContent
    );
    SetpopUP_description(
      doc.querySelector("string[name='popUP_description']", doc)?.textContent
    );
    SetpopUp_desc_second(
      doc.querySelector("string[name='popUp_desc_second']", doc)?.textContent
    );
    setText_upload(
      doc.querySelector("string[name='text_upload']", doc)?.textContent
    );
    setText_uploaded(
      doc.querySelector("string[name='text_uploaded']", doc)?.textContent
    );
    setText_errUpload_file(
      doc.querySelector("string[name='text_errUpload_file']", doc)?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getSingleDocDetails = (docId, i) => {
    console.log(docId);
    try {
      var d = docDetailsListServer.filter((x) => x.docId === docId)[0];
      if (d.docId !== "") {
        document
          .getElementById("upload-old-emp" + i)
          .classList.replace("upload-old-emp", "uploaded-file-div-emp");
        document.getElementById("disable-btn-upload" + i).disabled = true;
        document.getElementById("disable-btn-upload" + i).innerText =
          text_uploaded;
        var date = dayjs(d.uploadedOn).format("MMM Do YYYY");
        var note = `${d.status}/${date}/${d.imageName}`;
        return note;
      } else {
        return "";
      }
    } catch (err) {
      return "Upload file here";
    }
  };

  const getSingleDocDetailscmp = (docId, i) => {
    console.log(docId);
    try {
      var d = docDetailsListServercmp.filter((x) => x.docId === docId)[0];
      if (d.docId !== "") {
        document
          .getElementById("upload-old" + i)
          .classList.replace("upload-old", "uploaded-file-div");
        var date = dayjs(d.uploadedOn).format("MMM Do YYYY");
        var note = `${d.status}/${date}/${d.imageName}`;
        return note;
      } else {
        return "";
      }
    } catch (err) {
      return "No File Uploaded";
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
      {IsLoading && IsLoading1 ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          {/* Company Document Data */}
          <div className="p-3">
            <div className="company_data" id="mob_company">
              <div className="row">
                <div className="col-md-6" id="mobtitle">
                  <h3 className="mx-5 mt-3">
                    {cmpName}'s {text_document} (
                    <span className="text-success">
                      {docDetailsListServercmp.length}
                    </span>
                    /<span className="text-danger">{cmplist.length}</span>)
                  </h3>
                </div>
                <div className="col-md-6 mt-5 text-end" id="inputmob">
                  {cmpOpen === true ? (
                    <div className="docpage-inputs">
                      {" "}
                      <input
                        type="file"
                        id="input_boxmob"
                        className="docpage-inputs-file"
                        onChange={handleFileInput}
                      />
                      <button
                        className="CreateBtn mx-3 docpage-inputs-btn"
                        onClick={uploadFileToServer}
                      >
                        {button_save}
                      </button>
                      <button
                        className="btncancel mx-2"
                        onClick={() => setCmpOpen(false)}
                      >
                        {button_cancel}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="scroll_comp1 docpage-scrollcomp-1">
              {cmplist.map((value, i) => {
                return (
                  <>
                    <div className="doc_box1 mx-4  docbg">
                      <div className="font_position" id="textMob">
                        <MdDocumentScanner className="document_icon mt-3  mx-4" />
                        <h6 className="mt-3 doc_name">{value.category}</h6>
                      </div>
                      <div className="mt-3 upload-old" id={"upload-old" + i}>
                        <p className="file_name_sty" id={"file_name" + i}>
                          {getSingleDocDetailscmp(value?._id, i)}
                        </p>
                      </div>

                      <center>
                        <button
                          className="createbtn_doc mt-3 mb-4 mx-4 downlodbtn"
                          onClick={() =>
                            handleCmpOpen(
                              sessionStorage.getItem("user_id"),
                              value?._id,
                              true,
                              "download"
                            )
                          }
                          download
                        >
                          {text_download}
                        </button>
                      </center>
                    </div>
                  </>
                );
              })}
            </div>
            <br />

            {/* Employee document data */}

            <div className="company_data" id="mob_company">
              <div className="row">
                <div className="col-md-6" id="mobtitle">
                  <h3 className="mx-5 mt-5">
                    {empName}'s {text_document} ({" "}
                    <span className="text-success">
                      {docDetailsListServer.length}
                    </span>
                    /<span className="text-danger">{emplist.length}</span>)
                  </h3>
                </div>
                <div className="col-md-6 mt-5 text-end" id="inputmob">
                  {empOpen === true ? (
                    <>
                      {" "}
                      <input
                        type="file"
                        id="input_boxmob"
                        onChange={handleFileInput}
                      />
                      <button
                        className="CreateBtn mt-3 mx-2"
                        onClick={uploadFileToServer}
                      >
                        {button_save}
                      </button>
                      <button
                        className="btncancel mx-2"
                        onClick={() => [
                          setEmpOpen(false),
                          setErrFileSelect(""),
                        ]}
                      >
                        {button_cancel}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="err-file-upload">
                  <p className="error_sty">{errFileSelect}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="scroll_comp1 docpage-scrollcomp-1">
              {emplist.map((value, i) => {
                return (
                  <>
                    <div className="doc_box1 mx-4 " id="doc_boxmob">
                      <div className="font_position" id="textMob">
                        <MdDocumentScanner className="document_icon mt-4 mx-4" />
                        <h6 className="mt-1 doc_name">{value.category}</h6>
                      </div>

                      <div
                        className="mt-3 upload-old-emp"
                        id={"upload-old-emp" + i}
                        onClick={() =>
                          handleEmpOpen(
                            sessionStorage.getItem("currentempid"),
                            value._id,
                            false,
                            "upload"
                          )
                        }
                      >
                        <p className="file_name_sty" id={"file_name" + i}>
                          {getSingleDocDetails(value?._id, i)}
                        </p>
                      </div>
                      <center>
                        <button
                          onClick={() =>
                            handleEmpOpen(
                              sessionStorage.getItem("currentempid"),
                              value._id,
                              false,
                              "upload"
                            )
                          }
                          id={"disable-btn-upload" + i}
                          className="createbtn_doc mt-3 mx-3 mb-2"
                        >
                          {text_upload}
                        </button>
                        <button
                          className="createbtn_doc mt-3 mb-2 mx-2 downlodbtn"
                          onClick={() =>
                            handleEmpOpen(
                              sessionStorage.getItem("currentempid"),
                              value._id,
                              true,
                              "download"
                            )
                          }
                        >
                          {text_download}
                        </button>
                      </center>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default EmployeeDocument;
