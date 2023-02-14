export function getDocumentTextFromDOM() {
  return [
    document.body.innerText,
    ...Array.from(document.querySelectorAll("svg text")).map((e) => e.innerHTML)
  ].join(" ")
}
