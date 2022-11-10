import { useContext, useMemo } from 'react'
import { Button, useMediaQuery } from '@chakra-ui/react'
import Web3Context from '@ui/contexts/Web3Provider'

const useWalletConnection = () => {
  const [isMobile] = useMediaQuery('(max-width: 30em)')
  const web3 = useContext(Web3Context)

  const connectButtonLabel = useMemo(() => {
    const sufix = ' wallet'
    const prefix = web3.walletIsConnected ? 'Disconnect' : 'Connect'

    return isMobile ? prefix : `${prefix} ${sufix}`
  }, [web3.walletIsConnected, isMobile])

  const WalletButton = () => {
    return (
      <Button
        borderColor="gray.200"
        color={web3.walletIsConnected ? 'gray.200' : 'gray.900'}
        colorScheme="primary"
        variant={web3.walletIsConnected ? 'outline' : 'solid'}
        size={['xs', 'md']}
        onClick={web3.handleConnectWallet}
      >
        {connectButtonLabel}
      </Button>
    )
  }

  return {
    ...web3,
    WalletButton,
  }
}

export default useWalletConnection
