import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Accessibility,
  Instagram,
} from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import { kines } from "../data/kines.js";
import logo from "/Logo.jpg";
import "./Footer.css";

export default function Footer() {
  const adresse = cabinet.adresse;
  const currentYear = new Date().getFullYear();

  const kinesContacts = kines.map((kine) => {
    let phoneNumber = null;
    if (kine.prenom === "Johan") {
      phoneNumber = cabinet.telephone[1].replace("Johan : ", "");
    } else if (kine.prenom === "Justine") {
      phoneNumber = cabinet.telephone[2].replace("Justine : ", "");
    }

    return {
      id: kine.id,
      prenom: kine.prenom,
      nom: kine.nom,
      email: kine.email,
      instagram: kine.compteInstagram,
      telephone: phoneNumber,
    };
  });

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          {/* ── Colonne marque ── */}
          <div className="footer__col footer__col--brand">
            <Link
              to="/"
              className="footer__logo"
              aria-label={`Retour à l'accueil — ${cabinet.nom}`}
            >
              <span className="footer__logo-icon" aria-hidden="true">
                <img
                  src="./images/j2kine-logo.jpeg"
                  alt="Logo J2Kiné"
                  loading="lazy"
                />
              </span>
              <strong className="footer__logo-text">{cabinet.nom}</strong>
            </Link>
            <p className="footer__description">{cabinet.descriptionCourte}</p>
            <p className="footer__badge">
              <Accessibility size={16} aria-hidden="true" />
              <span>Accessible PMR</span>
            </p>
          </div>

          {/* ── Navigation footer ── */}
          <nav className="footer__col" aria-label="Plan du site">
            <h2 className="footer__heading">Navigation</h2>
            <ul className="footer__links">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/equipe">L'équipe</Link>
              </li>
              <li>
                <Link to="/specialites">Nos soins</Link>
              </li>
              <li>
                <Link to="/tarifs-generaux">Tarifs généraux</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* ── Coordonnées cabinet ── */}
          <div className="footer__col">
            <h2 className="footer__heading">Contact</h2>
            <address className="footer__info">
              <ul>
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span className="footer__address">
                    <span className="footer__address-street">
                      {adresse.rue}
                    </span>
                    {", "}
                    <span className="footer__address-postal">
                      {adresse.codePostal}
                    </span>{" "}
                    <span className="footer__address-city">
                      {adresse.ville}
                    </span>
                  </span>
                </li>

                <li>
                  <div className="footer__phones">
                    <div className="footer__phone-item">
                      <Phone size={16} aria-hidden="true" />
                      <a
                        href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
                        aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
                      >
                        {cabinet.telephone[0]}
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a
                    href={`mailto:${cabinet.email}`}
                    aria-label={`Envoyer un e-mail à ${cabinet.email}`}
                  >
                    {cabinet.email}
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* ── Coordonnées des kinés (groupées par kiné) ── */}
          <div className="footer__col">
            <h2 className="footer__heading">Kinésithérapeutes</h2>
            <ul className="footer__kines-contacts">
              {kinesContacts.map((kine) => (
                <li key={kine.id} className="footer__kine-contact">
                  <span className="footer__kine-name">
                    {kine.prenom} {kine.nom}
                  </span>
                  <div className="footer__kine-links">
                    <a
                      href={`mailto:${kine.email}`}
                      className="footer__kine-link"
                      aria-label={`Email de ${kine.prenom} : ${kine.email}`}
                    >
                      <Mail size={14} aria-hidden="true" />
                      <span>{kine.email}</span>
                    </a>
                    {kine.telephone && (
                      <a
                        href={`tel:${kine.telephone.replace(/\s/g, "")}`}
                        className="footer__kine-link"
                        aria-label={`Téléphone de ${kine.prenom} : ${kine.telephone}`}
                      >
                        <Phone size={14} aria-hidden="true" />
                        <span>{kine.telephone}</span>
                      </a>
                    )}
                    {kine.instagram && (
                      <a
                        href={`https://instagram.com/${kine.instagram.replace("@", "")}`}
                        className="footer__kine-link footer__kine-link--instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Instagram de ${kine.prenom} : ${kine.instagram}`}
                      >
                        <Instagram size={14} aria-hidden="true" />
                        <span>{kine.instagram}</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bas de page ── */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <figure className="footer__dev-credit">
              <img
                src={logo}
                alt="Logo de Christian HUMBERT, développeur web"
                className="footer__logo-img"
                width="40"
                height="40"
                loading="lazy"
              />
              <figcaption className="sr-only">
                Site réalisé par Christian HUMBERT, développeur web
              </figcaption>
            </figure>
            <small>
              © {currentYear} J2Kiné - Cabinet de kinésithérapie HEGGEN-HOFFMANN
              — Tous droits réservés
            </small>
          </div>

          <div className="footer__bottom-right">
            <p>
              <small>
                Cabinet conventionné — Carte bancaire, chèque, espèces
              </small>
            </p>
            <Link
              to="/mentions-legales"
              className="footer__legal-link"
              aria-label="Consulter les mentions légales"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
