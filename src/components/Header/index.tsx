import Image from 'next/image'
import { Box } from 'rebass/styled-components'
import { Link } from '../../Elements/Link'
import AppContainer from '../containers/AppContainer'
<<<<<<< HEAD
import ConnectButton from './ConnectButton'
=======
>>>>>>> 1e307f4 (add header base)

const Header = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: ['56px', '72px', '72px'],
        zIndex: 6,
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'transparent',
      }}
    >
      <AppContainer>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: ['16px 0', '16px 0', '16px 0'],
          }}
        >
          <Box
            sx={{
              display: 'flex',
							justifyContent: 'space-between',
              alignItems: 'center',
              width: ['100%'],
            }}
          >
            <Box
              sx={{
                cursor: 'pointer',
                position: ['fixed', 'unset', 'unset'],
                left: ['50%', 'unset', 'unset'],
                transform: ['translateX(-50%)', 'unset', 'unset'],
              }}
            >
              <Link href="/">
                <Image src="/images/logo.svg" alt="logo" width="80" height="32" />
              </Link>
            </Box>
						<ConnectButton />
          </Box>
        </Box>
      </AppContainer>
    </Box>
  )
}

export default Header
