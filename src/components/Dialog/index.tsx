import { Box } from 'rebass/styled-components'
import { Card } from '../../Elements/Card'
import { Icon } from '../../Elements/Icon'
import closeIcon from '../../../public/images/icons/close.svg'
import { ReactElement } from 'react'
import { Text } from '../../Elements/Typography'

const Dialog = ({
  closable = true,
  isOpen,
  onClose,
  children,
  header,
  title,
  body,
}: {
  children?: ReactElement
  body?: ReactElement
  header?: ReactElement
  title?: string
  closable?: boolean
  isOpen: boolean
  onClose?: () => void
}) => {
  if (isOpen)
    return (
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.8,
            zIndex: -1,
          }}
        ></Box>
        <Card
          variant="card.secondary"
          sx={{
            borderWidth: '0 !important',
            minWidth: 360,
            padding: `0 !important`,
          }}
        >
          {header ? (
            <Box
              as="header"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid',
                borderColor: 'other.border',
                padding: 4,
                minHeight: 56,
              }}
            >
              {header}
            </Box>
          ) : closable ? (
            <Box
              as="header"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid',
                borderColor: 'other.border',
                padding: 4,
                minHeight: 56,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: 16,
                }}
              >
                <Icon src={closeIcon} alt={'X'} onClick={onClose} variant="medium" />
              </Box>
              <Text variant="typography.titleSmall" color="content.900">
                {title}
              </Text>
            </Box>
          ) : null}
          <Box p={4}>{body}</Box>
        </Card>
      </Box>
    )
  return null
}

export default Dialog
