import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import emailjs from "@emailjs/browser";
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from "../config/emailjsConfig";
import modalFrame from "../assets/ui/modal/3.png"; // PNG bordo steampunk
import { useLanguage } from "./LanguageContext";

// =================== STILI PIXEL PERFECT DESKTOP ===================
// (stessi tuoi, solo leggermente ordinati per chiarezza, ma puoi cambiare valori a piacere)

const modalBg = { /* ... */   // (come i tuoi: vedi sotto)
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(24,16,8,0.80)",
  zIndex: 20000,
  display: "flex", alignItems: "center", justifyContent: "center"
};
const modalContainer = { /* ... */
  position: "relative", width: 436, height: 410, background: "#eedfbe",
  boxShadow: "0 0 24px #3b2711", borderRadius: "8px", fontFamily: "'VT323', monospace",
  outline: "none", overflow: "visible"
};
const borderPngStyle = {
  position: "absolute", top: -54, left: -37, width: 510, height: 516,
  pointerEvents: "none", userSelect: "none", zIndex: 4
};
const contentWrapper = {
  position: "absolute", top: 25, left: 24, width: 386, height: 365, zIndex: 5,
  padding: 0, display: "flex", flexDirection: "column"
};
const closeBtn = {
  position: "absolute", top: -45, right: -99, width: 36, height: 32,
  background: "#e2b94b", color: "#473011", fontFamily: "'VT323', monospace", fontSize: 21,
  border: "3px solid #9b7a3c", borderRadius: "7px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
  lineHeight: "normal", transition: "background .17s", zIndex: 10
};
const modalTitle = {
  position: "absolute", top: 5, left: 140, fontSize: 25, width: 350, height: 30,
  color: "#523a17", letterSpacing: 2.4, textShadow: "2px 2px #fffde9", margin: 0,
  padding: 0, zIndex: 6
};
const formContainer = {
  position: "absolute", top: 64, left: 4, width: 372, height: 280,
  display: "flex", flexDirection: "column", zIndex: 6
};
const rowStyle = (top) => ({
  position: "absolute", top, left: 0, width: 372, height: 44,
  display: "flex", flexDirection: "row", alignItems: "center"
});
const labelStyle = (left = 0, width = 104) => ({
  position: "absolute", left, top: 10, width, height: 22,
  color: "#8c6b39", fontSize: 18, letterSpacing: 2, textAlign: "right",
  marginRight: 0, textShadow: "1px 1px 0 #fffde2"
});
const inputStyle = (left = 112, width = 224) => ({
  position: "absolute", left, top: 6, width, height: 29, fontFamily: "'VT323', monospace",
  fontSize: 18, border: "2.2px solid #9b7a3c", borderRadius: "4px", padding: "4px 9px",
  background: "#fff8ec", color: "#3b2711", outline: "none",
  boxShadow: "2px 2px #f8e7bc, -2px -2px #e9d9b0", letterSpacing: 1.4,
  transition: "border 0.18s"
});
const messageGroupStyle = {
  position: "absolute", top: 100, left: 0, width: 372, height: 118
};
const messageLabelStyle = {
  position: "absolute", top: 2, left: 0, width: 104, height: 20,
  color: "#8c6b39", fontSize: 17, letterSpacing: 2, textAlign: "left",
  textShadow: "1px 1px 0 #fffde2"
};
const textareaStyle = {
  position: "absolute", top: 28, left: 0, width: 352, height: 85, minWidth: 100,
  minHeight: 85, fontFamily: "'VT323', monospace", fontSize: 18, border: "2.2px solid #9b7a3c",
  borderRadius: "4px", padding: "5px 12px", background: "#fff8ec", color: "#3b2711",
  outline: "none", boxShadow: "2px 2px #f8e7bc, -2px -2px #e9d9b0", letterSpacing: 1.5,
  resize: "vertical", transition: "border 0.18s"
};
const submitBtn = {
  position: "absolute", top: 230, left: 290, width: 90, height: 39,
  fontFamily: "'VT323', monospace", fontSize: 22, background: "#b68937",
  color: "#fff", border: "3px solid #634113", borderRadius: "8px",
  padding: "8px 0px", cursor: "pointer", letterSpacing: 3,
  boxShadow: "2px 2px #fae2b6, -2px -2px #957440", transition: "background 0.16s, box-shadow 0.16s",
  zIndex: 9
};
const successMsg = {
  position: "absolute", top: 271, left: 0, width: 372, color: "#247e2b",
  background: "#fffde9", border: "2px solid #68b161", borderRadius: "6px",
  padding: "7px 13px", textAlign: "center", fontSize: 17, boxShadow: "0 1px 5px #99dbb6"
};
const errorMsg = {
  position: "absolute", top: 271, left: 0, width: 372, color: "#bd2e25",
  background: "#fff6f2", border: "2px solid #e68b83", borderRadius: "6px",
  padding: "7px 13px", textAlign: "center", fontSize: 17, boxShadow: "0 1px 5px #eeb0b0"
};

// =================== COMPONENTE ===================
const DirectMessageModal = ({ open, onClose }) => {
  const { t } = useLanguage();
  // Prendi label & testo localizzati
  const labels = t("direct") || {};
  // Fallback se mancano le traduzioni
  const modalTitleLabel = labels.modal_title || "Hit me up!";
  const nameLabel = labels.name_label || "Your Name";
  const emailLabel = labels.email_label || "Your Email";
  const messageLabel = labels.message_label || "Message";
  const sendBtn = labels.send_btn || "Send";
  const waitBtn = labels.wait_btn || "Wait...";
  const successText = labels.success_msg || "Message sent! Thank you 🚀";
  const errorText = labels.error_msg || "Sending failed! Try again or contact directly.";
  const fillFieldsText = labels.fill_all_fields || "Please fill in all fields.";
  const modalFrameAlt = labels.modal_frame_alt || "Modal Frame";
  const closeModalAria = labels.close_modal_aria || "Close modal";

  // Stato del form e feedback
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Blocca scroll background quando modale è aperto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; }
  }, [open]);

  if (!open) return null;

  // Gestione cambio input
  const handleChange = e => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
    setError("");
  };

  // Gestione submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);
    if (!form.from_name.trim() || !form.from_email.trim() || !form.message.trim()) {
      setError(fillFieldsText);
      setSending(false);
      return;
    }
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        form,
        { publicKey: PUBLIC_KEY }
      );
      setSent(true);
      setForm({ from_name: "", from_email: "", message: "" });
    } catch (err) {
      setError(errorText);
    } finally {
      setSending(false);
    }
  };

  // =========== RENDER PIXEL PERFECT ==============
  return ReactDOM.createPortal(
    <div style={modalBg} onClick={onClose}>
      <div style={modalContainer} onClick={e => e.stopPropagation()}>
        {/* Bordo PNG sopra tutto */}
        <img src={modalFrame} alt={modalFrameAlt} style={borderPngStyle} draggable={false} />

        {/* Layer centrale assoluto */}
        <div style={contentWrapper}>
          {/* X CHIUDI */}
          <button onClick={onClose} style={closeBtn} aria-label={closeModalAria}>&times;</button>
          {/* Titolo */}
          <div style={modalTitle}>{modalTitleLabel}</div>
          {/* FORM */}
          <form autoComplete="off" onSubmit={handleSubmit} style={formContainer}>
            {/* RIGA NOME */}
            <div style={rowStyle(0)}>
              <label style={labelStyle(-22, 104)} htmlFor="from_name">{nameLabel}</label>
              <input
                style={inputStyle(112, 224)}
                type="text"
                name="from_name"
                id="from_name"
                autoComplete="off"
                value={form.from_name}
                onChange={handleChange}
                disabled={sending}
                maxLength={48}
                required
              />
            </div>
            {/* RIGA EMAIL */}
            <div style={rowStyle(48)}>
              <label style={labelStyle(-13, 104)} htmlFor="from_email">{emailLabel}</label>
              <input
                style={inputStyle(112, 224)}
                type="email"
                name="from_email"
                id="from_email"
                autoComplete="off"
                value={form.from_email}
                onChange={handleChange}
                disabled={sending}
                maxLength={48}
                required
              />
            </div>
            {/* MESSAGGIO */}
            <div style={messageGroupStyle}>
              <label style={messageLabelStyle} htmlFor="message">{messageLabel}</label>
              <textarea
                style={textareaStyle}
                name="message"
                id="message"
                autoComplete="off"
                value={form.message}
                onChange={handleChange}
                disabled={sending}
                maxLength={800}
                required
              />
            </div>
            {/* BUTTON */}
            <button type="submit" style={submitBtn} disabled={sending}>
              {sending ? waitBtn : sendBtn}
            </button>
            {/* FEEDBACK */}
            {sent && <div style={successMsg}>{successText}</div>}
            {error && <div style={errorMsg}>{error}</div>}
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default DirectMessageModal;
