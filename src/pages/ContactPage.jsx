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

  // Organisation des coordonnées par kiné
  const kinesContacts = kines.map((kine) => {
    // Extraire le numéro du kiné depuis cabinet.telephone
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
    <>
      <PageHeader
        label="Contact"
        title="Contactez-nous"
        description="Prenez rendez-vous ou posez-nous vos questions. Nous sommes disponibles du lundi au vendredi."
      />

      <section className="contact-page" aria-label="Informations de contact">
        <div className="contact-page__inner container">
          <div className="contact-page__grid">
            {/* ── Colonne gauche ── */}
            <div className="contact-page__col contact-page__col--left">
              {/* Coordonnées cabinet */}
              <div className="contact-page__card">
                <h2 className="contact-page__card-title">Nos coordonnées</h2>
                <ul className="contact-page__info-list">
                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <MapPin size={20} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Adresse</strong>
                      <span>{adresse.rue}</span>
                      <span>
                        {adresse.codePostal} {adresse.ville}
                      </span>
                      <span className="contact-page__complement">
                        {adresse.complement}
                      </span>
                    </div>
                  </li>

                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Phone size={20} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Téléphone</strong>
                      <div className="contact-page__phones">
                        <div className="contact-page__phone-row">
                          <span className="contact-page__phone-label">
                            Cabinet
                          </span>
                          <a
                            href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
                            className="contact-page__phone-link"
                            aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
                          >
                            {cabinet.telephone[0]}
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Mail size={20} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Email</strong>
                      <a href={`mailto:${cabinet.email}`}>{cabinet.email}</a>
                    </div>
                  </li>

                  <li className="contact-page__info-item">
                    <div className="contact-page__info-icon" aria-hidden="true">
                      <Home size={20} />
                    </div>
                    <div className="contact-page__info-body">
                      <strong>Soins</strong>
                      <span>{adresse.soins}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Coordonnées individuelles des kinés (groupées par kiné) */}
              <div className="contact-page__card">
                <h2 className="contact-page__card-title">
                  Contacter directement
                </h2>
                <div className="contact-page__kines">
                  {kinesContacts.map((kine) => (
                    <div key={kine.id} className="contact-page__kine">
                      <p className="contact-page__kine-name">
                        {kine.prenom} {kine.nom}
                      </p>
                      <div className="contact-page__kine-contacts">
                        <a
                          href={`mailto:${kine.email}`}
                          className="contact-page__kine-link"
                          aria-label={`Email de ${kine.prenom} : ${kine.email}`}
                        >
                          <Mail size={15} aria-hidden="true" />
                          <span>{kine.email}</span>
                        </a>
                        {kine.telephone && (
                          <a
                            href={`tel:${kine.telephone.replace(/\s/g, "")}`}
                            className="contact-page__kine-link"
                            aria-label={`Téléphone de ${kine.prenom} : ${kine.telephone}`}
                          >
                            <Phone size={15} aria-hidden="true" />
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
                            <Instagram size={15} aria-hidden="true" />
                            <span>{kine.instagram}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges extras */}
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
                    <span>Paiement : {cabinet.moyensPaiement.join(" · ")}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* ── Colonne droite ── */}
            <div className="contact-page__col contact-page__col--right">
              <div className="contact-page__card contact-page__card--horaires">
                <h3 className="contact-page__card-heading">
                  <Clock size={18} aria-hidden="true" />
                  <span>Horaires d'ouverture</span>
                </h3>
                <div className="contact-page__horaires-free">
                  <div className="contact-page__horaires-days">
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
                  <p className="contact-page__horaires-note">
                    {cabinet.horaires[0].description}
                  </p>
                </div>
              </div>

              <div className="contact-page__card contact-page__card--alt contact-page__card--savoir">
                <h3 className="contact-page__card-heading">
                  <Info size={18} aria-hidden="true" />
                  <span>Bon à savoir</span>
                </h3>
                <ul className="contact-page__notes">
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
                    l’avance.
                  </li>
                  <li>
                    <strong>Urgences médicales :</strong> composez le{" "}
                    <a href="tel:15">15</a> (SAMU) ou <a href="tel:18">18</a>{" "}
                    (Pompiers)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
