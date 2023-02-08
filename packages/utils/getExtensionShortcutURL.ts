import type { getBrowserNameFromNavigator } from "./getBrowserNameFromNavigator"

export const getExtensionShortcutURL = (
  browser?: ReturnType<typeof getBrowserNameFromNavigator>
) => {
  switch (browser) {
    case "Firefox": {
      return "https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox"
    }
    case "Chrome":
    default:
      return "chrome://extensions/shortcuts"
  }
}
