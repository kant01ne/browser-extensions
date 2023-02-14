import { clsx } from "clsx"
import React from "react"
import { SpotlightAnswer } from "ui/chatgpthing/SpotlightAnswer"
import {
  SpotlightBox,
  SpotlightBoxContainerClassName
} from "ui/chatgpthing/SpotlightBox"
import { SpotlightFooter } from "ui/chatgpthing/SpotlightFooter"
import { SpotlightForm } from "ui/chatgpthing/SpotlightForm"
import { SpotlightHeader } from "ui/chatgpthing/SpotlightHeader"
import { Separator } from "ui/separator"
import { useInterval } from "usehooks-ts"

const SpotlightBoxContainerBase: React.FC<
  React.ComponentProps<"div"> & {
    defaultAnswer: string
    initialIntervalDelay?: number
    onSetAnswer: (answer: string) => string
    prompt: string
    triggerSubmitAfter?: number | false
  } & Pick<
      React.ComponentPropsWithoutRef<typeof SpotlightForm>,
      "isDisabled" | "isOnboarding"
    >
> = ({
  className,
  defaultAnswer,
  initialIntervalDelay = 300,
  isDisabled,
  onSetAnswer,
  prompt,
  triggerSubmitAfter = 1000,
  ...props
}) => {
  /*
   * Hooks.
   */

  /*
   * State
   */
  const [answer, setAnswer] = React.useState<string>("")
  const [intervalDelay, setIntervalDelay] = React.useState<number | null>(null)

  /*
   * useEffect.
   */

  React.useEffect(() => {
    if (answer.length === defaultAnswer.length) {
      setIntervalDelay(null)
    }
  }, [answer, defaultAnswer, intervalDelay])

  const handleSubmit = () => setIntervalDelay(initialIntervalDelay)
  useInterval(
    () => {
      setAnswer(onSetAnswer)
    },
    // Delay in milliseconds or null to stop it
    intervalDelay
  )

  React.useEffect(() => {
    if (triggerSubmitAfter === false) return

    setTimeout(() => {
      setIntervalDelay(initialIntervalDelay)
    }, triggerSubmitAfter)
  }, [triggerSubmitAfter, initialIntervalDelay])

  /*
   * Render.
   */

  return (
    <SpotlightBox
      answer={answer}
      className={clsx("relative", SpotlightBoxContainerClassName, className)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      {...props}>
      <SpotlightHeader />
      <SpotlightAnswer answer={answer} />
      <SpotlightForm
        defaultPrompt={prompt}
        handleSubmit={handleSubmit}
        isAuthenticated={true}
        isDisabled={
          isDisabled ||
          (Boolean(answer?.length) && answer.length !== defaultAnswer.length)
        }
        isLoading={answer?.length > 0 && answer.length !== defaultAnswer.length}
      />
      <Separator className="mt-4 mb-2" />
      <SpotlightFooter
        className="px-2 py-0.5"
        handleShortcutUpdate={async (e) => {
          e.preventDefault()
        }}
        shortcut="⌥Z"
      />
    </SpotlightBox>
  )
}

export const SpotlightBoxContainer: React.FC<
  React.ComponentProps<typeof SpotlightBoxContainerBase> & {
    isSpotlightOpen: boolean
  }
> = ({ isSpotlightOpen, ...props }) => {
  return isSpotlightOpen ? <SpotlightBoxContainerBase {...props} /> : null
}
