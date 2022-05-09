import { Button } from '../../Elements/Button'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import { addressClipper } from '../../utils'
import chevronDown from '../../../public/images/icons/chevron-down.svg'
import { Box } from 'rebass/styled-components'
import { Icon } from '../../Elements/Icon'
import { Text } from '../../Elements/Typography'

const ConnectButton = () => {
  const { activeConnector, setDialogOpen } = useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()

  return (
    <Button variant={account ? 'outline' : 'secondary'} size="medium" onClick={() => setDialogOpen(true)}>
      <Text variant="typography.labelSmall">
        {account ? (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
            <Box as="span" mr={4}>
              {addressClipper(account)}
            </Box>
            <Icon src={chevronDown} alt={'v'} variant="small" />
          </Box>
        ) : (
          'Connect Wallet'
        )}
      </Text>
    </Button>
  )
}

export default ConnectButton
