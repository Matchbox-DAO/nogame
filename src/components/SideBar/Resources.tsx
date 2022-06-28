import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { useMemo, useState } from 'react'
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
  address?: string
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
const ResourceAddress = styled.div`
  font-size: 12px;
`

const ImageAddressContainer = styled.div`
  min &:hover {
    cursor: pointer;
  }
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  min-width: 50px;
`

const Resource = ({ total, img, iconImg, title, address }: Props) => {
  const [copied, setCopied] = useState(false)
  return (
    <Container>
      <ImageAddressContainer
        onClick={() => {
          if (address) {
            const blob = new Blob([address], { type: 'text/plain' })
            const item = new ClipboardItem({ 'text/plain': blob })
            navigator.clipboard.write([item]).then(() => setCopied(true))
          }
        }}
      >
        <div style={{ width: '30px' }}>
          <Image src={img} alt="resource" objectFit="contain" />
        </div>
        {address && !copied && <ResourceAddress>{`${address.substring(0, 6)}...`}</ResourceAddress>}
        {copied && <ResourceAddress>Copied</ResourceAddress>}
      </ImageAddressContainer>
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
      <Resource
        title="Metal"
        address="0x0730fc0392325eeae3a819a7b1fd0ff4ae1a3a6016d7a5dc86285e804e1031f5"
        img={iron}
        iconImg={coins}
        total={points?.metal}
      />
      <Resource
        title="Crystal"
        address="0x05335bb68719881d7ef6f54a07e3b0e2d0a301b5d0a987d704dd39d9f28be3d3"
        img={crystal}
        iconImg={gem}
        total={points?.crystal}
      />
      <Resource
        title="Deuterium"
        address="0x026c88a6f9a10bf562cdbebb1f403c5e0e32d706993b4491966855582847f367"
        img={deuterium}
        iconImg={atom}
        total={points?.deuterium}
      />
      <Resource title="Energy" img={energy} iconImg={bolt} total={points?.energy} />
    </div>
  )
}

export default ResourcesContainer
