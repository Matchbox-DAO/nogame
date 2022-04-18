import { useMemo } from 'react'
import { useS2MTransactionManager } from '~/providers/transaction'

export default function useActivePopups() {
  const { popupList } = useS2MTransactionManager()

  return useMemo(() => {
    return popupList.filter((popup) => popup.show)
  }, [popupList])
}
