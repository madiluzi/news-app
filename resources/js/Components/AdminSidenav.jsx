import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Transition } from '@headlessui/react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { IconCategory, IconLayoutDashboard, IconNews, IconPhoto, IconTags } from '@tabler/icons-react';

export default function Sidenav({ auth }) {
    const [isShowing, setIsShowing] = useState(false)
    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="items-center hidden p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full overflow-y-auto bg-gray-900">
                    <Link href={route('dashboard')} className="flex items-center justify-center w-full h-16 mb-5">
                        <ApplicationLogo className="block w-auto text-white fill-current h-9" />
                    </Link>
                    <ul className="space-y-2 font-medium">
                        <li className='px-3'>
                            <Link href={route('dashboard')} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900">
                                <IconLayoutDashboard />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li className='px-3'>
                            <Link href={route('news.index')} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900">
                                <IconNews />
                                <span className="flex-1 ml-3 whitespace-nowrap">News</span>
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </Link>
                        </li>
                        <li className='px-3'>
                            <Link href={route('category.index')} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900">
                                <IconCategory />
                                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </Link>
                        </li>
                        <li className='px-3'>
                            <Link href={route('tag.index')} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900">
                                <IconTags />
                                <span className="flex-1 ml-3 whitespace-nowrap">Tag</span>
                            </Link>
                        </li>
                        <li className='px-3'>
                            <Link href={route('media.index')} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900">
                                <IconPhoto />
                                <span className="flex-1 ml-3 whitespace-nowrap">Media</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}
