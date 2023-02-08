import React from "react"
import { getBrowserNameFromNavigator } from "utils/getBrowserNameFromNavigator"

export const extensionURLHash = {
  Chrome:
    "https://chrome.google.com/webstore/detail/chatgpthing/amiibkaljanlkpjljhlkgjdfemgkklbo?hl=en&authuser=0&utm_source=landing",
  Firefox:
    "https://addons.mozilla.org/en-US/firefox/addon/chatgpthing/?utm_source=landing"
}

export const useExtensionURL = (): string => {
  const [extensionURL, setExtensionURL] = React.useState(
    extensionURLHash["Chrome"]
  )

  React.useEffect(() => {
    if (getBrowserNameFromNavigator() === "Firefox") {
      return setExtensionURL(extensionURLHash["Firefox"])
    }
  }, [])

  return extensionURL
}
