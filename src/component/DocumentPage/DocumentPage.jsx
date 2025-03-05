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

function DocumentPage() {
  var cmpName = sessionStorage.getItem(
    GlobalConstants.session_current_comp_name
  );

  //Redux code from Employeedoc & Companydoc
  const dispatch = useDispatch();
  const companyDocData = useSelector((state) => state.CompanyDoc);

  //Language Variable
  const [text_document, setText_document] = useState("Documents");
  const [button_save, setButton_save] = useState("Save");
  const [text_download, setText_download] = useState("Download");
  const [popUP_description, SetpopUP_description] = useState(
    "Your file is already uploaded on"
  );
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [popUp_desc_second, SetpopUp_desc_second] = useState("and name is");
  const [text_upload, setText_upload] = useState("Upload");
  const [text_uploaded, setText_uploaded] = useState("Uploaded");
  const [text_errUpload_file, setText_errUpload_file] = useState(
    "Please Select File First"
  );
  //new Language variable end

  //variable
  const [cmpOpen, setCmpOpen] = useState(false);
  const [note, setNote] = useState();
  const [isDownloadable, setIsDownloadable] = useState(true);
  const [docId, setDocId] = useState();
  const [imageformat, setImageformat] = useState();
  const [filekey, setFilekey] = useState();
  const [fileToUpload, setFileToUpload] = useState();
  const [fileNameUpload, setfileNameUpload] = useState();
  const [fileSizeUpload, setfileSizeUpload] = useState();
  const [fileTypeUpload, setfileTypeUpload] = useState();
  const [docDetailsListServer, setDocDetailsListServer] = useState([]);
  const [errFileSelect, setErrFileSelect] = useState("");
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const handleCmpOpen = (compId, docId, isDownload, btndownload) => {
    openFileUploadDialog(compId, docId, isDownload, btndownload);
  };

  //company document data
  useEffect(() => {
    if (companyDocData?.length === 0) {
      setIsLoading(true);
      Promise.all([dispatch(getCompanyDoc())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, [companyDocData?.length]);

  const cmplist = companyDocData.filter((s) => {
    return s.active === true;
  });

  const getDocDetailsList = () => {
    var _compId = sessionStorage.getItem("_compId");

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
        dispatch(getCompanyDoc());
        dispatch(getEmployeeDoc());
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

  useEffect(() => {
    //api call get method collectidata images
    getDocDetailsList();
  }, []);

  //get document
  const openFileUploadDialog = (compId, docId, isDownload, btndownload) => {
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
      orgID;
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
          setCmpOpen(true);
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
            setNote(
              "Your file is " +
                fileStatus +
                ", You can not upload again, contact Admin"
            );
          } else if (fileStatus === "Saved") {
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
          setIsDownloadable(true);

          if (btndownload === "download" || docDetailsListServer === null) {
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
      GlobalConstants.session_current_company_id
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
          getDocDetailsList();
        }
        successToast(res.message);
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

  const uploadFileToServer = () => {
    if (fileToUpload === undefined || fileToUpload === null) {
      setErrFileSelect(<>*{text_errUpload_file}!</>);
      return;
    }

    var _compId = sessionStorage.getItem("_compId");

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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setText_download(
      doc.querySelector("string[name='text_download']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_document(
      doc.querySelector("string[name='text_document']")?.textContent
    );
    setText_upload(
      doc.querySelector("string[name='text_upload']")?.textContent
    );
    SetpopUP_description(
      doc.querySelector("string[name='popUP_description']")?.textContent
    );
    SetpopUp_desc_second(
      doc.querySelector("string[name='popUp_desc_second']")?.textContent
    );
    setText_uploaded(
      doc.querySelector("string[name='text_uploaded']")?.textContent
    );
    setText_errUpload_file(
      doc.querySelector("string[name='text_errUpload_file']")?.textContent
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
    try {
      var d = docDetailsListServer.filter((x) => x.docId === docId)[0];
      if (d.docId !== "") {
        document
          .getElementById("upload-old" + i)
          .classList.replace("upload-old", "uploaded-file-div");
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
      return "Upload File Here";
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

      {/* Company Document Data */}

      <div className="p-3">
        <div className="company_data" id="mob_company">
          <div className="row">
            <div className="col-md-6" id="mobtitle">
              <h3 className="mx-5 mt-3">
                {cmpName}'s {text_document} (
                <span className="text-success">
                  {docDetailsListServer.length}
                </span>
                /<span className="text-danger">{cmplist.length}</span>)
              </h3>
            </div>
            {IsLoading ? (
              <div className="mt-5 mb-5 d-flex justify-content-center">
                <Loader />
              </div>
            ) : (
              <>
                <div className="col-md-6 mt-5 text-end" id="inputmob">
                  {cmpOpen === true ? (
                    <>
                      <div className="docpage-inputs">
                        {" "}
                        <input
                          type="file"
                          id="input_boxmob"
                          className="docpage-inputs-file"
                          onChange={handleFileInput}
                        />
                        <button
                          className="CreateBtn mt-3 mx-2"
                          onClick={uploadFileToServer}
                        >
                          {button_save}
                        </button>
                        <button
                          className="btncancel mx-2 cnclbtn"
                          onClick={() => [
                            setCmpOpen(false),
                            setErrFileSelect(""),
                          ]}
                        >
                          {button_cancel}
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="err-file-upload">
                  <p className="error_sty">{errFileSelect}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        <div className="scroll_comp1 docpage-scrollcomp-1">
          {cmplist.map((value, i) => {
            return (
              <>
                <div className="doc_box1 mx-4  docbg">
                  <div className=" font_position" id="textMob">
                    <MdDocumentScanner className="document_icon mx-4 mt-3" />

                    <h6 className="mt-1 doc_name">{value.category}</h6>
                  </div>
                  <div
                    className="mt-3 upload-old"
                    id={"upload-old" + i}
                    onClick={() =>
                      handleCmpOpen(
                        sessionStorage.getItem("user_id"),
                        value?._id,
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
                        handleCmpOpen(
                          sessionStorage.getItem("user_id"),
                          value?._id,
                          false,
                          "upload"
                        )
                      }
                      className="createbtn_doc  mx-3 mb-4"
                      id={"disable-btn-upload" + i}
                    >
                      {text_upload}
                    </button>
                    <button
                      className="createbtn_doc mt-3 mb-4 mx-2 downlodbtn"
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
      </div>
      <ToastContainer />
    </>
  );
}

export default DocumentPage;
