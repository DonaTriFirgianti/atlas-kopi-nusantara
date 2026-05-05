import { create } from "zustand";
import { getKopiById } from "../api/kopiApi";

const useKopiStore = create((set, get) => ({
    // ── State ────────────────────────────────────────
    selectedKopi: null, 
    isLoading: false, 
    error: null, 
    activeTab: "profil", 
    favorites: JSON.parse(localStorage.getItem("kopi-favorites") || "[]"),
    compareList: [],

    // ── Actions ──────────────────────────────────────
    /** Fetch detail kopi by ID dari API */
    fetchKopiById: async (id) => {
        set({ isLoading: true, error: null, selectedKopi: null });
        try { const response = await getKopiById(id);
        set({ selectedKopi: response.data, isLoading: false });
        } catch (err) {
        set({ error: err.message || "Kopi tidak ditemukan", isLoading: false });
        }
    },

    /** Ganti tab aktif */
    setActiveTab: (tab) => set({ activeTab: tab }),

    /** Reset state saat pindah halaman */
    resetDetail: () =>
        set({ selectedKopi: null, error: null, activeTab: "profil" }),

    /** Toggle kopi ke daftar favorit */
    toggleFavorite: (id) => {
        const { favorites } = get();
        const isFav = favorites.includes(id);
        const newFavs = isFav
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];

        localStorage.setItem("kopi-favorites", JSON.stringify(newFavs));
        set({ favorites: newFavs });
    },

    /** Cek apakah kopi ada di favorit */
    isFavorite: (id) => get().favorites.includes(id),

    /** Tambah/hapus ke compare list */
    toggleCompare: (id) => {
        const { compareList } = get();
        if (compareList.includes(id)) {
        set({ compareList: compareList.filter((c) => c !== id) });
        } else if (compareList.length < 2) {
        set({ compareList: [...compareList, id] });
        }
    },
}));

export default useKopiStore;