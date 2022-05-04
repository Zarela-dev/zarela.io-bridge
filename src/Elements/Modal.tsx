import React from 'react'
import styled from 'styled-components'
import { Box } from 'rebass/styled-components'
import { Text } from './Typography'
import { Card } from './Card'
import { Icon } from './Icon'

const ModalWrapper = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
	padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'open 0.5s ease',
  transition: 'opacity 0.5s ease',
  '@keyframes open': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
})

export const Modal = ({
  title,
  isOpen,
  setIsOpen,
  sx,
  children,
  close = 'close',
  onClose,
  setParentModalOpen,
}: {
  title: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  sx?: React.CSSProperties
  children: React.ReactNode
  close?: string
  onClose?: () => void
  setParentModalOpen?: (isOpen: boolean) => void
}) => {
  return (
    <ModalWrapper sx={{ ...{ ...sx } }}>
      <Card variant="card.secondary" borderWidth={0} width={500}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Text variant="typography.titleSmall" as="h3">
            {title}
          </Text>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '1px',
              backgroundColor: 'background.other',
              my: 18,
            }}
          ></Box>

          <Icon
            variant="normal"
            src={`/images/icons/${close}.svg`}
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
            onClick={() => {
              setIsOpen(false)
              if (onClose) onClose()
              if (setParentModalOpen) setParentModalOpen(true)
            }}
          />
        </Box>
        <Box>{children}</Box>
      </Card>
    </ModalWrapper>
  )
}
