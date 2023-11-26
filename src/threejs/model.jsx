import { createRoot } from 'react-dom/client'; // this function used to create root level render tree for react components
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'; // provide react renderer for three.js 
import { PresentationControls, OrbitControls, Loader, PointerLockControls, BBAnchor, Html } from '@react-three/drei'; // provides additional utilities and components for working with three.js in react
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
//import loading from '../images/loading.gif';
import loading from '../images/MasterPlan.jpg';
import style from './model.module.css'

let global = {};

function Load() {
  let [display, setDisplay] = useState(false);
  global.setDisplay = setDisplay;

  return (
    <div
      className="loader"
      style={{
        display: !display ? 'block' : 'none',
        background: '#5D5B41',
        position: 'absolute',
        // zIndex: '100',
        left: '10%',
        width: '100%',
        height: '100vh',
      }}
    >
      <h1
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '2',
        }}
      >
        Loading...
      </h1>
      <img
        src={loading}
        style={{
          width: '90%', // or  maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}
        alt="Loading"
      />
    </div>
  );
}

function Scene1() {
  const gltf = useLoader(GLTFLoader, '/master.glb', (loader) => {
    loader.manager.onLoad = () => {
      global.setDisplay(true);
    };
  });

  gltf.scene.children.forEach((mesh, i) => {
    mesh.castShadow = true;
  });

  gltf.castShadow = true;
  gltf.scene.castShadow = true;

  return <primitive object={gltf.scene} />;
}

const Annotation = (props) => {
  let { vars, found, position } = props;
  vars = vars.vars;
  if (!vars) return null;
  console.log(vars);

  return (
    <Html distanceFactor={1} occlude rotation={[0, 0, Math.PI / 4]} position={[position[0], position[1] + 0.5, position[2]]}>
      <div style={vars.style}>
        <h1>{vars.name}</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '11px',
          }}
        >
          {vars.options.map((e) => {
            return <span>{e}</span>;
          })}
        </div>
      </div>
    </Html>
  );
};

function BoxScene(props) {
  let [cameraPosition, setCameraPosition] = useState([0, 5, 20]);
  let [object, setObject] = useState({ object: '', position: [0, 5, 20] });
  console.log(object.position);

  return (
    <>
      <Load />

      <div className={`container ${style.container}`}>
        <div className={` ${style.content}`}>
          <Canvas
            shadows
            flat
            dpr={[1, 2]}
            camera={{ zoom: 1, fov: 25, position: object.position }}
            style={{ width: '100%', height: '88%' }}
          >
            <ambientLight intensity={0.8} />
            <color attach="background" args={['#00ADB5']} />
            <directionalLight position={[64.19672, 11.82403, 11.82403]} intensity={3} color="yellow" />
            <OrbitControls makeDefault />
            <group
              onClick={(e) => {
                console.log(e.object.name);
              }}
              scale={0.08}
            >
              <Scene1 />
            </group>
            <Annotation vars={object.object ?? false} position={object.position} />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default BoxScene;