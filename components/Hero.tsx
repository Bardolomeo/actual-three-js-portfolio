"use client";
import React, { forwardRef } from 'react'
import CanvasIndex from './CanvasIndex';


const Hero = forwardRef<HTMLElement>(() => {

  return (
	<section className='min-h-screen mx-auto'>
		<CanvasIndex />
	</section>
  )
})

export default Hero