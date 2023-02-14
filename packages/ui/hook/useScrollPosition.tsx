/* eslint-disable no-restricted-globals */
import React from "react"

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = React.useState(0)

  React.useEffect(() => {
    const updatePosition = () => {
      console.log(window)
      setScrollPosition(window.pageYOffset)
    }
    window.addEventListener("scroll", updatePosition)
    updatePosition()
    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  return scrollPosition
}
