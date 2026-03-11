// PageHeader.jsx
import { useState, useEffect, useRef } from "react";
import "./PageHeader.css";

export default function PageHeader({ label, title, description }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  const texts = Array.isArray(description)
    ? description
    : description
      ? [description]
      : [];
  const isLong = texts.length > 1 || texts.join("").length > 300;
  const preview = texts[0] ?? "";

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="page-header">
      <div className="page-header__inner container">
        {label && <span className="page-header__label">{label}</span>}
        <h1 className="page-header__title">{title}</h1>

        {texts.length > 0 && (
          <div className="page-header__desc">
            <p className="page-header__desc-preview">{preview}</p>
            {isLong && (
              <button
                className="page-header__trigger"
                onClick={() => setOpen(true)}
              >
                En savoir plus
              </button>
            )}
          </div>
        )}
      </div>

      {isLong && (
        <>
          <div
            className={`page-header__overlay ${open ? "is-visible" : ""}`}
            onClick={() => setOpen(false)}
          />
          <aside
            ref={drawerRef}
            className={`page-header__drawer ${open ? "is-open" : ""}`}
            aria-label="Description complète"
          >
            <div className="page-header__drawer-inner">
              <div className="page-header__drawer-header">
                {label && (
                  <span className="page-header__drawer-label">{label}</span>
                )}
                <button
                  className="page-header__drawer-close"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                >
                  <span />
                  <span />
                </button>
              </div>
              <div className="page-header__drawer-body">
                {texts.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
              <button
                className="page-header__drawer-bottom-close"
                onClick={() => setOpen(false)}
              >
                Fermer
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
