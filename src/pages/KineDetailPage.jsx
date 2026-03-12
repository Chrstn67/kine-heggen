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
    // ✅ <article> correct pour une fiche personne — contenu autonome et auto-descriptif
    <article className="kine-detail">
      {/*
        ✅ <header> sémantique pour le bandeau héro de la fiche :
           contient le lien retour + photo + nom + titre + email.
           <header> dans un <article> est valide et correct.
      */}
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
              {/*
                ✅ <p> pour le titre professionnel — contenu paragraphe, pas un titre
              */}
              <p className="kine-detail__titre">{kine.titre}</p>
              <p className="kine-detail__bio-courte">{kine.bioCourte}</p>
              {/*
                ✅ aria-label explicite sur le lien mailto
              */}
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
              {/*
                ✅ <ol> au lieu de <ul> pour la formation :
                   une liste de diplômes/étapes est naturellement ordonnée
                   chronologiquement — <ol> est sémantiquement plus précis.
              */}
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

            {/*
              ✅ <figure> pour encapsuler la blockquote + cite :
                 <figure> est sémantiquement conçu pour ce pattern.
                 Il remplace avantageusement le <section> qui était
                 utilisé ici juste pour le style.
            */}
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
              {/*
                ✅ <figcaption> + <cite> : pattern HTML5 recommandé
                   pour les citations avec attribution.
                   <cite> doit entourer le nom de la source.
              */}
              <figcaption>
                <cite>
                  — {kine.prenom} {kine.nom}
                </cite>
              </figcaption>
            </figure>
          </div>

          {/* ✅ <aside> déjà correct — sidebar = contenu complémentaire */}
          <aside className="kine-detail__sidebar">
            <div className="kine-detail__specs-card">
              <h3 className="kine-detail__sidebar-title">Spécialités</h3>
              {/*
                ✅ <ul>/<li> pour la liste des spécialités :
                   remplace <div class="kine-detail__specs-list">
              */}
              <ul className="kine-detail__specs-list">
                {kineSpecs.map((s) => {
                  const Icon = iconMap[s.icone] || Activity;
                  return (
                    <li key={s.id}>
                      {/*
                        ✅ aria-label sur chaque lien :
                           sans lui, le texte accessible serait
                           nom + résumé + flèche — trop verbeux.
                      */}
                      <Link
                        to={`/specialites/${s.id}`}
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

            {/*
              ✅ <aside> imbriqué remplacé par une <section> :
                 on est déjà dans un <aside> parent — deux <aside>
                 imbriqués est un anti-pattern. Une <section> avec
                 son titre h3 est plus propre.
            */}
            <section
              className="kine-detail__contact-card"
              aria-labelledby="rdv-heading"
            >
              <h3 id="rdv-heading" className="kine-detail__sidebar-title">
                Prendre rendez-vous
              </h3>
              <p>Contactez-nous pour réserver une séance avec {kine.prenom}.</p>
              <Link
                to="/kine-heggen/contact"
                className="kine-detail__contact-btn"
              >
                Nous contacter
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}
