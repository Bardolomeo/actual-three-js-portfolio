import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import PsxTv from "./models/PsxTv";
import CanvasLoader from "./CanvasLoader";
import { gifs, gifsMobile, lamp } from "@/constants";
import * as THREE from "three";
import { VscHome } from "react-icons/vsc";
import { gsap } from "gsap";
import { isMobile } from "react-device-detect";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Fridge } from "./models/Fridge";
import { Floor } from "./models/Floor";
import { OrbitControls } from "@react-three/drei";
import { SheetProvider } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { PokerRoom, Walls } from "./models/Walls";
import { Sofa } from "./models/Sofa";
import { Lamp } from "./models/Lamp";

studio.initialize();
studio.extend(extension);

gsap.registerPlugin(MotionPathPlugin);

//CAMERA
const mainCamera = new THREE.PerspectiveCamera();
mainCamera.position.y = 13;
mainCamera.position.z = 30;
mainCamera.position.x = 0;
mainCamera.rotation.x = -0.3;
mainCamera.rotation.y = 0;

const CanvasIndex = () => {
  const [tvIdx, setTvIdx] = useState(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  cameraRef.current = mainCamera;

  function cameraReset() {
    if (tvIdx != 0) {
      setTvIdx(0);
      gsap.to(mainCamera.position, {
        y: 13,
        z: 30,
        x: 0,
        ease: "none",
      });
      gsap.to(mainCamera.rotation, { x: -0.3, y: 0 });
    }
  }

  function cameraAnimation(idx: number) {
    if (tvIdx != 0) return;
    if (idx === 0) {
      gsap.to(mainCamera.position, { z: 12, y: 12, x: 2, duration: 1 });
      gsap.to(mainCamera.rotation, { y: 0.15, x: 0 });
    }
    if (idx === 1) {
      gsap.to(mainCamera.position, { x: 12, y: -1, z: 10, duration: 1 });
      gsap.to(mainCamera.rotation, { y: 0.5, x: 0, duration: 1 });
    }
    if (idx === 2) {
      gsap.to(mainCamera.position, { x: -15, y: -1, z: 10, duration: 1 });
      gsap.to(mainCamera.rotation, { y: -0.7, x: 0, duration: 1 });
    }
    setTvIdx(idx + 1);
  }

  const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={`flex flex-col justify-center items-center w-full h-full absolute inset-0 pt-0 self-end`}
      >
        <Canvas
          className="touch-none"
          gl={{ preserveDrawingBuffer: true }}
          camera={mainCamera}
        >
          <Suspense fallback={<CanvasLoader />}>
            <SheetProvider sheet={demoSheet}>
              {/* <AnimatedCameras /> */}
              <ambientLight intensity={0.5} />
              {gifs.map(({ src, position, rotation, scale }, idx) => (
                <PsxTv
                  key={idx}
                  idx={idx}
                  scale={scale}
                  rotation={rotation}
                  position={position}
                  src={src}
                  onclick={() => {
                    cameraAnimation(idx);
                  }}
                  mode={tvIdx}
                  mobile={isMobile}
                  camera={cameraRef}
                />
              ))}
              {/* {!isMobile && <VendingMachine scale={2} position={[-3,0,3]} rotation={[0,1,0,'XYZ']}/>} */}
              <Fridge
                scale={2}
                position={[15, 0, -10]}
                rotation={[0, -0.4, 0]}
              />
              <Sofa />
              <Lamp />
              <Floor position={[0, -3.1, 0]} />
              <Walls />
              <OrbitControls />
            </SheetProvider>
          </Suspense>
        </Canvas>
        {tvIdx != 0 && (
          <VscHome
            className="absolute text-neutral-300 text-7xl border-2 border-neutral-300 shadow-md top-10 p-2 rounded-lg"
            onClick={cameraReset}
          />
        )}
      </div>
    </div>
  );
};

export default CanvasIndex;
