import { Clone, OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Suspense } from 'react'
import Ham from './F3_ham'
import Fox from './F3_fox'

function BigModel() {
  const model = useLoader(GLTFLoader, '../FlightHelmet/glTF/FlightHelmet.gltf', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('../draco/')
    loader.setDRACOLoader(dracoLoader)
  })
  return (
    <>
      <primitive object={model.scene} scale={5} />
    </>
  )
}
function Model() {
  const model = useGLTF('../hamburger-draco.glb')
  return (
    <>
      <Clone object={model.scene} scale={0.4} />
      <Clone object={model.scene} scale={0.4} position-x={5} />
      <Clone object={model.scene} scale={0.4} position-x={-5} />
    </>
  )
}
function F4() {
  return (
    <>
      <Perf
        minimal={true}
        //   position="top-left"
      />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={3} shadow-normalBias={0.04} shadow-mapSize={[2048, 2048]} />
      <mesh receiveShadow position-y={-0.09} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <Suspense
        fallback={
          <mesh position-y={0.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
          </mesh>
        }
      >
        {/* <BigModel /> */}
        {/* <Model /> */}
        <Ham scale={0.4} />
      </Suspense>
      <Fox />
    </>
  )
}
export default function App() {
  return (
    <>
      <Canvas shadows>
        <F4 />
      </Canvas>
    </>
  )
}
