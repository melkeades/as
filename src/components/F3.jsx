import {
  Stage,
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  Sky,
  SoftShadows,
  useHelper,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

// had to move the light into a separate component in order to add the helper
function Hel() {
  const boxRef = useRef()
  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta / 5
    boxRef.current.position.x = Math.cos(state.clock.elapsedTime) + 2
  })
  const dirLightRef = useRef()
  useHelper(dirLightRef, THREE.DirectionalLightHelper, 1)

  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#000000',
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  })
  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] },
  })
  return (
    <>
      <Environment
        background
        resolution={128}
        preset="sunset"
        ground={{ height: 7, radius: 28, scale: 100 }}
        // files={
        //   '../the_sky_is_on_fire_2k.hdr'
        //     [ '../environmentMaps/2/px.jpg',
        //   '../environmentMaps/2/nx.jpg',
        //   '../environmentMaps/2/py.jpg',
        //   '../environmentMaps/2/ny.jpg',
        //   '../environmentMaps/2/pz.jpg',
        //   '../environmentMaps/2/nz.jpg', ]
        // }
      >
        {/* <Lightformer position-z={-5} scale={10} color={'red'} intensity={5} form={'ring'} /> */}
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
        <color args={['blue']} attach={'background'} />
      </Environment>
      {/* <BakeShadows />
      <SoftShadows frustum={3.73} size={50} near={9.5} samples={17} rings={11} /> */}
      {/* color is assigned to parent 'scene'  */}
      <color args={['gray']} attach={'background'} />
      <OrbitControls />
      {/* <ambientLight />
      <Sky sunPosition={sunPosition} /> */}
      {/* <AccumulativeShadows position={[0, -1.19, 0]} scale={10} opacity={0.9} frames={Infinity} temporal blend={100}>
        <RandomizedLight position={[2, 3, 3]} amount={8} radius={0.6} ambient={0.5} intensity={4} bias={0.001} />
      </AccumulativeShadows> */}

      <ContactShadows position={[0, 0, 0]} resolution={512} far={5} color={color} opacity={opacity} blur={blur} />
      {/* <directionalLight ref={dirLightRef} position={[2, 3, 3]} castShadow shadow-mapSize={[2048, 2048]} /> */}
      <mesh castShadow position={[-2, 1.1, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh> */}
      <mesh ref={boxRef} castShadow position={[2, 1, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  )
}
function MyStage() {
  return (
    <>
      <OrbitControls makeDefault />
      <Stage
        shadows={{
          type: 'contact',
          opacity: 0.2,
          blur: 0.4,
        }}
        environment={'sunset'}
        // preset={'portrait'}
        intensity={1}
      >
        <mesh position={[-2, 1.1, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={[2, 1, 0]}>
          <boxGeometry args={[2, 1, 2]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh position-y={-0.01} rotation-x={-Math.PI * 0.5}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </Stage>
    </>
  )
}

export default function App() {
  //   const created = (state.gl) => {
  const created = ({ gl }) => {
    // gl.setClearColor('#ff3333', 1)
  }
  return (
    <Canvas
    //   shadows
    //  onCreated={created}
    >
      {/* <Hel /> */}
      <MyStage />
    </Canvas>
  )
}
