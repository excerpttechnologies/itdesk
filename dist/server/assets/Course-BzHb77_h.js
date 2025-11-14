import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
const CourseManagement = () => {
  const [formData, setFormData] = useState({
    CourseID: "",
    CourseName: "",
    CourseTypeID: [],
    duration: { value: 0, unit: "Months" },
    payment: { single: 0, installment: 0 }
  });
  const [allCourseTypes, setAllCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
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
  const filteredCourses = courses.filter(
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
export {
  CourseManagement as default
};
