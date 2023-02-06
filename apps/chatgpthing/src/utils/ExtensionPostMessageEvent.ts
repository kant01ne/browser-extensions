const ExtensionPostMessageEventTypeValues = [
  "ChatGPThing:browserActionClicked",
  "ChatGPThing:spotlight:show",
  "ChatGPThing:spotlight:setAnswer",
  "ChatGPThing:spotlight:toggle"
] as const

export type ExtensionPostMessageEventType =
  (typeof ExtensionPostMessageEventTypeValues)[number]

export type ExtensionPostMessageEvent = {
  origin: string
  data:
    | {
        type: Exclude<
          ExtensionPostMessageEventType,
          "ChatGPThing:spotlight:setAnswer"
        >
      }
    | {
        type: Extract<
          ExtensionPostMessageEventType,
          "ChatGPThing:spotlight:setAnswer"
        >
        payload: string
      }
    | {
        type: Extract<
          ExtensionPostMessageEventType,
          "ChatGPThing:spotlight:setText"
        >
        payload: string
      }
}

export function isExtensionPostMessageEvent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any
): event is ExtensionPostMessageEvent {
  return ExtensionPostMessageEventTypeValues.includes(event.data?.type)
}
