import styled from 'styled-components'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'
import { darken, lighten } from 'polished'

export const Base = styled(RebassButton)<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
  fontSize?: number
  letterSpacing?: string
}>`
  padding: ${({ padding }) => (padding ? padding : '12px 32px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  letter-spacing: ${({ letterSpacing }) => letterSpacing && letterSpacing};
  line-height: 130%;
  font-weight: 500;
  text-align: center;
  border-radius: 2px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  /* border: 1px solid transparent; */
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background: #6cbd6a;
  color: #151a1e;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;

  :hover,
  :focus,
  :active {
    background: ${darken(0.1, '#6cbd6a')};
  }

  &:disabled {
    background: #815042;
    color: #462f29;
  }
`
