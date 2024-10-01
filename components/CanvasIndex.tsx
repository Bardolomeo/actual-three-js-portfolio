import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
// import VendingMachine from "./models/VendingMachine";
// import { Reflector, ReflectorProps } from '@react-three/drei';
import PsxTv from "./models/PsxTv";
import CanvasLoader from "./CanvasLoader";
import { gifs } from "@/constants";
import * as THREE from "three";
import { useGSAP } from '@gsap/react';
// import { getProject } from "@theatre/core";
// import { SheetProvider } from "@theatre/r3f";
// import cameraAnimations from "@/constants/animations.json";
import { FiArrowUp } from "react-icons/fi";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PerspectiveCamera, Reflector, ReflectorProps } from "@react-three/drei";


const mainCamera = new THREE.PerspectiveCamera();
mainCamera.position.y = 13;
mainCamera.position.z = 30;
mainCamera.rotation.x = -0.3;

gsap.registerPlugin(MotionPathPlugin);

const props: ReflectorProps = {
	blur: [512, 512], // Blur ground reflections (width, heigt), 0 skips blur
	mixBlur:0.75, // How much blur mixes with surface roughness
	mixStrength: 1, // Strength of the reflections
	resolution: 1024, // Off-buffer resolution, lower=faster, higher=better quality
	rotation: [-Math.PI * 0.5, 0, 0],
	mirror: 1,// Mirror environment, 0 = texture colors, 1 = pick up env colors
	minDepthThreshold: 0.25,
	maxDepthThreshold: 1,
	depthScale: 50,
	position: [0, -2.9, 0],
	mixContrast: 1,
}

const CanvasIndex = () => {


  const cameraRef = useRef(null!);
  const [isMobile, setIsMobile] = useState(true);
  const [tvIdx, setTvIdx] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 800) setIsMobile(false);
  });

  //theater
  // const cameraSheetUp = getProject("Camera Animation", {
  //   state: cameraAnimations,
  // }).sheet("cameraUp");
  // const cameraSheetRight = getProject("Camera Animation", {
  //   state: cameraAnimations,
  // }).sheet("cameraRight");
  // const cameraSheetLeft = getProject("Camera Animation", {
  //   state: cameraAnimations,
  // }).sheet("cameraLeft");

  //change camera onClick
  function setCameraTarget() {
    // if (tvIdx === 0) {
    //   setTvIdx(idx + 1);
    //   if (idx === 0)
    //     cameraSheetUp.sequence.play().then(() => setTvIdx(idx + 1));
    //   if (idx === 1)
    //     cameraSheetRight.sequence.play().then(() => setTvIdx(idx + 1));
    //   if (idx === 2)
    //     cameraSheetLeft.sequence.play().then(() => setTvIdx(idx + 1));
    // }
  }

  // TO REMOVE
  // studio.initialize();
  // studio.extend(extension);

  // function AnimatedCameras() {
  //   return (
  //     <>
  //       <SheetProvider sheet={cameraSheetUp}>
  //         <PerspectiveCamera
  //           theatreKey="null"
  //           makeDefault={tvIdx === 0}
  //           position={[0, 13, 30]}
  //           rotation={[-0.3, 0, 0]}
  //         />
  //         <PerspectiveCamera
  //           theatreKey="camera"
  //           makeDefault={tvIdx === 1}
  //           position={[0, 13, 30]}
  //         />
  //       </SheetProvider>
  //       <SheetProvider sheet={cameraSheetRight}>
  //         <PerspectiveCamera
  //           theatreKey="camera"
  //           makeDefault={tvIdx === 2}
  //           position={[0, 13, 30]}
  //         />
  //       </SheetProvider>
  //       <SheetProvider sheet={cameraSheetLeft}>
  //         <PerspectiveCamera
  //           theatreKey="camera"
  //           makeDefault={tvIdx === 3}
  //           position={[0, 13, 30]}
  //         />
  //       </SheetProvider>
  //     </>
  //   );
  // }

  function cameraReset() {
    if (tvIdx != 0) {
      setTvIdx(0);
      gsap.timeline().
      to(mainCamera.position, {
        y: 13,
        z: 30,
        x: 0,
        ease: "none"
      }).
      to(mainCamera.rotation, {x: -0.3, ease:'none'})
    }
  }

  function cameraAnimation(idx: number){
    if (idx === 0)
    {
      useGSAP
      gsap.to(mainCamera.position, {
        z: 15,
        y: 10,
      });
    }
    
    if (idx === 2)
    {
      gsap.timeline()
      .to(mainCamera.position, {x: -5, y: 5, z: 15})
      .to(mainCamera.rotation, {x: 0, y: 0.3})
    }
      setTvIdx(idx + 1);
  }
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full absolute inset-0 pt-28`}
    >
      <Canvas className="w-full h-full" gl={{ preserveDrawingBuffer: true }} camera={mainCamera}>
        <Suspense fallback={<CanvasLoader />}>
          {/* <AnimatedCameras /> */}
          <ambientLight intensity={1} />
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
              />
          ))}
          {/* {!isMobile && <VendingMachine scale={2} position={[-3,0,3]} rotation={[0,1,0,'XYZ']}/>} */}
          <Reflector {...props} args={[1920, 1080]}>
					{(Material, props) => (
						<Material metalness={1} roughness={1}  {...props} />
					)}
				</Reflector>
        </Suspense>
      </Canvas>
      {tvIdx != 0 && (
        <FiArrowUp
          className="absolute text-neutral-300 text-7xl border-2 border-neutral-300 rounded-full shadow-md bottom-10"
          onClick={cameraReset}
        />
      )}
    </div>
  );
};

export default CanvasIndex;
