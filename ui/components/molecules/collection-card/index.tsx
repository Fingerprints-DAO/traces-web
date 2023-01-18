import React, { PropsWithChildren, useMemo, useState } from 'react'
import Image from 'next/image'

// Dependencies
import Link from 'next/link'
import { Box, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import useTracesGetCollectionMetadata from '@web3/contracts/traces/use-traces-get-collection-metadata'

type CollectionCardProps = {
  id: string
  cardWidth?: Array<string | number>
  image?: Partial<{
    height: string
    marginBottom: number
  }>
}

const CollectionCard = ({ id, cardWidth = ['100%', 96], image, children }: PropsWithChildren<CollectionCardProps>) => {
  const [imageHasError, setImageHasError] = useState(false)
  const { data, error } = useTracesGetCollectionMetadata(id)

  const imageAttributes = useMemo(() => {
    if (imageHasError) {
      return {
        width: '100%',
        backgroundImage: data?.image,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }
    }
    return {}
  }, [imageHasError, data?.image])

  if (error && !data) {
    return null
  }

  return (
    <Box display="flex" flexDirection="column" height="full" width={cardWidth} color="gray.100" cursor={'pointer'}>
      <Link href={`collections/${id}`}>
        <Skeleton
          isLoaded={!!data}
          width="100%"
          height={image?.height ?? '400px'}
          marginBottom={image?.marginBottom || 6}
          background="gray.500"
          borderRadius={8}
          overflow={'hidden'}
          position={'relative'}
          {...imageAttributes}
        >
          {!imageHasError && data?.image! && (
            <Image
              src={data?.image}
              alt={`Image of ${data?.name}`}
              onError={() => setImageHasError(true)}
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          )}
        </Skeleton>
      </Link>
      <Heading as="h6" size="md" marginBottom={2}>
        <SkeletonText noOfLines={1} skeletonHeight="100%" isLoaded={!!data?.name}>
          {data?.name}
        </SkeletonText>
      </Heading>
      {children || <Text fontSize="xs">{data?.description}</Text>}
    </Box>
  )
}

export default CollectionCard
