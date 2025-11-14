import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const CourseDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    course: ""
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const passedCourse = location.state?.course;
    console.log("Received course data:", passedCourse);
    if (passedCourse) {
      setCourse(passedCourse);
    } else {
      navigate("/programs");
      return;
    }
  }, [location.state, navigate]);
  useEffect(() => {
    if (course) {
      console.log("Course syllabus:", course.syllabus);
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
  if (!isClient || !course) {
    return /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", padding: "50px" }, children: "Loading..." });
  }
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
        course.syllabus && Array.isArray(course.syllabus) && course.syllabus.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "syllabus-list", children: course.syllabus.map((item, index) => /* @__PURE__ */ jsx("li", { children: item }, index)) }) : /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "No syllabus available for this course." }),
          /* @__PURE__ */ jsxs("p", { style: { fontSize: "12px", color: "#666" }, children: [
            "Debug: syllabus is ",
            course.syllabus ? "present but not array" : "undefined"
          ] })
        ] })
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
export {
  CourseDetailsPage as default
};
