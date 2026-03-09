import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Header />
      <main id="main-content" className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
