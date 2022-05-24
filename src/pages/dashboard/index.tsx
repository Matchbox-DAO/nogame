import styled, { css } from 'styled-components'
import Image from 'next/image'
import NoGameLogo from 'src/assets/NoGameLogo.png'
import SideBar from '~/components/SideBar'
import { PlanetSection } from './PlanetSection'
import { ResourcesSection } from './ResourcesSection'

const GameContainer = styled.div`
  display: grid;
  grid-template-rows: 1.05fr 2fr;
  justify-items: center;
  align-items: center;
  height: 100%;
  flex: 5;
`

const Header = styled.div``

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-items: center;
  border: 2px solid black;
  align-items: stretch;
`

const SubBodyContainer = styled.section<{ border?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-items: center;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: #151a1e;

  ${({ border }) =>
    border &&
    css`
      border-top: 2px solid black;
    `}
`

export default function Dashboard() {
  return (
    <MainContainer>
      <SideBar />
      <GameContainer>
        <SubBodyContainer>
          <PlanetSection />
        </SubBodyContainer>
        <SubBodyContainer border>
          <ResourcesSection />
        </SubBodyContainer>
      </GameContainer>
    </MainContainer>
  )
}
