import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {editable as e} from '@theatre/r3f'
import { walls } from '@/constants'

type GLTFResult = GLTF & {
  nodes: {
    rug_04: THREE.Mesh
    rug_03: THREE.Mesh
    rug_02: THREE.Mesh
    rug_01: THREE.Mesh
    round_rug_03: THREE.Mesh
    round_rug_02: THREE.Mesh
    round_rug_01: THREE.Mesh
    Plane: THREE.Mesh
  }
  materials: {
    rug_04: THREE.MeshStandardMaterial
    rug_03: THREE.MeshStandardMaterial
    rug_02: THREE.MeshStandardMaterial
    rug_01: THREE.MeshStandardMaterial
    round_rug_03: THREE.MeshStandardMaterial
    round_rug_02: THREE.MeshStandardMaterial
    round_rug_01: THREE.MeshStandardMaterial
  }
}

export function Walls(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/shapespark_rugs-set.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      {walls.map((wall) => <e.mesh
	  	  key={wall.id}
        theatreKey={`wall_${wall.id}`}
        castShadow
        receiveShadow
        geometry={nodes.rug_02.geometry}
        material={materials.rug_02}
        position={wall.position}
        rotation={wall.rotation}
        scale={wall.scale}
      />)}
    </group>
  )
}

useGLTF.preload('/shapespark_rugs-set.gltf')