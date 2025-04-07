import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GlobalConstants } from "../../utils/GlobalConstants";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

function CheckoutPlan() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [text_ph_enterEmailId, setText_ph_enterEmailId] = useState(
    "Enter Your Email ID"
  );
  const [text_paynow, setText_paynow] = useState("Pay now");
  const [text_cancel, setText_cancel] = useState("Cancel");
  const [text_confirmationemail, setText_confirmationemail] = useState(
    "Confirmation Email ID"
  );
  const [text_noticecheckout, setText_noticecheckout] = useState(
    "Are you sure you want to cancel transaction?"
  );
  const [text_yes, setText_yes] = useState("Yes");
  const [text_no, setText_no] = useState("No");

  const [isLoading, setIsLoading] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  const paymentElementOptions = {
    layout: "tabs",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "https://www.moramba.com/plan-payment-status",
        return_url: "http://localhost:5173/plan-payment-status",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          break;
        case "processing":
          break;
        case "requires_payment_method":
          break;
        default:
          break;
      }
    });
  }, [stripe]);

  useEffect(() => {
    try {
      SetLanguageText();
    } catch (err) {
      console.log("" + err);
    }
  }, []);

  const SetLanguageText = () => {
    try {
      var xml = localStorage.getItem(GlobalConstants.session_lang_xml);
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      setText_paynow(
        doc.querySelector("string[name='text_paynow']")?.textContent ||
          "Pay now"
      );
      setText_cancel(
        doc.querySelector("string[name='text_cancel']")?.textContent || "Cancel"
      );
      setText_confirmationemail(
        doc.querySelector("string[name='text_confirmationemail']")
          ?.textContent || "Confirmation Email ID"
      );
      setText_noticecheckout(
        doc.querySelector("string[name='text_noticecheckout']")?.textContent ||
          "Are you sure you want to cancel transaction?"
      );
      setText_yes(
        doc.querySelector("string[name='text_yes']")?.textContent || "Yes"
      );
      setText_no(
        doc.querySelector("string[name='text_no']")?.textContent || "No"
      );
      setText_ph_enterEmailId(
        doc.querySelector("string[name='text_ph_enterEmailId']")?.textContent ||
          "Enter Your Email ID"
      );
    } catch (ert) {}
  };
  return (
    <>
      <center>
        <div id="payment-form" className="  w-50 " onSubmit={handleSubmit}>
          {/* <p>{text_confirmationemail}</p>
        <input
          type="email"
          className="form-control mb-3"
          placeholder={text_ph_enterEmailId}
          id="link-authentication-element"
          defaultValue={sessionStorage.getItem("useremail")}
        /> */}
          <div>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
          </div>
          <div>
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="CreateBtn mt-2 mx-3"
              onClick={handleSubmit}
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  <> {text_paynow}</>
                )}
              </span>
            </button>
            <button
              className="btncancel mt-2"
              onClick={() => setOpenInfo(true)}
            >
              <span id="button-text">{text_cancel}</span>
            </button>
          </div>
        </div>
      </center>

      <Dialog
        fullScreen={fullScreen}
        open={openInfo}
        onClose={handleCloseInfo}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="text-center"
        ></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3 className="text-center">{text_noticecheckout}</h3>

            <br />
          </DialogContentText>
          <Divider />
        </DialogContent>
        <>
          <div className="d-flex justify-content-center mb-3 gap-4">
            <button className="btncancel" onClick={handleCloseInfo}>
              {text_no}
            </button>
            <button
              className="CreateBtn "
              onClick={() => navigate(`/companyprofile`)}
            >
              {text_yes}
            </button>
          </div>
        </>
      </Dialog>
    </>
  );
}

export default CheckoutPlan;
