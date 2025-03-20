import React, { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import dayjs from "dayjs";
import FileSaver from "file-saver"; // ✅ Correct way in Vite

function SubscribtionView() {
  let data = useLocation();
  const datavalue = data.state.list[0];
  const DownloadFileName = data.state.FileName;
  console.log(DownloadFileName);
  //language variable
  //old language
  const [text_subscriptionData, setText_subscriptionData] =
    useState("Subscription Data");
  const [text_export, setText_export] = useState("Export");
  const [text_Sno, setText_Sno] = useState("Sr No");

  // variable
  const [filterText, setFilterText] = useState("");
  const [columns, setcolumns] = useState([]);
  const [TableData, setTableData] = useState([]);

  const saveToFileSystem = (response, filekey) => {
    const filename = filekey;
    FileSaver.saveAs(response, filename);
  };
  console.log(datavalue);
  useEffect(() => {
    var col = [
      {
        name: <>{text_Sno}</>,
        width: "100px",
        selector: (row, index) => index + 1,
      },
    ];
    var colData = [];
    var subscriptionList1 = datavalue.subscriptionlist;
    var subscriptionDataList = [datavalue];
    subscriptionList1?.map((item, i) => {
      console.log(item);
      var colname = item.categoryName;
      var datatype = item.datatype;
      var c = {
        name: colname,
        sortable: true,
        selector: (row) => row[colname],
        cell: (row) =>
          datatype === "file" ? (
            <button
              className="ViewBtn"
              onClick={(e) => downloadFile(datatype, colname, row)}
            >
              View
            </button>
          ) : (
            <p>
              {datatype === "date"
                ? dayjs(row[colname]).format("MMM DD,YYYY")
                : row[colname]}
            </p>
          ),
      };
      col.push(c);
    });

    subscriptionDataList?.map((item, i) => {
      var colval = item.subscriptionlist;
      var d = {};

      colval?.map((item, i) => {
        var colname = item.categoryName;
        var colval = item.categoryValue;
        var datatype = item.datatype;
        var filekey = item.filekey;
        d[colname] = datatype === "file" ? filekey : colval;
      });
      colData.push(d);
    });
    setcolumns(col);
    setTableData(colData);
    console.log(colData);
  }, [datavalue]);

  const downloadFile = (datatype, fetchkey, row) => {
    if (datatype === "file") {
      var filekey = row[fetchkey];
      console.log(filekey);
      //return;

      var employeeId = sessionStorage.getItem(
        GlobalConstants.session_current_emp_id
      );

      var apiUrl =
        GlobalConstants.Cdomain +
        `/API/moramba/v3/download/file?filekey=${filekey}&employeeId=${employeeId}`;
      let headerConfig = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        responseType: "blob",
      };

      axios
        .get(apiUrl, headerConfig)
        .then(function (response) {
          saveToFileSystem(response.data, filekey);
        })
        .catch(function (error) {
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
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  };

  const filteredItems = TableData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    setText_subscriptionData(
      doc.querySelector("string[name='text_subscriptionData']")?.textContent ||
        "Subscription Data"
    );
    setText_export(
      doc.querySelector("string[name='text_export']")?.textContent || "Export"
    );
    setText_Sno(
      doc.querySelector("string[name='text_Sno']")?.textContent || "Sr No"
    );
  };
  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log(err);
    }
  }, []);

  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(TableData[0] === null ? TableData : TableData[0]);
    console.log(keys);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }
  console.log(TableData);
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;
    const filename = `${DownloadFileName}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  const Export = ({ onExport }) => (
    <button className="ViewBtn p-2" onClick={(e) => onExport(e.target.value)}>
      {text_export}
    </button>
  );
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(TableData)} />,
    [TableData]
  );
  return (
    <>
      <>
        <Header />

        <h3 className="HeadingText mt-5 mb-2 text-center p-2">
          {text_subscriptionData}
        </h3>
        <div className="container containerBox mt-4 p-2">
          <DataTable
            columns={columns}
            data={filteredItems}
            actions={actionsMemo}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            customStyles={customTableStyles}
          />
        </div>
      </>
    </>
  );
}

export default SubscribtionView;
