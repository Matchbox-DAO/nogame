import { FC } from 'react'
import { RowCentered } from '~/components/Row'
import { ResourcesTabList, ResourcesTabs, ResourceTab } from './styleds'
import { ResourcesIcon } from '~/components/Icons/Resources'
import { FacilitiesIcon } from '~/components/Icons/Facilities'
import { ResearchIcon } from '~/components/Icons/Research'
import { ShipyardIcon } from '~/components/Icons/Shipyard'
import { ResourceTabPanel } from './ResourceTabPanel'
import { FacilitiesTabPanel } from './FacilitiesTabPanel'

export const ResourcesSection: FC = () => {
  return (
    <ResourcesTabs>
      <ResourcesTabList>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ResourcesIcon /> Resources
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <FacilitiesIcon /> Facilites
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ResearchIcon /> Researches
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ShipyardIcon /> Shipyard
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ResourcesIcon />
            Fleet Movement
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>

      <ResourceTabPanel />
      <FacilitiesTabPanel />
      <ResourceTabPanel />
      <ResourceTabPanel />
      <ResourceTabPanel />
    </ResourcesTabs>
  )
}
