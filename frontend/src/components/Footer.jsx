import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { to: "/beranda", label: "Beranda" },
  { to: "/koleksi", label: "Koleksi" },
  { to: "/peta",    label: "Peta" },
  { to: "/tentang", label: "Tentang" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "var(--color-green-900)",
      borderTop: "1px solid color-mix(in srgb, var(--color-green-800) 60%, transparent)",
      marginTop: "5rem",
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>

        {/* ── Top row ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "start",
          marginBottom: "2.5rem",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "28px", height: "28px",
                border: "1px solid color-mix(in srgb, var(--color-gold-600) 50%, transparent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem",
                background: "color-mix(in srgb, var(--color-gold-600) 15%, transparent)",
              }}>☕</div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-sand-200)",
              }}>
                Atlas Kopi Nusantara
              </p>
            </div>
            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-green-400)",
              fontSize: "0.83rem",
              lineHeight: 1.65,
              maxWidth: "300px",
            }}>
              Dokumentasi & eksplorasi kopi Indonesia. Memetakan setiap cangkir,
              satu daerah di satu waktu.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-end" }}>
            {FOOTER_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-green-500)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "var(--color-sand-200)"}
                onMouseLeave={e => e.target.style.color = "var(--color-green-500)"}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          paddingTop: "1.5rem",
          borderTop: "1px solid color-mix(in srgb, var(--color-green-800) 80%, transparent)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.08em",
            color: "var(--color-green-600)",
          }}>
            © 2026 ATLAS KOPI NUSANTARA
          </p>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.06em",
            color: "var(--color-green-700)",
          }}>
            DIBUAT DENGAN ☕ & KECINTAAN PADA KOPI INDONESIA
          </p>
        </div>
      </div>
    </footer>
  );
}