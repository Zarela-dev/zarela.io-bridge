import { Box } from 'rebass/styled-components'
import AppContainer from '../src/components/containers/AppContainer'
import Inbox from '../src/components/Inbox'
import Web3Modal from '../src/components/Web3Modal'
import { ApolloProvider } from '@apollo/client'
import { client } from '../src/aplloClient'
import Head from 'next/head'

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
      <ApolloProvider client={client}>{page}</ApolloProvider>
    </AppContainer>
  )
}
export default InboxPage
