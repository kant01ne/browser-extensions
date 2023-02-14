import { t } from "@/trpc"
import { browserRouter } from "@/trpc/browserRouter"
import { chatGPTRouter } from "@/trpc/chatGPTRouter"

export const appRouter = t.router({
  browser: browserRouter,
  chatGPT: chatGPTRouter
})

export type AppRouter = typeof appRouter
