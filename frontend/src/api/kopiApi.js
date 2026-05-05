import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ── Request interceptor ──
api.interceptors.request.use((config) => {
    return config;
});

// ── Response interceptor ──
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
        error.response?.data?.message || "Terjadi kesalahan pada server";
        return Promise.reject({ message, status: error.response?.status });
    }
);

// API Functions

/** Ambil semua kopi, dengan filter */
export const getAllKopi = (params = {}) => api.get("/api/kopi", { params });

/** Ambil detail satu kopi by ID */
export const getKopiById = (id) => api.get(`/api/kopi/${id}`);

/** Filter kopi by pulau */
export const getKopiByPulau = (pulau) => api.get(`/api/daerah/${pulau}`);

/** Ambil statistik koleksi */
export const getStats = () => api.get("/api/stats");

export default api;