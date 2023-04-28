import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Create(props) {
    const { data, setData, post, errors } = useForm({
        title: "",
        subtitle: "",
        content: "",
        image: "",
        category: "",
        tag: "",
    });

    console.log(data)

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
                            <textarea type="text" id="subtitle" name="subtitle"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("subtitle", e.target.value)}
                                required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                            <textarea type="text" id="content" name="content"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("content", e.target.value)}
                                required />
                            {/* <CKEditor
                                editor={ClassicEditor}
                                data="<p>Hello from CKEditor 5!</p>"
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
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            /> */}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="image" name="image"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("image", e.target.files[0])}
                                required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            {/* <Select id="category" className='text-sm rounded-lg'
                                options={categoryOptions}
                                onChange={(e) => setData("category", e.value)} /> */}
                            <select id="category" name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("category", e.target.value)}
                            >
                                {
                                    props.categories.data.map(category => <option key={category.id} value={category.id}>{category.title}</option>)
                                }
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
                            {/* <Select id="tag" className='text-sm rounded-lg'
                                options={tagOptions}
                                onChange={(e) => setData("tag", e.value)} /> */}
                            <select id="tag" name="tag"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => setData("tag", e.target.value)}
                            >
                                {
                                    props.tags.data.map(tag => <option key={tag.id} value={tag.id}>{tag.title}</option>)
                                }
                            </select>
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
