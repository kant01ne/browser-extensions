const ExtensionPostMessageEventTypeValues = ["twitShorter:setAnswer"] as const

export type ExtensionPostMessageEventType =
  (typeof ExtensionPostMessageEventTypeValues)[number]

export type ExtensionPostMessageEvent = {
  origin: string
  data: {
    type: ExtensionPostMessageEventType

    payload: string
  }
}

export function isExtensionPostMessageEvent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any
): event is ExtensionPostMessageEvent {
  return ExtensionPostMessageEventTypeValues.includes(event.data?.type)
}
