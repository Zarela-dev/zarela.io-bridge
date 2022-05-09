import { ReactElement } from 'react'
import { Box } from 'rebass/styled-components'
import { string } from 'yup'
import { Button } from '../../Elements/Button'
import { Card } from '../../Elements/Card'
import { Text } from '../../Elements/Typography'

const BasicCard = ({ title, subtitle, actions }: { title: string; subtitle: string; actions: ReactElement }) => {
  return (
    <Card variant="card.secondary" contained>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Text variant="typography.titleMedium" mb={2}>
          {title}
        </Text>
        <Text variant="typography.bodySmall" mb={5} color="content.800">
          {subtitle}
        </Text>
        <Box width={'100%'}>{actions}</Box>
      </Box>
    </Card>
  )
}

export default BasicCard
