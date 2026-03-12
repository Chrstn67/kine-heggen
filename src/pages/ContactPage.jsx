import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Accessibility,
  CreditCard,
} from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import PageHeader from "../components/PageHeader.jsx";
import "./ContactPage.css";

export default function ContactPage() {
  const adresse = cabinet.adresse;

  return (
    <>
      <PageHeader
        label="Contact"
        title="Contactez-nous"
        description="Prenez rendez-vous ou posez-nous vos questions. Nous vous répondrons dans les meilleurs délais."
      />

      {/*
        ✅ aria-labelledby sur h2 sr-only plutôt qu'aria-label inline.
           Le h1 de PageHeader labellise la page, ce h2 labellise
           précisément cette section de contenu.
      */}
      <section
        className="contact-page"
        aria-labelledby="contact-section-heading"
      >
        <h2 id="contact-section-heading" className="sr-only">
          Informations de contact et horaires
        </h2>
        <div className="contact-page__inner container">
          <div className="contact-page__grid">
            {/* ── Colonne gauche : coordonnées ── */}
            <div className="contact-page__info">
              <div className="contact-page__info-card">
                {/*
                  ✅ h2 visible pour "Nos coordonnées" :
                     c'est un titre de bloc informatif réel — h2 correct
                     (le h2 sr-only labellise la section, celui-ci labellise la card)
                     → on le passe en h3 pour respecter la hiérarchie.
                */}
                <h3 className="contact-page__info-title">Nos coordonnées</h3>

                {/*
                  ✅ <address> pour les coordonnées du cabinet :
                     élément HTML5 conçu pour les coordonnées d'une organisation.
                     font-style: normal appliqué en CSS.
                */}
                <address className="contact-page__info-list">
                  <div className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong>Adresse</strong>
                      <span>{adresse.rue}</span>
                      <span>
                        {adresse.codePostal} {adresse.ville}
                      </span>
                      <span className="contact-page__complement">
                        {adresse.complement}
                      </span>
                    </div>
                  </div>

                  <div className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Phone size={20} />
                    </div>
                    <div className="contact-page__phones">
                      <strong>Téléphone</strong>
                      {cabinet.telephone.map((number, index) => (
                        /*
                          ✅ aria-label explicite sur chaque lien téléphone
                        */
                        <a
                          key={index}
                          href={`tel:${number.replace(/\s/g, "")}`}
                          className="contact-page__phone-link"
                          aria-label={`Appeler le ${number}`}
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong>Email</strong>
                      {/*
                        ✅ aria-label sur le lien mailto
                      */}
                      <a
                        href={`mailto:${cabinet.email}`}
                        aria-label={`Envoyer un e-mail à ${cabinet.email}`}
                      >
                        {cabinet.email}
                      </a>
                    </div>
                  </div>
                </address>
              </div>

              {/*
                ✅ <ul>/<li> pour les badges PMR / conventionné :
                   ce sont des éléments d'une liste d'informations pratiques.
                   <p> serait aussi acceptable mais <ul> est plus approprié
                   pour des items visuellement identiques et parallèles.
              */}
              <ul className="contact-page__extras">
                <li className="contact-page__extra-item">
                  <Accessibility size={18} aria-hidden="true" />
                  <span>Accessible PMR</span>
                </li>
                <li className="contact-page__extra-item">
                  <CreditCard size={18} aria-hidden="true" />
                  <span>Cabinet conventionné</span>
                </li>
              </ul>
            </div>

            {/* ── Colonne droite : horaires + infos complémentaires ── */}
            <div className="contact-page__horaires-section">
              <div className="contact-page__horaires-card">
                {/*
                  ✅ h3 pour le titre de la card horaires —
                     sous le h3 "Nos coordonnées" on reste cohérent.
                */}
                <h3 className="contact-page__card-heading">
                  <Clock size={18} aria-hidden="true" />
                  <span>Horaires d'ouverture</span>
                </h3>
                <ul className="contact-page__horaires">
                  {cabinet.horaires.map((h) => (
                    <li key={h.jour}>
                      <span>{h.jour}</span>
                      {/*
                        ✅ <time> pour les plages horaires quand ouvert.
                           Pour "Fermé", <time> n'est pas approprié — on garde <span>.
                           datetime= omis pour les jours complets (pas de format
                           ISO standard pour les plages hebdomadaires textuelles).
                      */}
                      {h.heures === "Fermé" ? (
                        <span className="contact-page__ferme">{h.heures}</span>
                      ) : (
                        <time className={undefined}>{h.heures}</time>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/*
                ✅ <aside> pour les infos complémentaires urgences/nouveaux patients :
                   c'est du contenu tangentiel aux horaires, pas un titre de section —
                   <aside> dans un <div> de layout est valide.
              */}
              <aside
                className="contact-page__info-complementaire"
                aria-label="Informations pratiques complémentaires"
              >
                <p className="contact-page__info-complementaire-text">
                  <strong>Urgences :</strong> En cas d'urgence, veuillez
                  contacter le 15
                </p>
                <p className="contact-page__info-complementaire-text">
                  <strong>Nouveaux patients :</strong> Bienvenue aux nouveaux
                  patients
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
