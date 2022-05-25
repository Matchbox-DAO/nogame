import { StyledTabPanel } from './styleds'

export const ResourceTabPanel = ({ children, ...rest }: { children?: React.ReactNode }) => {
  return <StyledTabPanel {...rest}>Resources</StyledTabPanel>
}

ResourceTabPanel.tabsRole = 'TabPanel'
