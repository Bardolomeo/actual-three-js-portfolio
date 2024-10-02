import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";

function TvGif({
  textureSrc,
  iconPosition,
  iconSize,
  idx,
}: {
  textureSrc: string;
  iconPosition: THREE.Vector3;
  iconSize: [number?, number?, number?];
  idx?: number;
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

export default TvGif;
