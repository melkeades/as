import { useEffect, useRef, useState, Suspense } from 'react'
import { RootContainer, Container, Image, Text, clippingEvents, noAnimation } from '@coconut-xr/koestlich'
import Glass from './glass'
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber'
import { useSpring, a, easings } from '@react-spring/three'
import { useXR, Interactive, Controllers } from '@react-three/xr'

// import {  PointerHand, PointerController } from '@coconut-xr/natuerlich/defaults'
// import { useEnterXR, NonImmersiveCamera, ImmersiveSessionOrigin } from '@coconut-xr/natuerlich/react'

export function Hud({ setOrbitControl, setPhotoIndex }) {
  const { gl, camera } = useThree()
  const { isPresenting } = useXR()
  const [props, set] = useSpring(() => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 1, friction: 20, tension: 50 },
  }))
  let xr, yr, zr
  useFrame(() => {
    const getCamera = isPresenting ? gl.xr.getCamera(camera) : camera
    const { x, y, z } = getCamera.position
    const { x: rotX, y: rotY, z: rotZ } = getCamera.rotation
    // xr = camera.rotation._x
    // yr = camera.rotation._y
    // zr = camera.rotation._z
    set({ position: [x, y, z], rotation: [rotX, rotY, rotZ] })
  })
  function imgSelect(index) {
    // setPhotoIndex(index)
    console.log(index)
  }

  return (
    <>
      <a.group position={props.position}>
        <a.group rotation={props.rotation}>
          {/* <a.group rotation={(xr, yr, zr)}> */}
          <RootContainer
            position={[0, -1, -3]}
            rotation={[-0.5, 0, 0]}
            sizeX={4}
            sizeY={1.5}
            // material={GlassMaterial}
            onPointerEnter={() => setOrbitControl(false)}
            onPointerLeave={() => setOrbitControl(true)}
            alignItems="stretch"
          >
            <Glass borderRadius={48} padding={64} alignItems="stretch" height={'100%'}>
              {/* <Container width={480} backgroundColor="blue" /> */}
              <Container overflow="scroll" alignItems="stretch" animation={noAnimation} height={'100%'}>
                <Container flexDirection="row" gapColumn={48} alignItems="stretch" overflow="scroll" animation={noAnimation} height={'100%'}>
                  <Suspense alignItems="stretch" animation={noAnimation} height={'100%'}>
                    {[...Array(2)].map((e, i) => (
                      <Interactive
                        key={'int' + i}
                        onSelect={() => imgSelect(i)}
                        onSqueeze={() => imgSelect(i)}
                        // onHover={() => imgSelect(i)}
                        //
                      >
                        <Image key={'img' + i} height={'100%'} url={'/360/' + (i + 1) + '.jpg'} borderRadius={32} onClick={() => imgSelect(i)} />
                      </Interactive>
                    ))}
                  </Suspense>
                </Container>
              </Container>
            </Glass>
          </RootContainer>
        </a.group>
      </a.group>
    </>
  )
}
export default Hud
