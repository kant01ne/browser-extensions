import { getWindow } from "~/window"

// https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator

export const getBrowserNameFromNavigatorTypeValues = [
  "Firefox",
  "Samsung Internet",
  "Opera",
  "Internet Explorer",
  "Microsoft Edge (Legacy)",
  "Edge",
  "Chrome",
  "Safari"
] as const

export type getBrowserNameFromNavigatorEventType =
  (typeof getBrowserNameFromNavigatorTypeValues)[number]

export const getBrowserNameFromNavigator = ():
  | getBrowserNameFromNavigatorEventType
  | undefined => {
  const { userAgent } = getWindow()?.navigator || {}

  if (!userAgent) {
    return
  }

  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox"
  }

  if (userAgent.indexOf("SamsungBrowser") > -1) {
    return "Samsung Internet"
  }

  if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return "Opera"
  }

  if (userAgent.indexOf("Trident") > -1) {
    return "Internet Explorer"
  }

  if (userAgent.indexOf("Edge") > -1) {
    return "Microsoft Edge (Legacy)"
  }

  if (userAgent.indexOf("Edg") > -1) {
    return "Edge"
  }

  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome"
  }

  if (userAgent.indexOf("Safari") > -1) {
    return "Safari"
  }

  return undefined
}
