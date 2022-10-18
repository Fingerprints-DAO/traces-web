import React from 'react'

// Dependencies
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

const HomeHero = () => {
  const [isMobile] = useMediaQuery('(max-width: 30em)')

  return (
    <Box as="section" pt={[10, 20]} pb={[10, '136px']}>
      <Container
        maxWidth="7xl"
        display={['block', 'flex']}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box marginRight={8} flex={1} marginBottom={[8, 0]}>
          <Heading as="h1" color="gray.50" size="3xl" marginBottom={4}>
            Hold and Use NFTs {!isMobile && <br />}
            from the Fingerprints collection
          </Heading>
          <Text color="gray.100" fontSize="lg" marginBottom={8}>
            FP members can hold and enjoy usage permissions from{' '}
            {!isMobile && <br />}
            {"FP's"} NFTs through a staking system
          </Text>
          <Button color="gray.900" colorScheme="primary" size="lg">
            Connect wallet
          </Button>
        </Box>
        <Box maxW={['100%', '300px', '350px', '488px']}>
          <Box
            width={['100%', '300px', '350px', '488px']}
            height={['200px', '300px', '350px', '400px']}
            background="gray.500"
          />
        </Box>
      </Container>
    </Box>
  )
}

export default HomeHero
