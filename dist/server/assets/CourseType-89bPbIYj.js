import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
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
export {
  CourseTypeManagement as default
};
