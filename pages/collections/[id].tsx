import React, { useContext } from 'react'

// Dependencies
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { Box, Button, Container, Flex, Grid, GridItem, Icon, Text, Tooltip } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import useSWR from 'swr'

// Components
import PageHeader from '@ui/components/organisms/page-header'
import CollectionCard from '@ui/components/molecules/collection-card'
import { ModalContext } from '@ui/contexts/Modal'
import { getBuiltGraphSDK } from '../../.graphclient'
import { GetServerSidePropsContext } from 'next/types'
import { CollectionMetadata } from 'pages/api/helpers/_types'
import { Address } from 'wagmi'

const arr = [
  { id: 1, status: 'avaliable' },
  { id: 2, status: 'expiring' },
  { id: 3, status: 'unstake' },
]

type ServerSideProps = {
  id: string
}
const sdk = getBuiltGraphSDK()

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

const isContract = (address: Address) => address.toLowerCase() === (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '').toLowerCase()

const Collection = ({ id }: ServerSideProps) => {
  const { data } = useQuery({ queryKey: 'GetCollection', queryFn: () => sdk.GetCollection({ ogTokenAddress: id }) })
  const { data: collectionData } = useSWR<CollectionMetadata>(`/api/collection/${id}`, fetcher)
  const { handleOpenModal } = useContext(ModalContext)

  const handleOpenMintNftModal = () => handleOpenModal('mint')()

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <PageHeader
        containerProps={{ marginBottom: 16, maxW: 800 }}
        title={collectionData?.name || 'No name'}
        description={collectionData?.description || 'No description'}
        withBackButton={true}
      />
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={8} rowGap={12}>
        {data?.collections.map((collection) =>
          collection.tokens.map((item) => (
            <GridItem w="100%" key={item.id}>
              <CollectionCard cardWidth={['100%']} image={{ height: '400px', marginBottom: 4 }} id={item.id.toString()}>
                <Box marginTop={6} flex={1} display="flex" flexDirection="column">
                  {isContract(item.currentOwner) && (
                    <>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Minimum stake</Text>
                        <Text color="gray.100" fontWeight={600}>
                          {item.firstStakePrice} PRINTS
                        </Text>
                      </Box>
                      <Box marginBottom={6}>
                        <Text color="gray.200">Guaranteed holding period</Text>
                        <Text color="gray.100" fontWeight={600}>
                          {item.minHoldPeriod} days
                        </Text>
                      </Box>
                      <Button color="gray.900" colorScheme="primary" width="full" marginTop="auto" onClick={handleOpenMintNftModal}>
                        Mint WNFT
                      </Button>
                    </>
                  )}
                  {/* {item.status === 'expiring' && (
                  <>
                    <Box marginBottom={4}>
                      <Text color="gray.200">Staked</Text>
                      <Flex alignItems="baseline">
                        <Text color="gray.100" fontWeight={600} marginRight={2}>
                          1500 PRINTS
                        </Text>
                        <Tooltip
                          label="The value decrease every day until reachs $value at day $date"
                          fontSize="sm"
                          color="gray.50"
                          textAlign="center"
                          placement="top-start"
                          hasArrow={true}
                          arrowSize={8}
                        >
                          <span>
                            <Icon as={BsArrowDownRightCircle} color="gray.300" boxSize={3} />
                          </span>
                        </Tooltip>
                      </Flex>
                    </Box>
                    <Box marginBottom={4}>
                      <Text color="gray.200">Holding during</Text>
                      <Text color="gray.100" fontWeight={600}>
                        20 days
                      </Text>
                    </Box>
                    <Box marginBottom={6}>
                      <Text color="gray.200">Current holder</Text>
                      <Text color="gray.100" fontWeight={600}>
                        sandrini.eth
                      </Text>
                    </Box>
                    <Button
                      disabled={true}
                      borderColor="gray.200"
                      color="gray.200"
                      colorScheme="primary"
                      variant="outline"
                      width="full"
                      marginTop="auto"
                    >
                      72 hours to outbid
                    </Button>
                  </>
                )} */}
                  {!isContract(item.currentOwner) && (
                    <>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Value to outbid</Text>
                        <Flex alignItems="baseline">
                          <Text color="gray.100" fontWeight={600} marginRight={2}>
                            {item.lastPrice} PRINTS
                          </Text>
                          <Tooltip
                            label="The value decrease every day until reachs $value at day $date"
                            fontSize="sm"
                            color="gray.50"
                            textAlign="center"
                            placement="top-start"
                            hasArrow={true}
                            arrowSize={8}
                          >
                            <span>
                              <Icon as={BsArrowDownRightCircle} color="gray.300" boxSize={3} />
                            </span>
                          </Tooltip>
                        </Flex>
                      </Box>
                      <Box marginBottom={4}>
                        <Text color="gray.200">Holding during</Text>
                        <Text color="gray.100" fontWeight={600}>
                          10 days
                        </Text>
                      </Box>
                      <Box marginBottom={6}>
                        <Text color="gray.200">Current holder</Text>
                        <Text color="gray.100" fontWeight={600}>
                          {item.currentOwner}
                        </Text>
                      </Box>
                      <Button color="gray.900" colorScheme="primary" width="full" marginTop="auto">
                        Outbid WNFT
                      </Button>
                    </>
                  )}
                </Box>
              </CollectionCard>
            </GridItem>
          ))
        )}
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
