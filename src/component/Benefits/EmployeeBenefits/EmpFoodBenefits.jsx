import React, { useEffect, useState } from "react";
import "./../Benefits.css";
import UberEat from "../../../assets/img/uber-eats.png";
import Instacart from "../../../assets/img/instacart.png";
import swiggy from "../../../assets/img/swiggy.png";
import zomato from "../../../assets/img/zomato.png";
import BlinkIt from "../../../assets/img/Blinkit.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { infoToast } from "../../../utils/Helper";
import { ToastContainer } from "react-toastify";

function EmpFoodBenefits() {
  const navigate = useNavigate();
  const orgSelectedBenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );
  const EmpSelectedBenefitList = useSelector(
    (state) => state.EmpSelectedBenefits
  );
  //variable
  const [EmpFoodData, setEmpFoodData] = useState([]);

  const InsuranceList = [
    {
      Title: "Uber Eats",
      img: UberEat,
      Link: "",
    },
    {
      Title: "Zomato",
      img: zomato,
      Link: "",
    },
    {
      Title: "Swiggy",
      img: swiggy,
      Link: "",
    },
    {
      Title: "InstaCart",
      img: Instacart,
      Link: "",
    },
    {
      Title: "Blink It",
      img: BlinkIt,
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
      setEmpFoodData(Data);
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
      setEmpFoodData(Data);
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
        {EmpFoodData?.map((data, idx) => {
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

export default EmpFoodBenefits;
