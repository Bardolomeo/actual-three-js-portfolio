"use client";
import * as THREE from "three";
import React, {
  MutableRefObject,
  Ref,
  RefObject,
  useRef,
  useState,
} from "react";
import { Image, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";
import { SheetProvider } from "@theatre/r3f";

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
    iconSize,
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
      <mesh position={iconPosition} rotation={[0, 0, 1.5707963268, "XYZ"]}>
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
      () => new PlainAnimator(spriteTexture, 11, 12, 125, 25)
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
  const [isHover, setIsHover] = useState(false);
  const [colorState, setColorState] = useState(new THREE.Color('#4D96FF'));
  const [intensityState, setIntensity] = useState(1);

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
    setIsHover(true); 
    if (idx === 0)
    {
      setColorState(new THREE.Color('#FFD93D'));
    }
    if (idx === 1)
      setColorState(new THREE.Color('#FF6B6B'));
    if (idx === 2)
      setColorState(new THREE.Color('#6BCB77'));
    setIntensity(3);
  }

  function outHover()
  {
    setIsHover(false);
    setColorState(new THREE.Color('#4D96FF'));
    setIntensity(1);
  }

  return (
    <group scale={scale} position={position} rotation={rotation} dispose={null}>
      <directionalLight intensity={intensityState} color={colorState}/>
      <mesh
        onPointerEnter={() => onHover()}
        onPointerLeave={() => outHover()}
        ref={tvRef}
        geometry={nodes.Object_4.geometry}
        material={materials.M_PSX_TV}
        position={[0, 0.251, 0]}
        scale={1}
        onClick={onclick}
      >
        <StaticAnimation
          textureSrc="/static_sheet.png"
          iconPosition={new THREE.Vector3(0, 0.05, 0.24)}
          iconSize={(!isHover && mode === 0 && !mobile) ? [0.5, 0.55, 0.005] : [0, 0, 0]}
        />
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
