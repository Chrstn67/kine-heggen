import { Link } from "react-router-dom";
import { ArrowRight, Phone, Award, MapPin } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./SectionHero.css";

export default function SectionHero() {
  return (
    <section className="hero" aria-label="Accueil">
      <div className="hero__bg">
        <img
          src="/images/hero-cabinet.jpg"
          alt="Intérieur moderne du cabinet Chez JJ"
          loading="eager"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      <div className="hero__content container">
        {/* ── Rangée de badges animés ── */}
        <div className="hero__badges" aria-hidden="true">
          <span className="hero__badge hero__badge--convention">
            <Award size={13} />
            Cabinet conventionné
          </span>
          <span className="hero__badge hero__badge--location">
            <MapPin size={13} />
            {cabinet.adresse?.ville ?? "Boersch"}
          </span>
          <span className="hero__badge hero__badge--sector">Secteur 1</span>
        </div>

        <h1 className="hero__title">{cabinet.nom}</h1>
        <p className="hero__subtitle">{cabinet.slogan}</p>
        <p className="hero__description">{cabinet.description}</p>

        <div className="hero__actions">
          <Link to="/contact" className="hero__btn hero__btn--primary">
            <span>Prendre rendez-vous</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a
            href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
            className="hero__btn hero__btn--secondary"
          >
            <Phone size={18} aria-hidden="true" />
            <span>{cabinet.telephone[0]}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
