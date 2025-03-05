import React from "react";
import "../TermsandPrivacyPolicy/PrivacyPolicy.css";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import GoToTop from "./GoToTop";

function TermsofServices() {
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
          <h3 className="text-center mt-4">MORAMBA TERMS OF SERVICE</h3>
          <h5 className="text-end">Date of Last Revision: August 24, 2023</h5>
        </div>
        <h5 className="mt-2">
          <u>Acceptance of These Terms of Service</u>
        </h5>
        <p className="mt-3">
          Digital Expeditions Inc. d/b/a Moramba (“Moramba,” “we,” “us,” or
          “our”) provides our services and related content to you through our
          website located at{" "}
          <Link
            to={"https://www.moramba.com/"}
            target="blank"
            className="privacylinkstyle"
          >
            https://www.moramba.com/
          </Link>{" "}
          (the “Site”) and through our mobile applications and related
          technologies (“Mobile Apps”, and collectively, such Mobile Apps and
          the Site, including any updated or new features, functionality and
          technology, the “Services”). All access and use of the Services is
          subject to the terms and conditions contained in these Terms of
          Service (as amended from time to time, these “Terms of Service”). By
          accessing, browsing, or otherwise using the Site, Mobile Apps, or any
          other aspect of the Services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms of Service. If you do
          not accept the terms and conditions of these Terms of Service, you
          will not access, browse, or otherwise use the Services.
        </p>
        <p>
          We reserve the right, at our sole discretion, to change or modify
          portions of these Terms of Service at any time. If we do this, we will
          post the changes on this page and will indicate at the top of this
          page the date these Terms of Service were last revised. You may read a
          current, effective copy of these Terms of Service by visiting the
          “Terms of Service” link on the Site. We may notify you of any material
          changes, either through the Services’ user interfaces, a pop-up
          notice, email, or through other reasonable means. Your continued use
          of the Services after the date any such changes become effective
          constitutes your acceptance of the new Terms of Service. You should
          periodically visit this page to review the current Terms of Service so
          you are aware of any revisions. If you do not agree to abide by these
          or any future Terms of Service, you will not access, browse, or use
          (or continue to access, browse, or use) the Services.
        </p>
        <p>
          If you are registering for a Moramba account or using the Services on
          behalf of an entity or other organization, you are agreeing to these
          Terms of Service for that entity or organization and representing to
          Moramba that you have the authority to bind that entity or
          organization to these Terms of Service (and, in which case, the term
          “you” will refer to that entity or organization).
        </p>
        <p className="termsparastyle">
          <b>
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN
            AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION REGARDING
            YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE AGREEMENT TO
            ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU SUBMIT CLAIMS
            YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION, AND FURTHER
            (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST MORAMBA ON
            AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS
            OR REPRESENTATIVE ACTION OR PROCEEDING, (2) YOU WILL ONLY BE
            PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND
            DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE
            ABLE TO HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN
            A COURT OF LAW.
          </b>
        </p>
        <p>
          <b>Your Privacy:</b> At Moramba, we respect your privacy. For more
          information please see our Privacy Policy, located at{" "}
          <Link
            target="blank"
            to={"https://www.moramba.com/"}
            className="privacylinkstyle"
          >
            https://www.moramba.com/
          </Link>{" "}
          (the “Privacy Policy”). By using the Services, you consent to our
          collection, use and disclosure of personal data and other data as
          outlined in the Privacy Policy.
        </p>
        <p>
          <b>Additional Terms:</b> Some of the Services may be subject to
          additional terms and conditions, which are posted or made available
          separately from these Terms of Service (“Additional Terms”). Your use
          of the Services may also be subject to additional policies, guidelines
          or rules we also post or make available. Such Additional Terms
          policies, guidelines and rules are incorporated and form a part of
          these Terms of Service. If there is a conflict between these Terms of
          Service and the Additional Terms, the Additional Terms will control.
          An example of Additional Terms is your Loan Agreement (as defined
          below).{" "}
        </p>
        <h5>
          <u>Access and Use of the Service</u>
        </h5>
        <div className="accessparastyle">
          <p className="mt-3">
            <b>Services:</b> The Services may include payroll, timesheet
            attendance, loans (each, a “Loan”), and other services made by
            Moramba. You may be eligible for a Loan, subject to the loan
            agreement you enter into with us when you take out a Loan with
            Moramba (“Loan Agreement”) to be used for any legal personal,
            family, or household purposes.
          </p>
          <p>
            <b>Registration Obligations & Identity Verification:</b> You may be
            required to register with Moramba or provide information about
            yourself (e.g., name and email address) in order to access and use
            certain features of the Services. If you choose to register for the
            Services, you agree to provide and maintain true, accurate, current,
            and complete information about yourself as prompted by the Services’
            registration forms. Registration data and certain other information
            about you are governed by our Privacy Policy.{" "}
          </p>
          <p>
            We will collect and verify your personal and financial information.
            We also may obtain personal information from third parties to verify
            your identity, or to prevent fraud. Personal information collected
            from any source may include, among other things, your name and
            address, Social Security or taxpayer identification number, and date
            of birth. You hereby authorize us, or a third-party service provider
            that we designate, to take any measures that we consider necessary
            to confirm the personal information you provide, verify and
            authenticate your personal information, and take any action we deem
            necessary based on the results.{" "}
          </p>
          <p>
            If you are under 18 years of age, you are not authorized to use the
            Services, with or without registering..
          </p>
          <p>
            <b>Member Account, Password and Security:</b> You are responsible
            for maintaining the confidentiality of your password and account
            details, if any, and are fully responsible for any and all
            activities that occur under your password or account. You agree to
            (a) immediately notify Moramba of any unauthorized use of your
            password or account or any other breach of security, and (b) ensure
            that you exit from your account at the end of each session when
            accessing the Services. Moramba will not be liable for any loss or
            damage arising from your failure to comply with this paragraph.
          </p>
          <p>
            <b>Modifications to Services:</b> Moramba reserves the right to
            modify or discontinue, temporarily or permanently, the Services (or
            any parts thereof) with or without notice. You agree that Moramba
            will not be liable to you or to any third party for any
            modification, suspension or discontinuance of the Services.
          </p>
          <p>
            <b>General Practices Regarding Use and Storage:</b> You acknowledge
            that Moramba may establish general practices and limits concerning
            use of the Services, including the maximum period of time that data
            or other content will be retained by the Services and the maximum
            storage space that will be allotted on Moramba’s or its third-party
            service providers’ servers on your behalf. You agree that Moramba
            has no responsibility or liability for the deletion or failure to
            store any data or other content maintained or uploaded by the
            Services. You acknowledge that Moramba reserves the right to
            terminate accounts that are inactive for an extended period of time.
            You further acknowledge that Moramba reserves the right to change
            these general practices and limits at any time, in its sole
            discretion, with or without notice.
          </p>
        </div>
        <h5>
          <u>Conditions of Access and Use</u>
        </h5>
        <p className="accessparastyle mt-3">
          <b>User Conduct:</b> You are solely responsible for all code, video,
          images, information, data, text, software, music, sound, photographs,
          graphics, messages, and other materials (“content”) that you make
          available to Moramba, including by uploading, posting, publishing, or
          displaying (“upload(ing)”) via the Services or by emailing or
          otherwise making available to other users of the Services
          (collectively, “User Content”). The following are examples of the
          kinds of content and/or uses that are illegal or prohibited by
          Moramba. Moramba reserves the right to investigate and take
          appropriate legal action against anyone who, in Moramba’s sole
          discretion, violates this provision, including removing the offending
          content from the Services, suspending or terminating the account of
          such violators, and reporting the violator to law enforcement
          authorities. You agree to not use the Services to:
        </p>
        <div>
          <ol className="conditionliststy">
            <li className="liststyle">
              email or otherwise upload any content that (i) infringes any
              intellectual property or other proprietary rights of any party;
              (ii) you do not have a right to upload under any law or under
              contractual or fiduciary relationships; (iii) contains software
              viruses or any other computer code, files or programs designed to
              interrupt, destroy, or limit the functionality of any computer
              software or hardware or telecommunications equipment; (iv) poses
              or creates a privacy or security risk to any person; (v)
              constitutes unsolicited or unauthorized advertising, promotional
              materials, commercial activities and/or sales, “junk mail,”
              “spam,” “chain letters,” “pyramid schemes,” “contests,”
              “sweepstakes,” or any other form of solicitation; (vi) is
              unlawful, harmful, threatening, abusive, harassing, tortious,
              excessively violent, defamatory, vulgar, obscene, pornographic,
              libelous, invasive of another’s privacy, hateful, discriminatory,
              or otherwise objectionable; or (vii) in the sole judgment of
              Moramba, is objectionable or which restricts or inhibits any other
              person from using or enjoying the Services, or which may expose
              Moramba or its users to any harm or liability of any type;
            </li>
            <li className="liststyle">
              interfere with or disrupt the Services or servers or networks
              connected to the Services, or disobey any requirements,
              procedures, policies, or regulations of networks connected to the
              Services;
            </li>
            <li className="liststyle">
              violate any applicable local, state, national, or international
              law, or any regulations having the force of law;
            </li>
            <li className="liststyle">
              impersonate any person or entity, or falsely state or otherwise
              misrepresent your affiliation with a person or entity;
            </li>
            <li className="liststyle">
              solicit personal information from anyone under the age of 18;
            </li>
            <li className="liststyle">
              harvest or collect email addresses or other contact information of
              other users from the Services by electronic or other means for the
              purposes of sending unsolicited emails or other unsolicited
              communications;
            </li>
            <li className="liststyle">
              advertise or offer to sell or buy any goods or services for any
              business purpose that is not specifically authorized;
            </li>
            <li className="liststyle">
              further or promote any criminal activity or enterprise or provide
              instructional information about illegal activities;
            </li>
            <li className="liststyle">
              intentionally or unintentionally violate any local, state, or
              federal law, including, but not limited to, rules, guidelines,
              and/or regulations of the U.S. Securities and Exchange Commission,
              in addition to any rules of any securities exchange, that would
              include without limitation, the New York Stock Exchange, the
              American Stock Exchange, or the NASDAQ, and any regulations having
              the force of law;
            </li>
            <li className="liststyle">
              obtain or attempt to access or otherwise obtain any content or
              information through any means not intentionally made available or
              provided for through the Services;
            </li>
            <li className="liststyle">
              circumvent, remove, alter, deactivate, degrade, or thwart any of
              the content protections in or geographic restrictions on any
              content (including Services Content (as defined below)) available
              on or through the Services, including through the use of virtual
              private networks; or
            </li>
            <li className="liststyle">
              engage in or use any data mining, robots, scraping, or similar
              data gathering or extraction methods. If you are blocked by
              Moramba from accessing the Services (including by blocking your IP
              address), you agree not to implement any measures to circumvent
              such blocking (e.g., by masking your IP address or using a proxy
              IP address or virtual private network).
            </li>
          </ol>
        </div>
        <p className="accessparastyle mt-3">
          <b>Competitors:</b> No employee, independent contractor, agent, or
          affiliate of any competitor is permitted to view, access, or use any
          portion of the Services without express written permission from
          Moramba. By viewing, using, or accessing the Services, you represent
          and warrant that you are not a competitor of Moramba or any of its
          affiliates, or acting on behalf of a competitor of Moramba in using or
          accessing the Services.
        </p>
        <p className="accessparastyle">
          [<b>Fees:</b> To the extent the Services or any portion thereof is
          made available for any fee, you may be required to select a payment
          plan and provide information regarding your credit card or other
          payment instrument. You represent and warrant to Moramba that such
          information is true and that you are authorized to use the payment
          instrument. You will promptly update your account information with
          Moramba or the Payment Processor (as defined below), as applicable, of
          any changes (for example, a change in your billing address or credit
          card expiration date) that may occur. You agree to pay Moramba the
          amount that is specified in the payment plan in accordance with the
          terms of such plan and these Terms of Service. If you dispute any
          charges you must let Moramba know within sixty (60) days after the
          date that Moramba charges you, or within such longer period of time as
          may be required under applicable law. You will be responsible for all
          taxes associated with the Services, other than taxes based on
          Moramba’s net income.]
        </p>
        <p className="accessparastyle">
          [<b>Refunds and Cancellations:</b> Payments made by you are final and
          non-refundable, unless otherwise determined by Moramba. You may cancel
          your account online by emailing us at: support@moramba.com.]
        </p>
        <p className="accessparastyle">
          <b>Commercial Use:</b> Unless otherwise expressly authorized in these
          Terms of Service or in the Services, you agree not to display,
          distribute, license, perform, publish, reproduce, duplicate, copy,
          create derivative works from, modify, sell, resell, grant access to,
          transfer, upload, or otherwise use or exploit any portion of the
          Services for any commercial purposes. The Services are for your
          personal use.
        </p>
        <h5>
          <u>Mobile Services and Software</u>
        </h5>
        <div className="accessparastyle">
          <p>
            <b>Mobile Services:</b> The Services include certain services that
            are available via a mobile device, including (i) the ability to
            upload content to the Services via a mobile device, (ii) the ability
            to browse the Services and the Site from a mobile device, and (iii)
            the ability to access certain features and content through Mobile
            Apps (collectively, the “Mobile Services”). To the extent you access
            the Services through a mobile device, your wireless service
            carrier’s standard charges, data rates, and other fees may apply. In
            addition, downloading, installing, or using certain Mobile Services
            may be prohibited or restricted by your carrier, and not all Mobile
            Services may work with all carriers or devices.
          </p>
          <p>
            <b>Telephonic Communications Services:</b> By using the Services and
            providing us with your telephone number(s), you are consenting to be
            contacted by Moramba or its affiliates or partners by telephone
            (including on a recorded line), automated calling, automated
            telephone dialing system calling, automated system calling,
            artificial voice or pre-recorded calling, text message, SMS and/or
            MMS message, or other telephonic or electronic means for marketing,
            solicitation, informational or another purposes, even if your
            telephone number(s) is registered on the National Do Not Call List,
            a state Do not Call List, or the internal Do Not Call List of
            Moramba or its affiliates or partners. You may be required to
            respond to an initial call or message as instructed to complete your
            registration and confirm enrollment to receive such calls, texts or
            other telephonic communications. You do not have to consent to
            receive calls or text messages from Moramba or its affiliates or
            partners for marketing or solicitation purposes to purchase
            Moramba’s products or services. In the event you no longer wish to
            receive such calls, text messages or other telephonic
            communications, you agree to notify Moramba or its affiliates or
            partners, as applicable, directly. In the event you change or
            deactivate your telephone number, you agree to promptly update your
            Moramba account information to ensure that your messages are not
            sent to a person that acquires your old telephone number.
          </p>
          <p>
            There is no additional charge for telephonic communications, but
            your carrier’s standard message and data rates apply to any calls,
            text messages, SMS or MMS messages you send or receive. Your carrier
            may prohibit or restrict certain mobile features and certain mobile
            features may be incompatible with your carrier or mobile device. We
            are not liable for any delays in the receipt of, or any failures to
            receive, any calls, text messages, SMS or MMS messages, as delivery
            is subject to effective transmission by your mobile carrier and
            compatibility of your mobile device. Please contact your mobile
            carrier if you have any questions regarding these issues or your
            mobile data and messaging plan.
          </p>
          <p>
            By reply to any text, SMS or MMS message you receive from us, you
            may text “STOP” to cancel or “HELP” for customer support
            information. If you choose to cancel text, SMS or MMS messages from
            us, you agree to receive a final message from us confirming your
            cancellation.{" "}
          </p>
          <p>
            [<b>Mobile App License:</b> Subject to these Terms of Service,
            Moramba hereby grants to you a limited, revocable, non-exclusive,
            non-transferable, non-sublicensable license to (a) install the
            Mobile App on one mobile device and (b) use the Mobile App for your
            own personal use solely to access and use the Services. For clarity,
            the foregoing is not intended to prohibit you from installing the
            Mobile App on another device on which you also agreed to these Terms
            of Service. Each instance of these Terms of Service that you agree
            to in connection with downloading a Mobile App grants you the
            aforementioned rights in connection with the installation and use of
            the Mobile App on one device.]
          </p>
          <p>
            <b>Ownership; Restrictions:</b> The technology and software
            underlying the Services or distributed in connection therewith are
            the property of Moramba, its affiliates, and its licensors (the
            “Software”). You agree not to copy, modify, create a derivative work
            of, reverse engineer, reverse assemble, or otherwise attempt to
            discover any source code, sell, assign, sublicense, or otherwise
            transfer any right in the Software. Any rights not expressly granted
            in these Terms of Service are reserved by Moramba.
          </p>
          <p>
            <b> Special Notice for International Use; Export Controls:</b>{" "}
            Moramba is headquartered in the United States. If you access or use
            the Services from outside of the United States, you do so at your
            own risk. Whether inside or outside of the United States, you are
            solely responsible for ensuring compliance with the laws of your
            specific jurisdiction. Software available in connection with the
            Services and the transmission of applicable data, if any, is subject
            to United States export controls. No Software may be downloaded from
            the Services or otherwise exported or re-exported in violation of
            U.S. export laws. Downloading, accessing or using the Software or
            Services is at your sole risk.
          </p>
          <p>
            [<b>Third-Party Distribution Channels:</b> Moramba offers Software
            that may be made available through the Apple App Store, the Google
            Play Store, or other distribution channels (“Distribution
            Channels”). If you obtain such Software through a Distribution
            Channel, you may be subject to additional terms of the Distribution
            Channel. These Terms of Service are between you and us only, and not
            with the Distribution Channel. To the extent that you utilize any
            other third-party products and services in connection with your use
            of the Services, you agree to comply with all applicable terms of
            any agreement for such third-party products and services.
          </p>
          <p>
            <b>Apple-Enabled Software:</b> With respect to Mobile Apps that are
            made available for your use in connection with an Apple-branded
            product (the “Apple-Enabled Software”), in addition to the other
            terms and conditions set forth in these Terms of Service, the
            following terms and conditions apply:
          </p>
        </div>
        <div className="px-4">
          <ul className="">
            <li className="liststyle">
              Moramba and you acknowledge that these Terms of Service are
              concluded between Moramba and you only, and not with Apple Inc.
              (“Apple”), and that as between Moramba and Apple, Moramba, not
              Apple, is solely responsible for the Apple-Enabled Software and
              the content thereof.
            </li>
            <li className="liststyle">
              You may not use the Apple-Enabled Software in any manner that is
              in violation of or inconsistent with the Usage Rules set forth for
              Apple-Enabled Software in, or otherwise be in conflict with, the
              Apple Media Services Terms and Conditions.
            </li>
            <li className="liststyle">
              Your license to use the Apple-Enabled Software is limited to a
              non-transferable license to use the Apple-Enabled Software on an
              iOS product that you own or control, as permitted by the “Usage
              Rules” set forth in the Apple Media Services Terms and Conditions,
              except that such Apple-Enabled Software may be accessed and used
              by other accounts associated with the purchaser via Apple’s Family
              Sharing or volume purchasing programs.
            </li>
            <li className="liststyle">
              Apple has no obligation whatsoever to provide any maintenance or
              support services with respect to the Apple-Enabled Software.
            </li>
            <li className="liststyle">
              Apple is not responsible for any product warranties, whether
              express or implied by law. In the event of any failure of the
              Apple-Enabled Software to conform to any applicable warranty, you
              may notify Apple, and Apple will refund the purchase price for the
              Apple-Enabled Software, if any, to you; and, to the maximum extent
              permitted by applicable law, Apple will have no other warranty
              obligation whatsoever with respect to the Apple-Enabled Software,
              or any other claims, losses, liabilities, damages, costs, or
              expenses attributable to any failure to conform to any warranty,
              which will be Moramba’s sole responsibility, to the extent it
              cannot be disclaimed under applicable law.
            </li>
            <li className="liststyle">
              Moramba and you acknowledge that Moramba, not Apple, is
              responsible for addressing any claims of you or any third party
              relating to the Apple-Enabled Software or your possession and/or
              use of that Apple-Enabled Software, including: (a) product
              liability claims; (b) any claim that the Apple-Enabled Software
              fails to conform to any applicable legal or regulatory
              requirement; and (c) claims arising under consumer protection,
              privacy, or similar legislation.
            </li>
            <li className="liststyle">
              In the event of any third-party claim that the Apple-Enabled
              Software or your possession and use of that Apple-Enabled Software
              infringes that third party’s intellectual property rights, as
              between Moramba and Apple, Moramba, not Apple, will be solely
              responsible for the investigation, defense, settlement, and
              discharge of any such intellectual property infringement claim.
            </li>
            <li className="liststyle">
              You represent and warrant that (a) you are not located in a
              country that is subject to a U.S. Government embargo, or that has
              been designated by the U.S. Government as a “terrorist supporting”
              country; and (b) you are not listed on any U.S. Government list of
              prohibited or restricted parties.
            </li>
            <li className="liststyle">
              If you have any questions, complaints, or claims with respect to
              the Apple-Enabled Software, they should be directed to Moramba as
              follows: support@moramba.com
            </li>
            <li className="liststyle">
              You must comply with applicable third-party terms of agreement
              when using the Apple-Enabled Software, e.g., your wireless data
              service agreement.
            </li>
            <li className="liststyle">
              Moramba and you acknowledge and agree that Apple, and Apple’s
              subsidiaries, are third-party beneficiaries of these Terms of
              Service with respect to the Apple-Enabled Software, and that, upon
              your acceptance of the terms and conditions of these Terms of
              Service, Apple will have the right (and will be deemed to have
              accepted the right) to enforce these Terms of Service against you
              with respect to the Apple-Enabled Software as a third-party
              beneficiary thereof.
            </li>
          </ul>
        </div>
        <h5>
          <u>Intellectual Property Rights</u>
        </h5>
        <div className="accessparastyle">
          <p>
            <b>Services Content:</b> You acknowledge and agree that the Services
            may contain content or features (“Services Content”) that are
            protected by copyright, patent, trademark, trade secret, or other
            proprietary rights and laws. Except as expressly authorized by
            Moramba, you agree not to modify, copy, frame, scrape, rent, lease,
            loan, sell, distribute, or create derivative works based on the
            Services or the Services Content, in whole or in part, except that
            the foregoing does not apply to your own User Content (as defined
            below) that you upload to or make available through the Services in
            accordance with these Terms of Service. Any use of the Services or
            the Services Content other than as specifically authorized in these
            Terms of Service is strictly prohibited.
          </p>
          <p>
            <b>Trademarks:</b> The Moramba name and logos are trademarks and
            service marks of Moramba (collectively the “Moramba Trademarks”).
            Other Moramba, product, and service names and logos used and
            displayed via the Services may be trademarks or service marks of
            their respective owners who may or may not endorse or be affiliated
            with or connected to Moramba. Nothing in these Terms of Service or
            the Services should be construed as granting, by implication,
            estoppel, or otherwise, any license or right to use any of Moramba
            Trademarks displayed on the Services, without our prior written
            permission in each instance. All goodwill generated from the use of
            Moramba Trademarks will inure to our exclusive benefit.
          </p>
          <p>
            <b>Third-Party Material:</b> Under no circumstances will Moramba be
            liable in any way for any content or materials of any third parties
            (including users), including for any errors or omissions in any
            content, or for any loss or damage of any kind incurred as a result
            of the use of any such content. You acknowledge that Moramba does
            not pre-screen content, but that Moramba and its designees will have
            the right (but not the obligation) in their sole discretion to
            refuse or remove any content that is available via the Services.
            Without limiting the foregoing, Moramba and its designees will have
            the right to remove any content that violates these Terms of Service
            or is deemed by Moramba, in its sole discretion, to be otherwise
            objectionable. You agree that you must evaluate, and bear all risks
            associated with, the use of any content, including any reliance on
            the accuracy, completeness, or usefulness of such content.
          </p>
          <p>
            <b>User Content:</b> You represent and warrant that you own all
            right, title and interest in and to such User Content, including all
            copyrights and rights of publicity contained therein. You hereby
            grant Moramba and its affiliates, successors and assigns a
            non-exclusive, worldwide, royalty-free, fully paid-up, transferable,
            sublicensable (directly and indirectly through multiple tiers),
            perpetual, and irrevocable license to copy, display, upload,
            perform, distribute, store, modify, and otherwise use your User
            Content in connection with the operation of the Services and the
            promotion, advertising or marketing of the foregoing in any form,
            medium or technology now known or later developed. You assume all
            risk associated with your User Content and the transmission of your
            User Content, and you have sole responsibility for the accuracy,
            quality, legality and appropriateness of your User Content.
          </p>
        </div>
        <p>
          You hereby authorize Moramba and its third-party service providers to
          derive statistical and usage data relating to your use of the Services
          (“Usage Data”). We may use Usage Data for any purpose in accordance
          with applicable law and our Privacy Policy.
        </p>
        <p>
          Any questions, comments, suggestions, ideas, feedback, reviews, or
          other information about the Services (“Submissions”), provided by you
          to Moramba are non-confidential and Moramba will be entitled to the
          unrestricted use and dissemination of these Submissions for any
          purpose, commercial or otherwise, without acknowledgment, attribution,
          or compensation to you.{" "}
        </p>
        <p>
          You acknowledge and agree that Moramba may preserve User Content and
          may also disclose User Content if required to do so by law or in the
          good faith belief that such preservation or disclosure is reasonably
          necessary to: (a) comply with legal process, applicable laws, or
          government requests; (b) enforce these Terms of Service; (c) respond
          to claims that any content violates the rights of third parties; or
          (d) protect the rights, property, or personal safety of Moramba, its
          users, or the public. You understand that the technical processing and
          transmission of the Services, including your User Content, may involve
          (i) transmissions over various networks; and (ii) changes to conform
          and adapt to technical requirements of connecting networks or devices.
        </p>
        <h5>
          <u>Third-Party Services and Websites </u>
        </h5>
        <p className="mt-3">
          The Services may provide links or other access to services, sites,
          technology, and resources that are provided or otherwise made
          available by third parties (the “Third-Party Services”). Additionally,
          you may enable or log in to the Services via various online
          Third-Party Services, such as social media and social networking
          services like LinkedIn, Twitter, and other third-party platforms. Your
          access and use of the Third-Party Services may also be subject to
          additional terms and conditions, privacy policies, or other agreements
          with such third party, and you may be required to authenticate to or
          create separate accounts to use Third-Party Services on the websites
          or via the technology platforms of their respective providers. Some
          Third-Party Services will provide us with access to certain
          information that you have provided to third parties, including through
          such Third-Party Services, and we will use, store and disclose such
          information in accordance with our Privacy Policy. For more
          information about the implications of activating Third-Party Services
          and our use, storage and disclosure of information related to you and
          your use of such Third-Party Services within the Services, please see
          our Privacy Policy. Moramba has no control over and is not responsible
          for such Third-Party Services, including for the accuracy,
          availability, reliability, or completeness of information shared by or
          available through Third-Party Services, or on the privacy practices of
          Third-Party Services. We encourage you to review the privacy policies
          of the third parties providing Third-Party Services prior to using
          such services. You, and not Moramba, will be responsible for any and
          all costs and charges associated with your use of any Third-Party
          Services. Moramba enables these Third-Party Services merely as a
          convenience and the integration or inclusion of such Third-Party
          Services does not imply an endorsement or recommendation. Any dealings
          you have with third parties while using the Services are between you
          and the third party. Moramba will not be responsible or liable,
          directly or indirectly, for any damage or loss caused or alleged to be
          caused by or in connection with use of or reliance on any Third-Party
          Services.
        </p>
        <h5>
          <u>Indemnification</u>
        </h5>
        <p className="mt-3">
          To the extent permitted under applicable law, you agree to defend,
          indemnify, and hold harmless Moramba, its affiliates, and its and
          their respective officers, employees, directors, service providers,
          licensors, representatives, and agents (collectively, the “Moramba
          Parties”) from any and all losses, damages, expenses, including
          reasonable attorneys’ fees, rights, claims, actions of any kind, and
          injury (including death) arising out of or relating to your use of the
          Services, any User Content, your connection to the Services, your
          violation of these Terms of Service, or your violation of any rights
          of another. Moramba will provide notice to you of any such claim,
          suit, or proceeding. Moramba reserves the right to assume the
          exclusive defense and control of any matter which is subject to
          indemnification under this section, and you agree to cooperate with
          any reasonable requests assisting Moramba’s defense of such matter.
          You may not settle or compromise any claim against the Moramba Parties
          without Moramba’s written consent.
        </p>
        <h5>
          <u>Disclaimer of Warranties</u>
        </h5>
        <p className="mt-3">
          YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE
          PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. MORAMBA EXPRESSLY
          DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR
          STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>
        <p>
          MORAMBA MAKEs NO WARRANTY THAT (A) THE SERVICES WILL MEET YOUR
          REQUIREMENTS; (B) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE,
          OR ERROR-FREE; (C) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF
          THE SERVICES WILL BE ACCURATE OR RELIABLE; (D) THE QUALITY OF ANY
          PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR
          OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS, OR
          (E) THE ASSETS PRICE DATA PROVIDED ON THE SITE IS FREE OF INACCURACY,
          DEFECT, OR OMISSION.
        </p>
        <h5>
          <u>Limitation of Liability</u>
        </h5>
        <p className="mt-3">
          YOU EXPRESSLY UNDERSTAND AND AGREE THAT MORAMBA WILL NOT BE LIABLE FOR
          ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES,
          OR DAMAGES FOR LOSS OF PROFITS INCLUDING DAMAGES FOR LOSS OF GOODWILL,
          USE, OR DATA OR OTHER INTANGIBLE LOSSES (EVEN IF MORAMBA HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON
          CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, RESULTING
          FROM: (A) THE USE OR THE INABILITY TO USE THE SERVICES; (B) THE COST
          OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY
          GOODS, DATA, INFORMATION, OR SERVICES PURCHASED OR OBTAINED OR
          MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE
          SERVICES; (C) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR
          TRANSMISSIONS OR DATA; (D) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON
          THE SERVICES; OR (E) ANY OTHER MATTER RELATING TO THE SERVICES. IN NO
          EVENT WILL MORAMBA’S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES,
          OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID MORAMBA IN THE
          LAST THREE (3) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE CLAIM, OR,
          IF GREATER, ONE HUNDRED DOLLARS ($100).
        </p>
        <p>
          SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OR EXCLUSION OF CERTAIN
          WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL
          OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS
          SET FORTH ABOVE MAY NOT APPLY TO YOU OR BE ENFORCEABLE WITH RESPECT TO
          YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICES OR WITH
          THESE TERMS OF SERVICE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO
          DISCONTINUE USE OF THE SERVICES.
        </p>
        <p>
          IF YOU ARE A USER FROM NEW JERSEY, THE FOREGOING SECTIONS TITLED
          “INDEMNIFICATION”, “DISCLAIMER OF WARRANTIES” AND “LIMITATION OF
          LIABILITY” ARE INTENDED TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE
          LAWS OF THE STATE OF NEW JERSEY. IF ANY PORTION OF THESE SECTIONS IS
          HELD TO BE INVALID UNDER THE LAWS OF THE STATE OF NEW JERSEY, THE
          INVALIDITY OF SUCH PORTION WILL NOT AFFECT THE VALIDITY OF THE
          REMAINING PORTIONS OF THE APPLICABLE SECTIONS.
        </p>
        <h5>
          <u>Dispute Resolution By Binding Arbitration</u>
        </h5>
        <h5 className="mt-3">
          PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS.
        </h5>
        <div className="mt-3">
          <h5 className="mx-5">a. &nbsp;&nbsp;Agreement to Arbitrate</h5>
          <p>
            This Dispute Resolution by Binding Arbitration section is referred
            to in these Terms of Service as the “Arbitration Agreement.” You
            agree that any and all disputes or claims that have arisen or may
            arise between you and Moramba, whether arising out of or relating to
            these Terms of Service (including any alleged breach thereof), the
            Services, any advertising, or any aspect of the relationship or
            transactions between us, will be resolved exclusively through final
            and binding arbitration, rather than a court, in accordance with the
            terms of this Arbitration Agreement, except that you may assert
            individual claims in small claims court, if your claims qualify.
            Further, this Arbitration Agreement does not preclude you from
            bringing issues to the attention of federal, state, or local
            agencies, and such agencies can, if the law allows, seek relief
            against us on your behalf. You agree that, by entering into these
            Terms of Service, you and Moramba are each waiving the right to a
            trial by jury or to participate in a class action. Your rights will
            be determined by a neutral arbitrator, not a judge or jury. The
            Federal Arbitration Act governs the interpretation and enforcement
            of this Arbitration Agreement.
          </p>
          <h5 className="mx-5">
            b. &nbsp;&nbsp;Prohibition of Class and Representative Actions and
            Non-Individualized Relief
          </h5>
          <p className="termsparastyle">
            <b>
              YOU AND MORAMBA AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE
              OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS
              MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR
              PROCEEDING. UNLESS BOTH YOU AND MORAMBA AGREE OTHERWISE, THE
              ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR
              PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A
              CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE
              ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND
              DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING
              RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF
              NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIM(S), EXCEPT THAT YOU
              MAY PURSUE A CLAIM FOR AND THE ARBITRATOR MAY AWARD PUBLIC
              INJUNCTIVE RELIEF UNDER APPLICABLE LAW TO THE EXTENT REQUIRED FOR
              THE ENFORCEABILITY OF THIS PROVISION.
            </b>{" "}
          </p>
          <h5 className="mx-5">
            c. &nbsp;&nbsp;Pre-Arbitration Dispute Resolution
          </h5>
          <p>
            Moramba is always interested in resolving disputes amicably and
            efficiently, and most customer concerns can be resolved quickly and
            to the customer’s satisfaction by emailing customer support at
            [support@moramba.com]. If such efforts prove unsuccessful, a party
            who intends to seek arbitration must first send to the other, by
            certified mail, a written Notice of Dispute (“Notice”). The Notice
            to Moramba should be sent to 8 The Green STE A Dover, DE 19901
            (“Notice Address”). The Notice must (i) describe the nature and
            basis of the claim or dispute and (ii) set forth the specific relief
            sought. If Moramba and you do not resolve the claim within sixty
            (60) calendar days after the Notice is received, you or Moramba may
            commence an arbitration proceeding. During the arbitration, the
            amount of any settlement offer made by Moramba or you will not be
            disclosed to the arbitrator until after the arbitrator determines
            the amount, if any, to which you or Moramba is entitled.
          </p>
          <h5 className="mx-5">d. &nbsp;&nbsp;Arbitration Procedures</h5>
          <p>
            Arbitration will be conducted by a neutral arbitrator in accordance
            with the American Arbitration Association’s (“AAA”) rules and
            procedures, including the AAA’s Consumer Arbitration Rules
            (collectively, the “AAA Rules”), as modified by this Arbitration
            Agreement. For information on the AAA, please visit its website,
            https://www.adr.org. Information about the AAA Rules and fees for
            consumer disputes can be found at the AAA’s consumer arbitration
            page,{" "}
            <Link
              to={"https://www.adr.org/consumer"}
              target="_blank"
              className="privacylinkstyle"
            >
              https://www.adr.org/consumer.
            </Link>{" "}
            If there is any inconsistency between any term of the AAA Rules and
            any term of this Arbitration Agreement, the applicable terms of this
            Arbitration Agreement will control unless the arbitrator determines
            that the application of the inconsistent Arbitration Agreement terms
            would not result in a fundamentally fair arbitration. The arbitrator
            must also follow the provisions of these Terms of Service as a court
            would. All issues are for the arbitrator to decide, including issues
            relating to the scope, enforceability, and arbitrability of this
            Arbitration Agreement. Although arbitration proceedings are usually
            simpler and more streamlined than trials and other judicial
            proceedings, the arbitrator can award the same damages and relief on
            an individual basis that a court can award to an individual under
            these Terms of Service and applicable law. Decisions by the
            arbitrator are enforceable in court and may be overturned by a court
            only for very limited reasons.
          </p>
          <p>
            Unless Moramba and you agree otherwise, any arbitration hearings
            will take place in a reasonably convenient location for both parties
            with due consideration of their ability to travel and other
            pertinent circumstances. If the parties are unable to agree on a
            location, the determination will be made by AAA. If your claim is
            for $10,000 or less, Moramba agrees that you may choose whether the
            arbitration will be conducted solely on the basis of documents
            submitted to the arbitrator, through a telephonic hearing, or by an
            in-person hearing as established by the AAA Rules. If your claim
            exceeds $10,000, the right to a hearing will be determined by the
            AAA Rules. Regardless of the manner in which the arbitration is
            conducted, the arbitrator will issue a reasoned written decision
            sufficient to explain the essential findings and conclusions on
            which the award is based.
          </p>
          <h5 className="mx-5">e. &nbsp;&nbsp;Costs of Arbitration</h5>
          <p>
            Payment of all filing, administration, and arbitrator fees
            (collectively, the “Arbitration Fees”) will be governed by the AAA
            Rules, unless otherwise provided in this Arbitration Agreement. To
            the extent any Arbitration Fees are not specifically allocated to
            either Moramba or you under the AAA Rules, Moramba and you will
            split them equally; provided that if you are able to demonstrate to
            the arbitrator that you are economically unable to pay your portion
            of such Arbitration Fees or if the arbitrator otherwise determines
            for any reason that you should not be required to pay your portion
            of any Arbitration Fees, Moramba will pay your portion of such fees.
            In addition, if you demonstrate to the arbitrator that the costs of
            arbitration will be prohibitive as compared to the costs of
            litigation, Moramba will pay as much of the Arbitration Fees as the
            arbitrator deems necessary to prevent the arbitration from being
            cost-prohibitive. Any payment of attorneys’ fees will be governed by
            the AAA Rules.
          </p>
          <h5 className="mx-5">f. &nbsp;&nbsp;Confidentiality</h5>
          <p>
            All aspects of the arbitration proceeding, and any ruling, decision,
            or award by the arbitrator, will be strictly confidential for the
            benefit of all parties.
          </p>
          <h5 className="mx-5">g. &nbsp;&nbsp;Severability</h5>
          <p>
            If a court or the arbitrator decides that any term or provision of
            this Arbitration Agreement (other than the subsection (b) above
            titled “Prohibition of Class and Representative Actions and
            Non-Individualized Relief” above) is invalid or unenforceable, the
            parties agree to replace such term or provision with a term or
            provision that is valid and enforceable and that comes closest to
            expressing the intention of the invalid or unenforceable term or
            provision, and this Arbitration Agreement will be enforceable as so
            modified. If a court or the arbitrator decides that any of the
            provisions of subsection (b) above titled “Prohibition of Class and
            Representative Actions and Non-Individualized Relief” are invalid or
            unenforceable, then the entirety of this Arbitration Agreement will
            be null and void, unless such provisions are deemed to be invalid or
            unenforceable solely with respect to claims for public injunctive
            relief. The remainder of these Terms of Service will continue to
            apply.
          </p>
          <h5 className="mx-5">
            h. &nbsp;&nbsp;Future Changes to Arbitration Agreement
          </h5>
          <p>
            Notwithstanding any provision in these Terms of Service to the
            contrary, Moramba agrees that if it makes any future change to this
            Arbitration Agreement (other than a change to the Notice Address)
            while you are a user of the Services, you may reject any such change
            by sending Moramba written notice within thirty (30) calendar days
            of the change to the Notice Address provided above. By rejecting any
            future change, you are agreeing that you will arbitrate any dispute
            between us in accordance with the language of this Arbitration
            Agreement as of the date you first accepted these Terms of Service
            (or accepted any subsequent changes to these Terms of Service).
          </p>
          <h5>
            <u>Termination</u>
          </h5>
          <p className="mt-3">
            You agree that Moramba, in its sole discretion, may suspend or
            terminate your account (or any part thereof) or use of the Services
            and remove and discard any content within the Services, for any
            reason, including for lack of use or if Moramba believes that you
            have violated or acted inconsistently with the letter or spirit of
            these Terms of Service. Any suspected fraudulent, abusive, or
            illegal activity that may be grounds for termination of your use of
            the Services, may be referred to appropriate law enforcement
            authorities. Moramba may also in its sole discretion and at any time
            discontinue providing the Services, or any parts thereof, with or
            without notice. You agree that any termination of your access to the
            Services under any provision of these Terms of Service may be
            effected without prior notice, and acknowledge and agree that
            Moramba may immediately deactivate or delete your account and all
            related information and files in your account and/or bar any further
            access to such files or the Services. Further, you agree that
            Moramba will not be liable to you or any third party for any
            termination of your access to the Services.
          </p>
          <p>
            If we take any of the actions described in this Termination Section,
            you will continue to be responsible for repaying any outstanding
            loan balance you have pursuant to the terms of the Loan Agreement.
          </p>
          <h5>
            <u>User Disputes</u>
          </h5>
          <p className="mt-3">
            You agree that you are solely responsible for your interactions with
            any other user in connection with the Services, and Moramba will
            have no liability or responsibility with respect thereto. Moramba
            reserves the right, but has no obligation, to become involved in any
            way with disputes between you and any other user of the Services.
          </p>
          <h5>
            <u>General</u>
          </h5>
          <p className="mt-3">
            These Terms of Service (together with the terms incorporated by
            reference herein) constitute the entire agreement between you and
            Moramba governing your access and use of the Services, and supersede
            any prior agreements between you and Moramba with respect to the
            Services. You also may be subject to additional terms and conditions
            that may apply when you use Third-Party Services, third-party
            content or third-party software. These Terms of Service will be
            governed by the laws of the State of New York without regard to its
            conflict of law provisions. With respect to any disputes or claims
            not subject to arbitration, as set forth above, you and Moramba
            submit to the personal and exclusive jurisdiction of the state and
            federal courts located within New York County, New York. The failure
            of Moramba to exercise or enforce any right or provision of these
            Terms of Service will not constitute a waiver of such right or
            provision. If any provision of these Terms of Service is found by a
            court of competent jurisdiction to be invalid, the parties
            nevertheless agree that the court should endeavor to give effect to
            the parties’ intentions as reflected in the provision, and the other
            provisions of these Terms of Service remain in full force and
            effect. You agree that regardless of any statute or law to the
            contrary, any claim or cause of action arising out of or related to
            use of the Services or these Terms of Service must be filed within
            one (1) year after such claim or cause of action arose or be forever
            barred. A printed version of these Terms of Service and of any
            notice given in electronic form will be admissible in judicial or
            administrative proceedings based upon or relating to these Terms of
            Service to the same extent and subject to the same conditions as
            other business documents and records originally generated and
            maintained in printed form. You may not assign these Terms of
            Service without the prior written consent of Moramba, but Moramba
            may assign or transfer these Terms of Service, in whole or in part,
            without restriction. The section titles in these Terms of Service
            are for convenience only and have no legal or contractual effect. As
            used in these Terms of Service, the words “include” and “including,”
            and variations thereof, will not be deemed to be terms of
            limitation, but rather will be deemed to be followed by the words
            “without limitation.” Notices to you may be made via either email or
            regular mail. The Services may also provide notices to you of
            changes to these Terms of Service or other matters by displaying
            notices or links to notices generally on the Services. Moramba will
            not be in default hereunder by reason of any failure or delay in the
            performance of its obligations where such failure or delay is due to
            civil disturbances, riot, epidemic, hostilities, war, terrorist
            attack, embargo, natural disaster, acts of God, flood, fire,
            sabotage, fluctuations or unavailability of electrical power,
            network access or equipment, or any other circumstances or causes
            beyond Moramba’s reasonable control.
          </p>
          <h5>
            <u>Notice for California Users</u>
          </h5>
          <p>
            Under California Civil Code Section 1789.3, users of the Services
            from California are entitled to the following specific consumer
            rights notice: The Complaint Assistance Unit of the Division of
            Consumer Services of the California Department of Consumer Affairs
            may be contacted (a) via email at{" "}
            <Link
              to={"mailto:dca@dca.ca.gov"}
              target=""
              className="privacylinkstyle"
            >
              dca@dca.ca.gov
            </Link>
            ; (b) in writing at: Department of Consumer Affairs, Consumer
            Information Division, 1625 North Market Blvd., Suite N 112,
            Sacramento, CA 95834; or (c) by telephone at (800) 952-5210 or (800)
            326-2297 (TDD). Sacramento-area consumers may call (916) 445-1254 or
            (916) 928-1227 (TDD). You may contact us at Moramba].
          </p>
          <h5>
            <u>Questions, Concerns, Suggestions?</u>
          </h5>
          <p>
            Please contact us at [
            <Link
              className="termsparastyle privacylinkstyle"
              to={"mailto:support@moramba.com"}
              target=""
            >
              support@moramba.com
            </Link>
            ] to report any violations of these Terms of Service or to pose any
            questions regarding these Terms of Service or the Services.
          </p>
        </div>
      </div>
      <br />
      <br />
      <GoToTop />
    </>
  );
}

export default TermsofServices;
