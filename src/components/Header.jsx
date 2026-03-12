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
    // ✅ <header> a déjà le rôle ARIA "banner" implicitement — role="banner" supprimé
    <header className="header">
      <div className="header__inner container">
        {/*
          ✅ Logo : <Link> avec aria-label complet incluant le nom du cabinet.
             <span> avec aria-hidden sur l'abréviation décorative "KH".
             <strong> sur le nom du cabinet = signal d'importance sémantique.
        */}
        <Link
          to="/kine-heggen/"
          className="header__logo"
          aria-label={`Accueil — ${cabinet.nom}`}
        >
          <span className="header__logo-icon" aria-hidden="true">
            KH
          </span>
          <strong className="header__logo-text">{cabinet.nom}</strong>
        </Link>

        {/*
          ✅ <nav> a déjà le rôle ARIA "navigation" implicitement — role="navigation" supprimé.
             aria-label reste INDISPENSABLE pour distinguer cette nav des autres
             (footer nav, breadcrumb…) dans les outils d'accessibilité.
        */}
        <nav className="header__nav" aria-label="Navigation principale">
          {/*
            ✅ id="mobile-menu" AJOUTÉ sur <ul> :
               aria-controls="mobile-menu" sur le bouton burger y fait référence —
               c'était un bug : la référence était cassée, ce qui nuit à l'accessibilité
               et génère des erreurs dans les audits Lighthouse/axe.
          */}
          <ul
            id="mobile-menu"
            className={`header__nav-list ${menuOpen ? "header__nav-list--open" : ""}`}
            // ✅ aria-hidden masque la liste aux AT quand le menu mobile est fermé
            aria-hidden={!menuOpen ? "true" : undefined}
          >
            {navLinks.map((link) => (
              // ✅ Pas de changement ici — <li> + <NavLink> est correct
              <li key={link.to} className="header__nav-item">
                <NavLink
                  to={link.to}
                  end={link.to === "/kine-heggen/"}
                  className={({ isActive }) =>
                    `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                  }
                  // ✅ aria-current="page" géré automatiquement par NavLink via la classe active,
                  //    mais on peut l'ajouter explicitement pour les crawlers :
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* ── Numéros de téléphone dans le menu mobile ── */}
            <li className="header__nav-item header__nav-item--cta-mobile">
              <div className="header__mobile-phones">
                {cabinet.telephone.map((number, index) => (
                  /*
                    ✅ aria-label explicite sur chaque lien téléphone :
                       les AT et Google lisent "Appeler le 03 89 …"
                       plutôt qu'un numéro brut sans contexte.
                  */
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

        {/*
          ✅ CTA desktop : aria-label ajouté.
             Sans lui, le lien n'a pour texte accessible que le numéro brut —
             Google et les AT ne comprennent pas l'intention (appeler).
             Avec aria-label, le lien est décrit comme une action.
        */}
        <a
          href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
          className="header__cta header__cta--desktop"
          aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
        >
          <Phone size={16} aria-hidden="true" />
          <span>{cabinet.telephone[0]}</span>
        </a>

        {/*
          ✅ Bouton burger : déjà bien implémenté.
             - aria-expanded ✓
             - aria-controls="mobile-menu" ✓ (référence maintenant valide grâce au id ajouté sur <ul>)
             - aria-label dynamique ✓
        */}
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
