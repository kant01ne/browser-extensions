import { PostMessageEvent } from "utils/postMessageEvent"

const ExtensionPostMessageEventTypeValues = ["twitShorter:setAnswer"] as const

export type ExtensionPostMessageEventType =
  (typeof ExtensionPostMessageEventTypeValues)[number]

export type ExtensionPostMessageDataType = {
  type: ExtensionPostMessageEventType
  payload: string
}

export type ExtensionPostMessageEvent = PostMessageEvent<
  ExtensionPostMessageDataType,
  ExtensionPostMessageEventType
>

export function isExtensionPostMessageEvent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any
): event is ExtensionPostMessageEvent {
  return ExtensionPostMessageEventTypeValues.includes(event.data?.type)
}
