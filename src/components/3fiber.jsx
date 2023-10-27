import { useRef, useState, useEffect, lazy, ComponentType } from 'react'
// import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  // const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      // ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function Clicker({ tinc, tcount, keyName }) {
  // console.log(tinc)
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName)) ?? 0)
  // update on load
  useEffect(() => {
    // const savedCount = setCount(savedCount)
    // executes on delete/first run
    return () => {
      console.log('Clicker comp deleted')
      // localStorage.removeItem('count')
      localStorage.setItem(keyName, 0)
    }
  }, [])
  // update on count change
  useEffect(() => {
    localStorage.setItem(keyName, count)
  }, [count])
  function add() {
    // rerenders the entire component (runs Clicker)
    setCount((count) => count + 1)
    // passed as a prop from the parent compo
    tinc()
  }
  function reset() {
    setCount(0)
  }
  return (
    <div>
      <button onClick={add} className="mr-2">
        {count}
      </button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default function App({ children, clickerNum }) {
  // useEffect to add event listener
  // useEffect(() => {
  //   const cont = document.getElementsByTagName('button')
  //   cont[0].addEventListener('click', (e) => {
  //     let bu = e.currentTarget.innerText
  //     const val = parseInt(bu) + 1
  //     e.currentTarget.innerText = Number.isInteger(val) ? val : '0'
  //   })
  // })
  const [vis, setVis] = useState(true)
  const [tcount, setTcount] = useState(0)
  function tinc() {
    setTcount((tcount) => tcount + 1)
  }
  function toggleVis() {
    setVis(!vis)
  }
  clickerNum = parseInt(clickerNum)
  return (
    // createRoot(document.getElementById('app')).render(
    // <Canvas>
    <div>
      {children}
      <button onClick={toggleVis} className="mb-2">
        toggle
      </button>
      {/* same as {vis ? <Clicker /> : null} */}
      {vis && (
        <div className="flex gap-5 ">
          {[...Array(clickerNum)].map((val, ind) => (
            <Clicker key={ind} tcount={tcount} tinc={tinc} keyName={'ind' + ind} />
          ))}
        </div>
      )}
      <div className="m-10">{tcount}</div>

      <Canvas>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />

        <OrbitControls />
      </Canvas>
    </div>
  )
  // )
}
