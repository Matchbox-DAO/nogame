import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import { uint256 } from 'starknet'
import styled from 'styled-components'
import Image from 'next/image'

import iron from '../../assets/resources/nogameiron.png'
import crystal from '../../assets/resources/nogamecrystal.png'
import deuterium from '../../assets/resources/nogamedeuterium.png'
import energy from '../../assets/resources/nogameenergy.png'

import coins from '../../assets/icons/Coins.svg'
import gem from '../../assets/icons/Gem.svg'
import atom from '../../assets/icons/Atom.svg'
import bolt from '../../assets/icons/Bolt.svg'
import { dataToNumber } from '~/utils'

const Container = styled.div`
  //width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  //justify-content: space-between;
  padding: 4px 16px;
  //gap: 12px;

  //width: 100%;
  //height: 56px;

  flex: none;
  //order: 2;
  align-self: stretch;
  //flex-grow: 0;
  //background-color: blueviolet;
  //margin-bottom: 10px;
  border-top: 2px solid #151a1e;
`

interface Props {
  total?: number
  img: any
  iconImg: any
  title: string
}

const TotalResourceText = styled.div`
  color: #81d3ff;
  font-weight: 500;
  margin-left: 5px;
`

const TotalResourceContainer = styled.div`
  display: flex;
`

const TotalResourceWrapper = styled.div`
  margin-left: 30px;
`

const Resource = ({ total, img, iconImg, title }: Props) => {
  return (
    <Container>
      <div style={{ width: 32 }}>
        <Image src={img} alt="resource" objectFit="contain" />
      </div>
      <TotalResourceWrapper>
        {title}
        <TotalResourceContainer>
          <Image src={iconImg} alt="icon-resource" objectFit="contain" />
          <TotalResourceText>{total}</TotalResourceText>
        </TotalResourceContainer>
      </TotalResourceWrapper>
    </Container>
  )
}

const ResourcesContainer = () => {
  const { account } = useStarknet()
  const { contract } = useGameContract()
  const { data } = useStarknetCall({
    contract,
    method: 'resources_available',
    args: [account],
  })

  const points = useMemo(() => {
    if (data) {
      return {
        metal: dataToNumber(data['metal']),
        crystal: dataToNumber(data['crystal']),
        deuterium: dataToNumber(data['deuterium']),
        energy: dataToNumber(data['energy']),
      }
    }
  }, [data])
  return (
    <div>
      <Resource title="Metal" img={iron} iconImg={coins} total={points?.metal} />
      <Resource title="Crystal" img={crystal} iconImg={gem} total={points?.crystal} />
      <Resource title="Deuterium" img={deuterium} iconImg={atom} total={points?.deuterium} />
      <Resource title="Energy" img={energy} iconImg={bolt} total={points?.energy} />
    </div>
  )
}

export default ResourcesContainer
