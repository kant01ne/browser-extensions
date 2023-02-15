import { ExtensionPostMessageEventType } from "@/utils/ExtensionPostMessageEvent"
import { browserRouter } from "trpc/browserRouter"
import { getChatGPTRouter } from "trpc/chatGPTRouter"
import { t } from "trpc/trpc"

export const appRouter = t.router({
  browser: browserRouter,
  chatGPT: getChatGPTRouter({
    buildPayload: (answer) => ({
      payload: answer,
      type: "twitShorter:setAnswer" satisfies ExtensionPostMessageEventType
    }),
    getPrompt: ({ text }) =>
      `Summarize the following twitter thread in less than 300 words: \n Twitter: Thread: \n${text}`
  })
})

export type AppRouter = typeof appRouter
