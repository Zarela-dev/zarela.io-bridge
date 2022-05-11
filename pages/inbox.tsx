import { Box } from 'rebass/styled-components'
import AppContainer from '../src/components/containers/AppContainer'
import Inbox from '../src/components/Inbox'
import Web3Modal from '../src/components/Web3Modal'
import { PendingFilesProvider } from '../src/store/pendingFilesProvider'

const InboxPage = () => {
  return (
    <Box>
      <Web3Modal />
      <Inbox />
    </Box>
  )
}

InboxPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppContainer>
      <PendingFilesProvider>{page}</PendingFilesProvider>
    </AppContainer>
  )
}
export default InboxPage
