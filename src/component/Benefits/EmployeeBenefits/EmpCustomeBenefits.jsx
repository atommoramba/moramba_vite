import dayjs from "dayjs";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { customTableStyles } from "../../../utils/CommanTableStyle";
import axios from "axios";
import { errorToast, successToast } from "../../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { getEmpSelectedBenefitsData } from "../../../redux/EmpSelectedBenefits";
import { GlobalConstants } from "../../../utils/GlobalConstants";
import Cookie from "js-cookie";

function EmpCustomeBenefits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const OrgSelectedbenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );

  //language variable
  const [text_End_Date, setText_End_Date] = useState("End Date");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [button_save, setButton_save] = useState("Save");
  const [text_description, setText_description] = useState("Description");

  //New variable for language
  const [text_benefitName, setText_benefitName] = useState("Benefit Name");
  const [text_price, setext_Price] = useState("Price");
  const [text_empcontribution, setText_empcontribution] = useState(
    "Employee Contribution"
  );
  const [text_cmpcontribution, setText_cmpcontribution] = useState(
    "Company Contribution"
  );
  const [text_BenefitProvider, settext_BenefitProvider] =
    useState("Benefit Provider");

  //variable
  const [finalData, setFinalData] = useState([]);
  const [EmpSelectedBenefitList, setEmpSelectedBenefitList] = useState([]);

  //Employee DataTable Columns data
  const columns = [
    { name: <>{text_benefitName}</>, selector: (row) => row.benefit_name },
    { name: <>{text_BenefitProvider}</>, selector: (row) => row.provider },

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
      selector: (row, index) => row.comp_contribution,
    },
    {
      name: <>{text_empcontribution}</>,
      selector: (row, index) => row.emp_contribution,
    },
    { name: <>{text_price}</>, selector: (row) => row.price },
  ];

  //Employee selected Data
  const DataColumns = [
    {
      name: <>{text_benefitName}</>,
      selector: (row) => row?.benefitdetails[0]?.benefit_name,
    },
    {
      name: <>{text_BenefitProvider}</>,
      selector: (row) => row?.benefitdetails[0]?.provider,
    },
    {
      name: <>{text_start_date}</>,
      selector: (row) =>
        dayjs(row?.benefitdetails[0]?.startdate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_End_Date}</>,
      selector: (row) =>
        dayjs(row?.benefitdetails[0]?.enddate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_cmpcontribution}</>,
      selector: (row, index) => row?.benefitdetails[0]?.comp_contribution,
    },
    {
      name: <>{text_empcontribution}</>,
      selector: (row, index) => row?.benefitdetails[0]?.emp_contribution,
    },
    {
      name: <>{text_price}</>,
      selector: (row) => row?.benefitdetails[0]?.price,
    },
  ];

  const rowPreExpanded = ({ data }) => (
    <ul className="m-3">
      <li>
        {text_start_date}: {dayjs(data?.startdate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_End_Date}: {dayjs(data?.enddate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_description}: {data?.description}
      </li>
    </ul>
  );

  const rowPreExpandedEmpAdded = ({ data }) => (
    <ul className="m-3">
      <li>
        {text_start_date}:{" "}
        {dayjs(data?.benefitdetails[0]?.startdate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_End_Date}:{" "}
        {dayjs(data?.benefitdetails[0]?.enddate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_description}: {data?.benefitdetails[0]?.description}
      </li>
    </ul>
  );

  const EmpAddedBenifitsHandle = () => {
    var orgId = sessionStorage.getItem(
      GlobalConstants.session_current_company_id
    );
    var empId = sessionStorage.getItem(GlobalConstants.session_current_emp_id);
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/get/all/emp/benefits?orgId=" +
      orgId +
      "&empId=" +
      empId +
      "&custom=true";

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
        var FinalData = res.data.benefitall;
        setEmpSelectedBenefitList(FinalData);
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
  };

  useEffect(() => {
    EmpAddedBenifitsHandle();
  }, [1000]);
  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_End_Date(
      doc.querySelector("string[name='text_End_Date']")?.textContent
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent
    );
    setButton_save(
      doc.querySelector("string[name='button_save']")?.textContent
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent
    );
    setText_benefitName(
      doc.querySelector("string[name='text_benefitName']")?.textContent
    );
    setext_Price(doc.querySelector("string[name='text_price']")?.textContent);
    setText_empcontribution(
      doc.querySelector("string[name='text_empcontribution']")?.textContent
    );
    setText_cmpcontribution(
      doc.querySelector("string[name='text_cmpcontribution']")?.textContent
    );
    settext_BenefitProvider(
      doc.querySelector("string[name='text_BenefitProvider']")?.textContent
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  //Filter custome Benefits
  const FilterCustomBenefits = OrgSelectedbenefitsList?.filter((data) => {
    return data?.b_type === "custom";
  });

  //selecteable rows
  const handleOrgBenefit = ({ selectedCount, selectedRows }) => {
    var FinalEmpBenefitData = [];
    for (let index = 0; index < selectedRows.length; index++) {
      FinalEmpBenefitData.push({
        _orgId: sessionStorage.getItem("_compId"),
        employeeId: sessionStorage.getItem("currentempid"),
        benefit_p_id: selectedRows[index].benefit_p_id,
        isPerecent: false,
        benefit_name: selectedRows[index].benefit_name,
        provider: selectedRows[index].provider,
        currency: selectedRows[index].currency,
        price: selectedRows[index].price,
        emp_contribution: selectedRows[index].emp_contribution,
        comp_contribution: selectedRows[index].comp_contribution,
        startdate: selectedRows[index].startdate,
        enddate: selectedRows[index].enddate,
        b_type: "custom",
      });
    }
    setFinalData(FinalEmpBenefitData);
  };

  //employee save benefits
  const handleSubmit = () => {
    var API_URL =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/empbenefit/addempbenefit?type=insert";
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      list: finalData,
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

  return (
    <>
      {window.location.pathname === "/employee/all/benefits" ? (
        <>
          <div className="m-5">
            <DataTable
              columns={columns}
              data={FilterCustomBenefits}
              expandableRows
              expandableRowsComponent={rowPreExpanded}
              pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={customTableStyles}
              selectableRows
              onSelectedRowsChange={handleOrgBenefit}
            />
            {FilterCustomBenefits?.length === 0 ? (
              ""
            ) : (
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btnsave"
                  type={"submit"}
                  onClick={handleSubmit}
                >
                  {button_save}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="m-5">
            <DataTable
              columns={DataColumns}
              data={EmpSelectedBenefitList}
              expandableRows
              expandableRowsComponent={rowPreExpandedEmpAdded}
              pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={customTableStyles}
            />
          </div>
        </>
      )}
    </>
  );
}

export default EmpCustomeBenefits;
