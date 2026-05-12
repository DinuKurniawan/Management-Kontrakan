import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ bill, leases }) {
    const isEdit = !!bill;
    const { data, setData, post, put, processing, errors } = useForm({
        lease_id: bill?.lease_id || '',
        billing_month: bill?.billing_month || new Date().toISOString().slice(0, 7),
        rent_amount: bill?.rent_amount || '',
        electricity_amount: bill?.electricity_amount || '0',
        water_amount: bill?.water_amount || '0',
        cleaning_amount: bill?.cleaning_amount || '0',
        penalty_amount: bill?.penalty_amount || '0',
        due_date: bill?.due_date?.split('T')[0] || '',
        status: bill?.status || 'unpaid',
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? put(`/dashboard/bills/${bill.id}`) : post('/dashboard/bills');
    };

    return (
        <DashboardLayout title={isEdit ? 'Edit Tagihan' : 'Buat Tagihan'}>
            <div className="max-w-2xl">
                <Link href="/dashboard/bills" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        {!isEdit && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kontrak</label>
                                <select value={data.lease_id} onChange={e => setData('lease_id', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                                    <option value="">Pilih Kontrak</option>
                                    {leases?.map(l => <option key={l.id} value={l.id}>{l.tenant?.user?.name} - Unit {l.unit?.unit_number}</option>)}
                                </select>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Periode</label>
                                <input type="month" value={data.billing_month} onChange={e => setData('billing_month', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Jatuh Tempo</label>
                                <input type="date" value={data.due_date} onChange={e => setData('due_date', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Sewa</label><input type="number" value={data.rent_amount} onChange={e => setData('rent_amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Listrik</label><input type="number" value={data.electricity_amount} onChange={e => setData('electricity_amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Air</label><input type="number" value={data.water_amount} onChange={e => setData('water_amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Kebersihan</label><input type="number" value={data.cleaning_amount} onChange={e => setData('cleaning_amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Denda</label><input type="number" value={data.penalty_amount} onChange={e => setData('penalty_amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                <option value="unpaid">Belum Bayar</option>
                                <option value="pending_verification">Menunggu Verifikasi</option>
                                <option value="paid">Lunas</option>
                                <option value="overdue">Telat</option>
                            </select>
                        </div>
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
