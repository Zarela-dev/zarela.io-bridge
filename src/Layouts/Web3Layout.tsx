import { Contract } from '@ethersproject/contracts'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers'
import { ReactElement, ReactNode, useEffect } from 'react'
import { activateConnector } from '../lib/web3/activateConnector'
import { ZARELA_CONTRACT_ADDRESS } from '../lib/contracts/addresses'
import { CHAINS } from '../lib/web3/chains'
import { getConnectorHooks } from '../lib/web3/getConnectorHooks'
import { useStore } from '../store'
import { ConnectorType, STATUS } from '../store/types.d'
import ZarelaABI from '../lib/contracts/abi/ZarelaContract.json'

const setUpContracts = async (
  provider: ExternalProvider | JsonRpcFetchFunc,
  setContracts: { [key: string]: (contract: Contract) => void }
) => {
  if (provider !== undefined) {
    let currentChainId: number

    // provider
    let web3Provider: Web3Provider | null = null,
      zarelaContract: Contract | null = null

    try {
      web3Provider = new Web3Provider(provider, 'any')
    } catch (error: any) {
      console.error(error.message)
    }

    if (web3Provider === null) return

    try {
      currentChainId = (await web3Provider.getNetwork()).chainId
    } catch (error: any) {
      throw new Error(error.message)
    }
    // handle disconnect event
    try {
      if (Object.keys(CHAINS).findIndex((key) => +key === currentChainId) === -1) {
        await web3Provider.on('disconnect', async (code: any, reason: any) => {
          console.error(`Disconnected from provider: ${code} - ${reason}`)
        })
      }
    } catch (error: any) {
      console.error(error.message)
    }

    // make sure user is on the right network
    try {
      // if (Object.keys(CHAINS).findIndex((key) => +key === currentChainId) === -1) {
      if (web3Provider.provider.request)
        await web3Provider.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN).toString(16) }],
        })
      // }
    } catch (error: any) {
      console.error(error.message)
    }

    let signerOrProvider = web3Provider.getSigner()
    const chainToConnect: number | undefined = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)

    if (chainToConnect) {
      zarelaContract = new Contract(ZARELA_CONTRACT_ADDRESS[chainToConnect], ZarelaABI, signerOrProvider)
      try {
        await setContracts.setZarelaContract(zarelaContract)
      } catch (error: any) {
        console.log(error)
      }
    }
  } else {
    console.error('provider is undefined, can not setup contract')
  }
}

const Web3Layout = ({ children }: { children: ReactNode }) => {
  const {
    setStatus,
    connectorInProgress,
    activeConnector,
    connectorStatus,
    setConnectorInProgress,
    setActiveConnector,
    activeConnectorType,
    setZarelaContract,
  } = useStore()
  const { useError, useIsActivating, useIsActive } = getConnectorHooks(connectorInProgress || activeConnector)

  const error = useError()
  const isActivating = useIsActivating()
  const isActive = useIsActive()

  useEffect(() => {
    console.log('connector status', isActivating, isActive, connectorStatus, activeConnectorType)
    const bootstrapConnector = async () => {
      if (error) {
        // console.log('error here', error.message)
        await setStatus(STATUS.FAILED)
      } else {
        if (isActivating === true && isActive === false) {
          await setStatus(STATUS.INIT_CONNECTOR)
        } else if (isActivating === false && isActive === false) {
          await setStatus(STATUS.DISCONNECTED)
        } else if (isActivating === false && isActive === true) {
          await setStatus(STATUS.CONNECTED)
        } else {
          await setStatus(STATUS.FAILED)
        }
      }
    }
    bootstrapConnector()
  }, [isActivating, isActive, error, connectorStatus])

  useEffect(() => {
    if (connectorStatus === STATUS.CONNECTED && activeConnectorType === ConnectorType.MetaMask) {
      activateConnector(connectorInProgress || activeConnector, setActiveConnector, setConnectorInProgress)
    }
  }, [])

  useEffect(() => {
    const _activateConnector = async () => {
      if (connectorStatus === STATUS.CONNECTED && activeConnector) {
        if (activeConnector.provider !== undefined) {
          try {
            await setUpContracts(activeConnector.provider, { setZarelaContract })
          } catch (error: any) {
            console.log('failed to setup contract', error)
          }
        } else console.log('found no provider')
      }
    }
    _activateConnector()
  }, [connectorStatus])

  // useEffect(() => {
  //   const bootstrapWithInjected = async () => {
  //     let injectedProvider = window.ethereum

  //     if (injectedProvider !== undefined) {
  //       await setUpContracts(injectedProvider, { setZarelaContract, setVotersContract })

  //       injectedProvider.removeListener('chainChanged', () => {
  //         window.location.reload()
  //       })
  //       // to make sure that the setup happens again after chain changes
  //       injectedProvider.on('chainChanged', () => {
  //         window.location.reload()
  //       })
  //     } else if (injectedProvider === undefined) {
  //       setStatus(STATUS.INIT_CONNECTOR, 'Metamask not installed, trying to connect to fallback provider')
  //       try {
  //         activateConnector(NetworkConnector, setActiveConnector, setConnectorInProgress)
  //       } catch (error: any) {
  //         setStatus(STATUS.FAILED, 'could not connect to fallback nNetwork provider')
  //         console.error(error.message)
  //       }
  //     } else {
  //       console.log("no idea what's happening")
  //     }
  //   }
  //   bootstrapWithInjected()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return children
}

export default Web3Layout
