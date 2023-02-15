import { clsx } from "clsx"
import { X } from "lucide-react"
import React from "react"
import { Button } from "ui/button"

// Shared base styles bu not applied directly to the component as we want to control its size from the containers.
export const SpotlightBoxContainerClassName =
  "w-[90vw] md:w-[50vw] w-[25vw] min-w-[320px] max-h-[calc(100vh-120px)] max-w-[420px]"

export const SpotlightBox: React.FC<
  React.ComponentProps<"div"> & {
    answer?: string
    className?: string
    handleClose?: React.MouseEventHandler<HTMLButtonElement>
  }
> = ({ className, children, handleClose, ...props }) => {
  /*
   * Render.
   */
  return (
    <main
      className={clsx(
        "text-black dark:text-white bg-white dark:bg-gray-900 shadow-md border dark:border-slate-200 border-slate-200 rounded-md pt-8 px-4 pb-2 flex flex-col",
        className
      )}
      {...props}>
      {handleClose ? (
        <Button
          className="absolute top-1 right-1 outline-none h-7 focus:ring-[0px]"
          onClick={handleClose}
          size="sm"
          variant="ghost">
          <X size={12} />
        </Button>
      ) : null}
      {children}
    </main>
  )
}
