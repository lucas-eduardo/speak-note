import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type HeaderProps = {
  date: Date
}

export function Header({ date }: HeaderProps) {
  return (
    <span className="text-sm font-medium text-slate-300">
      {formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true,
      })}
    </span>
  )
}
