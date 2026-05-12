import DashboardLayout from '@/Layouts/DashboardLayout';
import DataTable from '@/Components/DataTable';
import { Link, router } from '@inertiajs/react';
import { Button, ConfirmDialog, statusBadge, formatRupiah } from '@/Components/UI';
import { Edit, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Index({ payments, filters }) {
    const [deleteId, setDeleteId] = useState(null);
    const [proofImage, setProofImage] = useState(null);

    const columns = [
        { label: 'Penyewa', render: (row) => row.bill?.lease?.tenant?.user?.name },
        { label: 'Unit', render: (row) => row.bill?.lease?.unit?.unit_number },
        { label: 'Tanggal', render: (row) => row.payment_date?.split('T')[0] },
        { label: 'Jumlah', render: (row) => formatRupiah(row.amount) },
        { label: 'Metode', render: (row) => row.payment_method?.toUpperCase() },
        { label: 'Status', render: (row) => statusBadge(row.status) },
    ];

    const handleVerify = (id, status) => {
        router.put(`/dashboard/payments/${id}/verify`, { status });
    };

    return (
        <DashboardLayout title="Manajemen Pembayaran">
            <DataTable
                columns={columns}
                data={payments.data}
                pagination={payments}
                filters={filters}
                searchRoute="/dashboard/payments"
                createRoute="/dashboard/payments/create"
                createLabel="Catat Pembayaran"
                actions={(row) => (
                    <div className="flex items-center gap-1 justify-end">
                        {row.proof_image && (
                            <Button variant="ghost" size="sm" onClick={() => setProofImage(row.proof_image)}><Eye size={14} className="text-blue-500" /></Button>
                        )}
                        {row.status === 'pending' && (
                            <>
                                <Button variant="ghost" size="sm" onClick={() => handleVerify(row.id, 'accepted')}><CheckCircle size={14} className="text-emerald-500" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => handleVerify(row.id, 'rejected')}><XCircle size={14} className="text-red-500" /></Button>
                            </>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 size={14} className="text-red-500" /></Button>
                    </div>
                )}
            />
            {proofImage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setProofImage(null)}>
                    <div className="bg-white rounded-2xl p-4 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-slate-800">Bukti Transfer</h3>
                            <button onClick={() => setProofImage(null)} className="text-slate-400 hover:text-slate-600">&times;</button>
                        </div>
                        <img src={`/storage/${proofImage}`} alt="Bukti Transfer" className="w-full rounded-xl" />
                    </div>
                </div>
            )}
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/payments/${deleteId}`); setDeleteId(null); }} />
        </DashboardLayout>
    );
}
