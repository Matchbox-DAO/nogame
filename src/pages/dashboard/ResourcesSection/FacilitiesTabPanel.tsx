import { StyledTabPanel } from './styleds'

export const FacilitiesTabPanel = ({ children, ...rest }: { children?: React.ReactNode }) => {
  return <StyledTabPanel {...rest}>Facilities</StyledTabPanel>
}

FacilitiesTabPanel.tabsRole = 'TabPanel'
