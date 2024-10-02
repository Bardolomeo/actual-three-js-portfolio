"use client";
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Image, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import TvGif from "../gifs/TvGif";
import StaticGif from "../gifs/StaticGif";
import { isMobile } from "react-device-detect";
import studio from '@theatre/studio'
import { getProject, types } from "@theatre/core";
studio.initialize();
import extension from '@theatre/r3f/dist/extension';
studio.extend(extension);
import { SheetProvider, editable as e, } from '@theatre/r3f';


type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
  };
  materials: {
    M_PSX_TV: THREE.MeshStandardMaterial;
  };
};

const LOWLIGHT = 1;

export interface tvType {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  src: string;
  onclick?: (event: ThreeEvent<MouseEvent>) => void;
  mode?: number;
  mobile?: boolean;
  idx?: number;
  camera: React.MutableRefObject<THREE.PerspectiveCamera>;
}

export default function PsxTv({
  //def
  scale,
  position,
  rotation,
  src,
  onclick,
  mode,
  mobile,
  idx,
  camera
}: tvType) {
  //decl
  
  const demoSheet = getProject('Demo Project').sheet('Demo Sheet');
  
  const colorRef = useRef(new THREE.Color("#AAAAAA"));
  const intensityRef = useRef(LOWLIGHT);
  const [doRender, setDoRender] = useState(false);
  
  const { nodes, materials } = useGLTF("/psx_old_tv/scene.gltf") as GLTFResult;
  const tvRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (isMobile)
      camera.current.position.z = 45;
  })

  return (
    <group 
      scale={scale} 
      position={position} 
      rotation={rotation} 
      dispose={null} >
        <directionalLight
        intensity={intensityRef.current}
        color={colorRef.current}
        position={(idx === 0 ? [0, 0, 0] : [0, -0.15, -0.15])}
        rotation={[0, 0, 0]}/>
      <SheetProvider sheet={demoSheet}>
      <e.mesh theatreKey="aaaaaaa"
        ref={tvRef}
        geometry={nodes.Object_4.geometry}
        material={materials.M_PSX_TV}
        position={[0, 0.251, 0]}
        scale={1}
        onClick={onclick}
      >
        <group>
          <StaticGif
            textureSrc="/static_sheet.png"
            iconPosition={new THREE.Vector3(0, 0.05, 0.24)}
            iconSize={[0.51, 0.54, 0.005]}
            mode={mode}
            idx={idx}
            mobile={mobile}
            colorRef={colorRef}
            intensityRef={intensityRef}
          />
          <mesh 
            geometry={new THREE.BoxGeometry(0.5, 0.5, 0.00001)}
            material={new THREE.MeshBasicMaterial({visible: false})}
            position={[0,0.045,0.24]}
            onPointerEnter={() => setDoRender(!doRender)}
            onPointerLeave={() => setDoRender(!doRender)}
          />
        </group>
        <TvGif
          textureSrc={src}
          iconPosition={new THREE.Vector3(0, 0.05, 0.23)}
          iconSize={mode === 0 ? [0.55, 0.5, 0.005] : [0, 0, 0]}
          idx={idx}
          />
        <Image
          url="/shadow-gun.jpeg"
          scale={mode === 1 ? 0.55 : 0}
          position={new THREE.Vector3(0, 0.03, 0.24)}
          />
        <Image
          url="/shadow-edge.png"
          scale={mode === 2 ? 0.52 : 0}
          position={new THREE.Vector3(0, 0, 0.24)}
          />
        <Image
          url="/shadow-old-tv.png"
          scale={mode === 3 ? 0.54 : 0}
          position={new THREE.Vector3(0, 0.043, 0.24)}
          />
      </e.mesh>
      </SheetProvider>
    </group>
  );
}

useGLTF.preload("/psx_old_tv/scene.gltf");
