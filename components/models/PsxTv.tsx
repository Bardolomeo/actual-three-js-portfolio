"use client";
import * as THREE from "three";
import React, {
  useRef,
  useState,
} from "react";
import { Image, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
  };
  materials: {
    M_PSX_TV: THREE.MeshStandardMaterial;
  };
};

export interface tvType {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  src: string;
  onclick?: (event: ThreeEvent<MouseEvent>) => void;
  mode?: number;
  mobile?: boolean;
  idx?: number;
}

export default function PsxTv({
  scale,
  position,
  rotation,
  src,
  onclick,
  mode,
  mobile,
  idx
}: tvType) {
  function StaticAnimation({
    textureSrc,
    iconPosition,
    iconSize
  }: {
    textureSrc: string;
    iconPosition: THREE.Vector3;
    iconSize: [number?, number?, number?];
  }) {
    const spriteTexture = useLoader(THREE.TextureLoader, textureSrc);
    const [animator] = useState(
      () => new PlainAnimator(spriteTexture, 4, 4, 10, 20)
    );
    useFrame(() => animator.animate());
    return (
      <mesh 
      position={iconPosition} 
      rotation={[0, 0, 1.5707963268, "XYZ"]} 
      visible={(!isHover.current && mode === 0 && !mobile)}
      onPointerEnter={() => onHover()}
      onPointerLeave={() => outHover()}>
        <boxGeometry args={iconSize} />
        <meshStandardMaterial map={spriteTexture} transparent={true} />
      </mesh>
    );
  }

  function GifAnimation({
    textureSrc,
    iconPosition,
    iconSize,
  }: {
    textureSrc: string;
    iconPosition: THREE.Vector3;
    iconSize: [number?, number?, number?];
  }) {
    const spriteTexture = useLoader(THREE.TextureLoader, textureSrc);
    const [animator] = useState(
      () => new PlainAnimator(spriteTexture, 11, 12, 125, 40)
    );
    useFrame(() => animator.animate());
    return (
      <mesh position={iconPosition} rotation={[0, 0, 0, "XYZ"]}>
        <boxGeometry args={iconSize} />
        <meshStandardMaterial map={spriteTexture} transparent={true} />
      </mesh>
    );
  }

  const [doTilt, setDoTilt] = useState(false);
  const [doRender, setDoRender] = useState(false);
  const colorRef = useRef(new THREE.Color('#AAAAAA'));
  const intensityRef = useRef(1);
  const isHover = useRef(false);

  const { nodes, materials } = useGLTF("/psx_old_tv/scene.gltf") as GLTFResult;
  const tvRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (doTilt && mode === 0) {
      tvRef.current.rotateZ(-0.2);
      setTimeout(() => {
        tvRef.current.rotateZ(0.2);
      }, 50);
      setDoTilt(false);
    }
  });

  function onHover()
  {
    if (mode != 0)
      return;
    isHover.current = true;
    if (idx === 0)
    {
      colorRef.current = new THREE.Color('#FFD93D');
    }
    if (idx === 1)
      colorRef.current = new THREE.Color('#FF6B6B');
    if (idx === 2)
      colorRef.current = new THREE.Color('#6BCB77');
    intensityRef.current = 3;
    setDoRender(true)
    console.log(isHover.current + ' ' + mode + ' ' + mobile)
  }

  function outHover()
  {
    colorRef.current = new THREE.Color('#AAAAAA');
    intensityRef.current = 1;
    isHover.current = false;
    setDoRender(false);
  }

  return (
    <group 
    scale={scale} 
    position={position} 
    rotation={rotation} 
    dispose={null}>
      <directionalLight intensity={intensityRef.current} color={colorRef.current}/>
      <mesh
        ref={tvRef}
        geometry={nodes.Object_4.geometry}
        material={materials.M_PSX_TV}
        position={[0, 0.251, 0]}
        scale={1}
        onClick={onclick}>
        <group>
          <StaticAnimation
            textureSrc="/static_sheet.png"
            iconPosition={new THREE.Vector3(0, 0.05, 0.24)}
            iconSize={[0.49, 0.54, 0.005]}
          />
        </group>
          <GifAnimation
            textureSrc={src}
            iconPosition={new THREE.Vector3(0, 0.05, 0.23)}
            iconSize={mode === 0 ? [0.55, 0.5, 0.005] : [0, 0, 0]}
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
      </mesh>
    </group>
  );
}

useGLTF.preload("/psx_old_tv/scene.gltf");
