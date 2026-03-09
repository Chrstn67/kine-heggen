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
            <span className="home-specs__label">Nos soins</span>
            <h2 id="specs-heading" className="home-specs__title">
              Des prises en charge spécialisées
            </h2>
          </div>
          <Link to="/kine-heggen/specialites" className="home-specs__see-all">
            <span>Toutes nos spécialités</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="home-specs__grid">
          {specialites.map((spec) => {
            const Icon = iconMap[spec.icone] || Activity;
            return (
              <Link
                to={`/kine-heggen/specialites/${spec.slug}`}
                key={spec.id}
                className="home-specs__card"
              >
                <div className="home-specs__card-icon" aria-hidden="true">
                  <Icon size={24} />
                </div>
                <h3 className="home-specs__card-title">{spec.nom}</h3>
                <p className="home-specs__card-desc">{spec.resume}</p>
                <span className="home-specs__card-link" aria-hidden="true">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
