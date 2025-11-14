import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
const SubjectManagement = () => {
  const [courses, setCourses] = useState([]);
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
          /* @__PURE__ */ jsx("div", { style: { maxHeight: "150px", overflowY: "auto" }, children: courses.map((course) => /* @__PURE__ */ jsxs("div", { className: "form-check", children: [
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
export {
  SubjectManagement as default
};
