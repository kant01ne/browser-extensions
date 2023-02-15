import { PlayCircle } from "lucide-react"
import type React from "react"
import Balancer from "react-wrap-balancer"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "ui/Tooltip"
import { Button } from "ui/button"

export const TwitShorterPrimaryForm: React.FC<
  React.ComponentPropsWithoutRef<"span"> & {
    handleSubmit?: React.MouseEventHandler<HTMLButtonElement>
  }
> = ({ handleSubmit, ...props }) => {
  return (
    <div className="center-items justify-center flex" {...props}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-10 rounded-full p-0"
              onClick={handleSubmit}
              variant="outline">
              <PlayCircle className="h-4 w-4" />
              <span className="sr-only">Summarize</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex justify-center items-center">
            <Balancer className="flex justify-center items-center w-[80%]">
              Keep scrolling first or start summarizing thread now
            </Balancer>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
