import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Dropdown from '@/Components/Dropdown';
import MediaItem from '@/Components/Media/MediaItem';

export default function Index(props) {
    const { delete: destroy } = useForm()
    const [isLoaded, setIsLoaded] = useState(null)
    const [isSelected, setIsSelected] = useState('')

    const handleClick = (id) => {
        setIsSelected(id)
        console.log(isSelected)
    }

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return '/storage/' + url;
        }
    }

    const onLoad = () => {
        console.log("loaded");
    };

    function handleDelete(e) {
        e.preventDefault()
        destroy(route("media.destroy", e.target.id));
        setIsSelected(null)
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Media</h2>}
        >
            <Head title="Media" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link href={route("media.create")} type="button"
                        className="inline-block items-center px-4 py-2 mb-6 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        Add Item</Link>
                    <div className="relative overflow-x-auto mb-6">
                        <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                            {
                                props.medias.data.map((item, index) => {
                                    return (
                                        // <MediaItem key={index}
                                        //     media={item}
                                        //     handleClick={handleClick}
                                        //     isSelected={isSelected}
                                        //     handleDelete={handleDelete} />
                                        <div key={index} className={isSelected === item.id ? 'relative rounded-lg border-4 border-indigo-700' : 'relative rounded-lg border-4 border-transparent'}
                                            onClick={() => handleClick(item.id)}>
                                            {isSelected === item.id &&
                                                <>
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            {/* <span className="inline-flex rounded-md"> */}
                                                            <button className='absolute top-1 right-1 p-1 rounded-full bg-black/40 text-white'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                                </svg>
                                                            </button>
                                                        </Dropdown.Trigger>

                                                        <Dropdown.Content width='20' contentClasses='py-1 bg-white mt-6'>
                                                            <Dropdown.Link href={route(`media.edit`, item.id)}>
                                                                Edit
                                                            </Dropdown.Link>
                                                            <Dropdown.Link className='bg-red-600 text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-900' onClick={handleDelete} id={item.id}>
                                                                Delete
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </>
                                            }
                                            {
                                                !isLoaded &&
                                                <div className="animate-pulse flex space-x-4 h-32 rounded w-full">
                                                    <div className="rounded-lg w-full bg-slate-300"></div>
                                                </div>
                                            }
                                            <img src={isValidUrl(item.url)} className={isLoaded ? 'h-32 w-full rounded object-cover' : 'hidden'}
                                                onLoad={() => setIsLoaded(true)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Pagination meta={props.medias.meta} />
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
