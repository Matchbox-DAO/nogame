import styled from 'styled-components'
import { LayerGroup } from '~/components/Icons/LayerGroup'
import { Clock } from '~/components/Icons/Clock'
import { Coins } from '~/components/Icons/Coins'
import { ButtonPrimary } from '~/components/Button'
import Image from 'next/image'
import useUpgradeResourceStart, { ResourceType } from '~/hooks/calls/useUpgradeResourceStart'

import plus from '~/assets/icons/Plus.svg'
import Column from '../Column'
import React, { useMemo } from 'react'
import useCollectResources from '~/hooks/calls/useCollectResources'
import useCompleteResource from '~/hooks/calls/useCompleteResource'

const Box = styled.div<{ customColor: string }>`
  width: 100%;
  max-height: 70px;
  display: flex;
  flex-direction: row;
  //align-items: center;
  //justify-content: space-between;
  margin-bottom: 10px;
  //padding: 10px;
  border: 2px solid ${(props) => props.customColor};
  background-color: #151a1e;
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
  time?: number
  costUpdate?: { metal: number; crystal: number; deuterium: number }
  hasEnoughResources?: boolean
  isUpgrading?: boolean
}

type ButtonState = 'valid' | 'noResource' | 'updated' | 'upgrading'

interface ButtonArrayStates {
  state: ButtonState
  title: string
  callback: () => void
  color?: string
  icon: React.ReactNode
}

const ResourceBox = ({
  img,
  title,
  level,
  hasEnoughResources,
  costUpdate,
  functionCallName,
  time,
  isUpgrading,
}: Props) => {
  const upgrade = useUpgradeResourceStart(functionCallName)
  const complete = useCompleteResource(functionCallName)
  const collectResources = useCollectResources()

  const buttonState = useMemo((): ButtonState => {
    if (!hasEnoughResources) {
      return 'noResource'
    }
    if (time !== undefined && time > 0) {
      return 'upgrading'
    } else if (time !== undefined && time === 0) {
      return 'updated'
    }

    return 'valid'
  }, [hasEnoughResources, time])

  const statesButton: ButtonArrayStates[] = [
    {
      state: 'valid',
      title: 'Upgrade',
      callback: upgrade,
      color: '#6cbd6a',
      icon: <Image src={plus} alt="plus" />,
    },
    {
      state: 'upgrading',
      title: 'In Progress',
      callback: () => {},
      color: 'yellow',
      icon: <Image src={plus} alt="plus" />,
    },
    {
      state: 'updated',
      title: 'Complete Upgrade',
      callback: complete,
      color: '#0DACF0',
      icon: <Image src={plus} alt="plus" />,
    },
    {
      state: 'noResource',
      title: 'Need Resources',
      callback: () => {},
      color: '#402F2C',
      icon: <Image src={plus} alt="plus" />,
    },
  ]

  const actualButtonState = statesButton.find((state) => state.state === buttonState)
  const isDisabled =
    isUpgrading || actualButtonState?.state === 'noResource' || actualButtonState?.state === 'upgrading'

  return (
    <Box customColor={actualButtonState?.color ?? 'grey'}>
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
            customColor={isDisabled ? undefined : actualButtonState?.color}
            onClick={() => actualButtonState?.callback()}
            disabled={isDisabled}
          >
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
              <div style={{ width: 20, height: 20 }}>{actualButtonState?.icon}</div>
              {actualButtonState?.title}
            </div>
          </ButtonPrimary>
        </div>
      </SubBox>
    </Box>
  )
}

export default ResourceBox
