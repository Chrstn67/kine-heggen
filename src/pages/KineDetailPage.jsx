import { useParams, Link, Navigate } from "react-router-dom";
import { useRef, useEffect } from "react";
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
  Instagram,
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
  const { slug } = useParams();
  const specsCardRef = useRef(null);
  const kine = kines.find((k) => k.slug === slug);

  if (!kine) return <Navigate to="/equipe" replace />;

  // Trouver les spécialités où l'ID du kiné est présent dans kineIds
  const kineSpecs = specialites.filter(
    (s) => s.kineIds && Array.isArray(s.kineIds) && s.kineIds.includes(kine.id),
  );

  // Vérifier si le contenu dépasse pour ajouter la classe de scroll
  useEffect(() => {
    const checkScroll = () => {
      const specsList = specsCardRef.current?.querySelector(
        ".kine-detail__specs-list",
      );
      const card = specsCardRef.current;
      if (specsList && card) {
        const hasScroll = specsList.scrollHeight > specsList.clientHeight;
        if (hasScroll) {
          card.classList.add("has-scroll");
        } else {
          card.classList.remove("has-scroll");
        }
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [kineSpecs]);

  return (
    <article className="kine-detail">
      <header className="kine-detail__top">
        <div className="kine-detail__top-inner container">
          <Link to="/equipe" className="kine-detail__back">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Retour à l'équipe</span>
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

              <div className="kine-detail__hero-links">
                <a
                  href={`mailto:${kine.email}`}
                  className="kine-detail__email-btn"
                  aria-label={`Envoyer un e-mail à ${kine.prenom} ${kine.nom} : ${kine.email}`}
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>{kine.email}</span>
                </a>

                {kine.compteInstagram && (
                  <a
                    href={`https://instagram.com/${kine.compteInstagram.replace("@", "")}`}
                    className="kine-detail__email-btn kine-detail__instagram-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram de ${kine.prenom} : ${kine.compteInstagram}`}
                  >
                    <Instagram size={16} aria-hidden="true" />
                    <span>{kine.compteInstagram}</span>
                  </a>
                )}
              </div>
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
              <div
                className="kine-detail__text"
                dangerouslySetInnerHTML={{ __html: kine.bioComplete }}
              />
            </section>

            <section aria-labelledby="formation-heading">
              <h2 id="formation-heading" className="kine-detail__h2">
                <GraduationCap size={22} aria-hidden="true" />
                <span>Formation</span>
              </h2>
              <ol className="kine-detail__formation">
                {kine.formation?.map((f, i) => (
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
            <div className="kine-detail__specs-card" ref={specsCardRef}>
              <h3 className="kine-detail__sidebar-title">Spécialités</h3>
              {kineSpecs.length > 0 ? (
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
              ) : (
                <p className="kine-detail__no-specs">
                  Aucune spécialité renseignée pour le moment.
                </p>
              )}
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
