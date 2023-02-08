import { clsx } from "clsx"
import React from "react"
import ReactMarkdown from "react-markdown"

import { Button } from "../button"
import { ScrollArea } from "../scroll-area"
import { RADIX_SCROLL_AREA_SELECTOR, Separator } from "../separator"

export const SpotlightAnswer: React.FC<
  React.ComponentProps<"div"> & {
    answer?: string
  }
> = ({ answer, ...props }) => {
  /*
   * Refs.
   */
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null)

  /*
   * State.
   */
  const [copiedToClipboard, setCopiedToClipboard] = React.useState(false)
  React.useState<number>(0)
  const [hasScrolledUpManually, setHasScrolledUpManually] =
    React.useState(false)

  React.useEffect(() => {
    if (answer && answer.length && !hasScrolledUpManually) {
      const container = scrollAreaRef.current?.querySelector(
        RADIX_SCROLL_AREA_SELECTOR
      )

      container?.scrollTo({ behavior: "smooth", top: 10000 })
    }
  }, [answer, hasScrolledUpManually])

  const hasAnswer = React.useMemo(() => answer && answer?.length > 0, [answer])
  React.useEffect(() => {
    if (hasScrolledUpManually) return
    const container = scrollAreaRef.current?.querySelector(
      RADIX_SCROLL_AREA_SELECTOR
    )

    if (!container) return

    container.addEventListener("wheel", checkHasScrolledUpManually)

    function checkHasScrolledUpManually(event: Event & { deltaY?: number }) {
      if (event.deltaY && event.deltaY < 0) {
        setHasScrolledUpManually(true)
        return
      }
    }

    return () => {
      container.removeEventListener("wheel", checkHasScrolledUpManually)
    }
  }, [hasAnswer, hasScrolledUpManually])

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
            <ScrollArea
              className="max-h-[23vh] flex flex-col"
              ref={scrollAreaRef}
              type="always">
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
