import React from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import CollectionCard from '@ui/components/molecules/collection-card'

const CollectionsPage = () => {
  const router = useRouter()

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <Flex
        as="button"
        alignItems="center"
        marginBottom={8}
        onClick={router.back}
      >
        <Icon boxSize={6} as={ArrowBackIcon} color="gray.400" marginRight={2} />
        <Text
          color="gray.400"
          fontSize="sm"
          borderBottom="1px solid"
          borderBottomColor="gray.400"
        >
          go back
        </Text>
      </Flex>
      <Heading as="h1" size="3xl" marginBottom={12}>
        All collections
      </Heading>
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
        ]}
        gap={8}
        rowGap={12}
      >
        {Array.from(Array(11), (_, index) => (
          <GridItem w="100%" key={index}>
            <CollectionCard
              cardWidth={['100%']}
              image={{ height: '400px', marginBottom: 4 }}
            />
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}

export default CollectionsPage
