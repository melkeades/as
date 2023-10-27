import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, OrbitControls, Text } from '@react-three/drei'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 22.5] }}>
      {/* <hemisphereLight groundColor="red" /> */}
      {/* <mesh position={[0, 0, 5]}>
        <boxBufferGeometry />
        <meshStandardMaterial />
      </mesh> */}
      <Float floatIntensity={10} rotationIntensity={4}>
        <Html occlude="blending" transform>
          <iframe title="embed" width={700} height={500} src="https://threejs.org/" />
        </Html>
      </Float>
      <Text fontSize={1} position={[2, 0.75, 0.75]}>
        qwesadf
      </Text>

      {/* <Environment background preset="dawn" blur={0.8} /> */}
      {/* <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} /> */}
      <OrbitControls />
    </Canvas>
  )
}
