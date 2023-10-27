import { OrbitControls, meshBounds, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import { Physics, RigidBody, CuboidCollider, CylinderCollider, InstancedRigidBodies } from '@react-three/rapier'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'

function Mod() {
  const cubesNum = 2000
  const cubesInts = useMemo(() => {
    const inst = []
    const sc = 0.5
    for (let i = 0; i < cubesNum; i++) {
      inst.push({
        key: 'inst_' + i,
        position: [(Math.random() - 0.5) * 10, 6 + i * 0.1, (Math.random() - 0.5) * 10],
        rotation: [Math.random(), Math.random(), Math.random()],
        scale: [Math.random() * sc, Math.random() * sc, Math.random() * sc],
      })
    }
    return inst
  })
  const [hitSound] = useState(() => new Audio('../public/hit.mp3'))

  const ham = useGLTF('../public/hamburger.glb')
  const cube = useRef()
  const torus = useRef()
  const twister = useRef()
  const cubeJump = () => {
    console.log('f', torus.current.mass())
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 })
    cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: 0 })
  }
  const onCollision = () => {
    console.log('col')
    hitSound.currentTime = 0
    // hitSound.volume = Math.random() - 0.5
    hitSound.play()
  }
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const eulerRotation = new THREE.Euler(0, time, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    twister.current.setNextKinematicRotation(quaternionRotation)

    const angle = time * 0.5
    const x = Math.cos(angle) * 2
    const z = Math.sin(angle) * 2
    twister.current.setNextKinematicTranslation({ x: x, y: -1.5, z: z })
  })
  const sc = 0.3
  return (
    <>
      <Physics debug={false} gravity={[0, -9.08, 0]}>
        <RigidBody
          position={[1, 1.3, 2]}
          // type="fixed"
          colliders={false}
          // colliders="hull"
        >
          <CylinderCollider args={[0.7, 1.5]} position={[0, 0.8, 0]} />
          <primitive object={ham.scene} castShadow scale={0.3} />
        </RigidBody>
        <InstancedRigidBodies instances={cubesInts}>
          <instancedMesh castShadow receiveShadow args={[null, null, cubesNum]}>
            <boxGeometry />
            <meshStandardMaterial />
          </instancedMesh>
        </InstancedRigidBodies>
        {/* {[...Array(1000)].map((e) => (
          <RigidBody>
            <mesh position={[Math.random() * 10, Math.random() * 20, Math.random() * 10]} scale={[Math.random() * sc, Math.random() * sc, Math.random() * sc]}>
              <boxGeometry />
              <meshStandardMaterial color={`rgb(${Math.random() * 255} ,${Math.random() * 255} ,${Math.random() * 255})`} />
            </mesh>
          </RigidBody>
        ))} */}
        <RigidBody colliders="ball">
          <mesh castShadow position={[0.5, 2, 0]}>
            <sphereGeometry args={[0.7, 64, 64]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody ref={cube} restitution={0.5} friction={0.5}>
          <mesh onClick={cubeJump} castShadow position={[0, -1, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="mediumPurple" />
          </mesh>
          <mesh castShadow position={[1, 1, 0]} scale={0.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumPurple" />
          </mesh>
        </RigidBody>
        <RigidBody ref={torus} type="fixed" colliders={false} position={[0, 1, 0]} rotation-x={1.57}>
          <CuboidCollider mass={0.5} args={[1, 1, 0.3]} />
          <mesh>
            <torusGeometry args={[1, 0.3, 16, 16]} />
            <meshStandardMaterial color="royalblue" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" restitution={0.5} receiveShadow rotation-x={-Math.PI * 0.5} position={[0, -5, 0]}>
          <mesh>
            {/* <planeGeometry args={[100, 100, 1, 1]} /> */}
            <boxGeometry args={[100, 100, 4]} />
            <meshStandardMaterial color="grey" />
          </mesh>
        </RigidBody>
        <RigidBody ref={twister} type="kinematicPosition" friction={0} position={[0, -1, 0]} onCollisionEnter={onCollision}>
          <mesh scale={[0.1, 0.1, 5]} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}
export default function App() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 2, 6],
      }}
    >
      <OrbitControls makeDefault />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 2, 3]} intensity={2} castShadow />
      <Perf minimal={true} />
      <Mod />
    </Canvas>
  )
}
