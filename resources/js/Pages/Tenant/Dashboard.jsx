import TenantLayout from '@/Layouts/TenantLayout';
import { StatCard, Card, formatRupiah, statusBadge } from '@/Components/UI';
import { Building2, Receipt, CreditCard, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ lease, outstanding, recentPayments }) {
    return (
        <TenantLayout title="Dashboard">
            {/* Active Lease Info */}
            {lease && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="p-6 mb-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Unit Saya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Unit</p>
                                <p className="font-semibold text-slate-800">{lease.unit?.unit_number}</p>
                                <p className="text-xs text-slate-400">{lease.unit?.kontrakan?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Harga Sewa</p>
                                <p className="font-semibold text-emerald-600">{formatRupiah(lease.monthly_price)}/bulan</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Status Kontrak</p>
                                {statusBadge(lease.status)}
                                <p className="text-xs text-slate-400 mt-1">s/d {lease.end_date?.split('T')[0]}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <StatCard title="Total Tunggakan" value={formatRupiah(outstanding || 0)} icon={AlertTriangle} color="red" />
                <StatCard title="Pembayaran Terakhir" value={recentPayments?.length || 0} icon={CreditCard} color="emerald" subtitle="transaksi" />
            </div>

            {/* Recent Payments */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Pembayaran Terbaru</h3>
                <div className="space-y-3">
                    {(!recentPayments || recentPayments.length === 0) && <p className="text-sm text-slate-400">Belum ada pembayaran.</p>}
                    {recentPayments?.map(payment => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <div>
                                <p className="text-sm font-medium text-slate-700">{payment.bill?.billing_month}</p>
                                <p className="text-xs text-slate-400">{payment.payment_date?.split('T')[0]}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-800">{formatRupiah(payment.amount)}</p>
                                {statusBadge(payment.status)}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </TenantLayout>
    );
}
