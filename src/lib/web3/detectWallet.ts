import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { ConnectorType } from '../../store/types.d'

export const detectWallet = (connector: Connector | null): ConnectorType | 'unknown' | null => {
  if (connector === null) return null
  if (connector instanceof MetaMask) {
    return ConnectorType.MetaMask
  } else if (connector instanceof WalletConnect) {
    return ConnectorType.WalletConnect
  } else if (connector instanceof Network) {
    return ConnectorType.Network
  } else {
    console.error(
      new Error('Provided Connector is not supported. Please use MetaMask, WalletConnect or Network connectors.')
    )
    return 'unknown'
  }
}
