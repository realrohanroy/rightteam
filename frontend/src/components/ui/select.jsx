import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"
import { Check, ChevronDown } from "lucide-react"

// ── Context ──────────────────────────────────────────────────────────────────
const Ctx = createContext({})

// ── Select (root) ────────────────────────────────────────────────────────────
export const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false)
  const [labels, setLabels] = useState({})        // value → display label map
  const rootRef = useRef(null)

  useEffect(() => {
    const close = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const register = useCallback((val, label) =>
    setLabels((prev) => (prev[val] === label ? prev : { ...prev, [val]: label })), [])

  return (
    <Ctx.Provider value={{ value, onValueChange, open, setOpen, labels, register }}>
      <div ref={rootRef} className="relative">
        {children}
      </div>
    </Ctx.Provider>
  )
}

// ── SelectTrigger ─────────────────────────────────────────────────────────────
export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useContext(Ctx)
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={`flex items-center justify-between w-full text-left ${className ?? ""}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

// ── SelectValue ───────────────────────────────────────────────────────────────
export const SelectValue = ({ placeholder }) => {
  const { value, labels } = useContext(Ctx)
  const display = value ? (labels[value] ?? value) : null
  return display
    ? <span className="truncate">{display}</span>
    : <span className="text-muted-foreground">{placeholder}</span>
}

// ── SelectContent (the scrollable dropdown list) ──────────────────────────────
export const SelectContent = ({ className, children }) => {
  const { open } = useContext(Ctx)
  if (!open) return null
  return (
    <div
      className={`absolute z-50 mt-1 w-full overflow-y-auto rounded-md border bg-white shadow-md ${className ?? ""}`}
      style={{ maxHeight: 300 }}
      onWheel={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

// ── SelectGroup ───────────────────────────────────────────────────────────────
export const SelectGroup = ({ children }) => <div>{children}</div>

// ── SelectLabel ───────────────────────────────────────────────────────────────
export const SelectLabel = ({ className, children }) => (
  <div className={`px-2 py-1.5 text-xs font-semibold text-muted-foreground ${className ?? ""}`}>
    {children}
  </div>
)

// ── SelectItem ────────────────────────────────────────────────────────────────
export const SelectItem = ({ value, children, className }) => {
  const { value: selected, onValueChange, setOpen, register } = useContext(Ctx)
  const isSelected = selected === value

  // Register this item's display label so SelectValue can look it up
  useEffect(() => { register(value, children) }, [value, children, register])

  return (
    <div
      onClick={() => { onValueChange(value); setOpen(false) }}
      className={`relative flex cursor-pointer items-center py-1.5 pl-2 pr-8 text-sm hover:bg-accent hover:text-accent-foreground ${isSelected ? "bg-accent" : ""} ${className ?? ""}`}
    >
      {children}
      {isSelected && (
        <span className="absolute right-2">
          <Check className="h-4 w-4" />
        </span>
      )}
    </div>
  )
}

// ── SelectSeparator ───────────────────────────────────────────────────────────
export const SelectSeparator = ({ className }) => (
  <div className={`-mx-1 my-1 h-px bg-muted ${className ?? ""}`} />
)
