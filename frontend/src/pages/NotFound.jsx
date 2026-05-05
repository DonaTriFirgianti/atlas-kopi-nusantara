import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="page-enter min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
            <p className="text-8xl mb-6">☕</p>
            <h1 className="font-display text-5xl font-black text-kopi-200 mb-3">404</h1>
            <p className="text-kopi-400 text-lg mb-8">
            Halaman yang kamu cari tidak ada di atlas ini.
            </p>
            <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
        </div>
        </div>
    );
}