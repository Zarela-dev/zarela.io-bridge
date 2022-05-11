import { ReactElement } from 'react'
import { Box } from 'rebass/styled-components'

const BodyWrapper = ({ children }: { children: ReactElement | false | undefined }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default BodyWrapper