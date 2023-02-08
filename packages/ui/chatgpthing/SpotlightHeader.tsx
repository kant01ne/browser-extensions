import type React from "react"
import Balancer from "react-wrap-balancer"

export const SpotlightHeader: React.FC<
  React.ComponentPropsWithoutRef<"div">
> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <h1 className="w-[100%] text-base flex font-bold text-center items-center justify-center mb-4">
        <Balancer>
          Query{" "}
          <span className="font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
            chatGPT
          </span>{" "}
          in the{" "}
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-extrabold">
            context
          </span>{" "}
          of the current page
        </Balancer>
      </h1>
    </div>
  )
}
