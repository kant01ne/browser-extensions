import { clsx } from "clsx"
import React from "react"

export const TwitShorterBox: React.FC<
  React.ComponentProps<"div"> & {
    answer?: string
    className?: string
  }
> = ({ className, children, ...props }) => {
  /*
   * Render.
   */
  return (
    <main
      className={clsx(
        "text-black min-h-[12rem] dark:text-white border border-width-[.5px] dark:!border-twitter-darkGray rounded-2xl !border-twitter-extraLightGray bg-white dark:bg-black pt-4 px-4 flex flex-col w-full",
        className
      )}
      {...props}>
      {children}
    </main>
  )
}
