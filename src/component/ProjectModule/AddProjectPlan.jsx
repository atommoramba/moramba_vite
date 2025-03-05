import React, { useState, useMemo, useEffect } from "react";
import { customTableStyles } from "../../utils/CommanTableStyle";
import FilterComponent from "../../utils/FilterComponent";
import Header from "../Header/Header";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function AddProjectPlan() {
  const [moduleplan, setmoduleplan] = useState("");
  const [moduleplancode, setmoduleplancode] = useState("");
  const [moduleplanprice, setmoduleplanprice] = useState(0);

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const navigate = useNavigate();

  const TableData = [
    {
      srno: "1",
      modulePlan: "Gold",
      moduleplanCode: "123",
    },
    {
      srno: "2",
      modulePlan: "Basic",
      moduleplanCode: "123",
    },
  ];
  const columns = [
    {
      name: "Sr No.",
      sortable: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Module Plan",
      sortable: false,
      selector: (row) => row.modulePlan,
    },
    {
      name: "Module Plancode",
      sortable: true,
      selector: (row) => row.moduleplanCode,
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
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">Project Plan</h3>
      <div className="container containerBox mt-4 p-4">
        <div className="row">
          <div className="col-md-4">
            <h4>Plan Name</h4>
            <input
              type="text"
              placeholder="Enter Plan Name"
              onChange={(e) => [setmoduleplan(e.target.value)]}
            />
          </div>
          <div className="col-md-4">
            <h4>Plan Code</h4>
            <input
              type="text"
              placeholder="Enter Plan Code"
              onChange={(e) => [setmoduleplancode(e.target.value)]}
            />
          </div>
          <div className="col-md-4">
            <h4>Plan Cost</h4>
            <input
              type="number"
              onKeyDown={(evt) =>
                evt.which !== 8 &&
                evt.which !== 0 &&
                (evt.which < 48 || evt.which > 57) &&
                evt.preventDefault()
              }
              min={0}
              placeholder="Enter Plan Cost"
              onChange={(e) => [setmoduleplanprice(e.target.value)]}
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

export default AddProjectPlan;
