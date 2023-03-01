import React, { PropsWithChildren } from 'react'

// Dependencies
import { Button, ButtonProps } from '@chakra-ui/react'

// Helpers
import { ConnectKitButton } from 'connectkit'
import { useDisconnect } from 'wagmi'

const ButtonConnectWallet = ({ children, ...buttonProps }: PropsWithChildren<ButtonProps>) => {
  const { disconnect } = useDisconnect()

  const handleConnectWallet = (isConnected: boolean, show?: () => void) => () => isConnected ? disconnect() : show?.()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (isConnected) {
          return <Button {...buttonProps}>{children}</Button>
        }

        return (
          <Button
            borderColor="gray.200"
            color={'gray.900'}
            colorScheme="primary"
            variant={'solid'}
            size={['xs', 'md']}
            w="100%"
            {...buttonProps}
            onClick={handleConnectWallet(isConnected, show)}
          >
            Connect wallet
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default ButtonConnectWallet
