import React from "react"

export default function Head() {
  return (
    <>
      <title>ChatGPThing</title>
      <meta charSet="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <meta
        content="An open source browser extension ot query ChatGPT with the current page context."
        name="description"
      />

      <meta content="ChatGPThing" property="og:title" />
      <meta content="website" property="og:type" />
      <meta content="https://chatgpthing.vercel.app" property="og:url" />
      <meta content="/og.jpg" property="og:image" />
      <meta content="ChatGPThing" name="twitter:title" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="https://chatgpthing.vercel.app" property="twitter:url" />
      <meta
        content="https://chatgpthing.vercel.app/og.jpg"
        name="twitter:image"
      />
      <link href="/icon.ico" rel="icon" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </>
  )
}
