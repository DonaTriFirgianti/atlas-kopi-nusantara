import { useEffect, useState } from "react";
import { getAllKopi } from "../api/kopiApi";
import KopiCard from "../components/KopiCard";
import { Search, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "body-desc", label: "Body Tertinggi" },
  { value: "acidity-desc", label: "Keasaman Tertinggi" },
  { value: "sweet-desc", label: "Kemanisan Tertinggi" },
];

export default function Koleksi() {
  const [kopiList, setKopiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPulau, setSelectedPulau] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    getAllKopi()
      .then((res) => setKopiList(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pulauList = ["Semua", ...new Set(kopiList.map((k) => k.pulau))];

  const hasFilters = search || selectedPulau !== "Semua" || sortBy !== "default";

  const filtered = kopiList
    .filter((k) => {
      const matchSearch =
        k.nama.toLowerCase().includes(search.toLowerCase()) ||
        k.daerah.toLowerCase().includes(search.toLowerCase());
      const matchPulau = selectedPulau === "Semua" || k.pulau === selectedPulau;
      return matchSearch && matchPulau;
    })
    .sort((a, b) => {
      if (sortBy === "body-desc")    return b.tastingNotes.body - a.tastingNotes.body;
      if (sortBy === "acidity-desc") return b.tastingNotes.acidity - a.tastingNotes.acidity;
      if (sortBy === "sweet-desc")   return b.tastingNotes.sweetness - a.tastingNotes.sweetness;
      return 0;
    });

  const resetFilters = () => {
    setSearch("");
    setSelectedPulau("Semua");
    setSortBy("default");
  };

  return (
    <div
      className="page-enter"
      style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div className="section-eyebrow">📚 Ensiklopedia</div>
        <h1 className="section-title">Koleksi Kopi Indonesia</h1>
        <p className="section-subtitle">{kopiList.length} varietas kopi dari seluruh Nusantara</p>
      </div>

      {/* ── Filters ── */}
      <div style={{
        background: "#ffffff",
        border: "1px solid var(--color-cream-300)",
        padding: "1.25rem 1.5rem",
        marginBottom: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={15} style={{
            position: "absolute",
            left: "0.85rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-sand-700)",
          }} />
          <input
            type="text"
            placeholder="Cari nama kopi atau daerah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "var(--color-cream-100)",
              border: "1px solid var(--color-cream-300)",
              padding: "0.6rem 1rem 0.6rem 2.5rem",
              fontSize: "0.875rem",
              color: "var(--color-green-900)",
              fontFamily: "var(--font-body)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "var(--color-green-600)"}
            onBlur={e => e.target.style.borderColor = "var(--color-cream-300)"}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "flex-end" }}>

          {/* Filter Pulau */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-sand-700)",
              marginBottom: "0.5rem",
            }}>
              Pulau
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {pulauList.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPulau(p)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    border: selectedPulau === p
                      ? "1px solid var(--color-green-700)"
                      : "1px solid var(--color-cream-300)",
                    background: selectedPulau === p
                      ? "color-mix(in srgb, var(--color-green-200) 60%, transparent)"
                      : "transparent",
                    color: selectedPulau === p
                      ? "var(--color-green-800)"
                      : "var(--color-sand-700)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-sand-700)",
              marginBottom: "0.5rem",
            }}>
              Urutkan
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "var(--color-cream-100)",
                border: "1px solid var(--color-cream-300)",
                padding: "0.5rem 0.85rem",
                fontSize: "0.82rem",
                fontFamily: "var(--font-body)",
                color: "var(--color-green-900)",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={resetFilters}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--color-sand-700)",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s",
              letterSpacing: "0.06em",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-green-800)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-sand-700)"}
          >
            <X size={12} /> Reset filter
          </button>
        )}
      </div>

      {/* ── Result count ── */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--color-sand-700)",
        marginBottom: "1.5rem",
        letterSpacing: "0.04em",
      }}>
        Menampilkan{" "}
        <span style={{ color: "var(--color-green-800)", fontWeight: 500 }}>
          {filtered.length}
        </span>{" "}
        kopi{hasFilters && " (difilter)"}
      </p>

      {/* ── Grid ── */}
      {loading ? (
        <div className="kopi-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton" style={{ height: "380px" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
          <p style={{ color: "var(--color-sand-700)", marginBottom: "1.25rem" }}>
            Tidak ada kopi yang cocok dengan filter ini.
          </p>
          <button onClick={resetFilters} className="btn-ghost">
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="kopi-grid">
          {filtered.map((kopi, i) => (
            <KopiCard key={kopi.id} kopi={kopi} delay={i * 50} />
          ))}
        </div>
      )}

      <style>{`
        .kopi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        @media (max-width: 640px) {
          .kopi-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}