import { SpotlightAnswer } from "@/components/SpotlightAnswer"
import { SpotlightFooter } from "@/components/SpotlightFooter"
import { SpotlightForm } from "@/components/SpotlightForm"
import { SpotlightHeader } from "@/components/SpotlightHeader"
import { clsx } from "clsx"
import { X } from "lucide-react"
import React from "react"
import { Button } from "ui/button"
import { Separator } from "ui/separator"

export const SpotlightBox: React.FC<
  React.ComponentProps<"div"> & {
    answer?: string
    className?: string
    handleAuthClick?: React.ComponentPropsWithoutRef<
      typeof SpotlightForm
    >["handleAuthClick"]
    handleClose: React.MouseEventHandler<HTMLButtonElement>
    handleShortcutUpdate?: React.ComponentPropsWithoutRef<
      typeof SpotlightFooter
    >["handleShortcutUpdate"]
    handleSubmit?: React.ComponentPropsWithoutRef<
      typeof SpotlightForm
    >["handleSubmit"]
    isAuthenticated?: boolean
    isLoading?: boolean
    shortcut?: string
  }
> = ({
  answer,
  className,
  handleAuthClick,
  handleClose,
  handleShortcutUpdate,
  handleSubmit,
  isAuthenticated,
  isLoading,
  shortcut,
  ...props
}) => {
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
      <Button
        className="absolute top-1 right-1 outline-none h-7 focus:ring-[0px]"
        onClick={handleClose}
        size="sm"
        variant="ghost">
        <X size={12} />
      </Button>
      <SpotlightHeader />
      <SpotlightAnswer answer={answer} />
      <SpotlightForm
        handleAuthClick={handleAuthClick}
        handleSubmit={handleSubmit}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
      <Separator className="mt-4 mb-2" />
      <SpotlightFooter
        className="px-2 py-0.5 "
        handleShortcutUpdate={handleShortcutUpdate}
        shortcut={shortcut}
      />
    </main>
  )
}
