import { FC, useEffect, useState } from 'react'
import Row, { RowBetween, RowCentered } from '~/components/Row'
import styled from 'styled-components'
import axios from 'axios'

import { ImageIcon } from '~/components/Icons/Image'
import Column from '~/components/Column'
import { PlanetIcon } from '~/components/Icons/Planet'
import { ScaleIcon } from '~/components/Icons/Scale'
import { TemperatureIcon } from '~/components/Icons/Temperature'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { bigDataToNumber, dataToNumber } from '~/utils'
import { useErc721Contract } from '~/hooks/erc721'
import { BigNumber } from 'bignumber.js'
import Image from 'next/image'

const PlanetImageWrapper = styled(RowCentered)`
  height: 150px;
  width: 150px;
  border-radius: 20px;
  background: #192125;
  overflow: hidden;
`
const MainContainer = styled(RowCentered)`
  gap: 48px;
`

const PlanetInfoContainer = styled(Column)`
  gap: 6px;
  color: white;
  width: 352px;
`

const PlanetInfoRow = styled(RowBetween)`
  gap: 16px;
  width: 100%;
`

const PlanetInfoKey = styled.div`
  text-transform: uppercase;
  opacity: 50%;
  font-weight: 700;

  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
`

const PlanetInfoValue = styled(Row)`
  width: auto;
  gap: 8px;

  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  letter-spacing: 0.02em;
`

function hex2a(hex: string) {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substring(i, i + 2), 16)
    if (v) str += String.fromCharCode(v)
  }
  return str
}

const PlanetImage = ({ planetId }: { planetId: any; address: string }) => {
  const ipfsUrl = 'https://gateway.pinata.cloud/ipfs/'
  const [metadata, setMetadata] = useState<any>()
  const { contract: ercContract } = useErc721Contract(
    `0x0651853aabaf78f1f1501bf082b42aad992ed99c61892bc0e5ac2ab5d03d11b8`
  )
  const { data } = useStarknetCall({
    contract: ercContract,
    method: 'tokenURI',
    args: [planetId],
  })

  useEffect(() => {
    if (data && !metadata) {
      const tokenUri = data['token_uri']

      const uri = tokenUri.reduce((acc, tu) => {
        const hashName = new BigNumber(tu).toString(16)
        return `${acc}${hex2a(hashName)}`
      }, '')
      const url = `${ipfsUrl}${uri.replace('ipfs://', '')}.json`
      axios
        .get(url)
        // .get('https://gateway.pinata.cloud/ipfs/QmVijv2FZTxApnNT5bP8CU5dfrNW36s29xJVjckksn6s73/2.json')
        .then((result) => {
          // console.log(result)
          setMetadata(result.data as any)
        })
        .catch((e) => console.error(e))
    }
  }, [data, setMetadata])

  const imgUrl = (ipfs: string) => `${ipfsUrl}${ipfs.replace('ipfs/', '')}`

  const findAttribute = (name: string) =>
    metadata?.attributes.find(({ trait_type }) => trait_type === name)?.value || '-'
  // console.log('metadata', metadata, metadata && imgUrl(metadata.image))

  return (
    <>
      <PlanetImageWrapper>
        {metadata?.image ? <Image src={imgUrl(metadata?.image)} width={150} height={152} /> : <ImageIcon />}{' '}
        {/** TODO: Add actual image of Planet (NFT)  */}
      </PlanetImageWrapper>

      <PlanetInfoContainer>
        <PlanetInfoRow>
          <PlanetInfoKey>Coordinates</PlanetInfoKey>
          <PlanetInfoValue>
            <PlanetIcon />
            {findAttribute('position')}
          </PlanetInfoValue>
        </PlanetInfoRow>
        <PlanetInfoRow>
          <PlanetInfoKey>Size</PlanetInfoKey>
          <PlanetInfoValue>
            <ScaleIcon />
            {findAttribute('size')}
          </PlanetInfoValue>
        </PlanetInfoRow>
        <PlanetInfoRow>
          <PlanetInfoKey>Temp</PlanetInfoKey>
          <PlanetInfoValue>
            <TemperatureIcon />
            {findAttribute('temperature')}
          </PlanetInfoValue>
        </PlanetInfoRow>
      </PlanetInfoContainer>
    </>
  )
}

export const PlanetSection: FC = () => {
  const { account } = useStarknet()
  const { contract: gameContract } = useGameContract()
  const { data } = useStarknetCall({
    contract: gameContract,
    method: 'owner_of',
    args: [account],
  })

  const { data: erc721 } = useStarknetCall({
    contract: gameContract,
    method: 'erc721_address',
    args: [],
  })

  const planetId = data && data['planet_id']
  const addr = erc721 && new BigNumber(erc721['res'])?.toString(16)

  // console.log(planetId, addr)

  return (
    <RowCentered>
      <MainContainer>
        {planetId && addr ? (
          <PlanetImage address={addr} planetId={planetId} />
        ) : (
          <>
            <PlanetImageWrapper>
              <ImageIcon /> {/** TODO: Add actual image of Planet (NFT)  */}
            </PlanetImageWrapper>

            <PlanetInfoContainer>
              <PlanetInfoRow>
                <PlanetInfoKey>Coordinates</PlanetInfoKey>
                <PlanetInfoValue>
                  <PlanetIcon />-
                </PlanetInfoValue>
              </PlanetInfoRow>
              <PlanetInfoRow>
                <PlanetInfoKey>Size</PlanetInfoKey>
                <PlanetInfoValue>
                  <ScaleIcon />-
                </PlanetInfoValue>
              </PlanetInfoRow>
              <PlanetInfoRow>
                <PlanetInfoKey>Temp</PlanetInfoKey>
                <PlanetInfoValue>
                  <TemperatureIcon />-
                </PlanetInfoValue>
              </PlanetInfoRow>
            </PlanetInfoContainer>
          </>
        )}
      </MainContainer>
    </RowCentered>
  )
}
