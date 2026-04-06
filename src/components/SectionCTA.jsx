import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, CreditCard } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import { useScrollReveal } from "../hooks/UseScrollReveal";
import "./SectionCTA.css";

export default function SectionCTA() {
  const ref = useScrollReveal();

  return (
    <section className="cta" aria-labelledby="cta-heading" ref={ref}>
      <div className="cta__inner container">
        <div className="cta__content" data-reveal="fade-right">
          <h2 id="cta-heading" className="cta__title">
            Prenez soin de vous
          </h2>
          <p className="cta__description">
            {
              "Contactez-nous pour prendre rendez-vous ou pour toute question sur nos prises en charge. Nous sommes à votre écoute."
            }
          </p>
          <Link to="/contact" className="cta__btn">
            <span>Nous contacter</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div
          className="cta__infos"
          data-reveal="fade-left"
          data-reveal-delay="100"
        >
          <div className="cta__info-card">
            <Clock size={20} aria-hidden="true" />
            <div>
              <strong>Lundi - Vendredi</strong>
              <span>8h00 - 19h00</span>
            </div>
          </div>
          <div className="cta__info-card">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>{cabinet.adresse.rue}</strong>
              <span>
                {cabinet.adresse.codePostal} {cabinet.adresse.ville}
              </span>
            </div>
          </div>
          <div className="cta__info-card">
            <CreditCard size={20} aria-hidden="true" />
            <div>
              <strong>Cabinet conventionné</strong>
              <span>{cabinet.moyensPaiement.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
