import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getAllKopi } from "../api/kopiApi";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function makeKopiIcon(emoji, active = true) {
  return L.divIcon({
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: transform 0.18s ease;
      ">
        <span style="
          font-size: 28px;
          line-height: 1;
          filter: ${active
            ? "drop-shadow(0 2px 6px rgba(60,30,10,0.35))"
            : "grayscale(1) opacity(0.35)"
          };
          transition: filter 0.2s ease, transform 0.18s ease;
          display: block;
        ">${emoji}</span>
        <svg width="6" height="5" viewBox="0 0 6 5" style="display:block; margin-top:1px; opacity:${active ? 0.55 : 0.15};">
          <polygon points="0,0 6,0 3,5" fill="#6F4E37"/>
        </svg>
      </div>
    `,
    className: "",
    iconSize:    [32, 36],
    iconAnchor:  [16, 36],
    popupAnchor: [0, -38],
  });
}

function makeKopiIconHover(emoji) {
  return L.divIcon({
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
      ">
        <span style="
          font-size: 34px;
          line-height: 1;
          filter: drop-shadow(0 4px 12px rgba(60,30,10,0.5));
          display: block;
          transform: translateY(-3px);
        ">${emoji}</span>
        <svg width="7" height="6" viewBox="0 0 7 6" style="display:block; margin-top:1px; opacity:0.7;">
          <polygon points="0,0 7,0 3.5,6" fill="#6F4E37"/>
        </svg>
      </div>
    `,
    className: "",
    iconSize:    [36, 42],
    iconAnchor:  [18, 42],
    popupAnchor: [0, -44],
  });
}

// ── Tooltip DOM element (shared, reused) ──
let tooltipEl = null;
function getTooltip() {
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "kopi-map-tooltip";
    document.body.appendChild(tooltipEl);
  }
  return tooltipEl;
}

function showTooltip(kopi, x, y) {
  const el = getTooltip();
  el.innerHTML = `
    <div style="
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      left: ${x + 14}px;
      top:  ${y - 10}px;
      background: #1B4332;
      border-top: 2px solid #A68A64;
      padding: 0.75rem 1rem;
      min-width: 190px;
      max-width: 230px;
      box-shadow: 0 12px 32px rgba(10,26,18,0.35), 0 2px 8px rgba(0,0,0,0.2);
      font-family: inherit;
    ">
      <!-- Name -->
      <div style="
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1rem;
        font-weight: 700;
        color: #f9f8f6;
        margin-bottom: 4px;
        line-height: 1.2;
      ">${kopi.emoji} ${kopi.nama}</div>

      <!-- Location -->
      <div style="
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.55rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #74c69d;
        margin-bottom: 8px;
      ">${kopi.daerah} · ${kopi.pulau}</div>

      <!-- Divider -->
      <div style="height:1px; background: rgba(255,255,255,0.08); margin-bottom:8px;"></div>

      <!-- Meta row -->
      <div style="
        display: flex;
        gap: 0.75rem;
        margin-bottom: 8px;
      ">
        <div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.48rem; text-transform:uppercase; letter-spacing:0.1em; color:#74c69d; margin-bottom:2px;">Proses</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.6rem; color:#DAD7CD;">${kopi.proses}</div>
        </div>
        <div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.48rem; text-transform:uppercase; letter-spacing:0.1em; color:#74c69d; margin-bottom:2px;">Ketinggian</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.6rem; color:#DAD7CD;">${kopi.ketinggian}</div>
        </div>
      </div>

      <!-- Tasting notes -->
      <div style="display:flex; flex-wrap:wrap; gap:4px;">
        ${(kopi.tastingNotes?.rasa || []).slice(0, 3).map(r => `
          <span style="
            font-family:'JetBrains Mono',monospace;
            font-size:0.5rem;
            letter-spacing:0.08em;
            padding:2px 7px;
            background:rgba(82,183,136,0.12);
            color:#74c69d;
            border:1px solid rgba(82,183,136,0.25);
          ">${r}</span>
        `).join("")}
      </div>
    </div>
  `;
  el.style.display = "block";
}

function moveTooltip(x, y) {
  const el = getTooltip();
  const inner = el.firstElementChild;
  if (!inner) return;
  inner.style.left = (x + 14) + "px";
  inner.style.top  = (y - 10) + "px";
}

function hideTooltip() {
  const el = getTooltip();
  el.style.display = "none";
}

const INJECT_CSS = `
#kopi-map-tooltip { display: none; }
`;

export default function Peta() {
  const [kopiList, setKopiList]       = useState([]);
  const [activePulau, setActivePulau] = useState(null);
  const mapRef         = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef     = useRef([]);
  const markerLayerRef = useRef(null);
  const activePulauRef = useRef(null);

  // keep ref in sync for closure access inside marker events
  useEffect(() => { activePulauRef.current = activePulau; }, [activePulau]);

  // Inject tooltip CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = INJECT_CSS;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
    };
  }, []);

  // ── Load data ──
  useEffect(() => {
    getAllKopi()
      .then((res) => setKopiList(res.data))
      .catch(console.error);
  }, []);

  // ── Init Leaflet map ──
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // ── Refresh markers when data loads ──
  useEffect(() => {
    if (!mapInstanceRef.current || kopiList.length === 0) return;

    markerLayerRef.current.clearLayers();
    markersRef.current = [];

    kopiList.forEach((kopi) => {
      if (!kopi.koordinat) return;
      const { lat, lng } = kopi.koordinat;

      const marker = L.marker([lat, lng], {
        icon: makeKopiIcon(kopi.emoji, true),
      });

      // Hover: show tooltip + swap icon
      marker.on("mouseover", function (e) {
        const { clientX, clientY } = e.originalEvent;
        showTooltip(kopi, clientX, clientY);
        this.setIcon(makeKopiIconHover(kopi.emoji));
      });

      marker.on("mousemove", function (e) {
        const { clientX, clientY } = e.originalEvent;
        moveTooltip(clientX, clientY);
      });

      marker.on("mouseout", function () {
        hideTooltip();
        const active = !activePulauRef.current || kopi.pulau === activePulauRef.current;
        this.setIcon(makeKopiIcon(kopi.emoji, active));
      });

      markerLayerRef.current.addLayer(marker);
      markersRef.current.push({ marker, kopi });
    });
  }, [kopiList]);

  // ── Filter markers by pulau ──
  useEffect(() => {
    hideTooltip();
    markersRef.current.forEach(({ marker, kopi }) => {
      const active = !activePulau || kopi.pulau === activePulau;
      marker.setIcon(makeKopiIcon(kopi.emoji, active));
      marker.setOpacity(active ? 1 : 0.4);
    });
  }, [activePulau]);

  const pulauList    = [...new Set(kopiList.map((k) => k.pulau))];
  const filteredKopi = activePulau
    ? kopiList.filter((k) => k.pulau === activePulau)
    : kopiList;

  return (
    <div
      className="page-enter"
      style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-eyebrow">Peta Persebaran</div>
        <h1 className="section-title">Kopi Nusantara</h1>
        <p className="section-subtitle">
          Temukan kopi berdasarkan lokasi asalnya di seluruh kepulauan Indonesia
        </p>
      </div>

      {/* ── Island filter ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.1rem" }}>
        {["Semua Pulau", ...pulauList].map((p) => {
          const val      = p === "Semua Pulau" ? null : p;
          const isActive = activePulau === val;
          return (
            <button
              key={p}
              onClick={() => setActivePulau(val)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.32rem 0.9rem",
                border: isActive
                  ? "1px solid var(--color-gold-700)"
                  : "1px solid var(--color-cream-300)",
                background: isActive
                  ? "color-mix(in srgb, var(--color-gold-200) 50%, transparent)"
                  : "transparent",
                color: isActive ? "var(--color-gold-800)" : "var(--color-sand-700)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* ── Map ── */}
      <div
        ref={mapRef}
        style={{
          height: "520px",
          border: "1px solid var(--color-cream-300)",
          marginBottom: "2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── Kopi list ── */}
      <div>
        <div style={{
          display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "1.4rem",
            fontWeight: 700, color: "var(--color-green-900)",
          }}>
            {activePulau ? `Kopi dari ${activePulau}` : "Semua Koleksi"}
          </h2>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--color-sand-700)", letterSpacing: "0.06em",
          }}>
            {filteredKopi.length} varietas
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {filteredKopi.map((kopi, i) => (
            <Link
              key={kopi.id}
              to={`/kopi/${kopi.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.1rem",
                background: "#ffffff",
                border: "1px solid var(--color-cream-300)",
                textDecoration: "none",
                transition: "all 0.2s",
                animation: "fadeUp 0.45s ease forwards",
                animationDelay: `${i * 30}ms`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-cream-100)";
                e.currentTarget.style.borderColor = "var(--color-sand-500)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "var(--color-cream-300)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <span style={{ fontSize: "1.4rem", width: "2rem", textAlign: "center" }}>
                  {kopi.emoji}
                </span>
                <div>
                  <p style={{
                    fontFamily: "var(--font-display)", fontSize: "1rem",
                    fontWeight: 700, color: "var(--color-green-900)", marginBottom: "0.15rem",
                  }}>
                    {kopi.nama}
                  </p>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    color: "var(--color-sand-700)",
                    fontSize: "0.63rem", fontFamily: "var(--font-mono)",
                  }}>
                    <MapPin size={9} />
                    <span>{kopi.daerah}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <span className="badge-pulau list-badge">{kopi.pulau}</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  {kopi.tastingNotes.rasa.slice(0, 2).map((r) => (
                    <span key={r} style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                      padding: "0.15rem 0.45rem",
                      border: "1px solid var(--color-cream-300)",
                      color: "var(--color-sand-700)",
                      background: "var(--color-cream-100)",
                    }}>
                      {r}
                    </span>
                  ))}
                </div>
                <span style={{ color: "var(--color-gold-700)", fontSize: "0.85rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .list-badge { display: none !important; }
        }
      `}</style>
    </div>
  );
}