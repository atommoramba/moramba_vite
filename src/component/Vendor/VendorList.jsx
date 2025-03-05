import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";
import { customTableStyles } from "../../utils/CommanTableStyle";
import FilterComponent from "../../utils/FilterComponent";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getVendorList } from "../../redux/VendorListSlice";
import Loader from "../../utils/Loader";
import Cookie from "js-cookie";

function VendorList() {
  const dispatch = useDispatch();
  const VendorListData = useSelector((state) => state.vendorList);
  //language variable
  const [text_create, setText_create] = useState("Create");
  const [text_edit, setText_edit] = useState("Edit");
  const [text_srno, setText_srno] = useState("Sr no.");
  const [text_vendor_name, setText_vendor_name] = useState("Vendor Name");
  const [text_hint_email, setText_hint_email] = useState("Email");
  const [text_vendor_list, setText_vendor_list] = useState("Vendor List");
  const [search_vendor, setSearch_vendor] = useState("Search Vendor here...");

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [text_delete, setText_delete] = useState("Delete");
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getVendorList?.length === 0) {
      setIsLoading(true);

      Promise.all([dispatch(getVendorList())]).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
    } else {
      setIsLoading(false);
    }
  }, []);
  //token Expire
  // useEffect(() => {
  //   var u_token = sessionStorage.getItem("token");
  //   if (u_token === "" || u_token === null) {
  //     navigate("/");
  //   }
  // });
  const DeleteVendor = (id) => {
    var type = "delete";
    var data = {
      vendoruniqueid: id,
      _orgId: sessionStorage.getItem("_compId"),
    };
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/crud/collection/vendor?type=" +
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
        successToast(res.data.message);
        dispatch(getVendorList());
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
      name: <>{text_vendor_name}</>,
      sortable: true,
      selector: (row) => row.vendorname,
    },
    {
      name: <>{text_hint_email}</>,
      sortable: true,
      selector: (row) => (row.email === "" ? "NA" : row.email),
    },
    {
      name: <>{text_edit}</>,
      selector: (row) => (
        <Link to="/vendor/edit" state={{ VendorData: row?.vendoruniqueid }}>
          <button className="EditBtn vendorlist-edit-btn">{text_edit}</button>
        </Link>
      ),
    },
    {
      name: <>{text_delete}</>,
      selector: (row) => (
        <button
          className="ViewBtn"
          onClick={() => DeleteVendor(row?.vendoruniqueid)}
        >
          {text_delete}
        </button>
      ),
    },
  ];

  const filteredItems = VendorListData?.filter(
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
        PlaceHolder={search_vendor}
      />
    );
  }, [filterText, resetPaginationToggle, search_vendor]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_create(
      doc.querySelector("string[name='text_create']")?.textContent
    );
    setText_vendor_name(
      doc.querySelector("string[name='text_vendor_name']")?.textContent
    );
    setText_srno(doc.querySelector("string[name='text_srno']")?.textContent);
    setText_hint_email(
      doc.querySelector("string[name='text_hint_email']")?.textContent
    );
    setText_edit(doc.querySelector("string[name='text_edit']")?.textContent);
    setText_vendor_list(
      doc.querySelector("string[name='text_vendor_list']")?.textContent
    );
    setSearch_vendor(
      doc.querySelector("string[name='search_vendor']")?.textContent
    );
    setText_delete(
      doc.querySelector("string[name='text_delete']")?.textContent
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
        {text_vendor_list}
      </h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-row Searchbar vendorlist-searchbar">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/createvendor">
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
      <ToastContainer />
    </>
  );
}

export default VendorList;
