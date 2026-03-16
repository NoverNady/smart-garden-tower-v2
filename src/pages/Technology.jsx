import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cpu, Beaker, Thermometer, ScanEye, RotateCw, Cloud, Layers, Activity, Wifi, Shield, Droplets, Wind, Smartphone, BarChart3, Camera, Scale, Server, ArrowRight, ArrowLeft } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const PV = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }

const specIconMap = [[Cpu, Wifi, Layers, Shield], [Beaker, Activity, Scale, Layers], [Thermometer, Droplets, Wind, Layers], [RotateCw, Camera, Cpu, ScanEye], [Cloud, Smartphone, BarChart3, Activity]]
const sectionImgs = ['/assets/edge-server.png', '/assets/sensors.png', '/assets/tower-plants.png', '/assets/ai-scanner.png', '/assets/mobile-app.png']

function SpecBadge({ icon: Icon, label, value, delay = 0 }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
            className="group relative flex items-center gap-4 p-3.5 rounded-2xl bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-300 overflow-hidden">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 flex-shrink-0 z-10">
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 relative z-10">
                <p className="text-[11px] text-emerald-600/80 font-bold mb-0.5">{label}</p>
                <p className="text-[#0A3A2A] text-[13px] md:text-sm font-black leading-tight">{value}</p>
            </div>
            {/* Decorative border highlight on hover */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    )
}

function SectionBlock({ tag, title, text, img, specs, icons, reversed = false, dir, isAi = false }) {
    return (
        <section className={`py-24 px-4 bg-emerald-50`} dir={dir}>
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl shadow-emerald-900/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 border border-white"
                >
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: reversed ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            className={`space-y-8 ${reversed ? 'lg:order-2' : ''}`}>
                            <div>
                                <p className="text-emerald-500 text-sm font-bold tracking-[4px] uppercase mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-emerald-400 rounded-full" />
                                    {tag}
                                </p>
                                <h2 className="text-[#0A3A2A] text-3xl md:text-4xl lg:text-5xl font-black leading-tight">{title}</h2>
                            </div>
                            <p className="text-[#2D4A3E] text-base lg:text-lg leading-relaxed opacity-90">{text}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {specs.map((s, i) => <SpecBadge key={i} icon={icons[i]} label={s.label} value={s.value} delay={0.1 + i * 0.1} />)}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className={`relative ${reversed ? 'lg:order-1' : ''}`}>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border border-gray-100 group">
                                {isAi && <ScanBeam />}
                                <img src={img} alt={title} className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function ScanBeam() {
    return <motion.div className="absolute z-20 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.8)]"
        initial={{ top: '8%', opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        animate={{ top: '92%' }} transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
}

export default function Technology() {
    const { t, dir } = useLang()
    const h = t.tech
    const sections = h.sections
    const flowIcons = [Thermometer, Server, Cloud, Smartphone]

    return (
        <motion.div variants={PV} initial="initial" animate="animate" exit="exit" className="bg-emerald-50 min-h-screen">
            {/* Hero Section */}
            <section className="pt-48 pb-12 px-4" dir={dir}>
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-100 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-700 text-sm font-bold tracking-widest uppercase">{h.tag}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-[#0A3A2A] text-4xl md:text-6xl font-black leading-tight">
                        {h.title}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-[#2D4A3E] max-w-3xl mx-auto text-lg md:text-xl leading-relaxed opacity-90">
                        {h.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* System Architecture Flow */}
            <section className="py-20 px-4 bg-gray-50 border-y border-emerald-100/50" dir={dir}>
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-black text-[#0A3A2A]">{h.architectureFlow.title}</h2>
                    </motion.div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative max-w-5xl mx-auto">
                        {/* Connecting Line Desktop */}
                        <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 z-0 opacity-50" />
                        
                        {h.architectureFlow.steps.map((step, i) => {
                            const Icon = flowIcons[i]
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.2 }} className="relative z-10 flex flex-col items-center group w-full md:w-1/4">
                                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-50 flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-emerald-900/10">
                                        <div className="absolute inset-0 bg-emerald-400 rounded-2xl blur-xl animate-ping opacity-10" style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} />
                                        <Icon className="w-8 h-8 text-emerald-600 relative z-10" />
                                    </div>
                                    {i < h.architectureFlow.steps.length - 1 && (
                                        <div className="md:hidden text-emerald-300 my-2">
                                            <ArrowRight className="w-6 h-6 rotate-90" />
                                        </div>
                                    )}
                                    <p className="text-[#0A3A2A] font-bold text-center text-sm md:text-base leading-snug">{step}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Feature Cards / Sections */}
            <div className="py-12 bg-emerald-50">
                {sections.map((sec, i) => (
                    <SectionBlock key={i} tag={sec.tag} title={sec.title} text={sec.text} img={sectionImgs[i]} specs={sec.specs} icons={specIconMap[i]} reversed={i % 2 === 1} dir={dir} isAi={i === 3} />
                ))}
            </div>

            {/* Performance Metrics Section */}
            <section className="py-32 px-4 bg-emerald-50" dir={dir}>
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                        <h2 className="text-[#0A3A2A] text-3xl md:text-5xl font-black">{h.metrics.title}</h2>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
                        {h.metrics.items.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                                className="bg-white rounded-[2rem] p-8 text-center shadow-lg shadow-emerald-900/5 border border-emerald-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-500 mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                                    {item.value}
                                </div>
                                <p className="text-[#2D4A3E] font-bold text-sm lg:text-base">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Premium B2B CTA Section */}
            <section className="py-24 px-4 bg-[#0A3A2A]" dir={dir}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{t.tech.cta.title}</h2>
                        <p className="text-base md:text-lg text-emerald-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t.tech.cta.subtitle}
                        </p>
                        <Link to="/contact">
                            <button className="bg-emerald-500 text-[#0A3A2A] px-10 py-4 rounded-full font-black text-lg shadow-xl hover:bg-emerald-400 hover:scale-[1.02] transition-all active:scale-95 mx-auto">
                                {t.tech.cta.btn}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}
