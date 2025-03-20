import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ApprovedTableStyles } from "../../utils/CommanTableStyle";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from "dayjs";

import Header from "../Header/Header";
import { errorToast, infoToast, successToast } from "../../utils/Helper";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import {
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

function EmpTDS() {
  const navigate = useNavigate();
  const EmployeeData = useSelector((state) => state.empData);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //language variable
  const [please_enter_amount, setPlease_enter_amount] = useState(
    "Please Enter Amount"
  );
  const [Tds_salary, setTds_salary] = useState("TDS on Salary");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [text_ducvow, setText_ducvow] = useState(
    " Deduction Under Chapter VI-A &Other workings"
  );
  const [text_Dra, setText_Dra] = useState("Documents Received Amount");
  const [text_dtbra, settext_dtbra] = useState(
    "Documents To Be Received Amount"
  );
  const [text_ta, settext_ta] = useState("Total Amount");
  const [text_ud, settext_ud] = useState("Upload Document");
  const [text_tdra, settext_tdra] = useState(
    "Total Documents Received Amount :"
  );
  const [text_tdtbra, settext_tdtbra] = useState(
    "Total Documents To Be Received Amount :"
  );
  const [text_deduction_a, settext_deduction_a] = useState("DEDUCTIONS");
  const [text_applicable_amount, settext_applicable_amount] =
    useState("APPLICABLE AMOUNT");
  const [text_financial_year, settext_financial_year] =
    useState("Financial Year");
  const [text_request, setText_request] = useState(
    "Thanks! Your Request Generated Successfully. PleaseContact"
  );
  const [text_approval, setText_approval] = useState("For Approval Status");
  //variable
  const [ReceiveAmount, setReceiveAmount] = useState("");
  const [DocumentToBeAmount, setDocumentToBeAmount] = useState("");
  const [YearSelect, setYearSelect] = useState(new Date());
  const [FinalDocToBeAmount, setFinalDocToBeAmount] = useState("");
  const [FinalReceiveAmount, setFinalReceiveAmount] = useState("");
  const [FinalTotalAmount, setFinalTotalAmount] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);
  const [openSaveMessage, setOpenSaveMessage] = useState([]);
  const [openSavePopup, setOpenSavePopup] = useState(false);

  const handleClose = () => {
    setOpenSavePopup(false);
  };
  //Document Upload handle
  const handleFileInput = ($event, index) => {
    setSaveDisable(true);
    var file = $event.target.files[0];
    var fileToUpload = file;
    var fileType = file.type;

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
        const TDSDocumentData = {
          ID: index,
          DocKey: res.filekey,
          DocPath: res.path,
          DocType: fileType,
        };

        const TDS_Info =
          JSON.parse(sessionStorage.getItem("TDSDocument")) || [];

        TDS_Info.push(TDSDocumentData);
        sessionStorage.setItem("TDSDocument", JSON.stringify(TDS_Info));

        if (res.path !== "") {
          successToast("Document Upload Successfully");
          setSaveDisable(false);
        }
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
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    var ReceiveSum = 0;
    var DocToBeSum = 0;
    var SumOfReceiveType1 = 0;
    var SumOfDocToBeType1 = 0;
    var SumOfReceiveType2 = 0;
    var SumOfDocToBeType2 = 0;
    var SumOfReceiveType3 = 0;
    var SumOfDocToBeType3 = 0;
    var SumOfReceiveType4 = 0;
    var SumOfDocToBeType4 = 0;

    for (let index = 0; index < TDSDataList.length; index++) {
      var ReceiveVal = document.getElementById("Recevied" + index).value;
      var DocToBeVal = document.getElementById("DocToBe" + index).value;
      ReceiveSum = ReceiveSum + Number(ReceiveVal);
      DocToBeSum = DocToBeSum + Number(DocToBeVal);
      if (TDSDataList[index]?.d_type === "U/S 80C") {
        var ReceiveVal1 = document.getElementById("Recevied" + index).value;
        var DocToBeVal1 = document.getElementById("DocToBe" + index).value;
        SumOfReceiveType1 = SumOfReceiveType1 + Number(ReceiveVal1);
        SumOfDocToBeType1 = SumOfDocToBeType1 + Number(DocToBeVal1);
        var grand1 = SumOfReceiveType1 + SumOfDocToBeType1;
        document.getElementById("type1").innerHTML = grand1 = null ? 0 : grand1;
      }
      if (TDSDataList[index]?.d_type === "Us/ 80CCD") {
        var ReceiveVal2 = document.getElementById("Recevied" + index).value;
        var DocToBeVal2 = document.getElementById("DocToBe" + index).value;
        SumOfReceiveType2 = SumOfReceiveType2 + Number(ReceiveVal2);
        SumOfDocToBeType2 = SumOfDocToBeType2 + Number(DocToBeVal2);
        var grand2 = SumOfReceiveType2 + SumOfDocToBeType2;
        document.getElementById("type2").innerHTML = grand2 = null ? 0 : grand2;
      }
      if (TDSDataList[index]?.d_type === "U/s.80D") {
        var ReceiveVal3 = document.getElementById("Recevied" + index).value;
        var DocToBeVal3 = document.getElementById("DocToBe" + index).value;
        SumOfReceiveType3 = SumOfReceiveType3 + Number(ReceiveVal3);
        SumOfDocToBeType3 = SumOfDocToBeType3 + Number(DocToBeVal3);
        var grand3 = SumOfReceiveType3 + SumOfDocToBeType3;
        document.getElementById("type3").innerHTML = grand3 = null ? 0 : grand3;
      }
      if (TDSDataList[index]?.d_type === "U/s.80G") {
        var ReceiveVal4 = document.getElementById("Recevied" + index).value;
        var DocToBeVal4 = document.getElementById("DocToBe" + index).value;
        SumOfReceiveType4 = SumOfReceiveType4 + Number(ReceiveVal4);
        SumOfDocToBeType4 = SumOfDocToBeType4 + Number(DocToBeVal4);
        var grand4 = SumOfReceiveType4 + SumOfDocToBeType4;
        document.getElementById("type4").innerHTML = grand4 = null ? 0 : grand4;
      }
    }
    setFinalReceiveAmount(ReceiveSum);
    setFinalDocToBeAmount(DocToBeSum);
    setFinalTotalAmount(Number(ReceiveSum) + Number(DocToBeSum));
  });
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setTds_salary(
      doc.querySelector("string[name='Tds_salary']")?.textContent ||
        "TDS on Salary"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
    );
    setText_ducvow(
      doc.querySelector("string[name='text_ducvow']")?.textContent ||
        " Deduction Under Chapter VI-A &Other workings"
    );
    setText_Dra(
      doc.querySelector("string[name='text_Dra']")?.textContent ||
        "Documents Received Amount"
    );
    settext_dtbra(
      doc.querySelector("string[name='text_dtbra']")?.textContent ||
        "Documents To Be Received Amount"
    );
    settext_ta(
      doc.querySelector("string[name='text_ta']")?.textContent || "Total Amount"
    );
    settext_ud(
      doc.querySelector("string[name='text_ud']")?.textContent ||
        "Upload Document"
    );
    settext_tdra(
      doc.querySelector("string[name='text_tdra']")?.textContent ||
        "Total Documents Received Amount :"
    );
    settext_tdtbra(
      doc.querySelector("string[name='text_tdtbra']")?.textContent ||
        "Total Documents To Be Received Amount :"
    );
    settext_deduction_a(
      doc.querySelector("string[name='text_deduction_a']")?.textContent ||
        "DEDUCTIONS"
    );
    settext_applicable_amount(
      doc.querySelector("string[name='text_applicable_amount']")?.textContent ||
        "APPLICABLE AMOUNT"
    );
    settext_financial_year(
      doc.querySelector("string[name='text_financial_year']")?.textContent ||
        "Financial Year"
    );
    setPlease_enter_amount(
      doc.querySelector("string[name='please_enter_amount']")?.textContent ||
        "Please Enter Amount"
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
  //submit Particullar row data
  const handleSubmit = () => {
    const TDSData = JSON.parse(sessionStorage.getItem("TDSDocument"));
    var test = [];

    if (TDSData === "" || TDSData === null) {
      infoToast("Please Add Data First!");
    } else {
      TDSDataList.map((e, index) => {
        var data = TDSData.filter((val) => {
          return val.ID === Number(e.u_id);
        });
        return test.push({
          docid: e.u_id,
          docname: e.type,
          section_type: e.d_type.split(" ").join(""),
          section_type_name: e.d_type,
          rcv_amount:
            document.getElementById("Recevied" + index).value === ""
              ? 0
              : document.getElementById("Recevied" + index).value,
          to_b_amount:
            document.getElementById("DocToBe" + index).value === ""
              ? 0
              : document.getElementById("DocToBe" + index).value,
          total_amount:
            Number(document.getElementById("Recevied" + index).value) +
            Number(document.getElementById("DocToBe" + index).value),
          dockey:
            data[0]?.ID === undefined
              ? ""
              : index === Number(data[0]?.ID)
              ? data[0]?.DocKey === undefined
                ? ""
                : data[0]?.DocKey
              : "",
          docpath:
            data[0]?.ID === undefined
              ? ""
              : index === Number(data[0]?.ID)
              ? data[0]?.DocPath === undefined
                ? ""
                : data[0]?.DocPath
              : "",
          doctype:
            data[0]?.ID === undefined
              ? ""
              : index === Number(data[0]?.ID)
              ? data[0]?.DocType === undefined
                ? ""
                : data[0]?.DocType
              : "",
          docfiletype:
            data[0]?.ID === undefined
              ? ""
              : index === Number(data[0]?.ID)
              ? data[0]?.DocType === undefined
                ? ""
                : data[0]?.DocType
              : "",
          startdate: "2023-01-01",
          enddate: "2024-01-01",
          doc_order: index + 1,
        });
      });

      const finalData = Array.from(
        test.reduce(
          (m, { TDSKey, total_amount }) =>
            m.set(TDSKey, (m.get(TDSKey) || 0) + total_amount),
          new Map()
        ),
        ([TDSKey, total_amount]) => ({ TDSKey, total_amount })
      );
      console.log(finalData);
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/crud/collection/emp_tds/addupdatedoc?type=insert";
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var currentempid = sessionStorage.getItem("currentempid");
      var _compId = sessionStorage.getItem("_compId");
      var d = {
        investdoclist: test,
        year: dayjs(YearSelect).format("YYYY"),
        f_rcv_amount: FinalReceiveAmount,
        f_to_b_amount: FinalDocToBeAmount,
        f_total_amount: FinalTotalAmount,
        _orgId: _compId,
        employeeId: currentempid,
        currency: "₹",
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var value = response.data.approvalDetails;
          sessionStorage.removeItem("TDSDocument");
          test = [];
          setFinalDocToBeAmount("");
          setFinalReceiveAmount("");
          setFinalTotalAmount("");
          // successToast("Data Added Succesfully!");
          setOpenSaveMessage(value);
          setOpenSavePopup(true);
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
    }

    console.log(test);
  };

  const columns = [
    {
      name: (
        <>
          <p className="my-2 text-white">{text_Sno}</p>
        </>
      ),
      selector: (row, index) => index + 1,
      width: "58px",
    },
    {
      name: (
        <>
          <p className="my-2 text-white">{text_ducvow}</p>
        </>
      ),
      selector: (row) => (
        <>
          ({row.d_type}){row.type}
        </>
      ),
    },
    {
      name: (
        <>
          <p className="my-2 text-white">
            {text_Dra}
            <br />
          </p>
        </>
      ),
      selector: (row, index) => (
        <>
          {" "}
          <input
            type="number"
            onKeyDown={(evt) =>
              evt.which !== 8 &&
              evt.which !== 0 &&
              (evt.which < 48 || evt.which > 57) &&
              evt.preventDefault()
            }
            min={0}
            id={"Recevied" + index}
            placeholder={please_enter_amount}
            value={document.getElementById("Recevied" + index)?.value}
            onChange={(e) => [setReceiveAmount(e.target.value)]}
          />
          <p className="error_sty" id={"ErrorMsg2" + index}></p>
        </>
      ),
    },

    {
      name: (
        <>
          {" "}
          <p className="my-2 text-white">{text_dtbra}</p>
        </>
      ),
      selector: (row, index) => (
        <>
          <input
            type="number"
            onKeyDown={(evt) =>
              evt.which !== 8 &&
              evt.which !== 0 &&
              (evt.which < 48 || evt.which > 57) &&
              evt.preventDefault()
            }
            min={0}
            id={"DocToBe" + index}
            placeholder={please_enter_amount}
            value={document.getElementById("DocToBe" + index)?.value}
            onChange={(e) => [setDocumentToBeAmount(e.target.value)]}
          />
          <p className="error_sty" id={"ErrorMsg" + index}></p>
        </>
      ),
    },
    {
      name: (
        <>
          <p className="my-2 text-white">{text_ta}</p>
        </>
      ),
      selector: (row, index) => (
        <>
          <input
            type="number"
            onKeyDown={(evt) =>
              evt.which !== 8 &&
              evt.which !== 0 &&
              (evt.which < 48 || evt.which > 57) &&
              evt.preventDefault()
            }
            min={0}
            id={"totalAmount" + index}
            value={
              Number(document.getElementById("Recevied" + index)?.value) +
              Number(document.getElementById("DocToBe" + index)?.value)
            }
            disabled
          />
        </>
      ),
    },
    {
      name: (
        <>
          <p className="my-2 text-white">{text_ud}</p>
        </>
      ),
      selector: (row, index) => (
        <input
          type="file"
          id={"Document" + index}
          onChange={(e) => handleFileInput(e, index)}
        />
      ),
    },
  ];

  useEffect(() => {
    var type = "select";

    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/emp_tds/addupdatedoc?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var currentempid = sessionStorage.getItem("currentempid");
    var _compId = sessionStorage.getItem("_compId");
    var d = {
      _orgId: _compId,
      employeeId: currentempid,
      docid: "NA",
      docname: "NA",
      total_amount: 0,
      dockey: "NA",
      docpath: "NA",
      doctype: "NA",
      docfiletype: "NA",
      startdate: "2023-01-01",
      enddate: "2024-01-01",
      doc_order: 1,
      rcv_amount: 0,
      to_b_amount: 0,
      year: dayjs(YearSelect).format("YYYY"),
      f_rcv_amount: 0,
      f_to_b_amount: 0,
      f_total_amount: 0,
      investdoclist: [],
    };
    axios
      .post(apiUrl, d, headerConfig)
      .then(function (response) {
        var res = response.data.data.investdoclist;
        var getTDSData = res.filter((val) => {
          return val;
        });
        console.log(getTDSData);
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
        console.log(error.message);
        // errorToast(error.message);
      });
  }, []);

  const TDSDataList = [
    { type: "Sukanya Smriti", u_id: "0", d_type: "U/S 80C" },
    { type: "P.P.F", u_id: "1", d_type: "U/S 80C" },
    { type: "N.S.C", u_id: "2", d_type: "U/S 80C" },
    { type: "L.I.C Premium", u_id: "3", d_type: "U/S 80C" },
    { type: "Housing Loan Principal Repayment", u_id: "4", d_type: "U/S 80C" },
    { type: "Tuition Fees", u_id: "5", d_type: "U/S 80C" },
    { type: "Pension Fund(80CCC)", u_id: "6", d_type: "U/S 80C" },
    { type: "Mutual Fund", u_id: "7", d_type: "U/S 80C" },
    { type: "Infrastructure Bond", u_id: "8", d_type: "U/S 80C" },
    { type: "Sukanya Samriddhi Account", u_id: "9", d_type: "U/S 80C" },
    {
      type: "Pension schemes as notified by the central government (NPS)",
      u_id: "10",
      d_type: "Us/ 80CCD",
    },
    { type: "Medical Insurance Premium ", u_id: "11", d_type: "U/s.80D" },
    {
      type: "Medical Insurance Premium (Resi. Sr.Citizen)",
      u_id: "12",
      d_type: "U/s.80D",
    },
    { type: "Preventive Health Checkup", u_id: "13", d_type: "U/s.80D" },
    {
      type: "Medical Expenditures on Health of Sr. Citizen, & Very Sr.Citizen",
      u_id: "14",
      d_type: "U/s.80D",
    },
    {
      type: "Donations to Prime Minister National Relief Fund",
      u_id: "15",
      d_type: "U/s.80G",
    },
    { type: "The National hildren's Fund", u_id: "16", d_type: "U/s.80G" },
  ];

  return (
    <>
      <Header />
      <div className="PayrollBox">
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
        <h3 className="HeadingText  text-center ">{Tds_salary}</h3>
        <div className="row ">
          <div className="col-md-10">
            <h3 className="mx-3">
              {EmployeeData[0].firstName + " " + EmployeeData[0].lastName}
            </h3>
          </div>

          <div className="col-md-2 att-calender">
            <h5>{text_financial_year}</h5>
            <DatePicker
              selected={YearSelect}
              dateFormat="yyyy"
              showYearPicker
              onChange={(date) => [setYearSelect(date)]}
              className="vactionbox1"
            />
          </div>
        </div>
        <DataTable
          className="mt-1"
          columns={columns}
          data={TDSDataList}
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          customStyles={ApprovedTableStyles}
        />
        <div className="TableButtonsHolder  gap-5 align-items-center justify-content-center mb-3">
          <div className="text-center">
            <h6>{text_tdra} </h6>
            <input value={FinalReceiveAmount} />
          </div>
          <div className="text-center">
            <h6>{text_tdtbra}</h6>
            <input value={FinalDocToBeAmount} />
          </div>
          <div className="text-center">
            <h6>{text_ta} : </h6>
            <input value={FinalTotalAmount} />
          </div>
        </div>
        <table className="DashboardTable tableBorder">
          <thead>
            <tr>
              <th>{text_deduction_a}</th>
              <th>{text_ta}</th>
              <th>{text_applicable_amount}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {console.log(document.getElementById("type1")?.innerText)}
              <td>U/S 80C</td>
              <td id="type1" align="right"></td>
              <td align="right">
                {Number(document.getElementById("type1")?.innerText) <= 150000
                  ? document.getElementById("type1")?.innerText
                  : "1,50,000"}
              </td>
            </tr>
            <tr>
              <td>Us/ 80CCD</td>
              <td id="type2" align="right"></td>
              <td align="right">
                {Number(document.getElementById("type2")?.innerText) <= 50000
                  ? document.getElementById("type2")?.innerText
                  : "50,000"}
              </td>
            </tr>
            <tr>
              <td>U/s.80D</td>
              <td id="type3" align="right"></td>
              <td align="right">
                {Number(document.getElementById("type3")?.innerText) <= 100000
                  ? document.getElementById("type3")?.innerText
                  : "1,00,000"}
              </td>
            </tr>
            <tr>
              <td>U/s.80G</td>
              <td id="type4" align="right"></td>
              <td align="right">
                {Number(document.getElementById("type4")?.innerText) <= 150000
                  ? document.getElementById("type4")?.innerText
                  : "1,50,000"}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btncancel" onClick={() => navigate(-1)}>
            {button_cancel}
          </button>
          <button
            className="btnsave"
            onClick={() => handleSubmit()}
            disabled={saveDisable}
          >
            {button_save}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default EmpTDS;
