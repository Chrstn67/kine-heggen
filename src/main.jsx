import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

/*
  ✅ HashRouter au lieu de BrowserRouter :
     Les URLs deviennent /#/kine-heggen/equipe/johan-heggen
     Le serveur ne voit que "/" et renvoie toujours index.html —
     la partie après # est gérée entièrement par le navigateur.
     Indispensable sur GitHub Pages ou tout hébergement statique
     qui ne permet pas de configurer un fallback vers index.html.
*/
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
