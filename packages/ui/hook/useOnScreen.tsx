import React from "react"

const useOnScreen = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  rootMargin = "40px",
  threshold = 1
) => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setTimeout(() => setIntersecting(entry.isIntersecting), 0)
        // setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current)
      }
    }
  }) // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting
}

export default useOnScreen
