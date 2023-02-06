import type { ExtensionPostMessageEventType } from "@/utils/ExtensionPostMessageEvent"
import { fetchSSE } from "@/utils/fetchSSE"
import throttle from "lodash-es/throttle"
import { v4 as uuidv4 } from "uuid"
import type browser from "webextension-polyfill"

import { Storage as PlasmoStorage } from "@plasmohq/storage"

const storage = new PlasmoStorage()

export interface Answer {
  text: string
  messageId: string
  conversationId: string
}

export type Event =
  | {
      type: "answer"
      data: Answer
    }
  | {
      type: "done"
    }

/*
 * ChatGPT.
 */
export const KEY_ACCESS_TOKEN = "GPTAccessToken"
export const getAccessToken = throttle(async (): Promise<string> => {
  try {
    const { token, expiresAt } = await storage.get<{
      token: string
      expiresAt: number
    }>(KEY_ACCESS_TOKEN)

    if (token && expiresAt > Date.now()) {
      return token
    }
  } catch (err) {
    /* empty */
  }

  const resp = await fetch("https://chat.openai.com/api/auth/session")
  if (resp.status === 403) {
    throw new Error("CLOUDFLARE")
  }
  const data = await resp.json().catch(() => ({}))
  if (!data.accessToken) {
    throw new Error("UNAUTHORIZED")
  }

  await storage.set(KEY_ACCESS_TOKEN, {
    expiresAt: Date.now() + 1000 * 60 * 20,
    token: data.accessToken
  })
  return data.accessToken
}, 1000 * 5)

async function request(
  token: string,
  method: string,
  path: string,
  data: unknown
) {
  return fetch(`https://chat.openai.com/backend-api${path}`, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method
  })
}

export async function sendMessageFeedback(
  token: string,
  data: unknown
): Promise<void> {
  await request(token, "POST", "/conversation/message_feedback", data)
}

export async function setConversationProperty(
  token: string,
  conversationId: string,
  propertyObject: object
): Promise<void> {
  await request(
    token,
    "PATCH",
    `/conversation/${conversationId}`,
    propertyObject
  )
}

export async function sendMessage(params: {
  token: string
  prompt: string
  onEvent: (event: Event) => void
  signal?: AbortSignal
}): Promise<void> {
  await fetchSSE("https://chat.openai.com/backend-api/conversation", {
    body: JSON.stringify({
      action: "next",
      messages: [
        {
          content: {
            content_type: "text",
            parts: [params.prompt]
          },
          id: uuidv4(),
          role: "user"
        }
      ],
      model: "text-davinci-002-render",
      parent_message_id: uuidv4()
    }),
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    onMessage(message: string) {
      if (message === "[DONE]") {
        params.onEvent({ type: "done" })
        return
      }
      let data
      try {
        data = JSON.parse(message)
      } catch (err) {
        return
      }
      const text = data.message?.content?.parts?.[0]
      if (text) {
        params.onEvent({
          data: {
            conversationId: data.conversation_id,
            messageId: data.message.id,
            text
          },
          type: "answer"
        })
      }
    },
    signal: params.signal
  })
}

export async function generateAnswers({
  port,
  accessToken,
  question
}: {
  port: browser.Runtime.Port
  question: string
  accessToken: string
}): Promise<void> {
  let conversationID: string | undefined
  const deleteConversation = () => {
    if (conversationID) {
      setConversationProperty(accessToken, conversationID, {
        is_visible: false
      })
    }
  }

  const controller = new AbortController()
  return await new Promise<undefined>((resolve, reject) => {
    sendMessage({
      onEvent(event) {
        if (event.type === "done") {
          deleteConversation()
          return resolve(undefined)
        }
        port.postMessage({
          data: {
            payload: event.data.text,
            type: "ChatGPThing:spotlight:setAnswer" satisfies ExtensionPostMessageEventType
          }
        })
        conversationID = event.data.conversationId
      },
      prompt: question.slice(0, 8000),
      signal: controller.signal,
      token: accessToken
    }).catch((err) => {
      deleteConversation()
      reject(err)
    })
  })
}
