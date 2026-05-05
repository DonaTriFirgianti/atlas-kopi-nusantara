import { Link } from "react-router-dom";
import { Coffee, Map, BookOpen, Heart } from "lucide-react";

const TIMELINE = [
  { tahun: "1699", event: "VOC menanam arabika pertama di Jawa" },
  { tahun: "1876", event: "Wabah karat daun (Hemileia vastatrix) memusnahkan kopi Jawa" },
  { tahun: "1900s", event: "Kopi robusta diperkenalkan sebagai pengganti" },
  { tahun: "1945", event: "Indonesia merdeka — perkebunan kopi dikelola bangsa sendiri" },
  { tahun: "2000s", event: "Gerakan specialty coffee Indonesia mulai berkembang" },
  { tahun: "2010", event: "Kopi Gayo & Kintamani raih sertifikasi Indikasi Geografis" },
  { tahun: "2024", event: "Indonesia masuk 4 besar produsen kopi dunia" },
];

const FITUR = [
  {
    icon: Map,
    judul: "Peta Interaktif",
    desc: "Temukan kopi berdasarkan lokasinya di peta Nusantara yang lengkap.",
  },
  {
    icon: BookOpen,
    judul: "Tasting Notes",
    desc: "Profil lengkap tiap kopi: aroma, rasa, body, keasaman, hingga aftertaste.",
  },
  {
    icon: Coffee,
    judul: "Koleksi Lengkap",
    desc: "Dari arabika premium Gayo hingga robusta Temanggung yang unik.",
  },
  {
    icon: Heart,
    judul: "Bookmark Favorit",
    desc: "Simpan kopi favorit kamu dan buat daftar eksplorasi sendiri.",
  },
];

const STATS = [
  { angka: "#4", label: "Produsen kopi terbesar di dunia" },
  { angka: "~800K", label: "Ton produksi per tahun" },
  { angka: "~1.6M", label: "Keluarga petani kopi" },
];

export default function Tentang() {
  return (
    <div
      className="page-enter"
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: "4rem", maxWidth: "560px" }}>
        <div className="section-eyebrow">📖 Tentang Proyek</div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
          fontWeight: 700,
          color: "var(--color-green-900)",
          lineHeight: 1.0,
          marginBottom: "1rem",
        }}>
          Merayakan Kopi<br />
          <span style={{ fontStyle: "italic", color: "var(--color-gold-700)" }}>Nusantara</span>
        </h1>
        <p style={{
          color: "var(--color-green-800)",
          fontSize: "0.95rem",
          lineHeight: 1.8,
        }}>
          Atlas Kopi Nusantara adalah proyek dokumentasi dan eksplorasi kopi
          Indonesia. Kami percaya setiap cangkir kopi menyimpan kisah: tentang
          tanah, petani, budaya, dan identitas daerah asalnya.
        </p>
      </div>

      {/* ── Fitur ── */}
      <section style={{ marginBottom: "4.5rem" }}>
        <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
          Apa yang Ada di Sini
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1px",
          background: "var(--color-cream-300)",
          border: "1px solid var(--color-cream-300)",
        }}>
          {FITUR.map(({ icon: Icon, judul, desc }) => (
            <div
              key={judul}
              style={{
                padding: "1.5rem",
                background: "#ffffff",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--color-cream-100)"}
              onMouseLeave={e => e.currentTarget.style.background = "#ffffff"}
            >
              <div style={{
                width: "38px", height: "38px",
                background: "color-mix(in srgb, var(--color-green-200) 60%, transparent)",
                border: "1px solid var(--color-green-300)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <Icon size={17} style={{ color: "var(--color-green-800)" }} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "1.1rem", color: "var(--color-green-900)", marginBottom: "0.4rem",
              }}>
                {judul}
              </h3>
              <p style={{ color: "var(--color-sand-700)", fontSize: "0.85rem", lineHeight: 1.65 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ marginBottom: "4.5rem" }}>
        <h2 className="section-title" style={{ marginBottom: "2rem" }}>
          Sejarah Kopi Indonesia
        </h2>
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "4.5rem",
            top: 0, bottom: 0,
            width: "1px",
            background: "var(--color-cream-300)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {TIMELINE.map(({ tahun, event }) => (
              <div key={tahun} style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                <span style={{
                  width: "3.5rem",
                  flexShrink: 0,
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--color-gold-700)",
                  letterSpacing: "0.04em",
                  paddingTop: "0.1rem",
                }}>
                  {tahun}
                </span>
                <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: "10px", height: "10px",
                    borderRadius: "50%",
                    background: "var(--color-gold-600)",
                    border: "2px solid var(--color-cream-100)",
                    outline: "1px solid var(--color-gold-600)",
                  }} />
                </div>
                <p style={{
                  fontSize: "0.875rem",
                  color: "var(--color-green-800)",
                  lineHeight: 1.65,
                  paddingTop: "0.05rem",
                }}>
                  {event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{
          padding: "2.5rem",
          background: "var(--color-green-900)",
          border: "1px solid color-mix(in srgb, var(--color-green-800) 60%, transparent)",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "1.5rem",
            fontWeight: 700, color: "var(--color-sand-200)",
            marginBottom: "2rem",
          }}>
            Indonesia & Kopi Dunia
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
          }}>
            {STATS.map(({ angka, label }) => (
              <div key={label} style={{
                padding: "1.5rem 1.25rem",
                background: "color-mix(in srgb, var(--color-green-900) 80%, transparent)",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--color-gold-400)",
                  marginBottom: "0.4rem",
                  lineHeight: 1,
                }}>
                  {angka}
                </p>
                <p style={{
                  color: "var(--color-green-400)",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--color-sand-700)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          Siap menjelajahi kopi Indonesia?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem" }}>
          <Link to="/koleksi" className="btn-primary">Lihat Koleksi</Link>
          <Link to="/peta" className="btn-ghost">Buka Peta</Link>
        </div>
      </div>
    </div>
  );
}