import { ReactElement, useCallback, useEffect, useState } from 'react'
import WalletItem from './WalletItem'
import Dialog from '../Dialog'
import mmLogo from '../../../public/images/icons/metamask.svg'
import wcLogo from '../../../public/images/icons/walletConnect.svg'
import { useStore } from '../../store'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { activateConnector } from '../../lib/web3/activateConnector'
import { MMConnector, WCConnector } from '../../lib/web3/connectors'
import { ConnectorType, ConnectorTypeRev, STATUS } from '../../store/types.d'
import { SupportedWalletsInterface, WalletItemViewTypes } from './types'
import { Box } from 'rebass/styled-components'
import { Icon } from '../../Elements/Icon'
import { Text } from '../../Elements/Typography'
import returnIcon from '../../../public/images/icons/return.svg'

const Web3Modal = ({
  forceOpen,
  forceMetamask,
  eagerConnect,
  onClose,
}: {
  forceOpen?: boolean
  forceMetamask?: boolean
  eagerConnect?: boolean
  onClose?: () => void
}) => {
  const {
    connectorStatus,
    activeConnectorType,
    dialogOpen,
    setConnectorInProgress,
    setDialogOpen,
    setActiveConnector,
  } = useStore()

  const [view, setView] = useState<WalletItemViewTypes>('list')
  const [connectedWallet, setConnectedWallet] = useState<ConnectorType | null>(null)
  const [dialogHeader, setDialogHeader] = useState<ReactElement | undefined>(undefined)

  const changeView = (view: WalletItemViewTypes) => {
    if (view === 'details') {
      setDialogHeader(
        <>
          <Box
            sx={{
              position: 'absolute',
              left: 16,
              top: 16,
            }}
          >
            <Icon src={returnIcon} alt={'<'} onClick={() => changeView('list')} variant="medium" />
          </Box>
          <Text variant="typography.titleSmall" color="content.900">
            Account
          </Text>
        </>
      )
    } else {
      setDialogHeader(undefined)
    }
    setView(view)
  }

  const SUPPORTED_WALLETS: SupportedWalletsInterface = {
    [ConnectorType.MetaMask]: {
      name: ConnectorTypeRev.METAMASK,
      logo: mmLogo,
      connector: MMConnector,
    },
    // [ConnectorType.WalletConnect]: {
    //   name: ConnectorTypeRev.WALLETCONNECT,
    //   logo: wcLogo,
    //   connector: WCConnector,
    // },
  }

  // keep track of wallet connection status after revisit
  useEffect(() => {
    if (eagerConnect)
      if (connectorStatus === STATUS.CONNECTED && forceMetamask) {
        if (activeConnectorType === ConnectorType.MetaMask)
          activateConnector(MMConnector, setActiveConnector, setConnectorInProgress)
        else if (activeConnectorType === ConnectorType.WalletConnect) {
          activateConnector(WCConnector, setActiveConnector, setConnectorInProgress)
        }
      }
  }, [connectorStatus])

  useEffect(() => {
    if (connectorStatus === STATUS.DISCONNECTED && eagerConnect) {
      setDialogOpen(true)
    } else if (connectorStatus === STATUS.CONNECTED && activeConnectorType === null) {
      setDialogOpen(true)
    } else if (
      connectorStatus === STATUS.CONNECTED &&
      activeConnectorType !== ConnectorType.MetaMask &&
      forceMetamask
    ) {
      setDialogOpen(true)
    } else if (connectorStatus === STATUS.CONNECTED && activeConnectorType !== ConnectorType.Network) {
      setDialogOpen(false)
    } else {
      setDialogOpen(false)
    }
  }, [connectorStatus, activeConnectorType, forceMetamask])

  return (
    <Dialog
      isOpen={forceOpen || dialogOpen}
      title={'Connect to a wallet'}
      header={dialogHeader}
      onClose={() => {
        onClose && onClose()
        setDialogOpen(false)
      }}
      body={
        <>
          {view === 'list'
            ? Object.keys(SUPPORTED_WALLETS).map((key: ConnectorType) => {
                return (
                  <WalletItem
                    key={SUPPORTED_WALLETS[key].name}
                    walletId={key}
                    disabled={forceMetamask === true && key !== ConnectorType.MetaMask}
                    view={'list'}
                    logo={SUPPORTED_WALLETS[key].logo}
                    name={SUPPORTED_WALLETS[key].name}
                    connector={SUPPORTED_WALLETS[key].connector}
                    changeView={changeView}
                    changeActiveWallet={(walletId: ConnectorType) => setConnectedWallet(walletId)}
                  />
                )
              })
            : Object.keys(SUPPORTED_WALLETS).map((key) => {
                if (key === connectedWallet)
                  return (
                    <WalletItem
                      key={SUPPORTED_WALLETS[key].name}
                      walletId={key}
                      view={'details'}
                      changeView={changeView}
                      changeActiveWallet={(wallet: ConnectorType) => setConnectedWallet(wallet)}
                      logo={SUPPORTED_WALLETS[key].logo}
                      name={SUPPORTED_WALLETS[key].name}
                      connector={SUPPORTED_WALLETS[key].connector}
                    />
                  )
                return null
              })}
        </>
      }
    ></Dialog>
  )
}

export default Web3Modal
