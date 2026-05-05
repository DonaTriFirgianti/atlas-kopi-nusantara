import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllKopi, getStats } from "../api/kopiApi";
import KopiCard from "../components/KopiCard";
import { ArrowRight, Map, BookOpen, ChevronDown } from "lucide-react";

const STAT_ITEMS = [
  { key: "totalKopi", label: "Varietas Kopi" },
  { key: "totalPulau", label: "Pulau Penghasil" },
  { key: null, val: "1699", label: "Tahun Pertama Tanam" },
  { key: null, val: "60%", label: "Share Ekspor Global" },
];

export default function Home() {
  const [featuredKopi, setFeaturedKopi] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllKopi(), getStats()])
      .then(([kopiRes, statsRes]) => {
        setFeaturedKopi(kopiRes.data.slice(0, 3));
        setStats(statsRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter">

      {/* Hero */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, var(--color-green-900) 0%, #2d4a38 100%)",
        padding: "5rem 1.5rem 0",
        overflow: "hidden",
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
        }} />

        {/* Decorative rings */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          border: "1px solid color-mix(in srgb, var(--color-gold-600) 15%, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "60px", right: "60px",
          width: "180px", height: "180px", borderRadius: "50%",
          border: "1px solid color-mix(in srgb, var(--color-gold-600) 8%, transparent)",
          pointerEvents: "none",
        }} />

        <div className="corner-tl" />

        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative" }}>

          {/* ── 2-KOLOM: teks kiri, foto kanan ── */}
          <div className="hero-cols" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            paddingBottom: "3rem",
          }}>

            {/* ── KIRI: teks ── */}
            <div>
              {/* Eyebrow */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.8rem",
                marginBottom: "1.75rem",
              }}>
                <div style={{ width: "2rem", height: "1px", background: "var(--color-green-600)" }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-green-500)",
                }}>Ensiklopedia Kopi Indonesia</span>
                <div style={{ width: "2rem", height: "1px", background: "var(--color-green-600)" }} />
              </div>

              {/* Heading */}
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 0.92,
                color: "var(--color-sand-50)",
                marginBottom: "1.4rem",
                letterSpacing: "-0.02em",
              }}>
                Atlas<br />
                <span style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--color-gold-600)",
                  fontStyle: "italic",
                }}>Kopi</span>
                <br />
                <span style={{ color: "var(--color-green-500)", fontStyle: "italic" }}>
                  Nusantara
                </span>
              </h1>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "var(--color-sand-500)",
                maxWidth: "420px",
                marginBottom: "2.25rem",
              }}>
                Peta persebaran & profil lengkap biji kopi dari seluruh kepulauan
                Indonesia — dari Gayo yang smoky earthy hingga Kintamani yang
                citrusy floral.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "2.5rem" }}>
                <Link to="/koleksi" className="btn-primary">
                  <BookOpen size={13} />
                  <span>Jelajahi Koleksi</span>
                </Link>
                <Link to="/peta" className="btn-ghost" style={{
                  borderColor: "color-mix(in srgb, var(--color-green-500) 40%, transparent)",
                  color: "var(--color-green-400)",
                }}>
                  <Map size={13} />
                  <span>Lihat Peta</span>
                </Link>
              </div>

              {/* Scroll hint */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-green-600)",
                animation: "float 3s ease-in-out infinite",
              }}>
                <ChevronDown size={13} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}>scroll</span>
              </div>
            </div>

            {/* ── KANAN: foto kopi ── */}
            <div className="hero-photo-col" style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {/* Lingkaran dekoratif di belakang */}
              <div style={{
                position: "absolute",
                width: "380px", height: "380px",
                borderRadius: "50%",
                border: "1px solid color-mix(in srgb, var(--color-gold-600) 18%, transparent)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                width: "310px", height: "310px",
                borderRadius: "50%",
                border: "1px dashed color-mix(in srgb, var(--color-green-500) 15%, transparent)",
                pointerEvents: "none",
              }} />

              {/* Wrapper foto utama */}
              <div style={{
                position: "relative",
                width: "300px",
                height: "380px",
                animation: "float 7s ease-in-out infinite",
                flexShrink: 0,
              }}>
                {/* Frame sudut emas atas-kiri */}
                <div style={{
                  position: "absolute", top: "-10px", left: "-10px",
                  width: "50px", height: "50px",
                  borderTop: "1.5px solid var(--color-gold-600)",
                  borderLeft: "1.5px solid var(--color-gold-600)",
                  zIndex: 2, pointerEvents: "none",
                }} />
                {/* Frame sudut emas bawah-kanan */}
                <div style={{
                  position: "absolute", bottom: "-10px", right: "-10px",
                  width: "50px", height: "50px",
                  borderBottom: "1.5px solid var(--color-gold-600)",
                  borderRight: "1.5px solid var(--color-gold-600)",
                  zIndex: 2, pointerEvents: "none",
                }} />

                {/* Foto utama */}
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=680&q=80&auto=format&fit=crop"
                  alt="Secangkir kopi Indonesia"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    clipPath: "polygon(0 5%, 5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%)",
                    filter: "sepia(12%) saturate(1.1) brightness(0.82)",
                    display: "block",
                  }}
                />

                {/* Overlay gradien bawah: blend ke background hijau gelap */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "50%",
                  background: "linear-gradient(to top, #2d4a38 0%, transparent 100%)",
                  pointerEvents: "none",
                }} />

                {/* Badge nama kopi */}
                <div style={{
                  position: "absolute",
                  bottom: "1.25rem", left: "1rem",
                  background: "color-mix(in srgb, var(--color-green-900) 90%, transparent)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid color-mix(in srgb, var(--color-gold-600) 35%, transparent)",
                  padding: "0.5rem 0.9rem",
                  zIndex: 3,
                }}>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold-400)",
                    margin: 0, marginBottom: "3px",
                  }}>Arabica · Single Origin</p>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--color-sand-50)",
                    margin: 0,
                  }}>Kopi Gayo, Aceh</p>
                </div>
              </div>

              {/* Foto bulat kecil: biji kopi */}
              <div style={{
                position: "absolute",
                top: "4%", right: "0",
                width: "96px", height: "96px",
                animation: "float 5s 1.2s ease-in-out infinite",
                zIndex: 4,
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  border: "1.5px solid var(--color-gold-600)",
                  borderRadius: "50%",
                  zIndex: 2, pointerEvents: "none",
                }} />
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=240&q=80&auto=format&fit=crop"
                  alt="Biji kopi"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    filter: "sepia(18%) saturate(1.1) brightness(0.82)",
                    display: "block",
                  }}
                />
              </div>

              {/* Chip profil rasa */}
              <div style={{
                position: "absolute",
                bottom: "22%", left: "-8px",
                background: "color-mix(in srgb, var(--color-green-900) 95%, transparent)",
                backdropFilter: "blur(10px)",
                border: "1px solid color-mix(in srgb, var(--color-green-700) 40%, transparent)",
                borderLeft: "2px solid var(--color-gold-600)",
                padding: "0.55rem 0.85rem",
                zIndex: 4,
                minWidth: "138px",
              }}>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.48rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-green-400)",
                  margin: 0, marginBottom: "5px",
                }}>Profil Rasa</p>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {["Smoky", "Earthy", "Dark Choc"].map(tag => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.48rem",
                      letterSpacing: "0.08em",
                      padding: "2px 6px",
                      background: "color-mix(in srgb, var(--color-green-800) 50%, transparent)",
                      color: "var(--color-green-400)",
                      border: "1px solid color-mix(in srgb, var(--color-green-600) 35%, transparent)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Label dekoratif bawah */}
              <div style={{
                position: "absolute",
                bottom: "-0.25rem", left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.45rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "color-mix(in srgb, var(--color-gold-600) 35%, transparent)",
                whiteSpace: "nowrap",
              }}>
                ✦ ARABICA · ROBUSTA · LIBERICA ✦
              </div>
            </div>
          </div>

          {/* ── Stats row ── */}
          {stats && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid color-mix(in srgb, var(--color-gold-600) 20%, transparent)",
              borderBottom: "none",
              animation: "fadeUp 0.7s 0.3s ease forwards",
              opacity: 0,
            }}>
              {STAT_ITEMS.map(({ key, val, label }) => (
                <div key={label} style={{
                  padding: "1.25rem 1.5rem",
                  background: "color-mix(in srgb, var(--color-green-900) 80%, transparent)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "var(--color-gold-400)",
                    lineHeight: 1,
                  }}>
                    {key ? stats[key] : val}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.56rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-green-400)",
                    marginTop: "0.3rem",
                  }}>{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED KOPI
      ═══════════════════════════════════════ */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2.5rem",
        }}>
          <div>
            <div className="section-eyebrow">Pilihan Utama</div>
            <h2 className="section-title">Kopi Unggulan</h2>
            <p className="section-subtitle" style={{ maxWidth: "380px" }}>
              Tiga varietas yang paling banyak diminati para penikmat kopi
            </p>
          </div>
          <Link
            to="/koleksi"
            className="view-all-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.63rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-green-700)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-green-900)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-green-700)"}
          >
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: "420px" }} />
            ))}
          </div>
        ) : (
          <div className="card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {featuredKopi.map((kopi, i) => (
              <KopiCard key={kopi.id} kopi={kopi} delay={i * 100} />
            ))}
          </div>
        )}
      </section>

      {/* DIVIDER */}
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="ornament-divider">✦ ☕ ✦</div>
      </div>

      {/* CTA PETA */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          padding: "3.5rem",
          background: "linear-gradient(135deg, var(--color-green-900), #2d4a38)",
          border: "1px solid color-mix(in srgb, var(--color-green-700) 40%, transparent)",
        }}>
          <div style={{
            position: "absolute", right: "-60px", top: "-60px",
            width: "260px", height: "260px", borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--color-gold-600) 15%, transparent)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: "50px", top: "50px",
            width: "160px", height: "160px", borderRadius: "50%",
            border: "1px solid color-mix(in srgb, var(--color-gold-600) 8%, transparent)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", maxWidth: "480px" }}>
            <div className="section-eyebrow" style={{
              justifyContent: "flex-start",
              color: "var(--color-green-500)",
            }}>
              Eksplorasi Geografis
            </div>
            <h2 className="section-title" style={{
              color: "var(--color-sand-50)",
              marginBottom: "0.9rem",
            }}>
              Jelajahi Lewat<br />Peta Nusantara
            </h2>
            <p style={{
              color: "var(--color-sand-500)",
              fontSize: "0.88rem",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}>
              Temukan persebaran kopi Indonesia secara visual —
              dari ujung Sumatera hingga lembah Papua.
            </p>
            <Link to="/peta" className="btn-primary">
              <Map size={13} />
              <span>Buka Peta Kopi</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-cols { grid-template-columns: 1fr !important; }
          .hero-photo-col { display: none !important; }
        }
        @media (max-width: 768px) {
          .card-grid { grid-template-columns: 1fr !important; }
          .view-all-link { display: none !important; }
        }
      `}</style>
    </div>
  );
}