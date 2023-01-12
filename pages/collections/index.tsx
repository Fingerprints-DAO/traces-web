import React, { useState } from 'react'

// Dependencies
import { Container, Grid, GridItem } from '@chakra-ui/react'
import { getBuiltGraphSDK } from '../../.graphclient'
import { useQuery } from 'react-query'

// Components
import PageHeader from '@ui/components/organisms/page-header'
import CollectionCard from '@ui/components/molecules/collection-card'

const sdk = getBuiltGraphSDK()

const CollectionsPage = () => {
  const { data, isLoading } = useQuery({ queryKey: 'GetCollections', queryFn: () => sdk.GetCollections() })

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <p>{isLoading && 'Loading...'}</p>
      {/* <>
        {error && (
          <form>
            <label>Error</label>
            <br />
            <textarea value={JSON.stringify(error, null, 2)} readOnly rows={25} />
          </form>
        )}
        {!isLoading && (
          <form>
            <label>Data</label>
            <br />
            <code>{JSON.stringify(data, null, 2)}</code>
          </form>
        )}
      </> */}
      <PageHeader containerProps={{ marginBottom: 12 }} title="All collections" withBackButton={true} />
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={8} rowGap={12}>
        {data?.collections.map((collection) => (
          <GridItem w="100%" key={collection.id}>
            <CollectionCard id={collection.ogTokenAddress} cardWidth={['100%']} image={{ height: '400px', marginBottom: 4 }} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}

export async function getStaticProps() {
  const meta = {
    title: 'Collections',
    description: 'Hold and use NFTs from the Fingerprints collection',
    navPage: 'collection',
  }

  return { props: { meta } }
}

export default CollectionsPage
