import { t } from "@/trpc"
import {
  KEY_ACCESS_TOKEN,
  generateAnswers,
  getAccessToken
} from "@/utils/chatGPT"
import type browser from "webextension-polyfill"
import { z } from "zod"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

const storage = new PlasmoStorage()

export const chatGPTRouter = t.router({
  getAnswer: t.procedure
    .input(z.object({ prompt: z.string(), text: z.string() }))
    .mutation(async ({ ctx, input: { prompt, text } }) => {
      const question = `Answer to the following request: "${prompt}". \nUse the following knowledge but feel free to use your own knowledge if required. If you dont have enough information, suggest to refresh the page or browse the website. First filter out all the content that doesn't look like a sentence:\nContent: \n${text}`
      let accessToken: string
      try {
        accessToken = await getAccessToken()
      } catch (err) {
        await storage.set(KEY_ACCESS_TOKEN, {})
        return {
          error: err.message
        }
      }

      return generateAnswers({
        accessToken,
        port: (ctx as unknown as { port: browser.Runtime.Port }).port,
        question
      })
    }),

  isAuthenticated: t.procedure.query(async () => {
    try {
      await getAccessToken()
      return true
    } catch (err) {
      return false
    }
  })
})
