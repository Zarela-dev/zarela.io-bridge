import { toast, Zoom } from 'react-toastify'

export function copyToClipboard(text: string) {
  if (navigator.clipboard !== undefined) {
    navigator.clipboard.writeText(text)
    toast.success(' Copied to clipboard', {
      position: 'bottom-center',
      theme: 'dark',
      autoClose: 2000,
      transition: Zoom,
    })
  } else {
    const elem = document.createElement('textarea')
    elem.value = text
    document.body.appendChild(elem)
    elem.select()
    document.execCommand('copy')
    document.body.removeChild(elem)
    toast.success(' Copied to clipboard', {
      position: 'bottom-center',
      theme: 'dark',
      autoClose: 2000,
      transition: Zoom,
    })
  }
}
