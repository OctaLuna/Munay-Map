// Registrar plugins GSAP antes de cualquier otro import de componentes
import '@/lib/gsap'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/context/LanguageContext'
import App from '@/App'
import '@/styles/fonts.css'
import '@/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto por defecto
      gcTime: 1000 * 60 * 5, // 5 minutos en caché
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('No se encontró el elemento root en el DOM')

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
