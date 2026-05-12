import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router, useForm } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge, formatRupiah, Modal } from '@/Components/UI';
import { Edit, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';

export default function Index({ bills, filters }) {
    const [deleteId, setDeleteId] = useState(null);
    const [showGenerate, setShowGenerate] = useState(false);
    const generateForm = useForm({ month: new Date().toISOString().slice(0, 7) });

    const columns = [
        { label: 'Penyewa', render: (row) => row.lease?.tenant?.user?.name },
        { label: 'Unit', render: (row) => row.lease?.unit?.unit_number },
        { label: 'Periode', key: 'billing_month' },
        { label: 'Total', render: (row) => formatRupiah(row.total_amount) },
        { label: 'Jatuh Tempo', render: (row) => row.due_date?.split('T')[0] },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    return (
        <DashboardLayout title="Manajemen Tagihan">
            <div className="flex items-center gap-3 mb-4">
                <Button onClick={() => setShowGenerate(true)} variant="secondary"><Zap size={16} /> Generate Tagihan</Button>
            </div>
            <DataTable
                columns={columns}
                data={bills.data}
                pagination={bills}
                filters={filters}
                searchRoute="/dashboard/bills"
                createRoute="/dashboard/bills/create"
                createLabel="Buat Tagihan"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/bills/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/bills/${deleteId}`); setDeleteId(null); }} />

            <Modal show={showGenerate} onClose={() => setShowGenerate(false)} title="Generate Tagihan Bulanan">
                <form onSubmit={(e) => { e.preventDefault(); generateForm.post('/dashboard/bills/generate', { onSuccess: () => setShowGenerate(false) }); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Bulan</label>
                        <input type="month" value={generateForm.data.month} onChange={e => generateForm.setData('month', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                    </div>
                    <Button type="submit" disabled={generateForm.processing}><Zap size={16} /> Generate</Button>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
