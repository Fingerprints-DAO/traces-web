import React from 'react'

// Dependencies
import { Container, Grid, GridItem } from '@chakra-ui/react'

// Components
import PageHeader from '@ui/components/organisms/page-header'
import CollectionCard from '@ui/components/molecules/collection-card'

const CollectionsPage = () => {
  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <PageHeader containerProps={{ marginBottom: 12 }} title="All collections" />
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={8} rowGap={12}>
        {Array.from(Array(11), (_, index) => (
          <GridItem w="100%" key={index}>
            <CollectionCard path="collections/1" cardWidth={['100%']} image={{ height: '400px', marginBottom: 4 }} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}

export default CollectionsPage
