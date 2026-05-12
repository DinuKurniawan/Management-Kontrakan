import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge, formatRupiah } from '@/Components/UI';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ leases, filters }) {
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        { label: 'Penyewa', render: (row) => row.tenant?.user?.name },
        { label: 'Unit', render: (row) => row.unit?.unit_number },
        { label: 'Harga/Bulan', render: (row) => formatRupiah(row.monthly_price) },
        { label: 'Mulai', render: (row) => row.start_date?.split('T')[0] },
        { label: 'Selesai', render: (row) => row.end_date?.split('T')[0] },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    return (
        <DashboardLayout title="Manajemen Kontrak">
            <DataTable
                columns={columns}
                data={leases.data}
                pagination={leases}
                filters={filters}
                searchRoute="/dashboard/leases"
                createRoute="/dashboard/leases/create"
                createLabel="Buat Kontrak"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/leases/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/leases/${deleteId}`); setDeleteId(null); }} message="Yakin ingin menghapus kontrak ini?" />
        </DashboardLayout>
    );
}
