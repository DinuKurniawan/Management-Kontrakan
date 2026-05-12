import DashboardLayout from '@/Layouts/DashboardLayout';
import { StatCard, Card, Badge, formatRupiah, statusBadge } from '@/Components/UI';
import { Building2, DoorOpen, Users, TrendingUp, AlertTriangle, Wallet, Receipt } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function Index({ stats, chartData, recentPayments, upcomingBills }) {
    return (
        <DashboardLayout title="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Unit" value={stats.total_units} icon={Building2} color="blue" />
                <StatCard title="Unit Tersedia" value={stats.available_units} icon={DoorOpen} color="emerald" />
                <StatCard title="Unit Terisi" value={stats.occupied_units} icon={Building2} color="purple" />
                <StatCard title="Penyewa Aktif" value={stats.active_tenants} icon={Users} color="amber" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Pendapatan Bulan Ini" value={formatRupiah(stats.monthly_income)} icon={TrendingUp} color="emerald" />
                <StatCard title="Total Tunggakan" value={formatRupiah(stats.total_outstanding)} icon={AlertTriangle} color="red" />
                <StatCard title="Pengeluaran Bulan Ini" value={formatRupiah(stats.monthly_expense)} icon={Wallet} color="amber" />
                <StatCard title="Occupancy Rate" value={`${stats.occupancy_rate}%`} icon={Receipt} color="blue" />
            </div>

            {/* Chart */}
            <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Pendapatan vs Pengeluaran</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}jt`} />
                            <Tooltip formatter={v => formatRupiah(v)} />
                            <Legend />
                            <Bar dataKey="income" name="Pendapatan" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" name="Pengeluaran" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Bills */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Tagihan Jatuh Tempo</h3>
                    <div className="space-y-3">
                        {upcomingBills?.length === 0 && <p className="text-sm text-slate-400">Tidak ada tagihan jatuh tempo.</p>}
                        {upcomingBills?.map(bill => (
                            <div key={bill.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{bill.lease?.tenant?.user?.name}</p>
                                    <p className="text-xs text-slate-400">Unit {bill.lease?.unit?.unit_number} • {bill.billing_month}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-800">{formatRupiah(bill.total_amount)}</p>
                                    {statusBadge(bill.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Payments */}
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
                                    <p className="text-sm font-semibold text-slate-800">{formatRupiah(payment.amount)}</p>
                                    {statusBadge(payment.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
