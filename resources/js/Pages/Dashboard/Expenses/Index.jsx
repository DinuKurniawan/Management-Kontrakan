import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, formatRupiah } from '@/Components/UI';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ expenses, categories, filters }) {
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        { label: 'Judul', key: 'title' },
        { label: 'Kategori', render: (row) => row.category?.name },
        { label: 'Nominal', render: (row) => formatRupiah(row.amount) },
        { label: 'Tanggal', render: (row) => row.expense_date?.split('T')[0] },
        { label: 'Oleh', render: (row) => row.creator?.name },
    ];

    return (
        <DashboardLayout title="Manajemen Pengeluaran">
            <DataTable
                columns={columns}
                data={expenses.data}
                pagination={expenses}
                filters={filters}
                searchRoute="/dashboard/expenses"
                createRoute="/dashboard/expenses/create"
                createLabel="Catat Pengeluaran"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/expenses/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/expenses/${deleteId}`); setDeleteId(null); }} />
        </DashboardLayout>
    );
}
