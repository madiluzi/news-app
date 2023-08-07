import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { IconCloudUpload } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useState, useRef } from 'react';

export default function Create(props) {
    const [selectedImage, setSelectedImage] = useState()
    const inputRef = useRef(null);
    const { data, setData, errors, put } = useForm({
        id: props.media.id,
        caption: props.media.caption || "",
        image: props.media.url || "",
    });

    function handleImageChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            setData("image", e.target.files[0])
        }
    };

    function handleRemoveSelectedImage() {
        setSelectedImage();
        setData("image", props.media.url)
        inputRef.current.value = null;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return '/storage/' + url;
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        put(route("media.update", props.media.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Media</h2>}
        >
            <Head title="Edit Media" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            {/* {
                                selectedImage &&
                                <div className='relative w-6/12 h-auto mx-auto my-4'>
                                    <button onClick={handleRemoveSelectedImage}
                                        className="absolute inline-block px-2 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md top-3 right-3 hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                    <img src={URL.createObjectURL(selectedImage)} className='w-auto h-56 mx-auto mb-2' />
                                </div>
                            } */}
                            <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <div class="flex items-center justify-center w-full">
                                <label htmlFor="media" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        {
                                            selectedImage || data.image ?
                                                <div className='relative w-full h-auto mx-auto my-4'>
                                                    {
                                                        selectedImage &&
                                                        <button onClick={handleRemoveSelectedImage}
                                                            className="absolute inline-block px-2 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md top-3 right-3 hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    }

                                                    <img src={selectedImage ? URL.createObjectURL(selectedImage) : isValidUrl(props.media.url)} className='object-cover w-auto h-56 mx-auto mb-2' />
                                                </div>
                                                :
                                                <>
                                                    <IconCloudUpload className='w-10 h-10 mb-3 text-gray-400' />
                                                    <p class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Click to upload image</p>
                                                    {/* <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                                </>
                                        }
                                    </div>
                                    <input id="media" type="file" class="hidden" name="media" accept='image/*'
                                        onChange={handleImageChange}
                                        ref={inputRef}
                                        required />
                                    {props.errors.caption && <span className='text-sm text-red-700'>{props.errors.caption}</span>}
                                </label>
                            </div>
                            {props.errors.image && <span className='text-sm text-red-700'>{props.errors.image}</span>}
                            {/* <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="media" name="media" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleImageChange}
                                ref={inputRef}
                                required /> */}
                        </div>
                        {/* <div className="mb-6">
                            <div className='my-4 w-6/12 h-auto mx-auto relative'>
                                    {
                                    selectedImage &&
                                        <button onClick={handleRemoveSelectedImage}
                                            className="absolute top-3 right-3 px-2 py-2 inline-block bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    }
                                <img src={selectedImage ? URL.createObjectURL(selectedImage) : isValidUrl(data.image)} className='rounded-lg h-56 w-auto object-cover mx-auto' />
                            </div>
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="image" name="image" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                // onChange={(e) => setData("image", e.target.files[0])}
                                onChange={handleImageChange}
                                ref={inputRef}
                                />
                        </div> */}
                        <div className="mb-6">
                            <label htmlFor="caption" className="block mb-2 text-sm font-medium text-gray-900">Caption</label>
                            <input type="text" id="caption" name="caption"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("caption", e.target.value)}
                                value={data.caption}
                                required />
                        </div>
                        <button type="submit"
                            className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                            Submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
