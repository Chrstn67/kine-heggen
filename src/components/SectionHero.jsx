import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./SectionHero.css";

export default function SectionHero() {
  return (
    /*
      ✅ aria-label supprimé : la section contient un <h1> qui la labellise
         implicitement. aria-labelledby pointant sur le h1 serait plus précis
         mais une section avec h1 n'en a pas besoin.
    */
    <section className="hero">
      {/*
        ✅ aria-hidden="true" sur tout le bloc visuel :
           image + overlay sont purement décoratifs.
           alt="" sur l'img = double protection (bonne pratique quand
           le parent est déjà aria-hidden).
      */}
      <div className="hero__bg" aria-hidden="true">
        <img src="/images/hero-cabinet.jpg" alt="" loading="eager" />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        {/*
          ✅ <p> au lieu de <span> block : un span est inline par nature,
             l'utiliser comme bloc est incorrect sémantiquement.
        */}
        <p className="hero__badge">Cabinet conventionné</p>

        <h1 className="hero__title">{cabinet.nom}</h1>

        {/* ✅ <p> pour le slogan : complément du h1, pas un titre de section */}
        <p className="hero__subtitle">{cabinet.slogan}</p>
        <p className="hero__description">{cabinet.description}</p>

        <div className="hero__actions">
          <Link
            to="/kine-heggen/contact"
            className="hero__btn hero__btn--primary"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>

          {/*
            ✅ aria-label : le numéro brut n'est pas un texte de lien
               suffisant. "Appeler le cabinet au …" est clair pour les AT
               et pour Google (intent téléphonique explicite).
               Le <span> visible est masqué aux AT (aria-hidden) pour éviter
               la double lecture avec l'aria-label du lien.
          */}
          <a
            href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
            className="hero__btn hero__btn--secondary"
            aria-label={`Appeler le cabinet au ${cabinet.telephone[0]}`}
          >
            <Phone size={18} aria-hidden="true" />
            <span aria-hidden="true">{cabinet.telephone[0]}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
