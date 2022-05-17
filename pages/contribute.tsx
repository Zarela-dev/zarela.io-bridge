import Head from 'next/head'
import { ReactElement } from 'react'
import { Box } from 'rebass/styled-components'
import AppContainer from '../src/components/containers/AppContainer'
import ContributeForm from '../src/components/Contribute'
import Web3Modal from '../src/components/Web3Modal'
import GqlLayout from '../src/Layouts/GqlLayout'

const Contribute = () => {
  return (
    <Box width={520} margin="0 auto">
      <Head>
        <title>Contribute</title>
      </Head>
      <Web3Modal />
      <ContributeForm />
    </Box>
  )
}

Contribute.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppContainer>
      <GqlLayout>{page}</GqlLayout>
    </AppContainer>
  )
}
export default Contribute
