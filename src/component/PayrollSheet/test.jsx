const arr1 = [
  { id: "1", name: [] },
  { id: "2", name: [] },
  { id: "3", name: [] },
];
const arr2 = [
  { id: "1", name: "Darsh" },
  {
    id: "2",
    name: [
      {
        _id: "6433ae5456595435061bf6ee",
        emp_present: 28,
        emp_absent: 1,
        emp_halfday_paid: 0,
        emp_halfday_unpaid: 0,
        emp_vacation_unpaid: 0,
        emp_vacation_paid: 0,
        emp_vacation_pending_rejected: 1,
        emp_vacation_approved: 0,
        emp_total_leave_paid: 0,
        taxpermonth: 1200,
        employeeId: "641d7c8c6c73bd23b1481649",
        _orgId: "641d7c8c6c73bd23b1481606",
        month: "apr",
        year: 2023,
        actualAmountToPay: 2978.53,
        loanAmount: 0,
        salaryAmount: 4477,
        salaryinfo: [
          {
            isActive: true,
            effectiveDate: "2023-03-09 08:32:08",
            mandetorylist: [
              {
                key: "basic",
                name: "Basic",
                desc: "PF",
                valdata: "1000",
                save: true,
              },
              {
                key: "dearness",
                name: "Dearness",
                desc: "PF",
                valdata: "1000",
                save: true,
              },
            ],
            allowancelist: [
              {
                key: "HRA",
                name: "House Rent Allowance",
                desc: "40% of Salary (50%, if house situated in Mumbai, Calcutta, Delhi or Madras)",
                isDisable: false,
                valdata: 800,
                save: true,
              },
              {
                key: "CEA",
                name: "Children Education Allowance",
                desc: "Up to Rs. 100 per month per child up to a maximum of 2 children is exempt",
                isDisable: false,
                valdata: "1000",
                save: true,
              },
              {
                key: "HEA",
                name: "Hostel Expenditure Allowance",
                desc: "Up to Rs. 300 per month per child up to a maximum of 2 children is exempt",
                isDisable: false,
                valdata: "1000",
                save: true,
              },
              {
                key: "TA",
                name: "Transport Allowance",
                desc: "Rs. 3,200 per month granted to an employee, who is blind or deaf and dumb or orthopedically handicapped with disability of lower extremities",
                isDisable: false,
                valdata: "997",
                save: true,
              },
            ],
            deductionlist: [
              {
                key: "pf",
                name: "PF",
                desc: "PF",
                isDisable: false,
                valdata: 120,
                save: true,
              },
            ],
            taxlist: [
              {
                key: "pt",
                name: "PT",
                desc: "PF",
                isDisable: false,
                valdata: 200,
                save: true,
              },
              {
                key: "tds",
                name: "TDS",
                desc: "TDS",
                isDisable: false,
                valdata: "1000",
                save: true,
              },
            ],
            salaryafterdeduction: 4477,
            mandetorytotal: 2000,
            allowancetotal: 3797,
            deductiontotal: 120,
            taxtotal: 1200,
          },
        ],
        updatedBy: "darsh.s@arcmentor.com",
        createdBy: "darsh.s@arcmentor.com",
        active: true,
        lockedbyadmin: false,
        createdAt: "2023-04-10T06:36:04.644Z",
        updatedAt: "2023-04-12T09:56:08.237Z",
        __v: 0,
      },
    ],
  },
];
//LOGIC 1:
const test = arr1.map(function (x) {
  var result = arr2.filter((a1) => a1.id === x.id);
  if (result.length > 0) {
    x.name = result[0].name;
  }
  return x;
});

// console.log(test);

//LOGIC 2:
var arr3 = [];
for (let i = 0; i < arr1.length; i++) {
  const match = arr2.find((element) => element.id === arr1[i].id);
  if (match) {
    arr1[i].name = match.name;
  }
  arr3.push(match);
}
// console.log(arr3);

//LOGIC 3:
var testx = arr2.concat(arr1);
// console.log(testx);

function compareObjs(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
// console.log(compareObjs({ name: "stack" }, { name: "overflow" }));

const UpdatedData = [
  {
    _partition: "Moramba",
    authenticateUser: "mrudu.p@arcmentor.com",
    createdby: "mrudu.p@arcmentor.com",
    createdon: "2023-04-20T06:06:49.041Z",
    designation: "Senior Employee",
    email: "darsh.s@arcmentor.com",
    email2: "darsh.s@arcmentor.com",
    salaryTemplateid: "6437bff3d9a255135efcfa8d",
    empAddress: "NA",
    empCountry: "India",
    empCurrency: "₹",
    empSalaryAmount: 0,
    empSalaryPayType: "monthly",
    empSalaryType: "monthly",
    empStatusid: "1",
    empWorkType: "fulltime",
    empdob: "2023-04-12T18:30:00.000Z",
    emptaxid: "NA",
    emptype: "salaried",
    fullName: " ",
    firstName: "Darsh",
    lastName: "Shah",
    telephoneNumber: "919876567898",
    state: "Gujarat",
    zipCode: "NA",
    reportingTo1: "6437c438d9a255135efd00d5",
    reportingTo2: "6437c438d9a255135efd00d5",
    expenseApprover: "6437c438d9a255135efd00d5",
    timesheetApprover: "6437c438d9a255135efd00d5",
    vacationApprover: "6437c438d9a255135efd00d5",
    purchaseApprover: "6437c438d9a255135efd00d5",
    performanceAppraiser: "6437c438d9a255135efd00d5",
    profileupdateApprovar: "6437c438d9a255135efd00d5",
    meritalStatus: "Select",
    employeeIdNumber: "E0FP7GR",
    empAddress2: "NA",
    emargencyNumber: "918765678987",
    ABANNumber: "NA",
    IBANNumber: "NA",
    IFSCNumber: "NA",
    accountNumber: "1234567890",
    bankName: "Test Bank of India",
    swiftCode: "NA",
    imageUrl: "",
    imageKey: "",
    joinDate: "2023-04-12T18:30:00.000Z",
    phoneNo: "918765789876",
    role: "employee",
    vacationDays: 12,
    comp_name: "Aeropres India PVT LTD",
    comp_nameCreatedBy: "Aeropres India PVT LTD",
    modules: [],
    salaryinfo: [
      {
        isActive: true,
        salarytemplateid: "6437bff3d9a255135efcfa8d",
        effectiveDate: "2023-04-13 08:58:32",
        mandetorylist: [
          {
            key: "basic",
            name: "Basic",
            desc: "PF",
            valdata: "50000",
            save: true,
          },
          {
            key: "dearness",
            name: "Dearness",
            desc: "PF",
            valdata: "5000",
            save: true,
          },
        ],
        allowancelist: [],
        deductionlist: [],
        taxlist: [
          {
            key: "pt",
            name: "PT",
            desc: "PF",
            isDisable: false,
            valdata: 200,
            save: true,
          },
        ],
        salaryafterdeduction: 54800,
        mandetorytotal: 55000,
        allowancetotal: 0,
        deductiontotal: 0,
        taxtotal: 200,
      },
      {
        isActive: true,
        templateid: "6437bff3d9a255135efcfa8d",
        templatename: "",
        _empId: "6437c438d9a255135efd00d5",
        _orgId: "6437be3fd9a255135efce93c",
        effectiveDate: "2023-04-20 06:06:48",
        mandetorylist: [
          {
            key: "basic",
            name: "Basic",
            desc: "PF",
            valdata: "50000",
            save: true,
          },
          {
            key: "dearness",
            name: "Dearness",
            desc: "PF",
            valdata: "5000",
            save: true,
          },
        ],
        allowancelist: [],
        deductionlist: [],
        taxlist: [
          {
            key: "pt",
            name: "PT",
            desc: "PF",
            isDisable: false,
            valdata: 200,
            save: true,
          },
        ],
        salaryafterdeduction: "",
        mandetorytotal: 55000,
        allowancetotal: 0,
        deductiontotal: 0,
        taxtotal: 200,
        createdby: "mrudu.p@arcmentor.com",
        updatedby: "mrudu.p@arcmentor.com",
      },
    ],
    isSalaryChange: false,
  },
];
const OldData = [
  {
    _id: "6437c438d9a255135efd00d5",
    user_id: "641bea95014e1050bee6bd22",
    _orgId: "6437be3fd9a255135efce93c",
    orgId: "6437be3fd9a255135efce93c",
    active: true,
    _partition: "Moramba",
    authenticateUser: "mrudu.p@arcmentor.com",
    createdby: "mrudu.p@arcmentor.com",
    updatedby: "mrudu.p@arcmentor.com",
    createdon: "2023-04-13T08:58:32.841Z",
    designation: "Senior Employee",
    email: "darsh.s@arcmentor.com",
    empAddress: "NA",
    email2: "darsh.s@arcmentor.com",
    salaryTemplateid: "6437bff3d9a255135efcfa8d",
    empCountry: "India",
    empCurrency: "₹",
    empSalaryAmount: "54800",
    empSalaryPayType: "monthly",
    empSalaryType: "monthly",
    empStatusid: "1",
    empWorkType: "fulltime",
    empdob: "2023-04-13T08:54:54.158Z",
    emptaxid: "NA",
    emptype: "salaried",
    fullName: " ",
    firstName: "Darsh",
    lastName: "Shah",
    telephoneNumber: "919876567898",
    state: "Gujarat",
    zipCode: "NA",
    reportingTo1: "6437c438d9a255135efd00d5",
    reportingTo2: "6437c438d9a255135efd00d5",
    expenseApprover: "6437c438d9a255135efd00d5",
    timesheetApprover: "6437c438d9a255135efd00d5",
    vacationApprover: "6437c438d9a255135efd00d5",
    purchaseApprover: "6437c438d9a255135efd00d5",
    profileupdateApprovar: "6437c438d9a255135efd00d5",
    performanceAppraiser: "6437c438d9a255135efd00d5",
    approval_status: "pending",
    meritalStatus: "Select",
    employeeIdNumber: "E0FP7GR",
    empAddress2: "NA",
    emargencyNumber: "918765678987",
    ABANNumber: "NA",
    IBANNumber: "NA",
    IFSCNumber: "NA",
    accountNumber: "NA",
    bankName: "NA",
    swiftCode: "NA",
    imageUrl: "",
    imageKey: "",
    joinDate: "2023-04-13T08:54:54.158Z",
    phoneNo: "918765789876",
    role: "employee",
    vacationDays: 12,
    comp_name: "Aeropres India PVT LTD",
    modules: [],
    salaryinfo: [
      {
        isActive: true,
        salarytemplateid: "6437bff3d9a255135efcfa8d",
        effectiveDate: "2023-04-13 08:58:32",
        mandetorylist: [
          {
            key: "basic",
            name: "Basic",
            desc: "PF",
            valdata: "50000",
            save: true,
          },
          {
            key: "dearness",
            name: "Dearness",
            desc: "PF",
            valdata: "5000",
            save: true,
          },
        ],
        allowancelist: [],
        deductionlist: [],
        taxlist: [
          {
            key: "pt",
            name: "PT",
            desc: "PF",
            isDisable: false,
            valdata: 200,
            save: true,
          },
        ],
        salaryafterdeduction: 54800,
        mandetorytotal: 55000,
        allowancetotal: 0,
        deductiontotal: 0,
        taxtotal: 200,
      },
    ],
    profileimgstatus: "drafted",
    salarymonthname: "NA",
    allowancemonth: 0,
    deductionmonth: 0,
    loanmonth: 0,
    totalsalmonth: 0,
    mandatoryAmount: 0,
    taxAmount: 0,
    createdAt: "2023-04-13T08:58:32.856Z",
    updatedAt: "2023-04-20T06:06:49.090Z",
    __v: 0,
  },
];
// const TestDiff = UpdatedData.filter((x) => !OldData.includes(x));

function arr_diff(a1, a2) {
  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }
console.log(diff);
  return diff;
}

arr_diff(UpdatedData, OldData);
