import Head from 'next/head'
import { Box } from 'rebass/styled-components'
import AppContainer from '../src/components/containers/AppContainer'
import ContributeForm from '../src/components/Contribute'
import Web3Modal from '../src/components/Web3Modal'

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
  return <AppContainer>{page}</AppContainer>
}
export default Contribute
