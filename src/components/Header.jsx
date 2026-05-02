import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./Header.css";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/equipe", label: "L'équipe" },
  { to: "/specialites", label: "Nos soins" },
  { to: "/tarifs-generaux", label: "Tarifs généraux" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le menu si on redimensionne vers desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 791px)");
    const handler = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Bloque le scroll body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header__inner container">
        {/* ── Ligne 1 : logo + badge + tel ── */}
        <div className="header__top">
          <Link
            to="/"
            className="header__logo"
            aria-label={`Accueil — ${cabinet.nom}`}
          >
            <span className="header__logo-icon" aria-hidden="true">
              <img src="/j2kine-logo.jpeg" alt="Logo J2Kiné" loading="lazy" />
            </span>
            <span className="header__logo-text">{cabinet.nom}</span>
          </Link>

          <div className="header__top-right">
            {cabinet.conventionne && (
              <div
                className="header__status-badge header__status-badge--conventionne"
                aria-label="Cabinet conventionné"
              >
                <span className="header__status-dot" aria-hidden="true" />
                <span className="header__status-label">Conventionné</span>
              </div>
            )}

            {cabinet.telephone?.[0] && (
              <a
                href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
                className="header__cta"
                aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
              >
                <Phone size={15} aria-hidden="true" />
                <span>{cabinet.telephone[0]}</span>
              </a>
            )}
          </div>
        </div>

        {/* ── Ligne 2 : nav ── */}
        <nav className="header__nav" aria-label="Navigation principale">
          <ul
            id="mobile-menu"
            className={`header__nav-list${menuOpen ? " header__nav-list--open" : ""}`}
            aria-hidden={menuOpen ? undefined : "true"}
          >
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `header__nav-link${isActive ? " header__nav-link--active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* CTA mobile : tous les numéros */}
            <li className="header__nav-item header__nav-item--cta-mobile">
              <div className="header__mobile-phones">
                {cabinet.telephone?.map((number, index) => (
                  <a
                    key={index}
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="header__mobile-phone-link"
                    aria-label={`Appeler le ${number}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Phone size={16} aria-hidden="true" />
                    <span>{number}</span>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* ── Burger FAB mobile ── */}
      <button
        className="header__burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {menuOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </button>
    </header>
  );
}
