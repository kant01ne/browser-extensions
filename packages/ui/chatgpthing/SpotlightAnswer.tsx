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

  /*
   * Render.
   */
  return (
    <section {...props}>
      <div className="relative flex flex-col justify-center  bg-slate-50 dark:bg-slate-800 rounded-lg text-left">
        <div className="flex flex-col">
          <div className="flex justify-between align-top">
            <span className="px-2 flex text-xs italic underline underline-offset-4 items-center justify-center h-8 mt-[1px]">
              ChatGPThing
            </span>

            <Button
              className={clsx(
                " rounded-r-lg rounded-b-[0] rounded-l-[0]  border-t-2 border-r-2 rounded-[0] bg-slate-50 dark:bg-slate-800 h-8 focus:ring-[0px] text-xs focus:ring-offset-0 w-[64px]",
                {
                  "border-green-400": copiedToClipboard,
                  "border-sky-400": !copiedToClipboard
                }
              )}
              onClick={() => {
                if (!answer) return

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
          </div>
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
              className="min-h-[15vh] max-h-[23vh] flex flex-col"
              ref={scrollAreaRef}
              type="always">
              {answer ? (
                <ReactMarkdown className="dark:text-slate-100 dark:prose-invert prose [&>pre::-webkit-scrollbar]:!none max-w-prose prose-sm pt-2 pb-2 px-2">
                  {answer}
                </ReactMarkdown>
              ) : (
                <div className="min-h-[15vh] w-full flex justify-center items-center">
                  <div className="text-sm text-slate-400">
                    Nothing here yet...
                  </div>
                </div>
              )}
            </ScrollArea>
          </section>
        </div>
      </div>
      <Separator className="my-4" />
    </section>
  )
}
