import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SpecialitesPage from "./pages/SpecialitesPage.jsx";
import SpecialiteDetailPage from "./pages/SpecialiteDetailPage.jsx";
import EquipePage from "./pages/EquipePage.jsx";
import KineDetailPage from "./pages/KineDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

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
        <Route path="/kine-heggen/equipe/:id" element={<KineDetailPage />} />
        <Route path="/kine-heggen/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
