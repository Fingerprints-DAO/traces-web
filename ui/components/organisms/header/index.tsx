import React from 'react'

// Dependencies
import { HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Container, Text } from '@chakra-ui/react'

// Components
import Logo from '@ui/components/atoms/logo'

// Helpers
import { shortenAddress } from '@ui/utils/string'
import useWalletConnection from '@ui/hooks/use-wallet-connect'

const Header = () => {
    const { WalletButton, walletIsConnected, printsBalance, userAddress } = useWalletConnection()

    //   console.log('provider', provider)

    return (
        <Box as="header" paddingY="3" background="gray.900" position="sticky" left={0} top={0} zIndex="sticky">
            <Container maxWidth="7xl" display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Button variant="unstyled" display="block" minWidth="unset" height="unset" padding="3px" marginRight={[2, 4]}>
                        <HamburgerIcon boxSize={18} display="block" />
                    </Button>
                    <Logo />
                </Box>
                <Box display="flex" alignItems="center">
                    {walletIsConnected && (
                        <Box display="flex" alignItems="center" marginRight={[3, 6]}>
                            <Box textAlign="right" marginRight={2}>
                                <Text as="strong" color="gray.200" display="block" fontSize={['xs', 'sm']} fontWeight={600} marginBottom="-2px">
                                    {printsBalance || 0} PRINTS
                                </Text>
                                <Text as="span" color="gray.400" fontSize={['xs', 'sm']} display="block">
                                    {shortenAddress(userAddress)}
                                </Text>
                            </Box>
                            <Avatar size={['sm', 'xm']} src="https://bit.ly/dan-abramov" />
                        </Box>
                    )}
                    <WalletButton />
                </Box>
            </Container>
        </Box>
    )
}

export default Header
