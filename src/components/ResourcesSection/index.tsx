import { FC, useMemo } from 'react'
import { RowCentered } from '~/components/Row'
import { ResourcesTabList, ResourcesTabs, ResourceTab } from './styleds'
import { ResourcesIcon } from '~/components/Icons/Resources'
import { FacilitiesIcon } from '~/components/Icons/Facilities'
import { ResearchIcon } from '~/components/Icons/Research'
import { ShipyardIcon } from '~/components/Icons/Shipyard'
import { ResourceTabPanel } from './ResourceTabPanel'
import { FacilitiesTabPanel } from './FacilitiesTabPanel'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { differenceInMinutes, fromUnixTime } from 'date-fns'
import { dataToNumber } from '~/utils'
import { EmptyTabPanel } from '~/components/ResourcesSection/EmptyTabPanel'

export const ResourcesSection: FC = () => {
  const { account } = useStarknet()
  const { contract: gameContract } = useGameContract()

  const { data: resourcesAvailable } = useStarknetCall({
    contract: gameContract,
    method: 'resources_available',
    args: [account],
  })

  const { data: timeCompletion } = useStarknetCall({
    contract: gameContract,
    method: 'build_time_completion',
    args: [account],
  })

  const { data } = useStarknetCall({
    contract: gameContract,
    method: 'get_structures_upgrade_cost',
    args: [account],
  })

  const { data: structureLevels } = useStarknetCall({
    contract: gameContract,
    method: 'get_structures_levels',
    args: [account],
  })

  const endTimeCompletion = useMemo(() => {
    if (timeCompletion) {
      const end = fromUnixTime(dataToNumber(timeCompletion['time_end']))

      const timeDifferenceInMinutes = differenceInMinutes(end, new Date())

      return {
        resourceId: dataToNumber(timeCompletion['building_id']),
        timeEnd: timeDifferenceInMinutes > 0 ? timeDifferenceInMinutes : 0,
      }
    }
  }, [timeCompletion])

  const points = useMemo(() => {
    if (resourcesAvailable) {
      return {
        metal: dataToNumber(resourcesAvailable['metal']),
        crystal: dataToNumber(resourcesAvailable['crystal']),
        deuterium: dataToNumber(resourcesAvailable['deuterium']),
        energy: dataToNumber(resourcesAvailable['energy']),
      }
    }
  }, [resourcesAvailable])

  const resourceLevels = useMemo(() => {
    if (structureLevels) {
      return {
        metal: dataToNumber(structureLevels['metal_mine']),
        crystal: dataToNumber(structureLevels['crystal_mine']),
        deuterium: dataToNumber(structureLevels['deuterium_mine']),
        solarPlant: dataToNumber(structureLevels['solar_plant']),
        robotFactory: dataToNumber(structureLevels['robot_factory']),
      }
    }
  }, [structureLevels])

  const costUpgrade = useMemo(() => {
    if (data) {
      return {
        metal: {
          metal: dataToNumber(data['metal_mine'].metal),
          crystal: dataToNumber(data['metal_mine'].crystal),
          deuterium: dataToNumber(data['metal_mine'].deuterium),
        },
        crystal: {
          metal: dataToNumber(data['crystal_mine'].metal),
          crystal: dataToNumber(data['crystal_mine'].crystal),
          deuterium: dataToNumber(data['crystal_mine'].deuterium),
        },
        deuterium: {
          metal: dataToNumber(data['deuterium_mine'].metal),
          crystal: dataToNumber(data['deuterium_mine'].crystal),
          deuterium: dataToNumber(data['deuterium_mine'].deuterium),
        },
        solarPlant: {
          metal: dataToNumber(data['solar_plant'].metal),
          crystal: dataToNumber(data['solar_plant'].crystal),
          deuterium: dataToNumber(data['solar_plant'].deuterium),
        },
        robotFactory: {
          metal: dataToNumber(data['robot_factory'].metal),
          crystal: dataToNumber(data['robot_factory'].crystal),
          deuterium: dataToNumber(data['robot_factory'].deuterium),
        },
      }
    }
  }, [data])

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

      <ResourceTabPanel
        endTimeCompletion={endTimeCompletion}
        points={points}
        resourceLevels={resourceLevels}
        costUpgrade={costUpgrade}
      />
      <FacilitiesTabPanel
        endTimeCompletion={endTimeCompletion}
        points={points}
        resourceLevels={resourceLevels}
        costUpgrade={costUpgrade}
      />
      <EmptyTabPanel />
      <EmptyTabPanel />
      <EmptyTabPanel />
    </ResourcesTabs>
  )
}
