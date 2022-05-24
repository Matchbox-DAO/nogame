import styled from 'styled-components'
import Image from 'next/image'
import NoGameLogo from 'src/assets/NoGameLogo.png'
import SideBar from '~/components/SideBar'

const ImgWrapper = styled.div`
  width: 100%;
  background: linear-gradient(to right, #0b1f31 30%, #213e57 80%, #304f6e);
`

const DashboardContainer = styled.div`
  position: relative;
  margin: auto;
  width: 40vw;
  min-height: 50vh;
  max-width: 800px;
  background-color: #304f6e;
  box-shadow: #65dff9 0px 25px 60px;
  border: 5px solid #65dff9;
`

const Header = styled.div``

const BodyContainer = styled.div`
  height: 100vh;
  width: 100vw;
`

const SubBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  height: 100%;
  border: 2px solid black;
  align-items: stretch;
`

const ElementSection = styled.section`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  align-items: center;
  justify-items: stretch;
  gap: 10px;
  width: 100%;
`

const ElementBox = styled.div`
  background-color: #193f64;
  border: 4px solid #65dff9;
  height: 70px;
  box-shadow: 0px 3px #346e90;
  position: relative;
`

const ElementLabel = styled.div`
  position: absolute;
  top: 104%;
  left: -4%;
  /* width: 0;
  height: 0; */
  border: 5px solid #65dff9;
  box-shadow: 3px 3px #346e90;
  border-bottom-color: transparent;
  border-right-color: transparent;
  background-color: #65dff9;
  /* padding-right: 10px; */

  &:after {
    position: absolute;
    top: 0;
    left: 100%;
    width: 0;
    height: 0;
    content: '';
    border: 5px solid blue;
    border-bottom-color: transparent;
    border-right-color: transparent;
  }
`

const MainScreen = styled.div`
  background-color: #151a1e;
  width: 100%;
  flex: 5;
`

export default function Dashboard() {
  return (
    <>
      <Header>
        {/* <ImgWrapper>
          <Image src={NoGameLogo} alt="logo" objectFit="contain" width={395} height={80} />
        </ImgWrapper> */}
      </Header>

      <BodyContainer>
        <SubBodyContainer>
          <SideBar />
          <MainScreen>Box</MainScreen>
          {/* <ElementSection>
          <ElementBox>
            <ElementLabel>METAL</ElementLabel>
          </ElementBox>
          <ElementBox>Crystal</ElementBox>
          <ElementBox>Deuterium</ElementBox>
          <ElementBox>Energy </ElementBox>
        </ElementSection> */}
        </SubBodyContainer>
      </BodyContainer>
    </>
  )
}
