import type { AddEthereumChainParameter } from '@web3-react/types'

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

export const CHAINS: { [chainId: number]: BasicChainInformation | ExtendedChainInformation } = {
  1: {
    urls: [
      // process.env.REACT_APP_ALCHEMY_KEY
      // 	? `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
      // 	: '',
      process.env.REACT_APP_POCKET_KEY
        ? `https://eth-mainnet.gateway.pokt.network/v1/lb/${process.env.REACT_APP_POCKET_KEY}`
        : '',
      // process.env.REACT_APP_INFURA_KEY ? `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : '',
      'https://cloudflare-eth.com',
    ].filter((url) => url !== ''),
    name: 'Mainnet',
  },
  3: {
    urls: [
      // process.env.REACT_APP_ALCHEMY_KEY
      // 	? `https://eth-ropsten.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
      // 	: '',
      process.env.REACT_APP_POCKET_KEY
        ? `https://eth-ropsten.gateway.pokt.network/v1/lb/${process.env.REACT_APP_POCKET_KEY}`
        : '',
      // process.env.REACT_APP_INFURA_KEY ? `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : '',
      'https://cloudflare-eth.com',
    ].filter((url) => url !== ''),
    name: 'Ropsten',
  },
}

export const RPCEndpoints: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{
  [chainId: number]: string[]
}>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs
  }

  return accumulator
}, {})
