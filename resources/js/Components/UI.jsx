import { motion } from 'framer-motion';

export function StatCard({ title, value, icon: Icon, color = 'emerald', subtitle }) {
    const colors = {
        emerald: 'bg-emerald-50 text-emerald-600',
        blue: 'bg-blue-50 text-blue-600',
        amber: 'bg-amber-50 text-amber-600',
        red: 'bg-red-50 text-red-600',
        purple: 'bg-purple-50 text-purple-600',
        slate: 'bg-slate-50 text-slate-600',
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
                    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl ${colors[color]}`}>
                        <Icon size={22} />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export function Badge({ children, variant = 'default' }) {
    const variants = {
        default: 'bg-slate-100 text-slate-700',
        success: 'bg-emerald-50 text-emerald-700',
        warning: 'bg-amber-50 text-amber-700',
        danger: 'bg-red-50 text-red-700',
        info: 'bg-blue-50 text-blue-700',
        purple: 'bg-purple-50 text-purple-700',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
}

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
    const variants = {
        primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
        secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'text-slate-600 hover:bg-slate-100',
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
}

export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export function EmptyState({ icon: Icon, title, description }) {
    return (
        <div className="text-center py-12">
            {Icon && <Icon size={48} className="mx-auto text-slate-300 mb-4" />}
            <h3 className="text-lg font-medium text-slate-600">{title}</h3>
            {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
        </div>
    );
}

export function LoadingSkeleton({ rows = 5 }) {
    return (
        <div className="space-y-3 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl" />
            ))}
        </div>
    );
}

export function SearchInput({ value, onChange, placeholder = 'Cari...' }) {
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full sm:w-64 px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
    );
}

export function Modal({ show, onClose, title, children }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
                {title && <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>}
                {children}
            </motion.div>
        </div>
    );
}

export function ConfirmDialog({ show, onClose, onConfirm, title = 'Konfirmasi', message = 'Apakah Anda yakin?' }) {
    return (
        <Modal show={show} onClose={onClose} title={title}>
            <p className="text-slate-600 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={onClose}>Batal</Button>
                <Button variant="danger" onClick={onConfirm}>Hapus</Button>
            </div>
        </Modal>
    );
}

export function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            {links.map((link, i) => (
                <a
                    key={i}
                    href={link.url}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${link.active ? 'bg-emerald-600 text-white' : link.url ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 cursor-not-allowed'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export function statusBadge(status) {
    const map = {
        active: { label: 'Aktif', variant: 'success' },
        inactive: { label: 'Nonaktif', variant: 'danger' },
        available: { label: 'Tersedia', variant: 'success' },
        occupied: { label: 'Terisi', variant: 'info' },
        maintenance: { label: 'Maintenance', variant: 'warning' },
        completed: { label: 'Selesai', variant: 'default' },
        cancelled: { label: 'Dibatalkan', variant: 'danger' },
        unpaid: { label: 'Belum Bayar', variant: 'warning' },
        pending_verification: { label: 'Menunggu Verifikasi', variant: 'info' },
        paid: { label: 'Lunas', variant: 'success' },
        overdue: { label: 'Telat', variant: 'danger' },
        pending: { label: 'Pending', variant: 'warning' },
        accepted: { label: 'Diterima', variant: 'success' },
        rejected: { label: 'Ditolak', variant: 'danger' },
    };
    const s = map[status] || { label: status, variant: 'default' };
    return <Badge variant={s.variant}>{s.label}</Badge>;
}
