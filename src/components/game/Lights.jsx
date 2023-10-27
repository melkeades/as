export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[1, 2, 3]} castShadow />
    </>
  )
}
