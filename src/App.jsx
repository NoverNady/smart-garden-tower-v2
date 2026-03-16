import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hydroponics from './pages/Hydroponics'
import Technology from './pages/Technology'
import Services from './pages/Services'
import Contact from './pages/Contact'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => { window.scrollTo(0, 0) }, [pathname])
    return null
}

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/hydroponics" element={<Hydroponics />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <AnimatedRoutes />
            <Footer />
        </BrowserRouter>
    )
}
