import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  flex: 1;
  border-radius: 6px;
  font-size: 18px;
  /* width: 48%; */
  border: none;
  padding: 10px 15px;
  display: block;

  ::placeholder {
    color: #dae5ef;
    font-weight: 300;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`
const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const Input = React.memo(function InnerInput({
  placeholder,
  ...rest
}: Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  return (
    <StyledInput
      {...rest}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      placeholder={placeholder || '0'}
      // text-specific options
      type="text"
      pattern="[0-9]*[.,]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})

export default Input
