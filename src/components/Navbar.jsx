import React from 'react'
import { useState } from 'react';

const Navbar = () => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
    setActive(!active);
    };
    return (
        <nav className='flex items-center flex-wrap bg-indigo-800 p-3 '>
            <a href='#!' className='inline-flex items-center p-2 mr-4 '>
                <span className='text-xl text-white font-bold tracking-wide'>
                    ProTic 2.0
                </span>
            </a>
            <button className=' inline-flex p-3 hover:bg-indigo-300 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
            onClick={handleClick}
            >
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
            </button>
            <div
            className={`${
                active ? '' : 'hidden'
            }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
            >
                <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
                    <a href='#!'  className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-300 hover:text-white '>
                        Perfil
                    </a>
                    <a href='#!'  className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-300 hover:text-white'>
                        Proyectos
                    </a>
                    <a href='#!'  className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-300 hover:text-white'>
                        Inscripciones
                    </a>

                    <a href='#!'  className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-300 hover:text-white'>
                        Usuarios
                    </a>
                </div>
            </div>
      </nav>
    );

}

export default Navbar
