export enum ConnectorType {
  MetaMask = 'METAMASK',
  WalletConnect = 'WALLETCONNECT',
  Network = 'NETWORK',
}

export enum ConnectorTypeRev {
  METAMASK = 'MetaMask',
  WALLETCONNECT = 'WalletConnect',
  NETWORK = 'Network',
}

export enum STATUS {
  DISCONNECTED = 'DISCONNECTED',
  NO_INJECTED_PROVIDER = 'NO_INJECTED_PROVIDER',
  INJECTED_PROVIDER_FOUND = 'INJECTED_PROVIDER_FOUND',
  INIT_CONNECTOR = 'INIT_CONNECTOR',
  FAILED = 'FAILED',
  CONNECTED = 'CONNECTED',
}
