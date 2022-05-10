import React, { ReactNode } from 'react'
import { Box, SxStyleProp } from 'rebass/styled-components'

const AppContainer = ({ children, sx }: { children: ReactNode; sx?: SxStyleProp }) => {
  return (
    <Box
      sx={{
        maxWidth: ['100%', '100%', 1760],
        width: '100%',
        height: '100%',
        paddingLeft: [4, 40, 80],
        paddingRight: [4, 40, 80],
        margin: '0 auto',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default AppContainer
