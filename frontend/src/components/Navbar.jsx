import { NavLink, Link } from "react-router-dom";
import { Map, BookOpen, Info, Home, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { to: "/beranda", label: "Beranda", icon: Home, end: true },
  { to: "/peta", label: "Peta", icon: Map },
  { to: "/koleksi", label: "Koleksi", icon: BookOpen },
  { to: "/tentang", label: "Tentang", icon: Info },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    transition: "all 0.3s",
    backgroundColor: scrolled
      ? "color-mix(in srgb, var(--color-green-900) 95%, transparent)"
      : "var(--color-green-900)",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled
      ? "1px solid color-mix(in srgb, var(--color-gold-600) 20%, transparent)"
      : "1px solid color-mix(in srgb, var(--color-green-800) 60%, transparent)",
  };

  return (
    <header style={navStyle}>
      <div style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "0 1.5rem",
        height: "4.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "34px", height: "34px",
              border: "1px solid color-mix(in srgb, var(--color-gold-600) 50%, transparent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
              background: "color-mix(in srgb, var(--color-gold-600) 15%, transparent)",
              position: "relative",
            }}>☕<span style={{ position:"absolute",top:"-2px",left:"-2px",width:"6px",height:"6px",borderTop:"1px solid var(--color-gold-600)",borderLeft:"1px solid var(--color-gold-600)" }} /><span style={{ position:"absolute",bottom:"-2px",right:"-2px",width:"6px",height:"6px",borderBottom:"1px solid var(--color-gold-600)",borderRight:"1px solid var(--color-gold-600)" }} />
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "var(--color-sand-200)",
                lineHeight: 1.1,
              }}>Atlas Kopi</p>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                color: "var(--color-gold-600)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}>Nusantara</p>
            </div>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 1rem",
                fontSize: "0.78rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s",
                color: isActive ? "var(--color-sand-50)" : "var(--color-sand-500)",
                borderBottom: isActive
                  ? "1px solid var(--color-gold-600)"
                  : "1px solid transparent",
              })}>
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Mobile toggle ── */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "1px solid color-mix(in srgb, var(--color-sand-500) 40%, transparent)",
            borderRadius: "2px",
            color: "var(--color-sand-200)",
            cursor: "pointer",
            padding: "0.4rem",
            display: "none",
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{
          borderTop: "1px solid color-mix(in srgb, var(--color-gold-600) 15%, transparent)",
          backgroundColor: "var(--color-green-900)",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}>
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                padding: "0.75rem 0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isActive ? "var(--color-gold-400)" : "var(--color-sand-500)",
                borderBottom: "1px solid color-mix(in srgb, var(--color-green-800) 80%, transparent)",
                transition: "color 0.2s",
              })}>{label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        .nav-mobile-btn { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}