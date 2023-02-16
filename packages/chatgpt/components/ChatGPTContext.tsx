import { ChatGPTRouter } from "@/utils/router"
import { useQuery } from "@tanstack/react-query"
import { AnyRouter } from "@trpc/server"
import React from "react"
import type { getTRPCContext } from "trpc/getTRPCContext"
import type { PostMessageEvent } from "utils/postMessageEvent"
import browser from "webextension-polyfill"

export type ChatGPTContextValue = {
  answer: string | undefined
  isAuthenticated: boolean | undefined
}

const defaultContext: ChatGPTContextValue = {
  answer: undefined,
  isAuthenticated: undefined
}

const ChatGPTContext = React.createContext<ChatGPTContextValue>(defaultContext)

type TRPCType<T extends AnyRouter> = ReturnType<
  ReturnType<typeof getTRPCContext<T>>["useTRPC"]
>["trpc"]

export function ChatGPTProvider<
  AppRouter extends ChatGPTRouter,
  PostMessageDataTypeValue extends string,
  PostMessageDataType extends {
    type: PostMessageDataTypeValue
    payload?: string
  }
>({
  port,
  postMessageDataType,
  trpc,
  children
}: {
  children: React.ReactNode
  postMessageDataType: PostMessageDataTypeValue
  port: browser.runtime.Port
  trpc: TRPCType<AppRouter>
}): JSX.Element {
  /*
   * State.
   */
  const [value, setValue] = React.useState<ChatGPTContextValue>(defaultContext)

  const setAnswer = React.useCallback(
    (answer: string | undefined) => {
      setValue((old) => ({
        ...old,
        answer
      }))
    },
    [setValue]
  )

  /*
   * Queries.
   */
  const { data: isAuthenticated } = useQuery({
    queryFn: async () => {
      return await (
        trpc as TRPCType<ChatGPTRouter>
      ).chatGPT.isAuthenticated.query()
    },
    queryKey: ["isAuthenticated"]
  })

  /*
   * Callbacks.
   */
  const handleMessage = React.useCallback(
    (
      event: PostMessageEvent<PostMessageDataType, PostMessageDataTypeValue>
    ) => {
      switch (event.data?.type) {
        case postMessageDataType: {
          setAnswer(event.data.payload)
          break
        }
        default:
          break
      }
    },
    [setAnswer, postMessageDataType]
  )

  /*
   * Effects.
   */
  React.useEffect(() => {
    port.onMessage.addListener(handleMessage)
    return () => {
      port.onMessage.addListener(handleMessage)
    }
  }, [handleMessage, port.onMessage])

  return (
    <ChatGPTContext.Provider
      value={{
        answer: value.answer,
        isAuthenticated
      }}>
      {children}
    </ChatGPTContext.Provider>
  )
}

export const useChatGPT = (): ChatGPTContextValue =>
  React.useContext(ChatGPTContext)
