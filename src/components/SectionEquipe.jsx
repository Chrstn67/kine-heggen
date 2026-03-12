import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { kines } from "../data/kines.js";
import "./SectionEquipe.css";

export default function SectionEquipe() {
  return (
    <section className="home-equipe" aria-labelledby="equipe-heading">
      <div className="home-equipe__inner container">
        <header className="home-equipe__header">
          {/*
            ✅ <header> sémantique pour l'en-tête de section :
               <header> à l'intérieur d'un <section> est valide et
               aide les crawlers à identifier la structure de la section.
          */}
          {/*
            ✅ <p> au lieu de <span> block pour le label de catégorie
          */}
          <p className="home-equipe__label">Notre équipe</p>
          <h2 id="equipe-heading" className="home-equipe__title">
            Des professionnels à votre écoute
          </h2>
        </header>

        {/*
          ✅ <ul> : liste de membres d'équipe — sémantique de liste
             appropriée. Les crawlers comprennent que les items
             sont des éléments d'un ensemble homogène.
        */}
        <ul className="home-equipe__grid">
          {kines.map((kine, index) => (
            <li
              key={kine.id}
              /*
                Classe CSS pair/impair pour l'alternance visuelle gauche/droite.
                index % 2 === 0 → photo à gauche (comportement par défaut)
                index % 2 === 1 → photo à droite via flex-direction: row-reverse
                Purement visuel : aucun impact sur la sémantique ou l'ordre du DOM.
              */
              className={`home-equipe__item ${index % 2 === 1 ? "home-equipe__item--reverse" : ""}`}
            >
              {/*
                ✅ aria-label sur le <Link> :
                   le texte accessible serait autrement une concaténation
                   de prénom + nom + titre + bio + "Découvrir son profil" —
                   trop verbeux pour les AT. Un aria-label synthétique
                   donne un intitulé clair et unique à chaque lien.

                ✅ kine.slug au lieu de kine.id :
                   → /kine-heggen/equipe/justine-hoffmann-heggen
                   URL lisible, mémorisable, et indexée avec le nom du praticien.
              */}
              <Link
                to={`/kine-heggen/equipe/${kine.slug}`}
                className="home-equipe__card"
                aria-label={`Voir le profil de ${kine.prenom} ${kine.nom}, ${kine.titre}`}
              >
                <div className="home-equipe__photo">
                  {/*
                    ✅ alt vide sur l'image : le lien parent a déjà un
                       aria-label complet incluant le nom et titre du kiné.
                       Répéter l'info dans l'alt créerait une double lecture.
                  */}
                  <img src={kine.photo} alt="" loading="lazy" />
                </div>
                <div className="home-equipe__info">
                  {/*
                    ✅ <h3> → le nom du praticien est le titre de la card,
                       hiérarchiquement sous le h2 de section — correct.
                  */}
                  <h3 className="home-equipe__name">
                    {kine.prenom} {kine.nom}
                  </h3>
                  {/*
                    ✅ <p> pour le titre professionnel :
                       contenu textuel de niveau paragraphe, pas un titre.
                  */}
                  <p className="home-equipe__titre">{kine.titre}</p>
                  <p className="home-equipe__bio">{kine.bioCourte}</p>
                  {/*
                    ✅ aria-hidden : le lien a déjà un aria-label explicite,
                       ce span décoratif ne doit pas être lu en double.
                  */}
                  <span className="home-equipe__link" aria-hidden="true">
                    Découvrir son profil{" "}
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
