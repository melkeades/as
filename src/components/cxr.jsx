import {
  ContactShadows,
  Environment,
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PresentationControls,
  // Text,
  useGLTF,
  useTexture,
  // Billboard,
} from '@react-three/drei'
//
import { Canvas, useLoader } from '@react-three/fiber'
import { useEffect, useRef, Suspense } from 'react'
import * as THREE from 'three'
import { RootContainer, Container, Image, Text, clippingEvents, noAnimation } from '@coconut-xr/koestlich'

function Mod() {
  return <></>
}
function Dome() {
  const texture = useTexture(['/360/1.jpg', '/360/2.jpg'])
  // const texture = useTexture(['/360/1.jpg', '/360/2.jpg', '/360/3.jpg', '/360/4.jpg', '/360/5.jpg'])
  // const texture = useLoader(THREE.TextureLoader, '/360/1.jpg')
  texture.forEach((item) => {
    item.mapping = THREE.EquirectangularReflectionMapping
    item.colorSpace = THREE.SRGBColorSpace
    item.minFilter = item.magFilter = THREE.LinearFilter
  })
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[100, 100, 100]} />
        <meshBasicMaterial attach="material" map={texture[1]} side={THREE.BackSide} />
      </mesh>
      {/* <RootContainer backgroundColor="grey" sizeX={2} sizeY={1} flexDirection="row" borderRadius={60} padding={48} gapColumn={48} overflow="scroll">
        <Container flexGrow={1} backgroundColor="blue" />
        <Suspense>
          <Image width={480}index={1} flexBasis={0} flexGrow={1} url="/360/1.jpg" />
          <Text fontSize={64} index={1} margin={48} marginLeft={0}>
            text
          </Text>
        </Suspense>
      </RootContainer> */}
    </>
  )
}
export default function App() {
  return (
    <>
      <VRButton
        style={{
          position: 'absolute',
          padding: '12px 24px',
          width: 'auto',
          border: '1px solid ',
          background: 'rgba(0, 0, 0, 0.1)',
          color: 'white',
          zIndex: 99999,
          cursor: 'pointer',
          top: '10px',
          right: '10px',
          opacity: 0.5,
          userSelect: 'none',
        }}
      />
      <Canvas flat={true} linear={true} events={clippingEvents} gl={{ localClippingEnabled: true }}>
        <XR>
          {/* <Environment background resolution={128} preset="sunset" /> */}
          <OrbitControls />

          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[1, 2, 3]} intensity={3} shadow-normalBias={0.04} shadow-mapSize={[2048, 2048]} />
          <Controllers />
          <Hands />

          {/* <OrbitControls makeDefault /> */}
          <Dome />
          <Mod />
        </XR>
      </Canvas>
    </>
  )
}
