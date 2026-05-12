import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { router } from '@inertiajs/react';
import { Button, statusBadge } from '@/Components/UI';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Index({ requests }) {
    const columns = [
        { label: 'Nama', render: (row) => row.user?.name },
        { label: 'Email', render: (row) => row.user?.email },
        { label: 'Alasan', render: (row) => row.reason || '-' },
        { label: 'Tanggal', render: (row) => row.created_at?.split('T')[0] },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    const handleAction = (id, status) => {
        router.put(`/dashboard/reset-requests/${id}`, { status });
    };

    return (
        <DashboardLayout title="Permintaan Reset Password">
            <DataTable
                columns={columns}
                data={requests.data}
                pagination={requests}
                actions={(row) => row.status === 'pending' ? (
                    <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleAction(row.id, 'approved')}><CheckCircle size={14} className="text-emerald-500" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAction(row.id, 'rejected')}><XCircle size={14} className="text-red-500" /></Button>
                    </div>
                ) : null}
            />
        </DashboardLayout>
    );
}
