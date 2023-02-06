import browser from "webextension-polyfill"

export const toggleSpotlight = (tabID: number): void => {
  browser.scripting.executeScript({
    args: [],
    func: () =>
      window.postMessage({ type: "ChatGPTWeb:spotlight:toggle" }, "*"),
    target: {
      tabId: tabID
    }
  })
}
