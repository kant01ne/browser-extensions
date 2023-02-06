import { browserRouter } from "@/trpc/browserRouter"
import { chatGPTRouter } from "@/trpc/chatGPTRouter"
import { installListener } from "@/utils/installListener"
import { toggleSpotlight } from "@/utils/toggleSpotlight"
import { initTRPC } from "@trpc/server"
import { createChromeHandler } from "trpc-chrome/adapter"
import browser from "webextension-polyfill"

/*
 * Trpc.
 */
const t = initTRPC.create({
  allowOutsideOfServer: true,
  isServer: false
})

const appRouter = t.router({
  browser: browserRouter,
  chatGPT: chatGPTRouter
})

export type AppRouter = typeof appRouter

createChromeHandler({
  createContext: ({ req }) => ({
    port: req
  }),
  router: appRouter
})

/*
 * Browser action.
 */
const handleActionClicked: Parameters<
  typeof browser.action.onClicked.addListener
>[0] = async ({ id }) => toggleSpotlight(id)

;(browser.action || browser.browserAction).onClicked.addListener(
  handleActionClicked
)

browser.runtime.onInstalled.addListener(installListener)
