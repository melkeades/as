import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // for studying purpose
import CusObj from './f1_Exp_CusObj'

// extend({ OrbC: OrbitControls }) //long version
extend({ OrbitControls })

export default function Exp() {
  const boxRef = useRef()
  const groupRef = useRef()
  const { camera, gl } = useThree()
  useFrame((state, delta) => {
    // const angle = state.clock.elapsedTime / 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.lookAt(0, 0, 0)

    boxRef.current.rotation.y += delta / 2
    groupRef.current.rotation.y += delta / 5
  })
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={3.1} />
      <ambientLight />

      <CusObj />
      <group ref={groupRef}>
        <mesh scale={1.5} position={[2, 0, 0]} ref={boxRef} rotation-y={Math.PI * 0.1}>
          <boxGeometry />
          {/* <meshBasicMaterial args={[{ color: 'mediumpurple', wireframe: true }]} /> */}
          <meshStandardMaterial color={'mediumpurple'} />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" wireframe />
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={[30, 15, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}
