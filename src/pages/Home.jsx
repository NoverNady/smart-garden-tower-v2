import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Droplets, Zap, ShieldCheck, ArrowLeft, ArrowRight, AlertTriangle, Sparkles, FlaskConical, Bug, Server, Sprout, ScanEye, Apple, Home as HomeIcon, UtensilsCrossed, Building2, Maximize, Sun, MessageCircle } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const PV = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }

function useCountUp(target, dur = 1400) {
    const [c, setC] = useState(0); const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { let s = 0; const step = target / (dur / 16); const t = setInterval(() => { s += step; if (s >= target) { setC(target); clearInterval(t) } else setC(Math.floor(s)) }, 16); obs.disconnect() } }, { threshold: 0.3 })
        if (ref.current) obs.observe(ref.current); return () => obs.disconnect()
    }, [target, dur]); return [c, ref]
}

const statsRaw = [
    { icon: Droplets, val: 90, suf: '%', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20' },
    { icon: Maximize, val: 80, suf: '%', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/20' },
    { icon: Zap, val: 5, suf: 'x', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
    { icon: ShieldCheck, val: 0, suf: '%', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/20' },
]

const problemIcons = [FlaskConical, Bug, Server]
const problemColors = ['from-red-400 to-rose-500', 'from-amber-400 to-orange-500', 'from-violet-400 to-purple-500']
const stepIcons = [Sprout, ScanEye, Apple]
const useCaseIcons = [HomeIcon, UtensilsCrossed, Building2]
const useCaseGradients = ['from-emerald-500 to-green-600', 'from-teal-500 to-cyan-600', 'from-blue-500 to-indigo-600']
const cropImgs = ['/assets/crop-lettuce.png', '/assets/crop-spinach.png', '/assets/crop-mint-basil.png', '/assets/crop-coriander.png', '/assets/crop-tomatoes.png', '/assets/crop-strawberries.png']

function StatCard({ icon: Icon, val, suf, label, sub, color, glow, delay }) {
    const [count, ref] = useCountUp(val)
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -6, scale: 1.02 }} className={`bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-green-900/10 border border-white/70 text-center cursor-default transition-shadow hover:${glow}`}>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-6 shadow-lg ${glow}`}><Icon className="w-8 h-8 text-white" /></div>
            <div className="text-6xl md:text-7xl font-black bg-gradient-to-l from-[#10B981] to-[#047857] bg-clip-text text-transparent mb-2">{suf === 'x' ? `${count}x` : `${count}%`}</div>
            <p className="text-[#0A3A2A] text-base font-extrabold mb-2">{label}</p>
            <p className="text-[#2D4A3E]/60 text-xs leading-relaxed">{sub}</p>
        </motion.div>
    )
}


export default function Home() {
    const { t, dir, lang } = useLang()
    const h = t.home
    const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

    return (
        <motion.div variants={PV} initial="initial" animate="animate" exit="exit">

            {/* ══════════ 1. HERO with 3D Tower ══════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28" dir={dir}>
                <div className="absolute inset-0">
                    <img src="/assets/hero.png" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F0FDF4]/95 via-[#F0FDF4]/80 to-[#F0FDF4]" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <div className="flex flex-col items-center text-center">
                        {/* Text content */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
                            className="max-w-3xl">
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-emerald-600 text-xs font-bold tracking-[4px] uppercase mb-6">{h.heroTag}</motion.p>
                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="text-[#0A3A2A] text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                                {h.heroTitle1}<br /><span className="font-serif italic bg-gradient-to-l from-emerald-600 to-green-400 bg-clip-text text-transparent px-2 tracking-wide">{h.heroTitle2}</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[#2D4A3E] text-base md:text-lg leading-loose mb-12">
                                {h.heroDesc}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex justify-center gap-4 flex-wrap">
                                <Link to="/technology" className="px-10 py-4 bg-gradient-to-l from-emerald-600 to-green-500 text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2">{h.heroCta1} <ArrowIcon className="w-4 h-4" /></Link>
                                <Link to="/contact" className="px-10 py-4 border-2 border-[#0A3A2A] text-[#0A3A2A] rounded-2xl font-bold text-sm hover:bg-[#0A3A2A] hover:text-white transition-all">{h.heroCta2}</Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════ 2. PROBLEM ══════════ */}
            <section className="py-20 px-4" dir={dir}>
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 mb-4"><AlertTriangle className="w-4 h-4 text-red-500" /><span className="text-red-600 text-xs font-bold">{h.problemBadge}</span></div>
                        <h2 className="text-[#0A3A2A] text-2xl md:text-4xl font-black">{h.problemTitle}</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-5 mb-12">
                        {h.problems.map(({ title, text }, i) => {
                            const Icon = problemIcons[i]
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                    whileHover={{ y: -4 }} className="bg-white rounded-3xl p-7 shadow-xl shadow-green-900/5 border-t-4 border-red-200">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${problemColors[i]} flex items-center justify-center mb-5`}><Icon className="w-6 h-6 text-white" /></div>
                                    <h3 className="text-[#0A3A2A] text-base font-extrabold mb-3">{title}</h3>
                                    <p className="text-[#2D4A3E] text-sm leading-loose">{text}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* SOLUTION */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-green-900/5 border-2 border-emerald-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-600 to-green-400" />
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
                                    <h2 className="text-[#0A3A2A] text-xl md:text-2xl font-black">{h.solutionTitle}</h2>
                                </div>
                                <p className="text-[#2D4A3E] text-sm leading-[2]">{h.solutionText}</p>
                            </div>
                            <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                <img src="/assets/smart-dashboard.png" alt="Smart Dashboard" className="w-full rounded-2xl shadow-lg max-h-[340px] object-cover" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════ 3. HOW IT WORKS ══════════ */}
            <section className="py-20 px-4 bg-white/50" dir={dir}>
                <div className="max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
                        <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">{h.howTag}</p>
                        <h2 className="text-[#0A3A2A] text-2xl md:text-4xl font-black">{h.howTitle}</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6 relative">
                        <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-[2px] bg-gradient-to-l from-emerald-200 via-emerald-400 to-emerald-200 z-0" />
                        {h.steps.map(({ num, title, desc }, i) => {
                            const Icon = stepIcons[i]
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                                    className="relative z-10 text-center bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-5"><Icon className="w-7 h-7 text-white" /></div>
                                    <span className="text-emerald-400 text-xs font-black mb-2 block">{num}</span>
                                    <h3 className="text-[#0A3A2A] text-base font-extrabold mb-3">{title}</h3>
                                    <p className="text-[#2D4A3E] text-sm leading-relaxed">{desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════ 4. CROPS ══════════ */}
            <section className="py-20 px-4" dir={dir}>
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
                        <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">{h.cropsTag}</p>
                        <h2 className="text-[#0A3A2A] text-2xl md:text-4xl font-black">{h.cropsTitle}</h2>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {h.crops.map(({ title, sub }, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-green-900/5 group cursor-default transition-transform duration-300">
                                <div className="h-48 overflow-hidden"><img src={cropImgs[i]} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                                <div className="p-5">
                                    <h3 className="text-[#0A3A2A] text-base font-extrabold mb-1">{title}</h3>
                                    <p className="text-[#2D4A3E]/60 text-xs">{sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ 4.5 SOLAR PANEL ══════════ */}
            <section className="py-20 px-4 bg-white/50" dir={dir}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <motion.div initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100">
                                <Sun className="w-4 h-4 text-amber-500" />
                                <span className="text-amber-700 text-xs font-bold">{h.solarBadge}</span>
                            </div>
                            <h2 className="text-[#0A3A2A] text-2xl md:text-3xl font-black">{h.solarTitle}</h2>
                            <p className="text-[#2D4A3E] text-sm leading-[2.1]">{h.solarText}</p>
                            <div className="flex flex-wrap gap-3">
                                {h.solarTags.map((tag, i) => (
                                    <span key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border ${i === 0 ? 'bg-amber-50 text-amber-700 border-amber-100' : i === 1 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <img src="/assets/solar-panel.png" alt="Solar Panels" className="w-full rounded-3xl shadow-2xl shadow-green-900/10 max-h-[380px] object-cover" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════ 5. USE CASES ══════════ */}
            <section className="py-20 px-4 bg-white/50" dir={dir}>
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
                        <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">{h.useCasesTag}</p>
                        <h2 className="text-[#0A3A2A] text-2xl md:text-4xl font-black">{h.useCasesTitle}</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {h.useCases.map(({ title, desc }, i) => {
                            const Icon = useCaseIcons[i]
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                    whileHover={{ y: -6 }} className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 border border-gray-100 group cursor-default relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-l ${useCaseGradients[i]}`} />
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCaseGradients[i]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}><Icon className="w-7 h-7 text-white" /></div>
                                    <h3 className="text-[#0A3A2A] text-lg font-extrabold mb-3">{title}</h3>
                                    <p className="text-[#2D4A3E] text-sm leading-loose">{desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════ 6. STATS ══════════ */}
            <section className="py-24 px-4 relative overflow-hidden" dir={dir}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06)_0%,_transparent_70%)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-[#0A3A2A] text-3xl md:text-5xl font-black mb-4">{h.statsTitle}</h2>
                        <div className="w-20 h-1.5 rounded-full bg-gradient-to-l from-[#10B981] to-[#047857] mx-auto" />
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {statsRaw.map((s, i) => <StatCard key={i} {...s} label={h.stats[i].label} sub={h.stats[i].sub} delay={i * 0.12} />)}
                    </div>
                </div>
            </section>

            {/* ══════════ 7. CTA BANNER ══════════ */}
            <section className="relative py-24 px-4 overflow-hidden" dir={dir}>
                <div className="absolute inset-0 bg-[#0A3A2A]" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-center md:${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            <h2 className="text-white text-3xl md:text-5xl font-black mb-5">{h.ctaTitle}</h2>
                            <p className="text-emerald-200/70 text-sm md:text-base max-w-2xl leading-relaxed mb-10">{h.ctaDesc}</p>
                            <div className={`flex justify-center md:justify-start gap-4 flex-wrap`}>
                                <Link to="/contact" className="px-10 py-4 bg-gradient-to-l from-emerald-600 to-green-500 text-white rounded-full font-bold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all animate-pulse flex items-center gap-2">
                                    {h.ctaBtn1} <ArrowIcon className="w-4 h-4" />
                                </Link>
                                <Link to="/contact" className="px-10 py-4 border-2 border-white/40 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> {h.ctaBtn2}
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}>
                            <img src="/assets/sgt-concept.png" alt="Smart Garden Tower" className="w-full max-h-[500px] object-contain drop-shadow-2xl rounded-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

        </motion.div>
    )
}
