import styled from 'styled-components'
import React from 'react'

const Box = styled.div`
  margin: auto;
  width: 50vw;
  min-height: 50vh;
  max-width: 600px;
  background-color: #282b58;
  border: 5px solid #7cc6f2;
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-right: 18px solid transparent;
  border-left: 18px solid transparent;
  border-top: 30px solid #7cc6f2;
  position: relative;
  right: 18px;
`

const TitleBoxHeader = styled.div`
  display: flex;
`

const Rectangle = styled.div`
  width: 10vw;
  background-color: #7cc6f2;
`

const TitleComponent = styled.div`
  width: 10vw;
  position: absolute;
  text-align: center;
  font-size: 1.1rem;
`

interface Props {
  title?: string
  children: React.ReactNode
  className?: string
}

const OBox = ({ title, children, className }: Props) => {
  return (
    <Box className={className}>
      <TitleBoxHeader>
        <Rectangle />
        <Triangle />
        <TitleComponent>
          <div>{title}</div>
        </TitleComponent>
      </TitleBoxHeader>
      {children}
    </Box>
  )
}

export default OBox
