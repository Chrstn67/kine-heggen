import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`scroll-top ${visible ? "scroll-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
