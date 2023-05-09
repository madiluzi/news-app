import { Fragment, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Navbar from '@/Components/Navbar';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';

export default function Unauthenticated({ auth, children }) {
    const [isShowing, setIsShowing] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
        console.log(false)
    }

    function openModal() {
        setIsOpen(true)
        console.log(true)
    }

    return (
        <div className="relative min-h-screen bg-gray-100">

            <div className="flex flex-wrap">
                <section className="relative mx-auto">
                    <nav className="flex justify-between bg-gray-900 text-white w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                            <button
                                onClick={openModal}
                            // onClick={() => setIsShowing((isShowing) => !isShowing)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke:inecap="round" stroke:inejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                                </svg>
                            </button>
                            <Link href="/" className="text-3xl mx-auto font-bold font-heading">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                            </Link>
                            <div className="hidden xl:flex items-center space-x-5 items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-white focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user && auth.user.name}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {auth.user ?
                                            <>
                                                <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </>
                                            :
                                            <>
                                                <Dropdown.Link href={route('login')}>Login</Dropdown.Link>
                                                <Dropdown.Link href={route('register')}>Register</Dropdown.Link>
                                            </>

                                        }
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        <a className="xl:hidden flex mr-6 items-center" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="flex absolute -mt-5 ml-4">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                                </span>
                            </span>
                        </a>
                        <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </a>
                    </nav>
                </section>
            </div>

            {/* <Transition
                show={isShowing}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="bg-red-100 h-screen w-full"
            >
                I will fade in and out
            </Transition> */}
            {
                isOpen &&
                <div className='fixed top-0 left-0 w-screen bg-gray-900 text-white z-50 '>
                    <div className='relative'>
                        <button
                            className='absolute top-5 right-5'
                            onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full h-screen'>
                        <div className='mb-5'>
                            <Link href="/" className="text-7xl mx-auto font-bold font-heading">
                                Home
                            </Link>
                        </div>
                        <div className='mb-5'>
                            <Link href="/" className="text-7xl mx-auto font-bold font-heading">
                                Home
                            </Link>
                        </div>
                        <div className='mb-5'>
                            <Link href="/" className="text-7xl mx-auto font-bold font-heading">
                                Home
                            </Link>
                        </div>
                        <div className='mb-5'>
                            <Link href="/" className="text-7xl mx-auto font-bold font-heading">
                                Home
                            </Link>
                        </div>
                        {/* <div>
                                <Link href="/" className="text-3xl mx-auto font-bold font-heading">
                                    Category
                                </Link>
                                <div className=''>
                                    <Link href="/" className="text-lg mx-auto font-heading mr-4">
                                        Category
                                    </Link>
                                    <Link href="/" className="text-lg mx-auto font-heading mr-4">
                                        Category
                                    </Link>
                                    <Link href="/" className="text-lg mx-auto font-heading mr-4">
                                        Category
                                    </Link>
                                </div>
                            </div> */}

                    </div>
                </div>
            }
            <main>{children}</main>
        </div >
    );
}
