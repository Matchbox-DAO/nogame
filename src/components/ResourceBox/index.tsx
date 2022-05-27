import styled from 'styled-components'
import { LayerGroup } from '~/components/Icons/LayerGroup'
import { Clock } from '~/components/Icons/Clock'
import { Coins } from '~/components/Icons/Coins'
import { ButtonPrimary } from '~/components/Button'
import Image from 'next/image'
import useUpgradeResourceStart, { ResourceType } from '~/hooks/calls/useUpgradeResourceStart'

import plus from '~/assets/icons/Plus.svg'
import nullIcon from '~/assets/icons/Null.svg'

const Box = styled.div<{ isUpgradable?: boolean }>`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid ${(props) => (props.isUpgradable ? '#6CBD6A' : '#402F2C')};
  background-color: ${(props) => (props.isUpgradable ? '#394639' : '#151A1E')};
`

const Title = styled.div`
  width: 130px;
`

const InfoContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ResourceContainer = styled.div`
  width: 50px;
  align-items: center;
  text-align: center;
`

const NumberContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`

const ResourceTitle = styled.div`
  color: grey;
`

interface Props {
  title: string
  functionCallName: ResourceType
  level?: number
  // time: number
  costUpdate?: number
  isUpgradable?: boolean
}

const ResourceBox = ({ title, level, isUpgradable, costUpdate, functionCallName }: Props) => {
  const upgrade = useUpgradeResourceStart(functionCallName)
  return (
    <Box isUpgradable={isUpgradable}>
      <Title>{title}</Title>
      <InfoContainer>
        <ResourceContainer>
          <ResourceTitle>LEVEL</ResourceTitle>
          <NumberContainer>
            <LayerGroup />
            {level}
          </NumberContainer>
        </ResourceContainer>
        <ResourceContainer>
          <ResourceTitle>TIME</ResourceTitle>
          <NumberContainer>
            <Clock />
            {level !== undefined ? `${level}m` : ''}
          </NumberContainer>
        </ResourceContainer>
        <ResourceContainer>
          <ResourceTitle>COST</ResourceTitle>
          <NumberContainer>
            <Coins />
            {costUpdate}
          </NumberContainer>
        </ResourceContainer>
      </InfoContainer>
      <div style={{ width: 300 }}>
        <ButtonPrimary
          disabled={!isUpgradable}
          onClick={() => upgrade()}
          customColor={isUpgradable ? undefined : '#402F2C'}
        >
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <div style={{ width: 20, height: 20 }}>
              {isUpgradable ? <Image src={plus} alt="plus" /> : <Image src={nullIcon} alt="nullIcon" />}
            </div>
            {isUpgradable ? <div style={{ width: 70 }}>Upgrade</div> : <div style={{ width: 130 }}>Need Resources</div>}
          </div>
        </ButtonPrimary>
      </div>
    </Box>
  )
}

export default ResourceBox
