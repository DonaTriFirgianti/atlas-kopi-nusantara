# ☕ Atlas Kopi Nusantara

> **Ensiklopedia & peta interaktif kopi Indonesia** — dari Gayo yang smoky earthy hingga Kintamani yang citrusy floral.

Atlas Kopi Nusantara adalah proyek dokumentasi dan eksplorasi kopi Indonesia berbasis web. Setiap varietas kopi disajikan dengan profil lengkap: asal daerah, proses pengolahan, tasting notes, hingga sejarahnya — semuanya dapat dijelajahi melalui koleksi terfilter maupun peta interaktif Nusantara.

---

## ✨ Fitur Utama

- **Peta Interaktif** — Visualisasi persebaran kopi di seluruh kepulauan Indonesia menggunakan Leaflet.js, lengkap dengan marker emoji dan tooltip hover.
- **Koleksi Terfilter** — Cari dan saring kopi berdasarkan nama, daerah, pulau asal, serta urutkan berdasarkan body, keasaman, atau kemanisan.
- **Halaman Detail Kopi** — Profil lengkap per varietas dengan tiga tab: *Profil*, *Tasting Notes*, dan *Asal & Sejarah*.
- **Statistik Koleksi** — Menampilkan total varietas, jumlah pulau penghasil, dan sebaran berdasarkan proses pengolahan.

---

## 🛠️ Tech Stack

### Frontend

| Teknologi | Versi | Keterangan |
|---|---|---|
| [React](https://react.dev/) | 19 | Library UI utama |
| [Vite](https://vitejs.dev/) | 8 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 7 | Client-side routing (SPA) |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5 | State management global |
| [Axios](https://axios-http.com/) | 1.x | HTTP client untuk komunikasi ke API |
| [Leaflet](https://leafletjs.com/) | 1.9 | Peta interaktif |
| [Lucide React](https://lucide.dev/) | 1.x | Icon set |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS framework |

### Backend

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Node.js](https://nodejs.org/) | — | Runtime JavaScript |
| [Express](https://expressjs.com/) | 5 | Web framework REST API |
| [CORS](https://www.npmjs.com/package/cors) | 2.x | Middleware Cross-Origin Resource Sharing |
| [Nodemon](https://nodemon.io/) | 3.x | Auto-restart server saat development |

---

## 📁 Struktur Proyek

```
atlas-kopi-nusantara/
├── backend/
│   ├── data/
│   │   └── kopi.js          # Data statis seluruh varietas kopi
│   ├── server.js            # Entry point Express & definisi route API
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── kopiApi.js   # Fungsi pemanggil endpoint API
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── KopiCard.jsx
    │   │   └── TastingNotes.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Koleksi.jsx
    │   │   ├── Peta.jsx
    │   │   ├── DetailKopi.jsx
    │   │   ├── Tentang.jsx
    │   │   └── NotFound.jsx
    │   ├── store/
    │   │   └── useKopiStore.js  # Zustand store (favorit, detail, tab)
    │   └── App.jsx              # Konfigurasi routing
    └── package.json
```

---

## 🗺️ Routes

### Frontend (React Router)

| Path | Halaman | Deskripsi |
|---|---|---|
| `/` | — | Redirect otomatis ke `/beranda` |
| `/beranda` | `Home` | Landing page: hero section, statistik koleksi, kopi unggulan, dan CTA peta |
| `/koleksi` | `Koleksi` | Daftar semua varietas kopi dengan fitur pencarian, filter pulau, dan sorting |
| `/kopi/:id` | `DetailKopi` | Halaman detail satu varietas kopi berdasarkan ID (contoh: `/kopi/gayo`) |
| `/peta` | `Peta` | Peta interaktif Leaflet dengan marker per kopi dan filter per pulau |
| `/tentang` | `Tentang` | Informasi proyek, fitur, timeline sejarah kopi Indonesia, dan statistik global |
| `*` | `NotFound` | Halaman 404 untuk path yang tidak dikenali |

### Backend (Express REST API)

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/kopi` | Ambil semua data kopi. Mendukung query params: `?pulau=`, `?proses=`, `?search=` |
| `GET` | `/api/kopi/:id` | Ambil detail satu kopi berdasarkan ID, beserta 3 kopi terkait (pulau sama) |
| `GET` | `/api/daerah/:pulau` | Ambil semua kopi yang berasal dari pulau tertentu |
| `GET` | `/api/stats` | Ambil statistik koleksi: total kopi, total pulau, sebaran per pulau & per proses |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js >= 18
- npm

### 1. Clone Repository

```bash
git clone https://github.com/DonaTriFirgianti/atlas-kopi-nusantara.git
cd atlas-kopi-nusantara
```

### 2. Jalankan Backend

```bash
cd backend
npm install
npm run dev
# Server berjalan di http://localhost:3001
```

### 3. Jalankan Frontend

```bash
cd frontend
npm install
npm run dev
# Aplikasi berjalan di http://localhost:5173
```

---

## 📜 Lisensi

Proyek ini dibuat untuk keperluan edukasi dan dokumentasi kopi Indonesia.

---

<p align="center">
  Dibuat dengan ☕ dan rasa cinta terhadap kopi Nusantara
</p>
