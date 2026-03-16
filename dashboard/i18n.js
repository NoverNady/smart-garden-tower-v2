/* ════════════════════════════════════════════════════════════════════════
   Smart Garden Tower — Dashboard & Login i18n
   Vanilla JavaScript
   ════════════════════════════════════════════════════════════════════════ */

const translations = {
    en: {
        dir: 'ltr',
        login: {
            langBtn: 'عربي',
            title: 'Welcome Back',
            subtitle: 'Sign in to access your garden dashboard',
            heroTitle: 'Smart Garden Tower',
            heroSubtitle: 'AI & IoT-powered hydroponic monitoring system. Track your towers, analyze growth data, and receive real-time AI diagnostics.',
            features: {
                ai: 'AI-Powered Plant Diagnostics',
                iot: 'Real-time IoT Sensor Monitoring',
                analytics: '7-Day Growth Analytics & Trends'
            },
            emailLabel: 'Email Address',
            emailPlaceholder: 'admin@sgt.com',
            passwordLabel: 'Password',
            passwordPlaceholder: '••••••••',
            signInBtn: 'Sign In',
            demoHint: 'Demo Credentials',
            errorMsg: 'Invalid email or password. Please try again.',
            errorEmpty: 'Please fill in both fields.'
        },
        dashboard: {
            sidebar: {
                home: 'Home',
                dashboard: 'Dashboard',
                towers: 'Towers',
                analytics: 'Analytics',
                controls: 'Controls',
                alerts: 'Alerts',
                adminRole: 'Operator',
                signOut: 'Sign Out'
            },
            header: {
                title: 'Dashboard',
                subtitle: 'Smart Garden Tower — Real-time Monitoring',
                online: 'Online',
                offline: 'Offline'
            },
            overview: {
                title: 'System Overview',
                statusLabel: 'System Status',
                statusSub: 'All subsystems nominal',
                tempLabel: 'Room Temperature',
                tempSub: 'Optimal range: 22 – 28 °C',
                humidityLabel: 'Humidity',
                humiditySub: 'Target: 60 – 75 %',
                healthLabel: 'System Health',
                healthSub: 'Based on all sensor inputs'
            },
            water: {
                title: 'Water Tank Analytics',
                level: 'Water Level',
                ph: 'pH Level',
                ec: 'EC / TDS',
                temp: 'Water Temp'
            },
            towers: {
                title: 'Tower Management',
                healthGood: 'Good',
                healthSlow: 'Slow Growth',
                healthWarning: 'Warning',
                waterFlow: 'Water Flow',
                lightExposure: 'Light Exposure',
                growthCycle: 'Growth Cycle',
                planted: 'Planted',
                harvest: 'Harvest',
                daysLeft: 'd left',
                viewDetails: 'View Details & Camera'
            },
            alertsCenter: {
                title: 'AI Diagnostic Center',
                filters: {
                    all: 'All',
                    critical: 'Critical',
                    warning: 'Warnings',
                    info: 'Info'
                },
                empty: 'No diagnostics match this filter.',
                confidence: 'AI Confidence',
                dismiss: 'Dismiss',
                actions: {
                    addIron: 'Add 2ml Iron',
                    increaseO2: 'Increase O2',
                    viewFeed: 'View Feed',
                    reviewLogs: 'Review Logs'
                }
            },
            analytics: {
                title: '7-Day Trends',
                phLabel: 'pH Level',
                tempLabel: 'Temperature (°C)'
            },
            controls: {
                title: 'Quick Controls',
                waterPump: 'Water Pump',
                growLights: 'Grow Lights',
                running: 'Running',
                off: 'Off'
            }
        }
    },
    ar: {
        dir: 'rtl',
        login: {
            langBtn: 'English',
            title: 'أهلاً بك مجدداً',
            subtitle: 'سجل الدخول للوصول إلى لوحة تحكم مزرعتك',
            heroTitle: 'Smart Garden Tower',
            heroSubtitle: 'نظام مراقبة الزراعة المائية المدعوم بالذكاء الاصطناعي وإنترنت الأشياء. تتبع أبراجك، حلل بيانات النمو، واحصل على تشخيصات AI لحظية.',
            features: {
                ai: 'تشخيص النباتات بالذكاء الاصطناعي',
                iot: 'مراقبة لحظية عبر مستشعرات IoT',
                analytics: 'تحليلات واتجاهات النمو على مدار 7 أيام'
            },
            emailLabel: 'البريد الإلكتروني',
            emailPlaceholder: 'admin@sgt.com',
            passwordLabel: 'كلمة المرور',
            passwordPlaceholder: '••••••••',
            signInBtn: 'تسجيل الدخول',
            demoHint: 'بيانات الدخول التجريبية',
            errorMsg: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.',
            errorEmpty: 'يرجى ملء كلا الحقلين.'
        },
        dashboard: {
            sidebar: {
                home: 'الرئيسية',
                dashboard: 'لوحة التحكم',
                towers: 'الأبراج',
                analytics: 'التحليلات',
                controls: 'التحكم',
                alerts: 'التنبيهات',
                adminRole: 'مُشغل',
                signOut: 'تسجيل الخروج'
            },
            header: {
                title: 'لوحة التحكم',
                subtitle: 'Smart Garden Tower — مراقبة لحظية',
                online: 'متصل',
                offline: 'غير متصل'
            },
            overview: {
                title: 'نظرة عامة على النظام',
                statusLabel: 'حالة النظام',
                statusSub: 'جميع الأنظمة تعمل بشكل طبيعي',
                tempLabel: 'درجة حرارة الغرفة',
                tempSub: 'النطاق المثالي: 22 – 28 °C',
                humidityLabel: 'الرطوبة',
                humiditySub: 'الهدف: 60 – 75 %',
                healthLabel: 'صحة النظام',
                healthSub: 'بناءً على جميع مدخلات المستشعرات'
            },
            water: {
                title: 'تحليلات خزان المياه',
                level: 'مستوى المياه',
                ph: 'مستوى الحموضة (pH)',
                ec: 'أملاح (EC / TDS)',
                temp: 'حرارة المياه'
            },
            towers: {
                title: 'إدارة الأبراج',
                healthGood: 'جيد',
                healthSlow: 'نمو بطيء',
                healthWarning: 'تحذير',
                waterFlow: 'تدفق المياه',
                lightExposure: 'التعرض للضوء',
                growthCycle: 'دورة النمو',
                planted: 'تاريخ الزراعة',
                harvest: 'الحصاد المتوقع',
                daysLeft: 'يوم متبقي',
                viewDetails: 'عرض التفاصيل والكاميرا'
            },
            alertsCenter: {
                title: 'مركز تشخيص الذكاء الاصطناعي',
                filters: {
                    all: 'الكل',
                    critical: 'حرج',
                    warning: 'تحذيرات',
                    info: 'معلومات'
                },
                empty: 'لا توجد تشخيصات تطابق هذا الفلتر.',
                confidence: 'ثقة الذكاء الاصطناعي',
                dismiss: 'تجاهل',
                actions: {
                    addIron: 'إضافة 2مل حديد',
                    increaseO2: 'زيادة الأكسجين',
                    viewFeed: 'عرض الكاميرا',
                    reviewLogs: 'مراجعة السجلات'
                }
            },
            analytics: {
                title: 'اتجاهات 7 أيام',
                phLabel: 'مستوى الحموضة (pH)',
                tempLabel: 'درجة الحرارة (°C)'
            },
            controls: {
                title: 'التحكم السريع',
                waterPump: 'مضخة المياه',
                growLights: 'أضواء النمو',
                running: 'يعمل',
                off: 'متوقف'
            }
        }
    }
};

let currentLang = localStorage.getItem('sgt_lang') || 'ar'; // Default to arabic to match site default

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // return the key itself if not found
        }
    }
    return value;
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = translations[currentLang].dir;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = getTranslation(key);
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
             el.setAttribute('placeholder', text);
        } else {
            // Keep inner icons if they exist
            const innerIcon = el.querySelector('i');
            if(innerIcon) {
                // assume the text is just after the icon or wrapped in a span
                const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3 && n.textContent.trim() !== ''); // Find text node
                if(textNode) {
                    textNode.textContent = ' ' + text;
                } else if(el.querySelector('span')) {
                     el.querySelector('span').textContent = text;
                } else {
                     el.innerHTML = innerIcon.outerHTML + ' ' + text;
                }
            } else {
                el.textContent = text;
            }
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('sgt_lang', currentLang);
    applyTranslations();
    
    // Dispatch an event so custom scripts (like dashboard.js) can re-render charts & dynamic data
    window.dispatchEvent(new Event('languageChanged'));
}

window.t = getTranslation;
window.toggleLanguage = toggleLanguage;

document.addEventListener('DOMContentLoaded', applyTranslations);
