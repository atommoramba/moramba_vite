import React, { useEffect, useMemo, useState } from "react";
import "../ReceiveTransactions/ReceiveTransactions.css";
import Header from "../Header/Header";
import FilterComponent from "../../utils/FilterComponent";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import dayjs from 'dayjs'

import { CgCloseO } from "react-icons/cg";
import { AppBar, Divider, Tab, Tabs } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { FcOk } from "react-icons/fc";

function ReceiveTransactions() {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [applyinvoicePopup, setApplyinvoicePopup] = useState(false);
  const [addnicknamePopup, setAddnicknamePopup] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [payAmount, setPayAmount] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // Track the row being edited

  const data = useLocation();
  const dataValue = data.state !== null ? data.state.data : 0;
  const [selectedTab, setSelectedTab] = useState(dataValue);

  const handleChange = (event, newValue) => {
    if (dataValue !== null) {
      setSelectedTab(newValue);
    } else {
      setSelectedTab(dataValue);
    }
  };

  const [newTransaction, setNewTransaction] = useState({
    transactionHash: "",
    dateOfPayment: new Date(),
    time: "",
    invoiceAmount: 0,
    amount: 0,
  });
  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setApplyinvoicePopup(true);
  };
  const handleOpenModalNickname = (row) => {
    setSelectedRow(row);
    setAddnicknamePopup(true);
  };
  // Handle modal input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const handleAddTransaction = (row) => {
  //     if (selectedRow) {
  //       const invoiceAmount = parseFloat(
  //         selectedRow.invoiceAmount.replace("ETH", "").trim()
  //       );
  //       const enteredAmount = parseFloat(newTransaction.amount);

  //       if (enteredAmount > invoiceAmount) {
  //         alert(`Amount cannot exceed invoice amount (${invoiceAmount} ETH)`);
  //         return; // Prevent saving the transaction if the amount is invalid
  //       }
  //       const updatedData = Data.map((row) => {
  //         if (row.srNo === selectedRow.srNo) {
  //           const updatedTransactions = [...row.transactions, newTransaction];
  //           console.log(updatedTransactions);

  //           // Calculate total paid amount
  //           const totalPaid = updatedTransactions.reduce((sum, txn) => {
  //             // Ensure txn.amount is treated as a number
  //             const txnAmount =
  //               typeof txn.amount === "string"
  //                 ? parseFloat(txn.amount.replace("ETH", "").trim())
  //                 : parseFloat(txn.amount);
  //             return sum + (isNaN(txnAmount) ? 0 : txnAmount); // Fallback to 0 if NaN
  //           }, 0);

  //           // Parse invoice amount
  //           const invoiceAmount = parseFloat(
  //             row.invoiceAmount.replace("ETH", "").trim()
  //           );

  //           // Calculate pending amount
  //           const pendingAmount = Math.max(invoiceAmount - totalPaid, 0);
  //           let invoiceStatus = "Paid";
  //           if (pendingAmount > 0 && pendingAmount < invoiceAmount) {
  //             invoiceStatus = "Partially Paid";
  //           } else if (pendingAmount === 0) {
  //             invoiceStatus = "Paid";
  //           }

  //           return {
  //             ...row,
  //             transactions: updatedTransactions,
  //             pendingAmount:
  //               pendingAmount > 0 ? `ETH ${pendingAmount.toFixed(2)}` : "-",
  //             invoiceStatus,
  //           };
  //         }
  //         return row;
  //       });

  //       setData(updatedData);
  //       setApplyinvoicePopup(false);
  //       setSelectedRow(row);
  //       setNewTransaction({
  //         transactionHash: "",
  //         dateOfPayment: "",
  //         time: "",
  //         amount: "",
  //       });
  //     }
  //   };

  const [Data, setData] = useState([
    {
      srNo: 1,
      invoiceId: "",
      nicknamefrom: "",
      customerWallet: "0xe0C59tf43...f3B8",
      nicknameto: "Test 1",
      companyWallet: "0xg05deEr3c...5f1f4",
      dateTime: "Nov 11, 2024 11:30 AM",
      network: "Ethereum",
      receiveAmount: "ETH 70.00",
      invoiceAmount: "",
      pendingAmount: "",
      invoiceStatus: "Success",
      transactions: [
        // {
        //   transactionHash: "0xc8791bd44...e4e6cc35c",
        //   dateOfPayment: "Nov 11, 2024",
        //   time: "04:30 PM",
        //   amount: "ETH 70.00",
        // },
      ],
    },
    {
      srNo: 2,
      invoiceId: "",
      nicknamefrom: "XYZ",
      customerWallet: "0xa0F39teE6...e5fC",
      nicknameto: "Test 2",
      companyWallet: "0xB668BcrT4...B58c",
      dateTime: "Nov 11, 2024 12:30 PM",
      network: "Ethereum",
      receiveAmount: "ETH 75.00",
      invoiceAmount: "",
      pendingAmount: "",
      invoiceStatus: "Success",
      transactions: [],
    },
    {
      srNo: 3,
      invoiceId: "",
      nicknamefrom: "ABC",
      customerWallet: "0xe0C39reR4...e5fd",
      nicknameto: "Test 2",
      companyWallet: "0xB668BfRt3...B58c",
      dateTime: "Nov 11, 2024 1:30 PM",
      network: "Ethereum",
      receiveAmount: "ETH 72.00",
      invoiceAmount: "",
      pendingAmount: "",
      invoiceStatus: "Success",
      transactions: [],
    },
  ]);
  const [incomingTransactions, setIncomingTransactions] = useState(Data); // Data with status 'Success'
  const [confirmedTransactions, setConfirmedTransactions] = useState([]); // Data with status 'Paid'
  const [partiallyPaidTransactions, setPartiallyPaidTransactions] = useState(
    []
  ); // Data with status 'Partially Paid'
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const handleAddTransaction = () => {
    if (selectedRow && selectedInvoiceId) {
      const receiveAmount = parseFloat(
        selectedRow.receiveAmount.replace("ETH", "").trim()
      );
      const enteredAmount = parseFloat(newTransaction.amount);

      if (enteredAmount > receiveAmount) {
        alert(`Amount cannot exceed invoice amount (${receiveAmount} ETH)`);
        return;
      }
      const updatedTransactions = [
        ...selectedRow.transactions,
        {
          ...newTransaction,
          invoiceId: selectedInvoiceId,
          dateOfPayment: newTransaction.dateOfPayment || new Date(),
          invoiceAmount: selectedRow.receiveAmount.replace("ETH", "").trim(),
          amount: `ETH ${enteredAmount.toFixed(2)}`,
        },
      ];

      const updatedRow = {
        ...selectedRow,
        transactions: updatedTransactions,
        invoiceId: selectedInvoiceId,
      };
      const remainingAmount = receiveAmount - enteredAmount;

      if (remainingAmount === 0) {
        updatedRow.invoiceStatus = "Paid";
        setConfirmedTransactions((prev) => [...prev, updatedRow]);
      } else {
        updatedRow.invoiceStatus = "Partially Paid";
        updatedRow.pendingAmount = `ETH ${remainingAmount.toFixed(2)}`;
        setPartiallyPaidTransactions((prev) => [...prev, updatedRow]);
      }

      // Remove the row from incoming transactions
      setIncomingTransactions((prev) =>
        prev.filter((row) => row.srNo !== selectedRow.srNo)
      );

      // Close the popup and reset the form
      setApplyinvoicePopup(false);
      setSelectedRow(null);
      setSelectedInvoiceId("");
      setNewTransaction({
        transactionHash: "",
        dateOfPayment: new Date(),
        time: "",
        invoiceAmount: 0,
        amount: 0,
      });
    } else {
      alert("Please select an Invoice ID.");
    }
  };

  //   const handleAddTransaction = () => {
  //     if (selectedRow) {
  //       const invoiceAmount = parseFloat(
  //         selectedRow.invoiceAmount.replace("ETH", "").trim()
  //       );
  //       const enteredAmount = parseFloat(newTransaction.amount);

  //       if (enteredAmount > invoiceAmount) {
  //         alert(`Amount cannot exceed invoice amount (${invoiceAmount} ETH)`);
  //         return; // Prevent saving the transaction if the amount is invalid
  //       }

  //       // Calculate updated transactions
  //       const updatedTransactions = [
  //         ...selectedRow.transactions,
  //         {
  //           ...newTransaction,
  //           dateOfPayment: newTransaction.dateOfPayment || new Date(),
  //           amount: `ETH ${enteredAmount.toFixed(2)}`,
  //         },
  //       ];

  //       // Calculate total paid amount
  //       const totalPaid = updatedTransactions.reduce((sum, txn) => {
  //         const txnAmount = parseFloat(txn.amount.replace("ETH", "").trim());
  //         return sum + (isNaN(txnAmount) ? 0 : txnAmount);
  //       }, 0);

  //       const pendingAmount = Math.max(invoiceAmount - totalPaid, 0);
  //       let invoiceStatus = "Paid";

  //       if (pendingAmount > 0 && pendingAmount < invoiceAmount) {
  //         invoiceStatus = "Partially Paid";
  //       }

  //       const updatedRow = {
  //         ...selectedRow,
  //         transactions: updatedTransactions,
  //         pendingAmount:
  //           pendingAmount > 0 ? `ETH ${pendingAmount.toFixed(2)}` : "-",
  //         invoiceStatus,
  //       };

  //       // Update the appropriate tab's data
  //       if (invoiceStatus === "Paid") {
  //         setConfirmedTransactions((prev) => [...prev, updatedRow]);
  //       } else if (invoiceStatus === "Partially Paid") {
  //         setPartiallyPaidTransactions((prev) => [...prev, updatedRow]);
  //       }

  //       // Remove row from incoming transactions
  //       setIncomingTransactions((prev) =>
  //         prev.filter((row) => row.srNo !== selectedRow.srNo)
  //       );

  //       setApplyinvoicePopup(false); // Close popup
  //       setNewTransaction({
  //         transactionHash: "",
  //         dateOfPayment: new Date(),
  //         time: "",
  //         amount: 0,
  //       });
  //     }
  //   };
  useEffect(() => {
    setIncomingTransactions(
      Data.filter((row) => row.invoiceStatus === "Success")
    );
  }, [Data]);

  const customTableStyles = {
    rows: {
      style: {
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        border: "0.5px solid #EFEFEF",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "uppercase",
        border: "1px solid #EFEFEF",
        backgroundColor: "#6d9886",
        color: "#FFFFFF",
        wordWrap: "break-word",
        whiteSpace: "normal",
      },
    },
    title: {
      style: {
        overflow: "none",
      },
    },
  };

  // Column definitions for the table
  const columns = [
    {
      name: "Sr No.",
      selector: (row) => row.srNo,
      sortable: true,
      width: "120px",
    },
    {
      name: "Invoice ID",
      selector: (row) => row.invoiceId || "-",
      sortable: true,
      width: "140px",
    },
    {
      name: (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          Nick Name <br /> From <br /> (Customer Wallet)
        </div>
      ),
      selector: (row) => (
        <div
        className="mt-2" style={{ textAlign: "center", whiteSpace: "normal" }}>
          {row.nicknamefrom === "" ? (
            <div>
              <button
                className="btnsave"
                onClick={() => [handleOpenModalNickname(row)]}
              >
                Create
              </button>
            </div>
          ) : (
            row.nicknamefrom
          )}{" "}
       <p> {row.customerWallet}</p>
        </div>
      ),
      width: "210px",
    },
    {
      name: (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          Nick Name <br /> To <br /> (Company Wallet)
        </div>
      ),
      selector: (row) => (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          {row.nicknameto} <br /> {row.companyWallet}
        </div>
      ),
      width: "210px",
    },
    {
      name: "Date & Time",
      selector: (row) => row.dateTime,
      width: "180px",
    },
    {
      name: "Network",
      selector: (row) => row.network,
      width: "130px",
    },
    {
      name: "Receive Amount",
      selector: (row) => row.receiveAmount,
      // width: "160px",
      wrap: true,
    },

    {
      name: "Invoice Amount",
      selector: (row) => row.invoiceAmount || "-",
      //   width: "160px",
    },
    {
      name: "Pending Amount",
      selector: (row) => (
        <span className={row.pendingAmount === "" ? "" : "pendingamountsty"}>
          {row.pendingAmount || "-"}
        </span>
      ),
      //   width: "160px",
    },
    {
      name: "Invoice Status",
      cell: (row) => (
        <span
          className={`status ${row.invoiceStatus
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {row.invoiceStatus === "Paid" ? (
            <div>
              {" "}
              {row.invoiceStatus} <FcOk />
            </div>
          ) : (
            row.invoiceStatus
          )}
        </span>
      ),
      //   width: "160px",
    },
    {
      name: "Apply Invoice",
      cell: (row) => (
        <div>
          {" "}
          {row.invoiceStatus === "Paid" ? (
            <button className="editbtn-receivetrans">Edit</button>
          ) : (
            <button
              className="apply-btn"
              onClick={() => [handleOpenModal(row)]}
            >
              Apply Invoice
            </button>
          )}
        </div>
      ),
      //   width: "160px",
    },
  ];
  const columnsPartiallyPaid = [
    {
      name: "Sr No.",
      selector: (row) => row.srNo,
      sortable: true,
      width: "120px",
    },
    // {
    //   name: "Invoice ID",
    //   selector: (row) => row.invoiceId || "-",
    //   sortable: true,
    //   //   width: "140px",
    // },
    {
      name: (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          Nick Name <br /> From <br /> (Customer Wallet)
        </div>
      ),
      selector: (row) => (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          {row.nicknamefrom} <br /> {row.customerWallet}
        </div>
      ),
      width: "240px",
    },
    {
      name: (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          Nick Name <br /> To <br /> (Company Wallet)
        </div>
      ),
      selector: (row) => (
        <div style={{ textAlign: "center", whiteSpace: "normal" }}>
          {row.nicknameto} <br /> {row.companyWallet}
        </div>
      ),
      width: "240px",
    },
    {
      name: "Date & Time",
      selector: (row) => row.dateTime,
      //   width: "200px",
    },
    {
      name: "Network",
      selector: (row) => row.network,
      width: "130px",
    },
    {
      name: "Receive Amount",
      selector: (row) => row.receiveAmount,
      //   width: "160px",
    },

    {
      name: "Invoice Amount",
      selector: (row) => row.invoiceAmount || "-",
      //   width: "160px",
    },
    {
      name: "Pending Amount",
      selector: (row) => (
        <span className={row.pendingAmount === "" ? "" : "pendingamountsty"}>
          {row.pendingAmount || "-"}
        </span>
      ),
      //   width: "160px",
    },
    {
      name: "Invoice Status",
      cell: (row) => (
        <span
          className={`status ${row.invoiceStatus
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {row.invoiceStatus}
        </span>
      ),
      //   width: "160px",
    },
    {
      name: "",
      cell: (row) => (
        <button className="apply-btn" onClick={() => [handleOpenModal(row)]}>
          Apply Invoice
        </button>
      ),
      //   width: "160px",
    },
  ];
  // Function to handle row expansion
  const handleExpandRow = (srNo) => {
    // setApplyinvoicePopup(!applyinvoicePopup)
    setExpandedRow(expandedRow === srNo ? null : srNo);
  };
  const columnsExpand = [
    {
      name: "Sr No.",
      selector: (row) => row.srNo,
      sortable: true,
    },
    {
      name: "Transaction Hash",
      selector: (row) => row.transactionhash,
    },
    {
      name: "Date of payment",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: " Amount",
      selector: (row) => row.amount,
    },
  ];
  const DataExpand = [
    {
      srNo: 1,
      transactionhash: "0xc8791bd44...e4e6cc35c",
      date: "Nov 11,2024",
      time: "04:30 PM",
      amount: "ETH 70.00",
    },
  ];

  const ExpandableRow = ({ data }) => (
    <div className="transaction-details p-4">
      {data.transactions && data.transactions.length > 0 ? (
        <center>
          <table className="w-100">
            <thead>
              <tr className="text-center">
                <th>Invoice ID</th>
                <th>Transaction Hash</th>
                <th>Date of Payment</th>
                <th>Time</th>
                <th>Invoice Amount</th>
                <th>Paid Amount</th>
                {/* <th>Balance</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.transactions?.map((txn, index) => (
                <tr key={index} className="mt-2 text-center">
                  <td>{txn.invoiceId}</td>
                  <td>0xc8791bd44...e4e6cc35c</td>
                  <td>{dayjs(txn.dateOfPayment).format("MMM DD,YYYY")}</td>
                  <td>{dayjs(txn.dateOfPayment).format("hh:mm A")}</td>
                  <td>
                    {txn.invoiceAmount}
                    {/* {parseFloat(
                      selectedRow.receiveAmount.replace("ETH", "").trim()
                    )} */}
                  </td>
                  <td>{txn.amount}</td>
                  {/* <td>{txn.pendingAmount}</td> */}
                  <td>
                    <button className="editbtn-receivetrans">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      ) : (
        <p>First Apply Invoice</p>
        // <p>No transactions available</p>
      )}
    </div>
  );
  //   const rowPreExpanded = () => (
  //     <center>
  //       <div className="m-3 expandtable">
  //         <DataTable
  //           columns={columnsExpand}
  //           data={DataExpand}
  //           fixedHeader
  //           customStyles={customTableStylesExpand}
  //         />
  //       </div>
  //     </center>
  //   );

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
        PlaceHolder="Search invoice id / transaction hash "
      />
    );
  }, [filterText, resetPaginationToggle]);

  const conditionalRowStyles = [
    {
      when: (row) => row.srNo === expandedRow,
      style: {
        backgroundColor: "#f1f1f1",
      },
    },
  ];
  return (
    <>
      <Header />

      <div className={applyinvoicePopup || addnicknamePopup ? "bgblur1" : ""}>
        <div className="p-3">
          <h3 className="mt-3 text-center HeadingText">
            View All Receive Transaction
          </h3>
          <div className="InvoiceBox d-flex justify-content-between px-3">
            <div className="d-flex gap-3">
              <h4 className="">Select Wallet :</h4>
              <select name="" className="vactionbox1" id="">
                <option value="all">All</option>
              </select>
            </div>
            <div className="d-flex">
              <div
                className="d-flex flex-row align-items-center Searchbar  me-3 receivetransaction-search"
                id="mobilesearch"
              >
                <SearchIcon />
                {subHeaderComponent}
              </div>
            </div>
          </div>
          <AppBar position="static" className="tab_bar mt-2" id="mobBoxtab">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              variant="scrollable"
            >
              <Tab label="Incoming Transaction" className="Login_text" />
              <Tab label="Confirmed Transaction" className="Login_text" />
              <Tab label="Partially Apply Transaction" className="Login_text" />
            </Tabs>
          </AppBar>
          {/* {selectedTab === 0 && (
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={Data}
                //   expandableRows
                //   expandableRowExpanded={(row) => row.srNo === expandedRow}
                //   expandableRowsComponent={ExpandableRow}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          )} */}
          {/* {selectedTab === 1 && (
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={Data}
                //   expandableRows
                //   expandableRowExpanded={(row) => row.srNo === expandedRow}
                //   expandableRowsComponent={ExpandableRow}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          )}
          {selectedTab === 2 && (
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={Data}
                expandableRows
                expandableRowExpanded={(row) => row.srNo === expandedRow}
                expandableRowsComponent={ExpandableRow}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          )} */}
          {selectedTab === 0 && (
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={incomingTransactions}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          )}
          {selectedTab === 1 && (
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={confirmedTransactions}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          )}

          {selectedTab === 2 && (
            <div className="mt-4">
              <DataTable
                columns={columnsPartiallyPaid}
                data={partiallyPaidTransactions}
                expandableRows
                expandableRowExpanded={(row) => row.srNo === expandedRow}
                expandableRowsComponent={ExpandableRow}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customTableStyles}
              />
            </div>
          )}
        </div>
      </div>
      {applyinvoicePopup ? (
        <>
          <div className="apply-popup">
            <div className="row text-end">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setApplyinvoicePopup(false)} />
              </h3>
            </div>
            <div className="text-center">
              <h4>Apply to invoice</h4>
              <p>
                70ETH received on Nov 11th , 2024 at 11:30AM with transaction
                hash 0xc8794...6cc35c
              </p>
            </div>
            <Divider />
            <div className="d-flex gap-5 mt-4">
              <div className="">
                <h6>Select Customer</h6>
                <select name="" id="">
                  <option value="">Select Customer</option>
                  <option value="Customer1">Customer 1</option>
                  <option value="Customer2">Customer 2</option>
                  <option value="Customer3">Customer 3</option>
                </select>
              </div>
              <div className="">
                <h6>Invoice ID</h6>
                <select
                  name=""
                  id=""
                  onChange={(e) => setSelectedInvoiceId(e.target.value)}
                >
                  <option value="">Select Invoice ID</option>
                  <option value="3BRD">3BRD</option>
                  <option value="GKES">GKES</option>
                  <option value="PQRS">PQRS</option>
                </select>
              </div>
            </div>
            <div className="d-flex gap-5 mt-4">
              <div>
                <h6>Receive Amount</h6>
                <div className="d-flex">
                  <input
                    type="text"
                    value="ETH"
                    className="rec-curency-input"
                  />
                  <input
                    type="number"
                    className="me-2"
                    placeholder="Enter Receive Amount"
                    name="amount"
                    value={parseFloat(
                      selectedRow.receiveAmount.replace("ETH", "").trim()
                    )}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <h6>Invoice Amount</h6>
                <div className="d-flex">
                  <input
                    type="text"
                    value="ETH"
                    className="rec-curency-input"
                  />
                  <input
                    type="number"
                    className="me-2"
                    placeholder="Enter Invoice Amount"
                    name="amount"
                    value={parseFloat(
                      selectedRow.receiveAmount.replace("ETH", "").trim()
                    )}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <h6>Apply Amount</h6>
                <div className="d-flex">
                  <input
                    type="text"
                    value="ETH"
                    className="rec-curency-input"
                  />
                  <input
                    type="number"
                    className="me-2"
                    placeholder="Enter Apply Amount"
                    name="amount"
                    value={
                      newTransaction.amount !== 0 // Check if user has entered a value
                        ? newTransaction.amount
                        : selectedRow?.receiveAmount
                        ? parseFloat(
                            selectedRow.receiveAmount.replace("ETH", "").trim()
                          )
                        : "" // Default to the invoice amount
                    }
                    onChange={(e) => {
                      const enteredAmount = e.target.value; // Convert input to a number
                      const maxAmount = selectedRow?.receiveAmount
                        ? parseFloat(
                            selectedRow.receiveAmount.replace("ETH", "").trim()
                          )
                        : 0; // Parse the invoice amount or set to 0 if undefined

                      if (
                        enteredAmount === "" ||
                        parseFloat(enteredAmount) <= maxAmount
                      ) {
                        // Valid input, update state
                        setNewTransaction({
                          ...newTransaction,
                          amount: enteredAmount,
                        });
                      } else {
                        // Optional: Show error message if entered amount is greater than invoice amount
                        alert(
                          `Amount cannot exceed invoice amount (${maxAmount} ETH).`
                        );
                      }
                    }}
                  />
                </div>
                <div className="mt-3 d-flex">
                  Pending Balance :{" "}
                  {selectedRow.pendingAmount === ""
                    ? "ETH" +
                      " " +
                      Math.max(
                        parseFloat(
                          selectedRow.receiveAmount.replace("ETH", "").trim()
                        ) - parseFloat(newTransaction.amount || 0),
                        0
                      ).toFixed(2)
                    : selectedRow.pendingAmount}
                  {}
                </div>
                <div className="mt-3 d-flex">
                  <input type="checkbox" />
                  &nbsp; Roundoff
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                className="btncancel"
                onClick={() => setApplyinvoicePopup(false)}
              >
                Cancel
              </button>
              <button className="btnsave" onClick={handleAddTransaction}>
                Save
              </button>
              {/* <button className="btnsave">Roundoff</button> */}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {addnicknamePopup ? (
        <>
          <div className="nickname-popup">
            <div className="row text-end">
              <h3 className="close text-black ">
                <CgCloseO onClick={() => setAddnicknamePopup(false)} />
              </h3>
            </div>
            <div className="text-center">
              <h4>Add Nickname</h4>
            </div>
            <Divider />

            <div className="row mt-4">
              <div className="col-md-6">
                <h6>Nick Name</h6>
                <input
                  type="number"
                  className="me-2"
                  placeholder="Enter Nick Name"
                  name="amount"
                  // value={parseFloat(
                  //   selectedRow.receiveAmount.replace("ETH", "").trim()
                  // )}
                />
              </div>
              <div className="col-md-6">
                <h6>Wallet Address</h6>

                <input
                  type="number"
                  className="rec-wallet-add"
                  placeholder="0xe0C59456789sc567890f3B8"
                  name="amount"
                  // value="0xe0C59456789sc567890f3B8"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-5">
              <button
                className="btncancel"
                onClick={() => setAddnicknamePopup(false)}
              >
                Cancel
              </button>
              <button className="btnsave"
              //  onClick={handleAddTransaction}
               >
                Save
              </button>
              {/* <button className="btnsave">Roundoff</button> */}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ReceiveTransactions;
