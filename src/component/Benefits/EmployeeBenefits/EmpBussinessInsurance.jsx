import React, { useEffect, useState } from "react";
import "./../Benefits.css";
import FireBuilding from "../../../assets/img/Fire-building.png";
import ShopOwner from "../../../assets/img/ShopOwner.png";
import office from "../../../assets/img/office.png";
import GroupHealth from "../../../assets/img/Group_Health.png";
import PersonalAccident from "../../../assets/img/Personal-accident.png";
import GroupTerm from "../../../assets/img/GroupTerm.png";
import Covid19 from "../../../assets/img/Covid-19.png";
import ProfessionalIndemnity from "../../../assets/img/Professional_Indemnity.png";
import WorkMan from "../../../assets/img/WorkMan.png";
import GeneralLiability from "../../../assets/img/GeneralLiability.png";
import CyberInsurance from "../../../assets/img/CyberInsurance.png";
import ContractorMachinery from "../../../assets/img/ContractorMachinery.png";
import Directorofficer from "../../../assets/img/DirectorsOfficers.png";
import Contractor from "../../../assets/img/construction.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { infoToast } from "../../../utils/Helper";
import { ToastContainer } from "react-toastify";

function EmpBussinessInsurance() {
  const navigate = useNavigate();
  const orgSelectedBenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );
  const EmpSelectedBenefitList = useSelector(
    (state) => state.EmpSelectedBenefits
  );

  // variable
  const [EmpBussinessData, setEmpBussinessData] = useState([]);

  const InsuranceList = [
    {
      Title: "Fire & Burglary",
      img: FireBuilding,
      Link: "",
    },
    {
      Title: "Shop Owner Insurance",
      img: ShopOwner,
      Link: "",
    },
    {
      Title: "Office Package Policy",
      img: office,
      Link: "",
    },
    {
      Title: "Group Health Insurance",
      img: GroupHealth,
      Link: "",
    },
    {
      Title: "Group Personal Accident",
      img: PersonalAccident,
      Link: "",
    },
    {
      Title: "Group Term Life",
      img: GroupTerm,
      Link: "",
    },
    {
      Title: "COVID-19 Group Health Plan",
      img: Covid19,
      Link: "",
    },
    {
      Title: "Professional Indemnity",
      img: ProfessionalIndemnity,
      Link: "",
    },
    {
      Title: "Workmen Compensation",
      img: WorkMan,
      Link: "",
    },
    {
      Title: "General Liability",
      img: GeneralLiability,
      Link: "",
    },
    {
      Title: "Cyber Insurance",
      img: CyberInsurance,
      Link: "",
    },
    {
      Title: "Directors & Officers Liability",
      img: Directorofficer,
      Link: "",
    },
    {
      Title: "Contractor's Plant & Machinery",
      img: ContractorMachinery,
      Link: "",
    },
    {
      Title: "Construction All Risk",
      img: Contractor,
      Link: "",
    },
  ];

  useEffect(() => {
    var Data = InsuranceList;
    if (window.location.pathname === "/employee/selected/benefits") {
      for (let i = 0; i < Data.length; i++) {
        Data[i] = {
          Title: Data[i].Title,
          img: Data[i].img,
          Link: Data[i].Link,
          NumberOfBenefits: EmpSelectedBenefitList?.filter((v, index) => {
            return (
              v?.benefitdetails[0]?.subcategory ===
              Data[i]?.Title.replace(/ /g, "")
            );
          }),
        };
      }
      setEmpBussinessData(Data);
    } else {
      for (let i = 0; i < Data.length; i++) {
        Data[i] = {
          Title: Data[i].Title,
          img: Data[i].img,
          Link: Data[i].Link,
          NumberOfBenefits: orgSelectedBenefitsList?.filter((v, index) => {
            return (
              v?.benefitdetails[0]?.subcategory ===
              Data[i]?.Title.replace(/ /g, "")
            );
          }),
        };
      }
      setEmpBussinessData(Data);
      console.log(Data);
    }
  }, [orgSelectedBenefitsList, EmpSelectedBenefitList]);

  const BenefiteClicked = (data) => {
    if (data?.NumberOfBenefits?.length === 0) {
      infoToast("No Benefits Are There!");
      return;
    } else {
      if (window.location.pathname === "/employee/selected/benefits") {
        navigate(`/employee/benefits/${data?.Title.replace(/ /g, "")}`, {
          state: {
            data,
            selected: true,
          },
        });
      } else {
        navigate(`/employee/benefits/${data?.Title.replace(/ /g, "")}`, {
          state: {
            data,
            selected: false,
          },
        });
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        {EmpBussinessData?.map((data, idx) => {
          return (
            <>
              {window.location.pathname === "/employee/selected/benefits" &&
              data?.NumberOfBenefits?.length === 0 ? (
                ""
              ) : (
                <div
                  className="InsuranceBox"
                  key={idx}
                  onClick={() => BenefiteClicked(data)}
                >
                  <div className="text-center py-2">
                    <img className="InsuranceImg" src={data?.img} alt="" />
                    <p className="mt-3">
                      {data?.Title}({data?.NumberOfBenefits?.length})
                    </p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
}

export default EmpBussinessInsurance;
