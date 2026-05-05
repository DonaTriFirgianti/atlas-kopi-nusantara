const express = require("express");
const cors = require("cors");
const kopiData = require("./data/kopi");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ──────────────────────────────────────────
// GET /api/kopi — Semua kopi
// ──────────────────────────────────────────
app.get("/api/kopi", (req, res) => {
    const { pulau, proses, search } = req.query;
    let hasil = [...kopiData];

    if (pulau) {
        hasil = hasil.filter((k) => k.pulau.toLowerCase() === pulau.toLowerCase());
    }
    if (proses) {
        hasil = hasil.filter((k) =>
        k.proses.toLowerCase().includes(proses.toLowerCase())
        );
    }
    if (search) {
        hasil = hasil.filter(
        (k) =>
            k.nama.toLowerCase().includes(search.toLowerCase()) ||
            k.daerah.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json({
        success: true,
        total: hasil.length,
        data: hasil,
    });
});

// ──────────────────────────────────────────
// GET /api/kopi/:id — Detail kopi by ID
// ──────────────────────────────────────────
app.get("/api/kopi/:id", (req, res) => {
    const { id } = req.params;
    const kopi = kopiData.find((k) => k.id === id);

    if (!kopi) {
        return res.status(404).json({
        success: false,
        message: `Kopi dengan ID "${id}" tidak ditemukan`,
        });
    }

    // Tambahkan kopi terkait (pulau sama)
    const terkait = kopiData
        .filter((k) => k.pulau === kopi.pulau && k.id !== kopi.id)
        .slice(0, 3);

    res.json({
        success: true,
        data: { ...kopi, terkait },
    });
});

// ──────────────────────────────────────────
// GET /api/kopi/daerah/:daerah — Filter daerah
// ──────────────────────────────────────────
app.get("/api/daerah/:pulau", (req, res) => {
    const { pulau } = req.params;
    const hasil = kopiData.filter(
        (k) => k.pulau.toLowerCase() === pulau.toLowerCase()
    );

    res.json({
        success: true,
        pulau,
        total: hasil.length,
        data: hasil,
    });
});

// ──────────────────────────────────────────
// GET /api/stats — Statistik koleksi
// ──────────────────────────────────────────
app.get("/api/stats", (req, res) => {
    const pulauCount = kopiData.reduce((acc, k) => {
        acc[k.pulau] = (acc[k.pulau] || 0) + 1;
        return acc;
    }, {});

    const prosesCount = kopiData.reduce((acc, k) => {
        const proses = k.proses.split(" ")[0];
        acc[proses] = (acc[proses] || 0) + 1;
        return acc;
    }, {});

    res.json({
        success: true,
        data: {
        totalKopi: kopiData.length,
        totalPulau: Object.keys(pulauCount).length,
        sebaranPulau: pulauCount,
        sebaranProses: prosesCount,
        },
    });
});

app.listen(PORT, () => {
    console.log(`☕ Atlas Kopi API berjalan di http://localhost:${PORT}`);
});