import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "pdf-lib";
import "@pdf-lib/fontkit";
import "qrcode";
import PropTypes from "prop-types";
function CertificateGenerator({ firstName, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, coursecertificatr, GENDER, Role }) {
  console.log("Received props:", { firstName, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, GENDER, Role });
  const defaultImage = "/image/default.webp";
  const [selectedDate, setSelectedDate] = useState("");
  const getImageSource = (regNo) => {
    return `/image/${regNo}.webp`;
  };
  const [qrCodeValue, setQrCodeValue] = useState("");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "card shadow", children: /* @__PURE__ */ jsxs("div", { style: { textAlign: "justify" }, children: [
    /* @__PURE__ */ jsx("img", { className: "image", src: getImageSource(REG_NO) || defaultImage, alt: "Student" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "NAME:" }),
      " ",
      firstName
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "REG_NO:" }),
      " ",
      REG_NO
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "FATHER_NAME:" }),
      " ",
      FATHER_NAME
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "COURSETITLE:" }),
      " ",
      coursename
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "COOLEGENAME:" }),
      " ",
      CollegeName
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "CERTIFICATION:" }),
      " ",
      certificate_type
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "YOP:" }),
      " ",
      yop
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "COURSECERTIFICATION:" }),
      " ",
      coursecertificatr
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "GENDER:" }),
      " ",
      GENDER
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("span", { className: "detail-label", children: "Role:" }),
      " ",
      Role
    ] })
  ] }) }) });
}
CertificateGenerator.propTypes = {
  firstName: PropTypes.string.isRequired,
  REG_NO: PropTypes.string.isRequired,
  FATHER_NAME: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
  CollegeName: PropTypes.string.isRequired,
  Course_Title: PropTypes.string.isRequired,
  certificate_type: PropTypes.string.isRequired,
  yop: PropTypes.string.isRequired
};
export {
  CertificateGenerator as default
};
