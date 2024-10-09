"use client";
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Html, Image, useGLTF } from "@react-three/drei";
import { GLTF, OrbitControls } from "three-stdlib";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import TvGif from "../gifs/TvGif";
import StaticGif from "../gifs/StaticGif";
import { isMobile } from "react-device-detect";
import { getProject, types } from "@theatre/core";
import { Euler } from "three";
import { TypeAnimation } from 'react-type-animation';


type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
  };
  materials: {
    M_PSX_TV: THREE.MeshStandardMaterial;
  };
};

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor'; 


export interface tvType {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  src: string;
  onclick?: (event: ThreeEvent<MouseEvent>) => void;
  mode?: number;
  mobile?: boolean;
  idx?: number;
  camera?: React.MutableRefObject<THREE.PerspectiveCamera>;
}
function curveRemapUV(uv: THREE.Vector3)
{
    // as we near the edge of our screen apply greater distortion using a cubic function
    uv = new THREE.Vector3(uv.x * 2.0 - 1.0, uv.y * 2.0 - 1.0, 0);
    const offset = abs(uv.yx) / vec2(curvature.x, curvature.y);
    uv = uv + uv * offset * offset;
    uv = uv * 0.5 + 0.5;
    return uv;
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
}: tvType) {
  //decl
  
  const colorRef = useRef(new THREE.Color("#AAAAFF"));
  const intensityRef = useRef(20);
  const [doRender, setDoRender] = useState(false);
  

  const { nodes, materials } = useGLTF("/psx_old_tv/scene.gltf") as GLTFResult;
  const tvRef = useRef<THREE.Mesh>(null!);


  return (
    <group 
      scale={scale} 
      position={position} 
      rotation={rotation} 
      dispose={null} >
        <rectAreaLight
        intensity={intensityRef.current}
        color={colorRef.current}
        height={7.5}
        width={7.5}
        position={[0,0.1,(0.25)]}
        rotation={[Math.PI ,0, 0]}
        >
        </rectAreaLight>
      <mesh 
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
        {mode !== 0 && idx === 0 && <Html
          center
          scale={mode === 1 ? 1 : 0}
          transform
          position={new THREE.Vector3(0.004, 0.024, 0.18)}
          rotation={new Euler(0,0,0, 'XYZ')}
          distanceFactor={2}>
          <div className={`w-28 h-[6.30rem] bg-[#010a0a] text-[#93672e] flex flex-col text-sm font-ocra px-2 pt-2 pb-1`}>
          <TypeAnimation
            className='font-bold text-[0.75rem] font-ocra'
            sequence={[
            '// ABOUT ME //'
            ]}
            wrapper="span"
            cursor={false}
            speed={1}
            style={{fontSize: '0.75rem', fontFamily: 'ocra'}}
          />
          <TypeAnimation
            className="leading-[0rem]"
            sequence={[
            `> I'm a Web Developer based in Florence`,
            200,
            `> I'm a Web Developer based in Florence\n\n> My Job is to create digital Experiences`
            ]}
            wrapper="span"
            cursor={false}
            speed={50}
            style={{ fontSize: '0.5rem', fontFamily: 'ocra', whiteSpace: 'pre-line', lineHeight: "0.75rem"}}
          />
          </div>
        </Html>}
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
      </mesh>
    </group>
  );
}

useGLTF.preload("/psx_old_tv/scene.gltf");
