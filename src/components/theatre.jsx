// import { useMemo, useState } from '@astrojs/react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { getProject } from '@theatre/core'
// import studio from '@theatre/studio'
// import extension from '@theatre/r3f/dist/extension'
// import { SheetProvider } from '@theatre/r3f'

studio.initialize()
// studio.extend(extension)

// const demoSheet = getProject('Demo Project').sheet('Demo Sheet')
export default function App() {
  return (
    <Canvas
      camera={{
        position: [5, 5, -5],
        fov: 75,
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  )
}
