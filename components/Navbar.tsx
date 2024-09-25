"use client";
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants';
import React, { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi';

function NavItems() {
	
	return (
	<ul className='nav-ul'>
		{navLinks.map(({name, id, href}) => (
			<li key={id} className='nav-li'>
				<a href={href} className='nav-li_a group text-3xl'>
					{name}
				<span className='max-w-0 block bg-white group-hover:max-w-full transition-all h-[0.5px]'></span>
				</a>
			</li>
		))}
	</ul>)
}

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
	<div className="max-w-7xl z-50 mt-8 mx-4 sm:mt-2 flex justify-between">
		<div className='flex flex-col items-center justify-center'>
			<a href='\' className='group'>
				<header className='text-neutral-200 lg:text-3xl text-2xl group-hover:text-white transition-color'>
					Bard
				</header>
				<span className='max-w-0 group-hover:max-w-full block bg-white transition-all h-0.5'></span>
			</a>
		</div>
		<Button variant={"ghost"} size={"icon"} className='bg-transparent sm:hidden hover:bg-transparent' aria-label='Toggle Menu' onClick={() => setMenuOpen((prevIsOpen) => !prevIsOpen)}>
			{menuOpen ? <FiX className='text-neutral-200' size={30}/> : <FiMenu className='text-neutral-200' size={30}/>}
		</Button>
		<div className='hidden max-h-0 sm:flex sm:max-h-full'>
			<nav>
				<NavItems />
			</nav>
		</div>
		<div className={`nav-sidebar mt-12 ${menuOpen ? 'max-h-full' : 'max-h-0'}`}>
			<nav className='p-5'>
				<NavItems/>
			</nav>
		</div>
	</div>
  )
}

export default Navbar