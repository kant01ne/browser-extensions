import { ExtensionPostMessageEventType } from "@/utils/ExtensionPostMessageEvent"
import browser from "webextension-polyfill"

export const toggleSpotlight = (tabID: number): void => {
  browser.scripting.executeScript({
    args: [],
    func: () =>
      window.postMessage(
        {
          type: "ChatGPThing:spotlight:toggle" satisfies ExtensionPostMessageEventType
        },
        "*"
      ),
    target: {
      tabId: tabID
    }
  })
}
