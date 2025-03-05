import React, { useState, useEffect } from "react";
import "./InventoryTemplateList.css";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { GlobalConstants } from "../../utils/GlobalConstants";

function ViewInventoryTemplate() {
  let data = useLocation();
  const viewInventoryData = data.state != null ? data.state.data : "";
  const tableData = viewInventoryData.breakuplist;

  //Language Variables Start
  // old language variable
  const [text_view_inventory, setText_view_inventory] = useState(
    "View Inventory Profile"
  );
  const [view_inventory_text, setView_inventory_text] = useState(
    "View Inventory Template"
  );
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_go_back, setText_go_back] = useState("Go Back");
  //Language Variables Ends

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setView_inventory_text(
      doc.querySelector("string[name='view_inventory_text']")?.textContent
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
    );
    setText_go_back(
      doc.querySelector("string[name='text_go_back']")?.textContent
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
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">
        {view_inventory_text}
      </h3>
      <div className="container containerBox">
        <center>
          <div className="col-md-3 mt-5"></div>
          <div className="col-md-6 sampleTemplateSTy2">
            <div className=" tableheader_invent  mx-4 ">&nbsp;</div>
            <br />
            <h4 className="head_clr_bill text-black">
              <b>
                {text_temp_name} :-{" "}
                <span className="temp_sty">
                  {viewInventoryData.templatename}
                </span>
              </b>
            </h4>
            <div className="scrollTable">
              <table className="table_invoice">
                <thead className="tableheader">
                  <tr className="inventory_color">
                    {tableData.map((value) => {
                      return (
                        <>
                          <th className="temp_font">{value.category}</th>
                        </>
                      );
                    })}
                  </tr>
                  <tr className="td_invent_color">
                    {tableData.map((value) => {
                      return (
                        <>
                          <td>-</td>
                        </>
                      );
                    })}
                  </tr>
                </thead>
              </table>
            </div>
            <br />
            <div className="col-md-3"></div>
          </div>
          <Link to="/managetemplate" state={{ data: 1 }}>
            <button className="Btngoback mt-5 "> {text_go_back}</button>
          </Link>
        </center>
      </div>
    </>
  );
}

export default ViewInventoryTemplate;
