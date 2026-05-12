import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Building2, MapPin, Maximize, Phone } from 'lucide-react';
import { formatRupiah, statusBadge } from '@/Components/UI';

export default function UnitDetail({ unit }) {
    const waLink = `https://wa.me/6281234567890?text=Halo, saya tertarik dengan Unit ${unit.unit_number} di ${unit.kontrakan?.name}`;

    return (
        <PublicLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                            {unit.image ? (
                                <img src={`/storage/${unit.image}`} alt={`Unit ${unit.unit_number}`} className="w-full h-full object-cover" />
                            ) : (
                                <Building2 size={64} className="text-slate-300" />
                            )}
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Unit {unit.unit_number}</h1>
                                    <p className="text-slate-500 mt-1">{unit.kontrakan?.name}</p>
                                </div>
                                {statusBadge(unit.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-semibold text-slate-700 mb-2">Informasi</h3>
                                    <div className="space-y-2 text-sm text-slate-600">
                                        <p className="flex items-center gap-2"><Maximize size={14} /> Luas: {unit.size || '-'}</p>
                                        <p className="flex items-center gap-2"><Building2 size={14} /> Tipe: {unit.type || '-'}</p>
                                        <p className="flex items-center gap-2"><MapPin size={14} /> {unit.kontrakan?.address}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-700 mb-2">Harga Sewa</h3>
                                    <p className="text-3xl font-bold text-emerald-600">{formatRupiah(unit.price)}</p>
                                    <p className="text-sm text-slate-400">per bulan</p>
                                </div>
                            </div>

                            {unit.description && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-slate-700 mb-2">Deskripsi</h3>
                                    <p className="text-sm text-slate-600">{unit.description}</p>
                                </div>
                            )}

                            {unit.facilities?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-slate-700 mb-2">Fasilitas</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {unit.facilities.map(f => (
                                            <span key={f.id} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm">{f.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                                <Phone size={18} /> Hubungi via WhatsApp
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
