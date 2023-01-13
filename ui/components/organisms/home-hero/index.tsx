import React from 'react'
import { Box, Container, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import useWallet from '@web3/wallet/use-wallet'
import { useIsBrowser } from '@ui/hooks/use-is-browser'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'
import ButtonConnectWallet from '@ui/components/molecules/button-connect-wallet'

const HomeHero = () => {
  const isBrowser = useIsBrowser()
  const { isConnected } = useWallet()
  const [isMobile, isTabletPortrait] = useMediaQuery(['(max-width: 30em)', '(max-width: calc(48em + 1px))'])

  return (
    <Box as="section" pt={[10, 20]} pb={[20, '136px']}>
      <Container maxWidth="7xl" display={['block', 'flex']} justifyContent="space-between" alignItems="center">
        <Box marginRight={8} flex={1} marginBottom={[8, 0]}>
          <Heading as="h1" color="gray.50" size="3xl" marginBottom={4}>
            Hold and use NFTs {!isMobile && <br />}
            from the Fingerprints collection
          </Heading>
          <Text color="gray.100" fontSize="lg">
            FP members can hold and enjoy usage permissions from {!isMobile && <br />}
            {"FP's"} NFTs through a staking system
          </Text>
          {isBrowser && !isConnected && <ButtonConnectWallet width="unset" size="lg" mt={8} />}
        </Box>
        {!isMobile && !isTabletPortrait && (
          <Box maxW={['100%', '300px', '350px', '488px']}>
            <Image src={heroImage} alt="Hero image" width={488} height={400} />
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default HomeHero

// color="gray.900" colorScheme="primary" size="lg" mt={8} onClick={handleOpenModal}
