import { OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'

const PortMat = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#fff'),
    uColorEnd: new THREE.Color('#000'),
  },
  portalVertexShader,
  portalFragmentShader
)
// extend({ PortMat: PortMat }) // same as below
extend({ PortMat })
console.log(PortMat)

function Mod() {
  const { nodes } = useGLTF('../model/portal.glb')
  const bTex = useTexture('../model/baked.jpg')
  // bTex.flipY = false

  const portRef = useRef()
  useFrame((state, delta) => {
    portRef.current.uTime += delta
  })

  return (
    <>
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bTex} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
        <meshBasicMaterial color="#ffa" />
      </mesh>
      <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
        <meshBasicMaterial color="#ffa" />
      </mesh>
      <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
        {/* lower case here "portMat" */}
        <portMat ref={portRef} />
        {/* <shaderMaterial
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color('#fff') },
            uColorEnd: { value: new THREE.Color('#000') },
          }}
        /> */}
      </mesh>
      <Sparkles size={1} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
    </>
  )
}
export default function App() {
  return (
    // flat to address the tone mapping
    <Canvas flat>
      <OrbitControls makeDefault />
      <color args={['#223']} attach={'background'} />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      <Mod />
    </Canvas>
  )
}
