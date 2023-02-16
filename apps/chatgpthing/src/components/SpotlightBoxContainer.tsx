import { SpotlightAnswer } from "@/components/SpotlightAnswer"
import {
  SpotlightBox,
  SpotlightBoxContainerClassName
} from "@/components/SpotlightBox"
import { SpotlightFooter } from "@/components/SpotlightFooter"
import { SpotlightForm } from "@/components/SpotlightForm"
import { SpotlightHeader } from "@/components/SpotlightHeader"
import { useTRPC } from "@/trpc/context"
import { getDocumentTextFromDOM } from "@/utils/getDocumentTextFromDOM"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useChatGPT } from "chatgpt/components/ChatGPTContext"
import { clsx } from "clsx"
import React from "react"
import { ChatGPTAuth } from "ui/chatgpt/ChatGPTAuth"
import { Separator } from "ui/separator"
import { getBrowserNameFromNavigator } from "utils/getBrowserNameFromNavigator"

const placeholder = "Summarize this page."

export const SpotlightBoxContainer: React.FC<
  React.ComponentProps<"div"> & {
    handleClose: React.MouseEventHandler<HTMLButtonElement>
  }
> = ({ handleClose, className, ...props }) => {
  /*
   * Hooks.
   */

  const { trpc } = useTRPC()
  const { isAuthenticated, answer } = useChatGPT()

  /*
   * Queries.
   */

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
        prompt: prompt && prompt?.length > 0 ? prompt : placeholder,
        text: getDocumentTextFromDOM()
      })
  })

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
      handleClose={handleClose}
      {...props}>
      <SpotlightHeader />
      <SpotlightAnswer answer={answer} />
      <SpotlightForm
        handleSubmit={(args) => getChatGPTAnswerMutation.mutate(args)}
        isAuthenticated={isAuthenticated}
        isLoading={getChatGPTAnswerMutation.isLoading}
      />
      <ChatGPTAuth
        className="mt-4"
        handleAuthClick={async (e) => {
          e.preventDefault()
          await trpc.browser.openOpenAIAuthPage.mutate()
        }}
        isAuthenticated={isAuthenticated}
      />
      <Separator className="mt-4 mb-2" />
      <SpotlightFooter
        className="px-2 py-0.5 "
        handleShortcutUpdate={async (e) => {
          e.preventDefault()
          await trpc.browser.openShortcutPage.mutate({
            browser: getBrowserNameFromNavigator()
          })
        }}
        shortcut={browserCommand?.[0]?.shortcut}
      />
    </SpotlightBox>
  )
}
