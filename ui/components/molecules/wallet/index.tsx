import React, { useCallback } from 'react'

// Dependencies
import { useWeb3Modal } from '@web3modal/react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useAccount, useBalance, useDisconnect, useEnsName } from 'wagmi'

// Components
import Avatar from '@ui/components/atoms/avatar'

// Helpers
import { shortenAddress } from '@ui/utils/string'

type WalletProps = {
  variant: 'header' | 'drawer'
}

const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)

const Wallet = ({ variant }: WalletProps) => {
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  const { data: ensName } = useEnsName({ address, enabled: Boolean(address) })
  const { data: balance } = useBalance({ address, enabled: Boolean(address) && Boolean(printContractAddress), token: printContractAddress })

  const isDrawer = variant === 'drawer'

  const handleConnectWallet = useCallback(() => (isConnected ? disconnect() : open()), [isConnected, disconnect, open])

  return (
    <Box display="flex" alignItems={isDrawer ? 'flex-start' : 'center'} flexDirection={isDrawer ? 'column' : 'row'} width={isDrawer ? '100%' : 'auto'}>
      {isConnected && (
        <Box display="flex" flexDirection={isDrawer ? 'row-reverse' : 'row'} alignItems="center" mr={isDrawer ? 0 : [3, 6]} mb={isDrawer ? 6 : 0}>
          <Box textAlign={isDrawer ? 'left' : 'right'} mr={2}>
            <Text as="strong" color="gray.200" display="block" fontSize={['xs', 'sm']} fontWeight={600} mb="-2px">
              {parseFloat(balance?.formatted || '').toLocaleString()} PRINTS
            </Text>
            <Text as="span" color="gray.400" fontSize={['xs', 'sm']} display="block">
              {ensName || shortenAddress(address)}
            </Text>
          </Box>
          <Avatar variant={variant} />
        </Box>
      )}
      <Button borderColor="gray.200" color={isConnected ? 'gray.200' : 'gray.900'} colorScheme="primary" variant={isConnected ? 'outline' : 'solid'} size={['xs', 'md']} onClick={handleConnectWallet}>
        {!isConnected ? 'Connect' : 'Disconnect'} wallet
      </Button>
    </Box>
  )
}

export default Wallet
