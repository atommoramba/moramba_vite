import React, { useMemo, useState, useEffect } from "react";
import Header from "../Header/Header";
import "../Attendance/Attendance.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterComponent from "../../utils/FilterComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { errorToast, successToast } from "../../utils/Helper";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
import { ToastContainer } from "react-toastify";
import Cookie from "js-cookie";
import { Divider } from "@mui/material";

function Attendance() {
  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });
  const AllEmpListOfSelectedCmp = useSelector((state) => state.allEmpList);

  const Company_Name = sessionStorage.getItem("comp_name");
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [attendance_type, setAttendance_type] = useState("");
  const [hoursOfWorking, setHoursOfWorking] = useState("");
  const [remark, setRemark] = useState("");
  const [status_type, setStatus_type] = useState("");
  const [attendancetype, setAttendancetype] = useState("");
  const [Index, setIndex] = useState("0");
  console.log("Selected Index", Index);
  //Language Variables Start
  //old Language Const
  const [text_emp_name, setText_emp_name] = useState("Employee Name");
  const [text_attendancetype, setText_attendancetype] =
    useState("Attendance Type");
  const [text_present, setText_present] = useState("Present");
  const [text_absent, setText_absent] = useState("Absent");
  const [text_half_day, setText_half_day] = useState("Half Day");
  const [text_status_type, setText_status_type] = useState("Status Type");
  const [text_vacation, setText_vacation] = useState("Vacation");
  const [text_other, setText_other] = useState("Other");
  const [text_remark, setText_remark] = useState("Remark");
  const [text_over_time, setText_over_time] = useState("OverTime");
  const [text_working_hours, setText_working_hours] = useState(
    "Enter Working Hours"
  );
  const [text_title_working_hrs, setText_title_working_hrs] =
    useState("Working Hours");
  const [attendanceHeading, setAttendanceHeading] =
    useState("Attendance Sheet");

  const [text_attendance_type, settext_attendance_type] = useState(
    "Select Attendance Type"
  );
  const [text_select_status_type, setText_select_status_type] =
    useState("Select Status Type");
  const [SearchPHText, setSearchPHText] = useState("Search Here...");
  const [text_Sno, setText_Sno] = useState("Sr No");

  const [lateMark_Text, setLateMark_Text] = useState("Late Mark");
  const [errattendance_text, setErrattendance_text] = useState(
    "Please Select Attendance Type"
  );
  const [text_errstatus, setText_errstatus] = useState(
    " Please Select Status Type"
  );
  const [text_Full_Day, setText_Full_Day] = useState("Full Day");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  //new lang variable
  const [leave_text, setLeave_text] = useState("Leave");
  const [privilege_text, setPrivilege_text] = useState("Privilege Leave");
  const [maternity_text, setMaternity_text] = useState("Maternity Leave");
  const [paternity_text, setPaternity_text] = useState("Paternity Leave");
  const [marriagevac_text, setMarriagevac_text] = useState("Marriage Leave");
  const [unpaidvac_text, setUnpaidvac_text] = useState("Unpaid Leave");
  const [medicalleave_text, setMedicalleave_text] = useState("Medical Leave");
  const [atten_medical, setAtten_medical] = useState("Medical");
  const [atten_personal, setAtten_personal] = useState("Personal");
  const [text_End_Date, setText_End_Date] = useState("End Date");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [text_attendanceview, setText_attendanceview] =
    useState("Attendance View");
  const [text_groupattendance, setText_groupattendance] = useState(
    "Mark Group Attendance"
  );
  const [addany_test, setAddany_test] = useState("Select Any");
  const [text_holiday, setText_holiday] = useState("Holiday");
  const [text_Personal_Timeoff, setText_Personal_Timeoff] =
    useState("Personal Timeoff");

  //Language Variables End

  const [isChanged, setIsChanged] = useState(false);

  const [selectDate, setSelectDate] = useState(new Date());

  const [tempstatus, setTempstatus] = useState([]);
  const [temptype, setTemptype] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  console.log(tempstatus);

  const handleStatus = (index, e) => {
    if (tempstatus.find((e) => e.id === index)) {
      console.log(true);
      var indexofStatus = tempstatus.findIndex((e) => e.id === index);
      console.log("OLD ID:", indexofStatus);
      tempstatus[indexofStatus].value = e.target.value;
      setTempstatus(tempstatus);
    } else {
      console.log(false);
      var temp = [...tempstatus, { id: index, value: e.target.value }];
      setTempstatus(temp);
    }
    console.log(temp);
  };

  const handleType = (index, e) => {
    if (temptype.find((e) => e.id === index)) {
      console.log(true);
      var indexofType = temptype.findIndex((e) => e.id === index);
      console.log("OLD Type ID:", indexofType);
      temptype[indexofType].value = e.target.value;
      setTemptype(temptype);
    } else {
      var tempstatus = [...temptype, { id: index, value: e.target.value }];
      setTemptype(tempstatus);
    }
  };

  useEffect(() => {
    if (
      attendance_type ||
      status_type ||
      remark ||
      hoursOfWorking !== "" ||
      null ||
      undefined
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [attendance_type, status_type, remark, hoursOfWorking]);
  const popupValidation = (index) => {
    console.log(index);
    let radioValid = true;

    var selector = document.getElementById("attendacetype" + index);
    var value = selector[selector.selectedIndex].value;
    console.log("Value:", value);

    var statusSelector = document.getElementById("statustype" + index);
    var statusValue = statusSelector[statusSelector.selectedIndex].value;
    if (value === "NA") {
      radioValid = false;
      document.getElementById(
        "ErrorMsg" + index
      ).innerHTML = `*${errattendance_text}!`;
    } else {
      radioValid = true;
      document.getElementById("ErrorMsg" + index).innerHTML = "";
    }
    if (statusValue === "NA") {
      radioValid = false;
      document.getElementById(
        "ErrorMsg2" + index
      ).innerHTML = `*${text_errstatus}!`;
    } else {
      radioValid = true;
      document.getElementById("ErrorMsg2" + index).innerHTML = "";
    }

    return radioValid;
  };

  const disableBtnFunc = (index) => {
    document.getElementById(index).disabled = false;
  };

  const attendanceHandler = (emp_id, index, e) => {
    document.getElementById(index).disabled = true;

    if (popupValidation(index)) {
      setBtnDisabled(true);
      console.log("EMPLOYEE ID", emp_id);
      var utcDay = dayjs
        .utc(dayjs(selectDate, "YYYY-MM-DD HH:mm:ss"))
        .format("YYYY-MM-DD");
      var type = "update";
      var apiUrl =
        GlobalConstants.Cdomain +
        "/API/moramba/v3/update/new/attendance?type=" +
        type;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      var TempStatus = tempstatus.filter(function (e) {
        return e.id === index;
      });

      var TempType = temptype.filter(function (e) {
        return e.id === index;
      });

      console.log(TempStatus[0].value);
      console.log(TempType[0].value);

      var data = {
        _id: "",
        _orgid: sessionStorage.getItem("_compId"),
        createdby: sessionStorage.getItem("username"),
        _partition: GlobalConstants._partition,
        employeeId: emp_id,
        attendanceDay: utcDay === "" ? "2022-01-01" : utcDay,
        attendanceDayUTC: utcDay === "" ? "2022-01-01" : utcDay,
        shiftStartTimeUTC: GlobalConstants.empDefaultShiftStartTime,
        shiftEndTimeUTC: GlobalConstants.empDefaultShiftEndTime,
        statustype: TempType[0].value === "" ? "FullDay" : TempType[0].value,
        description: remark === "" ? "NA" : remark,
        hours: hoursOfWorking === "" ? "8" : hoursOfWorking,
        status: TempStatus[0].value === "" ? "Present" : TempStatus[0].value,
        HalfDayType: "HalfDay",
      };
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          successToast("Attedance Updated succesfully!");

          const $select = document.getElementById("attendacetype" + index);
          $select.value = "NA";
          const $select2 = document.getElementById("statustype" + index);
          $select2.value = "NA";
          setTempstatus([]);
          setTemptype([]);
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
  };
  const [pageCount, setPageCount] = useState(1);
  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "100px",
    },
    {
      name: <>{text_emp_name}</>,
      selector: (row) => row.firstName,
    },
    {
      name: (
        <>
          {text_attendancetype} <span className="Star">*</span>
        </>
      ),
      selector: (row, index) => (
        <>
          <select
            onChange={(e) => [
              setIndex(index),
              setAttendance_type(e.target.value),
              popupValidation(index),
              handleStatus(index, e),
              setAttendancetype(""),
              disableBtnFunc(index),
            ]}
            className="CountryInputbox1"
            id={"attendacetype" + index}
          >
            <option disabled selected value={"NA"}>
              {text_attendance_type}
            </option>
            <option value={"Present"}>{text_present}</option>
            <option value={"Absent"}>{text_absent}</option>
            <option value={"Vacation/Leave"}>
              {text_vacation}/{leave_text}
            </option>
          </select>
          <p className="error_sty" id={"ErrorMsg" + index}></p>
        </>
      ),
    },
    {
      name: (
        <>
          {text_status_type}/{text_remark}
          <span className="Star">*</span>
        </>
      ),
      selector: (row, index) => (
        <>
          <select
            onChange={(e) => [
              setIndex(index),
              setStatus_type(e.target.value),
              popupValidation(index),
              handleType(index, e),
              disableBtnFunc(index),
            ]}
            className="CountryInputbox1"
            id={"statustype" + index}
            key={index}
            onClick={() => setIndex(index)}
          >
            <option disabled selected value={"NA"}>
              {text_select_status_type}
            </option>
            {tempstatus.map((v, i) => {
              return (
                <>
                  {v?.value === "Present" && v?.id === index ? (
                    <>
                      <option value="LateMark">{lateMark_Text}</option>
                      <option value="Overtime">{text_over_time}</option>{" "}
                      <option value="FullDay">{text_Full_Day}</option>
                      <option value="HalfDay">{text_half_day}</option>
                      <option value="HOLIDAY">{text_holiday}</option>
                    </>
                  ) : (
                    <></>
                  )}
                  {v?.value === "Absent" && v?.id === index ? (
                    <>
                      <option value="MED_A">{atten_medical}</option>
                      <option value="CAS_A">{atten_personal}</option>{" "}
                      <option value="Other">{text_other}</option>
                    </>
                  ) : (
                    <></>
                  )}
                  {v?.value === "Vacation/Leave" && v?.id === index ? (
                    <>
                      <option value="MED_L">{medicalleave_text}</option>
                      <option value="PRI_L">{privilege_text}</option>
                      <option value="MAT_L">{maternity_text}</option>
                      <option value="PAT_L">{paternity_text}</option>
                      <option value="MAG_L">{marriagevac_text}</option>
                      <option value="Unpaid">{unpaidvac_text}</option>
                      <option value="PER_L">{text_Personal_Timeoff}</option>
                      <option value="other">{text_other}</option>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </select>
          <p className="error_sty" id={"ErrorMsg2" + index}></p>
        </>
      ),
    },
    {
      name: <>{text_title_working_hrs}</>,
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
            placeholder={text_working_hours}
            onChange={(e) => [
              setHoursOfWorking(e.target.value),
              disableBtnFunc(index),
            ]}
          />
        </>
      ),
    },
    {
      name: <>{button_save}</>,
      selector: (row, index) => (
        <>
          <button
            className={
              isChanged ? "paid1  attendance-btn" : "paid2  attendance-btn"
            }
            id={index}
            onClick={(e) => [
              setIndex(index),
              attendanceHandler(row._id, index, e),
            ]}
          >
            {button_save}
          </button>
        </>
      ),
    },
  ];
  const filteredItems = AllEmpListOfSelectedCmp?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          PlaceHolder={SearchPHText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, SearchPHText]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_attendanceview(
      doc.querySelector("string[name='text_attendanceview']")?.textContent ||
        "Attendance View"
    );

    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
    );
    setText_emp_name(
      doc.querySelector("string[name='text_emp_name']")?.textContent ||
        "Employee Name"
    );
    setText_attendancetype(
      doc.querySelector("string[name='text_attendancetype']")?.textContent ||
        "Attendance Type"
    );
    setText_present(
      doc.querySelector("string[name='text_present']")?.textContent || "Present"
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setText_half_day(
      doc.querySelector("string[name='text_half_day']")?.textContent ||
        "Half Day"
    );
    setText_absent(
      doc.querySelector("string[name='text_absent']")?.textContent || "Absent"
    );
    setText_other(
      doc.querySelector("string[name='text_other']")?.textContent || "Other"
    );
    setText_status_type(
      doc.querySelector("string[name='text_status_type']")?.textContent ||
        "Status Type"
    );
    // setText_Personal_Timeoff(
    //   doc.querySelector("string[name='text_Personal_Timeoff']")
    //     ?.textContent
    // );
    setText_over_time(
      doc.querySelector("string[name='text_over_time']")?.textContent ||
        "OverTime"
    );
    setText_title_working_hrs(
      doc.querySelector("string[name='text_title_working_hrs']")?.textContent ||
        "Working Hours"
    );
    setText_working_hours(
      doc.querySelector("string[name='text_working_hours']")?.textContent ||
        "Enter Working Hours"
    );
    setText_vacation(
      doc.querySelector("string[name='text_vacation']")?.textContent ||
        "Vacation"
    );
    setText_remark(
      doc.querySelector("string[name='text_remark']")?.textContent || "Remark"
    );

    setAttendanceHeading(
      doc.querySelector("string[name='attendanceHeading']")?.textContent ||
        "Attendance Sheet"
    );

    setText_select_status_type(
      doc.querySelector("string[name='text_select_status_type']")
        ?.textContent || "Select Status Type"
    );
    setSearchPHText(
      doc.querySelector("string[name='SearchPHText']")?.textContent ||
        "Search Here..."
    );

    setLateMark_Text(
      doc.querySelector("string[name='lateMark_Text']")?.textContent ||
        "Late Mark"
    );
    setText_Full_Day(
      doc.querySelector("string[name='text_Full_Day']")?.textContent ||
        "Full Day"
    );
    setLeave_text(
      doc.querySelector("string[name='leave_text']")?.textContent || "Leave"
    );
    setPrivilege_text(
      doc.querySelector("string[name='privilege_text']")?.textContent ||
        "Privilege Leave"
    );
    setMaternity_text(
      doc.querySelector("string[name='maternity_text']")?.textContent ||
        "Maternity Leave"
    );
    setPaternity_text(
      doc.querySelector("string[name='paternity_text']")?.textContent ||
        "Paternity Leave"
    );
    setMarriagevac_text(
      doc.querySelector("string[name='marriagevac_text']")?.textContent ||
        "Marriage Leave"
    );
    setUnpaidvac_text(
      doc.querySelector("string[name='unpaidvac_text']")?.textContent ||
        "Unpaid Leave"
    );
    setMedicalleave_text(
      doc.querySelector("string[name='medicalleave_text']")?.textContent ||
        "Medical Leave"
    );
    setErrattendance_text(
      doc.querySelector("string[name='errattendance_text']")?.textContent ||
        "Please Select Attendance Type"
    );
    setText_errstatus(
      doc.querySelector("string[name='text_errstatus']")?.textContent ||
        " Please Select Status Type"
    );
    setAddany_test(
      doc.querySelector("string[name='addany_test']")?.textContent ||
        "Select Any"
    );
    setAtten_medical(
      doc.querySelector("string[name='atten_medical']")?.textContent ||
        "Medical"
    );
    setAtten_personal(
      doc.querySelector("string[name='atten_personal']")?.textContent ||
        "Personal"
    );
    setText_End_Date(
      doc.querySelector("string[name='text_End_Date']")?.textContent ||
        "End Date"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent ||
        "Start Date"
    );

    setText_groupattendance(
      doc.querySelector("string[name='text_groupattendance']")?.textContent ||
        "Mark Group Attendance"
    );
    setText_holiday(
      doc.querySelector("string[name='text_holiday']")?.textContent || "Holiday"
    );
    settext_attendance_type(
      doc.querySelector("string[name='text_attendance_type']")?.textContent ||
        "Select Attendance Type"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const [selectedEmp, setselectedEmp] = useState([]);
  console.log(selectedEmp, "-->>");
  const [AllAttendanceBtn, setAllAttendanceBtn] = useState(false);
  const [AllAttedancePopup, setAllAttedancePopup] = useState(false);
  const [MultiDateBtn, setMultiDateBtn] = useState(false);
  // console.log(selectedEmp);
  const handleSelectedEmp = ({ selectedCount, selectedRows }) => {
    if (selectedCount === 0) {
      setAllAttendanceBtn(false);
      setAllAttedancePopup(false);
    } else {
      setAllAttendanceBtn(true);
    }
    if (selectedCount === 1) {
      setMultiDateBtn(true);
    } else {
      setMultiDateBtn(false);
    }
    // console.log(selectedRows);// Selected Data in Arr formate
    var tempId = [];
    selectedRows.map((item, idx) => {
      if (idx <= 19) {
        var id = {
          employeeId: item._id,
          _orgid: item._orgId,
        };
        tempId.push(id);
      }
    });
    setselectedEmp(tempId);
    console.log(tempId);
  };
  //validation var
  const [errmarkattentype, seterrmarkattentype] = useState("");
  const [errremark, setErrremark] = useState("");

  const [GroupAttendanceType, setGroupAttendanceType] = useState("");
  const [GroupStatusType, setGroupStatusType] = useState("");
  const [GroupDate, setGroupDate] = useState(new Date());
  const [GroupEndDate, setGroupEndDate] = useState(new Date());
  const MarkattenValidation = () => {
    let markValid = true;
    if (GroupAttendanceType === "") {
      markValid = false;
      seterrmarkattentype(<>*{errattendance_text}!</>);
    }
    if (GroupStatusType === "") {
      markValid = false;
      setErrremark(<>*{text_errstatus}!</>);
    }
    return markValid;
  };
  const SaveGroupAttendance = () => {
    if (MarkattenValidation()) {
      //Code for GroupAttendance
      var apiUrl =
        GlobalConstants.Cdomain + "/API/moramba/v3/update/new/bulk/attendance";
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      var startDate = dayjs(GroupDate);
      var endDate = dayjs(GroupEndDate);

      var dayssDiff = endDate.diff(startDate, "days");
      console.log("daterange->" + dayssDiff);
      var daterange = [];
      if (dayssDiff == 0) {
        daterange.push({ day: startDate.format("YYYY-MM-DD") });
      } else if (dayssDiff > 0) {
        daterange.push({ day: startDate.format("YYYY-MM-DD") });
        for (let i = 1; i <= dayssDiff; i++) {
          var m = startDate.add(1, "days");
          daterange.push({ day: m.format("YYYY-MM-DD") });
        }
      }
      var orgID = sessionStorage.getItem(
        GlobalConstants.session_current_company_id
      );
      var data = {
        _orgId: orgID,
        status: GroupAttendanceType,
        statustype: GroupStatusType,
        attendanceDayUTC: MultiDateBtn
          ? daterange
          : dayjs(GroupDate).format("YYYY-MM-DD"),
        emplist: selectedEmp,
        multiDate: MultiDateBtn ? true : false,
      };

      console.log(data);
      axios
        .post(apiUrl, data, headerConfig)
        .then(function (response) {
          setAllAttedancePopup(false);
          successToast("Attendance Added Successfully!");
          console.log(response.data.data);
          setGroupAttendanceType("");
          setGroupStatusType("");
          setGroupEndDate(new Date());
          setGroupDate(new Date());
        })
        .catch(function () {});
    }
  };
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
  const closePopup = () => {
    setGroupAttendanceType("");
    setGroupStatusType("");
    setGroupDate(new Date());
    setGroupEndDate(new Date());
  };
  return (
    <>
      <Header />
      <div
        className={
          AllAttedancePopup === true ? "bgblur1 PayrollBox" : "PayrollBox"
        }
      >
        <h3 className="mt-5 text-center HeadingText">{attendanceHeading}</h3>
        <div className="row  mb-4">
          <div className="col-md-8">
            <h3 className="HeadingText hi4">{Company_Name}</h3>
          </div>
          <div className="col-md-1 mark-attendance">
            {AllAttendanceBtn && (
              <button
                className="CreateBtn me-3 mt-1 groupatten"
                onClick={() => setAllAttedancePopup(true)}
              >
                {text_groupattendance}
              </button>
            )}
          </div>
          <div className="col-md-3   att-below-title salary_fetch">
            <div>
              <Link to="/full-attendance">
                <button className="CreateBtn me-3">
                  {text_attendanceview}
                </button>
              </Link>
            </div>
            <div className=" att-calender">
              <DatePicker
                selected={selectDate}
                dateFormat="MMM dd,yyyy"
                showMonthDropdown
                showYearDropdown
                onChange={(date) => [setSelectDate(date)]}
                className="vactionbox1"
                dropdownMode="select"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end att-search mt-2">
            <div className="d-flex flex-row Searchbar att-search-inner search_temp">
              <SearchIcon />
              {subHeaderComponent}
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          customStyles={customTableStyles}
          className="attendance-datatable"
          striped
          pointerOnHover
          selectableRows
          onChangePage={TablePaginationActions}
          onSelectedRowsChange={handleSelectedEmp}
        />
      </div>
      {AllAttedancePopup ? (
        <>
          <div className="main">
            <div className="popupAttenSingle">
              <div className="text-end close">
                <CgCloseO
                  className="closeIconSty"
                  onClick={() => setAllAttedancePopup(false)}
                />
              </div>
              <h2 className="text-center">{text_groupattendance}</h2>
              <Divider />
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h5>
                    {MultiDateBtn === true ? <>{text_start_date}</> : "Date"}
                  </h5>
                  <div className="me-4 att-calender">
                    <DatePicker
                      selected={GroupDate}
                      dateFormat="MMM dd,yyyy"
                      showMonthDropdown
                      showYearDropdown
                      onChange={(date) => [setGroupDate(date)]}
                      className="vactionbox1"
                      popperPlacement="auto"
                      dropdownMode="select"
                    />
                  </div>
                </div>
                {MultiDateBtn === true && (
                  <div>
                    <h5>{text_End_Date}</h5>
                    <DatePicker
                      selected={GroupEndDate}
                      dateFormat="MMM dd,yyyy"
                      showMonthDropdown
                      popperPlacement="auto"
                      showYearDropdown
                      onChange={(date) => [setGroupEndDate(date)]}
                      className="vactionbox1"
                      dropdownMode="select"
                    />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <div>
                  <h4>
                    {text_attendancetype} <span className="Star">*</span>
                  </h4>
                  <select
                    value={GroupAttendanceType}
                    className="CountryInputbox1"
                    onChange={(e) => [
                      setGroupAttendanceType(e.target.value),
                      seterrmarkattentype(""),
                    ]}
                  >
                    <option value="" selected disabled>
                      {addany_test}
                    </option>
                    <option value="Present">{text_present}</option>
                    <option value="Absent">{text_absent}</option>
                    <option value="Vacation/Leave">
                      {text_vacation}/{leave_text}
                    </option>
                  </select>
                  <br />
                  <span className="error_sty">{errmarkattentype}</span>
                </div>
                <div className="mt-3">
                  {GroupAttendanceType !== "" && (
                    <h4>
                      {text_status_type}/{text_remark}
                      <span className="Star">*</span>
                    </h4>
                  )}
                  {GroupAttendanceType === "Present" && (
                    <>
                      <select
                        value={GroupStatusType}
                        className="CountryInputbox1"
                        onChange={(e) => [
                          setGroupStatusType(e.target.value),
                          setErrremark(""),
                        ]}
                      >
                        <option value="" selected disabled>
                          {addany_test}
                        </option>
                        <option value="FullDay">{text_Full_Day}</option>
                        <option value="HalfDay">{text_half_day}</option>
                        <option value="LateMark">{lateMark_Text}</option>
                        <option value="Overtime">{text_over_time}</option>
                        <option value="HOLIDAY">{text_holiday}</option>{" "}
                      </select>
                      <br />
                      <span className="error_sty">{errremark}</span>
                    </>
                  )}
                  {GroupAttendanceType === "Absent" && (
                    <>
                      <select
                        value={GroupStatusType}
                        className="CountryInputbox1"
                        onChange={(e) => [
                          setGroupStatusType(e.target.value),
                          setErrremark(""),
                        ]}
                      >
                        {" "}
                        <option value="" selected disabled>
                          {addany_test}
                        </option>
                        <option value="MED_A">{atten_medical}</option>
                        <option value="CAS_A">{atten_personal}</option>{" "}
                        <option value="Other">{text_other}</option>
                      </select>
                      <br />
                      <span className="error_sty">{errremark}</span>
                    </>
                  )}
                  {GroupAttendanceType === "Vacation/Leave" && (
                    <>
                      <select
                        value={GroupStatusType}
                        className="CountryInputbox1"
                        onChange={(e) => [
                          setGroupStatusType(e.target.value),
                          setErrremark(""),
                        ]}
                      >
                        <option value="" selected disabled>
                          {addany_test}
                        </option>
                        <option value="MED_L">{medicalleave_text}</option>
                        <option value="PRI_L">{privilege_text}</option>
                        <option value="MAT_L">{maternity_text}</option>
                        <option value="PAT_L">{paternity_text}</option>
                        <option value="MAG_L">{marriagevac_text}</option>
                        <option value="Unpaid">{unpaidvac_text}</option>
                        <option value="PER_L">{text_Personal_Timeoff}</option>
                        <option value="other">{text_other}</option>
                      </select>
                      <br />
                      <span className="error_sty">{errremark}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3 gap-3">
                <button
                  className="btncancel"
                  onClick={() => [setAllAttedancePopup(false), closePopup()]}
                >
                  {button_cancel}
                </button>
                <button
                  className="btnsave"
                  onClick={() => SaveGroupAttendance()}
                >
                  {button_save}
                </button>
              </div>
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

export default Attendance;
