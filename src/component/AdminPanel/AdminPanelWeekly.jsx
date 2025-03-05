import React from "react";
import "./AdminPanel.css";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";

const AdminPanelWeekly = () => {
  const data = [
    {
      abc: "def",
    },
  ];

  const columns = [
    {
      name: "column_1",
    },
    {
      name: "column_2",
    },
    {
      name: "column_3",
    },
    {
      name: "column_4",
    },
    {
      name: "column_5",
    },
  ];

  return (
    <>
      <div className="mt-3 admindatatable">
        <DataTable
          columns={columns}
          data={data}
          pagination
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          customStyles={customTableStyles}
        />
      </div>
    </>
  );
};

export default AdminPanelWeekly;
