const ExtensionPostMessageEventTypeValues = [
  "ChatGPThing:browserActionClicked",
  "ChatGPThing:spotlight:setAnswer",
  "ChatGPThing:spotlight:toggle"
] as const

export type ExtensionPostMessageEventType =
  (typeof ExtensionPostMessageEventTypeValues)[number]

export type ExtensionPostMessageEvent = {
  origin: string
  data:
    | {
        type: Extract<
          ExtensionPostMessageEventType,
          "ChatGPThing:spotlight:setAnswer"
        >
        payload: string
      }
    | {
        type: Exclude<
          ExtensionPostMessageEventType,
          "ChatGPThing:spotlight:setAnswer"
        >
      }
}

export function isExtensionPostMessageEvent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any
): event is ExtensionPostMessageEvent {
  return ExtensionPostMessageEventTypeValues.includes(event.data?.type)
}
