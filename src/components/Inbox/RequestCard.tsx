import { Box, Flex } from 'rebass/styled-components'
import { Card } from '../../Elements/Card'
import { Icon } from '../../Elements/Icon'
import { Text } from '../../Elements/Typography'
import biobitSymbol from '../../../public/images/icons/BBIT.svg'
import userIcon from '../../../public/images/icons/user.svg'
import chevronUp from '../../../public/images/icons/chevron-up.svg'
import chevronDown from '../../../public/images/icons/chevron-down.svg'
import ContributesTable from './ContributesTable'
import { Button } from '../../Elements/Button'
import { useStore } from '../../store'
import { useCallback, useEffect, useState } from 'react'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { copyToClipboard, hashClipper } from '../../utils'
import { toast, Zoom } from 'react-toastify'
import useBiobit from '../../hooks/useBiobit'

const InfoBox = ({ title, icon, value, ...props }) => {
  return (
    <Flex flexDirection={'column'} {...props}>
      <Text fontSize="labelSmall" color="content.700" mb={2}>
        {title}
      </Text>
      <Flex alignItems={'center'}>
        <Icon size="small" src={icon} mr={1}></Icon>
        <Text fontSize="labelMedium" color="content.900">
          {value}
        </Text>
      </Flex>
    </Flex>
  )
}

const RequestCard = ({ request, download, collapsedRequest, setCollapsedRequest }) => {
  const [isSendingTokens, setIsSendingTokens] = useState(false)
  const { activeConnector, zarelaContract, addPendingFiles, removePendingFiles } = useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const [selected, setSelected] = useState([])
  const getBBIT = useBiobit()

  const handleConfirm = useCallback(
    (requestID, originalIndexes) => {
      setIsSendingTokens(true)
      if (zarelaContract) {
        console.log('requestID', requestID, 'originalIndexes', originalIndexes, account)
        zarelaContract
          .confirmContributor(requestID, originalIndexes, {
            from: account,
            // gasLimit: new BigNumber(500000).plus(originalIndexes.length * 15000).toNumber(),
          })
          .then(({ hash: txHash }: { hash: string }) => {
            addPendingFiles({
              txHash,
              requestID,
              contributionIndexes: originalIndexes,
            })
            setSelected([])
            toast.success(`Transaction Submitted: ${txHash}`, {
              position: 'bottom-center',
              theme: 'dark',
              toastId: txHash,
              autoClose: 2000,
              transition: Zoom,
              onClick: () => {
                copyToClipboard(txHash)
              },
            })
            console.log(`TX Hash: ${hashClipper(txHash)}`)
          })
          .catch((error) => {
            console.log(error)
            toast.error(`Transaction Failed: ${error.message}`, {
              position: 'bottom-center',
              theme: 'dark',
              autoClose: 4000,
              transition: Zoom,
            })
          })
          .finally(() => {
            setIsSendingTokens(false)
          })
      }
    },
    [zarelaContract]
  )

  useEffect(() => {
    if (zarelaContract)
      zarelaContract.once('signalsApproved', (orderId, confirmCount, { transactionHash }) => {
        console.log('removing file,', transactionHash)
        toast.success(`Transaction Confirmed: ${transactionHash}`, {
          position: 'bottom-center',
          theme: 'dark',
          toastId: transactionHash,
          autoClose: 2000,
          transition: Zoom,
        })
        removePendingFiles(transactionHash)
        setShouldRefresh(true)
      })
  }, [zarelaContract])

  return (
    <Card variant="card.other" sx={{ width: '100%', marginBottom: 4 }}>
      <Flex width={'100%'} flexDirection="row" flexWrap={'wrap'}>
        <Flex flex="0 0 100%" flexWrap={'nowrap'}>
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
          <Text fontSize="bodyMedium" color="content.900">
            {request.title}
          </Text>
        </Flex>
        <Box
          sx={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'other.border',
            borderBottomStyle: 'solid',
            marginTop: 4,
            marginBottom: 4,
          }}
        ></Box>
        <Flex width={'100%'} flexWrap="nowrap">
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
          <Box flex={1} />
          {request.totalContributed > 0 && (
            <Button
              variant="outline"
              size={'medium'}
              sx={{ width: 40, padding: '0 !important' }}
              onClick={() => {
                if (collapsedRequest === request.requestID) {
                  setCollapsedRequest(null)
                } else {
                  setCollapsedRequest(request.requestID)
                }
              }}
            >
              <Box mt={1}>
                {collapsedRequest === request.requestID ? (
                  <Icon src={chevronUp} size="medium" />
                ) : (
                  <Icon src={chevronDown} size="medium" />
                )}
              </Box>
            </Button>
          )}
        </Flex>
        {collapsedRequest === request.requestID ? (
          <>
            <ContributesTable
              download={download}
              request={request}
              selected={selected}
              setSelected={setSelected}
              shouldRefresh={shouldRefresh}
              sendTokens={
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 4,
                  }}
                >
                  <Button
                    disabled={selected.length === 0 || isSendingTokens}
                    variant="primary"
                    size="large"
                    onClick={() => handleConfirm(request.requestID, selected)}
                  >
                    Send Tokens
                  </Button>
                </Box>
              }
            />
          </>
        ) : null}
      </Flex>
    </Card>
  )
}

export default RequestCard
