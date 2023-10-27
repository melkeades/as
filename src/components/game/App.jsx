import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Canvas } from '@react-three/fiber'
import Lights from './Lights'
import Level from './Level'

export default function App() {
  return (
    <Canvas
      shadows
      // camera={{
      //   fov: 45,
      //   near: 0.1,
      //   far: 200,
      //   position: [4, 2, 6],
      // }}
    >
      <OrbitControls />
      <Physics debug={true}>
        <Level />
        <Lights />
      </Physics>
    </Canvas>
  )
}
