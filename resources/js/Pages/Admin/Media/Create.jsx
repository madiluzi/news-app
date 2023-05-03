import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create(props) {
    const { data, setData, errors, post } = useForm({
        caption: "",
        image: "",
    });
    const [selectedImage, setSelectedImage] = useState()

    function handleImageChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            setData("image", e.target.files[0])
        }
    };

    function handleRemoveSelectedImage() {
        setSelectedImage();
    };

    function handleSubmit(e) {
        e.preventDefault()
        post(route("media.store"))
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Media</h2>}
        >
            <Head title="Add Media" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="image" name="image" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                // onChange={(e) => setData("image", e.target.files[0])}
                                onChange={handleImageChange}
                                required />
                            {selectedImage && (
                                <div className='mt-4 w-6/12 h-auto mx-auto'>
                                    <div className='relative'>
                                        <button onClick={handleRemoveSelectedImage}
                                            className="absolute top-3 right-3 px-2 py-2 inline-block bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                        <img src={URL.createObjectURL(selectedImage)} className='rounded-lg w-full h-40 object-cover' />
                                    </div>
                                    {/* <div style={styles.preview}>
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                style={styles.image}
                                                alt="Thumb"
                                            />
                                            <button onClick={removeSelectedImage} style={styles.delete}>
                                                Remove This Image
                                            </button>
                                        </div> */}
                                </div>
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="caption" className="block mb-2 text-sm font-medium text-gray-900">Caption</label>
                            <input type="text" id="caption" name="caption"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("caption", e.target.value)}
                                required />
                        </div>
                        <button type="submit"
                            className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                            Submit</button>
                    </form>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}
