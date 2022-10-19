import React from 'react'

// Dependencies
import Link from 'next/link'
import { Box, Heading, Text } from '@chakra-ui/react'

type CollectionCardProps = {
  cardWidth?: Array<string | number>
  image?: Partial<{
    height: string
    marginBottom: number
  }>
}

const CollectionCard = ({
  cardWidth = ['100%', 96],
  image,
}: CollectionCardProps) => {
  return (
    <Link href="collection/1" passHref={true}>
      <Box as="a" display="block" width={cardWidth} color="gray.100">
        <Box
          width="100%"
          height={image?.height || '549px'}
          marginBottom={image?.marginBottom || 6}
          background="gray.500"
          borderRadius={8}
        />
        <Heading as="h6" size="md" marginBottom={2}>
          Autoglyphs
        </Heading>
        <Text fontSize="xs">Larva labs</Text>
      </Box>
    </Link>
  )
}

export default CollectionCard
