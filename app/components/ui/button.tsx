import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-2 transition-all hover:opacity-90",
        className
      )}
      {...props}
    />
  )
)
Button.displayName = "Button"
export { Button }
