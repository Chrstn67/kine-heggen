// PageHeader.jsx
import { useState, useEffect, useRef } from "react";
import "./PageHeader.css";

export default function PageHeader({ label, title, description, teaser }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  const texts = Array.isArray(description)
    ? description
    : description
      ? [description]
      : [];
  const isLong = texts.length > 1 || texts.join("").length > 300;
  const preview =
    teaser ??
    "Découvrez notre approche, notre parcours et ce qui nous anime au quotidien.";

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
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

  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [open]);

  return (
    <header className="page-header">
      <div className="page-header__inner container">
        {label && <p className="page-header__label">{label}</p>}
        <h1 className="page-header__title">{title}</h1>

        {texts.length > 0 && (
          <div className="page-header__desc">
            <p className="page-header__desc-preview">{preview}</p>
            {isLong && (
              <button
                ref={triggerRef}
                className="page-header__trigger"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="page-header-drawer"
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
            aria-hidden="true"
          />
          <aside
            id="page-header-drawer"
            ref={drawerRef}
            className={`page-header__drawer ${open ? "is-open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-label"
            aria-hidden={!open}
            tabIndex="-1"
          >
            <div className="page-header__drawer-inner">
              <div className="page-header__drawer-header">
                {label && (
                  <p id="drawer-label" className="page-header__drawer-label">
                    {label}
                  </p>
                )}
                <button
                  className="page-header__drawer-close"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  aria-label="Fermer la description complète"
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </button>
              </div>
              <div className="page-header__drawer-body">
                {texts.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
              <button
                className="page-header__drawer-bottom-close"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Fermer la description complète"
              >
                Fermer
              </button>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
