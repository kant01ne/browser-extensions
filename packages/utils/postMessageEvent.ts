export type PostMessageEvent<
  PostMessageDataType extends { type: T; payload?: unknown },
  T
> = {
  origin: string
  data: PostMessageDataType
}
