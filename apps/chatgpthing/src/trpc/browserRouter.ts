import { t } from "@/trpc"
import { KEY_ACCESS_TOKEN } from "@/utils/chatGPT"
import browser from "webextension-polyfill"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

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
  openShortcutPage: t.procedure.mutation(async () => {
    browser.tabs.create({
      url: `chrome://extensions/shortcuts`
      // https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox
    })
  })
})
