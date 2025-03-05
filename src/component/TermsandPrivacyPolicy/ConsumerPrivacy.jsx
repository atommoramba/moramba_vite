import React from "react";
import "../TermsandPrivacyPolicy/PrivacyPolicy.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import GoToTop from "./GoToTop";

function ConsumerPrivacy() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-end mt-2 p-4">
        <button className="backBtn" onClick={() => navigate("/privacypolicy")}>
          <BsArrowLeft />
          &nbsp;&nbsp; Back
        </button>
      </div>
      <div className="container termsbox ">
        <div className="termsheadbox p-3">
          <h3 className="text-center  mt-4">Consumer Privacy Notice</h3>
        </div>
        <table className="consumertablesize consumertableSty mt-3">
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox facttext p-4">
              FACTS
            </th>
            <th className="p-2 consumertableSty">
              WHAT DOES DIGITAL EXPEDITIONS INC. d/b/a MORAMBA DO WITH YOUR
              PERSONAL INFORMATION?
            </th>
          </tr>
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox p-4">
              Why?
            </th>
            <td className="p-2">
              Financial and technology companies choose how they share your
              personal information. Federal law gives consumers the right to
              limit some but not all sharing. Federal law also requires us to
              tell you how we collect, share, and protect your personal
              information. Please read this notice carefully to understand what
              we do.
            </td>
          </tr>
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox p-4">
              What?
            </th>
            <td className="p-2">
              The types of personal information we collect and share depend on
              the product or service you have with us. This information can
              include:
              <ul className="mt-2">
                <li>Full name</li>
                <li>Social Security / ID numbers and account balances</li>
                <li>Residential Address</li>
                <li>Transaction history</li>
              </ul>
              When you are no longer our customer, we continue to share your
              information as described in this notice.
            </td>
          </tr>
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox p-4">
              How?
            </th>
            <td className="p-2">
              All financial companies need to share customers’ personal
              information to run their everyday business. In the section below,
              we list the reasons financial companies can share their customers’
              personal information, the reasons Moramba chooses to share, and
              whether you can limit this sharing.
            </td>
          </tr>
        </table>
        <table className="consumertablesize consumertableSty mt-2">
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox p-4">
              Reasons we can share your personal information
            </th>
            <th className="consumertableSty text-center termsheadbox p-4">
              Does Moramba share?
            </th>
            <th className="consumertableSty text-center termsheadbox p-4">
              Can you limit this sharing?
            </th>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For our everyday business purposes</b> - such as to process
              your transactions, maintain your account(s), respond to court
              orders and legal investigations, or report to credit bureaus
            </td>
            <td className="p-2 consumertableSty text-center">Yes</td>
            <td className="p-2 consumertableSty text-center">No</td>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For our marketing purposes</b> - <br />
              to offer our products and services to you
            </td>
            <td className="p-2 consumertableSty text-center">Yes</td>
            <td className="p-2 consumertableSty text-center">No</td>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For joint marketing with other financial companies</b>
            </td>
            <td className="p-2 consumertableSty text-center">No</td>
            <td className="p-2 consumertableSty text-center">No</td>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For our affiliates’ everyday business purposes</b> -
              information about your transactions and experiences
            </td>
            <td className="p-2 consumertableSty text-center">No</td>
            <td className="p-2 consumertableSty text-center">We don’t share</td>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For our affiliates’ everyday business purposes</b> -
              information about your creditworthiness
            </td>
            <td className="p-2 consumertableSty text-center">No</td>
            <td className="p-2 consumertableSty text-center">We don’t share</td>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For our affiliates to market to you</b>
            </td>
            <td className="p-2 consumertableSty text-center">No</td>
            <td className="p-2 consumertableSty text-center">We don’t share</td>
          </tr>
          <tr className="consumertableSty">
            <td className="p-2 consumertableSty">
              <b>For nonaffiliates to market to you</b>
            </td>
            <td className="p-2 consumertableSty text-center">No</td>
            <td className="p-2 consumertableSty text-center">We don’t share</td>
          </tr>
        </table>
        <table className="consumertablesize consumertableSty mt-2">
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox p-4">
              To limit our sharing
            </th>
            <td className="p-2">
              <p>Email us at support@moramba.com </p>
              <p>
                <b>Please note:</b> If you are a new customer, we can begin
                sharing your information immediately from the date we post this
                notice. When you are no longer our customer, we continue to
                share your information as described in this notice.
              </p>
              <p>
                However, you can contact us at any time to limit our sharing.
              </p>
            </td>
          </tr>
          <tr className="consumertableSty">
            <th className="consumertableSty text-center termsheadbox p-4">
              Questions?
            </th>
            <td className="p-2">
              Email us at support@moramba.com, or go to https://www.moramba.com/
            </td>
          </tr>
        </table>
        <table className="consumertablesize">
          <tr className="consumertablesize consumertableSty termsheadbox ">
            <th className="consumertableSty p-3">Who we are</th>
          </tr>
        </table>
        <table className="consumertablesize consumertableSty ">
          <tr className="consumertableSty">
            <td className="consumertableSty p-3">
              Who is providing this notice?
            </td>
            <td className="consumertableSty p-3">
              Digital Expeditions Inc. d/b/a Moramba
            </td>
          </tr>
        </table>
        <table className="consumertablesize">
          <tr className="consumertablesize consumertableSty termsheadbox ">
            <th className="consumertableSty p-3">What we do</th>
          </tr>
        </table>
        <table className="consumertablesize consumertableSty ">
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4">
              How does Moramba protect my personal information?
            </td>
            <td className="consumertableSty p-4">
              To protect your personal information from unauthorized access and
              use, we use security measures that comply with federal law. These
              measures include computer safeguards and secured files and
              buildings.
            </td>
          </tr>
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4">
              How does Moramba collect my personal information?
            </td>
            <td className="consumertableSty p-4">
              We collect your personal information, for example, when you:
              <ul className="mt-3">
                <li>Open an account or provide account information</li>
                <li>Give us your contact information</li>
                <li>Tell us where to send money</li>
              </ul>
              We also may also collect your personal information from others,
              such as social media platforms, marketing partners and third-party
              data aggregators.
            </td>
          </tr>
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4">
              Why can’t I limit all sharing?
            </td>
            <td className="consumertableSty p-4">
              Federal law gives you the right to limit only:
              <ul className="mt-3">
                <li>
                  sharing for affiliates’ everyday business purposes -
                  information about your creditworthiness,
                </li>
                <li>
                  affiliates from using your information to market to you, and
                </li>
                <li>sharing for nonaffiliates to market to you.</li>
              </ul>
              State laws and individual companies may give you additional rights
              to limit sharing.
            </td>
          </tr>
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4">
              What happens when I limit sharing for an account I hold jointly
              with someone else?
            </td>
            <td className="consumertableSty p-4">
              Your choices will apply to everyone on your account.
            </td>
          </tr>
        </table>
        <table className="consumertablesize">
          <tr className="consumertablesize consumertableSty termsheadbox ">
            <th className="consumertableSty p-3">Definitions</th>
          </tr>
        </table>
        <table className="consumertablesize consumertableSty ">
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4">Affiliates</td>
            <td className="consumertableSty p-4">
              Companies related by common ownership or control. They can be
              financial and nonfinancial companies. Moramba has no affiliates.
            </td>
          </tr>
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4">Nonaffiliates</td>
            <td className="consumertableSty p-4">
              Companies not related by common ownership or control. They can be
              financial and nonfinancial companies. Moramba does not share with
              nonaffiliates so they can market to you.
            </td>
          </tr>
          <tr className="consumertableSty ">
            <td className="consumertableSty p-4 w-25">Joint marketing</td>
            <td className="consumertableSty p-4">
              A formal agreement between nonaffiliated financial companies that
              together market financial products or services to you. We do not
              engage in joint marketing activities.
            </td>
          </tr>
        </table>
      </div>
      <br />
      <br />
      <GoToTop />
    </>
  );
}

export default ConsumerPrivacy;
