import TenantLayout from '@/Layouts/TenantLayout';
import { useForm, Link } from '@inertiajs/react';
import { Card, formatRupiah, statusBadge, Button } from '@/Components/UI';
import { ArrowLeft, Upload } from 'lucide-react';

export default function BillDetail({ bill }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: bill.total_amount, payment_method: 'transfer', proof_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/tenant/bills/${bill.id}/pay`, { forceFormData: true });
    };

    const canPay = ['unpaid', 'overdue'].includes(bill.status);

    return (
        <TenantLayout title="Detail Tagihan">
            <Link href="/tenant/bills" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>

            <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Tagihan {bill.billing_month}</h3>
                    {statusBadge(bill.status)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><p className="text-slate-500">Unit</p><p className="font-medium">{bill.lease?.unit?.unit_number}</p></div>
                    <div><p className="text-slate-500">Jatuh Tempo</p><p className="font-medium">{bill.due_date?.split('T')[0]}</p></div>
                    <div><p className="text-slate-500">Sewa</p><p className="font-medium">{formatRupiah(bill.rent_amount)}</p></div>
                    <div><p className="text-slate-500">Listrik</p><p className="font-medium">{formatRupiah(bill.electricity_amount)}</p></div>
                    <div><p className="text-slate-500">Air</p><p className="font-medium">{formatRupiah(bill.water_amount)}</p></div>
                    <div><p className="text-slate-500">Kebersihan</p><p className="font-medium">{formatRupiah(bill.cleaning_amount)}</p></div>
                    {bill.penalty_amount > 0 && <div><p className="text-slate-500">Denda</p><p className="font-medium text-red-600">{formatRupiah(bill.penalty_amount)}</p></div>}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-800">Total</span>
                        <span className="text-xl font-bold text-emerald-600">{formatRupiah(bill.total_amount)}</span>
                    </div>
                </div>
            </Card>

            {canPay && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Upload Bukti Pembayaran</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah</label>
                                <input type="number" value={data.amount} onChange={e => setData('amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Metode</label>
                                <select value={data.payment_method} onChange={e => setData('payment_method', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                    <option value="transfer">Transfer</option>
                                    <option value="qris">QRIS</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bukti Pembayaran (wajib)</label>
                            <input type="file" accept="image/*" onChange={e => setData('proof_image', e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700" required />
                            {errors.proof_image && <p className="text-xs text-red-500 mt-1">{errors.proof_image}</p>}
                        </div>
                        <Button type="submit" disabled={processing}><Upload size={16} /> Kirim Bukti Pembayaran</Button>
                    </form>
                </Card>
            )}

            {/* Payment History */}
            {bill.payments?.length > 0 && (
                <Card className="p-6 mt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Riwayat Pembayaran</h3>
                    <div className="space-y-3">
                        {bill.payments.map(p => (
                            <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{formatRupiah(p.amount)}</p>
                                    <p className="text-xs text-slate-400">{p.payment_date?.split('T')[0]} • {p.payment_method?.toUpperCase()}</p>
                                </div>
                                {statusBadge(p.status)}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </TenantLayout>
    );
}
