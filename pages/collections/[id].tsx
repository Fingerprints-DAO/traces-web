import React, { useMemo } from 'react'

// Dependencies
import { Container, Grid } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import useSWR from 'swr'
import { BigNumber } from 'ethers'
import { useContractRead } from 'wagmi'

// Components
import PageHeader from '@ui/components/organisms/page-header'
import { getBuiltGraphSDK } from '../../.graphclient'
import { GetServerSidePropsContext } from 'next/types'
import { CollectionMetadata } from 'pages/api/helpers/_types'
import WNFT from '@ui/components/molecules/wnft'
import { fetcher } from '@ui/utils/fetcher'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { getChainId } from '@web3/helpers/chain'

type ServerSideProps = {
  id: string
}
const sdk = getBuiltGraphSDK()

const Collection = ({ id }: ServerSideProps) => {
  const { data } = useQuery({ queryKey: 'GetCollection', queryFn: () => sdk.GetCollection({ ogTokenAddress: id }) })
  const { data: collectionData } = useSWR<CollectionMetadata>(`/api/collection/${id}`, fetcher)
  const tokens = useMemo(() => data?.collections[0]?.tokens ?? [], [data?.collections])

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <PageHeader
        containerProps={{ marginBottom: 16, maxW: 800 }}
        title={collectionData?.name || 'No name'}
        description={collectionData?.description || 'No description'}
        withBackButton={true}
      />
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={8} rowGap={12}>
        {tokens.map((item) => (
          <WNFT key={item.id} item={item} />
        ))}
      </Grid>
    </Container>
  )
}

export default Collection

// receive id from url using typescript
export async function getServerSideProps(context: GetServerSidePropsContext<ServerSideProps>) {
  const { id } = context.params ?? {}

  return {
    props: {
      id,
    },
  }
}
function readContract(arg0: { address: string; abi: any; functionName: string; chainId: any; args: any[] }): any {
  throw new Error('Function not implemented.')
}
