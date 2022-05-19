import styled from 'styled-components'
import Image from 'next/image'
import logo from 'src/assets/logo.png'

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  padding: 20px;
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

export default function Dashboard() {
  return (
    <>
      <Header>
        <ImgWrapper>
          <Image src={logo} alt="logo" objectFit="contain" width={395} height={80} />
        </ImgWrapper>
      </Header>

      <BodyContainer>
        <ElementSection>
          <ElementBox>
            <ElementLabel>METAL</ElementLabel>
          </ElementBox>
          <ElementBox>Crystal</ElementBox>
          <ElementBox>Deuterium</ElementBox>
          <ElementBox>Energy </ElementBox>
        </ElementSection>
      </BodyContainer>
    </>
  )
}
