// SpecialitesPage.jsx

import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  Bone,
  Hand,
  Activity,
  Wind,
  Shield,
  Baby,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import { specialites } from "../data/specialites.js";
import { kines } from "../data/kines.js";
import { useScrollReveal } from "../hooks/UseScrollReveal";
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

/** Normalise un id en string — évite "1" !== 1 */
const toStr = (v) => String(v ?? "");

export default function SpecialitesPage() {
  const ref = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const sortedSpecs = useMemo(
    () => [...specialites].sort((a, b) => a.nom.localeCompare(b.nom, "fr")),
    [],
  );

  const gridResults = useMemo(() => {
    if (activeFilter === "all") return sortedSpecs;
    // ✅ Fix : on normalise les deux côtés en string
    return sortedSpecs.filter((spec) =>
      spec.kineIds.map(toStr).includes(toStr(activeFilter)),
    );
  }, [sortedSpecs, activeFilter]);

  const uniqueKines = useMemo(() => {
    const ids = new Set(sortedSpecs.flatMap((s) => s.kineIds.map(toStr)));
    return kines.filter((k) => ids.has(toStr(k.id)));
  }, [sortedSpecs]);

  /** Compteur par kiné calculé sur la liste complète (pas la liste filtrée) */
  const countByKine = useMemo(() => {
    const map = {};
    for (const k of uniqueKines) {
      const kid = toStr(k.id);
      map[kid] = sortedSpecs.filter((s) =>
        s.kineIds.map(toStr).includes(kid),
      ).length;
    }
    return map;
  }, [sortedSpecs, uniqueKines]);

  function clearFilter() {
    setActiveFilter("all");
  }

  return (
    <>
      <PageHeader
        label="Nos soins"
        title="Nos spécialités"
        teaser="Thérapie manuelle, viscérale, soins à domicile… découvrez l'étendue de nos prises en charge."
        description={[
          "Nous travaillons essentiellement en manuel en prenant un patient par demi-heure, voire une heure en fonction des besoins.",
          "Nous nous rendons au domicile des patients dans le secteur de Boersch et des villages alentours (Bischoffsheim, Rosheim, Ottrott...).",
          "Nous pratiquons également des séances hors-convention qui font partie de nos spécialités respectives : Le facial-counterstrain pour Johan et la micronutrition pour Justine.",
          "Nous pratiquons tous les deux la thérapie manuelle vicérale.",
          "Au fil des années, nous continuons à nous former et à nous perfectionner.",
        ]}
      />

      <section
        className="specialites-page"
        aria-labelledby="specialites-list-heading"
        ref={ref}
      >
        <h2 id="specialites-list-heading" className="sr-only">
          Liste des spécialités
        </h2>

        <div className="specialites-page__inner container">
          {/* ── Bandeau Body Map ──
          <div className="specialites-page__bodymap-banner" data-reveal>
            <div className="specialites-page__bodymap-info">
              <span className="specialites-page__bodymap-eyebrow">
                Outil interactif
              </span>
              <p className="specialites-page__bodymap-title">
                Explorez l'anatomie du corps humain
              </p>
              <p className="specialites-page__bodymap-desc">
                Os, muscles, nerfs, tendons, vaisseaux… <br />
                Un atlas anatomique complet classé par système.
              </p>
            </div>
            <Link
              to="/body-map"
              className="specialites-page__bodymap-btn"
              aria-label="Ouvrir le Body Map anatomique interactif"
            >
              <span>Ouvrir le Body Map</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div> */}

          {/* ── Filtres praticiens ── */}
          <div className="specialites-search" data-reveal>
            <div className="specialites-search__top">
              <div className="specialites-search__field-wrap">
                <label className="specialites-search__label">
                  Filtrer par praticien
                </label>
                <div className="specialites-search__input-row">
                  <button
                    className={[
                      "specialites-search__filter-toggle",
                      showFilters ? "is-open" : "",
                      activeFilter !== "all" ? "has-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setShowFilters((v) => !v)}
                    aria-expanded={showFilters}
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      <SlidersHorizontal size={16} aria-hidden="true" />
                      <span>Filtrer par praticien</span>
                    </div>
                    {activeFilter !== "all" && (
                      <span className="specialites-search__filter-badge">
                        1
                      </span>
                    )}
                    <ChevronDown
                      size={14}
                      className="specialites-search__chevron"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div
                className="specialites-search__filters"
                role="group"
                aria-label="Filtrer par praticien"
              >
                <span className="specialites-search__filters-label">
                  Praticien :
                </span>

                {/* Chip "Tous" */}
                <button
                  className={`specialites-search__filter-chip${activeFilter === "all" ? " is-active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  <span className="specialites-search__filter-chip-all">
                    Tous
                  </span>
                  <span className="specialites-search__filter-count">
                    {sortedSpecs.length}
                  </span>
                </button>

                {/* Chips par kiné avec compteur */}
                {uniqueKines.map((k) => {
                  const kid = toStr(k.id);
                  return (
                    <button
                      key={k.id}
                      className={`specialites-search__filter-chip${toStr(activeFilter) === kid ? " is-active" : ""}`}
                      onClick={() => setActiveFilter(kid)}
                    >
                      <img
                        src={k.photo}
                        alt=""
                        aria-hidden="true"
                        className="specialites-search__filter-avatar"
                      />
                      {k.prenom}
                      <span className="specialites-search__filter-count">
                        {countByKine[kid] ?? 0}
                      </span>
                    </button>
                  );
                })}

                {activeFilter !== "all" && (
                  <button
                    className="specialites-search__filter-reset"
                    onClick={clearFilter}
                    aria-label="Réinitialiser le filtre"
                  >
                    <X size={13} />
                    Réinitialiser
                  </button>
                )}
              </div>
            )}

            {/* Compteur + tag actif */}
            <div className="specialites-search__status">
              <p className="specialites-search__count" aria-live="polite">
                <strong>{gridResults.length}</strong> spécialité
                {gridResults.length > 1 ? "s" : ""} disponible
                {gridResults.length > 1 ? "s" : ""}
              </p>
              {activeFilter !== "all" && (
                <div className="specialites-search__active-tags">
                  <span className="specialites-search__active-tag">
                    {
                      uniqueKines.find(
                        (k) => toStr(k.id) === toStr(activeFilter),
                      )?.prenom
                    }
                    <button
                      onClick={clearFilter}
                      aria-label="Supprimer ce filtre"
                      className="specialites-search__active-tag-remove"
                    >
                      <X size={11} />
                    </button>
                  </span>
                  <button
                    className="specialites-search__reset-all"
                    onClick={clearFilter}
                  >
                    Tout effacer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Grille ── */}
          {gridResults.length === 0 ? (
            <div className="specialites-page__empty" data-reveal>
              <span className="specialites-page__empty-icon" aria-hidden="true">
                🔍
              </span>
              <p className="specialites-page__empty-title">
                Aucune spécialité disponible pour ce praticien.
              </p>
              <p className="specialites-page__empty-hint">
                <button
                  onClick={clearFilter}
                  className="specialites-page__empty-reset"
                >
                  Réinitialiser le filtre
                </button>
              </p>
            </div>
          ) : (
            <ul
              className="specialites-page__grid"
              data-reveal-stagger="70"
              // ✅ Clé sur le filtre actif → React remonte les <li>, déclenchant l'animation CSS
              key={activeFilter}
            >
              {gridResults.map((spec) => {
                const Icon = iconMap[spec.icone] || Activity;
                // ✅ Fix : normalisation des deux côtés
                const kinesList = kines.filter((k) =>
                  spec.kineIds.map(toStr).includes(toStr(k.id)),
                );
                return (
                  <li key={spec.id} data-reveal>
                    <article className="specialites-page__card">
                      <div className="specialites-page__card-top">
                        <div
                          className="specialites-page__icon"
                          aria-hidden="true"
                        >
                          <Icon size={28} aria-hidden="true" />
                        </div>
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
          )}
        </div>
      </section>
    </>
  );
}
