import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE, 
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import companyReducer from "./selectCompanySlice";
import SelectedCompanyReducer from "./SelectedCompanySlice";
import DashboardReducer from "./DashboardSlice";
import OrgSalaryDataReducer from "./orgSalaryDataSlice";
import EmpDataReducer from "./EmpDataSlice";
import CompanyDocReducer from "./CompanyDocSlice";
import EmployeeDocReducer from "./EmployeeDocSlice";
import DesignationDocReducer from "./DesignationDoc";
import AppraisalListReducer from "./AppraisalTypeSlice";
import EmpLoanDataReducer from "./EmpLoanDataSlice";
import CompanyBankDetailReducer from "./CompanyBankDetailSlice";
import InventoryTemplateReducer from "./InventoryTemplateSlice";
import ExpenseTemplateReducer from "./ExpenseTemplateSlice";
import SubscriptionTemplateReducer from "./SubscriptionTemplate";
import BillTemplateReducer from "./BillTemplateSlice";
import InvoiceTemplateReducer from "./InvoiceTemplateSlice";
import AppraisalDetailListReducer from "./AppraisalDetailListSlice";
import SalaryBreakupListReducer from "./SalaryBreakupListSlice";
import BillListReducer from "./BillListSlice";
import InvoiceListReducer from "./InvoiceListSlice";
import TimesheetProjectReducer from "./TimesheetProjectSlice";
import DailyTimesheetReducer from "./DailyTimesheetSlice";
import CheckBalanceReducer from "./CheckBalanceSlice";
import EmpSalaryDataReducer from "./EmpSalaryDetailsSlice";
import AttendanceSingleReducer from "./AttendanceSingleSlice";
import AttendanceSingleTableDataReducer from "./AttendanceSingleTableDataSlice";
import WeeklyTimesheetReducer from "./WeeklyTimesheetSlice";
import PayrollTableDataReducer from "./PayrollTableDataSlice";
import VendorListReducer from "./VendorListSlice";
import CustomerListReducer from "./CustomerListSlice";
import RequestsListReducer from "./RequestsListSlice";
import AllEmpListReducer from "./AllEmpListSlice";
import GlobalBenefitsReducer from "./GlobalBenefitsSlice";
import OrgSelectedBenefitsReducer from "./OrgSelectedBenefits";
import EmpSelectedBenefitsReducer from "./EmpSelectedBenefits";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  selectCompany: companyReducer,
  selectedCompany: SelectedCompanyReducer,
  dashboard: DashboardReducer,
  allEmpList: AllEmpListReducer,
  orgSalaryData: OrgSalaryDataReducer,
  empData: EmpDataReducer,
  empSalaryData: EmpSalaryDataReducer,
  EmpAttendacnceSingleData: AttendanceSingleReducer,
  EmpAttendacnceSingleTableData: AttendanceSingleTableDataReducer,
  PayrollTableData: PayrollTableDataReducer,
  CompanyDoc: CompanyDocReducer,
  EmployeeDoc: EmployeeDocReducer,
  DesignationDocList: DesignationDocReducer,
  AppraisalType: AppraisalListReducer,
  empLoanData: EmpLoanDataReducer,
  companyBankDetailData: CompanyBankDetailReducer,
  InventoryTemplate: InventoryTemplateReducer,
  ExpenseTemplate: ExpenseTemplateReducer,
  SubscriptionTemplate: SubscriptionTemplateReducer,
  BillTemplate: BillTemplateReducer,
  InvoiceTemplate: InvoiceTemplateReducer,
  AppraisalDetailList: AppraisalDetailListReducer,
  SalaryBreakupList: SalaryBreakupListReducer,
  BillList: BillListReducer,
  InovieList: InvoiceListReducer,
  TimesheetProject: TimesheetProjectReducer,
  DailyTimesheet: DailyTimesheetReducer,
  CheckBalanceData: CheckBalanceReducer,
  WeeklyTimesheet: WeeklyTimesheetReducer,
  vendorList: VendorListReducer,
  customerList: CustomerListReducer,
  RequestsList: RequestsListReducer,
  GlobalBenefits: GlobalBenefitsReducer,
  OrgSelectedBenefits: OrgSelectedBenefitsReducer,
  EmpSelectedBenefits: EmpSelectedBenefitsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
