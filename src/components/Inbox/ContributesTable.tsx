import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Box } from 'rebass/styled-components'
import { Button } from '../../Elements/Button'
import Checkbox from '../../Elements/Checkbox'
import { Text } from '../../Elements/Typography'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import { addressClipper, hashClipper, timeSince } from '../../utils'
import loaderImage from '../../../public/images/loading.gif'

const RowDivider = () => {
  return (
    <Box
      sx={{
        borderBottomWidth: 1,
        borderBottomColor: 'other.border',
        borderBottomStyle: 'solid',
        width: 'calc(100% - 16px)',
        marginLeft: 2,
      }}
    ></Box>
  )
}
const ContributesTable = ({ request, download, selected, setSelected, shouldRefresh, sendTokens }) => {
  const { requestID } = request
  const [isLoading, setIsLoading] = useState(true)
  const [unapprovedCount, setUnapprovedCount] = useState(0)
  const [formattedData, setFormattedData] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  const { activeConnector, zarelaContract: contract, pendingFiles } = useStore()
  const { useAccount } = getConnectorHooks(activeConnector)
  const account = useAccount()

  const getFileStatus = useCallback(
    (originalIndex, originalStatus) => {
      if (originalStatus === true) return 'approved'
      let status = 'available'
      for (let i = 0; i < Object.values(pendingFiles).length; i++) {
        const item = Object.values(pendingFiles)[i]
        if (item !== undefined) {
          if (item.requestID === requestID && item.contributionIndexes.includes(originalIndex)) {
            status = 'pending'
            break
          }
        }
      }
      return status
    },
    [pendingFiles]
  )

  const onChange = (type, originalIndex) => {
    if (type === 'check') setSelected((values) => [...values, originalIndex])
    if (type === 'uncheck') setSelected((values) => values.filter((item) => +item !== +originalIndex))
  }

  useEffect(() => {
    if (contract !== null) {
      contract
        .getOrderData(requestID)
        .then((orderInfo) => {
          contract
            .ownerSpecificData(requestID, { from: account })
            .then((files) => {
              let angels = orderInfo[0] // angels
              let timestamp = orderInfo[2].map((item) => item.toNumber())
              let status = orderInfo[4]
              // let whoGainedReward = orderInfo[3];
              // let zarelaDay = orderInfo[5];

              let formatted = {}
              let uniqueAngelAddresses = [...new Set(angels)]
              let pairs = []

              // count all the unapproved files
              setUnapprovedCount(status.filter((item) => Boolean(item) === false).length)

              angels.forEach((address, originalIndex) => {
                pairs.push({
                  file: files[0][originalIndex],
                  angel: angels[originalIndex],
                  AesEncryptedKey: files[1][originalIndex],
                  address: address,
                  timestamp: timestamp[originalIndex],
                  originalIndex: originalIndex,
                  status: status[originalIndex],
                })
              })

              uniqueAngelAddresses.forEach((angelAddress, uIndex) => {
                pairs.forEach((tempItem, tempIndex) => {
                  if (tempItem.address === angelAddress) {
                    if (Object(formatted).hasOwnProperty(angelAddress)) {
                      formatted[angelAddress].push({
                        ipfsHash: tempItem.file,
                        angel: tempItem.angel,
                        timestamp: tempItem.timestamp,
                        AesEncryptedKey: tempItem.AesEncryptedKey,
                        originalIndex: tempItem.originalIndex,
                        status: tempItem.status,
                      })
                    } else {
                      formatted[angelAddress] = [
                        {
                          ipfsHash: tempItem.file,
                          angel: tempItem.angel,
                          timestamp: tempItem.timestamp,
                          AesEncryptedKey: tempItem.AesEncryptedKey,
                          originalIndex: tempItem.originalIndex,
                          status: tempItem.status,
                        },
                      ]
                    }
                  }
                })
              })

              setFormattedData(formatted)
            })
            .catch((error) => {
              console.error(error.message)
            })
            .finally(() => {
              setIsLoading(false)
            })
        })
        .catch((error) => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, shouldRefresh])

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src={loaderImage} alt="loading" width={52} height={52} />
      </Box>
    )
  } else {
    if (Object.keys(formattedData).length > 0) {
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              borderRadius: 3,
              borderColor: 'other.border',
              borderStyle: 'solid',
              borderWidth: 1,
              marginTop: 6,
            }}
          >
            <Box as="header">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: 4 }}>
                <Box flex="0 0 30%">
                  <Text fontSize={'labelMedium'} color="content.700">
                    Address
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={'labelMedium'} color="content.700">
                    Uploaded files
                  </Text>
                </Box>
              </Box>
            </Box>
            <RowDivider />
            {Object.keys(formattedData).map((key, formattedIndex) => {
              return (
                <Box key={key + formattedIndex} as="section">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      padding: 4,
                      paddingRight: 0,
                    }}
                  >
                    <Box flex="0 0 30%">
                      <Text fontSize="labelMedium" color="content.900" title={key}>
                        {addressClipper(key)}
                      </Text>
                    </Box>
                    <Box
                      flex={1}
                      sx={{
                        maxHeight: 400,
                        overflow: 'auto',
                        paddingRight: 4,
                      }}
                    >
                      {formattedData[key].map((item, index) => {
                        return (
                          <Box
                            key={item.originalIndex + item.ipfsHash}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',
                              justifyContent: 'space-between',
                              '&:not(:last-of-type)': {
                                marginBottom: 5,
                              },
                            }}
                          >
                            {getFileStatus(item.originalIndex, item.status) === 'approved' ? (
                              <Checkbox
                                name={item.originalIndex + item.ipfsHash}
                                disabled
                                checked
                                onChange={(e) => {
                                  if (e.target.checked === true) {
                                    onChange('check', item.originalIndex)
                                  } else {
                                    onChange('uncheck', item.originalIndex)
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Text fontSize="labelMedium" color="content.900" title={item.ipfsHash}>
                                    {`File ${item.originalIndex} (${hashClipper(item.ipfsHash)})`}
                                  </Text>
                                  <Text fontSize="labelSmall" color="content.700" sx={{ marginTop: 1 }}>
                                    {timeSince(item.timestamp)}
                                  </Text>
                                </Box>
                              </Checkbox>
                            ) : getFileStatus(item.originalIndex, item.status) === 'pending' ? (
                              <Checkbox name={item.originalIndex + item.ipfsHash} pending>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Text fontSize="labelMedium" color="content.900" title={item.ipfsHash}>
                                    {`File ${item.originalIndex} (${hashClipper(item.ipfsHash)})`}
                                  </Text>
                                  <Text fontSize="labelSmall" color="content.700" sx={{ marginTop: 1 }}>
                                    {timeSince(item.timestamp)}
                                  </Text>
                                </Box>
                              </Checkbox>
                            ) : (
                              <Checkbox
                                name={item.originalIndex + item.ipfsHash}
                                checked={selected.includes(item.originalIndex)}
                                onChange={(e) => {
                                  if (e.target.checked === true) {
                                    onChange('check', item.originalIndex)
                                  } else {
                                    onChange('uncheck', item.originalIndex)
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Text fontSize="labelMedium" color="content.900" title={item.ipfsHash}>
                                    {`File ${item.originalIndex} (${hashClipper(item.ipfsHash)})`}
                                  </Text>
                                  <Text fontSize="labelSmall" color="content.700" sx={{ marginTop: 1 }}>
                                    {timeSince(item.timestamp)}
                                  </Text>
                                </Box>
                              </Checkbox>
                            )}
                            <Box>
                              <Button
                                variant="outline"
                                size="medium"
                                onClick={() => {
                                  download(item.ipfsHash, item.AesEncryptedKey)
                                }}
                              >
                                Download
                              </Button>
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                  {formattedIndex !== Object.keys(formattedData).length - 1 ? <RowDivider /> : null}
                </Box>
              )
            })}
          </Box>
          {sendTokens}
        </>
      )
    } else {
      return null
    }
  }
}

export default ContributesTable
