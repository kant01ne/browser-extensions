import { toggleSpotlight } from "@/utils/toggleSpotlight"
import browser from "webextension-polyfill"

export const installListener = (
  details: browser.runtime.OnInstalledReason
): void => {
  if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
    browser.tabs
      .create({
        url: "https://github.com/kant01ne/browser-extensions/tree/main/apps/chatgpthing#onboarding"
      })
      .then(async ({ id }) => {
        // Wait enough time for the page to load and then toggle the spotlight.
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toggleSpotlight(id)
      })
  }
}
