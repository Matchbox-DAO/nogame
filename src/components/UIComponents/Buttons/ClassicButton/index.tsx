import { ButtonProps } from 'rebass'
import styled from 'styled-components'

const StyledButton = styled.button<{ error?: boolean }>`
  width: 100%;
  box-shadow: none;
  padding: 5px 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ error }) => (error ? 'rgb(255, 7, 58)' : '#7cc6f2')};
  background-color: #7cc6f2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease 0s;
  color: white;
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
  &:hover {
    background-color: #d7f3ff;
    box-shadow: 0px 0px 10px 3px white;
    border-color: ${({ error }) => (error ? 'rgb(255, 7, 58)' : '#d7f3ff')};
  }
`

interface Props {
  isError?: boolean
  children?: string
  onClick?: () => void
}

const ClassicButton = ({ isError, onClick, children, ...rest }: Props & ButtonProps) => {
  return (
    <StyledButton error={isError} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  )
}
export default ClassicButton
