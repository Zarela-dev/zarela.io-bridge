import { ReactElement } from 'react'
import { Box, SxStyleProp } from 'rebass/styled-components'
import { Card } from '../../Elements/Card'
import { Text } from '../../Elements/Typography'
import loaderImage from '../../../public/images/loading.gif'
import Image, { StaticImageData } from 'next/image'

const BasicCard = ({
  title,
  subtitle,
  actions,
  children,
  contained = true,
  sx,
  loader = false,
  icon,
}: {
  title?: string
  children?: ReactElement
  subtitle?: string
  actions?: ReactElement
  contained?: boolean
  sx?: SxStyleProp
  loader?: boolean
  icon?: StaticImageData
}) => {
  return (
    <Card variant="card.secondary" contained={contained} sx={sx}>
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
        {icon && (
          <Box mb={4}>
            <Image src={icon} alt="loading" width={52} height={52} />
          </Box>
        )}
        {loader && (
          <Box mb={4}>
            <Image src={loaderImage} alt="loading" width={52} height={52} />
          </Box>
        )}
        <Text variant="typography.titleMedium" mb={2}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="typography.bodySmall" mb={5} color="content.800">
            {subtitle}
          </Text>
        )}
        {actions && <Box width={'100%'}>{actions}</Box>}
        {children}
      </Box>
    </Card>
  )
}

export default BasicCard
