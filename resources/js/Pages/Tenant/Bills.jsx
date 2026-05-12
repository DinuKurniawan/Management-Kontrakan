import TenantLayout from '@/Layouts/TenantLayout';
import { Link } from '@inertiajs/react';
import { Card, formatRupiah, statusBadge, Pagination, Button } from '@/Components/UI';
import { Eye } from 'lucide-react';

export default function Bills({ bills }) {
    return (
        <TenantLayout title="Tagihan Saya">
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Periode</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Unit</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Total</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Jatuh Tempo</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Status</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.data.length === 0 && (
                                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Tidak ada tagihan.</td></tr>
                            )}
                            {bills.data.map(bill => (
                                <tr key={bill.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-medium text-slate-700">{bill.billing_month}</td>
                                    <td className="px-4 py-3 text-slate-600">{bill.lease?.unit?.unit_number}</td>
                                    <td className="px-4 py-3 font-semibold text-slate-800">{formatRupiah(bill.total_amount)}</td>
                                    <td className="px-4 py-3 text-slate-500">{bill.due_date?.split('T')[0]}</td>
                                    <td className="px-4 py-3">{statusBadge(bill.status)}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={`/tenant/bills/${bill.id}`}>
                                            <Button variant="ghost" size="sm"><Eye size={14} /></Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Pagination links={bills.links} />
        </TenantLayout>
    );
}
