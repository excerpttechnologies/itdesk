import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
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
export {
  WhatsAppPopup as default
};
