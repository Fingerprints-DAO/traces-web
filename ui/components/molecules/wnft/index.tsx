import React, { PropsWithChildren, useContext, useMemo } from 'react'
import useSWR from 'swr'

// Dependencies
import { Box, Button, Flex, GridItem, Heading, Icon, Text, Tooltip } from '@chakra-ui/react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { Address } from 'wagmi'

import { WNFT } from '.graphclient'
import { ModalContext, ModalElement } from '@ui/contexts/Modal'
import { WNFTMetadata } from 'pages/api/helpers/_types'
import { fetcher } from '@ui/utils/fetcher'

type WNFTProps = {
  item: Pick<WNFT, 'id' | 'ogTokenAddress' | 'ogTokenId' | 'tokenId' | 'currentOwner' | 'lastPrice' | 'firstStakePrice' | 'minHoldPeriod'>
}

const isContract = (address: Address) => address.toLowerCase() === (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '').toLowerCase()

const WNFT = ({ item }: PropsWithChildren<WNFTProps>) => {
  const { handleOpenModal } = useContext(ModalContext)
  // fetch http api on route `api/collection/${id}` and return the collection data, do not use react-query here
  const { data, error } = useSWR<WNFTMetadata>(`/api/wnft/${item.id}`, fetcher)

  const handleOpenMintNftModal = useMemo(
    () =>
      handleOpenModal(ModalElement.Mint, {
        id: item.id,
        name: data?.name,
        minAmount: item.firstStakePrice,
        ogTokenAddress: item.ogTokenAddress,
        ogTokenId: item.ogTokenId,
      }),
    [handleOpenModal, item.id, item.firstStakePrice, item.ogTokenAddress, item.ogTokenId, data?.name]
  )

  if (error) {
    return <div>failed to load</div>
  }
  if (!data) {
    return <div>loading...</div>
  }

  return (
    <GridItem w="100%" key={item.id}>
      <Box display="flex" flexDirection="column" height="full" width={'100%'} color="gray.100" cursor={'pointer'}>
        <a href={data?.openseaUrl} target={'_blank'} rel="noreferrer">
          <Box
            width="100%"
            height={'400px'}
            marginBottom={4}
            background="gray.500"
            backgroundImage={data?.image}
            backgroundSize="cover"
            backgroundRepeat={'no-repeat'}
            backgroundPosition={'center'}
            borderRadius={8}
          />
        </a>
        <Heading as="h6" size="md" marginBottom={2}>
          {data?.name}
        </Heading>
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
              <Button color="gray.900" colorScheme="primary" width="full" marginTop="auto" onClick={handleOpenMintNftModal}>
                Outbid WNFT
              </Button>
            </>
          )}
        </Box>
      </Box>
    </GridItem>
  )
}

export default WNFT
