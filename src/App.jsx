import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SpecialitesPage from "./pages/SpecialitesPage.jsx";
import SpecialiteDetailPage from "./pages/SpecialiteDetailPage.jsx";
import EquipePage from "./pages/EquipePage.jsx";
import KineDetailPage from "./pages/KineDetailPage.jsx";
import BodyMap from "./pages/BodyMap.jsx";
import TarifsGeneraux from "./pages/Tarifs.jsx";
import ContactPage from "./pages/ContactPage.jsx";

/*
  ℹ️  Vite sert le projet depuis la base "/kine-heggen/" (vite.config.js).
      HashRouter gère la navigation côté client après le #.
      Les routes ne doivent donc PAS répéter "/kine-heggen/" :
        ✅  http://localhost:5173/kine-heggen/#/equipe/johan-heggen
        ❌  http://localhost:5173/kine-heggen/#/kine-heggen/equipe/johan-heggen
*/
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tarifs-generaux" element={<TarifsGeneraux />} />
        <Route path="/specialites" element={<SpecialitesPage />} />
        <Route path="/specialites/:id" element={<SpecialiteDetailPage />} />
        <Route path="/equipe" element={<EquipePage />} />
        <Route path="/equipe/:slug" element={<KineDetailPage />} />
        <Route path="/body-map" element={<BodyMap />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Catch-all : toute URL inconnue ramène à l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
