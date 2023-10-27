import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PI_2 = Math.PI / 2
export const Camera = ({ position }) => {
  const { camera, gl } = useThree()
  const previousEvent = useRef()
  const dragging = useRef(false)
  const yawObject = useRef(new THREE.Object3D())
  const pitchObject = useRef(new THREE.Object3D())

  useEffect(() => {
    camera.rotation.set(0, 0, 0)
  }, [camera])

  useEffect(() => {
    yawObject.current.add(pitchObject.current)
    function mouseDown(event) {
      dragging.current = true
      previousEvent.current = event
    }

    function mouseMove(event) {
      if (dragging.current && previousEvent.current) {
        const movementX = event.screenX - previousEvent.current.screenX
        const movementY = event.screenY - previousEvent.current.screenY
        const direction = -1
        yawObject.current.rotation.y += movementX * 0.002 * direction
        pitchObject.current.rotation.x += movementY * 0.002 * direction
        pitchObject.current.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.current.rotation.x))
      }

      previousEvent.current = event
    }
    function mouseUp() {
      previousEvent.current = undefined
      dragging.current = false
    }
    gl.domElement.addEventListener('mousedown', mouseDown, false)
    gl.domElement.addEventListener('mousemove', mouseMove, false)
    gl.domElement.addEventListener('mouseup', mouseUp, false)

    return () => {
      gl.domElement.removeEventListener('mousedown', mouseDown)
      gl.domElement.removeEventListener('mousemove', mouseMove)
      gl.domElement.removeEventListener('mouseup', mouseUp)
    }
  }, [gl.domElement])

  //   useFrame(() => {
  //     camera.rotation.x = pitchObject.current.rotation.x
  //     camera.rotation.y = yawObject.current.rotation.y
  //   })

  return <PlayerCamera position={position} />
}

const PlayerCamera = ({ position }) => {
  const { size, set } = useThree()

  const [camera] = useState(() => {
    // const cam = new THREE.Camera(75, 0.1, 1000, [0, 0, 5])
    const cam = new THREE.PerspectiveCamera(80, size.width / size.height, 0.005, 10000)
    cam.position.set(...position)
    cam.rotation.set(0, 0, 0)
    set(cam)
    return cam
  })

  useEffect(() => {
    camera.aspect = size.width / size.height
  }, [size, camera])

  return <primitive object={camera} />
}

// function CustomCamera({ position }) {
//   const cameraRef = useRef()
//   const set = useThree(({ set }) => set)
//   const size = useThree(({ size }) => size)

//   useLayoutEffect(() => {
//     if (cameraRef.current) {
//       cameraRef.current.aspect = size.width / size.height
//       cameraRef.current.updateProjectionMatrix()
//     }
//   }, [size, position])

//   useLayoutEffect(() => {
//     set({ camera: cameraRef.current })
//   }, [])

//   return <perspectiveCamera ref={cameraRef} />
// }
