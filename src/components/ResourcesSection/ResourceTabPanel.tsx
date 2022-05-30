import { StyledTabPanel } from './styleds'
import ResourceBox from '~/components/ResourceBox'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import { uint256 } from 'starknet'
import { dataToNumber } from '~/utils/utils'

export const ResourceTabPanel = ({ children, ...rest }: { children?: React.ReactNode }) => {
  const { account } = useStarknet()
  const { contract: gameContract } = useGameContract()

  const { data: resourcesAvailable } = useStarknetCall({
    contract: gameContract,
    method: 'resources_available',
    args: [account],
  })

  const points = useMemo(() => {
    if (resourcesAvailable) {
      return {
        metal: new BigNumber(uint256.uint256ToBN(resourcesAvailable['metal'])).toNumber(),
        crystal: new BigNumber(uint256.uint256ToBN(resourcesAvailable['crystal'])).toNumber(),
        deuterium: new BigNumber(uint256.uint256ToBN(resourcesAvailable['deuterium'])).toNumber(),
        energy: new BigNumber(uint256.uint256ToBN(resourcesAvailable['energy'])).toNumber(),
      }
    }
  }, [resourcesAvailable])
  console.log(points)
  const { data } = useStarknetCall({
    contract: gameContract,
    method: 'get_structures_upgrade_cost',
    args: [account],
  })

  const { data: structreLevels } = useStarknetCall({
    contract: gameContract,
    method: 'get_structures_levels',
    args: [account],
  })

  const resourceLevels = useMemo(() => {
    if (structreLevels) {
      return {
        metal: dataToNumber(structreLevels['metal_mine']),
        crystal: dataToNumber(structreLevels['crystal_mine']),
        deuterium: dataToNumber(structreLevels['deuterium_mine']),
        solarPlant: dataToNumber(structreLevels['solar_plant']),
        robotFactory: dataToNumber(structreLevels['robot_factory']),
      }
    }
  }, [structreLevels])

  const costUpgrade = useMemo(() => {
    if (data) {
      return {
        metal: dataToNumber(data['metal_mine'].metal),
        crystal: dataToNumber(data['crystal_mine'].metal),
        deuterium: dataToNumber(data['deuterium_mine'].metal),
        solarPlant: dataToNumber(data['solar_plant'].metal),
        robotFactory: dataToNumber(data['robot_factory'].metal),
      }
    }
  }, [data])

  return (
    <StyledTabPanel {...rest}>
      <ResourceBox
        title="Metal Mine"
        functionCallName="metal"
        level={resourceLevels?.metal}
        costUpdate={costUpgrade?.metal}
        isUpgradable={points && costUpgrade && points.metal >= costUpgrade.metal}
      />
      <ResourceBox
        title="Crystal Mine"
        functionCallName="crystal"
        level={resourceLevels?.crystal}
        costUpdate={costUpgrade?.crystal}
        isUpgradable={points && costUpgrade && points.crystal >= costUpgrade.crystal}
      />
      <ResourceBox
        title="Deuterium Mine"
        functionCallName="deuterium"
        level={resourceLevels?.deuterium}
        costUpdate={costUpgrade?.deuterium}
        isUpgradable={points && costUpgrade && points.crystal >= costUpgrade.crystal}
      />
      <ResourceBox
        title="Solar Plant"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        costUpdate={costUpgrade?.solarPlant}
        isUpgradable={points && costUpgrade && points.crystal >= costUpgrade.crystal}
      />
      <ResourceBox
        title="Solar Satellites"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        costUpdate={costUpgrade?.robotFactory}
        isUpgradable={points && costUpgrade && points.crystal >= costUpgrade.crystal}
      />
    </StyledTabPanel>
  )
}

ResourceTabPanel.tabsRole = 'TabPanel'
