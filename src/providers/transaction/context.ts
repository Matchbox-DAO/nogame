import { createContext, useContext } from 'react'

import { S2MTransactionManager, TRANSACTION_MANAGER_INITIAL_STATE } from './model'

export const TransactionManagerContext = createContext<S2MTransactionManager>(TRANSACTION_MANAGER_INITIAL_STATE)

export function useS2MTransactionManager(): S2MTransactionManager {
  return useContext(TransactionManagerContext)
}
