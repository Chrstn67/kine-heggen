import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SpecialitesPage from "./pages/SpecialitesPage.jsx";
import SpecialiteDetailPage from "./pages/SpecialiteDetailPage.jsx";
import EquipePage from "./pages/EquipePage.jsx";
import KineDetailPage from "./pages/KineDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

/*
  ℹ️  HashRouter est déclaré dans main.jsx — App.jsx ne change pas.
     Les routes restent identiques : React Router les résout
     sur la partie de l'URL après le #.
     Ex : /#/kine-heggen/equipe/johan-heggen
           → hash ignoré par le serveur
           → React Router lit /kine-heggen/equipe/johan-heggen
           → affiche KineDetailPage
*/
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/kine-heggen/" element={<HomePage />} />
        <Route path="/kine-heggen/specialites" element={<SpecialitesPage />} />
        <Route
          path="/kine-heggen/specialites/:id"
          element={<SpecialiteDetailPage />}
        />
        <Route path="/kine-heggen/equipe" element={<EquipePage />} />
        {/*
          ✅ :slug — paramètre textuel SEO-friendly :
             "justine-hoffmann-heggen" ou "johan-heggen"
        */}
        <Route path="/kine-heggen/equipe/:slug" element={<KineDetailPage />} />
        <Route path="/kine-heggen/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
