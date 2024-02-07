import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

type ModalRootProps = {
  children: ReactNode
}

export function ModalRoot({ children }: ModalRootProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />

      <Dialog.Content className="fixed inset-0 flex w-full flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
        <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 transition-colors hover:text-slate-100">
          <X className="size-5" />
        </Dialog.Close>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
