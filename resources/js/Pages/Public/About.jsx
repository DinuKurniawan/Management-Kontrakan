import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Shield, Clock, Wifi, Car, CheckCircle } from 'lucide-react';

export default function About() {
    return (
        <PublicLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-800 mb-6">Tentang Kami</h1>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">Management Kontrakan</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Kami menyediakan hunian kontrakan yang nyaman, aman, dan terjangkau di lokasi strategis.
                            Dengan sistem manajemen modern, kami memastikan pengalaman tinggal yang menyenangkan bagi setiap penyewa.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Keunggulan Kami</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: Shield, text: 'Keamanan 24 jam dengan CCTV' },
                                { icon: Wifi, text: 'WiFi gratis di seluruh area' },
                                { icon: Car, text: 'Parkir luas dan aman' },
                                { icon: Clock, text: 'Akses 24 jam' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <item.icon size={20} className="text-emerald-600 shrink-0" />
                                    <span className="text-sm text-slate-700">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Aturan Umum</h2>
                        <ul className="space-y-2">
                            {[
                                'Pembayaran sewa dilakukan sebelum tanggal 10 setiap bulan',
                                'Tamu menginap maksimal 2 malam dengan laporan ke admin',
                                'Dilarang membawa hewan peliharaan',
                                'Menjaga kebersihan dan ketenangan lingkungan',
                                'Kerusakan fasilitas menjadi tanggung jawab penyewa',
                            ].map((rule, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
