import styled, { css } from 'styled-components'
import SideBar from '~/components/SideBar'
import { PlanetSection } from '../../components/PlanetSection'
import { ResourcesSection } from '../../components/ResourcesSection'

const GameContainer = styled.div`
  display: grid;
  grid-template-rows: 34% auto;
  justify-items: center;
  align-items: center;
  height: 100%;
  max-height: 100vh;
  flex: 5;
`

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
        <SubBodyContainer>
          <ResourcesSection />
        </SubBodyContainer>
      </GameContainer>
    </MainContainer>
  )
}
