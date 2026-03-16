import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import arLang from './ar'
import enLang from './en'

const LanguageContext = createContext()

const langs = { ar: arLang, en: enLang }

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => localStorage.getItem('sgt_lang') || 'ar')
    const t = langs[lang]
    
    const toggle = useCallback(() => {
        setLang(prev => {
            const nextLang = prev === 'ar' ? 'en' : 'ar'
            localStorage.setItem('sgt_lang', nextLang)
            return nextLang
        })
    }, [])
    
    const dir = t.dir

    useEffect(() => {
        document.documentElement.dir = dir
        document.documentElement.lang = lang
    }, [dir, lang])

    return (
        <LanguageContext.Provider value={{ lang, t, toggle, dir }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLang() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLang must be used within LanguageProvider')
    return ctx
}
