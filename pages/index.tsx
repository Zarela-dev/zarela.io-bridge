import { Box } from 'rebass/styled-components'
import Web3Modal from '../src/components/Web3Modal'
import Web3Layout from '../src/Layouts/Web3Layout'

const Home = () => {
  return (
    <Box>
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
