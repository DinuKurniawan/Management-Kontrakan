import { useForm, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { Button } from '@/Components/UI';

export default function ForgotPassword() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '', reason: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                <Link href="/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"><ArrowLeft size={16} /> Kembali ke Login</Link>
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold text-emerald-600">Kontrakan</Link>
                    <p className="text-slate-500 mt-2">Lupa Password</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    {flash?.success ? (
                        <div className="text-center py-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <KeyRound size={24} className="text-emerald-600" />
                            </div>
                            <p className="text-sm text-emerald-700 font-medium">{flash.success}</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-slate-500 mb-4">Masukkan email Anda untuk mengajukan reset password ke admin.</p>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required autoFocus />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alasan (opsional)</label>
                                    <textarea value={data.reason} onChange={e => setData('reason', e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Contoh: Lupa password akun saya" />
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    <KeyRound size={16} /> Ajukan Reset Password
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
