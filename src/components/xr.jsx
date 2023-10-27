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
import { VRButton, ARButton, XR, Controllers, Hands, Interactive } from '@react-three/xr'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useEffect, useRef, useState, Suspense, useFrame } from 'react'
import * as THREE from 'three'
import { RootContainer, Container, Image, Text, clippingEvents, noAnimation } from '@coconut-xr/koestlich'
import Glass from './glass'
// import { Camera } from './Camera'
import { Hud } from './Hud'
import { PointerHand, PointerController } from '@coconut-xr/natuerlich/defaults'

function Dome({ photoIndex }) {
  const imgUrl = ['/360/1.jpg', '/360/2.jpg']
  const texture = useTexture(imgUrl)
  const [photo, setPhoto] = useState(texture[photoIndex])

  texture.forEach((item) => {
    item.mapping = THREE.EquirectangularReflectionMapping
    item.colorSpace = THREE.SRGBColorSpace
    item.minFilter = item.magFilter = THREE.LinearFilter
  })
  useEffect(() => {
    setPhoto(texture[photoIndex])
  }, [photoIndex])

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[100, 100, 100]} />
        <meshBasicMaterial attach="material" toneMapped={false} map={photo} side={THREE.BackSide} onUpdate={(self) => (self.needsUpdate = true)} />
      </mesh>
    </>
  )
}
export default function App() {
  const [orbitControl, setOrbitControl] = useState(true)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [opacity, setOpacity] = useState('red')
  useEffect(() => {
    //
  }, [orbitControl])
  function co() {
    const newOpacity = opacity === 'red' ? 'blue' : 'red'
    setOpacity(newOpacity)
    console.log('v')
  }
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
        {/* <Camera position={[0, 0, 0]} /> */}
        {/* <Hud setPhotoIndex={setPhotoIndex} setOrbitControl={setOrbitControl} position={[0, 0, -2]} /> */}

        <XR>
          <OrbitControls enableRotate={orbitControl} />

          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[1, 2, 3]} intensity={3} shadow-normalBias={0.04} shadow-mapSize={[2048, 2048]} />
          <Controllers />
          <Hands />
          <PointerController id={getInputSourceId(inputSource)} key={getInputSourceId(inputSource)} inputSource={inputSource}>
            <Hud setPhotoIndex={setPhotoIndex} setOrbitControl={setOrbitControl} />
          </PointerController>
          {/* <Dome /> */}
          <Dome photoIndex={photoIndex} />
          <Interactive
            onSqueeze={() => co()}
            onSelect={() => co()}
            // onHover={() => co()}
            // onSelect={() => co()}
            // onSelect={() => co()}
            // onSelect={() => co()}
            // onSelect={() => co()}
          >
            <mesh
            // onClick={() => co()}
            >
              <boxGeometry />
              <meshBasicMaterial color={opacity} />
            </mesh>
          </Interactive>
        </XR>
      </Canvas>
    </>
  )
}
