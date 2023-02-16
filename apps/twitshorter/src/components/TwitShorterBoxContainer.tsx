import { TwitShorterBox } from "@/components/TwitShorterBox"
import { TwitShorterHeader } from "@/components/TwitShorterHeader"
import { TwitShorterPrimaryForm } from "@/components/TwitShorterPrimaryForm"
import { TwitShorterSecondaryForm } from "@/components/TwitShorterSecondaryForm"
import { useTRPC } from "@/trpc/context"
import { useMutation } from "@tanstack/react-query"
import { useChatGPT } from "chatgpt/components/ChatGPTContext"
import { clsx } from "clsx"
import React from "react"
import ReactMarkdown from "react-markdown"
import { ChatGPTAuth } from "ui/chatgpt/ChatGPTAuth"

export const TwitShorterBoxContainer: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  /*
   * Hooks.
   */

  const { trpc } = useTRPC()

  const { isAuthenticated, answer } = useChatGPT()
  /*
   * Mutations.
   */
  const getChatGPTAnswerMutation = useMutation({
    mutationFn: (args: { text: string }) => trpc.chatGPT.getAnswer.mutate(args)
  })

  const handleSubmit = React.useCallback(() => {
    if (!window.location.pathname.includes("/status/")) {
      return
    }

    const text = Array.from(document.querySelectorAll('[role="article"]'))
      .filter(
        (element) =>
          // More Tweets section
          !(
            element.querySelector("h2") ||
            // Promoted tweets.
            ("innerText" in element &&
              (element as HTMLElement).innerText.endsWith("\nPromoted"))
          )
      )
      .map((element) => (element as HTMLDivElement).innerText)
      .join("\n\n\n")

    if (!text) {
      return
    }

    getChatGPTAnswerMutation.mutate({ text })
  }, [getChatGPTAnswerMutation])

  const [hasSubmited, setHasSubmited] = React.useState(false)
  /*
   * Render.
   */
  return (
    <TwitShorterBox className={clsx(className, "my-4")} {...props}>
      <ChatGPTAuth
        className="mt-4"
        handleAuthClick={async (e) => {
          e.preventDefault()
          await trpc.browser.openOpenAIAuthPage.mutate()
        }}
        isAuthenticated={isAuthenticated}
      />
      {isAuthenticated ? (
        <>
          <div className="flex items-center justify-between">
            <TwitShorterHeader />
            {hasSubmited && (
              <TwitShorterSecondaryForm
                handleSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              />
            )}
          </div>
          {!hasSubmited && (
            <TwitShorterPrimaryForm
              className="grow flex flex-col justify-center items-center"
              handleSubmit={(e) => {
                e.preventDefault()
                setHasSubmited(true)
                handleSubmit()
              }}
            />
          )}
          <ReactMarkdown className="dark:text-slate-100 dark:prose-invert prose [&>pre::-webkit-scrollbar]:!none max-w-prose pt-2 pb-2 [&>p]:!leading-snug">
            {answer || ""}
          </ReactMarkdown>
        </>
      ) : null}
    </TwitShorterBox>
  )
}
