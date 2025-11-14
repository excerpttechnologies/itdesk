import { jsxs, jsx } from "react/jsx-runtime";
import "react";
/* empty css                    */
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
export {
  BlogCareer as default
};
