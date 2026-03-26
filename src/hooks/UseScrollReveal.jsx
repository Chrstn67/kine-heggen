import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 *
 * Attache un IntersectionObserver sur tous les éléments [data-reveal]
 * à l'intérieur du conteneur retourné par le hook.
 *
 * Quand un élément entre dans le viewport, la classe "revealed" lui est ajoutée.
 * Les délais sont gérés via :
 *   - data-reveal-delay="Xms"  sur chaque élément (valeur fixe)
 *   - data-reveal-stagger="X"  sur le conteneur (ms entre chaque enfant, auto-calculé)
 *
 * Usage basique :
 *   const ref = useScrollReveal();
 *   <section ref={ref}>
 *     <div data-reveal>…</div>
 *   </section>
 *
 * Usage stagger automatique :
 *   const ref = useScrollReveal();
 *   <ul ref={ref} data-reveal-stagger="80">
 *     <li data-reveal>…</li>
 *     <li data-reveal>…</li>
 *   </ul>
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const { threshold = 0.12, rootMargin = "0px 0px -48px 0px" } = options;

    const targets = root.querySelectorAll("[data-reveal]");

    /* Stagger automatique si data-reveal-stagger est défini sur le conteneur */
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
            observer.unobserve(entry.target); /* animation one-shot */
          }
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
