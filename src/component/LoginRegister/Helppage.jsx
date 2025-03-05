import { useState, useEffect } from "react";
import Bg from "../../assets/img/LoginV3-Bg.png";
import Logo from "../../assets/img/MorambaLogo.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { errorToast, successToast } from "../../utils/Helper";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaRegThumbsUp } from "react-icons/fa";
function Helppage() {
  const [value, setValue] = useState("ResendLink");
  const [ResendEmail, setResendEmail] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [Help, setHelp] = useState("");
  const [file, setFile] = useState();
  const [errEmail, setErrEmail] = useState("");
  const [sendlinksuccess, setSendlinksuccess] = useState("");
  const [openHelp, setOpenHelp] = useState(false);
  const [helperr, setHelperr] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClosesupport = () => {
    setOpenHelp(false);
    navigate("/login");
  };

  console.log(file);

  function handleClick(event) {
    setValue(event.target.value);
  }
  const navigate = useNavigate();
  const sendEmail = () => {
    if (ResendEmail !== "") {
      var API_URL =
        GlobalConstants.Cdomain + "/API/moramba/v4/user/resendverifylink";
      var DATA = {
        username: ResendEmail,
      };
      axios
        .post(API_URL, DATA)
        .then(function (response) {
          if (response.status) {
            setOpenHelp(true);
            setSendlinksuccess(
              "Check your Register Email or Phone For Verification Link!"
            );
          }
        })
        .catch(function (error) {
          setHelperr(error.response.data.message);
        });
    } else {
      setErrEmail("*Please Enter Registered Email or Phone Number!");
    }
  };
  const handleCancle = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  const handleFileInput = (event) => {
    var file = event.target.files[0];
    console.log(file);
  };
  return (
    <>
      <main className="login-main">
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={openHelp}
            onClose={handleClosesupport}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" className="text-center">
            {/* <FaRegThumbsUp className="text-center thumb-sty" /> */}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p className="forgotsuccess  mb-4">{sendlinksuccess}</p>
              </DialogContentText>
              <Divider />
            </DialogContent>
            <DialogActions>
              <button className="btncancel mx-4" onClick={handleClosesupport}>
                Ok
              </button>
            </DialogActions>
          </Dialog>
        </div>
        <nav className="d-flex justify-content-between align-items-center w-full mb-5 p-3">
          <div>
            <img className="logoimg" src={Logo} alt="" />
          </div>
        </nav>
        <div className="d-flex justify-content-evenly align-items-center w-full">
          <img src={Bg} alt="Login_Background" id="login-bg" />
          <div className="login-main-box text-center p-4">
            <h3 className="logo_text">How Can We Help You?</h3>
            {/* <FormControl component="fieldset"> */}
            {/* <RadioGroup row aria-label="Help" name="Help1" value={value}> */}
            {/* <FormControlLabel
                  value="ResendLink"
                  control={<Radio onClick={handleClick} />}
                  label="Resend Verification Link"
                /> */}
            {/* <FormControlLabel
                  value="contactUs"
                  control={<Radio onClick={handleClick} />}
                  label="Contact Us"
                /> */}
            {/* </RadioGroup> */}
            {/* </FormControl> */}
            <h5 className="text-muted">Resend Verification Link</h5>
            {/* {value === "contactUs" && (
              <div>
                <Divider />
                   <h5 className="mt-2 text-start title-sty">Your Name(Optional)</h5>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="mt-1 w-75"
                    placeholder="Enter Your Name"
                  />
                  <h5 className="mt-3 text-start title-sty">Email</h5>
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => {
                      setEmailId(e.target.value);
                    }}
                    className="mt-1 text-start w-75"
                    placeholder="Enter Email "
                  />
                  <h5 className="mt-3 text-start title-sty">How can we help you?</h5>
                  <textarea
                    type="text"
                    value={Help}
                    onChange={(e) => {
                      setHelp(e.target.value);
                    }}
                    className="mt-1 text-start w-75 h-100"
                    placeholder=""
                  />
                   <h5 className="mt-3 text-start title-sty">Attachments</h5>
                  <input
                    type="file"
                    // value={file}
                    onChange={handleFileInput}
                    className="mt-1 text-start w-75 h-100"
                    placeholder=""
                  />
              <div className="d-flex justify-content-center gap-3">
              <button
                      className="btncancel mt-3 me-3"
                      onClick={handleCancle}
                    >
                      cancel
                    </button>
                    <button className="CreateBtn mt-3" >
                      Send  
                    </button>
                </div>
                
                 
              </div>
            )} */}
            {/* {value === "ResendLink" && (
              <div> */}
            <Divider />
            <div>
              {/* <h6 className="mt-2">Verify Your Account!</h6> */}
              <div>
                <input
                  placeholder="Enter Email or Phone Number"
                  type="email"
                  className="Login-input mt-4"
                  onChange={(e) => [
                    setResendEmail(e.target.value),
                    setErrEmail(""),
                    setHelperr("")
                  ]}
                />
                <p className="error_sty text-start px-3 mt-1">{errEmail}</p>
              <p className="regErr-p  mb-4">{helperr}</p>

              </div>

              <div>
                <button className="btncancel mt-3 me-3" onClick={handleCancle}>
                  cancel
                </button>
                <button className="CreateBtn mt-3" onClick={sendEmail}>
                  Send Link
                </button>
              </div>
            </div>
            {/* </div> */}
            {/* )} */}
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default Helppage;
