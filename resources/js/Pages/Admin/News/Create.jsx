import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect, useRef } from 'react';

export default function Create(props) {
    // const [selectedFile, setSelectedFile] = useState()
    // const [preview, setPreview] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const inputRef = useRef(null);
    const { data, setData, post, errors } = useForm({
        title: "",
        subtitle: "",
        content: "",
        media: "",
        category: "",
        tag: "",
    });

    const categoryOptions =
        props.categories.data.map(category => {
            category.value = category.id
            category.label = category.title
            return category;
        })

    const tagOptions =
        props.tags.data.map(tag => {
            tag.value = tag.id
            tag.label = tag.title
            return tag;
        })

    // create a preview as a side effect, whenever selected file is changed
    // useEffect(() => {
    //     if (!selectedFile) {
    //         setPreview(undefined)
    //         return
    //     }

    //     const objectUrl = URL.createObjectURL(selectedFile)
    //     setPreview(objectUrl)

    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [selectedFile])

    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setData("media", e.target.files[0])
    //     setSelectedFile(e.target.files[0])
    // }

    function handleImageChange(e) {
        console.log(data)
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            setData("media", e.target.files[0])
        }
    };

    function handleRemoveSelectedImage() {
        setSelectedImage();
        setData("media", null)
        inputRef.current.value = null;
    };

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]
    // console.log('option', option)
    // console.log('options', options)

    function handleSubmit(e) {
        e.preventDefault()
        post(route("news.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add News</h2>}
        >
            <Head title="Add News" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input type="text" id="title" name="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("title", e.target.value)}
                                required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-gray-900">Subtitle</label>
                            {/* <textarea type="text" id="subtitle" name="subtitle"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("subtitle", e.target.value)}
                                required /> */}
                            <CKEditor
                                editor={ClassicEditor}
                                data=""
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                            "height",
                                            "200px",
                                            editor.editing.view.document.getRoot()
                                        );
                                    });
                                }}
                                onChange={(event, editor) => {
                                    // const data = editor.getData();
                                    setData("subtitle", editor.getData())
                                }}
                            // onBlur={(event, editor) => {
                            //     console.log('Blur.', editor);
                            // }}
                            // onFocus={(event, editor) => {
                            //     console.log('Focus.', editor);
                            // }}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                            {/* <textarea type="text" id="content" name="content"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("content", e.target.value)}
                                required /> */}
                            <CKEditor
                                editor={ClassicEditor}
                                data=""
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                            "height",
                                            "200px",
                                            editor.editing.view.document.getRoot()
                                        );
                                    });
                                }}
                                onChange={(event, editor) => {
                                    // const data = editor.getData();
                                    setData("content", editor.getData())
                                }}
                            // onBlur={(event, editor) => {
                            //     console.log('Blur.', editor);
                            // }}
                            // onFocus={(event, editor) => {
                            //     console.log('Focus.', editor);
                            // }}
                            />
                        </div>
                        <div className="mb-6">
                            {/* {
                                selectedImage &&
                                <div className='my-4 w-6/12 h-auto mx-auto relative'>
                                    <button onClick={handleRemoveSelectedImage}
                                        className="absolute top-3 right-3 px-2 py-2 inline-block bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                    <img src={URL.createObjectURL(selectedImage)} className='mb-2 h-56 w-auto mx-auto' />
                                </div>
                            } */}
                            <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <div class="flex items-center justify-center w-full">
                                <label htmlFor="media" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        {
                                            selectedImage ?
                                            <div className='my-4 w-full h-auto mx-auto relative'>
                                                <button onClick={handleRemoveSelectedImage}
                                                    className="absolute top-3 right-3 px-2 py-2 inline-block bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                                <img src={URL.createObjectURL(selectedImage)} className='mb-2 h-56 w-auto object-cover mx-auto' />
                                            </div>
                                            :
                                            <>
                                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                <p class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Click to upload image</p>
                                                {/* <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                            </>
                                        }
                                    </div>
                                    <input id="media" type="file" class="hidden" name="media" accept='image/*'
                                        onChange={handleImageChange}
                                        ref={inputRef}
                                        required />
                                </label>
                            </div>
                            {/* <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="media" name="media" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleImageChange}
                                ref={inputRef}
                                required /> */}
                        </div>
                        <div className="flex gap-4">
                            <div className="mb-6 w-6/12">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <Select id="category"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    isMulti
                                    options={categoryOptions}
                                    onChange={(e) => setData("category", e.value)} />
                                {/* <select id="category" name="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("category", e.target.value)}
                                >
                                    {
                                        props.categories.data.map(category => <option key={category.id} value={category.id}>{category.title}</option>)
                                    }
                                </select> */}
                            </div>
                            <div className="mb-6 w-6/12">
                                <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
                                <Select id="tag"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    // isMulti
                                    options={tagOptions}
                                    onChange={(e) => setData("tag", e.value)} />
                                {/* <select id="tag" name="tag"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("tag", e.target.value)}
                                >
                                    {
                                        props.tags.data.map(tag => <option key={tag.id} value={tag.id}>{tag.title}</option>)
                                    }
                                </select> */}
                            </div>
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
