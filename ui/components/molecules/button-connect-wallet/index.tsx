import React, { PropsWithChildren, useCallback } from 'react'

// Dependencies
import { useWeb3Modal } from '@web3modal/react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useDisconnect } from 'wagmi'

// Helpers
import useWallet from '@web3/wallet/use-wallet'

const ButtonConnectWallet = ({ children, ...buttonProps }: PropsWithChildren<ButtonProps>) => {
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { isConnected } = useWallet()

  const handleConnectWallet = useCallback(() => (isConnected ? disconnect() : open()), [isConnected, disconnect, open])

  if (!isConnected) {
    return (
      <Button
        borderColor="gray.200"
        color={'gray.900'}
        colorScheme="primary"
        variant={'solid'}
        size={['xs', 'md']}
        w="100%"
        {...buttonProps}
        onClick={handleConnectWallet}
      >
        Connect wallet
      </Button>
    )
  }
  return <Button {...buttonProps}>{children}</Button>
}

export default ButtonConnectWallet
