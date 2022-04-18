import { List } from 'immutable'
import { Status, TransactionStatus, Transaction as S2MTransaction } from 'starknet'

export interface TransactionSubmitted {
  status: TransactionStatus
  transactionHash: string
  address?: string
  summary: string
}

export interface TransactionReceived {
  status: Status
  transaction: S2MTransaction
  transactionHash: string
  lastUpdatedAt: number
  summary: string
}

export type Transaction = TransactionSubmitted | TransactionReceived

export interface PopupContent {
  transactionHash: string
  status: Status
  summary: string
}

export type PopupListItem = { key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }

export interface S2MTransactionManager {
  transactions: Transaction[]
  popupList: PopupListItem[]
  addTransaction: (transaction: TransactionSubmitted) => void
  removeTransaction: (transactionHash: string) => void
  refreshTransaction: (transactionHash: string) => void
  removePopup: (transactionHash: string) => void
}

export const TRANSACTION_MANAGER_INITIAL_STATE: S2MTransactionManager = {
  transactions: [],
  popupList: [],
  addTransaction: (_transaction) => undefined,
  removeTransaction: (_transactionHash) => undefined,
  refreshTransaction: (_transactionHash) => undefined,
  removePopup: (_transactionHash) => undefined,
}
