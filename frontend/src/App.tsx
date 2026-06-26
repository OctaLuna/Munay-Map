import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import HomePage from '@/pages/Home'
import LibraryPage from '@/pages/Library'
import SiteDetailPage from '@/pages/Library/SiteDetail'
import AboutPage from '@/pages/About'
import CameraIntro from '@/pages/Capture/CameraIntro'
import CameraView from '@/pages/Capture/CameraView'
import Processing from '@/pages/Capture/Processing'
import RecognizeResult from '@/pages/Capture/Result'
import NotRecognized from '@/pages/Capture/NotRecognized'
import QuizFlow from '@/pages/Quiz/QuizFlow'
import QuizResult from '@/pages/Quiz/QuizResult'

export default function App() {
  return (
    <>
      {/* Skip link — accesibilidad por teclado */}
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/biblioteca" element={<LibraryPage />} />
        <Route path="/biblioteca/:id" element={<SiteDetailPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/camara" element={<CameraIntro />} />
        <Route path="/camara/view" element={<CameraView />} />
        <Route path="/camara/processing" element={<Processing />} />
        <Route path="/camara/result" element={<RecognizeResult />} />
        <Route path="/camara/not-found" element={<NotRecognized />} />
        <Route path="/quiz" element={<QuizFlow />} />
        <Route path="/quiz/resultado" element={<QuizResult />} />
        {/* 404 */}
        <Route
          path="*"
          element={
            <main className="flex min-h-screen items-center justify-center bg-background pt-20">
              <div className="text-center px-4">
                <h1 className="font-serif text-display-lg font-bold text-dark mb-4">
                  Página no encontrada
                </h1>
                <p className="mb-8 text-neutral font-sans">
                  La página que buscás no existe.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-surface hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Volver al inicio
                </a>
              </div>
            </main>
          }
        />
      </Routes>

      <Footer />
    </>
  )
}
