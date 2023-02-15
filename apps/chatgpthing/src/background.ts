import { appRouter } from "@/trpc/router"
import { installListener } from "@/utils/installListener"
import { toggleSpotlight } from "@/utils/toggleSpotlight"
import { createChromeHandler } from "trpc-chrome/adapter"
import browser from "webextension-polyfill"

createChromeHandler({
  createContext: ({ req }) => ({
    port: req
  }),
  router: appRouter
})

const handleActionClicked: Parameters<
  typeof browser.action.onClicked.addListener
>[0] = async ({ id }) => toggleSpotlight(id)

;(browser.action || browser.browserAction).onClicked.addListener(
  handleActionClicked
)

browser.runtime.onInstalled.addListener(installListener)
