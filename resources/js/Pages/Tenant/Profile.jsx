import TenantLayout from '@/Layouts/TenantLayout';
import { useForm } from '@inertiajs/react';
import { Card, Button } from '@/Components/UI';
import { Save } from 'lucide-react';

export default function Profile({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put('/tenant/profile');
    };

    return (
        <TenantLayout title="Profil Saya">
            <div className="max-w-2xl">
                <Card className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Informasi Pribadi</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" value={user.email} disabled className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
                                    <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                                    <textarea value={data.address} onChange={e => setData('address', e.target.value)} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Ganti Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password Lama</label>
                                    <input type="password" value={data.current_password} onChange={e => setData('current_password', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {errors.current_password && <p className="text-xs text-red-500 mt-1">{errors.current_password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                                    <input type="password" value={data.new_password} onChange={e => setData('new_password', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {errors.new_password && <p className="text-xs text-red-500 mt-1">{errors.new_password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password Baru</label>
                                    <input type="password" value={data.new_password_confirmation} onChange={e => setData('new_password_confirmation', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" disabled={processing}><Save size={16} /> Simpan</Button>
                    </form>
                </Card>
            </div>
        </TenantLayout>
    );
}
