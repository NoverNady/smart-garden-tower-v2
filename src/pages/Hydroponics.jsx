import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Droplets, ShieldCheck, CalendarDays, Zap, Maximize2, Sparkles } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const PV = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }

const benefitIcons = [Droplets, ShieldCheck, CalendarDays, Zap, Maximize2, Sparkles]

export default function Hydroponics() {
    const { t, dir } = useLang()
    const h = t.hydroponics

    return (
        <motion.div variants={PV} initial="initial" animate="animate" exit="exit" className="bg-emerald-50 min-h-screen">
            {/* Hero */}
            <section className="pt-48 pb-12 px-4" dir={dir}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-emerald-600 text-sm font-bold tracking-[4px] uppercase mb-4">{h.tag}</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[#0A3A2A] text-4xl md:text-6xl font-black mb-6 leading-tight">{h.title}</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[#2D4A3E] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{h.subtitle}</motion.p>
                </div>
            </section>

            {/* What is Hydroponics? — Educational Section */}
            <section className="py-12 px-4" dir={dir}>
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-100/50 overflow-hidden flex flex-col lg:flex-row">
                        
                        {/* Left Side: Content */}
                        <div className="p-10 md:p-16 lg:w-3/5 relative flex flex-col justify-center">
                            <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="relative z-10">
                                <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className="text-[#0A3A2A] text-3xl md:text-5xl font-black mb-8 leading-tight">{h.whatIs.title}</motion.h2>
                                
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                                    className="text-[#2D4A3E] text-lg md:text-xl leading-loose mb-10">{h.whatIs.text}</motion.p>
                                
                                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                                    className="inline-flex items-center gap-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl px-6 py-4">
                                    <Sparkles className="w-6 h-6 text-emerald-600" />
                                    <p className="text-emerald-800 text-lg font-bold tracking-wide">{h.whatIs.highlight}</p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Side: Visual/Image */}
                        <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                            <img 
                                src="/assets/roots.png" 
                                alt="Hydroponics Roots Matrix" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            
                            {/* Decorative overlay elements */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
                                <div className="w-full h-full border border-emerald-400/30 rounded-3xl" />
                            </div>
                            <div className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                                <Droplets className="w-8 h-8 text-emerald-300" />
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Benefits of Hydroponics — 6 Card Grid */}
            <section className="py-24 px-4" dir={dir}>
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-[#0A3A2A] text-3xl md:text-5xl font-black mb-6 leading-tight">{h.benefits.title}</h2>
                        <p className="text-[#2D4A3E] text-lg max-w-3xl mx-auto leading-relaxed opacity-90">{h.benefits.subtitle}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {h.benefits.items.map((item, i) => {
                            const Icon = benefitIcons[i]
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg shadow-emerald-900/5 border border-emerald-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-500">
                                        <Icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <h4 className="text-[#0A3A2A] font-extrabold text-xl md:text-2xl mb-3">{item.title}</h4>
                                    <p className="text-[#2D4A3E] text-base leading-relaxed opacity-85">{item.text}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* The Elite Selection Bento Grid Section */}
            <section className="pt-24 pb-24 px-4" dir={dir}>
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-[#0A3A2A] text-3xl md:text-5xl font-black mb-6 leading-tight">{h.cropsTitle}</h2>
                        <p className="text-[#2D4A3E] text-lg max-w-3xl mx-auto leading-relaxed opacity-90">{h.cropsSub}</p>
                    </motion.div>
                    
                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {h.eliteCrops.map(({ name, tag, img }, i) => {
                            const isLarge = i === 0 || i === 1 || i === 8;
                            return (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ delay: i * 0.08 }}
                                    className={`bg-white rounded-[2rem] p-3 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col ${isLarge ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'}`}
                                >
                                    <div className={`relative w-full rounded-[1.5rem] overflow-hidden mb-4 ${isLarge ? 'aspect-[2/1] sm:aspect-[21/9] lg:aspect-[16/9]' : 'aspect-square sm:aspect-[4/5] lg:aspect-square'}`}>
                                        <img 
                                            src={img} 
                                            alt={name} 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between px-3 pb-2 mt-auto">
                                        <h4 className="text-[#0A3A2A] font-extrabold text-lg md:text-xl">{name}</h4>
                                        <span className="bg-emerald-50 border border-emerald-100/50 text-emerald-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                                            {tag}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Premium 200+ Variety Power Statement Footer (Merged into CTA) */}
                </div>
            </section>

            {/* Global Premium B2B CTA Section (Merged with 200+ Varieties) */}
            <section className="py-24 px-4 bg-[#0A3A2A]" dir={dir}>
                <div className="max-w-4xl mx-auto text-center">
                    
                    {/* Compact Merged CTA */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <span className="inline-block bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-8 shadow-sm backdrop-blur-sm">
                            {dir === 'rtl' ? 'قدرات غير محدودة' : 'Unlimited Capabilities'}
                        </span>
                        
                        <p className="text-emerald-100 text-lg md:text-2xl font-bold mb-4 max-w-3xl mx-auto leading-relaxed">
                            {h.cropsFooter}
                        </p>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            {h.cta.title}
                        </h2>

                        <p className="text-base md:text-lg text-emerald-200/70 mb-10 max-w-2xl mx-auto leading-relaxed">
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
