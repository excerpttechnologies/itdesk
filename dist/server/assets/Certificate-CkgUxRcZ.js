import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
const StudentCertificatePage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [modalData, setModalData] = useState({
    certificateGrade: "",
    awardedDate: "",
    trainingcenter: "Mahadevapura, Bengaluru"
  });
  const [actionType, setActionType] = useState("");
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/new/registrations");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch student data");
      setLoading(false);
    }
  };
  const getCourseNames = (courseIds) => {
    if (!courseIds || courseIds.length === 0) return "";
    if (Array.isArray(courseIds)) {
      const names = courseIds.map((course) => {
        if (typeof course === "object" && course !== null && course.CourseName) {
          return course.CourseName;
        }
        return null;
      }).filter((name) => name !== null);
      return names.length > 0 ? names.join(", ") : "";
    }
    return "";
  };
  const formatCourseDuration = (courseIds) => {
    if (!courseIds || courseIds.length === 0) return "N/A";
    if (Array.isArray(courseIds)) {
      const durations = courseIds.map((course) => {
        if (typeof course === "object" && course !== null) {
          if (course.duration && course.duration.value && course.duration.value > 0) {
            return `${course.duration.value} ${course.duration.unit || "Months"}`;
          }
          return "Duration not set";
        }
        return "Course not populated";
      }).filter((duration) => duration !== "Course not populated");
      return durations.length > 0 ? durations.join(", ") : "N/A";
    }
    return "N/A";
  };
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    const courseName = getCourseNames(student.courseIds) || student.courseName || "";
    const subjectNames = student.selectedSubjects && student.selectedSubjects.length > 0 ? student.selectedSubjects.map((subject) => subject.SubjectName).join(", ") : "";
    const duration = formatCourseDuration(student.courseIds);
    const awardedDate = student.awardedDate ? new Date(student.awardedDate).toLocaleDateString() : "";
    return student.regid?.toLowerCase().includes(searchLower) || `${student.fName} ${student.lName}`.toLowerCase().includes(searchLower) || courseName.toLowerCase().includes(searchLower) || duration.toLowerCase().includes(searchLower) || subjectNames.toLowerCase().includes(searchLower) || student.Grade?.toLowerCase().includes(searchLower) || student.certificateGrade?.toLowerCase().includes(searchLower) || awardedDate.includes(searchLower) || student.guardianName?.toLowerCase().includes(searchLower);
  });
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const checkCertificateDetails = (student, action) => {
    if (!student.awardedDate || !student.certificateGrade) {
      setCurrentStudent(student);
      setActionType(action);
      setModalData({
        certificateGrade: student.certificateGrade || "",
        awardedDate: student.awardedDate ? new Date(student.awardedDate).toISOString().split("T")[0] : "",
        trainingcenter: student.trainingcenter || "Mahadevapura, Bengaluru"
      });
      setShowModal(true);
    } else {
      if (action === "preview") {
        generateCertificate(student);
      } else if (action === "download") {
        downloadCertificate(student);
      }
    }
  };
  const handleModalSubmit = async () => {
    try {
      if (!modalData.certificateGrade || !modalData.awardedDate) {
        alert("Please fill in both fields");
        return;
      }
      const response = await fetch(`/api/student/certificate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          regid: currentStudent.regid,
          // Pass regid in body instead of URL
          certificateGrade: modalData.certificateGrade,
          awardedDate: modalData.awardedDate,
          trainingcenter: modalData.trainingcenter
        })
      });
      if (!response.ok) {
        throw new Error("Failed to update certificate details");
      }
      setStudents((prev) => prev.map(
        (student) => student.regid === currentStudent.regid ? { ...student, certificateGrade: modalData.certificateGrade, awardedDate: modalData.awardedDate } : student
      ));
      setShowModal(false);
      const updatedStudent = {
        ...currentStudent,
        certificateGrade: modalData.certificateGrade,
        awardedDate: modalData.awardedDate
      };
      if (actionType === "preview") {
        generateCertificate(updatedStudent);
      } else if (actionType === "download") {
        downloadCertificate(updatedStudent);
      }
    } catch (error2) {
      console.error("Error updating certificate details:", error2);
      alert("Error updating certificate details. Please try again.");
    }
  };
  const loadPDFLib = async () => {
    if (window.PDFLib) {
      return window.PDFLib;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
      script.onload = () => {
        if (window.PDFLib) {
          resolve(window.PDFLib);
        } else {
          reject(new Error("PDF-lib failed to load"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDF-lib script"));
      document.head.appendChild(script);
      setTimeout(() => reject(new Error("PDF-lib loading timeout")), 1e4);
    });
  };
  const generateCertificate = async (student) => {
    setGeneratingCertificate(true);
    try {
      const PDFLib = await loadPDFLib();
      const { PDFDocument, rgb } = PDFLib;
      const response = await fetch("/certificate6.pdf");
      if (!response.ok) {
        throw new Error("Certificate template not found");
      }
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const helveticaBold = await pdfDoc.embedFont("Helvetica-Bold");
      const helvetica = await pdfDoc.embedFont("Helvetica");
      console.log("Original student.regid:", student.regid);
      const qrText = `https://excerptech.com/trainings#${student.regid}`;
      const qrDataUrl = await QRCode.toDataURL(qrText);
      const qrImageBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
      const qrImage = await pdfDoc.embedPng(qrImageBytes);
      const qrDims = qrImage.scale(0.5);
      firstPage.drawImage(qrImage, {
        x: width - 380,
        y: 10,
        width: qrDims.width,
        height: qrDims.height
      });
      const toCamelCase = (text) => {
        if (!text) return "";
        return text.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
      };
      firstPage.drawText(`${student.fName.toUpperCase()} ${student.lName.toUpperCase()}`, {
        x: width / 2 - 205,
        y: height - 285,
        size: 18,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      if (student.guardianName) {
        firstPage.drawText(` ${toCamelCase(student.guardianName)}`, {
          x: width / 2 + 130,
          y: height - 285,
          size: 16,
          color: rgb(0, 0, 0),
          font: helvetica
        });
      }
      const courseName = getCourseNames(student.courseIds) || student.courseName || "Course Name";
      firstPage.drawText(toCamelCase(courseName), {
        x: width / 2 - 205,
        y: height - 330,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      const courseDuration = formatCourseDuration(student.courseIds);
      firstPage.drawText(` ${courseDuration}`, {
        x: width / 2 + 130,
        y: height - 330,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      const subjectNames = student.selectedSubjects && student.selectedSubjects.length > 0 ? student.selectedSubjects.map((subject) => toCamelCase(subject.SubjectName)).join(", ") : "No Subjects Specified";
      firstPage.drawText(`${subjectNames}`, {
        x: width / 2 - 205,
        y: height - 375,
        size: 14,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${new Date(student.awardedDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}`, {
        x: width / 2 + 130,
        y: height - 375,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.trainingcenter)}`, {
        x: width / 2 - 210,
        y: height - 422,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.certificateGrade)}`, {
        x: width / 2 + 130,
        y: height - 422,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(`:${student.regid}`, {
        x: width / 2 - 75,
        y: height - 680,
        size: 12,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      firstPage.drawText(` ${student.regid}`, {
        x: width / 2 - 70,
        y: height - 493,
        size: 12,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setCertificatePreview(url);
    } catch (error2) {
      console.error("Error generating certificate:", error2);
      alert("Error generating certificate. Please try again.");
    } finally {
      setGeneratingCertificate(false);
    }
  };
  const downloadCertificate = async (student) => {
    try {
      const PDFLib = await loadPDFLib();
      const { PDFDocument, rgb } = PDFLib;
      const response = await fetch("/certificate6.pdf");
      if (!response.ok) {
        console.log("response", response);
        throw new Error("Certificate template not found. Please ensure certificate6.pdf is in the public folder.");
      }
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const helveticaBold = await pdfDoc.embedFont("Helvetica-Bold");
      const helvetica = await pdfDoc.embedFont("Helvetica");
      console.log("Original student.regid:", student.regid);
      const qrText = `https://excerptech.com/trainings#${student.regid}`;
      const qrDataUrl = await QRCode.toDataURL(qrText);
      const qrImageBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
      const qrImage = await pdfDoc.embedPng(qrImageBytes);
      const qrDims = qrImage.scale(0.5);
      firstPage.drawImage(qrImage, {
        x: width - 380,
        y: 10,
        width: qrDims.width,
        height: qrDims.height
      });
      const toCamelCase = (text) => {
        if (!text) return "";
        return text.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
      };
      firstPage.drawText(`${student.fName.toUpperCase()} ${student.lName.toUpperCase()}`, {
        x: width / 2 - 205,
        y: height - 285,
        size: 18,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      if (student.guardianName) {
        firstPage.drawText(` ${toCamelCase(student.guardianName)}`, {
          x: width / 2 + 130,
          y: height - 285,
          size: 16,
          color: rgb(0, 0, 0),
          font: helvetica
        });
      }
      const courseName = getCourseNames(student.courseIds) || student.courseName || "Course Name";
      firstPage.drawText(toCamelCase(courseName), {
        x: width / 2 - 205,
        y: height - 330,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      const courseDuration = formatCourseDuration(student.courseIds);
      firstPage.drawText(` ${courseDuration}`, {
        x: width / 2 + 130,
        y: height - 330,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      const subjectNames = student.selectedSubjects && student.selectedSubjects.length > 0 ? student.selectedSubjects.map((subject) => toCamelCase(subject.SubjectName)).join(", ") : "No Subjects Specified";
      firstPage.drawText(`${subjectNames}`, {
        x: width / 2 - 205,
        y: height - 375,
        size: 14,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${new Date(student.awardedDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}`, {
        x: width / 2 + 130,
        y: height - 375,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.trainingcenter)}`, {
        x: width / 2 - 210,
        y: height - 422,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.certificateGrade)}`, {
        x: width / 2 + 130,
        y: height - 422,
        size: 16,
        color: rgb(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(`:${student.regid}`, {
        x: width / 2 - 75,
        y: height - 680,
        size: 12,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      firstPage.drawText(` ${student.regid}`, {
        x: width / 2 - 70,
        y: height - 493,
        size: 12,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      firstPage.drawText(` ${student.regid}`, {
        x: width / 2 - 70,
        y: height - 493,
        size: 12,
        color: rgb(0, 0, 0),
        font: helveticaBold
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate_${student.fName}_${student.lName}_${student.regid}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error2) {
      console.error("Error downloading certificate:", error2);
      alert("Error downloading certificate. Please try again.");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-center align-items-center", style: { minHeight: "100vh" }, children: /* @__PURE__ */ jsx("div", { className: "spinner-border text-primary", role: "status", children: /* @__PURE__ */ jsx("span", { className: "visually-hidden", children: "Loading..." }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "container-fluid d-flex align-items-center justify-content-center", style: { minHeight: "100vh" }, children: /* @__PURE__ */ jsxs("div", { className: "alert alert-danger", children: [
      /* @__PURE__ */ jsx("h4", { children: "Error!" }),
      /* @__PURE__ */ jsx("p", { children: error })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container-fluid px-4", style: { maxWidth: "100%" }, children: [
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("h1", { className: "mb-4 text-dark fw-bold", children: "Student Certificates" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("div", { className: "card-header bg-primary text-white", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("h5", { className: "card-title mb-0", children: "Students List" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsx("span", { className: "input-group-text bg-white", children: /* @__PURE__ */ jsx("i", { className: "fas fa-search" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "form-control",
              placeholder: "Search by name, reg ID, course, grade...",
              value: searchTerm,
              onChange: handleSearchChange
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "card-body p-0", children: [
        /* @__PURE__ */ jsx("div", { className: "px-3 py-2 bg-light border-bottom", children: /* @__PURE__ */ jsxs("small", { className: "text-muted", children: [
          "Showing ",
          currentStudents.length,
          " of ",
          filteredStudents.length,
          " students",
          searchTerm && ` (filtered from ${students.length} total)`
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-hover table-striped mb-0", children: [
          /* @__PURE__ */ jsx("thead", { className: "table-dark sticky-top", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { style: { minWidth: "80px" }, children: "Reg ID" }),
            /* @__PURE__ */ jsx("th", { style: { minWidth: "150px" }, children: "Name" }),
            /* @__PURE__ */ jsx("th", { style: { minWidth: "150px" }, children: "Course" }),
            /* @__PURE__ */ jsx("th", { style: { minWidth: "100px" }, children: "Duration" }),
            /* @__PURE__ */ jsx("th", { style: { minWidth: "200px" }, children: "Subjects" }),
            /* @__PURE__ */ jsx("th", { style: { minWidth: "120px" }, children: "Certificate Grade" }),
            /* @__PURE__ */ jsx("th", { style: { minWidth: "120px" }, children: "Awarded Date" }),
            /* @__PURE__ */ jsx("th", { children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: currentStudents.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "9", className: "text-center py-4", children: searchTerm ? "No students found matching your search." : "No students available." }) }) : currentStudents.map((student) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "fw-semibold", children: student.regid }),
            /* @__PURE__ */ jsxs("td", { children: [
              student.fName,
              " ",
              student.lName
            ] }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("div", { className: "text-truncate", style: { maxWidth: "150px" }, title: getCourseNames(student.courseIds) || student.courseName, children: getCourseNames(student.courseIds) || student.courseName }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("small", { className: "text-muted", children: formatCourseDuration(student.courseIds) }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("div", { className: "text-truncate", style: { maxWidth: "200px" }, children: /* @__PURE__ */ jsx("small", { className: "text-muted", children: student.selectedSubjects && student.selectedSubjects.length > 0 ? student.selectedSubjects.map((subject) => subject.SubjectName).join(", ") : "No subjects" }) }) }),
            /* @__PURE__ */ jsx("td", { children: student.certificateGrade ? /* @__PURE__ */ jsx("span", { className: "badge bg-info", children: student.certificateGrade }) : /* @__PURE__ */ jsx("span", { className: "badge bg-secondary", children: "Not Set" }) }),
            /* @__PURE__ */ jsx("td", { children: student.awardedDate ? /* @__PURE__ */ jsx("span", { className: "text-nowrap", children: new Date(student.awardedDate).toLocaleDateString() }) : /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Not Set" }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn",
                  onClick: () => checkCertificateDetails(student, "preview"),
                  disabled: generatingCertificate,
                  title: "Preview Certificate",
                  children: generatingCertificate ? /* @__PURE__ */ jsx("span", { className: "fas fa-eye", role: "status" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-eye me-1" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn ",
                  onClick: () => checkCertificateDetails(student, "download"),
                  title: "Download Certificate",
                  children: /* @__PURE__ */ jsx("i", { className: "fas fa-download me-1" })
                }
              )
            ] }) })
          ] }, student._id)) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "px-3 py-3 bg-light border-top", children: [
          /* @__PURE__ */ jsx("nav", { "aria-label": "Students pagination", children: /* @__PURE__ */ jsxs("ul", { className: "pagination pagination-sm justify-content-center mb-0", children: [
            /* @__PURE__ */ jsx("li", { className: `page-item ${currentPage === 1 ? "disabled" : ""}`, children: /* @__PURE__ */ jsx(
              "button",
              {
                className: "page-link",
                onClick: () => handlePageChange(currentPage - 1),
                disabled: currentPage === 1,
                children: "Previous"
              }
            ) }),
            [...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber === 1 || pageNumber === totalPages || pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) {
                return /* @__PURE__ */ jsx("li", { className: `page-item ${currentPage === pageNumber ? "active" : ""}`, children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "page-link",
                    onClick: () => handlePageChange(pageNumber),
                    children: pageNumber
                  }
                ) }, pageNumber);
              } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                return /* @__PURE__ */ jsx("li", { className: "page-item disabled", children: /* @__PURE__ */ jsx("span", { className: "page-link", children: "..." }) }, pageNumber);
              }
              return null;
            }),
            /* @__PURE__ */ jsx("li", { className: `page-item ${currentPage === totalPages ? "disabled" : ""}`, children: /* @__PURE__ */ jsx(
              "button",
              {
                className: "page-link",
                onClick: () => handlePageChange(currentPage + 1),
                disabled: currentPage === totalPages,
                children: "Next"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "text-center mt-2", children: /* @__PURE__ */ jsxs("small", { className: "text-muted", children: [
            "Page ",
            currentPage,
            " of ",
            totalPages,
            " (",
            filteredStudents.length,
            " total students)"
          ] }) })
        ] })
      ] })
    ] }) }),
    certificatePreview && /* @__PURE__ */ jsx("div", { className: "modal show d-block", tabIndex: "-1", style: { backgroundColor: "rgba(0,0,0,0.5)" }, children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-xl modal-dialog-centered", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("h5", { className: "modal-title", children: "Certificate Preview" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn-close",
            onClick: () => setCertificatePreview(null)
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "modal-body p-0", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: certificatePreview,
          width: "100%",
          height: "600px",
          style: { border: "none" },
          title: "Certificate Preview"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "modal-footer", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-secondary",
          onClick: () => setCertificatePreview(null),
          children: "Close"
        }
      ) })
    ] }) }) }),
    showModal && /* @__PURE__ */ jsx("div", { className: "modal show d-block", tabIndex: "-1", style: { backgroundColor: "rgba(0,0,0,0.5)" }, children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("h5", { className: "modal-title", children: "Certificate Details Required" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn-close",
            onClick: () => setShowModal(false)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
          "Please enter the certificate details for ",
          /* @__PURE__ */ jsxs("strong", { children: [
            currentStudent?.fName,
            " ",
            currentStudent?.lName
          ] }),
          ":"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "certificateGrade", className: "form-label", children: "Certificate Grade" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "form-select",
                id: "certificateGrade",
                value: modalData.certificateGrade,
                onChange: (e) => setModalData((prev) => ({ ...prev, certificateGrade: e.target.value })),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Grade" }),
                  /* @__PURE__ */ jsx("option", { value: "A+", children: "A+" }),
                  /* @__PURE__ */ jsx("option", { value: "A", children: "A" }),
                  /* @__PURE__ */ jsx("option", { value: "B+", children: "B+" }),
                  /* @__PURE__ */ jsx("option", { value: "B", children: "B" }),
                  /* @__PURE__ */ jsx("option", { value: "C", children: "C" }),
                  /* @__PURE__ */ jsx("option", { value: "Excellent", children: "Excellent" }),
                  /* @__PURE__ */ jsx("option", { value: "Good", children: "Good" }),
                  /* @__PURE__ */ jsx("option", { value: "Satisfactory", children: "Satisfactory" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "awardedDate", className: "form-label", children: "Awarded Date" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                className: "form-control",
                id: "awardedDate",
                value: modalData.awardedDate,
                onChange: (e) => setModalData((prev) => ({ ...prev, awardedDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "trainingcenter", className: "form-label", children: "Training Center" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "form-control",
                id: "trainingcenter",
                value: modalData.trainingcenter,
                onChange: (e) => setModalData((prev) => ({ ...prev, trainingcenter: e.target.value }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn btn-secondary",
            onClick: () => setShowModal(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn btn-primary",
            onClick: handleModalSubmit,
            children: "Save & Continue"
          }
        )
      ] })
    ] }) }) })
  ] });
};
export {
  StudentCertificatePage as default
};
