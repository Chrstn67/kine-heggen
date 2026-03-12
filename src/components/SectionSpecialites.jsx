import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bone,
  Hand,
  Activity,
  Wind,
  Shield,
  Baby,
} from "lucide-react";
import { specialites } from "../data/specialites.js";
import "./SectionSpecialites.css";

const iconMap = {
  bone: Bone,
  hand: Hand,
  activity: Activity,
  wind: Wind,
  shield: Shield,
  baby: Baby,
};

export default function SectionSpecialites() {
  return (
    <section className="home-specs" aria-labelledby="specs-heading">
      <div className="home-specs__inner container">
        <div className="home-specs__header">
          <div>
            {/*
              ✅ <p> au lieu de <span> :
                 "Nos soins" est affiché en display:block — un <span>
                 utilisé comme bloc est sémantiquement incorrect.
                 <p> est le bon élément pour du texte de niveau paragraphe.
            */}
            <p className="home-specs__label">Nos soins</p>
            <h2 id="specs-heading" className="home-specs__title">
              Des prises en charge spécialisées
            </h2>
          </div>
          <Link to="/kine-heggen/specialites" className="home-specs__see-all">
            <span>Toutes nos spécialités</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/*
          ✅ <ul> au lieu de <div> pour la grille :
             ce sont des éléments d'une liste de spécialités — sémantique
             de liste correcte, indexable comme telle par les crawlers.
        */}
        <ul className="home-specs__grid">
          {specialites.map((spec) => {
            const Icon = iconMap[spec.icone] || Activity;
            return (
              <li key={spec.id}>
                {/*
                  ✅ aria-label sur le <Link> :
                     sans lui, le texte accessible du lien serait
                     "En savoir plus" répété N fois — illisible pour
                     les AT et les crawlers. L'aria-label donne un
                     intitulé unique et descriptif à chaque lien.
                     Le span décoratif "En savoir plus" reste aria-hidden.
                */}
                <Link
                  to={`/kine-heggen/specialites/${spec.slug}`}
                  className="home-specs__card"
                  aria-label={`En savoir plus sur ${spec.nom}`}
                >
                  <div className="home-specs__card-icon" aria-hidden="true">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  {/* ✅ h3 correct : sous-titre dans une section h2 */}
                  <h3 className="home-specs__card-title">{spec.nom}</h3>
                  <p className="home-specs__card-desc">{spec.resume}</p>
                  {/* ✅ aria-hidden : le lien a déjà un aria-label explicite */}
                  <span className="home-specs__card-link" aria-hidden="true">
                    En savoir plus <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
