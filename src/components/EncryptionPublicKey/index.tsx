import React from 'react'
import { Button } from '../../Elements/Button'
import { getConnectorHooks } from '../../lib/web3/getConnectorHooks'
import { useStore } from '../../store'
import BodyWrapper from '../BodyWrapper'
import BasicCard from './Card'

const EncryptionPublicKey = () => {
  const [step, setStep] = React.useState<'request' | 'networkError' | 'retry' | 'success'>('request')
  const { activeConnector, setDialogOpen } = useStore()
  const { useProvider, useAccount } = getConnectorHooks(activeConnector)
  const provider = useProvider()
  const account = useAccount()

  const getEncryptionKey = async () => {
    if (provider?.provider.request && account) {
      let res
      try {
        res = await provider?.provider.request({
          method: 'eth_getEncryptionPublicKey',
          params: [account], // you must have access to the specified account
        })
        if (window.navigator) {
          navigator.clipboard.writeText(res)
          setStep('success')
        }
      } catch (error) {
        setStep('retry')
        console.error(error)
      }
    } else {
      setDialogOpen(true)
    }
  }

  const fetchStep = () => {
    if (step === 'request') {
      return (
        <BasicCard
          title="Creating your request"
          subtitle="We need your encryption key before we can create a new request."
          actions={
            <Button variant="primary" size="medium" sx={{ width: '100%' }} onClick={getEncryptionKey}>
              {!account ? 'Connect Wallet' : 'Get Encryption Key'}
            </Button>
          }
        />
      )
    } else if (step === 'networkError') {
      return (
        <BasicCard
          title="Creating your request"
          subtitle="We need your encryption key before we can create a new request."
          actions={
            <Button
              variant="primary"
              size="medium"
              sx={{ width: '100%' }}
              onClick={async () => {
                console.log('provider', provider)
                if (provider?.provider.request) {
                  let res
                  try {
                    res = await provider?.provider.request({
                      method: 'eth_getEncryptionPublicKey',
                      params: [account], // you must have access to the specified account
                    })
                    console.log('here res', res)
                  } catch (error) {
                    console.log('here', error)
                  }
                }
              }}
            >
              Connect Wallet
            </Button>
          }
        />
      )
    } else if (step === 'retry') {
      return (
        <BasicCard
          title="Creating your request"
          subtitle="We need your encryption key before we can create a new request."
          actions={
            <Button variant="primary" size="medium" sx={{ width: '100%' }} onClick={getEncryptionKey}>
              Retry
            </Button>
          }
        />
      )
    } else if (step === 'success') {
      return (
        <BasicCard
          title="All done!"
          subtitle="Please click below to continue into our Bioverse"
          actions={
            <Button
              variant="primary"
              size="medium"
              sx={{ width: '100%' }}
              onClick={() => window.alert('go back to Bioverse')}
            >
              Back to Bioverse
            </Button>
          }
        />
      )
    }
  }

  return <BodyWrapper>{fetchStep()}</BodyWrapper>
}

export default EncryptionPublicKey
