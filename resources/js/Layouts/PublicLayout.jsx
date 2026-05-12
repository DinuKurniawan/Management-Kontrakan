import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, Home, Building2, Info, Phone, LogIn, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { auth } = usePage().props;

    const navLinks = [
        { href: '/', label: 'Beranda', icon: Home },
        { href: '/units', label: 'Unit', icon: Building2 },
        { href: '/about', label: 'Tentang', icon: Info },
        { href: '/contact', label: 'Kontak', icon: Phone },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-emerald-600">
                                Kontrakan
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className="text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium">
                                    {link.label}
                                </Link>
                            ))}
                            {auth.user ? (
                                <Link href={auth.user.role === 'super_admin' ? '/dashboard' : auth.user.role === 'admin' ? '/admin/dashboard' : '/tenant/dashboard'} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">
                                    Login
                                </Link>
                            )}
                        </div>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-600">
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden bg-white border-t">
                            <div className="px-4 py-3 space-y-2">
                                {navLinks.map(link => (
                                    <Link key={link.href} href={link.href} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>
                                        {link.label}
                                    </Link>
                                ))}
                                <Link href="/login" className="block px-3 py-2 text-emerald-600 font-medium" onClick={() => setMobileOpen(false)}>
                                    Login
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main>{children}</main>

            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-3">Management Kontrakan</h3>
                            <p className="text-sm">Sistem manajemen kontrakan modern untuk kemudahan pengelolaan properti.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Link</h4>
                            <div className="space-y-2 text-sm">
                                {navLinks.map(link => (
                                    <Link key={link.href} href={link.href} className="block hover:text-white transition-colors">{link.label}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Kontak</h4>
                            <div className="space-y-2 text-sm">
                                <p>Jl. Harmoni No. 45, Jakarta Selatan</p>
                                <p>+62 812-3456-7890</p>
                                <p>info@kontrakan.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
                        &copy; {new Date().getFullYear()} Management Kontrakan. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors" aria-label="Chat WhatsApp">
                <MessageCircle size={28} />
            </a>
        </div>
    );
}
