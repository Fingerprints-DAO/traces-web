import { UseToastOptions, useToast } from '@chakra-ui/react'
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
      const id = 'error-name'
      if (toast.isActive(id)) return
      toast({ title: `An error occured`, description: `Error reverted ${revertError.errorName}`, status: 'error', id })
      return
    }
    if (revertError.code === 'ACTION_REJECTED') {
      const id = 'user-rejected'
      if (toast.isActive(id)) return
      toast({ title: `An error occured`, description: `User rejected metamask tx`, status: 'error', id })
      return
    }

    const id = 'error'
    if (toast.isActive(id)) return
    toast({
      id,
      title: `An error occured`,
      description: `Error message: ${revertError.reason ?? revertError.cause ?? revertError.message}`,
      status: 'error',
    })
  }

  return {
    showTxSentToast,
    showTxErrorToast,
    showTxExecutedToast,
  }
}

export default useTxToast
