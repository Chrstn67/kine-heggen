import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  GraduationCap,
  Quote,
  Bone,
  Hand,
  Activity,
  Wind,
  Shield,
  Baby,
} from "lucide-react";
import { kines } from "../data/kines.js";
import { specialites } from "../data/specialites.js";
import "./KineDetailPage.css";

const iconMap = {
  bone: Bone,
  hand: Hand,
  activity: Activity,
  wind: Wind,
  shield: Shield,
  baby: Baby,
};

export default function KineDetailPage() {
  const { id } = useParams();
  const kine = kines.find((k) => k.id === id);

  if (!kine) return <Navigate to="/equipe" replace />;

  const kineSpecs = specialites.filter((s) => kine.specialites.includes(s.id));

  return (
    <article className="kine-detail">
      <div className="kine-detail__top">
        <div className="kine-detail__top-inner container">
          <Link to="/equipe" className="kine-detail__back">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>{"Retour à l'équipe"}</span>
          </Link>

          <div className="kine-detail__hero">
            <div className="kine-detail__photo">
              <img
                src={kine.photo}
                alt={`${kine.prenom} ${kine.nom}, ${kine.titre}`}
              />
            </div>
            <div className="kine-detail__hero-info">
              <h1 className="kine-detail__name">
                {kine.prenom} {kine.nom}
              </h1>
              <p className="kine-detail__titre">{kine.titre}</p>
              <p className="kine-detail__bio-courte">{kine.bioCourte}</p>
              <a
                href={`mailto:${kine.email}`}
                className="kine-detail__email-btn"
              >
                <Mail size={16} aria-hidden="true" />
                <span>{kine.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="kine-detail__body container">
        <div className="kine-detail__grid">
          <div className="kine-detail__main">
            <section aria-labelledby="parcours-heading">
              <h2 id="parcours-heading" className="kine-detail__h2">
                Parcours
              </h2>
              <p className="kine-detail__text">{kine.bioComplete}</p>
            </section>

            <section aria-labelledby="formation-heading">
              <h2 id="formation-heading" className="kine-detail__h2">
                <GraduationCap size={22} aria-hidden="true" />
                <span>Formation</span>
              </h2>
              <ul className="kine-detail__formation">
                {kine.formation.map((f, i) => (
                  <li key={i}>
                    <span
                      className="kine-detail__formation-dot"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="kine-detail__quote"
              aria-labelledby="approche-heading"
            >
              <h2 id="approche-heading" className="sr-only">
                Mon approche
              </h2>
              <Quote
                size={32}
                className="kine-detail__quote-icon"
                aria-hidden="true"
              />
              <blockquote>{kine.approche}</blockquote>
              <cite>
                — {kine.prenom} {kine.nom}
              </cite>
            </section>
          </div>

          <aside className="kine-detail__sidebar">
            <div className="kine-detail__specs-card">
              <h3 className="kine-detail__sidebar-title">Spécialités</h3>
              <div className="kine-detail__specs-list">
                {kineSpecs.map((s) => {
                  const Icon = iconMap[s.icone] || Activity;
                  return (
                    <Link
                      to={`/specialites/${s.id}`}
                      key={s.id}
                      className="kine-detail__spec-item"
                    >
                      <div
                        className="kine-detail__spec-icon"
                        aria-hidden="true"
                      >
                        <Icon size={20} />
                      </div>
                      <div className="kine-detail__spec-info">
                        <strong>{s.nom}</strong>
                        <span>{s.resume}</span>
                      </div>
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="kine-detail__spec-arrow"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="kine-detail__contact-card">
              <h3 className="kine-detail__sidebar-title">
                Prendre rendez-vous
              </h3>
              <p>Contactez-nous pour réserver une séance avec {kine.prenom}.</p>
              <Link
                to="/kine-heggen/contact"
                className="kine-detail__contact-btn"
              >
                Nous contacter
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
