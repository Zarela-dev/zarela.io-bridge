import { ConnectorType, ConnectorTypeRev } from '../../store/types'

export interface SupportedWalletsInterface {
  [key in ConnectorType]: {
    name: ConnectorTypeRev
    logo: StaticImageData
    connector: MetaMask | WalletConnect
  }
}

export type WalletItemViewTypes = 'list' | 'details'
