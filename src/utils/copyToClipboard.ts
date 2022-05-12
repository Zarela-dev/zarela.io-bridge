export function copyToClipboard(text: string) {
  if (navigator.clipboard !== undefined) {
    navigator.clipboard.writeText(text)
  } else {
    const elem = document.createElement('textarea')
    elem.value = text
    document.body.appendChild(elem)
    elem.select()
    document.execCommand('copy')
    document.body.removeChild(elem)
  }
}
