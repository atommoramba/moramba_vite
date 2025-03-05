import React from "react";
import "../TermsandPrivacyPolicy/PrivacyPolicy.css";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import GoToTop from "./GoToTop";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-end mt-2 p-4">
        <button className="backBtn" onClick={() => navigate("/register")}>
          <BsArrowLeft />
          &nbsp;&nbsp; Back
        </button>
      </div>
      <div className="container termsbox ">
        <div className="termsheadbox p-3">
          <h3 className="text-center mt-4">MORAMBA PRIVACY POLICY</h3>
          <h5 className="">Effective Date: 08/24/2023</h5>
        </div>
        <p className="mt-4">
          This Privacy Policy describes how Digital Expeditions Inc. d/b/a
          Moramba handles personal information that we collect through our
          website, application, and any other sites or services that link to
          this Privacy Policy (collectively, the “Services”).
        </p>
        <p>
          Your personal information will be handled in accordance with our
          &nbsp;
          <b>
            <Link to={"/consumerprivacy"} className="connsumertextstyle">
              <u>Consumer Privacy Notice</u>
            </Link>
          </b>
          .{" "}
        </p>
        <h4>
          <b>Personal information we may collect</b>
        </h4>
        <h5 className="mt-3">Information users submit to us:</h5>
        <div className="mt-3 px-4">
          <ul>
            <li className="privacyliststyle">
              <b>Contact and account information,</b> such as your first and
              last name, phone number, mailing address, email address, and
              password.
            </li>
            <li className="privacyliststyle">
              <b>Financial information</b> needed to transfer money or transact
              on our Services, including your bank account details and account
              balances, which we may obtain from your financial institutions.
            </li>
            <li className="privacyliststyle">
              <b>Loan information,</b> such as the loan amount, duration, and
              term.
            </li>
            <li className="privacyliststyle">
              <b>Feedback or correspondence,</b> such as information you provide
              when you contact us with questions, feedback, or otherwise
              correspond with us online.{" "}
            </li>
            <li className="privacyliststyle">
              <b>Usage information,</b> such as information about how you use
              the Services and interact with us, including information
              associated with any content you upload to the Services or
              otherwise submit, and information you provide when you use any
              interactive features of the Services.
            </li>
            <li className="privacyliststyle">
              <b>Marketing information,</b> such as your preferences for
              receiving communications about our Services, and details about how
              you engage with our communications.
            </li>
            <li className="privacyliststyle">
              <b>Other information</b> that we may collect which is not
              specifically listed here, but which we will use in accordance with
              this Privacy Policy or as otherwise disclosed at the time of
              collection.
            </li>
          </ul>
        </div>
        <h5>Information we obtain from third parties:</h5>
        <div className="mt-3 px-4">
          <ul>
            <li className="privacyliststyle">
              <b>Publicly available information.</b>
            </li>
            <li className="privacyliststyle">
              <b>Social media information.</b> We may maintain pages on social
              media platforms, such as Facebook, TikTok, Instagram, LinkedIn,
              Twitter, and other third-party platforms. When you visit or
              interact with our pages on those platforms, the platform
              provider’s privacy policy will apply to your interactions and
              their collection, use and processing of your personal information.
              You or the platforms may provide us with information such as your
              biographical, educational, and professional experience, and we
              will treat such information in accordance with this Privacy
              Policy.
            </li>
            <li className="privacyliststyle">
              <b>Third-party login information.</b> When you link, connect, or
              login to the Services with a third party service (e.g. Google),
              you direct the service to send us information such as your
              registration, friends list, and profile information as controlled
              by that service or as authorized by you via your privacy settings
              at that service.
            </li>
            <li className="privacyliststyle">
              <b>Other sources.</b> We may obtain your personal information from
              other third parties, such as marketing partners,
              publicly-available sources and data providers.{" "}
            </li>
          </ul>
        </div>
        <p>
          <b>Automatic data collection.</b> We and our service providers may
          automatically log information about you, your computer or mobile
          device, and your interactions over time with our Services, our
          communications and other online services, such as:
        </p>
        <div className="px-4">
          <ul>
            <li className="privacyliststyle">
              <b>Device data,</b> such as your computer’s or mobile device’s
              operating system type and version, manufacturer and model, browser
              type, screen resolution, RAM and disk size, CPU usage, device type
              (e.g., phone, tablet), IP address, unique identifiers, language
              settings, mobile device carrier, radio/network information (e.g.,
              WiFi, LTE, 4G), and general location information such as city,
              state or geographic area.
            </li>
            <li className="privacyliststyle">
              <b>Online activity data,</b> such as pages or screens you viewed,
              how long you spent on a page or screen, browsing history,
              navigation paths between pages or screens, information about your
              activity on a page or screen, access times, duration of access,
              and whether you have opened our marketing emails or clicked links
              within them.
            </li>
          </ul>
        </div>
        <h5>We use the following tools for automatic data collection:</h5>
        <div className="px-4">
          <ul>
            <li className="privacyliststyle">
              <b>Cookies,</b> which are text files that websites store on a
              visitor‘s device to uniquely identify the visitor’s browser or to
              store information or settings in the browser for the purpose of
              helping you navigate between pages efficiently, remembering your
              preferences, enabling functionality, and helping us understand
              user activity and patterns.
            </li>
            <li className="privacyliststyle">
              <b>Local storage technologies,</b> like HTML5, that provide
              cookie-equivalent functionality but can store larger amounts of
              data, including on your device outside of your browser in
              connection with specific applications.
            </li>
            <li className="privacyliststyle">
              <b>Web beacons,</b> also known as pixel tags or clear GIFs, which
              are used to demonstrate that a webpage or email was accessed or
              opened, or that certain content was viewed or clicked.
            </li>
          </ul>
        </div>
        <h5>
          <b>How we use your personal information</b>
        </h5>
        <h5>To operate our Services:</h5>
        <div className="px-4">
          <ul>
            <li className="privacyliststyle">
              Provide, operate, maintain, secure and improve our Services.
            </li>
            <li className="privacyliststyle">
              Provide our users with customer service.
            </li>
            <li className="privacyliststyle">
              Communicate with you about our Services, including by sending you
              announcements, updates, security alerts, and support and
              administrative messages.
            </li>
            <li className="privacyliststyle">
              Understand your needs and interests, and personalize your
              experience with our Services and our communications.
            </li>
            <li className="privacyliststyle">
              Respond to your requests, questions and feedback.
            </li>
          </ul>
        </div>
        <p>
          <b>For research and development.</b> We may use your personal
          information for research and development purposes, including to
          analyze and improve our Services and our business. As part of these
          activities, we may create aggregated, de-identified, or other
          anonymous data from personal information we collect. We make personal
          information into anonymous data by removing information that makes the
          data personally identifiable to you. We may use this anonymous data
          and share it with third parties for our lawful business purposes,
          including to analyze and improve our Services and promote our
          business.
        </p>
        <p>
          <b>Direct marketing.</b> We may from time-to-time send you direct
          marketing communications as permitted by law, including, but not
          limited to, notifying you of special promotions, offers and events via
          email and in-app notifications. You may opt out of our marketing
          communications as described in the “Opt out of marketing
          communications” section below.
        </p>
        <p>
          <b>Compliance and protection.</b> We may use personal information to:
        </p>
        <div className="px-4">
          <ul>
            <li className="privacyliststyle">
              Comply with applicable laws, lawful requests, and legal process,
              such as to respond to subpoenas or requests from government
              authorities.
            </li>
            <li className="privacyliststyle">
              Protect our, your or others’ rights, privacy, safety or property
              (including by making and defending legal claims).
            </li>
            <li className="privacyliststyle">
              Audit our internal processes for compliance with legal and
              contractual requirements and internal policies.
            </li>
            <li className="privacyliststyle">
              Enforce the terms and conditions that govern our Services.
            </li>
            <li className="privacyliststyle">
              Prevent, identify, investigate and deter fraudulent, harmful,
              unauthorized, unethical or illegal activity, including
              cyberattacks and identity theft.
            </li>
          </ul>
        </div>
        <h5>
          <b>How we share your personal information</b>
        </h5>
        <p className="mt-3">
          <b>Service providers.</b> We may share your personal information with
          third party companies and individuals that provide services on our
          behalf or help us operate our Services (such as lawyers, bankers,
          auditors, insurers, customer support, hosting, analytics, email
          delivery, marketing, and database management).
        </p>
        <p>
          <b>Authorities and others.</b> We may disclose your personal
          information to law enforcement, government authorities, and private
          parties, as we believe in good faith to be necessary or appropriate
          for the compliance and protection purposes described above.
        </p>
        <p>
          <b>Business transfers.</b> We may sell, transfer or otherwise share
          some or all of our business or assets, including your personal
          information, in connection with a business transaction (or potential
          business transaction) such as a corporate divestiture, merger,
          consolidation, acquisition, reorganization or sale of assets, or in
          the event of bankruptcy or dissolution. In such a case, we will make
          reasonable efforts to require the recipient to honor this Privacy
          Policy.
        </p>
        <h5>
          <b>Your choices</b>
        </h5>
        <p className="mt-3">
          <b>Access or update your information.</b> Users may themselves update
          their personal information in their accounts by logging in and editing
          their information.
        </p>
        <p>
          <b>Opt out of marketing communications.</b> You may opt out of
          marketing-related emails by following the opt-out or unsubscribe
          instructions at the bottom of the email. You may continue to receive
          service-related and other non-marketing emails.{" "}
        </p>
        <p>
          <b>Online tracking opt-out.</b> There are a number of ways to limit
          online tracking, which we have summarized below:
        </p>
        <div className="px-4">
          <ul>
            <li className="privacyliststyle">
              <b>Blocking cookies in your browser.</b> Most browsers let you
              remove or reject cookies. To do this, follow the instructions in
              your browser settings. Many browsers accept cookies by default
              until you change your settings. For more information about
              cookies, including how to see what cookies have been set on your
              device and how to manage and delete them, visit{" "}
              <Link
                to={"https://www.allaboutcookies.org/"}
                target="blank"
                className="privacylinkstyle"
              >
                www.allaboutcookies.org.
              </Link>
            </li>
            <li className="privacyliststyle">
              <b>Using privacy plug-ins or browsers.</b> You can block our
              Services from setting cookies by using a browser with privacy
              features, like{" "}
              <Link
                to={"https://brave.com/"}
                target="blank"
                className="privacylinkstyle"
              >
                Brave
              </Link>
              , or installing browser plugins like{" "}
              <Link
                to={"https://www.eff.org/privacybadger"}
                target="blank"
                className="privacylinkstyle"
              >
                Privacy Badger
              </Link>
              ,{" "}
              <Link
                to={"https://duckduckgo.com/"}
                target="blank"
                className="privacylinkstyle"
              >
                DuckDuckGo
              </Link>
              ,{" "}
              <Link
                to={"https://www.ghostery.com/"}
                target="blank"
                className="privacylinkstyle"
              >
                Ghostery
              </Link>{" "}
              or{" "}
              <Link
                to={"https://ublock.org"}
                target="blank"
                className="privacylinkstyle"
              >
                uBlock Origin
              </Link>
              , and configuring them to block third party cookies/trackers.
            </li>
            <li>
              <b>Google analytics.</b> We use Google Analytics to collect and
              summarize information about how individuals engage with the
              Services. For more information on Google Analytics, click{" "}
              <Link
                to={"https://marketingplatform.google.com/about/analytics/"}
                target="blank"
                className="privacylinkstyle"
              >
                here
              </Link>
              . For more information about Google’s privacy practices, click{" "}
              <Link
                to={"https://www.google.com/policies/privacy/partners/"}
                target="blank"
                className="privacylinkstyle"
              >
                here
              </Link>
              . You can opt out of Google Analytics by downloading and
              installing the browser plug-in available at:{" "}
              <Link
                to={"https://tools.google.com/dlpage/gaoptout"}
                target="blank"
                className="privacylinkstyle"
              >
                https://tools.google.com/dlpage/gaoptout
              </Link>
              .
            </li>
          </ul>
        </div>
        <p>
          Note that because these opt-out mechanisms are specific to the device
          or browser on which they are exercised, you will need to opt out on
          every browser and device that you use.
        </p>
        <p>
          <b>Do Not Track.</b> Some Internet browsers may be configured to send
          “Do Not Track” signals to the online services that you visit. We
          currently do not respond to “Do Not Track” or similar signals. To find
          out more about “Do Not Track,” please visit{" "}
          <Link
            to={"https://www.allaboutdnt.com/"}
            target="blank"
            className="privacylinkstyle"
          >
            http://www.allaboutdnt.com
          </Link>
          .
        </p>
        <p>
          <b>Personal information rights requests.</b> We offer you choices that
          affect how we handle the personal information that we control. These
          privacy rights may not apply to the information we collect, use or
          disclose about individuals who apply for or obtain a loan from
          Moramba. This is because this information is subject to the federal
          Gramm-Leach-Bliley Act (“GLBA”) and implementing regulations, or the
          California Financial Information Privacy Act (“CalFIPA”). The GLBA
          and/or CalFIPA may govern the information of users who initiated the
          process of applying for our financial products or services.
        </p>
        <p>
          If you have not applied for or obtained a loan from Moramba, you may
          request the following in relation to your personal information:{" "}
        </p>
        <div className="px-4">
          <ul>
            <li className="privacyliststyle">
              <b>Information</b> about how we collect and use your personal
              information. We have made this information available to you
              without having to request it by including it in this Privacy
              Policy.
            </li>
            <li className="privacyliststyle">
              <b>Access and portability.</b> You may request a copy of the
              personal information that we have collected about you. Where
              applicable, we will provide the information in a portable,
              machine-readable, and readily usable format.
            </li>
            <li className="privacyliststyle">
              <b>Correction</b> of personal information that is inaccurate or
              out of date.
            </li>
            <li className="privacyliststyle">
              <b>Deletion</b> of personal information that we no longer need to
              provide the Services or for other lawful purposes.
            </li>
          </ul>
        </div>
        <p>We do not sell your personal information</p>
        <p>
          You are entitled to exercise the rights described above free from
          discrimination.
        </p>
        <p>
          Please note that the law of your state may limit these rights by, for
          example, prohibiting us from providing certain sensitive information
          in response to an access request and limiting the circumstances in
          which we must comply with a deletion request. If we deny your request,
          we will communicate our decision to you.{" "}
        </p>
        <p>
          <b>To make a request,</b> you may contact us at support@moramba.com
        </p>
        <p>
          <b>Identity verification.</b> We will need to confirm your identity to
          process your requests to exercise your data subject rights. We cannot
          process your request if you do not provide us with sufficient detail
          to allow us to understand and respond to it.
        </p>
        <p>
          <b>Authorized agents.</b> California residents can empower an
          “authorized agent” to submit requests on their behalf. We will require
          the authorized agent to have a written authorization confirming that
          authority.
        </p>
        <h5>
          <b>Other sites, mobile applications and services</b>
        </h5>
        <p className="mt-3">
          Our Services may contain links to other websites, mobile applications,
          and other online services operated by third parties. These links are
          not an endorsement of, or representation that we are affiliated with,
          any third party. In addition, our content may be included on web pages
          or in mobile applications or online services that are not associated
          with us. We do not control third party websites, mobile applications
          or online services, and we are not responsible for their actions.
          Other websites and services follow different rules regarding the
          collection, use and sharing of your personal information. We encourage
          you to read the privacy policies of the other websites and mobile
          applications and online services you use.
        </p>
        <h5>
          <b>Security</b>
        </h5>
        <p className="mt-3">
          We employ a number of technical, organizational, and physical
          safeguards designed to protect the personal information we collect.
          However, no security measures are failsafe and we cannot guarantee the
          security of your personal information.
        </p>
        <h5>
          <b>Children</b>
        </h5>
        <p className="mt-3">
          Our Services are not intended for use by children under 13 years of
          age. If we learn that we have collected personal information through
          the Services from a child under 13 without the consent of the child’s
          parent or guardian as required by law, we will delete it.
        </p>
        <h5>
          <b>Changes to this Privacy Policy</b>
        </h5>
        <p className="mt-3">
          We reserve the right to modify this Privacy Policy at any time. If we
          make material changes to this Privacy Policy, we will notify you by
          updating the date of this Privacy Policy and posting it on the
          website.
        </p>
        <h5>
          <b>How to contact us</b>
        </h5>
        <p className="mt-3">
          Please direct any questions or comments about this Policy or our
          privacy practices to support@moramba.com.
        </p>
      </div>
      <br />
      <br />
      <GoToTop />
    </>
  );
}

export default PrivacyPolicy;
