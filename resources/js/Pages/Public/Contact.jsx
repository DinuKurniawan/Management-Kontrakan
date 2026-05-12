import PublicLayout from '@/Layouts/PublicLayout';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/Components/UI';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', subject: '', message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <PublicLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-800 mb-6">Hubungi Kami</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { icon: MapPin, label: 'Alamat', value: 'Jl. Harmoni No. 45, Jakarta Selatan' },
                            { icon: Phone, label: 'WhatsApp', value: '+62 812-3456-7890' },
                            { icon: Mail, label: 'Email', value: 'info@kontrakan.com' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
                                <item.icon size={24} className="text-emerald-600 mx-auto mb-2" />
                                <p className="text-xs text-slate-400">{item.label}</p>
                                <p className="text-sm font-medium text-slate-700 mt-1">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Kirim Pesan</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Subjek</label>
                                    <input type="text" value={data.subject} onChange={e => setData('subject', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
                                <textarea value={data.message} onChange={e => setData('message', e.target.value)} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" required />
                                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                            </div>
                            <Button type="submit" disabled={processing}>
                                <Send size={16} /> Kirim Pesan
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
