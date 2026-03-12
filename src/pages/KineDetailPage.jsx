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
  // ✅ "slug" correspond au paramètre :slug défini dans App.jsx
  const { slug } = useParams();

  // ✅ Recherche par kine.slug (ex: "johan-heggen"), pas par kine.id
  const kine = kines.find((k) => k.slug === slug);

  if (!kine) return <Navigate to="/equipe" replace />;

  const kineSpecs = specialites.filter((s) => kine.specialites.includes(s.id));

  return (
    <article className="kine-detail">
      <header className="kine-detail__top">
        <div className="kine-detail__top-inner container">
          <Link to="/equipe" className="kine-detail__back">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>{"Retour à l'équipe"}</span>
          </Link>

          <div className="kine-detail__hero">
            <div className="kine-detail__photo">
              <img
                src={kine.photo}
                alt={`Photo de ${kine.prenom} ${kine.nom}, ${kine.titre}`}
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
                aria-label={`Envoyer un e-mail à ${kine.prenom} ${kine.nom} : ${kine.email}`}
              >
                <Mail size={16} aria-hidden="true" />
                <span aria-hidden="true">{kine.email}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

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
              <ol className="kine-detail__formation">
                {kine.formation.map((f, i) => (
                  <li key={i}>
                    <span
                      className="kine-detail__formation-dot"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ol>
            </section>

            <figure
              className="kine-detail__quote"
              aria-label={`Citation de ${kine.prenom} ${kine.nom}`}
            >
              <Quote
                size={32}
                className="kine-detail__quote-icon"
                aria-hidden="true"
              />
              <blockquote className="kine-detail__quote-text">
                <p>{kine.approche}</p>
              </blockquote>
              <figcaption>
                <cite>
                  — {kine.prenom} {kine.nom}
                </cite>
              </figcaption>
            </figure>
          </div>

          <aside className="kine-detail__sidebar">
            <div className="kine-detail__specs-card">
              <h3 className="kine-detail__sidebar-title">Spécialités</h3>
              <ul className="kine-detail__specs-list">
                {kineSpecs.map((s) => {
                  const Icon = iconMap[s.icone] || Activity;
                  return (
                    <li key={s.id}>
                      <Link
                        to={`/specialites/${s.slug}`}
                        className="kine-detail__spec-item"
                        aria-label={`En savoir plus sur ${s.nom}`}
                      >
                        <div
                          className="kine-detail__spec-icon"
                          aria-hidden="true"
                        >
                          <Icon size={20} aria-hidden="true" />
                        </div>
                        <div className="kine-detail__spec-info">
                          <strong>{s.nom}</strong>
                          <span aria-hidden="true">{s.resume}</span>
                        </div>
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="kine-detail__spec-arrow"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <section
              className="kine-detail__contact-card"
              aria-labelledby="rdv-heading"
            >
              <h3 id="rdv-heading" className="kine-detail__sidebar-title">
                Prendre rendez-vous
              </h3>
              <p>Contactez-nous pour réserver une séance avec {kine.prenom}.</p>
              <Link to="/contact" className="kine-detail__contact-btn">
                Nous contacter
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}
