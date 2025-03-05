import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customTableStyles } from "../../utils/CommanTableStyle";
import FilterComponent from "../../utils/FilterComponent";
import Header from "../Header/Header";
import "./AddProjectModule.css";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";

function AddProjectModule() {
  const [modulename, setmodulename] = useState("");
  const [modulecode, setmodulecode] = useState("");
  const [morambaplan, setmorambaplan] = useState("Select Plan");
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const navigate = useNavigate();

  const TableData = [
    {
      srno: "1",
      moduleName: "Module-one",
      moduleCode: "123",
      modulePlan: "Gold",
      EffDate: "Jan 01,2023",
    },
    {
      srno: "2",
      moduleName: "Module-two",
      moduleCode: "123",
      modulePlan: "Silver",
      EffDate: "Jan 01,2023",
    },
  ];
  const columns = [
    {
      name: "Sr No.",
      sortable: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Module Name",
      sortable: false,
      selector: (row) => row.moduleName,
    },
    {
      name: "Module Code",
      sortable: true,
      selector: (row) => row.moduleCode,
    },
    {
      name: "Moramba Plan",
      sortable: true,
      selector: (row) => row.modulePlan,
    },
    {
      name: "Delete",
      selector: (row) => <button className="ViewBtn">Delete</button>,
    },
  ];
  const filteredItems = TableData.filter(
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
        PlaceHolder="Search here..."
      />
    );
  }, [filterText, resetPaginationToggle]);

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
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">Billing Module</h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex flex-row mt-2 p-4 justify-content-end">
          <Link to="/addprojectplan">
            <button className="upgradeBtn p-2">Add Plan</button>
          </Link>
        </div>
        <div className="row p-3">
          <div className="col-md-4">
            <h4>Plan</h4>
            <select
              className="Projectmoduleinput"
              onChange={(e) => setmorambaplan(e.target.value)}
              // onChange={(e) => [
              //     checkData(e),
              // ]}
            >
              <option disabled selected>
                Select Plan
              </option>
              <option value="basic">Basic</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
            </select>
          </div>
          <div className="col-md-4">
            <h4>Module Name</h4>
            <input
              type="text"
              placeholder="Enter Module Name"
              onChange={(e) => [setmodulename(e.target.value)]}
            />
          </div>
          <div className="col-md-4">
            <h4>Module Code</h4>
            <input
              type="text"
              placeholder="Enter Module code"
              onChange={(e) => [setmodulecode(e.target.value)]}
            />
          </div>
        </div>
        <center>
          <button className="btnsave mt-5">Submit</button>
        </center>
        <br />
        <div className="row ">
          <div className="d-flex justify-content-end">
            <div className="d-flex flex-row align-items-center Searchbar searchbarbox">
              <SearchIcon />
              {subHeaderComponent}
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}

export default AddProjectModule;
