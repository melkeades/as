import { OrbitControls, meshBounds, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, SSAO } from '@react-three/postprocessing'
import { useRef, useState } from 'react'
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'

function Mod() {
  const l = 'qwe'
  const ham = useGLTF('../hamburger.glb')
  const boxRef = useRef()
  const [boxClicked, boxClick] = useState(false)
  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta * 0.1
  })
  const normColor = '#f99'
  const clickColor = '#ff9'
  function toggleClick(e) {
    e.stopPropagation()
    boxClick(!boxClicked)
  }
  function ss() {
    boxRef.current.material.color.set(`hsl(${Math.random() * 360},75%,75%)`)
  }
  // occlusion
  function sf(e) {
    e.stopPropagation()
  }
  return (
    <>
      <EffectComposer multisampling={4}>
        <Vignette />

        <Bloom
          // intensity={1.0} // The bloom intensity.
          // blurPass={undefined} // A blur pass.
          // kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
          // // luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur // Enables or disables mipmap blur.
          // resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          // resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
        <SSAO />
      </EffectComposer>
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <directionalLight castShadow position={[1, 2, 3]} />
      <color args={['#333']} attach={'background'} />
      <mesh
        castShadow
        raycast={meshBounds} // to address the performance issue for events
        ref={boxRef}
        position-x={2}
        scale={1.5}
        onClick={() => boxClick(!boxClicked)}
        onPointerEnter={(e) => (document.body.style.cursor = 'pointer')}
        onPointerLeave={(e) => (document.body.style.cursor = 'default')}
      >
        <boxGeometry />
        <meshStandardMaterial color={boxClicked ? normColor : clickColor} />
      </mesh>
      <mesh castShadow receiveShadow position-x={-2} onClick={sf}>
        <sphereGeometry />
        <meshBasicMaterial color={[0.5, 0.5, 2.9]} toneMapped={false} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI * 0.5} position-y={-1.1} onClick={ss}>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>
      <primitive
        castShadow
        receiveShadow
        object={ham.scene}
        scale={0.2}
        position={[0, 2, 0]}
        onClick={(e) => {
          e.stopPropagation()
          console.log(e.object.name)
        }}
      />
    </>
  )
}
export default function App() {
  const boxRef = useRef()
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
      <Mod />
    </Canvas>
  )
}
