import { Box } from 'rebass/styled-components'
import Web3Modal from '../src/components/Web3Modal'
import Web3Layout from '../src/Layouts/Web3Layout'
import Header from '../src/components/Header'

const Home = () => {
  return (
    <Box>
			<Header />
      <Box>
        <Web3Modal />
      </Box>
    </Box>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Web3Layout>{page}</Web3Layout>
}

export default Home
