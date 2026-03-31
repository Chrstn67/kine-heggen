import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Check,
  Users,
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
import { useScrollReveal } from "../hooks/UseScrollReveal";
import "./SpecialiteDetailPage.css";

const iconMap = {
  bone: Bone,
  hand: Hand,
  activity: Activity,
  wind: Wind,
  shield: Shield,
  baby: Baby,
};

export default function SpecialiteDetailPage() {
  const { id } = useParams();

  const revealMain = useScrollReveal();
  const revealRelated = useScrollReveal();
  const revealTarifs = useScrollReveal();
  const revealBienfaits = useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const spec = specialites.find((s) => s.slug === id);

  const autresSpecs = useMemo(
    () => specialites.filter((s) => s.slug !== id).slice(0, 3),
    [id],
  );

  if (!spec) return <Navigate to="/specialites" replace />;

  const kineIds = Array.isArray(spec.kineIds) ? spec.kineIds : [spec.kineIds];
  const kinesList = kines.filter((k) =>
    kineIds.map(String).includes(String(k.id)),
  );
  const Icon = iconMap[spec.icone] || Activity;

  return (
    <article className="spec-detail">
      {/* ── En-tête ── */}
      <div className="spec-detail__top">
        <div className="spec-detail__top-inner container">
          <Link to="/specialites" className="spec-detail__back">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Toutes les spécialités</span>
          </Link>

          <div className="spec-detail__icon-wrap" aria-hidden="true">
            <div className="spec-detail__icon-halo" aria-hidden="true" />
            <Icon size={32} />
          </div>

          <h1 className="spec-detail__title">{spec.nom}</h1>
          <p className="spec-detail__intro">{spec.description}</p>

          <div className="spec-detail__meta-badges" aria-hidden="true">
            <span className="spec-detail__meta-badge spec-detail__meta-badge--1">
              <Check size={12} />
              Conventionné secteur 1
            </span>
            <span className="spec-detail__meta-badge spec-detail__meta-badge--2">
              <Users size={12} />
              {kinesList.length > 1
                ? `${kinesList.length} praticiens`
                : "1 praticien"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Corps ── */}
      <div className="spec-detail__body container" ref={revealMain}>
        <div className="spec-detail__grid">
          {/* Colonne principale */}
          <div className="spec-detail__main">
            <section aria-labelledby="contenu-heading" data-reveal>
              <h2 id="contenu-heading" className="spec-detail__h2">
                Notre prise en charge
              </h2>
              <ul className="spec-detail__list">
                {spec.contenu.map((item, i) => (
                  <li key={i}>
                    <Check size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="pourqui-heading"
              data-reveal
              data-reveal-delay="80"
            >
              <h2 id="pourqui-heading" className="spec-detail__h2">
                Pour qui ?
              </h2>
              <p className="spec-detail__text">{spec.pourQui}</p>
            </section>

            <section
              aria-labelledby="bienfaits-heading"
              data-reveal
              data-reveal-delay="160"
            >
              <h2 id="bienfaits-heading" className="spec-detail__h2">
                Les bienfaits
              </h2>
              <ul
                className="spec-detail__bienfaits"
                data-reveal-stagger="55"
                ref={revealBienfaits}
              >
                {spec.bienfaits.map((b, i) => (
                  <li key={i} className="spec-detail__bienfait" data-reveal>
                    <Check size={16} aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {spec.tarif && (
              <section
                aria-labelledby="tarifs-heading"
                data-reveal
                data-reveal-delay="200"
              >
                <h2 id="tarifs-heading" className="spec-detail__h2">
                  Tarifs
                </h2>
                {Array.isArray(spec.tarif) ? (
                  <ul
                    className="spec-detail__tarifs"
                    data-reveal-stagger="55"
                    ref={revealTarifs}
                  >
                    {spec.tarif.map((t, i) => (
                      <li key={i} className="spec-detail__tarif" data-reveal>
                        <Check size={16} aria-hidden="true" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="spec-detail__tarif-single">{spec.tarif}</p>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="spec-detail__sidebar"
            data-reveal="fade-left"
            data-reveal-delay="200"
          >
            {kinesList.length > 0 && (
              <div className="spec-detail__kine-card">
                <h3 className="spec-detail__sidebar-title">
                  <Users size={18} aria-hidden="true" />
                  <span>
                    {kinesList.length > 1
                      ? "Vos praticiens"
                      : "Votre praticien"}
                  </span>
                </h3>
                <div className="spec-detail__kines-list">
                  {kinesList.map((kine) => (
                    <Link
                      to={`/equipe/${kine.slug}`}
                      key={kine.id}
                      className="spec-detail__kine-link"
                    >
                      <div className="spec-detail__kine-photo-wrap">
                        <img
                          src={kine.photo}
                          alt={`${kine.prenom} ${kine.nom}`}
                          loading="lazy"
                        />
                      </div>
                      <div className="spec-detail__kine-info">
                        <strong>
                          {kine.prenom} {kine.nom}
                        </strong>
                        <span>{kine.titre}</span>
                      </div>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="spec-detail__cta-card">
              <h3 className="spec-detail__sidebar-title">
                Prendre rendez-vous
              </h3>
              <p>
                {kinesList.length > 1
                  ? `Contactez-nous pour planifier votre séance avec ${kinesList.map((k) => k.prenom).join(" ou ")}.`
                  : "Contactez-nous pour planifier votre séance ou pour toute question."}
              </p>
              <Link to="/contact" className="spec-detail__cta-btn">
                <span>Nous contacter</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Spécialités liées ── */}
        <section
          className="spec-detail__related"
          aria-labelledby="related-heading"
          ref={revealRelated}
        >
          <h2 id="related-heading" className="spec-detail__h2" data-reveal>
            Autres spécialités
          </h2>
          <div className="spec-detail__related-grid" data-reveal-stagger="80">
            {autresSpecs.map((s) => {
              const SIcon = iconMap[s.icone] || Activity;
              return (
                <Link
                  to={`/specialites/${s.slug}`}
                  key={s.id}
                  className="spec-detail__related-card"
                  data-reveal
                >
                  <div className="spec-detail__related-icon" aria-hidden="true">
                    <SIcon size={22} />
                  </div>
                  <h3>{s.nom}</h3>
                  <p>{s.resume}</p>
                  <span
                    className="spec-detail__related-link"
                    aria-hidden="true"
                  >
                    Découvrir <ArrowRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
