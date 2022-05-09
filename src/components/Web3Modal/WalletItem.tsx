import { Flex, Box } from 'rebass/styled-components'
import { Text } from '../../Elements/Typography'
import styled from 'styled-components'
import { Button } from '../../Elements/Button'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'

import { useStore } from '../../store'
import { detectWallet } from '../../lib/web3/detectWallet'
import { activateConnector } from '../../lib/web3/activateConnector'
import { addressClipper } from '../../utils'
import Image, { StaticImageData } from 'next/image'
import { WalletItemViewTypes } from './types.d'
import { Connector } from '@web3-react/types'
import { ConnectorType, STATUS } from '../../store/types.d'
import InlineSpinner from '../Spinner/inline'

const Card = styled(Box)`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	border-radius: 8px;
	background-color: ${({ theme }) => `${theme.colors.background.other}`}};
	border: 1px solid ${({ theme }) => `${theme.colors.other.border}`}};
	padding: ${({ theme }) => `${theme.space[3]}px`}};
	margin-bottom: ${({ theme }) => `${theme.space[3]}px`}};
	width: 100%;
`

const Loader = styled.img`
  width: 25px;
`

const DetailsState = ({ name, walletId, address, deactivate, change }) => {
  return (
    <Card>
      <Flex flexDirection={'column'} alignItems="flex-start">
        <Text variant="typography.labelSmall" color="content.700" mb={1}>
          Connected with {name}
        </Text>
        <Text variant="typography.labelMedium" color="content.900">
          {addressClipper(address)}
        </Text>
      </Flex>
      <Box flex="1" />
      <Flex flexDirection={'column'}>
        <Button
          variant="primary"
          size="medium"
          onClick={change}
          sx={{
            minWidth: '90px !important',
            marginBottom: 2,
          }}
        >
          change
        </Button>
        {walletId === 'WALLETCONNECT' && (
          <Button
            variant="secondary"
            size="medium"
            onClick={deactivate}
            sx={{
              minWidth: '90px !important',
            }}
          >
            disconnect
          </Button>
        )}
      </Flex>
    </Card>
  )
}

const ActiveState = ({ name, logo, onClick, disabled }) => {
  return (
    <Card
      onClick={disabled ? () => {} : onClick}
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'success.main',
          marginRight: 2,
        }}
      ></Box>
      <Text variant="typography.labelMedium" color="content.900" fontWeight="600">
        {name}
      </Text>
      <Box flex="1" />
      <Image width={32} height={32} src={logo} alt={name} />
    </Card>
  )
}

const InProgressState = ({ logo, name }) => {
  return (
    <Card>
      <InlineSpinner />
      <Text variant="typography.labelMedium" color="content.900">
        Initializing ...
      </Text>
      <Box flex="1" />
      <Image width={32} height={32} src={logo} alt={name} />
    </Card>
  )
}

const DefaultState = ({ name, logo, onClick, disabled }) => {
  return (
    <Card
      onClick={disabled ? () => {} : onClick}
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text variant="typography.labelMedium" color="content.900">
        {name}
      </Text>
      <Box flex="1" />
      <Image width={32} height={32} src={logo} alt={name} />
    </Card>
  )
}

const WalletItem = ({
  view,
  name,
  logo,
  changeView,
  walletId,
  connector,
  changeActiveWallet,
  disabled,
}: {
  view: 'list' | 'details'
  name: string
  logo: StaticImageData
  changeView: (view: WalletItemViewTypes) => void
  changeActiveWallet?: (walletId: ConnectorType) => void
  walletId: ConnectorType
  connector: Connector
  disabled?: boolean
}) => {
  const { activeConnector, connectorInProgress, connectorStatus, setConnectorInProgress, setActiveConnector } =
    useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()
  const isActive = detectWallet(activeConnector) === walletId
  const isInProgress = detectWallet(connectorInProgress) === walletId

  return (
    <Box>
      {view === 'list' ? (
        <Flex>
          {isActive && connectorStatus === STATUS.CONNECTED ? (
            <ActiveState
              name={name}
              logo={logo}
              disabled={disabled}
              onClick={() => {
                changeView('details')
                changeActiveWallet && changeActiveWallet(walletId)
              }}
            />
          ) : isInProgress && connectorStatus === STATUS.INIT_CONNECTOR ? (
            <InProgressState logo={logo} name={name} />
          ) : (
            <DefaultState
              logo={logo}
              name={name}
              disabled={disabled}
              onClick={async () => {
                if (disabled) return
                await activateConnector(connector, setActiveConnector, setConnectorInProgress)
              }}
            />
          )}
        </Flex>
      ) : (
        <Flex>
          <DetailsState
            name={name}
            logo={logo}
            walletId={walletId}
            address={account}
            change={() => {
              changeView('list')
            }}
            deactivate={async () => {
              await connector.deactivate()
              changeView('list')
              changeActiveWallet && changeActiveWallet(walletId)
            }}
          />
        </Flex>
      )}
    </Box>
  )
}

export default WalletItem
