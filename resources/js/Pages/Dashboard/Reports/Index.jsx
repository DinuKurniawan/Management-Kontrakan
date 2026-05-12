import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, StatCard, formatRupiah, Button } from '@/Components/UI';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Building2, FileDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ monthlyData, summary, year }) {
    const [selectedYear, setSelectedYear] = useState(year);

    const changeYear = (y) => {
        setSelectedYear(y);
        router.get('/dashboard/reports', { year: y }, { preserveState: true });
    };

    return (
        <DashboardLayout title="Laporan Keuangan">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <select value={selectedYear} onChange={e => changeYear(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <a href={`/dashboard/reports/export/pdf?year=${selectedYear}`}><Button variant="secondary" size="sm"><FileDown size={14} /> PDF</Button></a>
                    <a href={`/dashboard/reports/export/excel?year=${selectedYear}`}><Button variant="secondary" size="sm"><FileDown size={14} /> Excel</Button></a>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Pendapatan" value={formatRupiah(summary.total_income)} icon={TrendingUp} color="emerald" />
                <StatCard title="Total Pengeluaran" value={formatRupiah(summary.total_expense)} icon={TrendingDown} color="amber" />
                <StatCard title="Laba Bersih" value={formatRupiah(summary.total_profit)} icon={DollarSign} color="blue" />
                <StatCard title="Occupancy Rate" value={`${summary.occupancy_rate}%`} icon={Building2} color="purple" />
            </div>

            <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Grafik Pendapatan & Pengeluaran {selectedYear}</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
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

            <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Laba Bersih Bulanan</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}jt`} />
                            <Tooltip formatter={v => formatRupiah(v)} />
                            <Line type="monotone" dataKey="profit" name="Laba" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </DashboardLayout>
    );
}
