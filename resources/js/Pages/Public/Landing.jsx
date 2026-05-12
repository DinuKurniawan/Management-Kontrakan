import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Building2, Users, CheckCircle, Shield, ArrowRight, Star, HelpCircle } from 'lucide-react';
import { formatRupiah } from '@/Components/UI';

export default function Landing({ stats, units }) {
    return (
        <PublicLayout>
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-emerald-600 to-teal-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Kelola Kontrakan Anda dengan Mudah & Profesional</h1>
                        <p className="mt-4 text-lg text-emerald-100">Sistem manajemen kontrakan modern untuk memudahkan pengelolaan unit, penyewa, tagihan, dan laporan keuangan.</p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/units" className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2">
                                Lihat Unit Tersedia <ArrowRight size={18} />
                            </Link>
                            <Link href="/login" className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                                Login
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Unit', value: stats.total_units, icon: Building2 },
                        { label: 'Unit Tersedia', value: stats.available_units, icon: CheckCircle },
                        { label: 'Penyewa Aktif', value: stats.active_tenants, icon: Users },
                        { label: 'Tingkat Hunian', value: `${stats.occupancy_rate}%`, icon: Star },
                    ].map((stat, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
                            <stat.icon size={20} className="text-emerald-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-sm text-slate-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Available Units Preview */}
            {units.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-800">Unit Tersedia</h2>
                        <p className="text-slate-500 mt-2">Temukan unit kontrakan yang sesuai kebutuhan Anda</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {units.map((unit, i) => (
                            <motion.div key={unit.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src={unit.image ? `/storage/${unit.image}` : `https://placehold.co/400x300/e2e8f0/94a3b8?text=Unit+${unit.unit_number}`} alt={`Unit ${unit.unit_number}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-slate-800">Unit {unit.unit_number}</h3>
                                        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">Tersedia</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-3">{unit.kontrakan?.name}</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {unit.facilities?.slice(0, 3).map(f => (
                                            <span key={f.id} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{f.name}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-emerald-600">{formatRupiah(unit.price)}<span className="text-xs text-slate-400">/bln</span></p>
                                        <Link href={`/units/${unit.id}`} className="text-sm text-emerald-600 hover:underline">Detail →</Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/units" className="text-emerald-600 font-medium hover:underline">Lihat Semua Unit →</Link>
                    </div>
                </section>
            )}

            {/* Features */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-800">Fitur Utama</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Building2, title: 'Manajemen Unit', desc: 'Kelola data unit, fasilitas, dan status hunian dengan mudah.' },
                            { icon: Users, title: 'Manajemen Penyewa', desc: 'Data penyewa lengkap dengan kontrak dan riwayat pembayaran.' },
                            { icon: Shield, title: 'Laporan Keuangan', desc: 'Laporan pendapatan, pengeluaran, dan laba bersih otomatis.' },
                        ].map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-6">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon size={24} className="text-emerald-600" />
                                </div>
                                <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-500">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800">FAQ</h2>
                </div>
                <div className="max-w-2xl mx-auto space-y-4">
                    {[
                        { q: 'Bagaimana cara menyewa unit?', a: 'Hubungi admin melalui halaman kontak atau WhatsApp untuk informasi lebih lanjut.' },
                        { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima pembayaran via cash, transfer bank, dan QRIS.' },
                        { q: 'Apakah ada deposit?', a: 'Ya, deposit sebesar 1 bulan sewa yang akan dikembalikan saat kontrak berakhir.' },
                    ].map((faq, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
                            <div className="flex items-start gap-3">
                                <HelpCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="font-medium text-slate-800">{faq.q}</h4>
                                    <p className="text-sm text-slate-500 mt-1">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
