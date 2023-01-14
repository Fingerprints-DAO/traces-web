import TracesContract from '@web3/contracts/traces/traces-abi'
import useWallet from '@web3/wallet/use-wallet'
import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Address, useContractRead, useContractReads } from 'wagmi'

type TracesContextState = {
  isAdmin: boolean
  isConnected: boolean
  isEditor: boolean
  isAdminOrEditor: boolean
  adminRole?: Address
  editorRole?: Address
  vaultAddress?: Address
  printContractAddress: Address
  tracesContractAddress: Address
  address?: Address
  web3Network: string
  vercelUrl: string
  openseaUrl: string
  etherscanUrl: string
  discordUrl: string
}

const DEFAULT_CONTEXT = {
  isAdmin: false,
  isAdminOrEditor: false,
  isEditor: false,
  isConnected: false,
} as TracesContextState

const envHelpers = {
  printContractAddress: (process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || '') as Address,
  tracesContractAddress: (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS || '') as Address,
  web3Network: process.env.NEXT_PUBLIC_WEB3_NETWORK || '',
  vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL || '',
  openseaUrl: process.env.NEXT_PUBLIC_OPENSEA_URL || '',
  etherscanUrl: process.env.NEXT_PUBLIC_ETHERSCAN_URL || '',
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL || '',
}

const TracesContext = createContext(DEFAULT_CONTEXT)

const tracesConfig = {
  address: envHelpers.tracesContractAddress,
  abi: TracesContract,
}

const TracesProvider = ({ children }: PropsWithChildren) => {
  const [isEditor, setIsEditor] = useState<boolean>()
  const [isAdmin, setIsAdmin] = useState<boolean>()

  const { address, isConnected } = useWallet()

  const { data: roles } = useContractReads({
    contracts: [
      { ...tracesConfig, functionName: 'EDITOR_ROLE' },
      { ...tracesConfig, functionName: 'DEFAULT_ADMIN_ROLE' },
    ],
    enabled: isConnected,
  })

  const [editorRole, adminRole] = roles || []

  const { data: hasRoleEditor = false } = useContractRead({
    ...tracesConfig,
    functionName: 'hasRole',
    enabled: !!editorRole && !!address && typeof isEditor === 'undefined',
    args: [editorRole!, address!],
  })

  useEffect(() => {
    setIsEditor(hasRoleEditor)
  }, [hasRoleEditor])

  const { data: hasRoleAdmin = false } = useContractRead({
    ...tracesConfig,
    functionName: 'hasRole',
    enabled: !!adminRole && !!address && typeof isEditor === 'undefined',
    args: [adminRole!, address!],
  })

  useEffect(() => {
    setIsAdmin(hasRoleAdmin)
  }, [hasRoleAdmin])

  const { data: vaultAddress } = useContractRead({
    ...tracesConfig,
    functionName: 'vaultAddress',
    enabled: isAdmin,
  })

  const value: TracesContextState = useMemo(
    () => ({
      adminRole,
      editorRole,
      isAdmin: !!isAdmin,
      isEditor: !!isEditor,
      isAdminOrEditor: !!isAdmin || !!isEditor,
      vaultAddress,
      address,
      isConnected,
      ...envHelpers,
    }),
    [adminRole, editorRole, isAdmin, isEditor, vaultAddress, address, isConnected]
  )

  return <TracesContext.Provider value={value}>{children}</TracesContext.Provider>
}

export { TracesContext, TracesProvider }
