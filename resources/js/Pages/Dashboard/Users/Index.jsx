import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge, Badge } from '@/Components/UI';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ users, filters }) {
    const [deleteId, setDeleteId] = useState(null);

    const roleLabel = (role) => {
        const map = { super_admin: 'Super Admin', admin: 'Admin', penyewa: 'Penyewa' };
        return <Badge variant={role === 'super_admin' ? 'purple' : role === 'admin' ? 'info' : 'default'}>{map[role]}</Badge>;
    };

    const columns = [
        { label: 'Nama', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Role', render: (row) => roleLabel(row.role) },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    return (
        <DashboardLayout title="Manajemen User">
            <DataTable
                columns={columns}
                data={users.data}
                pagination={users}
                filters={filters}
                searchRoute="/dashboard/users"
                createRoute="/dashboard/users/create"
                createLabel="Tambah User"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/users/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/users/${deleteId}`); setDeleteId(null); }} message="Yakin ingin menghapus user ini?" />
        </DashboardLayout>
    );
}
