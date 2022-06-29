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
        address="0x043d8d23118a2fa64325a0b0a5606a67b30253cdb334c8fd75b270aba08c25ab"
        img={iron}
        iconImg={coins}
        total={points?.metal}
      />
      <Resource
        title="Crystal"
        address="0x014a7a59e3e2d058d4c7c868e05907b2b49e324cc5b6af71182f008feb939e91"
        img={crystal}
        iconImg={gem}
        total={points?.crystal}
      />
      <Resource
        title="Deuterium"
        address="0x03d4a1f4c738abdb692c5a150267afb975998a311883a67db3bcf218babe41d6"
        img={deuterium}
        iconImg={atom}
        total={points?.deuterium}
      />
      <Resource title="Energy" img={energy} iconImg={bolt} total={points?.energy} />
    </div>
  )
}

export default ResourcesContainer
