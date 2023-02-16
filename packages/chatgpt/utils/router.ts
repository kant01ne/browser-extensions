import { getChatGPTRouter } from "chatgpt/trpc/chatGPTRouter"
import { t } from "trpc/trpc"

export const chatGPTRouter = t.router({
  chatGPT: getChatGPTRouter({
    buildPayload: () => {},
    getPrompt: () => ""
  })
})

export type ChatGPTRouter = typeof chatGPTRouter
