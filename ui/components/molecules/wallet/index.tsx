import React from 'react'

// Dependencies
import { Box, Text } from '@chakra-ui/react'

// Components
import Avatar from '@ui/components/atoms/avatar'

// Helpers
import { shortenAddress } from '@ui/utils/string'
import useConnectedWallet from '@ui/hooks/use-connected-wallet'

type WalletProps = {
    variant: 'header' | 'drawer'
}

const Wallet = ({ variant }: WalletProps) => {
    const { WalletButton, walletIsConnected, printsBalance, userAddress } = useConnectedWallet()

    const isDrawer = variant === 'drawer'

    return (
        <Box display="flex" alignItems={isDrawer ? 'flex-start' : 'center'} flexDirection={isDrawer ? 'column' : 'row'} width={isDrawer ? '100%' : 'auto'}>
            {walletIsConnected && (
                <Box display="flex" flexDirection={isDrawer ? 'row-reverse' : 'row'} alignItems="center" mr={isDrawer ? 0 : [3, 6]} mb={isDrawer ? 6 : 0}>
                    <Box textAlign={isDrawer ? 'left' : 'right'} mr={2}>
                        <Text as="strong" color="gray.200" display="block" fontSize={['xs', 'sm']} fontWeight={600} mb="-2px">
                            {printsBalance || 0} PRINTS
                        </Text>
                        <Text as="span" color="gray.400" fontSize={['xs', 'sm']} display="block">
                            {shortenAddress(userAddress)}
                        </Text>
                    </Box>
                    <Avatar variant={variant} />
                </Box>
            )}
            <WalletButton />
        </Box>
    )
}

export default Wallet
