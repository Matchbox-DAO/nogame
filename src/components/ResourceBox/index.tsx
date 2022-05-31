import styled from 'styled-components'
import { LayerGroup } from '~/components/Icons/LayerGroup'
import { Clock } from '~/components/Icons/Clock'
import { Coins } from '~/components/Icons/Coins'
import { ButtonPrimary } from '~/components/Button'
import Image from 'next/image'
import useUpgradeResourceStart, { ResourceType } from '~/hooks/calls/useUpgradeResourceStart'

import plus from '~/assets/icons/Plus.svg'
import nullIcon from '~/assets/icons/Null.svg'
import Column from '../Column'

const Box = styled.div<{ isUpgradable?: boolean }>`
  width: 100%;
  max-height: 70px;
  display: flex;
  flex-direction: row;
  //align-items: center;
  //justify-content: space-between;
  margin-bottom: 10px;
  //padding: 10px;
  border: 2px solid ${(props) => (props.isUpgradable ? '#6CBD6A' : '#402F2C')};
  background-color: ${(props) => (props.isUpgradable ? '#394639' : '#151A1E')};
  border-radius: 4px;
  overflow: hidden;
`

const SubBox = styled.div`
  width: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const Title = styled.div`
  width: 130px;
`

const InfoContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ResourceContainer = styled(Column)`
  width: 50px;
  text-align: left;
  gap: 3px;
`

const NumberContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  line-height: 18.2px;
`

const ResourceTitle = styled.div`
  color: grey;
  font-weight: 700;
  font-size: 12px;
`

const ImageContainer = styled.div`
  width: 70px;
`

interface Props {
  img: any
  title: string
  functionCallName: ResourceType
  level?: number
  time: number
  costUpdate?: { metal: number; crystal: number; deuterium: number }
  isUpgradable?: boolean
  isUpgrading?: boolean
}

const ResourceBox = ({ img, title, level, isUpgradable, isUpgrading, costUpdate, functionCallName, time }: Props) => {
  const upgrade = useUpgradeResourceStart(functionCallName)
  const isValidButton = isUpgrading ? false : isUpgradable

  return (
    <Box isUpgradable={isValidButton}>
      <ImageContainer>
        <Image src={img} alt={title} />
      </ImageContainer>
      <SubBox>
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
            <ResourceTitle>TIME COMPLETION</ResourceTitle>
            <NumberContainer>
              <Clock />
              {time !== undefined ? `${time}m` : ''}
            </NumberContainer>
          </ResourceContainer>
          <ResourceContainer>
            <ResourceTitle>METAL COST</ResourceTitle>
            <NumberContainer>
              <Coins />
              {costUpdate?.metal}
            </NumberContainer>
          </ResourceContainer>
          <ResourceContainer>
            <ResourceTitle>CRYSTAL COST</ResourceTitle>
            <NumberContainer>
              <Coins />
              {costUpdate?.crystal}
            </NumberContainer>
          </ResourceContainer>
          <ResourceContainer>
            <ResourceTitle>DEUTERIUM COST</ResourceTitle>
            <NumberContainer>
              <Coins />
              {costUpdate?.deuterium}
            </NumberContainer>
          </ResourceContainer>
        </InfoContainer>
        <div style={{ width: 300 }}>
          <ButtonPrimary
            disabled={!isValidButton}
            onClick={() => upgrade()}
            customColor={isValidButton ? undefined : '#402F2C'}
          >
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
              <div style={{ width: 20, height: 20 }}>
                {isValidButton ? <Image src={plus} alt="plus" /> : <Image src={nullIcon} alt="nullIcon" />}
              </div>
              {isValidButton ? (
                <div style={{ width: 70 }}>Upgrade</div>
              ) : (
                <div style={{ width: 130 }}>{isUpgrading ? 'Upgrading' : 'Need Resources'}</div>
              )}
            </div>
          </ButtonPrimary>
        </div>
      </SubBox>
    </Box>
  )
}

export default ResourceBox
