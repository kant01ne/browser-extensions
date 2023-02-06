import { clsx } from "clsx"
import React from "react"

export const Shortcut: React.FC<
  React.ComponentPropsWithoutRef<"span"> & { shortcut: string }
> = ({ shortcut, children, className, ...props }) => {
  const shortcutArray = React.useMemo(() => {
    if (!shortcut) {
      return null
    }

    // Insert a + between each character except the last one.
    return shortcut
      .replace(/Alt/g, "⌥")
      .replace(/Command/g, "⌘")
      .replace(/Shift/g, "⇧")
      .replace(/\+/g, "")
      .split("")
      .join("+")
      .split("")
  }, [shortcut])

  if (!shortcutArray) {
    return null
  }
  return (
    <span
      className={clsx(
        "text-slate-800 dark:text-slate-400 justify-center items-center rounded-md flex text-xs",
        className
      )}
      {...props}>
      {shortcutArray.map((char, index) => {
        if (char === "+") {
          return (
            <span className="px-1" key={index}>
              {char}
            </span>
          )
        }

        return (
          <span
            className={clsx(
              "bg-slate-100 dark:bg-slate-800 flex border-slate-200 dark:border-slate-700 justify-center items-center border rounded-md border-width-2 px-1.5 p-0.5 min-w-[1.25rem]",
              {
                "pr-[0.6rem]": "⌥" === char
              }
            )}
            key={index}>
            {char}
          </span>
        )
      })}
    </span>
  )
}
