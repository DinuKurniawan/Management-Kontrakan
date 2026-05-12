import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { formatRupiah, Pagination, statusBadge } from '@/Components/UI';

export default function Units({ units }) {
    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800">Daftar Unit</h1>
                    <p className="text-slate-500 mt-2">Temukan unit kontrakan yang sesuai kebutuhan Anda</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {units.data.map((unit, i) => (
                        <motion.div key={unit.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <Link href={`/units/${unit.id}`} className="block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src={unit.image ? `/storage/${unit.image}` : `https://placehold.co/400x300/e2e8f0/94a3b8?text=Unit+${unit.unit_number}`} alt={`Unit ${unit.unit_number}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-slate-800">Unit {unit.unit_number}</h3>
                                        {statusBadge(unit.status)}
                                    </div>
                                    <p className="text-sm text-slate-500 mb-2">{unit.kontrakan?.name}</p>
                                    {unit.size && <p className="text-xs text-slate-400 mb-3">Luas: {unit.size}</p>}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {unit.facilities?.slice(0, 4).map(f => (
                                            <span key={f.id} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{f.name}</span>
                                        ))}
                                    </div>
                                    <p className="text-lg font-bold text-emerald-600">{formatRupiah(unit.price)}<span className="text-xs text-slate-400">/bln</span></p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <Pagination links={units.links} />
            </div>
        </PublicLayout>
    );
}
