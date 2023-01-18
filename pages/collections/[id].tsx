import React, { useMemo } from 'react'
import { Container, Grid } from '@chakra-ui/react'
import PageHeader from '@ui/components/organisms/page-header'
import { GetServerSidePropsContext } from 'next/types'
import { CollectionMetadata } from 'pages/api/helpers/_types'
import WNFT from '@ui/components/molecules/wnft'
import { fetcher } from '@ui/utils/fetcher'
import { getBaseURL } from 'pages/api/helpers/_getLink'
import useTracesGetCollection from '@web3/contracts/traces/use-traces-get-collection'

type CollectionProps = {
  id: string
  collectionData: CollectionMetadata
}

const Collection = ({ id, collectionData }: CollectionProps) => {
  const { data, isLoading: isLoadingQuery, isFetching, isRefetching } = useTracesGetCollection(id)

  const tokens = useMemo(() => data?.collections[0]?.tokens ?? [], [data?.collections])
  const isLoading = (isFetching || isLoadingQuery) && !isRefetching

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <PageHeader
        containerProps={{ marginBottom: 16, maxW: 800 }}
        title={collectionData?.name || 'Unnamed'}
        description={collectionData?.description}
        withBackButton={true}
        isLoading={isLoading}
      />
      {!isLoading && tokens.length === 0 && <p>No tokens found</p>}
      {!isLoading && (
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={8} rowGap={12}>
          {tokens.map((item) => (
            <WNFT key={item.id} item={item} />
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Collection

type ServerSideProps = {
  id: string
}

// receive id from url using typescript
export async function getServerSideProps(context: GetServerSidePropsContext<ServerSideProps>) {
  const { id } = context.params ?? {}
  try {
    // call api/collection/[id] to get collection metadata
    const collectionData = await fetcher<CollectionMetadata>(`${getBaseURL()}/api/collection/${id}`)

    const meta = {
      title: collectionData?.name || 'Collection',
      description: 'Hold and use NFTs from the Fingerprints collection',
      navPage: 'collection',
    }

    return {
      props: {
        id,
        meta,
        collectionData,
      },
    }
  } catch (error) {
    console.error(error, 'error getting collection data')
    return {
      notFound: true,
    }
  }
}
