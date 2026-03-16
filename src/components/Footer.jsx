import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
    const { t, dir } = useLang()

    const footerLinks = [
        { label: t.nav.home, to: '/' },
        { label: t.nav.hydroponics, to: '/hydroponics' },
        { label: t.nav.technology, to: '/technology' },
        { label: t.nav.services, to: '/services' },
        { label: t.nav.contact, to: '/contact' },
    ]

    return (
        <footer className="bg-[#071F15] text-white/60 pt-16 pb-8 px-4" dir={dir}>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-10 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Leaf className="w-5 h-5 text-emerald-400" />
                            <h4 className="text-white text-lg font-bold">{t.footer.brand}</h4>
                        </div>
                        <p className="text-sm leading-relaxed">{t.footer.desc}</p>
                    </div>
                    <div>
                        <h5 className="text-white font-bold text-sm mb-3">{t.footer.quickLinks}</h5>
                        <ul className="space-y-2">
                            {footerLinks.map(({ label, to }) => (
                                <li key={to}><Link to={to} className="text-sm hover:text-emerald-400 transition-colors">{label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold text-sm mb-3">{t.footer.contactUs}</h5>
                        <p className="text-sm mb-1">{t.footer.email}</p>
                        <p className="text-sm mb-1">{t.footer.phone}</p>
                        <p className="text-sm">{t.footer.address}</p>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-6 text-center">
                    <p className="text-xs text-white/30">{t.footer.copy}</p>
                </div>
            </div>
        </footer>
    )
}
