import React from "react";
import "../HomePage/HomePage.css";
import Header from "../Header/Header";
import HomeImg from "../../assets/img/Homepage.jpg";
import payrollImg from "../../assets/img/Payroll_icn.png";
import timesheetImg from "../../assets/img/Time&atendance.png";
import loanImg from "../../assets/img/Loan_icn.png";
import benefits from "../../assets/img/benefits_icon.png";
import moreImg from "../../assets/img/more-features-icon.png";
import { Link } from "react-router-dom";
console.log("vite project");
function HomePage() {
  const HomeCarddData = [
    {
      img: payrollImg,
      title: "Payroll",
      para: "Payroll is the process of managing employee compensation and benefits. It involves calculating wages, taxes, and deductions accurately. Timely processing ensures employee satisfaction and legal compliance.",
    },
    {
      img: timesheetImg,
      title: "Timesheet & Attendance",
      para: "A timesheet and attendance system tracks employee work hours, ensuring accuracy, efficiency, and compliance with company policies. It simplifies payroll and performance management.",
    },
    {
      img: loanImg,
      title: "Loan",
      para: "The loan system enables individuals to borrow money from a lender and repay it over time, often with interest. It promotes economic activities and personal finance growth.",
    },
    {
      img: benefits,
      title: "Benefits",
      para: "They encompass health insurance, paid time off, professional development, and more. Effective employee management ensures fair treatment, communication, and growth opportunities. These practices foster a positive work environment and boost productivity.",
    },
  ];
  return (
    <>
      <Header />
      <div className="p-4" id="homepage">
        <div className="row">
          <div className="col-md-6  homepara">
            <center>
              <h4 className="mt-5 w-75">
                The HR and Employee Platform for Payroll, Timesheet &
                Attendance, Loan, Inventory, Benefits and more.
              </h4>
              <p className="mt-4 w-75">
                Our platform is designed to simplify and streamline the way you
                manage your workforce, making human resources tasks more
                efficient and effective. Whether you're a small business or a
                large enterprise, our comprehensive solution will help you
                optimize your employee management processes.
              </p>
              <Link to="/register">
                <button className="homeBtn mt-3">Create account</button>
              </Link>
            </center>
          </div>
          <div className="col-md-6">
            <img src={HomeImg} alt="" className="homepageimg" />
          </div>
        </div>
        <div className="row p-4  gap-5 mx-2 main-div-card">
          {HomeCarddData.map((item) => {
            return (
              <>
                <div className="homecard mx-2">
                  <center>
                    <img src={item.img} alt="" className="homeiconsty mt-4" />
                    <h5 className="mt-4">{item.title}</h5>
                    <p className="mt-4">{item.para}</p>
                  </center>
                </div>
              </>
            );
          })}
          <div className="homecard mx-2">
            <center>
              <div className="morefeabox">
                <img src={moreImg} alt="" className="homeiconsty mt-4" />
                <h5 className="mt-4">More Features</h5>
              </div>
              {/* <p className="mt-4">{item.para}</p> */}
            </center>
          </div>
        </div>
      </div>
      <div className="p-2 w-100">
        <div className="row">
          <div className="plansection">
            <center>
              <h4 className="mt-5">
                Let’s find the right plan for your business.
              </h4>
              <Link to={"/upgradplan"}>
                <button className="seeplanBtn">View Plan</button>
              </Link>
              <div className="text-center mt-4 text-muted">
                Digital Expeditions Inc Delaware, USA
                {/* Product of Atom, A Delaware Corporation. */}
              </div>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
