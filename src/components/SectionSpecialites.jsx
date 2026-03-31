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
import { useScrollReveal } from "../hooks/UseScrollReveal";
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
  const ref = useScrollReveal();

  // Sort specialties alphabetically by name
  const sortedSpecialites = [...specialites].sort((a, b) =>
    a.nom.localeCompare(b.nom),
  );

  return (
    <section className="home-specs" aria-labelledby="specs-heading" ref={ref}>
      <div className="home-specs__inner container">
        <div className="home-specs__header" data-reveal>
          <div>
            <p className="home-specs__label">Nos soins</p>
            <h2 id="specs-heading" className="home-specs__title">
              Des prises en charge spécialisées
            </h2>
          </div>
          <Link to="/specialites" className="home-specs__see-all">
            <span>Toutes nos spécialités</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ul className="home-specs__grid" data-reveal-stagger="70">
          {sortedSpecialites.map((spec) => {
            const Icon = iconMap[spec.icone] || Activity;
            return (
              <li key={spec.id} data-reveal>
                <Link
                  to={`/specialites/${spec.slug}`}
                  className="home-specs__card"
                  aria-label={`En savoir plus sur ${spec.nom}`}
                >
                  <div className="home-specs__card-icon" aria-hidden="true">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="home-specs__card-title">{spec.nom}</h3>
                  <p className="home-specs__card-desc">{spec.resume}</p>
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
