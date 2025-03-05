import React, { useMemo, useState } from "react";
import FilterComponent from "../../utils/FilterComponent";
import Header from "../Header/Header";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { customTableStyles } from "../../utils/CommanTableStyle";
import dayjs from "dayjs";

import { useEffect } from "react";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getBillList } from "../../redux/BillListSlice";
import { ToastContainer } from "react-toastify";
import Loader from "../../utils/Loader";

function BillTable() {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const BillData = useSelector((state) => state.BillList);
  const Company_Name = sessionStorage.getItem("comp_name");
  const dispatch = useDispatch();
  const [IsLoading, setIsLoading] = useState(true);
  console.log(BillData, "------------------------------------");
  useEffect(() => {
    if (BillData?.length === 0) {
      setIsLoading(true);
      Promise.all([dispatch(getBillList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  //Language Variables Start
  //New Lang Const
  const [BillHeadText, setBillHeadText] = useState("Bill List");
  const [text_Sno, setText_Sno] = useState("Sr No");

  //Old Lang Const
  const [text_date, setText_date] = useState("Date");
  const [text_create, setText_create] = useState("Create");
  const [text_Amount, setText_Amount] = useState("Amount");
  const [text_vendor_name, setText_vendor_name] = useState("Vendor Name");
  const [text_bill_id, setText_bill_id] = useState("Bill ID"); // from add bil page
  const [btn_view, setbtn_view] = useState("View");
  const [text_view_bill, setText_view_bill] = useState("View Bill");
  const [search_bill, setSearch_bill] = useState("Search Bill...");
  const navigate = useNavigate;
  //Language Variables end

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
    },
    {
      name: <>{text_vendor_name}</>,
      selector: (row) => row.Customer,
    },
    {
      name: <>{text_bill_id}</>,
      selector: (row) => row.billID,
    },
    {
      name: <>{text_date}</>,
      selector: (row) => dayjs(row.issueDate).format("MMM DD, YYYY"),
      sortable: true,
    },
    {
      name: <>{text_Amount}</>,
      selector: (row) =>
        row.currency +
        " " +
        Number(row.grandTotal)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
    },
    {
      name: <>{text_view_bill}</>,
      selector: (row) => (
        <>
          <Link to="/bill/allbill/view" state={{ billdata: row }}>
            <button className="ViewBtn">{btn_view}</button>
          </Link>
        </>
      ),
    },
  ];
  const filteredItems = BillData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const TablePaginationActions = (count) => {
    setPageCount(count);
  };
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
        PlaceHolder={search_bill}
      />
    );
  }, [filterText, resetPaginationToggle, search_bill]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );

    setbtn_view(doc.querySelector("string[name='btn_view']")?.textContent);
    setText_date(doc.querySelector("string[name='text_date']")?.textContent);
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent
    );
    setText_vendor_name(
      doc.querySelector("string[name='text_vendor_name']")?.textContent
    );
    setText_bill_id(
      doc.querySelector("string[name='text_bill_id']")?.textContent
    );
    setText_view_bill(
      doc.querySelector("string[name='text_view_bill']")?.textContent
    );
    setBillHeadText(
      doc.querySelector("string[name='BillHeadText']")?.textContent
    );
    setText_Sno(doc.querySelector("string[name='text_Sno']")?.textContent);
    setSearch_bill(
      doc.querySelector("string[name='search_bill']")?.textContent
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
      <h3 className="mt-5 text-center HeadingText">{BillHeadText}</h3>
      <div className="InvoiceBox px-3">
        <h4 className="w-100">{Company_Name}</h4>
        <div className="d-flex billtable-searchbox-btn">
          <div className="d-flex flex-row align-items-center Searchbar me-3 billtable-searchbox">
            <SearchIcon />
            {subHeaderComponent}
          </div>
          <Link to="/bill/create">
            <button className="CreateBtn billtable-create-btn">
              + {text_create}
            </button>
          </Link>
        </div>
      </div>
      <Divider />
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-4 billtable-datatable">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            onChangePage={TablePaginationActions}
            customStyles={customTableStyles}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default BillTable;
