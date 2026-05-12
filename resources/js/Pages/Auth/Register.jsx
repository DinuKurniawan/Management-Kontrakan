import { useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/Components/UI';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '', email: '', phone: '', password: '', password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold text-emerald-600">Kontrakan</Link>
                    <p className="text-slate-500 mt-2">Buat akun baru</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">No. Telepon</label>
                            <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password</label>
                            <div className="relative">
                                <input type={showConfirm ? 'text' : 'password'} value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10" required />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" disabled={processing} className="w-full">
                            <UserPlus size={16} /> Daftar
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-4">
                    Sudah punya akun? <Link href="/login" className="text-emerald-600 hover:underline">Masuk</Link>
                </p>
            </motion.div>
        </div>
    );
}
