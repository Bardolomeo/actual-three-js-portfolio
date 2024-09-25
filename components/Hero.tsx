"use client";
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import CanvasLoader from './CanvasLoader';
import PsxTv from './models/PsxTv';

const Hero = () => {

	const camera = new PerspectiveCamera();
	camera.position.z = 30;

  return (
	<section className='min-h-screen mx-auto'>
		<div className='flex flex-col justify-center items-center p-8'>
			<p className='font-inclusive text-3xl md:text-4xl g:text-5xl text-white-700'>Hello, I&apos;m <span className='waving-hand text-neutral-500'>Bard</span></p>
			<p className='pt-2 text-gray_gradient md:text-lg'>Welcome to my world</p>
		</div>

		<div className='flex flex-col justify-center items-center w-full h-full absolute inset-0'>
			<Canvas camera={camera} className='w-full h-full'>
				<Suspense fallback={<CanvasLoader />}>
					<ambientLight intensity={1}/>
					<PsxTv scale={7} rotation={[0,0.25,0,'XYZ']} position={[0, 3, 0]}/>
					<PsxTv scale={5} rotation={[0,0.6,0,'XYZ']} position={[3, 0, 0]}/>
					<PsxTv scale={5} rotation={[0,-0.9,0,'XYZ']} position={[-2, 0, 0]}/>
				</Suspense>
			</Canvas>
		</div>
	</section>
  )
}

export default Hero