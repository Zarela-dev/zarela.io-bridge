import { Connector } from '@web3-react/types'

export const activateConnector = async (
  connector: Connector | null,
  setActiveConnector: (connector: Connector) => void,
  setConnectorInProgress: (connector: Connector) => void
) => {
  if (!connector) throw new Error(`can not activate ${connector} connector`)
  await setConnectorInProgress(connector)
  await connector.activate([process.env.NEXT_PUBLIC_DEFAULT_CHAIN])
  await setActiveConnector(connector)
}
