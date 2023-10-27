import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function CusObj() {
  const vertCount = 10 * 3 // each triangle has 3 verts
  const geoRef = useRef()
  // calc verts only once
  const pos = useMemo(() => {
    const pos = new Float32Array(vertCount * 3) // each vert has a 3d position
    for (let i = 0; i < vertCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 3
    }
    return pos
  }, [])
  // wait for geo to render and calc normals after
  useEffect(() => {
    // console.log(geoRef.current)
    geoRef.current.computeVertexNormals()
  }, [])
  //   console.log(pos)
  return (
    <mesh>
      <bufferGeometry ref={geoRef}>
        {/* same as geometry.attribute.position */}
        <bufferAttribute attach="attributes-position" count={vertCount} itemSize={3} array={pos} />
      </bufferGeometry>
      <meshStandardMaterial side={THREE.DoubleSide} />
    </mesh>
  )
}
