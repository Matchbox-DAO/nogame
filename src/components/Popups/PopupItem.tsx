import React, { useCallback, useContext, useEffect } from 'react'
import { X } from 'react-feather'

import styled, { ThemeContext } from 'styled-components'

import { PopupContent } from '~/providers/transaction'

import { useS2MTransactionManager } from '~/providers/transaction'

import TransactionPopup from './TransactionPopup'

export const StyledClose = styled(X)`
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    cursor: pointer;
  }
`
export const PopupWrapper = styled.div`
  /* background: linear-gradient(200.98deg, #ef35ff 1.04%, #50d5ff 55.28%); */
  background-color: white;
  padding: 2px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Popup = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1em;
  background-color: white;
  position: relative;
  border-radius: 8px;
  padding: 20px;
  padding-right: 35px;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
`

export default function PopupItem({
  removeAfterMs,
  content,
  popKey,
}: {
  removeAfterMs: number | null
  content: PopupContent
  popKey: string
}) {
  const { removePopup } = useS2MTransactionManager()

  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    if (removeAfterMs === null) return undefined

    const timeout = setTimeout(() => {
      removeThisPopup()
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, removeThisPopup])

  const popupContent = (
    <TransactionPopup hash={content.transactionHash} status={content.status} summary={content.summary} />
  )

  return (
    <PopupWrapper>
      <Popup>
        <StyledClose color={'#222'} onClick={removeThisPopup} />
        {popupContent}
        {/* {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null} */}
      </Popup>
    </PopupWrapper>
  )
}
