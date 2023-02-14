import { t } from "@/trpc"
import { generateAnswers, generateAnswersController } from "@/utils/chatGPT"
import { KEY_ACCESS_TOKEN, getAccessToken } from "chatgpt/chatGPT"
import type browser from "webextension-polyfill"
import { z } from "zod"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

const storage = new PlasmoStorage()

export const chatGPTRouter = t.router({
  getAnswer: t.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input: { text } }) => {
      const question = `Summarize the following twitter thread in less than 300 words: \n Twitter: Thread: \n${text}`
      let accessToken: string
      try {
        accessToken = await getAccessToken()
      } catch (err) {
        await storage.set(KEY_ACCESS_TOKEN, {})
        return {
          error: err.message
        }
      }

      if (generateAnswersController) {
        generateAnswersController.abort()
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
