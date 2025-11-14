import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Home, BookOpen, Layers, ClipboardList, FileText, DollarSign, UserPlus, Users, Menu } from "lucide-react";
const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return /* @__PURE__ */ jsxs("div", { className: "admin-container", children: [
    /* @__PURE__ */ jsxs("div", { className: `sidebar ${isOpen ? "open" : "collapsed"}`, children: [
      /* @__PURE__ */ jsx("h1", { className: "logo", children: "Admin Panel" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/adminpage", children: [
          /* @__PURE__ */ jsx(Home, { size: 18 }),
          " Dashboard"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "CourseManagement", children: [
          /* @__PURE__ */ jsx(BookOpen, { size: 18 }),
          " Course Management"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "CourseTypeManagement", children: [
          /* @__PURE__ */ jsx(Layers, { size: 18 }),
          " Course Type Management"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "SubjectManagement", children: [
          /* @__PURE__ */ jsx(ClipboardList, { size: 18 }),
          " Subject Management"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "StudentCertificatePage", children: [
          /* @__PURE__ */ jsx(FileText, { size: 18 }),
          " Student Certificate"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "FeeInvoiceGeneration", children: [
          /* @__PURE__ */ jsx(DollarSign, { size: 18 }),
          " Fee Invoice"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "RegistrationForm", children: [
          /* @__PURE__ */ jsx(UserPlus, { size: 18 }),
          " Registration Form"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "StudentDetail", children: [
          /* @__PURE__ */ jsx(Users, { size: 18 }),
          " Student Detail"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "topbar", children: [
        /* @__PURE__ */ jsx("button", { className: "menu-btn", onClick: () => setIsOpen(!isOpen), children: /* @__PURE__ */ jsx(Menu, { size: 22 }) }),
        /* @__PURE__ */ jsx("h2", { children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "content-area", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
};
export {
  AdminPage as default
};
