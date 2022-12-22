import React, { PropsWithChildren, useContext, useMemo, useState } from 'react'
import useSWR from 'swr'

// Dependencies
import { Box, Button, Flex, GridItem, Heading, Icon, Text, Tooltip } from '@chakra-ui/react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { useContractRead } from 'wagmi'

import { WNFT } from '.graphclient'
import { ModalContext, ModalElement } from '@ui/contexts/Modal'
import { fetcher } from '@ui/utils/fetcher'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { BigNumber } from 'ethers'
import { HandledToken } from 'pages/api/helpers/_web3'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers/lib/utils.js'
import { parseAmountToDisplay } from '@web3/helpers/handleAmount'

type WNFTProps = {
  item: Pick<WNFT, 'id' | 'ogTokenAddress' | 'ogTokenId' | 'tokenId' | 'currentOwner' | 'lastPrice' | 'firstStakePrice' | 'minHoldPeriod'>
}

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

function formatTime(timeInSeconds: number) {
  // If time is less than an hour, display in second
  if (timeInSeconds < 60) {
    return `${timeInSeconds} seconds`
  }

  // If time is less than an hour, display in minutes
  if (timeInSeconds < 3600) {
    const minutes = dayjs.duration(timeInSeconds, 'seconds').minutes()
    return `${minutes} minutes`
  }

  // If time is less than a day, display in hours
  if (timeInSeconds < 86400) {
    const hours = dayjs.duration(timeInSeconds, 'seconds').hours()
    return `${hours} hours`
  }

  // If time is more than a day, display in days
  const days = dayjs.duration(timeInSeconds, 'seconds').days()
  return `${days} days`
}

enum WNFTState {
  Idle,
  Loading,
  Holding,
  Minting,
  Outbidding,
}

const WNFT = ({ item }: PropsWithChildren<WNFTProps>) => {
  const [currentState, setCurrentState] = useState<WNFTState>(WNFTState.Loading)
  const { handleOpenModal } = useContext(ModalContext)
  const { data, error } = useSWR<HandledToken>(`/api/outbid/${item.id}`, fetcher)

  const price = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '',
    abi: TracesContract,
    functionName: 'getWNFTPrice',
    args: [BigNumber.from(item.id)],
    onSuccess(data) {
      if (data.eq(item.firstStakePrice)) {
        setCurrentState(WNFTState.Minting)
        return
      }

      setCurrentState(WNFTState.Outbidding)
    },
    onError(error) {
      const revertError = error as RevertError
      if (revertError.errorName === 'HoldPeriod') {
        setCurrentState(WNFTState.Holding)
      }
    },
  })

  const handleOpenMintNftModal = useMemo(
    () =>
      handleOpenModal(ModalElement.Mint, {
        id: item.id,
        name: data?.name,
        minAmount: Math.round(parseAmountToDisplay(price.data ?? item.firstStakePrice)),
        ogTokenAddress: item.ogTokenAddress,
        ogTokenId: item.ogTokenId,
      }),
    [handleOpenModal, item.id, item.firstStakePrice, item.ogTokenAddress, item.ogTokenId, data?.name, price.data]
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
          {currentState === WNFTState.Minting && (
            <>
              {!price.isLoading && (
                <Box marginBottom={4}>
                  <Text color="gray.200">Minimum stake</Text>
                  <Text color="gray.100" fontWeight={600}>
                    {Number(formatUnits(price?.data ?? '', 18))} PRINTS
                  </Text>
                </Box>
              )}
              <Box marginBottom={6}>
                <Text color="gray.200">Guaranteed holding period</Text>
                <Text color="gray.100" fontWeight={600}>
                  {formatTime(item.minHoldPeriod)}
                </Text>
              </Box>
              <Button color="gray.900" colorScheme="primary" width="full" marginTop="auto" onClick={handleOpenMintNftModal}>
                Mint WNFT
              </Button>
            </>
          )}
          {currentState === WNFTState.Holding && (
            <>
              <Box marginBottom={4}>
                <Text color="gray.200">Staked</Text>
                <Flex alignItems="baseline">
                  <Text color="gray.100" fontWeight={600} marginRight={2}>
                    {parseAmountToDisplay(price.data ?? '0')} PRINTS
                  </Text>
                </Flex>
              </Box>
              <Box marginBottom={4}>
                <Text color="gray.200">Holding during</Text>
                <Text color="gray.100" fontWeight={600}>
                  {dayjs.unix(data.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </Box>
              <Box marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Text color="gray.100" fontWeight={600}>
                  {shortAddress(item.currentOwner)}
                </Text>
              </Box>
              <Button disabled={true} borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" width="full" marginTop="auto">
                {dayjs.unix(data.lastOutbidTimestamp).add(item.minHoldPeriod, 'seconds').fromNow(true)} to outbid
              </Button>
            </>
          )}
          {currentState === WNFTState.Outbidding && (
            <>
              <Box marginBottom={4}>
                <Text color="gray.200">Value to outbid</Text>
                <Flex alignItems="baseline">
                  {!price.isLoading && !price.error && (
                    <Text color="gray.100" fontWeight={600} marginRight={2}>
                      {Math.round(parseAmountToDisplay(price?.data ?? '0'))} PRINTS
                    </Text>
                  )}
                  <Tooltip
                    label={`The value decreases constantly until reachs ${parseAmountToDisplay(item.firstStakePrice)} at ${dayjs
                      .unix(data.lastOutbidTimestamp)
                      .add(data.dutchAuctionDuration, 'seconds')
                      .add(data.minHoldPeriod, 'seconds')
                      .format('L LT')}`}
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
                  {dayjs.unix(data.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </Box>
              <Box marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Text color="gray.100" fontWeight={600}>
                  {shortAddress(item.currentOwner)}
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
