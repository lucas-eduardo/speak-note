import { ReactNode } from 'react'

type BodyProps = {
  children: ReactNode
}

export function Body({ children }: BodyProps) {
  return <p className="text-sm leading-6 text-slate-400">{children}</p>
}
