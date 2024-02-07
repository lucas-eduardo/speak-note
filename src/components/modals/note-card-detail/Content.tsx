import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ReactNode } from 'react'

type ContentProps = {
  date: Date
  children: ReactNode
}

export function Content({ children, date }: ContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-3 p-5">
      <span className="text-sm font-medium text-slate-300">
        {formatDistanceToNow(date, {
          locale: ptBR,
          addSuffix: true,
        })}
      </span>

      <p className="text-sm leading-6 text-slate-400">{children}</p>
    </div>
  )
}
