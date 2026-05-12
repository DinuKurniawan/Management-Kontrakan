import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, DoorOpen, Users, FileText, CreditCard, Receipt, LogOut, Menu, X
} from 'lucide-react';
import { StatCard, Card, formatRupiah, statusBadge } from '@/Components/UI';
import { usePage } from '@inertiajs/react';

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/units', label: 'Unit', icon: DoorOpen },
    { href: '/admin/tenants', label: 'Penyewa', icon: Users },
    { href: '/admin/leases', label: 'Kontrak', icon: FileText },
    { href: '/admin/bills', label: 'Tagihan', icon: Receipt },
    { href: '/admin/payments', label: 'Pembayaran', icon: CreditCard },
    { href: '/admin/expenses', label: 'Pengeluaran', icon: Receipt },
];

function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth, flash } = usePage().props;
    const currentPath = usePage().url;

    return (
        <div className="min-h-screen bg-slate-100">
            <AnimatePresence>
                {sidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
            </AnimatePresence>

            <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
                    <Link href="/admin/dashboard" className="text-lg font-bold text-emerald-600">Kontrakan</Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500"><X size={20} /></button>
                </div>
                <nav className="p-4 space-y-1">
                    {sidebarLinks.map(link => {
                        const Icon = link.icon;
                        const isActive = currentPath.startsWith(link.href);
                        return (
                            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                                <Icon size={18} />{link.label}
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
                            <h1 className="text-lg font-semibold text-slate-800">{title || 'Dashboard Admin'}</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-600 hidden sm:block">{auth.user?.name}</span>
                            <button onClick={() => router.post('/logout')} className="text-slate-500 hover:text-red-600"><LogOut size={18} /></button>
                        </div>
                    </div>
                </header>
                {flash?.success && <div className="mx-4 sm:mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">{flash.success}</div>}
                {flash?.error && <div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{flash.error}</div>}
                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}

export default function Dashboard({ stats, recentPayments, upcomingBills }) {
    return (
        <AdminLayout title="Dashboard Admin">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard title="Total Unit" value={stats.total_units} icon={DoorOpen} color="blue" />
                <StatCard title="Unit Tersedia" value={stats.available_units} icon={DoorOpen} color="emerald" />
                <StatCard title="Penyewa Aktif" value={stats.active_tenants} icon={Users} color="amber" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <StatCard title="Pendapatan Bulan Ini" value={formatRupiah(stats.monthly_income)} color="emerald" />
                <StatCard title="Total Tunggakan" value={formatRupiah(stats.total_outstanding)} color="red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Tagihan Jatuh Tempo</h3>
                    <div className="space-y-3">
                        {upcomingBills?.length === 0 && <p className="text-sm text-slate-400">Tidak ada tagihan jatuh tempo.</p>}
                        {upcomingBills?.map(bill => (
                            <div key={bill.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{bill.lease?.tenant?.user?.name}</p>
                                    <p className="text-xs text-slate-400">Unit {bill.lease?.unit?.unit_number}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">{formatRupiah(bill.total_amount)}</p>
                                    {statusBadge(bill.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Pembayaran Terbaru</h3>
                    <div className="space-y-3">
                        {recentPayments?.length === 0 && <p className="text-sm text-slate-400">Belum ada pembayaran.</p>}
                        {recentPayments?.map(payment => (
                            <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{payment.bill?.lease?.tenant?.user?.name}</p>
                                    <p className="text-xs text-slate-400">Unit {payment.bill?.lease?.unit?.unit_number}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">{formatRupiah(payment.amount)}</p>
                                    {statusBadge(payment.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
