import { t } from "@/trpc"
import { KEY_ACCESS_TOKEN } from "chatgpt/chatGPT"
import browser from "webextension-polyfill"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

const storage = new PlasmoStorage()

export const browserRouter = t.router({
  openOpenAIAuthPage: t.procedure.mutation(async () => {
    await storage.set(KEY_ACCESS_TOKEN, {})
    browser.tabs.create({
      url: "https://chat.openai.com"
    })
  })
})
