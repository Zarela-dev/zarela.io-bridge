import { Contract } from '@ethersproject/contracts'
import { Connector } from '@web3-react/types'
import axios from 'axios'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MMConnector } from '../lib/web3/connectors'
import { detectWallet } from '../lib/web3/detectWallet'
import { STATUS, ConnectorType } from './types.d'

const STATUS_VERBOSE = {
  DISCONNECTED: 'Disconnected',
  NO_INJECTED_PROVIDER: 'No injected provider found.',
  INJECTED_PROVIDER_FOUND: 'Injected provider detected',
  INIT_CONNECTOR: 'Initializing ...',
  FAILED: 'Failed to connect',
  CONNECTED: 'Connected',
}

interface ContributionPayload {
  txHash: string
  requestID: number
  contributionIndexes: string[]
}
interface Contribution {
  [txHash: string]: {
    requestID: number
    contributionIndexes: number[]
  }
}

// interface approvedFiles {
//   [txhash: string]: {
//     requestNo: Number
//     originalIndex: Number
//   }
// }
export interface ConnectorSliceType {
  zarelaContract: Contract | null

  dialogOpen: boolean
  activeConnector: Connector | null
  activeConnectorType: ConnectorType | null
  connectorInProgress: Connector | null
  connectorStatus: STATUS
  verboseConnectorStatus: string | null

  setZarelaContract: (contract: Contract) => void

  setActiveConnectorType: (activeConnectorType: ConnectorType) => void
  setDialogOpen: (dialogOpen: boolean) => void
  setActiveConnector: (activeConnector: Connector) => void
  setConnectorInProgress: (connector: Connector) => void
  setStatus: (connectorStatus: STATUS, verboseMessage?: string) => void
}

const connectorSlice = (set: ({}) => void): ConnectorSliceType => ({
  zarelaContract: null,

  dialogOpen: false,

  activeConnector: null,
  activeConnectorType: null,
  connectorInProgress: MMConnector,
  connectorStatus: STATUS.DISCONNECTED,
  verboseConnectorStatus: null,

  setZarelaContract: (contract: Contract) => set({ zarelaContract: contract }),

  setActiveConnectorType: (activeConnectorType: ConnectorType) => set({ activeConnectorType }),
  setDialogOpen: (dialogOpen: boolean) => set({ dialogOpen }),
  setActiveConnector: async (activeConnector: Connector) => {
    set({ activeConnector, connectorInProgress: null, activeConnectorType: detectWallet(activeConnector) })
  },
  setConnectorInProgress: (connector: Connector) => set({ connectorInProgress: connector }),
  setStatus: (connectorStatus: STATUS, verboseMessage = undefined) =>
    set({ connectorStatus, verboseConnectorStatus: verboseMessage || STATUS_VERBOSE[connectorStatus] }),
})

const pendingFilesSlice = (
  set: ({}) => void,
  get: () => any
): {
  pendingFiles: {
    [txHash: string]: Contribution
  }
  addPendingFiles: (contribution: ContributionPayload) => void
  removePendingFiles: (txHash: string) => void
  clearPendingFiles: () => void
  initPendingFiles: () => void
} => ({
  pendingFiles: {},
  addPendingFiles: (contribution: ContributionPayload) => {
    set({
      pendingFiles: {
        ...get().pendingFiles,
        [contribution.txHash]: {
          requestID: contribution.requestID,
          contributionIndexes: contribution.contributionIndexes,
        },
      },
    })
  },
  removePendingFiles: (txHash: string) => {
    let _pending = get().pendingFiles
    delete _pending[txHash]
    set({ pendingFiles: _pending })
  },
  clearPendingFiles: () => set({ pendingFiles: {} }),
  initPendingFiles: async () => {
    const data = get().pendingFiles

    if (data !== undefined && Object.keys(data).length > 0) {
      let _pending = { ...data }

      for (const txHash of Object.keys(data)) {
        const response = await axios.get('https://api-ropsten.etherscan.io/api', {
          params: {
            module: 'transaction',
            action: 'gettxreceiptstatus',
            txhash: txHash,
            apikey: process.env.NEXT_PUBLIC_ETHEREUM_API_KEY,
          },
        })

        if (
          response.data.result.status === '1' ||
          response.data.status === '1' ||
          response.data.result.status === '0' ||
          response.data.status === '0'
        ) {
          delete _pending[txHash]
        }
      }

      set({ pendingFiles: _pending })
    }
  },
})

export const useStore = create(
  persist(
    (set, get) => ({
      ...connectorSlice(set),
      ...pendingFilesSlice(set, get),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        connectorStatus: state.connectorStatus,
        activeConnectorType: state.activeConnectorType,
        pendingFiles: state.pendingFiles,
      }),
    }
  )
)
