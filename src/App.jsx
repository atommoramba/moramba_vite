import './App.css'
import { Route, Routes } from 'react-router-dom'
import HdWallet from './component/HdWallet/HdWallet'
import HomePageGuard from './component/HomePageGuard/HomePageGuard'
import RegisterV3 from './component/LoginRegister/Register'
import LoginV3 from './component/LoginRegister/Login'
import ForgotPassword from './component/ForgotPasswordPage/ForgotPassword'
import PrivacyPolicy from './component/TermsandPrivacyPolicy/PrivacyPolicy'
import TermsofServices from './component/TermsandPrivacyPolicy/TermsofServices'
import ConsumerPrivacy from './component/TermsandPrivacyPolicy/ConsumerPrivacy'
import Helppage from './component/LoginRegister/Helppage'
import AdminLogin from './component/AdminPanel/AdminLogin'
import AdminDashboard from './component/AdminPanel/AdminDashboard'
import ErrorPage from './component/ErrorPage/ErrorPage'
import Faq from './component/FAQ/FAQ'
import PlanDetails from './component/PlanPage/PlanDetails'
import VerifyPage from './component/LoginRegister/VerifyPage'
import GuardedRoutes from './AuthGuard'
import SelectCompany from './component/SelectCompany/SelectCompany'
import CompanyProfile from './component/CompanyProfile/CompanyProfile'
import Dashboard from './component/Dashboard/Dashboard'
import EmployeeDetail from './component/Employee Profile/EmployeeDetail'
import CreateInventoryTemplate from './component/InventoryTemplate/CreateInventoryTemplate'
import CreateSubscriptionTemplate from './component/SubscriptionTemplate/CreateSubscriptionTemplate'
import CreateExpenseTemplate from './component/ExpenseTemplate/CreateExpenseTemplate'
import CreateSalaryBreakup from './component/CreateSalaryBreakup/CreateSalaryBreakup'
import SalaryBreakupList from './component/ViewSalaryBreakup/SalaryBreakupList'
import WalletPortal from './component/WalletPortal/WalletPortal'
import PayrollSheet from './component/PayrollSheet/PayrollSheet'
import RegisterComp from './component/RegisterComp/RegisterComp'
import FullAttedance from './component/Attendance/FullAttedance'
import AttendanceSingle from './component/AttendanceSingle/AttendanceSingle'
import CompanyAllBenefits from './component/Benefits/CompanyAllBenefits'
import OrgBenefits from './component/Benefits/OrgBenefits'
import EmpBenefits from './component/Benefits/EmployeeBenefits/EmpBenefits'
import LoanDashboard from './component/LoanDashboard/LoanDashboard'
import DocumentPage from './component/DocumentPage/DocumentPage'
import CreateBillTemplate from './component/BillTemplate/CreateBillTemplate'
import CreateBill from './component/BillTemplate/CreateBill'
import BillTable from './component/BillTemplate/BillTable'
import ViewBill from './component/BillTemplate/ViewBill'
import ViewBillTemplate from './component/BillTemplate/ViewBillTemplate'
import CreateInvoice from './component/InvoiceTemplate/CreateInvoice'
import InvoiceTable from './component/InvoiceTemplate/InvoiceTable'
import ViewInvoice from './component/InvoiceTemplate/ViewInvoice'
import ViewInvoiceTemplate from './component/InvoiceTemplate/ViewInvoiceTemplate'
import CreateInvoiceTemplate from './component/InvoiceTemplate/CreateInvoiceTemplate'
import AddTimesheet from './component/AddTimesheet/AddTimesheet'
import SalaryDetails from './component/SalaryDetails/SalaryDetails'
import Timesheet from './component/Timesheet/Timesheet'
import CreateVendor from './component/Vendor/CreateVendor'
import VendorList from './component/Vendor/VendorList'
import ExpenseList from './component/Expense/ExpenseList'
import ExpenseCreate from './component/Expense/ExpenseCreate'
import ExpenseView from './component/Expense/ExpenseView'
import InventoryList from './component/Inventory/InventoryList'
import InventoryCreate from './component/Inventory/InventoryCreate'
import InventoryView from './component/Inventory/InventoryView'
import SubscribtionList from './component/Subscribtion/SubscribtionList'
import SubscribtionCreate from './component/Subscribtion/SubscribtionCreate'
import SubscribtionView from './component/Subscribtion/SubscribtionView'
import CreateCustomer from './component/Customer/CreateCustomer'
import CustomerList from './component/Customer/CustomerList'
import AppraisalList from './component/AppraisalList/AppraisalList'
import AppraisalPage from './component/AppraisalPage/AppraisalPage'
import GeneralTemplate from './component/GeneralTemplate/GeneralTemplate'
import Report from './component/Report/Report'
import AddProjectModule from './component/ProjectModule/AddProjectModule'
import AddProjectPlan from './component/ProjectModule/AddProjectPlan'
import EmployeeDocument from './component/DocumentPage/EmployeeDocument'
import EmpAllBenefits from './component/Benefits/EmployeeBenefits/EmpAllBenefits'
import CmpSelectedBenefits from './component/Benefits/CmpSelectedBenefits'
import EmpSelectedBenefits from './component/Benefits/EmployeeBenefits/EmpSelectedBenefits'
import EmpTDS from './component/TDS/EmpTDS'
import Bonus from './component/Bonus/Bonus'
import PublicHoliday from './component/PublicHoliday/PublicHoliday'
import AddPublicHoliday from './component/PublicHoliday/AddPublicHoliday'
import ReceiveTransactions from './component/ReceiveTransactions/ReceiveTransactions'
import HomePage from './component/HomePage/HomePage'
import Approval from './component/ApprovalPage/Approval'
import GeneralDoc from './component/GeneralDoc/GeneralDoc'
import ViewInventoryTemplate from './component/InventoryTemplate/ViewInventoryTemplate'
import ViewSubscriptionTemplate from './component/SubscriptionTemplate/ViewSubscriptionTemplate'
import ViewExpenseTemplate from './component/ExpenseTemplate/ViewExpenseTemplate'
import AddstaffWIP from './component/Addstaff/AddstaffWIP'
import Attendance from './component/Attendance/Attendance'
import PlanPaymentStatus from './component/PlanPage/PlanPaymentStatus'

function App() {

  return (
    <>
      <Routes>
        <Route path="hdwallet" element={<HdWallet />} />
        <Route path="/" element={<HomePageGuard Comp={HomePage} />} />
        <Route path="/login" element={<LoginV3 />} />
        <Route path="/register" element={<RegisterV3 />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        <Route path="termsofservice" element={<TermsofServices />} />
        <Route path="consumerprivacy" element={<ConsumerPrivacy />} />
        <Route path="support" element={<Helppage />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="faq" element={<Faq />} />
        <Route path="upgradplan" element={<PlanDetails />} />
        <Route path="verify" element={<VerifyPage />} />
        <Route
          path="selectcompany"
          element={<GuardedRoutes Component={SelectCompany} />}
        />
        <Route
          path="companyprofile"
          element={<GuardedRoutes Component={CompanyProfile} />}
        />
        <Route
          path="approval-request"
          element={<GuardedRoutes Component={Approval} />}
        />
        <Route
          path="dashboard"
          element={<GuardedRoutes Component={Dashboard} />}
        />
        <Route
          path="employeedetail"
          element={<GuardedRoutes Component={EmployeeDetail} />}
        />
        <Route
          path="generaldoc"
          element={<GuardedRoutes Component={GeneralDoc} />}
        />
        <Route
          path="inventory/template/create"
          element={<GuardedRoutes Component={CreateInventoryTemplate} />}
        />
        <Route
          path="inventory/template/view"
          element={<GuardedRoutes Component={ViewInventoryTemplate} />}
        />
        <Route
          path="subscription/template/create"
          element={<GuardedRoutes Component={CreateSubscriptionTemplate} />}
        />
        <Route
          path="subscription/template/view"
          element={<GuardedRoutes Component={ViewSubscriptionTemplate} />}
        />
        <Route
          path="expense/template/create"
          element={<GuardedRoutes Component={CreateExpenseTemplate} />}
        />
        <Route
          path="expense/template/view"
          element={<GuardedRoutes Component={ViewExpenseTemplate} />}
        />
        <Route
          path="salarybreakup/create"
          element={<GuardedRoutes Component={CreateSalaryBreakup} />}
        />
        <Route
          path="salarybreakup/list"
          element={<GuardedRoutes Component={SalaryBreakupList} />}
        />
        <Route
          path="walletportal"
          element={<GuardedRoutes Component={WalletPortal} />}
        />
        <Route
          path="payrollsheet"
          element={<GuardedRoutes Component={PayrollSheet} />}
        />
        <Route
          path="registercompany"
          element={<GuardedRoutes Component={RegisterComp} />}
        />
        <Route
          path="registercompany/edit"
          element={<GuardedRoutes Component={RegisterComp} />}
        />
        <Route
          path="addstaff"
          element={<GuardedRoutes Component={AddstaffWIP} />}
        />
        <Route
          path="addstaff/edit"
          element={<GuardedRoutes Component={AddstaffWIP} />}
        />
        <Route
          path="attendance"
          element={<GuardedRoutes Component={Attendance} />}
        />
        <Route
          path="full-attendance"
          element={<GuardedRoutes Component={FullAttedance} />}
        />
        <Route
          path="attendancesingle"
          element={<GuardedRoutes Component={AttendanceSingle} />}
        />
        <Route
          path="company/all/benefits"
          element={<GuardedRoutes Component={CompanyAllBenefits} />}
        />
        <Route
          path="org/benefits/:id"
          element={<GuardedRoutes Component={OrgBenefits} />}
        />
        <Route
          path="employee/benefits/:id"
          element={<GuardedRoutes Component={EmpBenefits} />}
        />
        <Route
          path="loandashboard"
          element={<GuardedRoutes Component={LoanDashboard} />}
        />
        <Route
          path="documentpage"
          element={<GuardedRoutes Component={DocumentPage} />}
        />
        <Route
          path="bill/template/create"
          element={<GuardedRoutes Component={CreateBillTemplate} />}
        />
        <Route
          path="bill/create"
          element={<GuardedRoutes Component={CreateBill} />}
        />
        <Route
          path="bill/allbill"
          element={<GuardedRoutes Component={BillTable} />}
        />
        <Route
          path="bill/allbill/view"
          element={<GuardedRoutes Component={ViewBill} />}
        />
        <Route
          path="bill/template/view"
          element={<GuardedRoutes Component={ViewBillTemplate} />}
        />
        <Route
          path="invoice/create"
          element={<GuardedRoutes Component={CreateInvoice} />}
        />
        <Route
          path="invoice/allinvoice"
          element={<GuardedRoutes Component={InvoiceTable} />}
        />
        <Route
          path="invoice/allinvoice/view"
          element={<GuardedRoutes Component={ViewInvoice} />}
        />
        <Route
          path="invoice/template/view"
          element={<GuardedRoutes Component={ViewInvoiceTemplate} />}
        />
        <Route
          path="invoice/template/create"
          element={<GuardedRoutes Component={CreateInvoiceTemplate} />}
        />
        <Route
          path="addtimesheet"
          element={<GuardedRoutes Component={AddTimesheet} />}
        />
        <Route
          path="salary/details"
          element={<GuardedRoutes Component={SalaryDetails} />}
        />
        <Route
          path="timesheet"
          element={<GuardedRoutes Component={Timesheet} />}
        />
        <Route
          path="createvendor"
          element={<GuardedRoutes Component={CreateVendor} />}
        />
        <Route
          path="vendor/edit"
          element={<GuardedRoutes Component={CreateVendor} />}
        />
        <Route
          path="vendorlist"
          element={<GuardedRoutes Component={VendorList} />}
        />
        <Route
          path="expense/list"
          element={<GuardedRoutes Component={ExpenseList} />}
        />
        <Route
          path="expense/create"
          element={<GuardedRoutes Component={ExpenseCreate} />}
        />
        <Route
          path="expense/view"
          element={<GuardedRoutes Component={ExpenseView} />}
        />
        <Route
          path="inventory/list"
          element={<GuardedRoutes Component={InventoryList} />}
        />
        <Route
          path="inventory/create"
          element={<GuardedRoutes Component={InventoryCreate} />}
        />
        <Route
          path="inventory/view"
          element={<GuardedRoutes Component={InventoryView} />}
        />
        <Route
          path="subscription/list"
          element={<GuardedRoutes Component={SubscribtionList} />}
        />
        <Route
          path="subscription/create"
          element={<GuardedRoutes Component={SubscribtionCreate} />}
        />
        <Route
          path="subscribtion/view"
          element={<GuardedRoutes Component={SubscribtionView} />}
        />
        <Route
          path="createcustomer"
          element={<GuardedRoutes Component={CreateCustomer} />}
        />
        <Route
          path="customerlist"
          element={<GuardedRoutes Component={CustomerList} />}
        />
        <Route
          path="customer/edit"
          element={<GuardedRoutes Component={CreateCustomer} />}
        />
        <Route
          path="appraisallist"
          element={<GuardedRoutes Component={AppraisalList} />}
        />
        <Route
          path="appraisalpage"
          element={<GuardedRoutes Component={AppraisalPage} />}
        />
        <Route
          path="managetemplate"
          element={<GuardedRoutes Component={GeneralTemplate} />}
        />
        <Route path="report" element={<GuardedRoutes Component={Report} />} />
        <Route
          path="addprojectmodule"
          element={<GuardedRoutes Component={AddProjectModule} />}
        />
        <Route
          path="addprojectplan"
          element={<GuardedRoutes Component={AddProjectPlan} />}
        />
        <Route
          path="employeedocument"
          element={<GuardedRoutes Component={EmployeeDocument} />}
        />

        <Route
          path="employee/all/benefits"
          element={<GuardedRoutes Component={EmpAllBenefits} />}
        />
        <Route
          path="org/selected/benefits"
          element={<GuardedRoutes Component={CmpSelectedBenefits} />}
        />
        <Route
          path="employee/selected/benefits"
          element={<GuardedRoutes Component={EmpSelectedBenefits} />}
        />
        <Route
          path="employee/tds"
          element={<GuardedRoutes Component={EmpTDS} />}
        />

        <Route path="bonus" element={<GuardedRoutes Component={Bonus} />} />
        <Route
          path="publicholiday"
          element={<GuardedRoutes Component={PublicHoliday} />}
        />
        <Route
          path="view/holidays"
          element={<GuardedRoutes Component={AddPublicHoliday} />}
        />
        <Route
          path="noAccess"
          element={<GuardedRoutes Component={PlanDetails} />}
        />
        <Route
          path="receive-transactions"
          element={<GuardedRoutes Component={ReceiveTransactions} />}
        />
        <Route path="plan-payment-status" 
        element={<GuardedRoutes Component={PlanPaymentStatus}/>}/>
      </Routes>
    </>
  );
}

export default App
