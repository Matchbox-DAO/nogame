import { StyledTabPanel } from './styleds'
import ResourceBox from '~/components/ResourceBox'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { useCallback, useMemo } from 'react'
import { dataToNumber } from '~/utils'
import { differenceInMinutes, fromUnixTime } from 'date-fns'

import MetalImg from '~/assets/resources/metal.jpg'
import CrystalImg from '~/assets/resources/crystal.jpg'
import DeuteriumImg from '~/assets/resources/deuterium.jpg'
import SolarPlantImg from '~/assets/resources/solar_plant.jpg'
import RobotImg from '~/assets/resources/solar_satellite.jpg'

export const ResourceTabPanel = ({ children, ...rest }: { children?: React.ReactNode }) => {
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

  const calculEnoughResources = (res: { metal: number; crystal: number; deuterium: number }) => {
    if (!points) {
      return false
    }

    return points.metal - res.metal >= 0 && points.crystal - res.crystal >= 0 && points.deuterium - res.deuterium >= 0
  }

  const getEndTime = (resourceId: number) => {
    if (endTimeCompletion) {
      return endTimeCompletion.resourceId === resourceId ? endTimeCompletion.timeEnd : 0
    }
    return 0
  }

  return (
    <StyledTabPanel {...rest}>
      <ResourceBox
        img={MetalImg}
        title="Metal Mine"
        functionCallName="metal"
        level={resourceLevels?.metal}
        time={getEndTime(1)}
        costUpdate={costUpgrade?.metal}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.metal)}
      />
      <ResourceBox
        img={CrystalImg}
        title="Crystal Mine"
        functionCallName="crystal"
        level={resourceLevels?.crystal}
        time={getEndTime(2)}
        costUpdate={costUpgrade?.crystal}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.crystal)}
      />
      <ResourceBox
        img={DeuteriumImg}
        title="Deuterium Mine"
        functionCallName="deuterium"
        level={resourceLevels?.deuterium}
        time={getEndTime(3)}
        costUpdate={costUpgrade?.deuterium}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.deuterium)}
      />
      <ResourceBox
        img={SolarPlantImg}
        title="Solar Plant"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.solarPlant)}
      />
      <ResourceBox
        img={RobotImg}
        title="Solar Satellites"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgradable={points && costUpgrade && calculEnoughResources(costUpgrade.robotFactory)}
      />
    </StyledTabPanel>
  )
}

ResourceTabPanel.tabsRole = 'TabPanel'
