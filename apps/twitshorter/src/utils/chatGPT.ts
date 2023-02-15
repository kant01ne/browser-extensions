import type { ExtensionPostMessageEventType } from "@/utils/ExtensionPostMessageEvent"
import type browser from "webextension-polyfill"

import {
  sendMessage,
  setConversationProperty
} from "../../packages/chatgptss/chatGPT"

export let generateAnswersController: AbortController | undefined

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
  generateAnswersController = new AbortController()

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
            type: "twitShorter:setAnswer" satisfies ExtensionPostMessageEventType
          }
        })
        conversationID = event.data.conversationId
      },
      prompt: question.slice(0, 8000),
      signal: generateAnswersController.signal,
      token: accessToken
    }).catch((err) => {
      deleteConversation()
      reject(err)
    })
  })
}
