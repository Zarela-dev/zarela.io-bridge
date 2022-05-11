import { Box, Flex } from 'rebass/styled-components'
import { Card } from '../../Elements/Card'
import { Icon } from '../../Elements/Icon'
import { Text } from '../../Elements/Typography'
import biobitSymbol from '../../../public/images/icons/BBIT.svg'
import ContributesTable from './ContributesTable'
import { Button } from '../../Elements/Button'
import { useStore } from '../../store'
import { useCallback, useContext, useEffect, useState } from 'react'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { pendingFilesContext } from '../../store/pendingFilesProvider'

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

const RequestCard = ({ request, download }) => {
  const [isSendingTokens, setIsSendingTokens] = useState(false)
  const { activeConnector, zarelaContract } = useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()
  const [cleanSelected, setCleanSelected] = useState(null)
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const PendingFiles = useContext(pendingFilesContext)
  const [selected, setSelected] = useState([])

  const { setPendingFile, removePendingFile } = PendingFiles

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
          .then(({ hash: txHash }) => {
            setPendingFile({
              txHash,
              requestID,
              originalIndexes,
            })
            setCleanSelected(requestID)
            // toast(`TX Hash: ${txHash}`, 'success', true, txHash, {
            //   toastId: txHash,
            // })
            console.log(`TX Hash: ${txHash}`)
          })
          .catch((error) => {
            console.log(error)
            // toast(error.message, 'error')
          })
          .finally(() => {
            setIsSendingTokens(false)
          })
      }
    },
    [zarelaContract]
  )

  useEffect(() => {
    if (zarelaContract && removePendingFile !== undefined)
      zarelaContract.on('signalsApproved', ({ transactionHash }) => {
        removePendingFile(transactionHash)
        setShouldRefresh(true)
      })
  }, [zarelaContract, removePendingFile])

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
        <Flex width={'100%'}>
          <InfoBox title={'Total Reward'} icon={biobitSymbol} value={20} mr={7} />
          <InfoBox title={'Total Reward'} icon={biobitSymbol} value={20} />
        </Flex>
        <ContributesTable download={download} request={request} selected={selected} setSelected={setSelected} />
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
      </Flex>
    </Card>
  )
}

export default RequestCard
