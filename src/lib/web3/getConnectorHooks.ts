import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { MMHooks } from './connectors'
import { NetworkHooks } from './connectors'
import { WCHooks } from './connectors'

export const getConnectorHooks = (connector: Connector | null) => {
  let hooks = MMHooks
  if (connector instanceof MetaMask) {
    hooks = MMHooks
  } else if (connector instanceof WalletConnect) {
    hooks = WCHooks
  } else if (connector instanceof Network) {
    hooks = NetworkHooks
  } else {
    hooks = MMHooks
  }
  return hooks
}
