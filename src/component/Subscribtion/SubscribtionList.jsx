import React, { useState, useEffect, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import FilterComponent from "../../utils/FilterComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../utils/CommanTableStyle";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import dayjs from "dayjs";

import Cookie from "js-cookie";
import Loader from "../../utils/Loader";

function SubscribtionList() {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

  //language variable
  //old language
  const [Data, setData] = useState([]);
  const [create_sub_list, setCreate_sub_list] = useState(
    "Create Subscription List"
  );
  const [text_subscriptionData, setText_subscriptionData] =
    useState("Subscription Data");
  const [btn_view, setbtn_view] = useState("View");
  const [text_fileName, setText_fileName] = useState("File Name");
  const [text_fileId, setText_fileId] = useState("File ID");
  const [text_srno, setText_srno] = useState("Sr no");
  const [text_createdon, setText_createdon] = useState("Created on");
  const [text_search_template_here, setText_search_template_here] = useState(
    "Search Template Here..."
  );
  useEffect(() => {
    setIsLoading(true);
    NewsubscriptionData();
  }, []);
  const NewsubscriptionData = () => {
    var _compId = sessionStorage.getItem("_compId");
    var apiUrl =
      GlobalConstants.Cdomain +
      "/API/moramba/v3/getdata/collectiondata?collection_name=subscriptionData&search_key=_orgId&search_value=" +
      _compId +
      "&isbson_id=true";
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios
      .get(apiUrl, headerConfig)
      .then(function (response, id) {
        var res = response.data;
        var list = JSON.parse(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        if (list != undefined && list.length != 0) {
          var data = [];
          list?.map((item, index) => {
            var d = {
              SubName: item.TempleteName,
              SubId: item.TempleteId,
              Status: item.active + "",
              EffDate: item.createdAt,
              list: item.subscriptionDataList,
            };
            data.push(d);
          });
          setData(data);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
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
      })
      .then(function () {
        // always executed
      });
  };

  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      name: <>{text_srno}</>,
      selector: (row, index) => (pageCount - 1) * 10 + index + 1,
      width: "58px",
    },
    {
      name: <>{text_fileName}</>,
      sortable: true,
      selector: (row) => row.SubName,
    },
    {
      name: <>{text_fileId}</>,
      sortable: false,

      selector: (row) => row.SubId,
    },
    {
      name: <>{text_createdon}</>,
      sortable: true,
      selector: (row) => dayjs(row?.EffDate).format("MMM DD, YYYY"),
    },
    {
      name: <>{btn_view}</>,
      selector: (row) => (
        <Link
          to="/subscribtion/view"
          state={{
            list: row.list,
            FileName: row.SubName,
          }}
        >
          {console.log(row)}
          <button className="ViewBtn">{btn_view}</button>
        </Link>
      ),
    },
  ];

  const filteredItems = Data.filter(
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
        PlaceHolder={text_search_template_here}
      />
    );
  }, [filterText, resetPaginationToggle, text_search_template_here]);

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
    setText_subscriptionData(
      doc.querySelector("string[name='text_subscriptionData']")?.textContent
    );
    setText_fileName(
      doc.querySelector("string[name='text_fileName']")?.textContent
    );
    setText_fileId(
      doc.querySelector("string[name='text_fileId']")?.textContent
    );
    setText_createdon(
      doc.querySelector("string[name='text_createdon']")?.textContent
    );
    setbtn_view(doc.querySelector("string[name='btn_view']")?.textContent);
    setCreate_sub_list(
      doc.querySelector("string[name='create_sub_list']")?.textContent
    );
    setText_srno(doc.querySelector("string[name='text_srno']")?.textContent);
    setText_search_template_here(
      doc.querySelector("string[name='text_search_template_here']")?.textContent
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
      <h3 className="HeadingText mt-2 mb-2 text-center p-2">
        {text_subscriptionData}
      </h3>
      <div className="container containerBox mt-4 p-2">
        <div className="d-flex justify-content-end sub-list-searchbar-btn">
          <div className="d-flex flex-row Searchbar sub-list-searchbar">
            <SearchIcon />
            {subHeaderComponent}
          </div>{" "}
          &nbsp;&nbsp;
          <Link to="/subscription/create">
            <button className=" CreateBtn sub-list-btn">
              + {create_sub_list}
            </button>
          </Link>
        </div>
        <div className="mt-3">
          {IsLoading ? (
            <div className="mt-5 mb-5 d-flex justify-content-center">
              <Loader />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}

export default SubscribtionList;
