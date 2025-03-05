import React from "react";
import pappayaimg from "../../assets/img/Pappaya-cloud-logo.png";
import atomimg from "../../assets/img/atom_1.png";
import { Link } from "react-router-dom";

function ITServices() {

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        <Link to="https://pappayacloud.com/" target="_blank">
          <div className="ItservicesBox">
            <div className="text-center py-2">
              <img
                className="InsuranceImg pappayacloudimg"
                src={pappayaimg}
                alt=""
              />
              <p className="mt-3">Pappaya Cloud <br />
              Referral Code <br />
              YXGHX</p>
            </div>
          </div>
        </Link>
        <Link to="https://www.atomcenter.io/" target="_blank">
          <div className="ItservicesBox">
            <div className="text-center py-2">
              <img className="InsuranceImg" src={atomimg} alt="" />
              <p className="mt-3">Atom Storage</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ITServices;
