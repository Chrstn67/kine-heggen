import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Accessibility,
  CreditCard,
  Send,
} from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import PageHeader from "../components/PageHeader.jsx";
import "./ContactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const adresse = cabinet.adresse;

  return (
    <>
      <PageHeader
        label="Contact"
        title="Contactez-nous"
        description="Prenez rendez-vous ou posez-nous vos questions. Nous vous répondrons dans les meilleurs délais."
      />
      <section
        className="contact-page"
        aria-label="Informations de contact et formulaire"
      >
        <div className="contact-page__inner container">
          <div className="contact-page__grid">
            {/* Left: Info */}
            <div className="contact-page__info">
              <div className="contact-page__info-card">
                <h2 className="contact-page__info-title">Nos coordonnées</h2>

                <div className="contact-page__info-list">
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
                        <a
                          key={index}
                          href={`tel:${number.replace(/\s/g, "")}`}
                          className="contact-page__phone-link"
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
                      <a href={`mailto:${cabinet.email}`}>{cabinet.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-page__extras">
                <div className="contact-page__extra-item">
                  <Accessibility size={18} aria-hidden="true" />
                  <span>Accessible PMR</span>
                </div>
                <div className="contact-page__extra-item">
                  <CreditCard size={18} aria-hidden="true" />
                  <span>Cabinet conventionné</span>
                </div>
              </div>
            </div>

            {/* Right: Horaires et infos complémentaires */}
            <div className="contact-page__horaires-section">
              <div className="contact-page__horaires-card">
                <h3 className="contact-page__card-heading">
                  <Clock size={18} aria-hidden="true" />
                  <span>Horaires d'ouverture</span>
                </h3>
                <ul className="contact-page__horaires">
                  {cabinet.horaires.map((h) => (
                    <li key={h.jour}>
                      <span>{h.jour}</span>
                      <span
                        className={
                          h.heures === "Fermé" ? "contact-page__ferme" : ""
                        }
                      >
                        {h.heures}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-page__info-complementaire">
                <p className="contact-page__info-complementaire-text">
                  <strong>Urgences :</strong> En cas d'urgence, veuillez
                  contacter le 15
                </p>
                <p className="contact-page__info-complementaire-text">
                  <strong>Nouveaux patients :</strong> Bienvenue aux nouveaux
                  patients
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
