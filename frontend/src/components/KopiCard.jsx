import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const FLAVOR_BARS = [
  { label: "Body", key: "body", color: "#6F4E37" },
  { label: "Acid", key: "acidity", color: "#A68A64" },
  { label: "Sweet", key: "sweetness", color: "#95d5b2" },
  { label: "Bitter", key: "bitterness", color: "#2d6a4f" },
];

export default function KopiCard({ kopi, delay = 0 }) {
  const { id, nama, daerah, pulau, proses, tastingNotes, emoji } = kopi;

  return (
    <Link
      to={`/kopi/${id}`}
      className="card-kopi"
      style={{
        display: "block",
        textDecoration: "none",
        animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <div style={{ padding: "1.25rem" }}>

        {/* ── Header: emoji + badge ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}>
          <div style={{
            width: "48px", height: "48px",
            background: "color-mix(in srgb, var(--color-green-200) 60%, transparent)",
            border: "1px solid var(--color-green-300)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem", flexShrink: 0,
          }}>
            {emoji}
          </div>
          <span className="badge-pulau">{pulau}</span>
        </div>

        {/* ── Name & location ── */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.2rem",
          color: "var(--color-green-900)",
          lineHeight: 1.2,
          marginBottom: "0.25rem",
        }}>
          {nama}
        </h3>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.3rem",
          color: "var(--color-sand-700)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.04em",
          marginBottom: "0.9rem",
        }}>
          <MapPin size={10} />
          <span>{daerah}</span>
        </div>

        {/* ── Process tag ── */}
        <span style={{
          display: "inline-block",
          fontSize: "0.58rem",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.18rem 0.55rem",
          background: "color-mix(in srgb, var(--color-gold-200) 50%, transparent)",
          color: "var(--color-gold-800)",
          border: "1px solid color-mix(in srgb, var(--color-gold-600) 25%, transparent)",
          marginBottom: "0.9rem",
        }}>
          {proses.split(" ")[0]} Process
        </span>

        {/* ── Tasting note tags ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "1rem" }}>
          {tastingNotes.rasa.slice(0, 3).map((note) => (
            <span key={note} style={{
              fontSize: "0.65rem",
              padding: "0.18rem 0.5rem",
              background: "var(--color-sand-200)",
              color: "var(--color-sand-900)",
              border: "1px solid var(--color-cream-300)",
              fontFamily: "var(--font-body)",
            }}>
              {note}
            </span>
          ))}
        </div>

        {/* ── Flavor bars ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.6rem 1rem",
          marginBottom: "1.1rem",
        }}>
          {FLAVOR_BARS.map(({ label, key, color }) => (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.56rem",
                  color: "var(--color-sand-700)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.56rem",
                  color: "var(--color-sand-700)",
                }}>
                  {tastingNotes[key]}
                </span>
              </div>
              <div className="tasting-bar">
                <div
                  className="tasting-fill"
                  style={{ width: `${(tastingNotes[key] / 5) * 100}%`, backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA row ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0.85rem",
          borderTop: "1px solid var(--color-cream-300)",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-gold-700)",
          }}>
            Lihat Profil
          </span>
          <span style={{ color: "var(--color-gold-700)", fontSize: "0.85rem" }}>→</span>
        </div>
      </div>
    </Link>
  );
}