import { clsx } from "clsx"
import React from "react"
import { SpotlightBox } from "ui/chatgpthing/SpotlightBox"
import { useInterval } from "usehooks-ts"

const SpotlightBoxContainerBase: React.FC<
  React.ComponentProps<"div"> & {
    defaultAnswer: string
    initialIntervalDelay?: number
    onSetAnswer: (answer: string) => string
    prompt: string
    triggerSubmitAfter?: number | false
  } & Pick<
      React.ComponentPropsWithoutRef<typeof SpotlightBox>,
      "isDisabled" | "isOnboarding"
    >
> = ({
  className,
  defaultAnswer,
  initialIntervalDelay = 300,
  isDisabled,
  onSetAnswer,
  prompt,
  triggerSubmitAfter = 2000,
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
      className={clsx(
        "relative w-[25vw] min-w-[248px] max-h-[calc(100vh-120px)] max-w-[296px]",
        className
      )}
      defaultPrompt={prompt}
      handleShortcutUpdate={async (e) => {
        e.preventDefault()
      }}
      handleSubmit={handleSubmit}
      isAuthenticated={true}
      isDisabled={
        isDisabled ||
        (Boolean(answer?.length) && answer.length !== defaultAnswer.length)
      }
      isLoading={answer?.length > 0 && answer.length !== defaultAnswer.length}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      shortcut="⌥Z"
      {...props}
    />
  )
}

export const SpotlightBoxContainer: React.FC<
  React.ComponentProps<typeof SpotlightBoxContainerBase> & {
    isSpotlightOpen: boolean
  }
> = ({ isSpotlightOpen, ...props }) => {
  return isSpotlightOpen ? <SpotlightBoxContainerBase {...props} /> : null
}
