import React, { useMemo, useState, useEffect } from "react";
import FilterComponent from "../../utils/FilterComponent";
import Header from "../Header/Header";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceList } from "../../redux/InvoiceListSlice";
import dayjs from "dayjs";

import "./Invoice.css";
import Loader from "../../utils/Loader";

function InvoiceTable() {
  const dispatch = useDispatch();
  const InvoiceData = useSelector((state) => state.InovieList);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  //Lang variable
  const [text_create, setText_create] = useState("Create");
  const [text_view_invoice, setText_view_invoice] = useState("View Invoice");
  const [text_invoiceid, setText_invoiceid] = useState("Invoice ID");
  const [text_Amount, setText_Amount] = useState("Amount");
  const [text_date, setText_date] = useState("Date");
  const [btn_view, setbtn_view] = useState("View");
  const [text_customer_name, setText_customer_name] = useState("Customer Name");
  const [text_duedate, setText_duedate] = useState("Due Date");
  const [InvoiceListText, setInvoiceListText] = useState("Invoice List");
  const [text_Sno, setText_Sno] = useState("Sr No");
  const [invoicetext_search, setInvoicetext_search] =
    useState("Search Invoice...");
  const [IsLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (InvoiceData?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getInvoiceList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
    } else {
      setIsLoading(false);
    }
  }, []);
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      name: <>{text_Sno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
    },
    {
      name: <>{text_invoiceid}</>,
      selector: (row) => row.invoiceID,
    },
    {
      name: <>{text_customer_name}</>,
      selector: (row) => row.Customer,
    },
    {
      name: <>{text_Amount}</>,
      sortable: true,
      selector: (row) =>
        row.currency +
        " " +
        Number(row.grandTotal)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
    },
    {
      name: <>{text_date}</>,
      sortable: true,
      selector: (row) => dayjs(row.issueDate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_duedate}</>,
      sortable: true,
      selector: (row) => dayjs(row.dueDate).format("MMM DD,YYYY"),
    },
    {
      name: <>{text_view_invoice}</>,
      selector: (row) => (
        <Link to="/invoice/allinvoice/view" state={{ Data: row }}>
          <button className="ViewBtn invoicetable-view-btn">{btn_view}</button>
        </Link>
      ),
    },
  ];
  const filteredItems = InvoiceData.filter(
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
        PlaceHolder={invoicetext_search}
      />
    );
  }, [filterText, resetPaginationToggle, invoicetext_search]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setInvoiceListText(
      doc.querySelector("string[name='InvoiceListText']")?.textContent ||
        "Invoice List"
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
    );
    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent || "Create"
    );
    setbtn_view(
      doc.querySelector("string[name='btn_view']")?.textContent || "View"
    );
    setText_customer_name(
      doc.querySelector("string[name='text_customer_name']")?.textContent ||
        "Customer Name"
    );
    setText_view_invoice(
      doc.querySelector("string[name='text_view_invoice']")?.textContent ||
        "View Invoice"
    );
    setText_invoiceid(
      doc.querySelector("string[name='text_invoiceid']")?.textContent ||
        "Invoice ID"
    );
    setText_date(
      doc.querySelector("string[name='text_date']")?.textContent || "Date"
    );
    setText_Amount(
      doc.querySelector("string[name='text_Amount']")?.textContent || "Amount"
    );
    setText_duedate(
      doc.querySelector("string[name='text_duedate']")?.textContent ||
        "Due Date"
    );
    setInvoicetext_search(
      doc.querySelector("string[name='invoicetext_search']")?.textContent ||
        "Search Invoice..."
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  return (
    <>
      <Header />
      <h3 className="mt-5 text-center HeadingText">{InvoiceListText}</h3>
      <div className="InvoiceBox px-3">
        <h4 className="w-100">{sessionStorage.getItem("comp_name")}</h4>
        <div className="d-flex">
          <div
            className="d-flex flex-row align-items-center Searchbar me-3 invoicetable-searchbar"
            id="mobilesearch"
          >
            <SearchIcon />
            {subHeaderComponent}
          </div>
          <Link to="/invoice/create">
            <button className="CreateBtn">+ {text_create}</button>
          </Link>
        </div>
      </div>
      <div className="p-1">
        <button className="btnsave">Paid</button>{" "}
        <button className="btncancel">Unpaid</button>
      </div>{" "}
      &nbsp;
      <Divider />
      {IsLoading ? (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-4">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            customStyles={customTableStyles}
            onChangePage={TablePaginationActions}
            className="invoicetable-datatable"
          />
        </div>
      )}
    </>
  );
}

export default InvoiceTable;
