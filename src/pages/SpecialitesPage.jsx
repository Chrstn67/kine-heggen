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
      <section className="specialites-page" aria-label="Liste des spécialités">
        <div className="specialites-page__inner container">
          <div className="specialites-page__grid">
            {specialites.map((spec) => {
              const Icon = iconMap[spec.icone] || Activity;
              // Récupérer tous les kinés pour cette spécialité
              const kineIds = Array.isArray(spec.kineIds)
                ? spec.kineIds
                : [spec.kineIds];
              const kinesList = kines.filter((k) => kineIds.includes(k.id));

              return (
                <article key={spec.id} className="specialites-page__card">
                  <div className="specialites-page__card-top">
                    <div className="specialites-page__icon" aria-hidden="true">
                      <Icon size={28} />
                    </div>
                    <h2 className="specialites-page__card-title">{spec.nom}</h2>
                    <p className="specialites-page__card-desc">{spec.resume}</p>
                  </div>
                  <div className="specialites-page__card-bottom">
                    {kinesList.length > 0 && (
                      <div className="specialites-page__kine">
                        {kinesList.length === 1 ? (
                          // Un seul praticien
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
                          // Plusieurs praticiens
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
                    <Link
                      to={`/kine-heggen/specialites/${spec.slug}`}
                      className="specialites-page__link"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
