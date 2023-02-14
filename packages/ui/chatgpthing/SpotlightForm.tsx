import { zodResolver } from "@hookform/resolvers/zod"
import { clsx } from "clsx"
import { Loader2 } from "lucide-react"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../button"
import { Textarea } from "../textarea"

const promptSchema = z.object({
  prompt: z.string()
})

type SpotlightFormData = z.infer<typeof promptSchema>

export const SpotlightForm: React.FC<
  React.ComponentProps<"form"> & {
    placeholder?: string
    handleKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
    handleSubmit: SubmitHandler<{
      prompt?: string
    }>
    isAuthenticated?: boolean
    isDisabled?: boolean
    isOnboarding?: boolean
    isLoading?: boolean
    defaultPrompt?: string
  }
> = ({
  className,
  placeholder = "Summarize this page.",
  handleKeyDown,
  handleSubmit,
  isAuthenticated,
  isDisabled,
  isLoading,
  isOnboarding = false,
  defaultPrompt,
  ...props
}) => {
  const { handleSubmit: handleSubmitHook, register } =
    useForm<SpotlightFormData>({
      defaultValues: {
        prompt: defaultPrompt || ""
      },
      resolver: zodResolver(promptSchema)
    })

  /*
   * Render.
   */
  return (
    <form className={clsx("shrink-0", className)} {...props}>
      <Textarea
        disabled={!isAuthenticated || isLoading || isDisabled}
        onKeyDown={(e) => {
          if (!e.shiftKey && e.key === "Enter" && isAuthenticated) {
            handleSubmitHook(handleSubmit)(e)
            e.preventDefault()
          }
          // Prevent executing the current page shortcuts.
          e.stopPropagation()
        }}
        {...register("prompt")}
        placeholder={placeholder}
      />

      <div className="pt-4">
        <Button
          className="w-full relative"
          disabled={!isAuthenticated || isLoading || isDisabled}
          onClick={handleSubmitHook(handleSubmit)}
          variant="outline">
          {isOnboarding && !isLoading ? (
            <span className="absolute top-[-4px] right-[-4px] flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          ) : null}
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </form>
  )
}
