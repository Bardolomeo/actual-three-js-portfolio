import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";
import * as THREE from "three";

const LOWLIGHT = 20;
const STRONGLIGHT = 30;

function StaticGif({
  textureSrc,
  iconPosition,
  iconSize,
  mode,
  mobile,
  colorRef,
  intensityRef,
  idx,
}: {
  textureSrc: string;
  iconPosition: THREE.Vector3;
  iconSize: [number?, number?, number?];
  mode?: number;
  mobile?: boolean;
  colorRef: React.MutableRefObject<THREE.Color>;
  intensityRef: React.MutableRefObject<number>;
  idx?: number;
}) {
  const isHover = useRef(-1);
  const spriteTexture = useLoader(THREE.TextureLoader, textureSrc);
  const [animator] = useState(
    () => new PlainAnimator(spriteTexture, 4, 4, 10, 20)
  );
  useFrame(() => animator.animate());

  function onHover() {
    if (mode != 0) return;
    if (idx === 0) {
      colorRef.current = new THREE.Color("#FFD93D");
      isHover.current = idx;
    }
    if (idx === 1){
      colorRef.current = new THREE.Color("#FF6B6B");
      isHover.current = idx;
    }
    if (idx === 2) {
      colorRef.current = new THREE.Color("#6BCB77");
      isHover.current = idx;
    }
    intensityRef.current = STRONGLIGHT;
  }

  function outHover() {
    colorRef.current = new THREE.Color("#AAAAFF");
    intensityRef.current = LOWLIGHT;
    isHover.current = -1;
  }

  return (
    <mesh
      position={iconPosition}
      rotation={[0, 0, 1.5707963268, "XYZ"]}
      visible={isHover.current === -1 && mode === 0 && !mobile}
      onPointerMove={() => onHover()}
      onPointerLeave={() => outHover()}
    >
      <boxGeometry args={iconSize} />
      <meshStandardMaterial map={spriteTexture} transparent={true} />
    </mesh>
  );
}

export default StaticGif;
