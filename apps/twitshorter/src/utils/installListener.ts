import browser from "webextension-polyfill"

export const installListener = (
  details: browser.runtime.OnInstalledReason
): void => {
  if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
    browser.tabs.create({
      url: "https://twitter.com/shadcn/status/1624461912678477824"
    })
  }
}
