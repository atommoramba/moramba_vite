import  { useMemo, useState } from "react";
import "../FAQ/FAQ.css";
import { FiChevronDown } from "react-icons/fi";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../Header/Header";
import FilterComponent from "../../utils/FilterComponent";
import * as Accordion from "@radix-ui/react-accordion";

const FaqContent = [
  {
    title: "How do I use moramba?",
    desc: `With Moramba, you can manage your business in the simplest way possible. It’s an easy-to-use employee management system with support for employees’ attendance, work-shift records, payment records,and salary slips. To know more, click on this link: www.Moramba.Com, click to sign up, create your account, and sign in.`,
    expand: "1",
  },
  {
    title: "How can I sign up for Moramba?",
    desc: `Signing up for Moramba is easy. All you need is your mobile number, name, email, and password. Select your country and click to sign up. This will create your Moramba account.`,
    expand: "2",
  },
  {
    title: "How do you confirm your email address after signing up?",
    desc: `You’ll receive an email from tech@moramba.io with confirmation instructions and a link to verify your email. Then click verify your email to complete the verification process.`,
    expand: "3",
  },
  {
    title: "How do I reset my password?",
    desc: `On the login screen, select Forgot your password. Type the email address you used to register with Moramba, then hit ‘send’.`,
    expand: "4",
  },
  {
    title: "How do I get started?",
    desc: ` Once your account is set up, you can start using the platform right away. You can explore the different features and services available and start using them to your advantage.`,
    expand: "5",
  },
  {
    title:"I am waiting for the OTP, but I have not received it for more than 5 minutes. What should I do?",
    desc: "While using Moramba, the OTP is sent instantaneously. Sometimes there may be temporary problems, either on our servers or in delivery through SMS or email. We suggest you wait a few more minutes or try again.",
    expand: "6",
  },
  {
    title: "How do I change the language?",
    desc: `To change the language, first sign up for your account. On the Company page, you will find a language selection.`,
    expand: "7",
  },
  {
    title: "How do I create a company?",
    desc: `Company creation is very easy. You just need a name for the company and some basic details about the company to create it.`,
    expand: "8",
  },
  {
    title: "Can I create multiple companies?",
    desc: `Yes, you can create multiple companies.`,
    expand: "9",
  },
  {
    title: "How do I manage bank and wallet details??",
    desc: `The wallet and bank detail management is very easy. You have to click the wallet button on the dashboard, and there are two options for bank and wallet in which you can add the details.`,
    expand: "10",
  },
  {
    title: "How do I create a crypto wallet?",
    desc: `To create a crypto wallet account, go to the dashboard and go to wallet. Create a crypto wallet.`,
    expand: "11",
  },
  {
    title: "How do I create a bank account?",
    desc: `To create a bank account, go to the dashboard, go to wallet, click on create bank account, and fill in all required details.`,
    expand: "12",
  },
  {
    title: "How do I Update Company details?",
    desc: `To update your Company details, go to the Profile page and make the necessary changes.`,
    expand: "13",
  },
  {
    title: "How do I upgrade my account?",
    desc: `To upgrade from the free plan, on the pricing page, you can see the features for each plan. Choose and Click on the plan you want.`,
    expand: "14",
  },
  {
    title: "How can I add a document?",
    desc: `Go to your profile. Click on the company document view button, click on the upload file button, choose a file, and click on the save button to upload.`,
    expand: "15",
  },
  {
    title: "How do I add an employee?",
    desc: `Once you create a company, you will find the option to add employees on the dashboard.`,
    expand: "16",
  },
  {
    title: "How can I change the employee designation type?",
    desc: `Go to employee view and click on the edit button for the designation type.`,
    expand: "17",
  },
  {
    title: "What is the difference between biweekly and bimonthly payroll?",
    desc: `Bi-weekly payroll processing is the most common way that businesses pay employees. Example: direct deposit on every other Friday for a month. Bi-monthly works excellent for companies that pay commissions regularly and those that tend to have a lag in funds from a vendor or bureaucratic organization. Example: direct deposit on the 1st or 15th of every month. This processing frequently occurs 24 times a year.`,
    expand: "18",
  },
  {
    title: "Is my data safe on Moramba?",
    desc: `All your data on Moramba is 100% safe and encrypted with a password. Only you can access your data.`,
    expand: "19",
  },
  {
    title: "Can an employee login from any location?",
    desc: `Yes, the employee can access it from any location until and unless he is active.`,
    expand: "20",
  },
  {
    title: "Can we Give invoices To The Customers?",
    desc: `Yes, the customer has to be added first with some basic details; after that, you can give the invoice to the customer.`,
    expand: "21",
  },
  {
    title: "How can I download an invoice or bill report?",
    desc: `From the employee dashboard screen, click on the invoice button to view the invoice or bill report. From here, you can download the invoice/bill.`,
    expand: "22",
  },
  {
    title: "How do I send an invoice to my customer?",
    desc: `Include your business details. Select template (including invoice ID, add issue date, and add due date). Select your customer from the drop-down lists. Select the bank, select the currency, add item details and the tax amount, and save.`,
    expand: "23",
  },
  {
    title: "Can we mark many employees attendance at the same time?",
    desc: `Yes, the admin can add the attendance of more than one employee from attendance on dashboard.`,
    expand: "24",
  },
  {
    title: "Can we give bonus to employees?",
    desc: `Yes, the admin can give bonus to the employees.`,
    expand: "25",
  },
  {
    title: "Mention what are the employer-paid benefits are?",
    desc: `Employer-paid benefits include shift/break employee document/company document invoice (default template, create template), bill (default template, create template), vendor create customer, expense (default template, create template), inventory (default template, create template), software subscription (default template, create template), loan appraisal, and monthly payment remaining.`,
    expand: "26",
  },
  {
    title: "How do I create a new customer?",
    desc: `Click on company features, select the optioncustomer, and add details about your customer.`,
    expand: "27",
  },
  {
    title: "Can I edit vendor and customer details?",
    desc: `Yes, on the customer list page, there is an edit button option to edit details.`,
    expand: "28",
  },
  {
    title: "How do I make a custom invoice template?",
    desc: `Using the create template option, you can create a custom invoice template. You can find this in company features under manage template.`,
    expand: "29",
  },
  {
    title: "How do I make a custom Bill template?",
    desc: `While creating a bill, there is an option to create a template. Using the create template option, you can create a custom bill template.`,
    expand: "30",
  },
  {
    title: "How do I make a Salary Breakup template?",
    desc: `Click on company features, select the option Salary Breakup Template, and select any from the mandatory list. Create a new template.`,
    expand: "31",
  },
  {
    title: "How do I add a public holiday?",
    desc: `There is an option in the company feature calledholiday. You can click it and add the holiday (note: only admins of the company can add or edit the holiday list).`,
    expand: "32",
  },
  {
    title: "How do I view the public holiday list?",
    desc: "Go to employee attendance view and click on the public holiday button.",
    expand: "33",
  },
  {
    title: "What are the four main company benefits?",
    desc: "The four main benefits are: personal insurance,business insurance,food benefits, and travel benefits.",
    expand: "34",
  },
  {
    title: "Can we delete employees permanently?",
    desc: `No, we can soft delete using the Deactivate button.`,
    expand: "35",
  },
  {
    title: "How can I view my leave balance?",
    desc: `On the employee details page, vacation days left are available.`,
    expand: "36",
  },
  {
    title: "How do I start my shift?",
    desc: `Here is how you can start your shift:
      Navigate to the employee dashboard. The start-shift button appears. 
      Click to start the shift.`,
    expand: "37",
  },
  {
    title: "How do I start a break?",
    desc: `Here is how you can start a break:
      Navigate to the employee dashboard. The start-break button appears. 
      Click to start the break.`,
    expand: "38",
  },
  {
    title: "Can I add multiple breaks to a shift?",
    desc: `Yes, you can have multiple breaks during a shift.`,
    expand: "39",
  },
  {
    title: "Where do I see my Attendance details?",
    desc: `Go to Employee View, click on the employee features, and select the option Attendance Single.`,
    expand: "40",
  },
  {
    title: "How do We mark vacation?",
    desc: `Go to Employee View, click on the employee features dropdown, and select the attendance single option. Click on Mark Vacation to apply for a vacation.`,
    expand: "41",
  },
  {
    title: "How do I cancel approved leave?",
    desc: `Right now, we don’t have that feature.`,
    expand: "42",
  },
  {
    title: "How do I approve my team members leave applications?",
    desc: `Go to the employee features menu and select the option Approval Request.`,
    expand: "43",
  },
  {
    title: "Where can I view my salary details?",
    desc: `Go to Employee View, click on the employee features, and select the option Salary Detail.`,
    expand: "44",
  },
  {
    title: "Where can I see all the company-provided benefits?",
    desc: `Click on company features and Select the option Available benefits. Here you can see all the available benefits.`,
    expand: "45",
  },
  {
    title: "Is there any extra benefits for employees?",
    desc: `Yes, There Are Many Banefits Which Can Be Given To The Employee By The Company.`,
    expand: "46",
  },
  {
    title: "Do companies offer health insurance?",
    desc: `Yes, Company do offer health insurance, term life, etc.`,
    expand: "47",
  },
  {
    title:
      "How do I get notified when one of my team members applies for leave?",
    desc: `Right Now, the application is not supporting leave notification.`,
    expand: "48",
  },
  {
    title: "How do I add or download documents??",
    desc: `There Is An Option In Employee Feature Called Employee Document The Employee Can Add Their Docuement On That And Also Can Download Company Document Fro There Also The Company Document Only Can Be Uploaded By The Admin Of The Company.`,
    expand: "49",
  },
  {
    title: "How do I apply for a loan?",
    desc: `Applying For Loan Is Very Easy You Have To Click Employee Features And Then Click Loan Button And You Have To Just Fill Some Details And Then You Can Apply For A Loan.`,
    expand: "50",
  },
  {
    title: "How do I check my loan pending request?",
    desc: `You can view pending loan requests from the employee dashboard.`,
    expand: "51",
  },
  {
    title: "How do I view loan transactions?",
    desc: `You can view loan transactions from the employee Loan dashboard.`,
    expand: "52",
  },
  {
    title: "Who approves the expense report?",
    desc: `An employee's admin can approve an expense request.`,
    expand: "53",
  },
  {
    title: "What should be included in an expense report?",
    desc: `Firstly, select the expense template, add the expense file name and expense report date, then click to add the expense item and save the details.`,
    expand: "54",
  },
  {
    title: "What should be included in an Inventory report?",
    desc: `Firstly, select the Inventory template, add the inventory file name and inventory report date, then click to add the inventory data and save the details.`,
    expand: "55",
  },
  {
    title: "What should be included in a subscription report?",
    desc: `Firstly, select the subscription template, add the subscription file name and subscription report date, then click to add the subscription data and save the details.`,
    expand: "56",
  },
  {
    title: "How do I add an inventory report?",
    desc: `There is an option called Report, in employee features in which there is an inventory report, and in that you can add the inventory report of the company.`,
    expand: "57",
  },
  {
    title: "What is a timesheet, and is there any approval needed?",
    desc: `A timesheet is a form that employers use to track their employees’ time during each pay period. Timesheets are used to record time spent on tasks, projects, and clients, and yes, we need approval for a time sheet.`,
    expand: "58",
  },
  {
    title: "Who is responsible for timesheets?",
    desc: `Employees need to fill out details based on the assigned project.`,
    expand: "59",
  },
  {
    title: "Where can we see the employee requests?",
    desc: `You can see the employee requests on the approval request page, which is in the employee feature.`,
    expand: "60",
  },
  {
    title: "Who can approve the employee appraisal?",
    desc: `An employee manager can approve an appraisal.`,
    expand: "61",
  },
  {
    title: "Will staff have access to appraisal ratings?",
    desc: `No, only the employee and the approver can see the ratings.`,
    expand: "62",
  },
  {
    title:"Who reviews and approves performance ratings once they are submitted?",
    desc: `The distribution of performance ratings will be reviewed by the appropriate manager regarding their performance ratings.`,
    expand: "63",
  },
  {
    title: "How do I add an appraisal rating range?",
    desc: `Go to employee view, click on the employee features dropdown, and select appraisal. Click to select self-appraisal or appraisal of a team member. Enter the appropriate details and submit.`,
    expand: "64",
  },
  {
    title: "How can I get the TDS summary report? ",
    desc: `You can find TDS summary reports on the request and approval page.`,
    expand: "65",
  },
];


const Faq = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = FaqContent?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        PlaceHolder="Search Here"
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div>
      <Header />
      <div id="homepage">
        <div className=" p-60">
          <h5 className="text-center fadhead ">FAQs</h5>
          <h3 className="text-center mt-1">
            "Answers to Common Questions: Find Quick Solutions Here!"
          </h3>
          <div className="d-flex flex-row justify-content-center mt-3">
            <div
              className="d-flex flex-row align-items-center Searchbarfaq me-3"
              id="mobilesearch"
            >
              <SearchIcon />
              {subHeaderComponent}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="faqbox">
            <div className="col-lg-9 col-md-9 col-sm-8">
              <div className="space-y-30">
                {/* <Accordion className="ff" allowZeroExpanded>
                  {filteredItems.map((item, i) => (
                    <AccordionItem
                      className="accordion mt-4 mb-2"
                      key={i}
                      uuid={item.expand}
                    >
                      <AccordionItemHeading className="accordion-header p-0">
                        <AccordionItemButton>
                          <button
                            className="accordionbutton"
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              paddingInline: "25px",
                              marginTop: "15px",
                            }}
                          >
                            {item.title} <FiChevronDown className="plus-btn" />
                          </button>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p className="accordion-desc txtCWsize">{item.desc}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion> */}
                <Accordion.Root type="multiple" className="ff">
                  {filteredItems.map((item, i) => (
                    <Accordion.Item
                      key={i}
                      value={item.expand}
                      className="accordion mt-4 mb-2"
                    >
                      <Accordion.Header className="accordion-header p-0">
                        <Accordion.Trigger className="accordionbutton flex items-center justify-between w-full px-6 py-3 mt-4 bg-white text-black">
                          {item.title} <FiChevronDown className="plus-btn" />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="p-4 border border-gray-300">
                        <p className="accordion-desc txtCWsize">{item.desc}</p>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
