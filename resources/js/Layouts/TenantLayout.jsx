import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Receipt, CreditCard, User, LogOut, Menu, X } from 'lucide-react';

const sidebarLinks = [
    { href: '/tenant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/tenant/bills', label: 'Tagihan', icon: Receipt },
    { href: '/tenant/payments', label: 'Pembayaran', icon: CreditCard },
    { href: '/tenant/profile', label: 'Profil', icon: User },
];

export default function TenantLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth, flash } = usePage().props;
    const currentPath = usePage().url;

    return (
        <div className="min-h-screen bg-slate-100">
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}
            </AnimatePresence>

            <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
                    <Link href="/tenant/dashboard" className="text-lg font-bold text-emerald-600">Kontrakan</Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500"><X size={20} /></button>
                </div>
                <nav className="p-4 space-y-1">
                    {sidebarLinks.map(link => {
                        const Icon = link.icon;
                        const isActive = currentPath.startsWith(link.href);
                        return (
                            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                                <Icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="lg:ml-64">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600"><Menu size={20} /></button>
                            <h1 className="text-lg font-semibold text-slate-800">{title || 'Dashboard Penyewa'}</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-600 hidden sm:block">{auth.user?.name}</span>
                            <button onClick={() => router.post('/logout')} className="text-slate-500 hover:text-red-600 transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                {flash?.success && (
                    <div className="mx-4 sm:mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">{flash.success}</div>
                )}
                {flash?.error && (
                    <div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{flash.error}</div>
                )}

                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}
