import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ expense, categories }) {
    const isEdit = !!expense;
    const { data, setData, post, processing, errors } = useForm({
        expense_category_id: expense?.expense_category_id || '',
        title: expense?.title || '',
        amount: expense?.amount || '',
        expense_date: expense?.expense_date?.split('T')[0] || new Date().toISOString().split('T')[0],
        description: expense?.description || '',
        proof_image: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(`/dashboard/expenses/${expense.id}`, { forceFormData: true });
        } else {
            post('/dashboard/expenses', { forceFormData: true });
        }
    };

    return (
        <DashboardLayout title={isEdit ? 'Edit Pengeluaran' : 'Catat Pengeluaran'}>
            <div className="max-w-2xl">
                <Link href="/dashboard/expenses" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                            <select value={data.expense_category_id} onChange={e => setData('expense_category_id', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                                <option value="">Pilih Kategori</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nominal</label>
                                <input type="number" value={data.amount} onChange={e => setData('amount', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                                <input type="date" value={data.expense_date} onChange={e => setData('expense_date', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bukti</label>
                            <input type="file" accept="image/*" onChange={e => setData('proof_image', e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700" />
                        </div>
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
