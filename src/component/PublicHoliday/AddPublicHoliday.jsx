import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { Divider } from "@mui/material";
import DataTable from "react-data-table-component";
import { TimeSheetTableStyles } from "../../utils/CommanTableStyle";
import Loader from "../../utils/Loader";
import {
  errorToast,
  infoToast,
  successToast,
  warnToast,
} from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { CgCloseO } from "react-icons/cg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useEffect } from "react";
import dayjs from "dayjs";

function AddPublicHoliday() {
  const data = useLocation();
  const GlobalHolidayData = data.state;
  console.log(GlobalHolidayData);
  const [pageCount, setPageCount] = useState(1);
  const [selectDate, setSelectDate] = useState(
    new Date(`01-01-${GlobalHolidayData.Year}`)
  );
  const [AddHolidayPopup, setAddHolidayPopup] = useState(false);
  const [UpdateId, setUpdateId] = useState("");
  const [HolidayName, setHolidayName] = useState("");
  const [Dec, setDec] = useState("");
  const [IsEdit, setIsEdit] = useState(false);
  const [HolidayList, setHolidayList] = useState([]);
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_update, setText_update] = useState("Update");
  const [text_year, setText_year] = useState("Year");
  const [text_description, setText_description] = useState("Description");
  const [text_description_ph, setText_description_ph] =
    useState("Enter Description");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_delete, setText_delete] = useState("Delete");
  const [text_date, setText_date] = useState("Date");
  const [text_name_holiday, settext_name_holiday] = useState("Name of Holiday");
  const [text_public_holiday, settext_public_holiday] =
    useState("Add Public Holiday");
  const [text_update_holiday, settext_update_holiday] = useState(
    "Update Public Holiday"
  );
  const [text_holiday_date, settext_holiday_date] = useState("Date of Holiday");
  const [text_holiday_name, settext_holiday_name] =
    useState("Enter Holiday Name");
  const [IsLoading, setIsLoading] = useState(true);
  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "100px",
    },
    {
      name: <>{text_date}</>,
      width: "150px",
      selector: (row) => dayjs(row.startDate).format("MMM DD.YYYY"),
    },
    {
      name: <>{text_name_holiday}</>,
      width: "30%",
      selector: (row) => row.name,
    },

    {
      name: <>{text_description}</>,
      selector: (row) => (row.Description === "" ? "-" : row.Description),
    },
    {
      name: <>{text_edit}</>,
      width: "158px",
      selector: (row) => (
        <>
          <button
            className="ViewBtn p-2"
            onClick={() => [
              setIsEdit(true),
              setUpdateId(row._id),
              setAddHolidayPopup(true),
              setHolidayName(row?.name),
              setDec(row?.Description),
              setSelectDate(
                new Date(dayjs(row?.startDate).format("MM DD,YYYY"))
              ),
            ]}
          >
            {text_edit}
          </button>
        </>
      ),
    },
    {
      name: <>{text_delete}</>,
      width: "158px",
      selector: (row) => (
        <>
          <button className="btncancel" onClick={() => DeleteHoliday(row._id)}>
            {text_delete}
          </button>
        </>
      ),
    },
  ];
  const Employecolumns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "100px",
    },
    {
      name: <>{text_date}</>,
      width: "150px",
      selector: (row) => dayjs(row.startDate).format("MMM DD.YYYY"),
    },
    {
      name: <>{text_name_holiday}</>,
      width: "30%",
      selector: (row) => row.name,
    },
    {
      name: <>{text_description}</>,
      selector: (row) => (row.Description === "" ? "-" : row.Description),
    },
  ];

  //@ TO Insert Public Holiday
  const saveHoliday = () => {
    var type = "insert";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/publicholiday?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      name: HolidayName,
      startDate: dayjs(selectDate).format("YYYY-MM-DD"),
      calendartype: GlobalHolidayData.GlobalHolidayListName,
      Description: Dec,
      calendartypeid: GlobalHolidayData.GlobalID,
    };
    axios
      .post(api_url, Data, headerConfig)
      .then((response) => {
        FetchData();
        successToast("Holiday Added Successfully!");

        setAddHolidayPopup(false);
        CancelClicked();
      })
      .catch((err) => {
        errorToast(err.response.data.message);
        console.log(err);
      });
  };
  //@ TO delete Public Holiday
  const DeleteHoliday = (HolidayId) => {
    var type = "delete";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/publicholiday?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      _id: HolidayId,
    };
    axios
      .post(api_url, Data, headerConfig)
      .then((response) => {
        console.log(response);
        FetchData();
        warnToast("Holiday Deleted Successfully!");
        setAddHolidayPopup(false);
        setDec("");
        setHolidayName("");
        setSelectDate(new Date());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //@ TO Fetch Public Holiday List
  const FetchData = () => {
    setIsLoading(true);
    var type = "selectall";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/publicholiday?_orgId=" +
      sessionStorage.getItem("_compId") +
      "&calendartypeid=" +
      GlobalHolidayData.GlobalID +
      "&type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(api_url, headerConfig)
      .then((response) => {
        setHolidayList(response.data.data);
        setIsLoading(false);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  //@ TO Fetch Public Holiday List Every Time Page Renders
  useEffect(() => {
    FetchData();
  }, []);
  //@ TO Update Public Holiday
  const UpdateHoliday = () => {
    var type = "update";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/publicholiday?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var Data = {
      _id: UpdateId,
      _orgId: sessionStorage.getItem("_compId"),
      name: HolidayName,
      startDate: selectDate,
      calendartype: GlobalHolidayData.GlobalHolidayListName,
      Description: Dec,
      calendartypeid: GlobalHolidayData.GlobalID,
    };
    axios
      .post(api_url, Data, headerConfig)
      .then((response) => {
        FetchData();
        infoToast("Holiday Updated Successfully!");
        setAddHolidayPopup(false);
        setDec("");
        setHolidayName("");
        setSelectDate(new Date());
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //@ TO Clear All State on Cancel
  const CancelClicked = () => {
    setAddHolidayPopup(false);
    setDec("");
    setHolidayName("");
    setSelectDate(new Date());
  };
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
    setText_date(doc.querySelector("string[name='text_date']")?.textContent);
    setText_delete(
      doc.querySelector("string[name='text_delete']")?.textContent
    );
    setText_edit(doc.querySelector("string[name='text_edit']")?.textContent);
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setText_description_ph(
      doc.querySelector("string[name='text_description_ph']")?.textContent
    );
    settext_name_holiday(
      doc.querySelector("string[name='text_name_holiday']")?.textContent
    );
    settext_public_holiday(
      doc.querySelector("string[name='text_public_holiday']")?.textContent
    );
    settext_holiday_name(
      doc.querySelector("string[name='text_holiday_name']")?.textContent
    );
    settext_update_holiday(
      doc.querySelector("string[name='text_update_holiday']")?.textContent
    );
    settext_holiday_date(
      doc.querySelector("string[name='text_holiday_date']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
      if (GlobalHolidayData?.isEmployeeView === true) {
        setAddHolidayPopup(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <Header />
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <main className="p-2">
          <div
            className={
              AddHolidayPopup === true
                ? "bgblur1 d-flex justify-content-between align-items-center"
                : "d-flex justify-content-between align-items-center"
            }
          >
            <h4 className="my-3">{GlobalHolidayData?.GlobalHolidayListName}</h4>
            {GlobalHolidayData?.isEmployeeView === true ? (
              ""
            ) : (
              <button
                className="CreateBtn"
                onClick={() => setAddHolidayPopup(true)}
              >
                {text_public_holiday}
              </button>
            )}
          </div>
          <Divider />
          <div className="my-3">
            <div>
              <DataTable
                columns={
                  GlobalHolidayData?.isEmployeeView === true
                    ? Employecolumns
                    : columns
                }
                data={HolidayList}
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={TimeSheetTableStyles}
                onChangePage={TablePaginationActions}
              />
            </div>
          </div>
        </main>
      )}
      {AddHolidayPopup ? (
        <>
          <div className="CreateholdidayPopup">
            <div className="row text-end">
              <h3 className="close">
                <CgCloseO onClick={() => CancelClicked()} />
              </h3>
            </div>
            <center>
              <h3>
                {IsEdit ? (
                  <>{text_update_holiday}</>
                ) : (
                  <>{text_public_holiday}</>
                )}
              </h3>
            </center>
            <Divider />
            <div className="d-flex gap-3 flex-wrap mt-3">
              <div>
                <h5>{text_holiday_date}</h5>
                <DatePicker
                  id="JoiningDate"
                  selected={selectDate}
                  dateFormat="MMM dd,yyyy"
                  onChange={(date) => setSelectDate(date)}
                  className="vactionbox1"
                  popperPlacement="auto"
                  maxDate={new Date(`12-31-${GlobalHolidayData.Year}`)}
                  minDate={new Date(`01-01-${GlobalHolidayData.Year}`)}
                />
              </div>
              <div>
                <h5>{text_name_holiday}</h5>
                <input
                  defaultValue={HolidayName}
                  className="vactionbox1"
                  onBlur={(e) => setHolidayName(e.target.value)}
                  placeholder={text_holiday_name}
                />
              </div>
              <div>
                <h5>{text_description}</h5>
                <input
                  defaultValue={Dec}
                  className="vactionbox1"
                  onBlur={(e) => setDec(e.target.value)}
                  placeholder={text_description_ph}
                />
              </div>
              <br />
            </div>
            <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
              <button className="btncancel" onClick={() => CancelClicked()}>
                {button_cancel}
              </button>
              <button
                className="btnsave"
                onClick={() => {
                  IsEdit ? UpdateHoliday() : saveHoliday();
                }}
              >
                {IsEdit ? <>{text_update}</> : <>{button_save}</>}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default AddPublicHoliday;
