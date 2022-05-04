import React, { ReactNode } from 'react'
import { Box } from 'rebass/styled-components'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function copyToClipboard(text: string) {
  const elem = document.createElement('textarea')
  elem.value = text
  document.body.appendChild(elem)
  elem.select()
  document.execCommand('copy')
  document.body.removeChild(elem)
}

// https://gist.github.com/jiggzson/b5f489af9ad931e3d186
export const CopyableText = ({ children, textToCopy, ...rest }: { children: ReactNode; textToCopy: string }) => {
  const notify = () =>
    toast.success('Contract Address Copied', {
      position: 'bottom-center',
      theme: 'dark',
      toastId: 'SMART_CONTRACT_ADDRESS_COPY',
      autoClose: 2000,
      transition: Zoom,
    })

  return React.cloneElement(
    <Box>
      <Box
        sx={{
          cursor: 'pointer',
        }}
        onClick={notify}
      >
        {children}
      </Box>
      <ToastContainer limit={1} />
    </Box>,
    {
      onClick: () => {
        if (navigator.clipboard !== undefined) {
          navigator.clipboard.writeText(textToCopy)
        } else {
          copyToClipboard(textToCopy)
        }
        notify()
      },
      ...rest,
    }
  )
}
