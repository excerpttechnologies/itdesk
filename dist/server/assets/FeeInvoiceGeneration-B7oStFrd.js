import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import pkg from "number-to-words";
const { toWords } = pkg;
const FeeInvoiceGeneration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstallmentIndex, setCurrentInstallmentIndex] = useState(null);
  const [isRecordingPayment, setIsRecordingPayment] = useState(false);
  const [isReceiptPreviewOpen, setIsReceiptPreviewOpen] = useState(false);
  const [currentReceiptDetails, setCurrentReceiptDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    transactionId: "",
    receivedBy: "",
    receiptDocument: null,
    paymentMode: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const fetchRegistrations = async () => {
    try {
      const url = "/api/new/registrations";
      console.log("Fetching registrations with URL:", url);
      const response = await axios.get(url);
      console.log("API Response:", response.data);
      const approvedRegistrations = response.data.filter(
        (reg) => reg.regStatus === "Approved"
      );
      approvedRegistrations.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      console.log("Filtered approved registrations:", approvedRegistrations.length);
      setRegistrations(approvedRegistrations);
      setFilteredRegistrations(approvedRegistrations);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      alert("Failed to load registrations.");
    }
  };
  const applyFiltersAndSearch = () => {
    if (!searchTerm) {
      setFilteredRegistrations([...registrations]);
      return;
    }
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = registrations.filter(
      (reg) => reg.fName && reg.fName.toLowerCase().includes(lowercasedSearch) || reg.lName && reg.lName.toLowerCase().includes(lowercasedSearch) || reg.courseName && reg.courseName.toLowerCase().includes(lowercasedSearch) || reg.regid && reg.regid.toLowerCase().includes(lowercasedSearch) || reg.offeredFee && reg.offeredFee.toString().includes(lowercasedSearch)
    );
    setFilteredRegistrations(filtered);
  };
  useEffect(() => {
    fetchRegistrations();
  }, []);
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, registrations]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    if (!isModalOpen) {
      setIsRecordingPayment(false);
      setCurrentInstallmentIndex(null);
    }
  }, [isModalOpen]);
  const fetchCandidateDetails = async (id) => {
    try {
      setIsRecordingPayment(false);
      const response = await axios.get(`/api/registration/${id}`);
      const { __v, ...filteredData } = response.data;
      if (!filteredData || !filteredData._id) {
        console.error("Invalid candidate data received");
        alert("Invalid candidate data. Please try again.");
        return;
      }
      if (!filteredData.paymentsPlan || filteredData.paymentsPlan.length === 0) {
        filteredData.paymentsPlan = [
          {
            amount: filteredData.offeredFee,
            status: filteredData.singlePaymentStatus || "Pending",
            paidDate: filteredData.singlePaymentDate,
            paidAmount: filteredData.offeredFee
          }
        ];
      }
      setSelectedCandidate(filteredData);
      setIsModalOpen(true);
      setPaymentDetails({
        amount: filteredData.offeredFee,
        transactionId: "",
        receivedBy: "",
        receiptDocument: null,
        paymentMode: ""
      });
      setCurrentInstallmentIndex(null);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      if (error.response) {
        alert(`Failed to fetch candidate details. Status: ${error.response.status}`);
      } else if (error.request) {
        alert("No response from server. Please check your network connection.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  const handleSubmitPayment = async () => {
    try {
      if (!paymentDetails.receivedBy) {
        alert("Please enter the name of the person receiving the payment.");
        return;
      }
      const paymentData = {
        transactionId: paymentDetails.transactionId,
        amount: paymentDetails.amount,
        receivedBy: paymentDetails.receivedBy,
        paymentMode: paymentDetails.paymentMode
      };
      const response = await axios.put(
        `/api/update-payment/${selectedCandidate._id}`,
        paymentData
      );
      setSelectedCandidate(response.data.updatedRegistration);
      alert("Payment recorded successfully!");
      setIsRecordingPayment(false);
      fetchRegistrations();
    } catch (error) {
      console.error("Error recording payment:", error);
      alert(error.response?.data?.error || "Failed to record payment.");
    }
  };
  const generatePaymentRows = () => {
    const paymentsPlan = selectedCandidate?.paymentsPlan || [];
    const handleDueDateChange = async (installmentId, newDueDate) => {
      try {
        const response = await fetch(
          `/api/update-due-date/${selectedCandidate._id}/${installmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ dueDate: newDueDate })
          }
        );
        if (response.ok) {
          const updatedCandidate = { ...selectedCandidate };
          const installmentIndex = updatedCandidate.paymentsPlan.findIndex(
            (p) => p._id === installmentId
          );
          if (installmentIndex !== -1) {
            updatedCandidate.paymentsPlan[installmentIndex].dueDate = newDueDate;
            setSelectedCandidate(updatedCandidate);
          }
          console.log("Due date updated successfully");
        } else {
          console.error("Failed to update due date");
        }
      } catch (error) {
        console.error("Error updating due date:", error);
      }
    };
    if (selectedCandidate?.feeType === "Single") {
      const singlePayment = paymentsPlan[0] || {
        amount: selectedCandidate.offeredFee,
        status: selectedCandidate.singlePaymentStatus || "Pending"
      };
      return /* @__PURE__ */ jsxs("div", { className: "row mb-3 border-bottom pb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-xl-3", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Amount:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              value: singlePayment.amount || selectedCandidate.offeredFee || 0,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-3", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Status:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: `form-control ${singlePayment.status === "Paid" ? "text-success" : "text-warning"}`,
              value: singlePayment.status || "Pending",
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          singlePayment.status === "Pending" && /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn form-control btn-primary",
              onClick: () => handleShowPaymentForm(),
              children: "Record Payment"
            }
          ),
          singlePayment.status === "Paid" && /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn form-control btn-success",
              onClick: () => {
                setCurrentInstallmentIndex(0);
                handleViewPaymentDetails();
              },
              children: "View Receipt"
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "row mb-3 p-2 bg-light rounded", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
          /* @__PURE__ */ jsx("strong", { children: "Total Course Fee:" }),
          " ₹",
          selectedCandidate.offeredFee
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
          /* @__PURE__ */ jsx("strong", { children: "Total Paid:" }),
          " ₹",
          paymentsPlan.filter((p) => p.status === "Paid" || p.status === "Auto-Paid").reduce((sum, p) => sum + parseFloat(p.paidAmount || 0), 0)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
          /* @__PURE__ */ jsx("strong", { children: "Remaining:" }),
          " ₹",
          paymentsPlan.filter((p) => p.status === "Pending").reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
        ] })
      ] }),
      paymentsPlan.map((payment, index) => /* @__PURE__ */ jsxs("div", { className: "row mb-3 border-bottom pb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "col-xl-1", children: /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
          "Installment ",
          index + 1,
          ":"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-2", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Due Amount:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              value: payment.amount || 0,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-2", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Status:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: `form-control ${payment.status === "Paid" ? "text-success" : payment.status === "Auto-Paid" ? "text-info" : "text-warning"}`,
              value: payment.status || "Pending",
              readOnly: true
            }
          )
        ] }),
        payment.status !== "Pending" && /* @__PURE__ */ jsxs("div", { className: "col-xl-2", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Paid Amount:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              value: payment.paidAmount || 0,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-2", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Due Date:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              className: `form-control ${payment.status === "Pending" ? "editable-due-date" : ""}`,
              value: payment.dueDate || "",
              readOnly: payment.status !== "Pending",
              onChange: (e) => {
                if (payment.status === "Pending") {
                  handleDueDateChange(payment._id, e.target.value);
                }
              },
              style: {
                cursor: payment.status === "Pending" ? "pointer" : "default",
                backgroundColor: payment.status === "Pending" ? "#fff" : "#f8f9fa",
                border: payment.status === "Pending" ? "2px solid #007bff" : "1px solid #ced4da"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-2 d-flex align-items-end", children: [
          payment.status === "Pending" && parseFloat(payment.amount || 0) > 0 && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "btn btn-primary btn-sm me-1",
              onClick: () => handleShowPaymentForm(index),
              children: "Record Payment"
            }
          ),
          (payment.status === "Paid" || payment.status === "Auto-Paid") && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "btn btn-success btn-sm",
              onClick: () => {
                setCurrentInstallmentIndex(index);
                handleViewPaymentDetails();
              },
              children: "View Receipt"
            }
          )
        ] })
      ] }, payment._id || index))
    ] });
  };
  const handleViewPaymentDetails = () => {
    console.log("Selected Candidate in View Details:", selectedCandidate);
    const paymentDetails2 = selectedCandidate.feeType === "Single" ? selectedCandidate.paymentsPlan[0] || {} : selectedCandidate.paymentsPlan[currentInstallmentIndex] || {};
    console.log("Payment Details:", paymentDetails2);
    if (paymentDetails2.status === "Paid") {
      setCurrentReceiptDetails({
        paidAmount: paymentDetails2.paidAmount || selectedCandidate.offeredFee,
        paidDate: paymentDetails2.paidDate,
        receivedBy: paymentDetails2.receivedBy || "",
        transactionId: paymentDetails2.transactionId
      });
      setIsReceiptPreviewOpen(true);
    } else {
      alert("Payment details not available.");
    }
  };
  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  };
  const generateReceipt = async (selectedCandidate2, currentInstallmentIndex2) => {
    console.log("selectedCandidate:", selectedCandidate2);
    console.log("currentInstallmentIndex:", currentInstallmentIndex2);
    if (!selectedCandidate2) {
      throw new Error("selectedCandidate is required");
    }
    let paymentsPlan = selectedCandidate2.paymentsPlan;
    let currentPaymentDetails;
    if (selectedCandidate2.feeType === "Installment") {
      if (paymentsPlan && typeof paymentsPlan === "object" && !Array.isArray(paymentsPlan)) {
        const keys = Object.keys(paymentsPlan);
        if (keys.length > 0 && keys.every((key) => !isNaN(key))) {
          paymentsPlan = Object.values(paymentsPlan);
        }
      }
      if (!paymentsPlan || !Array.isArray(paymentsPlan)) {
        throw new Error("paymentsPlan array not found in selectedCandidate for installment payment");
      }
      if (currentInstallmentIndex2 < 0 || currentInstallmentIndex2 >= paymentsPlan.length) {
        throw new Error(`Invalid installment index: ${currentInstallmentIndex2}`);
      }
      currentPaymentDetails = paymentsPlan[currentInstallmentIndex2];
    } else {
      currentPaymentDetails = {
        paidAmount: selectedCandidate2.offeredFee || selectedCandidate2.courseFee,
        paidDate: selectedCandidate2.singlePaymentDate || (/* @__PURE__ */ new Date()).toISOString(),
        receivedBy: selectedCandidate2.singlepaymentrecivedby || "N/A",
        transactionId: selectedCandidate2.singlePaymentTransactionId || "N/A",
        paymentMode: selectedCandidate2.singlePaymentMode || "Cash",
        receiptId: selectedCandidate2.singlePaymentReceiptId || "N/A"
      };
    }
    if (!currentPaymentDetails) {
      throw new Error(`Payment details not found for installment index: ${currentInstallmentIndex2}`);
    }
    if (!currentPaymentDetails.receiptId) {
      throw new Error("Receipt ID not found in payment details");
    }
    const defaultLogo = "/assests/receipt/logos/default-logo.webp";
    const Logo = await getBase64FromUrl(defaultLogo);
    const doc = new jsPDF();
    doc.addImage(Logo, "PNG", 70, 10, 80, 20);
    doc.setFontSize(10);
    const companyInfo = [
      "Your Institute Name",
      "Address Line 1, Address Line 2",
      "City, State - PIN Code",
      "Phone: +91-XXXXXXXXXX | Email: info@yourinstitute.com"
    ];
    companyInfo.forEach((line, index) => {
      doc.text(line, 105, 33 + index * 6.5, { align: "center" });
    });
    doc.setFontSize(13);
    const lineY = 26 + companyInfo.length * 7 + 5;
    doc.line(24, lineY, 190, lineY);
    doc.text("Payment Receipt", 105, lineY + 7, { align: "center", fontWeight: "900" });
    doc.setFontSize(10);
    const paidDate = new Date(currentPaymentDetails.paidDate);
    const day = String(paidDate.getDate()).padStart(2, "0");
    const month = String(paidDate.getMonth() + 1).padStart(2, "0");
    const year = paidDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    doc.text(`Date: ${formattedDate}`, 155, lineY + 7);
    let currentY = lineY + 20;
    doc.setFontSize(10);
    doc.text(`Receipt No:`, 30, currentY);
    doc.text(`${currentPaymentDetails.receiptId}`, 80, currentY);
    doc.text(`Student Name: `, 30, currentY + 5);
    doc.text(`${selectedCandidate2.fName || ""} ${selectedCandidate2.lName || ""}`, 80, currentY + 5);
    doc.text(`Registration Number:`, 30, currentY + 10);
    doc.text(`${selectedCandidate2.regid || "N/A"}`, 80, currentY + 10);
    doc.text(`Course: `, 30, currentY + 15);
    doc.text(`${selectedCandidate2.courseName || "N/A"}`, 80, currentY + 15);
    doc.text(`Course Fee: ${selectedCandidate2.offeredFee || selectedCandidate2.courseFee || "0"}.00/-`, 30, currentY + 25);
    const amountInWords = toWords(currentPaymentDetails.paidAmount || 0);
    const capitalized = amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1);
    doc.setFontSize(10);
    const columns = ["Sl No", "Description", "Amount"];
    const columns1 = ["Sl No", "Bank", "DD/RTGS/NEFT", "Date", "Amount"];
    const rows = [
      [1, "Paid Course Fee", `${currentPaymentDetails.paidAmount || 0}.00/-`],
      [
        { content: "Total", colSpan: 2, styles: { halign: "right" } },
        `${currentPaymentDetails.paidAmount || 0}.00/-`
      ]
    ];
    const modeofpayment = currentPaymentDetails.paymentMode || (currentPaymentDetails.receivedBy ? "Cash" : "Online");
    const rows1 = [
      [
        1,
        `${modeofpayment}`,
        `${currentPaymentDetails.transactionId || "N/A"}`,
        `${formattedDate}`,
        `${currentPaymentDetails.paidAmount || 0}.00/-`
      ],
      [
        { content: "Total", colSpan: 4, styles: { halign: "right" } },
        `${currentPaymentDetails.paidAmount || 0}.00/-`
      ],
      [
        { content: "Amount In Words:", colSpan: 2, styles: { halign: "right" } },
        { content: `${capitalized} Rupees Only`, colSpan: 3 }
      ]
    ];
    doc.text(`Fee Type: ${selectedCandidate2.feeType === "Single" ? "Full Payment" : "Installment"}`, 30, currentY + 30);
    if (selectedCandidate2.feeType === "Installment") {
      doc.text(`Installment: ${currentInstallmentIndex2 + 1}`, 30, currentY + 35);
    }
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: currentY + 40,
      theme: "grid",
      color: "black",
      styles: { fontSize: 10, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: "black" },
      margin: { top: 10, left: 30, right: 30 }
    });
    doc.setFontSize(12);
    doc.text("Payment Details", 30, doc.lastAutoTable.finalY + 10, { underline: true });
    doc.setFontSize(10);
    autoTable(doc, {
      head: [columns1],
      body: rows1,
      startY: doc.lastAutoTable.finalY + 15,
      theme: "grid",
      color: "black",
      styles: { fontSize: 10, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: "black" },
      margin: { top: 10, left: 30, right: 30 }
    });
    const marginLeft = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const wrapWidth = pageWidth - marginLeft * 2;
    doc.text("Note", marginLeft, doc.lastAutoTable.finalY + 10, { underline: true });
    const notes = [
      "1. Students are requested to pay full course fee",
      "2. After 50% payment only we will issue course related work books",
      "3. After 100% payment only we will issue course related Reference books",
      "4. Course fee once paid cannot be refunded after the commencement of the course.",
      "5. If you fail to clear your fee due in time, you will get additional extra charge.",
      "6. I have read the Terms & Conditions and hereby confirm having accepted them."
    ];
    let y = doc.lastAutoTable.finalY + 15;
    notes.forEach((note) => {
      const splitNote = doc.splitTextToSize(note, wrapWidth);
      doc.text(splitNote, marginLeft, y);
      y += splitNote.length * 5;
    });
    doc.setFontSize(10);
    doc.text("Thank you for your payment!", 105, 270, { align: "center" });
    doc.text("Authorized Signature", 185, 265, { align: "right" });
    doc.line(20, 273, 190, 273);
    doc.text("This receipt is computer generated", 105, 277, { align: "center" });
    return doc;
  };
  const handleDownloadReceipt = async () => {
    if (currentReceiptDetails) {
      try {
        const doc = await generateReceipt(selectedCandidate, currentInstallmentIndex);
        doc.save(`Receipt_${selectedCandidate.fName}_${selectedCandidate.lName}.pdf`);
      } catch (error) {
        console.error("Error generating receipt:", error);
        alert("Error generating receipt: " + error.message);
      }
    }
  };
  const handlePrintReceipt = async () => {
    if (currentReceiptDetails) {
      try {
        const doc = await generateReceipt(selectedCandidate, currentInstallmentIndex);
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = pdfUrl;
        document.body.appendChild(iframe);
        iframe.onload = function() {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        };
      } catch (error) {
        console.error("Error printing receipt:", error);
        alert("Error printing receipt: " + error.message);
      }
    }
  };
  const renderReceiptPreviewModal = () => {
    if (!isReceiptPreviewOpen) return null;
    if (!currentReceiptDetails || !currentReceiptDetails.paidAmount) {
      return /* @__PURE__ */ jsx("div", { className: "modal fade show", style: { display: "block", backgroundColor: "rgba(0,0,0,0.5)" }, children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-lg", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
          /* @__PURE__ */ jsx("h5", { className: "modal-title", children: "Receipt Preview" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "btn-close",
              onClick: () => {
                setIsReceiptPreviewOpen(false);
                setCurrentReceiptDetails(null);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "modal-body text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "spinner-border", role: "status", children: /* @__PURE__ */ jsx("span", { className: "visually-hidden", children: "Loading..." }) }),
          /* @__PURE__ */ jsx("p", { children: "Loading receipt details..." })
        ] })
      ] }) }) });
    }
    return /* @__PURE__ */ jsx("div", { className: "modal fade show", style: { display: "block", backgroundColor: "rgba(0,0,0,0.5)" }, children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-lg", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("h5", { className: "modal-title", children: "Receipt Preview" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn-close",
            onClick: () => {
              setIsReceiptPreviewOpen(false);
              setCurrentReceiptDetails(null);
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "modal-body", children: /* @__PURE__ */ jsx("div", { className: "receipt-preview p-4 border", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 text-center mb-4", children: /* @__PURE__ */ jsx("h3", { children: "Payment Receipt" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("h5", { children: "Student Details" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Name:" }),
            " ",
            selectedCandidate.fName,
            " ",
            selectedCandidate.lName
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Course:" }),
            " ",
            selectedCandidate.courseName
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Total Fee:" }),
            " ₹",
            selectedCandidate.offeredFee
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("h5", { children: "Payment Information" }),
          /* @__PURE__ */ jsx("br", {}),
          selectedCandidate.feeType === "Installment" && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Installment:" }),
            " ",
            currentInstallmentIndex + 1
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Amount Paid:" }),
            " ₹",
            currentReceiptDetails.paidAmount
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Payment Date:" }),
            " ",
            currentReceiptDetails.paidDate
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Received By:" }),
            " ",
            currentReceiptDetails.receivedBy
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-outline-secondary col-xl-1", onClick: handlePrintReceipt, children: /* @__PURE__ */ jsx("i", { className: "fas fa-print" }) }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-outline-primary col-xl-1", onClick: handleDownloadReceipt, children: /* @__PURE__ */ jsx("i", { className: "fas fa-download" }) })
      ] })
    ] }) }) });
  };
  const renderPaymentForm = () => {
    if (!isRecordingPayment) return null;
    const currentInstallment = selectedCandidate.feeType === "Single" ? null : selectedCandidate.paymentsPlan[currentInstallmentIndex];
    const dueAmount = selectedCandidate.feeType === "Single" ? selectedCandidate.offeredFee : currentInstallment.amount;
    const dueDate = selectedCandidate.feeType === "Single" ? null : currentInstallment.dueDate;
    return /* @__PURE__ */ jsxs("div", { className: "payment-form mt-4 border p-3 bg-light", children: [
      /* @__PURE__ */ jsx("h5", { className: "mb-3", children: selectedCandidate.feeType === "Single" ? "Record Full Payment" : `Record Payment for Installment ${currentInstallmentIndex + 1}` }),
      /* @__PURE__ */ jsxs("div", { className: "alert alert-info mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("strong", { children: [
            "Due Amount: ₹",
            dueAmount
          ] }) }),
          dueDate && /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              "Due Date: ",
              new Date(dueDate).toLocaleDateString()
            ] }),
            new Date(dueDate) < /* @__PURE__ */ new Date() && /* @__PURE__ */ jsx("span", { className: "badge bg-danger ms-2", children: "Overdue" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("small", { className: "text-muted d-block mt-2", children: "You can pay partial amount (less than due) or excess amount (more than due)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row g-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Due Amount:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              value: dueAmount,
              readOnly: true,
              style: { backgroundColor: "#f8f9fa" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Paying Amount: *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              name: "amount",
              value: paymentDetails.amount,
              onChange: handlePaymentDetailsChange,
              min: "0",
              step: "0.01",
              placeholder: "Enter amount to pay",
              required: true
            }
          ),
          paymentDetails.amount && paymentDetails.amount !== dueAmount && /* @__PURE__ */ jsx(
            "small",
            {
              className: `mt-1 d-block ${paymentDetails.amount > dueAmount ? "text-success" : "text-warning"}`,
              children: paymentDetails.amount > dueAmount ? `Excess: ₹${(paymentDetails.amount - dueAmount).toFixed(2)} (will adjust next installments)` : `Shortfall: ₹${(dueAmount - paymentDetails.amount).toFixed(2)} (will be added to next installment)`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Received By:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "form-control",
              name: "receivedBy",
              value: paymentDetails.receivedBy,
              onChange: handlePaymentDetailsChange,
              placeholder: "Enter name of staff receiving payment",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Payment Mode:" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "form-control",
              name: "paymentMode",
              value: paymentDetails.paymentMode,
              onChange: handlePaymentDetailsChange,
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select Payment Mode" }),
                /* @__PURE__ */ jsx("option", { value: "Cash", children: "Cash" }),
                /* @__PURE__ */ jsx("option", { value: "UPI", children: "UPI" }),
                /* @__PURE__ */ jsx("option", { value: "BankTransfer", children: "Bank Transfer" }),
                /* @__PURE__ */ jsx("option", { value: "Cheque", children: "Cheque" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-12", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Transaction ID:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "form-control",
              name: "transactionId",
              value: paymentDetails.transactionId,
              onChange: handlePaymentDetailsChange,
              placeholder: "Enter transaction ID (optional for cash payments)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card-footer row justify-content-between", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "col-xl-3 btn btn-secondary me-2",
              onClick: () => setIsRecordingPayment(false),
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-times" }),
                " Cancel"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "col-xl-3 btn btn-success me-2",
              onClick: handleSubmitPayment,
              disabled: !paymentDetails.amount || !paymentDetails.receivedBy || !paymentDetails.paymentMode,
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-save" }),
                " Save Payment"
              ]
            }
          )
        ] })
      ] })
    ] });
  };
  const handlePaymentDetailsChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "receiptDocument" && files && files[0]) {
      setPaymentDetails({
        ...paymentDetails,
        receiptDocument: files[0]
      });
    } else if (name === "amount") {
      const amount = parseFloat(value) || 0;
      setPaymentDetails({
        ...paymentDetails,
        [name]: amount
      });
    } else {
      setPaymentDetails({
        ...paymentDetails,
        [name]: value
      });
    }
  };
  const handleShowPaymentForm = (index = 0) => {
    const dueAmount = selectedCandidate.feeType === "Single" ? selectedCandidate.offeredFee : selectedCandidate.paymentsPlan[index].amount;
    setPaymentDetails({
      amount: dueAmount,
      transactionId: "",
      receivedBy: "",
      receiptDocument: null,
      paymentMode: ""
    });
    setCurrentInstallmentIndex(index);
    setIsRecordingPayment(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRecordingPayment(false);
    setCurrentInstallmentIndex(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "page-header", children: /* @__PURE__ */ jsx("div", { className: "row align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsx("h3", { children: "Fee Invoice Management" }) }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "form-control",
          placeholder: "Search by name, course, registration ID, fee...",
          value: searchTerm,
          onChange: handleSearch
        }
      ) }) }),
      /* @__PURE__ */ jsxs("table", { className: "table table-bordered mt-3", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "col", children: "Registration ID" }),
          /* @__PURE__ */ jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsx("th", { children: "Course" }),
          /* @__PURE__ */ jsx("th", { children: "Total Fee" }),
          /* @__PURE__ */ jsx("th", { children: "Fee Type" }),
          /* @__PURE__ */ jsx("th", { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: currentItems.length > 0 ? currentItems.map((registration) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "row", children: registration.regid }),
          /* @__PURE__ */ jsxs("td", { children: [
            registration.fName,
            " ",
            registration.lName
          ] }),
          /* @__PURE__ */ jsx("td", { children: registration.courseName }),
          /* @__PURE__ */ jsxs("td", { children: [
            "₹",
            registration.offeredFee
          ] }),
          /* @__PURE__ */ jsx("td", { children: registration.feeType === "Single" ? "Full Payment" : "Installment" }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-sm btn-primary",
              onClick: () => fetchCandidateDetails(registration._id),
              children: "View Payment Details"
            }
          ) })
        ] }, registration._id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "6", className: "text-center", children: "No registrations found." }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "row mt-1", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Page navigation", children: /* @__PURE__ */ jsxs("ul", { className: "pagination justify-content-left", children: [
        /* @__PURE__ */ jsx("li", { className: `page-item ${currentPage === 1 ? "disabled" : ""}`, children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "page-link",
            onClick: () => paginate(currentPage - 1),
            disabled: currentPage === 1,
            children: /* @__PURE__ */ jsx("i", { className: "fas fa-angle-double-left" })
          }
        ) }),
        [...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          if (pageNum === 1 || pageNum === totalPages || pageNum >= currentPage - 1 && pageNum <= currentPage + 1) {
            return /* @__PURE__ */ jsx(
              "li",
              {
                className: `page-item ${currentPage === pageNum ? "active" : ""}`,
                children: /* @__PURE__ */ jsx("button", { className: "page-link", onClick: () => setCurrentPage(pageNum), children: pageNum })
              },
              i
            );
          } else if (pageNum === currentPage - 2 && currentPage > 3 || pageNum === currentPage + 2 && currentPage < totalPages - 2) {
            return /* @__PURE__ */ jsx("li", { className: "page-item", children: /* @__PURE__ */ jsx("button", { className: "page-link", children: /* @__PURE__ */ jsx("i", { className: "fas fa-ellipsis-h" }) }) }, i);
          }
          return null;
        }),
        /* @__PURE__ */ jsx("li", { className: `page-item ${currentPage === totalPages ? "disabled" : ""}`, children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "page-link",
            onClick: () => paginate(currentPage + 1),
            disabled: currentPage === totalPages,
            children: /* @__PURE__ */ jsx("i", { className: "fas fa-angle-double-right" })
          }
        ) })
      ] }) }) }) })
    ] }) }),
    isModalOpen && selectedCandidate && /* @__PURE__ */ jsx(
      "div",
      {
        className: "modal fade show",
        style: { display: "block", backgroundColor: "rgba(0,0,0,0.5)" },
        children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-xl", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ jsxs("h5", { className: "modal-title", children: [
              "Payment Details - ",
              selectedCandidate.fName,
              " ",
              selectedCandidate.lName
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "btn-close custom-btn-close border p-1 me-0 text-dark",
                onClick: handleCloseModal,
                children: /* @__PURE__ */ jsx("i", { className: "ti ti-x" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
                /* @__PURE__ */ jsx("strong", { children: "Course:" }),
                " ",
                selectedCandidate.courseName
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
                /* @__PURE__ */ jsx("strong", { children: "Total Fee:" }),
                " ₹",
                selectedCandidate.offeredFee
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
                /* @__PURE__ */ jsx("strong", { children: "Fee Type:" }),
                " ",
                selectedCandidate.feeType === "Single" ? "Full Payment" : "Installment"
              ] })
            ] }),
            /* @__PURE__ */ jsx("h6", { className: "mt-3 mb-3", children: "Payment Plan" }),
            generatePaymentRows(),
            renderPaymentForm()
          ] })
        ] }) })
      }
    ),
    renderReceiptPreviewModal()
  ] });
};
export {
  FeeInvoiceGeneration as default
};
