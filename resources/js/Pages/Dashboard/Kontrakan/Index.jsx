import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge } from '@/Components/UI';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ kontrakans, filters }) {
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        { label: 'Nama', key: 'name' },
        { label: 'Alamat', render: (row) => <span className="text-xs text-slate-500 line-clamp-1">{row.address}</span> },
        { label: 'Unit', render: (row) => row.units_count },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    return (
        <DashboardLayout title="Manajemen Kontrakan">
            <DataTable
                columns={columns}
                data={kontrakans.data}
                pagination={kontrakans}
                filters={filters}
                searchRoute="/dashboard/kontrakan"
                createRoute="/dashboard/kontrakan/create"
                createLabel="Tambah Kontrakan"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/kontrakan/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/kontrakan/${deleteId}`); setDeleteId(null); }} message="Yakin ingin menghapus kontrakan ini?" />
        </DashboardLayout>
    );
}
