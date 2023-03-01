import React, { useContext } from 'react'
import { Box, Container, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import { useIsBrowser } from '@ui/hooks/use-is-browser'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'
import ButtonConnectWallet from '@ui/components/molecules/button-connect-wallet'
import { TracesContext } from '@ui/contexts/Traces'

const HomeHero = () => {
  const isBrowser = useIsBrowser()
  const { isConnected } = useContext(TracesContext)
  const [isMobile, isTabletPortrait] = useMediaQuery(['(max-width: 30em)', '(max-width: calc(48em + 1px))'])

  return (
    <Box as="section" pt={[10, 20]} pb={[20, '136px']}>
      <Container maxWidth="7xl" display={['block', 'flex']} justifyContent="space-between" alignItems="center">
        <Box marginRight={8} flex={1} marginBottom={[8, 0]}>
          <Heading as="h1" color="gray.50" size="3xl" marginBottom={4}>
            Borrow NFTs from Fingerprints collection
          </Heading>
          <Text color="gray.100" fontSize="lg">
            Fingerprints members can wrap, hold, and use NFTs from{!isMobile && <br />} The Fingerprints Collection by staking their PRINTS.
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
