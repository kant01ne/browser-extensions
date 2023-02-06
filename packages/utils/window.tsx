import React from "react"

export const getWindow = (): (Window & typeof globalThis) | undefined => {
  // eslint-disable-next-line no-restricted-globals
  return typeof window === "undefined" ? undefined : window
}

// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-2911761
export const useIsomorphicLayoutEffect = getWindow()
  ? // eslint-disable-next-line no-restricted-syntax
    React.useLayoutEffect
  : React.useEffect
