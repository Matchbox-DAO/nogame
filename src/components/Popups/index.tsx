import React from 'react'
import styled from 'styled-components'
import useActivePopups from '../../hooks/useActivePopups'
import { AutoColumn } from '../Column'
import PopupItem from './PopupItem'

const FixedPopupColumn = styled(AutoColumn)<{ extraPadding?: boolean }>`
  position: fixed;
  top: ${({ extraPadding }) => (extraPadding ? '108px' : '88px')};
  right: 1rem;
  max-width: 355px !important;
  width: 100%;
  z-index: 3;
`

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups()

  return (
    <>
      <FixedPopupColumn gap="20px">
        {activePopups.map((item) => (
          <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
        ))}
      </FixedPopupColumn>
    </>
  )
}
