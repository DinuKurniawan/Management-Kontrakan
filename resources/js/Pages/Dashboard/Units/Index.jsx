import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge, formatRupiah } from '@/Components/UI';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ units, filters }) {
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        { label: 'Unit', render: (row) => <span className="font-medium">{row.unit_number}</span> },
        { label: 'Kontrakan', render: (row) => row.kontrakan?.name },
        { label: 'Tipe', key: 'type' },
        { label: 'Harga', render: (row) => formatRupiah(row.price) },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    return (
        <DashboardLayout title="Manajemen Unit">
            <DataTable
                columns={columns}
                data={units.data}
                pagination={units}
                filters={filters}
                searchRoute="/dashboard/units"
                createRoute="/dashboard/units/create"
                createLabel="Tambah Unit"
                actions={(row) => (
                    <div className="flex items-center gap-2 justify-end">
                        <Link href={`/dashboard/units/${row.id}/edit`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/units/${deleteId}`); setDeleteId(null); }} message="Yakin ingin menghapus unit ini?" />
        </DashboardLayout>
    );
}
