import { StyledTabPanel } from './styleds'
import styled from 'styled-components'

const EmptyBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #363636;
  max-width: 200px;
  height: 150px;
  border-radius: 5px;
`

const EmptyContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const FacilitiesTabPanel = ({ children, ...rest }: { children?: React.ReactNode }) => {
  return (
    <StyledTabPanel {...rest}>
      <EmptyContainer>
        <EmptyBox>Coming soon</EmptyBox>
      </EmptyContainer>
    </StyledTabPanel>
  )
}

FacilitiesTabPanel.tabsRole = 'TabPanel'
