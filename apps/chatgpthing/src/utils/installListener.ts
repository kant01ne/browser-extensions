import { toggleSpotlight } from "@/utils/toggleSpotlight"
import browser from "webextension-polyfill"

export const installListener: Parameters<
  typeof browser.runtime.onInstalled.addListener
>[0] = async ({ reason }) => {
  if (reason === "install") {
    browser.tabs
      .create({
        url: "https://github.com/kant01ne/browser-extensions/tree/main/apps/chatgpthing#onboarding"
      })
      .then(async ({ id }) => {
        // Wait enough time for the page to load and then toggle the spotlight.
        await new Promise((resolve) => setTimeout(resolve, 2000))
        if (id) toggleSpotlight(id)
      })
  }
}
