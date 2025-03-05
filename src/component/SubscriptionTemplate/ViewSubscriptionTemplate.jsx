import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../utils/GlobalConstants";
import Header from "../Header/Header";

function ViewSubscriptionTemplate() {
  let data = useLocation();
  const viewSubscriptiondata = data.state != null ? data.state.data : "";
  const tableData = viewSubscriptiondata.breakuplist;
  //Language Variables Start
  // old language variable
  const [subscription_viewv3, setSubscription_viewv3] = useState(
    "View Subscription Template"
  );
  const [text_temp_name, setText_temp_name] = useState("Template Name");
  const [text_go_back, setText_go_back] = useState("Go Back");
  //Language Variables Ends

  const SetLanguageText = () => {
    var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    setSubscription_viewv3(
      doc.querySelector("string[name='subscription_viewv3']")?.textContent
    );
    setText_temp_name(
      doc.querySelector("string[name='text_temp_name']")?.textContent
    );
    setText_go_back(
      doc.querySelector("string[name='text_go_back']")?.textContent
    );
  };
  const navigate = useNavigate();
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
      <h3 className="HeadingText mt-5 mb-2 text-center p-2">
        {subscription_viewv3}
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
                  {viewSubscriptiondata.templatename}
                </span>
              </b>
            </h4>
            <div className="scrollTable">
              <table className="table_invoice">
                <thead className="tableheader">
                  {" "}
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
          <Link to="/managetemplate" state={{ data: 2 }}>
            <button className="Btngoback mt-5 "> {text_go_back}</button>
          </Link>
        </center>
      </div>
    </>
  );
}

export default ViewSubscriptionTemplate;
