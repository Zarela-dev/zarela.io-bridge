import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { RPCEndpoints } from './chains'

export const [MMConnector, MMHooks, MMStore] = initializeConnector((actions) => new MetaMask(actions))

export const [NetworkConnector, NetworkHooks, NetworkStore] = initializeConnector(
  (actions) => new Network(actions, RPCEndpoints),
  Object.keys(RPCEndpoints).map((chainId) => Number(chainId))
)

export const [WCConnector, WCHooks, WCStore] = initializeConnector(
  (actions) =>
    new WalletConnect(actions, {
      rpc: Object.keys(RPCEndpoints).reduce((accumulator: { [chainId: number]: string }, chainId) => {
        accumulator[Number(chainId)] = RPCEndpoints[Number(chainId)][0]
        return accumulator
      }, {}),
    }),
  Object.keys(RPCEndpoints).map((chainId) => Number(chainId))
)