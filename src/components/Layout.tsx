import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThreeBackground from "./ThreeBackground";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily disable smooth scroll so navigation jumps to top instantly
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // Re-enable smooth scroll for in-page anchor links
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    });
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <ThreeBackground />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
