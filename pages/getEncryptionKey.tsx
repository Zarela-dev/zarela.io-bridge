import Head from 'next/head'
import { ReactElement } from 'react'
import { Box } from 'rebass/styled-components'
import AppContainer from '../src/components/containers/AppContainer'
import EncryptionPublicKey from '../src/components/EncryptionPublicKey'
import Web3Modal from '../src/components/Web3Modal'

const GetEncryptionKey = () => {
  return (
    <Box>
      <Head>
        <title>Get Encryption Key</title>
      </Head>
      <Web3Modal />
      <EncryptionPublicKey />
    </Box>
  )
}

GetEncryptionKey.getLayout = function getLayout(page: ReactElement) {
  return <AppContainer>{page}</AppContainer>
}
export default GetEncryptionKey
