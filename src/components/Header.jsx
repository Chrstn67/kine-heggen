import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./Header.css";

const navLinks = [
  { to: "/kine-heggen/", label: "Accueil" },
  { to: "/kine-heggen/equipe", label: "L'équipe" },
  { to: "/kine-heggen/specialites", label: "Nos soins" },
  { to: "/kine-heggen/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="header__inner container">
        <Link
          to="/kine-heggen/"
          className="header__logo"
          aria-label="Accueil - Cabinet Chez JJ"
        >
          <span className="header__logo-icon" aria-hidden="true">
            KH
          </span>
          <span className="header__logo-text">{cabinet.nom}</span>
        </Link>

        <nav
          className="header__nav"
          role="navigation"
          aria-label="Navigation principale"
        >
          <ul
            className={`header__nav-list ${menuOpen ? "header__nav-list--open" : ""}`}
          >
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <NavLink
                  to={link.to}
                  end={link.to === "/kine-heggen/"}
                  className={({ isActive }) =>
                    `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {/* Afficher tous les numéros dans le menu mobile */}
            <li className="header__nav-item header__nav-item--cta-mobile">
              <div className="header__mobile-phones">
                {cabinet.telephone.map((number, index) => (
                  <a
                    key={index}
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="header__mobile-phone-link"
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

        {/* Desktop : afficher uniquement le fixe */}
        <a
          href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
          className="header__cta header__cta--desktop"
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
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
