import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/modals/new-note-card'
import { NoteCardDetail } from './components/modals/note-card-detail'
import { NoteCard } from './components/note-card'

type Note = {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    setNotes((oldNotes) => {
      const notesArray = [newNote, ...oldNotes]

      localStorage.setItem('notes', JSON.stringify(notesArray))

      return notesArray
    })
  }

  function onNoteDeleted(noteId: string) {
    setNotes((oldNotes) => {
      const notesArray = oldNotes.filter((note) => note.id !== noteId)

      localStorage.setItem('notes', JSON.stringify(notesArray))

      return notesArray
    })

    toast.success('Nota apagada com sucesso!')
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes =
    search !== ''
      ? notes.filter(({ content }) =>
          content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        )
      : notes

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="placeholder:text-state-500 w-full bg-transparent text-3xl font-semibold tracking-tight outline-none disabled:cursor-not-allowed disabled:opacity-40"
          onChange={handleSearch}
          disabled={!notes.length}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NoteCard.Root isOverlay={false}>
              <span className="text-sm font-medium text-slate-200">
                Adicionar nota
              </span>

              <p className="text-sm leading-6 text-slate-400">
                Grave uma nota em áudio que será convertida para texto
                automaticamente.
              </p>
            </NoteCard.Root>
          </Dialog.Trigger>

          <NewNoteCard.Root>
            <NewNoteCard.Form onNoteCreated={onNoteCreated} />
          </NewNoteCard.Root>
        </Dialog.Root>

        {filteredNotes.map((note) => (
          <Dialog.Root key={note.id}>
            <Dialog.Trigger asChild>
              <NoteCard.Root>
                <NoteCard.Header date={note.date} />

                <NoteCard.Body>{note.content}</NoteCard.Body>
              </NoteCard.Root>
            </Dialog.Trigger>

            <NoteCardDetail.Root>
              <NoteCardDetail.Content date={note.date}>
                {note.content}
              </NoteCardDetail.Content>

              <NoteCardDetail.Footer
                onNoteDeleted={() => onNoteDeleted(note.id)}
              />
            </NoteCardDetail.Root>
          </Dialog.Root>
        ))}
      </div>
    </div>
  )
}
