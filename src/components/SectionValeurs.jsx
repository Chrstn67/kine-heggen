import { Ear, GraduationCap, Heart } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import { useScrollReveal } from "../hooks/UseScrollReveal";
import "./SectionValeurs.css";

const iconMap = {
  ear: Ear,
  diploma: GraduationCap,
  heart: Heart,
};

export default function SectionValeurs() {
  const ref = useScrollReveal();

  return (
    <section className="valeurs" aria-labelledby="valeurs-heading" ref={ref}>
      <div className="valeurs__inner container">
        <header className="valeurs__header" data-reveal>
          <p className="valeurs__label">Nos valeurs</p>
          <h2 id="valeurs-heading" className="valeurs__title">
            Ce qui nous anime au quotidien
          </h2>
        </header>

        <ul className="valeurs__grid" data-reveal-stagger="90">
          {cabinet.valeurs.map((valeur, i) => {
            const Icon = iconMap[valeur.icone] || Heart;
            return (
              <li key={i} data-reveal>
                <article className="valeurs__card">
                  <div className="valeurs__icon" aria-hidden="true">
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h3 className="valeurs__card-title">{valeur.titre}</h3>
                  <p className="valeurs__card-desc">{valeur.description}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
