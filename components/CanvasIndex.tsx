import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import VendingMachine from './models/VendingMachine';
import { Reflector, ReflectorProps } from '@react-three/drei';
import PsxTv from './models/PsxTv';
import CanvasLoader from './CanvasLoader';
import { gifs } from '@/constants';
import * as THREE from 'three';


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
	const camera = new THREE.PerspectiveCamera();
	camera.position.z = 30;
	camera.position.y = 8;
	camera.rotation.x = -0.3;
	
	const [isMobile, setIsMobile] = useState(true);

	const tvNumberRef = useRef<number>(null!); 
	tvNumberRef.current = 0;

	useEffect(() => {
		if (window.innerWidth > 800)
			setIsMobile(false);
	}, []);

	function setCameraTarget(position: THREE.Vector3, idx: number)
	{
		tvNumberRef.current = idx + 1;
		camera.position.x = position.x + (position.x /2);
		camera.position.y = position.y + 4.5;
		camera.position.z = position.z + 7;
	}

	return (
		<div className={`flex flex-col justify-center items-center w-full h-full absolute inset-0 pt-28`}>
		<Canvas camera={camera} className='w-full h-full'>
			<Suspense fallback={<CanvasLoader />}>
				<ambientLight intensity={1}/>
				{gifs.map(({src, position, rotation, scale}, idx) => (
					<PsxTv key={idx} scale={scale} rotation={rotation} position={position} src={src} onclick={() => {setCameraTarget(gifs[idx].position, idx)}} mode={tvNumberRef}/>
				))}
				{!isMobile && <VendingMachine scale={2} position={[-9,-2,3]} rotation={[0,1,0,'XYZ']}/>}
				<Reflector {...props} args={[1920, 1080]}>
					{(Material, props) => (
						<Material metalness={0.5} roughness={1}  {...props} />
					)}
				</Reflector>
			</Suspense>
		</Canvas>
	</div>
	)
}

export default CanvasIndex