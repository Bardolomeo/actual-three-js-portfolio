"use client";
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import CanvasLoader from './CanvasLoader';
import PsxTv from './models/PsxTv';
import VendingMachine from './models/VenidngMachine';
import { gifs } from '@/constants';

export interface PsxTvProps{
	args: JSX.IntrinsicElements['group'];
	src: string;
}

const Hero = () => {

	const camera = new PerspectiveCamera();
	camera.position.z = 30;

  return (
	<section className='min-h-screen mx-auto'>
		<div className='flex flex-col justify-center items-center p-8'>
			<p className='font-inclusive text-3xl md:text-4xl g:text-5xl text-white-700'>Hello, I&apos;m <span className='waving-hand text-neutral-500'>Bard</span></p>
			<p className='pt-2 text-gray_gradient md:text-lg'>Welcome to my world</p>
		</div>

		<div className='flex flex-col justify-center items-center w-full h-full absolute inset-0 pt-28'>
			<Canvas camera={camera} className='w-full h-full'>
				<Suspense fallback={<CanvasLoader />}>
					<ambientLight intensity={1}/>
					{gifs.map(({src, position, rotation, scale}) => (
						<PsxTv key={src} scale={scale} rotation={rotation} position={position} src={src}/>
					))}
					<VendingMachine scale={7} position={[-10,0,3]} rotation={[0,1,0,'XYZ']}/>
				</Suspense>
			</Canvas>
		</div>
	</section>
  )
}

export default Hero