import { useToast } from '@chakra-ui/react'
import { TxMessage } from '@ui/components/atoms/tx-message'

export const useTxToast = () => {
  const toast = useToast()

  const showTxSentToast = (txHash?: string) => {
    toast({
      title: 'Transaction sent',
      description: <TxMessage hash={txHash} />,
      status: 'success',
      isClosable: true,
    })
  }

  const showTxErrorToast = (error: Error) => {
    const revertError = error as RevertError
    if (revertError.errorName) {
      toast({ title: `An error occured`, description: `Error reverted ${revertError.errorName}`, status: 'error' })
      return
    }

    toast({ title: `An error occured`, description: `Error message: ${error.message}`, status: 'error' })
  }

  return {
    showTxSentToast,
    showTxErrorToast,
  }
}

export default useTxToast
