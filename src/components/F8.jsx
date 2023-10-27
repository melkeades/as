import { ContactShadows, Environment, Float, Html, MeshReflectorMaterial, OrbitControls, PresentationControls, Text, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import F8_mod from './F8_mod'
import { useEffect, useRef } from 'react'
import { DoubleSide } from 'three'
function Mod() {
  const noteRef = useRef()
  const frameStyle = {
    width: '1024px',
    height: '670px',
    border: 'none',
    borderRadius: '20px',
    background: 'black',
  }
  useEffect(() => {
    // to address mobile touch glitch eg reloading on swipe down
    // document.getElementsByTagName('canvas')[0].style.touchAction = 'none'
  }, [])
  // const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
  // console.log(computer)
  return (
    <>
      <Environment preset="city" />
      <color args={['#222']} attach={'background'} />
      {/* <primitive object={computer.scene} /> */}
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.74]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight width={2.5} height={1.65} intensity={65} color={'#ff6900'} rotation={[0.1, Math.PI, 0]} position={[0, 0.55, -1.14]} />
          <F8_mod position-y={[-1.2]} />
          <Html
            transform
            distanceFactor={1.17}
            position={[0.03, 0.3, -1.34]}
            rotation-x={-0.256}
            // occlude={noteRef}
            occlude="blending"
            // castShadow
            receiveShadow
            // wrapperClass="htmlScreen"
            // material={<meshPhysicalMaterial side={DoubleSide} opacity={0.6} />}
            // material={<MeshReflectorMaterial side={DoubleSide} resolution={1024} opacity={0.5} />}
            material={<meshStandardMaterial side={DoubleSide} resolution={1024} opacity={0.5} />}
          >
            <iframe style={frameStyle} src="https://bruno-simon.com/html/" />
          </Html>
          <Text ref={noteRef} font="../bangers-v20-latin-regular.woff" fontSize={1} position={[0, 0.75, 0.75]}>
            qwesadf
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.8} opacity={0.4} scale={5} blur={2.4} />
    </>
  )
}
export default function App() {
  const canWrapStyle = {
    width: '100vw',
    height: '100vh',
    touchAction: 'none',
  }
  return (
    <Canvas
      style={canWrapStyle}
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 4],
      }}
    >
      {/* <OrbitControls makeDefault /> */}
      {/* <ambientLight intensity={0.8} />
      <directionalLight position={[1, 2, 3]} intensity={2} /> */}
      <Mod />
    </Canvas>
  )
}
