import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { editable as e } from '@theatre/r3f'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshPhysicalMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    material_0: THREE.MeshStandardMaterial
  }
}

export function FramedImage(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/framed_image/scene.gltf') as GLTFResult
  return (
    <group 
	{...props} 
	dispose={null}
	position={[-6.36, 8.22, -14.133]}
	rotation={[-1.452,-1.285,-3]}
	scale={1.8}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials['Material.002']}
        position={[0, -0.072, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        material={materials.material_0}
        position={[0, -0.072, 0]}
      />
    </group>
  )
}

useGLTF.preload('/framed_image/scene.gltf')