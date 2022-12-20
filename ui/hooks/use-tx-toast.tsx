import { UseToastOptions, useToast } from '@chakra-ui/react'
import { TxMessage } from '@ui/components/atoms/tx-message'
import { ethers } from 'ethers'

const logger = new ethers.utils.Logger('useTxToast')

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

  const showTxExecutedToast = ({
    title = 'Transaction executed',
    txHash,
    ...toastOptions
  }: UseToastOptions & { title?: string; txHash?: string }) => {
    if (toastOptions.id && toast.isActive(toastOptions.id)) {
      return
    }
    toast({
      ...toastOptions,
      title,
      description: <TxMessage hash={txHash} />,
      status: 'success',
      isClosable: true,
      duration: 9000,
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
    showTxExecutedToast,
  }
}

export default useTxToast
