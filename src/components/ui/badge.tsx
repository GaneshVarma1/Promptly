import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-gray-200 dark:border-zinc-800 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-zinc-300 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 dark:bg-zinc-50 text-gray-50 dark:text-zinc-900 hover:bg-gray-900/80 dark:hover:bg-zinc-50/80",
        secondary:
          "border-transparent bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-50 hover:bg-gray-100/80 dark:hover:bg-zinc-800/80",
        destructive:
          "border-transparent bg-red-500 dark:bg-red-900 text-gray-50 dark:text-zinc-50 hover:bg-red-500/80 dark:hover:bg-red-900/80",
        outline: "text-gray-950 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
