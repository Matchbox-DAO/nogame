// import { useStarknet, useStarknetTransactionManager } from '@starknet-react/core'
import type { NextPage } from 'next'
// import { useForm } from 'react-hook-form'
import styled from 'styled-components'
// import { CairoText } from '~/theme'
import React from 'react'
import Popups from '~/components/Popups'

const HomeWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  position: relative;
`

const Home: NextPage = () => {
  // const { account } = useStarknet()
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { isValid },
  //   resetField,
  // } = useForm({
  //   mode: 'onChange',
  // })

  return (
    <HomeWrapper>
      <Popups />
      <div style={{ margin: '0px auto', minWidth: '60%' }}>OGAME</div>
    </HomeWrapper>
  )
}

export default Home
