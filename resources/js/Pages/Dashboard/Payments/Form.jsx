import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button, formatRupiah } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ bills }) {
    const { data, setData, post, processing, errors } = useForm({
        bill_id: '', payment_date: new Date().toISOString().split('T')[0], amount: '', payment_method: 'transfer', proof_image: null, notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/dashboard/payments', { forceFormData: true });
    };

    return (
        <DashboardLayout title="Catat Pembayaran">
            <div className="max-w-2xl">
                <Link href="/dashboard/payments" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tagihan</label>
                            <select value={data.bill_id} onChange={e => setData('bill_id', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                                <option value="">Pilih Tagihan</option>
                                {bills?.map(b => <option key={b.id} value={b.id}>{b.lease?.tenant?.user?.name} - Unit {b.lease?.unit?.unit_number} - {b.billing_month} ({formatRupiah(b.total_amount)})</option>)}
                            </select>
                            {errors.bill_id && <p className="text-xs text-red-500 mt-1">{errors.bill_id}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Bayar</label>
                                <input type="date" value={data.payment_date} onChange={e => setData('payment_date', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah</label>
                                <input type="number" value={data.amount} onChange={e => setData('amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Metode Pembayaran</label>
                            <select value={data.payment_method} onChange={e => setData('payment_method', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                <option value="cash">Cash</option>
                                <option value="transfer">Transfer</option>
                                <option value="qris">QRIS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bukti Pembayaran</label>
                            <input type="file" accept="image/*" onChange={e => setData('proof_image', e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Catatan</label>
                            <textarea value={data.notes} onChange={e => setData('notes', e.target.value)} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                        </div>
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
