import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { IconDotsVertical } from '@tabler/icons-react';
import { IconDotsDiagonal } from '@tabler/icons-react';

export default function MediaItem(props) {
    const { delete: destroy } = useForm()
    const [isLoaded, setIsLoaded] = useState([])
    // const [isSelected, setIsSelected] = useState('')

    // const handleClick = (id) => {
    //     setIsSelected(id)
    //     console.log('id', id)
    //     console.log('isSelected', isSelected)
    // }

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return '/storage/' + url;
        }
    }

    // function handleDelete(e) {
    //     e.preventDefault()
    //     destroy(route("media.destroy", e.target.id));
    //     setIsSelected(null)
    // }

    return (
        <div
            className={props.isSelected === props.media.id ? 'relative rounded-lg border-4 border-gray-700' : 'relative rounded-lg border-4 border-transparent'}
            onClick={() => props.handleClick(props.media.id)}>
            {props.isSelected === props.media.id &&
                <>
                    <Dropdown>
                        <Dropdown.Trigger>
                            {/* <span className="inline-flex rounded-md"> */}
                            <button className='absolute top-1 right-1 p-1 rounded-full bg-black/40 text-white'>
                                <IconDotsDiagonal className='w-4 h-4' />
                                {/* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                </svg> */}
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content width='20' contentClasses='py-1 bg-white mt-6'>
                            <Dropdown.Link href={route(`media.edit`, props.media.id)}>
                                Edit
                            </Dropdown.Link>
                            <Dropdown.Link className='bg-red-600 text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-900' onClick={props.handleDelete} id={props.media.id}>
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </>
            }
            {
                !props.isLoaded === props.media.id &&
                <div className="animate-pulse flex space-x-4 h-32 rounded w-full">
                    <div className="rounded-lg w-full bg-slate-300"></div>
                </div>
            }
            <img src={isValidUrl(props.media.url)} className='h-32 w-full rounded object-cover'
                onLoad={() => setIsLoaded(props.media.id)}
            />
        </div>
    )
}
