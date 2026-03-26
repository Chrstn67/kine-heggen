import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { kines } from "../data/kines.js";
import { useScrollReveal } from "../hooks/UseScrollReveal";
import "./SectionEquipe.css";

export default function SectionEquipe() {
  const ref = useScrollReveal();

  return (
    <section className="home-equipe" aria-labelledby="equipe-heading" ref={ref}>
      <div className="home-equipe__inner container">
        <header className="home-equipe__header" data-reveal>
          <p className="home-equipe__label">Notre équipe</p>
          <h2 id="equipe-heading" className="home-equipe__title">
            Des professionnels à votre écoute
          </h2>
        </header>

        <ul className="home-equipe__grid" data-reveal-stagger="120">
          {kines.map((kine, index) => (
            <li
              key={kine.id}
              className={`home-equipe__item ${index % 2 === 1 ? "home-equipe__item--reverse" : ""}`}
              data-reveal
            >
              <Link
                to={`/equipe/${kine.slug}`}
                className="home-equipe__card"
                aria-label={`Voir le profil de ${kine.prenom} ${kine.nom}, ${kine.titre}`}
              >
                {/* ── Photo avec overlay hover ── */}
                <div className="home-equipe__photo">
                  <img src={kine.photo} alt="" loading="lazy" />
                  {/* Overlay qui glisse depuis le bas au hover */}
                  <div
                    className="home-equipe__photo-overlay"
                    aria-hidden="true"
                  >
                    <span className="home-equipe__photo-overlay-text">
                      Voir le profil
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="home-equipe__info">
                  <h3 className="home-equipe__name">
                    {kine.prenom} {kine.nom}
                  </h3>
                  <p className="home-equipe__titre">{kine.titre}</p>
                  <p className="home-equipe__bio">{kine.bioCourte}</p>
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
