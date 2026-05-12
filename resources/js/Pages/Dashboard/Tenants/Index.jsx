import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge } from '@/Components/UI';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ tenants, filters }) {
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        { label: 'Nama', render: (row) => row.user?.name },
        { label: 'Email', render: (row) => row.user?.email },
        { label: 'Telepon', render: (row) => row.user?.phone || '-' },
        { label: 'No. KTP', render: (row) => row.identity_number || '-' },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    return (
        <DashboardLayout title="Manajemen Penyewa">
            <DataTable
                columns={columns}
                data={tenants.data}
                pagination={tenants}
                filters={filters}
                searchRoute="/dashboard/tenants"
                createRoute="/dashboard/tenants/create"
                createLabel="Tambah Penyewa"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/tenants/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/tenants/${deleteId}`); setDeleteId(null); }} message="Yakin ingin menghapus penyewa ini?" />
        </DashboardLayout>
    );
}
