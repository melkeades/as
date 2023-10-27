import { useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Exp from './f1_Exp'

export default function App() {
  return (
    <Canvas
      // flat
      // dpr={[1, 2]} // default fiber clamp pixel ration from 1 to 2
      gl={{
        antialias: false,
        // noteMapping: THREE.CineonToneMapping,
        // outputColorSpace: THREE.LinearEncoding,
      }}
      // orthographic
      camera={{ fov: 45, near: 0.1, far: 200, zoom: 1, position: [3, 2, 6] }}
    >
      <Exp />
    </Canvas>
  )
}
