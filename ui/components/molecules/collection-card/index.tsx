import React, { PropsWithChildren, useMemo } from 'react'
import useSWR from 'swr'

// Dependencies
import Link from 'next/link'
import { Box, Heading, Text } from '@chakra-ui/react'
import { CollectionMetadata, WNFTMetadata } from 'pages/api/helpers/_types'

type CollectionCardProps = {
  id: string
  isCollection?: boolean
  cardWidth?: Array<string | number>
  image?: Partial<{
    height: string
    marginBottom: number
  }>
}
export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

const CollectionCard = ({ id, isCollection, cardWidth = ['100%', 96], image, children }: PropsWithChildren<CollectionCardProps>) => {
  // fetch http api on route `api/collection/${id}` and return the collection data, do not use react-query here
  const { data, error } = useSWR<CollectionMetadata | WNFTMetadata>(isCollection ? `/api/collection/${id}` : `/api/wnft/${id}`, fetcher)

  if (error) {
    return <div>failed to load</div>
  }
  if (!data) {
    return <div>loading...</div>
  }

  const RenderLink = ({ children }: PropsWithChildren) => {
    if (isCollection) {
      return (
        <Link href={`collections/${id}`} prefetch>
          {children}
        </Link>
      )
    }
    return (
      <a href={data?.openseaUrl} target={'_blank'} rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Box display="flex" flexDirection="column" height="full" width={cardWidth} color="gray.100" cursor={'pointer'}>
      <RenderLink>
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
      </RenderLink>
      <Heading as="h6" size="md" marginBottom={2}>
        {data?.name}
      </Heading>
      {children || <Text fontSize="xs">{data?.description}</Text>}
    </Box>
  )
}

export default CollectionCard
