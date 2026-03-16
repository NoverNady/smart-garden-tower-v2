import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const contactInfo = [
    { icon: Mail, label: 'البريد الإلكتروني', value: 'info@sgt-agri.com' },
    { icon: Phone, label: 'رقم الهاتف', value: '+20 100 123 4567' },
    { icon: MapPin, label: 'العنوان', value: 'القاهرة، مصر' },
    { icon: Clock, label: 'ساعات العمل', value: 'السبت - الخميس: 9 ص - 6 م' },
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', phone: '', email: '', message: '' })
        }, 3000)
    }

    const inputClasses = `w-full bg-gray-100 text-forest rounded-xl px-4 py-3.5 text-sm
    border-2 border-transparent focus:border-emerald-500 focus:bg-white
    outline-none transition-all duration-300 placeholder:text-gray-400`

    return (
        <section id="contact" className="py-20 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14 fade-up">
                    <p className="text-emerald-600 text-xs font-bold tracking-[3px] uppercase mb-3">تواصل معنا</p>
                    <h2 className="text-forest text-3xl md:text-4xl font-black mb-4">نحب نسمع منك</h2>
                </div>

                {/* Split Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 flex flex-col justify-center gap-7">
                        <h3 className="text-forest text-xl font-bold mb-2">معلومات التواصل</h3>
                        {contactInfo.map(({ icon: Icon, label, value }, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center
                  group-hover:bg-emerald-100 transition-colors flex-shrink-0">
                                    <Icon className="w-[18px] h-[18px] text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-g/60 font-semibold mb-0.5">{label}</p>
                                    <p className="text-forest text-sm font-bold">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 flex flex-col gap-4"
                    >
                        <h3 className="text-forest text-xl font-bold mb-2">أرسل رسالتك</h3>

                        <input
                            type="text"
                            placeholder="الاسم بالكامل"
                            value={formData.name}
                            onChange={handleChange('name')}
                            className={inputClasses}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="رقم الهاتف"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            className={inputClasses}
                        />
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            value={formData.email}
                            onChange={handleChange('email')}
                            className={inputClasses}
                            required
                        />
                        <textarea
                            placeholder="رسالتك"
                            value={formData.message}
                            onChange={handleChange('message')}
                            rows={4}
                            className={`${inputClasses} resize-none`}
                            required
                        />

                        <button
                            type="submit"
                            className={`w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300
                ${submitted
                                    ? 'bg-green-800 scale-95'
                                    : 'bg-gradient-to-l from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 hover:shadow-lg hover:shadow-emerald-500/25'
                                }`}
                        >
                            {submitted ? '✓ تم الإرسال بنجاح!' : 'إرسال الرسالة'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
