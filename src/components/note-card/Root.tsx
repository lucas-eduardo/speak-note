import { ButtonHTMLAttributes, forwardRef } from 'react'

type RootProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOverlay?: boolean
}

export const Root = forwardRef<HTMLButtonElement, RootProps>(
  ({ children, isOverlay = true, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className="relative flex flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left opacity-80 outline-none transition-all hover:opacity-100 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
      >
        {children}

        {isOverlay && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
        )}
      </button>
    )
  },
)

Root.displayName = 'Root'
