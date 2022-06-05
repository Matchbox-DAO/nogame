import { StyledTabPanel } from './styleds'
import ResourceBox from '~/components/ResourceBox'

import MetalImg from '~/assets/resources/metal.jpg'
import CrystalImg from '~/assets/resources/crystal.jpg'
import DeuteriumImg from '~/assets/resources/deuterium.jpg'
import SolarPlantImg from '~/assets/resources/solar_plant.jpg'
import { CostUpgrade, ResourceLevels, Points, EndTimeCompletion } from '~/utils/types'
import { calculEnoughResources } from '~/utils'
import { useEffect, useState } from 'react'

interface Props {
  endTimeCompletion?: EndTimeCompletion
  playerResources?: Points
  resourceLevels?: ResourceLevels
  costUpgrade?: CostUpgrade
}

export const ResourceTabPanel = ({
  endTimeCompletion,
  playerResources,
  resourceLevels,
  costUpgrade,
  ...rest
}: Props) => {
  const [isUpgrading, setIsUpgrading] = useState(false)
  const getEndTime = (resourceId: number) => {
    if (endTimeCompletion?.resourceId === resourceId) {
      if (endTimeCompletion?.timeEnd > 0 && !isUpgrading) {
        setIsUpgrading(true)
      }
      return endTimeCompletion.timeEnd
    }
    return undefined
  }

  return (
    <StyledTabPanel {...rest}>
      <ResourceBox
        img={MetalImg}
        title="Metal Mine"
        functionCallName="metal"
        level={resourceLevels?.metal}
        time={getEndTime(1)}
        isUpgrading={isUpgrading}
        costUpdate={costUpgrade?.metal}
        hasEnoughResources={playerResources && costUpgrade && calculEnoughResources(costUpgrade.metal, playerResources)}
      />
      <ResourceBox
        img={CrystalImg}
        title="Crystal Mine"
        functionCallName="crystal"
        level={resourceLevels?.crystal}
        time={getEndTime(2)}
        costUpdate={costUpgrade?.crystal}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.crystal, playerResources)
        }
      />
      <ResourceBox
        img={DeuteriumImg}
        title="Deuterium Mine"
        functionCallName="deuterium"
        level={resourceLevels?.deuterium}
        time={getEndTime(3)}
        costUpdate={costUpgrade?.deuterium}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.deuterium, playerResources)
        }
      />
      <ResourceBox
        img={SolarPlantImg}
        title="Solar Plant"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.solarPlant, playerResources)
        }
      />
    </StyledTabPanel>
  )
}

ResourceTabPanel.tabsRole = 'TabPanel'
