import React, { ReactElement } from 'react'
import { Box } from 'rebass/styled-components'
import { Text } from '../src/Elements/Typography'
import { Button } from '../src/Elements/Button'
import Image from 'next/image'
import ErrorImage from './../public/images/404.svg'

const Custom404 = () => {
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
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            width: ['100%', '100%', '50%'],
          }}
        >
          <Box mb={2}>
            <Text
              variant={['typography.titleMedium', 'typography.headlineMedium', 'typography.headlineMedium']}
              as="span"
            >
              It seems
            </Text>{' '}
            <Text
              variant={['typography.titleMedium', 'typography.headlineMedium', 'typography.headlineMedium']}
              as="span"
              underlined
            >
              something
            </Text>{' '}
            <Text
              variant={['typography.titleMedium', 'typography.headlineMedium', 'typography.headlineMedium']}
              as="span"
            >
              is missing...
            </Text>
          </Box>
          <Box mb={[5, 6, 6]}>
            <Text variant={['typography.bodySmall', 'typography.bodyLarge', 'typography.bodyLarge']}>
              Error code: 404
            </Text>
            <Text variant={['typography.bodySmall', 'typography.bodyLarge', 'typography.bodyLarge']}>
              We appear to have forgotten where you were looking.
            </Text>
          </Box>
          <Box mb={[40, 48, 0]}>
            <Button variant="primary" size="large" href="/">
              Back to home
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: '16px',
            width: ['100%', '100%', '50%'],
          }}
        >
          <Image src={ErrorImage} layout="responsive" />
        </Box>
      </Box>
    </Box>
  )
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default Custom404
