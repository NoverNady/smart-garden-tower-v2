import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wrench, BrainCircuit, FlaskConical, Wifi, Scale, Smartphone, ClipboardCheck, Settings, Users, CloudCog, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const PV = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }
const cardIcons = [Wrench, FlaskConical, BrainCircuit]
const cardColors = ['from-emerald-500 to-green-600', 'from-amber-500 to-orange-600', 'from-cyan-500 to-teal-600']
const detailIcons = [Wifi, Scale, Smartphone]
const processIcons = [ClipboardCheck, Settings, Users, CloudCog]

function Card({ icon: Icon, title, desc, expanded, color, detailIcon: DI, specs, howItWorks, showDetails, hideDetails }) {
    const [open, setOpen] = useState(false)
    return (
        <motion.div layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }} onClick={() => setOpen(!open)}
            className="bg-white rounded-3xl p-7 shadow-xl shadow-green-900/5 cursor-pointer group border border-transparent hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}><Icon className="w-7 h-7 text-white" /></div>
                <h3 className="text-[#0A3A2A] text-lg font-extrabold flex-1">{title}</h3>
            </div>
            <p className="text-[#2D4A3E] text-sm leading-relaxed mb-3">{desc}</p>
            <AnimatePresence>{open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-3"><DI className="w-4 h-4 text-emerald-500" /><span className="text-xs font-bold text-emerald-600">{howItWorks}</span></div>
                        <p className="text-[#2D4A3E] text-xs leading-relaxed mb-4">{expanded}</p>
                        <div className="flex flex-wrap gap-2">{specs.map((s, i) => <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">{s}</span>)}</div>
                    </div>
                </motion.div>
            )}</AnimatePresence>
            <p className="text-xs text-emerald-500 mt-3 font-semibold">{open ? hideDetails : showDetails}</p>
        </motion.div>
    )
}

export default function Services() {
    const { t, dir } = useLang()
    const h = t.services
    return (
        <motion.div variants={PV} initial="initial" animate="animate" exit="exit">
            <section className="pt-48 pb-12 px-4" dir={dir}>
                <div className="max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">{h.tag}</p>
                        <h1 className="text-[#0A3A2A] text-3xl md:text-5xl font-black mb-4">{h.title}</h1>
                        <p className="text-[#2D4A3E] max-w-lg mx-auto text-sm">{h.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {h.items.map((item, i) => (
                            <Card key={i} icon={cardIcons[i]} title={item.title} desc={item.desc} expanded={item.expanded}
                                color={cardColors[i]} detailIcon={detailIcons[i]} specs={item.specs}
                                howItWorks={h.howItWorks} showDetails={h.showDetails} hideDetails={h.hideDetails} />
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-10 p-3 bg-emerald-50 rounded-xl max-w-md mx-auto">
                        <div className="relative w-3 h-3">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-40" />
                            <div className="absolute inset-0 bg-emerald-500 rounded-full" />
                        </div>
                        <span className="text-xs font-bold text-emerald-700">{h.statusText}</span>
                    </div>
                </div>
            </section>

            {/* How We Work / Process Section (SaaS Aesthetic Redesign) */}
            <section className="py-28 px-4 bg-gray-50 relative overflow-hidden" dir={dir}>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
                        <h2 className="text-[#0A3A2A] text-4xl md:text-5xl font-black">{h.process.title}</h2>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden md:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100 z-0" />
                        
                        {h.process.steps.map((step, i) => {
                            const Icon = processIcons[i]
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                                    className="relative flex flex-col pt-4 group">
                                    
                                    {/* Large Watermark Number */}
                                    <div className={`absolute -top-10 ${dir === 'rtl' ? 'right-0 md:-right-6' : 'left-0 md:-left-6'} text-[100px] lg:text-[140px] font-black leading-none text-gray-200/50 -z-10 select-none hidden md:block transition-all duration-500 group-hover:text-emerald-100/40 group-hover:-translate-y-2`}>
                                        0{i + 1}
                                    </div>

                                    {/* Icon & Connection Point */}
                                    <div className="relative z-10 w-20 h-20 rounded-[2rem] bg-white shadow-xl shadow-emerald-900/5 flex items-center justify-center mb-8 mx-auto md:mx-0 border border-white transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-600/10 group-hover:-translate-y-2">
                                        <Icon className="w-8 h-8 text-[#0A3A2A] transition-colors duration-300 group-hover:text-emerald-600" />
                                        {/* Node point on the line */}
                                        <div className="absolute -top-4 right-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 border-[3px] border-white shadow-sm md:-top-[26px] transition-transform duration-300 group-hover:scale-125 group-hover:bg-emerald-500" />
                                    </div>
                                    
                                    <div className="text-center md:text-start relative px-4 md:px-0">
                                        {/* Mobile visible number */}
                                        <div className="md:hidden text-emerald-400 font-bold mb-3 tracking-widest">0{i + 1}.</div>
                                        <h3 className="text-[#0A3A2A] font-extrabold text-xl lg:text-2xl mb-4 transition-colors duration-300 group-hover:text-emerald-700">{step.title}</h3>
                                        <p className="text-[#2D4A3E] text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">{step.text}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Technical Support & SLA Section (Asymmetric Redesign) */}
            <section className="py-28 px-4 bg-white" dir={dir}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        {/* Left Column: Title & Subtitle (Span 5) */}
                        <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="w-16 h-1.5 bg-emerald-400 mb-8 rounded-full" />
                            <h2 className="text-3xl md:text-5xl font-black text-[#0A3A2A] mb-8 leading-tight">
                                {h.support.title}
                            </h2>
                            <p className="text-[#2D4A3E] text-lg lg:text-xl leading-relaxed opacity-80">
                                {h.support.subtitle}
                            </p>
                        </motion.div>
                        
                        {/* Right Column: Rows/Cards Checklist (Span 7) */}
                        <motion.div className="lg:col-span-7 flex flex-col gap-5 relative" initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ staggerChildren: 0.15, duration: 0.6 }}>
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

                            {h.support.features.map((feature, i) => (
                                <motion.div key={i} 
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                                    className={`bg-white rounded-[2rem] p-6 lg:p-8 flex items-center gap-6 shadow-sm shadow-emerald-900/5 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10 hover:border-emerald-200 cursor-default ${dir === 'rtl' ? 'hover:-translate-x-3' : 'hover:translate-x-3'}`}>
                                    
                                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex-shrink-0 flex items-center justify-center border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                                    </div>
                                    <p className="text-[#0A3A2A] font-extrabold text-lg lg:text-xl leading-relaxed">{feature}</p>
                                    
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Premium B2B CTA Section */}
            <section className="py-24 px-4 bg-[#0A3A2A]" dir={dir}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{h.cta.title}</h2>
                        <p className="text-base md:text-lg text-emerald-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {h.cta.subtitle}
                        </p>
                        <Link to="/contact">
                            <button className="bg-emerald-500 text-[#0A3A2A] px-10 py-4 rounded-full font-black text-lg shadow-xl hover:bg-emerald-400 hover:scale-[1.02] transition-all active:scale-95 mx-auto">
                                {h.cta.btn}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}
