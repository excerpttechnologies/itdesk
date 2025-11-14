import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import React, { useState, useEffect, Fragment, lazy, Suspense, useRef } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { NavLink, useNavigate, Link, useLocation, useParams, Outlet, Routes, Route } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import axios from "axios";
import { PDFDocument, rgb, TextAlignment } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import pkg from "number-to-words";
import { Home as Home$1, BookOpen, Layers, ClipboardList, FileText, DollarSign, UserPlus, Users, Menu as Menu$1 } from "lucide-react";
const Header = ({ isLoggedIn, onLogout }) => {
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(isLoggedIn);
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("isLoggedIn");
    const adminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");
    if (userLoggedIn === "true" || adminLoggedIn === "true") {
      setLocalIsLoggedIn(true);
    } else {
      setLocalIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  const handleLogout = () => {
    setLocalIsLoggedIn(false);
    setShowLogoutToast(true);
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("isAdminLoggedIn", "false");
    if (onLogout) {
      onLogout();
    }
    setTimeout(() => {
      setShowLogoutToast(false);
    }, 3e3);
  };
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("div", { className: "top-head-w3ls py-2 bg-dark", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-capitalize text-white col-7", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-book text-dark bg-white p-2 rounded-circle mr-3" }),
        "welcome to Excerpt Trainings"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "social-icons text-right col-5", children: /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/share/162CzrJBRZ/", className: "fab fa-facebook-f icon-border facebook rounded-circle", children: " " }) }),
        /* @__PURE__ */ jsx("li", { className: "mx-2", children: /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/excerpt_it_training_service?igsh=MWhjb3ptZmF5b2ZyYw==", className: "fab fa-instagram icon-border instagram rounded-circle", children: " " }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://excerptech.com", className: "fab fa-google-plus-g icon-border googleplus rounded-circle", children: " " }) }),
        /* @__PURE__ */ jsx("li", { className: "ml-2", children: /* @__PURE__ */ jsx("a", { href: "https://youtube.com/@excerpt_it_training_services?si=AF5LFpHOxfk6ZDqW", className: "fab fa-youtube icon-border youtube rounded-circle", children: " " }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "middle-w3ls-nav py-4", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12 right-info-agiles mt-lg-0 mt-sm-3 mt-1", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-sm-3 nav-middle", children: /* @__PURE__ */ jsx("div", { className: "agile-addresmk", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: "assests/img/logonn.webp", alt: "EXCERPT TRAININGS Logo", style: { width: "120px" } }) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-sm-4 nav-middle", children: [
        /* @__PURE__ */ jsx("i", { className: "far fa-envelope-open text-center mr-md-4 mr-sm-2 mr-4" }),
        /* @__PURE__ */ jsx("div", { className: "agile-addresmk", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-weight-bold text-dark", children: "Mail Us" }),
          /* @__PURE__ */ jsx("a", { href: "info@excerptech.com", children: "info@excerptech.com" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-sm-3 nav-middle mt-sm-0 mt-2", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-phone-volume text-center mr-md-4 mr-sm-2 mr-4" }),
        /* @__PURE__ */ jsx("div", { className: "agile-addresmk", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-weight-bold text-dark", children: "Call Us" }),
          "+91 9901371386"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "upper_login", style: { fontSize: "15px" }, children: localIsLoggedIn ? /* @__PURE__ */ jsxs("a", { href: "#", className: "user-account font-weight-bold", onClick: handleLogout, children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-sign-out-alt " }),
        " Logout"
      ] }) : /* @__PURE__ */ jsx("a", { href: "/login", className: "user-account font-weight-bold", children: /* @__PURE__ */ jsx("i", { className: "", children: "Login / Register" }) }) })
    ] }) }) }) }) }),
    showLogoutToast && /* @__PURE__ */ jsx("div", { className: "logout-toast", style: {
      position: "fixed",
      top: "10px",
      right: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      zIndex: 9999
    }, children: "Logout successful" })
  ] });
};
function Navbar({ isAdmin, isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
  const handleLogout = () => {
    if (onLogout) onLogout();
    handleClose();
  };
  return /* @__PURE__ */ jsx("div", { className: "navigation-w3ls", style: { height: "0px" }, children: /* @__PURE__ */ jsxs("nav", { className: "navbar navbar-expand-lg navbar-light bg-light sticky-nav", children: [
    /* @__PURE__ */ jsx("button", { className: "navbar-toggler mx-auto", type: "button", onClick: handleToggle, children: isOpen ? /* @__PURE__ */ jsx("span", { style: { fontSize: "12px", fontWeight: "bold" }, children: "Close" }) : /* @__PURE__ */ jsx("span", { className: "navbar-toggler-icon" }) }),
    /* @__PURE__ */ jsx("div", { className: `collapse navbar-collapse text-center ${isOpen ? "show" : ""}`, id: "navbarSupportedContent", children: /* @__PURE__ */ jsxs("ul", { className: "navbar-nav justify-content-center", children: [
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/", className: "nav-link", onClick: handleClose, children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/about", className: "nav-link", onClick: handleClose, children: "About Us" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/allprogram", className: "nav-link", onClick: handleClose, children: "All Programs" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/onlineprogram", className: "nav-link", onClick: handleClose, children: "Online Programs" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/gallery", className: "nav-link", onClick: handleClose, children: "Blogs" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/internship", className: "nav-link", onClick: handleClose, children: "Internship" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/story", className: "nav-link", onClick: handleClose, children: "Success Story" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/tutorials", className: "nav-link", onClick: handleClose, children: "Tutorials" }) }),
      /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/contactus", className: "nav-link", onClick: handleClose, children: "Contact Us" }) }),
      isLoggedIn && /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/adminpage", className: "nav-link", onClick: isLoggedIn, children: "Admin" }) }),
      isLoggedIn && /* @__PURE__ */ jsx("li", { className: "nav-item d-lg-none", children: /* @__PURE__ */ jsx("a", { href: "#", className: "nav-link text-danger", onClick: handleLogout, children: "Logout" }) })
    ] }) })
  ] }) });
}
const Footer = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("footer", { children: [
    /* @__PURE__ */ jsx("div", { className: "container py-4", children: /* @__PURE__ */ jsxs("div", { className: "row py-xl-5 py-sm-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 map", children: [
        /* @__PURE__ */ jsxs("h2", { className: "contact-title text-capitalize text-white font-weight-light mb-sm-4 mb-3", children: [
          "our",
          /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "directions" })
        ] }),
        /* @__PURE__ */ jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5670664397067!2d77.69618407397932!3d12.999519214267812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11e5beced50b%3A0x6dfbb6145c02cc8b!2sExcerpt%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1689927971916!5m2!1sen!2sin" }),
        /* @__PURE__ */ jsxs("div", { className: "conta-posi-w3ls p-4 rounded", children: [
          /* @__PURE__ */ jsx("h5", { className: "text-white font-weight-bold mb-3", children: "Address" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "# B133/1, 2nd Floor, ITI Estate, Whitefield Road",
            /* @__PURE__ */ jsx("span", { children: "," }),
            " Bengaluru - 560048"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 contact-agileits-w3layouts mt-lg-0 mt-6 text-right", children: [
        /* @__PURE__ */ jsxs("h4", { className: "contact-title text-capitalize text-white font-weight-light mb-sm-6 mb-6", children: [
          "get in",
          /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "touch" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "conta-para-style border-left pl-4", children: "We deliver high-quality, hands-on training programs designed to prepare individuals for real-world challenges and career success." }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("p", { className: "para-agileits-w3layouts text-white", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker pr-3" }),
          "EXCERPT TRAININGS Mahadevapura"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "para-agileits-w3layouts  my-sm-3 my-2 text-white", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-phone pr-3" }),
          "+ 91 9901371386 / 7676870744 "
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "para-agileits-w3layouts", children: [
          /* @__PURE__ */ jsx("i", { className: "far fa-envelope-open pr-2" }),
          /* @__PURE__ */ jsx("a", { href: "mailto:info@excerptech.com", className: " text-blue", children: "info@excerptech.com" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "copyright-agiles py-3", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("p", { className: "col-lg-8 copy-right-grids text-white text-lg-left text-center mt-lg-1", children: [
        "© 2025 EXCERPT TRAININGS .                                 ",
        /* @__PURE__ */ jsx("a", { href: "/", target: "_blank", children: "  All Rights Reserved" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "social-icons text-lg-right text-center col-lg-4 col-5 mt-lg-0 mt-3", children: /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/share/162CzrJBRZ/", className: "fab fa-facebook-f icon-border facebook rounded-circle", children: " " }) }),
        /* @__PURE__ */ jsx("li", { className: "mx-2", children: /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/excerpt_it_training_service?igsh=MWhjb3ptZmF5b2ZyYw==", className: "fab fa-instagram icon-border instagram rounded-circle", children: " " }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://excerptech.com", className: "fab fa-google-plus-g icon-border googleplus rounded-circle", children: " " }) }),
        /* @__PURE__ */ jsx("li", { className: "ml-2", children: /* @__PURE__ */ jsx("a", { href: "https://youtube.com/@excerpt_it_training_services?si=AF5LFpHOxfk6ZDqW", className: "fab fa-youtube icon-border youtube rounded-circle", children: " " }) })
      ] }) })
    ] }) }) })
  ] }) });
};
const CountUp = lazy(
  () => import("react-countup").then((mod) => ({ default: mod.CountUp || mod.default }))
);
const Stats = () => /* @__PURE__ */ jsx("div", { className: "stats-w3layouts py-5", children: /* @__PURE__ */ jsx("div", { className: "container py-xl-5 py-lg-3", children: /* @__PURE__ */ jsx("div", { className: "stats-info", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
  /* @__PURE__ */ jsxs("div", { className: "col-md-3 col-6 stats-grid-w3-agile text-center px-xl-5 px-3", children: [
    /* @__PURE__ */ jsx("div", { className: "numscroller font-weight-bold my-2", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("span", { children: "0" }), children: /* @__PURE__ */ jsx(CountUp, { end: 2280, duration: 2, suffix: "+" }) }) }),
    /* @__PURE__ */ jsx("p", { className: "text-uppercase text-white border-top pt-4 mt-3", children: /* @__PURE__ */ jsx("strong", { children: "happy students" }) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "col-md-3 stats-grid-w3-agile text-center px-xl-5 px-3", children: [
    /* @__PURE__ */ jsx("div", { className: "numscroller font-weight-bold my-2", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("span", { children: "0" }), children: /* @__PURE__ */ jsx(CountUp, { end: 80, duration: 2, suffix: "+" }) }) }),
    /* @__PURE__ */ jsx("p", { className: "text-uppercase text-white border-top pt-4 mt-3", children: /* @__PURE__ */ jsx("strong", { children: "approved courses" }) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "col-md-3 stats-grid-w3-agile text-center mt-md-0 mt-5 px-xl-5 px-3", children: [
    /* @__PURE__ */ jsx("div", { className: "numscroller font-weight-bold my-2", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("span", { children: "0" }), children: /* @__PURE__ */ jsx(CountUp, { end: 1200, duration: 2, suffix: "+" }) }) }),
    /* @__PURE__ */ jsx("p", { className: "text-uppercase text-white border-top pt-4 mt-3", children: /* @__PURE__ */ jsx("strong", { children: "certified teachers" }) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "col-md-3 stats-grid-w3-agile text-center mt-md-0 mt-5 px-xl-5 px-3", children: [
    /* @__PURE__ */ jsx("div", { className: "numscroller font-weight-bold my-2", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("span", { children: "0" }), children: /* @__PURE__ */ jsx(CountUp, { end: 2200, duration: 2, suffix: "+" }) }) }),
    /* @__PURE__ */ jsx("p", { className: "text-uppercase text-white border-top pt-4 mt-3", children: /* @__PURE__ */ jsx("strong", { children: "graduate students" }) })
  ] })
] }) }) }) });
const TestimonialsDetails = ({ testiMonialDetail }) => {
  const { name, address, description, img } = testiMonialDetail;
  console.log("testiMonialDetail" + testiMonialDetail);
  return /* @__PURE__ */ jsxs("div", { className: "item", children: [
    /* @__PURE__ */ jsxs("div", { className: "shadow-effect", children: [
      /* @__PURE__ */ jsx("img", { className: "img-circle", src: img, alt: "" }),
      /* @__PURE__ */ jsx("p", { children: description })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "testimonial-name", children: [
      /* @__PURE__ */ jsx("h5", { children: name }),
      /* @__PURE__ */ jsx("small", { children: address })
    ] })
  ] });
};
const TestiMonials = () => {
  const testiMonials = [
    {
      name: "Harsha Vardhan",
      description: "Good IT institute for beginners or for experienced candidates who are working in IT job and wants to upgrade their skills. Good faculties with knowledgeable and good communication to make students understand from the basics.",
      address: "Bangalore",
      img: "/images/harsha.webp"
    },
    {
      name: "Bhojaraju Challa",
      description: "Nice Atmosphere to learn and Develop the IT skills Good Teaching staff very friendly.",
      address: "Andhra",
      img: "/images/bhojaraj.webp"
    },
    {
      name: "Ektha A Mehta",
      description: "I personally liked the content because they have enough content to become a python developer and the way they teach is very excellent with realtime examples they are available at any time to clarify our doubts, in this low fees structure they are giving very good teaching services and I loved it.",
      address: "Pune",
      img: "/images/ektha.webp"
    },
    {
      name: "Rajath",
      description: "Best Centre to learn professionally and the training skills were excellent, Good teaching by the staff. Counseling Team is very Helpful for choosing the right software. Thanks for great guidance",
      address: "Bangalore",
      img: "/images/rajath.webp"
    }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5e3,
    responsive: [
      {
        breakpoint: 1e3,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  return /* @__PURE__ */ jsx("div", { className: "testimonials-slider", children: /* @__PURE__ */ jsx(Slider, { ...settings, children: testiMonials.map((t) => /* @__PURE__ */ jsx(TestimonialsDetails, { testiMonialDetail: t }, t.name)) }) });
};
const Index = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx(
      "meta",
      {
        name: "keywords",
        content: "IT courses, IT training, online IT classes, internship in Bangalore, Python course, Java training, React course, Node.js course, MERN stack, web development course, Android development, Data Science course, Machine Learning course, Artificial Intelligence course, SQL course, AWS training, Azure certification, Google Cloud training, DevOps course, Docker course, Kubernetes course, Linux training, Cybersecurity course, Ethical Hacking course, Software Testing, Selenium training, Automation testing, Manual testing, Placement assistance, Job oriented courses, Certification training, Weekend batches, Corporate training, Project-based learning, Live classes, Classroom training\r\n          react js with projects bangalore, express js backend training bangalore, mongodb database training bangalore, full stack developer course with placement, it training institute in whitefield bangalore, professional software training center bangalore, top computer institute in bangalore, corporate training for it professionals bangalore, online software courses with certificate india, best it training institute bangalore, affordable programming courses bangalore, internship program for engineering students bangalore, computer science course for beginners india, software development course for graduates bangalore, it placement training and job support bangalore, fresher internship program in it bangalore, professional skill development courses bangalore, technical training institute bangalore, industry ready software training bangalore, coding bootcamp bangalore, programming course for freshers bangalore,\r\n          web design course bangalore, web design training institute bangalore, web design internship bangalore, web development course for beginners bangalore, mern stack course bangalore, mern full stack development training, mern stack internship in bangalore, java course with placement bangalore, core java training institute bangalore, advanced java course j2ee bangalore, java fullstack developer course bangalore, python course with projects bangalore, python programming classes bangalore, python data science training bangalore, data analytics course with excel bangalore, data analytics certification bangalore, data analytics training with placement, data science with python course bangalore, data science certification training india, cybersecurity course with placement bangalore, ethical hacking and cybersecurity training, cloud computing course aws bangalore, aws certification course bangalore, aws cloud practitioner training bangalore, digital marketing course with internship bangalore, digital marketing training for beginners bangalore, seo and google ads training bangalore, social media marketing course bangalore, advanced excel course with projects bangalore, advanced excel training with placement, tally erp9 course with gst bangalore, tally prime and gst training bangalore, sap fico course for beginners bangalore, sap fico certification training bangalore, basic ms office course bangalore, ms word and excel training classes bangalore, mysql database course bangalore, mysql for data analytics bangalore, selenium testing course bangalore, automation testing using selenium java bangalore, java full stack development course bangalore, java spring boot training bangalore, autocad mechanical course bangalore, autocad mechanical design training bangalore, solidworks course for mechanical engineers bangalore, catia design software training bangalore, autocad civil 3d course bangalore, revit structure course bangalore, autocad architecture design course bangalore, v-ray rendering course bangalore, v-ray for sketchup training bangalore, web design and ui ux course bangalore, frontend development using html css javascript bangalore, backend development with node js bangalore, react js training bangalore, react js with projects bangalore, express js backend training bangalore, mongodb database training bangalore, full stack developer course with placement, it training institute in whitefield bangalore, professional software training center bangalore, top computer institute in bangalore, corporate training for it professionals bangalore, online software courses with certificate india, best it training institute bangalore, affordable programming courses bangalore, internship program for engineering students bangalore, computer science course for beginners india, software development course for graduates bangalore, it placement training and job support bangalore, fresher internship program in it bangalore, professional skill development courses bangalore, technical training institute bangalore, industry ready software training bangalore, coding bootcamp bangalore, programming course for freshers bangalore, web development with react and node bangalore, frontend backend course fullstack bangalore, data visualization using python bangalore, machine learning basics course bangalore, ai and machine learning course bangalore, artificial intelligence certification training bangalore, cloud architecture and deployment course bangalore, google cloud training bangalore, azure cloud computing training bangalore, devops course bangalore, docker kubernetes training bangalore, software testing automation course bangalore, manual and automation testing course bangalore, qa testing course with projects bangalore, it diploma course bangalore, advanced programming languages course bangalore, computer hardware and networking course bangalore, ms office productivity tools course bangalore, ms excel advanced formulas course bangalore, ms power bi training course bangalore, data visualization and reporting training bangalore, accounting and finance course with tally gst bangalore, gst filing and tally accounting course bangalore, sap fico end user training bangalore, sap financial management course bangalore, cloud security and networking course bangalore, penetration testing course bangalore, mobile app development course bangalore, android app development with java bangalore, flutter app development course bangalore, ios app development with swift bangalore, ui ux design training with figma bangalore, web graphics and responsive design course bangalore, 3d modeling course for engineers bangalore, autocad design for civil engineers bangalore, architectural design visualization course bangalore, mechanical drafting and design training bangalore, civil cad course with internship bangalore, structural engineering software training bangalore, electrical autocad design course bangalore, interior design autocad training bangalore, 3ds max and v-ray course bangalore, rendering and lighting techniques course bangalore, project based learning courses bangalore, practical software training institute bangalore, online live it classes india, weekend it classes bangalore, weekday it training batches bangalore, online internship program india, job oriented certification courses bangalore, short term computer courses bangalore, diploma in computer applications bangalore, career oriented programming courses bangalore, professional upskilling courses bangalore, corporate employee training bangalore, online training with live projects india, placement assistance software course bangalore, best coding institute for beginners bangalore, affordable online programming courses india, mern stack developer certification bangalore, python django fullstack course bangalore, node express react mongodb fullstack training bangalore, sql and database design training bangalore, software engineering training program bangalore, web design and graphic design combo course bangalore, adobe photoshop illustrator training bangalore, it internship certification program bangalore, practical coding projects for students bangalore, software course for bca students bangalore, course for mca graduates bangalore, course for btech freshers bangalore, career growth training for it professionals bangalore, reskilling courses in technology bangalore, online remote learning programs india, interactive coding bootcamp bangalore, best data science institute bangalore, ai ml deep learning course bangalore, tensorflow keras training bangalore, statistics for data science bangalore, business analytics with excel and python bangalore, visualization with tableau power bi bangalore, google analytics and seo course bangalore, performance marketing course bangalore, content marketing course bangalore, wordpress website development training bangalore, ecommerce website design course bangalore, freelancing and portfolio building course bangalore, it certification courses recognized india, placement guaranteed course bangalore, 100 job assistance course bangalore, project internship with certificate bangalore, best skill development center bangalore, career development training bangalore, it professional mentorship program bangalore, beginner to advanced it courses bangalore, hands-on programming course bangalore, software tools training course bangalore, engineering project training bangalore, final year project internship bangalore, real time software development internship bangalore, industry experts led training bangalore, certified trainers it institute bangalore, experienced software mentors bangalore, it career counseling and guidance bangalore, personal development training with it skills bangalore, online course enrollment india, course demo classes bangalore, it training admission open bangalore, join now it internship bangalore, it courses for professionals with job support bangalore, computer training and certification bangalore, tech skills for career growth bangalore, future ready technology courses bangalore, emerging technologies course bangalore, automation and ai training bangalore, cloud infrastructure course bangalore, fullstack software engineering certification bangalore, practical workshop based it courses bangalore, live project internship for students bangalore, learn coding from basics bangalore, web app development course bangalore, backend development node express bangalore, frontend html css react training bangalore, online interactive it classes india, learn new technologies for career bangalore\r\n          "
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "about py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
        "Welcome to",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " EXCERPT TRAININGS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row pt-md-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 about_right", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-capitalize text-center font-weight-light font-italic", children: [
            "interface friendly learning at",
            /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "EXCERPT TRAININGS" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-right my-4 pr-4 border-right", children: [
            "EXCERPT TRAININGS provides professional software training ",
            /* @__PURE__ */ jsx("br", {}),
            " ",
            "on a vast array of courses in the fields of Computer Science",
            /* @__PURE__ */ jsx("br", {}),
            " and Information Technology. Since its founding in 2016, Excerpt Trainings ",
            /* @__PURE__ */ jsx("br", {}),
            "has provided training to over 10 Thousands+ students and professionals of various countries.."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "about_left-list", children: [
            /* @__PURE__ */ jsx("h6", { className: "mb-lg-3 mb-2 font-weight-bold text-dark", children: "Our Benefits" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
              /* @__PURE__ */ jsxs("li", { className: "mb-2 text-dark", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-3" }),
                "Data Structure and Algorithms"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "mb-2 text-dark", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-3" }),
                "Object Oriented Programming",
                " "
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "mb-2 text-dark", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-3" }),
                "Web development Courses"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "mb-2 text-dark", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-3" }),
                "Mobile App Development using Android",
                " "
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "mb-2 text-dark", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-3" }),
                "Advance Java and Python",
                " "
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 left-img-agikes mt-lg-0 mt-sm-4 mt-3 text-right", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "assests/images/ab.webp",
              alt: "software training",
              className: "img-fluid"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "about-bottom text-center p-sm-5 p-4", children: /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("h5", { children: "10+" }),
              /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold", children: "Teachers" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("h5", { children: "2000+" }),
              /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold", children: "Students" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("h5", { children: "80+" }),
              /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold", children: "Courses" })
            ] })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Stats, {}),
    /* @__PURE__ */ jsx("div", { className: "classNamees py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-sm-5 mb-4", children: [
        "choose your",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " course" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row pt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 col-news-top text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "ih-item circle effect16 left_to_right mx-auto", children: /* @__PURE__ */ jsxs("a", { href: "/internship", target: "_blank", children: [
            /* @__PURE__ */ jsx("div", { className: "img", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "assests/images/c1.webp",
                alt: "Internship",
                className: "img-fluid rounded-circle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-capitalize text-white", children: "Internship" }),
              /* @__PURE__ */ jsx("p", { children: "We provide Internship on Latest Trending Technologies" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("h6", { className: "small-heading text-capitalize text-center mt-4", children: /* @__PURE__ */ jsxs("a", { href: "/internship", className: "text-dark", target: "_blank", children: [
            "Internship",
            /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 col-news-top text-center my-lg-0 my-sm-5 my-4", children: [
          /* @__PURE__ */ jsx("div", { className: "ih-item circle effect16 left_to_right mx-auto", children: /* @__PURE__ */ jsxs("a", { href: "/allprogram", target: "_blank", children: [
            /* @__PURE__ */ jsx("div", { className: "img", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "assests/images/c2.webp",
                alt: "Courses free",
                className: "img-fluid rounded-circle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-capitalize text-white", children: "courses" }),
              /* @__PURE__ */ jsx("p", { children: "We provide Basics to Professional IT Courses" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("h6", { className: "small-heading text-capitalize text-center mt-4", children: /* @__PURE__ */ jsxs("a", { href: "/allprogram", className: "text-dark", target: "_blank", children: [
            "Courses",
            /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 col-news-top text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "ih-item circle effect16 left_to_right mx-auto", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", target: "_blank", children: [
            /* @__PURE__ */ jsx("div", { className: "img", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "assests/images/c3.webp",
                alt: "online class",
                className: "img-fluid rounded-circle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-capitalize text-white", children: "classes" }),
              /* @__PURE__ */ jsx("p", { children: "We train Online and Offline Courses" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("h6", { className: "small-heading text-capitalize text-center mt-4", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", className: "text-dark", target: "_blank", children: [
            "classes",
            /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row mt-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 col-news-top text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "ih-item circle effect16 left_to_right mx-auto", children: /* @__PURE__ */ jsxs("a", { href: "/placement", target: "_blank", children: [
            /* @__PURE__ */ jsx("div", { className: "img", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "assests/images/c4.webp",
                alt: "placement",
                className: "img-fluid rounded-circle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-capitalize text-white", children: "Placements " }),
              /* @__PURE__ */ jsx("p", { children: "We do provide Placement in Startups to MNC Companies" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("h6", { className: "small-heading text-capitalize text-center mt-4", children: /* @__PURE__ */ jsxs("a", { href: "/placement", className: "text-dark", target: "_blank", children: [
            "Placements",
            /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 col-news-top text-center  my-lg-0 my-sm-5 my-4", children: [
          /* @__PURE__ */ jsx("div", { className: "ih-item circle effect16 left_to_right mx-auto", children: /* @__PURE__ */ jsxs("a", { href: "/contactus", target: "_blank", children: [
            /* @__PURE__ */ jsx("div", { className: "img", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "assests/images/c6.webp",
                alt: "Social media marketing",
                className: "img-fluid rounded-circle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-capitalize text-white", children: "social media" }),
              /* @__PURE__ */ jsx("p", { children: "Our digital network is Strong" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("h6", { className: "small-heading text-capitalize text-center mt-4", children: /* @__PURE__ */ jsxs("a", { href: "/contactus", className: "text-dark", target: "_blank", children: [
            "social media",
            /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 col-news-top text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "ih-item circle effect16 left_to_right mx-auto", children: /* @__PURE__ */ jsxs("a", { href: "/about", target: "_blank", children: [
            /* @__PURE__ */ jsx("div", { className: "img", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "assests/images/m1.webp",
                alt: "traninings",
                className: "img-fluid rounded-circle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "info", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-capitalize text-white", children: "EXCERPT TRAININGS" }),
              /* @__PURE__ */ jsx("p", { children: "Develop your IT skills at EXCERPT TRAININGS" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("h6", { className: "small-heading text-capitalize text-center mt-4", children: /* @__PURE__ */ jsxs("a", { href: "/about", className: "text-dark", target: "_blank", children: [
            "EXCERPT TRAININGS",
            /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "why-choose-agile py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-white text-center mb-5", children: [
        "what we",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " do" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row agileits-w3layouts-grid pt-md-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 services-agile-1", children: /* @__PURE__ */ jsxs("div", { className: "row wthree_agile_us", children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-2 col-3  agile-why-text", children: /* @__PURE__ */ jsx("div", { className: "wthree_features_grid text-center p-3 border rounded", children: /* @__PURE__ */ jsx("i", { className: "fab fa-accusoft" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-9 agile-why-text-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-capitalize text-white font-weight-bold mb-3", children: "special education" }),
            /* @__PURE__ */ jsx("p", { className: "text-white", children: "Excerpt Trainings offered courses like Advance Excel , Tally GST , C, C++, Java , C# , PHP , Python etc." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "btn mt-3 service-button p-0",
                href: "/about",
                role: "button",
                children: [
                  "Read More",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 services-agile-1 my-lg-0 my-5", children: /* @__PURE__ */ jsxs("div", { className: "row wthree_agile_us", children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-2 col-3  agile-why-text", children: /* @__PURE__ */ jsx("div", { className: "wthree_features_grid text-center p-3 border rounded", children: /* @__PURE__ */ jsx("i", { className: "fas fa-book" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-9 agile-why-text-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-capitalize text-white font-weight-bold mb-3", children: "full day session" }),
            /* @__PURE__ */ jsx("p", { className: "text-white", children: "Excerpt Trainings offered advance courses like Android , Advance Java , Machine Learning , Data Science , Digital Marketing , Ethical Hacking etc." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "btn mt-3 service-button p-0",
                href: "/about",
                role: "button",
                children: [
                  "Read More",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 services-agile-1", children: /* @__PURE__ */ jsxs("div", { className: "row wthree_agile_us", children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-2 col-3  agile-why-text", children: /* @__PURE__ */ jsx("div", { className: "wthree_features_grid text-center p-3 border rounded", children: /* @__PURE__ */ jsx("i", { className: "fas fa-users" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-9 agile-why-text-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-capitalize text-white font-weight-bold mb-3", children: "qualified teachers" }),
            /* @__PURE__ */ jsx("p", { className: "text-white", children: "Excerpt Trainings 20 years vast experience in training field online and offline training, on demand we provide online training for students" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "btn mt-3 service-button p-0",
                href: "/about",
                role: "button",
                children: [
                  "Read More",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
                ]
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row agileits-w3layouts-grid mt-5", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 services-agile-1", children: /* @__PURE__ */ jsxs("div", { className: "row wthree_agile_us", children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-2 col-3  agile-why-text", children: /* @__PURE__ */ jsx("div", { className: "wthree_features_grid text-center p-3 border rounded", children: /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-9 agile-why-text-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-capitalize text-white font-weight-bold mb-3", children: "events" }),
            /* @__PURE__ */ jsxs("p", { className: "text-white", children: [
              " ",
              "Excerpt Trainings has provided training to over 10 Thousands+ students and professionals of various countries."
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "btn mt-3 service-button p-0",
                href: "/about",
                role: "button",
                children: [
                  "Read More",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 services-agile-1  my-lg-0 my-5", children: /* @__PURE__ */ jsxs("div", { className: "row wthree_agile_us", children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-2 col-3  agile-why-text", children: /* @__PURE__ */ jsx("div", { className: "wthree_features_grid text-center p-3 border rounded", children: /* @__PURE__ */ jsx("i", { className: "fas fa-graduation-cap" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-9 agile-why-text-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-capitalize text-white font-weight-bold mb-3", children: "pre classNamees" }),
            /* @__PURE__ */ jsx("p", { className: "text-white", children: "Excerpt Trainings has expanded its network and become the topmost leading franchise network." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "btn mt-3 service-button p-0",
                href: "/about",
                role: "button",
                children: [
                  "Read More",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 services-agile-1", children: /* @__PURE__ */ jsxs("div", { className: "row wthree_agile_us", children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-2 col-3  agile-why-text", children: /* @__PURE__ */ jsx("div", { className: "wthree_features_grid text-center p-3 border rounded", children: /* @__PURE__ */ jsx("i", { className: "far fa-clock" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-9 agile-why-text-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-capitalize text-white font-weight-bold mb-3", children: "24/7 supports" }),
            /* @__PURE__ */ jsx("p", { className: "text-white", children: "Get in touch with our support and sales team via email or talk to them using our toll-free numbers." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "btn mt-3 service-button p-0",
                href: "/about",
                role: "button",
                children: [
                  "Read More",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-long-arrow-alt-right ml-1" })
                ]
              }
            )
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "video-choose-agile py-5", children: /* @__PURE__ */ jsx("div", { className: "container py-xl-5 py-lg-3", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-7 video", children: [
        /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
          "our",
          /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " video" })
        ] }),
        /* @__PURE__ */ jsxs("video", { controls: true, width: "100%", children: [
          /* @__PURE__ */ jsx("source", { src: "assests/images/abtvid1.mp4", type: "video/webm" }),
          "Sorry, your browser doesn't support videos."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-5 events", children: [
        /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
          "upcoming",
          /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " events" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "events-w3ls", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
          /* @__PURE__ */ jsx("div", { className: "col-sm-2 col-3 events-up p-3 text-center", children: /* @__PURE__ */ jsxs("h5", { className: "text-white font-weight-bold", children: [
            "1st WEEK",
            /* @__PURE__ */ jsx("span", { className: "border-top font-weight-light pt-2 mt-2", children: "SEP" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-sm-10 col-9 events-right", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-dark", children: "Admission For Internship" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
              /* @__PURE__ */ jsxs("li", { className: "my-2", children: [
                /* @__PURE__ */ jsx("i", { className: "far fa-clock mr-2" }),
                "10.00 am - 4.30 pm"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker mr-2" }),
                "Banglore"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "d-flex my-4", children: [
          /* @__PURE__ */ jsx("div", { className: "col-sm-2 col-3 events-up p-3 text-center", children: /* @__PURE__ */ jsxs("h5", { className: "text-white font-weight-bold", children: [
            "1st WEEK",
            /* @__PURE__ */ jsx("span", { className: "border-top font-weight-light pt-2 mt-2", children: "SEP" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-sm-10 col-9 events-right", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-dark", children: "Admission For courses" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
              /* @__PURE__ */ jsxs("li", { className: "my-2", children: [
                /* @__PURE__ */ jsx("i", { className: "far fa-clock mr-2" }),
                "10.00 am - 4.30 pm"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker mr-2" }),
                "Banglore."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
          /* @__PURE__ */ jsx("div", { className: "col-sm-2 col-3 events-up p-3 text-center", children: /* @__PURE__ */ jsxs("h5", { className: "text-white font-weight-bold", children: [
            "1st WEEK",
            /* @__PURE__ */ jsx("span", { className: "border-top font-weight-light pt-2 mt-2", children: "SEP" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "col-sm-10 col-9 events-right", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-dark", children: "Digital Marketting " }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
              /* @__PURE__ */ jsxs("li", { className: "my-2", children: [
                /* @__PURE__ */ jsx("i", { className: "far fa-clock mr-2" }),
                "10.00 am - 4.30 pm"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker mr-2" }),
                "Banglore."
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "testimonials py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-white text-center mb-5", children: [
        "what our",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " people says" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mis-stage", children: /* @__PURE__ */ jsx(TestiMonials, {}) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "news-section py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
        "our lastest",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " News" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row news-grids-w3l pt-md-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-4 news-grid", children: [
          /* @__PURE__ */ jsx("a", { href: "blog.html", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "assests/images/am1.webp",
              className: "img-fluid",
              alt: "educational programs"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "news-text", children: [
            /* @__PURE__ */ jsxs("div", { className: "news-events-agile event-colo1 py-2 px-3", children: [
              /* @__PURE__ */ jsx("h5", { className: "float-left", children: /* @__PURE__ */ jsx("a", { href: "blog.html", className: "text-white", children: "SEP" }) }),
              /* @__PURE__ */ jsx("div", { className: "post-img float-right", children: /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "far fa-comments text-white" }) }) }),
                /* @__PURE__ */ jsx("li", { className: "mx-3", children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "far fa-heart text-white" }) }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "fas fa-share text-white" }) }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "clearfix" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "detail-bottom", children: [
              /* @__PURE__ */ jsx("h6", { className: "my-3", children: /* @__PURE__ */ jsx("a", { href: "blog.html", className: "text-dark", children: "Internship" }) }),
              /* @__PURE__ */ jsx("p", { children: "An internship is a structured and supervised work experience that allows individuals, typically students or recent graduates, to gain practical exposure and insights into their chosen fields of study or career paths." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-4 news-grid my-md-0 my-sm-5 my-4", children: [
          /* @__PURE__ */ jsx("a", { href: "blog.html", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "assests/images/ap-3.webp",
              className: "img-fluid",
              alt: "field of study"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "news-text", children: [
            /* @__PURE__ */ jsxs("div", { className: "news-events-agile py-2 px-3", children: [
              /* @__PURE__ */ jsx("h5", { className: "float-left", children: /* @__PURE__ */ jsx("a", { href: "blog.html", className: "text-white", children: "SEP" }) }),
              /* @__PURE__ */ jsx("div", { className: "post-img float-right", children: /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "far fa-comments text-white" }) }) }),
                /* @__PURE__ */ jsx("li", { className: "mx-3", children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "far fa-heart text-white" }) }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "fas fa-share text-white" }) }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "clearfix" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "detail-bottom", children: [
              /* @__PURE__ */ jsx("h6", { className: "my-3", children: /* @__PURE__ */ jsx("a", { href: "blog.html", className: "text-dark", children: "Courses" }) }),
              /* @__PURE__ */ jsx("p", { children: "Courses are structured educational programs designed to impart knowledge, skills, and expertise in a specific subject or field of study. They are offered at various academic levels and cater to individuals with diverse interests and career goals." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-4 news-grid", children: [
          /* @__PURE__ */ jsx("a", { href: "blog.html", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "assests/images/am4.webp",
              className: "img-fluid",
              alt: "recent graduates"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "news-text", children: [
            /* @__PURE__ */ jsxs("div", { className: "news-events-agile event-colo3 py-2 px-3", children: [
              /* @__PURE__ */ jsx("h5", { className: "float-left", children: /* @__PURE__ */ jsx("a", { href: "blog.html", className: "text-white", children: "SEP" }) }),
              /* @__PURE__ */ jsx("div", { className: "post-img float-right", children: /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "far fa-comments text-white" }) }) }),
                /* @__PURE__ */ jsx("li", { className: "mx-3", children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "far fa-heart text-white" }) }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "fas fa-share text-white" }) }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "clearfix" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "detail-bottom", children: [
              /* @__PURE__ */ jsx("h6", { className: "my-3", children: /* @__PURE__ */ jsx("a", { href: "blog.html", className: "text-dark", children: "Placement" }) }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Placement refers to the process of assisting individuals, usually students or job seekers, in finding suitable employment opportunities that align with their skills, qualifications, and career aspirations.",
                " "
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
};
const Menu = React.lazy(() => import("./assets/Menu-tPhUOSvX.js"));
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(Menu, {}) }),
    /* @__PURE__ */ jsx(Index, {})
  ] });
}
const Testimonial = () => {
  return /* @__PURE__ */ jsxs("div", { className: "testimonials py-5", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Testimonial | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Contact EXCERPT TRAININGS in Bangalore for IT courses, internships, corporate training, and placement assistance. Call, email, or submit the form."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "“web design, MERN stack, Java, Python, data analytics, data science, cybersecurity, cloud computing, digital marketing,Advance EXCEL,Tally ERP9 with GST,SAP- FICO,Basic MS Office,MYSQL,AWS,Selenium Testing,JAVA Fullstack Development,AutoCAD Mechanical,SolidWorks,CATIA,AutoCAD Civil 3D,Revit Structure,Autocad Architecture,V-Ray, \r\n              web design course bangalore, web design training institute bangalore, web design internship bangalore, web development course for beginners bangalore, mern stack course bangalore, mern full stack development training, mern stack internship in bangalore, java course with placement bangalore, core java training institute bangalore, advanced java course j2ee bangalore, java fullstack developer course bangalore, python course with projects bangalore, python programming classes bangalore, python data science training bangalore, data analytics course with excel bangalore, data analytics certification bangalore, data analytics training with placement, data science with python course bangalore, data science certification training india, cybersecurity course with placement bangalore, ethical hacking and cybersecurity training, cloud computing course aws bangalore, aws certification course bangalore, aws cloud practitioner training bangalore, digital marketing course with internship bangalore, digital marketing training for beginners bangalore, seo and google ads training bangalore, social media marketing course bangalore, advanced excel course with projects bangalore, advanced excel training with placement, tally erp9 course with gst bangalore,\r\n              tally prime and gst training bangalore, sap fico course for beginners bangalore, sap fico certification training bangalore, basic ms office course bangalore, ms word and excel training classes bangalore, mysql database course bangalore, mysql for data analytics bangalore, selenium testing course bangalore, automation testing using selenium java bangalore, java full stack development course bangalore, java spring boot training bangalore, autocad mechanical course bangalore, autocad mechanical design training bangalore, solidworks course for mechanical engineers bangalore, catia design software training bangalore, autocad civil 3d course bangalore, revit structure course bangalore, autocad architecture design course bangalore, v-ray rendering course bangalore, v-ray for sketchup training bangalore, web design and ui ux course bangalore, frontend development using html css javascript bangalore, backend development with node js bangalore, react js training bangalore,\r\n              \r\n              "
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-white text-center mb-5", children: [
        "what our",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "people says" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mis-stage", children: /* @__PURE__ */ jsxs("ol", { className: "mis-slider", children: [
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "#", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "/assests/images/t1.webp", alt: "civil structural project training", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Carl Lii",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "#", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "./assests/images/t2.webp", alt: "full mobile app project training", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Michael Paul",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "link", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "./assests/images/t3.webp", alt: "cloud security engineer training bangalore", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Henry Doe",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "#", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "./assests/images/t4.webp", alt: "python django rest framework course bangalore", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Laura James",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "#", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "./assests/images/t5.webp", alt: "c++ data structures course bangalore", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Thomas Carl",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "#", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "./assests/images/t6.webp", alt: "fullstack web app project training bangalore", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Rosy Crisp",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("li", { className: "mis-slide", children: /* @__PURE__ */ jsx("a", { href: "#", className: "mis-container", children: /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "./assests/images/t4.webp", alt: "advanced software courses in bangalore", className: "img-fluid" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Michael Paul",
            /* @__PURE__ */ jsx("span", { children: "Sed maximus eros quis leo." })
          ] })
        ] }) }) })
      ] }) })
    ] })
  ] });
};
const WhyUs = () => {
  return /* @__PURE__ */ jsx("div", { className: "blog-w3l py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
    /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
      "Why ",
      /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "Us?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-stretch g-4", children: [
      /* @__PURE__ */ jsx("div", { className: "col-lg-6 col-md-12 d-flex", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "card p-5 w-100 text-center shadow-lg",
          style: {
            borderRadius: "15px",
            minHeight: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          },
          children: [
            /* @__PURE__ */ jsx(
              "h4",
              {
                className: "font-weight-bold text-dark mb-4",
                style: { fontSize: "2rem" },
                children: "Why Choose ExcerpTech Training?"
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-dark mx-auto",
                style: {
                  lineHeight: "1.9",
                  fontSize: "1.25rem",
                  maxWidth: "90%"
                },
                children: "At ExcerpTech, we don’t just teach — we transform careers. Our industry-focused training programs are designed to equip you with the latest IT skills that employers demand. With expert trainers, hands-on projects, and a strong placement support system, we ensure you gain real-world experience and the confidence to excel in your career. Whether you're a fresher or a working professional looking to upskill, our personalized learning approach, flexible training modes, and commitment to quality make us the trusted choice for thousands of learners."
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-6 col-md-12 d-flex", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "card p-5 w-100 text-center shadow-lg",
          style: {
            borderRadius: "15px",
            minHeight: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          },
          children: [
            /* @__PURE__ */ jsx(
              "h4",
              {
                className: "font-weight-bold text-dark mb-4",
                style: { fontSize: "1.8rem" },
                children: "10 Reasons to Choose Us"
              }
            ),
            /* @__PURE__ */ jsxs(
              "ul",
              {
                className: "list-unstyled text-center mx-auto",
                style: { fontSize: "1.2rem", fontWeight: "500", maxWidth: "80%" },
                children: [
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Project Based Training"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Certification"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Reliability"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Quality Delivery"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Training by Certified Trainers"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Post Training Support"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Placement Assistance"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Value for Money"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Pre-Placement Training"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check mr-2 text-primary" }),
                    "Best Infrastructure and Services"
                  ] })
                ]
              }
            )
          ]
        }
      ) })
    ] })
  ] }) });
};
const About = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "About Us | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Contact EXCERPT TRAININGS in Bangalore for IT courses, internships, corporate training, and placement assistance. Call, email, or submit the form."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "about excerpt trainings, excerpt trainings about us, excerpt trainings company profile, excerpt trainings information, about our company, about our institute, IT training company Bangalore, software training institute Bangalore, computer education center, about our organization, company overview, company mission, company vision, our values, our story, about our team, our trainers, professional trainers, certified trainers, IT experts Bangalore, top IT training company, leading IT education provider, training company India, software institute India, about education company, best computer training company, trusted IT brand, IT education platform, corporate training company, company history, who we are, what we do, our services, company background, educational services, digital education provider, IT academy, technical training company, professional development institute, IT coaching center, Bangalore training company, about excerpt technologies, excerpt group, excerpt learning, corporate education Bangalore, skill development company, online learning provider, IT skill enhancement, software learning solutions, computer programming institute, coding training company, excerpt tech profile, education startup India, tech education India, technology learning platform, innovation in education, IT career guidance, education consultancy, IT skill building, technical excellence, global education brand, digital growth training, e-learning company, IT certification institute, professional education brand, IT upskilling company, tech skill development, corporate learning partner, software solutions company, edtech company India, IT company Bangalore, about IT business, about IT firm, computer science institute, technology company overview, learning and development company, digital transformation training, IT analytics company, data analytics education, google analytics training, google analytics expert, google analytics services, GA4 consulting, web analytics company, website analytics training, marketing analytics training, data-driven education, google data studio training, digital marketing analytics, business analytics company, education with analytics, analytics education company, learning analytics training, google analytics courses, analytics certification India, analytics professional training, about analytics experts, analytics company Bangalore, google tracking setup, GA4 integration, web tracking solutions, marketing measurement, conversion optimization analytics, IT growth insights, analytics powered learning, digital insights provider, educational analytics platform, AI in education, machine learning training company, data science institute, python analytics training, AI analytics, google cloud training, cloud computing company, web development institute, mern stack training, frontend development company, backend development company, java programming company, python programming institute, software project training, IT internship program, about internship, placement support company, placement training institute, student success stories, company achievements, our journey, educational excellence, quality training provider, professional teaching institute, about our trainers, company credentials, certified learning center, industry recognized company, authorized training partner, corporate tie-ups, IT partnerships, MNC collaborations, job ready training, placement support, about our facilities, smart classrooms, online training platform, virtual learning institute, hybrid learning company, digital academy, e-learning portal, IT mentoring company, software mentor, online coaching company, IT skill academy, innovation in learning, skill development Bangalore, technology innovation education, upskilling programs, reskilling company, AI based training, adaptive learning company, IT transformation partner, business analytics firm, GA tracking company, performance measurement firm, data reporting services, google marketing analytics, GA training course, analytics workshop, data tracking education, traffic analysis company, user behavior analytics, tag manager training, google tag manager expert, GA integration company, measurement and reporting company, ROI analytics, IT growth measurement, digital strategy analytics, education performance analytics, education metrics tracking, digital learning analytics, IT training metrics, google analytics India, GA company India, GA4 Bangalore, web data analytics training, IT analytics expert Bangalore, GA training center, GA certification program, google analytics consultancy, analytics services for education, SEO analytics training, marketing data analytics, GA implementation company, IT education insights, online education analytics, website data tracking, performance insights provider, company reviews, student testimonials, trust and transparency, ISO certified company, quality education company, company recognition, awards and certifications, training excellence, client feedback, student success, our alumni, about management, leadership team, director message, ceo message, board of directors, company founders, education innovators, training pioneers, IT learning journey, education technology company, professional academy, global learning partner, excerpt trainings brand, excerpt training values, excerpt mission and vision, excerpt goal, excerpt trainers team, excerpt analytics training, IT skills for future, future ready education, AI powered institute, education growth metrics, best IT learning partner, professional IT academy Bangalore, software skills training, web analytics education, GA4 event tracking education, user tracking solutions, website metrics learning, business insights training, google analytics for beginners, advanced GA4 training, analytics bootcamp, data tracking course, analytics consulting company, IT innovation firm, learning management system, LMS company Bangalore, edtech analytics, digital performance company, educational data tracking, growth measurement company, GA dashboard company, report automation company, IT reports analytics, company strategy analytics, company impact measurement, student outcome analytics\r\n					  "
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", className: "fixed-header", children: /* @__PURE__ */ jsxs("ol", { className: "breadcrumb", style: { fontSize: "14px", fontFamily: "'Open Sans', sans-serif", padding: ".5em", backgroundColor: "#e9ecef" }, children: [
      /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "About Us" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "about-page py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
        "about",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " us" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row about-head-wthree", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-6 left-abw3ls", children: /* @__PURE__ */ jsx("img", { src: "assests/images/image1.webp", alt: "analytics", className: "img-fluid" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 right-abw3ls mt-lg-0 mt-sm-5 mt-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-italic border-bottom text-center font-weight-bold pb-3 mb-4", children: "Our History" }),
          /* @__PURE__ */ jsx("p", { children: "The world is now witnessing a boom in the information technology industry, which has led to the emergence of a large number of jobs and opportunities; nevertheless, there is a gap between employers and workers since there are not enough skilled persons. " }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: " I hope that everyone of our students is able to realize their full potential and seize many such opportunities on the market.." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "about-page-2 py-5", children: /* @__PURE__ */ jsx("div", { className: "container-fluid py-xl-5 py-lg-3", children: /* @__PURE__ */ jsxs("div", { className: "row about-head-wthree-2", children: [
      /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 left-abw3ls text-lg-left text-center", children: /* @__PURE__ */ jsx("img", { src: "assests/images/abt2.webp", alt: "education innovators", className: "img-fluid" }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-12 right-abw3ls my-lg-0 my-sm-5 my-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-italic border-bottom text-center font-weight-bold pb-3 mb-4", children: "Our Mission" }),
        /* @__PURE__ */ jsx("p", { children: "In partnership with others on the team, you will create enhancements and/or new services and solutions based data acquisition and analytics. You will analyze, design, program, debug and modify software interface for our system. " }),
        /* @__PURE__ */ jsx("p", { className: "mt-3", children: "." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-12 left-abw3ls text-lg-left text-center", children: /* @__PURE__ */ jsx("img", { src: "assests/images/abt3.webp", alt: "quality education company", className: "img-fluid" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(WhyUs, {})
  ] });
};
const Onlineprogram = () => {
  const [activeTab, setActiveTab] = useState("software");
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Online IT Courses | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Join EXCERPT TRAININGS Online IT Courses – learn Python, Java, MERN Stack, Cloud Computing, Data Science, Cybersecurity, and more with live instructors and placement support."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "online it courses bangalore, online programming courses bangalore, online python course with certificate bangalore, online java course bangalore, online mern stack course india, ..."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.excerptech.com/onlineprogram" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: ".5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "onlineprogram" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px"
        },
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("software"),
              style: {
                padding: "12px 28px",
                border: "none",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                background: activeTab === "software" ? "#007bff" : "#e0e0e0",
                color: activeTab === "software" ? "#fff" : "#333",
                boxShadow: activeTab === "software" ? "0 6px 14px rgba(0, 123, 255, 0.3)" : "0 4px 10px rgba(0, 0, 0, 0.1)",
                transform: activeTab === "software" ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease"
              },
              children: "Software Courses"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => navigate("/cadcourse"),
              style: {
                padding: "12px 28px",
                border: "none",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                background: "#28a745",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease"
              },
              onMouseOver: (e) => e.currentTarget.style.background = "#218838",
              onMouseOut: (e) => e.currentTarget.style.background = "#28a745",
              children: "CAD Courses"
            }
          )
        ]
      }
    ),
    activeTab === "software" && /* @__PURE__ */ jsx("div", { className: "course-w3ls py-5 ", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-sm-5 mb-4", children: [
        "course - ",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "Software" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4 cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/1.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "A Guide For Beginners Software" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Java has long been one of the most popular programming languages in the software industry. With its versatility and wide range of applications." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                " Aug"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 Months"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-3" }),
                "70 seats"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/java3.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/1", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/ds1.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main text-right", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/1.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Introduction To Engineering Design" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "if youre looking to explore the fascinating world of data science and gain proficiency in R programming,." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "Aug",
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                "3 - 6 Months",
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "60 seats",
                /* @__PURE__ */ jsx("i", { className: "fas fa-users ml-3" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/2", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4 cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/2.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Organize Of Program Languages" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Mean Stack Development is one such technology that has gained immense popularity among developers." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Aug"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 Months"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-3" }),
                "70 seats"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/ds2.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/3", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/ds7.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main text-right", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/2.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Programming Software Engineer" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: " C/C++ programming internship is a practical learning opportunity designed for students and programming enthusiasts." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "Aug",
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                "3 - 6 Months",
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "60 seats",
                /* @__PURE__ */ jsx("i", { className: "fas fa-users ml-3" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/4", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4 cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/1.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Object-Oriented Programming Java" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Java is an object-oriented programming language which is generally designed either to be compiled to native (machine) code or to be interpreted from source code at runtime.." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Aug"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 Months"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-3" }),
                "70 seats"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/ds8.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/5", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/ds6.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main text-right", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/2.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Algorithms Software Programming" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: " Java offers a plethora of opportunities for developers. Among the various branches of Java, Advanced Java J2EE stands out as a powerful tool for building enterprise-level applications" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "Aug",
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                "3 - 6 Months",
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "60 seats",
                /* @__PURE__ */ jsx("i", { className: "fas fa-users ml-3" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/6", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4 cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/1.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Digitral Marketing" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Any marketing that uses electronic devices and can be used by marketing specialists to convey promotional messaging and measure its impact through your customer journey" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "aug"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 months"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-3" }),
                "70 seats"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/dm2.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/7", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/dm3.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main text-right", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/2.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "AWS" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: " Build, Deploy, and Manage Websites, Apps or Processes On AWS Secure, Reliable Network." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "Aug",
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                "3 - 6 Months",
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "60 seats",
                /* @__PURE__ */ jsx("i", { className: "fas fa-users ml-3" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/8", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4 cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/1.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Android" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "an automaton that resembles a human being. synonyms: humanoid, mechanical man. type of: automaton, golem, robot." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "aug"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 months"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-3" }),
                "70 seats"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/androd1.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/9", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/mern11.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main text-right", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/2.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "MERN STACK" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: " a collection of technologies that enables faster application development" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "Aug",
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                "3 - 6 Months",
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "60 seats",
                /* @__PURE__ */ jsx("i", { className: "fas fa-users ml-3" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/10", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4 cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/1.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "PYTHON" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: " developing websites and software, task automation, data analysis, and data visualization." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "aug"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 months"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users mr-3" }),
                "70 seats"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/python111.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/11", role: "button", children: "Apply Now" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "assests/images/Java-developers1.webp", alt: "", className: "img-fluid" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main text-right", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx("img", { src: "assests/images/2.webp", alt: "", className: "img-fluid img-poiscour mx-auto d-block mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "JAVA" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "  Java. Java is a popular programming language. Java is used to develop mobile apps,." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                "Aug",
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                "3 - 6 Months",
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                "60 seats",
                /* @__PURE__ */ jsx("i", { className: "fas fa-users ml-3" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(Link, { className: "btn button-cour-w3ls text-white", to: "/courses/12", role: "button", children: "Apply Now" }) })
      ] })
    ] }) })
  ] });
};
const Blogs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const blogs = [
    {
      slug: "how-fresher-get-placed",
      title: "How Fresher Can Get Placed With the Right Training",
      description: "Landing a first job can be challenging, but with proper training and upskilling, freshers can boost their chances of placement.",
      image: "/Blogs/how fresher can get placed (1).webp"
    },
    {
      slug: "top-5-it-skills-2025",
      title: "Top 5 IT Skills in 2025",
      description: "The IT industry is evolving rapidly. Here are the top 5 skills that will be in high demand by 2025 including cloud computing, AI, and data science.",
      image: "/Blogs/top 5 it skills (1).webp"
    },
    {
      slug: "career-guidance",
      title: "Career Guidance",
      description: "Choosing the right career path can be confusing. This blog offers expert advice and step-by-step guidance to help you succeed.",
      image: "/Blogs/career guidance blogs (1).webp"
    },
    {
      slug: "python-libraries-2025",
      title: "Top Python Libraries for Data Science in 2025",
      description: "Python continues to dominate data science. Discover the top libraries you must know in 2025 to excel in analytics and AI projects.",
      image: "/Blogs/data science python libraries 2025.webp"
    },
    {
      slug: "ai-tools-2025",
      title: "Top 10 AI Tools Every Developer Should Know in 2025",
      description: "Artificial Intelligence is reshaping development. Explore 10 essential AI tools that developers must master in 2025.",
      image: "/Blogs/top 10 ai tools of 2025.webp"
    },
    {
      slug: "mern-vs-mean-2025",
      title: "MERN vs MEAN Stack: Which is Best for 2025",
      description: "Both MERN and MEAN stacks are popular for full-stack development. Let’s compare them and see which one is better in 2025.",
      image: "/Blogs/mern vs mean stack.webp"
    }
  ];
  const academicProjects = [
    { title: "Cataract Early Detection Using ResNet", image: "/Blogs/catarat early detection.webp" },
    { title: "Fingerprint Spoofing Detection Using Deep Learning", image: "/Blogs/fingerprint spoofing.webp" },
    { title: "Gen-AI Home Interior Design", image: "/Blogs/gen-ai-home-interior.webp" },
    { title: "Gen-AI Try on Clothes", image: "/Blogs/gen ai try on clothes.webp" },
    { title: "Language Translator", image: "/Blogs/language transalator.webp" },
    { title: "Driver Drowsiness Detection", image: "/Blogs/driver drowsiness detection.webp" },
    { title: "Face Mask Detection", image: "/Blogs/face mask detection.webp" },
    { title: "Sentiment Analysis", image: "/Blogs/sentiment analysis.webp" },
    { title: "Phishing Website Detection", image: "/Blogs/phishing website detection.webp" }
  ];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone)) formErrors.phone = "Phone number must be 10 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      formErrors.email = "Invalid email format";
    if (!formData.message.trim()) formErrors.message = "Message cannot be empty";
    return formErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("/api/contact", formData);
        if (response.data.success) {
          setSuccessMessage("Your message has been sent successfully!");
          setFormData({
            name: "",
            phone: "",
            email: "",
            website: "",
            message: ""
          });
          setErrors({});
        } else {
          setSuccessMessage("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSuccessMessage("Something went wrong. Please try again later.");
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "blog-container", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Contact EXCERPT TRAININGS in Bangalore for IT courses, internships, corporate training, and placement assistance. Call, email, or submit the form."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "blogs, tech blogs, IT blogs, education blogs, software blogs, coding blogs, developer blogs, programming blogs, AI blogs, ML blogs, artificial intelligence blogs, machine learning blogs, data science blogs, python blogs, java blogs, MERN blogs, web development blogs, cloud computing blogs, cybersecurity blogs, digital marketing blogs, internship blogs, training blogs, project ideas blogs, coding tips blogs, student blogs, IT education blogs, technology articles, IT trends, software tutorials, programming tutorials, full stack blogs, backend blogs, frontend blogs, web design blogs, html css blogs, javascript blogs, react blogs, node blogs, express blogs, mongodb blogs, career blogs, placement blogs, education updates, academic projects, student projects, capstone projects, mini projects, final year projects, project guide blogs, internship experience blogs, success stories blogs, training center blogs, excerpt trainings blogs, excerpt trainings articles, excerpt technologies blogs, excerpt blogs, it institute blogs, bangalore blogs, whitefield blogs, it course blogs, certification blogs, learning blogs, online course blogs, online training blogs, education portal blogs, coding journey blogs, developer roadmap blogs, cloud career blogs, devops blogs, software engineering blogs, database blogs, sql blogs, nosql blogs, django blogs, flask blogs, php blogs, laravel blogs, wordpress blogs, seo blogs, google ranking blogs, website optimization blogs, AI innovation blogs, chatgpt blogs, automation blogs, IT tools blogs, trending technologies blogs, future of AI blogs, IT skills blogs, upskilling blogs, learning path blogs, mentorship blogs, internship tips blogs, resume building blogs, interview tips blogs, freelancing blogs, startup blogs, IT entrepreneur blogs, digital trends blogs, marketing strategy blogs, linkedin optimization blogs, social media blogs, online learning blogs, knowledge sharing blogs, web apps blogs, mobile apps blogs, UX blogs, UI blogs, UI UX design blogs, Figma blogs, design systems blogs, productivity blogs, IT news blogs, computer science blogs, coding challenge blogs, programming interview blogs, dev community blogs, hackathon blogs, IT events blogs, workshops blogs, online webinar blogs, virtual internship blogs, placement preparation blogs, IT students blogs, technology education blogs, software trends blogs, learning hub blogs, IT career advice blogs, software job blogs, future skills blogs, 2025 IT trends blogs, coding bootcamp blogs, open source blogs, GitHub blogs, Git blogs, version control blogs, software documentation blogs, project showcase blogs, innovation blogs, automation testing blogs, QA blogs, software quality blogs, IT certification blogs, data analytics blogs, power bi blogs, tableau blogs, excel tips blogs, big data blogs, hadoop blogs, spark blogs, dev tools blogs, vs code blogs, google cloud blogs, aws blogs, azure blogs, docker blogs, kubernetes blogs, containerization blogs, deployment blogs, networking blogs, cyber safety blogs, bug bounty blogs, pen testing blogs, digital security blogs, online privacy blogs, IT awareness blogs, IT community blogs, educational resources blogs, learning community blogs, online support blogs, student resources blogs, teacher blogs, training methods blogs, elearning blogs, LMS blogs, education technology blogs, IT innovation blogs, AI news blogs, machine learning research blogs, tech discovery blogs, google analytics blogs, seo strategy blogs, marketing analytics blogs, business intelligence blogs, IT case study blogs, success story blogs, student spotlight blogs, IT internship experience blogs, campus news blogs, placement drives blogs, hiring updates blogs, career growth blogs, professional development blogs, IT upskilling blogs, education reform blogs, academic excellence blogs, skill development blogs, certificate program blogs, training academy blogs, digital education blogs, IT awareness posts, IT trends india blogs, IT jobs blogs, work from home blogs, remote work blogs, remote learning blogs"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "breadcrumb", children: [
      /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Blogs" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "blogs-section", children: [
      /* @__PURE__ */ jsx("h2", { children: "All Blogs" }),
      /* @__PURE__ */ jsxs("div", { className: "blogs-layout", children: [
        /* @__PURE__ */ jsx("div", { className: "blogs-left", children: blogs.map((blog, index) => /* @__PURE__ */ jsxs("div", { className: "blog-card", children: [
          /* @__PURE__ */ jsx("img", { src: blog.image, alt: blog.title, className: "blog-image" }),
          /* @__PURE__ */ jsx("h3", { children: blog.title }),
          /* @__PURE__ */ jsx("p", { children: blog.description }),
          /* @__PURE__ */ jsx(Link, { to: `/blogs/${blog.slug}`, className: "read-more", children: "Read More →" })
        ] }, index)) }),
        /* @__PURE__ */ jsxs("div", { className: "blogs-right", children: [
          /* @__PURE__ */ jsx("h3", { className: "projects-heading", children: "Academic Projects" }),
          /* @__PURE__ */ jsx("div", { className: "project-list", children: academicProjects.map((project, index) => /* @__PURE__ */ jsxs("div", { className: "project-card", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: project.image,
                alt: project.title,
                className: "project-image"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "project-title", children: project.title })
          ] }, index)) }),
          /* @__PURE__ */ jsxs("div", { className: "contact-form", children: [
            /* @__PURE__ */ jsx("h3", { children: "Contact Us" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    placeholder: "Name",
                    value: formData.name,
                    onChange: handleChange,
                    required: true
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("span", { className: "error", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "phone",
                    placeholder: "Phone Number",
                    value: formData.phone,
                    onChange: handleChange,
                    required: true
                  }
                ),
                errors.phone && /* @__PURE__ */ jsx("span", { className: "error", children: errors.phone })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    placeholder: "Email",
                    value: formData.email,
                    onChange: handleChange,
                    required: true
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("span", { className: "error", children: errors.email })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "website",
                  placeholder: "Website",
                  value: formData.website,
                  onChange: handleChange
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    name: "message",
                    placeholder: "Message",
                    value: formData.message,
                    onChange: handleChange,
                    required: true
                  }
                ),
                errors.message && /* @__PURE__ */ jsx("span", { className: "error", children: errors.message })
              ] }),
              /* @__PURE__ */ jsx("button", { type: "submit", className: "submit-btn", children: "Submit" })
            ] }),
            successMessage && /* @__PURE__ */ jsx("p", { className: "success-message", children: successMessage })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const projects = [
  {
    id: 5,
    title: "UI / UX Design",
    desc: "Digital agency website design and development",
    img: "assests/img/project-1.webp"
  },
  {
    id: 6,
    title: "Card Encrypt & Decrypt",
    desc: "Digital agency website design and development",
    img: "assests/images/image5.webp"
  },
  {
    id: 7,
    title: "Cloud Based Chatbot",
    desc: "A chatbot is a computer program that simulates conversation with human end users.",
    img: "assests/images/image4.webp"
  },
  {
    id: 8,
    title: "Online Blood Bank System",
    desc: "The major goal of the blood bank management system is to keep track of blood and donors.",
    img: "assests/images/image1.webp"
  },
  {
    id: 9,
    title: "Airline Reservation System",
    desc: "Airline reservation systems allow airlines to sell their inventory (seats).",
    img: "assests/images/image2.webp"
  },
  {
    id: 10,
    title: "Rural Banking",
    desc: "Reaching banking services to individuals residing in rural areas of the country.",
    img: "assests/images/image3.webp"
  },
  {
    id: 11,
    title: "Keylogger Software",
    desc: "Digital agency website design and development",
    img: "assests/images/images11.jfif"
  },
  {
    id: 12,
    title: "Graphical Password User",
    desc: "Digital agency website design and development",
    img: "assests/images/images6.webp"
  },
  {
    id: 13,
    title: "Security Scanner",
    desc: "Scanner tool designed to find and remove malware from Windows computers.",
    img: "assests/images/images77.webp"
  }
];
const Project = () => {
  return /* @__PURE__ */ jsx("section", { className: "project-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("h2", { children: [
      "Our ",
      /* @__PURE__ */ jsx("span", { children: "Projects" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "project-grid", children: projects.map((p) => /* @__PURE__ */ jsxs("div", { className: "project-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "img-box", children: [
        /* @__PURE__ */ jsx("img", { src: p.img, alt: p.title }),
        /* @__PURE__ */ jsx("div", { className: "overlay", children: /* @__PURE__ */ jsx("a", { href: p.img, target: "_blank", rel: "noreferrer", children: "View Project" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "content", children: [
        /* @__PURE__ */ jsx("h3", { children: p.title }),
        /* @__PURE__ */ jsx("p", { children: p.desc })
      ] })
    ] }, p.id)) })
  ] }) });
};
const Internship = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "INTERNSHIP | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore tutorials and IT training courses by EXCERPT TRAININGS: Web Design, MERN Stack, Java, Python, Data Analytics, Data Science, Cyber Security, Cloud Computing, AI & ML, Digital Marketing. Get hands-on learning with expert mentors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "internship, internships, IT internship, software internship, web development internship, web design internship, MERN internship, Java internship, Core Java internship, Advanced Java internship, J2EE internship, Python internship, data analytics internship, data science internship, cyber security internship, cloud computing internship, digital marketing internship, seo internship, social media internship, content marketing internship, Bangalore internship, Whitefield internship, paid internship, stipend internship, summer internship, winter internship, online internship, offline internship, hybrid internship, fresher internship, student internship, graduate internship, final year internship, engineering internship, computer science internship, BTech internship, MCA internship, BCA internship, diploma internship, frontend internship, backend internship, full stack internship, React internship, Node.js internship, MongoDB internship, Express.js internship, HTML CSS internship, JavaScript internship, TypeScript internship, Bootstrap internship, responsive web design internship, UI internship, UX internship, Java developer internship, Python developer internship, Data analyst internship, Data scientist internship, ML internship, AI internship, AI ML internship, Machine learning internship, Deep learning internship, SQL internship, MySQL internship, PostgreSQL internship, MongoDB internship, DevOps internship, Docker internship, Kubernetes internship, Linux internship, Git internship, GitHub internship, CI CD internship, AWS internship, Azure internship, Google Cloud internship, GCP internship, cloud engineer internship, network security internship, ethical hacking internship, penetration testing internship, SOC internship, incident response internship, digital forensics internship, web app security internship, QA internship, software testing internship, automation testing internship, Selenium internship, Cypress internship, Manual testing internship, performance testing internship, mobile app internship, Android internship, iOS internship, Flutter internship, React Native internship, REST API internship, GraphQL internship, microservices internship, system design internship, OOP internship, DSA internship, algorithms internship, data structures internship, project internship, capstone internship, real-time project internship, industry project internship, mentor-led internship, placement internship, placement assistance internship, job oriented internship, certification internship, internship certificate, internship with certificate, internship with placement, internship training, internship program, internship course, internship classes, internship syllabus, internship duration, internship fees, internship near me, internship Bangalore 560048, KSSIDC ITI Estate internship, Whitefield Road internship, Excerpt Trainings internship, Excerpt Trainings internships, internship registration, apply for internship, enroll internship, join internship, internship admission, internship enquiry, internship contact, best internship in Bangalore, top internship in Bangalore, internship for beginners, internship for freshers, internship with stipend Bangalore, remote internship India, remote software internship, remote IT internship, online coding internship, coding internship Bangalore, programming internship, web internship Bangalore, Java internship Bangalore, Python internship Bangalore, MERN internship Bangalore, data internship Bangalore, cybersecurity internship Bangalore, cloud internship Bangalore, marketing internship Bangalore, digital marketing internship Bangalore, internship weekend batch, internship weekday batch, short term internship, 1 month internship, 2 months internship, 3 months internship, 6 months internship, internship projects Java, internship projects Python, internship projects MERN, internship projects data, internship projects cloud, internship projects security, resume building internship, mock interview internship, interview prep internship, soft skills internship, corporate internship, campus internship, final semester internship, internship openings, internship opportunities, internship 2025, internship intake, internship slots, internship schedule, training and internship, hands-on internship, practical internship, live project internship, internship portfolio, internship letter, internship experience, beginner friendly internship, advanced internship, professional internship, IT training with internship, internship classes Bangalore, internship institute Bangalore, software training internship Bangalore, best IT internship institute, internship SJP, internship Whitefield"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: ".5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Internship" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx("h1", { className: "breadcrumb-title", style: { color: "#fff" } }) }) }) }) }) }),
    /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
      " ",
      "INTERNSHIP",
      /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " Courses" })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "main-wrapper", children: /* @__PURE__ */ jsxs("div", { className: "site-wrapper-reveal", children: [
      /* @__PURE__ */ jsx("div", { className: "blog-pages-wrapper section-space--ptb_100", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/javai.webp",
              alt: "PHP"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "Advance Java(J2EE)" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "Most popular to develop e-commerce websites and ea.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/php.webp",
              alt: "advance java internship"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "PHP" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "Most popular to develop e-commerce websites and ea.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/c++.webp",
              alt: "C/C++"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "C/C++" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "C and C++ both are powerful languages to develop p.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/i3.webp",
              alt: "Python Programming"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "Python Programming" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "Simple, clean syntax, object encapsulation, good l.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/images/digital-marketin1.webp",
              alt: "Digital Marketing"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "Digital Marketing" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "A most powerful tool to grow business and increase.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/javai.webp",
              alt: "Core Java Internship"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "Core Java Internship" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "Most popular in Console Application, Desktop Appli.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/images/webdesign1.webp",
              alt: "Web Design Internship"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: "Web Design Internship" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "Most popular in Websites Designing (static website..)" }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more..." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6  mb-30 wow move-up", children: /* @__PURE__ */ jsxs("div", { className: "single-blog-item blog-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "post-feature blog-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "img-fluid",
              src: "assests/images/cloud 2.webp",
              alt: "Core Java Internship"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "post-info lg-blog-post-info", children: [
            /* @__PURE__ */ jsxs("h2", { className: "post-title font-weight--bold", children: [
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "/onlineprogram", children: " Cloud Computing" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "post-excerpt mt-15", children: /* @__PURE__ */ jsx("p", { children: "Most popular in Console Application, Desktop Appli.." }) }),
            /* @__PURE__ */ jsx("div", { className: "btn-text", children: /* @__PURE__ */ jsxs("a", { href: "/onlineprogram", children: [
              /* @__PURE__ */ jsx("h2", { children: "Read more....." }),
              " ",
              /* @__PURE__ */ jsx("i", { className: "ml-1 button-icon far fa-long-arrow-right" })
            ] }) })
          ] })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "cta-image-area_one section-space--ptb_80 cta-bg-image_one", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-xl-8 col-lg-7", children: /* @__PURE__ */ jsx("div", { className: "cta-content md-text-center", children: /* @__PURE__ */ jsxs("h3", { className: "heading text-white", children: [
          "10,000 Students Already Registred",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-color-secondary", children: "In Internships Course" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-xl-4 col-lg-5", children: /* @__PURE__ */ jsx("div", { className: "cta-button-group--one text-center", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "./",
            className: "btn btn--white btn-one quick-option",
            children: /* @__PURE__ */ jsx("span", { className: "btn-icon mr-2", children: /* @__PURE__ */ jsx("i", { className: "far fa-comment-alt-dots" }) })
          }
        ) }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "projects-wrapper projectinfotechno-bg section-space--ptb_100", children: /* @__PURE__ */ jsx("div", { className: "container" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Project, {})
  ] });
};
const Placement = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "breadcrumb", style: { fontSize: "14px", fontFamily: "'Open Sans', sans-serif", padding: ".5em", backgroundColor: "#e9ecef" }, children: [
      /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home/" }) }),
      /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Placement" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "tabs-wrapper blog-pages-wrapper section-space--ptb_100", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-lg-3 order-lg-1 order-1", children: /* @__PURE__ */ jsx("div", { className: "page-sidebar-content-wrapper page-sidebar-left  small-mt__40 tablet-mt__40", children: /* @__PURE__ */ jsx("div", { className: "sidebar-widget widget-blog-recent-post wow move-up animated", style: { visibility: "visible" }, children: /* @__PURE__ */ jsxs("ul", { className: "nav", role: "tablist", children: [
        /* @__PURE__ */ jsx("li", { className: "tab__item nav-item active", children: /* @__PURE__ */ jsx("a", { className: "nav-link active", id: "nav-tab1", "data-toggle": "tab", href: "#tab_list_03", role: "tab", "aria-selected": "true", children: "Our Placements " }) }),
        /* @__PURE__ */ jsx("li", { className: "tab__item nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", id: "nav-tab1", "data-toggle": "tab", href: "#tab_list_01", role: "tab", "aria-selected": "true", children: "Placement Process" }) }),
        /* @__PURE__ */ jsx("li", { className: "tab__item nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", id: "nav-tab1", "data-toggle": "tab", href: "#tab_list_02", role: "tab", "aria-selected": "true", children: "Our Recruiters" }) }),
        /* @__PURE__ */ jsx("li", { className: "tab__item nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", href: "/contactus", target: "_blank", children: "Career & Placement Cell " }) })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-9 order-lg-2 order-2", children: /* @__PURE__ */ jsxs("div", { className: "tab-content ht-tab__content", children: [
        /* @__PURE__ */ jsx("div", { className: "tab-pane fade show active", id: "tab_list_03", role: "tabpanel", children: /* @__PURE__ */ jsxs("div", { className: "feature-images-wrapper bg-gray", children: [
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsx("div", { className: "section-title-wrap text-center", children: /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
            " Our",
            /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " Placements" })
          ] }) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "feature-images__one", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 aos-init aos-animate", "data-aos": "fade-up", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("section", { className: "d-flex align-items-center", children: [
              /* @__PURE__ */ jsx("figure", { className: "mr-3 mb-0", children: /* @__PURE__ */ jsx("img", { src: "assests/images/pl1.webp", alt: "Ms.LAVINA YOGI" }) }),
              /* @__PURE__ */ jsxs("article", { className: "p-3", children: [
                /* @__PURE__ */ jsx("h5", { className: "mb-2 text-green", style: { fontSize: "16px" }, children: "Ms.LAVINA YOGI" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Course :" }),
                  " JAVA"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mb-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Name Of Company :" }),
                  "EXCERPT TRAININGS "
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 aos-init aos-animate", "data-aos": "fade-up", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("section", { className: "d-flex align-items-center", children: [
              /* @__PURE__ */ jsx("figure", { className: "mr-3 mb-0", children: /* @__PURE__ */ jsx("img", { src: "assests/images/pl3.webp", alt: "Mr. ROHIT SAXENA" }) }),
              /* @__PURE__ */ jsxs("article", { className: "p-3", children: [
                /* @__PURE__ */ jsx("h5", { className: "mb-2 text-green", style: { fontSize: "16px" }, children: "Mr. ROHIT SAXENA" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Course :" }),
                  " AutoCAD,PYTHON (Master Diploma)"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mb-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Name Of Company :" }),
                  "EXCERPT TRAININGS "
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 aos-init aos-animate", "data-aos": "fade-up", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("section", { className: "d-flex align-items-center", children: [
              /* @__PURE__ */ jsx("figure", { className: "mr-3 mb-0", children: /* @__PURE__ */ jsx("img", { src: "assests/images/pl4.webp", alt: "Mr. SURESH SHARMA" }) }),
              /* @__PURE__ */ jsxs("article", { className: "p-3", children: [
                /* @__PURE__ */ jsx("h5", { className: "mb-2 text-green", style: { fontSize: "16px" }, children: "Mr. SURESH SHARMA" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Course :" }),
                  " C Sharp"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mb-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Name Of Company :" }),
                  "EXCERPT TRAININGS "
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 aos-init aos-animate", "data-aos": "fade-up", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("section", { className: "d-flex align-items-center", children: [
              /* @__PURE__ */ jsx("figure", { className: "mr-3 mb-0", children: /* @__PURE__ */ jsx("img", { src: "assests/images/PL6.webp", alt: "Mr. RAGHU NANDAN SHARMA" }) }),
              /* @__PURE__ */ jsxs("article", { className: "p-3", children: [
                /* @__PURE__ */ jsx("h5", { className: "mb-2 text-green", style: { fontSize: "16px" }, children: "Mr. RAGHU NANDAN SHARMA" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Course :" }),
                  " Fullstack wrb developer"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mb-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Name Of Company :" }),
                  "EXCERPT TRAININGS "
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 aos-init aos-animate", "data-aos": "fade-up", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("section", { className: "d-flex align-items-center", children: [
              /* @__PURE__ */ jsx("figure", { className: "mr-3 mb-0", children: /* @__PURE__ */ jsx("img", { src: "assests/images/PL7.webp", alt: "Ms. LOKESH SHARMA" }) }),
              /* @__PURE__ */ jsxs("article", { className: "p-3", children: [
                /* @__PURE__ */ jsx("h5", { className: "mb-2 text-green", style: { fontSize: "16px" }, children: "Ms. LOKESH SHARMA" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Course :" }),
                  " .NET"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mb-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Name Of Company :" }),
                  "EXCERPT TRAININGS "
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 aos-init aos-animate", "data-aos": "fade-up", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("section", { className: "d-flex align-items-center", children: [
              /* @__PURE__ */ jsx("figure", { className: "mr-3 mb-0", children: /* @__PURE__ */ jsx("img", { src: "assests/images/PL8.webp", alt: "ER. LAXMIKANT PRAJAPATI" }) }),
              /* @__PURE__ */ jsxs("article", { className: "p-3", children: [
                /* @__PURE__ */ jsx("h5", { className: "mb-2 text-green", style: { fontSize: "16px" }, children: "ER. LAXMI PRAJAPATI" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Course :" }),
                  " Android"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mb-0", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Name Of Company :" }),
                  "EXCERPT TRAININGS "
                ] })
              ] })
            ] }) })
          ] }) }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "tab-pane fade", id: "tab_list_01", role: "tabpanel", children: /* @__PURE__ */ jsxs("div", { className: "feature-images-wrapper", children: [
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsx("div", { className: "section-title-wrap text-center", children: /* @__PURE__ */ jsx("h3", { className: "heading", children: /* @__PURE__ */ jsx("span", { className: "text-color-primary", style: { fontSize: "16px" }, children: " Placement Process" }) }) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "feature-images__one", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("p", { children: "“Network has grown to more than 20+ cities in 15 states of India.”" }),
            /* @__PURE__ */ jsx("p", { children: "EXCERPT TRAININGS is a leading training network of India in the field of Computer Science and Information Technology. Incorporated in year 2007, EXCERPT TRAININGS is a registered trademark of M/S Parshi training and technical services Pvt. Ltd. Since the inception, EXCERPT TRAININGS has developed as a leading franchise network and our network has grown to more than 20+ cities in 15 states of India. We have started operations in the overseas market as well." }),
            /* @__PURE__ */ jsx("h6", { className: "label problem-label", children: "EXCERPT TRAININGS Presentation" }),
            /* @__PURE__ */ jsx("p", { children: "EXCERPT TRAININGS focuses on student and works on development of his/her knowledge and skills.Various facilities are provided to them i.e. student kit, student panel, books and course material, Live projects, industrial visits, certification& Placement alerts. Certification process is initiated only after receiving feedback and project submission at all level." }),
            /* @__PURE__ */ jsx("h6", { className: "label problem-label", children: "More than 20+ cities in 15 states of India." }),
            /* @__PURE__ */ jsx("p", { children: "EXCERPT TRAININGS focuses on student and works on development of his/her knowledge and skills.Various facilities are provided to them i.e. student kit, student panel, books and course material, Live projects, industrial visits, certification& Placement alerts. Certification process is initiated only after receiving feedback and project submission at all level." })
          ] }) }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "tab-pane fade", id: "tab_list_02", role: "tabpanel", children: /* @__PURE__ */ jsxs("div", { className: "feature-images-wrapper", children: [
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsx("div", { className: "section-title-wrap text-center", children: /* @__PURE__ */ jsx("h3", { className: "heading", children: /* @__PURE__ */ jsx("span", { className: "text-color-primary", style: { fontSize: "19px" }, children: " Our Recruiters" }) }) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("ul", { className: "list-inline d-flex flex-wrap", children: [
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/eight.webp", alt: "Logo 15" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/five.webp", alt: "Logo 14" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/four.webp", alt: "Logo 13" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/nine.webp", alt: "Logo 12" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/one.webp", alt: "Logo 11" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/rec1.webp", alt: "Logo 10" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/rec3.webp", alt: "Logo 9" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/rec2.webp", alt: "Logo 8" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/rec4.webp", alt: "Logo 7" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/rec6.webp", alt: "Logo 6" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/seven.webp", alt: "Logo 5" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/six.webp", alt: "Logo 4" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/ten.webp", alt: "Logo 3" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/two.webp", alt: "Logo 2" }) }),
            /* @__PURE__ */ jsx("li", { "data-aos": "fade-up", "data-aos-once": "true", className: "aos-init aos-animate", children: /* @__PURE__ */ jsx("img", { src: "https://itdeskindia.com/wp-content/uploads/2021/01/Pentagon-Space.webp", alt: "Logo 1" }) })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "tab-pane fade", id: "tab_list_04", role: "tabpanel", children: /* @__PURE__ */ jsx("h2", { children: "asdasdsad" }) })
      ] }) })
    ] }) }) })
  ] });
};
const Contactus = () => {
  const [status, setStatus] = useState("Submit");
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [showPopup, setShowPopup] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(info)
      });
      let result = await response.json();
      console.log(result);
      setStatus("Submitted");
      setInfo({ name: "", email: "", phone: "", subject: "", message: "" });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3e3);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Contact EXCERPT TRAININGS in Bangalore for IT courses, internships, corporate training, and placement assistance. Call, email, or submit the form."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "contact EXCERPT TRAININGS, IT training institute Bangalore contact, IT courses contact, internship contact, corporate training contact, placement assistance contact,\r\n          contact excerpt trainings, excerpt trainings contact, excerpt trainings phone number, excerpt trainings email address, excerpt trainings contact details, excerpt trainings location, excerpt trainings map, excerpt trainings bangalore contact, excerpt trainings whitefield contact, contact it training institute, contact computer training institute, it courses contact number, training center bangalore contact, software training institute contact, contact best it courses, bangalore it institute contact, bangalore training center contact, software training support, contact excerpt technologies, call excerpt trainings, call training center bangalore, email excerpt trainings, email it courses, support excerpt trainings, contact customer service training, training helpline number, inquiry it training, inquiry form it institute, get in touch excerpt trainings, get in touch it courses, talk to excerpt trainings, speak to counsellor it courses, course enquiry excerpt trainings, course counselling contact, admission enquiry it training, admission help contact, admission office number, student support contact, placement office contact, internship enquiry contact, corporate training contact, trainer contact, franchise contact, business enquiry contact, partnership enquiry contact, collaborations contact, hr contact, recruitment contact, join as trainer contact, job openings contact, office address excerpt trainings, head office contact training, branch office contact, whitefield address excerpt trainings, bangalore address excerpt trainings, postal address excerpt trainings, contact us it courses, contact us it training bangalore, contact us software courses, contact online training center, call us it institute, email us training company, send a message excerpt trainings, whatsapp contact it institute, call now excerpt trainings, message us training institute, enquiry form excerpt trainings, feedback contact, complaint contact, request callback contact, request brochure contact, request syllabus contact, schedule demo class contact, schedule counselling contact, talk to academic advisor, talk to placement coordinator, training feedback contact, testimonial enquiry contact, internship registration contact, internship verification contact, placement cell contact, placement confirmation contact, certification contact, certificate verification contact, verification desk contact, helpline it courses, toll free training number, toll free it courses, hotline it support, service desk contact, customer care it institute, online support training, tech support it courses, billing support contact, payment issues contact, refund contact, invoice request contact, receipt contact, gst contact, exam center contact, test schedule contact, assessment contact, results contact, mark sheet contact, document request contact, email id training institute, email id it courses, connect with excerpt trainings, connect with counsellor, nearest center contact, nearest branch contact, local center contact, center location contact, training campus address, campus visit contact, book appointment training center, schedule visit excerpt trainings, site visit contact, campus tour contact, admission help desk, student helpline, exam helpline, placement helpline, internship helpline, trainer helpline, official phone number excerpt trainings, official email excerpt trainings, support team contact, info email excerpt trainings, official website contact, inquiry email excerpt trainings, sales contact training, business contact training, services contact training, support center contact, learning support contact, customer success contact, mentor contact, academic team contact, education counselor contact, enrollment contact, course admission contact, registration contact, register contact training, apply contact training, online admission contact, fee structure contact, fees and payments contact, brochure request contact, online course contact, offline course contact, hybrid course contact, weekend batch contact, weekday batch contact, evening batch contact, morning batch contact, online class support contact, offline class support contact, learning portal contact, elearning support contact, website support contact, social media contact, facebook contact excerpt trainings, instagram contact excerpt trainings, linkedin contact excerpt trainings, youtube contact excerpt trainings, twitter contact excerpt trainings, google business contact, google maps contact, directions excerpt trainings, location it institute, road map excerpt trainings, driving directions contact, nearby training center contact, support available hours, contact hours training institute, working hours contact, open today training contact, holidays contact training, event contact training, seminar contact training, workshop contact training, webinar contact training, training schedule contact, event registration contact, corporate contact training, partner support contact, vendor support contact, media contact training, press contact training, pr contact training, advertisement contact, marketing contact training, sponsorship contact training, brand collaboration contact, community contact training, alumni contact training, old students contact, feedback form contact, suggestion contact, complaint resolution contact, contact management team, director contact, ceo contact, admin contact, helpdesk contact, admissions counsellor contact, course advisor contact, placement coordinator contact, academic head contact, support staff contact, student relationship officer contact, technical enquiry contact, course syllabus contact, certification exam contact, professional training contact, it certification contact, diploma course contact, advanced training contact, corporate office contact, main branch contact, kssidc iti estate contact, whitefield road contact, bangalore 560048 contact, karnataka it training contact\r\n\r\n          "
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Contact EXCERPT TRAININGS" }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: ".5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Contact Us" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "contact py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
        "contact",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: " us" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row contact-grids agile-1 py-sm-5 pb-sm-0 pb-5", children: [
        /* @__PURE__ */ jsx("div", { className: "col-sm-4 contact-grid agileinfo-6 mt-sm-0 mt-2", children: /* @__PURE__ */ jsxs("div", { className: "contact-grid1 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "con-ic", children: /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt rounded-circle" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-weight-bold mt-sm-4 mt-3 mb-3", children: "Address" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "B133/1, 2nd Floor, KSSIDC ITI Estate Whitefield Road, Post,",
            /* @__PURE__ */ jsx("label", { children: "Bangalore-560048" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-sm-4 contact-grid agileinfo-6 my-sm-0 my-4", children: /* @__PURE__ */ jsxs("div", { className: "contact-grid1 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "con-ic", children: /* @__PURE__ */ jsx("i", { className: "fas fa-phone rounded-circle" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-weight-bold mt-sm-4 mt-3 mb-3", children: "Call Us" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "+91 (990) 137 1386",
            /* @__PURE__ */ jsx("label", { children: "+91 7676870744" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-sm-4 contact-grid agileinfo-6", children: /* @__PURE__ */ jsxs("div", { className: "contact-grid1 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "con-ic", children: /* @__PURE__ */ jsx("i", { className: "fas fa-envelope-open rounded-circle" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-weight-bold mt-sm-4 mt-3 mb-3", children: "Email" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("a", { href: "mailto:info@excerptech.com", children: "info@excerptech.com" }),
            /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsx("a", { href: "mailto:excerpttechnologies@gmail.com", children: "excerpttechnologies@gmail.com" }) })
          ] })
        ] }) })
      ] }),
      status !== "Submitted" && /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "contact-grids1 w3agile-6", children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-sm-6 contact-form1 form-group", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "col-form-label",
              htmlFor: "name",
              style: { fontSize: "18px" },
              children: "First Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "name",
              name: "name",
              className: "form-control validate[required]",
              placeholder: "First Name",
              required: true,
              value: info.name,
              onChange: handleChange
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-sm-6 contact-form1 form-group", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "col-form-label",
                htmlFor: "subject",
                style: { fontSize: "18px" },
                children: "Subject"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "subject",
                name: "subject",
                className: "form-control validate[required]",
                placeholder: "Subject",
                required: true,
                value: info.subject,
                onChange: handleChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-sm-6 contact-form1 form-group", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "col-form-label",
                htmlFor: "email",
                style: { fontSize: "18px" },
                children: "E-mail"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                name: "email",
                className: "form-control validate[required, custom[email]]",
                placeholder: "Email",
                required: true,
                value: info.email,
                onChange: handleChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-sm-6 contact-form1 form-group", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "col-form-label",
                htmlFor: "phone",
                style: { fontSize: "18px" },
                children: "Phone Number"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "phone",
                name: "phone",
                className: "form-control validate[required]",
                placeholder: "10-digit Phone Number",
                required: true,
                value: info.phone,
                onChange: (e) => {
                  const val = e.target.value;
                  if (/^\d{0,10}$/.test(val)) {
                    setInfo({ ...info, phone: val });
                  }
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-me animated wow slideInUp form-group", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "col-form-label",
              htmlFor: "message",
              style: { fontSize: "18px" },
              children: "Message"
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "message",
              id: "message",
              className: "form-control ht validate[required]",
              placeholder: "Message",
              required: true,
              value: info.message,
              onChange: handleChange
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "contact-form", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            id: "btnSubmit",
            className: "btn btn_submit",
            name: "landing_register",
            children: status
          }
        ) })
      ] }) }),
      showPopup && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            role: "dialog",
            "aria-labelledby": "thanksTitle",
            "aria-modal": "true",
            style: {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "2rem 3rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              zIndex: 1e3,
              borderRadius: "8px",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx("h4", { id: "thanksTitle", children: "Thank You!" }),
              /* @__PURE__ */ jsx("p", { children: "Your message has been successfully submitted." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 999
            }
          }
        )
      ] })
    ] }) })
  ] });
};
function CertificateGenerator({ firstName, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, coursecertificatr, GENDER, Role }) {
  console.log("Received props:", { firstName, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, GENDER, Role });
  const defaultImage = "/image/default.webp";
  const [selectedDate, setSelectedDate] = useState("");
  const getImageSource = (regNo) => {
    return `/image/${regNo}.webp`;
  };
  const [qrCodeValue, setQrCodeValue] = useState("");
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx("div", { className: "card shadow", children: /* @__PURE__ */ jsxs("div", { style: { textAlign: "justify" }, children: [
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
function Certificate$1({ NAME, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, coursecertificatr, GENDER, Role }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [students2, setStudents] = useState([]);
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
  }, [students2, selectedCollegeName, selectedYOP, searchText, selectedRegNo]);
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
    let filtered = students2;
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
  }, [students2, selectedCollegeName, selectedYOP, searchText, selectedRegNo, selectedCertificateType, selectedCourseCertificateType]);
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
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs("div", { children: [
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
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData);
      const { role } = response.data;
      console.log("Login.js - Login successful, role:", role);
      const isAdmin = role === "admin";
      onLogin(isAdmin);
      navigate("/");
      toast.success("Login successful!", { position: "top-right", autoClose: 2e3 });
    } catch (error) {
      console.error("Login.js - Login error:", error);
      toast.error("Login failed. Please check your credentials.", { position: "top-right" });
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "login-w3ls py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
    /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
      "Login ",
      /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "now" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sub-main-w3 pt-md-4", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "form-style-agile form-group", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            "username ",
            /* @__PURE__ */ jsx("i", { className: "fas fa-user" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              name: "email",
              className: "form-control",
              placeholder: "Email",
              value: formData.email,
              onChange: handleChange,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-style-agile form-group", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            "Password ",
            /* @__PURE__ */ jsx("i", { className: "fas fa-unlock-alt" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              name: "password",
              className: "form-control",
              placeholder: "Password",
              value: formData.password,
              onChange: handleChange,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "list-unstyled list-login", children: /* @__PURE__ */ jsx("li", { className: "float-right", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-right text-white text-capitalize", children: "forgot password?" }) }) }),
        /* @__PURE__ */ jsx("button", { type: "submit", children: "Login" }),
        /* @__PURE__ */ jsxs("p", { className: "text-center dont-do mt-4 text-white", children: [
          "Don't have an account?",
          /* @__PURE__ */ jsx("a", { href: "/register", className: "text-white font-weight-bold", children: "Register Now" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ToastContainer, { position: "top-right", autoClose: 5e3 })
    ] })
  ] }) }) });
};
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
    // default role
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
      console.log(response.data);
      toast.success(`Registration successful!`, {
        position: `top-right`,
        onClose: () => navigate("/login")
        // Navigate to login page after toast is closed
      });
    } catch (error) {
      console.error(error);
      toast.error("Error in registration", { position: "top-right" });
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { class: "login-w3ls py-5", children: /* @__PURE__ */ jsxs("div", { class: "container py-xl-5 py-lg-3", children: [
    /* @__PURE__ */ jsxs("h3", { class: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
      "register",
      /* @__PURE__ */ jsx("span", { class: "font-weight-bold", children: "now" })
    ] }),
    /* @__PURE__ */ jsxs("div", { class: "sub-main-w3 pt-md-4", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { class: "form-style-agile form-group", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            "Your Name",
            /* @__PURE__ */ jsx("i", { class: "fas fa-user" })
          ] }),
          /* @__PURE__ */ jsx("input", { placeholder: "Your Name", class: "form-control", name: "name", type: "text", required: "", value: formData.name, onChange: handleChange })
        ] }),
        /* @__PURE__ */ jsxs("div", { class: "form-style-agile form-group", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            "Email",
            /* @__PURE__ */ jsx("i", { class: "fas fa-envelope" })
          ] }),
          /* @__PURE__ */ jsx("input", { placeholder: "Email", class: "form-control", name: "email", type: "email", required: "", value: formData.email, onChange: handleChange })
        ] }),
        /* @__PURE__ */ jsxs("div", { class: "form-style-agile form-group", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            "Password",
            /* @__PURE__ */ jsx("i", { class: "fas fa-unlock-alt" })
          ] }),
          /* @__PURE__ */ jsx("input", { placeholder: "Password", class: "form-control", name: "password", id: "password1", type: "password", required: "", value: formData.password, onChange: handleChange })
        ] }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("select", { className: "login-1 login-form input ", name: "role", value: formData.role, onChange: handleChange, children: [
          /* @__PURE__ */ jsx("option", { value: "user", children: "User" }),
          /* @__PURE__ */ jsx("option", { value: "user", children: "Staff" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("button", { type: "submit", children: "Register" }) })
      ] }),
      /* @__PURE__ */ jsx(ToastContainer, { position: "top-right", autoClose: 5e3 })
    ] })
  ] }) }) });
};
const itCoursesData = [
  {
    id: 1,
    title: "Digital Marketing",
    image: "/assests/images/digital_marketting.webp",
    description: "A most powerful tool to grow business and increase reach worldwide.",
    link: "/digitalmarketing"
  },
  {
    id: 2,
    title: "Data Science with Python",
    image: "/assests/images/ds-with-python.webp",
    description: "Data science with Python performs data analysis, data visualization.",
    link: "/python"
  },
  {
    id: 3,
    title: "JAVA",
    image: "/assests/images/ds-with-r.webp",
    description: "Data Science with R provides the skills required to work with real data sets",
    link: "/corejava"
  },
  {
    id: 4,
    title: "Mern Stack Development",
    image: "/assests/images/meanstack.webp",
    description: "MEAN is an acronym for MongoDB, Express.js and Angularjs, all of which function upon Node.js",
    link: "/mernstack"
  },
  {
    id: 5,
    title: ".NET",
    image: "/assests/images/tableau.webp",
    description: "Most powerful, secure, and flexible end-to-end analytics platform for data",
    link: "/.net"
  },
  {
    id: 6,
    title: "Python",
    image: "/assests/images/python2.webp",
    description: "high-level programming language with dynamic semantics developed by Guido van Rossum.",
    link: "/python"
  },
  {
    id: 7,
    title: "Ethical Hacking",
    image: "/assests/images/hacking.webp",
    description: "To legally break into computers and networks to test an organizations overall security",
    link: "/ethicalhacking"
  },
  {
    id: 8,
    title: "Fullstack Developer",
    image: "/assests/images/full-stack.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/fullstack"
  },
  {
    id: 9,
    title: "C Sharp",
    image: "/assests/images/csharp.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/csharp"
  },
  {
    id: 10,
    title: "C programming",
    image: "/assests/images/cp.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/cprogramming"
  },
  {
    id: 11,
    title: "Android",
    image: "/assests/images/cg1.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/android"
  },
  {
    id: 12,
    title: "JAVA Fullstack Development",
    image: "/assests/images/cg2.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/fullstack"
  },
  {
    id: 13,
    title: "PHP",
    image: "/assests/images/download2.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/php"
  },
  {
    id: 14,
    title: "Selenium Testing",
    image: "/assests/images/download3.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/selenium"
  },
  {
    id: 15,
    title: "AWS",
    image: "/assests/images/download4.webp",
    description: "A professional responsible for working on both front-end and back-end development processes.",
    link: "/aws"
  },
  {
    id: 16,
    title: "MYSQL",
    image: "/assests/images/download5.webp",
    description: "Fully managed database service for transactions, real-time analytics across data warehouses.",
    link: "/mysql"
  },
  {
    id: 17,
    title: "Basic MS Office",
    image: "/assests/images/ms1.webp",
    description: "Fully managed database service for transactions, real-time analytics across data warehouses.",
    link: "/msoffice"
  },
  {
    id: 18,
    title: "Advance EXCEL",
    image: "/assests/images/ms2.webp",
    description: "Fully managed database service for transactions, real-time analytics across data warehouses.",
    link: "/aexcel"
  },
  {
    id: 19,
    title: "Tally ERP9 with GST",
    image: "/assests/images/ms3.webp",
    description: "Fully managed database service for transactions, real-time analytics across data warehouses.",
    link: "/tally"
  },
  {
    id: 20,
    title: "SAP- FICO",
    image: "/assests/images/ms4.webp",
    description: "Fully managed database service for transactions, real-time analytics across data warehouses.",
    link: "/sap"
  }
];
const cadMechanical = [
  { id: 21, title: "AutoCAD Mechanical", image: "/assests/img/c1.webp", description: "AutoCAD tool used for 2D mechanical drafting." },
  { id: 22, title: "SolidWorks", image: "/assests/img/c2.webp", description: "3D CAD tool for mechanical modeling and simulation." },
  { id: 23, title: "CATIA", image: "/assests/img/c3.webp", description: "Advanced CAD tool used in automotive & aerospace." },
  { id: 24, title: "NX CAD", image: "/assests/img/c4.webp", description: "High-end CAD/CAM/CAE software." },
  { id: 25, title: "Ansys", image: "/assests/img/c5.webp", description: "Finite element analysis and simulation." },
  { id: 26, title: "Creo", image: "/assests/img/c6.webp", description: "Parametric 3D CAD for product design." },
  { id: 27, title: "Fusion 360", image: "/assests/img/c7.webp", description: "Cloud CAD/CAM for design and manufacturing." },
  { id: 28, title: "GD&T", image: "/assests/img/c8.webp", description: "Engineering tolerancing and dimensioning standards." }
];
const cadCivil = [
  { id: 29, title: "AutoCAD Civil 3D", image: "/assests/img/d1.webp", description: "Civil engineering design and documentation." },
  { id: 30, title: "STAAD Pro", image: "/assests/img/d2.webp", description: "Structural analysis and design." },
  { id: 31, title: "ETABS", image: "/assests/img/d3.webp", description: "Building analysis and design." },
  { id: 32, title: "Civil 3D (General)", image: "/assests/img/d5.webp", description: "Infrastructure design tools." },
  { id: 33, title: "Revit Structure", image: "/assests/img/d4.webp", description: "BIM for structural design." }
];
const cadArchitecture = [
  { id: 34, title: "Revit Architecture", image: "/assests/img/e6.webp", description: "BIM-based architectural design." },
  { id: 35, title: "3ds Max", image: "/assests/img/e2.webp", description: "3D visualization and rendering." },
  { id: 36, title: "V-Ray", image: "/assests/img/e1.webp", description: "Photorealistic rendering engine." },
  { id: 37, title: "Lumion", image: "/assests/img/e3.webp", description: "Real-time architectural renders." },
  { id: 38, title: "Google SketchUp", image: "/assests/img/e4.webp", description: "Easy 3D modeling software." },
  { id: 39, title: "AutoCAD Architecture", image: "/assests/img/e5.webp", description: "Architectural design drafting tool." },
  { id: 40, title: "Photoshop for Architecture", image: "/assests/img/e7.webp", description: "Architectural image enhancement." }
];
const AllPrograms = () => {
  const [activeTab, setActiveTab] = useState("itdesk");
  const [activeCadTab, setActiveCadTab] = useState("mechanical");
  const getCourses = () => {
    if (activeTab === "itdesk") return itCoursesData;
    if (activeTab === "cad") {
      if (activeCadTab === "mechanical") return cadMechanical;
      if (activeCadTab === "civil") return cadCivil;
      if (activeCadTab === "architecture") return cadArchitecture;
    }
    return [];
  };
  const getTabTitle = () => {
    if (activeTab === "itdesk") return "EXCERPT TRAININGS";
    if (activeTab === "cad") return "CAD Desk";
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "All Programs | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore all professional IT and software programs at EXCERPT TRAININGS, Bangalore — including Python, Java, MERN, Cloud, Data Science, CAD, SAP, Excel, and more with placement support."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "advanced software courses in bangalore, advanced computer classes bangalore, professional it certification courses bangalore, ..."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: "0.5em 0.5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "All Programs" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx("h1", { className: "breadcrumb-title", style: { color: "#000000ff" }, children: "All Programs" }) }) }) }) }) }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "center", marginBottom: "20px", gap: "15px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab("itdesk"),
          style: {
            padding: "12px 28px",
            borderRadius: "30px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: activeTab === "itdesk" ? "linear-gradient(135deg, #007bff, #00d4ff)" : "#f0f0f0",
            color: activeTab === "itdesk" ? "#fff" : "#333",
            boxShadow: activeTab === "itdesk" ? "0 4px 12px rgba(0, 123, 255, 0.4)" : "0 2px 6px rgba(0,0,0,0.1)"
          },
          children: "IT Courses"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab("cad"),
          style: {
            padding: "12px 28px",
            borderRadius: "30px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: activeTab === "cad" ? "linear-gradient(135deg, #28a745, #85e085)" : "#f0f0f0",
            color: activeTab === "cad" ? "#fff" : "#333",
            boxShadow: activeTab === "cad" ? "0 4px 12px rgba(40, 167, 69, 0.4)" : "0 2px 6px rgba(0,0,0,0.1)"
          },
          children: "CAD Courses"
        }
      )
    ] }),
    activeTab === "cad" && /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", marginBottom: "25px", gap: "12px", flexWrap: "wrap" }, children: [
      { key: "mechanical", label: "Mechanical CAD", gradient: "linear-gradient(135deg, #ff5733, #ffbd69)" },
      { key: "civil", label: "Civil CAD", gradient: "linear-gradient(135deg, #6f42c1, #c29fff)" },
      { key: "architecture", label: "Architecture CAD", gradient: "linear-gradient(135deg, #fd7e14, #f9d29d)" }
    ].map((tab) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveCadTab(tab.key),
        style: {
          padding: "10px 22px",
          borderRadius: "25px",
          border: "none",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          background: activeCadTab === tab.key ? tab.gradient : "#f8f9fa",
          color: activeCadTab === tab.key ? "#fff" : "#333",
          boxShadow: activeCadTab === tab.key ? "0 4px 10px rgba(0,0,0,0.3)" : "0 2px 6px rgba(0,0,0,0.1)"
        },
        children: tab.label
      },
      tab.key
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "trending-courses", children: [
      /* @__PURE__ */ jsxs("h3", { className: "title text-capitalize font-weight-light text-dark text-center mb-5", children: [
        getTabTitle(),
        " - ",
        /* @__PURE__ */ jsx("span", { className: "font-weight-bold", children: "Courses" })
      ] }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("div", { className: "course-list", children: getCourses().map((course) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "course-card",
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          children: [
            /* @__PURE__ */ jsx("img", { src: course.image, alt: course.title }),
            /* @__PURE__ */ jsx("h2", { children: course.title }),
            /* @__PURE__ */ jsx("p", { children: course.description }),
            /* @__PURE__ */ jsx("a", { href: `/course/${course.id}`, children: /* @__PURE__ */ jsx("h2", { children: "Learn More" }) })
          ]
        },
        course.id
      )) })
    ] })
  ] });
};
const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    degree: "B.E",
    stream: "CSE",
    year: "2025",
    img: "/assests/images/pl1.webp",
    review: "The training helped me land my first job as a software developer. The projects were very practical and industry-focused."
  },
  {
    id: 2,
    name: "Ananya Verma",
    degree: "MBA",
    stream: "Finance",
    year: "2024",
    img: "/assests/images/pl2.webp",
    review: "The placement support was excellent. I got placed in a top MNC as a financial analyst thanks to the guidance provided."
  },
  {
    id: 3,
    name: "Rohit Patil",
    degree: "MCA",
    stream: "DS",
    year: "2023",
    img: "/assests/images/pl3.webp",
    review: "Hands-on coding sessions and real-time projects boosted my confidence. I now work as a data scientist."
  },
  {
    id: 4,
    name: "Sneha Iyer",
    degree: "BCA",
    stream: "IT",
    year: "2025",
    img: "/assests/images/pl4.webp",
    review: "The mentors were very supportive. I built a strong foundation in programming and database management."
  },
  {
    id: 5,
    name: "Karan Mehta",
    degree: "B.Com",
    stream: "Accounts",
    year: "2024",
    img: "/assests/images/pl6.webp",
    review: "I improved my analytical and accounting skills here. The faculty gave me practical exposure to real scenarios."
  },
  {
    id: 6,
    name: "Priya Nair",
    degree: "B.E",
    stream: "ECE",
    year: "2023",
    img: "/assests/images/pl9.webp",
    review: "Workshops and labs enhanced my skills. I am now employed as an embedded systems engineer."
  },
  {
    id: 7,
    name: "Amit Singh",
    degree: "MBA",
    stream: "Marketing",
    year: "2025",
    img: "/assests/images/pl7.webp",
    review: "Case studies and live projects made me industry-ready. I work as a digital marketing strategist."
  },
  {
    id: 8,
    name: "Neha Gupta",
    degree: "MCA",
    stream: "AI",
    year: "2024",
    img: "/assests/images/pl8.webp",
    review: "I learned AI and ML with real-world projects. Today I am working as an AI engineer at a reputed firm."
  }
  // {
  //   id: 9,
  //   name: "Vikram Reddy",
  //   degree: "B.E",
  //   stream: "Mechanical",
  //   year: "2023",
  //   img: "/assests/images/PL9.webp",
  //   review:
  //     "Practical training in design software helped me secure a job as a mechanical design engineer.",
  // },
  // {
  //   id: 10,
  //   name: "Shreya Kulkarni",
  //   degree: "B.Sc",
  //   stream: "Physics",
  //   year: "2025",
  //   img: "/assests/images/pl3.webp",
  //   review:
  //     "I gained hands-on research exposure. The mentorship gave me clarity to pursue higher studies abroad.",
  // },
  // {
  //   id: 11,
  //   name: "Arjun Das",
  //   degree: "B.E",
  //   stream: "Civil",
  //   year: "2024",
  //   img: "/assests/images/pl1.webp",
  //   review:
  //     "The structural design projects were very practical. I got placed as a junior civil engineer.",
  // },
  // {
  //   id: 12,
  //   name: "Pooja S",
  //   degree: "MBA",
  //   stream: "HR",
  //   year: "2023",
  //   img: "/assests/images/pl12.webp",
  //   review:
  //     "Interview preparation sessions were excellent. Now I am working as an HR associate in a reputed company.",
  // },
  // {
  //   id: 13,
  //   name: "Manoj Kumar",
  //   degree: "BCA",
  //   stream: "Cloud",
  //   year: "2025",
  //   img: "/assests/images/pl13.webp",
  //   review:
  //     "Cloud computing labs and certifications helped me become a cloud administrator.",
  // },
  // {
  //   id: 14,
  //   name: "Aishwarya Rao",
  //   degree: "MCA",
  //   stream: "Cybersecurity",
  //   year: "2024",
  //   img: "/assests/images/pl14.webp",
  //   review:
  //     "The cybersecurity projects gave me a strong base. I am now working as a security analyst.",
  // },
  // {
  //   id: 15,
  //   name: "Sanjay Yadav",
  //   degree: "B.E",
  //   stream: "EEE",
  //   year: "2023",
  //   img: "/assests/images/pl15.webp",
  //   review:
  //     "Practical circuit design labs boosted my skills. I work as an electrical engineer in the energy sector.",
  // },
  // {
  //   id: 16,
  //   name: "Divya Menon",
  //   degree: "B.Com",
  //   stream: "Finance",
  //   year: "2025",
  //   img: "/assests/images/pl16.webp",
  //   review:
  //     "The finance workshops improved my accounting expertise. I joined as a junior accountant.",
  // },
  // {
  //   id: 17,
  //   name: "Ramesh Babu",
  //   degree: "MBA",
  //   stream: "Operations",
  //   year: "2024",
  //   img: "/assests/images/pl17.webp",
  //   review:
  //     "I got hands-on exposure in supply chain management. Now working as an operations manager.",
  // },
  // {
  //   id: 18,
  //   name: "Meera Joshi",
  //   degree: "B.Sc",
  //   stream: "Mathematics",
  //   year: "2023",
  //   img: "/assests/images/pl18.webp",
  //   review:
  //     "Analytical problem-solving skills improved here. I now teach and do research in applied mathematics.",
  // },
  // {
  //   id: 19,
  //   name: "Ajay Kumar",
  //   degree: "BCA",
  //   stream: "Full Stack",
  //   year: "2024",
  //   img: "/assests/images/pl19.webp",
  //   review:
  //     "Full-stack development training was top-notch. I got hired as a junior software developer.",
  // },
  // {
  //   id: 20,
  //   name: "Ritika Sen",
  //   degree: "MCA",
  //   stream: "Data Analytics",
  //   year: "2025",
  //   img: "/assests/images/pl20.webp",
  //   review:
  //     "Practical projects in data visualization and analytics helped me secure a role as a data analyst.",
  // },
];
const Successtory = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedDegree, setSelectedDegree] = useState("All");
  const [selectedStream, setSelectedStream] = useState("All");
  const [flipped, setFlipped] = useState(null);
  const filteredStudents = students.filter(
    (s) => (selectedYear === "All" || s.year === selectedYear) && (selectedDegree === "All" || s.degree === selectedDegree) && (selectedStream === "All" || s.stream === selectedStream)
  );
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsxs("div", { className: "student-section", children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
        "ol",
        {
          className: "breadcrumb",
          style: {
            fontSize: "14px",
            fontFamily: "'Open Sans', sans-serif",
            padding: "0.5em 0.5em",
            backgroundColor: "#e9ecef"
          },
          children: [
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Success Story" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "breadcrumb-title",
          style: { color: "#000000ff" }
        }
      ) }) }) }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "title", children: "✨ Success Story ✨" }),
      /* @__PURE__ */ jsx("p", { className: "subtitle", children: "Hear from our students who turned dreams into reality 🚀" }),
      /* @__PURE__ */ jsx("div", { className: "cards-container", children: filteredStudents.map((student) => /* @__PURE__ */ jsx("div", { className: "flip-card", children: /* @__PURE__ */ jsxs("div", { className: "flip-card-inner", children: [
        /* @__PURE__ */ jsxs("div", { className: "flip-card-front", children: [
          /* @__PURE__ */ jsx("img", { src: student.img, alt: student.name }),
          /* @__PURE__ */ jsxs("div", { className: "card-details", children: [
            /* @__PURE__ */ jsx("h4", { children: student.name }),
            /* @__PURE__ */ jsxs("p", { children: [
              student.degree,
              " - ",
              student.stream
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "year", children: [
              "🎓 ",
              student.year
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flip-card-back", children: [
          /* @__PURE__ */ jsx("h4", { children: "💬 Review" }),
          /* @__PURE__ */ jsx("p", { children: student.review })
        ] })
      ] }) }, student.id)) })
    ] })
  ] });
};
const tutorials = [
  { id: 1, title: "Web Design Development", description: "Web design is the art of crafting visually appealing, user-friendly websites that deliver a seamless user experience.", image: "/assests/img/web.webp", link: "#" },
  { id: 2, title: "MERN Stack Development", description: "The MERN stack comprises MongoDB, Express.js, React, and Node.js, forming a powerful framework for developing full-stack web applications.", image: "/assests/img/mern.webp", link: "#" },
  { id: 3, title: "Java", description: "Java is a versatile, object-oriented programming language used in enterprise software development.", image: "/assests/img/java.webp", link: "#" },
  { id: 4, title: "Python", description: "Learn Python programming for web development, data science, AI, and automation.", image: "/assests/img/py1.webp", link: "#" },
  { id: 5, title: "Data Analytics", description: "Equips you with the skills and tools to collect, clean, transform, analyze, and interpret data to uncover valuable insights and support informed business decisions.", image: "/assests/img/power.webp", link: "#" },
  { id: 6, title: "Data Science with Python", description: "Master data analysis, visualization, and machine learning with Python libraries.", image: "/assests/img/datas.webp", link: "#" },
  { id: 7, title: "Cyber Security", description: "Learn how to protect systems, networks, and programs from digital attacks.", image: "/assests/img/cybersecurity.jfif", link: "#" },
  { id: 8, title: "Cloud Computing", description: "The on-demand delivery of IT resources—such as servers, storage, databases, software, and analytics—over the internet.", image: "/assests/img/cloudcomputing.jfif", link: "#" },
  { id: 9, title: "AI & ML", description: "AI is a broad field of creating intelligent machines, while Machine Learning (ML) enables systems to learn from data without explicit programming.", image: "/assests/img/aiml.jfif", link: "#" },
  { id: 10, title: "Digital Marketing", description: "Covers strategies like SEO, social media, content marketing, and email marketing to promote products and services online.", image: "/assests/img/digitalmarketing.jfif", link: "#" }
];
const Tutorials = () => {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Tutorials | EXCERPT TRAININGS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore tutorials and IT training courses by EXCERPT TRAININGS: Web Design, MERN Stack, Java, Python, Data Analytics, Data Science, Cyber Security, Cloud Computing, AI & ML, Digital Marketing. Get hands-on learning with expert mentors."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "web design tutorial, web design course, web development tutorial, web development course, MERN stack tutorial, MERN stack course, MongoDB tutorial, Express.js tutorial, React tutorial, Node.js tutorial, java tutorial, java course online, java programming tutorial, python tutorial, python course, data analytics tutorial, data analytics course, data science with python tutorial, data science course online, cyber security tutorial, cyber security course, ethical hacking tutorial, cloud computing tutorial, cloud course, aws tutorial, azure tutorial, google cloud tutorial, ai tutorial, ml tutorial, machine learning course, digital marketing tutorial, digital marketing course, seo tutorial, social media marketing tutorial, content marketing tutorial, email marketing tutorial, full-stack tutorial, full stack course, front end tutorial, back end tutorial, android development tutorial, ios development tutorial, flutter tutorial, react native tutorial, data engineering tutorial, sql tutorial, mysql tutorial, postgresql tutorial, mongodb tutorial, network security tutorial, penetration testing tutorial, cyber security certification course, devops tutorial, devops course, docker tutorial, kubernetes tutorial, linux tutorial, unix tutorial, it certification course, professional it training, online it training, offline it training, classroom it course, weekend batch it training, week day batch it training, beginner it course, advanced it course, placement oriented it course, job oriented tutorial, internship tutorial, internship course, python for data science tutorial, java for enterprise tutorial, web design for beginners tutorial, responsive web design tutorial, bootstrap tutorial, css tutorial, html tutorial, javascript tutorial, react js tutorial, angular tutorial, vue js tutorial, typescript tutorial, programing tutorial, coding tutorial, software engineering tutorial, project based tutorial, mentor led tutorial, live classes it training, self paced tutorial, e-learning it course, corporate training it tutorial, campus training it course, batch schedule tutorial, enrollment it course, register it training, apply it course online, contact it training, contact excerpt trainings, bangalore it training tutorial, bangalore it institute, whitefield it training tutorial, kssidc iti estate training centre, india it training tutorial, global it training tutorial, remote it training tutorial, study online it course, study it course abroad, job placement it course, internship placement it training, resume support it course, mock interview it course, job preparation it course, certification support it course, course completion certificate it training, skill upgradation tutorial, career change it training, upskill it courses, reskill it courses, data visualisation tutorial, tableau tutorial, power bi tutorial, business analytics tutorial, big data tutorial, hadoop tutorial, spark tutorial, ai & ml course, deep learning tutorial, neural networks tutorial, computer vision tutorial, natural language processing tutorial, nlp tutorial, robotics tutorial, iot tutorial, embedded systems tutorial, game development tutorial, unity tutorial, unreal engine tutorial, ethereum tutorial, blockchain tutorial, solidity tutorial, web3 tutorial, metaverse tutorial, augmented reality tutorial, virtual reality tutorial, digital transformation tutorial, devops automation tutorial, ci cd tutorial, jenkins tutorial, git tutorial, version control tutorial, github tutorial, gitlab tutorial, agile methodology tutorial, scrum tutorial, kanban tutorial, it project management tutorial, risk management tutorial, quality assurance tutorial, software testing tutorial, automation testing tutorial, selenium tutorial, cypress tutorial, manual testing tutorial, qa certification course, performance testing tutorial, security testing tutorial, compliance training it course, ethical hacking certification tutorial, penetration testing course, network forensics tutorial, data privacy tutorial, gdpr training it course, cloud security tutorial, cyber forensics tutorial, incident response tutorial, drone programming tutorial, ai ethics tutorial, ml ops tutorial, quantum computing tutorial, quantum machine learning tutorial, bioinformatics tutorial, computational biology tutorial, health informatics tutorial, fintech tutorial, edtech tutorial, remote work tutorial, digital skills tutorial, startup it tutorial, entrepreneur it tutorial, freelancing it tutorial, digital nomad training it course, career in tech tutorial, road map to software engineer tutorial, software architect tutorial, dev lead tutorial, manager training it course,\r\n          tutorials it courses, tutorials web design, tutorials web development, tutorials mern stack, mern tutorials, mongodb tutorial, express tutorial, react tutorial, node tutorial, java tutorials, java programming tutorial, core java tutorial, advanced java tutorial, spring tutorial, spring boot tutorial, python tutorials, python for beginners tutorial, python advanced tutorial, pandas tutorial, numpy tutorial, matplotlib tutorial, seaborn tutorial, data analytics tutorials, power bi tutorial, tableau tutorial, excel analytics tutorial, sql tutorial, mysql tutorial, postgresql tutorial, mongodb basics tutorial, data science with python tutorial, machine learning tutorial, ml tutorial, scikit learn tutorial, deep learning tutorial, tensorflow tutorial, keras tutorial, pytorch tutorial, ai tutorial, artificial intelligence tutorial, nlp tutorial, natural language processing tutorial, computer vision tutorial, opencv tutorial, cyber security tutorial, ethical hacking tutorial, penetration testing tutorial, network security tutorial, cloud computing tutorial, aws tutorial, azure tutorial, google cloud tutorial, devops tutorial, docker tutorial, kubernetes tutorial, ci cd tutorial, jenkins tutorial, git tutorial, github tutorial, gitlab tutorial, linux tutorial, bash tutorial, shell scripting tutorial, web accessibility tutorial, responsive design tutorial, css tutorial, css3 tutorial, html tutorial, html5 tutorial, javascript tutorial, es6 tutorial, typescript tutorial, frontend tutorial, backend tutorial, full stack tutorial, api tutorial, rest api tutorial, graphql tutorial, next.js tutorial, remix tutorial, vite tutorial, webpack tutorial, parcel tutorial, performance optimization tutorial, seo tutorial, on page seo tutorial, technical seo tutorial, digital marketing tutorial, social media marketing tutorial, content marketing tutorial, email marketing tutorial, google ads tutorial, facebook ads tutorial, analytics tutorial, google analytics tutorial, ga4 tutorial, tag manager tutorial, gtm tutorial, conversion tracking tutorial, remarketing tutorial, attribution tutorial, landing page optimization tutorial, a/b testing tutorial, cro tutorial, beginners coding tutorial, coding for beginners, programming basics tutorial, algorithms tutorial, data structures tutorial, dsa tutorial, oops tutorial, design patterns tutorial, system design tutorial, microservices tutorial, distributed systems tutorial, message queues tutorial, kafka tutorial, rabbitmq tutorial, caching tutorial, redis tutorial, database design tutorial, normalization tutorial, indexing tutorial, query optimization tutorial, software testing tutorial, manual testing tutorial, automation testing tutorial, selenium tutorial, cypress tutorial, playwright tutorial, junit tutorial, jest tutorial, react testing library tutorial, dev tools tutorial, chrome devtools tutorial, vscode tutorial, code quality tutorial, linting tutorial, prettier tutorial, security best practices tutorial, oauth tutorial, jwt tutorial, authentication tutorial, authorization tutorial, role based access tutorial, webhooks tutorial, payment gateway tutorial, stripe tutorial, razorpay tutorial, deployment tutorial, docker compose tutorial, containerization tutorial, kubernetes basics tutorial, helm tutorial, cloudformation tutorial, terraform tutorial, serverless tutorial, aws lambda tutorial, netlify tutorial, vercel tutorial, heroku tutorial, digitalocean tutorial, nginx tutorial, apache tutorial, ssl tutorial, https tutorial, dns tutorial, domain setup tutorial, cdn tutorial, cloudflare tutorial, image optimization tutorial, lazy loading tutorial, code splitting tutorial, tree shaking tutorial, accessibility a11y tutorial, lighthouse tutorial, core web vitals tutorial, lcp fid cls tutorial, pwa tutorial, service worker tutorial, web push tutorial, local storage tutorial, indexeddb tutorial, web sockets tutorial, realtime apps tutorial, firebase tutorial, supabase tutorial, sanity tutorial, strapi tutorial, headless cms tutorial, graphql apollo tutorial, urql tutorial, redux tutorial, zustand tutorial, recoil tutorial, react query tutorial, tanstack query tutorial, formik tutorial, react hook form tutorial, chakra ui tutorial, material ui tutorial, bootstrap tutorial, tailwind css tutorial, sass tutorial, less tutorial, figma to code tutorial, ui ux tutorial, design systems tutorial, component libraries tutorial, storybook tutorial, monorepo tutorial, nx tutorial, turborepo tutorial, testing pyramid tutorial, tdd tutorial, bdd tutorial, cuke tutorial, cucumber tutorial, agile tutorial, scrum tutorial, kanban tutorial, jira tutorial, confluence tutorial, project management tutorial, roadmap tutorial, career roadmap software developer, interview prep tutorial, dsa interview tutorial, system design interview tutorial, resume building tutorial, portfolio tutorial, freelancing tutorial, remote developer tutorial, mern stack course bangalore, web development course bangalore, java course bangalore, python course bangalore, data analytics course bangalore, data science course bangalore, cyber security course bangalore, cloud computing course bangalore, ai ml course bangalore, digital marketing course bangalore, tutorials excerpt trainings, excerpt trainings tutorials, excerpt trainings courses, excerpt trainings web design, excerpt trainings mern, excerpt trainings java, excerpt trainings python, excerpt trainings data analytics, excerpt trainings data science, excerpt trainings cyber security, excerpt trainings cloud, excerpt trainings ai ml, excerpt trainings digital marketing\r\n          "
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: "0.5em 0.5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Tutorials" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx("h1", { className: "breadcrumb-title", style: { color: "#000000ff" }, children: "Tutorials" }) }) }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "tutorials-container", children: [
      /* @__PURE__ */ jsx("h1", { className: "page-title", children: "Excerpt Training Services" }),
      /* @__PURE__ */ jsx("div", { className: "tutorials-grid", children: tutorials.map((tutorial) => /* @__PURE__ */ jsxs("div", { className: "tutorial-card", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: tutorial.image,
            alt: tutorial.title,
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsx("h2", { children: tutorial.title }),
        /* @__PURE__ */ jsx("p", { children: tutorial.description }),
        /* @__PURE__ */ jsx("a", { href: tutorial.link, className: "learn-btn" })
      ] }, tutorial.id)) })
    ] })
  ] });
};
const courses = [
  {
    id: 1,
    title: "Java Programming",
    shortDescription: "Master Java fundamentals, OOP concepts, and advanced frameworks for enterprise applications.",
    highlights: [
      "Instructor-Led Sessions",
      "Doubt Clearing Classes",
      "Lifetime Assistance",
      "Industry Projects"
    ],
    overview: "Java remains one of the most powerful and widely used programming languages. This course covers core Java, OOP principles, collections, multithreading, JDBC, and frameworks like Spring & Hibernate, preparing you for enterprise-level application development.",
    contents: [
      "Introduction to Java & OOP",
      "Data Types, Variables, and Operators",
      "Control Statements & Loops",
      "Classes, Objects, and Inheritance",
      "Exception Handling & Multithreading",
      "JDBC and Database Connectivity",
      "Spring Framework Basics",
      "Hibernate ORM"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/java6.webp"
  },
  {
    id: 2,
    title: "Engineering Design with R Programming",
    shortDescription: "Leverage R programming for statistical modeling, simulation, and engineering data analysis.",
    highlights: [
      "Hands-on Statistical Analysis",
      "Project-Based Learning",
      "Industry Case Studies",
      "Certification Assistance"
    ],
    overview: "R is widely used for data analysis, visualization, and engineering simulations. This course blends engineering design concepts with R, enabling you to analyze datasets, simulate models, and solve real-world problems.",
    contents: [
      "Basics of R Programming",
      "Data Structures in R",
      "Statistical Models",
      "Data Visualization",
      "Regression & Classification",
      "Engineering Simulations",
      "Optimization Techniques",
      "Capstone Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/rp.webp"
  },
  {
    id: 3,
    title: "MERN Stack Development",
    shortDescription: "Build full-stack applications using MongoDB, Express.js, React, and Node.js.",
    highlights: [
      "Frontend & Backend",
      "Real-World Projects",
      "REST APIs",
      "Deployment Skills"
    ],
    overview: "This course helps you master the MERN stack for creating dynamic full-stack applications. You’ll learn how to manage databases, build APIs, and create responsive UIs with React.",
    contents: [
      "MongoDB Basics",
      "Express.js APIs",
      "React.js Fundamentals",
      "Node.js Backend",
      "Authentication & JWT",
      "REST APIs & GraphQL",
      "Deployment with Cloud",
      "Capstone MERN Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/mernde.webp"
  },
  {
    id: 4,
    title: "C/C++ Programming",
    shortDescription: "Learn low-level and high-performance programming with C and C++.",
    highlights: [
      "Hands-on Coding",
      "Data Structures & Algorithms",
      "System Programming",
      "Industry Projects"
    ],
    overview: "C and C++ are foundational languages for software development. This course covers basics to advanced concepts including memory management, pointers, OOP with C++, and STL to help you build high-performance applications.",
    contents: [
      "Introduction to C Language",
      "Loops, Functions, and Arrays",
      "Pointers and Memory Management",
      "Structures and File Handling",
      "C++ Classes and Objects",
      "Inheritance and Polymorphism",
      "Templates & Exception Handling",
      "STL (Standard Template Library)"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/c0.webp"
  },
  {
    id: 5,
    title: "Object-Oriented Programming with Java",
    shortDescription: "Deep dive into OOP concepts and Java’s implementation for enterprise-level applications.",
    highlights: [
      "Core Java Mastery",
      "Real-World Applications",
      "Design Patterns",
      "Industry Case Studies"
    ],
    overview: "This course focuses on mastering object-oriented programming using Java. Learn encapsulation, inheritance, polymorphism, and abstraction with real-world projects and design patterns.",
    contents: [
      "Introduction to OOP Principles",
      "Encapsulation & Abstraction",
      "Inheritance & Polymorphism",
      "Interfaces & Abstract Classes",
      "Collections Framework",
      "Design Patterns in Java",
      "Multithreading in OOP",
      "Project Implementation"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/oops.webp"
  },
  {
    id: 6,
    title: "Algorithms & Software Programming",
    shortDescription: "Master algorithms, problem-solving, and efficient software programming techniques.",
    highlights: [
      "Algorithm Design",
      "Problem Solving",
      "Coding Challenges",
      "Optimization Skills"
    ],
    overview: "This course focuses on algorithms and their role in software programming. Learn sorting, searching, dynamic programming, greedy techniques, and advanced problem-solving strategies.",
    contents: [
      "Introduction to Algorithms",
      "Time & Space Complexity",
      "Sorting & Searching Algorithms",
      "Recursion & Divide and Conquer",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Graph Algorithms",
      "Case Studies & Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/algo.webp"
  },
  {
    id: 7,
    title: "Digital Marketing",
    shortDescription: "Learn SEO, SEM, Social Media, and Analytics to grow businesses online.",
    highlights: [
      "Hands-on SEO Training",
      "Live Campaigns",
      "Social Media Tools",
      "Google Ads Certification"
    ],
    overview: "Digital marketing is the backbone of modern businesses. This course covers SEO, Google Ads, social media marketing, and analytics to prepare you for a career in online marketing.",
    contents: [
      "Introduction to Digital Marketing",
      "Search Engine Optimization",
      "Google Ads & SEM",
      "Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "Analytics & Reporting",
      "Capstone Marketing Campaign"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/dm.webp"
  },
  {
    id: 8,
    title: "AWS (Amazon Web Services)",
    shortDescription: "Master cloud computing with AWS fundamentals, EC2, S3, Lambda, and DevOps tools.",
    highlights: [
      "Cloud Infrastructure",
      "Hands-on Labs",
      "DevOps Practices",
      "Certification Preparation"
    ],
    overview: "AWS is the global leader in cloud computing. This course covers AWS fundamentals including compute, storage, networking, IAM, Lambda, and DevOps tools to prepare for AWS certifications.",
    contents: [
      "AWS Cloud Fundamentals",
      "EC2, S3, and EBS",
      "IAM & Security",
      "Networking in AWS",
      "RDS & DynamoDB",
      "Serverless with Lambda",
      "CI/CD with AWS",
      "AWS Certification Prep"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/aws1.webp"
  },
  {
    id: 9,
    title: "Android Development",
    shortDescription: "Learn Android app development using Java/Kotlin, Android Studio, and Firebase.",
    highlights: [
      "Mobile UI Design",
      "Kotlin & Java",
      "Firebase Integration",
      "Publish Apps on Play Store"
    ],
    overview: "This course teaches Android development from scratch. Learn to build mobile apps using Java/Kotlin, design user interfaces, integrate Firebase, and publish to the Play Store.",
    contents: [
      "Introduction to Android",
      "Activities & Intents",
      "UI Design with XML",
      "Java/Kotlin for Android",
      "Firebase Authentication & Database",
      "Push Notifications",
      "App Deployment",
      "Capstone Mobile App Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/an.webp"
  },
  {
    id: 10,
    title: "MEAN Stack Development",
    shortDescription: "Develop full-stack applications using MongoDB, Express.js, Angular, and Node.js.",
    highlights: [
      "Frontend & Backend",
      "Angular Framework",
      "REST APIs",
      "Deployment Skills"
    ],
    overview: "MEAN stack is a popular full-stack development choice. This course covers MongoDB, Express.js, Angular, and Node.js to help you create scalable full-stack applications.",
    contents: [
      "MongoDB Fundamentals",
      "Express.js APIs",
      "Angular Basics",
      "Node.js Server",
      "Authentication & JWT",
      "REST API Integration",
      "Deployment with Cloud",
      "MEAN Capstone Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/mern33.webp"
  },
  {
    id: 11,
    title: "Python Programming",
    shortDescription: "Master Python fundamentals, data structures, and frameworks for real-world projects.",
    highlights: [
      "Beginner to Advanced",
      "Data Structures",
      "Django & Flask",
      "AI/ML Basics"
    ],
    overview: "Python is a versatile language for web, data science, and automation. This course covers Python syntax, OOP, data structures, Django, Flask, and introduces AI/ML.",
    contents: [
      "Python Basics & Syntax",
      "Functions & Modules",
      "OOP in Python",
      "File Handling & Exceptions",
      "Libraries: NumPy & Pandas",
      "Flask & Django Basics",
      "Intro to Machine Learning",
      "Capstone Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/python.webp"
  },
  {
    id: 12,
    title: "Advanced Java",
    shortDescription: "Take your Java skills to the next level with enterprise frameworks and APIs.",
    highlights: [
      "Advanced Java APIs",
      "Spring Boot",
      "Hibernate",
      "Enterprise Projects"
    ],
    overview: "This course is designed for students who already know core Java and want to advance. Learn enterprise-level frameworks, REST APIs, Spring Boot, and database integration.",
    contents: [
      "Advanced Java APIs",
      "Java Database Connectivity (JDBC)",
      "Servlets & JSP",
      "Spring & Spring Boot",
      "Hibernate ORM",
      "RESTful Web Services",
      "Microservices Architecture",
      "Capstone Enterprise Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/assests/img/ajava.webp"
  }
];
function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: "0.5em 0.5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "Courses" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx("h1", { className: "breadcrumb-title", style: { color: "#000000ff" }, children: "Courses" }) }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "course-page", children: !selectedCourse ? /* @__PURE__ */ jsx("div", { className: "course-list", children: courses.map((course) => /* @__PURE__ */ jsxs("div", { className: "course-card", children: [
      /* @__PURE__ */ jsx("h2", { children: course.title }),
      /* @__PURE__ */ jsx("p", { children: course.shortDescription }),
      /* @__PURE__ */ jsx("button", { onClick: () => setSelectedCourse(course), children: "Learn More" })
    ] }, course.id)) }) : /* @__PURE__ */ jsxs("div", { className: "course-details", children: [
      /* @__PURE__ */ jsx("button", { className: "back-btn", onClick: () => setSelectedCourse(null), children: "← Back" }),
      /* @__PURE__ */ jsx("h1", { children: selectedCourse.title }),
      /* @__PURE__ */ jsx("div", { className: "highlights", children: selectedCourse.highlights.map((h, i) => /* @__PURE__ */ jsx("div", { className: "highlight-box", children: /* @__PURE__ */ jsx("p", { children: h }) }, i)) }),
      /* @__PURE__ */ jsxs("section", { className: "overview", children: [
        /* @__PURE__ */ jsx("h2", { children: "Course Overview" }),
        /* @__PURE__ */ jsx("p", { children: selectedCourse.overview })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "contents", children: [
        /* @__PURE__ */ jsx("h2", { children: "Course Contents" }),
        /* @__PURE__ */ jsx("ul", { children: selectedCourse.contents.map((c, i) => /* @__PURE__ */ jsx("li", { children: c }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "certificate", children: [
        /* @__PURE__ */ jsx("h2", { children: "Certification" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: selectedCourse.certificate,
            alt: `${selectedCourse.title} Certificate`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "apply-form", children: [
        /* @__PURE__ */ jsx("h2", { children: "Apply Now" }),
        /* @__PURE__ */ jsxs("form", { children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Name", required: true }),
          /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Mobile", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "State", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Preferred Center", required: true }),
          /* @__PURE__ */ jsx("button", { type: "submit", children: "Apply" })
        ] })
      ] })
    ] }) })
  ] });
}
const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => parseInt(c.id) === parseInt(id));
  if (!course) {
    return /* @__PURE__ */ jsxs("div", { style: { padding: "60px", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Course Not Found" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/onlineprogram",
          style: { color: "#0056b3", textDecoration: "underline" },
          children: "← Back to Courses"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: "0.5em 0.5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx(Link, { to: "/", style: { textDecoration: "none", color: "#0056b3" }, children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/onlineprogram",
              style: { textDecoration: "none", color: "#0056b3" },
              children: "Courses"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: course.title })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx("h1", { className: "breadcrumb-title", style: { color: "#000000ff" }, children: course.title }) }) }) }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "course-details",
        style: {
          maxWidth: "1200px",
          margin: "20px auto",
          padding: "40px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
        },
        children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/onlineprogram",
              className: "back-btn",
              style: {
                color: "#0056b3",
                textDecoration: "none",
                marginBottom: "25px",
                display: "inline-block"
              },
              children: "← Back"
            }
          ),
          /* @__PURE__ */ jsx("h1", { children: course.title }),
          /* @__PURE__ */ jsx(
            "section",
            {
              className: "highlights",
              style: {
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "40px"
              },
              children: course.highlights.map((h, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "highlight-box",
                  style: {
                    background: "#f1f5ff",
                    fontSize: "16px",
                    padding: "20px",
                    borderRadius: "10px",
                    flex: "1",
                    minWidth: "220px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#0056b3"
                  },
                  children: h
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs("section", { className: "overview", style: { marginTop: "40px" }, children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: "26px",
                  marginBottom: "15px",
                  color: "#0056b3",
                  borderBottom: "2px solid #f1f5ff",
                  display: "inline-block",
                  paddingBottom: "5px"
                },
                children: "Course Overview"
              }
            ),
            /* @__PURE__ */ jsx("p", { children: course.overview })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "contents", style: { marginTop: "40px" }, children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: "26px",
                  marginBottom: "15px",
                  color: "#0056b3",
                  borderBottom: "2px solid #f1f5ff",
                  display: "inline-block",
                  paddingBottom: "5px"
                },
                children: "Course Contents"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: { display: "flex", gap: "40px", alignItems: "flex-start" },
                children: [
                  /* @__PURE__ */ jsx("ul", { style: { listStyle: "disc", marginLeft: "25px", flex: 1 }, children: course.contents.map((c, i) => /* @__PURE__ */ jsx("li", { style: { fontSize: "16px", marginBottom: "8px" }, children: c }, i)) }),
                  course.certificate && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: course.certificate,
                      alt: `${course.title} Certificate`,
                      style: {
                        maxWidth: "350px",
                        height: "auto",
                        borderRadius: "12px",
                        border: "2px solid #eee",
                        flexShrink: 0,
                        marginRight: "120px"
                      }
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "section",
            {
              className: "apply-form",
              style: {
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "40px"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsx(
                    "h2",
                    {
                      style: {
                        fontSize: "26px",
                        marginBottom: "15px",
                        color: "#0056b3",
                        borderBottom: "2px solid #f1f5ff",
                        display: "inline-block",
                        paddingBottom: "5px"
                      },
                      children: "Apply Now"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "form",
                    {
                      style: {
                        display: "grid",
                        gap: "15px",
                        maxWidth: "450px",
                        marginTop: "20px"
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Name",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "email",
                            placeholder: "Email",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Mobile",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "State",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Preferred Center",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "submit",
                            style: {
                              padding: "14px",
                              background: "#0056b3",
                              color: "#fff",
                              borderRadius: "8px",
                              fontSize: "14px",
                              border: "none",
                              cursor: "pointer"
                            },
                            children: "Apply"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsx(
                    "h2",
                    {
                      style: {
                        fontSize: "26px",
                        marginBottom: "15px",
                        color: "#0056b3",
                        borderBottom: "2px solid #f1f5ff",
                        display: "inline-block",
                        paddingBottom: "5px"
                      },
                      children: "How will you get your certificate?"
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "16px", lineHeight: "1.7", color: "#333" }, children: [
                    "Upon successful completion of the program, each intern receives a prestigious ",
                    /* @__PURE__ */ jsx("b", { children: " Internship Certificate" }),
                    ". This credential not only recognizes their achievements but also enhances their employability."
                  ] }),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "16px", lineHeight: "1.7", color: "#333" }, children: [
                    /* @__PURE__ */ jsx("b", { children: "Excerpt Trainings" }),
                    " is a pioneer in IT training and most of the industries give great recognition to its certificate throughout India and abroad. Excerpt Trainings Certificates are",
                    " ",
                    /* @__PURE__ */ jsx("b", { children: "ISO verified" }),
                    " which makes CAD highly reputed compared to other local brands and helps students get prioritized while applying for job opportunities in the industry."
                  ] }),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "16px", lineHeight: "1.7", color: "#333" }, children: [
                    "Excerpt Software Training is conducted by highly knowledgeable trainers who emphasize ",
                    /* @__PURE__ */ jsx("b", { children: "project-based learning" }),
                    ", helping students enhance their skill set effectively."
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
};
const coursescad = [
  {
    id: 1,
    title: "AutoCAD",
    shortDescription: "Learn to design and draft 2D and 3D models using AutoCAD for engineering and architectural projects.",
    highlights: [
      "Hands-on Projects",
      "Industry-Relevant Curriculum",
      "Lifetime Access",
      "Expert Mentors"
    ],
    overview: "AutoCAD is one of the most widely used computer-aided design (CAD) tools. This course covers the essentials of 2D drafting and 3D modeling, helping you master design and documentation for mechanical, civil, and architectural applications.",
    contents: [
      "Introduction to AutoCAD",
      "Drawing Tools & Drafting Basics",
      "Layers, Blocks, and Properties",
      "Dimensioning and Annotations",
      "2D Drafting Techniques",
      "3D Modeling Fundamentals",
      "Layouts and Plotting",
      "Industry-Level Project Work"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/auto.webp"
  },
  {
    id: 2,
    title: "SolidWorks",
    shortDescription: "Master 3D design and simulation for mechanical engineering using SolidWorks software.",
    highlights: [
      "Practical Design Skills",
      "Real-Time Simulations",
      "Doubt Support",
      "Project-Based Learning"
    ],
    overview: "SolidWorks is a leading 3D CAD software for product design and development. This course will help you create, simulate, and analyze models, making you industry-ready for mechanical and manufacturing sectors.",
    contents: [
      "Introduction to SolidWorks Interface",
      "Sketching Essentials",
      "Part Modeling & Assembly",
      "Sheet Metal Design",
      "Weldments",
      "Surface Modeling",
      "Motion Study",
      "Simulation & Analysis"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/solidp.webp"
  },
  {
    id: 3,
    title: "CATIA",
    shortDescription: "Learn advanced 3D product design and modeling techniques with CATIA software.",
    highlights: [
      "Comprehensive Design Training",
      "Industry Projects",
      "Experienced Trainers",
      "Lifetime Access"
    ],
    overview: "CATIA is widely used in aerospace, automotive, and manufacturing industries. This course focuses on advanced design, surface modeling, and product lifecycle management tools to prepare you for complex design challenges.",
    contents: [
      "Introduction to CATIA",
      "Sketcher Workbench",
      "Part Design",
      "Assembly Design",
      "Drafting",
      "Generative Shape Design",
      "Sheet Metal Design",
      "Real-Time Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/catiop.webp"
  },
  {
    id: 4,
    title: "NX CAD",
    shortDescription: "Master Siemens NX CAD for advanced product design and development.",
    highlights: [
      "Advanced 3D Modeling",
      "Real-Time Projects",
      "Expert Mentoring",
      "Simulation Tools"
    ],
    overview: "Siemens NX CAD is used in industries for advanced design and product engineering. This course provides practical exposure to 3D modeling, assemblies, and drafting for complex engineering products.",
    contents: [
      "Introduction to NX CAD",
      "Basic Sketching Tools",
      "3D Modeling & Features",
      "Assembly Modeling",
      "Drafting Techniques",
      "Sheet Metal Tools",
      "Product Simulation",
      "Industry-Level Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/nxcadp.webp"
  },
  {
    id: 5,
    title: "ANSYS",
    shortDescription: "Perform engineering simulations and analysis with ANSYS software.",
    highlights: [
      "Practical Simulation Skills",
      "CAE Tools Training",
      "Lifetime Support",
      "Real-Time Project Work"
    ],
    overview: "ANSYS is a powerful tool for engineering simulations like structural, thermal, and fluid analysis. This course equips you with simulation skills to optimize designs and test performance virtually.",
    contents: [
      "Introduction to ANSYS",
      "Static Structural Analysis",
      "Thermal Analysis",
      "Fluid Flow (CFD) Basics",
      "Modal Analysis",
      "Dynamic Analysis",
      "Optimization Techniques",
      "Project Work"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/ansysp.webp"
  },
  {
    id: 6,
    title: "Creo",
    shortDescription: "Learn product design and development using Creo Parametric software.",
    highlights: [
      "Comprehensive Training",
      "Industry Projects",
      "Design Simulation",
      "Lifetime Access"
    ],
    overview: "Creo Parametric is a widely used tool for mechanical design and 3D modeling. This course focuses on parametric modeling, assembly creation, and surface modeling for various industrial applications.",
    contents: [
      "Introduction to Creo",
      "Sketcher Basics",
      "Part Modeling",
      "Assembly Design",
      "Surface Design",
      "Sheet Metal Tools",
      "Drafting & Detailing",
      "Real-Time Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/creop.webp"
  },
  {
    id: 7,
    title: "Fusion 360",
    shortDescription: "Master cloud-based 3D modeling and CAD/CAM with Fusion 360.",
    highlights: [
      "Hands-On Projects",
      "Cloud-Based Design",
      "Simulation Training",
      "Industry Applications"
    ],
    overview: "Fusion 360 combines CAD, CAM, and CAE into a single cloud-based tool. This course focuses on product design, manufacturing workflows, and simulation for mechanical and product design engineers.",
    contents: [
      "Introduction to Fusion 360",
      "Sketching & Constraints",
      "3D Part Modeling",
      "Assembly Modeling",
      "CAM for Manufacturing",
      "Simulation Basics",
      "Rendering Techniques",
      "Industry Project Work"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/fusionp.webp"
  },
  {
    id: 8,
    title: "GD&T",
    shortDescription: "Learn Geometric Dimensioning and Tolerancing for precision engineering design.",
    highlights: [
      "Industry Standards",
      "Practical Examples",
      "Expert-Led Sessions",
      "Lifetime Access"
    ],
    overview: "GD&T is essential for communicating design intent in manufacturing. This course covers tolerancing principles, symbols, and real-world applications to ensure accurate part design and production.",
    contents: [
      "Introduction to GD&T",
      "GD&T Symbols and Definitions",
      "Form and Orientation Tolerances",
      "Position and Profile Tolerances",
      "Runout and Datum Systems",
      "Tolerance Stacks",
      "Inspection Methods",
      "Practical Applications"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/gd&t.webp"
  },
  {
    id: 9,
    title: "Civil 3D",
    shortDescription: "Learn civil engineering design and documentation using Autodesk Civil 3D.",
    highlights: [
      "Civil Engineering Focused",
      "Industry-Level Projects",
      "Practical Learning",
      "Lifetime Support"
    ],
    overview: "Autodesk Civil 3D is used for civil infrastructure design. This course teaches surveying, terrain modeling, road design, and project documentation for civil engineering professionals.",
    contents: [
      "Introduction to Civil 3D",
      "Surveying Basics",
      "Surface Modeling",
      "Alignments & Profiles",
      "Corridor Design",
      "Pipe Networks",
      "Quantity Takeoff",
      "Project Documentation"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/civil 3d.webp"
  },
  {
    id: 10,
    title: "STAAD.Pro",
    shortDescription: "Master structural analysis and design using STAAD.Pro software.",
    highlights: [
      "Real-Time Structural Projects",
      "Industry-Relevant Curriculum",
      "Expert Mentoring",
      "Lifetime Access"
    ],
    overview: "STAAD.Pro is a leading tool for structural analysis and design. This course covers fundamentals to advanced techniques in designing buildings, bridges, and other structures.",
    contents: [
      "Introduction to STAAD.Pro",
      "Structural Basics",
      "Modeling and Loads",
      "Steel and Concrete Design",
      "Dynamic Analysis",
      "Foundation Design",
      "Seismic Design Concepts",
      "Real-Time Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/staadp.webp"
  },
  {
    id: 11,
    title: "Revit Structure",
    shortDescription: "Learn structural modeling and design with Autodesk Revit Structure.",
    highlights: [
      "BIM-Based Training",
      "Hands-On Projects",
      "Expert Trainers",
      "Lifetime Support"
    ],
    overview: "Revit Structure is a BIM software for structural engineering. This course focuses on structural modeling, analysis, and documentation to create efficient building designs.",
    contents: [
      "Introduction to Revit Structure",
      "BIM Concepts",
      "Structural Modeling",
      "Reinforcement Detailing",
      "Structural Analysis",
      "Documentation Techniques",
      "Collaboration Tools",
      "Industry Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/revitsp.webp"
  },
  {
    id: 12,
    title: "ETABS",
    shortDescription: "Master analysis and design of buildings using ETABS software.",
    highlights: [
      "Building Design Expertise",
      "Hands-On Training",
      "Industry-Level Projects",
      "Lifetime Support"
    ],
    overview: "ETABS is a powerful software for analyzing and designing multi-story buildings. This course covers modeling, seismic analysis, and design as per industry standards.",
    contents: [
      "Introduction to ETABS",
      "Model Creation",
      "Load Application",
      "Seismic Analysis",
      "Steel & Concrete Design",
      "Foundation Design",
      "Dynamic Analysis",
      "Real-Time Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/etabp.webp"
  },
  {
    id: 13,
    title: "V-Ray",
    shortDescription: "Create realistic visualizations and renderings using V-Ray software.",
    highlights: [
      "High-Quality Rendering",
      "Photorealistic Techniques",
      "Hands-On Training",
      "Lifetime Access"
    ],
    overview: "V-Ray is a rendering engine used with 3D modeling tools for realistic visualizations. This course teaches lighting, materials, and rendering techniques for architecture and product design.",
    contents: [
      "Introduction to V-Ray",
      "Lighting Techniques",
      "Material Creation",
      "Camera Settings",
      "Render Setup",
      "Post-Processing",
      "Photorealistic Rendering",
      "Final Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/vrayp.webp"
  },
  {
    id: 14,
    title: "Revit Architecture",
    shortDescription: "Learn architectural design and BIM using Autodesk Revit Architecture.",
    highlights: [
      "BIM-Based Training",
      "Real-Time Projects",
      "Experienced Trainers",
      "Lifetime Support"
    ],
    overview: "Revit Architecture is a BIM tool for architectural design and documentation. This course focuses on building models, rendering, and collaboration workflows.",
    contents: [
      "Introduction to Revit Architecture",
      "BIM Basics",
      "Building Modeling",
      "Rendering & Visualization",
      "Documentation Techniques",
      "Family Creation",
      "Collaboration Tools",
      "Industry Projects"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/revitap.webp"
  },
  {
    id: 15,
    title: "Photoshop",
    shortDescription: "Learn photo editing, graphic design, and digital art using Adobe Photoshop.",
    highlights: [
      "Creative Design Training",
      "Hands-On Projects",
      "Expert-Led Sessions",
      "Lifetime Access"
    ],
    overview: "Adobe Photoshop is the industry standard for photo editing and digital design. This course covers photo manipulation, retouching, and creative workflows for beginners and professionals.",
    contents: [
      "Introduction to Photoshop",
      "Tools & Interface",
      "Layers & Masks",
      "Photo Retouching",
      "Typography & Text Effects",
      "Digital Painting",
      "Exporting & File Formats",
      "Portfolio Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/photo shop.webp"
  },
  {
    id: 16,
    title: "3ds Max",
    shortDescription: "Master 3D modeling, rendering, and animation using Autodesk 3ds Max.",
    highlights: [
      "3D Modeling Expertise",
      "Rendering Techniques",
      "Animation Basics",
      "Project-Based Learning"
    ],
    overview: "Autodesk 3ds Max is used for modeling, animation, and rendering in design and entertainment industries. This course covers modeling, texturing, and realistic rendering techniques.",
    contents: [
      "Introduction to 3ds Max",
      "Modeling Basics",
      "Texturing & Materials",
      "Lighting Techniques",
      "Camera Settings",
      "Animation Fundamentals",
      "Rendering with V-Ray",
      "Final Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/max3dp.webp"
  },
  {
    id: 17,
    title: "Lumion",
    shortDescription: "Create stunning architectural visualizations with Lumion rendering software.",
    highlights: [
      "Realistic Rendering",
      "Live Sync with CAD Tools",
      "Hands-On Learning",
      "Lifetime Support"
    ],
    overview: "Lumion is a powerful rendering tool for architects and designers. This course focuses on creating photorealistic images, animations, and walkthroughs for presentations.",
    contents: [
      "Introduction to Lumion",
      "Interface & Navigation",
      "Importing Models",
      "Material Editing",
      "Lighting & Environment",
      "Animation Techniques",
      "Rendering Settings",
      "Final Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/lumion.webp"
  },
  {
    id: 18,
    title: "Google SketchUp",
    shortDescription: "Learn 3D modeling and design using Google SketchUp software.",
    highlights: [
      "Easy-to-Learn Interface",
      "Hands-On Training",
      "Practical Projects",
      "Lifetime Access"
    ],
    overview: "Google SketchUp is a popular 3D modeling tool for architecture, interior design, and product visualization. This course covers modeling, texturing, and rendering techniques for beginners and professionals.",
    contents: [
      "Introduction to SketchUp",
      "Navigation & Tools",
      "Modeling Techniques",
      "Groups & Components",
      "Texturing & Materials",
      "Lighting & Shadows",
      "Rendering Basics",
      "Portfolio Project"
    ],
    certificate: "/assests/img/certi.webp",
    contentimage: "/img/max3dp.webp"
  }
];
const LinkDetail = () => {
  const { id } = useParams();
  const course = coursescad.find((c) => parseInt(c.id) === parseInt(id));
  if (!course) {
    return /* @__PURE__ */ jsxs("div", { style: { padding: "60px", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Course Not Found" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/cadcourse",
          style: { color: "#0056b3", textDecoration: "underline" },
          children: "← Back to Courses"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
      "ol",
      {
        className: "breadcrumb",
        style: {
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          padding: "0.5em 0.5em",
          backgroundColor: "#e9ecef"
        },
        children: [
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              style: { textDecoration: "none", color: "#0056b3" },
              children: "Home"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/coursecad",
              style: { textDecoration: "none", color: "#0056b3" },
              children: "Courses"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: course.title })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx(
      "h1",
      {
        className: "breadcrumb-title",
        style: { color: "#000000ff" },
        children: course.title
      }
    ) }) }) }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "course-details",
        style: {
          maxWidth: "1200px",
          margin: "20px auto",
          padding: "40px",
          background: "#fff",
          borderRadius: "12px",
          fontSize: "14px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
        },
        children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/cadcourse",
              className: "back-btn",
              style: {
                color: "#0056b3",
                textDecoration: "none",
                marginBottom: "25px",
                display: "inline-block"
              },
              children: "← Back"
            }
          ),
          /* @__PURE__ */ jsx("h1", { children: course.title }),
          /* @__PURE__ */ jsx(
            "section",
            {
              className: "highlights",
              style: {
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "40px"
              },
              children: course.highlights.map((h, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "highlight-box",
                  style: {
                    background: "#f1f5ff",
                    padding: "20px",
                    borderRadius: "10px",
                    flex: "1",
                    minWidth: "220px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#0056b3"
                  },
                  children: h
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs("section", { className: "overview", style: { marginTop: "40px" }, children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: "26px",
                  marginBottom: "15px",
                  color: "#0056b3",
                  borderBottom: "2px solid #f1f5ff",
                  display: "inline-block",
                  paddingBottom: "5px"
                },
                children: "Course Overview"
              }
            ),
            /* @__PURE__ */ jsx("p", { children: course.overview })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "contents", style: { marginTop: "40px" }, children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: "26px",
                  marginBottom: "15px",
                  color: "#0056b3",
                  borderBottom: "2px solid #f1f5ff",
                  display: "inline-block",
                  paddingBottom: "5px"
                },
                children: "Course Contents"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "40px",
                  alignItems: "flex-start"
                },
                children: [
                  /* @__PURE__ */ jsx("ul", { style: { listStyle: "disc", marginLeft: "25px", flex: 1 }, children: course.contents.map((c, i) => /* @__PURE__ */ jsx("li", { style: { fontSize: "16px", marginBottom: "8px" }, children: c }, i)) }),
                  course.contentImage && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: course.contentImage,
                      alt: `${course.title} Content`,
                      style: {
                        maxWidth: "550px",
                        borderRadius: "12px",
                        border: "2px solid #eee",
                        flexShrink: 0
                      }
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "section",
            {
              className: "certificate",
              style: { marginTop: "40px", textAlign: "center" },
              children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    style: {
                      fontSize: "26px",
                      marginBottom: "15px",
                      color: "#0056b3",
                      borderBottom: "2px solid #f1f5ff",
                      display: "inline-block",
                      paddingBottom: "5px"
                    },
                    children: "Certification"
                  }
                ),
                course && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: course.certificate,
                    alt: `${course.title} Certificate`,
                    style: {
                      maxWidth: "400px",
                      borderRadius: "12px",
                      border: "2px solid #eee",
                      display: "block",
                      margin: "15px auto 0 auto"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "section",
            {
              className: "apply-form",
              style: {
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "40px"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsx(
                    "h2",
                    {
                      style: {
                        fontSize: "26px",
                        marginBottom: "15px",
                        color: "#0056b3",
                        borderBottom: "2px solid #f1f5ff",
                        display: "inline-block",
                        paddingBottom: "5px"
                      },
                      children: "Apply Now"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "form",
                    {
                      style: {
                        display: "grid",
                        gap: "15px",
                        maxWidth: "450px",
                        marginTop: "20px"
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Name",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "email",
                            placeholder: "Email",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Mobile",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "State",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Preferred Center",
                            required: true,
                            style: {
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #ccc"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "submit",
                            style: {
                              padding: "14px",
                              background: "#0056b3",
                              color: "#fff",
                              borderRadius: "8px",
                              border: "none",
                              cursor: "pointer"
                            },
                            children: "Apply"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsx(
                    "h2",
                    {
                      style: {
                        fontSize: "26px",
                        marginBottom: "15px",
                        color: "#0056b3",
                        borderBottom: "2px solid #f1f5ff",
                        display: "inline-block",
                        paddingBottom: "5px"
                      },
                      children: "How will you get your certificate?"
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "16px", lineHeight: "1.7", color: "#333" }, children: [
                    "Upon successful completion of the program, each intern receives a prestigious ",
                    /* @__PURE__ */ jsx("b", { children: "Internship Certificate" }),
                    ". This credential not only recognizes their achievements but also enhances their employability."
                  ] }),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "16px", lineHeight: "1.7", color: "#333" }, children: [
                    /* @__PURE__ */ jsx("b", { children: "Excerpt Trainings" }),
                    " is a pioneer in IT training and most of the industries give great recognition to its certificate throughout India and abroad. Excerpt Trainings Certificates are",
                    " ",
                    /* @__PURE__ */ jsx("b", { children: "ISO verified" }),
                    " which makes CAD highly reputed compared to other local brands and helps students get prioritized while applying for job opportunities in the industry."
                  ] }),
                  /* @__PURE__ */ jsxs("p", { style: { fontSize: "16px", lineHeight: "1.7", color: "#333" }, children: [
                    "Excerpt Software Training is conducted by highly knowledgeable trainers who emphasize ",
                    /* @__PURE__ */ jsx("b", { children: "project-based learning" }),
                    ", helping students enhance their skill set effectively."
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
};
const CadCourse = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: "Mechanical, Civil & Electrical Courses | EXCERPT TRAININGS" }),
        /* @__PURE__ */ jsx(
          "meta",
          {
            name: "description",
            content: "Explore Mechanical, Civil, and Electrical engineering courses at EXCERPT TRAININGS, Bangalore — from CAD, Revit, AutoCAD, SolidWorks, and MEP design to PLC, HVAC, and project planning."
          }
        ),
        /* @__PURE__ */ jsx(
          "meta",
          {
            name: "keywords",
            content: "mechanical design course bangalore, mechanical engineering training bangalore, mechanical cad course bangalore, ... electrical power distribution and automation course bangalore"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
        "ol",
        {
          className: "breadcrumb",
          style: {
            fontSize: "14px",
            fontFamily: "'Open Sans', sans-serif",
            padding: "0.5em 0.5em",
            backgroundColor: "#e9ecef"
          },
          children: [
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "CAD COURSE" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "breadcrumb-title",
          style: { color: "#000000ff" },
          children: "ONLINE CAD COURSES"
        }
      ) }) }) }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "course-w3ls py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsx("h1", { style: { marginTop: "-40px", textAlign: "center" } }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile  pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "Auto.webp",
              alt: "auto cad course",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Auto Cad" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "AutoCAD, often abbreviated as CAD is a powerful software tool widely employed in engineering and architecture." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan - March 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Auto.webp", alt: "auto course near me", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/1",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Solidp.webp", alt: "sloid works course near me", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "solid works course",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Solid Works" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "SolidWorks is a 3D parametric design software any other like product you can think of." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/2",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "catia design course",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Catia" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Manufacturing industries the software to enhance designing, analyzing, and managing new products." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Catiop.webp", alt: "catia course near me", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/3",
            role: "button",
            children: "Apply Now"
          }
        ) }),
        /* @__PURE__ */ jsx("br", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Nxcadp.webp", alt: "nxcard course", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "nxcad course",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "NX CAD" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "NX CAD, also known as “unigraphics”, Digital Industries Software." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/4",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "ansys course",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Ansys" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Ansys is a CAE/multiphysics engineering simulation software for product design, testing and operation." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Ansysp.webp", alt: "ansys near me", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/5",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Creop.webp", alt: "creo course", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "creo course design",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Creo" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "Creo is the 3D CAD solution that helps you accelerate product innovation to build better products faster." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/6",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "fusion 360 course",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Fusion" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-3 mb-4 pr-lg-5", children: [
              " ",
              "360 offers various 3D design tools that include sketching, direct, surface, parametric, mesh."
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Fusionp.webp", alt: "fusion design", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/7",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "img/gd&t.webp",
            width: 600,
            height: 100,
            alt: "gd& t near me course",
            className: "imgg-fluid1"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "gd&t course",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "GD&T" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "GD&T symbols used on a drawing to communicate the intent of a design, focusing on the function of the part." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/8",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "App", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: "/CadCourse2", children: /* @__PURE__ */ jsx("button", { style: { marginTop: "40px", marginLeft: "1100px" }, children: "Next" }) }) }) })
    ] }) }),
    " "
  ] });
};
function CadCourse2() {
  return /* @__PURE__ */ jsxs("div", { children: [
    " ",
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "banner-agile-2" }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs(
        "ol",
        {
          className: "breadcrumb",
          style: {
            fontSize: "14px",
            fontFamily: "'Open Sans', sans-serif",
            padding: "0.5em 0.5em",
            backgroundColor: "#e9ecef"
          },
          children: [
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item active", "aria-current": "page", children: "CAD COURSE" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "breadcrumb-area", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("div", { className: "breadcrumb_box text-center", children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "breadcrumb-title",
          style: { color: "#000000ff" },
          children: "ONLINE CAD COURSES"
        }
      ) }) }) }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "course-w3ls py-5", children: /* @__PURE__ */ jsxs("div", { className: "container py-xl-5 py-lg-3", children: [
      /* @__PURE__ */ jsx("h1", { style: { marginTop: "-40px", textAlign: "center" } }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/civil 3d.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Civil 3d" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "The Civil, collaboration and machine-learning features Architects, engineers and construction professionals use AutoCAD." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/9",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: " STAADr" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "You can design, analyze, and document structural projects – anywhere in the world, with any material using STAAD.." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Staadp.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/10",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Revitsp.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Revit Structure" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "Streamline projects, from design concept to fabrication, with Revit® Building Information Modelling software." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/11",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: " ETABS" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "The ETABS is the ultimate integrated software package for the structural analysis and design of buildings." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/ETABp.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/12",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Vrayp.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "V-Ray " }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "V-Ray is a rendering engine that uses global illumination, tracing, photon mapping, maps and directly computed global illumination." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/13",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: " Revit Architecture" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "Design, detail, analyze, and document structural systems quickly and effectively." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Revitap.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/14",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/photo shop.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Photoshop " }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "Gorgeous images, rich graphics and incredible art — you can do it all with Photoshop." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/15",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: " 3DS MAX" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "3D modeling, rendering, and animation software enables you to create expansive worlds and premium designs." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Max3dp.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/16",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile cource-list-agile-2 pt-md-4 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-3 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/lumion.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-7 agile-course-main text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-second", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "img/2.webp",
                alt: "",
                className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4 text-right", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-dark", children: "Lumion " }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pl-lg-4", children: "Product 3D rendering software" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "Jan-Mar 2024",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt ml-3" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                  "3 - 6 hours",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-clock ml-3" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "buttons-w3ls-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              className: "btn button-cour-w3ls text-white",
              href: "",
              to: "/cad/17",
              role: "button",
              children: "Apply Now"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row cource-list-agile pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-7 agile-course-main", children: /* @__PURE__ */ jsxs("div", { className: "w3ls-cource-first", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "img/1.webp",
              alt: "",
              className: "imgg-fluid img-poiscour mx-auto d-block mt-2"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-md-5 px-4  pb-md-5 pb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-dark", children: " Google Sketchup" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 mb-4 pr-lg-5", children: "The joy of drawing by hand. The ease of super-smart 3D modeling software.." }),
            /* @__PURE__ */ jsxs("ul", { className: "list-unstyled text-capitalize", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-3" }),
                "Jan-Mar 2024"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "my-3", children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-clock mr-3" }),
                "4 - 6 hours"
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-5 agile-course-main-2 mt-4", children: /* @__PURE__ */ jsx("img", { src: "img/Max3dp.webp", alt: "", className: "imgg-fluid1" }) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-w3ls", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "btn button-cour-w3ls text-white",
            href: "",
            to: "/cad/18",
            role: "button",
            children: "Apply Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "App", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: "/cadcourse", children: /* @__PURE__ */ jsx("button", { style: { marginTop: "40px" }, children: "Prev" }) }) }) })
    ] }) }),
    " "
  ] });
}
const BlogFresher = () => {
  return /* @__PURE__ */ jsxs("div", { className: "blog-detail", children: [
    /* @__PURE__ */ jsx("h1", { children: "How Fresher Can Get Placed With the Right Training" }),
    /* @__PURE__ */ jsx("p", { children: "The IT sector is one of the most promising career paths for today’s graduates. With constant innovation in Artificial Intelligence, Cloud, Cybersecurity, and Data Science, the demand for skilled IT professionals is higher than ever. Yet, many freshers face rejections in interviews despite having degrees." }),
    /* @__PURE__ */ jsx("p", { children: "The good news is that with the right IT training, freshers can bridge the skill gap and secure their dream job. Let’s explore how." }),
    /* @__PURE__ */ jsx("h3", { children: "1️⃣ Why Freshers Struggle to Get IT Jobs" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Lack of practical, industry-oriented skills." }),
      /* @__PURE__ */ jsx("li", { children: "Outdated knowledge compared to the latest IT trends." }),
      /* @__PURE__ */ jsx("li", { children: "Weak problem-solving and project experience." }),
      /* @__PURE__ */ jsx("li", { children: "No exposure to interviews, resume building, or corporate culture." })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "2️⃣ Choose Training That Matches Industry Needs" }),
    /* @__PURE__ */ jsx("p", { children: "Employers hire candidates who can deliver from day one. The right training program should focus on:" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Trending IT skills → Cloud Computing, AI/ML, Cybersecurity, Data Science, Full Stack Development." }),
      /* @__PURE__ */ jsx("li", { children: "Hands-on projects → Real-world case studies that build confidence." }),
      /* @__PURE__ */ jsx("li", { children: "Certifications → Recognized credentials (AWS, Azure, CompTIA, Python, etc.)." })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "3️⃣ Learn Through Practical Exposure" }),
    /* @__PURE__ */ jsx("p", { children: "The best IT training is not just about classroom theory – it’s about learning by doing. Look for programs with live coding sessions, capstone projects, and internship-style training." }),
    /* @__PURE__ */ jsx("h3", { children: "4️⃣ Build Job-Ready Skills Step by Step" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Programming & Development → Python, Java, Full Stack Development." }),
      /* @__PURE__ */ jsx("li", { children: "Data Science & Analytics → SQL, Machine Learning, Power BI, Tableau." }),
      /* @__PURE__ */ jsx("li", { children: "Cloud & DevOps → AWS, Azure, Docker, Kubernetes." }),
      /* @__PURE__ */ jsx("li", { children: "Cybersecurity → Ethical Hacking, Network Security, Risk Management." })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "5️⃣ Placement Assistance & Career Support" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Resume building & LinkedIn profile optimization." }),
      /* @__PURE__ */ jsx("li", { children: "Mock interviews & aptitude training." }),
      /* @__PURE__ */ jsx("li", { children: "Placement drives & hiring partner networks." })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "🌟 Final Thoughts" }),
    /* @__PURE__ */ jsx("p", { children: "Breaking into IT as a fresher is tough but possible with the right training, mentorship, and job-oriented skills. Your degree gets you started, but the right training gets you hired. 🚀" })
  ] });
};
const BlogITSkills = () => {
  return /* @__PURE__ */ jsxs("div", { className: "blog-detail", children: [
    /* @__PURE__ */ jsx("h1", { children: "Top 5 IT Skills in 2025" }),
    /* @__PURE__ */ jsx("p", { children: "The IT industry is evolving faster than ever, driven by automation, artificial intelligence, and cloud adoption. Employers now want job-ready professionals with the latest skills." }),
    /* @__PURE__ */ jsx("h3", { children: "1️⃣ Artificial Intelligence (AI) & Machine Learning (ML)" }),
    /* @__PURE__ */ jsx("p", { children: "From chatbots to self-driving cars, AI & ML are everywhere. Learn Python, TensorFlow, PyTorch, NLP, Deep Learning." }),
    /* @__PURE__ */ jsx("h3", { children: "2️⃣ Cloud Computing" }),
    /* @__PURE__ */ jsx("p", { children: "The backbone of digital transformation. AWS, Azure, and GCP dominate. Learn cloud architecture, DevOps, Docker, Kubernetes." }),
    /* @__PURE__ */ jsx("h3", { children: "3️⃣ Cybersecurity" }),
    /* @__PURE__ */ jsx("p", { children: "With rising cyberattacks, cybersecurity experts are in demand. Learn ethical hacking, firewalls, Splunk, Wireshark, Kali Linux." }),
    /* @__PURE__ */ jsx("h3", { children: "4️⃣ Data Science & Analytics" }),
    /* @__PURE__ */ jsx("p", { children: "Data is the new oil. Learn Python, R, SQL, Hadoop, Spark, Power BI, Tableau." }),
    /* @__PURE__ */ jsx("h3", { children: "5️⃣ DevOps & Automation" }),
    /* @__PURE__ */ jsx("p", { children: "Companies want faster software delivery with fewer errors. Learn CI/CD (Jenkins), Docker, Kubernetes, Terraform." }),
    /* @__PURE__ */ jsx("h3", { children: "🌟 Final Thoughts" }),
    /* @__PURE__ */ jsx("p", { children: "Upskilling with these 5 IT skills ensures career success in 2025. Continuous learning and certifications are the keys." })
  ] });
};
const BlogCareer = () => {
  return /* @__PURE__ */ jsxs("div", { className: "blog-detail", children: [
    /* @__PURE__ */ jsx("h1", { children: "Career Guidance" }),
    /* @__PURE__ */ jsx("p", { children: "Your final year is the bridge between college and career. Decisions you make now will shape your future." }),
    /* @__PURE__ */ jsx("h3", { children: "1️⃣ Assess Your Strengths" }),
    /* @__PURE__ */ jsx("p", { children: "Ask yourself: Do you enjoy coding? Or are you more into management and leadership? Do you want to work or pursue higher studies?" }),
    /* @__PURE__ */ jsx("h3", { children: "2️⃣ Explore Career Options" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Software Development" }),
      /* @__PURE__ */ jsx("li", { children: "Data Science & Analytics" }),
      /* @__PURE__ */ jsx("li", { children: "Cloud & DevOps" }),
      /* @__PURE__ */ jsx("li", { children: "Cybersecurity" }),
      /* @__PURE__ */ jsx("li", { children: "UI/UX & Product Design" }),
      /* @__PURE__ */ jsx("li", { children: "Higher Studies (M.Tech, MCA, MBA, abroad)" })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "3️⃣ Upskill with Training" }),
    /* @__PURE__ */ jsx("p", { children: "Take certifications (Python, Java, Cloud, Data Science). Join hackathons, coding challenges, and internships." }),
    /* @__PURE__ */ jsx("h3", { children: "4️⃣ Build a Professional Profile" }),
    /* @__PURE__ */ jsx("p", { children: "Create a strong LinkedIn, GitHub portfolio, and highlight internships + certifications." }),
    /* @__PURE__ */ jsx("h3", { children: "5️⃣ Prepare for Placements" }),
    /* @__PURE__ */ jsx("p", { children: "Revise aptitude, reasoning, and coding basics. Do mock interviews and stay updated with IT trends." }),
    /* @__PURE__ */ jsx("h3", { children: "🌟 Final Words" }),
    /* @__PURE__ */ jsx("p", { children: "Start early, upskill smartly, and focus on in-demand skills + networking. Your future self will thank you! 🚀" })
  ] });
};
const BlogPython = () => {
  return /* @__PURE__ */ jsxs("div", { className: "blog-detail", children: [
    /* @__PURE__ */ jsx("h1", { children: "Top Python Libraries for Data Science in 2025" }),
    /* @__PURE__ */ jsx("h3", { children: "1. NumPy" }),
    /* @__PURE__ */ jsx("p", { children: "Foundation of numerical computing in Python." }),
    /* @__PURE__ */ jsx("h3", { children: "2. Pandas" }),
    /* @__PURE__ */ jsx("p", { children: "Essential for data manipulation and analysis." }),
    /* @__PURE__ */ jsx("h3", { children: "3. Matplotlib" }),
    /* @__PURE__ */ jsx("p", { children: "Create static, interactive, and animated visualizations." }),
    /* @__PURE__ */ jsx("h3", { children: "4. Seaborn" }),
    /* @__PURE__ */ jsx("p", { children: "Statistical data visualization built on Matplotlib." }),
    /* @__PURE__ */ jsx("h3", { children: "5. Scikit-learn" }),
    /* @__PURE__ */ jsx("p", { children: "Machine learning tools for classification, regression, clustering." }),
    /* @__PURE__ */ jsx("h3", { children: "6. TensorFlow" }),
    /* @__PURE__ */ jsx("p", { children: "Deep learning library for AI-driven applications." }),
    /* @__PURE__ */ jsx("h3", { children: "7. PyTorch" }),
    /* @__PURE__ */ jsx("p", { children: "Popular in research, flexible and dynamic for ML models." }),
    /* @__PURE__ */ jsx("h3", { children: "8. Plotly" }),
    /* @__PURE__ */ jsx("p", { children: "Interactive visualizations for dashboards and reports." }),
    /* @__PURE__ */ jsx("h3", { children: "9. Statsmodels" }),
    /* @__PURE__ */ jsx("p", { children: "Advanced statistical analysis and hypothesis testing." }),
    /* @__PURE__ */ jsx("h3", { children: "10. Keras" }),
    /* @__PURE__ */ jsx("p", { children: "High-level API simplifying deep learning with TensorFlow." }),
    /* @__PURE__ */ jsx("h3", { children: "Conclusion" }),
    /* @__PURE__ */ jsx("p", { children: "Mastering these libraries ensures success in data science by 2025." })
  ] });
};
const BlogAITools = () => {
  return /* @__PURE__ */ jsxs("div", { className: "blog-detail", children: [
    /* @__PURE__ */ jsx("h1", { children: "Top 10 AI Tools Every Developer Should Know in 2025" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "TensorFlow – Deep learning by Google" }),
      /* @__PURE__ */ jsx("li", { children: "PyTorch – Flexible ML by Facebook" }),
      /* @__PURE__ */ jsx("li", { children: "Keras – Simplified neural networks" }),
      /* @__PURE__ */ jsx("li", { children: "OpenAI GPT APIs – Chatbots & content generation" }),
      /* @__PURE__ */ jsx("li", { children: "IBM Watson – AI-powered business tools" }),
      /* @__PURE__ */ jsx("li", { children: "Microsoft Azure AI – Cloud AI platform" }),
      /* @__PURE__ */ jsx("li", { children: "Google Cloud AI – Pre-trained ML & AutoML" }),
      /* @__PURE__ */ jsx("li", { children: "H2O.ai – Scalable ML platform" }),
      /* @__PURE__ */ jsx("li", { children: "RapidMiner – Drag-and-drop data science" }),
      /* @__PURE__ */ jsx("li", { children: "DataRobot – Automated machine learning" })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "Conclusion" }),
    /* @__PURE__ */ jsx("p", { children: "Mastering these AI tools will keep developers competitive in 2025 and beyond." })
  ] });
};
const BlogMernMean = () => {
  return /* @__PURE__ */ jsxs("div", { className: "blog-detail", children: [
    /* @__PURE__ */ jsx("h1", { children: "MERN vs MEAN Stack: Which is Best for 2025" }),
    /* @__PURE__ */ jsx("h3", { children: "Overview of MERN" }),
    /* @__PURE__ */ jsx("p", { children: "MongoDB, Express.js, React.js, Node.js – great for fast, dynamic apps with strong UI/UX." }),
    /* @__PURE__ */ jsx("h3", { children: "Overview of MEAN" }),
    /* @__PURE__ */ jsx("p", { children: "MongoDB, Express.js, Angular, Node.js – structured and popular for enterprise-level apps." }),
    /* @__PURE__ */ jsx("h3", { children: "Key Differences" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "MERN uses React (flexible), MEAN uses Angular (structured)." }),
      /* @__PURE__ */ jsx("li", { children: "MERN easier to learn, MEAN has steeper curve." }),
      /* @__PURE__ */ jsx("li", { children: "MERN faster for dynamic UIs, MEAN fits enterprises." })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "Use Cases" }),
    /* @__PURE__ */ jsx("p", { children: "MERN → startups, fast apps. MEAN → large-scale enterprise apps." }),
    /* @__PURE__ */ jsx("h3", { children: "Future Trends" }),
    /* @__PURE__ */ jsx("p", { children: "React continues to dominate, Angular stays strong in enterprise." }),
    /* @__PURE__ */ jsx("h3", { children: "Conclusion" }),
    /* @__PURE__ */ jsx("p", { children: "Both are excellent. Choose based on project type, team skills, and long-term goals." })
  ] });
};
const WhatsAppPopup = () => {
  const phoneNumber = "+919901371386";
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile ? `whatsapp://send?phone=${phoneNumber}` : `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "whatsapp-container", children: [
    /* @__PURE__ */ jsx("div", { className: "whatsapp-text", children: "Chat With Us" }),
    /* @__PURE__ */ jsxs("button", { className: "whatsapp-button", onClick: handleClick, children: [
      /* @__PURE__ */ jsx("div", { className: "glow-effect" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
          alt: "WhatsApp"
        }
      )
    ] })
  ] });
};
const CourseManagement = () => {
  const [formData, setFormData] = useState({
    CourseID: "",
    CourseName: "",
    CourseTypeID: [],
    duration: { value: 0, unit: "Months" },
    payment: { single: 0, installment: 0 }
  });
  const [allCourseTypes, setAllCourseTypes] = useState([]);
  const [courses2, setCourses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    axios.get("/api/coursetypes").then((res) => setAllCourseTypes(res.data || [])).catch((err) => console.error(err));
    axios.get("/api/new/courses").then((res) => {
      const validCourses = (res.data || []).filter((c) => c && typeof c.CourseName === "string");
      setCourses(validCourses);
    }).catch((err) => console.error(err));
  }, []);
  const handleCourseTypeSelect = async (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, CourseTypeID: selected }));
    if (selected.length > 0) {
      try {
        const res = await axios.get(`/api/course/nextId/${selected[0]}`);
        setFormData((prev) => ({ ...prev, CourseID: res.data.nextId }));
      } catch (err) {
        console.error(err);
      }
    } else {
      setFormData((prev) => ({ ...prev, CourseID: "" }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const resetForm = () => {
    setFormData({
      CourseID: "",
      CourseName: "",
      CourseTypeID: [],
      duration: { value: 0, unit: "Months" },
      payment: { single: 0, installment: 0 }
    });
    setIsEdit(false);
    setEditingCourseId(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isEdit) {
        await axios.post("/api/course", formData);
        alert("Course added successfully!");
      } else {
        await axios.put(`/api/course/${editingCourseId}`, formData);
        alert("Course updated!");
      }
      resetForm();
      const res = await axios.get("/api/new/courses");
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Submit failed.");
    }
  };
  const handleEdit = (course) => {
    setFormData({
      CourseID: course.CourseID,
      CourseName: course.CourseName,
      CourseTypeID: course.CourseTypeID.map((t) => typeof t === "object" ? t._id : t),
      duration: course.duration || { value: 0, unit: "Months" },
      payment: course.payment || { single: 0, installment: 0 }
    });
    setIsEdit(true);
    setEditingCourseId(course._id);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`/api/course/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const filteredCourses = courses2.filter(
    (c) => c.CourseName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayed = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return /* @__PURE__ */ jsxs("div", { className: "container mt-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-4", children: isEdit ? "Edit Course" : "Add Course" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "border p-4 rounded bg-light", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { className: "form-label", children: "Course ID" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "CourseID",
            value: formData.CourseID,
            readOnly: true,
            className: "form-control"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { className: "form-label", children: "Course Type" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            multiple: true,
            name: "CourseTypeID",
            value: formData.CourseTypeID,
            onChange: handleCourseTypeSelect,
            className: "form-select",
            size: 4,
            children: allCourseTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type._id, children: type.CourseTypeName }, type._id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { className: "form-label", children: "Course Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "CourseName",
            value: formData.CourseName,
            onChange: handleChange,
            className: "form-control",
            placeholder: "Enter course name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Duration" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "duration.value",
              value: formData.duration.value,
              onChange: handleChange,
              min: 0,
              className: "form-control",
              placeholder: "Enter duration"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Unit" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              name: "duration.unit",
              value: formData.duration.unit,
              onChange: handleChange,
              className: "form-select",
              children: [
                /* @__PURE__ */ jsx("option", { value: "Months", children: "Months" }),
                /* @__PURE__ */ jsx("option", { value: "Days", children: "Days" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Single Payment (₹)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "payment.single",
              value: formData.payment.single,
              onChange: handleChange,
              className: "form-control"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Installment (₹)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "payment.installment",
              value: formData.payment.installment,
              onChange: handleChange,
              className: "form-control"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary me-2", children: isEdit ? "Update Course" : "Add Course" }),
        isEdit && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "btn btn-secondary", children: "Cancel" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 mb-3", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: searchQuery,
        onChange: (e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        },
        placeholder: "Search Courses",
        className: "form-control"
      }
    ) }),
    /* @__PURE__ */ jsxs("table", { className: "table table-bordered table-striped", children: [
      /* @__PURE__ */ jsx("thead", { className: "table-dark", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Course ID" }),
        /* @__PURE__ */ jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Type(s)" }),
        /* @__PURE__ */ jsx("th", { children: "Duration" }),
        /* @__PURE__ */ jsx("th", { children: "Payment" }),
        /* @__PURE__ */ jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        displayed?.map((course) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: course?.CourseID || "N/A" }),
          /* @__PURE__ */ jsx("td", { children: course?.CourseName || "N/A" }),
          /* @__PURE__ */ jsx("td", { children: Array.isArray(course?.CourseTypeID) && course.CourseTypeID.length > 0 ? course.CourseTypeID.map((type) => type?.CourseTypeName || "N/A").join(", ") : "N/A" }),
          /* @__PURE__ */ jsx("td", { children: course?.duration?.value ? `${course.duration.value} ${course.duration.unit || ""}` : "N/A" }),
          /* @__PURE__ */ jsxs("td", { children: [
            "₹",
            course?.payment?.single ?? "0",
            ", ₹",
            course?.payment?.installment ?? "0"
          ] }),
          /* @__PURE__ */ jsxs("td", { children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(course), className: "btn btn-sm btn-warning me-2", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(course._id), className: "btn btn-sm btn-danger", children: "Delete" })
          ] })
        ] }, course._id)),
        displayed.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "text-center", children: "No courses found." }) })
      ] })
    ] }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-center align-items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          disabled: currentPage === 1,
          onClick: () => setCurrentPage((p) => p - 1),
          className: "btn btn-outline-secondary btn-sm",
          children: "« Prev"
        }
      ),
      /* @__PURE__ */ jsxs("span", { children: [
        "Page ",
        currentPage,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          disabled: currentPage === totalPages,
          onClick: () => setCurrentPage((p) => p + 1),
          className: "btn btn-outline-secondary btn-sm",
          children: "Next »"
        }
      )
    ] })
  ] });
};
const CourseTypeManagement = () => {
  const [formData, setFormData] = useState({
    CourseTypeId: "",
    CourseTypeName: ""
  });
  const [courseTypes, setCourseTypes] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [editingCourseTypeId, setEditingCourseTypeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchCourseTypes();
  }, []);
  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get("/api/coursetypes");
      setCourseTypes(response.data || []);
    } catch (error) {
      console.error("Error fetching course types:", error);
    }
  };
  const generateCourseTypeId = () => {
    const maxId = courseTypes.reduce((max, ct) => {
      const num = parseInt(ct.CourseTypeId.replace("CT", ""), 10);
      return isNaN(num) ? max : Math.max(max, num);
    }, 100);
    const newId = `CT${maxId + 1}`;
    setFormData((prev) => ({
      ...prev,
      CourseTypeId: newId
    }));
  };
  const handleEdit = (courseType) => {
    setFormData({
      CourseTypeId: courseType.CourseTypeId,
      CourseTypeName: courseType.CourseTypeName
    });
    setIsedit(true);
    setEditingCourseTypeId(courseType._id);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course type?")) return;
    try {
      await axios.delete(`/api/coursetype/${id}`);
      fetchCourseTypes();
      alert("Course Type deleted successfully!");
    } catch (error) {
      console.error("Error deleting course type:", error);
      alert("Failed to delete course type.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isedit) {
        const newFormData = { ...formData };
        await axios.post("/api/coursetype", newFormData);
        alert("Course Type added successfully!");
      } else {
        await axios.put(`/api/coursetype/${editingCourseTypeId}`, formData);
        alert("Course Type updated successfully!");
      }
      setFormData({ CourseTypeId: "", CourseTypeName: "" });
      setIsedit(false);
      setEditingCourseTypeId(null);
      fetchCourseTypes();
    } catch (error) {
      console.error("Error submitting course type:", error);
      alert("Failed to submit course type.");
    }
  };
  const handleCancel = () => {
    setFormData({ CourseTypeId: "", CourseTypeName: "" });
    setIsedit(false);
    setEditingCourseTypeId(null);
  };
  const filteredCourseTypes = courseTypes.filter(
    (ct) => ct.CourseTypeName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "container mt-5", children: [
    /* @__PURE__ */ jsx("h3", { children: "Course Type Management" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Course Type ID" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: "form-control",
            value: formData.CourseTypeId,
            readOnly: true,
            onClick: generateCourseTypeId,
            placeholder: "Click to generate ID",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Course Type Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: "form-control",
            value: formData.CourseTypeName,
            onChange: (e) => setFormData({ ...formData, CourseTypeName: e.target.value }),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary me-2", children: isedit ? "Update" : "Submit" }),
      isedit && /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCancel, children: "Cancel" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "Search course types...",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsxs("table", { className: "table table-bordered", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Course Type ID" }),
        /* @__PURE__ */ jsx("th", { children: "Course Type Name" }),
        /* @__PURE__ */ jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        filteredCourseTypes.map((courseType) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: courseType.CourseTypeId }),
          /* @__PURE__ */ jsx("td", { children: courseType.CourseTypeName }),
          /* @__PURE__ */ jsxs("td", { children: [
            /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-info me-2", onClick: () => handleEdit(courseType), children: "Edit" }),
            /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-danger", onClick: () => handleDelete(courseType._id), children: "Delete" })
          ] })
        ] }, courseType._id)),
        filteredCourseTypes.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "3", className: "text-center", children: "No course types found." }) })
      ] })
    ] })
  ] });
};
const SubjectManagement = () => {
  const [courses2, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [formData, setFormData] = useState({
    SubjectId: "",
    SubjectName: "",
    coursesids: [],
    SubjectCaption: "",
    SubjectDesc: ""
  });
  useEffect(() => {
    fetchSubjects();
    fetchCourses();
  }, []);
  useEffect(() => {
    if (!isedit) {
      const generatedId = generateSubjectId();
      setFormData((prev) => ({
        ...prev,
        SubjectId: generatedId
      }));
    }
  }, [subjects]);
  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/new/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("/api/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  const generateSubjectId = () => {
    const prefix = "SUB";
    const count = subjects.length + 1;
    return `${prefix}-${count}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };
      if (!isedit) {
        await axios.post("/api/subject", submitData);
        alert("Software created!");
      } else {
        await axios.put(`/api/subject/${editingSubjectId}`, submitData);
        alert("Software updated!");
      }
      fetchSubjects();
      resetForm();
      document.getElementById("closeModalBtn")?.click();
    } catch (err) {
      console.error("Error submitting subject:", err);
      alert("Submission failed.");
    }
  };
  const handleEdit = (subject) => {
    setIsedit(true);
    const courseIds = subject.coursesids.map(
      (course) => typeof course === "object" && course !== null ? course._id : course
    );
    setFormData({
      SubjectId: subject.SubjectId || "",
      SubjectName: subject.SubjectName || "",
      coursesids: courseIds,
      SubjectCaption: subject.SubjectCaption || "",
      SubjectDesc: subject.SubjectDesc || ""
    });
    setEditingSubjectId(subject._id);
  };
  const handleDelete = async (subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await axios.delete(`/api/subject/${subjectId}`);
        alert("Deleted successfully!");
        fetchSubjects();
      } catch (error) {
        console.error("Error deleting subject:", error);
        alert("Failed to delete subject.");
      }
    }
  };
  const resetForm = () => {
    setIsedit(false);
    setFormData({
      SubjectId: generateSubjectId(),
      SubjectName: "",
      coursesids: [],
      SubjectCaption: "",
      SubjectDesc: ""
    });
  };
  const handleCheckboxChange = (e, courseId) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      coursesids: isChecked ? [...prev.coursesids, courseId] : prev.coursesids.filter((id) => id !== courseId)
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h3", { className: "my-3", children: "Software Management" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "btn btn-primary mb-3",
        "data-bs-toggle": "modal",
        "data-bs-target": "#editModal",
        onClick: resetForm,
        children: "Add Software"
      }
    ),
    /* @__PURE__ */ jsxs("table", { className: "table table-bordered", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Software Name" }),
        /* @__PURE__ */ jsx("th", { children: "Courses" }),
        /* @__PURE__ */ jsx("th", { children: "Caption" }),
        /* @__PURE__ */ jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: subjects.map((subject) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: subject.SubjectName }),
        /* @__PURE__ */ jsx("td", { children: (subject.coursesids || []).map((c) => c.CourseName || "Unknown").join(", ") }),
        /* @__PURE__ */ jsx("td", { children: subject.SubjectCaption }),
        /* @__PURE__ */ jsxs("td", { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-info btn-sm me-2",
              "data-bs-toggle": "modal",
              "data-bs-target": "#editModal",
              onClick: () => handleEdit(subject),
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-danger btn-sm",
              onClick: () => handleDelete(subject._id),
              children: "Delete"
            }
          )
        ] })
      ] }, subject._id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "modal fade", id: "editModal", tabIndex: "-1", children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-lg modal-dialog-centered", children: /* @__PURE__ */ jsx("div", { className: "modal-content", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxs("h5", { className: "modal-title", children: [
          isedit ? "Edit" : "Add",
          " Software"
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn-close",
            "data-bs-dismiss": "modal",
            "aria-label": "Close",
            id: "closeModalBtn"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "modal-body", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6 mb-3", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Software Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "form-control",
              value: formData.SubjectName,
              onChange: (e) => setFormData({ ...formData, SubjectName: e.target.value }),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6 mb-3", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Caption" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "form-control",
              value: formData.SubjectCaption,
              onChange: (e) => setFormData({ ...formData, SubjectCaption: e.target.value }),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-12 mb-3", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "form-control",
              rows: 3,
              value: formData.SubjectDesc,
              onChange: (e) => setFormData({ ...formData, SubjectDesc: e.target.value }),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-12 mb-3", children: [
          /* @__PURE__ */ jsx("label", { className: "form-label", children: "Courses" }),
          /* @__PURE__ */ jsx("div", { style: { maxHeight: "150px", overflowY: "auto" }, children: courses2.map((course) => /* @__PURE__ */ jsxs("div", { className: "form-check", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "form-check-input",
                type: "checkbox",
                id: `course-${course._id}`,
                checked: formData.coursesids.includes(course._id),
                onChange: (e) => handleCheckboxChange(e, course._id)
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "form-check-label",
                htmlFor: `course-${course._id}`,
                children: course.CourseName
              }
            )
          ] }, course._id)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-light", "data-bs-dismiss": "modal", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: isedit ? "Update" : "Submit" })
      ] })
    ] }) }) }) })
  ] });
};
const StudentCertificatePage = () => {
  const [students2, setStudents] = useState([]);
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
  const filteredStudents = students2.filter((student) => {
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
      const { PDFDocument: PDFDocument2, rgb: rgb2 } = PDFLib;
      const response = await fetch("/certificate6.pdf");
      if (!response.ok) {
        throw new Error("Certificate template not found");
      }
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument2.load(existingPdfBytes);
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
        color: rgb2(0, 0, 0),
        font: helveticaBold
      });
      if (student.guardianName) {
        firstPage.drawText(` ${toCamelCase(student.guardianName)}`, {
          x: width / 2 + 130,
          y: height - 285,
          size: 16,
          color: rgb2(0, 0, 0),
          font: helvetica
        });
      }
      const courseName = getCourseNames(student.courseIds) || student.courseName || "Course Name";
      firstPage.drawText(toCamelCase(courseName), {
        x: width / 2 - 205,
        y: height - 330,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      const courseDuration = formatCourseDuration(student.courseIds);
      firstPage.drawText(` ${courseDuration}`, {
        x: width / 2 + 130,
        y: height - 330,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      const subjectNames = student.selectedSubjects && student.selectedSubjects.length > 0 ? student.selectedSubjects.map((subject) => toCamelCase(subject.SubjectName)).join(", ") : "No Subjects Specified";
      firstPage.drawText(`${subjectNames}`, {
        x: width / 2 - 205,
        y: height - 375,
        size: 14,
        color: rgb2(0, 0, 0),
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
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.trainingcenter)}`, {
        x: width / 2 - 210,
        y: height - 422,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.certificateGrade)}`, {
        x: width / 2 + 130,
        y: height - 422,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(`:${student.regid}`, {
        x: width / 2 - 75,
        y: height - 680,
        size: 12,
        color: rgb2(0, 0, 0),
        font: helveticaBold
      });
      firstPage.drawText(` ${student.regid}`, {
        x: width / 2 - 70,
        y: height - 493,
        size: 12,
        color: rgb2(0, 0, 0),
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
      const { PDFDocument: PDFDocument2, rgb: rgb2 } = PDFLib;
      const response = await fetch("/certificate6.pdf");
      if (!response.ok) {
        console.log("response", response);
        throw new Error("Certificate template not found. Please ensure certificate6.pdf is in the public folder.");
      }
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument2.load(existingPdfBytes);
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
        color: rgb2(0, 0, 0),
        font: helveticaBold
      });
      if (student.guardianName) {
        firstPage.drawText(` ${toCamelCase(student.guardianName)}`, {
          x: width / 2 + 130,
          y: height - 285,
          size: 16,
          color: rgb2(0, 0, 0),
          font: helvetica
        });
      }
      const courseName = getCourseNames(student.courseIds) || student.courseName || "Course Name";
      firstPage.drawText(toCamelCase(courseName), {
        x: width / 2 - 205,
        y: height - 330,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      const courseDuration = formatCourseDuration(student.courseIds);
      firstPage.drawText(` ${courseDuration}`, {
        x: width / 2 + 130,
        y: height - 330,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      const subjectNames = student.selectedSubjects && student.selectedSubjects.length > 0 ? student.selectedSubjects.map((subject) => toCamelCase(subject.SubjectName)).join(", ") : "No Subjects Specified";
      firstPage.drawText(`${subjectNames}`, {
        x: width / 2 - 205,
        y: height - 375,
        size: 14,
        color: rgb2(0, 0, 0),
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
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.trainingcenter)}`, {
        x: width / 2 - 210,
        y: height - 422,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(` ${toCamelCase(student.certificateGrade)}`, {
        x: width / 2 + 130,
        y: height - 422,
        size: 16,
        color: rgb2(0, 0, 0),
        font: helvetica
      });
      firstPage.drawText(`:${student.regid}`, {
        x: width / 2 - 75,
        y: height - 680,
        size: 12,
        color: rgb2(0, 0, 0),
        font: helveticaBold
      });
      firstPage.drawText(` ${student.regid}`, {
        x: width / 2 - 70,
        y: height - 493,
        size: 12,
        color: rgb2(0, 0, 0),
        font: helveticaBold
      });
      firstPage.drawText(` ${student.regid}`, {
        x: width / 2 - 70,
        y: height - 493,
        size: 12,
        color: rgb2(0, 0, 0),
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
          searchTerm && ` (filtered from ${students2.length} total)`
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
const RegistrationForm = () => {
  useNavigate();
  const [formData, setFormData] = useState({
    regid: "",
    fName: "",
    lName: "",
    guardianName: "",
    contactAddress: "",
    email: "",
    city: "",
    state: "",
    qualification: "",
    otherQualification: "",
    collegeName: "",
    phone: "",
    source: "",
    courseTypeId: "",
    courseId: "",
    courseName: "",
    selectedSubjects: [],
    courseFee: "",
    joiningDate: "",
    password: "",
    profilePhoto: "",
    ReferralName: "",
    offeredFee: "",
    feeType: "Single",
    installmentCount: 0,
    installments: [],
    paymentsPlan: []
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses2, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [emailValidation, setEmailValidation] = useState({
    isChecking: false,
    exists: false,
    message: ""
  });
  const emailCheckTimeout = useRef(null);
  const sourceOptions = [
    "Instagram",
    "LinkedIn",
    "Facebook",
    "Twitter",
    "YouTube",
    "Reference",
    "Direct"
  ];
  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    guardianName: "",
    qualification: "",
    otherQualification: "",
    collegeName: "",
    phone: "",
    email: ""
  });
  const checkEmailExists = async (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setEmailValidation((prev) => ({ ...prev, isChecking: true }));
    try {
      const response = await axios.get(
        `/api/check-email-exists?email=${email}`
      );
      const exists = response.data.exists;
      setEmailValidation({
        isChecking: false,
        exists,
        message: exists ? "This email is already registered" : "Email is available"
      });
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailValidation({
        isChecking: false,
        exists: false,
        message: "Unable to verify email"
      });
    }
  };
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [courseTypeRes, courseRes, subjectRes] = await Promise.all([
          axios.get("/api/coursetypes"),
          axios.get("/api/new/courses"),
          axios.get("/api/subjects")
        ]);
        setCourseTypes(courseTypeRes.data);
        setCourses(courseRes.data);
        setSubjects(subjectRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllData();
  }, []);
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const indianStates = [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal"
        ];
        setStates(indianStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);
  const getCitiesForState = (state) => {
    const cityMap = {
      "Andhra Pradesh": [
        // Districts
        "Anantapur",
        "Chittoor",
        "East Godavari",
        "Guntur",
        "Kadapa",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        // Major Cities
        "Vijayawada",
        "Tirupati",
        "Kakinada",
        "Rajamahendravaram",
        "Eluru",
        "Ongole",
        "Machilipatnam",
        "Tadepalligudem",
        "Bhimavaram",
        "Hindupur",
        "Srikakulam",
        "Amadalavalasa",
        "Tadipatri",
        "Tenali"
      ],
      "Arunachal Pradesh": [
        // Districts
        "Tawang",
        "West Kameng",
        "East Kameng",
        "Papum Pare",
        "Kurung Kumey",
        "Kra Daadi",
        "Lower Subansiri",
        "Upper Subansiri",
        "West Siang",
        "East Siang",
        "Siang",
        "Upper Siang",
        "Lower Siang",
        "Lower Dibang Valley",
        "Dibang Valley",
        "Anjaw",
        "Lohit",
        "Namsai",
        "Changlang",
        "Tirap",
        "Longding",
        // Major Cities
        "Itanagar",
        "Naharlagun",
        "Pasighat",
        "Bomdila",
        "Ziro",
        "Tezu",
        "Aalo",
        "Roing"
      ],
      Assam: [
        // Districts
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Dima Hasao",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup",
        "Kamrup Metropolitan",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tamulpur",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong",
        // Major Cities
        "Guwahati",
        "Silchar",
        "Dibrugarh",
        "Jorhat",
        "Nagaon",
        "Tinsukia",
        "Tezpur",
        "Diphu",
        "Karimganj",
        "Sivasagar",
        "Goalpara",
        "Duliajan",
        "Bongaigaon",
        "Dhubri"
      ],
      Bihar: [
        // Districts
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran",
        // Major Cities
        "Patna",
        "Gaya",
        "Bhagalpur",
        "Muzaffarpur",
        "Darbhanga",
        "Purnia",
        "Arrah",
        "Begusarai",
        "Chapra",
        "Katihar",
        "Sasaram",
        "Hajipur",
        "Dehri",
        "Siwan",
        "Motihari",
        "Bihar Sharif"
      ],
      Chhattisgarh: [
        // Districts
        "Balod",
        "Baloda Bazar",
        "Balrampur",
        "Bastar",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Gaurela-Pendra-Marwahi",
        "Janjgir-Champa",
        "Jashpur",
        "Kabirdham",
        "Kanker",
        "Khairagarh-Chhuikhadan-Gandai",
        "Kondagaon",
        "Korba",
        "Korea",
        "Mahasamund",
        "Manendragarh-Chirmiri-Bharatpur",
        "Mohla-Manpur-Ambagarh Chowki",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sarangarh-Bilaigarh",
        "Sakti",
        "Sukma",
        "Surajpur",
        "Surguja",
        // Major Cities
        "Raipur",
        "Bilaspur",
        "Bhilai",
        "Korba",
        "Durg",
        "Rajnandgaon",
        "Jagdalpur",
        "Ambikapur",
        "Raigarh",
        "Dhamtari",
        "Mahasamund",
        "Chirmiri",
        "Bhatapara"
      ],
      Goa: [
        // Districts
        "North Goa",
        "South Goa",
        // Major Cities
        "Panaji",
        "Margao",
        "Vasco da Gama",
        "Mapusa",
        "Ponda",
        "Cuncolim",
        "Curchorem",
        "Sanguem",
        "Bicholim",
        "Pernem",
        "Canacona",
        "Quepem"
      ],
      Gujarat: [
        // Districts
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kheda",
        "Kutch",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada",
        "Navsari",
        "Panchmahal",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha",
        "Surat",
        "Surendranagar",
        "Tapi",
        "Vadodara",
        "Valsad",
        // Major Cities
        "Ahmedabad",
        "Surat",
        "Vadodara",
        "Rajkot",
        "Bhavnagar",
        "Jamnagar",
        "Junagadh",
        "Gandhinagar",
        "Anand",
        "Nadiad",
        "Gandhidham",
        "Bharuch",
        "Navsari",
        "Porbandar",
        "Veraval",
        "Godhra",
        "Palanpur"
      ],
      Haryana: [
        // Districts
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar",
        // Major Cities
        "Gurugram",
        "Faridabad",
        "Panipat",
        "Ambala",
        "Yamunanagar",
        "Rohtak",
        "Hisar",
        "Karnal",
        "Sonipat",
        "Panchkula",
        "Bhiwani",
        "Sirsa",
        "Bahadurgarh",
        "Jind",
        "Thanesar",
        "Kaithal"
      ],
      "Himachal Pradesh": [
        // Districts
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul and Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Una",
        // Major Cities
        "Shimla",
        "Dharamshala",
        "Mandi",
        "Solan",
        "Palampur",
        "Baddi",
        "Nahan",
        "Kullu",
        "Hamirpur",
        "Una",
        "Bilaspur",
        "Chamba",
        "Sundernagar",
        "Nalagarh"
      ],
      Jharkhand: [
        // Districts
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribagh",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu",
        "Ramgarh",
        "Ranchi",
        "Sahebganj",
        "Seraikela Kharsawan",
        "Simdega",
        "West Singhbhum",
        // Major Cities
        "Ranchi",
        "Jamshedpur",
        "Dhanbad",
        "Bokaro Steel City",
        "Hazaribagh",
        "Deoghar",
        "Giridih",
        "Ramgarh",
        "Medininagar",
        "Chirkunda",
        "Gumla",
        "Dumka",
        "Chaibasa",
        "Godda",
        "Sahibganj"
      ],
      Karnataka: [
        // Districts
        "Bagalkot",
        "Bangalore Rural",
        "Bangalore Urban",
        "Belagavi",
        "Bellary",
        "Bidar",
        "Chamarajanagar",
        "Chikkaballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Gulbarga",
        "Hassan",
        "Haveri",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysore",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumkur",
        "Udupi",
        "Uttara Kannada",
        "Vijayapura",
        "Yadgir",
        // Major Cities
        "Bengaluru",
        "Mysuru",
        "Hubballi-Dharwad",
        "Mangaluru",
        "Belagavi",
        "Kalaburagi",
        "Davanagere",
        "Ballari",
        "Vijayapura",
        "Shivamogga",
        "Tumakuru",
        "Hassan",
        "Udupi",
        "Raichur",
        "Bidar",
        "Hospet",
        "Gadag-Betageri",
        "Robertsonpet",
        "Bhadravati",
        "Chitradurga"
      ],
      Kerala: [
        // Districts
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
        // Major Cities
        "Thiruvananthapuram",
        "Kochi",
        "Kozhikode",
        "Thrissur",
        "Kollam",
        "Alappuzha",
        "Kannur",
        "Kottayam",
        "Palakkad",
        "Manjeri",
        "Kasaragod",
        "Malappuram",
        "Ponnani",
        "Vatakara",
        "Cherthala",
        "Neyyattinkara",
        "Thalassery",
        "Chengannur",
        "Kodungallur"
      ],
      "Madhya Pradesh": [
        // Districts
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Niwari",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha",
        // Major Cities
        "Indore",
        "Bhopal",
        "Jabalpur",
        "Gwalior",
        "Ujjain",
        "Sagar",
        "Dewas",
        "Satna",
        "Ratlam",
        "Rewa",
        "Chhindwara",
        "Khandwa",
        "Morena",
        "Burhanpur",
        "Singrauli",
        "Bhind",
        "Guna",
        "Shivpuri",
        "Vidisha",
        "Chhatarpur",
        "Damoh",
        "Mandsaur",
        "Khargone",
        "Neemuch"
      ],
      Maharashtra: [
        // Districts
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal",
        // Major Cities
        "Mumbai",
        "Pune",
        "Nagpur",
        "Thane",
        "Nashik",
        "Aurangabad",
        "Solapur",
        "Kolhapur",
        "Amravati",
        "Navi Mumbai",
        "Kalyan-Dombivli",
        "Vasai-Virar",
        "Bhiwandi",
        "Jalgaon",
        "Akola",
        "Latur",
        "Dhule",
        "Ahmednagar",
        "Chandrapur",
        "Parbhani",
        "Ichalkaranji",
        "Jalna",
        "Ambarnath",
        "Bhusawal",
        "Panvel",
        "Badlapur",
        "Beed",
        "Gondia",
        "Satara",
        "Barshi"
      ],
      Manipur: [
        // Districts
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul",
        // Major Cities
        "Imphal",
        "Thoubal",
        "Kakching",
        "Ukhrul",
        "Bishnupur",
        "Churachandpur",
        "Moirang",
        "Jiribam",
        "Lilong",
        "Kangpokpi",
        "Yairipok",
        "Ningthoukhong",
        "Moreh",
        "Nambol",
        "Senapati"
      ],
      Meghalaya: [
        // Districts
        "East Garo Hills",
        "East Jaintia Hills",
        "East Khasi Hills",
        "North Garo Hills",
        "Ri-Bhoi",
        "South Garo Hills",
        "South West Garo Hills",
        "South West Khasi Hills",
        "West Garo Hills",
        "West Jaintia Hills",
        "West Khasi Hills",
        "Eastern West Khasi Hills",
        // Major Cities
        "Shillong",
        "Tura",
        "Jowai",
        "Nongstoin",
        "Baghmara",
        "Williamnagar",
        "Resubelpara",
        "Nongpoh",
        "Khliehriat",
        "Mawkyrwat",
        "Ampati",
        "Mairang"
      ],
      Mizoram: [
        // Districts
        "Aizawl",
        "Champhai",
        "Hnahthial",
        "Khawzawl",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Saitual",
        "Serchhip",
        // Major Cities
        "Aizawl",
        "Lunglei",
        "Champhai",
        "Kolasib",
        "Serchhip",
        "Saiha",
        "Lawngtlai",
        "Mamit",
        "Saitual",
        "Khawzawl",
        "Hnahthial",
        "Bairabi",
        "Lengpui",
        "Zawlnuam",
        "Tlabung"
      ],
      Nagaland: [
        // Districts
        "Chümoukedima",
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Niuland",
        "Noklak",
        "Peren",
        "Phek",
        "Shamator",
        "Tseminyü",
        "Tuensang",
        "Wokha",
        "Zünheboto",
        // Major Cities
        "Dimapur",
        "Kohima",
        "Mokokchung",
        "Wokha",
        "Tuensang",
        "Zunheboto",
        "Mon",
        "Kiphire",
        "Phek",
        "Peren",
        "Longleng",
        "Tseminyu",
        "Shamator",
        "Chumukedima",
        "Noklak",
        "Niuland"
      ],
      Odisha: [
        // Districts
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Debagarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghpur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Kendujhar",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Sonepur",
        "Sundargarh",
        // Major Cities
        "Bhubaneswar",
        "Cuttack",
        "Rourkela",
        "Berhampur",
        "Sambalpur",
        "Puri",
        "Balasore",
        "Bhadrak",
        "Baripada",
        "Jeypore",
        "Jharsuguda",
        "Angul",
        "Bargarh",
        "Bolangir",
        "Jajpur",
        "Kendrapara",
        "Paradip",
        "Rayagada",
        "Bhawanipatna",
        "Dhenkanal"
      ],
      Punjab: [
        // Districts
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Muktsar",
        "Nawanshahr",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sangrur",
        "SAS Nagar",
        "Tarn Taran",
        // Major Cities
        "Ludhiana",
        "Amritsar",
        "Jalandhar",
        "Patiala",
        "Bathinda",
        "Mohali",
        "Pathankot",
        "Hoshiarpur",
        "Batala",
        "Moga",
        "Abohar",
        "Malout",
        "Khanna",
        "Phagwara",
        "Firozpur",
        "Kapurthala",
        "Muktsar",
        "Rajpura",
        "Sangrur",
        "Barnala"
      ],
      Rajasthan: [
        // Districts
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Ganganagar",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Pratapgarh",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Tonk",
        "Udaipur",
        // Major Cities
        "Jaipur",
        "Jodhpur",
        "Kota",
        "Bikaner",
        "Ajmer",
        "Udaipur",
        "Bhilwara",
        "Alwar",
        "Bharatpur",
        "Sri Ganganagar",
        "Sikar",
        "Pali",
        "Chittorgarh",
        "Nagaur",
        "Hanumangarh",
        "Beawar",
        "Kishangarh",
        "Tonk",
        "Sujangarh",
        "Jhunjhunu",
        "Sawai Madhopur",
        "Churu",
        "Bundi",
        "Hindaun",
        "Dausa",
        "Jhalawar",
        "Banswara",
        "Barmer",
        "Rajsamand",
        "Makrana"
      ],
      Sikkim: [
        // Districts
        "East Sikkim",
        "North Sikkim",
        "South Sikkim",
        "West Sikkim",
        "Pakyong",
        "Soreng",
        // Major Cities
        "Gangtok",
        "Namchi",
        "Gyalshing",
        "Mangan",
        "Singtam",
        "Rangpo",
        "Jorethang",
        "Naya Bazar",
        "Pakyong",
        "Soreng",
        "Yuksom",
        "Ravangla",
        "Rhenock",
        "Legship",
        "Chungthang"
      ],
      "Tamil Nadu": [
        // Districts
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanniyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar",
        // Major Cities
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli",
        "Salem",
        "Tirunelveli",
        "Tiruppur",
        "Vellore",
        "Thoothukudi",
        "Erode",
        "Dindigul",
        "Thanjavur",
        "Ranipet",
        "Sivakasi",
        "Karur",
        "Udhagamandalam",
        "Hosur",
        "Nagercoil",
        "Kanchipuram",
        "Kumarapalayam",
        "Karaikudi",
        "Neyveli",
        "Cuddalore",
        "Kumbakonam",
        "Tiruvannamalai",
        "Pollachi",
        "Rajapalayam",
        "Gudiyatham",
        "Pudukottai",
        "Vaniyambadi",
        "Ambur"
      ],
      Telangana: [
        // Districts
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalapally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Medchal-Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rangareddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Warangal Urban",
        "Warangal Rural",
        "Yadadri Bhuvanagiri",
        // Major Cities
        "Hyderabad",
        "Warangal",
        "Nizamabad",
        "Karimnagar",
        "Khammam",
        "Ramagundam",
        "Mahbubnagar",
        "Suryapet",
        "Siddipet",
        "Miryalaguda",
        "Adilabad",
        "Nalgonda",
        "Jagtial",
        "Mancherial",
        "Kothagudem",
        "Nirmal",
        "Kamareddy",
        "Bodhan",
        "Vikarabad",
        "Zahirabad"
      ],
      Tripura: [
        // Districts
        "Dhalai",
        "North Tripura",
        "Sepahijala",
        "South Tripura",
        "Unakoti",
        "West Tripura",
        // Major Cities
        "Agartala",
        "Udaipur",
        "Dharmanagar",
        "Kailashahar",
        "Belonia",
        "Khowai",
        "Teliamura",
        "Santir Bazar",
        "Ambassa",
        "Kumarghat",
        "Sonamura",
        "Amarpur",
        "Ranirbazar",
        "Bishramganj"
      ],
      "Uttar Pradesh": [
        // Districts
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Faizabad",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pratapgarh",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Shahjahanpur",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi",
        // Major Cities
        "Lucknow",
        "Kanpur",
        "Ghaziabad",
        "Agra",
        "Varanasi",
        "Meerut",
        "Allahabad (Prayagraj)",
        "Bareilly",
        "Aligarh",
        "Moradabad",
        "Saharanpur",
        "Gorakhpur",
        "Noida",
        "Firozabad",
        "Jhansi",
        "Muzaffarnagar",
        "Mathura",
        "Ayodhya",
        "Shahjahanpur",
        "Rampur",
        "Farrukhabad",
        "Mau",
        "Hapur",
        "Etawah",
        "Mirzapur",
        "Bulandshahr",
        "Sambhal",
        "Amroha",
        "Hardoi",
        "Bahraich",
        "Sitapur"
      ],
      Uttarakhand: [
        // Districts
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi",
        // Major Cities
        "Dehradun",
        "Haridwar",
        "Roorkee",
        "Haldwani",
        "Rudrapur",
        "Kashipur",
        "Rishikesh",
        "Nainital",
        "Mussoorie",
        "Kotdwar",
        "Pithoragarh",
        "Pauri",
        "Tehri",
        "Almora",
        "Ramnagar",
        "Uttarkashi",
        "Chamoli",
        "Jaspur",
        "Kichha",
        "Manglaur",
        "Srinagar",
        "Bageshwar",
        "Champawat",
        "Khatima"
      ],
      "West Bengal": [
        // Districts
        "Alipurduar",
        "Bankura",
        "Birbhum",
        "Bardhaman",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Maldah",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Medinipur",
        "Purba Medinipur",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur",
        // Major Cities
        "Kolkata",
        "Howrah",
        "Durgapur",
        "Asansol",
        "Siliguri",
        "Bardhaman",
        "Malda",
        "Baharampur",
        "Habra",
        "Kharagpur",
        "Raniganj",
        "Haldia",
        "Raiganj",
        "Krishnanagar",
        "Jalpaiguri",
        "Bidhannagar",
        "Barasat",
        "Cooch Behar",
        "Balurghat",
        "Bankura",
        "Bishnupur",
        "Puruliya",
        "Darjeeling",
        "Alipurduar",
        "Kalimpong"
      ]
    };
    return cityMap[state] || [];
  };
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setFormData((prev) => ({ ...prev, state: stateName, city: "" }));
    setCities(getCitiesForState(stateName));
  };
  const normalizeId = (id) => {
    if (!id) return null;
    if (typeof id === "string") return id;
    if (id.$oid) return id.$oid;
    return id._id ? normalizeId(id._id) : null;
  };
  const filteredCourses = courses2.filter((course) => {
    if (!formData.courseTypeId) return false;
    if (Array.isArray(course.CourseTypeID)) {
      return course.CourseTypeID.some(
        (ctId) => normalizeId(ctId) === formData.courseTypeId
      );
    }
    return normalizeId(course.CourseTypeID) === formData.courseTypeId;
  });
  const filteredSubjects = subjects.filter((subject) => {
    if (!formData.courseId || !subject.coursesids) return false;
    return Array.isArray(subject.coursesids) && subject.coursesids.some(
      (courseId) => normalizeId(courseId) === formData.courseId
    );
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (["fName", "lName", "guardianName", "otherQualification", "qualification", "collegeName", "ReferralName"].includes(name)) {
      if (value && !/^[A-Za-z\s.'"-]*$/.test(value)) {
        errorMessage = "Only alphabets and spaces allowed";
      }
    } else if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value.length === 0) {
          errorMessage = "Phone number is required";
        } else if (value.length === 1 && !/^[6-9]$/.test(value)) {
          errorMessage = "Phone number must start with 6, 7, 8, or 9";
        } else if (value.length === 10 && !/^[6-9]\d{9}$/.test(value)) {
          errorMessage = "Phone number must be 10 digits and start with 6, 7, 8, or 9";
        } else {
          errorMessage = "";
        }
      } else {
        errorMessage = "Only numbers allowed";
      }
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    } else if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (emailCheckTimeout.current) {
        clearTimeout(emailCheckTimeout.current);
      }
      if (value && /^\S+@\S+\.\S{2,12}$/.test(value)) {
        errorMessage = "";
        emailCheckTimeout.current = setTimeout(() => {
          checkEmailExists(value);
        }, 500);
      } else if (value) {
        errorMessage = "Invalid email format";
      } else {
        errorMessage = "";
      }
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    } else if (name === "courseTypeId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        courseId: "",
        courseName: "",
        selectedSubjects: []
      }));
      return;
    } else if (name === "courseId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        courseName: courses2.find((course) => course._id === value)?.CourseName || "",
        selectedSubjects: []
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    if (!errorMessage || value === "") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    const isChecked = e.target.checked;
    const name = formData.courseName?.toLowerCase();
    let maxSubjects = Infinity;
    if (name.includes("certification")) {
      maxSubjects = 1;
    } else if (name.includes("professional diploma")) {
      maxSubjects = 3;
    } else if (name.includes("master diploma")) {
      maxSubjects = 10;
    } else if (name.includes("diploma")) {
      maxSubjects = 2;
    } else if (name.includes("master")) {
      maxSubjects = 10;
    }
    if (isChecked) {
      if (formData.selectedSubjects.length >= maxSubjects) {
        alert(`You can select a maximum of ${maxSubjects} subject(s) for this course type.`);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        selectedSubjects: [...prev.selectedSubjects, subjectId]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedSubjects: prev.selectedSubjects.filter((id) => id !== subjectId)
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "feeType") {
      setFormData((prev) => ({
        ...prev,
        feeType: value,
        installmentCount: value === "Installment" ? prev.installmentCount : 0,
        installments: value === "Installment" ? prev.installments : []
      }));
    } else if (name === "installmentCount") {
      let count = parseInt(value, 10);
      if (isNaN(count) || count < 0) count = 0;
      if (count > 12) count = 12;
      setFormData((prev) => {
        let newInstallments = [...prev.installments];
        if (newInstallments.length > count) {
          newInstallments.length = count;
        } else {
          while (newInstallments.length < count) {
            newInstallments.push({ dueDate: "", amount: "" });
          }
        }
        return {
          ...prev,
          installmentCount: count,
          installments: newInstallments
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleInstallmentInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let installments = [...prev.installments || []];
      if (name === `dueDate${index + 1}`) {
        if (!installments[index]) installments[index] = {};
        installments[index].dueDate = value;
        return { ...prev, installments };
      }
      if (name === `amount${index + 1}`) {
        if (value === "" || /^\d+$/.test(value)) {
          const newAmount = value === "" ? 0 : parseInt(value, 10);
          const offeredFee = parseInt(prev.offeredFee || 0);
          let sumBefore = 0;
          for (let i = 0; i < index; i++) {
            sumBefore += parseInt(installments[i]?.amount || 0);
          }
          if (sumBefore + newAmount > offeredFee) {
            return prev;
          }
          const remaining = offeredFee - sumBefore - newAmount;
          if (!installments[index]) installments[index] = {};
          installments[index].amount = newAmount.toString();
          const remainingInstallments = installments.length - index - 1;
          if (remainingInstallments > 0) {
            const equalAmount = Math.floor(remaining / remainingInstallments);
            const smallRemainder = remaining % remainingInstallments;
            for (let i = index + 1; i < installments.length; i++) {
              if (!installments[i]) installments[i] = {};
              const extraAmount = i === index + 1 ? smallRemainder : 0;
              installments[i].amount = (equalAmount + extraAmount).toString();
            }
          }
          return { ...prev, installments };
        }
        return prev;
      }
      return prev;
    });
  };
  const generateInstallmentRows = () => {
    const count = parseInt(formData.installmentCount || 0);
    if (count <= 0) return null;
    return Array.from({ length: count }, (_, index) => {
      const installment = formData.installments?.[index] || {};
      return /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-xl-6", children: [
          /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
            "Due Date ",
            index + 1,
            ":"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              className: "form-control",
              name: `dueDate${index + 1}`,
              value: installment.dueDate || "",
              onChange: (e) => handleInstallmentInputChange(e, index)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-xl-6", children: [
          /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
            "Amount ",
            index + 1,
            ":"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              className: "form-control",
              name: `amount${index + 1}`,
              value: installment.amount || "",
              onChange: (e) => handleInstallmentInputChange(e, index)
            }
          )
        ] })
      ] }, index);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors2 = {};
    const data = new FormData();
    const requiredFields = [
      "fName",
      "guardianName",
      "contactAddress",
      "email",
      "city",
      "state",
      "qualification",
      "collegeName",
      "phone",
      "courseTypeId",
      "courseId",
      "source",
      "offeredFee"
    ];
    if (formData.qualification === "Other" && !formData.otherQualification) {
      errors2.otherQualification = "Other qualification is required when 'Other' is selected.";
    }
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim && !formData[field]) {
        errors2[field] = `${field} is required.`;
      } else if (formData[field]?.trim && !formData[field]?.trim()) {
        errors2[field] = `${field} is required.`;
      }
    });
    if (formData.email && !/^\S+@\S+\.\S{2,12}$/.test(formData.email)) {
      errors2.email = "Invalid email format.";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors2.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.source) {
      errors2.source = "Please select how you heard about us.";
    }
    if (Object.keys(errors2).length > 0) {
      const errorMessages = Object.values(errors2).join("\n");
      alert(`Please correct the following errors:

${errorMessages}`);
      return;
    }
    if (formData.feeType === "Installment" && Array.isArray(formData.installments)) {
      const validInstallments = formData.installments.filter(
        (inst) => inst && typeof inst === "object" && inst.dueDate && inst.amount && String(inst.dueDate).trim() !== "" && String(inst.amount).trim() !== ""
      );
      validInstallments.forEach((inst, idx) => {
        data.append(`paymentsPlan[${idx}][dueDate]`, String(inst.dueDate).trim());
        data.append(`paymentsPlan[${idx}][amount]`, parseInt(inst.amount));
        data.append(`paymentsPlan[${idx}][status]`, "Pending");
        data.append(`paymentsPlan[${idx}][paidDate]`, "");
        data.append(`paymentsPlan[${idx}][paidAmount]`, 0);
        data.append(`paymentsPlan[${idx}][transactionId]`, "");
        data.append(`paymentsPlan[${idx}][receivedBy]`, "");
        data.append(`paymentsPlan[${idx}][receiptPath]`, "");
        data.append(`paymentsPlan[${idx}][receiptId]`, "");
        data.append(`paymentsPlan[${idx}][paymentMode]`, "");
      });
    }
    Object.keys(formData).forEach((key) => {
      if (key === "installments") return;
      if (key === "selectedSubjects") {
        if (Array.isArray(formData.selectedSubjects)) {
          formData.selectedSubjects.forEach((subjectId, index) => {
            if (subjectId && subjectId !== "") {
              data.append(`selectedSubjects[${index}]`, subjectId);
            }
          });
        }
      } else if (key === "courseId") {
        if (Array.isArray(formData.courseId)) {
          formData.courseId.forEach((course, index) => {
            if (course?._id) {
              data.append(`courseIds[${index}]`, course._id);
            }
          });
        } else if (typeof formData.courseId === "object" && formData.courseId?._id) {
          data.append("courseIds[0]", formData.courseId._id);
        } else if (typeof formData.courseId === "string" && formData.courseId.trim() !== "") {
          data.append("courseIds[0]", formData.courseId);
          data.append("courseId", formData.courseId);
        }
      } else if (key === "courseTypeId") {
        if (formData[key] && formData[key].trim() !== "") {
          data.append(key, formData[key]);
        }
      } else {
        if (formData[key] !== null && formData[key] !== void 0 && formData[key] !== "") {
          if (key === "phone") {
            data.append(key, `+91${formData[key]}`);
          } else {
            data.append(key, formData[key]);
          }
        }
      }
    });
    if (selectedFile) {
      data.append("profilePhoto", selectedFile);
    }
    try {
      const response = await axios.post(
        "/api/newregistration",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      alert("Registration Successful!");
      setFormData({
        fName: "",
        lName: "",
        guardianName: "",
        contactAddress: "",
        email: "",
        city: "",
        state: "",
        qualification: "",
        otherQualification: "",
        collegeName: "",
        phone: "",
        source: "",
        courseTypeId: "",
        courseId: "",
        courseName: "",
        selectedSubjects: [],
        courseFee: "",
        joiningDate: "",
        feeType: "Single",
        installmentCount: "",
        password: "",
        offeredFee: "",
        installments: [],
        regid: ""
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error registering student!");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "page-wrapper", children: /* @__PURE__ */ jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "page-header", children: /* @__PURE__ */ jsx("div", { className: "row align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsx("h3", { children: "Registration Form" }) }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12 d-flex", children: /* @__PURE__ */ jsx("div", { className: "card w-100", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Registration Id",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "regid",
            className: "form-control",
            placeholder: "Enter regid",
            value: formData.regid,
            onChange: handleChange,
            required: true
          }
        ),
        errors.fName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.fName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "First Name",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "fName",
            className: "form-control",
            placeholder: "Enter First Name",
            value: formData.fName,
            onChange: handleChange,
            required: true
          }
        ),
        errors.fName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.fName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsx("label", { children: "Last Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "lName",
            className: "form-control",
            placeholder: "Enter Last Name",
            value: formData.lName,
            onChange: handleChange
          }
        ),
        errors.lName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.lName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Guardian/Father's Name ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "guardianName",
            placeholder: "Enter Guardian/Father's Name",
            className: "form-control",
            value: formData.guardianName,
            onChange: handleChange,
            required: true
          }
        ),
        errors.guardianName && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.guardianName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Phone Number ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "input-group-text",
              style: {
                width: "45px",
                height: "43px",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "10px"
              },
              children: "+91"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "phone",
              className: "form-control",
              value: formData.phone,
              onChange: handleChange,
              maxLength: 10,
              placeholder: "Enter 10-digit number",
              required: true
            }
          )
        ] }),
        errors.phone && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Email ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            className: "form-control",
            value: formData.email,
            onChange: handleChange,
            placeholder: "Enter Email",
            required: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("small", { className: "text-danger", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "State ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "state",
            className: "form-control",
            value: formData.state,
            onChange: handleStateChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select State" }),
              states.map((state, index) => /* @__PURE__ */ jsx("option", { value: state, children: state }, index))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "City ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "city",
            className: "form-control",
            value: formData.city,
            onChange: handleChange,
            required: true,
            disabled: !formData.state,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select City" }),
              cities.map((city, index) => /* @__PURE__ */ jsx("option", { value: city, children: city }, index))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Qualification ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "qualification",
            className: "form-control",
            value: formData.qualification,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Qualification" }),
              /* @__PURE__ */ jsx("option", { value: "BE", children: "BE" }),
              /* @__PURE__ */ jsx("option", { value: "BTech", children: "BTech" }),
              /* @__PURE__ */ jsx("option", { value: "ME", children: "ME" }),
              /* @__PURE__ */ jsx("option", { value: "MTech", children: "MTech" }),
              /* @__PURE__ */ jsx("option", { value: "Diploma", children: "Diploma" }),
              /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
            ]
          }
        )
      ] }),
      formData.qualification === "Other" && /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Other Qualification ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "otherQualification",
            className: "form-control",
            value: formData.otherQualification || "",
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "College Name ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "collegeName",
            className: "form-control",
            value: formData.collegeName,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { className: "mb-2", children: [
          "Contact Address ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            style: { resize: "none" },
            rows: 2,
            name: "contactAddress",
            className: "form-control",
            value: formData.contactAddress,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Course Type ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "courseTypeId",
            className: "form-control",
            value: formData.courseTypeId,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Course Type" }),
              courseTypes.map((ct) => /* @__PURE__ */ jsx("option", { value: ct._id, children: ct.CourseTypeName }, ct._id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Course ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "courseId",
            className: "form-control",
            value: formData.courseId,
            onChange: handleChange,
            required: true,
            disabled: !formData.courseTypeId,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Course" }),
              filteredCourses.map((course) => /* @__PURE__ */ jsx("option", { value: course._id, children: course.CourseName }, course._id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "How did you hear about us? ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "source",
            className: "form-control",
            value: formData.source,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Source" }),
              sourceOptions.map((source, index) => /* @__PURE__ */ jsx("option", { value: source, children: source }, index))
            ]
          }
        )
      ] }),
      formData.source === "Reference" && /* @__PURE__ */ jsxs("div", { className: "col-xl-3", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Friend/Referral Name ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "ReferralName",
            className: "form-control",
            value: formData.ReferralName || "",
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      filteredSubjects.length > 0 && /* @__PURE__ */ jsxs("div", { className: "col-xl-12 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Select Subjects: ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "row", children: filteredSubjects.map((subject) => /* @__PURE__ */ jsx("div", { className: "col-md-2 mb-2", children: /* @__PURE__ */ jsxs("div", { className: "form-check", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "form-check-input",
              id: subject._id,
              value: subject._id,
              checked: formData.selectedSubjects.includes(subject._id),
              onChange: handleSubjectChange
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "form-check-label", htmlFor: subject._id, children: subject.SubjectName })
        ] }) }, subject._id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Course Fee ",
          /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "offeredFee",
            className: "form-control",
            value: formData.offeredFee,
            onChange: handleChange,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-xl-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Fee Type:" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "form-select",
            name: "feeType",
            value: formData.feeType,
            onChange: handleInputChange,
            children: [
              /* @__PURE__ */ jsx("option", { value: "Single", children: "Full Payment" }),
              /* @__PURE__ */ jsx("option", { value: "Installment", children: "Installment" })
            ]
          }
        )
      ] }),
      formData.feeType === "Installment" && /* @__PURE__ */ jsxs("div", { className: "col-xl-3 mb-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Installment Count:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            className: "form-control",
            name: "installmentCount",
            value: formData.installmentCount,
            onChange: handleInputChange,
            min: "1",
            max: "12",
            placeholder: "Enter number of installments"
          }
        )
      ] }),
      formData.feeType === "Installment" && formData.installmentCount > 0 && /* @__PURE__ */ jsxs("div", { className: "col-xl-6 mt-3", children: [
        /* @__PURE__ */ jsx("h6", { children: "Payment Plan" }),
        /* @__PURE__ */ jsx("div", { className: "installment-plan", children: generateInstallmentRows() })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "row" }),
      /* @__PURE__ */ jsx("div", { className: "col-xl-3 col-lg-5 col-md-6 col-sm-12", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: "Submit" }) })
    ] }) }) }) }) }) })
  ] }) });
};
const StudentDetail = () => {
  const location = useLocation();
  const getRegidFromSources = () => {
    console.log("=== STUDENT DETAIL DEBUG START ===");
    console.log("Full URL:", window.location.href);
    console.log("Location pathname:", location.pathname);
    console.log("Location search:", location.search);
    console.log("Location hash:", location.hash);
    console.log("Location state:", location.state);
    if (location.state?.regid) {
      console.log("✅ Found regid in state:", location.state.regid);
      console.log("=== STUDENT DETAIL DEBUG END ===");
      return location.state.regid;
    }
    if (location.hash) {
      const regidFromHash = location.hash.substring(1);
      console.log("✅ Found regid in hash:", regidFromHash);
      console.log("Hash length:", regidFromHash.length);
      console.log("=== STUDENT DETAIL DEBUG END ===");
      return regidFromHash;
    }
    const urlParams = new URLSearchParams(location.search);
    console.log("All URL params:", Object.fromEntries(urlParams.entries()));
    const queryRegid = urlParams.get("regid");
    if (queryRegid) {
      console.log("✅ Found regid in query param:", queryRegid);
      console.log("=== STUDENT DETAIL DEBUG END ===");
      return queryRegid;
    }
    console.log("❌ No regid found in any source!");
    console.log("=== STUDENT DETAIL DEBUG END ===");
    return null;
  };
  const regid = getRegidFromSources();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const capitalizeName = (name) => {
    if (!name) return "";
    return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };
  const toCamelCase = (str) => {
    if (!str) return "";
    return str.split(" ").map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(" ");
  };
  useEffect(() => {
    console.log("=== USEEFFECT DEBUG ===");
    console.log("RegID received in useEffect:", regid);
    console.log("RegID type:", typeof regid);
    console.log("RegID length:", regid ? regid.length : "null");
    if (!regid) {
      console.log("❌ No regid provided, stopping fetch");
      setLoading(false);
      return;
    }
    const fetchStudent = async () => {
      try {
        const apiUrl = `/api/verification`;
        console.log("=== API CALL DEBUG (POST METHOD) ===");
        console.log("🔍 Original RegID:", regid);
        console.log("🔍 API URL:", apiUrl);
        console.log("🔍 Request Method: POST");
        console.log("🔍 Request Body:", { regid });
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            regid
          })
        });
        console.log("📡 API Response Status:", res.status);
        console.log("📡 API Response OK:", res.ok);
        console.log("📡 API Response URL:", res.url);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ API Error Response:", errorText);
          setApiError(`API Error: ${res.status} - ${errorText}`);
          setLoading(false);
          return;
        }
        const data = await res.json();
        console.log("✅ API Response Data:", data);
        console.log("✅ Student Name:", data?.fName, data?.lName);
        console.log("✅ Student RegID:", data?.regid);
        console.log("=== API CALL DEBUG END ===");
        setStudent(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        console.error("❌ Error Type:", err.constructor.name);
        console.error("❌ Error Message:", err.message);
        setApiError(`Network Error: ${err.message}`);
        setLoading(false);
      }
    };
    fetchStudent();
  }, [regid]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-center align-items-center", style: { height: "60vh" }, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "spinner-border text-primary mb-2", role: "status", children: /* @__PURE__ */ jsx("span", { className: "visually-hidden", children: "Loading..." }) }),
      /* @__PURE__ */ jsx("p", { className: "text-muted", children: "Verifying Certificate..." }),
      /* @__PURE__ */ jsxs("small", { className: "text-info", children: [
        "RegID: ",
        regid
      ] })
    ] }) });
  }
  if (!regid) {
    return /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "card border-danger", children: /* @__PURE__ */ jsxs("div", { className: "card-body text-center p-4", children: [
      /* @__PURE__ */ jsx("i", { className: "fas fa-exclamation-triangle text-danger mb-3", style: { fontSize: "2rem" } }),
      /* @__PURE__ */ jsx("h4", { children: "Access Error" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted", children: "Registration ID not provided" }),
      /* @__PURE__ */ jsxs("small", { className: "text-info", children: [
        "Current URL: ",
        window.location.href
      ] })
    ] }) }) }) }) });
  }
  if (apiError) {
    return /* @__PURE__ */ jsx("div", { className: "container mt-5", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "card border-warning", children: /* @__PURE__ */ jsxs("div", { className: "card-body text-center p-4", children: [
      /* @__PURE__ */ jsx("i", { className: "fas fa-exclamation-circle text-warning mb-3", style: { fontSize: "2rem" } }),
      /* @__PURE__ */ jsx("h4", { children: "API Error" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted", children: apiError }),
      /* @__PURE__ */ jsxs("small", { className: "text-info", children: [
        "RegID: ",
        regid
      ] })
    ] }) }) }) }) });
  }
  if (!student) {
    return /* @__PURE__ */ jsx("div", { className: "container mt-5", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "card border-danger", children: /* @__PURE__ */ jsxs("div", { className: "card-body text-center p-4", children: [
      /* @__PURE__ */ jsx("i", { className: "fas fa-exclamation-triangle text-danger mb-3", style: { fontSize: "2rem" } }),
      /* @__PURE__ */ jsx("h4", { children: "Certificate Not Found" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted", children: [
        "No student found for registration ID: ",
        regid
      ] }),
      /* @__PURE__ */ jsxs("small", { className: "text-info", children: [
        "API URL: /api/verification/",
        regid
      ] })
    ] }) }) }) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-light min-vh-100", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm py-3", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-md-8", children: /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center",
            style: { width: "50px", height: "50px" },
            children: /* @__PURE__ */ jsx("i", { className: "fas fa-graduation-cap text-white" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-0 text-primary fw-bold", children: "Excerpt IT Training Services" }),
          /* @__PURE__ */ jsx("small", { className: "text-muted", children: "Certificate Verification Portal" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-4 text-md-end", children: /* @__PURE__ */ jsxs("span", { className: "badge bg-success px-3 py-2", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-check-circle me-1" }),
        "Verified"
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card shadow border-0 w-100", children: [
      /* @__PURE__ */ jsx("div", { className: "card-header bg-primary text-white py-3", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsxs("h5", { className: "mb-0 fw-bold", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-certificate me-2" }),
          "Certificate Details"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsxs("small", { children: [
          "ID: ",
          student.regid
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card-body p-4", children: /* @__PURE__ */ jsxs("div", { className: "row g-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsxs("h6", { className: "text-primary fw-semibold mb-3", children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-user me-2" }),
            "Student Information"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "fw-bold text-dark small", children: "FULL NAME" }),
            /* @__PURE__ */ jsxs("p", { className: "h5 mb-1", children: [
              capitalizeName(student.fName),
              " ",
              capitalizeName(student.lName)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "fw-bold text-dark small", children: "FATHER'S NAME" }),
            /* @__PURE__ */ jsx("p", { className: "mb-0", children: toCamelCase(student.guardianName) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsxs("h6", { className: "text-success fw-semibold mb-3", children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-book me-2" }),
            "Course Information"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "fw-bold text-dark small", children: "COURSE NAME" }),
            /* @__PURE__ */ jsx("p", { className: "h6 mb-1", children: toCamelCase(student.courseName) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "fw-bold text-dark small", children: "GRADE ACHIEVED" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx("span", { className: "badge bg-warning text-dark fs-6 px-3 py-2", children: student.certificateGrade }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card-footer bg-light py-3", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("div", { className: "d-flex align-items-center", children: /* @__PURE__ */ jsx("i", { className: "fas fa-shield-check text-success me-2" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("small", { className: "text-muted", children: "© Excerpt IT Training Services" }) })
      ] }) })
    ] }) }) }) })
  ] });
};
const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return /* @__PURE__ */ jsxs("div", { className: "admin-container", children: [
    /* @__PURE__ */ jsxs("div", { className: `sidebar ${isOpen ? "open" : "collapsed"}`, children: [
      /* @__PURE__ */ jsx("h1", { className: "logo", children: "Admin Panel" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/adminpage", children: [
          /* @__PURE__ */ jsx(Home$1, { size: 18 }),
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
        /* @__PURE__ */ jsx("button", { className: "menu-btn", onClick: () => setIsOpen(!isOpen), children: /* @__PURE__ */ jsx(Menu$1, { size: 22 }) }),
        /* @__PURE__ */ jsx("h2", { children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "content-area", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
};
const allCourses = [
  // ************************************
  //          IT COURSES (1–20)
  // ************************************
  {
    id: 1,
    title: "Digital Marketing",
    image: "/assests/images/digital_marketting.webp",
    longDescription: "Digital Marketing is one of the most effective strategies to promote products and services online. This course teaches SEO, SEM, Google Ads, Social Media, Email Marketing, Branding, Content Strategy, and Analytics. Students learn how to run real-world campaigns and measure marketing ROI. Ideal for freshers, business owners, and professionals.",
    syllabus: [
      "Introduction to Digital Marketing",
      "SEO On-page & Off-page",
      "Google Ads – Search, Display & Video",
      "Facebook & Instagram Ads",
      "Social Media Optimization",
      "Email Marketing Tools",
      "Content Strategy & Branding",
      "Google Analytics & Reporting"
    ]
  },
  {
    id: 2,
    title: "Data Science with Python",
    image: "/assests/images/ds-with-python.webp",
    longDescription: "This course covers the essential tools and concepts of Data Science using Python. You will learn to clean, analyze, visualize, and interpret data using libraries like NumPy, Pandas, and Matplotlib. The course also includes machine learning basics and real-world projects.",
    syllabus: [
      "Python Basics",
      "Data Handling with NumPy & Pandas",
      "Data Visualization Tools",
      "Statistics for Data Science",
      "Exploratory Data Analysis",
      "Machine Learning Algorithms",
      "Model Training & Evaluation",
      "Final ML Project"
    ]
  },
  {
    id: 3,
    title: "JAVA",
    image: "/assests/images/ds-with-r.webp",
    longDescription: "This course covers the fundamentals of Core Java. Learn OOP principles, exception handling, file handling, multithreading, collections, JDBC, and more. Ideal for software development roles and backend programming.",
    syllabus: [
      "Java Basics & OOP Concepts",
      "Packages & Interfaces",
      "Exception Handling",
      "Collections Framework",
      "Threads & Multithreading",
      "File Handling",
      "JDBC Connectivity",
      "Mini Projects"
    ]
  },
  {
    id: 4,
    title: "MERN Stack Development",
    image: "/assests/images/meanstack.webp",
    longDescription: "This course teaches end-to-end full-stack development using MongoDB, Express.js, React.js, and Node.js. Build scalable, modern web applications with complete front-end and back-end integration.",
    syllabus: [
      "HTML, CSS & JavaScript",
      "React.js Frontend Development",
      "Node.js & Express.js Backend",
      "MongoDB Database",
      "REST API Development",
      "Authentication & JWT",
      "State Management",
      "Full MERN Project"
    ]
  },
  {
    id: 5,
    title: ".NET",
    image: "/assests/images/tableau.webp",
    longDescription: ".NET development teaches building Windows, web, and enterprise applications using C# and ASP.NET. Learn MVC, Entity Framework, SQL database connectivity, and API development.",
    syllabus: [
      "C# Basics & OOP",
      ".NET Framework & CLR",
      "ASP.NET MVC Architecture",
      "Entity Framework",
      "LINQ Queries",
      "SQL Server Integration",
      "Web API Development",
      "Final .NET Project"
    ]
  },
  {
    id: 6,
    title: "Python",
    image: "/assests/images/python2.webp",
    longDescription: "Python is a simple and powerful programming language widely used in automation, web development, data science, and AI. This beginner-friendly course covers syntax, functions, file handling, modules, and real-world tasks.",
    syllabus: [
      "Python Syntax & Variables",
      "Functions & Loops",
      "Modules & Packages",
      "Error Handling",
      "File Handling",
      "Data Structures",
      "OOP Concepts",
      "Mini Projects"
    ]
  },
  {
    id: 7,
    title: "Ethical Hacking",
    image: "/assests/images/hacking.webp",
    longDescription: "Ethical Hacking teaches penetration testing, system security, network vulnerabilities, and cyber attack prevention. Learn tools like Metasploit, Nmap, Burp Suite, and Kali Linux.",
    syllabus: [
      "Networking Fundamentals",
      "Linux Basics",
      "Footprinting & Scanning",
      "Vulnerability Analysis",
      "System Hacking",
      "Wi-Fi Hacking",
      "Web App Attacks",
      "Cyber Security Projects"
    ]
  },
  {
    id: 8,
    title: "Fullstack Developer",
    image: "/assests/images/full-stack.webp",
    longDescription: "A fullstack developer works on both frontend and backend technologies including HTML, CSS, JS, React, Node.js, SQL/NoSQL databases, API development, and deployment.",
    syllabus: [
      "Frontend Basics",
      "React.js Development",
      "Backend with Node.js",
      "MySQL & MongoDB",
      "API Development",
      "Authentication & JWT",
      "Hosting & Deployment",
      "Fullstack Projects"
    ]
  },
  {
    id: 9,
    title: "C Sharp",
    image: "/assests/images/csharp.webp",
    longDescription: "C# is a powerful object-oriented programming language used for Windows apps, game development, and enterprise software. Learn everything from basics to advanced concepts.",
    syllabus: [
      "C# Syntax",
      "OOP Concepts",
      "Exception Handling",
      "Collections & Generics",
      "Delegates & Events",
      "LINQ",
      "Windows App Dev",
      "Mini Project"
    ]
  },
  {
    id: 10,
    title: "C Programming",
    image: "/assests/images/cp.webp",
    longDescription: "C programming is the foundation of system programming and embedded systems. Learn variables, loops, functions, pointers, memory management, and structures.",
    syllabus: [
      "C Basics",
      "Control Structures",
      "Functions",
      "Pointers",
      "Arrays & Strings",
      "Structures & Unions",
      "File Handling",
      "Mini Projects"
    ]
  },
  {
    id: 11,
    title: "Android Development",
    image: "/assests/images/cg1.webp",
    longDescription: "This course covers Android app development using Java/Kotlin. Learn UI design, activities, intents, API integration, Firebase, and deployment.",
    syllabus: [
      "Android Studio Setup",
      "XML UI Design",
      "Activities & Intents",
      "RecyclerView & Navigation",
      "API & JSON Parsing",
      "Firebase Integration",
      "Push Notifications",
      "Final App Project"
    ]
  },
  {
    id: 12,
    title: "Java Fullstack Development",
    image: "/assests/images/cg2.webp",
    longDescription: "Learn complete fullstack development using Java, Spring Boot, React/Angular, and MySQL. Covers backend, frontend, APIs, and deployment.",
    syllabus: [
      "Core Java",
      "JDBC & Hibernate",
      "Spring Boot Development",
      "REST API Creation",
      "React/Angular Basics",
      "MySQL Database",
      "Microservices Basics",
      "Fullstack Project"
    ]
  },
  {
    id: 13,
    title: "PHP",
    image: "/assests/images/download2.webp",
    longDescription: "Learn PHP for backend development including syntax, forms, sessions, authentication, MySQL integration, and MVC patterns.",
    syllabus: [
      "PHP Syntax",
      "Forms & Sessions",
      "PHP & MySQL",
      "Authentication System",
      "OOP in PHP",
      "Laravel Basics",
      "REST API",
      "PHP Project"
    ]
  },
  {
    id: 14,
    title: "Selenium Testing",
    image: "/assests/images/download3.webp",
    longDescription: "This course covers automation testing using Selenium WebDriver with Java. Learn frameworks like TestNG, Page Object Model, and automation scripts.",
    syllabus: [
      "Automation Testing Basics",
      "Java for Testers",
      "Selenium WebDriver",
      "Locators & WebElements",
      "TestNG Framework",
      "Page Object Model",
      "Automation Project",
      "CI/CD Basics"
    ]
  },
  {
    id: 15,
    title: "AWS",
    image: "/assests/images/download4.webp",
    longDescription: "AWS Cloud Computing course covers EC2, S3, IAM, VPC, Load Balancers, Auto Scaling, Lambda, and DevOps basics. Ideal for cloud roles.",
    syllabus: [
      "Cloud Basics",
      "EC2 & Load Balancers",
      "S3 Buckets",
      "IAM Security",
      "VPC Networking",
      "AWS Lambda",
      "RDS & DynamoDB",
      "Deployment Project"
    ]
  },
  {
    id: 16,
    title: "MYSQL",
    image: "/assests/images/download5.webp",
    longDescription: "Learn MySQL from basics to advanced database operations. Covers DDL, DML, Joins, Indexing, Stored Procedures, and Optimization.",
    syllabus: [
      "Database Basics",
      "SQL Commands",
      "Joins & Subqueries",
      "Functions",
      "Views & Indexes",
      "Stored Procedures",
      "Triggers",
      "DB Project"
    ]
  },
  {
    id: 17,
    title: "Basic MS Office",
    image: "/assests/images/ms1.webp",
    longDescription: "This course covers MS Word, Excel, PowerPoint, and basic computer usage. Perfect for beginners and office job seekers.",
    syllabus: [
      "Word Basics",
      "Excel Basics",
      "PowerPoint Slides",
      "Typing & File Handling",
      "Email Writing",
      "Formatting Tools",
      "Shortcuts & Tips",
      "Mini Tasks"
    ]
  },
  {
    id: 18,
    title: "Advanced Excel",
    image: "/assests/images/ms2.webp",
    longDescription: "Advanced Excel teaches formulas, pivot tables, dashboards, charts, data analysis, VBA basics, and automation techniques.",
    syllabus: [
      "Advanced Formulas",
      "Conditional Formatting",
      "Pivot Tables",
      "Excel Charts",
      "Power Query Basics",
      "Data Cleaning",
      "Macros & VBA",
      "Dashboard Project"
    ]
  },
  {
    id: 19,
    title: "Tally ERP9 with GST",
    image: "/assests/images/ms3.webp",
    longDescription: "This course covers accounting fundamentals, Tally ERP9 usage, GST configuration, reports, and business accounting workflows.",
    syllabus: [
      "Accounting Basics",
      "Tally Navigation",
      "Voucher Entry",
      "GST Setup",
      "Inventory Management",
      "Bank Reconciliation",
      "Payroll",
      "Reports & Statements"
    ]
  },
  {
    id: 20,
    title: "SAP FICO",
    image: "/assests/images/ms4.webp",
    longDescription: "SAP FICO is a high-demand course covering financial accounting and controlling modules used in enterprise ERP systems.",
    syllabus: [
      "SAP Introduction",
      "General Ledger",
      "Accounts Payable",
      "Accounts Receivable",
      "Asset Accounting",
      "Cost Center Accounting",
      "Internal Orders",
      "SAP Project"
    ]
  },
  // ************************************
  //      CAD COURSES – MECHANICAL
  // ************************************
  {
    id: 21,
    title: "AutoCAD Mechanical",
    image: "/assests/img/c1.webp",
    longDescription: "AutoCAD Mechanical is a specialized version of AutoCAD designed exclusively for mechanical engineering design. It is used for creating precise 2D drawings, diagrams, and mechanical parts drafting.",
    syllabus: [
      "2D Sketching Tools",
      "Dimensioning & Annotations",
      "Layers & Blocks",
      "Assembly Drawings",
      "Sheet Drafting",
      "Sectional Views",
      "Isometric Drawings",
      "Project Work"
    ]
  },
  {
    id: 22,
    title: "SolidWorks",
    image: "/assests/img/c2.webp",
    longDescription: "SolidWorks is a 3D CAD software used for parametric modeling, mechanical design, and simulation. Learn part design, assemblies, drawings, and motion simulation.",
    syllabus: [
      "Sketch Tools",
      "Part Modeling",
      "Assemblies",
      "Drawing Sheets",
      "Surface Modeling",
      "Sheet Metal",
      "Simulation Basics",
      "Final Project"
    ]
  },
  {
    id: 23,
    title: "CATIA",
    image: "/assests/img/c3.webp",
    longDescription: "CATIA is widely used in aerospace and automotive industries for advanced product design and surface modeling.",
    syllabus: [
      "Part Design",
      "Wireframe Modeling",
      "Surface Modeling",
      "Assembly Design",
      "Drafting Techniques",
      "Kinematics Basics",
      "Rendering Tools",
      "Project"
    ]
  },
  {
    id: 24,
    title: "NX CAD",
    image: "/assests/img/c4.webp",
    longDescription: "NX CAD is an advanced CAD/CAM/CAE tool used for 3D modeling and engineering product development.",
    syllabus: [
      "Sketching Tools",
      "Part Modeling",
      "Surface Modeling",
      "Assembly",
      "Sheet Metal Design",
      "Drafting",
      "CAM Basics",
      "Industry Project"
    ]
  },
  {
    id: 25,
    title: "Ansys",
    image: "/assests/img/c5.webp",
    longDescription: "ANSYS is used for engineering simulation and structural analysis. Learn FEA concepts, meshing, stress analysis, and thermal analysis.",
    syllabus: [
      "FEA Basics",
      "Material Assignment",
      "Meshing Techniques",
      "Structural Analysis",
      "Thermal Simulation",
      "Boundary Conditions",
      "Solver Setup",
      "Project"
    ]
  },
  {
    id: 26,
    title: "Creo",
    image: "/assests/img/c6.webp",
    longDescription: "Creo is a parametric 3D CAD tool used for product design, sheet metal, surface modeling, and manufacturing.",
    syllabus: [
      "Sketching",
      "Part Modeling",
      "Assembly",
      "Surface Modeling",
      "Sheet Metal",
      "Drafting & Views",
      "Rendering Tools",
      "Mini Project"
    ]
  },
  {
    id: 27,
    title: "Fusion 360",
    image: "/assests/img/c7.webp",
    longDescription: "Fusion 360 is a cloud-based CAD/CAM/CAE solution used for parametric design, simulation, and manufacturing.",
    syllabus: [
      "Interface & Tools",
      "Sketching",
      "3D Modeling",
      "Joints & Assemblies",
      "Simulation Tools",
      "CAM Basics",
      "Rendering",
      "Final Project"
    ]
  },
  {
    id: 28,
    title: "GD&T",
    image: "/assests/img/c8.webp",
    longDescription: "GD&T is a symbolic language used to define and communicate engineering tolerances clearly and precisely.",
    syllabus: [
      "GD&T Basics",
      "Symbols & Meanings",
      "Datums & Features",
      "Form Tolerances",
      "Profile Tolerances",
      "Orientation Tolerances",
      "Location Tolerances",
      "Industry Examples"
    ]
  },
  // ************************************
  //           CAD – CIVIL
  // ************************************
  {
    id: 29,
    title: "AutoCAD Civil 3D",
    image: "/assests/img/d1.webp",
    longDescription: "AutoCAD Civil 3D is used by civil engineers for infrastructure design and documentation, including roads, land development, and survey data.",
    syllabus: [
      "Civil 3D Interface",
      "Surfaces Creation",
      "Alignments",
      "Profiles & Corridors",
      "Grading Tools",
      "Pipe Networks",
      "Quantity Takeoff",
      "Project"
    ]
  },
  {
    id: 30,
    title: "STAAD Pro",
    image: "/assests/img/d2.webp",
    longDescription: "STAAD Pro is widely used for structural analysis and design of buildings, bridges, towers, and industrial structures.",
    syllabus: [
      "Structural Analysis Basics",
      "Modeling Tools",
      "Load Types & Combinations",
      "Steel Structure Design",
      "Concrete Structure Design",
      "Seismic Analysis",
      "Output Interpretation",
      "Real-Time Project"
    ]
  },
  {
    id: 31,
    title: "ETABS",
    image: "/assests/img/d3.webp",
    longDescription: "ETABS is a powerful building analysis and design software widely used in high-rise structure design.",
    syllabus: [
      "Model Creation",
      "Load Application",
      "Analysis Techniques",
      "Shear Wall Design",
      "Slab & Beam Design",
      "Dynamic Analysis",
      "Earthquake Load Design",
      "Final Project"
    ]
  },
  {
    id: 32,
    title: "Civil 3D (General)",
    image: "/assests/img/d5.webp",
    longDescription: "Civil 3D software helps civil engineers design better infrastructure such as roads, drainage, grading, and land development.",
    syllabus: [
      "Survey Tools",
      "Surface Modeling",
      "Alignments & Profiles",
      "Corridor Modeling",
      "Earthwork Calculations",
      "Pipe Networks",
      "Plan Production",
      "Hands-on Practice"
    ]
  },
  {
    id: 33,
    title: "Revit Structure",
    image: "/assests/img/d4.webp",
    longDescription: "Revit Structure helps engineers design accurate structural models including beams, columns, slabs, and reinforcement.",
    syllabus: [
      "BIM Basics",
      "Structural Elements",
      "Reinforcement Tools",
      "Analytical Models",
      "Schedules & Sheets",
      "3D Views",
      "RCC Modeling",
      "Final Project"
    ]
  },
  // ************************************
  //         CAD – ARCHITECTURE
  // ************************************
  {
    id: 34,
    title: "Revit Architecture",
    image: "/assests/img/e6.webp",
    longDescription: "Revit Architecture is used by architects for 3D building modeling, visualizations, and documentation using BIM workflow.",
    syllabus: [
      "BIM Workflow",
      "Walls, Doors & Windows",
      "Floors & Roofs",
      "Stairs & Railings",
      "Interior Modeling",
      "Rendering",
      "Sheets & Documentation",
      "Project Work"
    ]
  },
  {
    id: 35,
    title: "3ds Max",
    image: "/assests/img/e2.webp",
    longDescription: "3ds Max is an industry standard for architectural visualization and 3D animation, ideal for interior/exterior rendering.",
    syllabus: [
      "3D Modeling Tools",
      "Lighting Techniques",
      "Materials & Shaders",
      "Camera Setup",
      "Interior & Exterior Modeling",
      "Rendering Workflow",
      "V-Ray Integration",
      "Visualization Project"
    ]
  },
  {
    id: 36,
    title: "V-Ray",
    image: "/assests/img/e1.webp",
    longDescription: "V-Ray is a high-quality rendering engine used with 3D software for photorealistic architectural visuals.",
    syllabus: [
      "V-Ray Basics",
      "Lighting Setups",
      "Material Creation",
      "HDRI Usage",
      "Render Settings",
      "Interior Rendering",
      "Exterior Rendering",
      "Portfolio Project"
    ]
  },
  {
    id: 37,
    title: "Lumion",
    image: "/assests/img/e3.webp",
    longDescription: "Lumion is a powerful real-time visualization tool used for creating realistic architecture renders and walkthroughs.",
    syllabus: [
      "Lumion Interface",
      "Scene Setup",
      "Material Editing",
      "Lighting Techniques",
      "Animation Walkthroughs",
      "Rendering Settings",
      "Effects & Filters",
      "Architectural Project"
    ]
  },
  {
    id: 38,
    title: "Google SketchUp",
    image: "/assests/img/e4.webp",
    longDescription: "SketchUp is a user-friendly 3D modeling software ideal for architectural concept design and interior space planning.",
    syllabus: [
      "Sketch Tools",
      "3D Modeling Basics",
      "Components & Groups",
      "Material Application",
      "Layout Tools",
      "Rendering Plugins",
      "Interior Design Modeling",
      "Mini Project"
    ]
  },
  {
    id: 39,
    title: "AutoCAD Architecture",
    image: "/assests/img/e5.webp",
    longDescription: "AutoCAD Architecture is used for creating detailed architectural drawings including plans, sections, and elevations.",
    syllabus: [
      "Architectural Tools",
      "Wall & Door Systems",
      "3D Modeling",
      "Sections & Elevations",
      "Annotation Tools",
      "Sheet Creation",
      "BIM Basics",
      "Project Assignment"
    ]
  },
  {
    id: 40,
    title: "Photoshop for Architecture",
    image: "/assests/img/e7.webp",
    longDescription: "Photoshop is used for enhancing architectural images, editing renders, creating presentations, and visualization artwork.",
    syllabus: [
      "Photoshop Basics",
      "Layers & Masks",
      "Color Correction",
      "Photo Retouching",
      "Render Editing",
      "Architectural Compositing",
      "Poster & Layout Design",
      "Final Portfolio"
    ]
  },
  // ************************************
  //      CAD COURSES – MECHANICAL
  // ************************************
  {
    id: 21,
    title: "AutoCAD Mechanical",
    image: "/assests/img/c1.webp",
    longDescription: "AutoCAD Mechanical is a specialized version designed for mechanical design and manufacturing. It includes tools for creating detailed 2D engineering drawings, annotations, layers, blocks, and drafting automation. This course is ideal for mechanical engineers, designers, and CAD drafters.",
    syllabus: [
      "Introduction to Mechanical AutoCAD",
      "2D Sketching & Drafting Tools",
      "Layers, Blocks & Attributes",
      "Dimensioning & Annotation",
      "Section Views & Isometric Views",
      "Mechanical Symbols & BOM",
      "Assembly Drafting",
      "Mechanical Project Work"
    ]
  },
  {
    id: 22,
    title: "SolidWorks",
    image: "/assests/img/c2.webp",
    longDescription: "SolidWorks is an industry-leading 3D CAD tool used for parametric modeling, mechanical product design, simulation, motion study, and assembly creation. Widely used in manufacturing and product engineering.",
    syllabus: [
      "SolidWorks Interface & Sketch Tools",
      "Part Modeling – Extrude, Revolve",
      "Assembly Creation",
      "Surface Modeling",
      "Sheet Metal Design",
      "Weldments & Frames",
      "Motion Study & Simulation",
      "Final Mechanical Project"
    ]
  },
  {
    id: 23,
    title: "CATIA",
    image: "/assests/img/c3.webp",
    longDescription: "CATIA is an advanced CAD software used in aerospace, automotive, and industrial engineering. It supports complex product design, surface modeling, and assembly management.",
    syllabus: [
      "CATIA Interface",
      "Sketcher Module",
      "Part Design",
      "Assembly Design",
      "Wireframe Modeling",
      "Surface Modeling",
      "Drafting & Views",
      "Industry Standard Project"
    ]
  },
  {
    id: 24,
    title: "NX CAD",
    image: "/assests/img/c4.webp",
    longDescription: "NX CAD (Siemens) is a high-end CAD/CAM/CAE tool used for automotive and manufacturing industries. It helps in complex 3D modeling, assemblies, drafting, and product development.",
    syllabus: [
      "Introduction to NX CAD",
      "Sketch Environment",
      "Part & Feature Modeling",
      "Advanced Surfacing",
      "Assembly Design Tools",
      "Sheet Metal Design",
      "Drafting & Detailing",
      "Design Project"
    ]
  },
  {
    id: 25,
    title: "Ansys",
    image: "/assests/img/c5.webp",
    longDescription: "ANSYS is a leading engineering simulation tool used for finite element analysis, thermal analysis, stress testing, vibration analysis, and structural analysis. It is widely used in mechanical and civil industries.",
    syllabus: [
      "Basics of FEA",
      "Static Structural Analysis",
      "Thermal Analysis",
      "Meshing Techniques",
      "Material Properties",
      "Boundary Conditions",
      "Modal Analysis",
      "Simulation Project"
    ]
  },
  {
    id: 26,
    title: "Creo",
    image: "/assests/img/c6.webp",
    longDescription: "Creo (Pro/E) is a professional CAD tool used for mechanical product design. Learn 3D modeling, surface design, sheet metal, assemblies, and rendering.",
    syllabus: [
      "Creo Interface",
      "Feature-Based Modeling",
      "Surface Modeling",
      "Assembly Design",
      "Sheet Metal Module",
      "2D Drafting",
      "Rendering Tools",
      "Mechanical Design Project"
    ]
  },
  {
    id: 27,
    title: "Fusion 360",
    image: "/assests/img/c7.webp",
    longDescription: "Fusion 360 is a cloud-based CAD/CAM/CAE platform from Autodesk. Used for product design, simulation, manufacturing, CNC machining, and rendering.",
    syllabus: [
      "Fusion Interface",
      "Sketching Tools",
      "3D Modeling – Form, Solid",
      "Assemblies & Joints",
      "Simulation & Stress Testing",
      "CAM & Manufacturing Tools",
      "Rendering & Animation",
      "Fusion Design Project"
    ]
  },
  {
    id: 28,
    title: "GD&T",
    image: "/assests/img/c8.webp",
    longDescription: "Geometric Dimensioning & Tolerancing is a symbolic language used to define size, form, orientation, and location tolerances in engineering drawings. It ensures better communication and accuracy.",
    syllabus: [
      "GD&T Introduction",
      "Datums & Features",
      "Form Tolerances",
      "Profile Tolerances",
      "Orientation Tolerances",
      "Location Tolerances",
      "Runout & Composite Tolerancing",
      "Industry-Level GD&T Case Studies"
    ]
  },
  // ************************************
  //             CAD – CIVIL
  // ************************************
  {
    id: 29,
    title: "AutoCAD Civil 3D",
    image: "/assests/img/d1.webp",
    longDescription: "AutoCAD Civil 3D is widely used for infrastructure design, land development, highway engineering, survey drafting, and drainage systems. It helps civil engineers create accurate civil models.",
    syllabus: [
      "Civil 3D Interface",
      "Survey Data & Points",
      "Surface Modeling",
      "Alignments & Profiles",
      "Corridor Modeling",
      "Pipe Networks",
      "Grading & Earthwork",
      "Complete Civil Project"
    ]
  },
  {
    id: 30,
    title: "STAAD Pro",
    image: "/assests/img/d2.webp",
    longDescription: "STAAD Pro is a structural analysis and design tool used worldwide for designing buildings, towers, bridges, and concrete or steel structures.",
    syllabus: [
      "STAAD Interface",
      "Modeling Tools",
      "Load Definitions",
      "Steel Structure Design",
      "Concrete Structure Design",
      "Seismic + Wind Load Analysis",
      "Result Interpretation",
      "Structural Project"
    ]
  },
  {
    id: 31,
    title: "ETABS",
    image: "/assests/img/d3.webp",
    longDescription: "ETABS is primarily used for high-rise and complex building design. It supports advanced structural analysis, earthquake-resistant design, and load calculations.",
    syllabus: [
      "ETABS Basics",
      "Grid & Story Setup",
      "Load Assignments",
      "Analysis Tools",
      "Shear Wall Design",
      "Slab & Beam Design",
      "Dynamic Analysis",
      "Building Design Project"
    ]
  },
  {
    id: 32,
    title: "Civil 3D (General)",
    image: "/assests/img/d5.webp",
    longDescription: "Civil 3D is used for civil infrastructure design such as highways, grading, pipes, and terrain modeling. Ideal for land surveyors and civil engineers.",
    syllabus: [
      "Survey Tools & Surfaces",
      "Alignments & Profiles",
      "Corridors & Cross Sections",
      "Earthworks & Quantity Takeoff",
      "Pipe Network Design",
      "Grading Tools",
      "Sheet Production",
      "Civil Drafting Project"
    ]
  },
  {
    id: 33,
    title: "Revit Structure",
    image: "/assests/img/d4.webp",
    longDescription: "Revit Structure helps engineers design RCC and steel structures using BIM. This includes modeling beams, columns, slabs, reinforcement, and schedules.",
    syllabus: [
      "BIM Concepts",
      "Structural Grids",
      "Beams, Columns & Slabs",
      "Reinforcement Tools",
      "Footings & Foundation",
      "Analytical Model",
      "Sheets & Documentation",
      "Revit Structure Project"
    ]
  },
  // ************************************
  //        CAD – ARCHITECTURE
  // ************************************
  {
    id: 34,
    title: "Revit Architecture",
    image: "/assests/img/e6.webp",
    longDescription: "Revit Architecture is used for 3D building modeling, floor plans, elevations, interiors, and BIM-based architectural workflows. Essential for architects and interior designers.",
    syllabus: [
      "BIM Workflow",
      "Walls, Doors & Windows",
      "Floors & Roofs",
      "Stairs & Railings",
      "Room Tags & Schedules",
      "Interior Modeling",
      "Rendering & Walkthrough",
      "Architecture Project"
    ]
  },
  {
    id: 35,
    title: "3ds Max",
    image: "/assests/img/e2.webp",
    longDescription: "3ds Max is popular for architectural visualization, 3D modeling, animation, and realistic rendering. Used by architects and 3D designers.",
    syllabus: [
      "Modeling Tools",
      "Materials & Maps",
      "Lighting Techniques",
      "Cameras & Walkthrough",
      "Exterior Modeling",
      "Interior Modeling",
      "Rendering Techniques",
      "Visualization Project"
    ]
  },
  {
    id: 36,
    title: "V-Ray",
    image: "/assests/img/e1.webp",
    longDescription: "V-Ray is a rendering engine used to create photorealistic architectural visuals with advanced lighting, materials, and HDRI setups.",
    syllabus: [
      "V-Ray Setup",
      "Lighting Tools",
      "Material Creation",
      "HDRI Environment",
      "Interior Rendering",
      "Exterior Rendering",
      "Render Optimization",
      "Architectural Render Project"
    ]
  },
  {
    id: 37,
    title: "Lumion",
    image: "/assests/img/e3.webp",
    longDescription: "Lumion is a real-time rendering tool that helps architects and interior designers create stunning visualizations, animations, and walk-through videos.",
    syllabus: [
      "Lumion Essentials",
      "Material Editing",
      "Landscape & Environment",
      "Lighting Techniques",
      "Photo Mode Rendering",
      "Animation & Walkthroughs",
      "Effects & Filters",
      "Final Visualization Project"
    ]
  },
  {
    id: 38,
    title: "Google SketchUp",
    image: "/assests/img/e4.webp",
    longDescription: "SketchUp is widely used for quick 3D modeling, conceptual design, interior layouts, and architectural modeling.",
    syllabus: [
      "Sketch Tools",
      "3D Modeling Basics",
      "Groups & Components",
      "Material Painting",
      "Styles & Layout",
      "Rendering Plugins",
      "Interior Design Modeling",
      "SketchUp Project"
    ]
  },
  {
    id: 39,
    title: "AutoCAD Architecture",
    image: "/assests/img/e5.webp",
    longDescription: "AutoCAD Architecture is used to create detailed architectural plans, elevations, and section drawings with dedicated building tools.",
    syllabus: [
      "Architecture Toolset",
      "Wall, Door & Window Systems",
      "3D Building Modeling",
      "Sections & Elevations",
      "Annotation Tools",
      "Plotting & Documentation",
      "Sheet Creation",
      "Architecture Drafting Project"
    ]
  },
  {
    id: 40,
    title: "Photoshop for Architecture",
    image: "/assests/img/e7.webp",
    longDescription: "Photoshop is used by architects to enhance renders, create presentations, edit images, and produce stunning architectural visualizations.",
    syllabus: [
      "Photoshop Basics",
      "Layers & Masks",
      "Color Balancing",
      "Render Editing",
      "Shadow & Light Adjustments",
      "Architectural Compositing",
      "Poster Creation",
      "Portfolio Project"
    ]
  }
];
const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    const selected = allCourses.find((c) => c.id === Number(id));
    setCourse(selected);
  }, [id]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    course: ""
  });
  useEffect(() => {
    if (course) {
      setFormData((prev) => ({ ...prev, course: course.title }));
    }
  }, [course]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      alert("Form Submitted Successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", course: course.title });
    } catch (error) {
      alert("Something went wrong!");
    }
  };
  if (!course)
    return /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", padding: "50px" }, children: "Loading..." });
  return /* @__PURE__ */ jsxs("div", { className: "course-page", children: [
    /* @__PURE__ */ jsx("div", { className: "course-banner", children: /* @__PURE__ */ jsx("h1", { children: course.title }) }),
    /* @__PURE__ */ jsxs("div", { className: "course-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "course-left", children: [
        /* @__PURE__ */ jsx("img", { src: course.image, alt: course.title, className: "course-img" }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "About ",
          course.title
        ] }),
        /* @__PURE__ */ jsx("p", { className: "course-description", children: course.longDescription }),
        /* @__PURE__ */ jsx("h2", { children: "Syllabus" }),
        /* @__PURE__ */ jsx("ul", { className: "syllabus-list", children: course.syllabus.map((item, index) => /* @__PURE__ */ jsx("li", { children: item }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "course-right", children: [
        /* @__PURE__ */ jsx("h3", { children: "Enroll Now" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "course-form", children: [
          /* @__PURE__ */ jsx("input", { type: "text", name: "name", value: formData.name, placeholder: "Name", onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("input", { type: "email", name: "email", value: formData.email, placeholder: "Email", onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", name: "phone", value: formData.phone, placeholder: "Phone", onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("textarea", { name: "message", value: formData.message, placeholder: "Message", onChange: handleChange }),
          /* @__PURE__ */ jsx("button", { type: "submit", children: "Submit" })
        ] })
      ] })
    ] })
  ] });
};
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");
      const isUserLoggedIn = sessionStorage.getItem("isLoggedIn");
      console.log("App.js - Initial check:", {
        isAdminLoggedIn,
        isUserLoggedIn
      });
      if (isAdminLoggedIn === "true") {
        setIsAdmin(true);
        setIsLoggedIn(true);
        console.log("App.js - Admin logged in detected on mount");
      } else if (isUserLoggedIn === "true") {
        setIsLoggedIn(true);
        setIsAdmin(false);
        console.log("App.js - Regular user logged in detected on mount");
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
        console.log("App.js - No user logged in on mount");
      }
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    const interval = setInterval(() => {
      const currentAdmin = sessionStorage.getItem("isAdminLoggedIn") === "true";
      const currentLogin = sessionStorage.getItem("isLoggedIn") === "true";
      if (currentAdmin !== isAdmin || currentLogin !== isLoggedIn) {
        console.log("App.js - SessionStorage changed detected:", {
          wasAdmin: isAdmin,
          nowAdmin: currentAdmin,
          wasLoggedIn: isLoggedIn,
          nowLoggedIn: currentLogin
        });
        setIsAdmin(currentAdmin);
        setIsLoggedIn(currentLogin);
      }
    }, 2e3);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      clearInterval(interval);
    };
  }, [isAdmin, isLoggedIn]);
  const handleLogin = (adminStatus) => {
    console.log("App.js - handleLogin called with adminStatus:", adminStatus);
    if (adminStatus) {
      sessionStorage.setItem("isAdminLoggedIn", "true");
      sessionStorage.setItem("isLoggedIn", "true");
      console.log("App.js - Admin login successful, sessionStorage updated");
    } else {
      sessionStorage.setItem("isAdminLoggedIn", "false");
      sessionStorage.setItem("isLoggedIn", "true");
      console.log("App.js - Regular user login successful");
    }
    setIsAdmin(adminStatus);
    setIsLoggedIn(true);
    console.log("App.js - State updated to:", {
      isAdmin: adminStatus,
      isLoggedIn: true
    });
    setTimeout(() => {
      window.dispatchEvent(new Event("loginStatusChanged"));
      console.log("App.js - Dispatched loginStatusChanged event");
    }, 100);
  };
  const handleLogout = () => {
    console.log("App.js - Logout called");
    setIsAdmin(false);
    setIsLoggedIn(false);
    sessionStorage.setItem("isAdminLoggedIn", "false");
    sessionStorage.setItem("isLoggedIn", "false");
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("loginStatusChanged"));
    }, 100);
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Header, { isLoggedIn, onLogout: handleLogout }),
    /* @__PURE__ */ jsx(
      Navbar,
      {
        isAdmin,
        isLoggedIn,
        onLogout: handleLogout
      }
    ),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/Testimonial", element: /* @__PURE__ */ jsx(Testimonial, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/TestimonialDetails", element: /* @__PURE__ */ jsx(TestimonialsDetails, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/Whyus", element: /* @__PURE__ */ jsx(WhyUs, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/onlineprogram", element: /* @__PURE__ */ jsx(Onlineprogram, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/gallery", element: /* @__PURE__ */ jsx(Blogs, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/internship", element: /* @__PURE__ */ jsx(Internship, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/project", element: /* @__PURE__ */ jsx(Project, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/placement", element: /* @__PURE__ */ jsx(Placement, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contactus", element: /* @__PURE__ */ jsx(Contactus, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/certificate", element: /* @__PURE__ */ jsx(CertificateGenerator, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/allprogram", element: /* @__PURE__ */ jsx(AllPrograms, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/story", element: /* @__PURE__ */ jsx(Successtory, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/tutorials", element: /* @__PURE__ */ jsx(Tutorials, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/courses", element: /* @__PURE__ */ jsx(Courses, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cad/:id", element: /* @__PURE__ */ jsx(LinkDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cadcourse", element: /* @__PURE__ */ jsx(CadCourse, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/CadCourse2", element: /* @__PURE__ */ jsx(CadCourse2, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/courses/:id", element: /* @__PURE__ */ jsx(CourseDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(Login, { onLogin: handleLogin }) }),
      /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(Register, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blogs/how-fresher-get-placed", element: /* @__PURE__ */ jsx(BlogFresher, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blogs/top-5-it-skills-2025", element: /* @__PURE__ */ jsx(BlogITSkills, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blogs/career-guidance", element: /* @__PURE__ */ jsx(BlogCareer, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blogs/python-libraries-2025", element: /* @__PURE__ */ jsx(BlogPython, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blogs/ai-tools-2025", element: /* @__PURE__ */ jsx(BlogAITools, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blogs/mern-vs-mean-2025", element: /* @__PURE__ */ jsx(BlogMernMean, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/course/:id", element: /* @__PURE__ */ jsx(CourseDetailsPage, {}) }),
      /* @__PURE__ */ jsxs(Route, { path: "/adminpage", element: /* @__PURE__ */ jsx(AdminPage, {}), children: [
        /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx("div", { children: "Welcome to Admin Dashboard" }) }),
        /* @__PURE__ */ jsx(Route, { path: "CourseManagement", element: /* @__PURE__ */ jsx(CourseManagement, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "CourseTypeManagement",
            element: /* @__PURE__ */ jsx(CourseTypeManagement, {})
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "SubjectManagement", element: /* @__PURE__ */ jsx(SubjectManagement, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "StudentCertificatePage",
            element: /* @__PURE__ */ jsx(StudentCertificatePage, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "FeeInvoiceGeneration",
            element: /* @__PURE__ */ jsx(FeeInvoiceGeneration, {})
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "RegistrationForm", element: /* @__PURE__ */ jsx(RegistrationForm, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "StudentDetail", element: /* @__PURE__ */ jsx(StudentDetail, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(WhatsAppPopup, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function render(url, manifest) {
  const html = renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
  return { html };
}
export {
  render
};
