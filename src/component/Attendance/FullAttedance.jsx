import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../Header/Header";
import RandomeText from "../../utils/RandomeText";
import "./FullAttendance.css";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { errorToast } from "../../utils/Helper";
import dayjs from "dayjs";

import DatePicker from "react-datepicker";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function FullAttedance() {
  const [IsLoading, setIsLoading] = useState(true);
  const [FinalDays, setFinalDays] = useState([]);
  // console.log(FinalDays);

  const [SelectedYear, setSelectedYear] = useState(new Date());
  const [SelectedMonth, setSelectedMonth] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [NewData, setNewData] = useState([]);
  //language variable
  const [text_emp_name, setText_emp_name] = useState("Employee Name");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [text_fullattenview, setText_fullattenview] =
    useState("Attendance View of");
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    var FinalDay = [];
    var daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    // console.log(days);
    days.map((daylist, index) => {
      var selectedDayData = {
        id: index + RandomeText(5),
        date: daylist.getDate(),
        day: daysList[daylist.getDay()],
      };
      FinalDay.push(selectedDayData);
    });
    setFinalDays(FinalDay);
    return days;
  };

  const handleMonthYear = (date) => {
    setSelectedMonth(date);
    setSelectedYear(date);
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    //console.log(date.getMonth()+1,date.getFullYear());
  };
  useEffect(() => {
    getDaysInMonth(
      new Date(SelectedYear).getMonth(),
      new Date(SelectedYear).getFullYear()
    );
  }, [SelectedMonth, SelectedYear]);
  useEffect(() => {
    setIsLoading(true);

    var month = dayjs(SelectedMonth).format("MMM");
    var Year = dayjs(SelectedYear).format("YYYY");
    var orgID = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/all/emp/attendance?month=" +
      month +
      "&year=" +
      Year +
      "&orgId=" +
      orgID +
      "&limit=25";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response) {
        var Attendance = response.data.data.empall;
        var daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const arr1 = JSON.stringify(Attendance);
        const arr2 = JSON.parse(arr1);
        for (let i = 0; i < arr2.length; i++) {
          arr2[i].attendances = [];
        }
        for (let i = 0; i < arr2.length; i++) {
          for (let j = 1; j <= 31; j++) {
            arr2[i].attendances.push({
              attendanceDay: "NA",
              status: "NA",
              statustype: "NA",
              firstName: arr2[i].firstName,
              lastName: arr2[i].lastName,
              _id: arr2[i]._id,
              _orgId: arr2[i]._orgId,
              days: daysList[
                new Date(arr2[i]?.attendances[j]?.attendanceDay).getDay()
              ],
            });
          }
        }
        for (let i = 0; i < Attendance.length; i++) {
          for (let j = 0; j < Attendance[i].attendances.length; j++) {
            arr2[i].attendances[
              Number(
                dayjs(Attendance[i].attendances[j].attendanceDay).format("D")
              ) - 1
            ] = {
              attendanceDay: Attendance[i]?.attendances[j]?.attendanceDay,
              statustype: Attendance[i]?.attendances[j]?.statustype,
              status: Attendance[i]?.attendances[j]?.status,
              days: daysList[
                new Date(Attendance[i]?.attendances[j]?.attendanceDay).getDay()
              ],
            };
          }
        }
        setIsLoading(false);
        setNewData(arr2);
      })
      .catch(function (error) {
        setIsLoading(false);
        errorToast("Something Went Wrong Try Again!");
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
  }, [SelectedMonth, SelectedYear]);
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_emp_name(
      doc.querySelector("string[name='text_emp_name']")?.textContent
    );
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
    setText_fullattenview(
      doc.querySelector("string[name='text_fullattenview']")?.textContent
    );
  };
  return (
    <>
      <Header />
      <h2 className="text-center my-4 HeadingText">
        {text_fullattenview} {dayjs(SelectedMonth).format("MMM")},
        {dayjs(SelectedYear).format("YYYY")}
      </h2>
      <div className="d-flex gap-3 justify-content-end">
        <div>
          <DatePicker
            selected={SelectedMonth}
            onChange={(date) => handleMonthYear(date)}
            showMonthYearPicker
            maxDate={new Date()}
            dateFormat="MMM"
            popperPlacement="bottom"
            className="fullattentable"
          />
        </div>
        <div>
          <DatePicker
            className="me-3 fullattentable"
            selected={SelectedYear}
            onChange={(date) => handleMonthYear(date)}
            showYearPicker
            dateFormat="yyyy"
            maxDate={new Date()}
            popperPlacement="bottom"
          />
        </div>
      </div>
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="scrollTableDashbaord mt-4 p-3">
            <table className="FullAttendanceTable">
              <thead>
                <tr>
                  <th style={{ width: "22px" }}>{text_Sno}.</th>
                  <th>{text_emp_name}</th>
                  {FinalDays.map((value) => {
                    return (
                      <>
                        <th
                          key={value.id}
                          style={{ width: "49px", textAlign: "center" }}
                        >
                          {value.date}
                          <br />
                          {value.day}
                        </th>
                      </>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {NewData.map((value, idx) => {
                  return (
                    <>
                      <tr>
                        <td>{idx + 1}</td>
                        <td>
                          {value?.firstName}&nbsp;
                          {value?.lastName}
                        </td>
                        {value?.attendances.map((x, index) => {
                          return (
                            <>
                              {console.log(x)}
                              {index !== FinalDays.length && (
                                <td
                                  className={
                                    x.status === "Absent"
                                      ? "AbsentClass"
                                      : x.status === "Present"
                                      ? "PresentClass"
                                      : x.status === "Vacation/Leave"
                                      ? "leaveClass"
                                      : ""
                                  }
                                  style={{ width: "49px", textAlign: "center" }}
                                >
                                  {x.status === "Present"
                                    ? x.statustype === "HOLIDAY"
                                      ? "H"
                                      : "P"
                                    : x.status === "Absent"
                                    ? "A"
                                    : x.status === "Vacation/Leave"
                                    ? "L"
                                    : dayjs(
                                        dayjs(
                                          year + "-" + month + "-" + (index + 1)
                                        ).format("YYYY-MM-DD")
                                      ).day() == 0
                                    ? "W"
                                    : "-"}
                                </td>
                              )}
                            </>
                          );
                        })}{" "}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default FullAttedance;
