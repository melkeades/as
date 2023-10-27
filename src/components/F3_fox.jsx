import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Fox() {
  const fox = useGLTF('../Fox/glTF/Fox.gltf')
  const ani = useAnimations(fox.animations, fox.scene)
  console.log(fox)

  // play when the component is loaded
  useEffect(() => {
    const run = ani.actions.Run
    const walk = ani.actions.Walk
    run.fadeIn(1).play()
    setTimeout(() => {
      //   walk.play()
      //   run.reset().play()
      walk.crossFadeFrom(run, 3).play()
    }, 2000)
  }, [])
  return <primitive object={fox.scene} scale={0.02} position={[-3.5, 0, 0]} rotation-y={0.3} />
}
