import { StyledTabPanel } from './styleds'
import ResourceBox from '~/components/ResourceBox'

import MetalImg from '~/assets/resources/metal.jpg'
import CrystalImg from '~/assets/resources/crystal.jpg'
import DeuteriumImg from '~/assets/resources/deuterium.jpg'
import SolarPlantImg from '~/assets/resources/solar_plant.jpg'
import { CostUpgrade, ResourceLevels, Points, EndTimeCompletion } from '~/utils/types'
import { calculEnoughResources } from '~/utils'

interface Props {
  endTimeCompletion?: EndTimeCompletion
  points?: Points
  resourceLevels?: ResourceLevels
  costUpgrade?: CostUpgrade
}

export const ResourceTabPanel = ({ endTimeCompletion, points, resourceLevels, costUpgrade, ...rest }: Props) => {
  const getEndTime = (resourceId: number) => {
    if (endTimeCompletion) {
      return endTimeCompletion.resourceId === resourceId ? endTimeCompletion.timeEnd : 0
    }
    return 0
  }

  const isUpgrading = Boolean(endTimeCompletion?.timeEnd)

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
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.metal, points)}
      />
      <ResourceBox
        img={CrystalImg}
        title="Crystal Mine"
        functionCallName="crystal"
        level={resourceLevels?.crystal}
        time={getEndTime(2)}
        costUpdate={costUpgrade?.crystal}
        isUpgrading={isUpgrading}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.crystal, points)}
      />
      <ResourceBox
        img={DeuteriumImg}
        title="Deuterium Mine"
        functionCallName="deuterium"
        level={resourceLevels?.deuterium}
        time={getEndTime(3)}
        costUpdate={costUpgrade?.deuterium}
        isUpgrading={isUpgrading}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.deuterium, points)}
      />
      <ResourceBox
        img={SolarPlantImg}
        title="Solar Plant"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgrading={isUpgrading}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.solarPlant, points)}
      />
    </StyledTabPanel>
  )
}

ResourceTabPanel.tabsRole = 'TabPanel'
