import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, router } from '@inertiajs/react';
import { Button, ConfirmDialog } from '@/Components/UI';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useState } from 'react';

export default function Index({ facilities }) {
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const { data, setData, post, put, processing, reset } = useForm({ name: '', icon: '' });

    const submit = (e) => {
        e.preventDefault();
        if (editId) {
            put(`/dashboard/facilities/${editId}`, { onSuccess: () => { setEditId(null); reset(); } });
        } else {
            post('/dashboard/facilities', { onSuccess: () => reset() });
        }
    };

    const startEdit = (f) => { setEditId(f.id); setData({ name: f.name, icon: f.icon || '' }); };

    return (
        <DashboardLayout title="Manajemen Fasilitas">
            <div className="max-w-2xl">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <form onSubmit={submit} className="flex items-end gap-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Fasilitas</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                        </div>
                        <div className="w-32">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                            <input type="text" value={data.icon} onChange={e => setData('icon', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <Button type="submit" disabled={processing}>{editId ? <Save size={16} /> : <Plus size={16} />} {editId ? 'Update' : 'Tambah'}</Button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100"><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Nama</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Icon</th><th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Unit</th><th className="text-right px-4 py-3 text-xs font-semibold text-slate-500">Aksi</th></tr></thead>
                        <tbody>
                            {facilities.map(f => (
                                <tr key={f.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="px-4 py-3 text-slate-700">{f.name}</td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{f.icon}</td>
                                    <td className="px-4 py-3 text-slate-500">{f.units_count}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="sm" onClick={() => startEdit(f)}><Edit size={14} /></Button>
                                        <Button variant="ghost" size="sm" onClick={() => setDeleteId(f.id)}><Trash2 size={14} className="text-red-500" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmDialog show={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { router.delete(`/dashboard/facilities/${deleteId}`); setDeleteId(null); }} message="Yakin ingin menghapus fasilitas ini?" />
        </DashboardLayout>
    );
}
