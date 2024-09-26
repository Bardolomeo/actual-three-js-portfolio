import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    VendingMachine_01_VendingMachine_01_0: THREE.Mesh
    VendingGlass_01_VendingGlass_01_0: THREE.Mesh
  }
  materials: {
    VendingMachine_01: THREE.MeshStandardMaterial
    VendingGlass_01: THREE.MeshPhysicalMaterial
  }
}

export default function VendingMachine(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/vending_machine/scene.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VendingMachine_01_VendingMachine_01_0.geometry}
          material={materials.VendingMachine_01}
          position={[-455.347, -0.17, 299.104]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VendingGlass_01_VendingGlass_01_0.geometry}
          material={materials.VendingGlass_01}
          position={[-466.103, 127.796, 322.424]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/vending_machine/scene.gltf')