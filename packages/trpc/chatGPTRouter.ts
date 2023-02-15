import type browser from "webextension-polyfill"
import { z } from "zod"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

import {
  KEY_ACCESS_TOKEN,
  generateAnswers,
  generateAnswersController,
  getAccessToken
} from "../chatgpt/chatGPT"
import { t } from "./trpc"

const storage = new PlasmoStorage()

export type ChatGPTRouter = ReturnType<typeof getChatGPTRouter>

export const getChatGPTRouter = ({
  getPrompt,
  buildPayload
}: {
  getPrompt: (args: { prompt?: string; text: string }) => string
  buildPayload: (answer: string) => unknown
}) => {
  return t.router({
    getAnswer: t.procedure
      .input(z.object({ prompt: z.optional(z.string()), text: z.string() }))
      .mutation(async ({ ctx, input: { prompt, text } }) => {
        const question = getPrompt({
          prompt,
          text
        })
        let accessToken: string | undefined
        try {
          accessToken = await getAccessToken()
        } catch (err) {
          await storage.set(KEY_ACCESS_TOKEN, {})
          throw err
        }

        if (generateAnswersController) {
          generateAnswersController.abort()
        }

        if (!accessToken) {
          return
        }

        return generateAnswers({
          accessToken,
          buildPayload,
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
}
