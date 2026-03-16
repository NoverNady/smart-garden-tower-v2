import { Wrench, BrainCircuit, FlaskConical, Headset } from 'lucide-react'

const servicesData = [
    {
        icon: Wrench,
        title: 'التركيب والمعايرة الاحترافية',
        desc: 'فريق هندسي متخصص يركّب البرج ويضبط جميع الأنظمة بدقة لضمان أفضل بداية لمزرعتك الذكية.',
        color: 'bg-gradient-to-br from-emerald-500 to-green-600',
    },
    {
        icon: BrainCircuit,
        title: 'مراقبة AI سحابية 24/7',
        desc: 'نظام ذكاء اصطناعي يراقب المحاصيل على مدار الساعة، يُرسل تنبيهات فورية، ويقترح حلولاً استباقية.',
        color: 'bg-gradient-to-br from-cyan-500 to-teal-600',
    },
    {
        icon: FlaskConical,
        title: 'اشتراك المغذيات الشهري',
        desc: 'توصيل محاليل غذائية متوازنة كل شهر مع توصيات مخصصة حسب نوع المحصول ومرحلة النمو.',
        color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
        icon: Headset,
        title: 'دعم زراعي مباشر',
        desc: 'فريق دعم متخصص متاح دائماً للإجابة على أسئلتك وحل أي مشكلة زراعية — من البذرة إلى الحصاد.',
        color: 'bg-gradient-to-br from-violet-500 to-purple-600',
    },
]

function ServiceCard({ icon: Icon, title, desc, color }) {
    return (
        <div className="bg-white rounded-3xl p-7 shadow-xl shadow-green-900/5
      hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 group cursor-default">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5
        group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-forest text-lg font-bold mb-2">{title}</h3>
            <p className="text-slate-g text-sm leading-relaxed">{desc}</p>
        </div>
    )
}

export default function Services() {
    return (
        <section id="services" className="py-20 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14 fade-up">
                    <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">خدمات SGT</p>
                    <h2 className="text-forest text-3xl md:text-4xl font-black mb-4">خدمات دقيقة للزراعة الذكية</h2>
                    <p className="text-slate-g max-w-lg mx-auto text-sm leading-relaxed">
                        لا نبيع منتجاً وحسب، بل نبني شراكة لضمان نجاحك من البذرة إلى الحصاد.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {servicesData.map((service, i) => (
                        <ServiceCard key={i} {...service} />
                    ))}
                </div>
            </div>
        </section>
    )
}
