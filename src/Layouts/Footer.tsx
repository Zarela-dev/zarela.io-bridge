import React from 'react'
import { Box } from 'rebass/styled-components'
import { Text } from '../Elements/Typography'
import Image from 'next/image'
import { Icon } from '../Elements/Icon'
import { Link } from '../Elements/Link'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.surface',
        width: '100%',
        padding: ['24px 16px 16px', '24px 32px 16px', '24px 32px 16px'],
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #70697A',
          paddingBottom: [0, 0, '40px'],
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            marginBottom: [5, 5, 0],
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
            mb={4}
          >
            <Image src="/images/logo.svg" alt="logo-zarela" width={128} height={59} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box mx={2}>
              <Link target="_blank" href="https://twitter.com/ZarelaNet">
                <Icon src="/images/social/twitter.svg" variant="large" />
              </Link>
            </Box>
            <Box mx={2}>
              <Link target="_blank" href="https://www.linkedin.com/company/zarela">
                <Icon src="/images/social/linkedin.svg" variant="large" />
              </Link>
            </Box>
            <Box mx={2}>
              <Link target="_blank" href="https://www.instagram.com/zarela.global">
                <Icon src="/images/social/instagram.svg" variant="large" />
              </Link>
            </Box>
            <Box mx={2}>
              <Link target="_blank" href="https://t.me/ZarelaNet">
                <Icon src="/images/social/telegram.svg" variant="large" />
              </Link>
            </Box>
            <Box mx={2}>
              <Link target="_blank" href="https://medium.com/@zarela.io">
                <Icon src="/images/social/medium.svg" variant="large" />
              </Link>
            </Box>
            <Box mx={2}>
              <Link target="_blank" href="https://discord.gg/7qgYnj3xZC">
                <Icon src="/images/social/discord.svg" variant="large" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: ['center', 'space-between', 'space-between'],
          alignItems: 'center',
          marginTop: ['23.5px'],
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: [5, 0, 0],
          }}
        >
          <Text variant="typography.bodySmall" as="span" color="content.600" textAlign="center">
            © 2022 Zarela. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
