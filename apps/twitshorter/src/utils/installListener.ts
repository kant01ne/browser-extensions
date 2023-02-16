import browser from "webextension-polyfill"

export const installListener: Parameters<
  typeof browser.runtime.onInstalled.addListener
>[0] = async ({ reason }) => {
  if (reason === "install") {
    browser.tabs.create({
      url: "https://github.com/kant01ne/browser-extensions/tree/main/apps/twitshorter#onboarding"
    })
  }
}
