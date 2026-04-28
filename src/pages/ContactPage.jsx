import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Accessibility,
  CreditCard,
  Home,
  Info,
  Instagram,
} from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import { kines } from "../data/kines.js";
import PageHeader from "../components/PageHeader.jsx";
import "./ContactPage.css";

export default function ContactPage() {
  const adresse = cabinet.adresse;

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
      titre: kine.titre,
      email: kine.email,
      instagram: kine.compteInstagram,
      telephone: phoneNumber,
    };
  });

  return (
    <>
      <PageHeader
        label="Contact"
        title="Contactez-nous"
        description="Prenez rendez-vous ou posez-nous vos questions. Nous sommes disponibles du lundi au vendredi."
      />

      <section className="contact-page" aria-label="Informations de contact">
        <div className="contact-page__inner container">
          {/* ── Bandeau horaires ── */}
          <div
            className="contact-page__hours-banner"
            aria-label="Horaires d'ouverture"
          >
            <div className="contact-page__hours-banner-left">
              <div className="contact-page__hours-icon" aria-hidden="true">
                <Clock size={18} />
              </div>
              <div className="contact-page__hours-text">
                <p className="contact-page__hours-title">
                  Horaires d'ouverture
                </p>
                <p className="contact-page__hours-note">
                  {cabinet.horaires[0].description}
                </p>
              </div>
            </div>
            <div
              className="contact-page__hours-days"
              aria-label="Jours d'ouverture"
            >
              {["Lun", "Mar", "Mer", "Jeu", "Ven"].map((d) => (
                <span key={d} className="contact-page__day-chip">
                  {d}
                </span>
              ))}
              <span className="contact-page__day-chip contact-page__day-chip--closed">
                Sam
              </span>
              <span className="contact-page__day-chip contact-page__day-chip--closed">
                Dim
              </span>
            </div>
          </div>

          {/* ── Grille 2×2 ── */}
          <div className="contact-page__row">
            {/* Colonne gauche : coordonnées + infos pratiques */}
            <div className="contact-page__col">
              <div className="contact-page__card">
                <h2 className="contact-page__card-heading">
                  <MapPin size={16} aria-hidden="true" />
                  <span>Coordonnées</span>
                </h2>
                <ul className="contact-page__info-list">
                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <MapPin size={18} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Adresse</strong>
                      <span>{adresse.rue}</span>
                      <span>
                        {adresse.codePostal} {adresse.ville}
                      </span>
                      {adresse.complement && (
                        <span className="contact-page__complement">
                          {adresse.complement}
                        </span>
                      )}
                    </div>
                  </li>
                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Phone size={18} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Téléphone</strong>
                      <a
                        href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
                        aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
                      >
                        {cabinet.telephone[0]}
                      </a>
                    </div>
                  </li>
                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Mail size={18} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Email</strong>
                      <a href={`mailto:${cabinet.email}`}>{cabinet.email}</a>
                    </div>
                  </li>
                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Home size={18} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Soins</strong>
                      <span>{adresse.soins}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="contact-page__card">
                <h3 className="contact-page__card-heading">
                  <Accessibility size={16} aria-hidden="true" />
                  <span>Informations pratiques</span>
                </h3>
                <ul
                  className="contact-page__extras"
                  aria-label="Informations pratiques"
                >
                  <li className="contact-page__extra-item">
                    <Accessibility size={18} aria-hidden="true" />
                    <span>Accessible PMR</span>
                  </li>
                  <li className="contact-page__extra-item">
                    <CreditCard size={18} aria-hidden="true" />
                    <span>Cabinet conventionné</span>
                  </li>
                  {cabinet.moyensPaiement && (
                    <li className="contact-page__extra-item contact-page__extra-item--full">
                      <CreditCard size={18} aria-hidden="true" />
                      <span>
                        Paiement : {cabinet.moyensPaiement.join(" · ")}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Colonne droite : kinés empilés */}
            <div className="contact-page__col">
              {kinesContacts.map((kine) => {
                const initials = `${kine.prenom[0]}${kine.nom[0]}`;
                return (
                  <div
                    key={kine.id}
                    className="contact-page__card contact-page__card--kine"
                  >
                    <h2 className="contact-page__card-heading">
                      <span
                        className="contact-page__kine-avatar"
                        aria-hidden="true"
                      >
                        {initials}
                      </span>
                      <span>
                        {kine.prenom} {kine.nom}
                      </span>
                    </h2>
                    {kine.titre && (
                      <p className="contact-page__kine-titre">{kine.titre}</p>
                    )}
                    <div className="contact-page__kine-contacts">
                      <a
                        href={`mailto:${kine.email}`}
                        className="contact-page__kine-link"
                        aria-label={`Email de ${kine.prenom} : ${kine.email}`}
                      >
                        <Mail size={14} aria-hidden="true" />
                        <span>{kine.email}</span>
                      </a>
                      {kine.telephone && (
                        <a
                          href={`tel:${kine.telephone.replace(/\s/g, "")}`}
                          className="contact-page__kine-link"
                          aria-label={`Téléphone de ${kine.prenom} : ${kine.telephone}`}
                        >
                          <Phone size={14} aria-hidden="true" />
                          <span>{kine.telephone}</span>
                        </a>
                      )}
                      {kine.instagram && (
                        <a
                          href={`https://instagram.com/${kine.instagram.replace("@", "")}`}
                          className="contact-page__kine-link contact-page__kine-link--instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Instagram de ${kine.prenom} : ${kine.instagram}`}
                        >
                          <Instagram size={14} aria-hidden="true" />
                          <span>{kine.instagram}</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Bon à savoir — bandeau pleine largeur ── */}
          <div className="contact-page__card contact-page__card--alt contact-page__card--banner">
            <h3 className="contact-page__card-heading">
              <Info size={16} aria-hidden="true" />
              <span>Bon à savoir</span>
            </h3>
            <ul className="contact-page__notes contact-page__notes--inline">
              <li>
                <strong>Nouveaux patients :</strong> nous accueillons de
                nouveaux patients.
              </li>
              <li>
                <strong>Ordonnance :</strong> pensez à apporter votre
                prescription médicale.
              </li>
              <li>
                <strong>Carte Vitale :</strong> nécessaire pour la prise en
                charge.
              </li>
              <li>
                <strong>Tenue :</strong> privilégiez une tenue confortable.
              </li>
              <li>
                <strong>Annulation :</strong> prévenir au moins 48 heures à
                l'avance.
              </li>
              <li>
                <strong>Urgences médicales :</strong> composez le{" "}
                <a href="tel:15">15</a> (SAMU) ou <a href="tel:18">18</a>{" "}
                (Pompiers)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
