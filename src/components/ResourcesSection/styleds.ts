import { Tab, Tabs, TabPanel, TabList } from 'react-tabs'
import styled from 'styled-components'

export const ResourcesTabs = styled(Tabs)`
  width: 100%;
`

export const ResourcesTabList = styled(TabList)`
  border: none;
  display: flex;
  padding: 0px 24px;
`

export const ResourceTab = styled(Tab)`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: white;
  border: none;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px 4px 0px 0px;

  &.react-tabs__tab--selected {
    background: #1e2327;
    border: none;
  }

  :focus-visible,
  :focus {
    outline: none;
    border: none;

    :after {
      background: transparent;
    }
  }
`

export const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  /* height: 100%; */
  background: #1e2327;
  display: flex;

  &.react-tabs__tab-panel--selected {
    /* height: 100%; */
  }
`
