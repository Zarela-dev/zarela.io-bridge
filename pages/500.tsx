import React, { ReactElement } from 'react'
import { Box } from 'rebass/styled-components'
import { Text } from '../src/Elements/Typography'
import { Button } from '../src/Elements/Button'
import Image from 'next/image'
import ErrorImage from './../public/images/500.svg'
import AppContainer from '../src/components/containers/AppContainer'

const Custom500 = () => {
  return (
    <Box
      sx={{
        height: ['auto', 'auto', 'calc(100vh - 410px)'],
        marginBottom: [80, 180, 'auto'],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            borderRadius: '16px',
            width: ['100%', '480px', '480px'],
          }}
          mb={[6]}
        >
          <Image src={ErrorImage} layout="responsive" />
        </Box>

        <Box
          sx={{
            width: ['100%', '480px', '480px'],
          }}
        >
          <Box mb={2} sx={{ textAlign: 'center' }}>
            <Text
              variant={['typography.titleMedium', 'typography.headlineMedium', 'typography.headlineMedium']}
              as="span"
            >
              Oops,
            </Text>{' '}
            <Text
              variant={['typography.titleMedium', 'typography.headlineMedium', 'typography.headlineMedium']}
              as="span"
              underlined
            >
              We
            </Text>{' '}
            <Text
              variant={['typography.titleMedium', 'typography.headlineMedium', 'typography.headlineMedium']}
              as="span"
            >
              messed up here!
            </Text>
          </Box>

          <Box
            mb={[5, 6, 6]}
            sx={{
              textAlign: 'center',
            }}
          >
            <Text variant={['typography.bodySmall', 'typography.bodyLarge', 'typography.bodyLarge']} as="span">
              Error code: 500
              <br />
              Unfortunately, we have encountered an error and are working to resolve it! Things should resume shortly.
            </Text>
          </Box>
          <Box
            mb={[40, 48, 0]}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" size="large" href="https://discord.gg/7qgYnj3xZC">
              Back to home
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <AppContainer>{page}</AppContainer>
}

export default Custom500
