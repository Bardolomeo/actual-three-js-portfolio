"use client";
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame, useLoader } from '@react-three/fiber'
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"


type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
  }
  materials: {
    M_PSX_TV: THREE.MeshStandardMaterial
  }
}


export default function PsxTv({scale, position, rotation, src} : {scale: number; position: THREE.Vector3; rotation: THREE.Euler; src: string}) {
  
  function StaticAnimation({textureSrc, iconPosition, iconSize}: { textureSrc: string; iconPosition: THREE.Vector3; iconSize: [number?, number?, number?]; })
  {
    const spriteTexture = useLoader(THREE.TextureLoader, textureSrc);
    const [animator] = useState(() => new PlainAnimator(spriteTexture, 4, 4, 10,20)); 
    useFrame(() => animator.animate())
    return (
      <mesh position={iconPosition} rotation={[0,0,1.5707963268, 'XYZ']}>
        <boxGeometry args={iconSize} />
        <meshStandardMaterial map={spriteTexture} transparent={true} />
      </mesh>
    )
  }
  
  function GifAnimation({textureSrc, iconPosition, iconSize}: { textureSrc: string; iconPosition: THREE.Vector3; iconSize: [number?, number?, number?]; })
  {
    const spriteTexture = useLoader(THREE.TextureLoader, textureSrc);
    const [animator] = useState(() => new PlainAnimator(spriteTexture, 11, 12, 125, 25)); 
    useFrame(() => animator.animate())
    return (
      <mesh position={iconPosition} rotation={[0,0,0, 'XYZ']}>
        <boxGeometry args={iconSize} />
        <meshStandardMaterial map={spriteTexture} transparent={true}/>
      </mesh>
    )
  }
  
  const [doTilt, setDoTilt] = useState(false);
  const [isHover, setIsHover] = useState(false);

  function toggleHoverOver(){
    setIsHover(true);
    setDoTilt(true);
  }

  function toggleHoverOut(){
    setIsHover(false);
  }

  const { nodes, materials } = useGLTF('/psx_old_tv/scene.gltf') as GLTFResult
  const tvRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (doTilt){
      tvRef.current.rotateZ(-0.2)
      setTimeout(() => {tvRef.current.rotateZ(0.2)}, 50)
      setDoTilt(false);
    }
  })

  return (
    <group scale={scale} position={position} rotation={rotation} dispose={null}>
      <mesh
        ref={tvRef}
        geometry={nodes.Object_4.geometry}
        material={materials.M_PSX_TV}
        position={[0, 0.251, 0]}
        onPointerOver={toggleHoverOver}
        onPointerOut={toggleHoverOut}
        scale={!isHover ? 1 : 1.1}
      >
        <StaticAnimation textureSrc='/static_sheet.png' iconPosition={new THREE.Vector3(0, 0.05, !isHover ? 0.25 : 0.22)}
        iconSize={[0.5, 0.55, 0.005]}/>
        <GifAnimation textureSrc={src} iconPosition={new THREE.Vector3(0, 0.05, 0.23)}
        iconSize={[0.55, 0.5, 0.005]}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/psx_old_tv/scene.gltf')