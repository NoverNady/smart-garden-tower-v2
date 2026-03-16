import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Leaf, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const { t, toggle, dir, lang } = useLang()

    const links = [
        { label: t.nav.home, to: '/' },
        { label: t.nav.hydroponics, to: '/hydroponics' },
        { label: t.nav.technology, to: '/technology' },
        { label: t.nav.services, to: '/services' },
        { label: t.nav.contact, to: '/contact' },
        { label: t.nav.dashboard, to: '/dashboard/dashboard.html', external: true },
    ]

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    useEffect(() => setMobileOpen(false), [location])

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-5 left-0 right-0 mx-auto z-50 w-[92%] max-w-6xl rounded-full
            bg-white/95 backdrop-blur-xl border border-white/60 transition-all duration-300
            ${scrolled ? 'shadow-2xl shadow-green-900/15 top-3' : 'shadow-lg shadow-green-900/10'}`}
            dir="ltr"
        >
            <div className="flex items-center justify-between px-8 py-4">

                <div className="flex-1 flex justify-start">
                    <Link to="/" className="flex items-center gap-3 text-2xl font-black text-[#0A3A2A] hover:text-emerald-600 transition-colors">
                        <img src="/logo-circle.png" alt="SGT Logo" className="w-[38px] h-[38px] drop-shadow-sm" /> SGT
                    </Link>
                </div>

                {/* CENTER: Desktop Links */}
                <div className="hidden lg:flex flex-1 justify-center" dir={dir}>
                    <ul className="flex items-center gap-5 lg:gap-8 xl:gap-10">
                        {links.map(({ label, to, external }) => (
                            <li key={to}>
                                <Link to={to} reloadDocument={external}
                                    className={`text-[15px] font-bold whitespace-nowrap transition-colors relative py-1
                                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-emerald-500 after:transition-all
                                    ${location.pathname === to
                                        ? 'text-emerald-600 after:w-full'
                                        : 'text-[#2D4A3E] hover:text-emerald-600 after:w-0 hover:after:w-full'}`}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT: Actions */}
                <div className="flex-1 flex justify-end items-center gap-4">
                    <button
                        onClick={toggle}
                        className="bg-emerald-600 text-white px-7 py-2.5 rounded-full text-[14px] font-black tracking-wide hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                    >
                        {lang === 'ar' ? 'English' : 'عربي'}
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-[#0A3A2A]"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden rounded-b-3xl"
                    >
                        <ul className="flex flex-col items-center gap-2 py-4 px-4" dir={dir}>
                            {links.map(({ label, to, external }) => (
                                <li key={to} className="w-full text-center">
                                    <Link to={to} onClick={() => setMobileOpen(false)} reloadDocument={external}
                                        className={`block w-full py-2 text-sm font-bold rounded-xl transition-colors
                                        ${location.pathname === to
                                            ? 'text-emerald-600 bg-emerald-50'
                                            : 'text-[#2D4A3E] hover:bg-gray-50'}`}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
