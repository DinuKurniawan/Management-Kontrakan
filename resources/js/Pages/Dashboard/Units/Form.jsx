import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ unit, kontrakans, facilities }) {
    const isEdit = !!unit;
    const { data, setData, post, processing, errors } = useForm({
        kontrakan_id: unit?.kontrakan_id || '',
        unit_number: unit?.unit_number || '',
        type: unit?.type || '',
        price: unit?.price || '',
        status: unit?.status || 'available',
        description: unit?.description || '',
        size: unit?.size || '',
        image: null,
        facilities: unit?.facilities?.map(f => f.id) || [],
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(`/dashboard/units/${unit.id}`, { forceFormData: true });
        } else {
            post('/dashboard/units', { forceFormData: true });
        }
    };

    const toggleFacility = (id) => {
        setData('facilities', data.facilities.includes(id) ? data.facilities.filter(f => f !== id) : [...data.facilities, id]);
    };

    return (
        <DashboardLayout title={isEdit ? 'Edit Unit' : 'Tambah Unit'}>
            <div className="max-w-2xl">
                <Link href="/dashboard/units" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kontrakan</label>
                                <select value={data.kontrakan_id} onChange={e => setData('kontrakan_id', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                                    <option value="">Pilih Kontrakan</option>
                                    {kontrakans.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                                </select>
                                {errors.kontrakan_id && <p className="text-xs text-red-500 mt-1">{errors.kontrakan_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Unit</label>
                                <input type="text" value={data.unit_number} onChange={e => setData('unit_number', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                {errors.unit_number && <p className="text-xs text-red-500 mt-1">{errors.unit_number}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tipe</label>
                                <input type="text" value={data.type} onChange={e => setData('type', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Harga Sewa</label>
                                <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Luas</label>
                                <input type="text" value={data.size} onChange={e => setData('size', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                <option value="available">Tersedia</option>
                                <option value="occupied">Terisi</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">Fasilitas</label>
                            <div className="flex flex-wrap gap-2">
                                {facilities.map(f => (
                                    <button key={f.id} type="button" onClick={() => toggleFacility(f.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${data.facilities.includes(f.id) ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                        {f.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
