function BlockStart() {
  return (
    <mesh position={[0, -0.6, 0]} receiveShadow>
      <boxGeometry args={[8, 0.1, 8]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  )
}
export default function Level() {
  return (
    <>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <BlockStart />
    </>
  )
}
