import { ReactElement, useEffect, useRef, useState } from 'react'
import { Box } from 'rebass'
import { Button } from '../../Elements/Button'
import { Text } from '../../Elements/Typography'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import { convertToBiobit } from '../../utils'
import BodyWrapper from '../BodyWrapper'
import BasicCard from '../EncryptionPublicKey/Card'
import RequestCard from './RequestCard'
import axios from 'axios'
// import worker from 'workerize-loader!./decrypt.worker.js'
import { saveAs } from 'file-saver'
import Dialog from '../Dialog'
import Image from 'next/image'
import loaderImage from '../../../public/images/loading.gif'

const Inbox = () => {
  const [requests, setRequests] = useState({})
  const [isLoading, setLoading] = useState<boolean>(true)
  const { activeConnector, zarelaContract: contract, initPendingFiles, setDialogOpen } = useStore()
  const { useAccount, useProvider, useIsActive } = getConnectorHooks(activeConnector)
  const account = useAccount()
  const provider = useProvider()
  const isActive = useIsActive()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [dialogMessage, setDialogMessage] = useState<string>('')
  const worker: any = useRef()
  const [closable, setClosable] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(true)
  const [collapsedRequest, setCollapsedRequest] = useState<number | null>(null)

  const clearSubmitDialog = () => {
    setLoader(true)
    setClosable(false)
    setSubmitting(false)
    setDialogMessage('')
  }

  useEffect(() => {
    worker.current = new Worker(new URL('../../workers/decrypt.worker.ts', import.meta.url))
    return () => {
      worker.current.terminate()
    }
  }, [])

  useEffect(() => {
    initPendingFiles()
  }, [])

  useEffect(() => {
    if (contract !== null) {
      if (account) {
        contract
          .orderResult({ from: account })
          .then((result) => {
            const myRequests = result[0].map((item) => item.toNumber())
            setCollapsedRequest(myRequests[0])
            // fo fetch handle loading state we need make sure this runs synchronously (predictable)
            const getAllRequests = new Promise(async (resolve, reject) => {
              const requestsListObject = {}

              for (const currentRequest of myRequests) {
                await contract
                  .orders(currentRequest)
                  .then((result) => {
                    const requestTemplate = {
                      requestID: result[0].toNumber(),
                      title: result[1],
                      description: result[7],
                      requesterAddress: result[2],
                      angelTokenPay: convertToBiobit(result[3].toNumber(), false),
                      laboratoryTokenPay: convertToBiobit(result[4].toNumber(), false),
                      totalContributors: result[5].toNumber(), // total contributors required
                      totalContributed: result[5].toNumber() - result[8].toNumber(),
                      whitePaper: result[6],
                      timestamp: result[10].toNumber(),
                      totalContributedCount: result[9].toNumber(),
                    }
                    requestsListObject[requestTemplate.requestID] = requestTemplate
                  })
                  .catch((error) => {
                    console.error(error.message)
                  })
              }
              resolve(requestsListObject)
            })

            // here we are sure that all the requests are fetched
            getAllRequests
              .then((result) => {
                setRequests(result)
              })
              .finally(() => {
                setLoading(false)
              })
          })
          .catch((error) => {
            console.error(error.message)
          })
      }
    }
  }, [contract, account])

  const signalDownloadHandler = async (fileHash, fileMetaCID) => {
    if (provider?.provider.request) {
      setSubmitting(true)
      const workerInstance = worker.current

      try {
        /* fetch signal file metadata from IPFS */
        setDialogMessage('Downloading encrypted keys from IPFS')

        const encryptedFileMetaRes = await axios.get(`${process.env.NEXT_PUBLIC_IPFS_GET_LINK + fileMetaCID}`)
        setDialogMessage('Please approve decryption from your wallet')

        const decryptedFileMeta = await provider.provider.request({
          method: 'eth_decrypt',
          params: [encryptedFileMetaRes.data, account],
        })

        const { KEY, NONCE, FILE_NAME, FILE_EXT } = JSON.parse(decryptedFileMeta)

        setDialogMessage('Decrypting keys ...')
        /* decrypt secret key using metamask*/

        workerInstance.postMessage({
          fileHash,
          KEY,
          NONCE,
        })

        workerInstance.onmessage = async (event) => {
          if (event.data.type === 'terminate') {
            // workerInstance.terminate()
          }
          if (event.data.type === 'feedback') {
            setDialogMessage(event.data.message)
          }
          if (event.data.type === 'decrypted') {
            console.log(event.data.decrypted_file, `${FILE_NAME}.${FILE_EXT}`)
            await saveAs(new Blob([event.data.decrypted_file]), `${FILE_NAME}.${FILE_EXT}`)
            clearSubmitDialog()
          }
        }
      } catch (error) {
        if (error.code === 4001) {
          clearSubmitDialog()
        } else {
          setClosable(true)
          setLoader(false)
          setDialogMessage('there was an error decrypting your file, please contact support for more information.')
        }
        console.error(error)
      }
    } else {
      console.error('no provider found')
    }
  }

  return (
    <BodyWrapper>
      <Box width="100%">
        <Dialog
          closable={closable}
          isOpen={isSubmitting}
          onClose={() => {
            clearSubmitDialog()
          }}
          body={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '140px',
                minWidth: '520px',
              }}
            >
              {loader ? (
                <Box mb={4}>
                  <Image src={loaderImage} alt="loading" width={52} height={52} />
                </Box>
              ) : null}
              <Text variant="typography.titleMedium">{dialogMessage}</Text>
            </Box>
          }
        />
        {!isActive ? (
          <BasicCard
            title="Trying to load your requests"
            subtitle="You need to connect your wallet to see your requests"
            actions={
              <Button variant="primary" size="medium" sx={{ width: '100%' }} onClick={() => setDialogOpen(true)}>
                Connect
              </Button>
            }
          />
        ) : isLoading ? (
          <BasicCard title={'Loading your requests'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100px',
                width: '100%',
              }}
            >
              <Image src={loaderImage} alt="loading" width={52} height={52} />
            </Box>
          </BasicCard>
        ) : Object.keys(requests).length > 0 ? (
          Object.keys(requests).map((key) => {
            return (
              <RequestCard
                collapsedRequest={collapsedRequest}
                setCollapsedRequest={setCollapsedRequest}
                download={signalDownloadHandler}
                request={requests[key]}
                key={key}
              />
            )
          })
        ) : (
          <BasicCard
            title="No results found"
            subtitle="You don't seem to have any requests."
            actions={
              <Button variant="primary" size="medium" sx={{ width: '100%' }} onClick={() => alert('back to bioverse')}>
                Back to Bioverse
              </Button>
            }
          />
        )}
      </Box>
    </BodyWrapper>
  )
}

export default Inbox
