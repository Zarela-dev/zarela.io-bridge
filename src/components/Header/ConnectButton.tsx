import { Button } from '../../Elements/Button'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import { addressClipper } from '../../utils'
import chevronDown from '../../../public/images/icons/chevron-down.svg'
import { Box } from 'rebass/styled-components'
import { Icon } from '../../Elements/Icon'

const ConnectButton = () => {
  const { activeConnector, setDialogOpen } = useStore()
  const { useAccount, } = getConnectorHooks(activeConnector)
  const account = useAccount()
  return (
    <Button
      variant={account ? 'outline' : 'primary'}
      sx={{
        backgroundColor: 'red',
      }}
			onClick={() => setDialogOpen(true)}
    >
      {account ? (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }} >
          <Box as="span" mr={4}>
            {addressClipper(account)}
          </Box>
          <Icon src={chevronDown} alt={'v'} variant="medium" />
        </Box>
      ) : (
        'Connect'
      )}
    </Button>
  )
}

export default ConnectButton
