import React, { useEffect, useState } from "react";
import Uber from "../../assets/img/uber.png";
import Bus from "../../assets/img/bus.png";
import Train from "../../assets/img/train.png";
import Flight from "../../assets/img/airplaneTicket.png";
import Hotel from "../../assets/img/Hotel.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { infoToast } from "../../utils/Helper";

function TravelBenefits() {
  const navigate = useNavigate();
  const GlobalBenefitsList = useSelector((state) => state.GlobalBenefits);
  const orgSelectedBenefitsList = useSelector(
    (state) => state.OrgSelectedBenefits
  );

  //variable
  const [TravelData, setTravelData] = useState([]);

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
      setTravelData(Data);
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
      setTravelData(Data);
    }
  }, [GlobalBenefitsList, orgSelectedBenefitsList]);

  const BenefiteClicked = (data) => {
    console.log("Clicked", data?.NumberOfBenefits?.length);
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
    <div className="d-flex flex-wrap justify-content-center mt-5">
      {TravelData.map((data, idx) => {
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
                  <img className="InsuranceImg" src={data.img} alt="" />
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
  );
}

export default TravelBenefits;
