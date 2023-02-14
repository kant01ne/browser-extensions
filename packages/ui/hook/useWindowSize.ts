import React from "react"
import { getWindow } from "utils/window"

export const useWindowSize = (): { height: number; width: number } => {
  const [state, setState] = React.useState(() => ({
    height: getWindow()?.innerHeight || 0,
    width: getWindow()?.innerWidth || 0
  }))

  React.useEffect(() => {
    function handleResize() {
      setState({
        height: getWindow()?.innerHeight || 0,
        width: getWindow()?.innerWidth || 0
      })
    }

    getWindow()?.addEventListener("resize", handleResize)
    return () => getWindow()?.removeEventListener("resize", handleResize)
  }, [])

  return state
}
