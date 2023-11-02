import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PresentationControls, OrbitControls, Loader, PointerLockControls, BBAnchor, Html } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import loading from '../images/loading.gif'
let global = {}

function Load() {
  let [display, setDisplay] = useState(false)
  global.setDisplay = setDisplay
  return <div className='loader'
    style={{ display: !display ? 'block' : 'none', background: '#5D5B41', position: 'absolute', zIndex: '100', left: 0, height: 0, width: "100%", height: "100vh" }}>
    <h1 style={{ color: 'white', textAlign: 'center', marginTop: '2' }}>Loading...</h1>
    <img src={loading}></img>
  </div>
}

function Scene1() {
  const gltf = useLoader(GLTFLoader, '/master.glb', loader => {
    loader.manager.onLoad = () => { global.setDisplay(true) }
  })
  gltf.scene.children.forEach((mesh, i) => {
    mesh.castShadow = true;
  })
  gltf.castShadow = true;
  gltf.scene.castShadow = true;
  return (
    <primitive object={gltf.scene} />
  );
}

const Annotation = (props) => {

  let { vars, found, position } = props
  vars = vars.vars
  if (!vars)
    return
  console.log(vars)
  return (
    <Html distanceFactor={1} occlude rotation={[0, 0, Math.PI / 4]} position={[position[0], position[1] + 0.5, position[2]]}>
      <div style={vars.style}>
        <h1>{vars.name}</h1>
        <div style={
          {
            display: "flex",
            "flex-direction": "column",
            gap: '11px'
          }
        }>
          {
            vars.options.map((e) => {
              return <span>{e}</span>
            })
          }
        </div>
      </div>
    </Html>
  )
};
function BoxScene(props) {
  let [cameraPosition, setCameraPosition] = useState([0, 5, 20])
  let [object, setObject] = useState({ object: '', position: [0, 5, 20] })
  console.log(object.position)
  return (
    <>

      <Load />
      {/* <div className='main text-center' style={{ height: "100vh" }}> */}
      <div className='main text-center' style={{ height: "100vh" }}>
        {/* <Canvas shadows flat dpr={[1, 2]} camera={{ zoom: 1, fov: 25, position: object.position }}> */}
        <Canvas shadows flat dpr={[1, 2]} camera={{ zoom: 1, fov: 25, position: object.position }} style={{ height: "100%" }}>
          <ambientLight intensity={0.8} />
          <color attach="background" args={['#00ADB5']} />
          <directionalLight position={[64.19672, 11.82403, 11.82403]} intensity={3} color="yellow" />
          <OrbitControls makeDefault />
          <group onClick={(e) => {
            console.log(e.object.name);


          }

          } scale={0.08}>
            <Scene1></Scene1>
          </group>
          <Annotation vars={object.object ?? false} position={object.position} />

        </Canvas>
      </div>
    </>
  )
}

export default BoxScene