import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Edit(props) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { data, setData, put, errors } = useForm({
        id: props.news.id,
        title: props.news.title || "",
        subtitle: props.news.subtitle || "",
        content: props.news.content || "",
        media: props.news.media_id || "",
        category: props.news.category_id || "",
        tag: props.news.tag_id || "",
    });

    const categoryOptions =
        props.categories.data.map(category => {
            category.value = category.id
            category.label = category.title
            return category;
        })

    const tagOptions =
        props.tags.data.map(category => {
            category.value = category.id
            category.label = category.title
            return category;
        })

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setData("media", e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault()
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit News</h2>}
        >
            <Head title="Edit News" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input type="text" id="title" name="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("title", e.target.value)}
                                value={data.title}
                                required />
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
                        </div>
                        <div className="mb-6">
                            <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <img src={selectedFile ? preview : isValidUrl(props.news.media.url)} className='mb-2 h-56 w-auto mx-auto' />
                            <input type="file" id="media" name="media" accept='image/*'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={onSelectFile}
                                // onChange={(e) => setData("media", e.target.files[0])}
                                 />
                        </div>
                        <div className="flex gap-4">
                            <div className="mb-6 w-6/12">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <Select id="category" className='text-sm rounded-lg'
                                    options={categoryOptions}
                                    defaultValue={categoryOptions.find(category => category.value === data.category)}
                                    onChange={(e) => setData("category", e.value)} />
                                {/* <select id="category" name="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("category", e.target.value)}
                                    value={data.category}
                                >
                                    {
                                        props.categories.data.map(category => <option key={category.id} value={category.id}>{category.title}</option>)
                                    }
                                </select> */}
                            </div>
                            <div className="mb-6 w-6/12">
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
                            </div>
                        </div>
                        <input type='hidden' value={data.id} />
                        <button type="submit"
                            className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                            Submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
