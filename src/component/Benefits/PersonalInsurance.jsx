import React, { useEffect, useState } from "react";
import "./Benefits.css";
import TermLife from "../../assets/img/TermLife.png";
import Return_primium from "../../assets/img/Return&primium.png";
import LifeInsurance from "../../assets/img/Life Insurance For Housewives.png";
import Health from "../../assets/img/Health.png";
import LicPlan from "../../assets/img/LIC.png";
import Retirement from "../../assets/img/Retirement.png";
import SmartDeposite from "../../assets/img/SmartDeposite.png";
import Tax from "../../assets/img/tax.png";
import Travel from "../../assets/img/Travel.png";
import Group_Health from "../../assets/img/Group_Health.png";
import Car from "../../assets/img/car.png";
import Home from "../../assets/img/Home.png";
import CorporateInsurance from "../../assets/img/Corporate insurance.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { infoToast } from "../../utils/Helper";

function PersonalInsurance() {
  const navigate = useNavigate();
  const GlobalBenefitsList = useSelector((state) => state.GlobalBenefits);
  const orgSelectedBenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );

  //variable
  const [PersonalData, setPersonalData] = useState([]);

  const InsuranceList = [
    {
      Title: "Term Life",
      img: TermLife,
      Link: "",
    },
    {
      Title: "Return of Premium",
      img: Return_primium,
      Link: "",
    },
    {
      Title: "Life Insurance For Housewives",
      img: LifeInsurance,
      Link: "",
    },
    {
      Title: "Health",
      img: Health,
      Link: "",
    },
    {
      Title: "LIC Plans",
      img: LicPlan,
      Link: "",
    },
    {
      Title: "Retirement Plan",
      img: Retirement,
      Link: "",
    },
    {
      Title: "Smart Deposit",
      img: SmartDeposite,
      Link: "",
    },
    {
      Title: "Tax Saving Investment",
      img: Tax,
      Link: "",
    },
    {
      Title: "Travel Insurance",
      img: Travel,
      Link: "",
    },
    {
      Title: "Group Health Insurance",
      img: Group_Health,
      Link: "",
    },
    {
      Title: "Car Insurance",
      img: Car,
      Link: "",
    },
    {
      Title: "Home Insurance",
      img: Home,
      Link: "",
    },
    {
      Title: "Corporate Insurance",
      img: CorporateInsurance,
      Link: "",
    },
  ];

  useEffect(() => {
    var Data = InsuranceList;
    if (window.location.pathname === "/org/selected/benefits") {
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
      setPersonalData(Data);
    } else {
      for (let i = 0; i < Data.length; i++) {
        Data[i] = {
          Title: Data[i].Title,
          img: Data[i].img,
          Link: Data[i].Link,
          NumberOfBenefits: GlobalBenefitsList?.filter((data) => {
            return data?.subcategory === Data[i].Title.replace(/ /g, "");
          }),
        };
      }
      setPersonalData(Data);
    }
  }, [GlobalBenefitsList, orgSelectedBenefitsList]);

  const BenefiteClicked = (data) => {
    if (data?.NumberOfBenefits?.length === 0) {
      infoToast("No Benefits Are There!");
      return;
    } else {
      if (window.location.pathname === "/org/selected/benefits") {
        navigate(`/org/benefits/${data?.Title.replace(/ /g, "")}`, {
          state: {
            data,
            selected: true,
          },
        });
      } else {
        navigate(`/org/benefits/${data?.Title.replace(/ /g, "")}`, {
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
        {PersonalData?.map((data, idx) => {
          return (
            <>
              {window.location.pathname === "/org/selected/benefits" &&
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
    </>
  );
}

export default PersonalInsurance;
