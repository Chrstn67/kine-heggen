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
import { kines } from "../data/kines.js";
import PageHeader from "../components/PageHeader.jsx";
import "./SpecialitesPage.css";

const iconMap = {
  bone: Bone,
  hand: Hand,
  activity: Activity,
  wind: Wind,
  shield: Shield,
  baby: Baby,
};

export default function SpecialitesPage() {
  return (
    <>
      <PageHeader
        label="Nos soins"
        title="Nos spécialités"
        description={[
          "Nous travaillons essentiellement en manuel en prenant un patient par demi-heure, voire une heure en fonction des besoins.",
          "Nous nous rendons au domicile des patients dans le secteur de Boersch et des villages alentours (Bischoffsheim, Rosheim, Ottrott...).",
          "Nous pratiquons également des séances hors-convention qui font partie de nos spécialités respectives : Le facial-counterstrain pour Johan et la micronutrition pour Justine.",
          "Nous pratiquons tous les deux la thérapie manuelle vicérale.",
          "Au fil des années, nous continuons à nous former et à nous perfectionner.",
        ]}
      />

      {/*
        ✅ aria-labelledby sur un h2 sr-only plutôt qu'aria-label inline :
           plus robuste, indexable par les crawlers comme titre de section.
      */}
      <section
        className="specialites-page"
        aria-labelledby="specialites-list-heading"
      >
        <h2 id="specialites-list-heading" className="sr-only">
          Liste des spécialités
        </h2>
        <div className="specialites-page__inner container">
          {/*
            ✅ <ul>/<li> au lieu de <div> pour la grille :
               liste d'items homogènes → sémantique de liste.
               Les <article> restent dans les <li>.
          */}
          <ul className="specialites-page__grid">
            {specialites.map((spec) => {
              const Icon = iconMap[spec.icone] || Activity;
              const kineIds = Array.isArray(spec.kineIds)
                ? spec.kineIds
                : [spec.kineIds];
              const kinesList = kines.filter((k) => kineIds.includes(k.id));

              return (
                <li key={spec.id}>
                  <article className="specialites-page__card">
                    <div className="specialites-page__card-top">
                      <div
                        className="specialites-page__icon"
                        aria-hidden="true"
                      >
                        <Icon size={28} aria-hidden="true" />
                      </div>
                      {/*
                        ✅ h3 au lieu de h2 : on est sous le h2 sr-only
                           "Liste des spécialités" → hiérarchie correcte.
                           (PageHeader a le h1, la section a le h2 sr-only,
                            chaque card a un h3)
                      */}
                      <h3 className="specialites-page__card-title">
                        {spec.nom}
                      </h3>
                      <p className="specialites-page__card-desc">
                        {spec.resume}
                      </p>
                    </div>

                    <div className="specialites-page__card-bottom">
                      {kinesList.length > 0 && (
                        <div
                          className="specialites-page__kine"
                          aria-label="Praticien(s)"
                        >
                          {kinesList.length === 1 ? (
                            <>
                              <img
                                src={kinesList[0].photo}
                                alt={`${kinesList[0].prenom} ${kinesList[0].nom}`}
                                className="specialites-page__kine-photo"
                                loading="lazy"
                              />
                              <span className="specialites-page__kine-name">
                                {kinesList[0].prenom}
                              </span>
                            </>
                          ) : (
                            <div className="specialites-page__kines-multiple">
                              <div className="specialites-page__kine-photos">
                                {kinesList.map((kine) => (
                                  <img
                                    key={kine.id}
                                    src={kine.photo}
                                    alt={`${kine.prenom} ${kine.nom}`}
                                    className="specialites-page__kine-photo-multi"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                              <span className="specialites-page__kine-name">
                                {kinesList.map((k) => k.prenom).join(" & ")}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/*
                        ✅ aria-label unique sur chaque lien "En savoir plus" :
                           sans lui, les AT lisent N fois "En savoir plus"
                           sans contexte — illisible pour la navigation
                           par liens (touche Tab / liste de liens).
                      */}
                      <Link
                        to={`/specialites/${spec.slug}`}
                        className="specialites-page__link"
                        aria-label={`En savoir plus sur ${spec.nom}`}
                      >
                        <span aria-hidden="true">En savoir plus</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
