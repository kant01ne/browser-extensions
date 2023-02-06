import { clsx } from "clsx"
import React from "react"
import { Shortcut } from "ui/shortcut"

export const SpotlightFooter: React.FC<
  React.ComponentProps<"a"> & {
    shortcut?: string
    handleShortcutUpdate?: React.MouseEventHandler<HTMLAnchorElement>
  }
> = ({ shortcut, handleShortcutUpdate, className, ...props }) => {
  return (
    <a
      className={clsx(
        "text-[.65rem] text-center justify-center items-center flex flex-row",
        {
          " text-slate-800 dark:text-slate-400": shortcut,
          "text-red-400 underline": !shortcut
        },
        className
      )}
      {...props}
      href={`chrome://extensions/shortcuts`}
      onClick={handleShortcutUpdate}>
      {shortcut ? (
        <>
          <Shortcut className="px-2" shortcut={shortcut} /> to toggle this tool
        </>
      ) : (
        "Add a keyboard shortcut to toggle this tool"
      )}
    </a>
  )
}
