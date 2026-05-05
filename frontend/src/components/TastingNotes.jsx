const FLAVOR_CONFIG = [
  { key: "body", label: "Body", color: "#6F4E37", desc: "Ketebalan rasa di mulut" },
  { key: "acidity", label: "Keasaman", color: "#A68A64", desc: "Kecerahan & kesegaran" },
  { key: "sweetness", label: "Kemanisan", color: "#95d5b2", desc: "Rasa manis alami" },
  { key: "bitterness", label: "Kepahitan", color: "#2d6a4f", desc: "Intensitas pahit" },
];

// ── Sub-components ──────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <h4 style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem",
      color: "var(--color-green-700)",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      marginBottom: "0.75rem",
    }}>
      {children}
    </h4>
  );
}

function NotePill({ emoji, label, bg, border, color }) {
  return (
    <span style={{
      padding: "0.3rem 0.75rem",
      fontSize: "0.85rem",
      background: bg,
      border: `1px solid ${border}`,
      color: color,
    }}>
      {emoji} {label}
    </span>
  );
}

function IntensityBar({ label, desc, value, color }) {
  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "baseline", marginBottom: "0.4rem",
      }}>
        <div>
          <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--color-green-900)" }}>
            {label}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-sand-700)", marginLeft: "0.5rem" }}>
            {desc}
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-sand-700)" }}>
          {value}<span style={{ color: "var(--color-cream-400)" }}>/5</span>
        </span>
      </div>
      <div className="tasting-bar" style={{ height: "8px" }}>
        <div
          className="tasting-fill"
          style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────
export default function TastingNotes({ tastingNotes }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Aroma */}
      <div>
        <SectionLabel>Aroma</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {tastingNotes.aroma.map((a) => (
            <NotePill
              key={a}
              emoji="👃"
              label={a}
              bg="color-mix(in srgb, var(--color-green-200) 40%, transparent)"
              border="var(--color-green-300)"
              color="var(--color-green-800)"
            />
          ))}
        </div>
      </div>

      {/* Rasa */}
      <div>
        <SectionLabel>Profil Rasa</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {tastingNotes.rasa.map((r) => (
            <NotePill
              key={r}
              emoji="👅"
              label={r}
              bg="color-mix(in srgb, var(--color-gold-200) 40%, transparent)"
              border="color-mix(in srgb, var(--color-gold-600) 25%, transparent)"
              color="var(--color-gold-800)"
            />
          ))}
        </div>
      </div>

      {/* Aftertaste */}
      <div>
        <SectionLabel>Aftertaste</SectionLabel>
        <p style={{
          color: "var(--color-green-800)",
          fontStyle: "italic",
          fontSize: "0.9rem",
          lineHeight: 1.65,
          padding: "0.75rem 1rem",
          borderLeft: "3px solid var(--color-gold-600)",
          background: "color-mix(in srgb, var(--color-gold-100) 50%, transparent)",
        }}>
          "{tastingNotes.aftertaste}"
        </p>
      </div>

      {/* Intensitas bars */}
      <div>
        <SectionLabel>Intensitas</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {FLAVOR_CONFIG.map(({ key, label, color, desc }) => (
            <IntensityBar
              key={key}
              label={label}
              desc={desc}
              value={tastingNotes[key]}
              color={color}
            />
          ))}
        </div>
      </div>

      {/* Flavor wheel */}
      <div style={{
        padding: "1.1rem 1.25rem",
        background: "var(--color-cream-100)",
        border: "1px solid var(--color-cream-300)",
      }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--color-sand-700)",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "0.75rem",
        }}>
          Flavor Wheel
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          {[...tastingNotes.aroma, ...tastingNotes.rasa].map((note) => (
            <span key={note} style={{
              fontSize: "0.75rem",
              color: "var(--color-green-700)",
              fontFamily: "var(--font-body)",
            }}>
              ◦ {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}