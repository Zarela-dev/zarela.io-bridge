import { Box } from 'rebass/styled-components'

const InlineSpinner = () => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: 20,
        height: 20,
        borderWidth: 3,
        border: 'solid',
        borderColor: 'transparent',
        borderRadius: '50%',
        borderTopColor: 'other.border',
        animation: `spin 1.2s linear infinite`,
        marginRight: 3,

        '@keyframes spin': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      }}
    ></Box>
  )
}

export default InlineSpinner
