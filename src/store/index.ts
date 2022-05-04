import { Contract } from '@ethersproject/contracts'
import { Connector } from '@web3-react/types'
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

export interface ConnectorSliceType {
  zarelaContract: Contract | null
  votersContract: Contract | null

  dialogOpen: boolean
  activeConnector: Connector | null
  activeConnectorType: ConnectorType | null
  connectorInProgress: Connector | null
  connectorStatus: STATUS
  verboseConnectorStatus: string | null

  setZarelaContract: (contract: Contract) => void
  setVotersContract: (contract: Contract) => void

  setActiveConnectorType: (activeConnectorType: ConnectorType) => void
  setDialogOpen: (dialogOpen: boolean) => void
  setActiveConnector: (activeConnector: Connector) => void
  setConnectorInProgress: (connector: Connector) => void
  setStatus: (connectorStatus: STATUS, verboseMessage?: string) => void
}

const connectorSlice = (set: ({}) => void): ConnectorSliceType => ({
  zarelaContract: null,
  votersContract: null,

  dialogOpen: false,

  activeConnector: null,
  activeConnectorType: null,
  connectorInProgress: MMConnector,
  connectorStatus: STATUS.DISCONNECTED,
  verboseConnectorStatus: null,

  setZarelaContract: (contract: Contract) => set({ zarelaContract: contract }),
  setVotersContract: (contract: Contract) => set({ votersContract: contract }),

  setActiveConnectorType: (activeConnectorType: ConnectorType) => set({ activeConnectorType }),
  setDialogOpen: (dialogOpen: boolean) => set({ dialogOpen }),
  setActiveConnector: async (activeConnector: Connector) => {
    set({ activeConnector, connectorInProgress: null, activeConnectorType: detectWallet(activeConnector) })
  },
  setConnectorInProgress: (connector: Connector) => set({ connectorInProgress: connector }),
  setStatus: (connectorStatus: STATUS, verboseMessage = undefined) =>
    set({ connectorStatus, verboseConnectorStatus: verboseMessage || STATUS_VERBOSE[connectorStatus] }),
})

export const useStore = create(
  persist(
    (set) => ({
      ...connectorSlice(set),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        connectorStatus: state.connectorStatus,
        activeConnectorType: state.activeConnectorType,
      }),
    }
  )
)
