import React, { PropsWithChildren, useContext, useMemo, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  SkeletonText,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { BsArrowDownRightCircle, BsInfoCircle } from 'react-icons/bs'
import { Address, useContractWrite, useEnsName, usePrepareContractWrite } from 'wagmi'
import { BigNumber } from 'ethers'
import dayjs from 'dayjs'
import Image from 'next/image'
import { WNFT } from '.graphclient'
import { ModalContext, ModalElement } from '@ui/contexts/Modal'
import TracesContract from '@web3/contracts/traces/traces-abi'
import useTxToast from '@ui/hooks/use-tx-toast'
import ButtonConnectWallet from '../button-connect-wallet'
import useWallet from '@web3/wallet/use-wallet'
import useTracesRead from '@web3/contracts/traces/use-traces-read'
import { WNFTState } from 'pages/api/helpers/_types'
import CopyButton from '@ui/components/atoms/copy-button'
import useTracesGetOutbid from '@web3/contracts/traces/use-traces-get-outbid'

export type Modify<T, R> = Omit<T, keyof R> & R

type WNFTProps = {
  item: Pick<WNFT, 'id' | 'ogTokenAddress' | 'ogTokenId' | 'tokenId' | 'currentOwner' | 'lastPrice' | 'firstStakePrice' | 'minHoldPeriod'>
  withCurrentHolderAddress?: boolean
}

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

function handleMultiplesAnd(text: string) {
  const array = text.split('and').map((item) => item.trim())
  if (array.length === 1) return array[0]
  if (array.length === 2) return `${array[0]} and ${array[1]}`
  return `${array.slice(0, -1).join(', ')}, and ${array.slice(-1)}`
}

function formatTime(timeInSeconds: number) {
  let time = ''
  // If time is less than an hour, display in second
  if (timeInSeconds < 60) {
    return `${timeInSeconds} second${timeInSeconds > 1 ? 's' : ''}`
  }

  // If time is less than an hour, display in minutes
  if (timeInSeconds < 3600) {
    const minutes = dayjs.duration(timeInSeconds, 'seconds').minutes()
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }

  // If time is less than a day, display in hours
  if (timeInSeconds < 86400) {
    const hours = dayjs.duration(timeInSeconds, 'seconds').hours()
    time = `${hours} hour${hours > 1 ? 's' : ''}`
    if (timeInSeconds % 3600) {
      time += ` and ${formatTime(timeInSeconds % 3600)}`
    }
    return handleMultiplesAnd(time)
  }

  // If time is more than a day, display in days
  const days = dayjs.duration(timeInSeconds, 'seconds').days()
  time = `${days} day${days > 1 ? 's' : ''}`
  if (timeInSeconds % 86400) {
    time += ` and ${formatTime(timeInSeconds % 86400)}`
  }
  return handleMultiplesAnd(time)
}

const WNFT = ({ item }: PropsWithChildren<WNFTProps>) => {
  const { showTxSentToast, showTxErrorToast } = useTxToast()
  const { handleOpenModal } = useContext(ModalContext)
  const { address } = useWallet()
  const { isEditor } = useTracesRead()
  const [currentState, setCurrentState] = useState<WNFTState>(WNFTState.loading)
  const { data: wnftMeta, error } = useTracesGetOutbid(item.id)
  const [deleteParam, setDeleteParam] = useState<[BigNumber] | undefined>(undefined)
  const [unstakeParam, setUnstakeParam] = useState<[BigNumber] | undefined>(undefined)
  const [imageHasError, setImageHasError] = useState(false)

  const { data: ensName } = useEnsName({ address: item.currentOwner, enabled: Boolean(item.currentOwner) })

  const imageAttributes = useMemo(() => {
    if (imageHasError) {
      return {
        width: '100%',
        backgroundImage: wnftMeta?.image,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }
    }
    return {}
  }, [imageHasError, wnftMeta?.image])

  const isOwner = useMemo(() => {
    return item.currentOwner?.toLowerCase() === address?.toLowerCase()
  }, [item.currentOwner, address])

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address,
    abi: TracesContract,
    functionName: 'deleteToken',
    args: deleteParam,
    enabled: !!deleteParam,
    onError(error) {
      showTxErrorToast(error)
    },
  })

  const { write: deleteWNFT, isIdle: deleteWNFTIsIdle } = useContractWrite({
    ...config,
    onSettled: (data, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxSentToast(data?.hash)

      // TODO: Add a listener to wait for the transaction to be mined and display toast
    },
    onError: showTxErrorToast,
  })

  useEffect(() => {
    if (deleteWNFTIsIdle && deleteParam && deleteWNFT) {
      deleteWNFT()
    }
  }, [deleteParam, deleteWNFT, deleteWNFTIsIdle])

  const handleDelete = (onClose: Function) => () => {
    setDeleteParam([BigNumber.from(item.id)])
    onClose()
  }

  const { config: unstakeConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address,
    abi: TracesContract,
    functionName: 'unstake',
    args: unstakeParam,
    enabled: !!unstakeParam,
    onError(error) {
      showTxErrorToast(error)
      setUnstakeParam(undefined)
    },
  })

  const { write: unstakeWNFT, isIdle: unstakeWNFTIsIdle } = useContractWrite({
    ...unstakeConfig,
    onSettled: (data, error) => {
      if (error) {
        showTxErrorToast(error)
        setUnstakeParam(undefined)
        return
      }

      showTxSentToast(data?.hash)
      setUnstakeParam(undefined)

      // TODO: Add a listener to wait for the transaction to be mined and display toast
    },
    onError: showTxErrorToast,
  })

  useEffect(() => {
    if (!wnftMeta) return
    setCurrentState(wnftMeta.state)
  }, [currentState, wnftMeta])

  useEffect(() => {
    if (unstakeWNFTIsIdle && unstakeParam && unstakeWNFT) {
      unstakeWNFT()
    }
  }, [unstakeWNFTIsIdle, unstakeParam, unstakeWNFT])

  const handleUnstake = (onClose: Function) => () => {
    setUnstakeParam([BigNumber.from(item.id)])
    onClose()
  }

  const handleOpenMintNftModal = useMemo(
    () =>
      handleOpenModal(ModalElement.Mint, {
        id: item.id,
        name: wnftMeta?.name,
        minAmount: Math.round(wnftMeta?.price ?? 0),
        ogTokenAddress: item.ogTokenAddress,
        ogTokenId: item.ogTokenId,
      }),
    [handleOpenModal, item.id, item.ogTokenAddress, item.ogTokenId, wnftMeta?.name, wnftMeta?.price]
  )

  const ownerAddress = useMemo(() => {
    // if item.currentOwner matches address, return 'You'
    if (address?.toLowerCase() === item.currentOwner.toLowerCase()) {
      return 'You'
    }

    if (!!ensName) {
      return ensName
    }

    return shortAddress(item.currentOwner)
  }, [address, item.currentOwner, ensName])

  const showWNFTNav = useMemo(() => {
    if (!wnftMeta) return false
    if (isEditor) return true
    if (isOwner && currentState === WNFTState.outbidding && wnftMeta.price === wnftMeta.stakedAmount) return true
  }, [currentState, isEditor, isOwner, wnftMeta])

  if (error && !wnftMeta) {
    return null
  }

  return (
    <GridItem w="100%" key={item.id}>
      <Box display="flex" flexDirection="column" height="full" width={'100%'} color="gray.100">
        <a href={wnftMeta?.openseaUrl} target={'_blank'} rel="noreferrer">
          <Skeleton
            isLoaded={!!wnftMeta?.image}
            width="100%"
            height={'400px'}
            marginBottom={4}
            background="gray.500"
            borderRadius={8}
            overflow={'hidden'}
            position={'relative'}
            {...imageAttributes}
          >
            {!imageHasError && wnftMeta?.image && (
              <Image
                src={wnftMeta?.image}
                onError={() => setImageHasError(true)}
                alt={`Image of ${wnftMeta?.name}`}
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            )}
          </Skeleton>
        </a>
        <Heading as="h6" size="md" marginBottom={2} display={'flex'} justifyContent={'space-between'}>
          <SkeletonText isLoaded={currentState !== WNFTState.loading} noOfLines={1} skeletonHeight="100%" w={'full'}>
            {wnftMeta?.name ?? 'No name'}
            {wnftMeta! && (
              <Tooltip
                label={
                  <Box px={2} py={2}>
                    <Text>
                      Dutch Auction duration: <b>{formatTime(wnftMeta.dutchAuctionDuration)}</b>
                    </Text>
                    <Text>
                      Dutch Auction multiplier: <b>{wnftMeta.dutchMultiplier}x</b>
                    </Text>
                    <Text>
                      Guaranteed hold period: <b>{formatTime(wnftMeta.minHoldPeriod)}</b>
                    </Text>
                    <Text>
                      Stake lock duration: <b>{formatTime(wnftMeta.minHoldPeriod + wnftMeta.dutchAuctionDuration)}</b>
                    </Text>
                  </Box>
                }
                fontSize="md"
                color="gray.50"
                textAlign="left"
                placement="bottom"
                hasArrow={true}
                arrowSize={8}
              >
                <span>
                  <Icon as={BsInfoCircle} color="gray.300" boxSize={3} ml={2} />
                </span>
              </Tooltip>
            )}
          </SkeletonText>
          {showWNFTNav && (
            <Popover placement={'bottom-end'} colorScheme="primary">
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Box as={'button'} display={'flex'} flexDir={'column'} h={'100%'} justifyContent={'space-evenly'} pr={2}>
                      <Box as="span" w={1} h={1} bgColor={'white'} borderRadius={100} />
                      <Box as="span" w={1} h={1} bgColor={'white'} borderRadius={100} />
                      <Box as="span" w={1} h={1} bgColor={'white'} borderRadius={100} />
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent bgColor={'gray.700'} w={'auto'} borderColor={'transparent'}>
                    <PopoverBody>
                      <Box display={'flex'} flexDir={'column'} alignItems={'start'}>
                        {currentState !== WNFTState.minting && (
                          <Link as={'button'} p={2} onClick={handleUnstake(onClose)} _hover={{ textDecor: 'none' }}>
                            {isEditor && !isOwner && 'Force '}Unstake
                          </Link>
                        )}
                        {isEditor && currentState === WNFTState.minting && (
                          <Link as={'button'} p={2} onClick={handleDelete(onClose)} _hover={{ textDecor: 'none' }}>
                            Delete
                          </Link>
                        )}
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>
          )}
        </Heading>
        <Box marginTop={6} flex={1} display="flex" flexDirection="column">
          {/* Loading state */}
          {currentState === WNFTState.loading && (
            <Box>
              <SkeletonText noOfLines={6} spacing="2" skeletonHeight="4" marginBottom={4} />
              <Skeleton width="full" height={'40px'} />
            </Box>
          )}
          {/* Minting state */}
          {currentState === WNFTState.minting && (
            <>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Minimum stake</Text>
                <Text color="gray.100" fontWeight={600}>
                  {wnftMeta?.price} PRINTS
                </Text>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={6}>
                <Text color="gray.200">Guaranteed holding period</Text>
                <Text color="gray.100" fontWeight={600}>
                  {formatTime(item.minHoldPeriod)}
                </Text>
              </SkeletonText>
              <Skeleton isLoaded={!!wnftMeta} width="full" marginTop="auto">
                <ButtonConnectWallet color="gray.900" colorScheme="primary" width="full" onClick={handleOpenMintNftModal}>
                  Mint WNFT
                </ButtonConnectWallet>
              </Skeleton>
            </>
          )}
          {/* Holding state */}
          {currentState === WNFTState.holding && (
            <>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Value staked</Text>
                <Flex alignItems="baseline">
                  <Text color="gray.100" fontWeight={600} marginRight={2}>
                    {wnftMeta?.stakedAmount} PRINTS
                  </Text>
                </Flex>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Duration</Text>
                <Text color="gray.100" fontWeight={600}>
                  {wnftMeta! && dayjs.unix(wnftMeta?.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={6} width="fit-content">
                <Text color="gray.200">Current holder</Text>
                <Flex alignItems="center">
                  <Text color="gray.100" fontWeight={600}>
                    {ownerAddress}
                  </Text>
                  <CopyButton textToCopy={item.currentOwner} />
                </Flex>
              </SkeletonText>
              <Skeleton isLoaded={!!wnftMeta} width="full" marginTop="auto">
                <Button disabled={true} borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" width="full">
                  {wnftMeta! && dayjs.unix(wnftMeta.lastOutbidTimestamp).add(item.minHoldPeriod, 'seconds').fromNow(true)} to outbid
                </Button>
              </Skeleton>
            </>
          )}
          {/* Outbidding/Dutch auction state */}
          {currentState === WNFTState.outbidding && (
            <>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Value to outbid</Text>
                <Flex alignItems="baseline">
                  <Text color="gray.100" fontWeight={600} marginRight={2}>
                    {Math.round(wnftMeta?.price ?? 0)} PRINTS
                  </Text>
                  {wnftMeta! && (
                    <Tooltip
                      label={`TThe value decreases constantly until it reaches ${wnftMeta.stakedAmount} PRINTS at ${dayjs
                        .unix(wnftMeta.lastOutbidTimestamp)
                        .add(wnftMeta.dutchAuctionDuration, 'seconds')
                        .add(wnftMeta.minHoldPeriod, 'seconds')
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
                  )}
                </Flex>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Duration</Text>
                <Text color="gray.100" fontWeight={600}>
                  {wnftMeta! && dayjs.unix(wnftMeta.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Flex alignItems="center">
                  <Text color="gray.100" fontWeight={600}>
                    {ownerAddress}
                  </Text>
                  <CopyButton textToCopy={item.currentOwner} />
                </Flex>
              </SkeletonText>
              <Skeleton isLoaded={!!wnftMeta} width="full" marginTop="auto">
                <ButtonConnectWallet color="gray.900" colorScheme="primary" width="full" onClick={handleOpenMintNftModal}>
                  Outbid WNFT
                </ButtonConnectWallet>
              </Skeleton>
            </>
          )}
        </Box>
      </Box>
    </GridItem>
  )
}

export default WNFT
