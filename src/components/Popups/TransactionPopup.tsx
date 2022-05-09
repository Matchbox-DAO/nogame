import { Status } from 'starknet'
import React from 'react'
import styled from 'styled-components'
import { useStarknet } from '@starknet-react/core'
import { TYPE } from '../../theme'
// import { ExternalLink } from '../../theme/components'
// import { getVoyagerLink } from '../../utils'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
// import { ExternalLink as LinkIcon } from 'react-feather'

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
  align-items: flex-start;
`

const StatusHeader = styled.div<{ success: boolean; pending: boolean }>`
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: ${({ pending, success }) => (pending ? '#5287FF' : success ? 'green' : 'red')};
`
const TxSummary = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 120%;
  color: #222;
`

const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
`

export default function TransactionPopup({
  hash,
  status,
  summary,
}: {
  hash: string
  status?: Status
  summary?: string
}) {
  // const { chainId } = useActiveStarknetReact()

  const getStatusHeader = (status: Status) => {
    switch (status) {
      // case 'RECEIVED':
      //   return 'Submitted'
      case 'ACCEPTED_ON_L2':
        return 'Successful'
      case 'ACCEPTED_ON_L1':
        return 'Finalised'
      case 'REJECTED':
        return 'Failed'
      default:
        return 'Submitted'
    }
  }

  const pending = !status || status === 'PENDING' || status === 'RECEIVED'
  const success = !pending && status !== 'REJECTED'

  return (
    <RowNoFlex>
      <AutoColumn gap="8px" style={{ marginTop: '1px' }}>
        <AutoRow>
          <StatusHeader style={{ paddingRight: 16 }} success={success} pending={pending}>
            {status ? `Transaction ${getStatusHeader(status)}` : `Transaction Submitted`}
          </StatusHeader>
        </AutoRow>
        <AutoColumn gap="12px">
          <TxSummary>{summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}</TxSummary>
        </AutoColumn>
      </AutoColumn>
    </RowNoFlex>
  )
}
