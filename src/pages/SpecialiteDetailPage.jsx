import { useParams, Link, Navigate } from "react-router-dom";
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
  // Recherche par slug
  const spec = specialites.find((s) => s.slug === id);

  if (!spec) return <Navigate to="/specialites" replace />;

  // Gestion du cas où kineIds est un tableau
  const kineIds = Array.isArray(spec.kineIds) ? spec.kineIds : [spec.kineIds];
  const kinesList = kines.filter((k) => kineIds.includes(k.id));
  const Icon = iconMap[spec.icone] || Activity;

  const autresSpecs = specialites.filter((s) => s.slug !== id).slice(0, 3);

  return (
    <article className="spec-detail">
      <div className="spec-detail__top">
        <div className="spec-detail__top-inner container">
          <Link to="/specialites" className="spec-detail__back">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Toutes les spécialités</span>
          </Link>
          <div className="spec-detail__icon-wrap" aria-hidden="true">
            <Icon size={32} />
          </div>
          <h1 className="spec-detail__title">{spec.nom}</h1>
          <p className="spec-detail__intro">{spec.description}</p>
        </div>
      </div>

      <div className="spec-detail__body container">
        <div className="spec-detail__grid">
          <div className="spec-detail__main">
            <section aria-labelledby="contenu-heading">
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

            <section aria-labelledby="pourqui-heading">
              <h2 id="pourqui-heading" className="spec-detail__h2">
                Pour qui ?
              </h2>
              <p className="spec-detail__text">{spec.pourQui}</p>
            </section>

            <section aria-labelledby="bienfaits-heading">
              <h2 id="bienfaits-heading" className="spec-detail__h2">
                Les bienfaits
              </h2>
              <div className="spec-detail__bienfaits">
                {spec.bienfaits.map((b, i) => (
                  <div key={i} className="spec-detail__bienfait">
                    <Check size={16} aria-hidden="true" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="spec-detail__sidebar">
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
                      <img
                        src={kine.photo}
                        alt={`${kine.prenom} ${kine.nom}`}
                        className="spec-detail__kine-photo"
                        loading="lazy"
                      />
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
                Nous contacter
              </Link>
            </div>
          </aside>
        </div>

        <section
          className="spec-detail__related"
          aria-labelledby="related-heading"
        >
          <h2 id="related-heading" className="spec-detail__h2">
            Autres spécialités
          </h2>
          <div className="spec-detail__related-grid">
            {autresSpecs.map((s) => {
              const SIcon = iconMap[s.icone] || Activity;
              return (
                <Link
                  to={`/specialites/${s.slug}`}
                  key={s.id}
                  className="spec-detail__related-card"
                >
                  <div className="spec-detail__related-icon" aria-hidden="true">
                    <SIcon size={22} />
                  </div>
                  <h3>{s.nom}</h3>
                  <p>{s.resume}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
