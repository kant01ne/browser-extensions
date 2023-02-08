/* eslint-disable no-console */
import { SpotlightBox } from "./SpotlightBox"

import "../style/font.css"
import "../style/style.css"

import type { Story } from "@ladle/react"
import React from "react"

/*
 * Common.
 */

const LadleBase: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  children
}) => {
  return (
    <div className="h-[80vh] flex justify-center items-center bg-slate-100 dark:bg-slate-800">
      {children}
    </div>
  )
}

const args = {
  answer:
    "This is a test answer. Go to [Google](https://google.com). Example code \n```npm install blob```\n",
  className: "w-[25vw] max-h-[calc(100vh-12opx)] max-w-[18.5rem]",
  disabled: false,
  isAuthenticated: true,
  isLoading: false,
  shortcut: "⌥Z"
}

const argTypes = {
  handleClose: {
    action: "handleClose"
  },
  handleShortcutUpdate: {
    action: "handleShortcutUpdate"
  },
  handleSubmit: {
    action: "handleSubmit"
  }
}

const getTemplate: () => Story<
  React.ComponentPropsWithoutRef<typeof SpotlightBox>
> = () => (props) => {
  return (
    <LadleBase>
      <SpotlightBox {...props} />
    </LadleBase>
  )
}

/*
 * Default.
 */
export const Default = getTemplate()

Default.args = {
  ...args,
  answer: undefined
}

Default.argTypes = {
  ...argTypes
}

/*
 * NoShortcut.
 */
export const NoShortcut = getTemplate()

NoShortcut.args = {
  ...args,
  shortcut: undefined
}

NoShortcut.argTypes = {
  ...argTypes
}

/*
 * CmdAndShiftAndZShorcut.
 */
export const CmdAndShiftAndZShorcut = getTemplate()

CmdAndShiftAndZShorcut.args = {
  ...args,
  shortcut: "⌘⇧Z"
}

CmdAndShiftAndZShorcut.argTypes = {
  ...argTypes
}

/*
 * CtrlAndShiftAndEShorcut.
 */
export const CtrlAndShiftAndEShorcut = getTemplate()

CtrlAndShiftAndEShorcut.args = {
  ...args,
  shortcut: "⌃⇧E"
}

CtrlAndShiftAndEShorcut.argTypes = {
  ...argTypes
}

/*
 * NeedAuthentication.
 */
export const NeedAuthentication = getTemplate()

NeedAuthentication.args = {
  ...args,
  answer: undefined,
  isAuthenticated: false
}

NeedAuthentication.argTypes = {
  ...argTypes
}

/*
 * NeedAuthentication.
 */
export const Loading = getTemplate()

Loading.args = {
  ...args,
  isLoading: true
}

Loading.argTypes = {
  ...argTypes
}

/*
 * LongAnswer.
 */
export const LongAnswer = getTemplate()

const answer = `
Here is a step-by-step guide to create a Chrome extension from scratch:

Decide on the functionality of the extension: What does your extension do? What problem does it solve?

Create a new directory for your extension, and within it create the following files:

manifest.json: This file contains the metadata for your extension, including its name, description, version number, and permissions.
popup.html: This is the HTML file for the popup window that will appear when your extension icon is clicked.
popup.css: This is the CSS file for the popup window.
\`popup.js\`: This is the JavaScript file for the popup window.
In the manifest.json file, include the following code:

\`\`\`json
{
  "manifest_version": 2,
  "name": "My Extension",
  "description": "This is my first Chrome extension.",
  "version": "1.0",
  "browser_action": {
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab"
  ]
}
\`\`\`
Write the HTML, CSS, and JavaScript code for the popup window.

Load the extension into Chrome:

Open Chrome, and click on the three dots in the upper right corner.
Select "More tools" and then "Extensions".
Turn on "Developer mode" in the top right corner.
Click "Load unpacked" and select the directory for your extension.
Test your extension by clicking on the icon in the browser toolbar.

Make any necessary changes and repeat steps 5 and 6 until your extension is complete.
`

LongAnswer.args = {
  ...args,
  answer,
  className: args.className + " fixed top-20 "
}

LongAnswer.argTypes = {
  ...argTypes
}

/*
WithOnboardingTick.
 */
export const WithOnboardingTick = getTemplate()

WithOnboardingTick.args = {
  ...args,
  answer: answer.slice(0, answer.length / 5),
  isOnboarding: true
}

WithOnboardingTick.argTypes = {
  ...argTypes
}

/*
 * MiddleAnswer.
 */
export const MiddleAnswer = getTemplate()

MiddleAnswer.args = {
  ...args,
  answer: answer.slice(0, answer.length / 5),
  className: args.className + " fixed top-20 "
}

MiddleAnswer.argTypes = {
  ...argTypes
}

/*
 * StreamingAnswer.
 */
export const StreamingAnswer: Story<
  React.ComponentPropsWithoutRef<typeof SpotlightBox>
> = ({ answer: defaultAnswer, ...props }) => {
  const [answer, setAnswer] = React.useState("")
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!defaultAnswer) return
      setAnswer((old) => defaultAnswer.slice(0, old.length + 8))
    }, 200)
    return () => clearInterval(interval)
  }, [defaultAnswer])

  return (
    <LadleBase>
      <SpotlightBox answer={answer} {...props} />
    </LadleBase>
  )
}

StreamingAnswer.args = {
  ...args,
  answer
}

StreamingAnswer.argTypes = {
  ...argTypes
}
