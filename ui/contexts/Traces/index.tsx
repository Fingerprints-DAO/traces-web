import TracesContract from '@web3/contracts/traces/traces-abi'
import useWallet from '@web3/wallet/use-wallet'
import React, { createContext, PropsWithChildren, useMemo } from 'react'
import { Address, useContractRead, useContractReads } from 'wagmi'

type TracesContextState = {
  isAdmin: boolean
  isConnected: boolean
  isEditor: boolean
  isAdminOrEditor: boolean
  adminRole?: Address
  editorRole?: Address
  vaultAddress?: Address
  address?: Address
}

const DEFAULT_CONTEXT = {
  isAdmin: false,
  isAdminOrEditor: false,
  isEditor: false,
  isConnected: false,
} as TracesContextState

const TracesContext = createContext(DEFAULT_CONTEXT)

const tracesConfig = {
  address: (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS || '') as Address,
  abi: TracesContract,
}

const TracesProvider = ({ children }: PropsWithChildren) => {
  const { address, isConnected } = useWallet()

  const { data: roles } = useContractReads({
    contracts: [
      { ...tracesConfig, functionName: 'EDITOR_ROLE' },
      { ...tracesConfig, functionName: 'DEFAULT_ADMIN_ROLE' },
    ],
    enabled: isConnected,
  })

  const [editorRole, adminRole] = roles || []

  const { data: isEditor = false } = useContractRead({
    ...tracesConfig,
    functionName: 'hasRole',
    enabled: !!editorRole && !!address,
    args: [editorRole!, address!],
  })

  const { data: isAdmin = false } = useContractRead({
    ...tracesConfig,
    functionName: 'hasRole',
    enabled: !!adminRole && !!address,
    args: [adminRole!, address!],
  })

  const { data: vaultAddress } = useContractRead({
    ...tracesConfig,
    functionName: 'vaultAddress',
    enabled: isAdmin,
  })

  const value: TracesContextState = useMemo(
    () => ({
      adminRole,
      editorRole,
      isAdmin,
      isEditor,
      isAdminOrEditor: isAdmin || isEditor,
      vaultAddress,
      address,
      isConnected,
    }),
    [adminRole, editorRole, isAdmin, isEditor, vaultAddress, address, isConnected]
  )

  return <TracesContext.Provider value={value}>{children}</TracesContext.Provider>
}

export { TracesContext, TracesProvider }
