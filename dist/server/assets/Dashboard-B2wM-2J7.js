import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CertificateGenerator from "./CertificateGenerator-B-fe1ylN.js";
import axios from "axios";
import { PDFDocument, rgb, TextAlignment } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import "qrcode";
import "prop-types";
function Certificate$1({ NAME, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, coursecertificatr, GENDER, Role }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCollegeName, setSelectedCollegeName] = useState("");
  const [selectedYOP, setSelectedYOP] = useState("");
  const [selectedCertificateType, setSelectedCertificateType] = useState("");
  const [selectedCourseCertificateType, setSelectedCourseCertificateType] = useState("");
  const [collegeNames, setCollegeNames] = useState([]);
  const [yopList, setYOPList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRegNo, setSelectedRegNo] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [enteredDates, setEnteredDates] = useState({});
  const handleGetCertificate = (student) => {
    setEnteredDates((prevState) => ({
      ...prevState,
      [student.REG_NO]: ""
      // Initialize the date for the specific student
    }));
  };
  const handleChange = (event, regNo) => {
    const { value } = event.target;
    setEnteredDates((prevState) => ({
      ...prevState,
      [regNo]: value
      // Update the date for the specific student
    }));
  };
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
      const uniqueCollegeNames = [...new Set(response.data.map((student) => student.college_name))];
      setCollegeNames(uniqueCollegeNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    filterStudents(selectedCollegeName, selectedYOP, searchText, selectedRegNo);
  }, [students, selectedCollegeName, selectedYOP, searchText, selectedRegNo]);
  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    setSelectedCollegeName(selectedCollege);
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleRegNoChange = (e) => {
    setSelectedRegNo(e.target.value);
  };
  const filterStudents = (collegeName, yop2, searchText2, regNo) => {
    let filtered = students;
    if (collegeName) {
      filtered = filtered.filter((student) => student.college_name.toLowerCase() === collegeName.toLowerCase());
    }
    if (searchText2) {
      const searchLowerCase = searchText2.toLowerCase();
      filtered = filtered.filter(
        (student) => student.NAME.toLowerCase().includes(searchLowerCase) || student.REG_NO.toLowerCase().includes(searchLowerCase) || student.FATHER_NAME.toLowerCase().includes(searchLowerCase) || student.coursename.toLowerCase().includes(searchLowerCase) || student.certificate_type.toLowerCase().includes(searchLowerCase)
      );
    }
    if (regNo) {
      filtered = filtered.filter((student) => student.REG_NO === regNo);
    }
    filtered.sort((a, b) => a.NAME.localeCompare(b.NAME));
    setFilteredStudents(filtered);
  };
  const capitalize = (str, lower = false) => {
    return (lower ? str.toLowerCase() : str).replace(
      /(?:^|\s|["'([{])+\S/g,
      (match) => match.toUpperCase()
    );
  };
  const getLines = (text, maxWidth, font, fontSize) => {
    const paragraphs = text.split("\n");
    let lines = [];
    let y = 210;
    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(" ");
      let currentLine = "";
      for (let word of words) {
        const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
        if (width > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = word;
        } else {
          currentLine += " " + word;
        }
      }
      if (currentLine !== "") {
        lines.push(currentLine.trim());
      }
    });
    return { lines, y };
  };
  useEffect(() => {
    filterStudents(selectedCollegeName, selectedYOP, searchText, selectedRegNo);
  }, [students, selectedCollegeName, selectedYOP, searchText, selectedRegNo, selectedCertificateType, selectedCourseCertificateType]);
  const handleGenerateCertificate = async (student) => {
    const { NAME: firstName, certificate_type: certificate_type2, REG_NO: REG_NO2, CollegeName: CollegeName2, FATHER_NAME: FATHER_NAME2, GENDER: GENDER2, Role: Role2, coursename: coursename2, From, To, Course_Certificate_Type } = student;
    const trimmedName = firstName ? firstName.trim() : "";
    FATHER_NAME2 ? FATHER_NAME2.trim() : "";
    REG_NO2 ? REG_NO2.trim() : "";
    if (trimmedName !== "" && certificate_type2 !== "") {
      try {
        let templatePath = "";
        if (selectedOption === "PROJECT") {
          if (certificate_type2.toLowerCase() === "internship") {
            throw new Error("Invalid certificate type for selected option");
          } else if (certificate_type2.toLowerCase() === "project") {
            templatePath = "./cert5.pdf";
          } else {
            throw new Error("Invalid certificate type");
          }
        } else if (selectedOption === "COURSE") {
          if (certificate_type2.toLowerCase() === "internship" || certificate_type2.toLowerCase() === "project") {
            templatePath = "./cert11.pdf";
          } else {
            throw new Error("Invalid certificate type");
          }
        } else {
          throw new Error("Invalid selected option");
        }
        const existingPdfBytes = await fetch(templatePath).then((res) => res.arrayBuffer());
        const mainContentFontBytes = await fetch("./Sanchez-Regular.ttf").then(
          (res) => res.arrayBuffer()
        );
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const nameFontBytes = await fetch("./Sanchez-Regular.ttf").then(
          (res) => res.arrayBuffer()
        );
        const addFontBytes = await fetch("./NunitoSans_10pt-ExtraBold.ttf").then(
          (res) => res.arrayBuffer()
        );
        const addnameFont = await pdfDoc.embedFont(addFontBytes);
        let xPos = 0;
        const nameFont = await pdfDoc.embedFont(nameFontBytes);
        const mainContentFont = await pdfDoc.embedFont(mainContentFontBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        let fontSize = 34;
        let nameHeight = 0;
        let nameWidth = 0;
        let nameX = 0;
        let nameY = 0;
        if (selectedOption === "PROJECT") {
          fontSize = 20;
          nameHeight = 380;
          nameY = 330;
          const centerX = 423;
          const displayName2 = capitalize(trimmedName);
          nameWidth = nameFont.widthOfTextAtSize(displayName2, fontSize);
          const halfNameWidth = nameWidth / 2;
          nameX = centerX - halfNameWidth;
          firstPage.drawText(displayName2, {
            x: nameX,
            y: nameY,
            size: fontSize,
            font: nameFont,
            color: rgb(0, 0, 0)
          });
        } else if (selectedOption === "COURSE") {
          fontSize = 12;
          nameHeight = 360;
          nameY = 315;
          const fixedStartX = 310;
          const displayName2 = capitalize(trimmedName);
          nameWidth = nameFont.widthOfTextAtSize(displayName2, fontSize);
          nameX = fixedStartX;
          firstPage.drawText(displayName2, {
            x: nameX,
            y: nameY,
            size: fontSize,
            font: nameFont,
            color: rgb(0, 0, 0)
          });
        }
        let yPos = nameHeight;
        const displayName = capitalize(trimmedName);
        const { width: pageWidth, height: pageHeight } = firstPage.getSize();
        nameWidth = nameFont.widthOfTextAtSize(displayName, fontSize);
        firstPage.drawText(displayName, {
          x: nameX,
          y: nameY,
          size: fontSize,
          font: nameFont,
          color: rgb(0, 0, 0)
        });
        if (selectedOption === "PROJECT") {
          fontSize = 20;
          nameHeight = 380;
          nameX = 200;
          nameY = 330;
          let additionalText = "";
          if (certificate_type2.toLowerCase() === "course" || certificate_type2.toLowerCase() === "project") {
            if (GENDER2.toLowerCase() === "male") {
              additionalText = `This is to certify that MR. ${firstName} has successfully completed their project at "Excerpt IT Training Services",B133/1 2nd Floor, KSSIDC ITI Estate, Whitefield Main Road Mahadevapura, Bengaluru - 560048 from ${From} to ${To}.
 He is exposed to Excerpt IT Training Services and gained the knowledge on "${coursename2}" during the project work.`;
            } else if (GENDER2.toLowerCase() === "female") {
              additionalText = `This is to certify that MS. ${firstName} has successfully completed their project at "Excerpt IT Training Services", B133/1 2nd Floor, KSSIDC ITI Estate, Whitefield Main Road , Bengaluru - 560048 from ${From} to ${To}.
 She is exposed to Excerpt IT Training Services and gained the knowledge on "${coursename2}" during the project work.`;
            } else {
              additionalText = "This is additional text for other gender students in PROJECT.";
            }
          }
          if (additionalText !== "") {
            const additionalTextFontSize = 11;
            const maxLineWidth = 700;
            const { lines, y } = getLines(additionalText, maxLineWidth, mainContentFont, additionalTextFontSize);
            const lineHeight = additionalTextFontSize * 1.5;
            const totalHeight = lines.length * lineHeight;
            const additionalTextY = 240 + totalHeight / 2;
            const pageWidth2 = firstPage.getSize().width;
            const additionalTextOffsetX = 20;
            const additionalTextX = (pageWidth2 - maxLineWidth) / 2 + additionalTextOffsetX;
            let currentY = additionalTextY;
            lines.forEach((line, index) => {
              const width = mainContentFont.widthOfTextAtSize(line, additionalTextFontSize);
              const spacesToAdd = maxLineWidth - width;
              const spaces = " ".repeat(spacesToAdd);
              const adjustedLine = line + spaces;
              firstPage.drawText(adjustedLine, {
                x: additionalTextX,
                y: currentY - index * lineHeight,
                // Adjust spacing between lines as needed
                size: additionalTextFontSize,
                font: mainContentFont,
                color: rgb(0, 0, 0),
                alignment: TextAlignment.flex
              });
            });
          }
        }
        if (selectedOption === "COURSE") {
          if (certificate_type2.toLowerCase() === "internship" || certificate_type2.toLowerCase() === "project") {
            const additionalText = "";
            if (additionalText !== "") ;
            const regNoText = ` ${REG_NO2}`;
            const regNoWidth = nameFont.widthOfTextAtSize(regNoText, 12);
            const regNoX = (pageWidth - regNoWidth) / 2.5;
            const regNoY = yPos - 274;
            firstPage.drawText(regNoText, {
              x: regNoX,
              y: regNoY,
              size: 12,
              // Adjust font size as needed
              font: nameFont,
              color: rgb(0, 0, 0)
            });
            const fatherNameText = FATHER_NAME2 ? FATHER_NAME2.trim() : "";
            const fatherFontSize = 12;
            const fatherNameY = yPos - 45;
            const fatherNameWidth = addnameFont.widthOfTextAtSize(fatherNameText, fatherFontSize);
            const fatherFixedStartX = 613;
            let fatherCurrentX = fatherFixedStartX;
            for (let i = 0; i < fatherNameText.length; i++) {
              const letter = fatherNameText.charAt(i);
              const letterWidth = addnameFont.widthOfTextAtSize(letter, fatherFontSize);
              firstPage.drawText(letter, {
                x: fatherCurrentX,
                y: fatherNameY,
                size: fatherFontSize,
                font: addnameFont,
                color: rgb(0, 0, 0)
              });
              fatherCurrentX += letterWidth;
            }
          }
          const trainingCenterText = "BANGLORE ";
          const trainingCenterFontSize = 11;
          const trainingCenterX = 310;
          const trainingCenterY = 172;
          firstPage.drawText(trainingCenterText, {
            x: trainingCenterX,
            y: trainingCenterY,
            size: trainingCenterFontSize,
            font: addnameFont,
            color: rgb(0, 0, 0)
          });
          const gradeText = " GOOD";
          const gradeFontSize = 11;
          const gradeX = 610;
          const gradeY = 172;
          firstPage.drawText(gradeText, {
            x: gradeX,
            y: gradeY,
            size: gradeFontSize,
            font: addnameFont,
            color: rgb(0, 0, 0)
          });
          const courseDurationText = "90 Hours";
          const courseDurationFontSize = 11;
          const courseDurationX = 613;
          const courseDurationY = 268;
          firstPage.drawText(courseDurationText, {
            x: courseDurationX,
            y: courseDurationY,
            size: courseDurationFontSize,
            font: addnameFont,
            color: rgb(0, 0, 0)
          });
          const courseCertificateType = student.Course_Certificate_Type;
          const courseCertificateTypeText = courseCertificateType ? `${courseCertificateType}` : "";
          const certificateFontSize = 11;
          const courseCertificateTypeWidth = addnameFont.widthOfTextAtSize(courseCertificateTypeText, certificateFontSize);
          const certificateFixedStartX = 310;
          const certificateY = yPos - 93;
          let certificateCurrentX = certificateFixedStartX;
          for (let i = 0; i < courseCertificateTypeText.length; i++) {
            const letter = courseCertificateTypeText.charAt(i);
            const letterWidth = addnameFont.widthOfTextAtSize(letter, certificateFontSize);
            firstPage.drawText(letter, {
              x: certificateCurrentX,
              y: certificateY,
              size: certificateFontSize,
              font: addnameFont,
              color: rgb(0, 0, 0)
            });
            certificateCurrentX += letterWidth;
          }
          let additionalCourseText = "";
          switch (courseCertificateType.toLowerCase()) {
            case "full stack with python":
              additionalCourseText = "HTML, CSS, JavaScript, SQL, Python";
              break;
            case "mern stack":
              additionalCourseText = "HTML, CSS, JavaScript, React, MongoDB";
              break;
            // Add more cases for other course certificate types if needed
            default:
              break;
          }
          if (additionalCourseText !== "") {
            const additionalCourseTextFontSize = 11;
            const additionalCourseTextX = 310;
            const additionalCourseTextY = yPos - 110;
            firstPage.drawText(additionalCourseText, {
              x: additionalCourseTextX,
              y: additionalCourseTextY,
              size: additionalCourseTextFontSize,
              font: addnameFont,
              color: rgb(0, 0, 0)
            });
          }
          const enteredDateText = enteredDate ? ` ${enteredDate}` : "";
          const enteredDateFontSize = 11;
          const enteredDateX = 610;
          const enteredDateY = 220;
          firstPage.drawText(enteredDateText, {
            x: enteredDateX,
            y: enteredDateY,
            size: enteredDateFontSize,
            font: addnameFont,
            color: rgb(0, 0, 0)
          });
        }
        setEnteredDates((prevState) => ({
          ...prevState,
          [student.REG_NO]: ""
          // Reset the entered date for the specific student
        }));
        const pdfBytes = await pdfDoc.save();
        const file = new File(
          [pdfBytes],
          "Certificate.pdf",
          {
            type: "application/pdf;charset=utf-8"
          }
        );
        if (typeof window !== "undefined") {
          const fileSaver = await import("file-saver");
          fileSaver.default(file);
        }
      } catch (error) {
        console.error("Error generating or downloading certificate:", error);
        alert("Error generating or downloading certificate. Please try again later.");
      }
    } else {
      alert("Please enter a name and select a certificate type.");
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("select", { onChange: handleDropdownChange, style: { marginLeft: "-1200px", marginTop: "190px" }, children: [
      /* @__PURE__ */ jsx("option", { value: "", children: "Select an option" }),
      /* @__PURE__ */ jsx("option", { value: "PROJECT", children: "PROJECT" }),
      /* @__PURE__ */ jsx("option", { value: "COURSE", children: "COURSE" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container", style: {
      height: "100px",
      marginLeft: "-100px",
      display: "flex",
      alignItems: "center"
    }, children: /* @__PURE__ */ jsxs("select", { id: "collegeDropdown", value: selectedCollegeName, onChange: handleCollegeChange, style: { marginTop: "-140px", marginLeft: "300px" }, children: [
      /* @__PURE__ */ jsx("option", { value: "", children: "CollegeName" }),
      collegeNames.map((collegeName, index) => /* @__PURE__ */ jsx("option", { value: collegeName, children: collegeName }, index))
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "container", style: {
      height: "100px",
      marginLeft: "-80px",
      display: "flex",
      alignItems: "center"
    } }),
    /* @__PURE__ */ jsxs("div", { className: "container search-container", style: {
      height: "100px",
      marginLeft: "430px",
      display: "flex",
      marginTop: "-90px",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "search-input",
          placeholder: "Search...",
          value: searchText,
          onChange: handleSearchChange,
          style: { marginLeft: "-1640px", marginTop: "-350px" }
        }
      ),
      /* @__PURE__ */ jsx("i", { className: "fa fa-search search-icon" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container search-container", style: {
      height: "100px",
      marginLeft: "730px",
      display: "flex",
      marginTop: "-100px",
      alignItems: "center"
    }, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "search-input",
        placeholder: "Enter REG_NO...",
        value: selectedRegNo,
        onChange: handleRegNoChange,
        style: { marginLeft: "50px", marginTop: "-350px" }
      }
    ) }),
    selectedOption === "PROJECT" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", {}),
      /* @__PURE__ */ jsx("div", { className: "card_student_container", style: { marginLeft: "-160px" }, children: filteredStudents.map((student, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          CertificateGenerator,
          {
            firstName: student.NAME,
            GENDER: student.GENDER,
            CollegeName: student.college_name,
            FATHER_NAME: student.FATHER_NAME,
            REG_NO: student.REG_NO,
            coursename: student.coursename,
            certificate_type: student.certificate_type,
            yop: student.yop,
            coursecertificatr: student.Course_Certificate_Type,
            Role: student.Role,
            From: student.From,
            To: student.To
          }
        ),
        /* @__PURE__ */ jsx("button", { onClick: () => handleGenerateCertificate(student), style: { marginLeft: "30px", width: "200px", marginTop: "10px" }, children: "Get Certificate1" }),
        /* @__PURE__ */ jsx("a", { href: `https://itdesk.com//certificate.html?REG_NO=${student.REG_NO}`, target: "_blank", children: "view" })
      ] }, index)) })
    ] }),
    selectedOption === "COURSE" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", {}),
      /* @__PURE__ */ jsx("div", { className: "card_student_container", style: { marginLeft: "-160px" }, children: filteredStudents.map((student, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          CertificateGenerator,
          {
            firstName: student.NAME,
            GENDER: student.GENDER,
            CollegeName: student.college_name,
            FATHER_NAME: student.FATHER_NAME,
            REG_NO: student.REG_NO,
            coursename: student.coursename,
            certificate_type: student.certificate_type,
            yop: student.yop,
            coursecertificatr: student.Course_Certificate_Type,
            Role: student.Role,
            From: student.From,
            To: student.To,
            REG_NO1: student.REG_NOO,
            enteredDate: student.enteredDate
          }
        ),
        enteredDates[student.REG_NO] !== void 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Enter Date (DD MM YYYY)",
              onChange: (event) => handleChange(event, student.REG_NO),
              value: enteredDates[student.REG_NO],
              style: { marginBottom: "10px" }
            }
          ),
          /* @__PURE__ */ jsx("button", { onClick: () => handleGenerateCertificate(student), children: "Confirm" }),
          /* @__PURE__ */ jsx("a", { href: `https://itdesk.com/certificate.html?REG_NO=${student.REG_NO}`, target: "_blank", children: "view" })
        ] }),
        enteredDates[student.REG_NO] === void 0 && /* @__PURE__ */ jsx("button", { onClick: () => handleGetCertificate(student), children: "Get Certificate" })
      ] }, index)) })
    ] })
  ] }) });
}
const Certificate = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Certificate$1, {}),
    /* @__PURE__ */ jsx(CertificateGenerator, {})
  ] });
};
const Dashboard = () => {
  const location = useLocation();
  location.state ? location.state.username : "";
  const [showCertificate, setShowCertificate] = useState(false);
  const [showResume, setshowResume] = useState(false);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { class: "container-scroller d-flex", children: [
    /* @__PURE__ */ jsx("nav", { class: "sidebar sidebar-offcanvas", id: "sidebar", children: /* @__PURE__ */ jsxs("ul", { class: "nav1", children: [
      /* @__PURE__ */ jsx("li", { class: "nav-item", children: /* @__PURE__ */ jsxs("a", { class: "nav-link", href: "", children: [
        /* @__PURE__ */ jsx("i", { class: "mdi mdi-view-quilt menu-icon" }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: "30px" }, class: "menu-title", children: "Dashboard" })
      ] }) }),
      /* @__PURE__ */ jsx("li", { class: "nav-item sidebar-category", children: /* @__PURE__ */ jsx("span", {}) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx("button", { className: "mdi mdi-palette menu-icon menu-title menu-arrow", onClick: () => setShowCertificate(!showCertificate), children: "Certificate" }) }),
      /* @__PURE__ */ jsx("li", { class: "nav-item" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "container page-body-wrapper", children: [
      /* @__PURE__ */ jsx("nav", { className: "navbar col-lg-12 col-12 px-0 py-0 py-lg-4 d-flex flex-row" }),
      /* @__PURE__ */ jsx("div", { class: "main-panel", children: /* @__PURE__ */ jsx("div", { class: "content-wrapper", children: showCertificate && /* @__PURE__ */ jsx(Certificate, {}) }) })
    ] })
  ] }) });
};
export {
  Dashboard as default
};
