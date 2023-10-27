import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// alt proxy/caching technic to useState
const torRef = new THREE.TorusGeometry(2, 1, 16, 32)
const matRef = new THREE.MeshMatcapMaterial()

function Mod() {
  const [mcMat] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  // alt proxy/caching technic to useState
  useEffect(() => {
    mcMat.colorSpace = THREE.SRGBColorSpace
    mcMat.needsUpdate = true
    matRef.matcap = mcMat
    matRef.needsUpdate = true
  }, [])

  // const torGroupRef = useRef()
  //atl to^^ group useRef
  const tors = useRef([])

  useFrame((state, delta) => {
    // for (const tor of torGroupRef.current.children) {
    for (const tor of tors.current) {
      tor.rotation.y += delta * 0.2
    }
  })

  //   const [torRef, torSet] = useState()
  //   const [matRef, matSet] = useState()

  // ref={torSet} here is the same as: torSet( <torusGeometry args={[2, 1, 16, 32]} /> )
  return (
    <>
      {/* <torusGeometry ref={torSet} args={[2, 1, 16, 32]} />
      <meshMatcapMaterial ref={matSet} matcap={mcMat} /> */}

      <Perf minimal={true} />
      {/* <ambientLight intensity={1} /> */}
      <OrbitControls />
      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      {/* center the anchor */}
      <Center>
        <Text3D
          //   http://gero3.github.io/facetype.js/
          font={'../fonts/helvetiker_regular.typeface.json'}
          material={matRef}
          size={2.75}
          height={0.4}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          YO mofo
          {/* <meshMatcapMaterial matcap={mcMat} /> */}
        </Text3D>
      </Center>
      {/* <group ref={torGroupRef}> */}
      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(el) => {
            tors.current[index] = el
          }}
          geometry={torRef}
          material={matRef}
          key={'don' + index}
          position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        />
      ))}
      {/* </group> */}
    </>
  )
}
export default function App() {
  return (
    <Canvas>
      <Mod />
    </Canvas>
  )
}
