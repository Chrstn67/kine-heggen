import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Award, MapPin } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./SectionHero.css";

const IMAGES = [
  {
    src: "./images/cabinet-1.jpg",
    alt: "Devanture du cabinet",
    caption: "Entrée du cabinet",
  },
  {
    src: "./images/cabinet-2.jpg",
    alt: "Accueil du cabinet avec salle d'attente",
    caption: "Bureau d'accueil",
  },
  {
    src: "./images/cabinet-3.jpg",
    alt: "Salle du gym, équipements médicaux modernes",
    caption: "Salle de gym - Équipements",
  },
  {
    src: "./images/cabinet-4.jpg",
    alt: "Salle du gym, équipements médicaux modernes",
    caption: "Salle de gym - Équipements",
  },
  {
    src: "./images/cabinet-5.jpg",
    alt: "Une des salles de soins avec un lit de massage",
    caption: "Salle de soins - Lit de massage",
  },
];

function useAutoplay(total, delay = 4000) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const startXRef = useRef(null);

  const go = useCallback((n) => setCurrent(() => (n + total) % total), [total]);
  const prev = useCallback(() => go(current - 1), [current, go]);
  const next = useCallback(() => go(current + 1), [current, go]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    intervalRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      delay,
    );
  }, [total, delay, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const onTouchStart = (e) => {
    stopAutoplay();
    startXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startXRef.current === null) return;
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
    startXRef.current = null;
    startAutoplay();
  };

  return {
    current,
    go,
    prev,
    next,
    startAutoplay,
    stopAutoplay,
    onTouchStart,
    onTouchEnd,
  };
}

export default function SectionHero() {
  const auto = useAutoplay(IMAGES.length, 4000);

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* ── Fond ── */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="./images/hero-cabinet.jpg"
          alt=""
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__body container">
        {/* ── Contenu texte ── */}
        <div className="hero__content">
          <ul
            className="hero__badges"
            aria-label="Informations clés du cabinet"
          >
            <li className="hero__badge hero__badge--convention">
              <Award size={13} aria-hidden="true" />
              Cabinet conventionné
            </li>
            <li className="hero__badge hero__badge--location">
              <MapPin size={13} aria-hidden="true" />
              {cabinet.adresse?.ville ?? "Boersch"}
            </li>
          </ul>

          <h1 id="hero-title" className="hero__title">
            {cabinet.nom}
          </h1>
          <p className="hero__subtitle">{cabinet.slogan}</p>
          <p className="hero__description">{cabinet.description}</p>

          <div className="hero__actions">
            <Link to="/contact" className="hero__btn hero__btn--primary">
              <span>Prendre rendez-vous</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            {/* ── Lien téléphone corrigé ── */}
            <a
              href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}
              className="hero__btn hero__btn--secondary"
            >
              <Phone size={18} aria-hidden="true" />
              <span>{cabinet.telephone[0]}</span>
            </a>
          </div>
        </div>

        {/* ════════════════════════════
            GALERIE
        ════════════════════════════ */}
        <figure
          className="hero__gallery"
          aria-label="Galerie photos du cabinet"
        >
          {/* ── Focus + miniatures — desktop ── */}
          <div
            className="hero__focus"
            onMouseEnter={auto.stopAutoplay}
            onMouseLeave={auto.startAutoplay}
            onFocus={auto.stopAutoplay}
            onBlur={auto.startAutoplay}
          >
            <div
              className="hero__focus-main"
              aria-live="polite"
              aria-label={IMAGES[auto.current].alt}
            >
              <img
                key={auto.current}
                src={IMAGES[auto.current].src}
                alt={IMAGES[auto.current].alt}
                loading="eager"
                draggable="false"
              />
              <div className="hero__focus-gradient" aria-hidden="true" />
              <figcaption className="hero__focus-caption">
                {IMAGES[auto.current].caption}
              </figcaption>
              <span className="hero__focus-counter" aria-hidden="true">
                {auto.current + 1} / {IMAGES.length}
              </span>
            </div>

            <div
              className="hero__focus-thumbs"
              role="list"
              aria-label="Miniatures"
            >
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  className="hero__focus-thumb"
                  role="listitem"
                  onClick={() => {
                    auto.go(i);
                    auto.startAutoplay();
                  }}
                  aria-label={`Afficher : ${img.caption}`}
                  aria-current={i === auto.current ? "true" : undefined}
                  type="button"
                >
                  <img
                    src={img.src}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable="false"
                  />
                  <span className="hero__focus-thumb-num" aria-hidden="true">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Carousel plein écran — mobile ── */}
          <div
            className="hero__carousel"
            aria-label={`Image ${auto.current + 1} sur ${IMAGES.length}`}
            onMouseEnter={auto.stopAutoplay}
            onMouseLeave={auto.startAutoplay}
            onFocus={auto.stopAutoplay}
            onBlur={auto.startAutoplay}
          >
            <div className="hero__carousel-track-wrap">
              <div
                className="hero__carousel-track"
                style={{ transform: `translateX(-${auto.current * 100}%)` }}
                onTouchStart={auto.onTouchStart}
                onTouchEnd={auto.onTouchEnd}
              >
                {IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className="hero__carousel-slide"
                    aria-hidden={i !== auto.current}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      draggable="false"
                    />
                    <div
                      className="hero__carousel-gradient"
                      aria-hidden="true"
                    />
                    <span className="hero__carousel-caption">
                      {img.caption}
                    </span>
                  </div>
                ))}
              </div>

              <span className="hero__carousel-counter" aria-hidden="true">
                {auto.current + 1} / {IMAGES.length}
              </span>

              <button
                className="hero__carousel-btn hero__carousel-btn--prev"
                onClick={() => {
                  auto.prev();
                  auto.startAutoplay();
                }}
                aria-label="Image précédente"
                type="button"
              >
                ‹
              </button>
              <button
                className="hero__carousel-btn hero__carousel-btn--next"
                onClick={() => {
                  auto.next();
                  auto.startAutoplay();
                }}
                aria-label="Image suivante"
                type="button"
              >
                ›
              </button>
            </div>

            <ol
              className="hero__carousel-minibar"
              aria-label="Navigation par image"
            >
              {IMAGES.map((img, i) => (
                <li key={i} style={{ flex: 1 }}>
                  <button
                    className="hero__carousel-mini"
                    onClick={() => {
                      auto.go(i);
                      auto.startAutoplay();
                    }}
                    aria-label={`Aller à : ${img.caption}`}
                    aria-current={i === auto.current ? "true" : undefined}
                    type="button"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={img.src}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                      draggable="false"
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </figure>
      </div>
    </section>
  );
}
