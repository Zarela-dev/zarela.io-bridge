import { Box } from 'rebass/styled-components'
import AppContainer from '../src/components/containers/AppContainer'
import Inbox from '../src/components/Inbox'
import Web3Modal from '../src/components/Web3Modal'
import Head from 'next/head'
import GqlLayout from '../src/Layouts/GqlLayout'
import { ReactElement } from 'react'

const InboxPage = () => {
  return (
    <Box>
      <Head>
        <title>Inbox</title>
      </Head>
      <Web3Modal eagerConnect />
      <Inbox />
    </Box>
  )
}

InboxPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppContainer>
      <GqlLayout>{page}</GqlLayout>
    </AppContainer>
  )
}
export default InboxPage
