import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const PV = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }
const infoIcons = [Mail, Phone, MapPin, Clock]
const infoColors = ['bg-blue-50 text-blue-600', 'bg-emerald-50 text-emerald-600', 'bg-amber-50 text-amber-600', 'bg-violet-50 text-violet-600']

export default function Contact() {
    const { t, dir } = useLang()
    const h = t.contact

    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
    const [touched, setTouched] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))
    const blur = (f) => () => setTouched(p => ({ ...p, [f]: true }))
    const ok = { name: form.name.trim().length >= 2, email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email), message: form.message.trim().length >= 5 }
    const canSubmit = ok.name && ok.email && ok.message
    const submit = (e) => { e.preventDefault(); if (!canSubmit) return; setSubmitted(true); setTimeout(() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); setTouched({}) }, 4000) }
    const cls = (f) => { const b = 'w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 placeholder:text-gray-400'; if (!touched[f]) return `${b} border-2 border-transparent focus:border-emerald-500 focus:bg-white`; return ok[f] ? `${b} border-2 border-emerald-400 bg-emerald-50/30` : `${b} border-2 border-red-400 bg-red-50/30` }

    return (
        <motion.div variants={PV} initial="initial" animate="animate" exit="exit">
            <section className="pt-48 pb-12 px-4" dir={dir}>
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">{h.tag}</p>
                        <h1 className="text-[#0A3A2A] text-3xl md:text-5xl font-black mb-4">{h.title}</h1>
                        <p className="text-[#2D4A3E] max-w-md mx-auto text-sm">{h.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 flex flex-col justify-center gap-8">
                            <h3 className="text-[#0A3A2A] text-xl font-bold">{h.infoTitle}</h3>
                            {h.info.map(({ label, value }, i) => {
                                const Icon = infoIcons[i]
                                const color = infoColors[i]
                                return (
                                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        whileHover={{ x: dir === 'rtl' ? -4 : 4 }} className="flex items-start gap-4 group cursor-default">
                                        <div className={`w-11 h-11 rounded-xl ${color.split(' ')[0]} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                                            <Icon className={`w-5 h-5 ${color.split(' ')[1]}`} /></div>
                                        <div><p className="text-xs text-[#2D4A3E]/50 font-semibold mb-0.5">{label}</p><p className="text-[#0A3A2A] text-sm font-bold">{value}</p></div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                        <motion.form initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={submit}
                            className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 flex flex-col gap-4 relative overflow-hidden">
                            <AnimatePresence>{submitted && (
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center gap-4 rounded-3xl">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                                        <CheckCircle2 className="w-20 h-20 text-emerald-500" /></motion.div>
                                    <p className="text-[#0A3A2A] text-xl font-black">{h.successMsg}</p>
                                </motion.div>
                            )}</AnimatePresence>
                            <h3 className="text-[#0A3A2A] text-xl font-bold mb-2">{h.formTitle}</h3>
                            <div><input type="text" placeholder={h.namePlaceholder} value={form.name} onChange={set('name')} onBlur={blur('name')} className={cls('name')} required />{touched.name && !ok.name && <p className="text-red-500 text-[10px] mt-1">{h.nameRequired}</p>}</div>
                            <input type="tel" placeholder={h.phonePlaceholder} value={form.phone} onChange={set('phone')} className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm outline-none border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all placeholder:text-gray-400" />
                            <div><input type="email" placeholder={h.emailPlaceholder} value={form.email} onChange={set('email')} onBlur={blur('email')} className={cls('email')} required />{touched.email && !ok.email && <p className="text-red-500 text-[10px] mt-1">{h.emailInvalid}</p>}</div>
                            <div><textarea placeholder={h.messagePlaceholder} value={form.message} onChange={set('message')} onBlur={blur('message')} rows={4} className={`${cls('message')} resize-none`} required />{touched.message && !ok.message && <p className="text-red-500 text-[10px] mt-1">{h.messageRequired}</p>}</div>
                            <motion.button type="submit" disabled={!canSubmit} whileHover={canSubmit ? { scale: 1.02 } : {}} whileTap={canSubmit ? { scale: 0.98 } : {}}
                                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${canSubmit ? 'bg-gradient-to-l from-emerald-600 to-green-500 hover:shadow-lg hover:shadow-emerald-500/25' : 'bg-gray-300 cursor-not-allowed'}`}>
                                <Send className="w-4 h-4" /> {h.submitBtn}
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
