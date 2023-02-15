import React from "react"

export const ChatGPTAuth: React.FC<
  React.ComponentProps<"div"> & {
    isAuthenticated?: boolean
    handleAuthClick?: React.MouseEventHandler<HTMLAnchorElement>
  }
> = ({ handleAuthClick, isAuthenticated, ...props }) => {
  if (isAuthenticated !== false) {
    return null
  }
  /*
   * Render.
   */
  return (
    <div {...props}>
      <div className="grow flex flex-col justify-center">
        <p className="text-base text-center">
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
      </div>
    </div>
  )
}
