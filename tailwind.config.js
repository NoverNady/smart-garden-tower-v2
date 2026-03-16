/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Tajawal', 'Inter', 'sans-serif'],
                serif: ['Playfair Display', 'Tajawal', 'serif'],
            },
            colors: {
                forest: '#0A3A2A',
                'slate-g': '#2D4A3E',
                mint: '#F0FDF4',
            },
        },
    },
    plugins: [],
}
