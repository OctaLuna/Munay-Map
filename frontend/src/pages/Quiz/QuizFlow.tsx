import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizQuestions, useQuizRecommendation } from '@/hooks/useQuiz'
import { useLanguage } from '@/context/LanguageContext'
import type { QuizAnswer } from '@/types'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export default function QuizFlow() {
  const { data: questions, isLoading } = useQuizQuestions()
  const { mutate: getRecommendation, isPending } = useQuizRecommendation()
  const { language, t } = useLanguage()
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)

  if (isLoading || !questions) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background pt-20" aria-busy="true">
        <div className="animate-pulse text-center">
          <div className="mx-auto mb-4 h-8 w-48 rounded bg-surface/60" />
          <div className="mx-auto h-4 w-64 rounded bg-surface/60" />
        </div>
        <span className="sr-only">{t('quiz.flow.loading')}</span>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]
  if (!currentQuestion) return null

  const totalQuestions = questions.length
  const progress = ((currentIndex) / totalQuestions) * 100

  const handleSelect = (optionId: string) => {
    setSelectedOptionId(optionId)
  }

  const handleNext = () => {
    if (!selectedOptionId) return

    const selectedOption = currentQuestion.opciones.find((o) => o.id === selectedOptionId)
    if (!selectedOption) return

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId,
      etiquetas: selectedOption.etiquetas,
    }

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)
    setSelectedOptionId(null)

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      // Quiz terminado — obtener recomendación
      getRecommendation(
        { respuestas: updatedAnswers, idioma: language.code },
        {
          onSuccess: (recommendation) => {
            navigate('/quiz/resultado', { state: { recommendation } })
          },
          onError: () => {
            navigate('/quiz/resultado', { state: { recommendation: null } })
          },
        }
      )
    }
  }

  const handleBack = () => {
    if (currentIndex === 0) return
    setCurrentIndex((i) => i - 1)
    setAnswers((a) => a.slice(0, -1))
    setSelectedOptionId(null)
  }

  const isLastQuestion = currentIndex === totalQuestions - 1

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-2xl px-4 py-10 md:px-8">
        {/* Progreso */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm font-sans text-neutral">
            <span>{t('quiz.flow.progress', { current: currentIndex + 1, total: totalQuestions })}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} animate />
        </div>

        {/* Pregunta */}
        <RevealOnScroll key={currentQuestion.id}>
          <h1 className="font-serif text-display-md font-bold text-dark [text-wrap:balance] mb-8">
            {currentQuestion.pregunta}
          </h1>

          {/* Opciones */}
          <fieldset>
            <legend className="sr-only">{currentQuestion.pregunta}</legend>
            <div className="space-y-3" role="radiogroup">
              {currentQuestion.opciones.map((option) => {
                const isSelected = selectedOptionId === option.id
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-150 ${
                      isSelected
                        ? 'border-primary bg-primary/8 text-primary'
                        : 'border-neutral/20 bg-surface text-dark hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => handleSelect(option.id)}
                      className="sr-only"
                    />
                    {/* Radio visual */}
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isSelected ? 'border-primary bg-primary' : 'border-neutral/40'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-surface" />
                      )}
                    </span>
                    <span className="font-sans text-sm leading-relaxed">{option.texto}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </RevealOnScroll>

        {/* Navegación */}
        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            size="md"
            onClick={handleBack}
            disabled={currentIndex === 0}
            aria-label={t('quiz.flow.prevAria')}
          >
            {t('quiz.flow.back')}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            disabled={!selectedOptionId || isPending}
            loading={isPending && isLastQuestion}
          >
            {isLastQuestion ? t('quiz.flow.finish') : t('quiz.flow.next')}
          </Button>
        </div>
      </div>
    </main>
  )
}
