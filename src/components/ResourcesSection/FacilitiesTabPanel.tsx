import { StyledTabPanel } from './styleds'
import styled from 'styled-components'
import { CostUpgrade, EndTimeCompletion, Points, ResourceLevels } from '~/utils/types'
import ResourceBox from '~/components/ResourceBox'
import MetalImg from '~/assets/resources/metal.jpg'
import RobotImg from '~/assets/resources/solar_satellite.jpg'
import { calculEnoughResources } from '~/utils'

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
interface Props {
  endTimeCompletion?: EndTimeCompletion
  points?: Points
  resourceLevels?: ResourceLevels
  costUpgrade?: CostUpgrade
}

export const FacilitiesTabPanel = ({ endTimeCompletion, points, resourceLevels, costUpgrade, ...rest }: Props) => {
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
        img={RobotImg}
        title="Robot Factory"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={points && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, points)}
      />
    </StyledTabPanel>
  )
}

FacilitiesTabPanel.tabsRole = 'TabPanel'
