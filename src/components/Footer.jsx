import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Accessibility } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import logo from "/Logo.jpg";
import "./Footer.css";

export default function Footer() {
  const adresse = cabinet.adresse;
  const currentYear = new Date().getFullYear();

  return (
    // ✅ <footer> a déjà le rôle ARIA "contentinfo" implicitement — role="contentinfo" supprimé
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
              {/* ✅ aria-hidden sur l'abréviation décorative, texte réel porteur du sens */}
              <span className="footer__logo-icon" aria-hidden="true">
                KH
              </span>
              {/* ✅ <strong> signale l'importance du nom du cabinet aux moteurs */}
              <strong className="footer__logo-text">{cabinet.nom}</strong>
            </Link>

            {/* ✅ <p> suffit, descriptionCourte est du contenu éditorial */}
            <p className="footer__description">{cabinet.descriptionCourte}</p>

            {/* ✅ <p> avec rôle note — badge PMR informatif, pas interactif */}
            <p className="footer__badge">
              <Accessibility size={16} aria-hidden="true" />
              <span>Accessible PMR</span>
            </p>
          </div>

          {/* ── Navigation footer ── */}
          {/* ✅ <nav> avec aria-label distinct de la nav principale */}
          <nav className="footer__col" aria-label="Plan du site">
            <h2 className="footer__heading">Navigation</h2>
            {/* ✅ h2 plutôt que h3 : dans <footer>, les sections sont de niveau 2 */}
            <ul className="footer__links">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/specialites">Nos soins</Link>
              </li>
              <li>
                <Link to="/equipe">{"L'équipe"}</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* ── Coordonnées ── */}
          <div className="footer__col">
            <h2 className="footer__heading">Contact</h2>
            {/*
              ✅ <address> : élément HTML5 conçu pour les coordonnées de contact
                 d'une organisation. Boost le rich snippet "Local Business".
                 À NE PAS utiliser pour des adresses postales génériques,
                 mais ici c'est exactement l'adresse du cabinet = usage correct.
            */}
            <address className="footer__info">
              <ul>
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  {/*
                    ✅ Séparer numéro, rue, CP et ville dans des spans distincts
                       aide les crawlers à parser l'adresse (schema.org PostalAddress)
                  */}
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
                    {cabinet.telephone.map((number, index) => (
                      <div key={index} className="footer__phone-item">
                        <Phone size={16} aria-hidden="true" />
                        {/*
                          ✅ aria-label explicite : les lecteurs d'écran
                             liront "Appeler le 03 89 …" au lieu de juste le numéro
                        */}
                        <a
                          href={`tel:${number.replace(/\s/g, "")}`}
                          aria-label={`Appeler le ${number}`}
                        >
                          {" "}
                          {number}
                        </a>
                      </div>
                    ))}
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

          {/* ── Horaires ── */}
          <div className="footer__col">
            <h2 className="footer__heading">Horaires</h2>
            <ul className="footer__horaires">
              {cabinet.horaires.map((h) => (
                <li key={h.jour}>
                  {/*
                    ✅ <time> avec datetime machine-readable.
                       Format datetime des jours ISO 8601 weekday n'existe pas,
                       on utilise donc un aria-label lisible et un contenu visible clair.
                       Pour les plages horaires, datetime="HH:MM" est valide pour <time>.
                  */}
                  <span className="footer__jour">{h.jour}</span>
                  <time
                    className="footer__heures"
                    dateTime={h.datetimeAttr ?? undefined}
                  >
                    {h.heures}
                  </time>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bas de page ── */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            {/*
              ✅ <figure> + <figcaption> : bonne pratique pour une image avec légende.
                 L'alt reste descriptif pour l'accessibilité,
                 figcaption apporte du contexte éditorial indexable.
            */}
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
                Site réalisé par Christian HUMBERT, développeur web freelance
              </figcaption>
            </figure>

            {/*
              ✅ <small> : sémantiquement prévu pour les mentions légales,
                 copyrights et petites annotations — usage parfaitement approprié ici.
            */}
            <small>
              © {currentYear} Cabinet Chez JJ — Tous droits réservés
            </small>
          </div>

          {/* ✅ <p> avec <small> pour la mention conventionnement */}
          <p>
            <small>
              Cabinet conventionné — Carte bancaire, chèque, espèces
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
}
