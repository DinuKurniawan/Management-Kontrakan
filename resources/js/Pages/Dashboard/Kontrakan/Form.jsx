import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ kontrakan }) {
    const isEdit = !!kontrakan;
    const { data, setData, post, put, processing, errors } = useForm({
        name: kontrakan?.name || '',
        address: kontrakan?.address || '',
        description: kontrakan?.description || '',
        status: kontrakan?.status || 'active',
        image: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(`/dashboard/kontrakan/${kontrakan.id}`, { forceFormData: true });
        } else {
            post('/dashboard/kontrakan', { forceFormData: true });
        }
    };

    return (
        <DashboardLayout title={isEdit ? 'Edit Kontrakan' : 'Tambah Kontrakan'}>
            <div className="max-w-2xl">
                <Link href="/dashboard/kontrakan" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                    <ArrowLeft size={16} /> Kembali
                </Link>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Kontrakan</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                            <textarea value={data.address} onChange={e => setData('address', e.target.value)} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" required />
                            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
                            <input type="file" accept="image/*" onChange={e => setData('image', e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
