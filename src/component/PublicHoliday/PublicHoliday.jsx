import React, { useEffect, useMemo, useState } from "react";
import Header from "../Header/Header";
import { GlobalConstants, countriesList } from "../../utils/GlobalConstants";
import { Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import FilterComponent from "../../utils/FilterComponent";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import {
  errorToast,
  infoToast,
  successToast,
  warnToast,
} from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import "./PublicHoliday.css";
import { CgCloseO } from "react-icons/cg";
import ReactFlagsSelect from "react-flags-select";
import { TimeSheetTableStyles } from "../../utils/CommanTableStyle";
import axios from "axios";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

function PublicHoliday() {
  const navigate = useNavigate();
  const isFromEmp = useLocation();
  const EmployeeView =
    isFromEmp?.state?.IsFromEmployee === undefined
      ? false
      : isFromEmp?.state?.IsFromEmployee;
  console.log(EmployeeView);
  const [GlobalList, setGlobalList] = useState([]);
  const [Country, setCountry] = useState("India");
  const [CountryCode, setCountryCode] = useState("IN");
  const [Descrtipton, setDescrtipton] = useState("");
  const [SelectedYear, setSelectedYear] = useState(new Date());
  const [UpdateId, setUpdateId] = useState("");
  const setCountyData = (d) => {
    var countryName = countriesList[d];
    setCountry(countryName);
    setCountryCode(d);
  };
  const [createCalendarPopup, setCreateCalendarPopup] = useState(false);
  const [IsUpdate, setIsUpdate] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  //language starts
  const [create_button, setcreate_button] = useState("+ Create New Calendar");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_update, setText_update] = useState("Update");
  const [text_selCountry, setText_selCountry] = useState("Select Country");
  const [text_year, setText_year] = useState("Year");
  const [text_description, setText_description] = useState("Description");
  const [text_description_ph, setText_description_ph] =
    useState("Enter Description");
  const [text_Holiday_search_ph, setText_Holiday_search_ph] = useState(
    "Search Holiday Here..."
  );
  const [btn_view, setbtn_view] = useState("View");
  const [text_public_hol, settext_public_hol] = useState("Public Holiday");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [approve_name, setApprove_name] = useState("Name");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_view_add, settext_view_add] = useState("View & Add");
  const [text_delete, setText_delete] = useState("Delete");
  const [txt_base_calender, settext_base_calender] = useState(
    "Choose base calendar"
  );
  const [text_update_calender, seTtext_update_calender] = useState(
    "Update Base Calendar"
  );
  const [IsLoading, setIsLoading] = useState(true);

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        PlaceHolder={text_Holiday_search_ph}
      />
    );
  }, [filterText, resetPaginationToggle, text_Holiday_search_ph]);

  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
  const filteredItems = GlobalList?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  //@ View At Company Level
  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "100px",
    },
    {
      name: <>{text_year}</>,
      selector: (row) => row?.year,
      width: "100px",
    },
    {
      name: <>{approve_name}</>,
      selector: (row) => row?.calendartype,
    },
    {
      name: <>{text_description}</>,
      width: "50%",
      selector: (row) => (row?.description === "" ? "-" : row?.description),
    },
    {
      name: <>{text_view_add}</>,
      width: "140px",
      selector: (row) => (
        <>
          <button
            className="CreateBtn"
            onClick={() =>
              navigate("/view/holidays", {
                state: {
                  GlobalID: row?._id,
                  GlobalHolidayListName: row?.calendartype,
                  Year: row?.year,
                },
              })
            }
          >
            {text_view_add}
          </button>
        </>
      ),
    },
    {
      name: <>{text_edit}</>,
      width: "140px",
      selector: (row) => (
        <>
          <button
            className="ViewBtn p-2"
            onClick={() => [
              setIsUpdate(true),
              setCreateCalendarPopup(true),
              setUpdateId(row._id),
              FetchEditCountry(row.calendartype),
              setDescrtipton(row.description),
              setSelectedYear(new Date(dayjs(row.Year).format("MM DD,YYYY"))),
            ]}
          >
            {text_edit}
          </button>
        </>
      ),
    },
    {
      name: <>{text_delete}</>,
      width: "140px",
      selector: (row) => (
        <>
          <button
            className="btncancel"
            onClick={() => DeleteGlobalHolidayList(row?._id)}
          >
            {text_delete}
          </button>
        </>
      ),
    },
  ];

  //@ View At Employee Level
  const Employeecolumns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "100px",
    },
    {
      name: <>{text_year}</>,
      selector: (row) => row?.year,
      width: "100px",
    },
    {
      name: <>{approve_name}</>,
      selector: (row) => row?.calendartype,
    },
    {
      name: <>{text_description}</>,
      width: "50%",
      selector: (row) => (row?.description === "" ? "-" : row?.description),
    },
    {
      name: <>{btn_view}</>,
      width: "140px",
      selector: (row) => (
        <>
          <button
            className="CreateBtn"
            onClick={() =>
              navigate("/view/holidays", {
                state: {
                  GlobalID: row?._id,
                  GlobalHolidayListName: row?.calendartype,
                  Year: row?.year,
                  isEmployeeView: EmployeeView,
                },
              })
            }
          >
            {btn_view}
          </button>
        </>
      ),
    },
  ];
  //@ TO Insert Global List of Public Holiday
  const SaveGlobalHolidayItem = () => {
    var type = "insert";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/countrycalendar?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      calendartype: Country + " Calendar",
      description: Descrtipton,
      year: dayjs(SelectedYear).format("YYYY"),
      country: Country,
    };
    axios
      .post(api_url, Data, headerConfig)
      .then((response) => {
        console.log(response);
        fetchGlobalList();
        successToast("Holiday List Created!");
        setCreateCalendarPopup(false);
        setCountry("India");
        setCountryCode("IN");
        setDescrtipton("");
        setSelectedYear(new Date());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //@ TO Delete Global List of Public Holiday
  const DeleteGlobalHolidayList = (GlobalId) => {
    var type = "delete";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/countrycalendar?type=" +
      type;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      _id: GlobalId,
    };
    axios
      .post(api_url, Data, headerConfig)
      .then((response) => {
        warnToast("Holiday List Deleted!");
        fetchGlobalList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //@ TO Fetch Global List of Public Holiday
  const fetchGlobalList = () => {
    setIsLoading(true);
    var type = "selectall";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/countrycalendar?type=" +
      type +
      "&_orgId=" +
      sessionStorage.getItem("_compId");
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(api_url, headerConfig)
      .then((response) => {
        console.log(response);
        setGlobalList(response.data.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  //@ TO Fetch Global List of Public Holiday Evey Time Page Renders
  useEffect(() => {
    fetchGlobalList();
  }, []);
  //@ TO Fetch Country While Edit
  const FetchEditCountry = (Oldcountry) => {
    var key = Object.keys(countriesList).find(
      (key) => countriesList[key] === Oldcountry.split(" ")[0]
    );
    setCountryCode(key);
  };
  //@ TO Update Global List of Public Holiday
  const UpdateSelectedGlobalList = () => {
    var type = "update";
    var api_url =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/publicholiday/countrycalendar?type=" +
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
      calendartype: Country + " Calendar",
      description: Descrtipton,
      year: dayjs(SelectedYear).format("YYYY"),
      country: Country,
    };
    axios
      .post(api_url, Data, headerConfig)
      .then((response) => {
        console.log(response);
        fetchGlobalList();
        infoToast("Holiday List Updated!");
        setCreateCalendarPopup(false);
        setCountry("India");
        setCountryCode("IN");
        setDescrtipton("");
        setSelectedYear(new Date());
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //@ TO Clear All State on Cancel
  const CancelClicked = () => {
    setCreateCalendarPopup(false);
    setCountry("India");
    setCountryCode("IN");
    setDescrtipton("");
    setSelectedYear(new Date());
  };
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setcreate_button(
      doc.querySelector("string[name='create_button']")?.textContent ||
        "+ Create New Calendar"
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
    );
    setApprove_name(
      doc.querySelector("string[name='approve_name']")?.textContent || "Name"
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']")?.textContent || "Edit"
    );
    setText_delete(
      doc.querySelector("string[name='text_delete']")?.textContent || "Delete"
    );
    settext_view_add(
      doc.querySelector("string[name='text_view_add']")?.textContent ||
        "View & Add"
    );
    setText_Holiday_search_ph(
      doc.querySelector("string[name='text_Holiday_search_ph']")?.textContent ||
        "Search Holiday Here..."
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent || "Save"
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent || "Cancel"
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent || "Update"
    );
    setText_selCountry(
      doc.querySelector("string[name='text_selCountry']")?.textContent ||
        "Select Country"
    );
    setText_year(
      doc.querySelector("string[name='text_year']")?.textContent || "Year"
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent ||
        "Description"
    );
    setText_description_ph(
      doc.querySelector("string[name='text_description']")?.textContent ||
        "Enter Description"
    );
    settext_base_calender(
      doc.querySelector("string[name='txt_base_calender']")?.textContent ||
        "Choose base calendar"
    );
    seTtext_update_calender(
      doc.querySelector("string[name='text_update_calender']")?.textContent ||
        "Update Base Calendar"
    );
    settext_public_hol(
      doc.querySelector("string[name='text_public_hol']")?.textContent ||
        "Public Holiday"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
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
      <Header />
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <main className="p-4">
          <div
            className={
              createCalendarPopup === true
                ? "bgblur1 d-flex justify-content-between align-items-center my-2"
                : "d-flex justify-content-between align-items-center my-2"
            }
          >
            <h3>
              {sessionStorage.getItem(
                GlobalConstants.session_current_comp_name
              )}
              's {text_public_hol}
            </h3>
            {EmployeeView === true ? (
              ""
            ) : (
              <button
                className="CreateBtn"
                onClick={() => setCreateCalendarPopup(true)}
              >
                {create_button}
              </button>
            )}
          </div>
          <Divider />
          <div className="d-flex justify-content-end my-2">
            <div className="d-flex flex-row align-items-center Searchbar searchbarbox">
              <SearchIcon />
              {subHeaderComponent}
            </div>
          </div>
          <div>
            <DataTable
              columns={EmployeeView === true ? Employeecolumns : columns}
              data={filteredItems}
              // pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={TimeSheetTableStyles}
              onChangePage={TablePaginationActions}
            />
          </div>
        </main>
      )}

      {createCalendarPopup ? (
        <>
          <div className="CreateCalPopup">
            <div className="row text-end">
              <h3 className="close">
                <CgCloseO onClick={() => CancelClicked()} />
              </h3>
            </div>
            <center>
              <h3>
                {IsUpdate ? (
                  <>{text_update_calender}</>
                ) : (
                  <>{txt_base_calender}</>
                )}
              </h3>
            </center>
            <Divider />
            <div className="mt-3">
              <h4>{text_selCountry}</h4>
              <ReactFlagsSelect
                id="EmpCountry"
                className="CountryInputbox1"
                selected={CountryCode}
                onSelect={(code) => setCountyData(code)}
                searchable={true}
                inputStyle={{
                  background: "#ffffff",
                  width: "60%",
                  height: "43px",
                  borderBottom: "3px solid #6d9886",
                }}
              />
            </div>
            <div className="d-flex justify-content-start gap-3 align-items-center mt-3">
              <div>
                <h4>{text_year}</h4>
                <DatePicker
                  selected={SelectedYear}
                  // placeholderText="Enter Date"
                  dateFormat="yyyy"
                  // showMonthDropdown
                  // showYearDropdown
                  onChange={(date) => setSelectedYear(date)}
                  className="vactionbox1"
                  // dropdownMode="select"
                  showYearPicker
                  popperPlacement="auto"
                />
              </div>
              <div className="w-100">
                <h4>{text_description}</h4>
                <input
                  placeholder={text_description_ph}
                  className="w-100"
                  defaultValue={Descrtipton}
                  onBlur={(e) => setDescrtipton(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
              <button className="btncancel" onClick={() => CancelClicked()}>
                <>{button_cancel}</>
              </button>
              <button
                className="btnsave"
                onClick={() =>
                  IsUpdate
                    ? UpdateSelectedGlobalList()
                    : SaveGlobalHolidayItem()
                }
              >
                {IsUpdate ? <>{text_update}</> : <>{button_save}</>}
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

export default PublicHoliday;
