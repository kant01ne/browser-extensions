import { t } from "trpc/trpc"

import { getChatGPTRouter } from "../trpc/chatGPTRouter"

export const chatGPTRouter = t.router({
  chatGPT: getChatGPTRouter({
    buildPayload: () => {},
    getPrompt: () => ""
  })
})

export type ChatGPTRouter = typeof chatGPTRouter
