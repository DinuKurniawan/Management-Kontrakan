import TenantLayout from '@/Layouts/TenantLayout';
import { Card, formatRupiah, statusBadge, Pagination, Button } from '@/Components/UI';
import { Download } from 'lucide-react';

export default function Payments({ payments }) {
    return (
        <TenantLayout title="Riwayat Pembayaran">
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Tanggal</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Unit</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Jumlah</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Metode</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Status</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.data.length === 0 && (
                                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Belum ada pembayaran.</td></tr>
                            )}
                            {payments.data.map(payment => (
                                <tr key={payment.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="px-4 py-3 text-slate-700">{payment.payment_date?.split('T')[0]}</td>
                                    <td className="px-4 py-3 text-slate-600">{payment.bill?.lease?.unit?.unit_number}</td>
                                    <td className="px-4 py-3 font-semibold text-slate-800">{formatRupiah(payment.amount)}</td>
                                    <td className="px-4 py-3 text-slate-600">{payment.payment_method?.toUpperCase()}</td>
                                    <td className="px-4 py-3">{statusBadge(payment.status)}</td>
                                    <td className="px-4 py-3 text-right">
                                        {payment.status === 'accepted' && (
                                            <a href={`/tenant/payments/${payment.id}/invoice`}>
                                                <Button variant="ghost" size="sm"><Download size={14} /></Button>
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Pagination links={payments.links} />
        </TenantLayout>
    );
}
