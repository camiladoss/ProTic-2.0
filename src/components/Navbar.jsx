import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
    setActive(!active);
    };
    return (
        <nav className='flex items-center flex-wrap p-3 bg-indigoDye  '>
            <a href='#!' className='inline-flex items-center p-2 mr-4 '>
                <span className='text-xl text-white font-bold tracking-wide'>
                    ProTic 2.0
                </span>
            </a>
            <button className=' inline-flex p-3 rounded lg:hidden text-white ml-auto outline-none hover:bg-carolinaBlue '
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
                   

                    <Link activeClassName='active' className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white '  to='Home'>                       
                        Inicio
                    </Link>
                    <Link className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white ' activeClassName='active' to='Perfil'>                       
                        Perfil
                    </Link>
                    <Link className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white ' activeClassName='active' to='Inscripciones'>                       
                        Inscripciones
                    </Link>
                    <Link className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white ' activeClassName='active' to='CrearProyectos'>                       
                        Crear Proyecto
                    </Link>


                    
                </div>
            </div>
      </nav>
    );

}

export default Navbar
