"use client";
import React from 'react'
import CanvasIndex from './CanvasIndex';


const Hero = () => {

  return (
	<section className='min-h-screen mx-auto'>
		<div className='flex flex-col justify-center items-center p-8 home'>
			<p className='font-inclusive text-3xl md:text-4xl g:text-5xl text-white-700'>Hello, I&apos;m <span className='waving-hand text-neutral-500'>Bard</span></p>
			<p className='pt-2 text-gray_gradient md:text-lg'>Welcome to my world</p>
		</div>
		<CanvasIndex />
	</section>
  )
}

export default Hero