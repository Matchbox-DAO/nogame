import { FC } from 'react'
import Row, { RowBetween, RowCentered } from '~/components/Row'
import styled from 'styled-components'

import { ImageIcon } from '~/components/Icons/Image'
import Column from '~/components/Column'
import { PlanetIcon } from '~/components/Icons/Planet'
import { ScaleIcon } from '~/components/Icons/Scale'
import { TemperatureIcon } from '~/components/Icons/Temperature'

const PlanetImageWrapper = styled(RowCentered)`
  height: 120px;
  width: 160px;
  border-radius: 80px;
  background: #192125;
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

export const PlanetSection: FC = () => {
  return (
    <RowCentered>
      <MainContainer>
        <PlanetImageWrapper>
          <ImageIcon /> {/** TODO: Add actual image of Planet (NFT)  */}
        </PlanetImageWrapper>

        <PlanetInfoContainer>
          <PlanetInfoRow>
            <PlanetInfoKey>Coordinates</PlanetInfoKey>
            <PlanetInfoValue>
              <PlanetIcon />
              RA 21H 40M 365
            </PlanetInfoValue>
          </PlanetInfoRow>
          <PlanetInfoRow>
            <PlanetInfoKey>Size</PlanetInfoKey>
            <PlanetInfoValue>
              <ScaleIcon />
              58,232
            </PlanetInfoValue>
          </PlanetInfoRow>
          <PlanetInfoRow>
            <PlanetInfoKey>Temp</PlanetInfoKey>
            <PlanetInfoValue>
              <TemperatureIcon />
              178c (-28sf)
            </PlanetInfoValue>
          </PlanetInfoRow>
        </PlanetInfoContainer>
      </MainContainer>
    </RowCentered>
  )
}
