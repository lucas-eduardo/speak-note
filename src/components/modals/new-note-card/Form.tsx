import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

type FormProps = {
  onNoteCreated: (content: string) => void
}

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition

const speechRecognition = new SpeechRecognitionAPI()

export function Form({ onNoteCreated }: FormProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      toast.warning('Não é possível criar uma nota sem conteúdo!')

      return
    }

    onNoteCreated(content)

    setContent('')
    setShouldShowOnboarding(true)

    toast.success('Nota criada com sucesso!')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning('Infelizmente seu navegador não suporta a API de gravação!')

      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce(
        (text, result) => text.concat(result[0].transcript),
        '',
      )

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <form className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-sm font-medium text-slate-300">
          Adicionar nota
        </span>

        {shouldShowOnboarding ? (
          <p className="text-sm leading-6 text-slate-400">
            Comece{' '}
            <button
              type="button"
              onClick={handleStartRecording}
              className="font-medium text-lime-400 hover:underline"
            >
              gravando uma nota
            </button>{' '}
            em áudio ou se preferir{' '}
            <button
              onClick={handleStartEditor}
              className="font-medium text-lime-400 hover:underline"
            >
              utilize apenas texto
            </button>
            .
          </p>
        ) : (
          <textarea
            autoFocus
            className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
            onChange={handleContentChanged}
            value={content}
          />
        )}
      </div>

      {isRecording ? (
        <button
          type="button"
          onClick={handleStopRecording}
          className="flex w-full items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 outline-none transition-colors hover:text-slate-100"
        >
          <div className="size-3 animate-pulse rounded-full bg-red-500" />
          Gravando (clique p/ interromper)
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSaveNote}
          className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none transition-colors hover:bg-lime-500"
        >
          Salvar nota
        </button>
      )}
    </form>
  )
}
