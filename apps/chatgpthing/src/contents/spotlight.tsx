import { SpotlightBoxContainer } from "@/components/SpotlightBoxContainer"
import { useTRPC, withTRPC } from "@/trpc/context"
import { AppRouter } from "@/trpc/router"
import {
  ExtensionPostMessageDataType,
  ExtensionPostMessageEvent,
  ExtensionPostMessageEventType,
  isExtensionPostMessageEvent
} from "@/utils/ExtensionPostMessageEvent"
import { ChatGPTProvider } from "chatgpt/components/ChatGPTContext"
// eslint-disable-next-line import/no-unresolved
import cssText from "data-text:~/src/style/style.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import React from "react"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText

  return style
}

export const config: PlasmoCSConfig = {
  css: ["../style/font.css"],
  matches: ["<all_urls>"]
}

function Spotlight() {
  /*
   * State
   */

  const [isSpotlightOpen, setIsSpotlightOpen] = React.useState(false)
  const { port, trpc } = useTRPC()

  /*
   * Callbacks.
   */
  const handleMessage = React.useCallback(
    (event: ExtensionPostMessageEvent | object) => {
      if (!isExtensionPostMessageEvent(event)) {
        return
      }

      switch (event.data?.type) {
        case "ChatGPThing:spotlight:toggle": {
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
  }, [handleMessage, port.onMessage])

  return isSpotlightOpen ? (
    <ChatGPTProvider<
      AppRouter,
      ExtensionPostMessageEventType,
      ExtensionPostMessageDataType
    >
      port={port}
      postMessageDataType="ChatGPThing:spotlight:setAnswer"
      trpc={trpc}>
      <SpotlightBoxContainer handleClose={() => setIsSpotlightOpen(false)} />
    </ChatGPTProvider>
  ) : null
}

export default withTRPC(Spotlight)
