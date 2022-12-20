import React, { PropsWithChildren, useMemo } from 'react'
import useSWR from 'swr'

// Dependencies
import Link from 'next/link'
import { Box, Heading, Text } from '@chakra-ui/react'
import { CollectionMetadata, WNFTMetadata } from 'pages/api/helpers/_types'
import { fetcher } from '@ui/utils/fetcher'

type CollectionCardProps = {
  id: String
  cardWidth?: Array<string | number>
  image?: Partial<{
    height: string
    marginBottom: number
  }>
}

const CollectionCard = ({ id, cardWidth = ['100%', 96], image, children }: PropsWithChildren<CollectionCardProps>) => {
  // fetch http api on route `api/collection/${id}` and return the collection data, do not use react-query here
  const { data, error } = useSWR<CollectionMetadata>(`/api/collection/${id}`, fetcher)

  if (error) {
    return <div>failed to load</div>
  }
  if (!data) {
    return <div>loading...</div>
  }

  return (
    <Box display="flex" flexDirection="column" height="full" width={cardWidth} color="gray.100" cursor={'pointer'}>
      <Link href={`collections/${id}`}>
        <Box
          width="100%"
          height={image?.height || '549px'}
          marginBottom={image?.marginBottom || 6}
          background="gray.500"
          backgroundImage={data?.image}
          backgroundSize="cover"
          backgroundRepeat={'no-repeat'}
          backgroundPosition={'center'}
          borderRadius={8}
        />
      </Link>
      <Heading as="h6" size="md" marginBottom={2}>
        {data?.name}
      </Heading>
      {children || <Text fontSize="xs">{data?.description}</Text>}
    </Box>
  )
}

export default CollectionCard
