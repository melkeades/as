import { Text, Html, OrbitControls, PivotControls, TransformControls, Float, MeshReflectorMaterial } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'

export default function App() {
  const boxRef = useRef()
  const sphereRef = useRef()
  return (
    <Canvas>
      <OrbitControls
        makeDefault // to disable on TransfromControls
        //   enableDamping={false}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={(2, 3, 4)} />
      <TransformControls object={boxRef} />
      <mesh position-x={1} ref={boxRef}>
        <boxGeometry args={[3, 2, 1]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        //   scale={80} fixed={true}
      >
        <mesh ref={sphereRef} position-x={-3}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html position={[1, 1, 0]} wrapperClass="canvasHtml1" distanceFactor={5} occlude={[sphereRef, boxRef]}>
            text👍
          </Html>
        </mesh>
      </PivotControls>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1}>
        <planeGeometry args={[15, 10]} />
        {/* <meshStandardMaterial color="gray" /> */}
        <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.7} color="gray" />
      </mesh>
      <Float>
        <Text
          position={[0, 0, 2]}
          //   font="./some.woff" // public folder
          fontSize={2}
          color={'salmon'}
          maxWidth={2}
          textAlign="center"
        >
          Text
        </Text>
      </Float>
    </Canvas>
  )
}
