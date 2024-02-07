type FooterProps = {
  onNoteDeleted: () => void
}

export function Footer({ onNoteDeleted }: FooterProps) {
  return (
    <button
      type="button"
      onClick={onNoteDeleted}
      className="group w-full bg-slate-800 py-4 text-center text-sm font-medium text-slate-300 outline-none"
    >
      Deseja{' '}
      <span className="text-red-400 group-hover:underline">
        apagar essa nota
      </span>
      ?
    </button>
  )
}
