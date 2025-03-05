import React, { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./RegisterComp.css";
import DatePicker from "react-datepicker";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  countriesList,
  GetUTCNow,
  GlobalConstants,
} from "../../utils/GlobalConstants";
import {
  successToast,
  errorToast,
  warnToast,
  infoToast,
} from "../../utils/Helper";
import { CgCloseO } from "react-icons/cg";
import compLogo from "../../assets/img/Bank.png";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { getCompany } from "../../redux/selectCompanySlice";
import Cookie from "js-cookie";
import { CountryCodewithEmoji } from "../../utils/data";

function RegisterComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //Language Variables Start
  const [regCompTitle, setRegCompTitle] = useState("Register Company");
  const [regCompedit, setRegCompedit] = useState("Edit Company");
  const [text_selCountry, setText_selCountry] = useState("Select Country");
  const [text_Ph_selCountry, setText_Ph_selCountry] =
    useState("Select a Country");
  const [saveDisable, setSaveDisable] = useState(false);
  const [err_selCountry, setErr_selCountry] = useState("Please Select Country");
  const [text_statev3, setText_statev3] = useState("Select a State");
  const [text_Zip, setText_Zip] = useState("Zip");
  const [hint_workHours, setHint_workHours] = useState("Working Hours Per Day");
  const [text_ProVacaDay, setText_ProVacaDay] = useState(
    "Provide Vacation Days"
  );
  const [text_upload_Profile, setText_upload_Profile] =
    useState("Upload Profile");
  const [text_unique_business_name, settext_unique_business_name] =
    useState("Company Name");
  const [text_company_address, setText_company_address] =
    useState("Company Address");
  const [text_company_name, setText_company_name] = useState(
    "Enter your Company Name"
  );
  const [text_sandwitch_leave, setText_sandwitch_leave] =
    useState("Sandwich Leaves");
  const [text_company_enteraddress, setText_company_enteraddress] = useState(
    "Enter your Company Address"
  );
  const [text_state, setText_state] = useState("State");
  const [text_hint_zip_code, setText_hint_zip_code] =
    useState("Enter Zip Code");
  const [text_fiscal_year, setText_fiscal_year] = useState("Fiscal Year");
  const [text_working_days, setText_working_days] = useState("Working Days");
  const [text_monday, setText_monday] = useState("Monday");
  const [text_tuesday, setText_tuesday] = useState("Tuesday");
  const [text_wednesday, setText_wednesday] = useState("Wednesday");
  const [text_thursday, setText_thursday] = useState("Thursday");
  const [text_friday, setText_friday] = useState("Friday");
  const [text_saturday, setText_saturday] = useState("Saturday");
  const [text_sunday, setText_sunday] = useState("Sunday");
  const [text_half_day, setText_half_day] = useState("Half Day");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_update, setText_update] = useState("Update");
  const [button_next, setButton_next] = useState("Next");
  const [button_save, setButton_save] = useState("Save");
  const [text_addchoosefile, settext_addchoosefile] = useState("choose file");
  const [text_Postal_v3, setText_Postal_v3] = useState("Postal Code");
  // const for validation error variables
  const [text_vacations_Enter_days, setText_vacations_Enter_days] = useState(
    "Enter Vacation Days"
  );
  const [company_errname, setCompany_errname] = useState(
    "Please Enter Company Name"
  );
  const [company_erraddress, setCompany_erraddress] = useState(
    "Please Enter Company Address"
  );
  const [text_err_enter_state, setText_err_enter_state] = useState(
    "Please Select State"
  );
  const [text_err_wh1, setText_err_wh1] = useState(
    "Working hours should be between 1 to 24"
  );
  //Language Variables Ends

  const cname =
    location.pathname === "/registercompany/edit"
      ? sessionStorage.getItem("comp_name")
      : "";
  const uniqueId = uuid();
  const [Country, setCountry] = useState("India");
  const [Currency, setCurrency] = useState("INR");
  const [state, setState] = useState("");
  const [fiscalDate, setFiscalDate] = useState(new Date());
  const [pincode, setPincode] = useState("");
  const [workinghour, setWorkinghour] = useState("8");
  const [vacationdays, setVacationdays] = useState("21");
  const [IsSandwichLeave, setIsSandwichLeave] = useState(false);
  const [op_mode, setOp_mode] = useState("insert");
  const [popupprofile, setPopupprofile] = useState(false); /*popup variable*/
  const [docId, setDocId] = useState();
  const [fileToUpload, setFileToUpload] = useState();
  const [fileNameUpload, setfileNameUpload] = useState();
  const [fileSizeUpload, setfileSizeUpload] = useState();
  const [fileTypeUpload, setfileTypeUpload] = useState();
  const [imageUrl, setimageUrl] = useState("");
  const [imageKey, setimageKey] = useState("");
  const [isNewimageUrl, setisNewimageUrl] = useState(false);
  const [isNewimageKey, setisNewimageKey] = useState(false);
  const [file, setFile] = useState();
  const [CountryCode, setCountryCode] = useState("IN");

  const [startDate, setStartDate] = useState(new Date());
  const [compLogoStatus, setcompLogoStatus] = useState("drafted");
  const [Client, setClient] = useState("");

  const [companyname, setCompanyname] = useState("");
  const [compaddress, setCompaddress] = useState("");

  //active btn
  const [isActive, setIsActive] = useState(true);
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(true);
  const [isActive3, setIsActive3] = useState(true);
  const [isActive4, setIsActive4] = useState(true);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);

  const [halfMonChecked, setHalfMonChecked] = useState(false);
  const [halfTueChecked, setHalfTueChecked] = useState(false);
  const [halfWedChecked, setHalfWedChecked] = useState(false);
  const [halfThuChecked, setHalfThuChecked] = useState(false);
  const [halfFriChecked, setHalfFriChecked] = useState(false);
  const [halfSatChecked, setHalfSatChecked] = useState(false);
  const [halfSunChecked, setHalfSunChecked] = useState(false);

  const [errCompName, setErrCompName] = useState("");
  const [errCompAdd, setErrCompAdd] = useState("");
  const [errCompState, setErrCompState] = useState("");
  const [errCompWorkHour, setErrCompWorkHour] = useState("");
  const [errCompVacDay, setErrCompVacDay] = useState("");
  const [mon, setmon] = useState("");
  const [tue, settue] = useState("");
  const [wed, setwed] = useState("");
  const [thu, setthu] = useState("");
  const [fri, setfri] = useState("");
  const [sat, setsat] = useState("");
  const [sun, setsun] = useState("");

  const handleClick = () => {
    setIsActive((current) => !current);
  };
  const handleClick1 = () => {
    setIsActive1((current) => !current);
  };
  const handleClick2 = () => {
    setIsActive2((current) => !current);
  };
  const handleClick3 = () => {
    setIsActive3((current) => !current);
  };
  const handleClick4 = () => {
    setIsActive4((current) => !current);
  };
  const handleClick5 = () => {
    setIsActive5((current) => !current);
  };
  const handleClick6 = () => {
    setIsActive6((current) => !current);
  };

  useEffect(() => {
    if (location.pathname === "/registercompany/edit") {
      setOp_mode("update");
      getcomp();
    } else {
      setOp_mode("insert");
    }
    //setEmpData();
  }, [location.pathname]);

  const getcomp = () => {
    const dataToBeSent = {
      collection_name: "company",
      search_key: "_id",
      search_value: sessionStorage.getItem("_compId"),
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
        var getRes = JSON.parse(res.data);
        var clietID =
          getRes[0].clientUniqueId === undefined
            ? ""
            : getRes[0].clientUniqueId;

        setimageUrl(getRes[0].imageUrl);
        setimageKey(getRes[0].imageKey);
        setcompLogoStatus(getRes[0].compLogoStatus);
        setClient(clietID);
        var compName =
          getRes[0].companyName === undefined ? "" : getRes[0].companyName;
        setCompanyname(compName);
        var vacationSelected =
          getRes[0].vacationDays === undefined
            ? getRes[0].vacationDays
            : getRes[0].vacationDays;
        setVacationdays(vacationSelected);
        var cityadd = getRes[0].city === undefined ? "" : getRes[0].city;
        setCompaddress(cityadd);
        var postalcode =
          getRes[0].postalCode === undefined ? "" : getRes[0].postalCode;
        setPincode(postalcode);
        var workingHr =
          getRes[0].totalWorkingHoursPerDay === undefined
            ? getRes[0].totalWorkingHoursPerDay
            : getRes[0].totalWorkingHoursPerDay;
        setWorkinghour(workingHr);
        var street1 = getRes[0].street === undefined ? "" : getRes[0].street;
        setState(street1);
        var fiscalYear =
          getRes[0].fiscalYear === undefined ? 0 : getRes[0].fiscalYear;
        setFiscalDate(new Date(fiscalYear));
        var country = getRes[0].country === undefined ? "" : getRes[0].country;
        setCountry(country);
        var key = Object.keys(countriesList).find(
          (key) => countriesList[key] === country
        );
        setCountryCode(key);
        var workingMonday =
          getRes[0].workingMonday === undefined
            ? getRes[0].workingMonday
            : getRes[0].workingMonday;
        setmon(workingMonday);
        setIsActive(getRes[0].workingMonday.day);
        setHalfMonChecked(getRes[0].workingMonday.halfchecked);
        var workingTuesday =
          getRes[0].workingTuesday === undefined
            ? getRes[0].workingTuesday
            : getRes[0].workingTuesday;
        settue(workingTuesday);
        setIsActive1(getRes[0].workingTuesday.day);
        setHalfTueChecked(getRes[0].workingTuesday.halfchecked);
        var workingWednesday =
          getRes[0].workingWednesday === undefined
            ? getRes[0].workingWednesday
            : getRes[0].workingWednesday;
        setwed(workingWednesday);
        setIsActive2(getRes[0].workingWednesday.day);
        setHalfWedChecked(getRes[0].workingWednesday.halfchecked);

        var workingThursday =
          getRes[0].workingThursday === undefined
            ? getRes[0].workingThursday
            : getRes[0].workingThursday;
        setthu(workingThursday);
        setIsActive3(getRes[0].workingThursday.day);
        setHalfThuChecked(getRes[0].workingThursday.halfchecked);
        var workingFriday =
          getRes[0].workingFriday === undefined
            ? getRes[0].workingFriday
            : getRes[0].workingFriday;
        setfri(workingFriday);
        setIsActive4(getRes[0].workingFriday.day);
        setHalfFriChecked(getRes[0].workingFriday.halfchecked);
        var workingSaturday =
          getRes[0].workingSaturday === undefined
            ? getRes[0].workingSaturday
            : getRes[0].workingSaturday;
        setsat(workingSaturday);
        setIsActive5(getRes[0].workingSaturday.day);
        setHalfSatChecked(getRes[0].workingSaturday.halfchecked);
        var workingSunday =
          getRes[0].workingSunday === undefined
            ? getRes[0].workingSunday
            : getRes[0].workingSunday;
        setsun(workingSunday);
        setIsActive6(getRes[0].workingSunday.day);
        setHalfSunChecked(getRes[0].workingSunday.halfchecked);
        setIsSandwichLeave(
          getRes[0].fiscalYear === undefined ? false : getRes[0].fiscalYear
        );
        //getimage
        var compLogoStatus = getRes[0].compLogoStatus;
        if (compLogoStatus === "saved" || compLogoStatus === "Saved") {
          downloadCompanyLogo(getRes[0].imageKey);
          sessionStorage.setItem(GlobalConstants.cmpLogo, getRes[0].imageKey);
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
  };
  const downloadCompanyLogo = (filekey) => {
    var apiUrl =
      GlobalConstants.Cdomain +
      `/API/moramba/v3/download/file?filekey=${filekey}`;
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
        const mimeType = response.headers;
        let blob = new Blob([response.data], { type: mimeType });
        var url = window.URL.createObjectURL(blob);
        setFile(url);
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
  const handleFileInput = ($event) => {
    var file = $event.target.files[0];
    if (file.size <= 81920) {
      var fileToUpload = file;
      var fileName = file.name;
      var fileSize = file.size / 1000 + " KB";
      var fileType = file.type;

      setFileToUpload(fileToUpload);
      setfileNameUpload(fileName);
      setfileSizeUpload(fileSize);
      setfileTypeUpload(fileType);
      setFile(URL.createObjectURL($event.target.files[0]));
    } else {
      infoToast("MAX FILE SIZE ALLOWED IS 80Kb");
      setFileToUpload("");
      setfileNameUpload("");
      setfileSizeUpload("");
      setfileTypeUpload("");
      setFile("");
    }
  };
  const uploadFileToServer = () => {
    if (
      fileToUpload === undefined ||
      fileToUpload === null ||
      fileToUpload === ""
    ) {
      warnToast("Please Select File First");
      return;
    }

    //api call post method upload file popup
    var apiUrl = GlobalConstants.Cdomain + "/API/moramba/v3/upload/file";

    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const formData = new FormData();
    // check this
    formData.append("document", fileToUpload);
    axios
      .post(apiUrl, formData, headerConfig)
      .then(function (response) {
        var res = response.data.data;
        setimageUrl(res.path);
        setimageKey(res.filekey);
        setisNewimageUrl(true);
        setisNewimageKey(true);
        if (res.path !== "") {
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
            imagepath: res.path, /// clear
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
          setPopupprofile(false);
          successToast("Photo Upload Successfully");
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
  };

  const updatedisplayname = () => {
    const data = {
      _partition: GlobalConstants._partition,
      displayName: companyname,
      _userId: sessionStorage.getItem("user_id"),
      _compId: sessionStorage.getItem("_compId"),
      _orgId: sessionStorage.getItem("_compId"),
    };
    const type = "updatedisplayname";
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/userrelation?type=" +
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
        sessionStorage.setItem("comp_name", companyname.toString());
        dispatch(getCompany());
        navigate("/selectcompany");
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
      });
  };

  const RegisterCompValidation = () => {
    let registerCompValidation = true;
    if (companyname === "") {
      registerCompValidation = false;
      setErrCompName(<>*{company_errname}!</>);
    }
    if (compaddress === "") {
      registerCompValidation = false;
      setErrCompAdd(<>*{company_erraddress}!</>);
    }
    if (state === "") {
      registerCompValidation = false;
      setErrCompState(<>*{text_err_enter_state}!</>);
    }
    if (workinghour < 1 || workinghour > 24 || workinghour === "") {
      registerCompValidation = false;
      setErrCompWorkHour(<>*{text_err_wh1}!</>);
    }
    if (vacationdays > 365) {
      registerCompValidation = false;
      setErrCompVacDay("*Vacation Days should be between 0 to 365!");
    }
    setSaveDisable(false);
    return registerCompValidation;
  };
  const RegisterCompanyHandler = (_compId) => {
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/company?type=" +
      op_mode;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    if (RegisterCompValidation()) {
      setSaveDisable(true);
      let day = dayjs(startDate, "YYYY/MM/DD").date();
      let month = 1 + dayjs(startDate, "YYYY/MM/DD").month();
      let year = dayjs(startDate, "YYYY/MM/DD").year();
      let dayNew = day.length > 1 ? day : "0" + day;
      let monthNew = month.length > 1 ? month : "0" + month;
      var d = {
        _id: "",
        orgid: sessionStorage.getItem("_compId"),
        _partition: GlobalConstants._partition,
        city: compaddress === "" ? "NA" : compaddress,
        imageUrl: imageUrl,
        imageKey: imageKey,
        compLogoStatus: isNewimageKey ? "drafted" : compLogoStatus,
        clientUniqueId: op_mode === "insert" ? uniqueId : Client,
        companyName: companyname === "" ? "companyname" : companyname,
        country: Country === "" ? "India" : Country,
        currency: Currency === "" ? "INR" : Currency,
        createdBy: sessionStorage.getItem("username"),
        fiscalYear: fiscalDate === "" ? "2022-01-01" : fiscalDate,
        increment: "10",
        partnerId: "Comp1_7035b5cd-1a9f-49d8-bcfc-70cc9c24d0a2",
        postalCode: pincode === "" ? "123456" : pincode,
        startDate: new Date() === "" ? " Jan 01,2022" : new Date(),
        status: "8:0",
        street: state === "" ? "NA" : state,
        totalWorkingHoursPerDay: workinghour === "" ? "00:00:00" : workinghour,
        vacationDays: vacationdays === "" ? "21" : vacationdays,
        isSandwichLeave: IsSandwichLeave,
        workingMonday: {
          halfchecked: halfMonChecked,
          day: isActive,
          hours:
            isActive === true
              ? halfMonChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
        workingTuesday: {
          halfchecked: halfTueChecked,
          day: isActive1,
          hours:
            isActive1 === true
              ? halfTueChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
        workingWednesday: {
          halfchecked: halfWedChecked,
          day: isActive2,
          hours:
            isActive2 === true
              ? halfWedChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
        workingThursday: {
          halfchecked: halfThuChecked,
          day: isActive3,
          hours:
            isActive3 === true
              ? halfThuChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
        workingFriday: {
          halfchecked: halfFriChecked,
          day: isActive4,
          hours:
            isActive4 === true
              ? halfFriChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
        workingSaturday: {
          halfchecked: halfSatChecked,
          day: isActive5,
          hours:
            isActive5 === true
              ? halfSatChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
        workingSunday: {
          halfchecked: halfSunChecked,
          day: isActive6,
          hours:
            isActive6 === true
              ? halfSunChecked === true
                ? workinghour === ""
                  ? "0"
                  : workinghour / 2 + 0.5
                : workinghour
              : "0",
        },
      };
      axios
        .post(apiUrl, d, headerConfig)
        .then(function (response) {
          var res = response.data;
          var comp_id = res.data._id !== undefined ? res.data._id : "update";

          if (comp_id !== "" && op_mode !== "update") {
            successToast("Company Created successfully");
            setSaveDisable(false);
            setTimeout(function () {
              navigate(`/selectcompany`);
            }, 500);
          } else if (op_mode === "update") {
            successToast("Company details updated successfully");
            updatedisplayname();
          }

          sessionStorage.setItem("comp_name", companyname);
          sessionStorage.setItem("comp_country", Country);
          dispatch(getCompany());
        })
        .catch(function (error) {
          setSaveDisable(false);
          errorToast(error.response.data.message);
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

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_upload_Profile(
      doc.querySelector("string[name='text_upload_Profile']")?.textContent
    );
    settext_unique_business_name(
      doc.querySelector("string[name='text_unique_business_name']")?.textContent
    );
    setText_company_address(
      doc.querySelector("string[name='text_company_address']")?.textContent
    );
    setText_company_name(
      doc.querySelector("string[name='text_company_name']")?.textContent
    );
    setText_company_enteraddress(
      doc.querySelector("string[name='text_company_enteraddress']")?.textContent
    );
    setText_state(doc.querySelector("string[name='text_state']")?.textContent);
    setText_sandwitch_leave(
      doc.querySelector("string[name='text_sandwitch_leave']")?.textContent
    );
    setText_hint_zip_code(
      doc.querySelector("string[name='text_hint_zip_code']")?.textContent
    );
    setText_fiscal_year(
      doc.querySelector("string[name='text_fiscal_year']")?.textContent
    );
    setText_working_days(
      doc.querySelector("string[name='text_working_days']")?.textContent
    );
    setText_monday(
      doc.querySelector("string[name='text_monday']")?.textContent
    );
    setText_tuesday(
      doc.querySelector("string[name='text_tuesday']")?.textContent
    );
    setText_wednesday(
      doc.querySelector("string[name='text_wednesday']")?.textContent
    );
    setText_thursday(
      doc.querySelector("string[name='text_thursday']")?.textContent
    );

    setText_friday(
      doc.querySelector("string[name='text_friday']")?.textContent
    );
    setText_saturday(
      doc.querySelector("string[name='text_saturday']")?.textContent
    );

    setText_sunday(
      doc.querySelector("string[name='text_sunday']")?.textContent
    );
    setText_half_day(
      doc.querySelector("string[name='text_half_day']")?.textContent
    );
    setText_vacations_Enter_days(
      doc.querySelector("string[name='text_vacations_Enter_days']")?.textContent
    );
    setText_update(
      doc.querySelector("string[name='text_update']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setButton_next(
      doc.querySelector("string[name='button_next']")?.textContent
    );
    settext_addchoosefile(
      doc.querySelector("string[name='text_addchoosefile']")?.textContent
    );
    setRegCompTitle(
      doc.querySelector("string[name='regCompTitle']")?.textContent
    );
    setText_selCountry(
      doc.querySelector("string[name='text_selCountry']")?.textContent
    );
    setRegCompedit(
      doc.querySelector("string[name='regCompedit']")?.textContent
    );
    setText_Ph_selCountry(
      doc.querySelector("string[name='text_Ph_selCountry']")?.textContent
    );
    setErr_selCountry(
      doc.querySelector("string[name='err_selCountry']")?.textContent
    );
    setText_statev3(
      doc.querySelector("string[name='text_statev3']")?.textContent
    );
    setText_Zip(doc.querySelector("string[name='text_Zip']")?.textContent);
    setHint_workHours(
      doc.querySelector("string[name='hint_workHours']")?.textContent
    );
    setText_ProVacaDay(
      doc.querySelector("string[name='text_ProVacaDay']")?.textContent
    );
    setText_Postal_v3(
      doc.querySelector("string[name='text_Postal_v3']")?.textContent
    );
    setCompany_errname(
      doc.querySelector("string[name='company_errname']")?.textContent
    );
    setCompany_erraddress(
      doc.querySelector("string[name='company_erraddress']")?.textContent
    );
    setText_err_enter_state(
      doc.querySelector("string[name='text_err_enter_state']")?.textContent
    );
    setText_err_wh1(
      doc.querySelector("string[name='text_err_wh1']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/registercompany/edit") {
      setRegCompTitle("Edit Company");
    }
  }, [location, location?.pathname]);

  useEffect(() => {
    let obj = CountryCodewithEmoji.find((o) => o.name === Country);
    if (obj !== undefined) {
      setCurrency(
        obj.abbreviation == undefined || obj.abbreviation == ""
          ? "INR"
          : obj.abbreviation
      );
    } else {
      setCurrency("INR");
    }
    console.log(obj.abbreviation);
  }, [Country]);
  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  return (
    <>
      <h3 className="HeadingText mt-3 mb-2 text-center p-2">
        {window.location.pathname === "/registercompany/edit" ? (
          <>{regCompedit}</>
        ) : (
          <>{regCompTitle}</>
        )}
      </h3>
      <div
        className={
          popupprofile === true
            ? " container containerBox mt-4 p-4 bgblur1"
            : "container containerBox mt-4 p-4"
        }
      >
        <div className="row">
          <div className="col-md-12">
            <button
              className="uploadclick"
              onClick={() => setPopupprofile(true)}
            >
              {text_upload_Profile}
            </button>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6 reg-comp-input-divs">
            <h5>
              {text_unique_business_name}
              <span className="Star">*</span>
            </h5>
            <input
              value={companyname}
              type="text"
              className="companyinputbox regcomp-inputs"
              placeholder={text_company_name}
              onChange={(e) => [
                setCompanyname(e.target.value),
                setErrCompName(""),
              ]}
            />
            <br />
            <span className="Star">{errCompName}</span>
            <h5 className="mt-4">
              {text_company_address}
              <span className="Star">*</span>
            </h5>
            <textarea
              value={compaddress}
              type="text"
              className="companyinputbox regcomp-inputs"
              placeholder={text_company_enteraddress}
              onChange={(e) => [
                setCompaddress(e.target.value),
                setErrCompAdd(""),
              ]}
            />
            <br />
            <span className="Star">{errCompAdd}</span>
            <div className="row mt-3">
              <div className="col-md-6">
                <h5>
                  {text_selCountry}
                  <span className="Star">*</span>
                </h5>
                <CountryDropdown
                  defaultOptionLabel={text_Ph_selCountry}
                  className="CountryInputbox1 vactionbox1 reg-comp-dropdowns"
                  value={Country}
                  onChange={(code) => setCountry(code)}
                />
                <br />
              </div>
              <div className="col-md-6 reg-comp-input-divs">
                <h5>
                  {text_state}
                  <span className="Star">*</span>
                </h5>
                <RegionDropdown
                  className="CountryInputbox1 vactionbox1 reg-comp-dropdowns"
                  blankOptionLabel={err_selCountry}
                  defaultOptionLabel={text_statev3}
                  country={Country}
                  onChange={(e) => [setState(e), setErrCompState("")]}
                  value={state}
                />
                <br />
                <span className="Star">{errCompState}</span>
              </div>
            </div>
            <h5 className="mt-3">
              {text_Zip}/{text_Postal_v3}
            </h5>
            <input
              value={pincode}
              type="number"
              onKeyDown={(evt) =>
                evt.which !== 8 &&
                evt.which !== 0 &&
                (evt.which < 48 || evt.which > 57) &&
                evt.preventDefault()
              }
              min={0}
              className="companyinputbox regcomp-inputs"
              placeholder={text_hint_zip_code}
              onChange={(e) => setPincode(e.target.value)}
            />
            <div className="row mt-3">
              <div className="col-md-6">
                <h5>{text_fiscal_year}</h5>
                <DatePicker
                  className="vactionbox1"
                  selected={fiscalDate}
                  // value={fiscalDate}
                  dateFormat="MMM dd,yyyy"
                  onChange={(date) => setFiscalDate(date)}
                />
              </div>
              <div className="col-md-6 reg-comp-input-divs">
                <h5>
                  {hint_workHours}
                  <span className="Star">*</span>
                </h5>
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  className="vactionbox1"
                  value={workinghour}
                  onChange={(e) => [
                    setWorkinghour(e.target.value),
                    setErrCompWorkHour(""),
                  ]}
                />
                <br />
                <span className="Star">{errCompWorkHour}</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 regcomp-workingdays-content">
            <h5 className="text-center mt-3">{text_working_days}</h5>
            <div className="row regcomp-workingdays-mon">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive ? "#A0D995" : "",
                    color: isActive ? "black" : "",
                  }}
                  onClick={handleClick}
                >
                  {text_monday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    label={text_half_day}
                    className="regcomp-workingdays-inputs"
                    onChange={() => setHalfMonChecked(!halfMonChecked)}
                    control={
                      <Checkbox
                        checked={halfMonChecked === true ? true : false}
                      />
                    }
                    checked={halfMonChecked === true ? true : false}
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  value={
                    isActive === true
                      ? halfMonChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  type={"number"}
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive1 ? "#A0D995" : "",
                    color: isActive1 ? "black" : "",
                  }}
                  onClick={handleClick1}
                >
                  {text_tuesday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    label={text_half_day}
                    className="regcomp-workingdays-inputs"
                    onChange={() => setHalfTueChecked(!halfTueChecked)}
                    control={
                      <Checkbox
                        checked={halfTueChecked === true ? true : false}
                      />
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  type={"number"}
                  value={
                    isActive1 === true
                      ? halfTueChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive2 ? "#A0D995" : "",
                    color: isActive2 ? "black" : "",
                  }}
                  onClick={handleClick2}
                >
                  {text_wednesday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    className="regcomp-workingdays-inputs"
                    label={text_half_day}
                    onChange={() => setHalfWedChecked(!halfWedChecked)}
                    control={
                      <Checkbox
                        checked={halfWedChecked === true ? true : false}
                      />
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  type={"number"}
                  value={
                    isActive2 === true
                      ? halfWedChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive3 ? "#A0D995" : "",
                    color: isActive3 ? "black" : "",
                  }}
                  onClick={handleClick3}
                >
                  {text_thursday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    className="regcomp-workingdays-inputs"
                    label={text_half_day}
                    onChange={() => setHalfThuChecked(!halfThuChecked)}
                    control={
                      <Checkbox
                        checked={halfThuChecked === true ? true : false}
                      />
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  type={"number"}
                  value={
                    isActive3 === true
                      ? halfThuChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive4 ? "#A0D995" : "",
                    color: isActive4 ? "black" : "",
                  }}
                  onClick={handleClick4}
                >
                  {text_friday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    className="regcomp-workingdays-inputs"
                    label={text_half_day}
                    onChange={() => setHalfFriChecked(!halfFriChecked)}
                    control={
                      <Checkbox
                        checked={halfFriChecked === true ? true : false}
                      />
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  type={"number"}
                  value={
                    isActive4 === true
                      ? halfFriChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive5 ? "#A0D995" : "",
                    color: isActive5 ? "black" : "",
                  }}
                  onClick={handleClick5}
                >
                  {text_saturday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    className="regcomp-workingdays-inputs"
                    label={text_half_day}
                    onChange={() => setHalfSatChecked(!halfSatChecked)}
                    control={
                      <Checkbox
                        checked={halfSatChecked === true ? true : false}
                      />
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  type={"number"}
                  value={
                    isActive5 === true
                      ? halfSatChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 text-center">
                <button
                  className="btnweek1 regcomp-days-btns"
                  style={{
                    backgroundColor: isActive6 ? "#A0D995" : "",
                    color: isActive6 ? "black" : "",
                  }}
                  onClick={handleClick6}
                >
                  {text_sunday}
                </button>
              </div>
              <div className="col-3 text-center mt-2">
                <FormGroup>
                  <FormControlLabel
                    id="moncheckbox"
                    className="regcomp-workingdays-inputs"
                    label={text_half_day}
                    onChange={() => setHalfSunChecked(!halfSunChecked)}
                    control={
                      <Checkbox
                        checked={halfSunChecked === true ? true : false}
                      />
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-4 text-center">
                <input
                  className="workinghrtxt regcomp-workingdays-inputs"
                  type={"number"}
                  value={
                    isActive6 === true
                      ? halfSunChecked === true
                        ? workinghour === ""
                          ? "0"
                          : workinghour / 2 + 0.5
                        : workinghour
                      : "0"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6 text-center">
                <h5>
                  {text_ProVacaDay}
                  <span className="Star">*</span>
                </h5>
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  onKeyDown={(evt) =>
                    evt.which !== 8 &&
                    evt.which !== 0 &&
                    (evt.which < 48 || evt.which > 57) &&
                    evt.preventDefault()
                  }
                  min={0}
                  className="vactionbox1 regcomp-vacation-input"
                  placeholder={text_vacations_Enter_days}
                  value={vacationdays}
                  onChange={(e) => [
                    setVacationdays(e.target.value),
                    setErrCompVacDay(""),
                  ]}
                />
                <br />
                <span className="Star">{errCompVacDay}</span>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <input
                type="checkbox"
                value={IsSandwichLeave}
                onChange={(e) => setIsSandwichLeave(e.target.checked)}
              />
              <label>{text_sandwitch_leave}</label>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <center>
            <Link
              to={op_mode === "insert" ? "/selectcompany" : "/companyprofile"}
            >
              <button className="btncancel">{button_cancel}</button>
            </Link>{" "}
            &nbsp;&nbsp;
            <button
              className="btnsave"
              onClick={RegisterCompanyHandler}
              disabled={saveDisable}
            >
              {op_mode === "update" ? <>{text_update}</> : <>{button_save}</>}
            </button>
          </center>
        </div>
      </div>
      {popupprofile ? (
        <div className="main">
          <div className="addstaffpopup">
            <div className="row text-end text-black">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setPopupprofile(false)} />
              </h3>
            </div>
            <h3 className="text-center text-black">{text_addchoosefile}</h3>

            <hr />
            <div className="row">
              <div className="col-md-12 text-center text-black">
                {" "}
                <input
                  type="file"
                  // className="inputcategorydian btn_color btn_text_color"
                  className="documentchoose"
                  onChange={handleFileInput}
                  accept="image/png, image/gif, image/jpeg"
                />
                <br />
                <br />
                <img
                  src={file === undefined ? compLogo : file}
                  className="previewImg"
                  alt=""
                />
              </div>
            </div>

            <div className="row text-center mt-4">
              <div className="col-md-12 mb-2">
                <button
                  className="btncancel"
                  // onClick={closePopup}
                  style={{ marginRight: "10px" }}
                  onClick={(e) => [setPopupprofile(false), setFile(undefined)]}
                >
                  {button_cancel}
                </button>

                <button
                  className="btnsave"
                  onClick={() => uploadFileToServer()}
                >
                  {button_save}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default RegisterComp;
