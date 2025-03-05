import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../../utils/CommanTableStyle";
import Header from "../../Header/Header";
import dayjs from "dayjs";

import { errorToast, successToast } from "../../../utils/Helper";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { GlobalConstants } from "../../../utils/GlobalConstants";
import { getEmpSelectedBenefitsData } from "../../../redux/EmpSelectedBenefits";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";

function EmpBenefits() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let typeofBenefit = useLocation();
  var type = typeofBenefit.state.data;

  //language variable
  const [button_previous, setButton_previous] = useState("Previous");
  const [text_benefitName, setText_benefitName] = useState("Benefit Name");
  const [button_save, setButton_save] = useState("Save");
  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [text_End_Date, setText_End_Date] = useState("End Date");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [text_price, setext_Price] = useState("Price");
  const [text_empcontribution, setText_empcontribution] = useState(
    "Employee Contribution"
  );
  const [text_cmpcontribution, setText_cmpcontribution] = useState(
    "Company Contribution"
  );
  const [text_selected_type, settext_selected_type] =
    useState("Selected Type :");
  //variable
  const [selectRows, setSelectRows] = useState("");
  const [FinalData, setFinalData] = useState([]);
  console.log(FinalData);

  const columns = [
    {
      name: <>{text_benefitName}</>,
      selector: (row) => row.benefitdetails[0].prod_name,
    },

    {
      name: <>{text_start_date}</>,
      selector: (row) => dayjs(row.startdate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_End_Date}</>,
      selector: (row) => dayjs(row.enddate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_cmpcontribution}</>,
      selector: (row, index) => [row.currency + row.comp_contribution],
    },
    {
      name: <>{text_empcontribution}</>,
      selector: (row, index) => [row.currency + row.emp_contribution],
    },
    { name: <>{text_price}</>, selector: (row) => [row.currency + row.price] },
  ];

  const handleOrgBenefit = ({ selectedCount, selectedRows }) => {
    setSelectRows(selectedRows);
    console.log(selectedRows);
    var FinalEmpBenefitData = [];
    for (let index = 0; index < selectedRows.length; index++) {
      FinalEmpBenefitData.push({
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: sessionStorage.getItem("currentempid"),
        benefit_p_id: selectedRows[index].benefit_p_id,
        isPerecent: false,
        currency: selectedRows[index].currency,
        price: selectedRows[index].price,
        emp_contribution: selectedRows[index].emp_contribution,
        comp_contribution: selectedRows[index].comp_contribution,
        startdate: selectedRows[index].startdate,
        enddate: selectedRows[index].enddate,
      });
    }
    console.log("-->", FinalEmpBenefitData);
    setFinalData(FinalEmpBenefitData);
  };
  const handleSubmit = () => {
    var API_URL =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/empbenefit/addempbenefit?type=insert";
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      list: FinalData,
    };
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .post(API_URL, Data, headerConfig)
      .then(function (response) {
        successToast("Benefits Added Successfully!");
        dispatch(getEmpSelectedBenefitsData());
        navigate("/employee/selected/benefits");
      })
      .catch(function (error) {
        errorToast("opps something went wrong!");
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

    setText_benefitName(
      doc.querySelector("string[name='text_benefitName']")?.textContent
    );
    settext_selected_type(
      doc.querySelector("string[name='text_selected_type']")?.textContent
    );
    setext_Price(doc.querySelector("string[name='text_price']")?.textContent);
    setText_End_Date(
      doc.querySelector("string[name='text_End_Date']")?.textContent
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setText_empcontribution(
      doc.querySelector("string[name='text_empcontribution']")?.textContent
    );
    setButton_cancel(
      doc.querySelector("string[name='button_cancel']")?.textContent
    );
    setText_cmpcontribution(
      doc.querySelector("string[name='text_cmpcontribution']")?.textContent
    );
    // setButton_previous(
    //   doc.querySelector("string[name='button_previous']")
    //     ?.textContent
    // );
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
      <h3 className="text-center mt-5">
        <u>
          {text_selected_type} {type?.Title}
        </u>
      </h3>
      {typeofBenefit.state.selected === true ? (
        <>
          <div className="m-5">
            <DataTable
              columns={columns}
              data={type?.NumberOfBenefits}
              pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={customTableStyles}
              onSelectedRowsChange={handleOrgBenefit}
            />
            <div className="d-flex justify-content-center gap-3">
              <button onClick={() => navigate(-1)} className="btncancel">
                {button_previous}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="m-5">
            <DataTable
              columns={columns}
              data={type?.NumberOfBenefits}
              pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={customTableStyles}
              selectableRows
              onSelectedRowsChange={handleOrgBenefit}
            />
          </div>
          <div className="d-flex justify-content-center gap-3">
            <button className="btncancel" onClick={() => navigate(-1)}>
              {button_cancel}
            </button>
            <button className="btnsave" type={"submit"} onClick={handleSubmit}>
              {button_save}
            </button>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
}

export default EmpBenefits;
