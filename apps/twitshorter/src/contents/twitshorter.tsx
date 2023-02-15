import { TwitShorterBoxContainer } from "@/components/TwitShorterBoxContainer"
import { withTRPC } from "@/trpc/context"
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

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  await waitFor(
    () =>
      document.querySelector('[data-testid="tweet"]') &&
      document.querySelector('[aria-label="Footer"]'),
    {
      count: 10,
      delay: 200
    }
  )

  return (
    document.querySelector('[aria-label="Footer"]')?.parentElement ||
    document.body
  )
}

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor
}) => {
  if (anchor?.element === document.body) {
    return
  }

  if (!window.location.pathname.includes("/status")) {
    return
  }

  anchor?.element.parentElement?.insertBefore(
    shadowHost,
    anchor.element.parentElement?.children[3]
  )
}

export type PlasmoCSUIAnchor = {
  type: "inline"
}

export const config: PlasmoCSConfig = {
  all_frames: true,
  matches: ["https://twitter.com/*/status/*"]
}

export default withTRPC(TwitShorterBoxContainer)
