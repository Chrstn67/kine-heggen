import { Ear, GraduationCap, Heart } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./SectionValeurs.css";

const iconMap = {
  ear: Ear,
  diploma: GraduationCap,
  heart: Heart,
};

export default function SectionValeurs() {
  return (
    <section className="valeurs" aria-labelledby="valeurs-heading">
      <div className="valeurs__inner container">
        <header className="valeurs__header">
          {/*
            ✅ <header> sémantique pour l'en-tête de section
            ✅ <p> au lieu de <span> block pour le label de catégorie
          */}
          <p className="valeurs__label">Nos valeurs</p>
          <h2 id="valeurs-heading" className="valeurs__title">
            Ce qui nous anime au quotidien
          </h2>
        </header>

        {/*
          ✅ <ul> au lieu de <div> :
             les valeurs sont une liste d'items homogènes.
             Sémantiquement, une liste est plus correcte qu'un div
             pour des éléments qui forment un ensemble structuré.
             Les <article> à l'intérieur restent valides :
             chaque valeur est un contenu autonome et auto-suffisant.
        */}
        <ul className="valeurs__grid">
          {cabinet.valeurs.map((valeur, i) => {
            const Icon = iconMap[valeur.icone] || Heart;
            return (
              /*
                ✅ <article> dans <li> :
                   <article> est correct ici car chaque valeur est
                   un bloc de contenu indépendant et auto-descriptif.
                   <li> porte la sémantique de liste,
                   <article> porte la sémantique de contenu autonome.
              */
              <li key={i}>
                <article className="valeurs__card">
                  <div className="valeurs__icon" aria-hidden="true">
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  {/* ✅ h3 : sous le h2 de section — hiérarchie correcte */}
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
