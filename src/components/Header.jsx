import { useState } from "react";
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

/**
 * Retourne true si le cabinet est actuellement ouvert
 * selon cabinet.horaires (format { jour: "Lundi", heures: "8h00 - 19h00" | "Fermé" }).
 */
function isCabinetOpen() {
  const now = new Date();
  const dayIndex = now.getDay(); /* 0=dim, 1=lun … 6=sam */

  /* Map du jour JS vers la clé dans cabinet.horaires */
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const todayName = dayNames[dayIndex];

  const todaySchedule = cabinet.horaires?.find(
    (h) => h.jour.toLowerCase() === todayName.toLowerCase(),
  );

  if (!todaySchedule || todaySchedule.heures === "Fermé") return false;

  /* Tente de parser "8h00 - 19h00" */
  const match = todaySchedule.heures.match(
    /(\d+)h(\d+)?\s*[-–]\s*(\d+)h(\d+)?/,
  );
  if (!match) return false;

  const openH = parseInt(match[1], 10);
  const openM = parseInt(match[2] ?? "0", 10);
  const closeH = parseInt(match[3], 10);
  const closeM = parseInt(match[4] ?? "0", 10);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const open = isCabinetOpen();

  return (
    <header className="header">
      <div className="header__inner container">
        <Link
          to="/"
          className="header__logo"
          aria-label={`Accueil — ${cabinet.nom}`}
        >
          <span className="header__logo-icon" aria-hidden="true">
            KH
          </span>
          <strong className="header__logo-text">{cabinet.nom}</strong>
        </Link>

        {/* ── Badge statut ouvert/fermé ── */}
        <div
          className={`header__status-badge ${open ? "header__status-badge--open" : "header__status-badge--closed"}`}
          aria-label={open ? "Cabinet ouvert" : "Cabinet fermé"}
          aria-live="polite"
        >
          <span className="header__status-dot" aria-hidden="true" />
          <span className="header__status-label">
            {open ? "Ouvert" : "Fermé"}
          </span>
        </div>

        <nav className="header__nav" aria-label="Navigation principale">
          <ul
            id="mobile-menu"
            className={`header__nav-list ${menuOpen ? "header__nav-list--open" : ""}`}
            aria-hidden={!menuOpen ? "true" : undefined}
          >
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li className="header__nav-item header__nav-item--cta-mobile">
              <div className="header__mobile-phones">
                {cabinet.telephone.map((number, index) => (
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

        <a
          href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
          className="header__cta header__cta--desktop"
          aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
        >
          <Phone size={16} aria-hidden="true" />
          <span>{cabinet.telephone[0]}</span>
        </a>

        <button
          className="header__burger"
          onClick={() => setMenuOpen(!menuOpen)}
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
      </div>
    </header>
  );
}
