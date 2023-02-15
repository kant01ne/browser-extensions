import type React from "react"

export const TwitShorterHeader: React.FC<
  React.ComponentPropsWithoutRef<"span">
> = ({ children, ...props }) => {
  return (
    <span className="font-extrabold text-lg" {...props}>
      Tweet Summary
    </span>
  )
}
