import { clsx } from "clsx"
import React from "react"
import { getBrowserNameFromNavigator } from "utils/getBrowserNameFromNavigator"
import { getExtensionShortcutURL } from "utils/getExtensionShortcutURL"

import { Shortcut } from "../shortcut"

export const SpotlightFooter: React.FC<
  React.ComponentProps<"a"> & {
    shortcut?: string
    handleShortcutUpdate?: React.MouseEventHandler<HTMLAnchorElement>
  }
> = ({ shortcut, handleShortcutUpdate, className, ...props }) => {
  return (
    <a
      className={clsx(
        "text-xs text-center justify-center items-center flex flex-row",
        {
          " text-slate-800 dark:text-slate-400": shortcut,
          "text-red-400 underline": !shortcut
        },
        className
      )}
      {...props}
      href={getExtensionShortcutURL(getBrowserNameFromNavigator())}
      onClick={handleShortcutUpdate}>
      {shortcut ? (
        <>
          <Shortcut className="px-2" shortcut={shortcut} /> to toggle
        </>
      ) : (
        "Add a keyboard shortcut to toggle this tool"
      )}
    </a>
  )
}
