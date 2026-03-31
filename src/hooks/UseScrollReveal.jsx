import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const { threshold = 0.12, rootMargin = "0px 0px -48px 0px" } = options;

    const targets = root.querySelectorAll("[data-reveal]");

    // ✅ Réinitialise les classes ET les styles avant de ré-observer
    targets.forEach((el) => {
      el.classList.remove("revealed");
      el.style.transitionDelay = "";
      delete el.dataset.revealDelay;
    });

    const stagger = parseInt(root.dataset.revealStagger ?? "0", 10);
    targets.forEach((el, i) => {
      if (stagger && !el.dataset.revealDelay) {
        el.dataset.revealDelay = String(i * stagger);
      }
      const delay = parseInt(el.dataset.revealDelay ?? "0", 10);
      el.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    // ✅ Check immédiat : si déjà dans le viewport, révéler sans attendre
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("revealed");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();

    // ✅ Pas de dépendances fixes : le hook se ré-exécute à chaque render
    // ce qui couvre les navigations entre spécialités
  });

  return ref;
}
