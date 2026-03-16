import { useState, useEffect, useRef } from 'react'
import { Droplets, Maximize2, Zap, ShieldCheck } from 'lucide-react'

function useCountUp(target, duration = 1500) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0
                    const step = target / (duration / 16)
                    const timer = setInterval(() => {
                        start += step
                        if (start >= target) {
                            setCount(target)
                            clearInterval(timer)
                        } else {
                            setCount(Math.floor(start))
                        }
                    }, 16)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, duration])

    return [count, ref]
}

function StatCard({ icon: Icon, value, suffix, label, color }) {
    const numericValue = parseInt(value) || 0
    const [count, ref] = useCountUp(numericValue)

    return (
        <div
            ref={ref}
            className="bg-white rounded-2xl p-6 shadow-lg shadow-green-900/5
        hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-black bg-gradient-to-l from-emerald-600 to-green-400 bg-clip-text text-transparent mb-1">
                {suffix === 'x' ? `${count}x` : `${count}%`}
            </div>
            <p className="text-sm text-slate-g font-semibold">{label}</p>
        </div>
    )
}

export default function HeroStats() {
    const stats = [
        { icon: Droplets, value: '90', suffix: '%', label: 'توفير المياه', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
        { icon: Maximize2, value: '80', suffix: '%', label: 'توفير المساحة', color: 'bg-gradient-to-br from-emerald-500 to-green-600' },
        { icon: Zap, value: '5', suffix: 'x', label: 'سرعة النمو', color: 'bg-gradient-to-br from-amber-500 to-orange-500' },
        { icon: ShieldCheck, value: '0', suffix: '%', label: 'استخدام المبيدات', color: 'bg-gradient-to-br from-violet-500 to-purple-600' },
    ]

    return (
        <section id="hero" className="pt-28 pb-16 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <div className="text-center mb-12 fade-up">
                    <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">تقنية زراعية ذكية</p>
                    <h1 className="text-forest text-3xl md:text-5xl font-black mb-4 leading-tight">
                        لماذا الزراعة المائية تتفوق؟
                    </h1>
                    <p className="text-slate-g max-w-xl mx-auto text-sm leading-relaxed">
                        تقنية ثورية توفر الموارد، تُسرّع النمو، وتلغي المبيدات — المستقبل يبدأ من هنا.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Stats 2x2 */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((s, i) => (
                            <StatCard key={i} {...s} />
                        ))}
                    </div>

                    {/* Image */}
                    <div className="fade-up">
                        <img
                            src="/assets/hero.png"
                            alt="مزرعة عمودية ذكية"
                            className="rounded-3xl shadow-2xl shadow-green-900/10 w-full object-cover max-h-[400px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
