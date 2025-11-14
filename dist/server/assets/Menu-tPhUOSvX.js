import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const [info, setInfo] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);
  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      let response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(info)
      });
      if (response.ok) {
        setInfo({ name: "", email: "", phone: "", course: "", message: "" });
        setShowPopup(true);
        setStatus("Success");
        setTimeout(() => setShowPopup(false), 3e3);
      } else {
        console.error("Failed to submit form:", response.statusText);
        setStatus("Submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Submit");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "register", children: [
    /* @__PURE__ */ jsxs("div", { className: "dsu-form", children: [
      /* @__PURE__ */ jsxs("div", { className: "frmBg", children: [
        /* @__PURE__ */ jsx("small", { children: "Be a part of " }),
        /* @__PURE__ */ jsx("span", { children: "Excerpt Trainings " })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "contact_fild", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "formIDfid", children: [
        /* @__PURE__ */ jsx("div", { className: "contact-fild-box", children: /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "mydate", className: "input_item", value: "2023-07-28" }),
          /* @__PURE__ */ jsx("input", { name: "name", id: "name", className: "form-control validate[required]", placeholder: "Name", type: "text", required: true, value: info.name, onChange: handleChange })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "contact-fild-box", children: /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsx("input", { name: "email", id: "email", className: "form-control validate[required, custom[email]]", placeholder: "Email", type: "email", required: true, value: info.email, onChange: handleChange }) }) }),
        /* @__PURE__ */ jsx("div", { className: "contact-fild-box", children: /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsx("input", { name: "phone", id: "phone", maxLength: "12", placeholder: "Phone", className: "form-control validate[required, custom[phone]]", type: "tel", value: info.phone, onChange: handleChange }) }) }),
        /* @__PURE__ */ jsx("div", { className: "contact-fild-box", children: /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxs("select", { name: "course", id: "course", className: "form-control validate[required]", required: true, value: info.course, onChange: handleChange, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: " Select Courses" }),
          /* @__PURE__ */ jsx("option", { value: "Mean Stack Development", children: "Mean Stack Development" }),
          /* @__PURE__ */ jsx("option", { value: "Advance Java(J2EE)", children: "Advance Java(J2EE)" }),
          /* @__PURE__ */ jsx("option", { value: "Tally ERP", children: "Tally ERP" }),
          /* @__PURE__ */ jsx("option", { value: "Data Science With R Programming", children: "Data Science With R Programming" }),
          /* @__PURE__ */ jsx("option", { value: "PHP Course", children: "PHP Course" }),
          /* @__PURE__ */ jsx("option", { value: "Data Science with Python", children: "Data Science with Python" }),
          /* @__PURE__ */ jsx("option", { value: "Tableau", children: "Tableau" }),
          /* @__PURE__ */ jsx("option", { value: "Web Design", children: "Web Design" }),
          /* @__PURE__ */ jsx("option", { value: "Ethical Hacking", children: "Ethical Hacking" }),
          /* @__PURE__ */ jsx("option", { value: "Adv. Excel", children: "Adv. Excel" }),
          /* @__PURE__ */ jsx("option", { value: "Mobile Application Development (Android)", children: "Mobile Application Development (Android)" }),
          /* @__PURE__ */ jsx("option", { value: "ASP.NET MVC", children: "ASP.NET MVC" }),
          /* @__PURE__ */ jsx("option", { value: "Core Java", children: "Core Java" }),
          /* @__PURE__ */ jsx("option", { value: "CorelDRAW Graphics Design", children: "CorelDRAW Graphics Design" }),
          /* @__PURE__ */ jsx("option", { value: "Adobe Photoshop", children: "Adobe Photoshop" }),
          /* @__PURE__ */ jsx("option", { value: "Core Python Programming", children: "Core Python Programming" }),
          /* @__PURE__ */ jsx("option", { value: "C#", children: "C#" }),
          /* @__PURE__ */ jsx("option", { value: "C++", children: "C++" }),
          /* @__PURE__ */ jsx("option", { value: "C Programming", children: "C Programming" }),
          /* @__PURE__ */ jsx("option", { value: "Python Programming", children: "Python Programming" }),
          /* @__PURE__ */ jsx("option", { value: "Digital Marketing", children: "Digital Marketing" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "contact-fild-box", children: /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsx("textarea", { id: "message", name: "message", placeholder: "Query", className: "form-control ht validate[required]", rows: "2", required: true, value: info.message, onChange: handleChange }) }) }),
        /* @__PURE__ */ jsx("div", { className: "contact-fild-box text-center", children: /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsx("button", { type: "submit", id: "btnSubmit", className: "btn_submit", children: status }) }) })
      ] }) }) })
    ] }),
    showPopup && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: {
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
      }, children: [
        /* @__PURE__ */ jsx("h4", { children: "Thank You!" }),
        /* @__PURE__ */ jsx("p", { children: "Your query has been successfully submitted." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999
      } })
    ] })
  ] });
};
const Menu = ({ loggedIn, onLogout }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(5);
  const intervalRef = useRef(null);
  const slides = [
    {
      className: "banner-w3ls-1",
      title: "Empowering Dreams,",
      subtitle: "Illuminating Futures!!",
      description: "Expanding the possibilities in IT"
    },
    {
      className: "banner-w3ls-2",
      title: "Great Learnings,",
      subtitle: "Ahead!!",
      description: "Explore IT Courses Now"
    },
    {
      className: "banner-w3ls-3",
      title: "Unlock Your,",
      subtitle: "Key Potential!!",
      description: "With EXCERPT TRAININGS E-learning Platform"
    },
    {
      className: "banner-w3ls-4",
      title: "Learning Never,",
      subtitle: "Exhausts The Mind!!",
      description: "Learn IT Trending Courses"
    },
    {
      className: "banner-w3ls-4",
      title: "Learning Never,",
      subtitle: "Exhausts The Mind!!",
      description: "Learn IT Trending Courses"
    },
    {
      className: "banner-w3ls-5",
      title: "Expanding Possibilities,",
      subtitle: "Of Better Tomorrow!!",
      description: "Develop IT Skills"
    }
  ];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const adminData = sessionStorage.getItem("isAdminLoggedIn");
    if (adminData) {
      setIsAdmin(true);
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % slides.length;
      });
    }, 3e3);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);
  const changeSlideTo = (index) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % slides.length;
      });
    }, 3e3);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "banner-agile", children: [
    /* @__PURE__ */ jsx("ul", { className: "slider", children: slides.map((slide, index) => {
      let className = "";
      if (index === currentIndex) className = "active";
      else if (index === prevIndex) className = "prev";
      return /* @__PURE__ */ jsx("li", { className, children: /* @__PURE__ */ jsx("div", { className: slide.className, children: /* @__PURE__ */ jsx("div", { className: "banner-text-posi-w3ls", children: /* @__PURE__ */ jsxs("div", { className: "banner-text-whtree", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-capitalize text-white p-4", children: [
          slide.title,
          /* @__PURE__ */ jsx("b", { children: slide.subtitle })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "px-4 py-3 text-dark", children: slide.description }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/about",
            className: "button-agiles text-capitalize text-white mt-sm-5 mt-4",
            children: "read more"
          }
        )
      ] }) }) }) }, index);
    }) }),
    /* @__PURE__ */ jsx("ul", { className: "pager", children: slides.map((_, index) => /* @__PURE__ */ jsx(
      "li",
      {
        "data-index": index,
        className: index === currentIndex ? "active" : "",
        onClick: (e) => {
          e.preventDefault();
          changeSlideTo(index);
        },
        style: { cursor: "pointer" }
      },
      index
    )) }),
    /* @__PURE__ */ jsx(ContactForm, {})
  ] }) });
};
export {
  Menu as default
};
