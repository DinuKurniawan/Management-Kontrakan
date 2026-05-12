import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ lease, tenants, units }) {
    const isEdit = !!lease;
    const { data, setData, post, put, processing, errors } = useForm({
        tenant_id: lease?.tenant_id || '',
        unit_id: lease?.unit_id || '',
        start_date: lease?.start_date?.split('T')[0] || '',
        end_date: lease?.end_date?.split('T')[0] || '',
        monthly_price: lease?.monthly_price || '',
        deposit: lease?.deposit || '0',
        status: lease?.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? put(`/dashboard/leases/${lease.id}`) : post('/dashboard/leases');
    };

    return (
        <DashboardLayout title={isEdit ? 'Edit Kontrak' : 'Buat Kontrak'}>
            <div className="max-w-2xl">
                <Link href="/dashboard/leases" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Penyewa</label>
                                <select value={data.tenant_id} onChange={e => setData('tenant_id', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                                    <option value="">Pilih Penyewa</option>
                                    {tenants.map(t => <option key={t.id} value={t.id}>{t.user?.name}</option>)}
                                </select>
                                {errors.tenant_id && <p className="text-xs text-red-500 mt-1">{errors.tenant_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                                <select value={data.unit_id} onChange={e => setData('unit_id', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                                    <option value="">Pilih Unit</option>
                                    {units.map(u => <option key={u.id} value={u.id}>{u.unit_number}</option>)}
                                </select>
                                {errors.unit_id && <p className="text-xs text-red-500 mt-1">{errors.unit_id}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Mulai</label>
                                <input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Selesai</label>
                                <input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Harga Sewa/Bulan</label>
                                <input type="number" value={data.monthly_price} onChange={e => setData('monthly_price', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Deposit</label>
                                <input type="number" value={data.deposit} onChange={e => setData('deposit', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                <option value="active">Aktif</option>
                                <option value="completed">Selesai</option>
                                <option value="cancelled">Dibatalkan</option>
                            </select>
                        </div>
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
