import type { ExtensionPostMessageEventType } from "@/utils/ExtensionPostMessageEvent"
import { browserRouter } from "trpc/browserRouter"
import { getChatGPTRouter } from "trpc/chatGPTRouter"
import { t } from "trpc/trpc"

export const appRouter = t.router({
  browser: browserRouter,
  chatGPT: getChatGPTRouter({
    buildPayload: (answer) => ({
      payload: answer,
      type: "ChatGPThing:spotlight:setAnswer" satisfies ExtensionPostMessageEventType
    }),
    getPrompt: ({ prompt, text }) =>
      `Answer to the following request: "${prompt}". \nUse the following knowledge but feel free to use your own knowledge if required. If you dont have enough information, suggest to refresh the page or browse the website. First filter out all the content that doesn't look like a sentence:\nContent: \n${text}`
  })
})

export type AppRouter = typeof appRouter
