/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B5D43',     // Verde Tiwanaku — marca, navbar, botones primarios
        background: '#F4E8D3',  // Beige Altiplano — fondo general
        surface: '#FBF6EC',     // Crema Pergamino — tarjetas sobre el fondo
        accent: '#7A2E32',      // Vino Tierra — CTAs secundarios, hover de links
        gold: '#D4A24C',        // Dorado Inti — highlights, badges, contadores
        neutral: '#6E4A3F',     // Tierra Russet — texto secundario, bordes
        dark: '#221C18',        // Carbón Andino — texto principal, secciones oscuras
      },
      fontFamily: {
        serif: [
          'Fraunces',
          '"Noto Serif"',
          'Georgia',
          'serif',
        ],
        sans: [
          'Inter',
          '"Noto Sans"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      fontSize: {
        // Display headings con clamp para responsive
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      maxWidth: {
        'prose-narrow': '60ch',
        'prose-wide': '75ch',
      },
      zIndex: {
        dropdown: '100',
        sticky: '200',
        'modal-backdrop': '300',
        modal: '400',
        toast: '500',
        tooltip: '600',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        // Fondo decorativo de líneas de mapa (patrón 12)
        'map-lines': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%236E4A3F' stroke-width='0.4' stroke-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
