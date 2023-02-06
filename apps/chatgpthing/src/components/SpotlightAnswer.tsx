import { clsx } from "clsx"
import React from "react"
import ReactMarkdown from "react-markdown"
import { Button } from "ui/button"
import { ScrollArea } from "ui/scroll-area"
import { Separator } from "ui/separator"

export const SpotlightAnswer: React.FC<
  React.ComponentProps<"div"> & {
    answer?: string
  }
> = ({ answer, ...props }) => {
  /*
   * State.
   */
  const [copiedToClipboard, setCopiedToClipboard] = React.useState(false)

  if (!answer || !answer.length) return null
  /*
   * Render.
   */
  return (
    <section {...props}>
      <div className="relative flex flex-col justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-left">
        <div className="flex flex-col">
          <Button
            className={clsx(
              " rounded-r-lg rounded-b-[0] rounded-l-[0]  border-t-2 border-r-2 rounded-[0] bg-slate-50 dark:bg-slate-800 h-6 focus:ring-[0px] text-[0.75rem] focus:ring-offset-0 z-[2] w-[4rem] self-end",
              {
                "border-green-400": copiedToClipboard,
                "border-sky-400": !copiedToClipboard
              }
            )}
            onClick={() => {
              navigator.clipboard.writeText(answer).catch(() => {})
              setCopiedToClipboard(true)
              setTimeout(() => {
                setCopiedToClipboard(false)
              }, 3000)
            }}
            size="sm"
            variant="ghost">
            {copiedToClipboard ? "Copied" : "Copy"}
          </Button>
          <section
            id="spotlight-text"
            style={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              display: "-webkit-box",
              inlineSize: "100%",
              overflow: "hidden",
              overflowWrap: "break-word",
              textOverflow: "ellipsis"
            }}>
            <ScrollArea className="max-h-[23vh] flex flex-col">
              <ReactMarkdown className="dark:text-slate-100 dark:prose-invert prose [&>pre::-webkit-scrollbar]:!none max-w-prose prose-sm pt-2 pb-2 px-2">
                {answer}
              </ReactMarkdown>
            </ScrollArea>
          </section>
        </div>
      </div>
      <Separator className="my-4" />
    </section>
  )
}
