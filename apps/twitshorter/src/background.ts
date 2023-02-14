import { t } from "@/trpc"
import { browserRouter } from "@/trpc/browserRouter"
import { chatGPTRouter } from "@/trpc/chatGPTRouter"
import { installListener } from "@/utils/installListener"
import { createChromeHandler } from "trpc-chrome/adapter"
import browser from "webextension-polyfill"

/*
 * Trpc.
 */

export const appRouter = t.router({
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

browser.runtime.onInstalled.addListener(installListener)
