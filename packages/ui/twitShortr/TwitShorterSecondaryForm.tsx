import { clsx } from "clsx"
import { RefreshCcw } from "lucide-react"
import type React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../Tooltip"
import { Button } from "../button"

export const TwitShorterSecondaryForm: React.FC<
  React.ComponentPropsWithoutRef<"button"> & {
    handleSubmit?: React.MouseEventHandler<HTMLButtonElement>
  }
> = ({ className, handleSubmit, ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={clsx("rounded-full", className)}
            // className="rounded-full p-0"
            onClick={handleSubmit}
            variant="link"
            {...props}>
            <RefreshCcw className="h-4 w-4" />
            <span className="sr-only">Summarize</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Refresh</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
