const ExtensionPostMessageEventTypeValues = [
  "ChatGPTWeb:browserActionClicked",
  "ChatGPTWeb:spotlight:show",
  "ChatGPTWeb:spotlight:setAnswer",
  "ChatGPTWeb:spotlight:toggle"
] as const

export type ExtensionPostMessageEventType =
  (typeof ExtensionPostMessageEventTypeValues)[number]

export type ExtensionPostMessageEvent = {
  origin: string
  data:
    | {
        type: Exclude<
          ExtensionPostMessageEventType,
          "ChatGPTWeb:spotlight:setAnswer"
        >
      }
    | {
        type: Extract<
          ExtensionPostMessageEventType,
          "ChatGPTWeb:spotlight:setAnswer"
        >
        payload: string
      }
    | {
        type: Extract<
          ExtensionPostMessageEventType,
          "ChatGPTWeb:spotlight:setText"
        >
        payload: string
      }
}

export function isExtensionPostMessageEvent(
  event: any
): event is ExtensionPostMessageEvent {
  return ExtensionPostMessageEventTypeValues.includes(event.data?.type)
}
