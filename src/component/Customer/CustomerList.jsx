import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { customTableStyles } from "../../utils/CommanTableStyle";
import FilterComponent from "../../utils/FilterComponent";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../Header/Header";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList } from "../../redux/CustomerListSlice";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function CustomerList() {
  const dispatch = useDispatch();
  const CustomerListData = useSelector((state) => state.customerList);
  //old language variable
  const [text_create, setText_create] = useState("Create");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_srno, setText_srno] = useState("Sr no.");
  const [text_customer_name, setText_customer_name] = useState("Customer Name");
  const [text_hint_email, setText_hint_email] = useState("Email");
  const [text_customer_list, setText_customer_list] = useState("Customer List");
  const [search_customer, setSearch_customer] = useState(
    "Search Customer here..."
  );

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [text_delete, setText_delete] = useState("Delete");
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (getCustomerList?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getCustomerList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
    } else {
      setIsLoading(false);
    }
  }, []);
  const DeleteCustomer = (id) => {
    var type = "delete";
    var data = {
      customeruniqueid: id,
      _orgId: sessionStorage.getItem("_compId"),
    };
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/customer?type=" +
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
        successToast(response.data.data.message);
        dispatch(getCustomerList());
      })
      .catch(function (error) {
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
  };
  const columns = [
    {
      name: <>{text_srno}</>,
      selector: (row, index) => index + 1,
    },
    {
      name: <>{text_customer_name}</>,
      sortable: true,
      selector: (row) => row.customername,
    },
    {
      name: <>{text_hint_email}</>,
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: <>{text_edit}</>,
      selector: (row) => (
        <Link to="/customer/edit" state={{ CustomerId: row?.customeruniqueid }}>
          <button className="EditBtn">{text_edit}</button>
        </Link>
      ),
    },
    {
      name: <>{text_delete}</>,
      selector: (row) => (
        <button
          className="ViewBtn"
          onClick={() => DeleteCustomer(row?.customeruniqueid)}
        >
          {text_delete}
        </button>
      ),
    },
  ];

  const filteredItems = CustomerListData.filter(
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
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        PlaceHolder={search_customer}
      />
    );
  }, [filterText, resetPaginationToggle, search_customer]);

  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_create(
      doc.querySelector("string[name='text_create']", doc)?.textContent
    );
    setText_customer_name(
      doc.querySelector("string[name='text_customer_name']", doc)?.textContent
    );
    setText_srno(
      doc.querySelector("string[name='text_srno']", doc)?.textContent
    );
    setText_hint_email(
      doc.querySelector("string[name='text_hint_email']", doc)?.textContent
    );
    setText_edit(
      doc.querySelector("string[name='text_edit']", doc)?.textContent
    );
    setText_customer_list(
      doc.querySelector("string[name='text_customer_list']", doc)?.textContent
    );
    setSearch_customer(
      doc.querySelector("string[name='search_customer']", doc)?.textContent
    );
    setText_delete(
      doc.querySelector("string[name='text_delete']", doc)?.textContent
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
      <h3 className="HeadingText mt-4 mb-2 text-center p-2">
        {text_customer_list}
      </h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row Searchbar customerlist-search-btn">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/createcustomer">
            <button className=" CreateBtn">+ {text_create}</button>
          </Link>
        </div>
        {IsLoading ? (
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              customStyles={customTableStyles}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerList;
