import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base styles
        "peer h-5 w-5 shrink-0 rounded-md border-2 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        
        // Unchecked state
        "border-black bg-white",
        "hover:border-black",
        
        // Checked state - very explicit styling
        "data-[state=checked]:bg-black data-[state=checked]:border-black",
        "data-[state=checked]:hover:bg-gray-800 data-[state=checked]:hover:border-gray-800",
        
        // Dark mode
        "dark:border-black dark:bg-white",
        "dark:hover:border-black",
        "dark:data-[state=checked]:bg-black dark:data-[state=checked]:border-black",
        "dark:data-[state=checked]:hover:bg-gray-800 dark:data-[state=checked]:hover:border-gray-800",
        
        // Focus states
        "focus-visible:ring-black/20",
        
        // Invalid states
        "aria-invalid:border-black aria-invalid:ring-black/20",
        "dark:aria-invalid:ring-black/40",
        
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current">
        <CheckIcon className="h-4 w-4 font-bold text-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox }
