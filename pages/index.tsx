import { Box } from 'rebass/styled-components'
import { Card } from './../src/Elements/Card'
import { Text } from './../src/Elements/Typography'
import { Button } from './../src/Elements/Button'
import { Icon } from './../src/Elements/Icon'

const Home = () => {
  return (
    <Box
      height={'100vh'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        variant="card.secondary"
        sx={{
          width: ['90%', '80%', '50%'],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text variant="typography.displayMedium" mb={[4]}>
          Zarela
        </Text>
        <Button
          variant="primary"
          size="large"
          width="100%"
          href="https://discord.gg/7qgYnj3xZC"
          target="_blank"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: [4, 5, 5],
          }}
        >
          <Text variant="typography.titleLarge">Join our community</Text>
          <Icon src="/images/icons/discord.svg" variant="medium" />
        </Button>
      </Card>
    </Box>
  )
}

export default Home
