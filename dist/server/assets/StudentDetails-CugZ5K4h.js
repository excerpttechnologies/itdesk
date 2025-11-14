import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
export {
  StudentDetail as default
};
