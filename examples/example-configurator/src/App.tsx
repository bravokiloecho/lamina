import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Monkey from './components/Monkey'
import styled from 'styled-components'

export default function App() {
  return (
    <>
      <LevaContainer>
        <Leva titleBar={{ title: 'lamina' }} />
      </LevaContainer>
      <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [5, 5, 5] }}>
        <color attach="background" args={['#dadada']} />
        <Suspense fallback={null}>
          <Monkey />
        </Suspense>
        <axesHelper args={[5]} />
        {/* <gridHelper /> */}
      </Canvas>
    </>
  )
}

const LevaContainer = styled.div`
  & > div[class*='leva-c'] {
    left: 10px;
    right: unset;
  }
`
