import { appRouter } from "@/trpc/router"
import { installListener } from "@/utils/installListener"
import { createChromeHandler } from "trpc-chrome/adapter"
import browser from "webextension-polyfill"

createChromeHandler({
  createContext: ({ req }) => ({
    port: req
  }),
  router: appRouter
})

browser.runtime.onInstalled.addListener(installListener)
