import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI';
import { Save, ArrowLeft } from 'lucide-react';

export default function Form({ tenant }) {
    const isEdit = !!tenant;
    const { data, setData, post, processing, errors } = useForm({
        name: tenant?.user?.name || '',
        email: tenant?.user?.email || '',
        phone: tenant?.user?.phone || '',
        address: tenant?.user?.address || '',
        password: '',
        identity_number: tenant?.identity_number || '',
        emergency_contact_name: tenant?.emergency_contact_name || '',
        emergency_contact_phone: tenant?.emergency_contact_phone || '',
        status: tenant?.status || 'active',
        identity_card_image: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(`/dashboard/tenants/${tenant.id}`, { forceFormData: true });
        } else {
            post('/dashboard/tenants', { forceFormData: true });
        }
    };

    return (
        <DashboardLayout title={isEdit ? 'Edit Penyewa' : 'Tambah Penyewa'}>
            <div className="max-w-2xl">
                <Link href="/dashboard/tenants" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">No. KTP</label>
                                <input type="text" value={data.identity_number} onChange={e => setData('identity_number', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        {!isEdit && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required={!isEdit} />
                                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                            <textarea value={data.address} onChange={e => setData('address', e.target.value)} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kontak Darurat</label>
                                <input type="text" value={data.emergency_contact_name} onChange={e => setData('emergency_contact_name', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">No. Kontak Darurat</label>
                                <input type="text" value={data.emergency_contact_phone} onChange={e => setData('emergency_contact_phone', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Foto KTP</label>
                            <input type="file" accept="image/*" onChange={e => setData('identity_card_image', e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700" />
                        </div>
                        {isEdit && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                </select>
                            </div>
                        )}
                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
