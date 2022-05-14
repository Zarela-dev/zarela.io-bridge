import { create } from 'ipfs-http-client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../Elements/Button'
import Dropzone from '../../Elements/Dropzone'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import { convertToBiobit, copyToClipboard, hashClipper, ZRNG } from '../../utils'
import BodyWrapper from '../BodyWrapper'
import BasicCard from '../EncryptionPublicKey/Card'
import { encrypt } from 'eth-sig-util'
import * as ethUtil from 'ethereumjs-util'
import { useRouter } from 'next/router'
import { Box } from 'rebass/styled-components'
import exclamationMarkIcon from '../../../public/images/icons/exclamation-mark.svg'
import copyIcon from '../../../public/images/icons/copy.svg'
import { Card } from '../../Elements/Card'
import { Text } from '../../Elements/Typography'
import { Icon } from '../../Elements/Icon'
import { Link } from '../../Elements/Link'
import InfoBox from '../Inbox/InfoBox'
import useBiobit from '../../hooks/useBiobit'
import biobitSymbol from '../../../public/images/icons/BBIT.svg'
import userIcon from '../../../public/images/icons/user.svg'

const ContributeForm = () => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<Error | null>(null)
  const worker: any = useRef()
  const { zarelaContract, activeConnector, setDialogOpen } = useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()
  const router = useRouter()
  const [request, setRequest] = useState<any>({})

  const [submittingFile, setSubmittingFile] = useState(false)
  const [contributionDone, setContributionDone] = useState(false)
  const [closable, setClosable] = useState(false)
  const [txHash, setTxHash] = useState('0xaf60e9aef1084b0b9f965f17f2a5c81c3fb3f33607b53b2eab35215eb2823506')
  const [hasSpinner, setHasSpinner] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogSubtitle, setDialogSubtitle] = useState('')
  const [isLoading, setLoading] = useState(true)
  const getBBIT = useBiobit()

  const clearSubmitDialog = () => {
    setSubmittingFile(false)
    setContributionDone(false)
    setClosable(false)
    setDialogMessage('')
  }

  useEffect(() => {
    worker.current = new Worker(new URL('../../workers/encrypt.worker.ts', import.meta.url))
    return () => {
      worker.current.terminate()
    }
  }, [])

  useEffect(() => {
    const { requestId } = router.query

    if (zarelaContract && requestId) {
      zarelaContract
        .orders(requestId)
        .then((result: any) => {
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
            encryptionPublicKey: result[11],
          }
          setRequest(requestTemplate)
        })
        .catch((error) => {
          console.error(error.message)
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        })
    }
  }, [zarelaContract, router.query])

  const submitSignal = useCallback(
    (request: any, file: File) => {
      if (zarelaContract && account) {
        // setIsContributing(true)
        setSubmittingFile(true)
        setHasSpinner(true)
        setClosable(false)
        setDialogMessage('encrypting file')
        const workerInstance = worker.current

        const ipfs = create(process.env.NEXT_PUBLIC_IPFS_GATEWAY) // Connect to IPFS
        // generate KEY and NONCE for chacha20 encryption
        const KEY = ZRNG()
        const NONCE = ZRNG()

        workerInstance.postMessage({
          KEY,
          NONCE,
          file,
        })

        workerInstance.addEventListener('message', async (event) => {
          if (event.data.type === 'terminate') {
            // workerInstance.terminate()
          }
          if (event.data.type === 'encryption:error') {
            console.error(error)
          }
          if (event.data.type === 'encryption:feedback') {
            setDialogMessage(event.data.message)
          }
          if (event.data.type === 'encryption') {
            const lastDot = file.name.lastIndexOf('.')
            try {
              const fileMeta = {
                NONCE,
                KEY,
                FILE_EXT: file.name.substring(lastDot + 1),
                FILE_NAME: file.name.substring(0, lastDot),
                FILE_MIMETYPE: file.type,
              }
              // AES key encryption using Metamask
              const encryptedFileMeta = ethUtil.bufferToHex(
                Buffer.from(
                  JSON.stringify(
                    encrypt(request.encryptionPublicKey, { data: JSON.stringify(fileMeta) }, 'x25519-xsalsa20-poly1305')
                  ),
                  'utf8'
                )
              )
              /* 
									to download file later (in the inbox page) with proper name and extension,
									here we store these meta information in an object on IPFS then we store this IPFS
									hash on the blockchain using our SC contribute method.
								*/
              /* encrypted is an array */
              const fileMetaResponse = await ipfs.add(encryptedFileMeta, {
                pin: true,
              })

              setDialogMessage('Approve it from your Wallet')
              setDialogSubtitle('In this step, you must approve the transaction within your wallet')
              setHasSpinner(false)
              zarelaContract
                .contribute(
                  request.requestID,
                  account, // angel
                  account, // laboratory
                  true, // true: angel receives reward. false: laboratory receives reward.
                  request.requesterAddress,
                  event.data.ipfs_path, // encrypted file CID
                  fileMetaResponse.path, // file metadata CID
                  { from: account }
                )
                .then((result) => {
                  setContributionDone(true)
                  setTxHash(result.hash)
                })
                .catch((error) => {
                  console.error(error)
                  clearSubmitDialog()
                  // toast(error.message || error, 'error')
                })
            } catch (error) {
              // clearSubmitDialog()
              console.error(error)
            }
          }
        })
      }
    },
    [zarelaContract, account]
  )

  if (!account) {
    return (
      <BodyWrapper>
        <BasicCard
          title="Connect to wallet"
          subtitle="To contribute, you must connect to your wallet"
          actions={
            <Button variant="primary" size="medium" sx={{ width: '100%' }} onClick={() => setDialogOpen(true)}>
              Connect
            </Button>
          }
        />
      </BodyWrapper>
    )
  }
  return (
    <BodyWrapper>
      <Box sx={{ flex: 1 }}>
        {contributionDone ? (
          <BasicCard sx={{ flex: 1 }} contained={false} title="All done">
            <Box sx={{ width: '100%', marginTop: 3 }}>
              <Card variant="card.other" sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text variant="typography.labelSmall" color="content.700" sx={{ marginBottom: 1 }}>
                      Tx hash
                    </Text>
                    <Text variant="typography.labelMedium" color="content.900">
                      {hashClipper(txHash)}
                    </Text>
                  </Box>
                  <Box flex={1}></Box>
                  <Box
                    onClick={() => {
                      copyToClipboard(txHash)
                    }}
                  >
                    <Icon src={copyIcon} variant="large" />
                  </Box>
                </Box>
              </Card>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', paddingTop: 5 }}>
                <Link href={process.env.NEXT_PUBLIC_ETHERSCAN_TX + txHash} target="_blank">
                  <Button variant="outline" size="large" sx={{ marginBottom: 4, width: '100%' }}>
                    See tx on explorer
                  </Button>
                </Link>
                <Button variant="primary" size="large">
                  Back to Bioverse
                </Button>
              </Box>
            </Box>
          </BasicCard>
        ) : submittingFile ? (
          <BasicCard
            title={dialogMessage}
            contained={false}
            loader={hasSpinner}
            subtitle={dialogSubtitle}
            icon={!hasSpinner && exclamationMarkIcon}
          ></BasicCard>
        ) : isLoading ? (
          <BasicCard loader title="Preparing stuff"></BasicCard>
        ) : (
          <>
            <BasicCard
              sx={{ flex: 1, marginBottom: 4 }}
              contained={false}
              title="You are about to contribute in this request:"
            >
              <Card variant="card.other" sx={{ width: '100%', marginTop: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                    <Box
                      sx={{
                        backgroundColor: 'darkTheme.400',
                        borderRadius: 32,
                        padding: 2,
                        height: 32,
                        minWidth: 32,
                        marginRight: 2,
                        flex: '0 0 auto',
                      }}
                    >
                      <Text>{request.requestID}</Text>
                    </Box>
                    <Text
                      variant="typography.titleMedium"
                      sx={{ textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {request.title}
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      borderBottomColor: 'other.border',
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                      width: '100%',
                      marginTop: 4,
                      marginBottom: 4,
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'nowrap', width: '100%' }}>
                    <InfoBox
                      title={'Total Reward'}
                      icon={biobitSymbol}
                      value={`${getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[0]} | ~ $${
                        getBBIT(request.angelTokenPay, request.laboratoryTokenPay)[1]
                      }`}
                      mr={7}
                    />
                    <InfoBox
                      title={'Contributions'}
                      icon={userIcon}
                      value={`${request.totalContributed}/${request.totalContributors}`}
                    />
                  </Box>
                </Box>
              </Card>
            </BasicCard>
            <BasicCard sx={{ flex: 1 }} contained={false} title="Upload the signal file">
              <>
                <Dropzone
                  files={files}
                  setFiles={(files: File[]) => setFiles(files)}
                  error={error}
                  setError={(error: Error | null) => setError(error)}
                  sx={{
                    marginTop: 5,
                  }}
                />
                <Button
                  variant="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  onClick={async () => {
                    if (files.length > 0) {
                      submitSignal(request, files[0])
                    }
                  }}
                >
                  Contribute
                </Button>
              </>
            </BasicCard>
          </>
        )}
      </Box>
    </BodyWrapper>
  )
}

export default ContributeForm
