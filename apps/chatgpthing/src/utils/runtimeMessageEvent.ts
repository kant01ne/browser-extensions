const RunTimeMessageTypeValues = ["ChatGPTWeb:browserActionClicked"] as const

type RunTimeMessageType = (typeof RunTimeMessageTypeValues)[number]

export type RuntimeMessage = {
  origin: string
  data: {
    type: RunTimeMessageType
  }
}
