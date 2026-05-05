import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, Mountain, FlaskConical, Heart,
  ArrowLeft, BookOpen, Coffee, Globe, Leaf,
} from "lucide-react";
import useKopiStore from "../store/useKopiStore";
import TastingNotes from "../components/TastingNotes";
import KopiCard from "../components/KopiCard";

const TABS = [
  { id: "profil",  label: "Profil",         icon: BookOpen },
  { id: "tasting", label: "Tasting Notes",  icon: Coffee },
  { id: "origin",  label: "Asal & Sejarah", icon: Globe },
];

const BAR_COLORS = {
  body:       "#6F4E37",
  acidity:    "#A68A64",
  sweetness:  "#95d5b2",
  bitterness: "#2d6a4f",
};

// ── Sub-components ──────────────────────────────────────────────

function LoadingState() {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 2s ease-in-out infinite" }}>☕</div>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.78rem",
        color: "var(--color-sand-700)", letterSpacing: "0.12em",
      }}>
        Menyeduh data kopi...
      </p>
    </div>
  );
}

function ErrorState({ error, id }) {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
      <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "1.8rem",
        color: "var(--color-green-900)", marginBottom: "0.75rem",
      }}>
        {error}
      </h2>
      <p style={{ color: "var(--color-sand-700)", marginBottom: "2rem" }}>
        ID kopi{" "}
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold-700)" }}>
          "{id}"
        </span>{" "}
        tidak ditemukan.
      </p>
      <Link to="/koleksi" className="btn-primary">Kembali ke Koleksi</Link>
    </div>
  );
}

function FlavorBar({ label, value, color }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.62rem",
          color: "var(--color-sand-700)",
          textTransform: "capitalize", letterSpacing: "0.08em",
        }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-sand-700)" }}>
          {value}/5
        </span>
      </div>
      <div className="tasting-bar" style={{ height: "6px" }}>
        <div className="tasting-fill" style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────

export default function DetailKopi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedKopi   = useKopiStore((s) => s.selectedKopi);
  const isLoading      = useKopiStore((s) => s.isLoading);
  const error          = useKopiStore((s) => s.error);
  const activeTab      = useKopiStore((s) => s.activeTab);
  const setActiveTab   = useKopiStore((s) => s.setActiveTab);
  const toggleFavorite = useKopiStore((s) => s.toggleFavorite);
  const isFavorite     = useKopiStore((s) => s.isFavorite);

  useEffect(() => {
    useKopiStore.getState().fetchKopiById(id);
    return () => useKopiStore.getState().resetDetail();
  }, [id]);

  if (isLoading) return <LoadingState />;
  if (error)     return <ErrorState error={error} id={id} />;
  if (!selectedKopi) return null;

  const kopi = selectedKopi;
  const fav  = isFavorite(kopi.id);

  return (
    <div className="page-enter">

      {/* ── Top accent line ── */}
      <div style={{
        height: "3px",
        background: "linear-gradient(90deg, var(--color-gold-600), var(--color-green-600) 60%, transparent)",
      }} />

      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* ── Breadcrumb ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          color: "var(--color-sand-700)", marginBottom: "2.5rem",
          letterSpacing: "0.04em",
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: "none", border: "none", cursor: "pointer",
              color: "var(--color-sand-700)", fontFamily: "var(--font-mono)",
              fontSize: "0.68rem", transition: "color 0.2s", padding: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-green-900)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-sand-700)"}
          >
            <ArrowLeft size={13} /> Kembali
          </button>
          <span>/</span>
          <Link
            to="/koleksi"
            style={{ color: "var(--color-sand-700)", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-green-900)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-sand-700)"}
          >
            Koleksi
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-gold-700)" }}>{kopi.nama}</span>
        </div>

        {/* ── Hero header ── */}
        <div style={{
          display: "flex", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap",
        }}>
          {/* Emoji box */}
          <div style={{
            width: "110px", height: "110px", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3.2rem",
            background: "color-mix(in srgb, var(--color-green-200) 50%, transparent)",
            border: "1px solid var(--color-green-300)",
            position: "relative",
          }}>
            {kopi.emoji}
            <span style={{ position:"absolute",top:"-1px",left:"-1px",width:"10px",height:"10px",borderTop:"1px solid var(--color-gold-600)",borderLeft:"1px solid var(--color-gold-600)" }} />
            <span style={{ position:"absolute",bottom:"-1px",right:"-1px",width:"10px",height:"10px",borderBottom:"1px solid var(--color-gold-600)",borderRight:"1px solid var(--color-gold-600)" }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span className="badge-pulau" style={{ display: "inline-block", marginBottom: "0.6rem" }}>
                  {kopi.pulau}
                </span>
                <h1 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  color: "var(--color-green-900)",
                  lineHeight: 1.05,
                  marginBottom: "0.4rem",
                }}>
                  {kopi.nama}
                </h1>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  color: "var(--color-sand-700)",
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                }}>
                  <MapPin size={12} /> <span>{kopi.daerah}</span>
                </div>
              </div>

              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(kopi.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: fav
                    ? "color-mix(in srgb, #dc2626 10%, transparent)"
                    : "transparent",
                  border: fav
                    ? "1px solid rgba(220,38,38,0.3)"
                    : "1px solid var(--color-cream-300)",
                  color: fav ? "#dc2626" : "var(--color-sand-700)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.06em",
                }}
              >
                <Heart size={14} fill={fav ? "currentColor" : "none"} />
                {fav ? "Disimpan" : "Simpan"}
              </button>
            </div>

            {/* Quick stats */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "1.1rem" }}>
              {[
                { icon: Mountain,     label: "Ketinggian", val: kopi.ketinggian },
                { icon: FlaskConical, label: "Proses",     val: kopi.proses },
                { icon: Leaf,         label: "Varietas",   val: kopi.varietas },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem" }}>
                  <Icon size={13} style={{ color: "var(--color-green-700)" }} />
                  <span style={{ color: "var(--color-sand-700)" }}>{label}:</span>
                  <span style={{ color: "var(--color-green-900)", fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab navigation ── */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--color-cream-300)",
          marginBottom: "2.5rem",
        }}>
          {TABS.map(({ id: tabId, label, icon: Icon }) => (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.7rem 1.4rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 500,
                background: "none",
                border: "none",
                borderBottom: activeTab === tabId
                  ? "2px solid var(--color-gold-600)"
                  : "2px solid transparent",
                color: activeTab === tabId
                  ? "var(--color-green-900)"
                  : "var(--color-sand-700)",
                cursor: "pointer",
                transition: "all 0.2s",
                marginBottom: "-1px",
              }}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div style={{ minHeight: "300px" }}>

          {/* TAB: Profil */}
          {activeTab === "profil" && (
            <div style={{ animation: "fadeIn 0.4s ease forwards" }}>
              <p style={{
                color: "var(--color-green-800)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                maxWidth: "42rem",
                marginBottom: "2.5rem",
              }}>
                {kopi.deskripsi}
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1rem",
                maxWidth: "30rem",
              }}>
                {Object.entries(BAR_COLORS).map(([key, color]) => (
                  <FlavorBar
                    key={key}
                    label={key}
                    value={kopi.tastingNotes[key]}
                    color={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB: Tasting Notes */}
          {activeTab === "tasting" && (
            <div style={{ animation: "fadeIn 0.4s ease forwards", maxWidth: "40rem" }}>
              <TastingNotes tastingNotes={kopi.tastingNotes} />
            </div>
          )}

          {/* TAB: Asal & Sejarah */}
          {activeTab === "origin" && (
            <div style={{ animation: "fadeIn 0.4s ease forwards", maxWidth: "42rem" }}>
              <div style={{
                padding: "1.5rem",
                background: "color-mix(in srgb, var(--color-green-200) 30%, transparent)",
                border: "1px solid var(--color-green-300)",
                borderLeft: "3px solid var(--color-green-700)",
                marginBottom: "2rem",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.3rem",
                  fontWeight: 700, color: "var(--color-green-900)", marginBottom: "0.75rem",
                }}>
                  📍 {kopi.daerah}, {kopi.pulau}
                </h3>
                <p style={{ color: "var(--color-green-800)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  {kopi.deskripsi}
                </p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.3rem",
                  fontWeight: 700, color: "var(--color-green-900)", marginBottom: "0.75rem",
                }}>
                  📜 Sejarah
                </h3>
                <p style={{ color: "var(--color-green-800)", lineHeight: 1.8, fontSize: "0.9rem" }}>
                  {kopi.sejarah}
                </p>
              </div>

              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                color: "var(--color-sand-700)",
                border: "1px solid var(--color-cream-300)",
                padding: "0.75rem 1rem",
                background: "var(--color-cream-100)",
              }}>
                📡 Koordinat: {kopi.koordinat.lat}°, {kopi.koordinat.lng}°
              </div>
            </div>
          )}
        </div>

        {/* ── Related kopi ── */}
        {kopi.terkait?.length > 0 && (
          <section style={{
            marginTop: "5rem",
            paddingTop: "3rem",
            borderTop: "1px solid var(--color-cream-300)",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-green-900)",
              marginBottom: "1.75rem",
            }}>
              Kopi Lain dari {kopi.pulau}
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}>
              {kopi.terkait.map((k) => (
                <KopiCard key={k.id} kopi={k} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}