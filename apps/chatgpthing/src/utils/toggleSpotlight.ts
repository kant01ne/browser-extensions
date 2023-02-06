import browser from "webextension-polyfill"

export const toggleSpotlight = (tabID: number): void => {
  browser.scripting.executeScript({
    args: [],
    func: () =>
      window.postMessage({ type: "ChatGPThing:spotlight:toggle" }, "*"),
    target: {
      tabId: tabID
    }
  })
}
