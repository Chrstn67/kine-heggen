import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { kines } from "../data/kines.js";
import { specialites } from "../data/specialites.js";
import PageHeader from "../components/PageHeader.jsx";
import "./EquipePage.css";

export default function EquipePage() {
  return (
    <>
      <PageHeader
        label="Notre équipe"
        title={"L'équipe du cabinet"}
        description={[
          "Après une première année commune aux études de santé (PACES), obligatoire pour intégrer une école de kinésithérapie, nous poursuivons notre formation à la rentrée 2013 : Justine à Strasbourg et Johan à Mulhouse.",
          "Durant trois années de formation, nous réalisons de nombreux stages, aussi bien en cabinet libéral que dans différents services hospitaliers : cardio-respiratoire, neurologie, traumatologie, pédiatrie, entre autres.",
          "Nous obtenons notre diplôme d’État de masseur-kinésithérapeute en juin 2016.",
          "Nous débutons notre activité professionnelle en juillet 2016. Nous exerçons d’abord en Alsace, puis dans plusieurs régions de France : Alpes-Maritimes, Drôme, Gironde, Loire-Atlantique, Nord, ainsi qu’en Guadeloupe et sur l’île de La Réunion.",
          "En 2019, après un dernier remplacement en Provence, nous choisissons de revenir en Alsace afin de nous y installer durablement.",
          "Justine s’installe comme assistante-collaboratrice à Soultz-les-Bains, où elle exercera pendant six ans.",
          "De son côté, Johan exerce également comme assistant-collaborateur, d’abord à Duppigheim puis à Krautergersheim, durant trois années dans chacun de ces cabinets.",
          "En 2023, nous visitons l’ancien bâtiment du Crédit Agricole du village de Boersch, qui deviendra, un an plus tard, notre cabinet.",
        ]}
      />
      <section className="equipe-page" aria-label="Liste des praticiens">
        <div className="equipe-page__inner container">
          {kines.map((kine) => {
            const kineSpecs = specialites.filter((s) =>
              kine.specialites.includes(s.id),
            );
            return (
              <article key={kine.id} className="equipe-page__card">
                <div className="equipe-page__photo-col">
                  <img
                    src={kine.photo}
                    alt={`${kine.prenom} ${kine.nom}, ${kine.titre}`}
                    loading="lazy"
                  />
                </div>
                <div className="equipe-page__info-col">
                  <div className="equipe-page__header">
                    <h2 className="equipe-page__name">
                      {kine.prenom} {kine.nom}
                    </h2>
                    <span className="equipe-page__titre">{kine.titre}</span>
                  </div>
                  <p className="equipe-page__bio">{kine.bioCourte}</p>

                  <div className="equipe-page__specs">
                    <h3 className="equipe-page__specs-label">Spécialités</h3>
                    <div className="equipe-page__specs-tags">
                      {kineSpecs.map((s) => (
                        <Link
                          to={`/specialites/${s.id}`}
                          key={s.id}
                          className="equipe-page__tag"
                        >
                          {s.nom}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="equipe-page__actions">
                    <Link
                      to={`/kine-heggen/equipe/${kine.slug}`}
                      className="equipe-page__btn equipe-page__btn--primary"
                    >
                      <span>Voir le profil complet</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <a
                      href={`mailto:${kine.email}`}
                      className="equipe-page__btn equipe-page__btn--secondary"
                    >
                      <Mail size={16} aria-hidden="true" />
                      <span>Contacter</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
