import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Peta from "./pages/Peta";
import Koleksi from "./pages/Koleksi";
import Tentang from "./pages/Tentang";
import DetailKopi from "./pages/DetailKopi";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
            {/* Redirect / → /beranda */}
          <Route path="/" element={<Navigate to="/beranda" replace />} />

          {/* ── STATIS 1: Home ─────────────────── */}
          <Route path="/beranda" element={<Home />} />

          {/* ── STATIS 2: Peta ─────────────────── */}
          <Route path="/peta" element={<Peta />} />

          {/* ── STATIS 3: Koleksi ──────────────── */}
          <Route path="/koleksi" element={<Koleksi />} />

          {/* ── STATIS 4: Tentang ──────────────── */}
          <Route path="/tentang" element={<Tentang />} />

          {/* ── DINAMIS: Detail Kopi by ID ──────── */}
          <Route path="/kopi/:id" element={<DetailKopi />} />

          {/* ── 404 ────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}