import React, { useContext } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useBalance, useDisconnect } from 'wagmi'
import { Avatar, ConnectKitButton } from 'connectkit'
import { shortenAddress } from '@ui/utils/string'
import { TracesContext } from '@ui/contexts/Traces'
import useMediaQuery from '@ui/hooks/use-media-query'

type WalletProps = {
  variant: 'header' | 'drawer'
}

const Wallet = ({ variant }: WalletProps) => {
  const { disconnect } = useDisconnect()
  const { printContractAddress, address } = useContext(TracesContext)
  const isMobile = useMediaQuery('(max-width: 479px)')

  const { data: balance } = useBalance({
    address,
    enabled: Boolean(address) && Boolean(printContractAddress),
    token: printContractAddress,
  })

  const isDrawer = variant === 'drawer'

  const handleConnectWallet = (isConnected: boolean, show?: () => void) => () => isConnected ? disconnect() : show?.()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, ensName }) => {
        return (
          <Box
            display="flex"
            alignItems={isDrawer ? 'flex-start' : 'center'}
            flexDirection={isDrawer ? 'column' : 'row'}
            width={isDrawer ? '100%' : 'auto'}
          >
            {isConnected && (
              <Box
                display="flex"
                flexDirection={isDrawer ? 'row-reverse' : 'row'}
                alignItems="center"
                mr={isDrawer ? 0 : [3, 6]}
                mb={isDrawer ? 6 : 0}
              >
                <Box textAlign={isDrawer ? 'left' : 'right'} mx={2}>
                  <Text as="strong" color="gray.200" display="block" fontSize={['xs', 'sm']} fontWeight={600} mb="-2px">
                    {parseFloat(balance?.formatted || '0').toLocaleString()} PRINTS
                  </Text>
                  <Text as="span" color="gray.400" fontSize={['xs', 'sm']} display="block">
                    {ensName || shortenAddress(address, 5)}
                  </Text>
                </Box>
                <Avatar size={isMobile ? 30 : 40} name={ensName} address={address} />
              </Box>
            )}
            <Button
              borderColor="gray.200"
              color={isConnected ? 'gray.200' : 'gray.900'}
              colorScheme="primary"
              variant={isConnected ? 'outline' : 'solid'}
              size={['xs', 'md']}
              onClick={handleConnectWallet(isConnected, show)}
            >
              {!isConnected ? 'Connect' : 'Disconnect'} wallet
            </Button>
          </Box>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default Wallet
