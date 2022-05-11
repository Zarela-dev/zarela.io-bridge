import { useEffect, useState } from 'react'
import { Box } from 'rebass'
import { Button } from '../../Elements/Button'
import { Text } from '../../Elements/Typography'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import { convertToBiobit } from '../../utils'
import BodyWrapper from '../BodyWrapper'
import BasicCard from '../EncryptionPublicKey/Card'
import RequestCard from './RequestCard'

const Inbox = () => {
  const [requests, setRequests] = useState({})
  const [isLoading, setLoading] = useState<boolean>(true)
  const { activeConnector, zarelaContract: contract } = useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()

  useEffect(() => {
    if (contract !== null) {
      if (account) {
        contract
          .orderResult({ from: account })
          .then((result) => {
            const myRequests = result[0].map((item) => item.toNumber())
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

  return (
    <BodyWrapper>
      <Box width="100%">
        {isLoading ? (
          <BasicCard title="Loading" />
        ) : Object.keys(requests).length > 0 ? (
          Object.keys(requests).map((key) => {
            return <RequestCard request={requests[key]} key={key} />
          })
        ) : (
          <BasicCard
            key={key}
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
