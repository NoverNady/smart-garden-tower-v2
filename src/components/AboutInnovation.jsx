import { Globe, Cpu, Layers } from 'lucide-react'

const techBadges = ['🔄 القفص الدوار', '🧠 YOLOv12', '⚙️ NEMA 17', '📐 LM8UU', '🌐 Edge Computing']

export default function AboutInnovation() {
    return (
        <section id="about" className="py-20 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14 fade-up">
                    <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">رؤيتنا للمستقبل</p>
                    <h2 className="text-forest text-3xl md:text-4xl font-black mb-4">
                        زراعة ذكية، استثمار مستدام، صفر مجهود
                    </h2>
                    <p className="text-slate-g max-w-2xl mx-auto text-sm leading-relaxed">
                        نحن لا نصنع مجرد أبراج زراعية، بل نبني منظومة أمن غذائي ذكية وقابلة للتوسع. منصة زراعية
                        متكاملة تدمج الهندسة الميكانيكية، إنترنت الأشياء، والذكاء الاصطناعي لتقديم حلول استثمارية
                        مربحة، مستقلة، ومستدامة.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Vision Card */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-green-900/5
            hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                        <div className="h-56 overflow-hidden">
                            <img
                                src="/assets/vision.png"
                                alt="الرؤية - مزرعة عمودية ضخمة"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-7">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600
                  flex items-center justify-center shadow-md shadow-emerald-500/30">
                                    <Globe className="w-[18px] h-[18px] text-white" />
                                </div>
                                <h3 className="text-forest text-lg font-extrabold">الرؤية</h3>
                            </div>
                            <p className="text-slate-g text-sm leading-relaxed">
                                قيادة ثورة زراعية ذكية ومستدامة. نبني منظومة أمن غذائي قابلة للتوسع، من المشاريع الفردية
                                إلى المزارع الاستثمارية الضخمة، لضمان مستقبل أخضر وغذاء آمن للجميع.
                            </p>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-green-900/5
            hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                        <div className="h-56 overflow-hidden">
                            <img
                                src="/assets/mission.png"
                                alt="الرسالة - بذرة ذكية"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-7">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600
                  flex items-center justify-center shadow-md shadow-emerald-500/30">
                                    <Cpu className="w-[18px] h-[18px] text-white" />
                                </div>
                                <h3 className="text-forest text-lg font-extrabold">الرسالة</h3>
                            </div>
                            <p className="text-slate-g text-sm leading-relaxed">
                                تمكين الجميع من الزراعة الاحترافية بصفر مجهود. ندمج أحدث التقنيات في نظام مستقل تماماً:
                                ضع البذرة، ودع التكنولوجيا تتولى القيادة حتى لحظة الحصاد.
                            </p>
                        </div>
                    </div>

                    {/* Innovation Card — Full Width */}
                    <div className="md:col-span-2 bg-white rounded-3xl overflow-hidden shadow-xl shadow-green-900/5
            border-2 border-emerald-400 hover:shadow-2xl transition-all duration-300">
                        <div className="grid md:grid-cols-2 gap-0" dir="ltr">
                            {/* Images — Left */}
                            <div className="grid grid-cols-2 gap-0 min-h-[300px]">
                                <div className="relative overflow-hidden">
                                    <img
                                        src="/assets/dashboard.png"
                                        alt="لوحة التحكم الذكية"
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60
                    backdrop-blur-md text-emerald-400 text-[11px] font-bold">
                                        📊 Auto pH/TDS
                                    </span>
                                </div>
                                <div className="relative overflow-hidden">
                                    <img
                                        src="/assets/cage.png"
                                        alt="القفص الدوار"
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60
                    backdrop-blur-md text-green-400 text-[11px] font-bold">
                                        🧠 YOLOv12
                                    </span>
                                </div>
                            </div>

                            {/* Text — Right */}
                            <div className="p-8 flex flex-col justify-center" dir="rtl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600
                    flex items-center justify-center shadow-md shadow-emerald-500/30">
                                        <Layers className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-forest text-lg font-extrabold">الميزة التنافسية: استقلالية تامة</h3>
                                </div>
                                <p className="text-forest text-xs font-bold mb-2 tracking-wide">— من البذرة للحصاد</p>
                                <p className="text-slate-g text-sm leading-loose mb-5">
                                    البرج هو 'مُزارع آلي' متكامل. يقوم بضبط نسب المحاليل (A & B) والري ذاتياً بمنتهى الدقة.
                                    وبفضل 'القفص الدوار' المبتكر المدعوم بـ YOLOv12، يتم فحص كل ورقة لاكتشاف الأمراض مبكراً.
                                    نظام استثماري ذكي يعمل من أجلك 24/7 دون أي تدخل يدوي.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {techBadges.map((badge, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-forest text-emerald-400 text-[11px] font-bold">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
