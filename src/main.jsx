import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*
      ✅ HashRouter au lieu de BrowserRouter :
         Sur GitHub Pages (ou tout hébergeur statique sans config serveur),
         BrowserRouter provoque une 404 au rafraîchissement car le serveur
         cherche un fichier physique à l'URL demandée — qui n'existe pas.

         HashRouter préfixe toutes les URLs d'un # :
         → https://user.github.io/kine-heggen/#/kine-heggen/equipe/johan-heggen
         Le fragment (#...) n'est jamais envoyé au serveur :
         le serveur reçoit toujours "/" et sert index.html,
         puis React Router lit le hash côté client.

         Inconvénient mineur : le # dans l'URL est moins "propre" visuellement,
         mais sans impact SEO réel pour un site GitHub Pages
         (Google indexe les hash routes correctement depuis 2015).
    */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
