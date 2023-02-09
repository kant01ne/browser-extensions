import { useTRPC } from "@/components/trpc/withTRPC"
import {
  ExtensionPostMessageEvent,
  isExtensionPostMessageEvent
} from "@/utils/ExtensionPostMessageEvent"
import { getDocumentTextFromDOM } from "@/utils/getDocumentTextFromDOM"
import { useMutation, useQuery } from "@tanstack/react-query"
import { clsx } from "clsx"
import React from "react"
import {
  SpotlightBox,
  SpotlightBoxContainerClassName
} from "ui/chatgpthing/SpotlightBox"
import { getBrowserNameFromNavigator } from "utils/getBrowserNameFromNavigator"

const placeholder = "Summarize this page."

export const SpotlightBoxContainer: React.FC<
  React.ComponentProps<"div"> & {
    handleClose: React.MouseEventHandler<HTMLButtonElement>
  }
> = ({ handleClose, className, ...props }) => {
  /*
   * State.
   */
  const [answer, setAnswer] = React.useState<string | undefined>(undefined)

  /*
   * Hooks.
   */

  const { trpc, port } = useTRPC()

  /*
   * Queries.
   */
  const { data: isAuthenticated } = useQuery({
    queryFn: async () => {
      return await trpc.chatGPT.isAuthenticated.query()
    },
    queryKey: ["isAuthenticated"]
  })

  const { data: browserCommand } = useQuery({
    queryFn: async () => {
      return await trpc.browser.browserCommand.query()
    },
    queryKey: ["browserCommand"]
  })

  /*
   * Mutations.
   */
  const getChatGPTAnswerMutation = useMutation({
    mutationFn: ({ prompt }: { prompt?: string }) =>
      trpc.chatGPT.getAnswer.mutate({
        prompt: prompt?.length > 0 ? prompt : placeholder,
        text: getDocumentTextFromDOM()
      })
  })

  /*
   * Callbacks.
   */
  const handleMessage = React.useCallback(
    (event: ExtensionPostMessageEvent | object) => {
      if (!isExtensionPostMessageEvent(event)) {
        return
      }

      switch (event.data?.type) {
        case "ChatGPThing:spotlight:setAnswer": {
          setAnswer(event.data.payload)
          break
        }
        default:
          break
      }
    },
    []
  )

  /*
   * Effects.
   */
  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    port.onMessage.addListener(handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
      port.onMessage.addListener(handleMessage)
    }
  }, [handleMessage, port.onMessage])

  /*
   * Render.
   */
  return (
    <SpotlightBox
      answer={answer}
      className={clsx(
        SpotlightBoxContainerClassName,
        "top-[60px] right-16 fixed",
        className
      )}
      handleAuthClick={async (e) => {
        e.preventDefault()
        await trpc.browser.openOpenAIAuthPage.mutate()
      }}
      handleClose={handleClose}
      handleShortcutUpdate={async (e) => {
        e.preventDefault()
        await trpc.browser.openShortcutPage.mutate({
          browser: getBrowserNameFromNavigator()
        })
      }}
      handleSubmit={(args) => getChatGPTAnswerMutation.mutate(args)}
      isAuthenticated={isAuthenticated}
      isLoading={getChatGPTAnswerMutation.isLoading}
      shortcut={browserCommand?.[0]?.shortcut}
      {...props}
    />
  )
}
