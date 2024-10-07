import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { editable as e} from '@theatre/r3f'
import { sofa } from '@/constants'

type GLTFResult = GLTF & {
  nodes: {
    Cilindro011_Materiais_0: THREE.Mesh
  }
  materials: {
    Materiais: THREE.MeshStandardMaterial
  }
}

export function Sofa(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/sofa/scene.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={16.027}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cilindro011_Materiais_0.geometry}
            material={materials.Materiais}
            position={sofa.position}
            rotation={sofa.rotation}
            scale={sofa.scale}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/sofa/scene.gltf')