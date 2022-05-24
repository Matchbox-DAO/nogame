import styled from 'styled-components'
import Image from 'next/image'
import nogame from '~/assets/NoGameLogo.png'
import ranking from '~/assets/icons/Ranking.svg'
import trophy from '~/assets/icons/Trophy.svg'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import { uint256 } from 'starknet'

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 24px 24px;
  gap: 16px;
`

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 10px;

  width: 192px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

  //background-color: rebeccapurple;
`

const RankLineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`

const TitleContainer = styled.div`
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: grey;
  margin-left: 4px;
`

const LogoAndRankContainer = () => {
  const { account } = useStarknet()
  const { contract } = useGameContract()
  const { data } = useStarknetCall({
    contract,
    method: 'player_points',
    args: [account],
  })

  const points = useMemo(() => {
    if (data) {
      return new BigNumber(uint256.uint256ToBN(data['points'])).toNumber()
    }
  }, [data])

  return (
    <LogoContainer>
      <div style={{ width: 200 }}>
        <Image src={nogame} alt="nogame" objectFit="contain" />
      </div>
      <RankContainer>
        <RankLineContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={ranking} alt="ranking" objectFit="contain" />
            <TitleContainer>Rank</TitleContainer>
          </div>
          {points ?? 'N/A'}
        </RankLineContainer>
        <RankLineContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={trophy} alt="trophy" objectFit="contain" />
            <TitleContainer>Score</TitleContainer>
          </div>
          {points ?? 'N/A'}
        </RankLineContainer>
      </RankContainer>
    </LogoContainer>
  )
}

export default LogoAndRankContainer
