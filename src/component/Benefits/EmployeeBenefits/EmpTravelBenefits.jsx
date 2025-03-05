import React, { useEffect, useState } from "react";
import Uber from "../../../assets/img/uber.png";
import Bus from "../../../assets/img/bus.png";
import Train from "../../../assets/img/train.png";
import Flight from "../../../assets/img/airplaneTicket.png";
import Hotel from "../../../assets/img/Hotel.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { infoToast } from "../../../utils/Helper";
import { ToastContainer } from "react-toastify";

function EmpTravelBenefits() {
  const navigate = useNavigate();
  const orgSelectedBenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );
  const EmpSelectedBenefitList = useSelector(
    (state) => state.EmpSelectedBenefits
  );

  console.log(orgSelectedBenefitsList);
  //variable
  const [EmpTravelData, setTravelData] = useState([]);

  const InsuranceList = [
    {
      Title: "Uber",
      img: Uber,
      Link: "",
    },
    {
      Title: "Bus Pass",
      img: Bus,
      Link: "",
    },
    {
      Title: "Train Pass",
      img: Train,
      Link: "",
    },
    {
      Title: "Flight Tickets",
      img: Flight,
      Link: "",
    },
    {
      Title: "Hotel",
      img: Hotel,
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
      setTravelData(Data);
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
      setTravelData(Data);
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
        {EmpTravelData?.map((data, idx) => {
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

export default EmpTravelBenefits;
