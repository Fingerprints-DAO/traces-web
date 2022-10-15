// Dependencies
import Image from 'next/image'
import type { NextPage } from 'next'
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box pt="80px" pb="136px">
      <Container
        maxWidth="7xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box marginRight={8} flex={1}>
          <Heading color="gray.50" size="3xl" marginBottom={4}>
            Hold and Use NFTs <br />
            from the Fingerprints collection
          </Heading>
          <Text color="gray.100" fontSize="lg" marginBottom={8}>
            FP members can hold and enjoy usage permissions from <br />
            {"FP's"} NFTs through a staking system
          </Text>
          <Button color="gray.900" colorScheme="primary" size="lg">
            Connect wallet
          </Button>
        </Box>
        <Box maxW="488px">
          <Box width="488px" height="400px" background="gray.500" />
        </Box>
      </Container>
    </Box>
  )
}

export default Home
