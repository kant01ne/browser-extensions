import { zodResolver } from "@hookform/resolvers/zod"
import { clsx } from "clsx"
import { Loader2 } from "lucide-react"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import { Button } from "ui/button"
import { Textarea } from "ui/textarea"
import { z } from "zod"

const promptSchema = z.object({
  prompt: z.string()
})
const placeholder = "Summarize this page."
type SpotlightFormData = z.infer<typeof promptSchema>

export const SpotlightForm: React.FC<
  React.ComponentProps<"form"> & {
    handleAuthClick?: React.MouseEventHandler<HTMLAnchorElement>
    handleKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
    handleSubmit?: SubmitHandler<{
      prompt?: string
    }>
    isAuthenticated?: boolean
    isLoading?: boolean
    prompt?: string
  }
> = ({
  className,
  handleAuthClick,
  handleKeyDown,
  handleSubmit,
  isAuthenticated,
  isLoading,
  prompt,
  ...props
}) => {
  const { handleSubmit: handleSubmitHook, register } =
    useForm<SpotlightFormData>({
      defaultValues: {
        prompt: prompt || ""
      },
      resolver: zodResolver(promptSchema)
    })

  /*
   * Render.
   */
  return (
    <form
      className={clsx("shrink-0", className)}
      onSubmit={handleSubmitHook(handleSubmit)}
      {...props}>
      <Textarea
        disabled={!isAuthenticated || isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && isAuthenticated) {
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
          className="w-full"
          disabled={!isAuthenticated || isLoading}
          type="submit"
          variant="outline">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
      </div>
      {isAuthenticated === false ? (
        <Balancer className="grow flex flex-col justify-center">
          <p className="text-base pt-4 text-center">
            Please login and pass Cloudflare check at{" "}
            <a
              className="text-sky-400"
              href="https://chat.openai.com"
              onClick={handleAuthClick}
              rel="noreferrer"
              target="_blank">
              chat.openai.com
            </a>
          </p>
        </Balancer>
      ) : null}
    </form>
  )
}
