import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Accessibility } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./Footer.css";

export default function Footer() {
  const adresse = cabinet.adresse;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <Link to="/" className="footer__logo" aria-label="Accueil">
              <span className="footer__logo-icon" aria-hidden="true">
                KH
              </span>
              <span className="footer__logo-text">{cabinet.nom}</span>
            </Link>
            <p className="footer__description">{cabinet.descriptionCourte}</p>
            <div className="footer__badge">
              <Accessibility size={16} aria-hidden="true" />
              <span>Accessible PMR</span>
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Navigation</h3>
            <ul className="footer__links">
              <li>
                <Link to="/kine-heggen/">Accueil</Link>
              </li>
              <li>
                <Link to="/kine-heggen/specialites">Nos soins</Link>
              </li>
              <li>
                <Link to="/kine-heggen/equipe">{"L'équipe"}</Link>
              </li>
              <li>
                <Link to="/kine-heggen/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__info">
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>
                  {adresse.rue}, {adresse.codePostal} {adresse.ville}
                </span>
              </li>
              <li>
                <div className="footer__phones">
                  {cabinet.telephone.map((number, index) => (
                    <div key={index} className="footer__phone-item">
                      <Phone size={16} aria-hidden="true" />
                      <a href={`tel:${number.replace(/\s/g, "")}`}> {number}</a>
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${cabinet.email}`}>{cabinet.email}</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Horaires</h3>
            <ul className="footer__horaires">
              {cabinet.horaires.map((h) => (
                <li key={h.jour}>
                  <span className="footer__jour">{h.jour}</span>
                  <span className="footer__heures">{h.heures}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{"© 2026 Cabinet Chez JJ — Tous droits réservés"}</p>
          <p>{"Cabinet conventionné — Carte bancaire, chèque, espèces"}</p>
        </div>
      </div>
    </footer>
  );
}
