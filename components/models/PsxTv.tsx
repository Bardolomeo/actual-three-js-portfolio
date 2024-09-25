import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
  }
  materials: {
    M_PSX_TV: THREE.MeshStandardMaterial
  }
}

export default function PsxTv(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/psx_old_tv/scene.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.M_PSX_TV}
        position={[0, 0.251, 0]}
      >
        <Image></Image>
      </mesh>
    </group>
  )
}

useGLTF.preload('/psx_old_tv/scene.gltf')