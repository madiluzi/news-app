import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect, useRef } from 'react';
import { IconCloudUpload, IconTrash } from '@tabler/icons-react';

export default function Edit(props) {
    console.log('props', props.news)
    // const [selectedFile, setSelectedFile] = useState()
    // const [preview, setPreview] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const inputRef = useRef(null);
    const { data, setData, put, errors } = useForm({
        id: props.news.id,
        title: props.news.title || "",
        subtitle: props.news.subtitle || "",
        content: props.news.content || "",
        media: props.news.media_id || "",
        categories: props.news.category.map(category => {
            category.value = category.id
            category.label = category.title
            return category
        }) || [],
        tag: props.news.tag_id || "",
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
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            setData("image", e.target.files[0])
        }
    };

    function handleRemoveSelectedImage() {
        setSelectedImage();
        setData("image", props.news.media.url)
        inputRef.current.value = null;
    };

    function handleSubmit(e) {
        e.preventDefault()
        console.log('data', data);
        console.log('===================');
        put(route("news.update", props.news.id));
    }

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return '/storage/' + url;
        }
    }
    // function getCategory(id){
    //     return id.value = categoryOptions.value
    // }
    // console.log('categoryOptions', categoryOptions)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit News</h2>}
        >
            <Head title="Edit News" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input type="text" id="title" name="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("title", e.target.value)}
                                value={data.title}
                                required />
                            {props.errors.title && <span className='text-sm text-red-700'>{props.errors.title}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-gray-900">Subtitle</label>
                            {/* <textarea type="text" id="subtitle" name="subtitle"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("subtitle", e.target.value)}
                                value={data.subtitle}
                                required /> */}
                            <CKEditor
                                editor={ClassicEditor}
                                data={data.subtitle}
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
                            {props.errors.subtitle && <span className='text-sm text-red-700'>{props.errors.subtitle}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                            {/* <textarea type="text" id="content" name="content"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("content", e.target.value)}
                                value={data.content}
                                required /> */}
                            <CKEditor
                                editor={ClassicEditor}
                                data={data.content}
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
                            {props.errors.content && <span className='text-sm text-red-700'>{props.errors.content}</span>}
                        </div>
                        {/* <div className="mb-6">
                            <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <div className='relative w-6/12 h-auto mx-auto my-4'>
                                {selectedImage &&
                                    <button onClick={handleRemoveSelectedImage}
                                        className="absolute inline-block px-2 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md top-3 right-3 hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                }
                                <img src={selectedImage ? URL.createObjectURL(selectedImage) : isValidUrl(props.news.media.url)} className='object-cover w-auto h-56 mx-auto mb-2' />
                            </div>
                            <input type="file" id="media" name="media" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                // onChange={(e) => setData("media", e.target.files[0])}
                                // onChange={onSelectFile}
                                onChange={handleImageChange}
                                ref={inputRef}
                            />
                        </div> */}
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
                                            selectedImage || data.media ?
                                                <div className='relative w-full h-auto mx-auto my-4'>
                                                    {
                                                        selectedImage &&
                                                        <button onClick={handleRemoveSelectedImage}
                                                            className="absolute inline-block px-2 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md top-3 right-3 hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                            <IconTrash className='w-4 h-4' />
                                                        </button>
                                                    }

                                                    <img src={selectedImage ? URL.createObjectURL(selectedImage) : isValidUrl(props.news.media.url)} className='object-cover w-auto h-56 mx-auto mb-2' />
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
                                </label>
                            </div>
                            {props.errors.media && <span className='text-sm text-red-700'>{props.errors.media}</span>}
                            {/* <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="media" name="media" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleImageChange}
                                ref={inputRef}
                                required /> */}
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6/12 mb-6">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <Select id="category" className='text-sm rounded-lg'
                                    options={categoryOptions}
                                    isMulti
                                    defaultValue={data.categories}
                                    // defaultValue={categoryOptions.find(category => {
                                    //     console.log('category', category);
                                    //     category.value === data.category
                                    // })}
                                    // defaultValue={categoryOptions.find(categories.map(category => category.value === data.category))}
                                    onChange={(e) => setData("categories", Array.isArray(e) ? e.map(x => x.value) : [])} />
                                {/* <select id="category" name="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("category", e.target.value)}
                                    value={data.category}
                                >
                                    {
                                        props.categories.data.map(category => <option key={category.id} value={category.id}>{category.title}</option>)
                                    }
                                </select> */}
                                {props.errors.categories && <span className='text-sm text-red-700'>{props.errors.categories}</span>}
                            </div>
                            <div className="w-6/12 mb-6">
                                <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
                                <Select id="tag" className='text-sm rounded-lg'
                                    options={tagOptions}
                                    defaultValue={tagOptions.find(tag => tag.value === data.tag)}
                                    onChange={(e) => setData("tag", e.value)} />
                                {/* <select id="tag" name="tag"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("tag", e.target.value)}
                                    value={data.tag}
                                >
                                    {
                                        props.tags.data.map(tag => <option key={tag.id} value={tag.id}>{tag.title}</option>)
                                    }
                                </select> */}
                                {props.errors.tag && <span className='text-sm text-red-700'>{props.errors.tag}</span>}
                            </div>
                        </div>
                        <input type='hidden' value={data.id} />
                        <button type="submit"
                            className='inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                            Submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
