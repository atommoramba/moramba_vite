import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import dayjs from "dayjs";

import { errorToast, infoToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getOrgSelectedBenefits } from "../../redux/OrgSelectedBenefits";
import Cookie from "js-cookie";

function OrgBenefits() {
  const navigate = useNavigate();
  let typeofBenefit = useLocation();
  var type = typeofBenefit.state.data;
  const dispatch = useDispatch();

  //variable
  const [CmpContribution, setCmpContribution] = useState(0);
  const [Index, setIndex] = useState("0");
  const [cmpData, setCmpData] = useState([]);
  const [SelectedRows, setSelectedRows] = useState([]);

  //popup variable
  const [popup, setPopup] = useState(false);

  //Language variable

  const [button_cancel, setButton_cancel] = useState("Cancel");
  const [button_save, setButton_save] = useState("Save");
  //language variable
  const [button_previous, setButton_previous] = useState("Previous");
  const [text_add_new_benefits, setText_add_new_benefts] =
    useState("Add New Benefits");
  const [text_benefitName, setText_benefitName] = useState("Benefit Name");
  const [text_price, setext_Price] = useState("Price");
  const [text_empcontribution, setText_empcontribution] = useState(
    "Employee Contribution"
  );
  const [text_selected_type, settext_selected_type] =
    useState("Selected Type :");
  const [text_cmpcontribution, setText_cmpcontribution] = useState(
    "Company Contribution"
  );
  const [text_cmp_contribution, setText_comp_contribution] = useState(
    "Enter Company Contribtion"
  );
  const [text_End_Date, setText_End_Date] = useState("End Date");
  const [text_start_date, setText_start_date] = useState("Start Date");
  const [text_description, setText_description] = useState("Description");
  const HandleCmpData = (idx, p_id, price) => {
    var cmpcontri = document.getElementById("cmpContri" + idx).value;
    if (cmpData.find((e) => e.id === idx)) {
      var indexofType = cmpData.findIndex((e) => e.id === idx);
      cmpData[indexofType].Cmp_contribute = cmpcontri;
      setCmpData(cmpData);
    } else {
      var tempstatus = [
        ...cmpData,
        {
          id: idx,
          Cmp_contribute: cmpcontri,
          p_id: p_id,
          price: price,
        },
      ];
      setCmpData(tempstatus);
    }
  };

  const columns = [
    { name: <>{text_benefitName}</>, selector: (row) => row.prod_name },

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
      selector: (row, index) => (
        <input
          id={"cmpContri" + index}
          type="number"
          onKeyDown={(evt) =>
            evt.which !== 8 &&
            evt.which !== 0 &&
            (evt.which < 48 || evt.which > 57) &&
            evt.preventDefault()
          }
          min={0}
          placeholder={text_cmp_contribution}
          onChange={(e) => [
            setCmpContribution(e.target.value),
            setIndex(index),
            HandleCmpData(index, row.p_id, row.price),
          ]}
        />
      ),
    },
    {
      name: <>{text_empcontribution}</>,
      selector: (row, index) => (
        <>
          {cmpData?.length === 0 && 0}
          {cmpData?.map((v, i) => {
            return (
              <>
                <p key={i}>
                  {row?.p_id === v?.p_id
                    ? Number(row?.price) - Number(v?.Cmp_contribute)
                    : ""}
                </p>
              </>
            );
          })}
        </>
      ),
    },
    { name: <>{text_price}</>, selector: (row) => [row.currency + row.price] },
  ];

  const save = (index) => {
    if (SelectedRows?.length === 0) {
      return infoToast("Please Select Any Benefit Before Saving!");
    }
    console.log("cmpData", cmpData);
    var FinalSelected = [];
    cmpData.filter((e) => {
      SelectedRows.map((x) => {
        if (x.p_id === e.p_id) {
          FinalSelected.push(e);
        }
      });
    });
    console.log(FinalSelected);

    var final = [];
    for (let j = 0; j < FinalSelected?.length; j++) {
      final.push({
        _orgId: sessionStorage.getItem("_compId"),
        benefit_p_id: FinalSelected[j].p_id,
        comp_contribution: FinalSelected[j].Cmp_contribute,
        emp_contribution:
          FinalSelected[j].price - FinalSelected[j].Cmp_contribute,
        currency:
          type?.NumberOfBenefits[j].p_id === FinalSelected[j].p_id
            ? type?.NumberOfBenefits[j].currency
            : "$",
        price: FinalSelected[j].price,
        startdate:
          type?.NumberOfBenefits[j].p_id === FinalSelected[j].p_id
            ? type?.NumberOfBenefits[j].startdate
            : "2025-01-01T00:00:00.000Z",
        enddate:
          type?.NumberOfBenefits[j].p_id === FinalSelected[j].p_id
            ? type?.NumberOfBenefits[j].enddate
            : "2025-01-01T00:00:00.000Z",
        isPerecent: false,
      });
    }
    console.log("<<-----", final);

    // API CALL
    if (final?.length === 0) {
      infoToast("Please Add Compnay Contribution Before Saving!");
      return;
    }
    var API_URL =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/companybenefit/addcompanybenefit?type=insert";
    var Data = {
      _orgId: sessionStorage.getItem("_compId"),
      list: final,
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
        dispatch(getOrgSelectedBenefits());
        setTimeout(() => {
          navigate("/org/selected/benefits");
        }, 1000);
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

  const handleOrgBenefit = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const rowPreExpanded = ({ data }) => (
    <ul className="m-3">
      <li>
        {text_start_date}: {dayjs(data?.startdate).format("MMM DD, YYYY")}
      </li>
      <li>
        {text_End_Date}: {dayjs(data?.enddate).format("MMM DD, YYYY")}
      </li>
      {typeofBenefit.state.selected === true ? (
        <li>
          {text_description}: {data?.benefitdetails[0].description}
        </li>
      ) : (
        <li>
          {text_description}: {data?.description}
        </li>
      )}
    </ul>
  );

  const SelectedTableCol = [
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
    setText_comp_contribution(
      doc.querySelector("string[name='text_cmp_contribution']")?.textContent
    );
    setText_start_date(
      doc.querySelector("string[name='text_start_date']")?.textContent
    );
    setText_description(
      doc.querySelector("string[name='text_description']")?.textContent
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
    setButton_previous(
      doc.querySelector("string[name='button_previous']")?.textContent
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
      <div className={popup ? "bgblur1" : ""}>
        <Header url={window.location.pathname} />
        <h3 className="text-center mt-5">
          <u>
            {text_selected_type} {type?.Title}
          </u>
        </h3>
        {typeofBenefit.state.selected === true ? (
          <>
            <div className="m-3">
              <DataTable
                columns={SelectedTableCol}
                data={type?.NumberOfBenefits}
                expandableRows
                expandableRowsComponent={rowPreExpanded}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
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
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button className="btncancel" onClick={() => navigate(-1)}>
                {button_cancel}
              </button>
              <button className="btnsave" type={"submit"} onClick={save}>
                {button_save}
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default OrgBenefits;
