import { Box } from '@chakra-ui/react'

type TxMessageProps = {
  hash?: string
}
export const TxMessage = ({ hash }: TxMessageProps) => {
  if (!hash) return <></>
  return (
    <Box as="a" href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/tx/${hash}`} target="_blank" textDecoration="underline">
      Click here to see transaction
    </Box>
  )
}
