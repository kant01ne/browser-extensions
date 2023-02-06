import { SpotlightBoxContainer } from "@/components/SpotlightBoxContainer"
import { useTRPC, withTRPC } from "@/components/trpc/withTRPC"
import {
  ExtensionPostMessageEvent,
  isExtensionPostMessageEvent
} from "@/utils/ExtensionPostMessageEvent"
// eslint-disable-next-line import/no-unresolved
import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import React from "react"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  css: ["../font.css"],
  matches: ["<all_urls>"]
}

function Spotlight() {
  /*
   * State
   */
  const [isSpotlightOpen, setIsSpotlightOpen] = React.useState(false)
  const { port } = useTRPC()

  /*
   * Callbacks.
   */
  const handleMessage = React.useCallback(
    (event: ExtensionPostMessageEvent | object) => {
      if (!isExtensionPostMessageEvent(event)) {
        return
      }

      switch (event.data?.type) {
        case "ChatGPTWeb:spotlight:toggle": {
          setIsSpotlightOpen(!isSpotlightOpen)
          break
        }

        default:
          break
      }
    },
    [isSpotlightOpen]
  )

  /*
   * Effects.
   */
  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    port.onMessage.addListener(handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
      port.onMessage.addListener(handleMessage)
    }
  }, [handleMessage])

  return isSpotlightOpen ? (
    <SpotlightBoxContainer
      className="accordion-up"
      handleClose={() => setIsSpotlightOpen(false)}
    />
  ) : null
}

export default withTRPC(Spotlight)
