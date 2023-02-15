import { getBrowserNameFromNavigatorTypeValues } from "utils/getBrowserNameFromNavigator"
import { getExtensionShortcutURL } from "utils/getExtensionShortcutURL"
import browser from "webextension-polyfill"
import { z } from "zod"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

import { KEY_ACCESS_TOKEN } from "../chatgpt/chatGPT"
import { t } from "./trpc"

const storage = new PlasmoStorage()

export const browserRouter = t.router({
  browserCommand: t.procedure.query(async () => {
    return browser.commands.getAll()
  }),
  openOpenAIAuthPage: t.procedure.mutation(async () => {
    await storage.set(KEY_ACCESS_TOKEN, {})
    browser.tabs.create({
      url: "https://chat.openai.com"
    })
  }),
  openShortcutPage: t.procedure
    .input(
      z.object({
        browser: z.optional(z.enum(getBrowserNameFromNavigatorTypeValues))
      })
    )
    .mutation(async ({ input: { browser: browserAgent } }) => {
      browser.tabs.create({
        url: getExtensionShortcutURL(browserAgent)
      })
    })
})
