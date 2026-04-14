import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
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
  X,
  ChevronLeft,
  ChevronRight,
  Images,
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

/* ════════════════════════════════════
   Lightbox
════════════════════════════════════ */
function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  /* Navigation clavier */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const img = images[index];

  return (
    <div
      className="spec-lb"
      role="dialog"
      aria-modal="true"
      aria-label={`Visionneuse — ${img.alt}`}
      onClick={onClose}
    >
      <div className="spec-lb__inner" onClick={(e) => e.stopPropagation()}>
        {/* Barre haute */}
        <div className="spec-lb__bar">
          <span className="spec-lb__counter" aria-live="polite">
            {index + 1} / {images.length}
          </span>
          {img.caption && (
            <span className="spec-lb__caption">{img.caption}</span>
          )}
          <button
            className="spec-lb__close"
            onClick={onClose}
            aria-label="Fermer la visionneuse"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image */}
        <div className="spec-lb__img-wrap">
          <img
            src={img.src}
            alt={img.alt}
            className="spec-lb__img"
            draggable="false"
          />
        </div>

        {/* Navigation — uniquement si plusieurs images */}
        {images.length > 1 && (
          <>
            <button
              className="spec-lb__nav spec-lb__nav--prev"
              onClick={prev}
              aria-label="Image précédente"
              type="button"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="spec-lb__nav spec-lb__nav--next"
              onClick={next}
              aria-label="Image suivante"
              type="button"
            >
              <ChevronRight size={24} />
            </button>

            {/* Points */}
            <ol className="spec-lb__dots" aria-label="Navigation par image">
              {images.map((_, i) => (
                <li key={i}>
                  <button
                    className="spec-lb__dot"
                    onClick={() => setIndex(i)}
                    aria-label={`Image ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    type="button"
                  />
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   Grille d'images inline
════════════════════════════════════ */
function SpecGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="spec-gallery" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="spec-detail__h2">
        <Images size={20} aria-hidden="true" />
        En images
      </h2>

      <ul
        className={`spec-gallery__grid spec-gallery__grid--${Math.min(images.length, 3)}`}
        aria-label={`${images.length} photo${images.length > 1 ? "s" : ""}`}
      >
        {images.map((img, i) => (
          <li key={i}>
            <button
              className="spec-gallery__item"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Agrandir : ${img.alt}`}
              type="button"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                draggable="false"
              />
              {img.caption && (
                <span className="spec-gallery__item-caption">
                  {img.caption}
                </span>
              )}
              <span className="spec-gallery__item-hint" aria-hidden="true">
                <ChevronRight size={14} />
                Agrandir
              </span>
            </button>
          </li>
        ))}
      </ul>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

/* ════════════════════════════════════
   Page principale
════════════════════════════════════ */
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
          <p className="spec-detail__intro">
            {spec.description || spec.resume}
          </p>

          <div className="spec-detail__meta-badges" aria-hidden="true">
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
              {Array.isArray(spec.pourQui) ? (
                <ul className="spec-detail__list">
                  {spec.pourQui.map((item, i) => (
                    <li key={i}>
                      <Check size={18} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="spec-detail__text">{spec.pourQui}</p>
              )}
            </section>

            {/* ── Galerie photos ── */}
            {spec.images && spec.images.length > 0 && (
              <SpecGallery images={spec.images} />
            )}

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
