import browser from "webextension-polyfill"

export const installListener = (
  details: browser.runtime.OnInstalledReason
): void => {
  if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
    browser.tabs.create({
      url: "https://github.com/kant01ne/browser-extensions/tree/main/apps/twitshorter#onboarding"
    })
  }
}
