import { TwitShorterBoxContainer } from "@/components/TwitShorterBoxContainer"
import { withTRPC } from "@/trpc/withTRPC"
import cssText from "data-text:~/src/style.css"
// eslint-disable-next-line import/no-unresolved
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetStyle,
  PlasmoMountShadowHost
} from "plasmo"
import { waitFor } from "utils/waitFor"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText

  return style
}

export default withTRPC(TwitShorterBoxContainer)

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  await waitFor(() => document.querySelector('[data-testid="tweet"]'), {
    count: 10,
    delay: 200
  })

  return document.querySelector('div:has(> [aria-label="Footer"])')
}

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor
}) => {
  anchor.element.insertBefore(shadowHost, anchor.element.firstChild)
}

export type PlasmoCSUIAnchor = {
  type: "inline"
}

export const config: PlasmoCSConfig = {
  all_frames: true,
  matches: ["https://twitter.com/*/status/*"]
}
